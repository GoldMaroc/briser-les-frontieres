import { sql } from "@vercel/postgres";
import crypto from "crypto";

export interface Subscriber {
  id: string;
  email: string;
  latitude?: number | null;
  longitude?: number | null;
  ville?: string | null;
  created_at: string;
}

export interface Candidature {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  localisation: string; // Gardé pour rétrocompatibilité
  fatigueDecisionnelle: string;
  chargeAllostatique: string;
  salatImpact: string;
  interpositionAccord: boolean;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Audit {
  id: string;
  nom: string;
  email: string;
  score: number;
  responses: Record<string, string>;
  created_at: string;
}

export interface SubmittedTestimonial {
  id: string;
  nom: string;
  categorie: 'homme' | 'femme' | 'famille' | 'groupe';
  periode: string;
  message: string;
  localisation?: string;
  approved: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
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
  created_at: string;
}

export interface GiftRequest {
  id: string;
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
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export type PubStatus = 'draft' | 'pending_validation' | 'to_modify' | 'approved' | 'published' | 'cancelled';
export type PubGoal = 'convertir' | 'informer' | 'fideliser' | 'communaute';

export interface Publication {
  id: string;
  titre: string;
  theme: string;
  objectif: PubGoal;
  attente: string;
  content: string;
  platforms: string[]; // ['X', 'linkedin', 'telegram', 'facebook']
  status: PubStatus;
  scheduled_for: string; // Date de publication prévue (ISO string)
  created_at: string;
  published_at?: string;
  ai_feedback?: string; 
}

export interface AdminSession {
  tokenHash: string;
  expiresAt: string;
}

export interface AdminLockout {
  failedAttempts: number;
  lockedUntil: string | null;
}

interface DatabaseSchema {
  subscribers: Subscriber[];
  candidatures: Candidature[];
  audits: Audit[];
  testimonials: SubmittedTestimonial[];
  contacts: ContactMessage[];
  gifts: GiftRequest[];
  publications: Publication[];
  adminOtp: {
    code: string;
    expires_at: string;
  } | null;
  adminSessions: AdminSession[];
  adminLockout: AdminLockout;
  socialTokens?: {
    linkedin_access_token?: string;
    linkedin_urn?: string;
  };
}


// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES ABONNÉS NEWSLETTER
// ─────────────────────────────────────────────────────────────────────────────

export async function addSubscriber(
  email: string,
  latitude: number | null = null,
  longitude: number | null = null,
  ville: string | null = null
): Promise<{ success: boolean; message: string }> {
  try {
    const lowerEmail = email.toLowerCase().trim();
    
    // Check exists
    const { rows } = await sql`SELECT id FROM subscribers WHERE email = ${lowerEmail} LIMIT 1`;
    if (rows.length > 0) {
      // If already exists, we might want to update location, but for now we skip
      return { success: true, message: "Déjà inscrit à la newsletter premium." };
    }

    const id = `sub_${Math.random().toString(36).substr(2, 9)}`;
    await sql`
      INSERT INTO subscribers (id, email, latitude, longitude, ville)
      VALUES (${id}, ${lowerEmail}, ${latitude}, ${longitude}, ${ville})
    `;
    return { success: true, message: "Inscription newsletter enregistrée avec succès." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur technique d'écriture en base." };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES CANDIDATURES
// ─────────────────────────────────────────────────────────────────────────────

export async function addCandidature(
  data: Omit<Candidature, "id" | "status" | "created_at" | "localisation">
): Promise<{ success: boolean; id?: string; message: string }> {
  try {
    const lowerEmail = data.email.toLowerCase().trim();

    // Check pending
    const { rows } = await sql`
      SELECT id FROM candidatures WHERE email = ${lowerEmail} AND status = 'pending' LIMIT 1
    `;
    if (rows.length > 0) {
      return { success: false, message: "Vous avez déjà un dossier en cours d'examen." };
    }

    const id = `cand_${Math.random().toString(36).substr(2, 9)}`;
    const localisation = data.ville;

    await sql`
      INSERT INTO candidatures (id, nom, prenom, email, telephone, adresse, codePostal, ville, localisation, fatigueDecisionnelle, chargeAllostatique, salatImpact, interpositionAccord, motivation, status)
      VALUES (${id}, ${data.nom}, ${data.prenom}, ${lowerEmail}, ${data.telephone}, ${data.adresse}, ${data.codePostal}, ${data.ville}, ${localisation}, ${data.fatigueDecisionnelle}, ${data.chargeAllostatique}, ${data.salatImpact}, ${data.interpositionAccord}, ${data.motivation}, 'pending')
    `;

    return { success: true, id, message: "Candidature enregistrée avec succès." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur technique lors de l'enregistrement de la candidature." };
  }
}

export async function updateCandidatureStatus(id: string, status: "approved" | "rejected" | "pending"): Promise<boolean> {
  try {
    const res = await sql`UPDATE candidatures SET status = ${status} WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteCandidature(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM candidatures WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES AUDITS DE SOUVERAINETÉ
// ─────────────────────────────────────────────────────────────────────────────

export async function addAudit(
  nom: string,
  email: string,
  score: number,
  responses: Record<string, string>
): Promise<{ success: boolean; id?: string; message: string }> {
  try {
    const id = `aud_${Math.random().toString(36).substr(2, 9)}`;
    await sql`
      INSERT INTO audits (id, nom, email, score, responses)
      VALUES (${id}, ${nom.trim()}, ${email.toLowerCase().trim()}, ${score}, ${JSON.stringify(responses)})
    `;
    return { success: true, id, message: "Audit persistant enregistré." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur d'écriture de l'audit en base." };
  }
}

export async function deleteAudit(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM audits WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES MESSAGES DE CONTACT
// ─────────────────────────────────────────────────────────────────────────────

export async function addContact(
  data: Omit<ContactMessage, "id" | "created_at">
): Promise<{ success: boolean; id?: string; message: string }> {
  try {
    const id = `cont_${Math.random().toString(36).substr(2, 9)}`;
    await sql`
      INSERT INTO contacts (id, nom, prenom, email, telephone, adresse, codePostal, ville, typeRelation, formuleAccompagnement, livreSelection, message)
      VALUES (${id}, ${data.nom}, ${data.prenom}, ${data.email}, ${data.telephone}, ${data.adresse}, ${data.codePostal}, ${data.ville}, ${data.typeRelation}, ${data.formuleAccompagnement}, ${data.livreSelection}, ${data.message})
    `;
    return { success: true, id, message: "Message de contact enregistré avec succès." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur d'écriture du message en base." };
  }
}

export async function deleteContact(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM contacts WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES PRESTATIONS CADEAUX (GIFTS)
// ─────────────────────────────────────────────────────────────────────────────

export async function addGift(
  data: Omit<GiftRequest, "id" | "created_at" | "status">
): Promise<{ success: boolean; id?: string; message: string }> {
  try {
    const id = `gift_${Math.random().toString(36).substr(2, 9)}`;
    await sql`
      INSERT INTO gifts (id, offrant_nom, offrant_prenom, offrant_email, offrant_telephone, offrant_adresse, offrant_codePostal, offrant_ville, beneficiaire_nom, beneficiaire_prenom, beneficiaire_email, beneficiaire_telephone, beneficiaire_adresse, beneficiaire_codePostal, beneficiaire_ville, beneficiaire_relation, prestation, message, status)
      VALUES (${id}, ${data.offrant.nom}, ${data.offrant.prenom}, ${data.offrant.email}, ${data.offrant.telephone}, ${data.offrant.adresse}, ${data.offrant.codePostal}, ${data.offrant.ville}, ${data.beneficiaire.nom}, ${data.beneficiaire.prenom}, ${data.beneficiaire.email}, ${data.beneficiaire.telephone}, ${data.beneficiaire.adresse}, ${data.beneficiaire.codePostal}, ${data.beneficiaire.ville}, ${data.beneficiaire.relation}, ${data.prestation}, ${data.message}, 'pending')
    `;
    return { success: true, id, message: "Demande de cadeau enregistrée avec succès." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur d'écriture du cadeau en base." };
  }
}

export async function deleteGift(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM gifts WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateGiftStatus(id: string, status: "approved" | "rejected" | "pending"): Promise<boolean> {
  try {
    const res = await sql`UPDATE gifts SET status = ${status} WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCÈS UNIFIÉ ADMIN
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminDbData(): Promise<DatabaseSchema> {
  try {
    const [
      { rows: subscribers },
      { rows: candidatures },
      { rows: audits },
      { rows: testimonials },
      { rows: contacts },
      { rows: giftsRaw },
      { rows: publications },
      { rows: adminOtpRows },
      { rows: adminLockoutRows },
      { rows: socialTokensRows },
      { rows: adminSessions }
    ] = await Promise.all([
      sql`SELECT * FROM subscribers`,
      sql`SELECT * FROM candidatures`,
      sql`SELECT * FROM audits`,
      sql`SELECT * FROM testimonials`,
      sql`SELECT * FROM contacts`,
      sql`SELECT * FROM gifts`,
      sql`SELECT * FROM publications`,
      sql`SELECT value FROM admin_config WHERE key = 'adminOtp'`,
      sql`SELECT value FROM admin_config WHERE key = 'adminLockout'`,
      sql`SELECT value FROM admin_config WHERE key = 'socialTokens'`,
      sql`SELECT * FROM admin_sessions`
    ]);

    // Reconstruct gifts
    const gifts = giftsRaw.map(g => ({
      id: g.id,
      offrant: {
        nom: g.offrant_nom, prenom: g.offrant_prenom, email: g.offrant_email, telephone: g.offrant_telephone, adresse: g.offrant_adresse, codePostal: g.offrant_codepostal, ville: g.offrant_ville
      },
      beneficiaire: {
        nom: g.beneficiaire_nom, prenom: g.beneficiaire_prenom, email: g.beneficiaire_email, telephone: g.beneficiaire_telephone, adresse: g.beneficiaire_adresse, codePostal: g.beneficiaire_codepostal, ville: g.beneficiaire_ville, relation: g.beneficiaire_relation
      },
      prestation: g.prestation,
      message: g.message,
      status: g.status,
      created_at: g.created_at
    })) as GiftRequest[];

    const adminOtp = adminOtpRows.length ? adminOtpRows[0].value : null;
    const adminLockout = adminLockoutRows.length ? adminLockoutRows[0].value : { failedAttempts: 0, lockedUntil: null };
    const socialTokens = socialTokensRows.length ? socialTokensRows[0].value : {};

    return {
      subscribers: subscribers as Subscriber[],
      candidatures: candidatures as Candidature[],
      audits: audits as Audit[],
      testimonials: testimonials as SubmittedTestimonial[],
      contacts: contacts as ContactMessage[],
      gifts,
      publications: publications as Publication[],
      adminOtp,
      adminLockout,
      socialTokens,
      adminSessions: adminSessions.map(s => ({ tokenHash: s.tokenhash, expiresAt: s.expiresat }))
    };

  } catch (error) {
    console.error("Error getAdminDbData:", error);
    throw error;
  }
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM subscribers WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteSubscriberByEmail(email: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM subscribers WHERE email = ${email.toLowerCase().trim()}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES TÉMOIGNAGES SOUMIS
// ─────────────────────────────────────────────────────────────────────────────

export async function addSubmittedTestimonial(
  nom: string,
  categorie: 'homme' | 'femme' | 'famille' | 'groupe',
  periode: string,
  message: string,
  localisation?: string
): Promise<{ success: boolean; id?: string; message: string }> {
  try {
    const id = `test_${Math.random().toString(36).substr(2, 9)}`;
    await sql`
      INSERT INTO testimonials (id, nom, categorie, periode, message, localisation, approved)
      VALUES (${id}, ${nom.trim()}, ${categorie}, ${periode}, ${message.trim()}, ${localisation ? localisation.trim() : ""}, false)
    `;
    return { success: true, id, message: "Votre témoignage a été soumis pour modération avec succès." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de l'écriture en base." };
  }
}

export async function approveSubmittedTestimonial(id: string): Promise<boolean> {
  try {
    const res = await sql`UPDATE testimonials SET approved = true WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteSubmittedTestimonial(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM testimonials WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GESTION DU CODE OTP ADMINISTRATEUR HACHÉ (SHA-256)
// ─────────────────────────────────────────────────────────────────────────────

function hashString(str: string): string {
  return crypto.createHash("sha256").update(str).digest("hex");
}

export async function saveAdminOtp(code: string, expires_at: string): Promise<boolean> {
  try {
    const codeHash = hashString(code.toUpperCase());
    const val = { code: codeHash, expires_at };
    await sql`
      INSERT INTO admin_config (key, value) VALUES ('adminOtp', ${JSON.stringify(val)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getAdminOtp(): Promise<{ code: string; expires_at: string } | null> {
  try {
    const { rows } = await sql`SELECT value FROM admin_config WHERE key = 'adminOtp'`;
    return rows.length ? rows[0].value : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function verifyAdminOtp(code: string): Promise<boolean> {
  const otpData = await getAdminOtp();
  if (!otpData) return false;
  
  const isNotExpired = new Date().toISOString() <= otpData.expires_at;
  const codeHash = hashString(code.toUpperCase());
  
  return isNotExpired && codeHash === otpData.code;
}

export async function clearAdminOtp(): Promise<boolean> {
  try {
    await sql`DELETE FROM admin_config WHERE key = 'adminOtp'`;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SESSIONS D'ADMINISTRATION
// ─────────────────────────────────────────────────────────────────────────────

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex"); 
}

export async function createAdminSession(token: string, durationMinutes = 30): Promise<boolean> {
  try {
    const now = new Date().toISOString();
    // Cleanup expired
    await sql`DELETE FROM admin_sessions WHERE expiresAt <= ${now}`;

    const tokenHash = hashString(token);
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();
    
    await sql`
      INSERT INTO admin_sessions (tokenHash, expiresAt)
      VALUES (${tokenHash}, ${expiresAt})
    `;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const tokenHash = hashString(token);
    const now = new Date().toISOString();
    const { rows } = await sql`
      SELECT tokenHash FROM admin_sessions WHERE tokenHash = ${tokenHash} AND expiresAt > ${now}
    `;
    return rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteAdminSession(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const tokenHash = hashString(token);
    const res = await sql`DELETE FROM admin_sessions WHERE tokenHash = ${tokenHash}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function checkAdminLockout(): Promise<{ locked: boolean; lockedUntil: string | null }> {
  try {
    const { rows } = await sql`SELECT value FROM admin_config WHERE key = 'adminLockout'`;
    const lockout = rows.length ? rows[0].value : { failedAttempts: 0, lockedUntil: null };
    
    const now = new Date().toISOString();
    if (lockout && lockout.lockedUntil) {
      if (now < lockout.lockedUntil) {
        return { locked: true, lockedUntil: lockout.lockedUntil };
      } else {
        await resetFailedOtpAttempts();
      }
    }
    return { locked: false, lockedUntil: null };
  } catch (error) {
    console.error(error);
    return { locked: false, lockedUntil: null };
  }
}

export async function recordFailedOtpAttempt(): Promise<{ attempts: number; lockedUntil: string | null }> {
  try {
    const { rows } = await sql`SELECT value FROM admin_config WHERE key = 'adminLockout'`;
    const lockout = rows.length ? rows[0].value : { failedAttempts: 0, lockedUntil: null };
    
    lockout.failedAttempts += 1;
    let lockedUntil: string | null = null;
    
    if (lockout.failedAttempts >= 3) {
      const lockTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
      lockout.lockedUntil = lockTime;
      lockedUntil = lockTime;
    }
    
    await sql`
      INSERT INTO admin_config (key, value) VALUES ('adminLockout', ${JSON.stringify(lockout)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
    return { attempts: lockout.failedAttempts, lockedUntil };
  } catch (error) {
    console.error(error);
    return { attempts: 0, lockedUntil: null };
  }
}

export async function resetFailedOtpAttempts(): Promise<boolean> {
  try {
    const lockout = { failedAttempts: 0, lockedUntil: null };
    await sql`
      INSERT INTO admin_config (key, value) VALUES ('adminLockout', ${JSON.stringify(lockout)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function generateRandomAlphanumeric(length = 9): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// -----------------------------------------------------------------------------
// PUBLICATIONS (SOCIAL MEDIA)
// -----------------------------------------------------------------------------

export async function addPublication(data: Omit<Publication, 'id' | 'created_at'>): Promise<{ success: boolean; id?: string }> {
  try {
    const id = 'pub_' + Math.random().toString(36).substr(2, 9);
    await sql`
      INSERT INTO publications (id, titre, theme, objectif, attente, content, platforms, status, scheduled_for)
      VALUES (${id}, ${data.titre}, ${data.theme}, ${data.objectif}, ${data.attente}, ${data.content}, ${JSON.stringify(data.platforms)}, ${data.status}, ${data.scheduled_for})
    `;
    return { success: true, id };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getPublications(): Promise<Publication[]> {
  try {
    const { rows } = await sql`SELECT * FROM publications`;
    return rows as Publication[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPublicationById(id: string): Promise<Publication | null> {
  try {
    const { rows } = await sql`SELECT * FROM publications WHERE id = ${id}`;
    return rows.length ? (rows[0] as Publication) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePublication(id: string, updates: Partial<Publication>): Promise<boolean> {
  try {
    // We update fields dynamically or just use a general approach.
    // For simplicity, fetch, merge, then update entirely, or just update what's provided.
    // Given the partial nature, we can do dynamic SQL or just fetch & replace:
    const existing = await getPublicationById(id);
    if (!existing) return false;
    const updated = { ...existing, ...updates };

    await sql`
      UPDATE publications
      SET titre = ${updated.titre},
          theme = ${updated.theme},
          objectif = ${updated.objectif},
          attente = ${updated.attente},
          content = ${updated.content},
          platforms = ${JSON.stringify(updated.platforms)},
          status = ${updated.status},
          scheduled_for = ${updated.scheduled_for},
          published_at = ${updated.published_at || null},
          ai_feedback = ${updated.ai_feedback || null}
      WHERE id = ${id}
    `;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deletePublication(id: string): Promise<boolean> {
  try {
    const res = await sql`DELETE FROM publications WHERE id = ${id}`;
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getSocialTokens() {
  try {
    const { rows } = await sql`SELECT value FROM admin_config WHERE key = 'socialTokens'`;
    return rows.length ? rows[0].value : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function setSocialTokens(tokens: { linkedin_access_token?: string; linkedin_urn?: string }) {
  try {
    const existing = await getSocialTokens();
    const merged = { ...existing, ...tokens };
    await sql`
      INSERT INTO admin_config (key, value) VALUES ('socialTokens', ${JSON.stringify(merged)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
  } catch (error) {
    console.error(error);
  }
}
