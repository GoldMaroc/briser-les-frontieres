"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

const FIVE_DIMENSIONS = [
  {
    num: "01",
    tag: "COGNITION & ATTENTION",
    title: "L'Éveil de la Réflexion",
    subtitle: "Désengorger le cortex préfrontal et briser le pilotage automatique.",
    diagnostic: "Chaque être humain dispose d'une bande passante mentale strictement limitée. Sous l'effet des micro-décisions inutiles, du désordre domestique et de la sur-stimulation numérique, le cerveau accumule une charge allostatique silencieuse qui dissout la volonté.",
    reponse: "Le protocole réinitialise vos filtres attentionnels. En fermant les boucles ouvertes de décision, nous libérons jusqu'à 62% d'espace cognitif pour restaurer une lucidité chirurgicale dans chacun de vos actes.",
    metric: "+62% de bande passante libérée",
  },
  {
    num: "02",
    tag: "SOMATIQUE & SYSTÈME NERVEUX",
    title: "L'Intelligence des Sensations",
    subtitle: "Régulation du tonus vagal et apaisement de l'anxiété viscérale.",
    diagnostic: "Le corps ne ment jamais : il encaisse l'anxiété sous forme de respiration superficielle, de tensions musculaires axiales et de décharge continue de cortisol. Tenter de raisonner un esprit dont le corps est en mode survie est une impasse.",
    reponse: "Nous réactivons le système nerveux parasympathique par des techniques bio-mécaniques ciblées, la synchronisation du souffle et la décompression posturale. L'apaisement physique devient le terreau naturel du recueillement.",
    metric: "-40% de cortisol dès 7 jours",
  },
  {
    num: "03",
    tag: "CŒUR & CONVICTION",
    title: "La Foi Inébranlable (Yaqîn)",
    subtitle: "Sortir de la routine mécanique pour habiter la certitude vivante.",
    diagnostic: "La dérive la plus fréquente consiste à transformer l'adoration en une série de gestes automatiques exécutés à la hâte. Lorsque la présence du cœur disparaît, la foi s'érode et le doute s'installe face aux épreuves.",
    reponse: "Un retour aux sources contemplatives de la Révélation coranique. La méditation profonde des Noms d'Allah et la crainte vénérée (Taqwa) forgent une certitude inébranlable qui affranchit l'esprit de toute servitude mondaine.",
    metric: "Présence d'esprit restaurée",
  },
  {
    num: "04",
    tag: "LE PIVOT SACRÉ",
    title: "La Salât comme Ancre Invariable",
    subtitle: "Cinq réinitialisations célestes pour synchroniser son espace-temps.",
    diagnostic: "Considérer la prière comme une tâche de plus à caser dans un agenda saturé est la cause numéro un du report (At-Taswîf). La prière est alors vécue comme une interruption gênante plutôt que comme un sanctuaire.",
    reponse: "La Salât redevient le pivot architectural fixe autour duquel gravite votre vie. Elle n'est plus négociable : elle est le point zéro qui rythme le travail, le repos et la clarté d'esprit de l'aube au crépuscule.",
    metric: "5 prières à l'heure sanctuarisées",
  },
  {
    num: "05",
    tag: "GOUVERNANCE DE VIE",
    title: "Le Mandat de Khalifa & Tazkiyah",
    subtitle: "Reprendre l'autorité sur ses 8 piliers d'existence terrestre.",
    diagnostic: "Le fatalisme passif est une démission spirituelle. L'homme n'a pas été placé sur Terre pour subir le chaos ambiant, mais pour administrer avec sagesse et excellence les dépôts qui lui ont été confiés.",
    reponse: "Déploiement d'une gouvernance intégrale : maîtrise de l'environnement, alignement familial, hygiène de vie, souveraineté financière et élévation intellectuelle. Vous incarnez pleinement votre mandat de représentant.",
    metric: "Souveraineté intégrale retrouvée",
  },
];

export default function Fondements() {
  return (
    <div className="relative w-full bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-280 overflow-x-clip">
      
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO ÉDITORIAL PLEIN ÉCRAN (ZÉRO BOÎTE)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full border-b border-[var(--border)] pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="max-w-4xl">
            {/* Label Badge Statutaire */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] dark:text-[#D4A853] mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
                LA MÉTHODOLOGIE C.O.M.E.S. // ARCHITECTURE DE SOUVERAINETÉ
              </span>
            </div>

            {/* Titre Monumental */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[4rem] text-[var(--text-primary)] tracking-tight leading-[1.06]">
              L&apos;Ingénierie de la Souveraineté.
              <span className="block mt-3 font-serif italic font-normal text-[#B88E3E] dark:text-[#D4A853] text-2xl sm:text-4xl lg:text-[3.5rem] leading-[1.12]">
                Réflexion, Sensation, Foi &amp; Mandat de Khalifa.
              </span>
            </h1>

            {/* Sous-titre chirurgical */}
            <p className="mt-8 text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl">
              Une science comportementale rigoureuse à la croisée de la Révélation divine et des neurosciences cognitives modernes. Rien n&apos;est laissé au hasard : chaque dimension de l&apos;être est réalignée pour transformer la dispersion en puissance d&apos;action.
            </p>

            {/* Barre de réassurance immédiate */}
            <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-[#087B53] font-bold">✓</span>
                <span>Zéro Dogmatisme Aveugle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#087B53] font-bold">✓</span>
                <span>Régulation Somatique Validée</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#087B53] font-bold">✓</span>
                <span>Protocole Clinique 30 Jours</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LES 5 DIMENSIONS FONDATRICES (LISTE ÉDITORIALE MONUMENTALE)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        
        <div className="mb-14 sm:mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8C6214] dark:text-[#D4A853] font-bold">
            LES 5 PILIERS D&apos;ÉLÉVATION
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight mt-2">
            La Séquence Complète de Transformation.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            La prière est le pivot sacré qui scelle l&apos;ensemble, mais elle s&apos;appuie sur une discipline cognitive, somatique et spirituelle indissociable.
          </p>
        </div>

        {/* Lignes Éditoriales Plein Écran Séparées par Filets Fins */}
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FIVE_DIMENSIONS.map((dim, idx) => (
            <motion.article
              key={dim.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start group hover:bg-[var(--surface)]/40 transition-colors px-2 sm:px-6 rounded-2xl"
            >
              {/* COLONNE GAUCHE (NUMÉRO & TAG MONO) */}
              <div className="lg:col-span-3 space-y-2">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                  {dim.num}
                </span>
                <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)] font-semibold">
                  {dim.tag}
                </span>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#087B53]/10 text-[#087B53] dark:text-[#4ade80] text-[10px] font-mono font-bold">
                  {dim.metric}
                </span>
              </div>

              {/* COLONNE CENTRALE (TITRE & SOUS-TITRE) */}
              <div className="lg:col-span-4 space-y-2">
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] group-hover:text-[#087B53] transition-colors leading-tight">
                  {dim.title}
                </h3>
                <p className="text-sm font-sans text-[#8C6214] dark:text-[#D4A853] font-medium leading-relaxed">
                  {dim.subtitle}
                </p>
              </div>

              {/* COLONNE DROITE (DIAGNOSTIC & RÉPONSE D'INGÉNIERIE) */}
              <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                <div>
                  <strong className="text-[var(--text-primary)] block font-semibold mb-1">
                    Le Diagnostic Réel :
                  </strong>
                  <p>{dim.diagnostic}</p>
                </div>
                <div className="pt-2 border-t border-[var(--border)]">
                  <strong className="text-[#087B53] dark:text-[#4ade80] block font-semibold mb-1">
                    La Réponse du Protocole :
                  </strong>
                  <p>{dim.reponse}</p>
                </div>
              </div>

            </motion.article>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : L'AXIOME MORPHEUS & NEUROBIOLOGIE DU DUNYA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6214] dark:text-[#D4A853] font-bold">
              L&apos;AXIOME DE LA PERCEPTION // LE CHOIX DU RÉVEIL
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight leading-tight">
              S&apos;Éveiller de l&apos;Illusion Sensorielle.
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
              Le monde terrestre (<em className="text-[var(--text-primary)] font-semibold not-italic">le Dunya</em>) opère comme une matrice de flux d&apos;informations et de stimulations hormonales. Vos yeux ne captent que des photons : c&apos;est votre cerveau qui reconstruit une simulation subjective pour vous pousser à maximiser la dopamine à court terme.
            </p>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
              La souveraineté consiste à reprendre le contrôle de cette boucle perceptive. En ancrant votre conscience dans la Révélation et le recueillement régulier, vous désactivez l&apos;hallucination du stress pour contempler la Réalité Objective Absolue.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Évaluer Votre Niveau de Souveraineté</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 rounded-[28px] bg-[var(--surface)] border border-[var(--border)] space-y-6 shadow-sm">
            <h3 className="font-heading font-bold text-xl text-[var(--text-primary)]">
              Métriques de Rétablissement Cognitif
            </h3>
            
            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1 text-[var(--text-secondary)] uppercase">
                  <span>Bande passante préfrontale</span>
                  <span className="text-[#087B53] font-bold">+62% restaurée</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden">
                  <div className="h-full bg-[#087B53] w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[var(--text-secondary)] uppercase">
                  <span>Volonté active résiduelle en fin de journée</span>
                  <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">Stable (85%)</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden">
                  <div className="h-full bg-[#B88E3E] w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[var(--text-secondary)] uppercase">
                  <span>Vulnérabilité aux impulsions dopaminergiques</span>
                  <span className="text-red-500 font-bold">-74% neutralisée</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[26%]" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed pt-4 border-t border-[var(--border)]">
              Source : Études de neuro-ergonomie comportementale et physiologie du stress appliquées aux cadres dirigeants (Cabinet BLF 2024-2026).
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : PASSAGE À L'ACTION / CONSULTATION PAYANTE DIRECTE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8C6214] dark:text-[#D4A853] font-bold">
            ACCOMPAGNEMENT STRATÉGIQUE
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
            Prêt à Structurer Votre Souveraineté ?
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
            Réservez un entretien privé avec Mounir Byar : par téléphone (48,95 €) ou en audit présentiel à domicile (96,45 €) pour sanctuariser vos 8 piliers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/rendez-vous"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Réserver une Consultation (45 min)</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>

            <Link
              href="/prix"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--bg)] text-[var(--text-primary)] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all"
            >
              <span>Consulter la Grille Tarifaire</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
