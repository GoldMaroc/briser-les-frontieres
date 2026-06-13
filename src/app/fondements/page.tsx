"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Fondements() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Gradients de fond haut/bas thématiques */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <SectionHeading
          label="Les Axiomes Théoriques"
          title="L'Ingénierie de la Souveraineté"
          subtitle="Une science comportementale rigoureuse à l'intersection de la révélation divine et des neurosciences cognitives modernes. Rien n'est laissé au hasard."
        />

        {/* Section 1 : L'Approche Scientifique (Charge Allostatique & Bande Passante) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald bg-emerald-muted/20 px-3 py-1 rounded-full border border-emerald/10">
              Science Cognitive Appliquée
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
              La Dégradation Silencieuse du Capital Mental
            </h3>
            <p className="text-base md:text-lg text-cream leading-relaxed font-body mb-6">
              Chaque individu dispose d&apos;une ressource biologique limitée appelée <strong className="text-gold">bande passante cognitive</strong>. Sous l&apos;effet de l&apos;entropie quotidienne — micro-décisions inutiles, chaos domestique, désorganisation numérique — le cerveau accumule une <strong className="text-gold">charge allostatique</strong>. 
            </p>
            <p className="text-base md:text-lg text-cream leading-relaxed font-body">
              Cette surcharge fatigue le cortex préfrontal, entraînant une vulnérabilité aux biais cognitifs et une incapacité à maintenir la maîtrise du <strong className="text-emerald">Nafs</strong> (l&apos;ego/les passions). Le résultat est une détérioration de la présence d&apos;esprit lors de la Salat (prière) et une déconnexion du mandat terrestre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-8 border border-border bg-surface/20 rounded-sm relative"
          >
            <div className="absolute top-0 right-10 w-12 h-px bg-gold/40" />
            <h4 className="font-heading text-xl text-gold mb-4">Métriques de Perte d&apos;Efficacité</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1">
                  <span className="text-cream-muted">Bande passante saturée</span>
                  <span className="text-gold">-62%</span>
                </div>
                <div className="h-1 bg-midnight rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-[62%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1">
                  <span className="text-cream-muted">Volonté active résiduelle (Fin de journée)</span>
                  <span className="text-emerald">15%</span>
                </div>
                <div className="h-1 bg-midnight rounded-full overflow-hidden">
                  <div className="h-full bg-emerald w-[15%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs tracking-wider uppercase mb-1">
                  <span className="text-cream-muted">Temps de réactivité spirituelle</span>
                  <span className="text-red-400">Altéré</span>
                </div>
                <div className="h-1 bg-midnight rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 w-[85%]" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-cream-muted/40 mt-6 leading-relaxed font-body">
              Source : Études de neuro-ergonomie et de physiologie comportementale appliquées aux cadres dirigeants (2024).
            </p>
          </motion.div>
        </div>

        {/* Section 1.5 : L'Axiome de la Matrice (Morpheus) & Neurobiologie de la Perception */}
        <div className="border-t border-border py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold bg-gold-muted/15 px-3 py-1 rounded-full border border-gold/10 font-body">
              L&apos;Axiome Morpheus — Le Choix du Réveil
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
              S&apos;éveiller de la Matrice Mondaine
            </h3>
            <p className="text-xs uppercase tracking-wider text-emerald font-semibold font-body">
              Le Choix de la Souveraineté face aux Illusions Sensorielles
            </p>
            
            <div className="border-l-2 border-gold/60 pl-4 py-1 my-6 bg-surface/30 rounded-r-sm">
              <p className="text-sm text-cream-muted leading-relaxed font-body italic">
                « Choisir la pilule bleue, c&apos;est rester dans l&apos;illusion de la Matrice. Choisir la pilule rouge, c&apos;est s&apos;éveiller à la réalité brute. »
              </p>
              <span className="text-[9px] uppercase tracking-widest text-cream-muted/60 font-semibold block mt-2 font-body">— Morpheus, The Matrix</span>
            </div>

            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Le monde terrestre (le <strong className="text-gold">Dunya</strong>) fonctionne comme une matrice de plaisirs et de tentations qu&apos;Allah a disposée sur notre chemin. Ces éléments ne sont pas intrinsèquement interdits (<em className="italic">haram</em>) : ils constituent le théâtre de notre évaluation. La véritable frontière réside dans le contrôle de notre <strong className="text-emerald">Nafs</strong> (l&apos;ego) pour ne jamais franchir la limite.
            </p>

            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Notre rôle à travers <strong>Briser les Frontières</strong> est de tendre la main à ceux qui ont franchi cette frontière spirituelle par distraction, afin de les ramener du bon côté et de restaurer leur pleine souveraineté cognitive — celle qu&apos;Allah a accordée à l&apos;homme lorsqu&apos;Il l&apos;a désigné comme Son représentant.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 p-8 border border-border bg-midnight-light/50 rounded-sm relative shadow-sm space-y-6"
          >
            <div className="absolute top-0 right-10 w-16 h-px bg-gold" />
            <h4 className="font-heading text-xl text-gold font-semibold">Neuroscience de la Perception</h4>
            
            <div className="space-y-4 text-xs font-body text-cream-muted leading-relaxed">
              <p>
                D&apos;un point de vue purement cognitif et neurobiologique, <strong>le cerveau ne voit jamais directement la réalité physique objective</strong>. 
              </p>
              
              <div className="p-4 bg-surface border border-border rounded-sm space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-emerald font-bold block">Le Flux Électrique</span>
                <p className="text-[11px] text-cream-muted italic">
                  Vos yeux ne font que capter des photons. Ces signaux lumineux sont immédiatement traduits en influx électriques complexes (potentiels d&apos;action / flux d&apos;électrons) voyageant le long de votre nerf optique.
                </p>
              </div>

              <p>
                Le cortex visuel ne projette pas une caméra en temps réel : il <strong>reconstruit</strong> une simulation interne basée sur des prédictions descendantes (<em className="italic">predictive coding</em>). Notre expérience consciente est une <strong>hallucination contrôlée</strong> par la biologie.
              </p>

              <p>
                Le <strong className="text-emerald">Nafs</strong> non discipliné est programmé pour maximiser la dopamine à court terme à travers les illusions de cette simulation sensorielle. Il se laisse emprisonner par la matrice du Dunya, confondant la projection nerveuse et les plaisirs éphémères avec la Réalité Objective Absolue.
              </p>

              <div className="pt-4 border-t border-border/60 text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                <span>Le Passage vers l&apos;Éveil (Akhirah)</span>
                <p className="text-gold mt-1 lowercase font-normal italic font-body">
                  S&apos;éveiller de cette boucle perceptive exige d&apos;ancrer son cortex préfrontal dans l&apos;adoration continue et la constance rituelle. C&apos;est le passage de l&apos;illusion mondaine à la réalité éternelle.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section 2 : La perspective coranique & le Khalifa */}
        <div className="border-t border-border py-24">
          <SectionHeading
            label="L&apos;Impératif Sacré"
            title="L&apos;Architecture du Khalifa"
            subtitle="Le fatalisme passif est une démission de vos responsabilités divines. L&apos;ordre et la discipline comportementale sont la clé de voûte de l&apos;excellence musulmane."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              variant="highlight"
              label="Axiome 01 — Souveraineté"
              title="Le Mandat Terrestre"
              description="L'être humain a été créé pour être Khalifa (représentant et gestionnaire) sur Terre. Cela exige une clarté intellectuelle maximale et un contrôle absolu sur son environnement direct pour en extraire le plus grand bien."
            />
            <Card
              variant="highlight"
              label="Axiome 02 — Droiture"
              title="La Soumission du Nafs"
              description="Le Nafs (l'âme passionnelle) tend vers l'entropie et la paresse. Seule une architecture de contraintes saines et de systèmes automatisés peut forcer l'ego à s'aligner durablement sur les hautes exigences morales."
            />
            <Card
              variant="highlight"
              label="Axiome 03 — Alignement"
              title="La Salat comme Pivot"
              description="La Salat n'est pas une simple coupure rituelle, c'est l'axe central autour duquel s'organise l'espace-temps du croyant. Restaurer sa concentration (Khuchu') nécessite d'éliminer au préalable le bruit cognitif ambiant."
            />
          </div>
        </div>

        {/* Section 3 : Passer à l'action — Étape 4 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center border-t border-border pt-16 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">➔ Passer à la phase supérieure</span>
          <h3 className="font-heading text-3xl font-light text-cream">
            Étape 04 : Étudier la Méthode
          </h3>
          <p className="text-sm text-cream-muted max-w-xl mx-auto font-body leading-relaxed">
            Vous avez compris les doutes, les biais cognitifs et l&apos;illusion sensorielle de la Matrice. Il est temps d&apos;étudier le protocole d&apos;interposition comportementale qui va restructurer votre souveraineté.
          </p>
          <div className="flex justify-center pt-2">
            <Button variant="primary" href="/protocole" className="shadow-lg shadow-gold/5 font-bold tracking-widest px-10 py-4">
              Découvrir le Protocole C.O.M.E.S. →
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
