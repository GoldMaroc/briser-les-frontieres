import { NextResponse } from "next/server";
import { db } from '@vercel/postgres';

export async function GET() {
  try {
    const client = await db.connect();
    
    const { rows } = await client.sql`
      SELECT * FROM tiktok_planning 
      ORDER BY date_creation DESC
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
    const { id, statut } = await request.json();

    if (!id || !statut) {
      return NextResponse.json({ error: "ID ou statut manquant." }, { status: 400 });
    }

    const client = await db.connect();
    
    await client.sql`
      UPDATE tiktok_planning 
      SET statut = ${statut}
      WHERE id = ${id}
    `;

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
