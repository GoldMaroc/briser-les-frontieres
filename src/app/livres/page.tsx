"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import {
  FiBookOpen,
  FiLock,
  FiCheck,
  FiX,
  FiShoppingBag,
  FiLayers,
} from "react-icons/fi";

const INVOCATIONS_LIST = [
  {
    category: "Dans la Détresse Extrême",
    arabic:
      "اللَّهُمَّ رَحْمَتَكَ أَرْجُو، فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ",
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
    phonetic:
      "Allâhumma innî as'aluka al-hudâ, wa al-tuqâ, wa al-'afâfa, wa al-ghinâ.",
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
];

export default function Livres() {
  const [activeTab, setActiveTab] = useState<
    "livres" | "invocations" | "videos" | "formations"
  >("livres");

  // Contrôle Recto / Verso pour chaque livre
  const [secretsSide, setSecretsSide] = useState<"recto" | "verso">("recto");
  const [rahmanSide, setRahmanSide] = useState<"recto" | "verso">("recto");

  // Contrôle du Pop-up d'extrait (null | "secrets" | "rahman")
  const [openPopupBook, setOpenPopupBook] = useState<
    null | "secrets" | "rahman"
  >(null);

  // Bloquer le scroll de la page quand le pop-up est ouvert + touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPopupBook(null);
    };
    if (openPopupBook) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPopupBook]);

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-midnight min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Halo de lumière doré circadien */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-gold-muted)_0%,transparent_60%)] pointer-events-none opacity-40 md:opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête de la page */}
        <SectionHeading
          label="Les Publications & Ressources BLF"
          title="Les Livres de Mounir BYAR"
          subtitle="Des ouvrages alliant avec rigueur l'exégèse islamique traditionnelle et les sciences cognitives contemporaines pour restructurer l'esprit et le cœur."
        />

        {/* 4 petits onglets discrets en haut — largeur uniforme */}
        <div className="grid grid-cols-2 sm:inline-grid sm:grid-cols-4 gap-2.5 max-w-xl mx-auto w-full flex-wrap justify-center mb-12 flex">
          {[
            { id: "livres" as const, label: "Livres (2)" },
            { id: "invocations" as const, label: "Invocations" },
            { id: "videos" as const, label: "Vidéos" },
            { id: "formations" as const, label: "Formations" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-5 rounded-sm text-xs uppercase tracking-widest font-body transition-all cursor-pointer border flex items-center justify-center ${
                activeTab === tab.id
                  ? "bg-gold text-stone-950 font-bold border-gold shadow-lg"
                  : "bg-midnight-light/60 text-cream-muted border-border hover:border-gold/40 hover:text-cream"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            ONGLET 1 : LES 2 LIVRES CÔTE À CÔTE (ALIGNEMENT MILLIMÉTRÉ)
            ════════════════════════════════════════════════════════════════════ */}
        {activeTab === "livres" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* ────────────────────────────────────────────────────────────────
                CARTE LIVRE I : Les Secrets du Retour vers Allah
                ──────────────────────────────────────────────────────────────── */}
            <motion.div
              id="secrets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-midnight-light/60 border border-border hover:border-gold/40 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              {/* 1. EN-TÊTE ALIGNÉ (Hauteur fixe identique sur les 2 cartes) */}
              <div className="pb-4 mb-6 border-b border-border/50 lg:h-[124px] flex flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center h-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold bg-gold-muted px-3 border border-gold/25">
                    Ouvrage I • Méthode 30 Jours
                  </span>
                  <div className="inline-flex items-baseline gap-1.5 bg-midnight/90 border border-gold/30 px-3 py-1 rounded-sm shrink-0">
                    <span className="text-lg sm:text-xl font-heading font-bold text-gold">
                      5,90 €
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-cream-muted">
                      PDF + ePub
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl sm:text-[26px] text-cream font-light leading-tight truncate">
                    Les Secrets du Retour vers Allah
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-emerald font-semibold mt-1 truncate">
                    Reprendre sa Prière et sa Souveraineté
                  </p>
                </div>
              </div>

              {/* 2. CORPS ALIGNÉ : COUVERTURE CALÉE EN HAUT + SYNOPSIS ALIGNÉ */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start flex-1 mb-6 pb-6 border-b border-border/50">
                {/* Colonne Couverture (Dimensions fixes 195x285px calée en haut) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-start">
                  <div className="relative w-[195px] h-[285px] rounded-sm overflow-hidden border border-gold/35 shadow-[0_15px_35px_rgba(0,0,0,0.6)] bg-midnight shrink-0">
                    <img
                      src={
                        secretsSide === "recto"
                          ? "/books/secrets-couverture-recto.png"
                          : "/books/secrets-couverture-verso.png"
                      }
                      alt="Les Secrets du Retour vers Allah"
                      className="w-full h-full object-cover object-center block"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 w-[195px] mt-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSecretsSide("recto")}
                      className={`h-7 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all flex items-center justify-center ${
                        secretsSide === "recto"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      Recto
                    </button>
                    <button
                      type="button"
                      onClick={() => setSecretsSide("verso")}
                      className={`h-7 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all flex items-center justify-center ${
                        secretsSide === "verso"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      4e de Couv.
                    </button>
                  </div>
                </div>

                {/* Colonne Texte (Blocs de hauteur fixe alignés horizontalement) */}
                <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-3.5">
                  {/* Citation (Hauteur fixe 44px) */}
                  <div className="min-h-[44px] flex items-center border-l-2 border-gold pl-3">
                    <p className="text-xs text-cream-muted leading-snug font-body italic line-clamp-2">
                      « Ne subissez plus votre quotidien. Reprenez votre prière et votre souveraineté. »
                    </p>
                  </div>

                  {/* Résumé (Hauteur fixe 84px) */}
                  <p className="text-xs sm:text-[13px] text-cream-muted leading-relaxed font-body min-h-[84px] line-clamp-4">
                    Au croisement d&apos;Al-Ghazâlî, d&apos;Ibn al-Qayyim et des sciences cognitives, une ingénierie en <strong className="text-cream">5 chapitres et un protocole de 30 jours</strong> pour briser le cycle des rechutes et réinstaller la prière.
                  </p>

                  {/* 3 Points clés (1 ligne chacun) */}
                  <ul className="space-y-2 text-xs text-cream-muted font-body">
                    <li className="flex items-center gap-2.5 h-5">
                      <FiCheck className="text-gold shrink-0" />
                      <span className="truncate">Le Statut de Khalîfa &amp; l&apos;Anatomie d&apos;At-Tawbah</span>
                    </li>
                    <li className="flex items-center gap-2.5 h-5">
                      <FiCheck className="text-gold shrink-0" />
                      <span className="truncate">As-Salât : algorithme circadien (-27,3% cortisol)</span>
                    </li>
                    <li className="flex items-center gap-2.5 h-5">
                      <FiCheck className="text-gold shrink-0" />
                      <span className="truncate">Design environnemental &amp; Protocole 30 jours</span>
                    </li>
                  </ul>

                  {/* Ligne Méta */}
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-cream-muted">
                    <span className="flex items-center gap-1.5">
                      <FiLayers className="text-gold shrink-0" /> 41 pages (5 chapitres)
                    </span>
                    <span className="text-emerald font-medium">
                      Accès immédiat (PDF &amp; ePub)
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. BOUTONS D'ACTION ALIGNÉS (Hauteur identique h-12) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOpenPopupBook("secrets")}
                  className="h-12 px-4 border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold text-xs uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FiBookOpen className="text-sm shrink-0" />
                  <span>Lire un extrait (2 p.)</span>
                </button>

                <Button
                  href="/paiement?offre=secrets"
                  variant="primary"
                  className="h-12 px-4 text-center justify-center items-center flex font-bold tracking-widest text-xs"
                >
                  Commander (5,90 €)
                </Button>
              </div>
            </motion.div>

            {/* ────────────────────────────────────────────────────────────────
                CARTE LIVRE II : Ar-Rahman — La Mer sans Rivage
                ──────────────────────────────────────────────────────────────── */}
            <motion.div
              id="rahman"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-midnight-light/60 border border-border hover:border-gold/40 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              {/* 1. EN-TÊTE ALIGNÉ (Hauteur fixe identique sur les 2 cartes) */}
              <div className="pb-4 mb-6 border-b border-border/50 lg:h-[124px] flex flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center h-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold bg-gold-muted px-3 border border-gold/25">
                    Ouvrage II • Noms d&apos;Allah (Vol. I)
                  </span>
                  <div className="inline-flex items-baseline gap-1.5 bg-midnight/90 border border-gold/30 px-3 py-1 rounded-sm shrink-0">
                    <span className="text-lg sm:text-xl font-heading font-bold text-gold">
                      12,65 €
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-cream-muted">
                      PDF + ePub
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl sm:text-[26px] text-cream font-light leading-tight truncate">
                    Ar-Rahman : La Mer sans Rivage
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-emerald font-semibold mt-1 truncate">
                    Exégèse du Premier Nom — La Miséricorde Universelle
                  </p>
                </div>
              </div>

              {/* 2. CORPS ALIGNÉ : COUVERTURE CALÉE EN HAUT + SYNOPSIS ALIGNÉ */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start flex-1 mb-6 pb-6 border-b border-border/50">
                {/* Colonne Couverture (Dimensions fixes 195x285px calée en haut) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-start">
                  <div className="relative w-[195px] h-[285px] rounded-sm overflow-hidden border border-gold/35 shadow-[0_15px_35px_rgba(0,0,0,0.6)] bg-midnight shrink-0">
                    <img
                      src={
                        rahmanSide === "recto"
                          ? "/books/rahman-couverture-recto.png"
                          : "/books/rahman-couverture-verso.png"
                      }
                      alt="Ar-Rahman : La Mer sans Rivage"
                      className="w-full h-full object-cover object-center block"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 w-[195px] mt-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setRahmanSide("recto")}
                      className={`h-7 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all flex items-center justify-center ${
                        rahmanSide === "recto"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      Recto
                    </button>
                    <button
                      type="button"
                      onClick={() => setRahmanSide("verso")}
                      className={`h-7 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all flex items-center justify-center ${
                        rahmanSide === "verso"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      4e de Couv.
                    </button>
                  </div>
                </div>

                {/* Colonne Texte (Blocs de hauteur fixe alignés horizontalement) */}
                <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-3.5">
                  {/* Citation (Hauteur fixe 44px) */}
                  <div className="min-h-[44px] flex items-center border-l-2 border-gold pl-3">
                    <p className="text-xs text-cream-muted leading-snug font-body italic line-clamp-2">
                      « La miséricorde qui précède toute chose. Le nom qui n&apos;a jamais cessé de t&apos;aimer. »
                    </p>
                  </div>

                  {/* Résumé (Hauteur fixe 84px) */}
                  <p className="text-xs sm:text-[13px] text-cream-muted leading-relaxed font-body min-h-[84px] line-clamp-4">
                    Une exégèse complète en <strong className="text-cream">5 parties et 12 chapitres</strong> (Tabarî, Qurtubî, Râzî, Ibn Kathîr, Al-Ghazâlî, Ibn al-Qayyim) explorant la racine sacrée <em>R-H-M</em> et la guérison du désespoir.
                  </p>

                  {/* 3 Points clés (1 ligne chacun) */}
                  <ul className="space-y-2 text-xs text-cream-muted font-body">
                    <li className="flex items-center gap-2.5 h-5">
                      <FiCheck className="text-gold shrink-0" />
                      <span className="truncate">Archéologie de la racine R-H-M &amp; Sourate Ar-Rahman</span>
                    </li>
                    <li className="flex items-center gap-2.5 h-5">
                      <FiCheck className="text-gold shrink-0" />
                      <span className="truncate">Les récits prophétiques (Taïf, Yûnus, 100 parties)</span>
                    </li>
                    <li className="flex items-center gap-2.5 h-5">
                      <FiCheck className="text-gold shrink-0" />
                      <span className="truncate">Invocations prophétiques &amp; Programme de Dhikr</span>
                    </li>
                  </ul>

                  {/* Ligne Méta */}
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-cream-muted">
                    <span className="flex items-center gap-1.5">
                      <FiLayers className="text-gold shrink-0" /> 84 pages (12 chapitres)
                    </span>
                    <span className="text-emerald font-medium">
                      Accès immédiat (PDF &amp; ePub)
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. BOUTONS D'ACTION ALIGNÉS (Hauteur identique h-12) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOpenPopupBook("rahman")}
                  className="h-12 px-4 border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold text-xs uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FiBookOpen className="text-sm shrink-0" />
                  <span>Lire un extrait (2 p.)</span>
                </button>

                <Button
                  href="/paiement?offre=rahman"
                  variant="primary"
                  className="h-12 px-4 text-center justify-center items-center flex font-bold tracking-widest text-xs"
                >
                  Commander (12,65 €)
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            ONGLET 2 : INVOCATIONS
            ════════════════════════════════════════════════════════════════════ */}
        {activeTab === "invocations" && (
          <div className="border-t border-border/60 pt-12 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {INVOCATIONS_LIST.map((inv, idx) => (
                <div
                  key={idx}
                  className="bg-midnight-light/60 border border-border rounded-sm p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
                      {inv.category}
                    </span>
                    <p
                      className="text-right text-xl text-cream leading-loose font-serif"
                      dir="rtl"
                    >
                      {inv.arabic}
                    </p>
                    <p className="text-xs text-gold/90 italic font-body">
                      {inv.phonetic}
                    </p>
                    <p className="text-xs text-cream-muted leading-relaxed font-body">
                      {inv.translation}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/40 text-[10px] uppercase tracking-wider text-emerald font-semibold">
                    {inv.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            ONGLET 3 : VIDÉOS
            ════════════════════════════════════════════════════════════════════ */}
        {activeTab === "videos" && (
          <div className="border-t border-border/60 pt-14 pb-12 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block">
              Médiathèque BLF
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-cream font-light">
              Capsules Vidéo & Rappels
            </h3>
            <p className="text-sm text-cream-muted font-body leading-relaxed">
              Les capsules vidéo et analyses de Mounir BYAR seront publiées dans
              cet espace très prochainement.
            </p>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            ONGLET 4 : FORMATIONS
            ════════════════════════════════════════════════════════════════════ */}
        {activeTab === "formations" && (
          <div className="border-t border-border/60 pt-14 pb-12 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block">
              Académie BLF
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-cream font-light">
              Formations & Programmes Digitaux
            </h3>
            <p className="text-sm text-cream-muted font-body leading-relaxed">
              Nos formations structurées en ligne sont actuellement en
              préparation. Vous pouvez dès maintenant vous inscrire sur liste
              d&apos;attente.
            </p>
            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                className="px-8 py-3 text-xs"
              >
                Être informé de l&apos;ouverture →
              </Button>
            </div>
          </div>
        )}

        {/* Section Incitation au Mentorat Privé — Étape 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 text-center border-t border-border/60 pt-14 sm:pt-16 space-y-5"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">
            ➔ Passer à la phase supérieure
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-light text-cream tracking-wide">
            Accompagnement & Mentorat Privé
          </h3>
          <p className="text-xs sm:text-sm text-cream-muted max-w-xl mx-auto font-body leading-relaxed">
            La lecture des ouvrages est votre point d&apos;entrée. Si vous
            aspirez à un accompagnement personnalisé (Audit diagnostique,
            Protocole 30 Jours, 3 Mois ou Mentorat), découvrez nos formules.
          </p>
          <div className="flex justify-center pt-2">
            <Button
              variant="primary"
              href="/offres"
              className="shadow-2xl shadow-stone-950/20 font-bold tracking-widest px-10 py-4"
            >
              Découvrir les Accompagnements →
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          POP-UP D'EXTRAIT : LIVRE OUVERT SUR 2 PAGES PLEINES PARFAITEMENT ALIGNÉES
          ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {openPopupBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenPopupBook(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl bg-midnight border border-gold/40 rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
            >
              {/* Barre supérieure du Pop-up */}
              <div className="px-5 py-3.5 bg-midnight-light border-b border-border flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FiBookOpen className="text-gold shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-gold font-bold truncate">
                    {openPopupBook === "secrets"
                      ? "Extrait — Les Secrets du Retour vers Allah (Double Page)"
                      : "Extrait — Ar-Rahman : La Mer sans Rivage (Double Page)"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenPopupBook(null)}
                  className="px-3 py-1.5 rounded-sm bg-midnight border border-border hover:border-gold text-cream-muted hover:text-cream text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                >
                  <FiX className="text-sm" /> Fermer
                </button>
              </div>

              {/* Corps du Pop-up : Double Page de Lecture Pleine (Livre Ouvert) */}
              <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 bg-midnight">
                {openPopupBook === "secrets" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-[#FAF8F5] text-[#1A1A1A] rounded-sm shadow-2xl border-2 border-[#C9A84C]/40 overflow-hidden relative">
                    {/* Pliure centrale du livre sur grand écran */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/5 via-black/15 to-black/5 pointer-events-none z-10" />

                    {/* PAGE DE GAUCHE (PAGE PLEINE 1) */}
                    <div className="p-6 sm:p-9 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#C9A84C]/30 flex flex-col justify-between font-serif text-sm sm:text-[15px] leading-[1.8] text-justify select-none">
                      <div className="space-y-4">
                        <div className="h-7 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#8C7A5B] font-sans border-b border-[#C9A84C]/25">
                          <span>Les Secrets du Retour vers Allah</span>
                          <span className="font-bold text-[#143D2B]">
                            Page I • L&apos;Ingénierie
                          </span>
                        </div>

                        <div className="min-h-[76px] flex flex-col justify-center text-center py-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7331] font-sans font-bold block">
                            INTRODUCTION — EXTRAIT SÉLECTIONNÉ
                          </span>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#143D2B] mt-1">
                            La Crise de la Déconnexion &amp; l&apos;Architecture Mentale
                          </h3>
                        </div>

                        <p>
                          Avant d&apos;entrer dans cet ouvrage, vous devez savoir une chose : ce livre ne vous demandera pas plus d&apos;effort. Il vous proposera <strong>moins de combat</strong>. Reprendre sa prière n&apos;est pas une question de volonté héroïque, mais une question d&apos;<strong>architecture mentale</strong>.
                        </p>

                        <div className="p-4 bg-[#F4F1EA] border-l-4 border-[#C59B27] min-h-[96px] flex flex-col justify-center">
                          <p className="italic text-[#143D2B] text-xs sm:text-sm leading-relaxed">
                            « La souveraineté personnelle ne se définit nullement par une domination exercée sur autrui, mais par la maîtrise absolue du soi (Nafs) face aux dépendances qui aliènent l&apos;homme moderne. »
                          </p>
                        </div>

                        <p>
                          Le cœur humain (<em>Qalb</em>), organe central de la contemplation, est aujourd&apos;hui bombardé de stimuli éphémères générant une véritable entropie spirituelle (<em>Ghaflah</em>). Le retour à Allah (<em>At-Tawbah</em>) devient dès lors un processus méthodique, accueilli par une joie divine immense : <em>« Allah est plus heureux du repentir de Son serviteur que l&apos;un de vous ne l&apos;est de retrouver son chameau perdu dans le désert. »</em> (Muslim, 2747).
                        </p>
                      </div>

                      <div className="pt-3 mt-6 border-t border-[#C9A84C]/25 flex items-center justify-between text-[11px] text-[#8C7A5B] font-sans">
                        <span>Mounir BYAR</span>
                        <span className="font-bold text-[#143D2B]">— 10 —</span>
                      </div>
                    </div>

                    {/* PAGE DE DROITE (PAGE PLEINE 2) */}
                    <div className="p-6 sm:p-9 lg:p-10 flex flex-col justify-between font-serif text-sm sm:text-[15px] leading-[1.8] text-justify select-none">
                      <div className="space-y-4">
                        <div className="h-7 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#8C7A5B] font-sans border-b border-[#C9A84C]/25">
                          <span>Chapitre Premier</span>
                          <span className="font-bold text-[#143D2B]">
                            Page II • Le Statut de Khalîfa
                          </span>
                        </div>

                        <div className="min-h-[76px] flex flex-col justify-center text-center py-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7331] font-sans font-bold block">
                            CHAPITRE I — EXTRAIT SÉLECTIONNÉ
                          </span>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#143D2B] mt-1">
                            Le Statut de Khalîfa : L&apos;Honneur de la Responsabilité
                          </h3>
                        </div>

                        <p>
                          Avant d&apos;aborder la mécanique du repentir ou de la prière, il est impératif de comprendre la position ontologique de l&apos;être humain. Allah a conféré à l&apos;homme un honneur cosmique en le désignant comme <em>Khalîfa</em> — vicaire et dépositaire — sur terre :
                        </p>

                        <div className="p-4 bg-[#F4F1EA] border-l-4 border-[#C59B27] min-h-[96px] flex flex-col justify-center space-y-1.5">
                          <p
                            className="text-right text-base sm:text-lg text-[#143D2B] leading-normal"
                            dir="rtl"
                          >
                            وَإِذْ قَالَ رَبُّكَ لِلْمَلَٰٓئِكَةِ إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ خَلِيفَةً
                          </p>
                          <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                            « Et lorsque ton Seigneur dit aux Anges : &ldquo;Je vais établir sur la terre un successeur (Khalîfa)&rdquo;... » (Sourate Al-Baqara, 2 : 30)
                          </p>
                        </div>

                        <p>
                          À l&apos;inverse d&apos;Iblîs qui blâma le destin, lorsque Adam et Ève commirent l&apos;erreur, leur réaction fut la fondation même de la souveraineté humaine : la prise de responsabilité radicale (<em>« Seigneur, nous nous sommes fait du tort à nous-mêmes »</em>, Coran 7:23). C&apos;est sur ce socle que la prière (<em>As-Salât</em>) agit comme un algorithme circadien (-27,3% de cortisol) qui restaure la gouvernance du cœur...
                        </p>
                      </div>

                      <div className="pt-3 mt-6 border-t border-[#C9A84C]/25 flex items-center justify-between text-[11px] text-[#8C7A5B] font-sans">
                        <span>Suite (41 pages) dans l&apos;édition complète</span>
                        <span className="font-bold text-[#143D2B]">— 12 —</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-[#FAF8F5] text-[#1A1A1A] rounded-sm shadow-2xl border-2 border-[#C9A84C]/40 overflow-hidden relative">
                    {/* Pliure centrale du livre sur grand écran */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/5 via-black/15 to-black/5 pointer-events-none z-10" />

                    {/* PAGE DE GAUCHE (PAGE PLEINE 1 — AR-RAHMAN) */}
                    <div className="p-6 sm:p-9 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#C9A84C]/30 flex flex-col justify-between font-serif text-sm sm:text-[15px] leading-[1.8] text-justify select-none">
                      <div className="space-y-4">
                        <div className="h-7 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#8C7A5B] font-sans border-b border-[#C9A84C]/25">
                          <span>Ar-Rahman — La Mer sans Rivage</span>
                          <span className="font-bold text-[#0F2847]">
                            Page I • La Science du Nom
                          </span>
                        </div>

                        <div className="min-h-[76px] flex flex-col justify-center text-center py-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7331] font-sans font-bold block">
                            CHAPITRE I — EXTRAIT SÉLECTIONNÉ
                          </span>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F2847] mt-1">
                            Les Asma ul Husna &amp; L&apos;Océan d&apos;Ar-Rahman
                          </h3>
                        </div>

                        <p>
                          Ce livre est une méditation approfondie, nourrie des grands savants de l&apos;islam, autour d&apos;un seul nom divin : <strong>Ar-Rahman</strong>. Pourquoi un seul ? Parce que chaque nom d&apos;Allah mérite un livre, et qu&apos;Ar-Rahman contient à lui seul une cosmologie entière.
                        </p>

                        <div className="p-4 bg-[#F4F1EA] border-l-4 border-[#C59B27] min-h-[96px] flex flex-col justify-center space-y-1.5">
                          <p
                            className="text-right text-base sm:text-lg text-[#0F2847] leading-normal"
                            dir="rtl"
                          >
                            وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا
                          </p>
                          <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                            « Les plus beaux Noms appartiennent à Allah. Invoquez-Le par ces Noms. » (Sourate Al-A&apos;râf, 7 : 180)
                          </p>
                        </div>

                        <p>
                          La tradition islamique a développé une science rigoureuse autour des <em>Asma ul Husna</em>. Selon des maîtres de la stature d&apos;Al-Ghazâlî et d&apos;Ibn al-Qayyim, elle est <strong>la clé de voûte de toute vie spirituelle sérieuse</strong> : on ne peut aimer véritablement ni placer sa confiance absolue en Celui que l&apos;on ne connaît pas.
                        </p>
                      </div>

                      <div className="pt-3 mt-6 border-t border-[#C9A84C]/25 flex items-center justify-between text-[11px] text-[#8C7A5B] font-sans">
                        <span>Mounir BYAR</span>
                        <span className="font-bold text-[#0F2847]">— 11 —</span>
                      </div>
                    </div>

                    {/* PAGE DE DROITE (PAGE PLEINE 2 — AR-RAHMAN) */}
                    <div className="p-6 sm:p-9 lg:p-10 flex flex-col justify-between font-serif text-sm sm:text-[15px] leading-[1.8] text-justify select-none">
                      <div className="space-y-4">
                        <div className="h-7 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#8C7A5B] font-sans border-b border-[#C9A84C]/25">
                          <span>Chapitres I &amp; II</span>
                          <span className="font-bold text-[#0F2847]">
                            Page II • Les Trois Degrés
                          </span>
                        </div>

                        <div className="min-h-[76px] flex flex-col justify-center text-center py-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7331] font-sans font-bold block">
                            EXÉGÈSE &amp; TRADITION — EXTRAIT SÉLECTIONNÉ
                          </span>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F2847] mt-1">
                            Vivre et Respirer par le Nom Ar-Rahman
                          </h3>
                        </div>

                        <p>
                          Dans le célèbre hadith rapporté par Al-Boukhâri et Muslim : <em>« Allah possède quatre-vingt-dix-neuf noms. Quiconque les retient (ahsâhâ) entrera au Paradis. »</em> Le terme central <em>ahsâhâ</em> dépasse largement la simple mémorisation :
                        </p>

                        <div className="p-4 bg-[#EFECE6] border-l-4 border-[#0F2847] min-h-[96px] flex flex-col justify-center space-y-1">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#0F2847] font-sans font-bold block">
                            IBN AL-QAYYIM AL-JAWZIYYA (691–751 H)
                          </span>
                          <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                            « Le premier niveau est de dénombrer ces Noms ; le deuxième est de comprendre leurs significations ; le troisième est d&apos;invoquer Allah par eux et d&apos;incarner leurs exigences dans ses actes. »
                          </p>
                        </div>

                        <p>
                          Dans la langue arabe, <strong>Ar-Rahman</strong> (schème d&apos;intensité <em>Fa&lsquo;lân</em>) désigne l&apos;océan débordant de la Miséricorde qui englobe l&apos;univers entier avant même que nous n&apos;ayons mérité quoi que ce soit. Comprendre ce Nom à travers la racine sacrée <em>R-H-M</em> et ses 57 occurrences coraniques, c&apos;est guérir définitivement le cœur du désespoir...
                        </p>
                      </div>

                      <div className="pt-3 mt-6 border-t border-[#C9A84C]/25 flex items-center justify-between text-[11px] text-[#8C7A5B] font-sans">
                        <span>Suite (84 pages) dans l&apos;édition complète</span>
                        <span className="font-bold text-[#0F2847]">— 12 —</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Barre inférieure du Pop-up : Appel à l'action pour commander le livre complet */}
              <div className="px-5 py-4 bg-midnight-light border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-2 text-xs text-cream-muted">
                  <FiLock className="text-gold shrink-0" />
                  <span>
                    {openPopupBook === "secrets"
                      ? "Débloquez l'édition intégrale (41 pages • PDF + ePub) immédiatement après commande."
                      : "Débloquez l'édition intégrale (84 pages • 12 chapitres • PDF + ePub) immédiatement après commande."}
                  </span>
                </div>

                <Link
                  href={
                    openPopupBook === "secrets"
                      ? "/paiement?offre=secrets"
                      : "/paiement?offre=rahman"
                  }
                  className="w-full sm:w-auto px-6 py-3 bg-gold hover:bg-gold/90 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 shrink-0 transition-all shadow-lg"
                >
                  <FiShoppingBag />
                  <span>
                    {openPopupBook === "secrets"
                      ? "Commander le Livre Complet (5,90 €) →"
                      : "Commander le Livre Complet (12,65 €) →"}
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
