import fs from "fs";
import path from "path";

// Définition du chemin de la base de données JSON (avec fallback sur /tmp pour Vercel)
let DB_FILE_PATH = path.join(process.cwd(), "database.json");

try {
  // Test d'écriture pour détecter si l'environnement est en lecture seule (comme Vercel)
  const testFile = path.join(process.cwd(), ".write-test");
  fs.writeFileSync(testFile, "test", "utf-8");
  fs.unlinkSync(testFile);
} catch (e) {
  // En cas d'échec (lecture seule), nous basculons sur le répertoire /tmp qui est toujours accessible en écriture
  DB_FILE_PATH = path.join("/tmp", "database.json");
}

export interface Subscriber {
  id: string;
  email: string;
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
  created_at: string;
}

interface DatabaseSchema {
  subscribers: Subscriber[];
  candidatures: Candidature[];
  audits: Audit[];
  testimonials: SubmittedTestimonial[];
  contacts: ContactMessage[];
  gifts: GiftRequest[];
  adminOtp: {
    code: string;
    expires_at: string;
  } | null;
}

// Schéma par défaut en cas d'absence du fichier
const defaultSchema: DatabaseSchema = {
  subscribers: [],
  candidatures: [],
  audits: [],
  testimonials: [],
  contacts: [],
  gifts: [],
  adminOtp: null
};

// Lecture de la base de données
function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(defaultSchema, null, 2), "utf-8");
      return defaultSchema;
    }
    const content = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(content);
    
    // Rétrocompatibilité avec les versions précédentes du fichier JSON
    db.subscribers = db.subscribers || [];
    db.candidatures = db.candidatures || [];
    db.audits = db.audits || [];
    db.testimonials = db.testimonials || [];
    db.contacts = db.contacts || [];
    db.gifts = db.gifts || [];
    db.adminOtp = db.adminOtp || null;
    
    return db;
  } catch (error) {
    console.error("Erreur lors de la lecture de database.json :", error);
    return defaultSchema;
  }
}

// Écriture dans la base de données
function writeDb(data: DatabaseSchema): boolean {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'écriture de database.json :", error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES ABONNÉS NEWSLETTER
// ─────────────────────────────────────────────────────────────────────────────

export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  const db = readDb();
  const lowerEmail = email.toLowerCase().trim();

  // Éviter les doublons
  const exists = db.subscribers.some((s) => s.email.toLowerCase() === lowerEmail);
  if (exists) {
    return { success: true, message: "Déjà inscrit à la newsletter premium." };
  }

  const newSubscriber: Subscriber = {
    id: `sub_${Math.random().toString(36).substr(2, 9)}`,
    email: lowerEmail,
    created_at: new Date().toISOString(),
  };

  db.subscribers.push(newSubscriber);
  const success = writeDb(db);

  return success 
    ? { success: true, message: "Inscription newsletter enregistrée avec succès." }
    : { success: false, message: "Erreur technique d'écriture en base." };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES CANDIDATURES
// ─────────────────────────────────────────────────────────────────────────────

export async function addCandidature(
  data: Omit<Candidature, "id" | "status" | "created_at" | "localisation">
): Promise<{ success: boolean; id?: string; message: string }> {
  const db = readDb();
  const lowerEmail = data.email.toLowerCase().trim();

  // Autoriser une nouvelle candidature si les précédentes ne sont pas en attente
  const activePending = db.candidatures.some((c) => c.email.toLowerCase() === lowerEmail && c.status === "pending");
  if (activePending) {
    return { success: false, message: "Vous avez déjà un dossier en cours d'examen." };
  }

  const id = `cand_${Math.random().toString(36).substr(2, 9)}`;
  const newCandidature: Candidature = {
    ...data,
    id,
    email: lowerEmail,
    localisation: data.ville, // Rétrocompatibilité
    status: "pending",
    created_at: new Date().toISOString(),
  };

  db.candidatures.push(newCandidature);
  const success = writeDb(db);

  return success
    ? { success: true, id, message: "Candidature enregistrée avec succès." }
    : { success: false, message: "Erreur technique lors de l'enregistrement de la candidature." };
}

export async function updateCandidatureStatus(
  id: string,
  status: "approved" | "rejected" | "pending"
): Promise<boolean> {
  const db = readDb();
  const index = db.candidatures.findIndex((c) => c.id === id);
  if (index === -1) return false;

  db.candidatures[index].status = status;
  return writeDb(db);
}

export async function deleteCandidature(id: string): Promise<boolean> {
  const db = readDb();
  const filtered = db.candidatures.filter((c) => c.id !== id);
  if (filtered.length === db.candidatures.length) return false;
  db.candidatures = filtered;
  return writeDb(db);
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
  const db = readDb();
  const id = `aud_${Math.random().toString(36).substr(2, 9)}`;

  const newAudit: Audit = {
    id,
    nom: nom.trim(),
    email: email.toLowerCase().trim(),
    score,
    responses,
    created_at: new Date().toISOString(),
  };

  db.audits.push(newAudit);
  const success = writeDb(db);

  return success
    ? { success: true, id, message: "Audit persistant enregistré." }
    : { success: false, message: "Erreur d'écriture de l'audit en base." };
}

export async function deleteAudit(id: string): Promise<boolean> {
  const db = readDb();
  const filtered = db.audits.filter((a) => a.id !== id);
  if (filtered.length === db.audits.length) return false;
  db.audits = filtered;
  return writeDb(db);
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES MESSAGES DE CONTACT
// ─────────────────────────────────────────────────────────────────────────────

export async function addContact(
  data: Omit<ContactMessage, "id" | "created_at">
): Promise<{ success: boolean; id?: string; message: string }> {
  const db = readDb();
  const id = `cont_${Math.random().toString(36).substr(2, 9)}`;

  const newContact: ContactMessage = {
    ...data,
    id,
    created_at: new Date().toISOString(),
  };

  db.contacts.push(newContact);
  const success = writeDb(db);

  return success
    ? { success: true, id, message: "Message de contact enregistré avec succès." }
    : { success: false, message: "Erreur d'écriture du message en base." };
}

export async function deleteContact(id: string): Promise<boolean> {
  const db = readDb();
  const filtered = db.contacts.filter((c) => c.id !== id);
  if (filtered.length === db.contacts.length) return false;
  db.contacts = filtered;
  return writeDb(db);
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES PRESTATIONS CADEAUX (GIFTS)
// ─────────────────────────────────────────────────────────────────────────────

export async function addGift(
  data: Omit<GiftRequest, "id" | "created_at">
): Promise<{ success: boolean; id?: string; message: string }> {
  const db = readDb();
  const id = `gift_${Math.random().toString(36).substr(2, 9)}`;

  const newGift: GiftRequest = {
    ...data,
    id,
    created_at: new Date().toISOString(),
  };

  db.gifts.push(newGift);
  const success = writeDb(db);

  return success
    ? { success: true, id, message: "Demande de cadeau enregistrée avec succès." }
    : { success: false, message: "Erreur d'écriture du cadeau en base." };
}

export async function deleteGift(id: string): Promise<boolean> {
  const db = readDb();
  const filtered = db.gifts.filter((g) => g.id !== id);
  if (filtered.length === db.gifts.length) return false;
  db.gifts = filtered;
  return writeDb(db);
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCÈS UNIFIÉ ADMIN
// ─────────────────────────────────────────────────────────────────────────────

export function getAdminDbData(): DatabaseSchema {
  return readDb();
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const db = readDb();
  const filtered = db.subscribers.filter((s) => s.id !== id);
  if (filtered.length === db.subscribers.length) return false;
  db.subscribers = filtered;
  return writeDb(db);
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTHODES DE GESTION DES TÉMOIGNAGES SOUMIS PAR LES UTILISATEURS
// ─────────────────────────────────────────────────────────────────────────────

export async function addSubmittedTestimonial(
  nom: string,
  categorie: 'homme' | 'femme' | 'famille' | 'groupe',
  periode: string,
  message: string,
  localisation?: string
): Promise<{ success: boolean; id?: string; message: string }> {
  const db = readDb();

  const id = `test_${Math.random().toString(36).substr(2, 9)}`;
  const newTestimonial: SubmittedTestimonial = {
    id,
    nom: nom.trim(),
    categorie,
    periode,
    message: message.trim(),
    localisation: localisation ? localisation.trim() : "",
    approved: false, // Nécessite une validation administrative
    created_at: new Date().toISOString(),
  };

  db.testimonials.push(newTestimonial);
  const success = writeDb(db);

  return success
    ? { success: true, id, message: "Votre témoignage a été soumis pour modération avec succès." }
    : { success: false, message: "Erreur lors de l'écriture en base." };
}

export async function approveSubmittedTestimonial(id: string): Promise<boolean> {
  const db = readDb();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return false;

  db.testimonials[index].approved = true;
  return writeDb(db);
}

export async function deleteSubmittedTestimonial(id: string): Promise<boolean> {
  const db = readDb();
  const filtered = db.testimonials.filter((t) => t.id !== id);
  if (filtered.length === db.testimonials.length) return false;

  db.testimonials = filtered;
  return writeDb(db);
}

// ─────────────────────────────────────────────────────────────────────────────
// GESTION DU CODE OTP ADMINISTRATEUR
// ─────────────────────────────────────────────────────────────────────────────

export async function saveAdminOtp(code: string, expires_at: string): Promise<boolean> {
  const db = readDb();
  db.adminOtp = { code, expires_at };
  return writeDb(db);
}

export async function getAdminOtp(): Promise<{ code: string; expires_at: string } | null> {
  const db = readDb();
  return db.adminOtp;
}

export async function clearAdminOtp(): Promise<boolean> {
  const db = readDb();
  db.adminOtp = null;
  return writeDb(db);
}
