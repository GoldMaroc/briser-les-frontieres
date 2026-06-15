import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Cette route permet d'initialiser les tables SQL proposées
  try {
    const client = await db.connect();
    
    console.log("Connexion à Postgres réussie, création des tables...");

    // 1. Table Centrale : Abonnés (Utilisateurs)
    await client.sql`
      CREATE TABLE IF NOT EXISTS utilisateurs (
          id_utilisateur SERIAL PRIMARY KEY,
          nom VARCHAR(100) NOT NULL,
          prenom VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          telephone VARCHAR(20),
          mot_de_passe_hash VARCHAR(255) NOT NULL,
          date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          statut_abonnement VARCHAR(50) DEFAULT 'Gratuit'
      );
    `;

    // 2. Table : Visites (Télémétrie)
    await client.sql`
      CREATE TABLE IF NOT EXISTS visites (
          id_session UUID PRIMARY KEY, 
          id_utilisateur INT REFERENCES utilisateurs(id_utilisateur) ON DELETE SET NULL, 
          date_entree TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          source_acquisition VARCHAR(255),
          adresse_ip VARCHAR(45),
          user_agent TEXT
      );
    `;

    // 3. Table : Achats (Transactions)
    // Ajout de nom_produit et stripe_session_id pour le suivi E-commerce
    await client.sql`
      CREATE TABLE IF NOT EXISTS achats (
          id_transaction SERIAL PRIMARY KEY,
          id_utilisateur INT NOT NULL REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
          nom_produit VARCHAR(255) NOT NULL,
          stripe_session_id VARCHAR(255),
          montant_ttc DECIMAL(10, 2) NOT NULL,
          devise VARCHAR(3) DEFAULT 'EUR',
          statut_paiement VARCHAR(50) DEFAULT 'En attente',
          date_achat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Table : Accompagnement (Support technique)
    await client.sql`
      CREATE TABLE IF NOT EXISTS accompagnement (
          id_ticket SERIAL PRIMARY KEY,
          id_utilisateur INT NOT NULL REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
          type_demande VARCHAR(100) NOT NULL,
          statut_ticket VARCHAR(50) DEFAULT 'Ouvert',
          date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_cloture TIMESTAMP
      );
    `;

    // 5. Table : Programmes de Coaching
    await client.sql`
      CREATE TABLE IF NOT EXISTS programmes_client (
          id_programme SERIAL PRIMARY KEY,
          id_utilisateur INT NOT NULL REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
          titre_programme VARCHAR(255) NOT NULL,
          conseils_generaux TEXT,
          prochain_rdv TIMESTAMP,
          date_assignation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 6. Table : Pratiques Quotidiennes (Invocations, Versets, etc.)
    await client.sql`
      CREATE TABLE IF NOT EXISTS pratiques_quotidiennes (
          id_pratique SERIAL PRIMARY KEY,
          id_utilisateur INT NOT NULL REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
          type_pratique VARCHAR(100) NOT NULL, -- 'Invocation', 'Verset', 'Méditation', 'Exercice'
          titre VARCHAR(255) NOT NULL,
          instructions TEXT,
          frequence VARCHAR(100), -- 'Matin et Soir', '1 fois par jour'
          actif BOOLEAN DEFAULT TRUE,
          date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 7. Table : Suivi d'Assiduité (Check-in du client)
    await client.sql`
      CREATE TABLE IF NOT EXISTS suivi_pratiques (
          id_suivi SERIAL PRIMARY KEY,
          id_pratique INT NOT NULL REFERENCES pratiques_quotidiennes(id_pratique) ON DELETE CASCADE,
          id_utilisateur INT NOT NULL REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
          date_validation DATE DEFAULT CURRENT_DATE,
          heure_validation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(id_pratique, date_validation) -- Empêche de valider deux fois la même pratique le même jour
      );
    `;

    // 8. Table : TikTok Planning (Générateur IA)
    await client.sql`
      CREATE TABLE IF NOT EXISTS tiktok_planning (
          id SERIAL PRIMARY KEY,
          titre_source VARCHAR(255) NOT NULL,
          hook TEXT,
          body_json JSONB,
          cta TEXT,
          hashtags TEXT,
          statut VARCHAR(50) DEFAULT 'Planifié',
          date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    client.release();

    return NextResponse.json({ 
      success: true, 
      message: "L'architecture SQL a été injectée avec succès ! Les tables (utilisateurs, visites, achats, accompagnement, programmes, pratiques, suivi) sont prêtes." 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur fatale lors de l'initialisation SQL:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Erreur de connexion à Vercel Postgres." 
    }, { status: 500 });
  }
}
