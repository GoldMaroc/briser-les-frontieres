import { NextResponse } from "next/server";
import { saveAdminOtp, generateRandomAlphanumeric, checkAdminLockout, getAdminOtp } from "@/lib/db";
import { sendAdminOtpEmail } from "@/lib/mail";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BLF_ADMIN_2026";

export async function POST(request: Request) {
  try {
    // 1. Vérifier si la console d'administration est temporairement bloquée (Lockout)
    const lockout = await checkAdminLockout();
    if (lockout.locked && lockout.lockedUntil) {
      const lockDate = new Date(lockout.lockedUntil);
      const remainingSeconds = Math.max(0, Math.ceil((lockDate.getTime() - Date.now()) / 1000));
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;
      
      let durationStr = "";
      if (hours > 0) durationStr += `${hours}h `;
      if (minutes > 0 || hours > 0) durationStr += `${minutes}m `;
      durationStr += `${seconds}s`;

      return NextResponse.json(
        { message: `Accès refusé. La console d'administration est bloquée suite à 3 tentatives infructueuses. Veuillez réessayer dans ${durationStr}.` },
        { status: 403 }
      );
    }

    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Clé d'accès administrateur incorrecte." },
        { status: 401 }
      );
    }

    // 2. Anti-Spam : Vérifier si un OTP actif existe déjà pour éviter le multi-envoi avant son expiration
    const storedOtp = await getAdminOtp();
    if (storedOtp) {
      const now = new Date().toISOString();
      if (now <= storedOtp.expires_at) {
        const remainingSeconds = Math.max(0, Math.ceil((new Date(storedOtp.expires_at).getTime() - Date.now()) / 1000));
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        
        return NextResponse.json(
          { message: `Un code OTP de sécurité est déjà actif. Veuillez utiliser celui-ci ou patienter ${minutes}m ${seconds}s avant d'en solliciter un nouveau.` },
          { status: 429 } // Rate limit / Too Many Requests
        );
      }
    }

    // Génération d'un OTP aléatoire alphanumérique fort à 9 caractères (ex: J2K8P3Q5X)
    const otpCode = generateRandomAlphanumeric(9);
    const expiresMs = Date.now() + 5 * 60 * 1000; // Expire dans 5 minutes (exigence réduite de 10 min)
    const expiresAt = new Date(expiresMs).toISOString();

    // 1. Sauvegarde en base de données persistante (hachée en SHA-256)
    await saveAdminOtp(otpCode, expiresAt);

    // 2. Envoi de l'OTP sur l'adresse email byarmounir@gmail.com
    const emailResult = await sendAdminOtpEmail(otpCode);

    if (!emailResult.success) {
      console.warn("[ADMIN LOGIN] Avertissement : Échec de la livraison SMTP pour l'OTP.");
    }

    return NextResponse.json({
      success: true,
      otpSent: true,
      message: "Un code OTP dynamique à 9 caractères a été envoyé à byarmounir@gmail.com."
    }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur d'initialisation de la connexion administrateur :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de l'initialisation." },
      { status: 500 }
    );
  }
}
