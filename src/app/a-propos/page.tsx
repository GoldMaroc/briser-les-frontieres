"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function APropos() {
  return (
    <div className="relative py-32 bg-midnight min-h-screen">
      {/* Gradients thématiques circadiens */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_30%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <SectionHeading
          label="Le Fondateur"
          title="L&apos;Ingénieur en Souveraineté"
          subtitle="Mounir BYAR, concepteur du Protocole C.O.M.E.S. et spécialiste en optimisation environnementale in situ pour cadres dirigeants."
        />

        {/* Section Portrait & Philosophie */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-16 mb-24">
          
          {/* Texte de présentation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald bg-emerald-muted/20 px-3 py-1 rounded-full border border-emerald/10">
              Positionnement
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
              Pas de Coaching. De l&apos;Ingénierie Comportementale.
            </h3>
            
            <p className="text-sm md:text-base text-cream-muted leading-relaxed font-body">
              L&apos;Ingénierie de la Souveraineté refuse catégoriquement les paradigmes du développement personnel, de la motivation éphémère ou du coaching. Ces approches traitent les symptômes mais ignorent l&apos;architecture systémique du quotidien.
            </p>

            <p className="text-sm md:text-base text-cream-muted leading-relaxed font-body">
              Fondé par <strong className="text-gold">Mounir BYAR</strong>, &quot;Briser les Frontières&quot; intervient directement à la racine du problème : l&apos;environnement physique, logique et décisionnel. Nous croyons que la droiture et l&apos;excellence intellectuelle ne découlent pas de la volonté pure, mais d&apos;un environnement qui élimine la possibilité même de l&apos;erreur.
            </p>

            <p className="text-sm md:text-base text-cream-muted leading-relaxed font-body">
              Avec une approche discrète, rigoureuse et ancrée dans les valeurs islamiques de gouvernance de soi, Mounir BYAR accompagne les croyants désireux de revenir sincèrement à Allah. Parce que la foi est déjà présente dans votre cœur, nous bâtissons ensemble l&apos;architecture comportementale nécessaire pour passer à l&apos;action, vaincre définitivement l&apos;abandon et honorer pleinement votre mandat de Khalifa.
            </p>
          </motion.div>

          {/* Valeurs / Chiffres clés à droite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 p-8 border border-border bg-surface/10 rounded-sm relative"
          >
            <div className="absolute top-0 right-10 w-16 h-px bg-gold" />
            <h4 className="font-heading text-xl text-gold mb-6">Les Engagements BLF</h4>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-emerald font-heading text-xl">01</span>
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-cream">Discrétion Absolue</h5>
                  <p className="text-xs text-cream-muted mt-1 leading-relaxed">
                    Aucune mention publique de nos clients. Nous respectons le secret professionnel le plus strict.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-emerald font-heading text-xl">02</span>
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-cream">Intervention In Situ</h5>
                  <p className="text-xs text-cream-muted mt-1 leading-relaxed">
                    Nous nous déplaçons directement chez vous pour auditer, épurer et structurer votre espace de vie réel.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-emerald font-heading text-xl">03</span>
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-cream">Souveraineté Intégrale</h5>
                  <p className="text-xs text-cream-muted mt-1 leading-relaxed">
                    L&apos;alignement complet entre vos succès professionnels, votre clarté mentale et vos engagements spirituels.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Section Citation de Mounir BYAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-emerald/20 p-10 md:p-16 bg-surface/30 backdrop-blur-sm rounded-sm text-center relative max-w-4xl mx-auto"
        >
          <span className="font-heading text-7xl text-gold/20 absolute -top-4 left-6 select-none pointer-events-none">“</span>
          <p className="font-heading text-xl md:text-2xl font-light text-cream italic leading-relaxed relative z-10">
            &quot;Nous ne cherchons pas à vous motiver. Nous cherchons à libérer votre esprit des futilités quotidiennes pour que vous puissiez vous consacrer entièrement à ce qui a été décrété pour vous. L&apos;ordre est le premier pas vers la droiture.&quot;
          </p>
          <span className="block mt-6 text-xs uppercase tracking-[0.2em] text-emerald font-semibold">— Mounir BYAR</span>
        </motion.div>

        {/* Bouton d'action */}
        <div className="mt-20 text-center">
          <Button variant="primary" href="/contact" className="shadow-lg shadow-emerald/5">
            Initier le Contact
          </Button>
        </div>

      </div>
    </div>
  );
}
