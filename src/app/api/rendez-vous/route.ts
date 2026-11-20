import { NextResponse } from "next/server";
import { 
  getAllRendezVous, 
  recordRendezVousAttempt, 
  updateRendezVousStatus,
  RendezVousItem 
} from "@/lib/db";

export async function GET() {
  try {
    const list = await getAllRendezVous();
    return NextResponse.json({ success: true, list });
  } catch (error) {
    console.error("Erreur GET /api/rendez-vous :", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des rendez-vous." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const format = (data.format || data.typeRdv || "tel") as "tel" | "presentiel";
    const nom = (data.nom || "").trim();
    const email = (data.email || "").trim().toLowerCase();
    const telephone = (data.telephone || "").trim();
    const dateRdv = (data.dateRdv || data.date || "").trim();
    const creneau = (data.creneau || data.timeSlot || "").trim();
    const adresse = (data.adresse || "").trim();
    const motif = (data.motif || "Audit Initial & Déblocage Comportemental").trim();

    if (!nom || !email || !telephone || !dateRdv || !creneau) {
      return NextResponse.json(
        { success: false, message: "Veuillez renseigner tous les champs obligatoires (nom, email, téléphone, créneau)." },
        { status: 400 }
      );
    }

    const montantCents = format === "tel" ? 4895 : 9645;
    const montantFormatted = format === "tel" ? "48,95 €" : "96,45 €";

    const statut: RendezVousItem["statut"] = 
      data.statut || "abandon_avant_paiement"; // Enregistré d'emblée : s'il ne valide pas Stripe, restera en abandon avec motif
    const motifAbandon = 
      data.motifAbandon || 
      "Initialisation tunnel complétée - En attente de finalisation sur la passerelle bancaire Stripe";

    const rdv = await recordRendezVousAttempt({
      typeRdv: format === "presentiel" ? "presentiel" : "telephone",
      format,
      dateRdv,
      timeSlot: creneau,
      creneau,
      nom,
      email,
      telephone,
      adresse: format === "presentiel" ? adresse : undefined,
      montantCents,
      montantFormatted,
      statut,
      motifAbandon,
    });

    return NextResponse.json({
      success: true,
      message: "Créneau réservé et tentative enregistrée.",
      rdv,
    });
  } catch (error) {
    console.error("Erreur POST /api/rendez-vous :", error);
    return NextResponse.json(
      { success: false, message: "Une erreur interne est survenue lors de l'enregistrement." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { identifier, statut, motifAbandon, stripePaymentIntentId } = data;

    if (!identifier || !statut) {
      return NextResponse.json(
        { success: false, message: "Identifiant et statut requis." },
        { status: 400 }
      );
    }

    const updated = await updateRendezVousStatus(
      identifier,
      statut,
      motifAbandon,
      stripePaymentIntentId
    );

    return NextResponse.json({ success: updated });
  } catch (error) {
    console.error("Erreur PATCH /api/rendez-vous :", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour." },
      { status: 500 }
    );
  }
}
