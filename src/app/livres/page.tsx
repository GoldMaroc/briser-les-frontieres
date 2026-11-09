"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function Livres() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Halo de lumière doré circadien et texture */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-[radial-gradient(circle_at_50%_0%,var(--color-gold-muted)_0%,transparent_60%)] pointer-events-none opacity-40 md:opacity-60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête de la page */}
        <SectionHeading
          label="Les Publications BLF"
          title="Les Livres de Mounir BYAR"
          subtitle="Des ouvrages uniques mariant avec rigueur les méthodes de l'exégèse islamique traditionnelle et la science cognitive contemporaine pour restructurer l'esprit."
        />

        {/* OUVRAGE 1 : Les Secrets du Retour vers Allah */}
        <div id="secrets" className="border-t border-border/60 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold bg-gold-muted px-4 py-1.5 border border-gold/20 font-body">
              eBook Pratique & Méthode de 30 Jours
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
              Les Secrets du Retour vers Allah
            </h3>
            <p className="text-sm uppercase tracking-widest text-emerald font-semibold font-body">
              Reprendre sa Prière et sa Souveraineté
            </p>
            
            <p className="text-sm text-cream-muted leading-relaxed font-body italic border-l-2 border-gold pl-4 my-6">
              « Ne subissez plus votre quotidien.<br />
              Reprenez votre prière et votre souveraineté. »
            </p>

            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Ce livre n&apos;est pas un appel à l&apos;effort, c&apos;est une ingénierie. Une architecture conçue pour quiconque s&apos;est éloigné de la prière et attend, en silence, de retrouver le chemin.
            </p>

            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Au croisement d&apos;Al-Ghazâlî, d&apos;Ibn Qayyim et des sciences cognitives (B.J. Fogg, V. Frankl), Mounir BYAR propose une méthode en 5 mouvements et un protocole de 30 jours. Pour quiconque a tenté de revenir sans y parvenir.
            </p>

            {/* Plan de l'ouvrage stylisé haut de gamme */}
            <div className="bg-midnight-light/50 p-8 border border-border/80 rounded-sm">
              <h4 className="font-heading text-lg text-cream mb-4 font-medium tracking-wide">Structure de l&apos;ouvrage</h4>
              <ul className="space-y-3.5 text-xs text-cream-muted font-body">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Préface</strong> — Un mot avant d&apos;entrer : Moins de combat, plus d&apos;architecture.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Chapitre I : Le Statut de Khalîfa</strong> — La prise de responsabilité radicale.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Chapitre II : L&apos;Anatomie du Retour (At-Tawbah)</strong> — La théorie des divergences du soi et Tazkiyah.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Chapitre III : La Prière (As-Salât)</strong> — Algorithme circadien de baisse de 27,3% du cortisol.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Chapitre IV : Reprendre sa Souveraineté</strong> — Le design environnemental (James Clear / B.J. Fogg).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Chapitre V : L&apos;Écosystème de la Souveraineté</strong> — L&apos;importance cruciale du compagnonnage (Suhba).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-emerald/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Protocole pratique de 30 jours</strong> — Stabilisation, Profondeur, Expansion.
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Module de Paiement direct Stripe - Conforme & Intégré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 p-8 border border-border bg-midnight-light/60 backdrop-blur-md rounded-sm relative shadow-2xl hover:border-gold/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-10 w-20 h-px bg-gold/50" />
            <h4 className="font-heading text-xl text-cream mb-3 font-semibold tracking-wide">Se procurer l&apos;ouvrage</h4>
            <p className="text-xs text-cream-muted leading-relaxed font-body mb-6">
              L&apos;eBook complet est disponible immédiatement après règlement sécurisé. Intégrez le protocole dès aujourd&apos;hui.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Format</span>
                <span className="text-cream font-medium">eBook (Format ePub)</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Pagination</span>
                <span className="text-cream font-medium">41 pages</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Tarif Numérique</span>
                <span className="text-gold font-bold text-base">5,90 €</span>
              </div>
            </div>

            <Button 
              href="/paiement?offre=secrets"
              variant="primary" 
              className="w-full py-4 text-center justify-center font-bold tracking-widest"
            >
              Commander l&apos;eBook (PDF & ePub)
            </Button>

            {/* Badge de confiance de paiement */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-wider text-cream-muted/50 font-body">
              <svg className="w-3.5 h-3.5 text-gold/60" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Paiement 100% Crypté & Sécurisé via Stripe</span>
            </div>
          </motion.div>

        </div>

        {/* OUVRAGE 2 : Ar-Rahman — La Mer sans Rivage */}
        <div id="rahman" className="border-t border-border/60 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold bg-gold-muted px-4 py-1.5 border border-gold/20 font-body">
              Volume I — Collection Connaissance du Créateur
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
              Ar-Rahman : La Mer sans Rivage
            </h3>
            <p className="text-sm uppercase tracking-widest text-emerald font-semibold font-body">
              Exégèse du Premier Nom — La Miséricorde Universelle d&apos;Allah
            </p>
            
            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Une plongée de 84 pages dans la linguistique, l&apos;exégèse classique (Tabarî, Qurtubî, Râzî, Ibn Kathîr) et la théologie spirituelle (Ghazâlî, Ibn al-Qayyim) d&apos;un seul nom divin : <strong className="text-cream">Ar-Rahman</strong>. Le premier nom à être invoqué après le nom suprême, contenant en lui une cosmologie entière et s&apos;incarnant comme un remède puissant contre la crise spirituelle moderne.
            </p>

            {/* Plan de l'ouvrage stylisé */}
            <div className="bg-midnight-light/50 p-8 border border-border/80 rounded-sm">
              <h4 className="font-heading text-lg text-cream mb-4 font-medium tracking-wide">Structure de l&apos;ouvrage</h4>
              <ul className="space-y-3.5 text-xs text-cream-muted font-body">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie I : La Science du Nom</strong> — La tradition des 99 noms (hadiths) et les 4 niveaux d&apos;Ihsâ&apos; de la connaissance.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie II : La Miséricorde Cosmologique</strong> — Le Trône divin et la miséricorde universelle.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie III : Les Récits de la Miséricorde</strong> — Rahmatan lil-&apos;âlamîn (Le Prophète ﷺ comme miséricorde) et Taïf.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie IV : Théologie & Psychologie</strong> — Al-Ghazâlî et l&apos;âme humaine face au désespoir.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-emerald/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie V : Vivre le Nom</strong> — Le programme pratique pour incarner la Rahma dans le quotidien.
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Module d'Achat direct Stripe - Prestige */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 p-8 border border-border bg-midnight-light/60 backdrop-blur-md rounded-sm relative shadow-2xl hover:border-gold/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-10 w-20 h-px bg-gold/50" />
            <h4 className="font-heading text-xl text-cream mb-3 font-semibold tracking-wide">Se procurer l&apos;ouvrage</h4>
            <p className="text-xs text-cream-muted leading-relaxed font-body mb-6">
              Le premier volume de la collection exclusive est disponible immédiatement en version numérique de prestige (PDF).
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Format</span>
                <span className="text-cream font-medium">eBook (Format PDF)</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Pagination</span>
                <span className="text-cream font-medium">84 pages</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Tarif Numérique</span>
                <span className="text-gold font-bold text-base">12,65 €</span>
              </div>
            </div>

            <Button 
              href="/paiement?offre=rahman"
              variant="primary" 
              className="w-full py-4 text-center justify-center font-bold tracking-widest"
            >
              Commander l&apos;eBook (PDF)
            </Button>

            {/* Badge de confiance de paiement */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-wider text-cream-muted/50 font-body">
              <svg className="w-3.5 h-3.5 text-gold/60" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Paiement 100% Crypté & Sécurisé via Stripe</span>
            </div>
          </motion.div>

        </div>

        {/* Section Incitation au Mentorat Privé — Étape 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center border-t border-border/60 pt-20 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">➔ Passer à la phase supérieure</span>
          <h3 className="font-heading text-3xl font-light text-cream tracking-wide">
            Étape 06 : Entamer l&apos;Interposition Privée
          </h3>
          <p className="text-sm text-cream-muted max-w-xl mx-auto font-body leading-relaxed">
            La lecture des écrits numériques est votre point d&apos;entrée. Si vous aspirez à l&apos;excellence ultime du compagnonnage spirituel (Suhba) et comportemental sous la direction de Mounir BYAR, formulez votre candidature privée.
          </p>
          <div className="flex justify-center pt-4">
            <Button variant="primary" href="/contact" className="shadow-2xl shadow-stone-950/20 font-bold tracking-widest px-10 py-4">
              Postuler au Mentorat de 9 Mois →
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
