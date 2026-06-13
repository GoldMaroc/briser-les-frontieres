import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { articleTitle, articleContent } = await request.json();

    if (!articleTitle || !articleContent) {
      return NextResponse.json(
        { error: "Le titre et le contenu de l'article sont requis." },
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
Tu es un expert mondial en viralité TikTok et en création de vidéos "Faceless" (sans visage) pour le "Cabinet BLF" (Briser les Frontières).
Le compte s'adresse à des musulmans cherchant la souveraineté mentale, physique et spirituelle, avec un ton analytique, incisif et haut de gamme.

Tâche : Transforme l'article ci-dessous en un script TikTok/Reels ultra-viral et optimisé pour la RÉTENTION.
Titre de l'article : ${articleTitle}
Extrait de l'article : ${articleContent.substring(0, 3000)} // Limite à 3000 caractères pour le contexte

RÈGLES DU SCRIPT TIKTOK :
1. LE HOOK (0-3s) : Doit être choquant, contre-intuitif ou identifier une douleur profonde immédiatement.
2. LE CORPS : 3 points très courts ou une histoire percutante.
3. LE CTA : Un appel à l'action clair ("Lien dans ma bio pour lire le protocole complet").
4. VISUELS : Puisque c'est une vidéo "Faceless", tu dois proposer des requêtes de génération d'images (Prompts IA type Midjourney) pour chaque partie afin de créer un montage hypnotique (ex: "Un homme seul dans la pénombre regardant un sabre, style cinématographique 4k").

Tu dois OBLIGATOIREMENT renvoyer le résultat au format JSON valide, structuré exactement comme ceci :
{
  "hook": "Le texte exact à lire pour les 3 premières secondes",
  "visualPromptForHook": "Description de l'image de fond pour le Hook",
  "bodyParts": [
    {
      "text": "Le texte exact à lire pour cette partie",
      "visualPrompt": "Description de l'image de fond pour illustrer cette phrase"
    }
  ],
  "cta": "Le texte d'appel à l'action à lire",
  "visualPromptForCta": "Image de fond finale",
  "hashtags": ["#Souverainete", "#Islam", "#Mindset", "#DeveloppementPersonnel"]
}

IMPORTANT: Ne renvoie QUE du JSON pur, sans markdown autour. Le JSON doit être parsable par JSON.parse().
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
        response_format: { type: "json_object" }
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
    let content = data.choices[0].message.content;
    
    // Nettoyer les backticks markdown éventuels
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const parsedScript = JSON.parse(content);

    return NextResponse.json({ success: true, script: parsedScript });
  } catch (error) {
    console.error("Error generating TikTok script:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne lors de la création du script." },
      { status: 500 }
    );
  }
}
