import OpenAI from 'openai';
import { sql } from "@vercel/postgres";

// Instantiate the OpenAI client to use DeepSeek API
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

const COMES_SYSTEM_PROMPT = `Tu es l'Intelligence Artificielle du Cabinet d'Ingénierie de la Souveraineté "Briser les Frontières". 
Ton rôle est de rédiger des correspondances et des newsletters sous la direction de l'Ingénieur Mounir BYAR.
Ton ton doit être:
- Froid, incisif, analytique et extrêmement précis.
- Autoritaire mais juste, inspiré par la rigueur du "Protocole C.O.M.E.S." (Ingénierie comportementale, lutte contre l'entropie, discipline du Nafs).
- Tu dois utiliser un vocabulaire empruntant à l'ingénierie des systèmes, la souveraineté, et la spiritualité islamique (Nafs, Khuchu, Salat, Khalifa, Dhuhr, Fajr, etc.).
- Ne montre aucune "empathie molle" (pas de "je vous comprends", "bon courage", etc.). Tu es là pour restructurer les fondations de l'homme moderne, pas pour le materner.
- Les textes doivent être formatés en HTML simple pour un envoi direct par email (utilise des balises <p>, <strong>, <br>, <ul>, etc. Pas de Markdown markdown. Juste l'intérieur du <body>, sans balise <html> ou <body>).`;

/**
 * Génère un brouillon de newsletter hebdomadaire et le stocke en base de données pour validation.
 */
export async function generateWeeklyNewsletterDraft(theme: string = "Fatigue décisionnelle et Entropie") {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: COMES_SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `Rédige une newsletter hebdomadaire intense sur le thème suivant : "${theme}". 
L'objectif final de cette newsletter est de convaincre le lecteur qu'il a besoin d'une restructuration totale via notre Mentorat de 9 mois, et de le pousser à cliquer sur le lien vers /contact. 
Fais en sorte que le texte soit court (max 400 mots), percutant, et structuré avec des balises HTML. 
Termine par "Mounir BYAR - Ingénieur & Fondateur du Cabinet".` 
        }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "";
    
    // Create draft in DB
    const id = `draft_${Math.random().toString(36).substr(2, 9)}`;
    const subject = `BLF | Ingénierie Hebdomadaire : ${theme}`;
    
    await sql`
      INSERT INTO ai_drafts (id, type, recipient_email, subject, content_html, status)
      VALUES (${id}, 'newsletter', 'ALL_SUBSCRIBERS', ${subject}, ${content}, 'pending')
    `;

    return { success: true, draftId: id };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { success: false, error };
  }
}

/**
 * Génère une réponse brouillon à un message de contact
 */
export async function generateContactReplyDraft(userEmail: string, userMessage: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: COMES_SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `Un prospect (${userEmail}) nous a envoyé ce message via le formulaire de contact : "${userMessage}".
Rédige une réponse professionnelle et implacable. Analyse rapidement son niveau d'entropie d'après son message. S'il semble prêt, invite-le à réserver un appel d'interposition pour le Mentorat. Sinon, renvoie-le vers des bases. Format HTML pur.` 
        }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "";
    
    // Create draft in DB
    const id = `draft_${Math.random().toString(36).substr(2, 9)}`;
    const subject = `Re: Votre demande au Cabinet Briser les Frontières`;
    
    await sql`
      INSERT INTO ai_drafts (id, type, recipient_email, subject, content_html, status)
      VALUES (${id}, 'reply', ${userEmail}, ${subject}, ${content}, 'pending')
    `;

    return { success: true, draftId: id };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { success: false, error };
  }
}
