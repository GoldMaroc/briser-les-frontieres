import { NextResponse } from "next/server";
import { 
  updateCandidatureStatus, 
  deleteCandidature, 
  deleteAudit, 
  deleteContact, 
  deleteGift, 
  deleteSubscriber, 
  approveSubmittedTestimonial, 
  deleteSubmittedTestimonial 
} from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BLF_ADMIN_2026";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("X-Admin-Password");

    if (!authHeader || authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Accès refusé. Mot de passe incorrect." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, id, status } = body;

    if (!action || !id) {
      return NextResponse.json(
        { message: "Action ou identifiant manquant." },
        { status: 400 }
      );
    }

    // 1. GESTION DES CANDIDATURES
    if (action === "updateCandidature") {
      if (!status || !["pending", "approved", "rejected"].includes(status)) {
        return NextResponse.json(
          { message: "Statut de candidature invalide." },
          { status: 400 }
        );
      }

      const success = await updateCandidatureStatus(id, status);
      if (success) {
        return NextResponse.json({ success: true, message: `Statut de la candidature mis à jour sur : ${status}` });
      } else {
        return NextResponse.json({ message: "Impossible de trouver la candidature." }, { status: 404 });
      }
    }

    if (action === "deleteCandidature") {
      const success = await deleteCandidature(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Dossier de candidature supprimé définitivement." });
      } else {
        return NextResponse.json({ message: "Impossible de trouver la candidature à supprimer." }, { status: 404 });
      }
    }

    // 2. GESTION DES AUDITS (BILANS)
    if (action === "deleteAudit") {
      const success = await deleteAudit(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Bilan de souveraineté cognitive supprimé définitivement." });
      } else {
        return NextResponse.json({ message: "Impossible de trouver le bilan à supprimer." }, { status: 404 });
      }
    }

    // 3. GESTION DES MESSAGES DE CONTACT
    if (action === "deleteContact") {
      const success = await deleteContact(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Message de sollicitation supprimé définitivement." });
      } else {
        return NextResponse.json({ message: "Impossible de trouver le message à supprimer." }, { status: 404 });
      }
    }

    // 4. GESTION DES PRESTATIONS CADEAUX (GIFTS)
    if (action === "deleteGift") {
      const success = await deleteGift(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Prestation cadeau supprimée définitivement de la console." });
      } else {
        return NextResponse.json({ message: "Impossible de trouver la commande cadeau à supprimer." }, { status: 404 });
      }
    }

    // 5. GESTION DE LA NEWSLETTER
    if (action === "deleteSubscriber") {
      const success = await deleteSubscriber(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Abonné newsletter supprimé avec succès." });
      } else {
        return NextResponse.json({ message: "Impossible de trouver l'abonné." }, { status: 404 });
      }
    }

    // 6. GESTION DES TÉMOIGNAGES (AVIS)
    if (action === "approveTestimonial") {
      const success = await approveSubmittedTestimonial(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Témoignage approuvé avec succès." });
      } else {
        return NextResponse.json({ message: "Témoignage introuvable." }, { status: 404 });
      }
    }

    if (action === "deleteTestimonial") {
      const success = await deleteSubmittedTestimonial(id);
      if (success) {
        return NextResponse.json({ success: true, message: "Témoignage supprimé avec succès." });
      } else {
        return NextResponse.json({ message: "Témoignage introuvable." }, { status: 404 });
      }
    }

    return NextResponse.json({ message: "Action non prise en charge." }, { status: 400 });
  } catch (error) {
    console.error("Erreur dans api/admin/action :", error);
    return NextResponse.json(
      { message: "Erreur interne lors de l'exécution de l'action." },
      { status: 500 }
    );
  }
}
