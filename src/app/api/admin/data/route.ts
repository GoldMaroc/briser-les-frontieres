import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { 
  getAdminDbData, 
  verifyAdminOtp, 
  clearAdminOtp, 
  generateSessionToken, 
  createAdminSession, 
  verifyAdminSession,
  checkAdminLockout,
  recordFailedOtpAttempt,
  resetFailedOtpAttempts
} from "@/lib/db";
import { sendAdminLockoutEmail } from "@/lib/mail";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BLF_ADMIN_2026";

export async function GET(request: Request) {
  try {
    // 1. Tenter l'authentification transparente par session active (cookie HTTP-Only)
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("blf_admin_session")?.value;
    
    let isSessionValid = false;
    if (sessionToken) {
      isSessionValid = await verifyAdminSession(sessionToken);
    }

    if (isSessionValid) {
      console.log("[ADMIN AUTH] Accès accordé de manière transparente via session active.");
      const dbData = await getAdminDbData();
      return NextResponse.json(
        { success: true, data: { ...dbData, adminOtp: null } },
        { status: 200 }
      );
    }

    // 2. Si aucune session n'est active, exiger la double authentification par en-têtes
    // Vérifier en premier lieu s'il y a un blocage de sécurité actif (Lockout)
    const lockout = await checkAdminLockout();
    if (lockout.locked && lockout.lockedUntil) {
      const lockDate = new Date(lockout.lockedUntil);
      const remainingSeconds = Math.max(0, Math.ceil((lockDate.getTime() - Date.now()) / 1000));
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      return NextResponse.json(
        { message: `Accès refusé. La console d'administration est temporairement bloquée suite à 3 tentatives échouées. Veuillez réessayer dans ${minutes}m ${seconds}s.` },
        { status: 403 }
      );
    }

    const authHeader = request.headers.get("X-Admin-Password");
    const otpHeader = request.headers.get("X-Admin-Otp");

    if (!authHeader || authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Session expirée ou clé d'accès principale incorrecte." },
        { status: 401 }
      );
    }

    if (!otpHeader) {
      return NextResponse.json(
        { message: "Code OTP double facteur requis." },
        { status: 401 }
      );
    }

    // Validation stricte du double facteur (OTP haché)
    const isOtpValid = await verifyAdminOtp(otpHeader);

    if (!isOtpValid) {
      // Enregistrer l'échec et verrouiller si le seuil est atteint
      const lockoutStatus = await recordFailedOtpAttempt();
      
      if (lockoutStatus.lockedUntil) {
        // Lever l'alerte e-mail de sécurité instantanée
        await sendAdminLockoutEmail();
        return NextResponse.json(
          { message: "Trop de tentatives infructueuses. La console d'administration est bloquée pendant 2 heures. Un e-mail d'alerte de sécurité a été envoyé à byarmounir@gmail.com." },
          { status: 403 }
        );
      }
      
      const remainingAttempts = 3 - lockoutStatus.attempts;
      return NextResponse.json(
        { message: `Code OTP de sécurité incorrect ou expiré. Il vous reste ${remainingAttempts} tentative(s) avant blocage temporaire.` },
        { status: 401 }
      );
    }

    console.log("[ADMIN AUTH] Double authentification validée avec succès. Création de session...");

    // Réinitialiser le compteur de tentatives en cas de succès
    await resetFailedOtpAttempts();

    // Consommer l'OTP (usage unique strict)
    await clearAdminOtp();

    // Générer une session administrative sécurisée
    const newSessionToken = generateSessionToken();
    await createAdminSession(newSessionToken, 30); // Validité de 30 minutes

    const dbData = await getAdminDbData();
    const response = NextResponse.json(
      { success: true, data: { ...dbData, adminOtp: null } },
      { status: 200 }
    );

    // Injecter le cookie HTTP-Only hautement sécurisé
    response.cookies.set("blf_admin_session", newSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60, // 30 minutes en secondes
      path: "/"
    });

    return response;

  } catch (error) {
    console.error("Erreur lors de la récupération des données admin :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur lors de la récupération sécurisée." },
      { status: 500 }
    );
  }
}
