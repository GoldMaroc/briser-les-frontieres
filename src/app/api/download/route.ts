import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    const paymentIntentId = searchParams.get("payment_intent");
    const format = searchParams.get("format"); // pdf ou epub

    if (!sessionId && !paymentIntentId) {
      return NextResponse.json({ message: "Identifiant de transaction manquant." }, { status: 400 });
    }

    let bookId = "secrets";

    if (paymentIntentId) {
      const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (pi.status !== "succeeded") {
        return NextResponse.json({ message: "Accès refusé. Le paiement n'a pas été validé." }, { status: 403 });
      }
      bookId = pi.metadata?.offerId || pi.metadata?.bookId || "secrets";
    } else if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        return NextResponse.json({ message: "Accès refusé. Le paiement n'a pas été validé." }, { status: 403 });
      }
      bookId = session.metadata?.bookId || session.metadata?.offerId || "secrets";
    }

    let filename = "";
    if (bookId === "secrets") {
      if (format === "epub") {
        filename = "Les-Secrets-du-Retour-vers-Allah-92u7e.epub";
      } else if (format === "kpf") {
        filename = "Les-Secrets-du-Retour-vers-Allah-LIVRE-COMPLET.kpf";
      } else {
        filename = "Les-Secrets-du-Retour-vers-Allah-LIVRE-COMPLET-92u7e.pdf";
      }
    } else if (bookId === "rahman") {
      if (format === "epub") {
        filename = "Ar-Rahman-La-Mer-sans-Rivage.epub";
      } else if (format === "kpf") {
        filename = "Ar-Rahman-LIVRE-COMPLET.kpf";
      } else {
        filename = "Ar-Rahman-LIVRE-COMPLET.pdf";
      }
    } else {
      return NextResponse.json({ message: "Ouvrage inconnu." }, { status: 400 });
    }

    // Le dossier `protected_books` est à la racine du projet
    const filePath = path.join(process.cwd(), "protected_books", filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "Fichier introuvable sur le serveur." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = filename.endsWith(".epub")
      ? "application/epub+zip"
      : filename.endsWith(".kpf")
      ? "application/octet-stream"
      : "application/pdf";

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
