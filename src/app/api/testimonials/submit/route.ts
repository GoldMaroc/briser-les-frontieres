import { NextResponse } from "next/server";
import { addSubmittedTestimonial } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, categorie, periode, message, localisation } = body;

    // Validation de base
    if (!nom || !categorie || !periode || !message) {
      return NextResponse.json(
        { message: "Tous les champs requis ne sont pas remplis." },
        { status: 400 }
      );
    }

    const validCategories = ["homme", "femme", "famille", "groupe"];
    if (!validCategories.includes(categorie)) {
      return NextResponse.json(
        { message: "Catégorie de témoignage invalide." },
        { status: 400 }
      );
    }

    const result = await addSubmittedTestimonial(nom, categorie, periode, message, localisation);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur dans l'API de soumission de témoignage :", error);
    return NextResponse.json(
      { message: "Erreur serveur interne lors du traitement." },
      { status: 500 }
    );
  }
}
