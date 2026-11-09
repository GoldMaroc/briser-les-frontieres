import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS_CATALOG, getInstallmentCents, formatEuros } from "@/lib/products";
import { recordPurchase } from "@/lib/db";
import { getTransporter, SMTP_FROM } from "@/lib/mail";
import { sql } from "@vercel/postgres";
import crypto from "crypto";

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY || "";
  if (!key || key === "sk_test_123" || key === "sk_test_dummy") {
    return null;
  }
  return new Stripe(key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { offerId = "3m", installments = 1 } = body;

    const product = PRODUCTS_CATALOG[offerId];
    if (!product) {
      return NextResponse.json({ message: "Offre introuvable." }, { status: 400 });
    }

    const validInstallments = product.allowedInstallments.includes(Number(installments))
      ? Number(installments)
      : 1;

    const amountCents = getInstallmentCents(product.totalCents, validInstallments);
    const publishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      process.env.STRIPE_PUBLISHABLE_KEY ||
      "";

    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json(
        {
          configured: false,
          publishableKey,
          amountCents,
          totalCents: product.totalCents,
          installments: validInstallments,
          product,
          message:
            "Configuration Stripe en attente des clés API de production (STRIPE_SECRET_KEY & NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).",
        },
        { status: 200 }
      );
    }

    const piParams: Stripe.PaymentIntentCreateParams = {
      amount: amountCents,
      currency: "eur",
      payment_method_types: ["card"],
      description:
        validInstallments > 1
          ? `${product.title} — Échéance 1/${validInstallments} (Sans frais - 0% Riba)`
          : `${product.title} — Règlement intégral`,
      metadata: {
        offerId: product.id,
        bookId: product.id,
        offerTitle: product.title,
        category: product.category,
        installments: String(validInstallments),
        totalCents: String(product.totalCents),
        installmentCents: String(amountCents),
      },
    };

    if (validInstallments > 1) {
      piParams.setup_future_usage = "off_session";
    }

    const paymentIntent = await stripe.paymentIntents.create(piParams);

    return NextResponse.json({
      configured: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      publishableKey,
      amountCents,
      totalCents: product.totalCents,
      installments: validInstallments,
      product,
    });
  } catch (error: any) {
    console.error("Erreur POST /api/payment-intent :", error);
    return NextResponse.json(
      { message: error.message || "Erreur lors de l'initialisation du paiement sécurisé." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      paymentIntentId,
      offerId,
      installments = 1,
      prenom = "",
      nom = "",
      email = "",
      telephone = "",
      profil = "Homme",
    } = body;

    const stripe = getStripeClient();
    if (!stripe || !paymentIntentId) {
      return NextResponse.json({ message: "Session de paiement introuvable." }, { status: 400 });
    }

    const product = PRODUCTS_CATALOG[offerId];
    if (!product) {
      return NextResponse.json({ message: "Offre invalide." }, { status: 400 });
    }

    const validInstallments = product.allowedInstallments.includes(Number(installments))
      ? Number(installments)
      : 1;
    const amountCents = getInstallmentCents(product.totalCents, validInstallments);
    const fullName = `${prenom} ${nom}`.trim();

    // Créer ou associer le client Stripe pour un suivi propre dans le Dashboard Stripe
    let customerId: string | undefined;
    if (email) {
      const existingCustomers = await stripe.customers.list({ email: email.trim().toLowerCase(), limit: 1 });
      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
        await stripe.customers.update(customerId, {
          name: fullName || undefined,
          phone: telephone || undefined,
          metadata: { profil, lastOffer: product.title },
        });
      } else {
        const created = await stripe.customers.create({
          email: email.trim().toLowerCase(),
          name: fullName || undefined,
          phone: telephone || undefined,
          metadata: { profil, firstOffer: product.title },
        });
        customerId = created.id;
      }
    }

    const updateParams: Stripe.PaymentIntentUpdateParams = {
      amount: amountCents,
      receipt_email: email ? email.trim().toLowerCase() : undefined,
      customer: customerId,
      description:
        validInstallments > 1
          ? `${product.title} — Échéance 1/${validInstallments} (0% Riba) — ${fullName}`
          : `${product.title} — ${fullName}`,
      metadata: {
        offerId: product.id,
        bookId: product.id,
        offerTitle: product.title,
        category: product.category,
        installments: String(validInstallments),
        totalCents: String(product.totalCents),
        installmentCents: String(amountCents),
        customerPrenom: prenom.trim(),
        customerNom: nom.trim(),
        customerName: fullName,
        customerEmail: email.trim().toLowerCase(),
        customerPhone: telephone.trim(),
        profil,
      },
    };

    await stripe.paymentIntents.update(paymentIntentId, updateParams);

    return NextResponse.json({ success: true, amountCents });
  } catch (error: any) {
    console.error("Erreur PUT /api/payment-intent :", error);
    return NextResponse.json(
      { message: error.message || "Erreur lors de la mise à jour des coordonnées." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get("payment_intent");

    if (!paymentIntentId) {
      return NextResponse.json({ message: "Identifiant de transaction manquant." }, { status: 400 });
    }

    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json({ message: "Stripe non configuré." }, { status: 500 });
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    const offerId = pi.metadata?.offerId || pi.metadata?.bookId || "secrets";
    const product = PRODUCTS_CATALOG[offerId] || PRODUCTS_CATALOG.secrets;
    const customerEmail = pi.metadata?.customerEmail || pi.receipt_email || "";
    const customerName = pi.metadata?.customerName || "";
    const customerPrenom = pi.metadata?.customerPrenom || "";
    const customerNom = pi.metadata?.customerNom || customerName;
    const customerPhone = pi.metadata?.customerPhone || "";
    const profil = pi.metadata?.profil || "Homme";
    const installments = Number(pi.metadata?.installments || "1");

    if (pi.status === "succeeded") {
      // 1. Enregistrer dans la table purchases (idempotent grâce à ON CONFLICT (session_id) DO NOTHING)
      const alreadyRecordedCheck = await sql`
        SELECT id FROM purchases WHERE session_id = ${pi.id} LIMIT 1
      `.catch(() => ({ rows: [] }));

      const isFirstConfirmation = alreadyRecordedCheck.rows.length === 0;

      await recordPurchase(pi.id, customerEmail || "unknown", offerId, pi.amount, "paid");

      if (isFirstConfirmation) {
        // 2. Si c'est un accompagnement, créer ou mettre à jour le dossier dans coaching_clients
        let tokenAcces = "";
        if (product.category === "coaching" && customerEmail) {
          try {
            tokenAcces = crypto.randomBytes(16).toString("hex");
            const statutLabel = installments > 1 ? `Payé (1/${installments})` : "Payé";
            await sql`
              INSERT INTO coaching_clients (nom, prenom, email, telephone, profil, duree_programme, statut_paiement, token_acces)
              VALUES (${customerNom || "Client"}, ${customerPrenom || null}, ${customerEmail}, ${customerPhone || null}, ${profil}, ${product.durationLabel || product.title}, ${statutLabel}, ${tokenAcces})
            `;
          } catch (dbErr) {
            console.error("Info création dossier coaching_clients:", dbErr);
          }
        }

        // 3. Envoyer un e-mail de confirmation au Cabinet et au Client
        const transporter = getTransporter();
        if (transporter) {
          const amountFormatted = formatEuros(pi.amount);
          const totalFormatted = formatEuros(product.totalCents);
          const scheduleText =
            installments > 1
              ? `Paiement en ${installments}x sans frais (0% Riba) — 1ère échéance réglée : ${amountFormatted} (Total : ${totalFormatted})`
              : `Règlement comptant intégral : ${amountFormatted}`;

          try {
            await transporter.sendMail({
              from: SMTP_FROM,
              to: process.env.SMTP_TO || "info@briserlesfrontieres.fr",
              cc: "byarmounir@gmail.com",
              subject: `💳 Nouveau Paiement Validé : ${product.title} — ${customerName || customerEmail}`,
              html: `
                <div style="font-family: 'Inter', sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px;">
                  <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
                    <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF PAIEMENT</span>
                    <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 300; color: #f0ede8;">Nouvelle Acquisition Confirmée</h2>
                  </div>
                  <div style="background-color: #0d1b2a; border: 1px solid rgba(212, 168, 83, 0.2); padding: 20px; border-radius: 4px; margin-bottom: 20px;">
                    <p style="margin: 0 0 8px 0; color: #10b981; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">✓ Transaction Validée</p>
                    <p style="margin: 6px 0; font-size: 15px;"><strong>Prestation :</strong> ${product.title}</p>
                    <p style="margin: 6px 0; font-size: 14px; color: #d4a853;"><strong>Modalité :</strong> ${scheduleText}</p>
                    <p style="margin: 6px 0; font-size: 14px;"><strong>Client :</strong> ${customerName || "Non renseigné"} (${profil})</p>
                    <p style="margin: 6px 0; font-size: 14px;"><strong>Email :</strong> ${customerEmail}</p>
                    <p style="margin: 6px 0; font-size: 14px;"><strong>Téléphone :</strong> ${customerPhone || "Non renseigné"}</p>
                    <p style="margin: 6px 0; font-size: 12px; color: #a0aec0;"><strong>Référence Stripe :</strong> ${pi.id}</p>
                  </div>
                </div>
              `,
            });

            if (customerEmail) {
              await transporter.sendMail({
                from: SMTP_FROM,
                to: customerEmail,
                subject: `✓ Confirmation de votre acquisition — ${product.title} (Cabinet BLF)`,
                html: `
                  <div style="font-family: 'Inter', sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px;">
                    <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
                      <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BRISER LES FRONTIÈRES</span>
                      <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 300; color: #f0ede8;">Confirmation de votre Acquisition</h2>
                    </div>
                    <p style="font-size: 14px; line-height: 1.6;">Salam ${customerPrenom || customerName || ""},</p>
                    <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
                      Votre règlement pour <strong>${product.title}</strong> a été validé avec succès.
                    </p>
                    <div style="background-color: #0d1b2a; border-left: 3px solid #d4a853; padding: 16px; margin: 20px 0; font-size: 13px;">
                      <p style="margin: 0 0 6px 0;"><strong>Prestation :</strong> ${product.title}</p>
                      <p style="margin: 0 0 6px 0;"><strong>Détail :</strong> ${scheduleText}</p>
                      <p style="margin: 0; color: #a0aec0;"><strong>Référence :</strong> ${pi.id}</p>
                    </div>
                    ${
                      product.category === "book"
                        ? `<p style="font-size: 14px; line-height: 1.6;">Vous pouvez télécharger votre ouvrage à tout moment depuis votre page de confirmation sécurisée :</p>
                           <div style="text-align: center; margin: 25px 0;">
                             <a href="https://www.briserlesfrontieres.fr/paiement/confirmation?payment_intent=${pi.id}" style="display: inline-block; padding: 12px 24px; background-color: #d4a853; color: #0a1128; font-weight: bold; text-decoration: none; border-radius: 2px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Accéder à mon téléchargement ➔</a>
                           </div>`
                        : `<p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">L'Ingénieur Mounir BYAR et son cabinet ont reçu votre dossier et prendront contact avec vous sous 24h pour activer votre protocole et planifier votre première séance.</p>`
                    }
                    <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
                      <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
                    </div>
                  </div>
                `,
              });
            }
          } catch (mailErr) {
            console.error("Erreur envoi email confirmation paiement:", mailErr);
          }
        }
      }
    }

    return NextResponse.json({
      status: pi.status === "succeeded" ? "complete" : pi.status,
      payment_status: pi.status === "succeeded" ? "paid" : "unpaid",
      offerId,
      product,
      customerEmail,
      customerName,
      installments,
      amountPaidCents: pi.amount,
      totalCents: product.totalCents,
      paymentIntentId: pi.id,
    });
  } catch (error: any) {
    console.error("Erreur GET /api/payment-intent :", error);
    return NextResponse.json(
      { message: error.message || "Erreur lors de la vérification du paiement." },
      { status: 500 }
    );
  }
}
