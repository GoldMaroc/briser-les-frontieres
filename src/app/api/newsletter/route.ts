import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Adresse email invalide ou manquante." },
        { status: 400 }
      );
    }

    // Enregistrement persistant en base de données
    const result = await addSubscriber(email);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Inscription validée au protocole de recherche." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur interne lors du traitement." },
      { status: 500 }
    );
  }
}
