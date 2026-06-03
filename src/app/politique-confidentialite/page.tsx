import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Briser les Frontières",
  description: "Politique de protection des données, cryptage, et traitement des informations de souveraineté pour la plateforme Briser les Frontières.",
  robots: {
    index: true,
    follow: true
  }
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Gradients prestigieux thématiques */}
      <div className="absolute top-0 left-0 w-full h-[650px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_75%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 font-body text-cream-muted leading-relaxed text-sm space-y-12">
        
        <SectionHeading
          label="Protection des Données"
          title="Politique de Confidentialité"
          subtitle="Le respect absolu de votre vie privée, le cryptage de vos coordonnées de souveraineté et le traitement éthique de vos données personnelles."
        />

        {/* 1. ENGAGEMENT DE CONFIDENTIALITÉ */}
        <section className="space-y-4 border-t border-border pt-10">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">1. Notre Engagement (L'Amana)</h3>
          <p>
            Sur la plateforme <strong>Briser les Frontières</strong>, la confidentialité n&apos;est pas qu&apos;une contrainte juridique, c&apos;est un dépôt (<em>Amana</em>). Nous considérons chaque information que vous nous confiez concernant votre situation personnelle, cognitive et spirituelle avec la plus haute exigence éthique et sécuritaire.
          </p>
        </section>

        {/* 2. DONNÉES COLLECTÉES */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">2. Données Personnelles Collectées</h3>
          <p>
            Nous collectons des informations lors de vos interactions directes avec la plateforme :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Candidatures Mentorat :</strong> Nom, Prénom, Age, Profession, Situation géographique, et détails intimes relatifs à votre charge mentale et vos objectifs.</li>
            <li><strong>Audit Souveraineté :</strong> Adresse email, prénom, et réponses aux questions d&apos;évaluation cognitive et comportementale (Fatigue, Distraction, etc.).</li>
            <li><strong>Achats Littéraires (Stripe) :</strong> Adresse email. <em>(Note : les données de carte bancaire ne transitent jamais par nos serveurs et sont exclusivement gérées par Stripe)</em>.</li>
            <li><strong>Formulaire de Contact :</strong> Email et contenu de votre message.</li>
          </ul>
        </section>

        {/* 3. FINALITÉS DU TRAITEMENT */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">3. Finalités et Utilisation</h3>
          <p>
            Vos données servent exclusivement à :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>Évaluer votre éligibilité et votre degré de préparation pour le programme d&apos;ingénierie comportementale (Mentorat 9 mois).</li>
            <li>Vous restituer le résultat de votre Audit de Souveraineté de manière personnalisée.</li>
            <li>Traiter vos commandes d&apos;ouvrages numériques et gérer le service après-vente.</li>
            <li>Vous informer via notre système de Newsletter (si vous avez donné votre consentement explicite).</li>
          </ul>
        </section>

        {/* 4. SÉCURITÉ ET CRYPTAGE */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">4. Sécurité, Cryptage & Hébergement</h3>
          <p>
            Toutes les coordonnées transmises sont soumises à un protocole de sécurité strict :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Stockage chiffré :</strong> Les candidatures, audits et messages sont stockés dans une base de données sécurisée.</li>
            <li><strong>Aucun tiers commercial :</strong> Mounir BYAR est l&apos;unique accédant à vos données de candidature. Vos informations ne seront <strong>jamais</strong> vendues, louées, ou cédées à un tiers.</li>
            <li><strong>Hébergement :</strong> Les données sont hébergées sur des serveurs sécurisés via notre infrastructure (Vercel et plateformes Cloud certifiées).</li>
          </ul>
        </section>

        {/* 5. VOS DROITS */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">5. Vos Droits (Loi Informatique et Libertés & RGPD)</h3>
          <p>
            Conformément à la réglementation européenne (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de limitation de vos données personnelles.
          </p>
          <p>
            Vous pouvez à tout moment vous désabonner de nos correspondances ou exiger la suppression intégrale de vos dossiers d&apos;audit ou de candidature en nous contactant directement :
          </p>
          <p className="font-bold">
            Contact : <code className="text-gold font-normal">contact@briserlesfrontieres.fr</code>
          </p>
        </section>

        {/* Note de pied de page */}
        <div className="border-t border-border pt-10 text-center text-[10px] text-cream-muted/40">
          <p>Mise à jour : Juin 2026 — Briser les Frontières</p>
        </div>

      </div>
    </div>
  );
}
