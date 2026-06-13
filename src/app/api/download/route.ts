import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    const format = searchParams.get("format"); // pdf ou epub

    if (!sessionId) {
      return NextResponse.json({ message: "Identifiant de session manquant." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ message: "Accès refusé. Le paiement n'a pas été validé." }, { status: 403 });
    }

    const bookId = session.metadata?.bookId || "secrets";

    let filename = "";
    if (bookId === "secrets") {
      filename = format === "epub" 
        ? "Les-Secrets-du-Retour-vers-Allah-92u7e.epub" 
        : "Les-Secrets-du-Retour-vers-Allah-LIVRE-COMPLET-92u7e.pdf";
    } else if (bookId === "rahman") {
      filename = "Ar-Rahman-LIVRE-COMPLET.pdf";
    } else {
      return NextResponse.json({ message: "Ouvrage inconnu." }, { status: 400 });
    }

    // Le dossier `protected_books` est à la racine du projet
    const filePath = path.join(process.cwd(), "protected_books", filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "Fichier introuvable sur le serveur." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = filename.endsWith(".epub") ? "application/epub+zip" : "application/pdf";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Erreur téléchargement API :", error);
    return NextResponse.json({ message: "Erreur serveur lors du téléchargement." }, { status: 500 });
  }
}
