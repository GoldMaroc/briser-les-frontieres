import { NextResponse } from "next/server";
import { addContact } from "@/lib/db";
import { sendContactEmail } from "@/lib/mail";
import { z } from "zod";

export async function POST(request: Request) {
  try {
const ContactSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(1),
  adresse: z.string().min(1),
  codePostal: z.string().min(1),
  ville: z.string().min(1),
  typeRelation: z.string(),
  formuleAccompagnement: z.string(),
  livreSelection: z.string(),
  message: z.string().min(1)
});

    const bodyRaw = await request.json();
    const parsed = ContactSchema.safeParse(bodyRaw);
    if (!parsed.success) {
      return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    }
    const body = parsed.data;
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

    // Envoi de la notification e-mail par SMTP (doit être await sur Vercel)
    await sendContactEmail({
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
      console.error("Échec de l'envoi d'e-mail de contact :", err);
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
