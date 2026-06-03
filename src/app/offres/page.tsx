"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiCheck, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const offres = [
  {
    id: "audit",
    titre: "Audit Diagnostique",
    duree: "Séance unique",
    prix: "85,90 €",
    paiement: "Paiement en 1 fois",
    desc: "Une analyse chirurgicale de votre situation actuelle pour identifier vos blocages profonds et définir un plan d'action immédiat.",
    features: [
      "Consultation privée de 60 min",
      "Analyse de votre charge mentale",
      "Cartographie des fuites d'énergie",
      "Diagnostic comportemental",
      "Livrable avec plan d'action"
    ],
    popular: false
  },
  {
    id: "30j",
    titre: "Protocole 30 Jours",
    duree: "1 Mois",
    prix: "698,90 €",
    paiement: "Payable en 1 ou 2 fois",
    desc: "Un mois d'interposition stratégique pour instaurer de nouvelles fondations et retrouver la maîtrise de votre temps.",
    features: [
      "Audit Diagnostique inclus",
      "Espace Client Privé",
      "Programme quotidien sur-mesure",
      "Suivi hebdomadaire",
      "Mise en place de la routine matinale (Fajr)",
      "Accès prioritaire par messagerie"
    ],
    popular: true
  },
  {
    id: "3m",
    titre: "Transformation 3 Mois",
    duree: "90 Jours",
    prix: "1 655,30 €",
    paiement: "Paiement mensuel possible",
    desc: "L'accompagnement de référence pour ancrer définitivement la souveraineté comportementale dans votre vie.",
    features: [
      "Protocole 30 Jours intégral",
      "Ajustements micro-environnementaux",
      "Systématisation de la Muhasaba",
      "Ancrage chronobiologique complet",
      "Restructuration de l'espace physique",
      "Suhba (Compagnonnage) régulier"
    ],
    popular: false
  },
  {
    id: "12m",
    titre: "Mandat Khalifa (Avancé)",
    duree: "12 Mois",
    prix: "4 889,60 €",
    paiement: "Paiement mensuel possible",
    desc: "Le programme de mentorat ultime. Réservé aux personnes déterminées à changer radicalement de paradigme.",
    features: [
      "Accès intégral et illimité",
      "Ingénierie de souveraineté complète",
      "Accompagnement familial / couple possible",
      "Alignement de vos finances et projets",
      "Refonte existentielle et spirituelle",
      "Accès direct au cercle restreint"
    ],
    popular: false
  }
];

export default function OffresPage() {
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
                  : "border-white/10 hover:border-gold/30"
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
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{offre.prix}</span>
                  </div>
                  <p className="text-xs text-cream-muted mt-2 italic">{offre.paiement}</p>
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
                <Link 
                  href="/candidature" 
                  className={`w-full flex justify-center items-center gap-2 py-4 rounded-sm font-semibold tracking-wider uppercase text-xs transition-all ${
                    offre.popular 
                      ? "bg-gold text-stone-950 hover:bg-gold-light" 
                      : "border border-gold/50 text-gold hover:bg-gold hover:text-stone-950"
                  }`}
                >
                  <FiCalendar /> Déposer une candidature
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
