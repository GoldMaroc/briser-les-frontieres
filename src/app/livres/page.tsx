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

                {/* LECTEUR D'EXTRAIT INTERACTIF LIVRE 1 : PAGES 6 À 12 (BLOQUÉ À LA PAGE 13) */}
                <div id="extrait-secrets" className="mt-14 pt-12 border-t border-border/40">
                  <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
                      <FiBookOpen /> Aperçu Officiel — Pages 6 à 12
                    </span>
                    <h4 className="font-heading text-2xl sm:text-3xl text-cream font-light">
                      Feuilleter « Les Secrets du Retour vers Allah »
                    </h4>
                    <p className="text-xs text-cream-muted">
                      Découvrez gratuitement le Sommaire, la Préface, l&apos;Introduction et le
                      début du Chapitre Premier. La lecture au-delà de la page 12 est verrouillée.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
                    {EXCERPT_PAGES.map((item) => {
                      const isActive = currentPage === item.pageNumber;
                      return (
                        <button
                          key={item.pageNumber}
                          type="button"
                          onClick={() => setCurrentPage(item.pageNumber)}
                          className={`px-3 py-2 rounded-sm text-[11px] font-body transition-all cursor-pointer flex items-center gap-1.5 border ${
                            isActive
                              ? "bg-gold text-stone-950 font-bold border-gold shadow-md"
                              : item.locked
                              ? "bg-midnight-light/80 text-gold/80 border-gold/30 hover:border-gold"
                              : "bg-midnight-light/60 text-cream-muted border-border hover:border-gold/40 hover:text-cream"
                          }`}
                        >
                          {item.locked ? (
                            <>
                              <FiLock className="text-xs shrink-0" />
                              <span>p. 13–41</span>
                            </>
                          ) : (
                            <span>Page {item.pageNumber}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#FAF8F5] text-[#1A1A1A] border-2 border-[#C9A84C]/40 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-6 sm:p-12 md:p-16 min-h-[540px] flex flex-col justify-between relative overflow-hidden select-none"
                      >
                        <div className="text-center text-[9px] uppercase tracking-[0.35em] text-[#8C7A5B] pb-4 mb-6 border-b border-[#C9A84C]/25 flex items-center justify-between">
                          <span>Les Secrets du Retour vers Allah</span>
                          <span>
                            {currentPage <= 12
                              ? `Extrait Gratuit • Page ${currentPage} / 41`
                              : "Accès Restreint • Pages 13 à 41"}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          {currentPage === 6 && (
                            <div className="space-y-8 py-4">
                              <div className="text-center space-y-3">
                                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#143D2B]">
                                  Sommaire
                                </h3>
                                <div className="text-[#C59B27] tracking-[0.5em] text-xs">◆ ◆ ◆</div>
                              </div>

                              <div className="space-y-3.5 max-w-lg mx-auto text-sm sm:text-base font-serif">
                                {[
                                  { label: "Préface — Un mot avant d'entrer", target: 7 },
                                  { label: "Introduction — La Crise de la Déconnexion", target: 9 },
                                  { label: "I. Le Statut de Khalîfa", target: 12 },
                                  {
                                    label: "II. L'Anatomie du Retour (At-Tawbah)",
                                    target: 13,
                                    locked: true,
                                  },
                                  { label: "III. La Prière (As-Salât)", target: 13, locked: true },
                                  {
                                    label: "IV. Reprendre sa Souveraineté",
                                    target: 13,
                                    locked: true,
                                  },
                                  {
                                    label: "V. L'Écosystème de la Souveraineté",
                                    target: 13,
                                    locked: true,
                                  },
                                  {
                                    label: "Protocole de Souveraineté — 30 Jours",
                                    target: 13,
                                    locked: true,
                                  },
                                  {
                                    label: "Synthèse finale — Ce que vous avez entre les mains",
                                    target: 13,
                                    locked: true,
                                  },
                                  { label: "L'Auteur — Mounir BYAR", target: 13, locked: true },
                                  {
                                    label: "Pour aller plus loin — Contact",
                                    target: 13,
                                    locked: true,
                                  },
                                ].map((ch, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentPage(ch.target)}
                                    className="w-full text-left flex items-center justify-between gap-2 pb-1.5 border-b border-[#143D2B]/15 text-[#143D2B] hover:text-[#9E7331] transition-colors cursor-pointer"
                                  >
                                    <span className="underline underline-offset-4">{ch.label}</span>
                                    {ch.locked ? (
                                      <span className="text-[10px] uppercase tracking-wider text-[#9E7331] flex items-center gap-1 shrink-0 font-sans font-semibold">
                                        <FiLock /> p.13+
                                      </span>
                                    ) : (
                                      <span className="text-xs text-[#143D2B]/60 shrink-0 font-sans">
                                        Lire →
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>

                              <p className="text-center text-xs italic text-[#666] pt-4">
                                → Cliquez sur un chapitre pour y accéder directement.
                              </p>
                            </div>
                          )}

                          {currentPage === 7 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <div className="text-center space-y-2 mb-6">
                                <span className="text-[11px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                                  P R É F A C E
                                </span>
                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#143D2B]">
                                  Un mot avant d&apos;entrer
                                </h3>
                                <div className="text-[#C59B27] tracking-[0.5em] text-xs">◆ ◆ ◆</div>
                              </div>

                              <p className="indent-6">
                                Avant d&apos;entrer dans cet ouvrage, vous devez savoir une chose :
                                ce livre ne vous demandera pas plus d&apos;effort. Il vous proposera
                                moins de combat.
                              </p>
                              <p className="indent-6">
                                Les pages qui suivent ne sont pas un manuel de plus ajouté à la pile
                                des livres qui vous attendent. Elles sont une{" "}
                                <strong>ingénierie</strong> — une architecture conçue pour quiconque
                                s&apos;est éloigné de sa prière et qui, en silence, attend de
                                retrouver le chemin sans savoir par où commencer.
                              </p>
                              <p className="indent-6">
                                J&apos;ai écrit ce livre parce que je l&apos;ai cherché et que je ne
                                l&apos;ai pas trouvé. J&apos;avais besoin d&apos;un texte qui parle
                                à la fois au croyant désorienté et à l&apos;esprit moderne formé aux
                                sciences. Un texte qui ne sépare pas l&apos;âme du corps, ni la
                                révélation de l&apos;observation, ni la sagesse classique
                                d&apos;Al-Ghazâlî de la psychologie comportementale contemporaine.
                                Un texte qui ose dire que reprendre sa prière n&apos;est pas une
                                question de volonté héroïque, mais une question d&apos;
                                <strong>architecture mentale</strong>.
                              </p>
                              <p className="indent-6">
                                Cet ouvrage est ma réponse à ce besoin. Il s&apos;adresse à vous si
                                vous reconnaissez l&apos;un des états suivants — sans jugement ni
                                condition :
                              </p>
                              <p className="indent-6">
                                Vous avez arrêté de prier depuis des mois ou des années, et vous
                                portez ce silence comme un poids.
                              </p>
                              <p className="indent-6">
                                Vous priez encore, mais quelque chose s&apos;est éteint à
                                l&apos;intérieur, et les gestes ne touchent plus le cœur.
                              </p>
                            </div>
                          )}

                          {currentPage === 8 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <p className="indent-6">
                                Vous ressentez la déconnexion sans pouvoir la nommer — ce vide
                                diffus que la productivité, les écrans et les acquisitions ne
                                comblent pas.
                              </p>
                              <p className="indent-6">
                                Vous voulez revenir, mais vous ne savez pas par où commencer et
                                toute tentative précédente s&apos;est soldée par un retour à la case
                                départ.
                              </p>

                              <div className="my-6 py-5 border-y border-[#C59B27] text-center italic text-base sm:text-lg text-[#143D2B]">
                                Ce livre est pour vous. Exactement là où vous êtes. Pas là où vous
                                devriez être.
                              </div>

                              <p className="indent-6">
                                Vous y trouverez cinq chapitres, un protocole de trente jours, et
                                une promesse simple : si vous lisez et appliquez avec rigueur, votre
                                prière reviendra. Non parce que ces pages contiennent quelque magie,
                                mais parce qu&apos;elles mettent en méthode ce que la sagesse
                                islamique et les sciences cognitives ont, chacune de leur côté,
                                observé.
                              </p>
                              <p className="indent-6">
                                Une dernière chose. Ce livre n&apos;a pas été écrit pour vous
                                flatter ni pour vous culpabiliser. Il a été écrit pour vous rendre{" "}
                                <strong>lucide</strong> et <strong>libre</strong>. La lucidité vient
                                de la rigueur. La liberté vient du retour.
                              </p>

                              <div className="pt-6 text-center space-y-2 text-[#9E7331] italic">
                                <p>Que la lecture vous soit utile.</p>
                                <p>Et qu&apos;Allah vous facilite chaque pas.</p>
                                <p className="pt-4 not-italic font-sans text-xs tracking-widest uppercase text-[#1A1A1A]">
                                  Mounir BYAR
                                </p>
                              </div>
                            </div>
                          )}

                          {currentPage === 9 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <div className="text-center space-y-2 mb-6">
                                <span className="text-[11px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                                  I N T R O D U C T I O N
                                </span>
                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#143D2B]">
                                  La Crise de la Déconnexion
                                </h3>
                                <p className="text-sm italic text-[#9E7331]">
                                  L&apos;Ingénierie de la Souveraineté
                                </p>
                              </div>

                              <p>
                                L&apos;époque contemporaine se caractérise par une accélération
                                technologique, cognitive et sociale d&apos;une ampleur inédite dans
                                l&apos;histoire de l&apos;humanité. Les architectures numériques,
                                les flux d&apos;informations continus et la pression omniprésente de
                                la performance ont engendré une fragmentation massive et systémique
                                de l&apos;attention humaine. Le cœur humain, conceptualisé dans
                                l&apos;épistémologie islamique sous le terme de <em>Qalb</em>, a
                                toujours été considéré comme l&apos;organe central de la
                                contemplation, de la cognition morale et de la perception de la
                                transcendance divine.
                              </p>
                              <p className="indent-6">
                                Or, dans l&apos;écosystème moderne, ce centre perceptif est
                                continuellement bombardé par des stimuli éphémères, le réduisant à
                                un simple processeur réactif saturé d&apos;informations. Cette
                                surcharge cognitive perpétuelle génère un phénomène délétère que
                                l&apos;on peut qualifier d&apos;
                                <strong>entropie spirituelle</strong>. Plus le système nerveux
                                humain est sollicité par des mécanismes de gratification immédiate,
                                moins les ressources exécutives et psychologiques de l&apos;esprit
                                demeurent disponibles pour l&apos;introspection, le recueillement et
                                la transcendance.
                              </p>
                              <p className="indent-6">
                                La déconnexion vis-à-vis de la religion observée massivement à
                                l&apos;ère moderne ne relève pas systématiquement d&apos;une perte
                                de foi idéologique ou d&apos;un scepticisme intellectuel. Elle
                                résulte plus fondamentalement et plus insidieusement d&apos;un...
                              </p>
                            </div>
                          )}

                          {currentPage === 10 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <p>
                                ...environnement dont l&apos;architecture même détourne
                                l&apos;attention humaine du sens ultime. L&apos;individu moderne
                                évolue dans un monde où les algorithmes, le marketing et les
                                structures sociales sont minutieusement calibrés pour capter le
                                regard, monopoliser le temps et drainer l&apos;énergie. Ce processus
                                instaure un état d&apos;oubli — un concept que la théologie
                                islamique identifie sous le terme de <em>Ghaflah</em>.
                              </p>

                              <h4 className="font-heading text-lg sm:text-xl font-bold italic text-[#143D2B] pt-2">
                                L&apos;Ingénierie de la Souveraineté
                              </h4>

                              <p>
                                C&apos;est ici qu&apos;intervient le concept fondamental d&apos;
                                <strong>Ingénierie de la Souveraineté</strong>. Cette discipline se
                                définit comme la science clinique, psychologique et spirituelle du
                                retour à Allah, conceptualisé comme l&apos;acte suprême de
                                libération existentielle. Dans cette perspective, le monothéisme pur
                                (<em>Tawhîd</em>) dépasse largement le cadre de la simple adhésion
                                dogmatique. Il s&apos;incarne comme une dynamique opératoire
                                concrète de désenvoûtement face aux multiples dépendances qui
                                aliènent l&apos;être humain moderne.
                              </p>

                              <div className="my-5 py-4 border-y border-[#C59B27] text-center italic text-base text-[#143D2B]">
                                La souveraineté personnelle ne se définit nullement par une
                                domination exercée sur autrui, mais par la maîtrise absolue du soi.
                              </div>

                              <p className="indent-6">
                                La souveraineté personnelle se définit par la maîtrise du{" "}
                                <em>Nafs</em> face aux stimuli incessants de l&apos;environnement.
                                C&apos;est la capacité à ne dépendre ultimement que du Créateur,
                                annulant l&apos;emprise des validations sociales, des injonctions
                                consuméristes et des addictions comportementales. Le retour à Allah,
                                formalisé par le...
                              </p>
                            </div>
                          )}

                          {currentPage === 11 && (
                            <div className="space-y-6 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <p>
                                ...processus d&apos;<em>At-Tawbah</em>, devient dès lors un
                                processus d&apos;ingénierie intérieure méthodique et mesurable.
                              </p>

                              <div className="p-6 sm:p-8 bg-[#F4F1EA] border border-[#C59B27]/50 rounded-sm space-y-4 my-8">
                                <span className="text-[10px] uppercase tracking-[0.35em] text-[#7A6B53] font-sans font-semibold block">
                                  H A D I T H
                                </span>
                                <p className="italic text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
                                  « Allah est plus heureux du repentir de Son serviteur que
                                  l&apos;un de vous ne l&apos;est de retrouver son chameau perdu
                                  dans le désert. »
                                </p>
                                <p className="text-right text-[11px] uppercase tracking-[0.3em] text-[#555] font-sans">
                                  M U S L I M — 2 7 4 7
                                </p>
                              </div>
                            </div>
                          )}

                          {currentPage === 12 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <div className="text-center space-y-1.5 mb-5">
                                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                                  C H A P I T R E &nbsp; P R E M I E R
                                </span>
                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#143D2B]">
                                  Le Statut de Khalîfa
                                </h3>
                                <p className="text-xs italic text-[#9E7331]">
                                  L&apos;honneur de la responsabilité
                                </p>
                              </div>

                              <p>
                                Avant d&apos;aborder la mécanique du repentir ou de la prière, il
                                est impératif de comprendre la position ontologique de l&apos;être
                                humain dans l&apos;épistémologie islamique. Allah a conféré à
                                l&apos;être humain un honneur cosmique en le désignant comme{" "}
                                <em>Khalîfa</em> — vicaire, représentant ou gérant — sur terre. Le
                                Coran relate cet événement fondateur.
                              </p>

                              <div className="p-5 sm:p-6 bg-[#F4F1EA] border-l-4 border-[#C59B27] space-y-3 my-4">
                                <p
                                  className="text-right text-lg sm:text-xl text-[#143D2B] leading-loose"
                                  dir="rtl"
                                >
                                  وَإِذْ قَالَ رَبُّكَ لِلْمَلَٰٓئِكَةِ إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ
                                  خَلِيفَةً
                                </p>
                                <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                                  « Et lorsque ton Seigneur dit aux Anges : « Je vais établir sur la
                                  terre un successeur (Khalîfa) ». Ils dirent : « Vas-Tu y désigner
                                  un qui y mettra le désordre et répandra le sang ? » Allah répondit
                                  : « En vérité, Je sais ce que vous ne savez pas. » »
                                </p>
                                <p className="text-right text-[10px] uppercase tracking-[0.25em] text-[#7A6B53] font-sans">
                                  S O U R A T E &nbsp; A L - B A Q A R A — 2 : 3 0
                                </p>
                              </div>

                              <p className="indent-6">
                                Cet honneur suprême a été scellé lorsqu&apos;Allah a ordonné aux
                                anges de se prosterner devant Adam. Cette prosternation n&apos;était
                                pas un acte d&apos;adoration, formellement interdite envers la
                                création, mais une <strong>reconnaissance solennelle</strong> de la
                                capacité cognitive, du libre arbitre et de la lourde responsabilité
                                confiée à l&apos;être humain.
                              </p>
                            </div>
                          )}

                          {currentPage >= 13 && (
                            <div className="relative py-6">
                              <div
                                className="space-y-4 text-sm font-serif text-[#1A1A1A]/50 blur-[5px] select-none pointer-events-none"
                                aria-hidden="true"
                              >
                                <h4 className="font-heading text-xl font-bold text-[#143D2B]">
                                  La prise de responsabilité comme fondation
                                </h4>
                                <p>
                                  À l&apos;inverse d&apos;Iblîs, lorsque Adam et Ève commirent
                                  l&apos;erreur de manger de l&apos;arbre interdit et perdirent leur
                                  équilibre initial, leur réaction fut la fondation même de la
                                  souveraineté humaine...
                                </p>
                              </div>

                              <div className="inset-0 flex items-center justify-center">
                                <div className="bg-[#0A1128] text-[#F0EDE8] border-2 border-[#D4A853] rounded-sm p-6 sm:p-8 max-w-md w-full mx-auto text-center shadow-2xl space-y-4">
                                  <div className="w-12 h-12 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/40 text-[#D4A853] flex items-center justify-center mx-auto text-xl">
                                    <FiLock />
                                  </div>
                                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A853] font-sans font-bold block">
                                    Fin de l&apos;Extrait Gratuit (Pages 6 à 12)
                                  </span>
                                  <h4 className="font-heading text-2xl text-[#F0EDE8] font-light">
                                    Débloquez les Pages 13 à 41
                                  </h4>
                                  <p className="text-xs text-[#A0AEC0] font-sans leading-relaxed">
                                    La suite de l&apos;ouvrage (Chapitres I à V et le Protocole
                                    pratique de 30 Jours) est réservée aux lecteurs ayant acquis
                                    l&apos;édition complète.
                                  </p>

                                  <Link
                                    href="/paiement?offre=secrets"
                                    className="w-full py-4 px-6 bg-[#D4A853] hover:bg-[#E8C468] text-[#0A1128] font-bold text-xs uppercase tracking-[0.18em] rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 font-sans"
                                  >
                                    <FiLock className="shrink-0" />
                                    <span>Acquérir le Livre Complet (5,90 €) ➔</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-6 mt-8 border-t border-[#C9A84C]/25 flex items-center justify-between gap-2 font-sans">
                          <button
                            type="button"
                            onClick={goPrevPage}
                            disabled={currentPage <= 6}
                            className="px-3.5 py-2 rounded-sm border border-[#143D2B]/20 text-xs font-semibold text-[#143D2B] disabled:opacity-30 hover:bg-[#143D2B] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <FiChevronLeft /> Page précédente
                          </button>

                          <span className="font-serif text-sm font-bold text-[#143D2B]">
                            {currentPage <= 12 ? currentPage : "🔒 13 / 41"}
                          </span>

                          {currentPage <= 12 ? (
                            <button
                              type="button"
                              onClick={goNextPage}
                              className="px-3.5 py-2 rounded-sm bg-[#143D2B] text-white text-xs font-semibold hover:bg-[#0F2E20] transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              {currentPage === 12 ? (
                                <>
                                  <span>Page 13 (Suite)</span> <FiLock className="text-[#D4A853]" />
                                </>
                              ) : (
                                <>
                                  <span>Page suivante</span> <FiChevronRight />
                                </>
                              )}
                            </button>
                          ) : (
                            <Link
                              href="/paiement?offre=secrets"
                              className="px-3.5 py-2 rounded-sm bg-[#C59B27] text-[#0A1128] text-xs font-bold hover:bg-[#D4A853] transition-colors flex items-center gap-1.5"
                            >
                              <span>Débloquer (5,90 €)</span> <FiChevronRight />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
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

                {/* LECTEUR D'EXTRAIT INTERACTIF AR-RAHMAN : PAGES 6 À 12 (BLOQUÉ PAGE 13) */}
                <div id="extrait-rahman" className="mt-14 pt-12 border-t border-border/40">
                  <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
                      <FiBookOpen /> Aperçu Officiel — Pages 6 à 12
                    </span>
                    <h4 className="font-heading text-2xl sm:text-3xl text-cream font-light">
                      Feuilleter « Ar-Rahman : La Mer sans Rivage »
                    </h4>
                    <p className="text-xs text-cream-muted">
                      Découvrez gratuitement le Sommaire, l&apos;Avant-Propos et le début du
                      Chapitre Premier (Les Asma ul Husna). La lecture au-delà de la page 12 est
                      verrouillée.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
                    {RAHMAN_EXCERPT_PAGES.map((item) => {
                      const isActive = currentRahmanPage === item.pageNumber;
                      return (
                        <button
                          key={item.pageNumber}
                          type="button"
                          onClick={() => setCurrentRahmanPage(item.pageNumber)}
                          className={`px-3 py-2 rounded-sm text-[11px] font-body transition-all cursor-pointer flex items-center gap-1.5 border ${
                            isActive
                              ? "bg-gold text-stone-950 font-bold border-gold shadow-md"
                              : item.locked
                              ? "bg-midnight-light/80 text-gold/80 border-gold/30 hover:border-gold"
                              : "bg-midnight-light/60 text-cream-muted border-border hover:border-gold/40 hover:text-cream"
                          }`}
                        >
                          {item.locked ? (
                            <>
                              <FiLock className="text-xs shrink-0" />
                              <span>p. 13–84</span>
                            </>
                          ) : (
                            <span>Page {item.pageNumber}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentRahmanPage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#FAF8F5] text-[#1A1A1A] border-2 border-[#C9A84C]/40 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-6 sm:p-12 md:p-16 min-h-[540px] flex flex-col justify-between relative overflow-hidden select-none"
                      >
                        <div className="text-center text-[9px] uppercase tracking-[0.35em] text-[#8C7A5B] pb-4 mb-6 border-b border-[#C9A84C]/25 flex items-center justify-between">
                          <span>Ar-Rahman — La Mer sans Rivage</span>
                          <span>
                            {currentRahmanPage <= 12
                              ? `Extrait Gratuit • Page ${currentRahmanPage} / 84`
                              : "Accès Restreint • Pages 13 à 84"}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          {currentRahmanPage === 6 && (
                            <div className="space-y-6 py-2">
                              <div className="text-center space-y-2">
                                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F2847]">
                                  Sommaire
                                </h3>
                                <div className="text-[#C59B27] tracking-[0.5em] text-xs">◆ ◆ ◆</div>
                              </div>

                              <div className="space-y-4 max-w-lg mx-auto text-xs sm:text-sm font-serif">
                                <button
                                  type="button"
                                  onClick={() => setCurrentRahmanPage(8)}
                                  className="w-full text-left flex items-center justify-between pb-1.5 border-b border-[#0F2847]/15 text-[#0F2847] hover:text-[#9E7331] cursor-pointer"
                                >
                                  <span className="underline underline-offset-4">
                                    Avant-Propos — Note de méthode
                                  </span>
                                  <span className="text-[11px] font-sans text-[#0F2847]/60">
                                    Lire →
                                  </span>
                                </button>

                                {[
                                  {
                                    part: "PARTIE I — La Science du Nom",
                                    chapters: [
                                      {
                                        label: "1. Les Asma ul Husna — Méthode et Enjeux",
                                        target: 11,
                                      },
                                      {
                                        label: "2. Archéologie du Nom Ar-Rahman",
                                        target: 13,
                                        locked: true,
                                      },
                                      {
                                        label: "3. Ar-Rahman dans le Corpus Coranique",
                                        target: 13,
                                        locked: true,
                                      },
                                    ],
                                  },
                                  {
                                    part: "PARTIE II — La Miséricorde Cosmologique",
                                    chapters: [
                                      {
                                        label: "4. La Création comme Acte d'Amour",
                                        target: 13,
                                        locked: true,
                                      },
                                      {
                                        label: "5. Exégèse de la Sourate Ar-Rahman",
                                        target: 13,
                                        locked: true,
                                      },
                                      {
                                        label: "6. Les Signes — Le Monde comme Livre Ouvert",
                                        target: 13,
                                        locked: true,
                                      },
                                    ],
                                  },
                                  {
                                    part: "PARTIE III — Les Récits de la Miséricorde",
                                    chapters: [
                                      {
                                        label: "7. Le Prophète ﷺ, Vivant d'Ar-Rahman",
                                        target: 13,
                                        locked: true,
                                      },
                                      {
                                        label: "8. Les Récits qui Révèlent le Nom",
                                        target: 13,
                                        locked: true,
                                      },
                                    ],
                                  },
                                  {
                                    part: "PARTIE IV — Théologie et Psychologie",
                                    chapters: [
                                      {
                                        label: "9. Ce que les Savants ont Vu",
                                        target: 13,
                                        locked: true,
                                      },
                                      {
                                        label: "10. Ar-Rahman et l'Âme Humaine",
                                        target: 13,
                                        locked: true,
                                      },
                                    ],
                                  },
                                  {
                                    part: "PARTIE V — Vivre le Nom",
                                    chapters: [
                                      {
                                        label: "11. Incarner Ar-Rahman",
                                        target: 13,
                                        locked: true,
                                      },
                                      {
                                        label: "12. Invocations et Dhikr",
                                        target: 13,
                                        locked: true,
                                      },
                                    ],
                                  },
                                ].map((section, idx) => (
                                  <div key={idx} className="space-y-1.5">
                                    <p className="font-bold text-[#0F2847] text-xs uppercase tracking-wider pt-1">
                                      {section.part}
                                    </p>
                                    {section.chapters.map((ch, cIdx) => (
                                      <button
                                        key={cIdx}
                                        type="button"
                                        onClick={() => setCurrentRahmanPage(ch.target)}
                                        className="w-full text-left pl-3 flex items-center justify-between gap-2 py-0.5 text-[#143D2B] hover:text-[#9E7331] cursor-pointer"
                                      >
                                        <span className="underline underline-offset-4">
                                          {ch.label}
                                        </span>
                                        {ch.locked ? (
                                          <span className="text-[10px] uppercase tracking-wider text-[#9E7331] flex items-center gap-1 shrink-0 font-sans font-semibold">
                                            <FiLock /> p.13+
                                          </span>
                                        ) : (
                                          <span className="text-[11px] text-[#0F2847]/60 shrink-0 font-sans">
                                            Lire →
                                          </span>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentRahmanPage === 7 && (
                            <div className="space-y-6 py-6 max-w-lg mx-auto w-full font-serif text-sm sm:text-base">
                              <div className="space-y-4">
                                {[
                                  {
                                    label: "Conclusion générale — La Mer sans Rivage",
                                    target: 13,
                                  },
                                  {
                                    label: "Index des références coraniques et hadithiques",
                                    target: 13,
                                  },
                                  { label: "À propos de l'Auteur — Mounir BYAR", target: 13 },
                                  { label: "Pour aller plus loin — Contact", target: 13 },
                                ].map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentRahmanPage(item.target)}
                                    className="w-full text-left flex items-center justify-between gap-2 pb-2 border-b border-[#0F2847]/15 text-[#143D2B] hover:text-[#9E7331] cursor-pointer"
                                  >
                                    <span className="underline underline-offset-4">
                                      {item.label}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-[#9E7331] flex items-center gap-1 shrink-0 font-sans font-semibold">
                                      <FiLock /> p.13+
                                    </span>
                                  </button>
                                ))}
                              </div>

                              <p className="text-center text-xs italic text-[#666] pt-8">
                                → Cliquez sur un titre pour y accéder directement.
                              </p>
                            </div>
                          )}

                          {currentRahmanPage === 8 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <div className="text-center space-y-2 mb-6">
                                <span className="text-[11px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                                  P R É L I M I N A I R E S
                                </span>
                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F2847]">
                                  Avant-Propos
                                </h3>
                                <p className="text-xs italic text-[#9E7331]">
                                  Note de méthode et d&apos;intention
                                </p>
                              </div>

                              <p>
                                Ce livre est un livre d&apos;exégèse. Non pas un tafsir au sens
                                technique du terme — ce n&apos;est pas ma compétence — mais une
                                méditation approfondie, systématique, nourrie des grands savants de
                                l&apos;islam, autour d&apos;un seul nom divin :{" "}
                                <strong>Ar-Rahman</strong>. Un seul. Parce que chaque nom
                                d&apos;Allah mérite un livre. Parce que la précipitation est
                                l&apos;ennemie de la profondeur. Et parce que Ar-Rahman, le premier
                                des noms invoqués après le Nom suprême, contient à lui seul une
                                cosmologie entière.
                              </p>

                              <p className="indent-6">
                                Ce travail s&apos;est construit autour de quatre sources
                                principales. La première est le <strong>texte coranique</strong>{" "}
                                lui-même, exploré dans sa langue d&apos;origine, avec l&apos;aide
                                des grands lexicographes : Râghib al-Isfahânî dans son{" "}
                                <em>Al-Mufradât fî Gharîb al-Qur&apos;ân</em>, Ibn Fâris dans son{" "}
                                <em>Maqâyîs al-Lugha</em>, Al-Jawharî dans le <em>Sihâh</em>. La
                                deuxième est le <strong>corpus hadithique</strong> — les paroles et
                                traditions du Prophète Muhammad ﷺ — dans les collections canoniques
                                et leurs commentaires. La troisième est la{" "}
                                <strong>tradition exégétique</strong> : At-Tabarî, Ibn Kathîr,
                                Al-Qurtubî, Al-Râzî, et Al-Alûsî principalement. La quatrième est la{" "}
                                <strong>littérature spirituelle et théologique</strong> :
                                Al-Ghazâlî, Ibn al-Qayyim al-Jawziyya, Ibn Rajab al-Hanbalî, et
                                Al-&apos;Izz ibn &apos;Abd al-Salâm.
                              </p>

                              <p className="indent-6">
                                Ce livre ne s&apos;adresse pas aux spécialistes — il existe pour eux
                                des œuvres autrement plus rigoureuses. Il s&apos;adresse à
                                quelqu&apos;un qui veut comprendre, qui a entre treize et vingt ans,
                                qui lit sérieusement, qui est prêt à...
                              </p>
                            </div>
                          )}

                          {currentRahmanPage === 9 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <p>
                                ...s&apos;arrêter sur une phrase et à la laisser travailler en lui.{" "}
                                <strong>
                                  L&apos;exigence intellectuelle n&apos;exclut pas la jeunesse. Elle
                                  la respecte.
                                </strong>
                              </p>

                              <p className="indent-6">
                                Un avertissement nécessaire : ce volume traite{" "}
                                <strong>exclusivement</strong> de Ar-Rahman. Ar-Rahîm — le
                                Très-Miséricordieux, miséricorde spécifique et perpétuelle — fera
                                l&apos;objet du volume suivant. Ces deux noms, bien que partageant
                                une racine, désignent des réalités distinctes et méritent chacun une
                                exploration complète. Les confondre ou les traiter ensemble
                                appauvrirait les deux.
                              </p>

                              <p className="indent-6">
                                Que Allah fasse de ce travail un <em>nûr</em> — une lumière — pour
                                ceux qui le liront. Et qu&apos;Il me pardonne toute erreur, toute
                                insuffisance, toute présomption.
                              </p>

                              <div className="pt-8 text-center space-y-3">
                                <div className="text-[#C59B27] tracking-[0.4em] text-xs">─ ◆ ─</div>
                                <p className="font-sans text-xs tracking-widest uppercase text-[#0F2847]">
                                  Mounir Byar — Reims, 2025
                                </p>
                              </div>
                            </div>
                          )}

                          {currentRahmanPage === 10 && (
                            <div className="py-12 text-center space-y-6 font-serif">
                              <div className="text-5xl sm:text-6xl font-heading font-bold text-[#C59B27]">
                                I
                              </div>
                              <div className="text-[#C59B27] tracking-[0.4em] text-xs">
                                ──── ◆ ────
                              </div>
                              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F2847]">
                                La Science du Nom
                              </h3>
                              <p className="text-sm italic text-[#555] max-w-md mx-auto leading-relaxed">
                                Comment les noms divins se lisent, se méditent et se vivent — et
                                pourquoi Ar-Rahman occupe une place sans égale dans la théologie
                                islamique
                              </p>
                            </div>
                          )}

                          {currentRahmanPage === 11 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <div className="text-center space-y-1.5 mb-5">
                                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                                  C H A P I T R E &nbsp; P R E M I E R
                                </span>
                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F2847]">
                                  Les Asma ul Husna
                                </h3>
                                <p className="text-xs italic text-[#9E7331]">
                                  Méthode et enjeux de la connaissance des noms divins
                                </p>
                              </div>

                              <div className="p-5 sm:p-6 bg-[#F4F1EA] border-l-4 border-[#C59B27] space-y-3 my-4">
                                <p
                                  className="text-right text-lg sm:text-xl text-[#0F2847] leading-loose"
                                  dir="rtl"
                                >
                                  وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا ۖ وَذَرُوا۟
                                  ٱلَّذِينَ يُلْحِدُونَ فِىٓ أَسْمَٰٓئِهِۦ
                                </p>
                                <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                                  « Les plus beaux Noms appartiennent à Allah. Invoquez-Le par ces
                                  Noms et laissez ceux qui profanent Ses Noms — ils seront rétribués
                                  pour ce qu&apos;ils faisaient. »
                                </p>
                                <p className="text-right text-[10px] uppercase tracking-[0.25em] text-[#7A6B53] font-sans">
                                  S O U R A T E &nbsp; A L - A &apos; R Â F — 7 : 1 8 0
                                </p>
                              </div>

                              <p>
                                Avant d&apos;entrer dans le cœur de ce livre, il faut poser le
                                cadre. La tradition islamique a développé une discipline rigoureuse
                                autour des <em>Asma ul Husna</em> — les plus beaux noms
                                d&apos;Allah. Cette discipline n&apos;est pas de l&apos;ornement
                                théologique. Elle est, selon des savants de la stature
                                d&apos;Al-Ghazâlî et d&apos;Ibn al-Qayyim,{" "}
                                <strong>la clé de voûte de toute vie spirituelle sérieuse</strong>.
                              </p>

                              <div className="pt-2">
                                <span className="text-xs font-sans text-[#9E7331] font-bold block mb-1">
                                  § 1
                                </span>
                                <h4 className="font-heading text-lg font-bold text-[#0F2847]">
                                  La tradition des 99 noms — hadith et fondements
                                </h4>
                                <p className="mt-2">
                                  Le fondement textuel de la science des Asma ul Husna repose
                                  principalement sur deux hadiths canoniques. Le...
                                </p>
                              </div>
                            </div>
                          )}

                          {currentRahmanPage === 12 && (
                            <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                              <p>
                                ...premier, rapporté par Al-Boukhâri et Muslim, est le plus connu :
                              </p>

                              <div className="p-5 sm:p-6 bg-[#F4F1EA] border border-[#C59B27]/50 rounded-sm space-y-3">
                                <span className="text-[10px] uppercase tracking-[0.35em] text-[#7A6B53] font-sans font-semibold block">
                                  H A D I T H &nbsp; S A H Î H
                                </span>
                                <p
                                  className="text-right text-lg sm:text-xl text-[#0F2847] leading-loose"
                                  dir="rtl"
                                >
                                  إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةً إِلَّا
                                  وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ
                                </p>
                                <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                                  « Allah possède quatre-vingt-dix-neuf noms — cent moins un.
                                  Quiconque les retient (ahsâhâ) entrera au Paradis. Certes, Allah
                                  est Unique (witr) et Il aime ce qui est impair. »
                                </p>
                                <p className="text-right text-[10px] uppercase tracking-[0.25em] text-[#555] font-sans">
                                  A L - B O U K H Â R I &nbsp; N ° 2 7 3 6 , &nbsp; M U S L I M
                                  &nbsp; N ° 2 6 7 7
                                </p>
                              </div>

                              <p>
                                Le terme central de ce hadith est <em>ahsâhâ</em> — souvent traduit
                                par « mémoriser », mais ce n&apos;est là que la couche la plus
                                superficielle de son sens. Ibn al-Qayyim identifie trois niveaux
                                d&apos;<em>ihsâ&apos;</em> :
                              </p>

                              <div className="p-5 sm:p-6 bg-[#EFECE6] border-l-4 border-[#0F2847] space-y-2">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#0F2847] font-sans font-bold block">
                                  I B N &nbsp; A L - Q A Y Y I M &nbsp; A L - J A W Z I Y Y A &nbsp;
                                  ( 6 9 1 – 7 5 1 &nbsp; H )
                                </span>
                                <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed pt-1">
                                  « Le premier niveau d&apos;ihsâ&apos; est la mémorisation des noms
                                  et leur dénombrement. Le deuxième est la compréhension de leurs
                                  significations et de ce qu&apos;ils impliquent. Le troisième — et
                                  c&apos;est le plus élevé — est d&apos;invoquer Allah par ces noms
                                  dans ses supplications, et de réaliser leurs exigences dans ses
                                  actes. »
                                </p>
                              </div>
                            </div>
                          )}

                          {currentRahmanPage >= 13 && (
                            <div className="relative py-6">
                              <div
                                className="space-y-4 text-sm font-serif text-[#1A1A1A]/50 blur-[5px] select-none pointer-events-none"
                                aria-hidden="true"
                              >
                                <p>
                                  Cette gradation est décisive. Elle explique pourquoi les savants
                                  islamiques n&apos;ont jamais réduit l&apos;étude des noms divins à
                                  un exercice mnémotechnique...
                                </p>
                              </div>

                              <div className="inset-0 flex items-center justify-center">
                                <div className="bg-[#0A1128] text-[#F0EDE8] border-2 border-[#D4A853] rounded-sm p-6 sm:p-8 max-w-md w-full mx-auto text-center shadow-2xl space-y-4">
                                  <div className="w-12 h-12 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/40 text-[#D4A853] flex items-center justify-center mx-auto text-xl">
                                    <FiLock />
                                  </div>
                                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A853] font-sans font-bold block">
                                    Fin de l&apos;Extrait Gratuit (Pages 6 à 12)
                                  </span>
                                  <h4 className="font-heading text-2xl text-[#F0EDE8] font-light">
                                    Débloquez les Pages 13 à 84
                                  </h4>
                                  <p className="text-xs text-[#A0AEC0] font-sans leading-relaxed">
                                    La suite de l&apos;ouvrage (les 12 chapitres complets,
                                    l&apos;exégèse de la Sourate Ar-Rahman, les récits prophétiques
                                    et le programme de dhikr) est réservée aux détenteurs de
                                    l&apos;édition complète.
                                  </p>

                                  <Link
                                    href="/paiement?offre=rahman"
                                    className="w-full py-4 px-6 bg-[#D4A853] hover:bg-[#E8C468] text-[#0A1128] font-bold text-xs uppercase tracking-[0.18em] rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 font-sans"
                                  >
                                    <FiLock className="shrink-0" />
                                    <span>Acquérir le Livre Complet (12,65 €) ➔</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-6 mt-8 border-t border-[#C9A84C]/25 flex items-center justify-between gap-2 font-sans">
                          <button
                            type="button"
                            onClick={goPrevRahmanPage}
                            disabled={currentRahmanPage <= 6}
                            className="px-3.5 py-2 rounded-sm border border-[#0F2847]/20 text-xs font-semibold text-[#0F2847] disabled:opacity-30 hover:bg-[#0F2847] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <FiChevronLeft /> Page précédente
                          </button>

                          <span className="font-serif text-sm font-bold text-[#0F2847]">
                            {currentRahmanPage <= 12 ? currentRahmanPage : "🔒 13 / 84"}
                          </span>

                          {currentRahmanPage <= 12 ? (
                            <button
                              type="button"
                              onClick={goNextRahmanPage}
                              className="px-3.5 py-2 rounded-sm bg-[#0F2847] text-white text-xs font-semibold hover:bg-[#0A1B30] transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              {currentRahmanPage === 12 ? (
                                <>
                                  <span>Page 13 (Suite)</span> <FiLock className="text-[#D4A853]" />
                                </>
                              ) : (
                                <>
                                  <span>Page suivante</span> <FiChevronRight />
                                </>
                              )}
                            </button>
                          ) : (
                            <Link
                              href="/paiement?offre=rahman"
                              className="px-3.5 py-2 rounded-sm bg-[#C59B27] text-[#0A1128] text-xs font-bold hover:bg-[#D4A853] transition-colors flex items-center gap-1.5"
                            >
                              <span>Débloquer (12,65 €)</span> <FiChevronRight />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
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
