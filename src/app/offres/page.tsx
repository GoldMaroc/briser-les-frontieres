"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiCheck } from "react-icons/fi";

const offres = [
  {
    id: "audit",
    titre: "Audit Diagnostique",
    duree: "Séance unique",
    options: [
      { label: "Paiement unique", price: "85,90 €", url: "#lien-stripe-audit" }
    ],
    desc: "Une analyse chirurgicale de votre situation actuelle pour identifier vos blocages profonds et définir un plan d'action immédiat.",
    features: [
      "Consultation privée de 60 min",
      "Analyse de votre charge mentale",
      "Cartographie des fuites d'énergie",
      "Diagnostic de votre organisation",
      "Livrable avec plan d'action"
    ],
    popular: false
  },
  {
    id: "30j",
    titre: "Protocole 30 Jours",
    duree: "1 Mois",
    options: [
      { label: "Paiement unique", price: "698,90 €", url: "#lien-stripe-30j-1x" },
      { label: "En 2 fois (sans frais)", price: "2 x 349,45 €", url: "#lien-stripe-30j-2x" }
    ],
    desc: "Un mois d'accompagnement intensif pour instaurer de nouvelles fondations et retrouver la maîtrise de votre temps.",
    features: [
      "Audit Diagnostique inclus",
      "Espace Client Privé",
      "Programme quotidien sur-mesure",
      "Suivi hebdomadaire",
      "Mise en place de la routine matinale",
      "Accès prioritaire par messagerie"
    ],
    popular: true
  },
  {
    id: "3m",
    titre: "Transformation 3 Mois",
    duree: "90 Jours",
    options: [
      { label: "Paiement unique", price: "1 655,30 €", url: "#lien-stripe-3m-1x" },
      { label: "En 3 fois (sans frais)", price: "3 x 551,76 €", url: "#lien-stripe-3m-3x" }
    ],
    desc: "L'accompagnement de référence pour ancrer définitivement la maîtrise de soi dans votre vie.",
    features: [
      "Protocole 30 Jours intégral",
      "Ajustements de votre environnement",
      "Méthode d'introspection quotidienne",
      "Réorganisation de vos journées",
      "Restructuration de l'espace physique",
      "Accompagnement et suivi régulier"
    ],
    popular: false
  },
  {
    id: "12m",
    titre: "Mentorat d'Excellence",
    duree: "12 Mois",
    options: [
      { label: "Paiement unique", price: "4 889,60 €", url: "#lien-stripe-12m-1x" },
      { label: "En 6 fois (sans frais)", price: "6 x 814,93 €", url: "#lien-stripe-12m-6x" }
    ],
    desc: "Le programme de mentorat ultime. Réservé aux personnes déterminées à changer radicalement de vie.",
    features: [
      "Accès intégral et illimité",
      "Système d'organisation complet",
      "Accompagnement familial / couple possible",
      "Alignement de vos finances et projets",
      "Refonte existentielle et spirituelle",
      "Accès direct au cercle restreint"
    ],
    popular: false
  }
];

export default function OffresPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({
    "audit": 0,
    "30j": 0,
    "3m": 0,
    "12m": 0,
  });

  const auditOffre = offres.find(o => o.id === "audit");
  const mentoratOffres = offres.filter(o => o.id !== "audit");

  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Gradients de fond */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1)_0%,rgba(10,17,40,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="L'Accompagnement"
          title="Investissez dans votre Souveraineté"
          subtitle="Choisissez le niveau d'interposition nécessaire pour briser vos frontières. Les places sont strictement limitées pour garantir l'excellence du suivi."
        />

        {/* Offre d'Entrée : Audit */}
        {auditOffre && (
          <div className="max-w-4xl mx-auto mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface/40 backdrop-blur-md border border-gold/30 rounded-sm flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-gold/5 relative"
            >
               <div className="flex-1 p-8 md:p-12">
                 <span className="text-gold font-body text-xs tracking-widest uppercase mb-2 block">{auditOffre.duree}</span>
                 <h3 className="text-2xl font-heading font-semibold text-cream mb-4">{auditOffre.titre}</h3>
                 <p className="text-sm text-cream-muted leading-relaxed mb-8">
                   {auditOffre.desc}
                 </p>
                 <ul className="space-y-4">
                   {auditOffre.features.map((feature, idx) => (
                     <li key={idx} className="flex items-start gap-3 text-sm text-cream-muted">
                       <FiCheck className="text-emerald shrink-0 mt-0.5" />
                       <span className="leading-tight">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>
               
               <div className="w-full md:w-1/3 bg-black/40 p-8 md:p-12 border-t md:border-t-0 md:border-l border-stone-800 flex flex-col justify-center items-center text-center">
                 <span className="text-4xl font-bold text-cream mb-2">
                   {auditOffre.options[selectedOptions["audit"]].price}
                 </span>
                 <p className="text-xs text-cream-muted mb-8 italic">Paiement unique</p>
                 
                 <a 
                   href={auditOffre.options[selectedOptions["audit"]].url} 
                   className="w-full flex justify-center items-center gap-2 py-4 rounded-sm font-semibold tracking-wider uppercase text-xs transition-all bg-gold text-stone-950 hover:bg-gold-light"
                 >
                   Procéder au paiement
                 </a>
               </div>
            </motion.div>
          </div>
        )}

        <SectionHeading
          label="Les Programmes"
          title="Mentorats & Accompagnements"
          subtitle="Des solutions structurées pour instaurer de nouvelles fondations et changer radicalement de vie."
        />

        {/* Grille à 3 colonnes pour les programmes */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 relative z-10">
          {mentoratOffres.map((offre, index) => (
            <motion.div
              key={offre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-surface/40 backdrop-blur-sm border rounded-sm flex flex-col ${
                offre.popular 
                  ? "border-gold shadow-lg shadow-gold/10 scale-105 z-10" 
                  : "border-border hover:border-gold/30"
              }`}
            >
              {offre.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gold text-stone-950 text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-sm">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="p-8 pb-0">
                <span className="text-gold font-body text-xs tracking-widest uppercase mb-2 block">{offre.duree}</span>
                <h3 className="text-xl font-heading font-semibold text-cream mb-4">{offre.titre}</h3>
                
                <div className="mb-6 min-h-[100px]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-cream">
                      {offre.options[selectedOptions[offre.id]].price}
                    </span>
                  </div>
                  
                  {offre.options.length > 1 && (
                    <div className="mt-4 flex flex-col gap-3">
                      {offre.options.map((opt, idx) => (
                        <label 
                          key={idx} 
                          className="flex items-center gap-3 cursor-pointer group"
                          onClick={() => setSelectedOptions({ ...selectedOptions, [offre.id]: idx })}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedOptions[offre.id] === idx ? 'border-gold' : 'border-stone-500 group-hover:border-gold'}`}>
                            {selectedOptions[offre.id] === idx && <div className="w-2 h-2 rounded-full bg-gold" />}
                          </div>
                          <span className={`text-sm ${selectedOptions[offre.id] === idx ? 'text-cream font-medium' : 'text-cream-muted group-hover:text-cream transition-colors'}`}>
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-cream-muted leading-relaxed mb-8 h-20">
                  {offre.desc}
                </p>

                <ul className="space-y-4 mb-8">
                  {offre.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-cream-muted">
                      <FiCheck className="text-emerald shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0 mt-auto">
                <a 
                  href={offre.options[selectedOptions[offre.id]].url} 
                  className={`w-full flex justify-center items-center gap-2 py-4 rounded-sm font-semibold tracking-wider uppercase text-xs transition-all ${
                    offre.popular 
                      ? "bg-gold text-stone-950 hover:bg-gold-light" 
                      : "border border-gold/50 text-gold hover:bg-gold hover:text-stone-950"
                  }`}
                >
                  Procéder au paiement
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Éthique et Accessibilité */}
        <div className="mt-24 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Bloc Éthique (Riba) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-gold/20 rounded-sm bg-surface/40 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="font-arabic text-6xl">۞</span>
            </div>
            <h4 className="text-xl font-heading text-gold mb-4">Éthique Financière (0% Riba)</h4>
            <p className="text-sm text-cream leading-relaxed mb-6">
              Nos facilités de paiement en plusieurs fois sont proposées <strong>strictement sans aucun frais supplémentaire ni intérêt</strong>. Nous refusons catégoriquement la pratique de l&apos;usure (Riba), en accord avec nos principes d&apos;excellence et d&apos;éthique spirituelle.
            </p>
            <blockquote className="border-l-2 border-gold/50 pl-4 mb-4">
              <p className="text-xs text-cream-muted italic mb-2">
                &quot;Allah a rendu licite le commerce, et illicite l&apos;intérêt (Riba).&quot;
              </p>
              <footer className="text-[10px] text-stone-500 uppercase tracking-widest">— Coran 2:275</footer>
            </blockquote>
            <blockquote className="border-l-2 border-gold/50 pl-4">
              <p className="text-xs text-cream-muted italic mb-2">
                &quot;Le Messager d&apos;Allah ﷺ a maudit celui qui se nourrit de l&apos;usure, celui qui la fait consommer, celui qui l&apos;écrit et ses deux témoins.&quot;
              </p>
              <footer className="text-[10px] text-stone-500 uppercase tracking-widest">— Sahih Muslim</footer>
            </blockquote>
          </motion.div>

          {/* Bloc Difficultés Financières */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 border border-stone-800 rounded-sm bg-surface/40 backdrop-blur-sm"
          >
            <h4 className="text-xl font-heading text-cream mb-4">L&apos;Argent ne doit pas être un frein</h4>
            <p className="text-sm text-cream-muted leading-relaxed mb-6">
              Si vous traversez de réelles <strong>difficultés financières</strong> mais que votre détermination à changer de vie est sincère et inébranlable, nous avons des solutions adaptées pour vous. N&apos;hésitez pas à nous contacter, la porte reste ouverte.
            </p>
            <blockquote className="border-l-2 border-stone-600 pl-4 mb-8">
              <p className="text-xs text-stone-400 italic mb-2">
                &quot;Allah veut pour vous la facilité, Il ne veut pas la difficulté pour vous.&quot;
              </p>
              <footer className="text-[10px] text-stone-500 uppercase tracking-widest">— Coran 2:185</footer>
            </blockquote>
            <a 
              href="/contact" 
              className="inline-block border-b border-gold text-gold text-sm font-semibold pb-1 hover:text-cream hover:border-cream transition-colors"
            >
              Contactez-nous pour une solution sur-mesure
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
