import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();
    const origin = request.headers.get("origin");

    if (bookId !== "secrets" && bookId !== "rahman") {
      return NextResponse.json(
        { message: "Identifiant d'ouvrage invalide." },
        { status: 400 }
      );
    }

    // Configuration ad-hoc du produit et du tarif (100% géré en code)
    const lineItem = bookId === "secrets"
      ? {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Les Secrets du Retour vers Allah (Format ePub)",
              description: "Format numérique ePub — Accès immédiat",
            },
            unit_amount: 590, // 5.90 EUR
          },
          quantity: 1,
        }
      : {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Ar-Rahman — La Mer sans Rivage (Format PDF)",
              description: "Format numérique PDF de prestige — Accès immédiat",
            },
            unit_amount: 1265, // 12.65 EUR
          },
          quantity: 1,
        };

    // Initialisation de la session Stripe Checkout en mode EMBEDDED
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded" as any,
      line_items: [lineItem] as any,
      mode: "payment",
      metadata: { bookId },
      return_url: `${origin}/livres/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    } as any);

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error("Erreur d'initialisation du paiement Stripe :", error);
    return NextResponse.json(
      { message: error.message || "Erreur lors de l'initialisation du paiement." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { message: "Identifiant de session manquant." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      bookId: session.metadata?.bookId || "secrets",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Erreur lors de la vérification de la session." },
      { status: 500 }
    );
  }
}
