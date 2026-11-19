"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";

const PILIERS_METHODE = [
  {
    num: "01",
    tag: "COGNITION & BANDE PASSANTE",
    title: "L'Éveil de la Réflexion & Lucidité Préfrontale",
    summary: "Sortir du mode automatique et de la saturation mentale. Le cerveau humain accumule chaque jour une charge cognitive invisible qui paralyse la volonté et crée At-Taswîf (la procrastination).",
    detail: "En nettoyant les micro-décisions parasites et le bruit numérique, vous libérez votre bande passante exécutive. Vous redevenez capable de penser avec profondeur, de discerner le futile de l'essentiel et de commander vos actions.",
    metric: "+65% de Clarté Décisionnelle",
  },
  {
    num: "02",
    tag: "BIO-RÉGULATION SOMATIQUE",
    title: "L'Intelligence Somatique & Le Système Nerveux",
    summary: "La maîtrise de soi n'est pas qu'une affaire de volonté brute : c'est une physiologie. L'apaisement conscient du nerf vague et la cohérence cardiaque désamorcent la tempête du cortisol.",
    detail: "Réapprendre à habiter son corps en pleine présence physique. Quand le système nerveux parasympathique reprend le dessus, l'anxiété s'effondre et laisse place à une paix corporelle inaltérable.",
    metric: "-40% Cortisol Mesuré",
  },
  {
    num: "03",
    tag: "TRANSCENDANCE DU CŒUR",
    title: "La Foi Inébranlable (Imân) & La Conviction (Yaqîn)",
    summary: "Rupture avec la pratique rituelle machinale et tiède. La foi véritable est un état de certitude absolue nourri par l'amour, l'émerveillement et la vénération du Créateur.",
    detail: "Passer du statut d'exécutant distrait à celui de croyant lucide dont le cœur vibre à l'évocation de la Vérité (Sourate Al-Hadîd, 57:16). La conviction inébranlable devient l'armure qui dissout tout doute mondain.",
    metric: "Ancrage Yaqîn Inébranlable",
  },
  {
    num: "04",
    tag: "PIVOT SACRÉ QUOTIDIEN",
    title: "La Salât comme Point Zéro d'Alignement",
    summary: "La prière n'est pas une corvée intercalée entre deux urgences : elle est le pivot sacré autour duquel gravite l'espace-temps de l'être souverain.",
    detail: "Cinq fois par jour, l'individu quitte la simulation terrestre pour se tenir devant l'Absolu. Cette rupture rituelle réinitialise le système nerveux, recalibre les priorités et purge l'esprit de toute illusion.",
    metric: "5 Réinitialisations / Jour",
  },
  {
    num: "05",
    tag: "GOUVERNANCE & IMPACT",
    title: "Le Mandat de Khalifa & La Maîtrise de Soi (Tazkiyah)",
    summary: "L'être humain a été créé pour être Son représentant et gestionnaire (Khalifa) sur Terre. Le fatalisme passif est une démission de vos responsabilités fondamentales.",
    detail: "Aligner ses 8 piliers de vie (mental, famille, espace, nutrition, vitalité, gouvernance, finances, veille). Reprendre le commandement de son foyer et de sa destinée avec une autorité bienveillante et inattaquable.",
    metric: "8 Piliers Sanctuarisés",
  },
];

export default function FondementsPage() {
  const [activePilier, setActivePilier] = useState(0);

  return (
    <main className="relative w-full bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-280 pt-24 sm:pt-32 pb-32 overflow-x-clip">
      
      {/* ═══════════════════════════════════════════════════════════════
          EN-TÊTE MONUMENTAL PLEIN ÉCRAN
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full border-b border-[var(--border)] pb-20 sm:pb-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col items-start max-w-4xl">
            {/* BADGE D'AUTORITÉ STATUTAIRE */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#087B53]/10 border border-[#087B53]/25 text-[#087B53] dark:text-[#4ade80] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
              <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em]">
                LES AXIOMES THÉORIQUES • CABINET BLF
              </span>
            </div>

            {/* TITRE MONUMENTAL SANS BOÎTE */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-[4.25rem] text-[var(--text-primary)] tracking-[-0.03em] leading-[1.06]">
              L&apos;Ingénierie de la Souveraineté.
            </h1>

            {/* SOUS-TITRE ÉDITORIAL À CONTRASTE CHIRURGICAL */}
            <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-[var(--text-secondary)] font-sans leading-relaxed font-normal max-w-3xl">
              Une science comportementale rigoureuse à l&apos;intersection de la révélation divine, des neurosciences cognitives et de l&apos;intelligence somatique. Rien n&apos;est laissé au hasard.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : LA DÉGRADATION SILENCIEUSE DU CAPITAL MENTAL
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-b border-[var(--border)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* COLONNE GAUCHE (TEXTE FONDATUR) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[#087B53] dark:text-[#4ade80] text-[10px] font-mono font-bold uppercase tracking-widest">
                SCIENCE COGNITIVE APPLIQUÉE
              </div>
              
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight leading-[1.14]">
                La Dégradation Silencieuse du Capital Mental
              </h2>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
                Chaque individu dispose d&apos;une <strong className="text-[var(--text-primary)] font-semibold">énergie mentale limitée</strong>. Sous l&apos;effet de la désorganisation quotidienne — micro-décisions inutiles, chaos domestique, distractions numériques permanentes — le cerveau accumule une <strong className="text-[var(--text-primary)] font-semibold">charge allostatique invisible</strong>.
              </p>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
                Cette surcharge fatigue l&apos;esprit, entraînant une vulnérabilité aux mauvaises impulsions et une incapacité à maintenir la maîtrise de soi. Le résultat est une détérioration de la présence d&apos;esprit, une perte de sens au quotidien et l&apos;incapacité d&apos;habiter son rôle de Khalifa.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
                <span className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                  ✓ Élimination du Bruit Mental
                </span>
                <span className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                  ✓ Recalibrage Préfrontal
                </span>
                <span className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                  ✓ Apaisement Vagal
                </span>
              </div>
            </div>

            {/* COLONNE DROITE (MÉTRIQUES ÉPURÉES SANS BOÎTE LOURDE) */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="font-heading font-bold text-base text-[var(--text-primary)]">
                  Indicateurs de Perte d&apos;Efficacité
                </span>
                <span className="font-mono text-[10px] uppercase text-[#8C6214] dark:text-[#D4A853] font-bold">
                  Étude Cognitive
                </span>
              </div>

              {/* BARRE 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-secondary)]">Bande passante saturée par le chaos</span>
                  <span className="text-red-500 font-bold">-62%</span>
                </div>
                <div className="h-2 w-full bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)]">
                  <div className="h-full bg-red-500 rounded-full w-[62%]" />
                </div>
              </div>

              {/* BARRE 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-secondary)]">Volonté active résiduelle en fin de journée</span>
                  <span className="text-[#8C6214] dark:text-[#D4A853] font-bold">15%</span>
                </div>
                <div className="h-2 w-full bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)]">
                  <div className="h-full bg-[#B88E3E] rounded-full w-[15%]" />
                </div>
              </div>

              {/* BARRE 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-secondary)]">Souveraineté restaurée après protocole</span>
                  <span className="text-[#087B53] dark:text-[#4ade80] font-bold">+94%</span>
                </div>
                <div className="h-2 w-full bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)]">
                  <div className="h-full bg-[#087B53] rounded-full w-[94%]" />
                </div>
              </div>

              <p className="text-[11px] font-mono text-[var(--text-secondary)] leading-relaxed pt-2">
                Source : Neuro-ergonomie et physiologie comportementale appliquée aux dirigeants et chefs de foyer (Cabinet BLF, 2024).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LES 5 PILIERS ÉDITORIAUX INTERACTIFS (ZÉRO BOÎTES)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-b border-[var(--border)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#087B53] dark:text-[#4ade80] font-bold">
              LA DÉMARCHE COMPLÈTE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight mt-3">
              Les 5 Dimensions de la Transformation.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
              Un cheminement méthodique où chaque étape s&apos;appuie sur la précédente pour bâtir une souveraineté inébranlable.
            </p>
          </div>

          {/* LISTE ÉDITORIALE ASYMÉTRIQUE PLEIN ÉCRAN */}
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {PILIERS_METHODE.map((pilier, idx) => {
              const isSelected = activePilier === idx;
              return (
                <div
                  key={pilier.num}
                  onClick={() => setActivePilier(idx)}
                  className={`py-8 sm:py-10 transition-all duration-300 cursor-pointer group ${
                    isSelected ? "bg-[var(--surface)]/50 px-4 sm:px-8 rounded-xl" : "hover:bg-[var(--surface)]/20 px-2 sm:px-4"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* INDICATEUR CHIFFRÉ & TAG */}
                    <div className="lg:col-span-3 flex items-center gap-4">
                      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                        {pilier.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                          {pilier.tag}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#087B53] dark:text-[#4ade80]">
                          {pilier.metric}
                        </span>
                      </div>
                    </div>

                    {/* TITRE & RÉSUMÉ */}
                    <div className="lg:col-span-5">
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[#087B53] transition-colors">
                        {pilier.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {pilier.summary}
                      </p>
                    </div>

                    {/* DÉTAIL DÉPLOYÉ & PROFONDEUR */}
                    <div className="lg:col-span-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--border)] pl-4">
                      <p>{pilier.detail}</p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : L'AXIOME MORPHEUS & NEUROBIOLOGIE DE LA PERCEPTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-b border-[var(--border)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6214] dark:text-[#D4A853]">
                L&apos;AXIOME DU CHOIX • SORTIR DE LA SIMULATION
              </span>
              
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight leading-[1.12]">
                S&apos;éveiller de la Matrice Mondaine
              </h2>

              <blockquote className="border-l-2 border-[#B88E3E] pl-6 py-2 my-4 italic text-base sm:text-lg text-[var(--text-primary)] font-serif">
                « Choisir la pilule bleue, c&apos;est rester dans l&apos;illusion passive. Choisir la pilule rouge, c&apos;est s&apos;éveiller à la réalité brute et reprendre le commandement de son âme. »
              </blockquote>

              <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
                Le monde terrestre (le <em>Dunya</em>) fonctionne comme une matrice d&apos;illusions et de sollicitations permanentes. D&apos;un point de vue neurobiologique, le cerveau ne perçoit jamais directement la réalité brute : il produit une <strong>simulation prédictive</strong> (<em>predictive coding</em>) dominée par la recherche de dopamine rapide.
              </p>

              <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
                Le <strong>Nafs</strong> non discipliné s&apos;enferme dans cette boucle sensorielle, oubliant son mandat d&apos;élévation. S&apos;éveiller exige d&apos;ancrer son cortex préfrontal dans la lucidité, la contemplation et la constance rituelle du pivot sacré.
              </p>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] space-y-5">
              <span className="font-mono text-xs uppercase tracking-wider text-[#087B53] font-bold block">
                COMPRÉHENSION SCIENTIFIQUE
              </span>
              <h4 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
                Du Signal Électrique à la Conscience
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Vos yeux ne captent que des photons traduits en influx d&apos;électrons le long du nerf optique. C&apos;est votre cortex qui reconstruit l&apos;image du monde.
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Sans hygiène mentale rigoureuse, votre cerveau interprète les alertes numériques et les tracas du quotidien comme des menaces de mort, maintenant votre organisme en état d&apos;alerte toxique permanente.
              </p>
              <div className="pt-4 border-t border-[var(--border)] text-xs font-mono text-[#8C6214] dark:text-[#D4A853]">
                ✓ La Salât opère la coupure chirurgicale de ce faux signal.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : PASSAGE À L'ACTION SANS FRICTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#087B53] dark:text-[#4ade80] font-bold block">
              ENGAGEMENT &amp; DISCIPLINE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
              Passez de la théorie à l&apos;autorité.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Vous avez compris les mécanismes. Réservez votre consultation stratégique ou débutez par l&apos;audit gratuit pour mesurer votre niveau d&apos;alignement.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/rendez-vous"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(8,123,83,0.3)] hover:-translate-y-0.5"
              >
                <span>Prendre RDV (48,95 € / 96,45 €)</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <Link
                href="/audit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--text-primary)] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <span>Passer l&apos;Audit Gratuit</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
