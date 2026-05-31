import { NextResponse } from "next/server";
import { getAdminDbData, getAdminOtp, clearAdminOtp } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BLF_ADMIN_2026";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("X-Admin-Password");
    const otpHeader = request.headers.get("X-Admin-Otp");

    // 1. Vérification du mot de passe principal
    if (!authHeader || authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Accès refusé. Mot de passe de qualification incorrect." },
        { status: 401 }
      );
    }

    // 2. Vérification du code OTP double facteur
    if (!otpHeader) {
      return NextResponse.json(
        { message: "Code OTP de sécurité requis pour double facteur." },
        { status: 401 }
      );
    }

    const storedOtp = await getAdminOtp();

    if (!storedOtp) {
      return NextResponse.json(
        { message: "Aucun code OTP actif. Veuillez vous reconnecter." },
        { status: 401 }
      );
    }

    // Vérifier l'expiration (10 minutes)
    if (new Date().toISOString() > storedOtp.expires_at) {
      await clearAdminOtp();
      return NextResponse.json(
        { message: "Le code OTP de sécurité a expiré. Veuillez générer un nouveau code." },
        { status: 401 }
      );
    }

    // Vérifier le code
    if (otpHeader !== storedOtp.code) {
      return NextResponse.json(
        { message: "Le code OTP de sécurité est invalide." },
        { status: 401 }
      );
    }

    // Connexion réussie : Réinitialiser le code OTP à usage unique
    await clearAdminOtp();

    const dbData = getAdminDbData();

    // S'assurer de ne pas renvoyer le code OTP dans la payload de données admin
    const cleanData = {
      ...dbData,
      adminOtp: null
    };

    return NextResponse.json(
      { success: true, data: cleanData },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la récupération des données admin :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur lors de la récupération sécurisée." },
      { status: 500 }
    );
  }
}
