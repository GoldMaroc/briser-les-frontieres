import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { metrics, platforms, category, temperatures } = await request.json();
    
    // Si la tendance d'engagement (data réelle) baisse...
    // Si elle est haute, on "informe" et "fidelise"
    let strategyHint = "";
    if (metrics?.engagementTrend === "down") {
      strategyHint = "L'engagement est en baisse. L'objectif global des posts doit être agressif, clivant, conçu pour re-capter l'attention immédiate (Objectif: communaute et convertir).";
    } else {
      strategyHint = "L'engagement est stable/haut. L'objectif global des posts doit être la consolidation de l'autorité et la fidélisation (Objectif: informer, fideliser).";
    }

    const targetCategory = category ? `Concentre les publications sur le thème spécifique : "${category}".` : "Varie les thèmes autour du leadership et du Khalifa.";
    let platformsInstructions = "";
    if (platforms && platforms.length > 0) {
      platformsInstructions = platforms.map((p: string) => {
        const temp = temperatures && temperatures[p] !== undefined ? temperatures[p] : 0.5;
        let tone = "équilibré et engageant";
        if (temp < 0.4) tone = "très sérieux, factuel, institutionnel et académique";
        if (temp >= 0.8) tone = "très créatif, disruptif, punchy et clivant";
        return `- ${p} : Ton exigé -> ${tone} (Température ciblée: ${temp}). Adapte strictement le format à ce réseau.`;
      }).join("\n   ");
    } else {
      platformsInstructions = "- X, LinkedIn";
    }

    const prompt = `
Tu es l'Agent Stratège de "Briser les Frontières". Ta mission est de rédiger un plan de communication complet de 12 publications.
Voici la température actuelle d'engagement globale du client : ${strategyHint}
${targetCategory}

CONSIGNES STRICTES :
1. Thème central : Le leadership, la souveraineté mentale/physique/spirituelle, le rôle de Khalifa (gérant/dépositaire de Dieu sur Terre).
2. Humanisation & Anti-Bot : Évite absolument le langage robotique ou trop corporate. Écris de façon très directe, brute, presque "conversationnelle" par moment, avec des sauts de lignes marqués. Aucun hashtag (ça fait spam).
3. Plateformes Cibles & Tonalités (TRÈS IMPORTANT) :
   ${platformsInstructions}
4. Tu dois générer exactement 12 publications.
5. Tu dois retourner le résultat UNIQUEMENT au format JSON, sans aucun texte avant ou après.

Le format JSON attendu est strictement un objet contenant un tableau "posts" de 12 éléments comme suit :
{
  "posts": [
    {
      "theme": "Sujet du post",
      "titre": "Titre d'accroche (optionnel)",
      "objectif": "informer", // Doit être 'convertir', 'informer', 'fideliser' ou 'communaute'
      "attente": "Ce que tu attends du lecteur",
      "platforms": ["X"], // Un tableau contenant une ou deux plateformes parmi: linkedin_perso (profil de Mounir, pour l'incarnation/leadership), linkedin_page (page entreprise, pour institutionnel/offres), X, tiktok, instagram, facebook
      "content": "Le texte adapté au format de la plateforme choisie. (ex: Script TikTok, ou Post LinkedIn, etc.)"
    }
  ]
}
`;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY non configurée. Récupérez votre clé gratuite sur https://aistudio.google.com pour activer la génération par IA." }, 
        { status: 500 }
      );
    }

    // Appel direct au modèle Google Gemini (DeepMind)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "Erreur de génération Gemini");
    }

    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) {
      throw new Error("Réponse vide du modèle Gemini");
    }

    let posts = [];
    try {
      const parsed = JSON.parse(rawJson);
      posts = Array.isArray(parsed) ? parsed : (parsed.posts || parsed.publications || Object.values(parsed)[0]);
    } catch (e) {
      console.error("Erreur parsing JSON Gemini", rawJson);
      return NextResponse.json({ error: "L'IA a généré un format invalide." }, { status: 500 });
    }

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error("Generate batch error:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}
