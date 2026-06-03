import { sql } from "@vercel/postgres";

async function createCoachingTables() {
  console.log("Début de la création des tables de coaching...");

  try {
    // 1. Table coaching_clients
    await sql`
      CREATE TABLE IF NOT EXISTS coaching_clients (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        telephone VARCHAR(50),
        profil VARCHAR(50) DEFAULT 'Femme',
        token_acces VARCHAR(255) UNIQUE NOT NULL,
        statut_paiement VARCHAR(50) DEFAULT 'En attente',
        duree_programme VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table 'coaching_clients' créée.");

    // 2. Table modules_bibliotheque (Les rectangles types)
    await sql`
      CREATE TABLE IF NOT EXISTS modules_bibliotheque (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        contenu TEXT,
        type_module VARCHAR(100),
        profil_cible VARCHAR(50),
        duree_estimee VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table 'modules_bibliotheque' créée.");

    // 3. Table modules_assignes (Les modules glissés dans l'espace client)
    await sql`
      CREATE TABLE IF NOT EXISTS modules_assignes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        client_id UUID REFERENCES coaching_clients(id) ON DELETE CASCADE,
        module_id UUID REFERENCES modules_bibliotheque(id) ON DELETE SET NULL,
        titre_personnalise VARCHAR(255),
        jour_numero INTEGER,
        date_prevue DATE,
        coche_action BOOLEAN DEFAULT FALSE,
        difficulte_signalee BOOLEAN DEFAULT FALSE,
        demande_report BOOLEAN DEFAULT FALSE,
        note_client TEXT,
        statut VARCHAR(50) DEFAULT 'À faire',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table 'modules_assignes' créée.");

    console.log("Migration terminée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des tables:", error);
  }
}

createCoachingTables();
