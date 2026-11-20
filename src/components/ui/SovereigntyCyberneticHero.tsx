"use client";

import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import HeroVerseCard from "@/components/ui/HeroVerseCard";
import ShowcaseStage from "@/components/ui/ShowcaseStage";
import TransformationSlider from "@/components/ui/TransformationSlider";
import EditorialBentoGrid from "@/components/ui/EditorialBentoGrid";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";

export default function SovereigntyCyberneticHero() {
  return (
    <div className="relative w-full bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-280">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 : HERO ÉDITORIAL AVEC LE VERSET SACRÉ D'AL-HADÎD (57:16)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full border-b border-[var(--border)] overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* COLONNE GAUCHE (ÉDITORIALE & ACTIONS DIRECTES) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Eyebrow Statutaire Joaillerie */}
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/35 text-[#8C6214] dark:text-[#D4A853]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] animate-pulse" />
                  <span className="font-mono text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em]">
                    CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
                  </span>
                </div>
                <span className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] hidden sm:inline">
                  PARIS // REIMS • PAR MOUNIR BYAR
                </span>
              </div>

              {/* Titre Principal H1 */}
              <h1 
                style={{ textWrap: "balance" }}
                className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] text-[var(--text-primary)] tracking-[-0.03em] leading-[1.08]"
              >
                L&apos;Ingénierie de la Souveraineté.
                <span className="block mt-2 font-serif italic font-normal text-[#B88E3E] dark:text-[#D4A853] text-2xl sm:text-4xl lg:text-[3.15rem] leading-[1.12]">
                  Le Retour au Khalifa par la Maîtrise de Soi.
                </span>
              </h1>

              {/* Pitch sans surcharge cognitive */}
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] font-sans leading-[1.65] max-w-xl font-normal">
                Sortez du chaos mental, de l&apos;éparpillement et de la culpabilité. Réveillez la réflexion profonde, apaisez vos sensations et fortifiez une foi inébranlable (Yaqîn). La prière devient le pivot sacré d&apos;alignement neurobiologique et spirituel.
              </p>

              {/* Deux Boutons Majeurs Mobile-First (ZÉRO PRIX DANS LE BOUTON • ZÉRO VERT FLUO) */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(184,142,62,0.25)] active:scale-95 text-center"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0A1128] animate-pulse" />
                  <span>Prendre Rendez-vous</span>
                </Link>

                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-[#0A1128] dark:bg-[#F0EDE8] text-[#FAF8F5] dark:text-[#0A1128] hover:bg-[#142238] dark:hover:bg-[#FFFFFF] border border-[#B88E3E]/40 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 text-center"
                >
                  <span>Passer l&apos;Audit Gratuit</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Éléments de Réassurance Synthétiques (Or & Noblesse) */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] sm:text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">✓</span>
                  <span>Séance Téléphone &bull; Présentiel Domicile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">✓</span>
                  <span>Alliance Neurosciences &amp; Révélation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">✓</span>
                  <span>Zéro Culpabilisation • Protocole Sur-Mesure</span>
                </div>
              </div>

            </div>

            {/* COLONNE DROITE : VERSET SACRÉ SOURATE AL-HADÎD 57:16 */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroVerseCard />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 : PINNED SCROLLYTELLING SHOWCASE (STYLE MATERIAL GOURDE)
          La page reste épinglée au scroll, ne descend pas et wipe 4 images monumentales
          ═══════════════════════════════════════════════════════════ */}
      <ShowcaseStage />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 : LE FIL CONDUCTEUR EN 3 ACTES (DYNAMIQUE & TACTILE)
          01. Le Chaos Mental -> 02. Le Pivot Sacré -> 03. Le Mandat de Khalifa
          ═══════════════════════════════════════════════════════════ */}
      <EditorialBentoGrid />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 : SLIDER INTERACTIF AVANT / APRÈS (LA TRANSFORMATION)
          ═══════════════════════════════════════════════════════════ */}
      <TransformationSlider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 : LES FORMULES & PRESTATIONS D'ACCOMPAGNEMENT
          Clarté absolue : Prix fermes, zéro mélange avec les livres
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#B88E3E] dark:text-[#D4A853] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider mb-2.5">
              PRESTATIONS CLINIQUES DU CABINET
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              Nos Formules d&apos;Accompagnement.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] font-sans max-w-xl leading-relaxed">
              Des tarifs clairs et transparents, adaptés à votre besoin immédiat ou à une refonte complète de votre trajectoire.
            </p>
          </div>

          <Link
            href="/prix"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] hover:underline"
          >
            <span>Consulter la grille complète des tarifs</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 CARTES DE PRESTATIONS AUX TARIFS BIEN DISTINCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARTE 1 : ENTRETIEN TÉLÉPHONIQUE & VISIO (48,95 €) */}
          <div className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[#B88E3E] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] font-bold">
                  Diagnostic Préalable
                </span>
                <span className="text-[10px] font-mono bg-[#B88E3E]/15 text-[#B88E3E] dark:text-[#D4A853] px-2 py-0.5 rounded-full font-bold">
                  45 Min
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                Entretien Téléphonique &amp; Visio
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                Analyse chirurgicale de votre charge mentale, de vos déclencheurs de procrastination et remise d&apos;une feuille de route d&apos;urgence.
              </p>
              <div className="mb-6">
                <div className="text-3xl font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                  48,95 €
                </div>
                <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                  Règlement à la réservation • Déductible d&apos;un protocole
                </span>
              </div>
            </div>
            <Link
              href="/rendez-vous"
              className="w-full py-3 rounded-full border border-[#B88E3E]/50 hover:border-[#B88E3E] bg-[var(--bg)] text-center text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all"
            >
              Réserver par Téléphone
            </Link>
          </div>

          {/* CARTE 2 : CONSULTATION PRÉSENTIELLE À DOMICILE (96,45 €) */}
          <div className="p-7 rounded-2xl bg-[var(--surface)] border-2 border-[#B88E3E] dark:border-[#D4A853] shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-[#B88E3E] dark:bg-[#D4A853] text-[#0A1128] text-[10px] font-heading font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              Déplacement à Domicile
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] font-bold">
                  Audit Somatique &amp; Spatial
                </span>
                <span className="text-[10px] font-mono bg-[#B88E3E]/15 text-[#B88E3E] dark:text-[#D4A853] px-2 py-0.5 rounded-full font-bold">
                  1h15
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                Consultation à Domicile
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                Mounir Byar se déplace personnellement chez vous. Audit physique de l&apos;habitat, sanctuarisation de l&apos;espace de prière (Tahara 360°) et diagnostic des 8 piliers.
              </p>
              <div className="mb-6">
                <div className="text-3xl font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                  96,45 €
                </div>
                <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                  Mounir Byar se déplace chez vous
                </span>
              </div>
            </div>
            <Link
              href="/rendez-vous"
              className="w-full py-3 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-center text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Réserver la Visite à Domicile
            </Link>
          </div>

          {/* CARTE 3 : PROTOCOLE IMMERSION 30 JOURS (612,70 €) */}
          <div className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[#B88E3E] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] font-bold">
                  Accompagnement Intensif
                </span>
                <span className="text-[10px] font-mono bg-[#B88E3E]/15 text-[#B88E3E] dark:text-[#D4A853] px-2 py-0.5 rounded-full font-bold">
                  30 Jours
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                Protocole Immersion 30J
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                4 séances individuelles, messagerie privée 5j/7 et mise en place des ancrages environnementaux pour ne plus jamais manquer une prière.
              </p>
              <div className="mb-6">
                <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                  612,70 €
                </div>
                <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                  ou 3x 204,23 € sans frais
                </span>
              </div>
            </div>
            <Link
              href="/offres"
              className="w-full py-3 rounded-full bg-[var(--text-primary)] hover:bg-[#B88E3E] text-[var(--bg)] hover:text-[#0A1128] text-center text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Rejoindre le Protocole 30J
            </Link>
          </div>

        </div>

        {/* AGENDA DIRECT EMBARQUÉ SANS REDIRECTION BRUSQUE */}
        <div className="mt-12 pt-10 border-t border-[var(--border)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#B88E3E] dark:text-[#D4A853] font-bold">
              RÉSERVATION IMMÉDIATE EN LIGNE
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] mt-1">
              Choisissez votre créneau avec Mounir Byar
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Du lundi au samedi (9h - 18h, vendredi matin 9h - 12h).
            </p>
          </div>
          <AgendaDoctolib />
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 : LA LIBRAIRIE FONDATRICE (TRAITÉS ÉCRITS)
          Découplage strict pour ne jamais mélanger livres et consultations
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-18 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        <div className="p-8 sm:p-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#B88E3E] dark:text-[#D4A853] font-bold">
              TRAITÉS FONDATEURS DU CABINET
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)]">
              Vous préférez débuter par l&apos;étude autonome ?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Découvrez les 3 ouvrages majeurs de Mounir Byar : <em>« Les Secrets de la Prière »</em>, <em>« Ar-Rahmân »</em> et <em>« Adam et la Science Moderne »</em>. 
              Les 10 premières pages sont en libre consultation gratuite et immédiate sur le site.
            </p>
          </div>

          <Link
            href="/livres"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--text-primary)] hover:bg-[#B88E3E] text-[var(--bg)] hover:text-[#0A1128] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            <span>Feuilleter les Livres (Gratuit)</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 : TÉMOIGNAGES CLIENTS & PREUVE SOCIALE
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold">
            RÉSULTATS CLINIQUES CONCRETS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
            Ils ont restauré leur souveraineté.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-xs hover:border-[#B88E3E] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[var(--text-primary)]">Karim B.</strong>
              <span className="text-xs font-mono text-[#B88E3E] dark:text-[#D4A853] font-semibold bg-[#B88E3E]/10 px-2.5 py-0.5 rounded-full">
                Audit : 87%
              </span>
            </div>
            <div className="text-[#B88E3E] dark:text-[#D4A853] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              « En tant que dirigeant, j&apos;étais noyé dans l&apos;urgence. La consultation avec Mounir m&apos;a fait comprendre que ma dispersion n&apos;était pas un manque de volonté, mais une rupture de biorythme. En 30 jours, j&apos;ai retrouvé un calme impérial. »
            </p>
            <span className="block text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
              Consultation Téléphonique • Chef d&apos;entreprise
            </span>
          </div>

          <div className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-xs hover:border-[#B88E3E] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[var(--text-primary)]">Youssef T.</strong>
              <span className="text-xs font-mono text-[#B88E3E] dark:text-[#D4A853] font-semibold bg-[#B88E3E]/10 px-2.5 py-0.5 rounded-full">
                Audit : 92%
              </span>
            </div>
            <div className="text-[#B88E3E] dark:text-[#D4A853] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              « On ne m&apos;avait jamais expliqué le sens profond de chaque mouvement. Grâce à l&apos;exégèse de Mounir et aux neurosciences, j&apos;ai renoué avec la Salât avec une conviction inébranlable. »
            </p>
            <span className="block text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
              Protocole 30 Jours • Cadre Supérieur
            </span>
          </div>

          <div className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-xs hover:border-[#B88E3E] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[var(--text-primary)]">Mehdi R.</strong>
              <span className="text-xs font-mono text-[#B88E3E] dark:text-[#D4A853] font-semibold bg-[#B88E3E]/10 px-2.5 py-0.5 rounded-full">
                Audit : 95%
              </span>
            </div>
            <div className="text-[#B88E3E] dark:text-[#D4A853] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              « Je faisais la prière, puis j&apos;arrêtais. Ces coupures constantes me rongeaient. Le système de verrouillage environnemental et la visite à domicile ont tout changé. Depuis 8 mois, pas une seule prière manquée. »
            </p>
            <span className="block text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
              Consultation Domicile &bull; Ingénieur
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 : BANNIÈRE D'APPEL À L'ACTION FINALE
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-14 rounded-2xl bg-[var(--surface)] border border-[#B88E3E]/30 text-center shadow-xs">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold mb-3">
            PASSER À L&apos;ACTION DÈS AUJOURD&apos;HUI
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] max-w-xl mx-auto tracking-tight">
            Prêt à restaurer votre souveraineté mentale et spirituelle ?
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            Commencez par notre audit gratuit pour cartographier vos zones de rupture cognitive ou réservez directement votre consultation confidentielle.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/rendez-vous"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Prendre Rendez-vous</span>
            </Link>
            <Link
              href="/audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0A1128] dark:bg-[#F0EDE8] text-[#FAF8F5] dark:text-[#0A1128] hover:bg-[#142238] dark:hover:bg-[#FFFFFF] border border-[#B88E3E]/40 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Passer l&apos;audit gratuit</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
