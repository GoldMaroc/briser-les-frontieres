import { sql } from "@vercel/postgres";
import crypto from "crypto";

// ==========================
// CLIENTS DE COACHING
// ==========================

export async function createCoachingClient(data: {
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
  profil?: string;
  duree_programme?: string;
}) {
  try {
    // Générer un token unique de 32 caractères pour l'accès sans mot de passe
    const tokenAcces = crypto.randomBytes(16).toString("hex");

    const result = await sql`
      INSERT INTO coaching_clients (nom, prenom, email, telephone, profil, duree_programme, token_acces)
      VALUES (${data.nom}, ${data.prenom || null}, ${data.email}, ${data.telephone || null}, ${data.profil || "Femme"}, ${data.duree_programme || null}, ${tokenAcces})
      RETURNING *;
    `;
    return { success: true, client: result.rows[0] };
  } catch (error: any) {
    console.error("Erreur createCoachingClient:", error);
    return { success: false, message: error.message };
  }
}

export async function getCoachingClients() {
  try {
    const result = await sql`SELECT * FROM coaching_clients ORDER BY created_at DESC;`;
    return { success: true, clients: result.rows };
  } catch (error: any) {
    console.error("Erreur getCoachingClients:", error);
    return { success: false, message: error.message };
  }
}

export async function getCoachingClientByToken(token: string) {
  try {
    const result = await sql`SELECT * FROM coaching_clients WHERE token_acces = ${token} LIMIT 1;`;
    if (result.rows.length === 0) return { success: false, message: "Client introuvable." };
    return { success: true, client: result.rows[0] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ==========================
// MODULES (BIBLIOTHÈQUE)
// ==========================

export async function getModulesBibliotheque() {
  try {
    const result = await sql`SELECT * FROM modules_bibliotheque ORDER BY created_at ASC;`;
    return { success: true, modules: result.rows };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function createModuleBibliotheque(data: {
  titre: string;
  contenu: string;
  type_module?: string;
  profil_cible?: string;
  duree_estimee?: string;
}) {
  try {
    const result = await sql`
      INSERT INTO modules_bibliotheque (titre, contenu, type_module, profil_cible, duree_estimee)
      VALUES (${data.titre}, ${data.contenu}, ${data.type_module || null}, ${data.profil_cible || null}, ${data.duree_estimee || null})
      RETURNING *;
    `;
    return { success: true, module: result.rows[0] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ==========================
// MODULES ASSIGNÉS (PROGRAMME CLIENT)
// ==========================

export async function assignModuleToClient(data: {
  client_id: string;
  module_id: string;
  titre_personnalise?: string;
  jour_numero?: number;
  date_prevue?: string;
}) {
  try {
    const result = await sql`
      INSERT INTO modules_assignes (client_id, module_id, titre_personnalise, jour_numero, date_prevue)
      VALUES (${data.client_id}, ${data.module_id}, ${data.titre_personnalise || null}, ${data.jour_numero || null}, ${data.date_prevue || null})
      RETURNING *;
    `;
    return { success: true, assignation: result.rows[0] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getClientModules(clientId: string) {
  try {
    const result = await sql`
      SELECT ma.*, mb.titre as titre_original, mb.contenu, mb.type_module
      FROM modules_assignes ma
      LEFT JOIN modules_bibliotheque mb ON ma.module_id = mb.id
      WHERE ma.client_id = ${clientId}
      ORDER BY ma.jour_numero ASC, ma.date_prevue ASC;
    `;
    return { success: true, modules: result.rows };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateClientModuleProgress(assignationId: string, data: {
  coche_action?: boolean;
  difficulte_signalee?: boolean;
  demande_report?: boolean;
  note_client?: string;
  statut?: string;
}) {
  try {
    const result = await sql`
      UPDATE modules_assignes
      SET 
        coche_action = COALESCE(${data.coche_action}, coche_action),
        difficulte_signalee = COALESCE(${data.difficulte_signalee}, difficulte_signalee),
        demande_report = COALESCE(${data.demande_report}, demande_report),
        note_client = COALESCE(${data.note_client}, note_client),
        statut = COALESCE(${data.statut}, statut)
      WHERE id = ${assignationId}
      RETURNING *;
    `;
    return { success: true, assignation: result.rows[0] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
