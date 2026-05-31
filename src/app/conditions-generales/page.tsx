import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Mentions Légales & Conditions Générales — Cabinet BLF",
  description: "Cadre légal, politique de confidentialité de souveraineté cognitive et conditions générales du cabinet d'ingénierie comportementale de Mounir BYAR.",
  robots: {
    index: true,
    follow: true
  }
};

export default function ConditionsGenerales() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Gradients prestigieux thématiques */}
      <div className="absolute top-0 left-0 w-full h-[650px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_75%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 font-body text-cream-muted leading-relaxed text-sm space-y-12">
        
        <SectionHeading
          label="Cadre Éthique & Légal"
          title="Conditions Générales & Mentions Légales"
          subtitle="Ce document régit les règles d'utilisation de la plateforme, la politique de cryptage de vos coordonnées de souveraineté et le cadre contractuel de l'Ingénierie de la Souveraineté."
        />

        {/* 1. MENTIONS LÉGALES */}
        <section className="space-y-4 border-t border-border pt-10">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">1. Mentions Légales</h3>
          <p>
            Conformément aux dispositions de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), il est précisé aux utilisateurs de la plateforme l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Propriétaire du Cabinet :</strong> Mounir BYAR, Ingénieur Conseil en Souveraineté Cognitive et Systèmes Comportementaux.</li>
            <li><strong>Localisation principale :</strong> Grand Reims, Marne, France.</li>
            <li><strong>Contact électronique :</strong> <code className="text-gold">contact@briserlesfrontieres.fr</code></li>
            <li><strong>Hébergement de la plateforme :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</li>
          </ul>
        </section>

        {/* 2. PROPRIÉTÉ INTELLECTUELLE */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">2. Propriété Intellectuelle & Droits des Écrits</h3>
          <p>
            Tous les contenus textuels, analyses stratégiques, protocoles comportementaux, méthodologies visuelles (notamment le protocole <strong>C.O.M.E.S.</strong>), et ouvrages édités (<em>Les Secrets du Retour vers Allah</em> et <em>Ar-Rahman — La Mer sans Rivage</em>) sont la propriété exclusive de Mounir BYAR.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation ou publication, même partielle, de ces différents éléments est strictement interdite sans l&apos;accord exprès par écrit de l&apos;auteur. Tout manquement constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </section>

        {/* 3. RGPD & CRYPTAGE DES COORDONNÉES */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">3. Traitement du Nafs et Protection des Données (RGPD)</h3>
          <p>
            Le Cabinet BLF accorde une importance sacrée à la confidentialité de vos données personnelles et situationnelles. Toutes les coordonnées transmises lors de vos demandes d&apos;interposition (Mentorat 9 Mois) ou lors du calcul de votre indice (Bilan de Souveraineté) font l&apos;objet d&apos;une politique de sécurité absolue :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Cryptage côté serveur :</strong> Vos coordonnées physiques (nom, prénom, téléphone, adresse, ville) sont transmises au serveur de messagerie sécurisé et stockées dans une base de données JSON chiffrée.</li>
            <li><strong>Usage exclusif :</strong> Ces données servent uniquement à Mounir BYAR pour évaluer votre environnement de travail (proximité spatiale) et organiser vos rituels d&apos;interposition comportementale.</li>
            <li><strong>Aucun partage commercial :</strong> Vos informations ne seront jamais vendues, louées ou cédées à un tiers quelconque.</li>
            <li><strong>Droits d&apos;accès et de suppression :</strong> Vous pouvez à tout moment demander la purge intégrale de votre dossier de qualification en écrivant à : <code className="text-gold">contact@briserlesfrontieres.fr</code>.</li>
          </ul>
        </section>

        {/* 4. CONDITIONS GÉNÉRALES DE VENTE */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">4. Conditions Générales de Vente (Publications Numériques)</h3>
          <p>
            La plateforme propose l&apos;acquisition d&apos;écrits numériques de prestige sous forme de fichiers téléchargeables immédiatement (PDF et ePub) après règlement par carte bancaire sécurisé.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Prix et monnaie :</strong> Les tarifs affichés sont nets, exprimés en Euros (EUR), et gérés en code ad-hoc (5,90 € pour <em>Les Secrets</em> et 12,65 € pour <em>Ar-Rahman</em>).</li>
            <li><strong>Absence de droit de rétractation :</strong> Conformément aux dispositions de l&apos;article L.221-28 du Code de la consommation, les contrats de fourniture d&apos;un contenu numérique non fourni sur un support matériel dont l&apos;exécution a commencé après accord préalable exprès du consommateur ne bénéficient d&apos;aucun droit de rétractation. Les ventes d&apos;eBooks complets sont définitives.</li>
            <li><strong>Sécurisation des paiements :</strong> Toutes les transactions financières sont traitées en direct via la technologie sécurisée <em>Stripe Embedded Checkout</em>. Aucune coordonnée bancaire ne transite ni n&apos;est conservée par le Cabinet BLF.</li>
          </ul>
        </section>

        {/* 5. LIMITATION DE RESPONSABILITÉ */}
        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-gold font-light tracking-wide">5. Clause de Non-Responsabilité Médicale & Cognitive</h3>
          <p>
            Les programmes d&apos;ingénierie comportementale, l&apos;audit de souveraineté cognitive, et le protocole C.O.M.E.S. constituent des cadres d&apos;action d&apos;excellence personnelle et spirituelle. Ils ne se substituent en aucun cas à un suivi psychologique ou psychiatrique clinique. Le cabinet décline toute responsabilité quant aux choix décisionnels et spirituels pris individuellement par les candidats à la suite des lectures des ouvrages.
          </p>
        </section>

        {/* Note de pied de page */}
        <div className="border-t border-border pt-10 text-center text-[10px] text-cream-muted/40">
          <p>Mise à jour : Mai 2026 — Cabinet de Pilotage Comportemental & Souveraineté Cognitive BLF</p>
        </div>

      </div>
    </div>
  );
}
