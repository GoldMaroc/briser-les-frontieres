"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const phases = [
  {
    letter: "C",
    name: "Clarification Cognitive",
    subtitle: "Épuration & Désaturation",
    desc: "Cette première phase d'interposition in situ vise à dresser un bilan exhaustif de vos boucles d'engagement actives et à couper de manière drastique tous les stimuli et flux d'information non pertinents.",
    actions: [
      "Audit des threads cognitifs ouverts (Muhasaba initiale)",
      "Mise en place d'une diète numérique immédiate",
      "Élimination des distractions matérielles et logiques",
      "Fermeture des protocoles de communication parasites"
    ],
    results: "Restauration immédiate de 40% de votre bande passante mentale disponible."
  },
  {
    letter: "O",
    name: "Organisation Spatiale & Rituelle",
    subtitle: "Architecture de la Rectitude",
    desc: "Nous concevons un environnement de vie et de travail ordonné selon des règles strictes d'ergonomie comportementale, facilitant l'exécution spontanée de vos obligations quotidiennes et spirituelles.",
    actions: [
      "Restructuration complète de l'espace physique (in situ)",
      "Alignement de l'agenda sur le cycle des 5 prières quotidiennes (Salat)",
      "Mise en place de la loi de proximité pour les comportements vertueux",
      "Ergonomie numérique (zéro bruit, accès direct à l'essentiel)"
    ],
    results: "Transition fluide entre vos activités et réduction drastique de la fatigue décisionnelle."
  },
  {
    letter: "M",
    name: "Maîtrise du Nafs & Systématisation",
    subtitle: "Soumission de l'égo à l'architecture",
    desc: "Le Nafs est naturellement enclin à la paresse et au chaos. Nous développons pour vous un système d'automatisation des habitudes vertueuses pour contourner le besoin de motivation temporaire.",
    actions: [
      "Création de protocoles comportementaux non négociables",
      "Suppression des frictions physiques pour les bonnes actions",
      "Création de barrières physiques insurmontables contre les vices du Nafs",
      "Mise en place de systèmes d'engagement contraignants"
    ],
    results: "Exécution automatique des tâches clés même en état d'épuisement mental complet."
  },
  {
    letter: "E",
    name: "Énergisation & Rythmes Physiologiques",
    subtitle: "Alignement Chronobiologique",
    desc: "Restauration de la vitalité biologique à travers un alignement strict sur les rythmes naturels conçus par le Créateur, avec un accent majeur mis sur l'exploitation des premières heures de la journée.",
    actions: [
      "Ancrage biologique sur l'aube (Fajr) comme centre de gravité de la journée",
      "Régulation stricte du cycle du sommeil (hygiène lumineuse de niveau clinique)",
      "Protocoles de nutrition favorisant la clarté intellectuelle permanente",
      "Optimisation de l'exercice physique fonctionnel"
    ],
    results: "Stabilité énergétique permanente et pic d'activité intellectuelle à l'aube."
  },
  {
    letter: "S",
    name: "Stabilisation & Muhasaba",
    subtitle: "Audit permanent & Ajustements",
    desc: "Mise en place d'outils d'auto-correction permanents basés sur la Muhasaba (l'introspection structurée et comptable) pour s'assurer que le système reste parfaitement équilibré à long terme.",
    actions: [
      "Mise en place du journal d'audit hebdomadaire",
      "Session d'analyse des écarts décisionnels",
      "Ajustements micro-environnementaux itératifs",
      "Ancrage de l'état de Khalifa à travers une gouvernance autonome"
    ],
    results: "Souveraineté cognitive consolidée et excellence pérenne face aux chocs extérieurs."
  }
];

export default function Protocole() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Gradients thématiques circadiens */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_70%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <SectionHeading
          label="Le Cadre Méthodologique"
          title="Le Protocole C.O.M.E.S. & La Suhba"
          subtitle="Un protocole en cinq phases d'ingénierie comportementale, soutenu par un compagnonnage spirituel et humain pour garantir la constance dans le temps."
        />

        {/* Section explicative de la Suhba */}
        <div className="max-w-4xl mx-auto mb-20 bg-surface/10 border border-gold-muted p-8 rounded-sm text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald mb-2 block">
            L&apos;Écosystème de la Souveraineté
          </span>
          <h3 className="font-heading text-2xl font-light text-cream mb-4">
            Pourquoi l&apos;isolement mène à l&apos;échec ?
          </h3>
          <p className="text-sm text-cream-muted leading-relaxed font-body max-w-2xl mx-auto">
            Le mythe de l&apos;individu capable de se forger seul, par la simple force de sa volonté, est étranger à la sagesse islamique et aux sciences cognitives. La constance (Istiqâma) n&apos;est pas innée ; elle requiert une <strong>Suhba</strong> — un compagnonnage constructif. L&apos;accompagnement personnalisé de Mounir BYAR vous apporte ce cadre, agissant comme le repère indispensable pour surmonter l&apos;entropie quotidienne.
          </p>
        </div>

        {/* Timeline immersive */}
        <div className="mt-20 max-w-5xl mx-auto relative border-l-2 border-stone-200 pl-6 md:pl-16 space-y-24">
          
          {phases.map((phase, index) => (
            <motion.div
              key={phase.letter}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Bulle de la lettre */}
              <div className="absolute -left-[45px] md:-left-[85px] top-0 w-12 h-12 rounded-full bg-stone-950 border border-gold flex items-center justify-center text-gold font-heading text-xl font-semibold shadow-lg group-hover:bg-gold group-hover:text-stone-950 transition-colors duration-300">
                {phase.letter}
              </div>

              {/* Contenu de la phase */}
              <div className="bg-surface/10 p-8 border border-border rounded-sm backdrop-blur-sm relative hover:border-gold/30 transition-all duration-300">
                <div className="absolute top-0 right-10 w-20 h-px bg-gold" />
                
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald">
                  Phase 0{index + 1} — {phase.subtitle}
                </span>
                
                <h3 className="font-heading text-2xl md:text-3xl font-light text-cream mt-2 mb-4">
                  {phase.name}
                </h3>
                
                <p className="text-sm md:text-base text-cream-muted leading-relaxed font-body mb-6">
                  {phase.desc}
                </p>

                {/* Actions concrètes */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-gold mb-3 font-semibold">
                    Actions clés menées in situ :
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-cream-muted font-body">
                        <span className="text-emerald mt-0.5">▪</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Résultat */}
                <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald bg-emerald-muted/15 px-2.5 py-1 rounded-full">
                    Impact Cible
                  </span>
                  <p className="text-xs text-cream italic font-body">
                    {phase.results}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

        {/* ═══════════════════════════════════════════
            NOUVELLE SECTION : LE PROTOCOLE DE 9 MOIS (Accompagnement Avancé)
            ═══════════════════════════════════════════ */}
        <div className="mt-32 pt-20 border-t border-border/60">
          <SectionHeading
            label="Accompagnement Avancé Direct"
            title="Le Protocole de 9 Mois"
            subtitle="Parce que la constance ne s'achète pas en 30 jours. Un parcours d'interposition personnalisé sur neuf mois pour refonder, stabiliser et pérenniser votre souveraineté spirituelle et comportementale."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            {/* Trimestre 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 border border-border bg-surface/20 rounded-sm relative"
            >
              <div className="absolute top-0 right-8 w-12 h-px bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald block mb-2">Trimestre 01 — Mois 1 à 3</span>
              <h4 className="font-heading text-xl text-cream font-light mb-4">Reconstruction Cognitive & Environnementale</h4>
              <p className="text-xs text-cream-muted leading-relaxed font-body">
                Interposition directe in situ. Nous auditons et épurons physiquement et numériquement votre foyer et votre espace de travail. Fermeture des boucles cognitives ouvertes pour libérer la bande passante mentale et stabiliser la mécanique des cinq prières quotidiennes.
              </p>
            </motion.div>

            {/* Trimestre 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 border border-border bg-surface/20 rounded-sm relative"
            >
              <div className="absolute top-0 right-8 w-12 h-px bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald block mb-2">Trimestre 02 — Mois 4 à 6</span>
              <h4 className="font-heading text-xl text-cream font-light mb-4">Ancrage Spatial & Souveraineté du Nafs</h4>
              <p className="text-xs text-cream-muted leading-relaxed font-body">
                Soumission du Nafs à des protocoles et contraintes spatiales automatisés. Réduction de la fatigue décisionnelle par la méthode du Habit Stacking et de l&apos;ingénierie comportementale. Alignement chronobiologique complet sur le rythme de l&apos;aube (Fajr).
              </p>
            </motion.div>

            {/* Trimestre 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 border border-border bg-surface/20 rounded-sm relative"
            >
              <div className="absolute top-0 right-8 w-12 h-px bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald block mb-2">Trimestre 03 — Mois 7 à 9</span>
              <h4 className="font-heading text-xl text-cream font-light mb-4">Expansion Rituelle & Mandat de Khalifa</h4>
              <p className="text-xs text-cream-muted leading-relaxed font-body">
                Intégration de la Muhasaba (introspection comptable) quotidienne. Alignement complet de vos activités professionnelles, familiales et financières sur le mandat de Khalifa. Autonomie comportementale totale face aux assauts de l&apos;entropie du monde moderne.
              </p>
            </motion.div>

          </div>
        </div>

        {/* CTA final — Étape 5 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center border-t border-border pt-16 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">➔ Passer à la phase supérieure</span>
          <h3 className="font-heading text-3xl font-light text-cream">
            Étape 05 : S&apos;armer des Outils Numériques
          </h3>
          <p className="text-sm text-cream-muted max-w-xl mx-auto font-body leading-relaxed">
            Vous avez étudié les phases théoriques du Protocole C.O.M.E.S. Il est temps de vous doter des écrits méthodologiques officiels de Mounir BYAR pour entamer activement votre transformation.
          </p>
          <div className="flex justify-center pt-2">
            <Button variant="primary" href="/livres" className="shadow-lg shadow-gold/5 font-bold tracking-widest px-10 py-4">
              Découvrir les Livres Numériques →
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
