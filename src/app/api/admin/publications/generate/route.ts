import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { theme, objectif, titre, attente } = await request.json();

    if (!theme || !objectif) {
      return NextResponse.json(
        { error: "Thème et objectif sont requis." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "La clé API Mistral n'est pas configurée." },
        { status: 500 }
      );
    }

    const prompt = `
Tu es l'agent d'intelligence (AI) du "Cabinet de Pilotage de la Souveraineté" (Cabinet BLF), dirigé par Mounir BYAR. 
Le cabinet offre des protocoles d'ingénierie comportementale, d'interposition et de souveraineté aux hommes d'action, politiciens, sportifs de haut niveau et entrepreneurs. Le ton doit être analytique, incisif, haut de gamme, exempt de tout pathos, et axé sur l'action, l'ordre et le leadership.

Tâche : Rédige une publication (ou un thread court) destinée aux réseaux sociaux (X, LinkedIn, Telegram).
- Thème / Sujet : ${theme}
- Titre / Angle : ${titre || "Non précisé"}
          - L'objectif de la publication est de: ${objectif} (Informer, Convertir, Fidéliser, etc.)
          - Le ton doit être: expert, direct, spirituel, lié au leadership de la souveraineté.
          - CRITÈRE OBLIGATOIRE: Tu DOIS inclure subtilement une référence à la sagesse de l'Islam, à Dieu, ou à la mission de "Briser les Frontières" (qui est de restaurer la souveraineté mentale, physique et spirituelle des leaders).
          - Ne mets pas de hashtags inutiles, garde ça très percutant.
          
          Rédige uniquement le texte de la publication, sans introduction. Utilise un vocabulaire précis (entropie, architecture, protocole, souveraineté, interposition, charge allostatique...).
- La structure doit attirer l'attention dès la première ligne, développer un concept fort, et terminer par une conclusion ou un appel à l'action très clair.
`;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Mistral API Error:", err);
      return NextResponse.json(
        { error: "Erreur de génération avec l'IA." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne." },
      { status: 500 }
    );
  }
}
