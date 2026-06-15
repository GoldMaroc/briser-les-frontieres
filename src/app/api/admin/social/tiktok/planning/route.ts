import { NextResponse } from "next/server";
import { db } from '@vercel/postgres';

export async function GET() {
  try {
    const client = await db.connect();
    
    const { rows } = await client.sql`
      SELECT * FROM tiktok_planning 
      ORDER BY date_planification DESC, date_creation DESC
    `;

    client.release();

    return NextResponse.json({ success: true, planning: rows });
  } catch (error) {
    console.error("Error fetching TikTok planning:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération du planning." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, statut, date_planification, hook, body_json, cta, titre_source } = data;

    if (!id) {
      return NextResponse.json({ error: "ID manquant." }, { status: 400 });
    }

    const client = await db.connect();
    
    // On met à jour dynamiquement selon ce qui est fourni
    if (statut !== undefined) {
      await client.sql`UPDATE tiktok_planning SET statut = ${statut} WHERE id = ${id}`;
    }
    if (date_planification !== undefined) {
      await client.sql`UPDATE tiktok_planning SET date_planification = ${date_planification} WHERE id = ${id}`;
    }
    if (hook !== undefined) {
      await client.sql`UPDATE tiktok_planning SET hook = ${hook} WHERE id = ${id}`;
    }
    if (body_json !== undefined) {
      const bodyStr = typeof body_json === 'string' ? body_json : JSON.stringify(body_json);
      await client.sql`UPDATE tiktok_planning SET body_json = ${bodyStr} WHERE id = ${id}`;
    }
    if (cta !== undefined) {
      await client.sql`UPDATE tiktok_planning SET cta = ${cta} WHERE id = ${id}`;
    }
    if (titre_source !== undefined) {
      await client.sql`UPDATE tiktok_planning SET titre_source = ${titre_source} WHERE id = ${id}`;
    }

    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating TikTok planning status:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID manquant." }, { status: 400 });
    }

    const client = await db.connect();
    await client.sql`DELETE FROM tiktok_planning WHERE id = ${id}`;
    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting TikTok planning:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression." },
      { status: 500 }
    );
  }
}
