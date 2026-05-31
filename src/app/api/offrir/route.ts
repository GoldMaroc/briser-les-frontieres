import { NextResponse } from "next/server";
import { addGift } from "@/lib/db";
import { sendGiftEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { offrant, beneficiaire, prestation, message } = body;

    // Validation des données des deux parties
    if (
      !offrant || !offrant.nom || !offrant.prenom || !offrant.email || !offrant.telephone || !offrant.adresse || !offrant.codePostal || !offrant.ville ||
      !beneficiaire || !beneficiaire.nom || !beneficiaire.prenom || !beneficiaire.email || !beneficiaire.telephone || !beneficiaire.adresse || !beneficiaire.codePostal || !beneficiaire.ville || !beneficiaire.relation ||
      !prestation || !message
    ) {
      return NextResponse.json(
        { message: "Coordonnées obligatoires de l'offrant, du bénéficiaire ou message manquants." },
        { status: 400 }
      );
    }

    // Enregistrement persistant en base de données JSON
    const result = await addGift({
      offrant,
      beneficiaire,
      prestation,
      message
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      );
    }

    // Envoi de la notification e-mail par SMTP en arrière-plan (non bloquant)
    sendGiftEmail({
      offrant,
      beneficiaire,
      prestation,
      message
    }).catch((err) => {
      console.error("Échec de l'envoi d'e-mail de cadeau en arrière-plan :", err);
    });

    return NextResponse.json(
      { message: "Demande cadeau enregistrée et transmise avec succès." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur serveur lors du traitement du cadeau :", error);
    return NextResponse.json(
      { message: "Erreur interne lors du traitement de l'offre." },
      { status: 500 }
    );
  }
}
