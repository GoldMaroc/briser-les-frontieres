export interface ProductCatalogItem {
  id: string;
  category: "coaching" | "book";
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  totalCents: number;
  basePriceDisplay?: string;
  priceDisplay: string;
  allowedInstallments: number[];
  features: string[];
  durationLabel?: string;
}

export const PRODUCTS_CATALOG: Record<string, ProductCatalogItem> = {
  audit: {
    id: "audit",
    category: "coaching",
    title: "Audit Diagnostique",
    subtitle: "Évaluation Initiale & Cartographie Cognitive",
    badge: "Étape Initiale",
    description:
      "Un diagnostic approfondi de votre architecture mentale, émotionnelle et spirituelle avec plan d'action immédiat.",
    totalCents: 8590,
    priceDisplay: "85,90 €",
    allowedInstallments: [1],
    durationLabel: "Séance Diagnostic",
    features: [
      "Questionnaire d'analyse préliminaire approfondi",
      "Séance d'investigation intensive (45 min)",
      "Identification de vos blocages et frontières internes",
      "Feuille de route stratégique et spirituelle immédiate",
      "Déductible si vous rejoignez un programme sous 7 jours",
    ],
  },
  "30j": {
    id: "30j",
    category: "coaching",
    title: "Protocole 30 Jours",
    subtitle: "Urgence & Réalignement Rapide",
    badge: "Intervention Ciblée",
    description:
      "Un mois d'intervention ciblée pour briser une inertie spécifique, restaurer la discipline quotidienne et retrouver la clarté.",
    totalCents: 61270,
    priceDisplay: "612,70 €",
    allowedInstallments: [1, 2],
    durationLabel: "30 Jours",
    features: [
      "Diagnostic complet & Profilage comportemental inclus",
      "Programme d'action sur-mesure sur 4 semaines",
      "Accès à votre Espace Privé interactif 24h/24",
      "Suivi hebdomadaire et ajustement des exercices",
      "Support direct par messagerie privée dédiée",
    ],
  },
  "3m": {
    id: "3m",
    category: "coaching",
    title: "Transformation 3 Mois",
    subtitle: "Reconstruction Profonde & Ancrage Durable",
    badge: "Le Plus Choisi",
    description:
      "Le protocole de référence pour déraciner les schémas limitants, reconstruire vos fondations et ancrer une souveraineté durable.",
    totalCents: 165530,
    priceDisplay: "1 655,30 €",
    allowedInstallments: [1, 3],
    durationLabel: "3 Mois",
    features: [
      "Ingénierie complète de transformation sur 12 semaines",
      "Espace Privé évolutif avec modules audio, vidéo & PDF",
      "Entretiens réguliers de suivi et de recalibrage",
      "Travail en profondeur sur les traumatismes et blocages",
      "Priorité de réponse et accompagnement rapproché",
      "Bilan de clôture et protocole d'autonomie durable",
    ],
  },
  "12m": {
    id: "12m",
    category: "coaching",
    title: "Mentorat d'Excellence",
    subtitle: "Alliance Stratégique & Spirituelle sur 12 Mois",
    badge: "Accompagnement VIP — -20% Privilège",
    description:
      "Une année complète d'accompagnement d'élite aux côtés de Mounir BYAR pour une métamorphose intégrale de vos sphères de vie.",
    totalCents: 488960,
    basePriceDisplay: "6 112,00 €",
    priceDisplay: "4 889,60 €",
    allowedInstallments: [1, 6],
    durationLabel: "12 Mois",
    features: [
      "12 mois de mentorat privé et confidentiel",
      "Accès direct et privilégié à votre mentor",
      "Architecture de vie complète (Spirituel, Mental, Pro, Familial)",
      "Tous les ouvrages, ressources et protocoles inclus",
      "Ajustement continu du programme selon vos épreuves",
      "Garantie d'un cadre d'excellence, d'écoute et de discrétion absolue",
    ],
  },
  secrets: {
    id: "secrets",
    category: "book",
    title: "Les Secrets du Retour vers Allah",
    subtitle: "Manuel de Guérison de l'Âme & Réveil Spirituel",
    badge: "Ouvrage Numérique (PDF + ePub)",
    description:
      "Une exploration chirurgicale des mécanismes de laTawbah (le repentir sincère) et de la reconstruction du lien avec le Créateur.",
    totalCents: 590,
    priceDisplay: "5,90 €",
    allowedInstallments: [1],
    features: [
      "Accès et téléchargement immédiat après validation",
      "Double format inclus : PDF Haute Définition + ePub (Liseuse/Mobile)",
      "Lecture fluide sur smartphone, tablette, liseuse et ordinateur",
    ],
  },
  rahman: {
    id: "rahman",
    category: "book",
    title: "Ar-Rahman — La Mer sans Rivage",
    subtitle: "Traité de Contemplation & Souveraineté du Cœur",
    badge: "Édition de Prestige (PDF)",
    description:
      "Une plongée profonde dans l'attribut divin de la Miséricorde infinie pour dissoudre l'anxiété existentielle et restaurer la paix intérieure.",
    totalCents: 1265,
    priceDisplay: "12,65 €",
    allowedInstallments: [1],
    features: [
      "Accès et téléchargement immédiat après validation",
      "Format PDF de Prestige mis en page avec soin",
      "Œuvre complète prête à la lecture sur tous vos supports",
    ],
  },
};

export function getInstallmentCents(totalCents: number, installments: number): number {
  if (installments <= 1) return totalCents;
  return Math.round(totalCents / installments);
}

export function formatEuros(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €";
}
