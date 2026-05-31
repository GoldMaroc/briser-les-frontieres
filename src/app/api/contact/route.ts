import { NextResponse } from "next/server";
import { addContact } from "@/lib/db";
import { sendContactEmail } from "@/lib/mail";

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
      typeRelation, 
      formuleAccompagnement, 
      livreSelection, 
      message 
    } = body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !email || !telephone || !adresse || !codePostal || !ville || !message) {
      return NextResponse.json(
        { message: "Coordonnées ou message situationnel manquants." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Enregistrement persistant en base de données JSON
    const result = await addContact({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      typeRelation,
      formuleAccompagnement,
      livreSelection,
      message
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      );
    }

    // Envoi de la notification e-mail par SMTP en arrière-plan (non bloquant)
    sendContactEmail({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      typeRelation,
      formuleAccompagnement,
      livreSelection,
      message
    }).catch((err) => {
      console.error("Échec de l'envoi d'e-mail de contact en arrière-plan :", err);
    });

    return NextResponse.json(
      { message: "Votre message a été transmis avec succès au cabinet." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur serveur lors de la soumission du contact :", error);
    return NextResponse.json(
      { message: "Erreur interne lors du traitement de votre message." },
      { status: 500 }
    );
  }
}
