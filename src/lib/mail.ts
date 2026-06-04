import nodemailer from "nodemailer";

// Configuration du transporteur SMTP (à renseigner dans .env.local)
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
export const SMTP_FROM = process.env.SMTP_FROM || '"Cabinet BLF" <info@briserlesfrontieres.fr>';
const SMTP_TO = process.env.SMTP_TO || "info@briserlesfrontieres.fr";

// Crée le transporteur uniquement si la configuration est présente
export function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    tls: {
      // Évite les rejets de certificats SSL auto-signés ou invalides fréquents chez certains hébergeurs
      rejectUnauthorized: false,
    },
  });
}

const auditQuestions = [
  "Dispersion Numérique (Temps quotidien d'écran récréatif)",
  "Fatigue Décisionnelle (Brouillard mental l'après-midi)",
  "Constance de la Prière (Organisation des 5 Salat)",
  "Discipline du Nafs (Résistance aux distractions immédiates)",
  "Environnement Spatial (Ordre et pureté sémantique du bureau/foyer)",
  "Muhasaba / Introspection (Bilan écrit quotidien)",
  "Mandat de Khalifa (Alignement professionnel sur la mission)",
  "Clarté Cognitive (Présence d'esprit / Khuchu dans les tâches/Salat)"
];

/**
 * Envoie un email formaté pour un nouvel audit de souveraineté cognitive
 */
export async function sendAuditEmail(audit: {
  nom: string;
  email: string;
  score: number;
  responses: Record<string, string | number>;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] Configuration SMTP manquante. Impossible d'envoyer l'email d'audit pour ${audit.nom} (${audit.email}).`);
    return { success: false, message: "SMTP non configuré" };
  }

  // Formater les réponses en HTML
  let responsesHtml = "";
  Object.entries(audit.responses).forEach(([key, value]) => {
    const questionIndex = parseInt(key, 10);
    const questionTitle = auditQuestions[questionIndex] || `Question ${key}`;
    const points = parseFloat(value.toString());
    
    // Déterminer une appréciation textuelle basée sur les points
    let quality = "Nulle / Faible";
    let color = "#ef4444";
    if (points >= 10) {
      quality = "Excellente / Totale";
      color = "#10b981";
    } else if (points >= 7) {
      quality = "Modérée / Régulière";
      color = "#e8c468";
    } else if (points >= 3) {
      quality = "Instable";
      color = "#f59e0b";
    }

    responsesHtml += `
      <div style="margin-bottom: 15px; padding: 12px; border-left: 3px solid ${color}; background-color: #1a2436; border-radius: 2px;">
        <p style="margin: 0 0 5px 0; font-size: 13px; color: #a0aec0; font-weight: bold;">${questionTitle}</p>
        <p style="margin: 0; font-size: 14px; color: #f0ede8;">Score : <strong style="color: ${color};">${points} / 12.5</strong> (${quality})</p>
      </div>
    `;
  });

  const getScoreAssessment = (score: number) => {
    if (score < 30) return { title: "Entropie Cognitive Sévère", color: "#ef4444" };
    if (score < 60) return { title: "Instabilité Comportementale", color: "#f59e0b" };
    if (score < 85) return { title: "Rectitude en Construction", color: "#10b981" };
    return { title: "Souveraineté Cognitive Alignée", color: "#d4a853" };
  };

  const assessment = getScoreAssessment(audit.score);

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-w: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.2); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 300; letter-spacing: 1px; color: #f0ede8;">Bilan de Souveraineté Cognitive</h2>
      </div>
      
      <div style="background-color: #0d1b2a; border: 1px solid rgba(160, 174, 192, 0.1); padding: 20px; border-radius: 4px; margin-bottom: 25px;">
        <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #10b981; font-weight: bold;">Nouveau Bilan Reçu</p>
        <p style="margin: 0 0 5px 0; font-size: 16px; color: #f0ede8;"><strong>Candidat :</strong> ${audit.nom}</p>
        <p style="margin: 0 0 5px 0; font-size: 14px; color: #a0aec0;"><strong>Email :</strong> <a href="mailto:${audit.email}" style="color: #d4a853; text-decoration: none;">${audit.email}</a></p>
        <p style="margin: 15px 0 5px 0; font-size: 14px; color: #a0aec0;"><strong>Indice de Souveraineté :</strong></p>
        <div style="font-size: 32px; font-weight: bold; color: #d4a853; margin-bottom: 5px;">${audit.score}%</div>
        <p style="margin: 0; font-size: 13px; color: ${assessment.color}; font-weight: bold;">Statut : ${assessment.title}</p>
      </div>

      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #a0aec0; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 8px; margin-bottom: 15px;">Détail des Réponses</h3>
        ${responsesHtml}
      </div>

      <div style="border-t: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0;">
        <p style="margin: 0;">Plateforme BLF — Ingénierie de la Souveraineté</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `📊 Nouveau Bilan BLF : ${audit.nom} (${audit.score}%)`,
      html: htmlContent,
    });
    return { success: true, message: "Email d'audit envoyé" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email d'audit :", error);
    return { success: false, message: "Erreur lors de l'envoi SMTP" };
  }
}

/**
 * Envoie un email formaté pour une nouvelle candidature au mentorat (avec coordonnées complètes)
 */
export async function sendCandidatureEmail(candidature: {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  fatigueDecisionnelle: string;
  chargeAllostatique: string;
  salatImpact: string;
  interpositionAccord: boolean;
  motivation: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] Configuration SMTP manquante. Impossible d'envoyer l'email de candidature pour ${candidature.prenom} ${candidature.nom}.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-w: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.2); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 300; letter-spacing: 1px; color: #f0ede8;">Dossier de Qualification Reçu</h2>
      </div>
      
      <div style="background-color: #0d1b2a; border: 1px solid rgba(160, 174, 192, 0.1); padding: 20px; border-radius: 4px; margin-bottom: 25px;">
        <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #d4a853; font-weight: bold;">Candidature Mentorat 9 Mois</p>
        <h3 style="margin: 0 0 15px 0; font-size: 20px; color: #f0ede8; font-weight: 300;">${candidature.prenom} ${candidature.nom}</h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #f0ede8;">
          <tr>
            <td style="padding: 6px 0; color: #a0aec0; width: 40%;"><strong>Email :</strong></td>
            <td style="padding: 6px 0;"><a href="mailto:${candidature.email}" style="color: #d4a853; text-decoration: none;">${candidature.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Téléphone :</strong></td>
            <td style="padding: 6px 0; color: #f0ede8;">${candidature.telephone || "Non fourni"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Adresse :</strong></td>
            <td style="padding: 6px 0; color: #f0ede8;">${candidature.adresse || "Non fournie"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Code Postal :</strong></td>
            <td style="padding: 6px 0;">${candidature.codePostal || "Non fourni"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Ville / Localité :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase;">${candidature.ville || "Non fournie"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Fatigue Décisionnelle :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase; color: #e8c468;"><strong>${candidature.fatigueDecisionnelle}</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Charge Allostatique :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase; color: #e8c468;"><strong>${candidature.chargeAllostatique}</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Impact sur As-Salat :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase; color: #e8c468;"><strong>${candidature.salatImpact}</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Accord Interposition :</strong></td>
            <td style="padding: 6px 0; color: #10b981; font-weight: bold;">${candidature.interpositionAccord ? "OUI (ACCEPTÉ)" : "NON"}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #a0aec0; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 8px; margin-bottom: 15px;">Motivations du Candidat</h3>
        <div style="background-color: #1a2436; padding: 15px; border-radius: 4px; font-size: 13px; color: #f0ede8; line-height: 1.6; border: 1px solid rgba(160, 174, 192, 0.05); white-space: pre-wrap;">${candidature.motivation}</div>
      </div>

      <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
        <a href="https://www.briserlesfrontieres.fr/admin" style="display: inline-block; padding: 12px 24px; background-color: #d4a853; color: #0a1128; font-weight: bold; text-decoration: none; border-radius: 2px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Consulter dans la Console Admin ➔</a>
      </div>

      <div style="border-t: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0;">
        <p style="margin: 0;">Plateforme BLF — Ingénierie de la Souveraineté</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `✉️ Nouvelle Candidature Mentorat : ${candidature.prenom} ${candidature.nom}`,
      html: htmlContent,
    });
    // Envoyer également un email de remerciement et confirmation au client
    await sendClientCandidatureThankYou(candidature.email, candidature.prenom, candidature.nom).catch((err) => {
      console.error("Échec d'envoi du mail de remerciement candidature client en arrière-plan :", err);
    });
    return { success: true, message: "Email de candidature envoyé" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de candidature :", error);
    return { success: false, message: "Erreur lors de l'envoi SMTP" };
  }
}

/**
 * Envoie un email contenant le code OTP de sécurité pour se connecter à la console d'administration.
 * Envoyé strictement sur byarmounir@gmail.com
 */
export async function sendAdminOtpEmail(otpCode: string) {
  const transporter = getTransporter();
  const targetEmail = "byarmounir@gmail.com";
  
  if (!transporter) {
    console.warn(`[SMTP] Configuration SMTP manquante. Impossible d'envoyer le code OTP de sécurité à ${targetEmail}.`);
    console.log(`[SECURITY CODE OTP DIRECT IN LOGS]: ${otpCode}`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 40px 30px; max-w: 500px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 30px;">
        <span style="font-size: 26px; font-weight: bold; letter-spacing: 5px; color: #d4a853;">BLF SECURE</span>
        <h2 style="margin: 10px 0 0 0; font-size: 14px; font-weight: 300; letter-spacing: 2px; color: #a0aec0; text-transform: uppercase;">Double Authentification Administrateur</h2>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-size: 14px; color: #f0ede8; margin-bottom: 20px; line-height: 1.5;">
          Une tentative de connexion a été détectée sur la console d'administration.<br>
          Veuillez utiliser le code à usage unique ci-dessous pour déverrouiller l'accès :
        </p>
        
        <div style="background-color: #0d1b2a; border: 1px solid rgba(212, 168, 83, 0.2); border-radius: 4px; padding: 20px; display: inline-block; margin: 10px auto;">
          <span style="font-size: 36px; font-weight: bold; color: #d4a853; letter-spacing: 8px; font-family: monospace; display: block; padding-left: 8px;">${otpCode}</span>
        </div>
        
        <p style="font-size: 12px; color: #ef4444; font-weight: bold; margin-top: 20px;">
          Ce code est strictement confidentiel et expirera dans 10 minutes.
        </p>
      </div>

      <div style="border-t: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.3);">Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail et sécuriser votre mot de passe d'accès.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: targetEmail,
      subject: `🛡️ Code de Sécurité Administration BLF : ${otpCode}`,
      html: htmlContent,
    });
    return { success: true, message: "Code OTP envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi du code OTP par e-mail :", error);
    return { success: false, message: "Échec de l'envoi SMTP" };
  }
}

/**
 * Envoie un e-mail formaté pour un nouveau message de contact cabinet
 */
export async function sendContactEmail(contact: {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  typeRelation: string;
  formuleAccompagnement: string;
  livreSelection: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] Configuration SMTP manquante. Impossible d'envoyer l'email de contact pour ${contact.prenom} ${contact.nom}.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-w: 600px; margin: 0 auto; border: 1px solid rgba(160, 174, 192, 0.1); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 300; letter-spacing: 1px; color: #f0ede8;">Sollicitation Cabinet Reçue</h2>
      </div>

      <div style="background-color: #0d1b2a; border: 1px solid rgba(160, 174, 192, 0.1); padding: 20px; border-radius: 4px; margin-bottom: 25px;">
        <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #10b981; font-weight: bold;">Nouveau Message</p>
        <h3 style="margin: 0 0 15px 0; font-size: 20px; color: #f0ede8; font-weight: 300;">${contact.prenom} ${contact.nom}</h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #f0ede8;">
          <tr>
            <td style="padding: 6px 0; color: #a0aec0; width: 40%;"><strong>Email :</strong></td>
            <td style="padding: 6px 0;"><a href="mailto:${contact.email}" style="color: #d4a853; text-decoration: none;">${contact.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Téléphone :</strong></td>
            <td style="padding: 6px 0;">${contact.telephone || "Non fourni"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Adresse :</strong></td>
            <td style="padding: 6px 0;">${contact.adresse || "Non fournie"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Code Postal :</strong></td>
            <td style="padding: 6px 0;">${contact.codePostal || "Non fourni"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Ville :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase;">${contact.ville || "Non fournie"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Objet de la Demande :</strong></td>
            <td style="padding: 6px 0; color: #d4a853; font-weight: bold;">${contact.typeRelation}</td>
          </tr>
          ${contact.formuleAccompagnement && contact.formuleAccompagnement !== "aucune" ? `
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Format Accompagnement :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase;">${contact.formuleAccompagnement}</td>
          </tr>` : ""}
          ${contact.livreSelection && contact.livreSelection !== "aucun" ? `
          <tr>
            <td style="padding: 6px 0; color: #a0aec0;"><strong>Ouvrage sélectionné :</strong></td>
            <td style="padding: 6px 0; text-transform: uppercase;">${contact.livreSelection}</td>
          </tr>` : ""}
        </table>
      </div>

      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #a0aec0; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 8px; margin-bottom: 15px;">Message Situationnel</h3>
        <div style="background-color: #1a2436; padding: 15px; border-radius: 4px; font-size: 13px; color: #f0ede8; line-height: 1.6; border: 1px solid rgba(160, 174, 192, 0.05); white-space: pre-wrap;">${contact.message}</div>
      </div>

      <div style="border-t: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0;">
        <p style="margin: 0;">Plateforme BLF — Ingénierie de la Souveraineté</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `✉️ Nouveau Message Cabinet : ${contact.prenom} ${contact.nom} (${contact.typeRelation})`,
      html: htmlContent,
    });
    // Envoyer également un email de remerciement et confirmation au client
    await sendClientContactThankYou(contact.email, contact.prenom, contact.nom).catch((err) => {
      console.error("Échec d'envoi du mail de remerciement contact client en arrière-plan :", err);
    });
    return { success: true, message: "Email de contact envoyé" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de contact :", error);
    return { success: false, message: "Erreur SMTP" };
  }
}

/**
 * Envoie un email formaté pour une nouvelle prestation offerte (Gift)
 */
export async function sendGiftEmail(gift: {
  offrant: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    codePostal: string;
    ville: string;
  };
  beneficiaire: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    codePostal: string;
    ville: string;
    relation: string;
  };
  prestation: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] Configuration SMTP manquante. Impossible d'envoyer l'email de cadeau de la part de ${gift.offrant.prenom} ${gift.offrant.nom}.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-w: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF CADEAU</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #f0ede8;">Achat d'une Prestation pour un Tiers</h2>
      </div>

      <div style="background-color: #0d1b2a; border: 1px solid rgba(160, 174, 192, 0.1); padding: 15px; border-radius: 4px; margin-bottom: 20px; text-align: center;">
        <span style="font-size: 11px; text-transform: uppercase; color: #d4a853; font-weight: bold; letter-spacing: 1.5px; display: block;">Prestation Offerte</span>
        <strong style="font-size: 18px; color: #f0ede8; display: block; margin-top: 5px; text-transform: uppercase;">${gift.prestation}</strong>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #d4a853; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 5px; margin-bottom: 10px;">L'Offrant (Donateur)</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #f0ede8;">
          <tr>
            <td style="padding: 4px 0; color: #a0aec0; width: 35%;"><strong>Nom Prénom :</strong></td>
            <td style="padding: 4px 0; text-transform: uppercase;"><strong>${gift.offrant.prenom} ${gift.offrant.nom}</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Email :</strong></td>
            <td style="padding: 4px 0;"><a href="mailto:${gift.offrant.email}" style="color: #f0ede8; text-decoration: none;">${gift.offrant.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Téléphone :</strong></td>
            <td style="padding: 4px 0;">${gift.offrant.telephone || "Non fourni"}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Adresse complète :</strong></td>
            <td style="padding: 4px 0;">${gift.offrant.adresse || "Non fournie"}, ${gift.offrant.codePostal || ""} ${gift.offrant.ville || ""}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #10b981; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 5px; margin-bottom: 10px;">Le Bénéficiaire (Destinataire)</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #f0ede8;">
          <tr>
            <td style="padding: 4px 0; color: #a0aec0; width: 35%;"><strong>Nom Prénom :</strong></td>
            <td style="padding: 4px 0; text-transform: uppercase;"><strong>${gift.beneficiaire.prenom} ${gift.beneficiaire.nom}</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Relation :</strong></td>
            <td style="padding: 4px 0; text-transform: uppercase; color: #d4a853;"><strong>${gift.beneficiaire.relation}</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Email :</strong></td>
            <td style="padding: 4px 0;"><a href="mailto:${gift.beneficiaire.email}" style="color: #f0ede8; text-decoration: none;">${gift.beneficiaire.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Téléphone :</strong></td>
            <td style="padding: 4px 0;">${gift.beneficiaire.telephone || "Non fourni"}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #a0aec0;"><strong>Adresse complète :</strong></td>
            <td style="padding: 4px 0;">${gift.beneficiaire.adresse || "Non fournie"}, ${gift.beneficiaire.codePostal || ""} ${gift.beneficiaire.ville || ""}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #a0aec0; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 5px; margin-bottom: 10px;">Message d'Accompagnement</h3>
        <div style="background-color: #1a2436; padding: 12px; border-radius: 4px; font-size: 12px; color: #f0ede8; line-height: 1.5; font-style: italic; white-space: pre-wrap;">"${gift.message}"</div>
      </div>

      <div style="border-t: 1px solid rgba(160, 174, 192, 0.1); padding-top: 15px; text-align: center; font-size: 11px; color: #a0aec0;">
        <p style="margin: 0;">Plateforme BLF — Offre de Prestation à un Tiers</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      </div>
    </div>
  `;

  try {
    // Envoyer à la fois à contact@briserlesfrontieres.fr et en copie cachée ou copie à byarmounir@gmail.com
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      cc: "byarmounir@gmail.com",
      subject: `🎁 Prestation Offerte BLF : de ${gift.offrant.prenom} pour ${gift.beneficiaire.prenom} (${gift.prestation})`,
      html: htmlContent,
    });
    return { success: true, message: "Email de prestation offerte envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email cadeau :", error);
    return { success: false, message: "Erreur SMTP" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FONCTIONS DE REMERCIEMENT ET CONFIRMATION CLIENT (AUTOMATIQUES)
// ─────────────────────────────────────────────────────────────────────────────

async function sendClientCandidatureThankYou(email: string, prenom: string, nom: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.2); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #f0ede8;">Candidature Reçue</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam ${prenom},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous vous remercions pour l'intérêt que vous portez au protocole d'accompagnement de 9 mois du **Cabinet de Pilotage de la Souveraineté**.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Votre dossier de candidature a bien été enregistré. L'Ingénieur Mounir BYAR l'examinera personnellement sous 48 heures afin d'évaluer l'alignement de vos motivations et de vos engagements.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Si votre profil est retenu, nous vous contacterons pour planifier votre entretien d'interposition stratégique.
      </p>
      <div style="margin: 30px 0; padding: 15px; border-left: 2px solid #d4a853; background-color: #0d1b2a; font-size: 12px; color: #f0ede8; font-style: italic;">
        « Reprendre la pleine maîtrise de votre attention et de votre environnement matériel n'est pas une option, c'est une exigence du mandat terrestre de Khalifa. »
      </div>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 10px 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
        <p style="margin: 0; color: rgba(160, 174, 192, 0.4);">
          <a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a>
        </p>
      </div>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `🛡️ Cabinet BLF — Confirmation de réception de candidature`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Erreur d'envoi du mail de remerciement candidature au client :", err);
  }
}

async function sendClientContactThankYou(email: string, prenom: string, nom: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(160, 174, 192, 0.1); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #f0ede8;">Sollicitation Reçue</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam ${prenom},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous vous remercions pour votre message transmis au Cabinet de Pilotage de la Souveraineté.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Votre demande a bien été enregistrée. Mounir BYAR étudiera vos coordonnées et vos observations pour vous répondre de manière ciblée sous 48 heures.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous attachons une importance primordiale à la discrétion et à la confidentialité. Vos coordonnées restent chiffrées de bout en bout et conservées en toute sécurité.
      </p>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      <p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\${encodeURIComponent(email)\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>
      </div>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `✉️ Cabinet BLF — Prise en compte de votre sollicitation`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Erreur d'envoi du mail de remerciement contact au client :", err);
  }
}

/**
 * Envoie un e-mail d'alerte sécurité en cas de blocage de l'administration suite à 3 échecs consécutifs.
 */
export async function sendAdminLockoutEmail() {
  const transporter = getTransporter();
  const targetEmail = "byarmounir@gmail.com";
  
  if (!transporter) {
    console.warn(`[SMTP] Configuration SMTP manquante. Impossible d'envoyer l'email d'avertissement de blocage.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 40px 30px; max-width: 500px; margin: 0 auto; border: 2px solid #ef4444; border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 30px;">
        <span style="font-size: 26px; font-weight: bold; letter-spacing: 5px; color: #ef4444;">ALERTE SÉCURITÉ</span>
        <h2 style="margin: 10px 0 0 0; font-size: 14px; font-weight: 300; letter-spacing: 2px; color: #a0aec0; text-transform: uppercase;">Blocage Console d'Administration</h2>
      </div>

      <div style="margin-bottom: 30px; line-height: 1.6;">
        <p style="font-size: 14px; color: #f0ede8;">
          <strong>Attention Mounir,</strong>
        </p>
        <p style="font-size: 14px; color: #f0ede8;">
          La console d'administration de votre site a été **bloquée pendant 2 heures** suite à **3 tentatives consécutives de saisie de code OTP erroné**.
        </p>
        <div style="background-color: #0d1b2a; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 4px; padding: 15px; margin: 20px 0; font-size: 13px;">
          <p style="margin: 0 0 5px 0;"><strong>Statut :</strong> Bloqué temporairement</p>
          <p style="margin: 0 0 5px 0;"><strong>Durée :</strong> 2 heures (120 minutes)</p>
          <p style="margin: 0;"><strong>Déblocage prévu :</strong> ${new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} (heure de l'activité)</p>
        </div>
        <p style="font-size: 12px; color: #a0aec0;">
          Si vous n'êtes pas à l'origine de ces tentatives, quelqu'un essaie d'accéder à votre console. Vos données de cohortes et candidatures restent parfaitement sécurisées.
        </p>
      </div>

      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.3);">© Briser les Frontières</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: targetEmail,
      subject: `🚨 ALERTE : Console Admin Bloquée (3 tentatives échouées)`,
      html: htmlContent,
    });
    return { success: true, message: "Alerte de sécurité envoyée avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'alerte de sécurité par e-mail :", error);
    return { success: false, message: "Échec de l'envoi de l'alerte SMTP" };
  }
}

/**
 * Envoie un email d'acceptation de candidature au mentorat 9 mois
 */
export async function sendCandidatureApprovedEmail(email: string, prenom: string, nom: string) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] SMTP non configuré pour acceptation candidature.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #f0ede8; text-transform: uppercase;">Félicitations — Candidature Acceptée</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam ${prenom},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous avons le plaisir de vous informer que votre dossier pour le mentorat d'accompagnement de 9 mois du **Cabinet de Pilotage de la Souveraineté** a été **accepté** personnellement par l'Ingénieur Mounir BYAR.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Votre rigueur, votre profil et vos réponses ont démontré un alignement fort avec le niveau d'exigence requis par le **Protocole C.O.M.E.S.**.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8; font-weight: bold; margin-top: 20px;">
        Quelle est la suite ?
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        L'Ingénieur ou un membre de notre équipe vous contactera **prochainement** par téléphone ou par e-mail pour planifier votre premier entretien d'interposition stratégique et initier votre parcours.
      </p>
      <div style="margin: 30px 0; padding: 15px; border-left: 2px solid #10b981; background-color: #0d1b2a; font-size: 12px; color: #10b981; font-style: italic; font-weight: bold;">
        « Vous êtes admis au protocole. Soyez prêt à réarchitecturer votre attention et à assumer votre mandat de Khalifa avec excellence. »
      </div>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      <p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\${encodeURIComponent(email)\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `🏆 Cabinet BLF — Votre candidature a été acceptée !`,
      html: htmlContent,
    });
    return { success: true, message: "Email d'acceptation de candidature envoyé" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email d'acceptation candidature :", error);
    return { success: false, message: "Erreur SMTP" };
  }
}

/**
 * Envoie un email de refus de candidature avec motif de décision
 */
export async function sendCandidatureRejectedEmail(email: string, prenom: string, nom: string, reason: string) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] SMTP non configuré pour refus candidature.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(160, 174, 192, 0.1); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #a0aec0;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #a0aec0; text-transform: uppercase;">Retour sur Candidature</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam ${prenom},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous vous remercions sincèrement d'avoir pris le temps de postuler au mentorat de 9 mois du **Cabinet de Pilotage de la Souveraineté** et d'avoir partagé vos motivations avec nous.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        L'Ingénieur Mounir BYAR a étudié avec beaucoup d'attention votre dossier. Malheureusement, au vu du nombre extrêmement limité de places disponibles au sein de la cohorte et de nos critères d'admissibilité comportementale, nous ne pouvons pas retenir votre candidature pour cette session.
      </p>
      <div style="margin: 25px 0; padding: 15px; border-left: 2px solid #ef4444; background-color: #1a2436; font-size: 13px; color: #f0ede8;">
        <strong style="color: #ef4444; display: block; margin-bottom: 5px;">Motif de la décision :</strong>
        <p style="margin: 0; white-space: pre-wrap; font-style: italic;">${reason || "Non spécifié."}</p>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous vous encourageons vivement à continuer à travailler sur les fondements du **Protocole C.O.M.E.S.** de manière autonome et à surveiller nos futures ouvertures de cohortes.
      </p>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      <p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\${encodeURIComponent(email)\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `✉️ Cabinet BLF — Décision relative à votre candidature`,
      html: htmlContent,
    });
    return { success: true, message: "Email de refus de candidature envoyé" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de refus candidature :", error);
    return { success: false, message: "Erreur SMTP" };
  }
}

/**
 * Envoie un email d'approbation cadeau de la part de l'offrant et à destination du bénéficiaire
 */
export async function sendGiftApprovedEmail(
  offrantEmail: string,
  beneficiaireEmail: string,
  offrantPrenom: string,
  offrantNom: string,
  beneficiairePrenom: string,
  beneficiaireNom: string,
  prestation: string
) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] SMTP non configuré pour acceptation cadeau.`);
    return { success: false, message: "SMTP non configuré" };
  }

  // 1. Envoyer l'email d'invitation cadeau au proche (le bénéficiaire)
  const htmlBeneficiaire = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 40px 30px; max-width: 600px; margin: 0 auto; border: 2px solid #d4a853; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
      <div style="text-align: center; border-bottom: 1px solid rgba(212, 168, 83, 0.2); padding-bottom: 20px; margin-bottom: 30px;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #d4a853;">BLF CADEAU</span>
        <h2 style="margin: 10px 0 0 0; font-size: 14px; font-weight: 300; letter-spacing: 2px; color: #f0ede8; text-transform: uppercase;">Une invitation d'exception vous attend</h2>
      </div>
      <p style="font-size: 15px; line-height: 1.6; color: #f0ede8;">Salam ${beneficiairePrenom},</p>
      <p style="font-size: 15px; line-height: 1.6; color: #a0aec0;">
        Nous avons le plaisir de vous annoncer que votre ami(e) **${offrantPrenom} ${offrantNom}** vous a offert une prestation exclusive auprès du **Cabinet de Pilotage de la Souveraineté** :
      </p>
      <div style="background-color: #0d1b2a; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px; padding: 25px; margin: 25px 0; text-align: center;">
        <span style="font-size: 11px; text-transform: uppercase; color: #d4a853; font-weight: bold; letter-spacing: 2px; display: block; margin-bottom: 5px;">Invitation Cadeau Validée</span>
        <strong style="font-size: 20px; color: #f0ede8; display: block; text-transform: uppercase; letter-spacing: 1px;">${prestation}</strong>
      </div>
      <p style="font-size: 15px; line-height: 1.6; color: #a0aec0;">
        Cette prestation a été personnellement approuvée par l'Ingénieur Mounir BYAR. Elle est maintenant active et prête à être planifiée.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #a0aec0;">
        L'Ingénieur ou un membre de notre cabinet vous contactera **prochainement** à cette adresse e-mail pour fixer avec vous la date de votre session et vous transmettre le protocole de préparation.
      </p>
      <div style="margin: 30px 0; padding: 15px; border-left: 2px solid #d4a853; background-color: #1a2436; font-size: 13px; color: #f0ede8; font-style: italic; border-radius: 2px;">
        « Offrir la souveraineté de l'esprit est le plus noble des présents. Reprenez la maîtrise de votre temps. »
      </div>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      <p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\${encodeURIComponent(email)\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>
      </div>
    </div>
  `;

  // 2. Envoyer l'email de confirmation à l'offrant (le donateur)
  const htmlOffrant = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF CADEAU</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #f0ede8; text-transform: uppercase;">Prestation Cadeau Approuvée</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam ${offrantPrenom},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous avons le plaisir de vous confirmer que votre commande cadeau pour **${beneficiairePrenom} ${beneficiaireNom}** a été **approuvée** par l'Ingénieur Mounir BYAR.
      </p>
      <div style="background-color: #0d1b2a; border: 1px solid rgba(160, 174, 192, 0.1); padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 13px;">
        <p style="margin: 0 0 5px 0;"><strong>Bénéficiaire :</strong> ${beneficiairePrenom} ${beneficiaireNom}</p>
        <p style="margin: 0 0 5px 0;"><strong>Prestation :</strong> ${prestation}</p>
        <p style="margin: 0;"><strong>Statut :</strong> Approuvé & Actif</p>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Un magnifique e-mail d'invitation cadeau vient d'être envoyé à **${beneficiairePrenom}** (${beneficiaireEmail}). Nous la planifierons très prochainement avec lui/elle.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous vous remercions pour votre confiance et pour ce magnifique geste d'excellence comportementale envers votre proche.
      </p>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      <p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\${encodeURIComponent(beneficiaireEmail)\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>
      </div>
    </div>
  `;

  try {
    // Envoi au bénéficiaire
    await transporter.sendMail({
      from: SMTP_FROM,
      to: beneficiaireEmail,
      subject: `🎁 Invitation Cadeau BLF : ${offrantPrenom} vous offre la prestation "${prestation}" !`,
      html: htmlBeneficiaire,
    });

    // Envoi à l'offrant
    await transporter.sendMail({
      from: SMTP_FROM,
      to: offrantEmail,
      subject: `🎁 Cabinet BLF — Votre commande cadeau pour ${beneficiairePrenom} est validée`,
      html: htmlOffrant,
    });

    return { success: true, message: "E-mails cadeaux envoyés aux deux parties" };
  } catch (error) {
    console.error("Erreur lors de l'envoi des e-mails cadeaux approuvés :", error);
    return { success: false, message: "Erreur lors de l'envoi SMTP" };
  }
}

/**
 * Envoie un email de refus cadeau avec explications à l'offrant pour remboursement
 */
export async function sendGiftRejectedEmail(
  offrantEmail: string,
  offrantPrenom: string,
  offrantNom: string,
  beneficiairePrenom: string,
  beneficiaireNom: string,
  prestation: string,
  reason: string
) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`[SMTP] SMTP non configuré pour refus cadeau.`);
    return { success: false, message: "SMTP non configuré" };
  }

  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(160, 174, 192, 0.1); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #a0aec0;">BLF CADEAU</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #a0aec0; text-transform: uppercase;">Annulation Commande Cadeau</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam ${offrantPrenom},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Nous vous remercions pour votre demande de prestation cadeau « **${prestation}** » destinée à **${beneficiairePrenom} ${beneficiaireNom}**.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        L'Ingénieur Mounir BYAR étudie attentivement chaque demande de prestation, y compris celles destinées à des tiers, afin de s'assurer de la pertinence comportementale et de l'alignement avec les exigences du Cabinet.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Après examen, nous avons le regret de vous informer que nous ne pouvons pas honorer cette prestation cadeau.
      </p>
      <div style="margin: 25px 0; padding: 15px; border-left: 2px solid #ef4444; background-color: #1a2436; font-size: 13px; color: #f0ede8;">
        <strong style="color: #ef4444; display: block; margin-bottom: 5px;">Motif de la décision :</strong>
        <p style="margin: 0; white-space: pre-wrap; font-style: italic;">${reason || "Non spécifié."}</p>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8; font-weight: bold; margin-top: 20px;">
        Remboursement intégral :
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Aucun montant ne sera débité ou un remboursement intégral de votre transaction sera initié sous 48 heures. Vous n'avez aucune démarche à entreprendre.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0; margin-top: 15px;">
        Nous restons à votre entière disposition pour tout échange complémentaire.
      </p>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 30px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 0 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
      <p style="margin: 10px 0 0 0; color: rgba(160, 174, 192, 0.4);"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=\${encodeURIComponent(offrantEmail)\}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a></p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: offrantEmail,
      subject: `🎁 Cabinet BLF — Annulation et remboursement de votre prestation cadeau`,
      html: htmlContent,
    });
    return { success: true, message: "Email de refus de cadeau envoyé à l'offrant" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de refus de cadeau :", error);
    return { success: false, message: "Erreur SMTP" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAILS DE TUNNEL (PHASE 3) : BIENVENUE, FAJR, HEBDOMADAIRE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Envoie un email de Bienvenue puissant et incisif lors de l'inscription
 */
export async function sendWelcomeEmail(email: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.2); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px; color: #f0ede8; text-transform: uppercase;">Entrée dans le Protocole</h2>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam,</p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Vous venez de franchir la première étape. Celle de la prise de conscience.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        La majorité des hommes aujourd'hui subissent l'entropie : fatigue décisionnelle, dispersion numérique, prières bâclées ou manquées, et un mandat de Khalifa totalement délaissé au profit d'urgences futiles dictées par le Nafs.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        <strong>Briser les Frontières n'est pas une simple newsletter.</strong> C'est un cabinet d'ingénierie comportementale conçu pour restaurer votre souveraineté intellectuelle et spirituelle.
      </p>
      <div style="margin: 30px 0; padding: 15px; border-left: 2px solid #d4a853; background-color: #0d1b2a; font-size: 13px; color: #f0ede8;">
        <strong style="color: #d4a853; display: block; margin-bottom: 10px; text-transform: uppercase;">Ce que vous allez recevoir :</strong>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8; color: #a0aec0;">
          <li><strong style="color: #f0ede8;">L'Appel du Fajr :</strong> Chaque jour, à l'heure exacte du lever du soleil selon votre position géographique, un court rappel frappera votre boîte mail. Pour forger la discipline.</li>
          <li><strong style="color: #f0ede8;">L'Ingénierie Hebdomadaire :</strong> Un apport tactique hebdomadaire pour dompter votre environnement et aligner vos actions sur votre foi.</li>
        </ul>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Préparez-vous à revoir vos standards. L'exigence est totale.
      </p>
      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 40px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 10px 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
        <p style="margin: 0; color: rgba(160, 174, 192, 0.4);">
          <a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a>
        </p>
      </div>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `🛡️ BLF — Votre entrée dans le Protocole (À lire attentivement)`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Erreur d'envoi du mail de bienvenue :", err);
  }
}

/**
 * Envoie un email de rappel spirituel quotidien à l'heure du Fajr
 */
export async function sendFajrEmail(email: string, ville: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #050505; color: #f0ede8; padding: 40px; max-width: 500px; margin: 0 auto; border-top: 3px solid #d4a853;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: #d4a853; text-align: center; margin-bottom: 30px;">L'Heure du Fajr (${ville})</p>
      
      <p style="font-size: 15px; line-height: 1.8; color: #e5e5e5; text-align: center; font-style: italic;">
        "La prière est meilleure que le sommeil."
      </p>
      
      <div style="margin: 40px 0; height: 1px; background: linear-gradient(90deg, rgba(212,168,83,0) 0%, rgba(212,168,83,0.5) 50%, rgba(212,168,83,0) 100%);"></div>
      
      <p style="font-size: 13px; line-height: 1.6; color: #888888; text-align: center;">
        L'entropie commence dès le réveil. La façon dont vous répondez à cet appel définit l'entièreté de votre journée.<br><br>
        Levez-vous. Purifiez-vous. Assumez votre mandat.
      </p>
      
      <div style="margin-top: 50px; text-align: center; font-size: 10px; color: #444444; letter-spacing: 1px;">
        <p>Briser les Frontières — Ingénierie Comportementale</p>
        <p style="margin-top: 10px;"><a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #444444; text-decoration: underline;">Se désabonner</a></p>
      </div>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `🌅 As-Salat Khayrun Min An-Nawm (Fajr)`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Erreur d'envoi du mail Fajr :", err);
  }
}

/**
 * Envoie un email hebdomadaire de recommandation (Vente Mentorat)
 */
export async function sendWeeklyAdviceEmail(email: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  const htmlContent = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #0a1128; color: #f0ede8; padding: 30px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(212, 168, 83, 0.2); border-radius: 4px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(160, 174, 192, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #d4a853;">BLF</span>
        <h2 style="margin: 10px 0 0 0; font-size: 14px; font-weight: 300; letter-spacing: 2px; color: #a0aec0; text-transform: uppercase;">Ingénierie de la Souveraineté</h2>
      </div>
      
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8;">Salam,</p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Avez-vous remarqué comment les algorithmes, les notifications et le désordre spatial fragmentent votre attention ?
      </p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Ce n'est pas un accident. C'est une conception systémique. L'environnement moderne est architecturé pour épuiser votre <strong>fatigue décisionnelle</strong> avant même l'heure du Dhuhr. Résultat : des prières sans Khuchu, une procrastination chronique et un sentiment d'impuissance face à vos réelles obligations terrestres.
      </p>

      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        La seule réponse n'est pas la "motivation". La motivation est volatile, dictée par le Nafs. <strong>La vraie réponse est l'Ingénierie des Systèmes.</strong>
      </p>

      <div style="margin: 30px 0; padding: 20px; border: 1px solid rgba(212, 168, 83, 0.4); background-color: #0d1b2a; text-align: center; border-radius: 4px;">
        <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #d4a853;">Le Protocole C.O.M.E.S. (Mentorat 9 Mois)</h3>
        <p style="font-size: 13px; line-height: 1.6; color: #f0ede8; margin-bottom: 20px;">
          Je vous accompagne personnellement sur 9 mois pour déconstruire votre environnement entropique et réarchitecturer vos fondations temporelles, spatiales et spirituelles.
        </p>
        <a href="https://www.briserlesfrontieres.fr/contact" style="display: inline-block; padding: 12px 24px; background-color: #d4a853; color: #0a1128; font-weight: bold; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px;">
          POSTULER AU MENTORAT
        </a>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #a0aec0;">
        Attention : les places sont strictement limitées et soumises à une étude de votre profil lors d'un entretien d'interposition. Ce n'est pas une simple formation, c'est une restructuration profonde.
      </p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #f0ede8; font-weight: bold; margin-top: 30px;">
        Mounir BYAR<br>
        <span style="font-weight: normal; font-size: 12px; color: #a0aec0;">Ingénieur & Fondateur du Cabinet</span>
      </p>

      <div style="border-top: 1px solid rgba(160, 174, 192, 0.1); padding-top: 20px; text-align: center; font-size: 11px; color: #a0aec0; margin-top: 40px;">
        <p style="margin: 0;">Cabinet d'Ingénierie de la Souveraineté — Mounir BYAR</p>
        <p style="margin: 5px 0 10px 0; color: rgba(160, 174, 192, 0.4);">© ${new Date().getFullYear()} Briser les Frontières</p>
        <p style="margin: 0; color: rgba(160, 174, 192, 0.4);">
          <a href="https://www.briserlesfrontieres.fr/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #a0aec0; text-decoration: underline;">Se désabonner de nos communications</a>
        </p>
      </div>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `⚙️ Ingénierie Comportementale : Maîtrisez-vous votre environnement ?`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Erreur d'envoi du mail hebdomadaire :", err);
  }
}

