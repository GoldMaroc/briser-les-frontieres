import { NextResponse } from "next/server";
import { addCandidature } from "@/lib/db";
import { sendCandidatureEmail } from "@/lib/mail";
import { z } from "zod";

export async function POST(request: Request) {
  try {
const CandidatureSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(1),
  adresse: z.string().min(1),
  codePostal: z.string().min(1),
  ville: z.string().min(1),
  fatigueDecisionnelle: z.string().optional(),
  chargeAllostatique: z.string().optional(),
  salatImpact: z.string().optional(),
  interpositionAccord: z.boolean(),
  motivation: z.string().min(1),
  turnstileToken: z.string().optional()
});

    const bodyRaw = await request.json();
    const parsed = CandidatureSchema.safeParse(bodyRaw);
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

    // --- Vérification Cloudflare Turnstile ---
    const turnstileToken = parsed.data.turnstileToken;
    if (!turnstileToken) {
      return NextResponse.json({ message: "Le jeton de sécurité est manquant." }, { status: 400 });
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (secretKey) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${turnstileToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        console.error("Turnstile verification failed", verifyData);
        return NextResponse.json({ message: "Vérification anti-spam échouée. Veuillez réessayer." }, { status: 400 });
      }
    } else {
      console.warn("⚠️ TURNSTILE_SECRET_KEY is not set. Skipping server verification.");
    }
    // --- Fin Vérification ---

    // Enregistrement persistant en base de données
    const result = await addCandidature({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      fatigueDecisionnelle: fatigueDecisionnelle || "",
      chargeAllostatique: chargeAllostatique || "",
      salatImpact: salatImpact || "",
      interpositionAccord,
      motivation,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

    // Envoi de la notification e-mail (doit être await sur Vercel)
    await sendCandidatureEmail({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      fatigueDecisionnelle: fatigueDecisionnelle || "",
      chargeAllostatique: chargeAllostatique || "",
      salatImpact: salatImpact || "",
      interpositionAccord,
      motivation,
    }).catch((err) => {
      console.error("Échec de l'envoi d'e-mail de candidature :", err);
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
