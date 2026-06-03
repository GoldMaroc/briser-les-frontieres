import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getClientModules, assignModuleToClient } from "@/lib/coaching-db";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    // 1. Récupérer le client
    const clientRes = await sql`SELECT * FROM coaching_clients WHERE id = ${id} LIMIT 1;`;
    if (clientRes.rows.length === 0) {
      return NextResponse.json({ message: "Client introuvable." }, { status: 404 });
    }
    const client = clientRes.rows[0];

    // 2. Récupérer les modules assignés
    const modulesRes = await getClientModules(id);
    const assignedModules = modulesRes.success ? modulesRes.modules : [];

    // 3. Récupérer la bibliothèque complète pour le drag and drop
    const biblioRes = await sql`SELECT * FROM modules_bibliotheque ORDER BY created_at ASC;`;
    const bibliotheque = biblioRes.rows;

    return NextResponse.json({ client, assignedModules, bibliotheque }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { module_id, jour_numero, date_prevue } = body;
    
    if (!module_id || !jour_numero) {
      return NextResponse.json({ message: "Données manquantes" }, { status: 400 });
    }

    const result = await assignModuleToClient({
      client_id: id,
      module_id,
      jour_numero,
      date_prevue
    });

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Module assigné", assignation: result.assignation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const assignation_id = searchParams.get("assignation_id");
    if (!assignation_id) return NextResponse.json({ message: "ID manquant" }, { status: 400 });

    await sql`DELETE FROM modules_assignes WHERE id = ${assignation_id} AND client_id = ${id};`;
    return NextResponse.json({ message: "Module retiré" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
