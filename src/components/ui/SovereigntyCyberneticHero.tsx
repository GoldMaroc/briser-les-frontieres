"use client";

import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import HeroVerseCard from "@/components/ui/HeroVerseCard";
import TransformationSlider from "@/components/ui/TransformationSlider";
import EditorialBentoGrid from "@/components/ui/EditorialBentoGrid";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";

export default function SovereigntyCyberneticHero() {
  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#141210]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO ÉDITORIAL AVEC LE VERSET SACRÉ DE SOURATE AL-HADÎD
          - Gauche : Titre percutant, H1 monumental, 3 actions
          - Droite : Carte spirituelle HeroVerseCard (Verset 57:16 en arabe et autorité)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full border-b border-[#E8E0D2] overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* COLONNE GAUCHE (ÉDITORIALE) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Double Eyebrow Statutaire */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em]">
                    CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
                  </span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#7A6F64] hidden sm:inline">
                  PARIS // REIMS • PAR MOUNIR BYAR
                </span>
              </div>

              {/* Titre Principal H1 */}
              <h1 
                style={{ textWrap: "balance" }}
                className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.65rem] text-[#141210] tracking-[-0.03em] leading-[1.08]"
              >
                Reprenez le contrôle de votre vie.
                <span className="block mt-2 font-serif italic font-normal text-[#B88E3E] text-2xl sm:text-4xl lg:text-[3.25rem] leading-[1.12]">
                  La Salât comme arme de souveraineté.
                </span>
              </h1>

              {/* Sous-titre cadré et scientifique */}
              <p className="mt-6 text-base sm:text-lg text-[#403B35] font-sans leading-[1.65] max-w-xl font-normal">
                La prière n&apos;est pas une corvée répétitive. C&apos;est le protocole neurobiologique suprême révélé à l&apos;humanité pour dompter le cortisol, briser la procrastination et commander son existence avec une clarté inaltérable.
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#B88E3E]/50 hover:border-[#B88E3E] bg-white/70 hover:bg-white text-[#141210] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm text-center"
                >
                  <span className="w-2 h-2 rounded-full bg-[#087B53]" />
                  <span>Prendre RDV (Tél 48,95 € • Domicile 96,45 €)</span>
                </Link>
              </div>

              {/* Preuve Sociale Directement Intégrée sous les Boutons */}
              <div className="mt-8 pt-6 border-t border-[#E8E0D2]/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#5C534A]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#087B53] font-bold">✓</span>
                  <span className="font-semibold text-[#141210]">+1 200</span> Musulmans accompagnés
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#B88E3E]">★★★★★</span>
                  <span className="font-semibold text-[#141210]">4,9/5</span> sur avis vérifiés
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8C6214]">✦</span>
                  <span>Fondé sur 10 ans de recherche</span>
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
          SECTION 2 : SLIDER INTERACTIF AVANT / APRÈS (PROCRASTINATION VS SOUVERAINETÉ)
          ═══════════════════════════════════════════════════════════════ */}
      <TransformationSlider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : BENTO GRID ÉDITORIAL ASYMÉTRIQUE
          ═══════════════════════════════════════════════════════════════ */}
      <EditorialBentoGrid />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : AGENDA DOCTOLIB (TÉLÉPHONE 48,95 € • DOMICILE 96,45 €)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="agenda" className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E0D2]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087B53]/10 border border-[#087B53]/20 text-[#087B53] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
            AGENDA OFFICIEL • RÉSERVATION IMMÉDIATE
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight">
            Consultation avec Mounir Byar.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C534A] leading-relaxed">
            Choisissez votre modalité d&apos;entretien : par <strong>téléphone/visio (48,95 €)</strong> ou en <strong>présentiel à domicile (96,45 €)</strong> où Mounir Byar se déplace chez vous pour sanctuariser votre environnement.
          </p>
        </div>

        {/* MODULE AGENDA DOCTOLIB SANS CHARGE COGNITIVE */}
        <AgendaDoctolib />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 : LES PROTOCOLES D'ACCOMPAGNEMENT (SERVICES SÉPARÉS DES LIVRES)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E0D2]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              PRESTATIONS & PROTOCOLES PRIVÉS
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight">
              Nos Protocoles d&apos;Accompagnement.
            </h2>
          </div>
          <Link
            href="/prix"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#B88E3E] hover:text-[#8C6214] transition-colors"
          >
            <span>Consulter la grille complète des tarifs</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARTE 1 : CONSULTATION INITIALE */}
          <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F64]">Diagnostic Prélable</span>
              <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-1 mb-2">Entretien Individuel</h3>
              <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                Par téléphone (48,95 €) ou à domicile (96,45 €). Analyse chirurgicale de votre charge mentale et remise d&apos;un plan d&apos;urgence.
              </p>
              <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                Dès 48,95 € <span className="text-xs text-[#7A6F64] font-normal">/ séance</span>
              </div>
            </div>
            <Link
              href="/rendez-vous"
              className="w-full py-3 rounded-full border border-[#E8E0D2] hover:border-[#B88E3E] bg-[#FAF8F5] text-center text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all"
            >
              Réserver ma Séance
            </Link>
          </div>

          {/* CARTE 2 : PROTOCOLE 30 JOURS (RECOMMANDÉ) */}
          <div className="p-8 rounded-3xl bg-white border-2 border-[#087B53] shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Le Plus Choisi
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#087B53] font-bold">Transformation Ciblée</span>
              <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-1 mb-2">Protocole 30 Jours</h3>
              <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                4 séances individuelles, messagerie 5j/7, mise en place des ancrages environnementaux pour ne plus jamais manquer une prière.
              </p>
              <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                612,70 € <span className="text-xs text-[#7A6F64] font-normal">ou 3x 204,23 €</span>
              </div>
            </div>
            <Link
              href="/offres"
              className="w-full py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-sm"
            >
              Rejoindre le Protocole 30J
            </Link>
          </div>

          {/* CARTE 3 : MANDAT KHALIFA 9 MOIS */}
          <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6214] font-bold">Immersion Complète</span>
              <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-1 mb-2">Mandat Khalifa 9 Mois</h3>
              <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                Refonte structurelle intégrale de votre existence. Alignement spirituel, professionnel et familial sous la supervision directe de Mounir Byar.
              </p>
              <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                Sur Mesure <span className="text-xs text-[#7A6F64] font-normal">(Sélection)</span>
              </div>
            </div>
            <Link
              href="/rendez-vous"
              className="w-full py-3 rounded-full border border-[#E8E0D2] hover:border-[#B88E3E] bg-[#FAF8F5] text-center text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all"
            >
              Candidater à l&apos;Immersion
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 : TÉMOIGNAGES VÉRIFIÉS (PAGE DÉDIÉE ACCESSIBLE)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E0D2]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              PREUVE SOCIALE AUTHENTIQUE
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight">
              43 Récits de Transformation Vérifiés.
            </h2>
          </div>
          <Link
            href="/temoignages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E8E0D2] hover:border-[#B88E3E] text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all shadow-sm"
          >
            <span>Consulter les 43 récits complets</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] space-y-4 shadow-sm hover:border-[#B88E3E] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[#141210]">Yacine B.</strong>
              <span className="text-xs font-mono text-[#087B53] font-semibold bg-[#087B53]/10 px-2.5 py-0.5 rounded-full">
                Audit : 84%
              </span>
            </div>
            <div className="text-[#B88E3E] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed italic">
              « J&apos;étais complètement submergé par la charge mentale de mon entreprise. La Salât était devenue une formalité bâclée. En 30 jours de protocole, j&apos;ai retrouvé un ancrage et une paix intérieure absolue. »
            </p>
            <span className="block text-[11px] font-mono text-[#7A6F64] pt-2 border-t border-[#E8E0D2]">
              Protocole 9 Mois • Dirigeant
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] space-y-4 shadow-sm hover:border-[#B88E3E] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[#141210]">Sliman K.</strong>
              <span className="text-xs font-mono text-[#087B53] font-semibold bg-[#087B53]/10 px-2.5 py-0.5 rounded-full">
                Audit : 90%
              </span>
            </div>
            <div className="text-[#B88E3E] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed italic">
              « Mes parents ne m&apos;avaient jamais expliqué le sens profond de chaque mouvement. Grâce à l&apos;exégèse de Mounir et aux neurosciences du Sujûd, j&apos;ai commencé la Salât à 34 ans avec une conviction inébranlable. »
            </p>
            <span className="block text-[11px] font-mono text-[#7A6F64] pt-2 border-t border-[#E8E0D2]">
              Protocole 30 Jours • Cadre Supérieur
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] space-y-4 shadow-sm hover:border-[#B88E3E] transition-all">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-heading font-bold text-[#141210]">Mehdi R.</strong>
              <span className="text-xs font-mono text-[#087B53] font-semibold bg-[#087B53]/10 px-2.5 py-0.5 rounded-full">
                Audit : 95%
              </span>
            </div>
            <div className="text-[#B88E3E] text-xs">★★★★★</div>
            <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed italic">
              « Je faisais la prière, puis j&apos;arrêtais. Ces coupures constantes me rongeaient. Le système de verrouillage environnemental a tout changé. Depuis 8 mois, pas une seule prière manquée. »
            </p>
            <span className="block text-[11px] font-mono text-[#7A6F64] pt-2 border-t border-[#E8E0D2]">
              Protocole 30 Jours • Ingénieur
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 : BANNIÈRE D'APPEL À L'ACTION FINALE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-white via-[#FAF8F5] to-white border border-[#E8E0D2] text-center shadow-sm">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6214] font-bold mb-3">
            PASSER À L&apos;ACTION DÈS AUJOURD&apos;HUI
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] max-w-xl mx-auto tracking-tight">
            Prêt à restaurer votre souveraineté mentale et spirituelle ?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5C534A] max-w-lg mx-auto leading-relaxed">
            Commencez par notre audit gratuit pour mesurer votre score de charge mentale et identifier vos leviers prioritaires.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Faire l&apos;audit gratuit</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/rendez-vous"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#B88E3E]/50 bg-white hover:border-[#B88E3E] text-[#141210] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all"
            >
              <span>Prendre RDV (Tél 48,95 € • Domicile 96,45 €)</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
