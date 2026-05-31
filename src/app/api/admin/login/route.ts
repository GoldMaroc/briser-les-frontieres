import { NextResponse } from "next/server";
import { saveAdminOtp } from "@/lib/db";
import { sendAdminOtpEmail } from "@/lib/mail";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BLF_ADMIN_2026";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Clé d'accès administrateur incorrecte." },
        { status: 401 }
      );
    }

    // Génération d'un OTP à 6 chiffres
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes d'expiration

    // Sauvegarde en base de données persistante
    const saved = await saveAdminOtp(otpCode, expiresAt);
    if (!saved) {
      return NextResponse.json(
        { message: "Erreur technique lors de la génération du code de sécurité." },
        { status: 500 }
      );
    }

    // Envoi de l'OTP sur l'adresse email byarmounir@gmail.com
    const emailResult = await sendAdminOtpEmail(otpCode);

    return NextResponse.json({
      success: true,
      otpSent: true,
      message: "Un code OTP a été envoyé à byarmounir@gmail.com pour valider votre entrée."
    }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur d'initialisation de la connexion administrateur :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de l'initialisation." },
      { status: 500 }
    );
  }
}
