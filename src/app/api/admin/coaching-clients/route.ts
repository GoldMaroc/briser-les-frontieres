import { NextResponse } from "next/server";
import { createCoachingClient, getCoachingClients } from "@/lib/coaching-db";
import { z } from "zod";

const ClientSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().optional(),
  email: z.string().email(),
  telephone: z.string().optional(),
  profil: z.string().optional(),
  duree_programme: z.string().optional(),
});

export async function GET() {
  try {
    // Note: Ajouter la vérification de session Admin ici
    const result = await getCoachingClients();
    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }
    return NextResponse.json(result.clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Note: Ajouter la vérification de session Admin ici
    const bodyRaw = await request.json();
    const parsed = ClientSchema.safeParse(bodyRaw);
    
    if (!parsed.success) {
      return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    }
    
    const result = await createCoachingClient(parsed.data);
    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Client créé avec succès", client: result.client }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
