import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();
    const origin = request.headers.get("origin");

    if (bookId !== "secrets" && bookId !== "rahman" && bookId !== "protocole") {
      return NextResponse.json(
        { message: "Identifiant invalide." },
        { status: 400 }
      );
    }

    let lineItem;
    let sessionParams: any = {
      mode: "payment",
      metadata: { bookId },
    };

    if (bookId === "protocole") {
      lineItem = {
        price_data: {
          currency: "eur",
          product_data: {
            name: "L'Accompagnement Élite (Protocole C.O.M.E.S.)",
            description: "Accès exclusif au programme d'Ingénierie Spirituelle.",
          },
          unit_amount: 9700, // 97.00 EUR
        },
        quantity: 1,
      };
      
      // Standard Hosted Checkout for High-Ticket/Services
      sessionParams.line_items = [lineItem];
      sessionParams.success_url = `${origin}/espace-client?session_id={CHECKOUT_SESSION_ID}&success=true`;
      sessionParams.cancel_url = `${origin}/`;
    } else {
      lineItem = bookId === "secrets"
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
          
      // Embedded Checkout for digital books
      sessionParams.ui_mode = "embedded";
      sessionParams.line_items = [lineItem];
      sessionParams.return_url = `${origin}/livres/confirmation?session_id={CHECKOUT_SESSION_ID}`;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (bookId === "protocole") {
      return NextResponse.json({ url: session.url });
    } else {
      return NextResponse.json({ clientSecret: session.client_secret });
    }
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
