import nodemailer from "nodemailer";

// Configuration du transporteur SMTP (à renseigner dans .env.local)
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
const SMTP_FROM = process.env.SMTP_FROM || '"BLF Plateforme" <noreply@briserlesfrontieres.fr>';
const SMTP_TO = process.env.SMTP_TO || "contact@briserlesfrontieres.fr";

// Crée le transporteur uniquement si la configuration est présente
function getTransporter() {
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
