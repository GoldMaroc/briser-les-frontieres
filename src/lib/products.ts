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
  "rdv-tel": {
    id: "rdv-tel",
    category: "coaching",
    title: "Entretien Téléphonique & Visio",
    subtitle: "Diagnostic de Souveraineté (45 min)",
    badge: "Téléphone / Visio",
    description:
      "45 minutes d'entretien confidentiel avec Mounir Byar. Analyse de votre charge allostatique, de vos blocages de prière et plan d'urgence immédiat.",
    totalCents: 4895,
    priceDisplay: "48,95 €",
    allowedInstallments: [1],
    durationLabel: "45 Minutes",
    features: [
      "Entretien privé individuel de 45 minutes avec Mounir Byar",
      "Analyse de vos déclencheurs de procrastination (At-Taswîf)",
      "Vérification de la charge mentale et des boucles ouvertes",
      "Remise d'une feuille de route stratégique immédiate",
      "Déductible si vous rejoignez un protocole sous 7 jours",
    ],
  },
  "rdv-presentiel": {
    id: "rdv-presentiel",
    category: "coaching",
    title: "Consultation Présentielle à Domicile",
    subtitle: "Mounir Byar se déplace à votre domicile (1h15)",
    badge: "À Domicile",
    description:
      "Mounir Byar se déplace personnellement à votre domicile. Audit physique de l'habitat, sanctuarisation de l'espace de prière (Tahara 360°) et restructuration des 8 piliers.",
    totalCents: 9645,
    priceDisplay: "96,45 €",
    allowedInstallments: [1],
    durationLabel: "1h15 à Domicile",
    features: [
      "Déplacement physique de Mounir Byar à votre domicile",
      "Audit d'ergonomie et d'architecture domestique (Tahara 360°)",
      "Sanctuarisation de votre coin de prière sans distraction",
      "Diagnostic complet des 8 Piliers du Life-Reset",
      "Protocole personnalisé remis en main propre",
    ],
  },
  "30j": {
    id: "30j",
    category: "coaching",
    title: "Protocole C.O.M.E.S. 30 Jours",
    subtitle: "Urgence & Rupture de la Procrastination",
    badge: "Le Plus Choisi",
    description:
      "Un mois d'intervention ciblée pour briser définitivement l'inertie, réguler le cortisol et sanctuariser les 5 prières quotidiennes.",
    totalCents: 61270,
    priceDisplay: "612,70 €",
    allowedInstallments: [1, 3],
    durationLabel: "30 Jours d'Immersion",
    features: [
      "4 séances individuelles intensives avec Mounir Byar",
      "Messagerie privée 5j/7 pour un déblocage en temps réel",
      "Déploiement des 4 Piliers C.O.M.E.S. dans votre quotidien",
      "Suivi hebdomadaire de la régularité et de la baisse du cortisol",
      "Garantie inaltérable de résultat et de transformation",
    ],
  },
  "9m": {
    id: "9m",
    category: "coaching",
    title: "Mandat Khalifa 9 Mois",
    subtitle: "Transformation Holistique & Compagnonnage d'Excellence",
    badge: "Sélection sur Dossier",
    description:
      "Accompagnement d'élite de 9 mois aux côtés de Mounir Byar pour une métamorphose intégrale de vos sphères spirituelle, familiale et professionnelle.",
    totalCents: 349000,
    priceDisplay: "Sur Mesure",
    allowedInstallments: [1, 9],
    durationLabel: "9 Mois",
    features: [
      "Supervision continue et ligne directe privée avec Mounir Byar",
      "Refonte de vos 8 Piliers de vie (mental, couple, finances, culte)",
      "Tous les traités, ouvrages et outils d'ingénierie inclus",
      "Visites et ajustements réguliers sur le terrain",
      "Cadre d'excellence et de discrétion absolue",
    ],
  },
  secrets: {
    id: "secrets",
    category: "book",
    title: "Les Secrets du Retour vers Allah",
    subtitle: "Reprendre sa Prière et sa Souveraineté",
    badge: "Ouvrage Numérique & Papier",
    description:
      "Le manuel fondateur décryptant la neurobiologie du Sujûd, l'extinction du cortisol et les protocoles d'interposition pour dompter le Nafs.",
    totalCents: 990,
    priceDisplay: "9,90 €",
    allowedInstallments: [1],
    features: [
      "Accès et téléchargement immédiat après validation (PDF + ePub)",
      "Diagrammes d'anatomie et de stimulation du nerf vague",
      "Lecture fluide sur tous vos appareils (smartphone, liseuse, PC)",
    ],
  },
  invocations: {
    id: "invocations",
    category: "book",
    title: "Recueil des Invocations Ciblées",
    subtitle: "Formules Prophétiques & Mécanismes Physiologiques",
    badge: "Format de Poche & Digital",
    description:
      "Les invocations exactes de détresse avec phonétique rigoureuse et explications des effets sur l'apaisement du système nerveux.",
    totalCents: 590,
    priceDisplay: "5,90 €",
    allowedInstallments: [1],
    features: [
      "Téléchargement immédiat haute définition",
      "Textes arabes voyellés, phonétique et traduction française",
      "Guide pratique d'utilisation aux heures charnières de la journée",
    ],
  },
  rahman: {
    id: "rahman",
    category: "book",
    title: "Ar-Rahman — La Mer sans Rivage",
    subtitle: "Exégèse du Premier Nom & Souveraineté du Cœur",
    badge: "Édition de Prestige",
    description:
      "Une exploration profonde de la Miséricorde divine infinie pour dissoudre l'anxiété existentielle et ancrer une paix inébranlable.",
    totalCents: 1265,
    priceDisplay: "12,65 €",
    allowedInstallments: [1],
    features: [
      "Accès immédiat (PDF Haute Définition + ePub)",
      "84 pages d'exégèse poignante et de contemplation cosmique",
      "Comprend les commentaires des plus grands maîtres de l'Islam",
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
