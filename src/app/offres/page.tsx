"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

const COMES_PILLARS = [
  {
    letter: "C",
    title: "Cognitif & Psychologique",
    subtitle: "Rupture de la Charge Allostatique",
    desc: "Vidange chirurgicale des boucles mentales ouvertes, désamorçage de l'amygdale et extinction de la rumination nocturne.",
    metric: "-78% de distraction",
    keyActions: [
      "Cartographie des points de rupture mentale",
      "Protocole de clôture cognitive du soir",
      "Restitution de la mémoire de travail (Cortex Préfrontal)",
    ],
  },
  {
    letter: "O",
    title: "Organisationnel & Temporel",
    subtitle: "Sanctuarisation de l'Agenda",
    desc: "Alignement inviolable des 5 prières quotidiennes comme bornes structurelles de la journée. Le travail s'adapte à la prière, et non l'inverse.",
    metric: "100% de prières à l'heure",
    keyActions: [
      "Verrouillage des blocs de 45 minutes dans l'agenda",
      "Élimination des micro-décisions superflues",
      "Protection absolue des créneaux de Fajr et d'Asr",
    ],
  },
  {
    letter: "M",
    title: "Métabolique & Circadien",
    subtitle: "Régulation du Cortisol & Sommeil",
    desc: "Synchronisation biologique sur les cycles solaires. Réinitialisation de la sécrétion de mélatonine et effondrement du cortisol sanguin.",
    metric: "-40% de cortisol sérique",
    keyActions: [
      "Exposition à la lumière naturelle dès l'aube",
      "Jeûne intermittent prophétique (Lundi / Jeudi)",
      "Couvre-feu numérique 60 min avant le coucher",
    ],
  },
  {
    letter: "E",
    title: "Environnemental & Spatial",
    subtitle: "Architecture de la Tahara 360°",
    desc: "Aménagement physique de votre habitat. Création d'un sanctuaire domestique sans aucun écran ni interférence pour un recueillement instantané.",
    metric: "0 friction d'accès au tapis",
    keyActions: [
      "Audit ergonomique de l'habitat (visite à domicile possible)",
      "Sanctuarisation de l'espace de prière pur et ordonné",
      "Suppression des déclencheurs visuels de procrastination",
    ],
  },
  {
    letter: "S",
    title: "Stabilité sur le Temps",
    subtitle: "Pérennisation & Istiqama Durable",
    desc: "Verrouillage définitif des acquis comportementaux et de la souveraineté. Ce pilier ultime d'auto-gouvernance et de constance (Istiqama) est exclusivement dispensé au sein de la Mission 9 Mois.",
    metric: "Exclusif 9 Mois",
    isExclusive9Months: true,
    keyActions: [
      "Systématisation de la Muhasaba (audit et auto-correction hebdomadaire)",
      "Ancrage de l'Istiqama inébranlable face aux chocs et ruptures de routine",
      "Souveraineté autonome du Khalifa : le système perdure sans dépendance",
    ],
  },
];

const OFFERS = [
  {
    id: "rdv-tel",
    badge: "Diagnostic Clinique",
    title: "Entretien Téléphonique & Visio",
    duration: "45 Minutes",
    price: "48,95 €",
    priceSub: "Règlement à la réservation",
    desc: "Analyse chirurgicale de votre charge mentale et de vos blocages de prière. Établissement d'une feuille de route stratégique immédiate avec Mounir Byar.",
    cta: "Réserver mon Entretien",
    ctaLink: "/rendez-vous",
    featured: false,
    features: [
      "Entretien privé individuel de 45 minutes avec Mounir Byar",
      "Analyse de vos déclencheurs de procrastination (At-Taswîf)",
      "Vérification de la charge mentale et des boucles ouvertes",
      "Remise d'une feuille de route stratégique d'urgence",
      "Montant déductible si vous rejoignez un protocole sous 7j",
    ],
  },
  {
    id: "rdv-presentiel",
    badge: "À Votre Domicile",
    title: "Consultation Présentielle à Domicile",
    duration: "1h15 à Domicile",
    price: "96,45 €",
    priceSub: "Mounir Byar se déplace chez vous",
    desc: "Mounir Byar se déplace personnellement à votre domicile. Audit physique de l'habitat, sanctuarisation du lieu de prière (Tahara 360°) et diagnostic des 8 piliers.",
    cta: "Réserver à Domicile",
    ctaLink: "/rendez-vous",
    featured: false,
    features: [
      "Déplacement physique de Mounir Byar à votre domicile",
      "Audit d'ergonomie et d'architecture domestique (Tahara 360°)",
      "Sanctuarisation de votre coin de prière sans distraction",
      "Diagnostic complet des 8 Piliers du Life-Reset",
      "Protocole personnalisé remis en main propre",
    ],
  },
  {
    id: "30j",
    badge: "Le Plus Choisi",
    title: "Protocole C.O.M.E.S. 30 Jours",
    duration: "30 Jours d'Immersion",
    price: "612,70 €",
    priceSub: "ou 3x 204,23 € sans aucun frais",
    desc: "Un mois d'intervention intensive pour briser définitivement l'inertie, réguler le cortisol et sanctuariser les 5 prières quotidiennes.",
    cta: "Rejoindre le Protocole 30J",
    ctaLink: "/paiement?product=30j",
    featured: true,
    features: [
      "4 séances individuelles intensives avec Mounir Byar",
      "Messagerie privée 5j/7 pour un déblocage en temps réel",
      "Déploiement des 4 Piliers initiaux C.O.M.E. (le 5e Pilier S étant exclusif au mentorat 9 mois)",
      "Suivi hebdomadaire de la régularité et baisse du cortisol",
      "Garantie de résultat et d'ancrage inaltérable",
    ],
  },
  {
    id: "9m",
    badge: "Sélection sur Dossier",
    title: "Mandat Khalifa 9 Mois",
    duration: "9 Mois d'Excellence",
    price: "Sur Mesure",
    priceSub: "Sélection stricte sur dossier",
    desc: "Refonte structurelle intégrale de votre existence. Alignement spirituel, professionnel et familial sous la supervision directe de Mounir Byar.",
    cta: "Candidater à l'Immersion",
    ctaLink: "/rendez-vous",
    featured: false,
    features: [
      "Déploiement exclusif du Pilier S (Stabilité sur le Temps & Istiqama)",
      "Supervision continue et ligne directe privée avec Mounir Byar",
      "Refonte de vos 8 Piliers de vie (mental, couple, finances, culte)",
      "Tous les traités, ouvrages et outils d'ingénierie inclus",
      "Visites et ajustements réguliers sur le terrain",
      "Cadre d'excellence et de discrétion absolue",
    ],
  },
];

export default function OffresPage() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] pt-24 pb-28 px-4 sm:px-6 lg:px-12 selection:bg-[#087B53]/20 transition-colors duration-280">
      <div className="max-w-[1360px] mx-auto space-y-20 relative z-10">

        {/* ═════════════════════════════════════════════════════════════════
            EN-TÊTE ÉDITORIAL PROTOCOLE C.O.M.E.S.
            ═════════════════════════════════════════════════════════════════ */}
        <div className="border-b border-[var(--border)] pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087B53] animate-pulse" />
              <span className="font-bold uppercase tracking-[0.2em] text-[#087B53]">
                MÉTHODE PROPRIÉTAIRE // CABINET BLF
              </span>
            </div>
            <span className="text-[var(--text-secondary)]">
              INGÉNIERIE DE LA SOUVERAINETÉ • PROTOCOLE C.O.M.E.S.
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.08]">
            Le Protocole C.O.M.E.S. &amp;{" "}
            <span className="text-[#087B53] dark:text-[#4ade80]">
              Nos Accompagnements
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans max-w-3xl leading-relaxed">
            Une science du déblocage comportemental conçue pour les musulmans submergés par la charge mentale. Découvrez les 5 piliers fondamentaux (avec le pilier <strong className="text-[#087B53] dark:text-[#4ade80]">S pour la Stabilité sur le temps</strong>, exclusif à la mission 9 mois).
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono">
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              🧠 5 Piliers C.O.M.E.S.
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              🛡 0% Riba • Garantie Absolue
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[#087B53] font-bold">
              ✓ Téléphone (48,95 €) ou Domicile (96,45 €)
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 1 : LES 5 PILIERS C.O.M.E.S. (INTERACTIVE GRID)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                MÉCANISME CLINIQUE // 5 PILIERS C.O.M.E.S.
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                L&apos;Ingénierie des 5 Piliers de Transformation
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Cliquez sur un pilier pour explorer ses protocoles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {COMES_PILLARS.map((p, idx) => {
              const isSelected = selectedPillar === idx;
              const isS = p.letter === "S";
              return (
                <button
                  key={p.letter}
                  type="button"
                  onClick={() => setSelectedPillar(idx)}
                  className={`p-5 rounded-[var(--radius-card)] text-left transition-all cursor-pointer border flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? "bg-[#087B53] text-white border-[#087B53] shadow-md ring-2 ring-[#087B53]/20"
                      : isS
                      ? "bg-[var(--surface)] text-[var(--text-primary)] border-[#087B53]/50 hover:border-[#087B53]"
                      : "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] hover:border-[#087B53]"
                  }`}
                >
                  {isS && !isSelected && (
                    <div className="absolute top-0 right-0 bg-[#087B53] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                      Mission 9M
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`text-2xl font-heading font-extrabold ${isSelected ? "text-white" : "text-[#087B53]"}`}>
                        {p.letter}
                      </span>
                      <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : isS ? "bg-[#087B53]/15 text-[#087B53]" : "bg-[#087B53]/10 text-[#087B53]"}`}>
                        {p.metric}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base mb-1 leading-snug">
                      {p.title}
                    </h3>
                    <p className={`text-[11px] font-mono mb-2 ${isSelected ? "text-white/80" : "text-[#087B53] dark:text-[#4ade80] font-semibold"}`}>
                      {p.subtitle}
                    </p>
                    <p className={`text-xs leading-relaxed font-sans ${isSelected ? "text-white/90" : "text-[var(--text-secondary)]"}`}>
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 dark:border-neutral-700 text-[11px] font-mono font-bold flex items-center justify-between">
                    <span>{isS ? "Détails 9 Mois" : "Voir les actions"}</span>
                    <span>&rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* DÉTAIL DU PILIER SÉLECTIONNÉ */}
          {(() => {
            const p = COMES_PILLARS[selectedPillar];
            return (
              <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#087B53] font-bold">
                  Protocole Actif &bull; Pilier {p.letter} ({p.title})
                </span>
                <h4 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
                  Actions de Terrain &amp; Déploiement :
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {p.keyActions.map((action, i) => (
                    <li key={i} className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-secondary)] font-sans leading-relaxed flex items-start gap-2.5">
                      <span className="text-[#087B53] font-bold text-sm">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 2 : GRILLE OFFICIELLE DES OFFRES & CONSULTATIONS
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                ENGAGEMENT // NOS MODALITÉS D&apos;ACCOMPAGNEMENT
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Grille des Consultations &amp; Protocoles Privés
              </h2>
            </div>
            <Link
              href="/prix"
              className="text-xs font-mono uppercase tracking-wider text-[#B88E3E] font-bold hover:underline"
            >
              Consulter la grille complète des tarifs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className={`p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border flex flex-col justify-between transition-all ${
                  offer.featured
                    ? "border-2 border-[#087B53] shadow-md relative"
                    : "border-[var(--border)] shadow-xs hover:border-[#087B53]"
                }`}
              >
                {offer.featured && (
                  <div className="absolute -top-3.5 right-6 bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    Recommandé
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#087B53] font-bold uppercase tracking-wider">
                      {offer.badge}
                    </span>
                    <span className="text-[10px] font-mono bg-[var(--bg)] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)]">
                      {offer.duration}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    {offer.desc}
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      {offer.price}
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                      {offer.priceSub}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    {offer.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#087B53] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={offer.ctaLink}
                  className={`w-full py-3.5 rounded-full text-center text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-xs ${
                    offer.featured
                      ? "bg-[#087B53] hover:bg-[#065f40] text-white shadow-md"
                      : "bg-[var(--bg)] border border-[var(--border)] hover:border-[#087B53] text-[var(--text-primary)]"
                  }`}
                >
                  {offer.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 3 : APPEL À L'ACTION & AUDIT
            ═════════════════════════════════════════════════════════════════ */}
        <section className="p-8 sm:p-12 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
            COMMENCER PAR UN DIAGNOSTIC PRÉALABLE
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight max-w-xl mx-auto">
            Pas encore certain de la formule adaptée ?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto font-sans">
            Passez notre audit clinique gratuit pour mesurer votre score de charge mentale ou réservez un entretien diagnostic de 45 minutes par téléphone.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Passer l&apos;audit gratuit</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:border-[#087B53] text-[var(--text-primary)] text-xs font-heading font-semibold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>Prendre RDV (Tél 48,95 € • Domicile 96,45 €)</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
