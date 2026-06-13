import { NextResponse } from "next/server";
import Stripe from "stripe";
import { recordPurchase } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// Ce secret sera fourni par Stripe lors de la création du webhook
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    if (!sig) {
      throw new Error("Missing Stripe signature");
    }
    if (!endpointSecret) {
      console.warn("⚠️ STRIPE_WEBHOOK_SECRET is not set in environment variables.");
      throw new Error("Missing webhook secret");
    }
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const sessionId = session.id;
      const customerEmail = session.customer_details?.email || "unknown";
      const bookId = session.metadata?.bookId || "secrets";
      const amountTotal = session.amount_total || 0;
      const paymentStatus = session.payment_status;

      // On n'enregistre en base que si le paiement a réussi
      if (paymentStatus === "paid") {
        const success = await recordPurchase(sessionId, customerEmail, bookId, amountTotal, paymentStatus);
        if (success) {
          console.log(`[WEBHOOK] Achat enregistré avec succès pour ${customerEmail} (Livre: ${bookId})`);
          
          // --- ASTUCE PRO : Server-Side Tracking Google Analytics ---
          // Contourne les bloqueurs de pub (AdBlock) pour garantir 100% de précision sur le Chiffre d'Affaires.
          const gaMeasurementId = "G-RK4MYTK71H"; // Hardcodé comme dans le layout
          const gaApiSecret = process.env.GA_API_SECRET;
          
          if (gaApiSecret) {
            try {
              await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${gaMeasurementId}&api_secret=${gaApiSecret}`, {
                method: "POST",
                body: JSON.stringify({
                  client_id: sessionId, // Utilise l'ID de session Stripe comme identifiant unique
                  events: [{
                    name: "purchase",
                    params: {
                      currency: "EUR",
                      value: amountTotal / 100, // Stripe donne le montant en centimes
                      transaction_id: sessionId,
                      items: [{ item_id: bookId, item_name: "Livre " + bookId }]
                    }
                  }]
                })
              });
              console.log("[WEBHOOK] Vente envoyée à Google Analytics via Measurement Protocol.");
            } catch (gaError) {
              console.error("Erreur GA Measurement Protocol:", gaError);
            }
          } else {
            console.warn("⚠️ GA_API_SECRET non configuré. Tracking serveur ignoré.");
          }
          // --------------------------------------------------------

        } else {
          console.error(`[WEBHOOK] Échec d'enregistrement en base pour ${sessionId}`);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Erreur de traitement du webhook :", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
