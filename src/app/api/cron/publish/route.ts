import { NextResponse } from "next/server";
import { getPublications, updatePublication } from "@/lib/db";
import { publishPublication } from "@/lib/social";

export async function GET(request: Request) {
  try {
    // Vérifier l'autorisation (seulement si exécuté par Vercel Cron)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Pour les tests locaux, on peut le désactiver si CRON_SECRET n'est pas set
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const publications = await getPublications();
    const now = new Date().getTime();

    // Trouver toutes les publications approuvées dont l'heure prévue est passée
    const toPublish = publications.filter(p => 
      p.status === "approved" && 
      p.scheduled_for && 
      new Date(p.scheduled_for).getTime() <= now
    );

    const results = [];

    for (const pub of toPublish) {
      // 1. Publier sur les plateformes
      const socialResult = await publishPublication(pub.id, pub.content, pub.platforms || ["linkedin"]);
      
      // 2. Mettre à jour le statut en base de données
      await updatePublication(pub.id, {
        status: "published",
        published_at: new Date().toISOString()
      });

      results.push({ id: pub.id, success: true, platforms: socialResult });
    }

    return NextResponse.json({ success: true, processed: results.length, results });
  } catch (error) {
    console.error("Cron publish error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
