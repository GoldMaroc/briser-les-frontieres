export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'homme' | 'femme' | 'famille' | 'groupe';
  text: string;
  rating?: number; // 5, 4.5 ou 4 (82% de 5*, reste en 4 ou 4.5)
  score?: number; // Score d'Audit de Souveraineté Cognitive
  period: "Protocole 9 Mois" | "Protocole 3 Mois" | "Protocole 1 Mois" | "Audit de Souveraineté";
  location?: string;
}

// 43 Témoignages : 35 avec 5★ (81.4% ~ 82%), 5 avec 4.5★ et 3 avec 4★ (18.6% ~ 18%)
// Noms réels et pseudonymes variés (Oum_Ilyas, Abu_Maryam, Souverain_75, etc.)
// Femmes et hommes entremêlés dès les premières places pour une visibilité immédiate.
export const testimonials: Testimonial[] = [
  // ─── TÊTE DE LISTE : MIX FEMMES & HOMMES AVEC PSEUDOS ET VRAIS NOMS ───
  {
    id: "f1",
    name: "Sarah M.",
    role: "Mère & Consultante",
    category: "femme",
    text: "Prise par la routine épuisante du travail et du foyer, j'étais en burn-out spirituel et mental. Le protocole de 9 mois m'a appris à couper le bruit numérique et à sanctuariser mes journées autour du Fajr. J'ai retrouvé ma bande passante cognitive et la présence de cœur en prière.",
    rating: 5,
    score: 88,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "h1",
    name: "Julien D.",
    role: "Converti",
    category: "homme",
    text: "Je n'avais jamais prié de ma vie et la religion me semblait inaccessible. J'étais perdu dans des addictions aux écrans et aux jeux. L'accompagnement m'a pris par la main en m'expliquant l'Islam sous un angle neurobiologique et dévotionnel. J'ai posé mon front au sol pour la première fois. Une véritable renaissance.",
    rating: 5,
    score: 81,
    period: "Protocole 9 Mois",
    location: "Sézanne"
  },
  {
    id: "f2",
    name: "Oum_Ilyas",
    role: "Mère de famille",
    category: "femme",
    text: "Mes parents ne pratiquaient pas et je me sentais exclue de ma propre foi, avec des prières saccadées que je n'arrivais pas à maintenir. Le protocole de 9 mois m'a réconciliée avec ma pratique. J'ai appris la Salat avec rigueur et douceur. Ma maison respire enfin la paix.",
    rating: 5,
    score: 89,
    period: "Protocole 9 Mois",
    location: "Chartres"
  },
  {
    id: "h2",
    name: "Youssef K.",
    role: "Cadre commercial",
    category: "homme",
    text: "Mon problème, c'était le multitâche et la course aux plaisirs immédiats. J'étais pris par la vie de tous les jours et je remettais toujours la spiritualité à demain. Le protocole de 9 mois a brisé cette illusion du temps infini. J'ai réorganisé mes journées autour du Fajr. Ma concentration s'est envolée.",
    rating: 4.5,
    score: 85,
    period: "Protocole 9 Mois",
    location: "Château-Thierry"
  },
  {
    id: "f3",
    name: "Myriam B.",
    role: "Cadre de santé",
    category: "femme",
    text: "Après des années d'excès de travail hospitalier, je ne savais plus comment prier sans que mon esprit ne parte dans tous les sens. L'approche comportementale et l'apaisement du nerf vague du protocole C.O.M.E.S. ont transformé mes prières en vrais sas de décompression.",
    rating: 5,
    score: 91,
    period: "Protocole 9 Mois",
    location: "Reims"
  },
  {
    id: "h3",
    name: "Abu_Maryam",
    role: "Père de famille",
    category: "homme",
    text: "Pendant des années, ma prière était saccadée : je priais pendant le Ramadan puis j'arrêtais, ou je ne priais que le vendredi. Ce système de coupures m'épuisait moralement. En rejoignant le protocole de 9 mois, j'ai enfin ancré ma Salat quotidienne. C'est le plus beau cadeau pour mes enfants.",
    rating: 5,
    score: 80,
    period: "Protocole 9 Mois",
    location: "Épernay"
  },
  {
    id: "f4",
    name: "K.B. (Convertie)",
    role: "Enseignante",
    category: "femme",
    text: "Suite à ma conversion, je me sentais isolée et submergée par les doutes. Le protocole de 9 mois m'a réappris à aimer la solitude avec mon Créateur et à purifier mes habitudes de vie. J'ai compris le sens profond de l'adoration et j'ai trouvé ma dignité souveraine.",
    rating: 5,
    score: 92,
    period: "Protocole 9 Mois",
    location: "Cormontreuil"
  },
  {
    id: "h4",
    name: "Sofiane L.",
    role: "Chef de projet",
    category: "homme",
    text: "Je commettais de graves excès dans des péchés que je n'arrivais pas à abandonner, ce qui me faisait fuir la prière par honte. Grâce à l'interposition behavioriste du protocole de 9 mois, j'ai construit des barrières infranchissables entre moi et ces péchés. Le pardon d'Allah m'a enveloppé. Je revis.",
    rating: 5,
    score: 91,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "f5",
    name: "Leïla_Reims",
    role: "Mère au foyer",
    category: "femme",
    text: "Je passais mes journées survoltée par le stress du quotidien, criant sur mes enfants et délaissant ma Salat par manque de temps fictif. En appliquant la réduction de la charge mentale et l'ancrage du Fajr pendant les 9 mois de protocole, tout a changé. Ma patience est revenue, ma maison respire la sérénité.",
    rating: 5,
    score: 85,
    period: "Protocole 9 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "h5",
    name: "Zouhair T.",
    role: "Artisan indépendant",
    category: "homme",
    text: "J'étais sceptique et rempli de doutes existentiels sur la foi, ce qui parasitait mon quotidien au point d'abandonner mon travail. L'audit de souveraineté et le protocole de 3 mois m'ont reconnecté aux vérités logiques du Coran. J'ai retrouvé la paix de l'esprit, la force de prier et j'ai repris mon activité.",
    rating: 4.5,
    score: 86,
    period: "Protocole 3 Mois",
    location: "Vitry-le-François"
  },
  {
    id: "f6",
    name: "Inès D.",
    role: "Étudiante Master",
    category: "femme",
    text: "J'avais d'immenses doutes sur l'existence de Dieu et la religion, au point d'en perdre le goût d'étudier. Le protocole d'un mois a été un espace d'écoute extraordinaire. Mounir Byar m'a aidée à déconstruire mes peurs et à rebâtir ma foi sur des fondations logiques solides.",
    rating: 5,
    score: 79,
    period: "Protocole 1 Mois",
    location: "Gueux"
  },
  {
    id: "h6",
    name: "Alexandre V.",
    role: "Nouveau converti",
    category: "homme",
    text: "La modernité et la course à l'argent m'avaient épuisé. En découvrant l'Islam, je cherchais la paix, mais je restais noyé dans le superflu et ne savais pas comment prier. Ce protocole m'a forcé à épurer ma vie et à centrer mes journées autour de ma Salat. La sérénité et la Baraka sont enfin entrées dans ma vie.",
    rating: 5,
    score: 82,
    period: "Protocole 9 Mois",
    location: "Soissons"
  },

  // ─── SUITE DES PARCOURS INDIVIDUELS ───
  {
    id: "f7",
    name: "Oum_Nour",
    role: "Particulier",
    category: "femme",
    text: "Après ma conversion, ma pratique spirituelle était en dents de scie : des mois de foi intense suivis de baisses de moral. L'accompagnement a mis fin à cette instabilité en instaurant des verrous environnementaux. Ma connexion avec Allah est désormais stable et inébranlable.",
    rating: 5,
    score: 83,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  },
  {
    id: "h7",
    name: "Souverain_75",
    role: "Cadre dirigeant",
    category: "homme",
    text: "J'étais complètement perdu, noyé dans les excès du quotidien et les péchés qui abîmaient mon âme. Le protocole de 9 mois a été ma planche de salut. Ce n'est pas de la motivation éphémère, c'est une restructuration complète. J'ai réappris à dompter mon Nafs et à remettre Allah au centre.",
    rating: 5,
    score: 84,
    period: "Protocole 9 Mois",
    location: "Chartres"
  },
  {
    id: "f8",
    name: "Fatima Z.",
    role: "Pharmacienne",
    category: "femme",
    text: "Après des années d'excès matériels et de dérives, je ressentais une profonde honte devant Allah. Je me pensais indigne de Sa miséricorde. L'accompagnement sur 9 mois m'a fait comprendre la grandeur d'Ar-Rahman. J'ai réformé ma vie de fond en comble et retrouvé le chemin de la mosquée.",
    rating: 5,
    score: 93,
    period: "Protocole 9 Mois",
    location: "Sézanne"
  },
  {
    id: "h8",
    name: "Sliman R.",
    role: "Père de famille",
    category: "homme",
    text: "Mes parents ne m'avaient jamais appris à prier, je ne connaissais pratiquement rien à l'Islam. J'avais un vide immense dans ma vie et je cherchais à me recadrer. Grâce aux discussions et à la redevabilité du protocole de 9 mois, j'ai commencé la Salat à 34 ans. Ma vie a enfin un sens.",
    rating: 5,
    score: 90,
    period: "Protocole 9 Mois",
    location: "Cormontreuil"
  },
  {
    id: "f9",
    name: "Yasmina C.",
    role: "Enseignante",
    category: "femme",
    text: "J'étais sujette à des crises d'angoisse intenses qui m'empêchaient de travailler et de vivre normalement. En purifiant mon environnement et en calant mon sommeil sur le Fajr grâce au protocole de 9 mois, mes angoisses ont disparu. J'ai repris mon travail avec une sérénité totale.",
    rating: 5,
    score: 87,
    period: "Protocole 9 Mois",
    location: "Château-Thierry"
  },
  {
    id: "h9",
    name: "Mehdi B.",
    role: "Développeur",
    category: "homme",
    text: "Je faisais la prière, puis j'arrêtais, puis je reprenais... Ces coupures constantes me rongeaient. Je vivais dans une instabilité spirituelle fatigante. Le protocole m'a appris à ancrer ma routine sur des verrous environnementaux incassables. Depuis 8 mois, pas une seule prière manquée.",
    rating: 4.5,
    score: 78,
    period: "Protocole 9 Mois",
    location: "Fismes"
  },
  {
    id: "f10",
    name: "Sofia_K",
    role: "Comptable",
    category: "femme",
    text: "Mes prières étaient purement mécaniques, sans aucune émotion ni concentration. Le protocole de 3 mois axé sur l'introspection (Muhasaba) a réveillé ma foi endormie. J'ai enfin compris pourquoi je priais et j'ai ressenti la proximité divine.",
    rating: 4,
    score: 82,
    period: "Protocole 3 Mois",
    location: "Épernay"
  },
  {
    id: "h10",
    name: "Tariq S.",
    role: "Jeune actif",
    category: "homme",
    text: "J'étais emporté par le tourbillon de la vie moderne, toujours sur mon téléphone, à courir après l'argent sans jamais me poser pour Dieu. L'audit de souverainetée m'a ouvert les yeux sur mon at-taswîf. En un mois intensif, j'ai épuré le bruit numérique et retrouvé mon cœur.",
    rating: 5,
    score: 83,
    period: "Protocole 1 Mois",
    location: "Gueux"
  },
  {
    id: "f11",
    name: "Hanaa R.",
    role: "Juriste",
    category: "femme",
    text: "J'avais arrêté de prier depuis des années à cause des pressions du quotidien et des mauvaises fréquentations. Le protocole de 9 mois m'a offert un cocon protecteur et une discipline de fer pour me reconstruire. Je suis redevenue souveraine de mon esprit et de mes choix.",
    rating: 5,
    score: 90,
    period: "Protocole 9 Mois",
    location: "Vitry-le-François"
  },
  {
    id: "h11",
    name: "Thomas G.",
    role: "Converti",
    category: "homme",
    text: "Issu d'une famille athée, j'ai découvert l'Islam à 25 ans mais j'étais perdu face à l'immensité de la pratique. Le protocole de 9 mois m'a pris par la main pour intégrer la Salat étape par étape, avec une approche logique et neurobiologique qui m'a convaincu.",
    rating: 5,
    score: 89,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  },
  {
    id: "f12",
    name: "Khadidja_M",
    role: "Mère au foyer",
    category: "femme",
    text: "J'étais isolée socialement et je passais mes journées à procrastiner, ce qui me laissait un vide existentiel angoissant. L'audit de souveraineté m'a secouée. En participant au protocole de 9 mois, j'ai retrouvé l'ordre de la maison et la joie d'assumer ma foi.",
    rating: 5,
    score: 84,
    period: "Protocole 9 Mois",
    location: "Laon"
  },
  {
    id: "h12",
    name: "Farid M.",
    role: "Ingénieur",
    category: "homme",
    text: "J'avais accumulé d'énormes doutes sur ma religion qui m'empêchaient d'avancer et bloquaient ma pratique. L'accompagnement sur un mois m'a permis de poser toutes mes questions sans jugement. Mounir a su apporter des réponses rationnelles et spirituelles apaisantes.",
    rating: 4,
    score: 75,
    period: "Protocole 1 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "f13",
    name: "Amel B.",
    role: "Particulier",
    category: "femme",
    text: "Je n'avais jamais fait la prière de ma vie et je pensais qu'il était trop tard pour commencer. Le protocole de 9 mois m'a prouvé le contraire. Avec une douceur et une rigueur exemplaires, on m'a appris les ablutions, les gestes et le sens des mots. Ma Salat est mon refuge.",
    rating: 5,
    score: 88,
    period: "Protocole 9 Mois",
    location: "Fismes"
  },
  {
    id: "h13",
    name: "Anas L.",
    role: "Étudiant",
    category: "homme",
    text: "Je n'avais jamais connu la foi sincère. Mes parents ne pratiquaient pas et je me sentais vide. Le protocole de 9 mois m'a ouvert les portes de l'Islam avec intelligence et rigueur. J'ai appris à prier, à jeûner, et surtout à aimer me prosterner pour mon Créateur.",
    rating: 5,
    score: 87,
    period: "Protocole 9 Mois",
    location: "Laon"
  },
  {
    id: "h14",
    name: "Voyageur_Discret",
    role: "Entrepreneur",
    category: "homme",
    text: "J'étais incapable de rester en place, fuyant la réalité dans des addictions morales lourdes. Le protocole de 9 mois m'a offert un cadre comportemental strict. J'ai vaincu mes démons internes, retrouvé ma dignité d'homme et rétabli mes liens avec mes proches.",
    rating: 5,
    score: 88,
    period: "Protocole 9 Mois",
    location: "Fismes"
  },
  {
    id: "h15",
    name: "Nabil C.",
    role: "Architecte",
    category: "homme",
    text: "Je faisais ma prière à la va-vite, sans aucune présence de cœur, juste pour me débarrasser d'une obligation. L'audit m'a fait réaliser mon hypocrisie comportementale. Le protocole de 3 mois m'a appris le Khoushou' (la présence attentive). Ma Salat a changé de dimension.",
    rating: 4.5,
    score: 84,
    period: "Protocole 3 Mois",
    location: "Tinqueux"
  },

  // ─── FAMILLES & FOYERS (8 RÉCITS) ───
  {
    id: "fam1",
    name: "La Famille Belkacem",
    role: "Foyer de 5 personnes",
    category: "famille",
    text: "Notre maison était un lieu d'entropie permanente : les écrans tournaient sans arrêt, la prière était délaissée par les ados et les parents étaient épuisés. Le protocole de 9 mois pour foyers a réorganisé notre espace de vie. Nous prions désormais ensemble dans un salon épuré et apaisé.",
    rating: 5,
    score: 82,
    period: "Protocole 9 Mois",
    location: "Cormontreuil"
  },
  {
    id: "fam2",
    name: "Famille Ousmane",
    role: "Jeune couple",
    category: "famille",
    text: "Nous commencions notre vie de couple avec des habitudes très individualistes et des prières faites à coupures, chacun de son côté. Le protocole de 9 mois nous a soudés dans l'adoration. Se lever ensemble pour le Fajr a instauré une paix spirituelle magnifique dans notre mariage.",
    rating: 5,
    score: 90,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  },
  {
    id: "fam3",
    name: "Famille M. (Reims)",
    role: "Parents et Ados",
    category: "famille",
    text: "Nos enfants n'avaient jamais vraiment appris à prier car nous-mêmes étions négligents par le passé, pris par le stress professionnel quotidien. Le protocole de 9 mois a restructuré notre foyer. Le retour sincère vers Allah s'est fait collectivement, avec bienveillance et ordre.",
    rating: 4.5,
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
    rating: 5,
    score: 84,
    period: "Protocole 9 Mois",
    location: "Witry-lès-Reims"
  },
  {
    id: "fam5",
    name: "Foyer Diallo",
    role: "Foyer de 4 personnes",
    category: "famille",
    text: "J'avais d'immenses doutes sur l'éducation de mes enfants dans cette société distraite. L'audit de souveraineté de notre foyer et le protocole de 3 mois nous ont fourni une méthode claire pour filtrer les stimuli externes. Nos priorités ont été remises dans l'ordre divin.",
    rating: 5,
    score: 85,
    period: "Protocole 3 Mois",
    location: "Fismes"
  },
  {
    id: "fam6",
    name: "Famille Tazi (Monoparentale)",
    role: "Foyer monoparental",
    category: "famille",
    text: "Seule avec mes deux enfants et en situation de précarité spirituelle, j'avais abandonné la Salat. Le protocole de 9 mois m'a redonné le courage de me redresser. Mes enfants prient aujourd'hui avec moi et nous avons retrouvé l'apaisement intérieur.",
    rating: 5,
    score: 80,
    period: "Protocole 9 Mois",
    location: "Gueux"
  },
  {
    id: "fam7",
    name: "Foyer Bensaïd",
    role: "Jeune couple",
    category: "famille",
    text: "Nous commettions des excès financiers qui mettaient notre couple en péril et nous éloignaient de la piété. L'accompagnement sur 9 mois nous a aidés à assumer notre mandat de Khalifa en gérant notre argent et notre temps avec sobriété. Une véritable délivrance spirituelle.",
    rating: 5,
    score: 81,
    period: "Protocole 9 Mois",
    location: "Sézanne"
  },
  {
    id: "fam8",
    name: "Famille Ziri",
    role: "Parents et Étudiant",
    category: "famille",
    text: "Notre fils souffrait d'une phobie sociale sévère qui l'empêchait d'étudier ou d'envisager de travailler. En implémentant le protocole de 9 mois pour toute la famille, nous avons créé un cadre d'auto-correction bienveillant. Notre fils a repris confiance, prie assidûment et s'est réinscrit à l'université.",
    rating: 5,
    score: 88,
    period: "Protocole 9 Mois",
    location: "Château-Thierry"
  },

  // ─── GROUPES & COHORTES (7 RÉCITS) ───
  {
    id: "grp1",
    name: "Cercle Commerçants",
    role: "Cohorte de 4 associés",
    category: "groupe",
    text: "Nous étions tous pris par la vie de tous les jours, négligeant nos Salats dans nos commerces par fausse excuse de manque de temps. Le protocole de 9 mois en cohorte a créé un cercle vertueux de redevabilité fraternelle (Muhasaba). Nous fermons désormais nos boutiques pour prier à l'heure.",
    rating: 5,
    score: 87,
    period: "Protocole 9 Mois",
    location: "Chartres"
  },
  {
    id: "grp2",
    name: "Collectif Sœurs de Reims",
    role: "Groupe d'entraide féminin",
    category: "groupe",
    text: "Nous partagions toutes les mêmes prières saccadées et la même fatigue allostatique face aux épreuves. L'accompagnement en sous-groupe pendant 9 mois a soudé nos liens spirituels. Notre constance est devenue collective, forte et sereine.",
    rating: 5,
    score: 86,
    period: "Protocole 9 Mois",
    location: "Tinqueux"
  },
  {
    id: "grp3",
    name: "Pôle Associatif",
    role: "Responsables d'association",
    category: "groupe",
    text: "Notre engagement associatif masquait un vide dévotionnel interne. Le protocole de 9 mois nous a appris à ne plus négliger notre propre âme sous prétexte de servir les autres. L'ordre interne a été restauré avant l'action externe.",
    rating: 5,
    score: 83,
    period: "Protocole 9 Mois",
    location: "Vitry-le-François"
  },
  {
    id: "grp4",
    name: "Cercle des Étudiants",
    role: "Étudiants en sciences",
    category: "groupe",
    text: "Nous avions d'immenses doutes intellectuels sur l'application de la foi dans la modernité. L'accompagnement sur 3 mois de notre groupe d'étude a balayé ces incertitudes grâce à des échanges lucides et basés sur la rigueur scientifique coranique.",
    rating: 4,
    score: 91,
    period: "Protocole 3 Mois",
    location: "Soissons"
  },
  {
    id: "grp5",
    name: "Fraternité du Fajr",
    role: "Groupe de redevabilité",
    category: "groupe",
    text: "Se lever pour le Fajr en solitaire était notre plus grand échec, nos parents ne nous ayant pas inculqué cette discipline. Le protocole de 9 mois nous a réunis dans une routine matinale sacrée. Ce groupe de redevabilité a sauvé notre sommeil et notre lien à Allah.",
    rating: 5,
    score: 88,
    period: "Protocole 9 Mois",
    location: "Laon"
  },
  {
    id: "grp6",
    name: "Cohorte Réinsertion",
    role: "Jeunes adultes",
    category: "groupe",
    text: "Nous étions des personnes marginalisées, perdues dans de profonds excès mondains, incapables de travailler ou de vivre en communauté. Le protocole de 9 mois a opéré une véritable thérapie de la droiture. Nous avons tous retrouvé le chemin de l'emploi et de la vie sociale pacifiée.",
    rating: 5,
    score: 89,
    period: "Protocole 9 Mois",
    location: "Épernay"
  },
  {
    id: "grp7",
    name: "Artisans & Bâtisseurs",
    role: "Chefs d'ateliers",
    category: "groupe",
    text: "Nous voulions remettre de la droiture spirituelle dans nos ateliers mais étions submergés par le travail. Les 9 mois de protocole nous ont réalignés sur le mandat de Khalifa. Travailler avec excellence tout en respectant scrupuleusement la prière est redevenu notre art ultime.",
    rating: 5,
    score: 92,
    period: "Protocole 9 Mois",
    location: "Bétheny"
  }
];
