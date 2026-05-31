import { NextResponse } from "next/server";
import { addCandidature } from "@/lib/db";
import { sendCandidatureEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nom, 
      prenom,
      email, 
      telephone,
      adresse,
      codePostal,
      ville,
      fatigueDecisionnelle, 
      chargeAllostatique, 
      salatImpact, 
      interpositionAccord, 
      motivation 
    } = body;

    // Validation basique des coordonnées obligatoires
    if (!nom || !prenom || !email || !telephone || !adresse || !codePostal || !ville || !motivation) {
      return NextResponse.json(
        { message: "Coordonnées ou motivations obligatoires manquantes." },
        { status: 400 }
      );
    }

    if (!interpositionAccord) {
      return NextResponse.json(
        { message: "Vous devez accepter le principe d'une interposition in situ pour soumettre votre dossier." },
        { status: 400 }
      );
    }

    // Enregistrement persistant en base de données
    const result = await addCandidature({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      fatigueDecisionnelle,
      chargeAllostatique,
      salatImpact,
      interpositionAccord,
      motivation,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

    // Envoi de la notification e-mail en arrière-plan (non bloquant)
    sendCandidatureEmail({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      fatigueDecisionnelle,
      chargeAllostatique,
      salatImpact,
      interpositionAccord,
      motivation,
    }).catch((err) => {
      console.error("Échec de l'envoi d'e-mail de candidature en arrière-plan :", err);
    });

    return NextResponse.json(
      { message: "Candidature enregistrée avec succès." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur serveur lors de la soumission de la candidature :", error);
    return NextResponse.json(
      { message: "Erreur interne lors du traitement du dossier." },
      { status: 500 }
    );
  }
}
