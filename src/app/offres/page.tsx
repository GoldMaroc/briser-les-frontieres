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

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offres.map((offre, i) => (
            <motion.div
              key={offre.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-surface/40 backdrop-blur-sm border rounded-sm flex flex-col ${
                offre.popular 
                  ? "border-gold shadow-lg shadow-gold/10 scale-100 lg:scale-105 z-10" 
                  : "border-border hover:border-gold/30"
              }`}
            >
              {offre.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-stone-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Recommandé
                </div>
              )}
              
              <div className="p-8 flex-1">
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

      </div>
    </div>
  );
}
