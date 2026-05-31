export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'homme' | 'femme' | 'famille' | 'groupe';
  text: string;
  score?: number; // Score d'Audit de Souveraineté Cognitive
  period: "Protocole 9 Mois" | "Protocole 3 Mois" | "Protocole 1 Mois" | "Audit de Souveraineté";
  location?: string;
}

export const testimonials: Testimonial[] = [
  // ════════════════ HOMMES (15 TEMOIGNAGES) ════════════════
  {
    id: "h1",
    name: "Yacine",
    role: "",
    category: "homme",
    text: "J'étais complètement perdu, noyé dans les excès du quotidien et les péchés qui abîmaient mon âme. Le protocole de 9 mois a été ma planche de salut. Ce n'est pas de la motivation éphémère, c'est une restructuration complète. J'ai réappris à dompter mon Nafs et à remettre Allah au centre de chaque respiration.",
    score: 84,
    period: "Protocole 9 Mois",
    location: "Chartres"
  },
  {
    id: "h2",
    name: "Sliman",
    role: "Père de famille",
    category: "homme",
    text: "Mes parents ne m'avaient jamais appris à prier, je ne connaissais pratiquement rien à l'Islam. J'avais un vide immense dans ma vie et je cherchais à me recadrer. Grâce aux discussions, à l'explication simple de la foi et à la redevabilité du protocole de 9 mois, j'ai commencé la Salat à 34 ans. Ma vie a enfin un sens.",
    score: 90,
    period: "Protocole 9 Mois",
    location: "Cormontreuil"
  },
  {
    id: "h3",
    name: "Mehdi",
    role: "",
    category: "homme",
    text: "Je faisais la prière, puis j'arrêtais, puis je reprenais... Ces coupures constantes me rongeaient. Je vivais dans une instabilité spirituelle fatigante. Le protocole m'a appris à ancrer ma routine sur des verrous environnementaux incassables. Depuis 8 mois, pas une seule prière manquée. La constance est enfin là.",
    score: 78,
    period: "Protocole 9 Mois",
    location: "Fismes"
  },
  {
    id: "h4",
    name: "Tariq",
    role: "Jeune",
    category: "homme",
    text: "J'étais emporté par le tourbillon de la vie moderne, toujours sur mon téléphone, à courir après l'argent sans jamais me poser pour Dieu. L'audit de souveraineté m'a ouvert les yeux sur mon at-taswîf (la procrastination spirituelle). En un mois de protocole intensif, j'ai épuré le bruit numérique et retrouvé mon cœur.",
    score: 83,
    period: "Protocole 1 Mois",
    location: "Gueux"
  },
  {
    id: "h5",
    name: "Kamel",
    role: "",
    category: "homme",
    text: "Après une grave dépression, j'avais perdu toute confiance en la vie. Je n'arrivais plus à sortir, à vivre en société ou même à envisager de retravailler. Le compagnonnage de 9 mois m'a redonné un cadre spirituel et mental. J'ai repris confiance en la miséricorde d'Allah, j'ai accepté de revivre en société et je viens de retrouver un emploi stable.",
    score: 89,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  },
  {
    id: "h6",
    name: "Farid",
    role: "",
    category: "homme",
    text: "J'avais accumulé d'énormes doutes sur ma religion qui m'empêchaient d'avancer et bloquaient ma pratique. L'accompagnement sur un mois m'a permis de poser toutes mes questions en toute franchise, sans jugement. Mounir a su apporter des réponses rationnelles et spirituelles qui m'ont remis sur pied.",
    score: 75,
    period: "Protocole 1 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "h7",
    name: "Rayan",
    role: "Étudiant",
    category: "homme",
    text: "Je n'avais jamais prié de ma vie et la religion me semblait inaccessible. J'étais perdu dans des addictions aux écrans et aux jeux. L'accompagnement m'a pris par la main en m'expliquant l'Islam sous un angle neurobiologique et dévotionnel. J'ai posé mon front au sol pour la première fois. Une renaissance.",
    score: 81,
    period: "Protocole 9 Mois",
    location: "Sézanne"
  },
  {
    id: "h8",
    name: "Youssef",
    role: "",
    category: "homme",
    text: "Mon problème, c'était le multitâche et la course aux plaisirs immédiats. J'étais pris par la vie de tous les jours et je remettais toujours la spiritualité à demain. Le protocole de 9 mois a brisé cette illusion du temps infini. J'ai réorganisé mes journées autour du Fajr. Ma concentration s'est envolée.",
    score: 85,
    period: "Protocole 9 Mois",
    location: "Château-Thierry"
  },
  {
    id: "h9",
    name: "Sofiane",
    role: "",
    category: "homme",
    text: "Je commettais de graves excès dans des péchés que je n'arrivais pas à abandonner, ce qui me faisait fuir la prière par honte. Grâce à l'interposition behavioriste du protocole de 9 mois, j'ai construit des barrières infranchissables entre moi et ces péchés. Le pardon d'Allah m'a enveloppé. Je revis.",
    score: 91,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "h10",
    name: "Adil",
    role: "Père de famille",
    category: "homme",
    text: "Pendant des années, ma prière était saccadée : je priais pendant le Ramadan puis j'arrêtais, ou je ne priais que le vendredi. Ce système de coupures m'épuisait moralement. En rejoignant le protocole de 9 mois, j'ai enfin ancré ma Salat quotidienne. C'est le plus beau cadeau pour mes enfants.",
    score: 80,
    period: "Protocole 9 Mois",
    location: "Épernay"
  },
  {
    id: "h11",
    name: "Zouhair",
    role: "",
    category: "homme",
    text: "J'étais sceptique et rempli de doutes existentiels sur la foi, ce qui parasitait mon quotidien au point d'abandonner mon travail. L'audit de souveraineté et le protocole de 3 mois m'ont reconnecté aux vérités logiques du Coran. J'ai retrouvé la paix de l'esprit, la force de prier et j'ai recommencé à travailler.",
    score: 86,
    period: "Protocole 3 Mois",
    location: "Vitry-le-François"
  },
  {
    id: "h12",
    name: "Omar",
    role: "",
    category: "homme",
    text: "Noyé dans les soucis de la vie de tous les jours et des dettes matérielles, je ne prenais plus aucun temps pour Dieu. Les 9 mois d'accompagnement m'ont forcé à couper le superflu. En simplifiant ma vie et en me concentrant sur ma Salat, la Baraka est revenue dans mon foyer.",
    score: 82,
    period: "Protocole 9 Mois",
    location: "Soissons"
  },
  {
    id: "h13",
    name: "Anas",
    role: "Jeune",
    category: "homme",
    text: "Je n'avais jamais connu la foi sincère. Mes parents ne pratiquaient pas et je me sentais vide. Le protocole de 9 mois m'a ouvert les portes de l'Islam avec intelligence et rigueur. J'ai appris à prier, à jeûner, et surtout à aimer me prosterner pour mon Créateur.",
    score: 87,
    period: "Protocole 9 Mois",
    location: "Laon"
  },
  {
    id: "h14",
    name: "Karim",
    role: "",
    category: "homme",
    text: "J'étais incapable de rester en place, fuyant la réalité dans des addictions morales lourdes. Le protocole de 9 mois m'a offert un cadre comportemental strict. J'ai vaincu mes démons internes, retrouvé ma dignité d'homme et rétabli mes liens avec mes proches.",
    score: 88,
    period: "Protocole 9 Mois",
    location: "Fismes"
  },
  {
    id: "h15",
    name: "Nabil",
    role: "",
    category: "homme",
    text: "Je faisais ma prière à la va-vite, sans aucune présence de cœur, juste pour me débarrasser d'une obligation légale. L'audit m'a fait réaliser mon hypocrisie comportementale. Le protocole de 3 mois m'a appris le Khoushou' (la présence attentive). Ma Salat a changé de dimension.",
    score: 84,
    period: "Protocole 3 Mois",
    location: "Tinqueux"
  } as unknown as Testimonial,

  // ════════════════ FEMMES (12 TEMOIGNAGES) ════════════════
  {
    id: "f1",
    name: "Myriam",
    role: "Mère au foyer",
    category: "femme",
    text: "Mes parents ne pratiquaient pas et je me sentais exclue de ma propre religion, avec des prières saccadées que je n'arrivais pas à maintenir. Le protocole de 9 mois m'a réconciliée avec ma foi. J'ai appris la Salat à 28 ans. Ma maison est devenue un lieu de paix et mes enfants grandissent enfin avec la prière.",
    score: 89,
    period: "Protocole 9 Mois",
    location: "Chartres"
  },
  {
    id: "f2",
    name: "Nadia",
    role: "",
    category: "femme",
    text: "Complètement perdue après une rupture de vie, je me laissais aller à de nombreux excès mondains pour combler le vide. Le protocole de 9 mois m'a réappris à aimer la solitude dévotionnelle et à purifier mes habitudes de vie. J'ai retrouvé ma dignité et ma paix intérieure.",
    score: 92,
    period: "Protocole 9 Mois",
    location: "Cormontreuil"
  },
  {
    id: "f3",
    name: "Leïla",
    role: "Mère au foyer",
    category: "femme",
    text: "Je passais mes journées survoltée par le stress du quotidien, criant sur mes enfants et délaissant ma Salat par manque de temps fictif. En appliquant la réduction de la charge mentale et l'ancrage du Fajr pendant les 9 mois de protocole, tout a changé. Ma patience est revenue, ma maison respire la sérénité.",
    score: 85,
    period: "Protocole 9 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "f4",
    name: "Inès",
    role: "Jeune",
    category: "femme",
    text: "J'avais d'immenses doutes sur l'existence de Dieu et la religion, au point d'en perdre le goût de vivre en société. Le protocole d'un mois a été un espace d'écoute extraordinaire. Mounir Byar m'a aidée à déconstruire mes peurs et à rebâtir ma foi sur des fondations solides. J'ai repris goût à la vie.",
    score: 79,
    period: "Protocole 1 Mois",
    location: "Gueux"
  },
  {
    id: "f5",
    name: "Samira",
    role: "",
    category: "femme",
    text: "J'avais une pratique spirituelle en dents de scie : des mois de prière assidue suivis de longs mois de coupure totale. L'accompagnement de 9 mois a mis fin à ce cycle destructeur. L'instauration de verrous comportementaux a rendu ma pratique stable et inébranlable.",
    score: 83,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  },
  {
    id: "f6",
    name: "Amel",
    role: "Particulier",
    category: "femme",
    text: "Je n'avais jamais fait la prière de ma vie et je pensais qu'il était trop tard pour commencer. Le protocole de 9 mois m'a prouvé le contraire. Avec une douceur et une rigueur exemplaires, on m'a appris les ablutions, les gestes et le sens des mots. Aujourd'hui, ma Salat est mon rendez-vous le plus précieux.",
    score: 88,
    period: "Protocole 9 Mois",
    location: "Fismes"
  },
  {
    id: "f7",
    name: "Sarah",
    role: "",
    category: "femme",
    text: "Prise par la routine épuisante de la vie de tous les jours, j'étais en burn-out spirituel et mental. Le protocole de 9 mois m'a forcée à éteindre le bruit numérique et à faire le tri dans mes relations. J'ai retrouvé ma bande passante cognitive et la présence de cœur en prière.",
    score: 86,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "f8",
    name: "Fatima",
    role: "",
    category: "femme",
    text: "Après des années d'excès matériels et de dérives, je ressentais une profonde honte devant Allah. Je me pensais indigne de Sa miséricorde. L'accompagnement sur 9 mois m'a fait comprendre la grandeur d'Ar-Rahman. J'ai réformé ma vie de fond en comble et retrouvé le chemin de la mosquée.",
    score: 93,
    period: "Protocole 9 Mois",
    location: "Sézanne"
  },
  {
    id: "f9",
    name: "Yasmina",
    role: "Enseignante",
    category: "femme",
    text: "J'étais sujette à des crises d'angoisse intenses qui m'empêchaient de travailler et de vivre normalement. En purifiant mon environnement et en calant mon sommeil sur le Fajr grâce au protocole de 9 mois, mes angoisses ont disparu. J'ai repris mon travail avec une sérénité totale.",
    score: 87,
    period: "Protocole 9 Mois",
    location: "Château-Thierry"
  },
  {
    id: "f10",
    name: "Sofia",
    role: "",
    category: "femme",
    text: "Mes prières étaient purement mécaniques, sans aucune émotion ni concentration. Le protocole de 3 mois axé sur l'introspection (Muhasaba) a réveillé ma foi endormie. J'ai enfin compris pourquoi je priais et j'ai ressenti la proximité divine.",
    score: 82,
    period: "Protocole 3 Mois",
    location: "Épernay"
  },
  {
    id: "f11",
    name: "Hanaa",
    role: "",
    category: "femme",
    text: "J'avais arrêté de prier depuis des années à cause des pressions du quotidien et des mauvaises fréquentations. Le protocole de 9 mois m'a offert un cocon protecteur et une discipline de fer pour me reconstruire. Je suis redevenue souveraine de mon esprit et de mes choix.",
    score: 90,
    period: "Protocole 9 Mois",
    location: "Vitry-le-François"
  },
  {
    id: "f12",
    name: "Khadidja",
    role: "Mère au foyer",
    category: "femme",
    text: "J'étais isolée socialement et je passais mes journées à procrastiner, ce qui me laissait un vide existentiel angoissant. L'audit de souveraineté m'a secouée. En participant au protocole de 9 mois, j'ai retrouvé l'ordre de la maison, l'envie de vivre en communauté et d'assumer ma foi.",
    score: 84,
    period: "Protocole 9 Mois",
    location: "Laon"
  },

  // ════════════════ FAMILLES (8 TEMOIGNAGES) ════════════════
  {
    id: "fam1",
    name: "La Famille Belkacem",
    role: "Foyer de 5 personnes",
    category: "famille",
    text: "Notre maison était un lieu d'entropie permanente : les écrans tournaient sans arrêt, la prière était délaissée par les ados et les parents étaient épuisés. Le protocole de 9 mois pour foyers a réorganisé notre espace de vie. Nous prions désormais ensemble dans un salon épuré et apaisé.",
    score: 82,
    period: "Protocole 9 Mois",
    location: "Cormontreuil"
  },
  {
    id: "fam2",
    name: "La Famille Ousmane",
    role: "Jeune couple",
    category: "famille",
    text: "Nous commencions notre vie de couple avec des habitudes très individualistes et des prières faites à coupures, chacun de son côté. Le protocole de 9 mois nous a soudés dans l'adoration. Se lever ensemble pour le Fajr a instauré une paix spirituelle magnifique dans notre mariage.",
    score: 90,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  },
  {
    id: "fam3",
    name: "La Famille Mansour",
    role: "Parents et Ados",
    category: "famille",
    text: "Nos enfants n'avaient jamais vraiment appris à prier car nous-mêmes étions négligents par le passé, pris par le stress professionnel quotidien. Le protocole de 9 mois a restructuré notre foyer. Le retour sincère vers Allah s'est fait collectivement, avec bienveillance et ordre.",
    score: 79,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "fam4",
    name: "La Famille Chalabi",
    role: "Foyer multi-générationnel",
    category: "famille",
    text: "La maladie et le stress de la vie de tous les jours avaient brisé la sérénité de notre maison. Grâce aux conseils de design spatial et à la régulation chronobiologique du protocole de 9 mois, nous avons retrouvé un équilibre de sommeil et de dévotion partagée. La Baraka est palpable.",
    score: 84,
    period: "Protocole 9 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "fam5",
    name: "La Famille Diallo",
    role: "Foyer de 4 personnes",
    category: "famille",
    text: "J'avais d'immenses doutes sur l'éducation de mes enfants dans cette société distraite. L'audit de souveraineté de notre foyer et le protocole de 3 mois nous ont fourni une méthode claire pour filtrer les stimuli externes. Nos priorités ont été remises dans l'ordre divin.",
    score: 85,
    period: "Protocole 3 Mois",
    location: "Fismes"
  },
  {
    id: "fam6",
    name: "La Famille Tazi",
    role: "Foyer monoparental",
    category: "famille",
    text: "Seule avec mes deux enfants et en situation de précarité spirituelle, j'avais abandonné la Salat. Le protocole de 9 mois m'a redonné le courage de me redresser. Mes enfants prient aujourd'hui avec moi et nous avons retrouvé l'apaisement intérieur.",
    score: 80,
    period: "Protocole 9 Mois",
    location: "Gueux"
  },
  {
    id: "fam7",
    name: "La Famille Bensaïd",
    role: "Jeune couple",
    category: "famille",
    text: "Nous commettions des excès financiers qui mettaient notre couple en péril et nous éloignaient de la piété. L'accompagnement sur 9 mois nous a aidés à assumer notre mandat de Khalifa en gérant notre argent et notre temps avec sobriété. Une véritable délivrance spirituelle.",
    score: 81,
    period: "Protocole 9 Mois",
    location: "Sézanne"
  },
  {
    id: "fam8",
    name: "La Famille Ziri",
    role: "Parents et Étudiant",
    category: "famille",
    text: "Notre fils souffrait d'une phobie sociale sévère qui l'empêchait d'étudier ou d'envisager de travailler. En implémentant le protocole de 9 mois pour toute la famille, nous avons créé un cadre d'auto-correction bienveillant. Notre fils a repris confiance, prie assidûment et s'est réinscrit à l'université.",
    score: 88,
    period: "Protocole 9 Mois",
    location: "Château-Thierry"
  },

  // ════════════════ GROUPES / COHORTES (8 TEMOIGNAGES) ════════════════
  {
    id: "grp1",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Nous étions tous pris par la vie de tous les jours, négligeant nos Salats dans nos commerces par fausse excuse de manque de temps. Le protocole de 9 mois en cohorte a créé un cercle vertueux de redevabilité fraternelle (Muhasaba). Nous fermons désormais nos boutiques pour prier à l'heure.",
    score: 87,
    period: "Protocole 9 Mois",
    location: "Chartres"
  },
  {
    id: "grp2",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Nous partagions toutes les mêmes prières saccadées et la même fatigue allostatique face aux épreuves. L'accompagnement en sous-groupe pendant 9 mois a soudé nos liens spirituels. Notre constance est devenue collective, forte et sereine.",
    score: 86,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "grp3",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Notre engagement associatif masquait un vide dévotionnel interne. Le protocole de 9 mois nous a appris à ne plus négliger notre propre âme sous prétexte de servir les autres. L'ordre interne a été restauré avant l'action externe.",
    score: 83,
    period: "Protocole 9 Mois",
    location: "Vitry-le-François"
  },
  {
    id: "grp4",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Nous avions d'immenses doutes intellectuels sur l'application de la foi dans la modernité. L'accompagnement sur 3 mois de notre groupe d'étude a balayé ces incertitudes grâce à des échanges lucides et basés sur la rigueur scientifique coranique.",
    score: 91,
    period: "Protocole 3 Mois",
    location: "Soissons"
  },
  {
    id: "grp5",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Se lever pour le Fajr en solitaire était notre plus grand échec, nos parents ne nous ayant pas inculqué cette discipline. Le protocole de 9 mois nous a réunis dans une routine matinale sacrée. Ce groupe de redevabilité a sauvé notre sommeil et notre lien à Allah.",
    score: 88,
    period: "Protocole 9 Mois",
    location: "Laon"
  },
  {
    id: "grp6",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Nous étions des personnes marginalisées, perdues dans de profonds excès mondains, incapables de travailler ou de vivre en communauté. Le protocole de 9 mois a opéré une véritable thérapie de la droiture. Nous avons tous retrouvé le chemin de l'emploi et de la via sociale pacifiée.",
    score: 89,
    period: "Protocole 9 Mois",
    location: "Épernay"
  },
  {
    id: "grp7",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Nous partagions tous la même histoire : jamais appris la prière dans notre enfance et une immense soif de comprendre l'Islam. L'audit et le protocole d'un mois nous ont offert un espace privilégié pour poser nos doutes et apprendre les bases de la Salat.",
    score: 84,
    period: "Protocole 1 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "grp8",
    name: "Groupe d'amis",
    role: "",
    category: "groupe",
    text: "Nous voulions remettre de la droiture spirituelle dans nos ateliers mais étions submergés par le travail. Les 9 mois de protocole nous ont réalignés sur le mandat de Khalifa. Travailler avec excellence tout en respectant scrupuleusement la prière est redevenu notre art ultime.",
    score: 92,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  }
];
