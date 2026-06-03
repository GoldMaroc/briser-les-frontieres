import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";

const DB_FILE_PATH = path.join(process.cwd(), "database.json");

async function migrate() {
  console.log("Lecture du fichier database.json...");
  if (!fs.existsSync(DB_FILE_PATH)) {
    console.error("Aucun fichier database.json trouvé.");
    return;
  }

  const content = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(content);

  console.log("Création des tables...");

  // Subscribers
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Candidatures
  await sql`
    CREATE TABLE IF NOT EXISTS candidatures (
      id VARCHAR(255) PRIMARY KEY,
      nom VARCHAR(255),
      prenom VARCHAR(255),
      email VARCHAR(255),
      telephone VARCHAR(255),
      adresse TEXT,
      codePostal VARCHAR(20),
      ville VARCHAR(255),
      localisation VARCHAR(255),
      fatigueDecisionnelle TEXT,
      chargeAllostatique TEXT,
      salatImpact TEXT,
      interpositionAccord BOOLEAN,
      motivation TEXT,
      status VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Audits
  await sql`
    CREATE TABLE IF NOT EXISTS audits (
      id VARCHAR(255) PRIMARY KEY,
      nom VARCHAR(255),
      email VARCHAR(255),
      score INTEGER,
      responses JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Testimonials
  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id VARCHAR(255) PRIMARY KEY,
      nom VARCHAR(255),
      categorie VARCHAR(50),
      periode VARCHAR(255),
      message TEXT,
      localisation VARCHAR(255),
      approved BOOLEAN,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Contacts
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id VARCHAR(255) PRIMARY KEY,
      nom VARCHAR(255),
      prenom VARCHAR(255),
      email VARCHAR(255),
      telephone VARCHAR(255),
      adresse TEXT,
      codePostal VARCHAR(20),
      ville VARCHAR(255),
      typeRelation VARCHAR(255),
      formuleAccompagnement VARCHAR(255),
      livreSelection VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Gifts
  await sql`
    CREATE TABLE IF NOT EXISTS gifts (
      id VARCHAR(255) PRIMARY KEY,
      offrant_nom VARCHAR(255),
      offrant_prenom VARCHAR(255),
      offrant_email VARCHAR(255),
      offrant_telephone VARCHAR(255),
      offrant_adresse TEXT,
      offrant_codePostal VARCHAR(20),
      offrant_ville VARCHAR(255),
      beneficiaire_nom VARCHAR(255),
      beneficiaire_prenom VARCHAR(255),
      beneficiaire_email VARCHAR(255),
      beneficiaire_telephone VARCHAR(255),
      beneficiaire_adresse TEXT,
      beneficiaire_codePostal VARCHAR(20),
      beneficiaire_ville VARCHAR(255),
      beneficiaire_relation VARCHAR(255),
      prestation VARCHAR(255),
      message TEXT,
      status VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Publications
  await sql`
    CREATE TABLE IF NOT EXISTS publications (
      id VARCHAR(255) PRIMARY KEY,
      titre VARCHAR(255),
      theme VARCHAR(255),
      objectif VARCHAR(50),
      attente TEXT,
      content TEXT,
      platforms JSONB,
      status VARCHAR(50),
      scheduled_for TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      published_at TIMESTAMP WITH TIME ZONE,
      ai_feedback TEXT
    );
  `;

  // Admin Configs (K/V store like)
  await sql`
    CREATE TABLE IF NOT EXISTS admin_config (
      key VARCHAR(255) PRIMARY KEY,
      value JSONB
    );
  `;

  // Admin Sessions
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      tokenHash VARCHAR(255) PRIMARY KEY,
      expiresAt TIMESTAMP WITH TIME ZONE
    );
  `;

  console.log("Tables créées ! Insertion des données...");

  // Insert Subscribers
  for (const s of db.subscribers || []) {
    try {
      await sql`
        INSERT INTO subscribers (id, email, created_at)
        VALUES (${s.id}, ${s.email}, ${s.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting subscriber:", s.email, e); }
  }

  // Insert Candidatures
  for (const c of db.candidatures || []) {
    try {
      await sql`
        INSERT INTO candidatures (id, nom, prenom, email, telephone, adresse, codePostal, ville, localisation, fatigueDecisionnelle, chargeAllostatique, salatImpact, interpositionAccord, motivation, status, created_at)
        VALUES (${c.id}, ${c.nom}, ${c.prenom}, ${c.email}, ${c.telephone}, ${c.adresse}, ${c.codePostal}, ${c.ville}, ${c.localisation}, ${c.fatigueDecisionnelle}, ${c.chargeAllostatique}, ${c.salatImpact}, ${c.interpositionAccord}, ${c.motivation}, ${c.status}, ${c.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting candidature:", c.email, e); }
  }

  // Insert Audits
  for (const a of db.audits || []) {
    try {
      await sql`
        INSERT INTO audits (id, nom, email, score, responses, created_at)
        VALUES (${a.id}, ${a.nom}, ${a.email}, ${a.score}, ${JSON.stringify(a.responses)}, ${a.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting audit:", a.email, e); }
  }

  // Insert Testimonials
  for (const t of db.testimonials || []) {
    try {
      await sql`
        INSERT INTO testimonials (id, nom, categorie, periode, message, localisation, approved, created_at)
        VALUES (${t.id}, ${t.nom}, ${t.categorie}, ${t.periode}, ${t.message}, ${t.localisation}, ${t.approved}, ${t.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting testimonial:", t.id, e); }
  }

  // Insert Contacts
  for (const c of db.contacts || []) {
    try {
      await sql`
        INSERT INTO contacts (id, nom, prenom, email, telephone, adresse, codePostal, ville, typeRelation, formuleAccompagnement, livreSelection, message, created_at)
        VALUES (${c.id}, ${c.nom}, ${c.prenom}, ${c.email}, ${c.telephone}, ${c.adresse}, ${c.codePostal}, ${c.ville}, ${c.typeRelation}, ${c.formuleAccompagnement}, ${c.livreSelection}, ${c.message}, ${c.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting contact:", c.id, e); }
  }

  // Insert Gifts
  for (const g of db.gifts || []) {
    try {
      await sql`
        INSERT INTO gifts (id, offrant_nom, offrant_prenom, offrant_email, offrant_telephone, offrant_adresse, offrant_codePostal, offrant_ville, beneficiaire_nom, beneficiaire_prenom, beneficiaire_email, beneficiaire_telephone, beneficiaire_adresse, beneficiaire_codePostal, beneficiaire_ville, beneficiaire_relation, prestation, message, status, created_at)
        VALUES (${g.id}, ${g.offrant.nom}, ${g.offrant.prenom}, ${g.offrant.email}, ${g.offrant.telephone}, ${g.offrant.adresse}, ${g.offrant.codePostal}, ${g.offrant.ville}, ${g.beneficiaire.nom}, ${g.beneficiaire.prenom}, ${g.beneficiaire.email}, ${g.beneficiaire.telephone}, ${g.beneficiaire.adresse}, ${g.beneficiaire.codePostal}, ${g.beneficiaire.ville}, ${g.beneficiaire.relation}, ${g.prestation}, ${g.message}, ${g.status}, ${g.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting gift:", g.id, e); }
  }

  // Insert Admin Settings (Otp, Lockout, SocialTokens)
  if (db.adminOtp) await sql`INSERT INTO admin_config (key, value) VALUES ('adminOtp', ${JSON.stringify(db.adminOtp)}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`;
  if (db.adminLockout) await sql`INSERT INTO admin_config (key, value) VALUES ('adminLockout', ${JSON.stringify(db.adminLockout)}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`;
  if (db.socialTokens) await sql`INSERT INTO admin_config (key, value) VALUES ('socialTokens', ${JSON.stringify(db.socialTokens)}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`;

  // Insert Admin Sessions
  for (const s of db.adminSessions || []) {
    try {
      await sql`
        INSERT INTO admin_sessions (tokenHash, expiresAt)
        VALUES (${s.tokenHash}, ${s.expiresAt})
        ON CONFLICT (tokenHash) DO NOTHING;
      `;
    } catch (e) { console.error("Error inserting session:", s.tokenHash, e); }
  }

  console.log("Migration terminée avec succès !");
}

migrate().catch(console.error);
