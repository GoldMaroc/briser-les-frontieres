"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";

const FIL_CONDUCTEUR = [
  {
    step: "01",
    tag: "RUPTURE DU CHAOS MENTAL",
    metric: "+62%",
    metricLabel: "Bande passante cognitive libérée",
    title: "Nettoyage Cognitif & Précision Décisionnelle",
    shortSummary: "Fermer les boucles mentales ouvertes, désamorcer l'urgence permanente et éliminer le bruit qui paralyse votre discernement.",
    stateBefore: "Surcharge mentale, procrastination masquée, dispersion et perte d'énergie vitale.",
    stateAfter: "Clarté d'esprit immédiate, concentration profonde et libération de l'attention.",
    keyPoints: [
      "Extinction des boucles ouvertes dans le cortex préfrontal",
      "Élimination des micro-décisions superflues",
      "Restauration de la capacité d'action immédiate",
    ],
    accent: "#B88E3E",
  },
  {
    step: "02",
    tag: "LE PIVOT SACRÉ (SALÂT & NEURO)",
    metric: "-40%",
    metricLabel: "De cortisol dès 7 jours de protocole",
    title: "L'Ancrage Neuro-Spirituel de la Salât",
    shortSummary: "La prière n'est pas un rituel machinal : c'est le pivot d'alignement physiologique, vagal et spirituel qui ordonne votre journée.",
    stateBefore: "Prières expédiées ou repoussées, déconnexion intérieure, culpabilité constante.",
    stateAfter: "5 réinitialisations souveraines par jour, apaisement du nerf vague et foi vivante.",
    keyPoints: [
      "Activation du système parasympathique et régulation du rythme cardiaque",
      "Alignement circadien sur les 5 portes célestes solaires",
      "Sanctuarisation de l'espace domestique (Tahara 360°)",
    ],
    accent: "#B88E3E",
  },
  {
    step: "03",
    tag: "LE STATUT DE KHALIFA",
    metric: "8 Piliers",
    metricLabel: "Souveraineté & Maîtrise de Soi durable",
    title: "Gouvernance de Vie & Autorité Intérieure",
    shortSummary: "Reprendre l'autorité sur votre esprit, votre foyer, vos finances et votre temps pour assumer pleinement votre mandat terrestre.",
    stateBefore: "Sentiment d'impuissance, vie subie au lieu d'être dirigée, compromis constants.",
    stateAfter: "Maîtrise de soi inaltérable, droiture, sérénité et impact fécond sur votre entourage.",
    keyPoints: [
      "Autonomie spirituelle et émotionnelle face aux épreuves",
      "Alignement de l'activité professionnelle sur l'éthique sacrée",
      "Rayonnement protecteur et structurant sur votre famille",
    ],
    accent: "#D4A853",
  },
];

export default function EditorialBentoGrid() {
  const [activeStep, setActiveStep] = useState(0);
  const currentItem = FIL_CONDUCTEUR[activeStep];

  return (
    <section className="py-14 sm:py-20 lg:py-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
      
      {/* EN-TÊTE ÉDITORIAL AVEC EYEBROW STATUTAIRE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#B88E3E] dark:text-[#D4A853] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider mb-2.5">
            LE FIL CONDUCTEUR // SOUVERAINETÉ EN 3 ACTES
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight">
            De la Saturation Mentale à l&apos;Autorité Souveraine.
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[var(--text-secondary)] font-sans max-w-xl leading-relaxed">
            Un fil conducteur limpide, sans jargon ni charge cognitive : comprenez la cause, activez le pivot sacré et gouvernez votre vie.
          </p>
        </div>

        <Link
          href="/fondements"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] hover:underline"
        >
          <span>Comprendre les 5 Dimensions</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* SÉLECTEUR D'ACTES DYNAMIQUE TACTILE SUR MOBILE & DESKTOP */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] mb-8">
        {FIL_CONDUCTEUR.map((item, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`py-3 px-2 sm:px-4 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${
                isActive
                  ? "bg-[var(--bg)] text-[var(--text-primary)] shadow-sm border border-[#B88E3E]/40"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="font-mono text-xs sm:text-sm font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                ACTE {item.step}
              </span>
              <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider truncate max-w-[90px] sm:max-w-none">
                {idx === 0 ? "Le Chaos" : idx === 1 ? "Le Pivot" : "Le Khalifa"}
              </span>
            </button>
          );
        })}
      </div>

      {/* PANNEAU ACTIF INTERACTIF : FOCUS SUR LE PALIER SÉLECTIONNÉ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="p-6 sm:p-10 rounded-2xl sm:rounded-[var(--radius-card)] bg-[var(--surface)] border border-[#B88E3E]/35 dark:border-[#D4A853]/40 shadow-md mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Colonne Gauche : Chiffre Clé & Métrique */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-6 lg:pb-0 lg:pr-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853]">
                    ACTE {currentItem.step} • {currentItem.tag}
                  </span>
                </div>
                <div className="font-heading font-extrabold text-4xl sm:text-6xl text-[var(--text-primary)] tracking-tight">
                  {currentItem.metric}
                </div>
                <p className="text-xs sm:text-sm font-mono text-[#B88E3E] dark:text-[#D4A853] font-semibold">
                  {currentItem.metricLabel}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] mb-2">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  {currentItem.shortSummary}
                </p>
              </div>
            </div>

            {/* Colonne Droite : Avant / Après & Leviers Concrets */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Comparatif Synthétique Avant / Après */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-[var(--bg)]/70 border border-red-500/20 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-500 dark:text-red-400 font-bold flex items-center gap-1.5">
                    <span>✕</span> ÉTAT INITIAL SUBI
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {currentItem.stateBefore}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg)]/70 border border-[#B88E3E]/30 dark:border-[#D4A853]/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] font-bold flex items-center gap-1.5">
                    <span>✓</span> ÉTAT SOUVERAIN ACQUIS
                  </span>
                  <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
                    {currentItem.stateAfter}
                  </p>
                </div>
              </div>

              {/* 3 Leviers d'Action Clairs */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold block">
                  LEVIERS CONCRETS DU PROTOCOLE :
                </span>
                <div className="space-y-2">
                  {currentItem.keyPoints.map((point) => (
                    <div key={point} className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton d'Action Immédiat pour ce Palier (ZÉRO PRIX DANS LE BOUTON) */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  <span>Prendre Rendez-vous</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/audit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] hover:border-[#B88E3E] text-[var(--text-primary)] text-xs font-heading font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Évaluer mon score</span>
                </Link>
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* VUE D'ENSEMBLE DES 3 CARTES (POUR LES UTILISATEURS QUI SCROLLENT LIBREMENT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FIL_CONDUCTEUR.map((item, idx) => {
          const isSelected = activeStep === idx;
          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-5 sm:p-6 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[var(--surface)] border-[#B88E3E] dark:border-[#D4A853] ring-1 ring-[#B88E3E]/30"
                  : "bg-[var(--surface)]/50 border-[var(--border)] hover:border-[#B88E3E]/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xl font-bold text-[#B88E3E] dark:text-[#D4A853]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-[var(--text-primary)] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans line-clamp-2">
                  {item.shortSummary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono">
                <span className={isSelected ? "text-[#B88E3E] dark:text-[#D4A853] font-bold" : "text-[var(--text-secondary)]"}>
                  {isSelected ? "Sélectionné" : "Toucher pour voir"}
                </span>
                <span className="text-xs">→</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
