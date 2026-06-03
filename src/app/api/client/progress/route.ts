import { NextResponse } from "next/server";
import { updateClientModuleProgress, getCoachingClientByToken } from "@/lib/coaching-db";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { token, assignation_id, coche_action, difficulte_signalee, demande_report, note_client, statut } = body;

    if (!token || !assignation_id) {
      return NextResponse.json({ message: "Paramètres manquants" }, { status: 400 });
    }

    // 1. Vérifier que le client a bien le droit via son token
    const clientRes = await getCoachingClientByToken(token);
    if (!clientRes.success || !clientRes.client) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    // 2. Mettre à jour l'assignation
    const result = await updateClientModuleProgress(assignation_id, {
      coche_action,
      difficulte_signalee,
      demande_report,
      note_client,
      statut
    });

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Progression sauvegardée", assignation: result.assignation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
