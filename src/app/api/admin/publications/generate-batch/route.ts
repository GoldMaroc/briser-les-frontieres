import { NextResponse } from "next/server";
import { getGeminiApiKey, setGeminiApiKey } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { metrics, platforms, category, temperatures, customApiKey } = await request.json();

    if (customApiKey && typeof customApiKey === "string" && customApiKey.trim().length > 10) {
      await setGeminiApiKey(customApiKey.trim());
    }
    
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
Tu es l'Agent Stratège en chef de "Briser les Frontières" (BLF), incarnant la pensée, la plume et la doctrine de Mounir BYAR.
Ta mission est de rédiger un plan de communication d'élite de 12 publications de haut niveau, parfaitement ancrées dans son écosystème.

Voici la température actuelle d'engagement globale : ${strategyHint}
${targetCategory}

══════════════════════════════════════════════════════════════════════════════
LES SOURCES ET FONDATIONS DOCTRINALES OBLIGATOIRES DE MOUNIR BYAR :
══════════════════════════════════════════════════════════════════════════════
1. LES OUVRAGES PHARES :
   - "Les Secrets du Retour vers Allah" (Reprendre sa prière et sa souveraineté) :
     * Anatomie d'At-Tawbah (le repentir comme algorithme de retour et joie divine suprême, Hadith Muslim 2747).
     * As-Salât comme régulateur neurobiologique circadien (-27,3% de cortisol, stabilisation du système nerveux).
     * Habit Stacking, ingénierie de l'attention et design environnemental face au chaos des notifications.
     * Le statut ontologique de Khalîfa face aux dépendances modernes aliénantes (Nafs).
   - "Ar-Rahman : La Mer sans Rivage" (Exégèse du Premier Nom divin) :
     * La Miséricorde universelle qui précède la colère (racine R-H-M et ses 57 occurrences coraniques).
     * Les maîtres classiques : Al-Ghazâlî, Ibn al-Qayyim, At-Tabarî, Fakhr ad-Dîn Ar-Râzî, Ibn Kathîr.
     * Les 3 degrés d'assimilation des Noms divins (Ahsâhâ : dénombrer, comprendre, incarner).
     * Guérison radicale du désespoir, de l'anxiété métaphysique et de la fatigue existentielle.
   - "Adam, Père de l'Humanité (عَلَيْهِ ٱلسَّلَامُ)" :
     * Hawwâ et les 10 générations antédiluviennes de Shîth à Nûh.
     * Le verset d'investiture céleste : "Je vais établir sur la Terre un Vicaire (Khalîfah)" (Coran 2:30).
     * L'arbre interdit comme entraînement au libre arbitre et à la souveraineté.
     * La confession archétypale : "Seigneur, nous nous sommes fait du tort à nous-mêmes" (Coran 7:23) = prise de responsabilité radicale vs le blâme d'Iblîs qui accuse le destin.
     * L'amnésie métaphysique contemporaine (Ghaflah) et le rappel de la charte de noblesse primordiale.

2. LE CROISEMENT INTERDISCIPLINAIRE UNIQUE (LA SIGNATURE BLF) :
   Chaque publication doit opérer un croisement saisissant entre :
   - La Tradition Sacrée : Verset coranique précis (avec sourate:verset), Hadîth authentique vérifié, sentences d'Al-Ghazâlî ou d'Ibn al-Qayyim.
   - Les Sciences Cognitives & Neurosciences : Régulation du cortisol, dopamine, charge allostatique, fatigue décisionnelle, entropie mentale.
   - La Psychologie & Philosophie : Sortir de la culpabilité paralysante pour entrer dans la souveraineté personnelle, maîtrise du Nafs, intégrité absolue.
   - Le Coaching & Leadership : Le leadership comme acte de foi et responsabilité divine devant le Créateur, méthode C.O.M.E.S.

3. L'ÉCOSYSTÈME DE SERVICES & OFFRES BLF :
   - Les Livres BLF (disponibles en accès immédiat sur le site).
   - Cabinet de pilotage & Mentorat privé : Audit diagnostique, Protocole 30 Jours, Accompagnement 3 Mois et Mentorat d'excellence.

4. STYLE D'ÉCRITURE & ANTI-BOT :
   - Style noble, incisif, tranchant, profondément humain, spirituellement régénérant.
   - Zéro mièvrerie, zéro jargon corporate vide ("synergie", "mindset de winner").
   - Utilise des sauts de ligne élégants pour une lecture captivante.
   - Pas de surabondance de hashtags (3 à 5 hashtags ciblés maximum pour Instagram/TikTok, aucun sur LinkedIn/X).

5. FORMATS PAR RÉSEAU :
   ${platformsInstructions}

Génère exactement 12 publications équilibrées et retourne UNIQUEMENT un JSON valide respectant cette structure exacte :
{
  "posts": [
    {
      "theme": "Thème précis (ex: Le Statut de Khalîfa & l'Algorithme Circadien)",
      "titre": "Accroche percutante (1 ligne)",
      "objectif": "informer", // 'convertir', 'informer', 'fideliser' ou 'communaute'
      "attente": "Impact recherché chez le lecteur",
      "platforms": ["instagram"], // Choix parmi: instagram, linkedin_perso, linkedin_page, X, tiktok, facebook
      "content": "Texte intégral du post rédigé avec rigueur et profondeur."
    }
  ]
}
`;

    const dbKey = await getGeminiApiKey();
    const apiKey = (customApiKey && typeof customApiKey === "string" ? customApiKey.trim() : null) || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || (typeof dbKey === "string" ? dbKey : null);
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY non configurée. Veuillez renseigner votre clé Gemini pour activer l'IA." },
        { status: 500 }
      );
    }

    // Modèles Google Gemini officiels avec basculement automatique en cas de forte affluence (503 / high demand)
    const candidateModels = [
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite",
      "gemini-3-flash-preview"
    ];

    let rawJson: string | null = null;
    let lastError: any = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      for (const model of candidateModels) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
          if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
            rawJson = data.candidates[0].content.parts[0].text;
            break;
          }

          console.warn(`Modèle ${model} non disponible (${res.status}):`, data.error?.message);
          lastError = data.error?.message || `Erreur modèle ${model}`;
          // Petit délai avant de basculer
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err: any) {
          console.warn(`Exception sur le modèle ${model}:`, err.message);
          lastError = err.message;
        }
      }
      if (rawJson) break;
      // Pause avant la 2ème passe si tous les modèles étaient saturés
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    if (!rawJson) {
      throw new Error(lastError || "Les serveurs Gemini ont une micro-latence temporaire. Veuillez relancer.");
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
