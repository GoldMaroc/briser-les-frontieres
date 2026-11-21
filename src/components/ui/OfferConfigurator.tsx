"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

type OfferKey = "livres" | "bilan" | "protocole30" | "mandat9mois";

interface OfferDetails {
  key: OfferKey;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceSub: string;
  duration: string;
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

const OFFERS: Record<OfferKey, OfferDetails> = {
  livres: {
    key: "livres",
    tag: "Autonomie Immédiate",
    badge: "Fondements & Exégèse",
    title: "Les Traités Fondateurs",
    subtitle: "Accès instantané aux traités neurocomportementaux et invocations ciblées.",
    price: "Dès 5,90 €",
    priceSub: "eBook & format de poche",
    duration: "Lecture à votre rythme",
    deliverables: [
      "Traité « Les Secrets de la Salât » (Neurobiologie du Sujûd)",
      "Recueil des Invocations de Détresse et Phonétique",
      "Diagrammes d'anatomie et de circulation vagale",
      "Téléchargement PDF sécurisé immédiat",
    ],
    ctaText: "Découvrir les Livres",
    ctaHref: "/livres",
  },
  bilan: {
    key: "bilan",
    tag: "Diagnostic Décideur",
    badge: "Séance Individuelle 1h30",
    title: "Le Bilan Comportemental",
    subtitle: "Cartographie complète de votre charge allostatique et plan d'urgence.",
    price: "190,00 €",
    priceSub: "Séance d'impact 1h30",
    duration: "1 séance intensive de 90 min",
    deliverables: [
      "Entretien privé approfondi de 1h30 avec Mounir Byar",
      "Analyse de vos déclencheurs de procrastination (At-Taswîf)",
      "Audit de votre environnement et hygiène de prière",
      "Feuille de route stratégique personnalisée",
    ],
    ctaText: "Réserver mon Bilan (45 min d'orientation)",
    ctaHref: "/rendez-vous",
  },
  protocole30: {
    key: "protocole30",
    tag: "Recommandé • Rupture du Taswîf",
    badge: "Transformation 30 Jours",
    title: "Protocole C.O.M.E.S. 30J",
    subtitle: "Le protocole intensif le plus choisi pour sanctuariser définitivement ses 5 prières.",
    price: "612,70 €",
    priceSub: "ou 3x 204,23 € sans frais",
    duration: "30 jours d'immersion guidée",
    deliverables: [
      "4 séances individuelles intensives avec Mounir Byar",
      "Messagerie privée 5j/7 pour un suivi en temps réel",
      "Déploiement des 4 Piliers initiaux C.O.M.E. (le 5e Pilier S étant réservé au suivi 9 mois)",
      "Garantie de résultat : ancrage inaltérable des 5 prières",
    ],
    ctaText: "Rejoindre le Protocole 30 Jours",
    ctaHref: "/offres",
    isPopular: true,
  },
  mandat9mois: {
    key: "mandat9mois",
    tag: "Immersion Complète",
    badge: "Compagnonnage 9 Mois",
    title: "Mandat Khalifa 9 Mois",
    subtitle: "Refonte structurelle intégrale sous la supervision directe de Mounir Byar.",
    price: "Sur Mesure",
    priceSub: "Sélection sur dossier uniquement",
    duration: "9 mois de transformation holistique",
    deliverables: [
      "Déploiement exclusif du 5e Pilier S (Stabilité sur le Temps & Istiqama)",
      "Supervision continue et accès direct VIP",
      "Alignement de votre capital mental, famille et entreprise",
      "Protocoles avancés de leadership prophétique",
      "Entretien préalable obligatoire pour validation",
    ],
    ctaText: "Candidater à l'Immersion (45 min)",
    ctaHref: "/rendez-vous",
  },
};

export default function OfferConfigurator() {
  const [selectedKey, setSelectedKey] = useState<OfferKey>("protocole30");
  const activeOffer = OFFERS[selectedKey];

  return (
    <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E0D2]">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
          CONFIGURATEUR D&apos;ENGAGEMENT
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight">
          Sélectionnez Votre Parcours de Souveraineté.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5C534A] leading-relaxed">
          Basculez entre nos formats pour visualiser les livrables, la durée et l&apos;investissement associé.
        </p>
      </div>

      {/* SÉLECTEUR D'OFFRES HORIZONTAL (STYLE MATERIAL FLASK CONFIGURATOR) */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {(Object.keys(OFFERS) as OfferKey[]).map((key) => {
          const item = OFFERS[key];
          const isSelected = selectedKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={`px-5 py-3 rounded-2xl text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
                isSelected
                  ? "bg-[#141210] text-white border-[#141210] shadow-md"
                  : "bg-white text-[#5C534A] border-[#E8E0D2] hover:border-[#B88E3E] hover:text-[#141210]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? "bg-[#B88E3E] dark:bg-[#D4A853]" : "bg-neutral-400"
                }`}
              />
              <span>{item.title}</span>
              {item.isPopular && (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] text-[#0A1128] font-mono font-bold ml-1">
                  Top
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* PANNEAU DE DÉTAIL DE L'OFFRE SÉLECTIONNÉE */}
      <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* GAUCHE : DÉTAILS ET LIVRABLES */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#B88E3E]/10 text-[#8C6214] dark:text-[#D4A853] text-[10px] font-mono font-bold uppercase tracking-wider">
                {activeOffer.tag}
              </span>
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                {activeOffer.duration}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)]">
              {activeOffer.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              {activeOffer.subtitle}
            </p>

            <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block font-semibold">
                Ce qui est inclus dans cette formule :
              </span>
              {activeOffer.deliverables.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                  <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DROITE : PRIX & ACTION CTA */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] text-center md:text-right space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block">
                Investissement Officiel
              </span>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--text-primary)] mt-1">
                {activeOffer.price}
              </div>
              <span className="text-xs font-mono text-[#8C6214] dark:text-[#D4A853] font-semibold mt-1 block">
                {activeOffer.priceSub}
              </span>
            </div>

            <Link
              href={activeOffer.ctaHref}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md text-center"
            >
              <span>{activeOffer.ctaText}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>

            <span className="text-[10px] font-mono text-[#7A6F64]">
              Paiement sécurisé Stripe • Satisfait ou remboursé
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
