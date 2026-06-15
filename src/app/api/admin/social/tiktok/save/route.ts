import { NextResponse } from "next/server";
import { db } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { titre_source, script } = await request.json();

    if (!titre_source || !script) {
      return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
    }

    const client = await db.connect();
    
    const bodyJson = JSON.stringify(script.bodyParts);
    const hashtags = Array.isArray(script.hashtags) ? script.hashtags.join(" ") : script.hashtags;

    await client.sql`
      INSERT INTO tiktok_planning (titre_source, hook, body_json, cta, hashtags, statut)
      VALUES (${titre_source}, ${script.hook}, ${bodyJson}, ${script.cta}, ${hashtags}, 'Planifié')
    `;

    client.release();

    return NextResponse.json({ success: true, message: "Script enregistré dans le planning." });
  } catch (error) {
    console.error("Error saving TikTok script:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la sauvegarde." },
      { status: 500 }
    );
  }
}
