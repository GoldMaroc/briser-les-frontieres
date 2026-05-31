import { NextResponse } from "next/server";
import { addAudit } from "@/lib/db";
import { sendAuditEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, responses } = body;

    if (!nom || !email || !responses) {
      return NextResponse.json(
        { message: "Identité ou réponses manquantes." },
        { status: 400 }
      );
    }

    // Calcul du score de souveraineté cognitive
    let totalPoints = 0;
    
    // Chaque réponse contient les points octroyés de 0 à 12.5 (8 questions * 12.5 = 100)
    Object.values(responses).forEach((points: any) => {
      const numPoints = parseFloat(points);
      if (!isNaN(numPoints)) {
        totalPoints += numPoints;
      }
    });

    const finalScore = Math.min(100, Math.max(0, Math.round(totalPoints)));

    // Enregistrement persistant en base de données
    const result = await addAudit(nom, email, finalScore, responses);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      );
    }

    // Envoi de la notification e-mail en arrière-plan (non bloquant)
    sendAuditEmail({ nom, email, score: finalScore, responses }).catch((err) => {
      console.error("Échec de l'envoi d'e-mail d'audit en arrière-plan :", err);
    });

    return NextResponse.json(
      { 
        success: true, 
        score: finalScore, 
        message: "Votre bilan de souveraineté cognitive a été enregistré avec succès." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la soumission de l'audit :", error);
    return NextResponse.json(
      { message: "Erreur interne lors du traitement du bilan." },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ message: "Méthode non autorisée." }, { status: 405 });
}
