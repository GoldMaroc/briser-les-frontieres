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

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO ÉDITORIAL AVEC PROCEDURAL HEROCANVAS (NOUVEAU DOSSIER 4)
          ET LE VERSET SACRÉ DE SOURATE AL-HADÎD (57:16)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full border-b border-[var(--border)] overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* COLONNE GAUCHE (ÉDITORIALE) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Double Eyebrow Statutaire */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087B53]/10 border border-[#087B53]/30 text-[#087B53] dark:text-[#4ade80]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em]">
                    CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
                  </span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] hidden sm:inline">
                  PARIS // REIMS • PAR MOUNIR BYAR
                </span>
              </div>

              {/* Titre Principal H1 */}
              <h1 
                style={{ textWrap: "balance" }}
                className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.65rem] text-[var(--text-primary)] tracking-[-0.03em] leading-[1.08]"
              >
                L&apos;Ingénierie de la Souveraineté.
                <span className="block mt-2 font-serif italic font-normal text-[#B88E3E] dark:text-[#D4A853] text-2xl sm:text-4xl lg:text-[3.25rem] leading-[1.12]">
                  Le Retour au Khalifa par la Maîtrise de Soi.
                </span>
              </h1>

              {/* Sous-titre équilibré : Réflexion, Sensations, Foi, Pivot Sacré */}
              <p className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-[1.65] max-w-xl font-normal">
                Réveillez la réflexion profonde, apaisez vos sensations et fortifiez une foi inébranlable (Yaqîn). Une démarche d&apos;excellence cognitive et spirituelle où la prière agit comme le pivot sacré d&apos;alignement et de souveraineté.
              </p>

              {/* Actions Clés (Zéro mention 3 min, flèches SVG vectorielles) */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/audit"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(8,123,83,0.22)] hover:shadow-[0_6px_22px_rgba(8,123,83,0.32)] hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <span>Passer l&apos;audit gratuit</span>
                  <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 hover:bg-white dark:hover:bg-neutral-800 text-[var(--text-primary)] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-300 hover:border-[#087B53] text-center"
                >
                  <span>Prendre RDV (45 min)</span>
                </Link>
              </div>

              {/* Micro-Réassurance d'Autorité */}
              <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[var(--border)] w-full text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span>
                  <span>43 Témoignages Vérifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span>
                  <span>Corpus Neurobiologique &amp; Exégèse</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span>
                  <span>Séances Tél (48,95 €) &bull; Domicile (96,45 €)</span>
                </div>
              </div>

            </div>

            {/* COLONNE DROITE : VERSET MAJESTUEUX SOURATE AL-HADÎD 57:16 */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroVerseCard />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : PINNED SHOWCASE STAGE PLEIN ÉCRAN (100vw / 100vh)
          Séquence épinglée au scroll : 4 panoramas grandioses sans posture de prière
          ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full border-b border-[var(--border)] overflow-hidden">
        <ShowcaseStage />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : SLIDER INTERACTIF AVANT / APRÈS (PROCRASTINATION VS SOUVERAINETÉ)
          ═══════════════════════════════════════════════════════════════ */}
      <TransformationSlider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : BENTO GRID ÉDITORIAL ASYMÉTRIQUE
          ═══════════════════════════════════════════════════════════════ */}
      <EditorialBentoGrid />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 : AGENDA DOCTOLIB (TÉLÉPHONE 48,95 € • DOMICILE 96,45 €)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="agenda" className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087B53]/10 border border-[#087B53]/20 text-[#087B53] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
            AGENDA OFFICIEL • RÉSERVATION IMMÉDIATE
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
            Consultation avec Mounir Byar.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Choisissez votre modalité d&apos;entretien : par <strong>téléphone/visio (48,95 €)</strong> ou en <strong>présentiel à domicile (96,45 €)</strong> où Mounir Byar se déplace chez vous pour auditer votre espace et sanctuariser la prière.
          </p>
        </div>

        {/* MODULE AGENDA DOCTOLIB SANS CHARGE COGNITIVE */}
        <AgendaDoctolib />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 : LES PROTOCOLES D'ACCOMPAGNEMENT (SERVICES SÉPARÉS DES LIVRES)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087B53]/10 border border-[#087B53]/25 text-[#087B53] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              PRESTATIONS &amp; PROTOCOLES PRIVÉS
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              Nos Protocoles d&apos;Accompagnement.
            </h2>
          </div>
          <Link
            href="/prix"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#087B53] hover:underline transition-colors"
          >
            <span>Consulter la grille complète des tarifs</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARTE 1 : CONSULTATION INITIALE */}
          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[#087B53] transition-all">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">Diagnostic Préalable</span>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mt-1 mb-2">Entretien Individuel</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                Par téléphone (48,95 €) ou à domicile (96,45 €). Analyse chirurgicale de votre charge mentale et remise d&apos;un plan d&apos;urgence.
              </p>
              <div className="text-2xl font-heading font-extrabold text-[var(--text-primary)] mb-6">
                Dès 48,95 € <span className="text-xs text-[var(--text-secondary)] font-normal">/ séance</span>
              </div>
            </div>
            <Link
              href="/rendez-vous"
              className="w-full py-3 rounded-full border border-[var(--border)] hover:border-[#087B53] bg-[var(--bg)] text-center text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all"
            >
              Réserver ma Séance
            </Link>
          </div>

          {/* CARTE 2 : PROTOCOLE 30 JOURS (RECOMMANDÉ) */}
          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border-2 border-[#087B53] shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3.5 right-6 bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              Le Plus Choisi
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#087B53] font-bold">Transformation Ciblée</span>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mt-1 mb-2">Protocole 30 Jours</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                4 séances individuelles, messagerie 5j/7, mise en place des ancrages environnementaux pour ne plus jamais manquer une prière.
              </p>
              <div className="text-2xl font-heading font-extrabold text-[var(--text-primary)] mb-6">
                612,70 € <span className="text-xs text-[var(--text-secondary)] font-normal">ou 3x 204,23 €</span>
              </div>
            </div>
            <Link
              href="/offres"
              className="w-full py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-md"
            >
              Rejoindre le Protocole 30J
            </Link>
          </div>

          {/* CARTE 3 : MANDAT KHALIFA 9 MOIS */}
          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[#087B53] transition-all">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6214] dark:text-[#D4A853] font-bold">Immersion Complète</span>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mt-1 mb-2">Mandat Khalifa 9 Mois</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                Refonte structurelle intégrale de votre existence. Alignement spirituel, professionnel et familial sous la supervision directe de Mounir Byar.
              </p>
              <div className="text-2xl font-heading font-extrabold text-[var(--text-primary)] mb-6">
                Sur Mesure <span className="text-xs text-[var(--text-secondary)] font-normal">(Sélection)</span>
              </div>
            </div>
            <Link
              href="/rendez-vous"
              className="w-full py-3 rounded-full border border-[var(--border)] hover:border-[#087B53] bg-[var(--bg)] text-center text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all"
            >
              Candidater à l&apos;Immersion
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 : TÉMOIGNAGES VÉRIFIÉS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087B53]/10 border border-[#087B53]/25 text-[#087B53] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              PREUVE SOCIALE AUTHENTIQUE
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              43 Récits de Transformation Vérifiés.
            </h2>
          </div>
          <Link
            href="/temoignages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[#087B53] text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all shadow-xs"
          >
            <span>Consulter les 43 récits complets</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-xs hover:border-[#087B53] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[var(--text-primary)]">Yacine B.</strong>
              <span className="text-xs font-mono text-[#087B53] font-semibold bg-[#087B53]/10 px-2.5 py-0.5 rounded-full">
                Audit : 84%
              </span>
            </div>
            <div className="text-[#B88E3E] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              « J&apos;étais complètement submergé par la charge mentale de mon entreprise. La Salât était devenue une formalité bâclée. En 30 jours de protocole, j&apos;ai retrouvé un ancrage et une paix intérieure absolue. »
            </p>
            <span className="block text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
              Protocole 9 Mois • Dirigeant
            </span>
          </div>

          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-xs hover:border-[#087B53] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[var(--text-primary)]">Sliman K.</strong>
              <span className="text-xs font-mono text-[#087B53] font-semibold bg-[#087B53]/10 px-2.5 py-0.5 rounded-full">
                Audit : 90%
              </span>
            </div>
            <div className="text-[#B88E3E] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              « Mes parents ne m&apos;avaient jamais expliqué le sens profond de chaque mouvement. Grâce à l&apos;exégèse de Mounir et aux neurosciences du Sujûd, j&apos;ai commencé la Salât à 34 ans avec une conviction inébranlable. »
            </p>
            <span className="block text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
              Protocole 30 Jours • Cadre Supérieur
            </span>
          </div>

          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-xs hover:border-[#087B53] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[var(--text-primary)]">Mehdi R.</strong>
              <span className="text-xs font-mono text-[#087B53] font-semibold bg-[#087B53]/10 px-2.5 py-0.5 rounded-full">
                Audit : 95%
              </span>
            </div>
            <div className="text-[#B88E3E] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
              « Je faisais la prière, puis j&apos;arrêtais. Ces coupures constantes me rongeaient. Le système de verrouillage environnemental a tout changé. Depuis 8 mois, pas une seule prière manquée. »
            </p>
            <span className="block text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
              Protocole 30 Jours • Ingénieur
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 : BANNIÈRE D'APPEL À L'ACTION FINALE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-14 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] text-center shadow-xs">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold mb-3">
            PASSER À L&apos;ACTION DÈS AUJOURD&apos;HUI
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] max-w-xl mx-auto tracking-tight">
            Prêt à restaurer votre souveraineté mentale et spirituelle ?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            Commencez par notre audit gratuit pour mesurer votre score de charge mentale et identifier vos leviers prioritaires.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Passer l&apos;audit gratuit</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/rendez-vous"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:border-[#087B53] text-[var(--text-primary)] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>Prendre RDV (Tél 48,95 € • Domicile 96,45 €)</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
