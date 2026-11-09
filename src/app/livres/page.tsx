"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import {
  FiBookOpen,
  FiLock,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiEye,
  FiVideo,
  FiAward,
  FiHeart,
  FiGrid,
  FiArrowRight,
  FiPlay,
  FiClock,
} from "react-icons/fi";

interface BookExcerptPage {
  pageNumber: number;
  title: string;
  locked?: boolean;
}

const EXCERPT_PAGES: BookExcerptPage[] = [
  { pageNumber: 6, title: "Sommaire" },
  { pageNumber: 7, title: "Préface (1/2)" },
  { pageNumber: 8, title: "Préface (2/2)" },
  { pageNumber: 9, title: "Introduction (1/3)" },
  { pageNumber: 10, title: "Introduction (2/3)" },
  { pageNumber: 11, title: "Introduction (3/3)" },
  { pageNumber: 12, title: "Chapitre I (p. 12)" },
  { pageNumber: 13, title: "Pages 13 à 41 (Verrouillé)", locked: true },
];

const RAHMAN_EXCERPT_PAGES: BookExcerptPage[] = [
  { pageNumber: 6, title: "Sommaire (1/2)" },
  { pageNumber: 7, title: "Sommaire (2/2)" },
  { pageNumber: 8, title: "Avant-Propos (1/2)" },
  { pageNumber: 9, title: "Avant-Propos (2/2)" },
  { pageNumber: 10, title: "Partie I" },
  { pageNumber: 11, title: "Chapitre I (p. 11)" },
  { pageNumber: 12, title: "Chapitre I (p. 12)" },
  { pageNumber: 13, title: "Pages 13 à 84 (Verrouillé)", locked: true },
];

type ToolCategory = "all" | "livres" | "invocations" | "videos" | "formations";

const INVOCATIONS_LIST = [
  {
    category: "Dans la Détresse Extrême",
    arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو، فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ",
    phonetic:
      "Allâhumma rahmataka arjû, falâ takilnî ilâ nafsî tarfata 'ayn, wa aslih lî sha'nî kullah, lâ ilâha illâ Anta.",
    translation:
      "« Ô Allah, c'est Ta miséricorde que j'espère — ne me confie pas à moi-même le temps d'un clin d'œil, et arrange pour moi toutes mes affaires. Il n'y a de divinité que Toi. »",
    source: "Al-Hâkim & Abû Dâwûd (Hasan)",
  },
  {
    category: "Sortir des Ténèbres & de l'Épreuve (Du'â' de Yûnus)",
    arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    phonetic: "Lâ ilâha illâ Anta, subhânaka innî kuntu min al-dhâlimîn.",
    translation:
      "« Il n'y a de divinité que Toi. Gloire et pureté à Toi ! J'étais certes du nombre des injustes. »",
    source: "Sourate Al-Anbiyâ' (21 : 87) • At-Tirmidhi n°3505",
  },
  {
    category: "Pour la Guidance & l'Indépendance du Cœur",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    phonetic: "Allâhumma innî as'aluka al-hudâ, wa al-tuqâ, wa al-'afâfa, wa al-ghinâ.",
    translation:
      "« Ô Allah, je Te demande la guidance, la piété, la chasteté et l'indépendance (du cœur). »",
    source: "Sahîh Muslim n°2721",
  },
  {
    category: "Pour le Pardon Total & l'Effacement des Fautes",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    phonetic: "Allâhumma innaka 'afuwwun tuhibbu al-'afwa fa'fu 'annî.",
    translation:
      "« Ô Allah, Tu es le Grand Pardonneur, Tu aimes le pardon, alors pardonne-moi. »",
    source: "At-Tirmidhi n°3513 (Sahîh)",
  },
  {
    category: "Les Deux Paroles Chères au Tout-Miséricordieux",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    phonetic: "Subhânallâhi wa bihamdih, Subhânallâhi al-'Adhîm.",
    translation:
      "« Deux paroles légères sur la langue, lourdes dans la balance, chères au Tout-Miséricordieux : Gloire et louange à Allah, Gloire à Allah l'Immense. »",
    source: "Al-Boukhâri n°6406 • Muslim n°2694",
  },
  {
    category: "Responsabilité & Retour vers Allah",
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    phonetic:
      "Rabbanâ dhalamnâ anfusanâ wa in lam taghfir lanâ wa tarhamnâ lanakûnanna min al-khâsirîn.",
    translation:
      "« Ô notre Seigneur, nous avons fait du tort à nous-mêmes. Et si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants. »",
    source: "Sourate Al-A'râf (7 : 23)",
  },
];

const WEEKLY_DHIKR_PROGRAM = [
  {
    day: "Lundi",
    focus: "La Racine de la Miséricorde",
    practice:
      "Méditez la racine R-H-M. Dites 10 fois le matin « Yâ Rahmân » en prenant conscience de trois bienfaits concrets reçus dans votre vie.",
  },
  {
    day: "Mardi",
    focus: "Le Corps & la Gratitude",
    practice:
      "Passez 5 minutes à contempler la précision de votre corps (vos mains, votre souffle, votre cœur). Récitez 10 fois « Subhânaka wa bihamdik ».",
  },
  {
    day: "Mercredi",
    focus: "La Sourate Ar-Rahman",
    practice:
      "Lisez lentement la Sourate Ar-Rahman (Sourate 55). Faites une pause intérieure à chaque refrain : « Lequel donc des bienfaits de votre Seigneur nierez-vous ? »",
  },
  {
    day: "Jeudi",
    focus: "Le Pardon Libérateur",
    practice:
      "Invoquez 100 fois « Allâhumma innaka 'afuwwun tuhibbu al-'afwa fa'fu 'annî » en libérant votre cœur d'une rancœur envers autrui.",
  },
  {
    day: "Vendredi",
    focus: "La Miséricorde Active",
    practice:
      "Accomplissez un acte de Rahma concret et silencieux envers quelqu'un qui ne peut rien vous donner en retour.",
  },
  {
    day: "Samedi",
    focus: "Méditation des Récits Prophétiques",
    practice:
      "Relisez le récit de Taïf ou de Yûnus dans les ténèbres. Laissez l'enseignement travailler votre patience face à l'épreuve.",
  },
  {
    day: "Dimanche",
    focus: "Muhâsaba (Bilan de l'Âme)",
    practice:
      "Examen de conscience : Où ai-je exercé la miséricorde cette semaine ? Où ai-je préservé ma prière et ma souveraineté ?",
  },
];

export default function OutilsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("all");
  const [selectedBookTab, setSelectedBookTab] = useState<"all" | "secrets" | "rahman">("all");

  const [activeCover, setActiveCover] = useState<"both" | "recto" | "verso">("both");
  const [currentPage, setCurrentPage] = useState<number>(6);

  const [activeRahmanCover, setActiveRahmanCover] = useState<"both" | "recto" | "verso">("both");
  const [currentRahmanPage, setCurrentRahmanPage] = useState<number>(6);

  const goPrevPage = () => setCurrentPage((p) => Math.max(6, p - 1));
  const goNextPage = () => setCurrentPage((p) => Math.min(13, p + 1));

  const goPrevRahmanPage = () => setCurrentRahmanPage((p) => Math.max(6, p - 1));
  const goNextRahmanPage = () => setCurrentRahmanPage((p) => Math.min(13, p + 1));

  const showLivres = selectedCategory === "all" || selectedCategory === "livres";
  const showInvocations = selectedCategory === "all" || selectedCategory === "invocations";
  const showVideos = selectedCategory === "all" || selectedCategory === "videos";
  const showFormations = selectedCategory === "all" || selectedCategory === "formations";

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-midnight min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Halo de lumière doré circadien */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-gold-muted)_0%,transparent_65%)] pointer-events-none opacity-40 md:opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        {/* EN-TÊTE GÉNÉRAL DE LA PAGE OUTILS */}
        <SectionHeading
          label="Étape 07 — Écosystème & Ressources BLF"
          title="Les Outils de la Souveraineté"
          subtitle="Une bibliothèque évolutive réunissant nos ouvrages d'exégèse, notre recueil d'invocations authentiques, nos capsules vidéo et nos formations."
        />

        {/* ════════════════════════════════════════════════════════════════════
            NAVIGATION PAR CATÉGORIES (4 PILIERS D'OUTILS)
            ════════════════════════════════════════════════════════════════════ */}
        <div className="mb-12 sm:mb-16">
          {/* Cartes des 4 Piliers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              {
                id: "livres" as ToolCategory,
                icon: FiBookOpen,
                title: "Livres & Éditions",
                badge: "2 Ouvrages disponibles",
                desc: "Ouvrages complets (PDF & ePub) avec extraits gratuits p. 6 à 12.",
                activeColor: "border-gold bg-gold/10",
              },
              {
                id: "invocations" as ToolCategory,
                icon: FiHeart,
                title: "Invocations & Dhikr",
                badge: "Accès Libre",
                desc: "Invocations prophétiques authentifiées et programme hebdomadaire.",
                activeColor: "border-emerald bg-emerald/10",
              },
              {
                id: "videos" as ToolCategory,
                icon: FiVideo,
                title: "Vidéos & Capsules",
                badge: "Médiathèque",
                desc: "Analyses, rappels spirituels et décryptages neuro-cognitifs.",
                activeColor: "border-gold bg-gold/10",
              },
              {
                id: "formations" as ToolCategory,
                icon: FiAward,
                title: "Formations",
                badge: "Bientôt disponible",
                desc: "Programmes vidéo structurés et masterclass d'approfondissement.",
                activeColor: "border-gold bg-gold/10",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = selectedCategory === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === pillar.id ? "all" : pillar.id)
                  }
                  className={`p-4 sm:p-5 rounded-sm border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? "bg-gold/15 border-gold shadow-[0_0_25px_rgba(212,168,83,0.2)]"
                      : "bg-midnight-light/60 border-border hover:border-gold/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-9 h-9 rounded-sm flex items-center justify-center border ${
                          isSelected
                            ? "bg-gold text-stone-950 border-gold"
                            : "bg-midnight text-gold border-gold/30"
                        }`}
                      >
                        <Icon className="text-base shrink-0" />
                      </div>
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-semibold truncate ${
                          pillar.id === "formations"
                            ? "text-cream-muted border-border bg-midnight"
                            : "text-gold border-gold/30 bg-gold/10"
                        }`}
                      >
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl text-cream font-medium">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-cream-muted leading-relaxed mt-1 hidden sm:block">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[10px] uppercase tracking-widest text-gold font-semibold">
                    <span>{isSelected ? "Affiché ✓" : "Explorer"}</span>
                    <FiArrowRight className="shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Barre de filtre rapide */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-midnight-light/40 border border-border/60 p-2 rounded-sm">
            {[
              { id: "all" as ToolCategory, label: "Tout l'Écosystème", icon: FiGrid },
              { id: "livres" as ToolCategory, label: "1. Livres (2)", icon: FiBookOpen },
              { id: "invocations" as ToolCategory, label: "2. Invocations & Dhikr", icon: FiHeart },
              { id: "videos" as ToolCategory, label: "3. Vidéos", icon: FiVideo },
              { id: "formations" as ToolCategory, label: "4. Formations", icon: FiAward },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-sm text-[11px] uppercase tracking-wider font-body transition-all cursor-pointer flex items-center gap-1.5 border ${
                    active
                      ? "bg-gold text-stone-950 font-bold border-gold shadow-sm"
                      : "bg-midnight text-cream-muted border-border/60 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  <Icon className="text-xs shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PÔLE 1 : LIVRES & PUBLICATIONS OFFICIELLES
            ════════════════════════════════════════════════════════════════════ */}
        {showLivres && (
          <section id="pole-livres" className="mb-24 scroll-mt-28">
            {/* En-tête du Pôle Livres + Sélecteur rapide entre Livre 1 et Livre 2 */}
            <div className="bg-midnight-light/70 border border-gold/30 rounded-sm p-5 sm:p-7 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold flex items-center gap-2">
                  <FiBookOpen /> Pôle 01 — Éditions Briser Les Frontières
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl text-cream font-light">
                  Les Livres de Mounir BYAR
                </h2>
                <p className="text-xs text-cream-muted">
                  Consultez les couvertures officielles et feuilletez gratuitement les pages 6 à 12
                  de chaque ouvrage avant acquisition.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookTab("all")}
                  className={`px-3.5 py-2.5 text-[11px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                    selectedBookTab === "all"
                      ? "bg-gold text-stone-950 font-bold border-gold"
                      : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                  }`}
                >
                  Les 2 Livres
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBookTab("secrets")}
                  className={`px-3.5 py-2.5 text-[11px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                    selectedBookTab === "secrets"
                      ? "bg-gold text-stone-950 font-bold border-gold"
                      : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                  }`}
                >
                  📘 Livre I : Les Secrets du Retour (5,90 €)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBookTab("rahman")}
                  className={`px-3.5 py-2.5 text-[11px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                    selectedBookTab === "rahman"
                      ? "bg-gold text-stone-950 font-bold border-gold"
                      : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                  }`}
                >
                  📗 Livre II : Ar-Rahman (12,65 €)
                </button>
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────────────
                OUVRAGE 1 : Les Secrets du Retour vers Allah
                ──────────────────────────────────────────────────────────────── */}
            {(selectedBookTab === "all" || selectedBookTab === "secrets") && (
              <div id="secrets" className="pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* COLONNE GAUCHE : PRÉSENTATION & COUVERTURES */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7 space-y-6 min-w-0"
                  >
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold bg-gold-muted px-4 py-1.5 border border-gold/20 font-body">
                      Ouvrage I — eBook Pratique & Méthode de 30 Jours
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
                      Les Secrets du Retour vers Allah
                    </h3>
                    <p className="text-sm uppercase tracking-widest text-emerald font-semibold font-body">
                      Reprendre sa Prière et sa Souveraineté
                    </p>

                    {/* GALERIE DES COUVERTURES (1ère et 4ème de couverture) */}
                    <div className="bg-midnight-light/60 border border-gold/25 rounded-sm p-4 sm:p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                        <span className="text-[11px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                          <FiEye className="text-gold" /> Couvertures Officielles de l&apos;Édition
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveCover("both")}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                              activeCover === "both"
                                ? "bg-gold text-stone-950 font-bold border-gold"
                                : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                            }`}
                          >
                            Recto & Verso
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCover("recto")}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                              activeCover === "recto"
                                ? "bg-gold text-stone-950 font-bold border-gold"
                                : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                            }`}
                          >
                            1ère de Couverture
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCover("verso")}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                              activeCover === "verso"
                                ? "bg-gold text-stone-950 font-bold border-gold"
                                : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                            }`}
                          >
                            4ème de Couverture
                          </button>
                        </div>
                      </div>

                      <div
                        className={`grid gap-4 sm:gap-6 items-center justify-center ${
                          activeCover === "both"
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1 max-w-sm mx-auto"
                        }`}
                      >
                        {(activeCover === "both" || activeCover === "recto") && (
                          <div className="space-y-2 text-center">
                            <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
                              <img
                                src="/books/secrets-couverture-recto.png"
                                alt="1ère de couverture — Les Secrets du Retour vers Allah"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-cream-muted block">
                              Première de Couverture
                            </span>
                          </div>
                        )}

                        {(activeCover === "both" || activeCover === "verso") && (
                          <div className="space-y-2 text-center">
                            <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
                              <img
                                src="/books/secrets-couverture-verso.png"
                                alt="4ème de couverture — Les Secrets du Retour vers Allah"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-cream-muted block">
                              Quatrième de Couverture
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-cream-muted leading-relaxed font-body italic border-l-2 border-gold pl-4 my-6">
                      « Ne subissez plus votre quotidien.
                      <br />
                      Reprenez votre prière et votre souveraineté. »
                    </p>

                    <p className="text-sm text-cream-muted leading-relaxed font-body">
                      Ce livre n&apos;est pas un appel à l&apos;effort, c&apos;est une ingénierie.
                      Une architecture conçue pour quiconque s&apos;est éloigné de la prière et
                      attend, en silence, de retrouver le chemin. Au croisement d&apos;Al-Ghazâlî,
                      d&apos;Ibn Qayyim et des sciences cognitives (B.J. Fogg, V. Frankl), Mounir
                      BYAR propose une méthode en 5 mouvements et un protocole de 30 jours.
                    </p>

                    <div className="bg-midnight-light/50 p-6 sm:p-8 border border-border/80 rounded-sm">
                      <h4 className="font-heading text-lg text-cream mb-4 font-medium tracking-wide">
                        Structure de l&apos;ouvrage (41 pages)
                      </h4>
                      <ul className="space-y-3 text-xs text-cream-muted font-body">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">Préface & Introduction</strong>{" "}
                            — Moins de combat, plus d&apos;architecture : la Crise de la
                            Déconnexion.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Chapitres I & II : Le Statut de Khalîfa & At-Tawbah
                            </strong>{" "}
                            — Prise de responsabilité radicale et anatomie du retour.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Chapitres III, IV & V : As-Salât, Design & Suhba
                            </strong>{" "}
                            — Algorithme circadien (-27,3% de cortisol), design environnemental et
                            compagnonnage.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-emerald/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Protocole pratique de 30 jours
                            </strong>{" "}
                            — Stabilisation (J1–10), Profondeur (J11–20), Expansion (J21–30).
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* COLONNE DROITE : MODULE D'ACQUISITION */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="lg:col-span-5 p-6 sm:p-8 border border-border bg-midnight-light/60 backdrop-blur-md rounded-sm relative shadow-2xl hover:border-gold/30 transition-all duration-500 lg:sticky lg:top-28"
                  >
                    <div className="absolute top-0 right-10 w-20 h-px bg-gold/50" />
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/50">
                      <img
                        src="/books/secrets-couverture-recto.png"
                        alt="Les Secrets du Retour vers Allah"
                        className="w-16 h-auto rounded-sm border border-gold/30 shadow-md shrink-0"
                      />
                      <div>
                        <h4 className="font-heading text-xl text-cream font-semibold tracking-wide">
                          Se procurer l&apos;ouvrage
                        </h4>
                        <p className="text-xs text-emerald font-medium mt-0.5">
                          Téléchargement immédiat (PDF + ePub)
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-cream-muted leading-relaxed font-body mb-6">
                      L&apos;ouvrage complet (41 pages) est disponible immédiatement après règlement
                      sécurisé sur notre portail.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Format</span>
                        <span className="text-cream font-medium">PDF Haute Définition + ePub</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Pagination</span>
                        <span className="text-cream font-medium">41 pages</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Extrait Gratuit</span>
                        <span className="text-emerald font-semibold">Pages 6 à 12 ci-dessous ↓</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Tarif Numérique</span>
                        <span className="text-gold font-bold text-lg">5,90 €</span>
                      </div>
                    </div>

                    <Button
                      href="/paiement?offre=secrets"
                      variant="primary"
                      className="w-full py-4 text-center justify-center font-bold tracking-widest"
                    >
                      Commander l&apos;Ouvrage (5,90 €)
                    </Button>

                    <a
                      href="#extrait-secrets"
                      className="mt-3 w-full py-3 px-4 border border-gold/30 hover:border-gold text-gold text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <FiBookOpen /> Lire l&apos;extrait gratuit (Pages 6 à 12)
                    </a>
                  </motion.div>
                </div>

                {/* LECTEUR D'EXTRAIT SIMPLE LIVRE 1 : PAGES 6 À 12 (BLOQUÉ À LA PAGE 13) */}
                <div id="extrait-secrets" className="mt-10">
                  <div className="bg-midnight-light/60 border border-gold/25 rounded-sm p-5 sm:p-8 max-w-3xl mx-auto">
                    {/* Barre supérieure simple : Titre + Navigation */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <FiBookOpen className="text-gold shrink-0" />
                        <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                          Extrait Gratuit —{" "}
                          {currentPage <= 12 ? `Page ${currentPage} sur 12` : "Page 13 (Verrouillée)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={goPrevPage}
                          disabled={currentPage <= 6}
                          className="px-3 py-1.5 rounded-sm border border-border text-xs text-cream-muted hover:text-cream hover:border-gold/40 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <FiChevronLeft /> Préc.
                        </button>
                        <span className="text-xs font-mono text-cream px-2">
                          p.{currentPage}
                        </span>
                        <button
                          type="button"
                          onClick={goNextPage}
                          disabled={currentPage >= 13}
                          className="px-3 py-1.5 rounded-sm bg-gold/15 border border-gold/40 text-xs text-gold font-semibold hover:bg-gold hover:text-stone-950 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {currentPage === 12 ? "p.13 🔒" : "Suiv."} <FiChevronRight />
                        </button>
                      </div>
                    </div>

                    {/* Contenu épuré de la page */}
                    <div className="min-h-[240px] flex flex-col justify-center text-sm text-cream-muted leading-relaxed font-body space-y-4">
                      {currentPage === 6 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 6 — Sommaire de l&apos;ouvrage
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-cream-muted divide-y divide-border/40">
                            <li className="pt-2 flex justify-between"><span>Préface — Un mot avant d&apos;entrer</span><span className="text-gold">p. 7</span></li>
                            <li className="pt-2 flex justify-between"><span>Introduction — La Crise de la Déconnexion</span><span className="text-gold">p. 9</span></li>
                            <li className="pt-2 flex justify-between"><span>Chapitre I — Le Statut de Khalîfa</span><span className="text-gold">p. 12</span></li>
                            <li className="pt-2 flex justify-between opacity-60"><span>Chapitre II — L&apos;Anatomie du Retour (At-Tawbah)</span><span>🔒 p. 13+</span></li>
                            <li className="pt-2 flex justify-between opacity-60"><span>Chapitres III à V &amp; Protocole 30 Jours</span><span>🔒 p. 19–41</span></li>
                          </ul>
                        </div>
                      )}

                      {currentPage === 7 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 7 — Préface : Un mot avant d&apos;entrer
                          </h4>
                          <p>
                            Avant d&apos;entrer dans cet ouvrage, vous devez savoir une chose : ce livre ne vous demandera pas plus d&apos;effort. Il vous proposera moins de combat.
                          </p>
                          <p>
                            Les pages qui suivent sont une <strong className="text-cream">ingénierie</strong> — une architecture conçue pour quiconque s&apos;est éloigné de sa prière et attend, en silence, de retrouver le chemin sans savoir par où commencer. Reprendre sa prière n&apos;est pas une question de volonté héroïque, mais d&apos;architecture mentale.
                          </p>
                        </div>
                      )}

                      {currentPage === 8 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 8 — Préface (suite)
                          </h4>
                          <p>
                            Vous ressentez la déconnexion sans pouvoir la nommer — ce vide diffus que la productivité, les écrans et les acquisitions ne comblent pas.
                          </p>
                          <p className="italic text-gold border-l-2 border-gold pl-3">
                            « Ce livre est pour vous. Exactement là où vous êtes. Pas là où vous devriez être. »
                          </p>
                          <p>
                            Ce livre n&apos;a pas été écrit pour vous flatter ni pour vous culpabiliser, mais pour vous rendre lucide et libre.
                          </p>
                        </div>
                      )}

                      {currentPage === 9 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 9 — Introduction : La Crise de la Déconnexion
                          </h4>
                          <p>
                            Les flux d&apos;informations continus et la pression de la performance ont engendré une fragmentation massive de l&apos;attention humaine. Le cœur (<em>Qalb</em>), organe central de la contemplation, se retrouve saturé de stimuli éphémères.
                          </p>
                          <p>
                            Plus le système nerveux est sollicité par la gratification immédiate, moins l&apos;esprit demeure disponible pour le recueillement et la transcendance.
                          </p>
                        </div>
                      )}

                      {currentPage === 10 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 10 — L&apos;Ingénierie de la Souveraineté
                          </h4>
                          <p>
                            L&apos;Ingénierie de la Souveraineté se définit comme la science clinique, psychologique et spirituelle du retour à Allah. Le monothéisme pur (<em>Tawhîd</em>) s&apos;incarne comme une libération face aux dépendances modernes.
                          </p>
                          <p className="italic text-gold border-l-2 border-gold pl-3">
                            « La souveraineté personnelle ne se définit pas par la domination sur autrui, mais par la maîtrise absolue du soi. »
                          </p>
                        </div>
                      )}

                      {currentPage === 11 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 11 — La Joie du Retour (At-Tawbah)
                          </h4>
                          <p>
                            Le retour à Allah (<em>At-Tawbah</em>) devient dès lors un processus d&apos;ingénierie intérieure méthodique et mesurable.
                          </p>
                          <p className="italic text-cream border-l-2 border-gold pl-3">
                            « Allah est plus heureux du repentir de Son serviteur que l&apos;un de vous ne l&apos;est de retrouver son chameau perdu dans le désert. » (Sahîh Muslim, 2747)
                          </p>
                        </div>
                      )}

                      {currentPage === 12 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 12 — Chapitre I : Le Statut de Khalîfa
                          </h4>
                          <p>
                            Allah a conféré à l&apos;être humain un honneur cosmique en le désignant comme <em>Khalîfa</em> — dépositaire et gérant sur terre : <em>« En vérité, Je vais établir sur la terre un Khalîfa. »</em> (Coran, 2 : 30).
                          </p>
                          <p>
                            Cet honneur repose sur la capacité cognitive, le libre arbitre et la responsabilité confiée à l&apos;homme de gouverner son propre cœur.
                          </p>
                        </div>
                      )}

                      {currentPage >= 13 && (
                        <div className="text-center py-6 space-y-4">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 text-gold border border-gold/30">
                            <FiLock />
                          </div>
                          <h4 className="font-heading text-xl text-cream">
                            Pages 13 à 41 réservées aux lecteurs
                          </h4>
                          <p className="text-xs text-cream-muted max-w-md mx-auto">
                            Commandez l&apos;ouvrage complet (PDF + ePub) pour accéder immédiatement à la suite des chapitres et au protocole de 30 jours.
                          </p>
                          <div className="pt-1">
                            <Link
                              href="/paiement?offre=secrets"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-stone-950 font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-gold/90 transition-colors"
                            >
                              <FiLock /> Débloquer le Livre Complet (5,90 €)
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────────────
                OUVRAGE 2 : Ar-Rahman — La Mer sans Rivage
                ──────────────────────────────────────────────────────────────── */}
            {(selectedBookTab === "all" || selectedBookTab === "rahman") && (
              <div
                id="rahman"
                className={`${
                  selectedBookTab === "all" ? "border-t border-border/60 pt-16 sm:pt-20 mt-8" : ""
                } pb-12`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* COLONNE GAUCHE : PRÉSENTATION & COUVERTURES */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7 space-y-6 min-w-0"
                  >
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold bg-gold-muted px-4 py-1.5 border border-gold/20 font-body">
                      Ouvrage II — Collection « À l&apos;École des Prophètes et des Noms d&apos;Allah
                      » (Vol. I)
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
                      Ar-Rahman : La Mer sans Rivage
                    </h3>
                    <p className="text-sm uppercase tracking-widest text-emerald font-semibold font-body">
                      Exégèse du Premier Nom — La Miséricorde Universelle d&apos;Allah
                    </p>

                    {/* GALERIE DES COUVERTURES (1ère et 4ème de couverture Ar-Rahman) */}
                    <div className="bg-midnight-light/60 border border-gold/25 rounded-sm p-4 sm:p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                        <span className="text-[11px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                          <FiEye className="text-gold" /> Couvertures Officielles de l&apos;Édition
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveRahmanCover("both")}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                              activeRahmanCover === "both"
                                ? "bg-gold text-stone-950 font-bold border-gold"
                                : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                            }`}
                          >
                            Recto & Verso
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveRahmanCover("recto")}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                              activeRahmanCover === "recto"
                                ? "bg-gold text-stone-950 font-bold border-gold"
                                : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                            }`}
                          >
                            1ère de Couverture
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveRahmanCover("verso")}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                              activeRahmanCover === "verso"
                                ? "bg-gold text-stone-950 font-bold border-gold"
                                : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                            }`}
                          >
                            4ème de Couverture
                          </button>
                        </div>
                      </div>

                      <div
                        className={`grid gap-4 sm:gap-6 items-center justify-center ${
                          activeRahmanCover === "both"
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1 max-w-sm mx-auto"
                        }`}
                      >
                        {(activeRahmanCover === "both" || activeRahmanCover === "recto") && (
                          <div className="space-y-2 text-center">
                            <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
                              <img
                                src="/books/rahman-couverture-recto.png"
                                alt="1ère de couverture — Ar-Rahman : La Mer sans Rivage"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-cream-muted block">
                              Première de Couverture
                            </span>
                          </div>
                        )}

                        {(activeRahmanCover === "both" || activeRahmanCover === "verso") && (
                          <div className="space-y-2 text-center">
                            <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
                              <img
                                src="/books/rahman-couverture-verso.png"
                                alt="4ème de couverture — Ar-Rahman : La Mer sans Rivage"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-cream-muted block">
                              Quatrième de Couverture
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-cream-muted leading-relaxed font-body italic border-l-2 border-gold pl-4 my-6">
                      « La miséricorde qui précède toute chose.
                      <br />
                      Le nom qui n&apos;a jamais cessé de t&apos;aimer.
                      <br />
                      <span className="text-xs text-gold not-italic">
                        « Et Ma miséricorde embrasse toute chose. » — Al-A&apos;râf 7:156
                      </span>{" "}
                      »
                    </p>

                    <p className="text-sm text-cream-muted leading-relaxed font-body">
                      Avant que tu existes, avant que tu puisses avoir mérité quoi que ce soit,{" "}
                      <strong className="text-cream">Ar-Rahman</strong> était déjà là. Le premier
                      nom invoqué après le Nom suprême. La miséricorde universelle. La mer dans
                      laquelle tout ce qui existe est immergé.
                    </p>

                    <p className="text-sm text-cream-muted leading-relaxed font-body">
                      Cet ouvrage de 84 pages est une exégèse complète de ce nom. Au croisement des
                      grands savants — Al-Ghazâlî, Ibn al-Qayyim, Ibn Rajab, Al-Râzî, At-Tabarî, Ibn
                      Kathîr, Al-Qurtubî — et d&apos;une lecture rigoureuse du Coran et des hadiths
                      : <strong className="text-cream">12 chapitres, 57 occurrences coraniques</strong>
                      , plus de 50 versets et hadiths analysés.
                    </p>

                    <div className="bg-midnight-light/50 p-6 sm:p-8 border border-border/80 rounded-sm">
                      <h4 className="font-heading text-lg text-cream mb-4 font-medium tracking-wide">
                        Architecture de l&apos;ouvrage (5 Parties • 12 Chapitres)
                      </h4>
                      <ul className="space-y-3.5 text-xs text-cream-muted font-body">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Partie I : La Science du Nom (Ch. 1 à 3)
                            </strong>{" "}
                            — Les Asma ul Husna, l&apos;archéologie de la racine R-H-M et la
                            cartographie des 57 occurrences coraniques.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Partie II : La Miséricorde Cosmologique (Ch. 4 à 6)
                            </strong>{" "}
                            — La Création comme acte d&apos;amour, exégèse de la Sourate Ar-Rahman
                            et science de la contemplation (Tafakkur).
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Partie III : Les Récits de la Miséricorde (Ch. 7 & 8)
                            </strong>{" "}
                            — Le Prophète ﷺ vivant d&apos;Ar-Rahman (Taïf, La Mecque), l&apos;homme
                            aux cent meurtres et Yûnus dans les ténèbres.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Partie IV : Théologie & Psychologie (Ch. 9 & 10)
                            </strong>{" "}
                            — Ce que les savants ont vu (Al-Ghazâlî, Ibn al-Qayyim, Ibn Rajab) et la
                            guérison du désespoir.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-emerald/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="text-cream font-medium">
                              Partie V : Vivre le Nom (Ch. 11 & 12)
                            </strong>{" "}
                            — Incarner Ar-Rahman (les 3 cercles de la miséricorde), invocations et
                            programme hebdomadaire de dhikr.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* COLONNE DROITE : MODULE D'ACQUISITION AR-RAHMAN */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="lg:col-span-5 p-6 sm:p-8 border border-border bg-midnight-light/60 backdrop-blur-md rounded-sm relative shadow-2xl hover:border-gold/30 transition-all duration-500 lg:sticky lg:top-28"
                  >
                    <div className="absolute top-0 right-10 w-20 h-px bg-gold/50" />
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/50">
                      <img
                        src="/books/rahman-couverture-recto.png"
                        alt="Ar-Rahman : La Mer sans Rivage"
                        className="w-16 h-auto rounded-sm border border-gold/30 shadow-md shrink-0"
                      />
                      <div>
                        <h4 className="font-heading text-xl text-cream font-semibold tracking-wide">
                          Se procurer l&apos;ouvrage
                        </h4>
                        <p className="text-xs text-emerald font-medium mt-0.5">
                          Téléchargement immédiat (PDF + ePub)
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-cream-muted leading-relaxed font-body mb-6">
                      Le Volume I de la collection « À l&apos;École des Prophètes et des Noms
                      d&apos;Allah » (84 pages) est disponible immédiatement en version numérique de
                      prestige (PDF + ePub).
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Format</span>
                        <span className="text-cream font-medium">PDF Haute Définition + ePub</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Pagination</span>
                        <span className="text-cream font-medium">84 pages (12 chapitres)</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Extrait Gratuit</span>
                        <span className="text-emerald font-semibold">Pages 6 à 12 ci-dessous ↓</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                        <span className="text-cream-muted">Tarif Numérique</span>
                        <span className="text-gold font-bold text-lg">12,65 €</span>
                      </div>
                    </div>

                    <Button
                      href="/paiement?offre=rahman"
                      variant="primary"
                      className="w-full py-4 text-center justify-center font-bold tracking-widest"
                    >
                      Commander l&apos;Ouvrage (12,65 €)
                    </Button>

                    <a
                      href="#extrait-rahman"
                      className="mt-3 w-full py-3 px-4 border border-gold/30 hover:border-gold text-gold text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <FiBookOpen /> Lire l&apos;extrait gratuit (Pages 6 à 12)
                    </a>
                  </motion.div>
                </div>

                {/* LECTEUR D'EXTRAIT SIMPLE AR-RAHMAN : PAGES 6 À 12 (BLOQUÉ PAGE 13) */}
                <div id="extrait-rahman" className="mt-10">
                  <div className="bg-midnight-light/60 border border-gold/25 rounded-sm p-5 sm:p-8 max-w-3xl mx-auto">
                    {/* Barre supérieure simple : Titre + Navigation */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <FiBookOpen className="text-gold shrink-0" />
                        <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                          Extrait Gratuit —{" "}
                          {currentRahmanPage <= 12
                            ? `Page ${currentRahmanPage} sur 12`
                            : "Page 13 (Verrouillée)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={goPrevRahmanPage}
                          disabled={currentRahmanPage <= 6}
                          className="px-3 py-1.5 rounded-sm border border-border text-xs text-cream-muted hover:text-cream hover:border-gold/40 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <FiChevronLeft /> Préc.
                        </button>
                        <span className="text-xs font-mono text-cream px-2">
                          p.{currentRahmanPage}
                        </span>
                        <button
                          type="button"
                          onClick={goNextRahmanPage}
                          disabled={currentRahmanPage >= 13}
                          className="px-3 py-1.5 rounded-sm bg-gold/15 border border-gold/40 text-xs text-gold font-semibold hover:bg-gold hover:text-stone-950 disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {currentRahmanPage === 12 ? "p.13 🔒" : "Suiv."} <FiChevronRight />
                        </button>
                      </div>
                    </div>

                    {/* Contenu épuré de la page */}
                    <div className="min-h-[240px] flex flex-col justify-center text-sm text-cream-muted leading-relaxed font-body space-y-4">
                      {currentRahmanPage === 6 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 6 — Sommaire (Parties I à III)
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-cream-muted divide-y divide-border/40">
                            <li className="pt-2 flex justify-between"><span>Avant-Propos — Note de méthode</span><span className="text-gold">p. 8</span></li>
                            <li className="pt-2 flex justify-between"><span>Partie I — La Science du Nom (Ch. 1 à 3)</span><span className="text-gold">p. 10</span></li>
                            <li className="pt-2 flex justify-between opacity-60"><span>Partie II — La Miséricorde Cosmologique (Ch. 4 à 6)</span><span>🔒 p. 13+</span></li>
                            <li className="pt-2 flex justify-between opacity-60"><span>Partie III — Les Récits de la Miséricorde (Ch. 7 &amp; 8)</span><span>🔒 p. 13+</span></li>
                          </ul>
                        </div>
                      )}

                      {currentRahmanPage === 7 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 7 — Sommaire (Parties IV &amp; V)
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-cream-muted divide-y divide-border/40">
                            <li className="pt-2 flex justify-between opacity-60"><span>Partie IV — Théologie et Psychologie (Ch. 9 &amp; 10)</span><span>🔒 p. 13+</span></li>
                            <li className="pt-2 flex justify-between opacity-60"><span>Partie V — Vivre le Nom, Invocations &amp; Dhikr (Ch. 11 &amp; 12)</span><span>🔒 p. 13+</span></li>
                            <li className="pt-2 flex justify-between opacity-60"><span>Conclusion générale &amp; Index des références</span><span>🔒 p. 78–84</span></li>
                          </ul>
                        </div>
                      )}

                      {currentRahmanPage === 8 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 8 — Avant-Propos : Note de méthode
                          </h4>
                          <p>
                            Ce livre est une méditation approfondie, systématique et nourrie des grands savants de l&apos;islam autour d&apos;un seul nom divin : <strong className="text-cream">Ar-Rahman</strong>.
                          </p>
                          <p>
                            Parce que chaque nom d&apos;Allah mérite un livre, et parce qu&apos;Ar-Rahman, le premier des noms invoqués après le Nom suprême, contient à lui seul une cosmologie entière.
                          </p>
                        </div>
                      )}

                      {currentRahmanPage === 9 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 9 — Avant-Propos (suite)
                          </h4>
                          <p>
                            Ce volume traite exclusivement d&apos;<strong className="text-cream">Ar-Rahman</strong>. Ces deux noms (Ar-Rahman et Ar-Rahim), bien que partageant la même racine <em>R-H-M</em>, désignent des réalités distinctes et méritent chacun une exploration complète.
                          </p>
                          <p className="italic text-gold border-l-2 border-gold pl-3">
                            « Qu&apos;Allah fasse de ce travail un nûr — une lumière — pour ceux qui le liront. »
                          </p>
                        </div>
                      )}

                      {currentRahmanPage === 10 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 10 — Partie I : La Science du Nom
                          </h4>
                          <p>
                            Comment les Noms divins se lisent, se méditent et se vivent — et pourquoi <strong className="text-cream">Ar-Rahman</strong> occupe une place sans égale dans la théologie islamique et l&apos;ouverture de chaque sourate.
                          </p>
                        </div>
                      )}

                      {currentRahmanPage === 11 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 11 — Chapitre I : Les Asma ul Husna
                          </h4>
                          <p className="italic text-gold border-l-2 border-gold pl-3">
                            « Les plus beaux Noms appartiennent à Allah. Invoquez-Le par ces Noms. » (Coran, 7 : 180)
                          </p>
                          <p>
                            La science des plus beaux Noms d&apos;Allah n&apos;est pas un ornement théologique : elle est, selon Al-Ghazâlî et Ibn al-Qayyim, la clé de voûte de toute vie spirituelle sérieuse.
                          </p>
                        </div>
                      )}

                      {currentRahmanPage === 12 && (
                        <div className="space-y-3">
                          <h4 className="font-heading text-xl text-cream font-medium">
                            Page 12 — Les Trois Degrés de la Connaissance du Nom
                          </h4>
                          <p>
                            Ibn al-Qayyim identifie trois niveaux dans le hadith des 99 Noms : les mémoriser, comprendre leurs significations profondes, et enfin invoquer Allah par eux tout en incarnant leurs exigences dans ses actes.
                          </p>
                        </div>
                      )}

                      {currentRahmanPage >= 13 && (
                        <div className="text-center py-6 space-y-4">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 text-gold border border-gold/30">
                            <FiLock />
                          </div>
                          <h4 className="font-heading text-xl text-cream">
                            Pages 13 à 84 réservées aux lecteurs
                          </h4>
                          <p className="text-xs text-cream-muted max-w-md mx-auto">
                            Commandez l&apos;ouvrage complet (PDF + ePub) pour découvrir les 12 chapitres, l&apos;exégèse de la Sourate Ar-Rahman et le programme de Dhikr.
                          </p>
                          <div className="pt-1">
                            <Link
                              href="/paiement?offre=rahman"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-stone-950 font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-gold/90 transition-colors"
                            >
                              <FiLock /> Débloquer le Livre Complet (12,65 €)
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PÔLE 2 : INVOCATIONS AUTHENTIQUES & PROTOCOLE DE DHIKR
            ════════════════════════════════════════════════════════════════════ */}
        {showInvocations && (
          <section
            id="pole-invocations"
            className="border-t border-border/60 pt-16 sm:pt-20 mb-24 scroll-mt-28"
          >
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald bg-emerald/10 px-4 py-1.5 rounded-full border border-emerald/30">
                <FiHeart /> Pôle 02 — Citadelle du Cœur & Rappels
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-cream font-light">
                Invocations Prophétiques & Dhikr
              </h2>
              <p className="text-xs sm:text-sm text-cream-muted leading-relaxed font-body">
                L&apos;invocation (<em>du&apos;â&apos;</em>) et la mention (<em>dhikr</em>) ne sont
                pas des formules automatiques : ce sont des actes de conscience qui réalignent le
                cœur (<em>Qalb</em>) et apaisent le système nerveux. Voici les invocations majeures
                extraites de nos ouvrages.
              </p>
            </div>

            {/* Grille des Invocations Authentifiées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {INVOCATIONS_LIST.map((inv, idx) => (
                <div
                  key={idx}
                  className="bg-midnight-light/60 border border-border hover:border-gold/40 rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all shadow-lg space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                        {inv.category}
                      </span>
                      <span className="text-[10px] text-cream-muted font-mono">0{idx + 1}</span>
                    </div>

                    <p
                      className="text-right text-xl sm:text-2xl text-cream leading-loose font-serif py-2"
                      dir="rtl"
                    >
                      {inv.arabic}
                    </p>

                    <p className="text-xs text-gold/90 italic font-body leading-relaxed">
                      {inv.phonetic}
                    </p>

                    <p className="text-xs sm:text-sm text-cream-muted leading-relaxed font-body">
                      {inv.translation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[10px] uppercase tracking-wider text-emerald font-semibold">
                    <span>Source Authentifiée</span>
                    <span>{inv.source}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Programme Hebdomadaire de Dhikr (Lundi à Dimanche) */}
            <div className="bg-midnight-light/70 border border-gold/30 rounded-sm p-6 sm:p-10">
              <div className="max-w-2xl mb-8 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block">
                  Protocole Pratique Hebdomadaire
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-cream font-light">
                  Programme de Dhikr — Semaine Type
                </h3>
                <p className="text-xs text-cream-muted">
                  Extrait du Chapitre XII d&apos;<em>Ar-Rahman : La Mer sans Rivage</em> pour ancrer
                  la conscience divine dans chaque journée de la semaine.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {WEEKLY_DHIKR_PROGRAM.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-midnight/90 border border-border/80 rounded-sm p-4 sm:p-5 space-y-2 hover:border-gold/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        {item.day}
                      </span>
                      <span className="text-[10px] text-emerald font-semibold">Jour {idx + 1}</span>
                    </div>
                    <h4 className="font-heading text-base text-cream font-medium">{item.focus}</h4>
                    <p className="text-xs text-cream-muted leading-relaxed font-body">
                      {item.practice}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PÔLE 3 : VIDÉOS & CAPSULES D'INGÉNIERIE
            ════════════════════════════════════════════════════════════════════ */}
        {showVideos && (
          <section
            id="pole-videos"
            className="border-t border-border/60 pt-16 sm:pt-20 mb-24 scroll-mt-28"
          >
            <div className="max-w-3xl mb-10 space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
                <FiVideo /> Pôle 03 — Médiathèque & Capsules
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-cream font-light">
                Vidéos & Interventions
              </h2>
              <p className="text-xs sm:text-sm text-cream-muted leading-relaxed font-body">
                Retrouvez les capsules vidéo, analyses comportementales et rappels spirituels de
                Mounir BYAR classés par thématiques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  tag: "Série 01 — Prière & Neurosciences",
                  title: "Pourquoi la volonté seule échoue face à l'abandon de la Salât",
                  duration: "Capsule Vidéo",
                  desc: "Comprendre l'entropie spirituelle, la surcharge dopaminergique moderne et comment l'architecture environnementale restaure la prière.",
                },
                {
                  tag: "Série 02 — Noms d'Allah",
                  title: "Ar-Rahman : La miséricorde qui précède même votre existence",
                  duration: "Capsule Exégétique",
                  desc: "Méditation sur la racine R-H-M, le hadith des cent miséricordes et le remède définitif contre le désespoir spirituel.",
                },
                {
                  tag: "Série 03 — Souveraineté & Nafs",
                  title: "Le Statut de Khalîfa : Reprendre la responsabilité radicale",
                  duration: "Analyse Clinique",
                  desc: "La différence fondamentale entre la réaction d'Adam (la responsabilité par la Tawbah) et celle d'Iblîs (le blâme et l'orgueil).",
                },
              ].map((vid, idx) => (
                <div
                  key={idx}
                  className="bg-midnight-light/60 border border-border rounded-sm overflow-hidden flex flex-col justify-between group hover:border-gold/40 transition-all"
                >
                  <div>
                    {/* Vignette vidéo stylisée */}
                    <div className="h-44 bg-gradient-to-br from-midnight via-midnight-light to-gold/10 border-b border-border/60 relative flex items-center justify-center p-6">
                      <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold group-hover:text-stone-950 transition-all">
                        <FiPlay className="text-xl ml-0.5" />
                      </div>
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest bg-midnight/90 text-gold border border-gold/30 px-2.5 py-1 rounded-sm font-semibold">
                        {vid.tag}
                      </span>
                      <span className="absolute bottom-3 right-3 text-[10px] text-cream-muted bg-midnight/80 px-2 py-0.5 rounded-sm flex items-center gap-1">
                        <FiClock className="text-gold" /> {vid.duration}
                      </span>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <h3 className="font-heading text-xl text-cream font-medium leading-snug">
                        {vid.title}
                      </h3>
                      <p className="text-xs text-cream-muted leading-relaxed font-body">
                        {vid.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-border/30 flex items-center justify-between text-[10px] uppercase tracking-widest text-gold font-semibold">
                    <span>Publication en cours d&apos;intégration</span>
                    <span>BLF Studio</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PÔLE 4 : FORMATIONS & MASTERCLASS (À VENIR)
            ════════════════════════════════════════════════════════════════════ */}
        {showFormations && (
          <section
            id="pole-formations"
            className="border-t border-border/60 pt-16 sm:pt-20 mb-20 scroll-mt-28"
          >
            <div className="max-w-3xl mb-10 space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
                <FiAward /> Pôle 04 — Académie Briser Les Frontières
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-cream font-light">
                Formations & Programmes Digitaux
              </h2>
              <p className="text-xs sm:text-sm text-cream-muted leading-relaxed font-body">
                Des cursus vidéo structurés étape par étape pour approfondir en autonomie les
                enseignements du Protocole C.O.M.E.S. et de la collection{" "}
                <em>À l&apos;École des Prophètes et des Noms d&apos;Allah</em>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  code: "FORMATION I",
                  title: "Ingénierie de la Salât & Architecture de Souveraineté",
                  modules: "6 Modules Vidéo + Cahier d'Exercices PDF",
                  desc: "Mettre en place le protocole complet de 30 jours pour ancrer définitivement les 5 prières, restructurer ses habitudes et réduire la charge mentale.",
                  status: "En préparation",
                },
                {
                  code: "FORMATION II",
                  title: "À l'École des Noms d'Allah : Vivre avec Ar-Rahman & Ar-Rahîm",
                  modules: "8 Modules d'Exégèse Appliquée",
                  desc: "Traverser les 4 niveaux de connaissance (Ihsâ') des Noms divins pour guérir du désespoir et transformer sa relation à Allah et aux autres.",
                  status: "En préparation",
                },
                {
                  code: "FORMATION III",
                  title: "Maîtrise du Nafs & Détox Dopaminergique",
                  modules: "5 Modules Cliniques & Spirituels",
                  desc: "Sortir de la dispersion numérique (Ghaflah), restaurer la concentration profonde (Khushû') et reprendre le gouvernail de son attention.",
                  status: "Prochainement",
                },
              ].map((form, idx) => (
                <div
                  key={idx}
                  className="bg-midnight-light/50 border border-border rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                        {form.code}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider px-2.5 py-1 bg-gold/10 text-gold border border-gold/30 rounded-full font-semibold">
                        {form.status}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl text-cream font-light leading-snug">
                      {form.title}
                    </h3>

                    <p className="text-[11px] text-emerald font-semibold uppercase tracking-wider">
                      {form.modules}
                    </p>

                    <p className="text-xs text-cream-muted leading-relaxed font-body">
                      {form.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <Link
                      href="/contact"
                      className="w-full py-3 px-4 bg-midnight hover:bg-gold hover:text-stone-950 text-gold border border-gold/30 text-[11px] uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Être informé de l&apos;ouverture</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section Incitation à l'Accompagnement Privé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center border-t border-border/60 pt-16 sm:pt-20 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">
            ➔ Passer à un accompagnement sur-mesure
          </span>
          <h3 className="font-heading text-3xl font-light text-cream tracking-wide">
            Besoin d&apos;un Suivi Individuel avec Mounir BYAR ?
          </h3>
          <p className="text-sm text-cream-muted max-w-xl mx-auto font-body leading-relaxed">
            Les ouvrages et outils numériques sont votre premier levier. Si vous souhaitez un
            accompagnement personnalisé (Audit diagnostique, Protocole 30 Jours, 3 Mois ou Mentorat
            12 Mois), découvrez nos formules ou contactez le Cabinet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              href="/offres"
              className="shadow-2xl shadow-stone-950/20 font-bold tracking-widest px-8 py-4 w-full sm:w-auto justify-center"
            >
              Voir les Accompagnements →
            </Button>
            <Button
              variant="ghost"
              href="/contact"
              className="px-8 py-4 w-full sm:w-auto justify-center"
            >
              Contacter le Cabinet
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
