import { NextResponse } from "next/server";
import { getCoachingClientByToken, getClientModules } from "@/lib/coaching-db";

export async function GET(request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params;
    // 1. Trouver le client
    const clientRes = await getCoachingClientByToken(token);
    
    if (!clientRes.success || !clientRes.client) {
      return NextResponse.json({ message: "Lien invalide ou expiré." }, { status: 401 });
    }
    
    const client = clientRes.client;

    // 2. Récupérer tout le programme du client
    const modulesRes = await getClientModules(client.id);
    const modules = modulesRes.success ? modulesRes.modules : [];

    return NextResponse.json({ 
      client: {
        nom: client.nom,
        prenom: client.prenom,
        profil: client.profil,
        duree_programme: client.duree_programme,
        created_at: client.created_at
      }, 
      modules 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
