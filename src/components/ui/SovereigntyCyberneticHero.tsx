"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";
import ContinuousMarquee from "@/components/ui/ContinuousMarquee";

export default function SovereigntyCyberneticHero() {
  const VARIABLE_ACCOMPAGNES = "+1 200 Dirigeants & Croyants";
  const VARIABLE_AVIS = "Note 4,9/5 sur Avis Vérifiés (43 Récits)";
  const VARIABLE_METHODE = "Doctrine C.O.M.E.S. • Livres & Accompagnement";

  const [selectedStation, setSelectedStation] = useState<number>(0);

  const stationsData = [
    {
      id: 0,
      code: "01. QIYÂM",
      title: "L'Alignement Rachidien & Focus Préfrontal",
      tag: "VIGILANCE SUPRÊME",
      metric: "+35% FOCUS",
      desc: "Immobilité absolue et rupture totale avec la dispersion mentale. Le cortex préfrontal reprend l'autorité immédiate sur les impulsions et distractions périphériques.",
      image: "/images/sanctuaire/muslim_qiyam_focus.jpg",
      effect: "Rétablissement de la volonté active",
    },
    {
      id: 1,
      code: "02. RUKÛ'",
      title: "L'Inclinaison & Rupture d'Ego",
      tag: "BASCULE VAGALE",
      metric: "-25% TENSION",
      desc: "Décompression active des disques lombaires et soumission physique délibérée. Le système nerveux bascule en mode parasympathique, apaisant le rythme cardiaque.",
      image: "/images/sanctuaire/muslim_intellectual_mounir.jpg",
      effect: "Neutralisation de la réactivité émotionnelle",
    },
    {
      id: 2,
      code: "03. SUJÛD",
      title: "Le Sommet Neurocognitif & Inversion du Stress",
      tag: "DÉCHARGE DU CORTISOL",
      metric: "-40% CORTISOL",
      desc: "L'unique station où le cœur surplombe le lobe frontal. Afflux cérébral massif, décharge allostatique et anéantissement des ruminations anxieuses en 90 secondes.",
      image: "/images/sanctuaire/muslim_sujud_light.jpg",
      effect: "Clarté décisionnelle et anesthésie du Nafs",
    },
    {
      id: 3,
      code: "04. TASHAHHUD",
      title: "L'Intégration Somato-Sensorielle & Souveraineté",
      tag: "HOMÉOSTASIE DÉCISIONNELLE",
      metric: "ALIGNEMENT",
      desc: "Post-assise stable, engagement solennel et clarté d'intention. La séance se conclut par la projection sereine et déterminée vers les responsabilités du monde.",
      image: "/images/sanctuaire/photo_sanctuary_dawn_editorial.jpg",
      effect: "Retour au monde réel en Khalifa accompli",
    },
  ];

  return (
    <div className="relative w-full bg-[#070707] text-white overflow-hidden selection:bg-[#FF758C]/30">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO PRINCIPAL (EXACT KÖM AGENCE COMPOSITION)
          - Fond noir absolu avec halos volumétriques multicolores
          - Titre avec flèche diagonale ↗ et gradient dynamique
          - Formes 3D / visuels d'ambiance
          - Bouton pilule vibrant ↗ AUDIT GRATUIT (3 MIN)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-12 sm:pt-16 lg:pt-20 pb-16 px-4 sm:px-6 lg:px-12 border-b border-white/10">
        
        {/* Halos d'ambiance volumétriques KÖM (Purple, Magenta, Sunset) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[500px] bg-gradient-to-r from-[#FF758C]/20 via-[#FF7EB3]/15 to-[#FEE140]/15 rounded-full filter blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#9333EA]/15 rounded-full filter blur-[130px] pointer-events-none" />

        {/* CONTENU CENTRAL DU HERO */}
        <div className="max-w-[1280px] w-full mx-auto flex flex-col items-start text-left relative z-10 my-auto">
          
          {/* Eyebrow Pillule KÖM Style */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FF758C]">
              PARIS • REIMS — PAR MOUNIR BYAR
            </span>
            <span className="text-white/20 font-mono text-xs">|</span>
            <span className="font-mono text-[10px] text-white/60 tracking-wider hidden sm:inline">
              CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
            </span>
          </motion.div>

          {/* TITRE MONUMENTAL AVEC FLÈCHE ↗ & GRADIENT DYNAMIQUE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full space-y-3 sm:space-y-4 max-w-4xl"
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-white">
              ↗ Reprenez le contrôle de{" "}
              <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
                votre souveraineté.
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-white/80 font-sans font-medium leading-relaxed max-w-2xl pt-2">
              C&apos;est quand <em className="text-white not-italic font-bold">la dernière fois</em> que votre prière a été un rempart inébranlable contre la charge mentale et l&apos;inertie ?
            </p>
          </motion.div>

          {/* SOUS-TITRE CADRÉ */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-sm sm:text-base text-white/60 font-sans leading-[1.7]"
          >
            La prière n&apos;est pas un rituel passif. C&apos;est le protocole neurobiologique suprême révélé à l&apos;humanité pour dompter le cortisol, briser la procrastination (<em className="text-white not-italic font-medium">At-Taswîf</em>) et commander son existence.
          </motion.p>

          {/* DUO DE BOUTONS D'ACTION (KÖM GRADIENT PILL) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/audit"
              data-cursor="pointer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[54px] rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(255,117,140,0.4)] hover:shadow-[0_0_50px_rgba(255,117,140,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 text-center"
            >
              <span>↗ FAIRE L&apos;AUDIT GRATUIT (3 MIN)</span>
            </Link>

            <Link
              href="/rendez-vous"
              data-cursor="book"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[54px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/40 text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 shadow-sm text-center"
            >
              <span>📅 PRENDRE RENDEZ-VOUS</span>
            </Link>
          </motion.div>

          {/* PREUVE SOCIALE STATUTAIRE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 pt-6 border-t border-white/10 w-full max-w-2xl flex flex-wrap items-center gap-6 text-xs font-mono text-white/50"
          >
            <div className="inline-flex items-center gap-2">
              <span className="text-[#10B981]">✓</span>
              <span className="text-white/80 font-medium">{VARIABLE_ACCOMPAGNES}</span>
            </div>

            <Link href="/temoignages" className="inline-flex items-center gap-2 hover:text-[#FF758C] transition-colors group">
              <span className="text-[#FF758C]">★★★★★</span>
              <span className="text-white/80 group-hover:underline font-medium">{VARIABLE_AVIS}</span>
            </Link>

            <div className="inline-flex items-center gap-2">
              <span className="text-[#FF758C]">✦</span>
              <span className="text-white/80 font-medium">{VARIABLE_METHODE}</span>
            </div>
          </motion.div>

        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LE GRAND SHOWREEL C.O.M.E.S. (KOM SCREENSHOT 2)
          - Monumental title avec pilule visuelle interactive
          - Baseline « Life is too short to be distracted »
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#050505] overflow-hidden text-center">
        <div className="max-w-[1240px] mx-auto space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-3 justify-center flex-wrap">
            <span className="font-heading font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase select-none">
              LE PROTOCOLE
            </span>

            {/* Pilule visuelle animée inspirée du SHOWREEL de KÖM */}
            <div className="relative inline-flex items-center justify-center w-36 sm:w-56 md:w-64 h-14 sm:h-20 md:h-24 rounded-full overflow-hidden border border-white/20 bg-white/5 shadow-[0_0_40px_rgba(255,117,140,0.3)] group hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/sanctuaire/muslim_sujud_light.jpg"
                alt="Station Sujûd Souverain"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
              <div className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/90 text-black flex items-center justify-center text-sm font-bold shadow-lg">
                ▶
              </div>
            </div>

            <span className="font-heading font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase select-none">
              C.O.M.E.S.
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/60 tracking-wider">
            ↗ Reprenez le commandement absolu de votre journée.
          </p>

        </div>
      </section>

      {/* MARQUEE CONTINU KÖM STYLE */}
      <ContinuousMarquee speed={30} className="border-white/10 bg-[#090909]" />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : NOS DERNIÈRES PÉPITES // LES 4 STATIONS (KOM SCREENSHOT 3)
          - Onglets horizontaux de filtre (Toutes les stations, Qiyâm, Rukû', Sujûd, Tashahhud)
          - Grandes cartes 2 colonnes avec visuels immersifs et pastille flèche ↗
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FF758C] block mb-2">
                02 // GÉOMÉTRIE SOMATO-SENSORIELLE
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                ↗ Nos piliers de{" "}
                <span className="bg-gradient-to-r from-[#FF758C] to-[#FEE140] bg-clip-text text-transparent">
                  souveraineté
                </span>
              </h2>
            </div>
            
            {/* Onglets de filtres KÖM Style */}
            <div className="flex flex-wrap gap-2">
              {["Toutes les stations", "01. Qiyâm", "02. Rukû'", "03. Sujûd", "04. Tashahhud"].map((tab, idx) => {
                const isSelected = selectedStation === (idx === 0 ? -1 : idx - 1);
                return (
                  <button
                    key={tab}
                    type="button"
                    data-cursor="pointer"
                    onClick={() => setSelectedStation(idx === 0 ? -1 : idx - 1)}
                    className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-black shadow-md scale-105"
                        : "bg-white/5 text-white/70 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grille 2 colonnes de grandes cartes KÖM (Grandes tuiles avec visuels) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(selectedStation === -1 ? stationsData : [stationsData[selectedStation]]).map((station) => (
              <div
                key={station.code}
                data-cursor="view"
                data-cursor-text="EXPLORER ↗"
                className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-white/30 transition-all duration-500 flex flex-col justify-between shadow-2xl"
              >
                {/* Image haute résolution immersive */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={station.image}
                    alt={station.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
                  
                  {/* Badge en haut à gauche */}
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#FF758C] font-bold">
                    <span>{station.code}</span>
                  </div>

                  {/* Bouton circulaire avec flèche ↗ en haut à droite (Signature KÖM) */}
                  <div className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-lg font-bold group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    ↗
                  </div>
                </div>

                {/* Contenu textuel de la carte */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981] px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                      {station.metric}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      {station.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white group-hover:text-[#FF758C] transition-colors">
                    {station.title}
                  </h3>

                  <p className="text-sm text-white/70 font-sans leading-relaxed">
                    {station.desc}
                  </p>

                  <div className="pt-2 text-xs font-mono text-white/50 border-t border-white/10 flex items-center justify-between">
                    <span>{station.effect}</span>
                    <span className="text-[#FF758C] group-hover:translate-x-1 transition-transform">En savoir plus →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : ILS NOUS FONT CONFIANCE (KOM SCREENSHOT 4)
          - Conteneur dépoli sombre avec statistiques et typographies
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#050505]">
        <div className="max-w-[1240px] mx-auto space-y-12 text-center">
          
          <div className="space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              ↗ Ils nous font{" "}
              <span className="bg-gradient-to-r from-[#FEE140] to-[#FA709A] bg-clip-text text-transparent">
                confiance
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans">
              + de 1 200 Musulmans accompagnés (entrepreneurs, médecins, ingénieurs, cadres et croyants exigeants) !
            </p>
          </div>

          {/* Carte dépolie KÖM Style avec grille de logos / repères */}
          <div className="p-8 sm:p-14 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center text-center font-mono">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">98%</span>
                <p className="text-xs text-white/50">Constance retrouvée</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#FF758C] font-heading">-40%</span>
                <p className="text-xs text-white/50">Cortisol matinal</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#10B981] font-heading">4,9/5</span>
                <p className="text-xs text-white/50">Avis vérifiés (43 récits)</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#FEE140] font-heading">10 Ans</span>
                <p className="text-xs text-white/50">Recherche & Exégèse</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 : LES OFFRES DU CABINET BLF (KOM SCREENSHOT 5)
          - 3 colonnes de cartes avec prix et boutons ↗ LET'S GO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#070707]">
        <div className="max-w-[1280px] mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              ↗ Les offres{" "}
              <span className="bg-gradient-to-r from-[#FA709A] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
                du Cabinet BLF
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans">
              Ce qu&apos;on aime faire dans la vie ? Transformer vos habitudes et détruire la procrastination !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* OFFRE 1 : LES LIVRES */}
            <div 
              data-cursor="view"
              data-cursor-text="LIVRES ↗"
              className="p-8 sm:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 block">
                    ACCÈS IMMÉDIAT EN AUTONOMIE
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                    Les Traités Fondateurs
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Comprenez l&apos;architecture sacrée de chaque geste.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-white/40 font-mono block">À partir de</span>
                  <span className="font-heading font-extrabold text-4xl text-white">5,90 €</span>
                </div>

                <ul className="space-y-2 text-xs text-white/70 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Les Secrets de la Salât (320p)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Sourate Ar-Rahmân : Clés de Gratitude
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Format eBook ou Broché livré
                  </li>
                </ul>
              </div>

              <Link
                href="/livres"
                className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-extrabold text-xs uppercase tracking-wider text-center block transition-all shadow-md"
              >
                ↗ VOIR LES LIVRES
              </Link>
            </div>

            {/* OFFRE 2 : PROTOCOLE 30 JOURS */}
            <div 
              data-cursor="view"
              data-cursor-text="30 JOURS ✦"
              className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-[#FF758C]/60 hover:border-[#FF758C] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-8 shadow-[0_0_40px_rgba(255,117,140,0.15)] relative"
            >
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-black font-mono text-[9px] font-extrabold uppercase tracking-widest shadow-md">
                LE PLUS POPULAIRE
              </span>

              <div className="space-y-6 pt-2">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF758C] block">
                    URGENCE & RÉALIGNEMENT
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                    Protocole 30 Jours
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Faites de la prière votre tour de contrôle !
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-white/40 font-mono block">À partir de</span>
                  <span className="font-heading font-extrabold text-4xl text-white">612,70 €</span>
                </div>

                <ul className="space-y-2 text-xs text-white/70 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF758C] font-bold">✓</span> 4 Séances individuelles de travail
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF758C] font-bold">✓</span> Suivi messagerie privée 5j/7
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF758C] font-bold">✓</span> Routines anti-procrastination
                  </li>
                </ul>
              </div>

              <Link
                href="/offres"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider text-center block hover:scale-105 transition-transform shadow-lg"
              >
                ↗ LET&apos;S GO
              </Link>
            </div>

            {/* OFFRE 3 : ACCOMPAGNEMENT 9 MOIS */}
            <div 
              data-cursor="view"
              data-cursor-text="9 MOIS ✦"
              className="p-8 sm:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 block">
                    HAUTE DIRECTION & MENTORAT
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                    Protocole 9 Mois
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Compagnonnage direct avec Mounir Byar.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-white/40 font-mono block">Format</span>
                  <span className="font-heading font-extrabold text-4xl text-white">Sur mesure</span>
                </div>

                <ul className="space-y-2 text-xs text-white/70 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Compagnonnage individuel direct
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Ligne prioritaire continue
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Assomption du mandat de Khalifa
                  </li>
                </ul>
              </div>

              <Link
                href="/candidature"
                className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-extrabold text-xs uppercase tracking-wider text-center block transition-all shadow-md"
              >
                ↗ DÉPOSER CANDIDATURE
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 : L'AGENDA DOCTOLIB (INTEGRATION LUXURY DARK)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#050505]">
        <div className="max-w-[1240px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              • PRISE DE RENDEZ-VOUS DIRECTE •
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              ↗ Agenda officiel &{" "}
              <span className="bg-gradient-to-r from-[#FF758C] to-[#FEE140] bg-clip-text text-transparent">
                créneaux en direct
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans leading-relaxed">
              Sélectionnez votre créneau pour un entretien téléphonique direct ou une consultation présentielle en cabinet.
            </p>
          </div>

          <AgendaDoctolib />

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 : ILS PEUVENT EN TÉMOIGNER (KOM SCREENSHOT 7)
          - Grid d'avis avec étoiles en rose/gold et lien vers la page /temoignages
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#080808]">
        <div className="max-w-[1240px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              ↗ Ils peuvent en{" "}
              <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
                témoigner
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans">
              Nos clients ne sont pas seulement satisfaits, ils deviennent les ambassadeurs de leur propre souveraineté.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nom: "Yacine B.",
                role: "Entrepreneur & Ingénieur",
                stars: "★★★★★",
                score: "85%",
                texte: "J'étais complètement débordé, avec une prière saccadée et un stress permanent. En 30 jours, le protocole m'a redonné la maîtrise de mon temps et une concentration inaltérable.",
              },
              {
                nom: "Dr. Sliman M.",
                role: "Médecin Généraliste",
                stars: "★★★★★",
                score: "92%",
                texte: "La neurobiologie du Sujûd enseignée par Mounir Byar est révolutionnaire. Ce n'est plus une contrainte, mais mon arme de décharge allostatique 5 fois par jour.",
              },
              {
                nom: "Mehdi K.",
                role: "Cadre Dirigeant",
                stars: "★★★★★",
                score: "88%",
                texte: "L'inertie et l'At-Taswîf me rongeaient. Mounir Byar m'a aidé à sanctuariser mon agenda et à assumer pleinement ma responsabilité. Inestimable.",
              },
            ].map((review) => (
              <div 
                key={review.nom}
                data-cursor="view"
                data-cursor-text="AVIS ✦"
                className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF758C] text-sm font-mono">{review.stars}</span>
                    <span className="text-[10px] font-mono font-bold text-[#10B981] px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                      Audit : {review.score}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">{review.nom}</h4>
                    <p className="text-xs text-white/50">{review.role}</p>
                  </div>

                  <p className="text-sm text-white/80 font-sans leading-relaxed">
                    « {review.texte} »
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/40">
                  Protocole validé • Vérifié
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              href="/temoignages"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              <span>↗ VOIR LES 43 RÉCITS DE TRANSFORMATION VÉRIFIÉS</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 : BANNIÈRE CONVAINCU.E KÖM STYLE (KOM SCREENSHOT 8)
          - Boîte dépolie avec texte accrocheur et bouton gradient
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-4xl mx-auto p-10 sm:p-16 rounded-[36px] bg-white/[0.03] border border-white/15 backdrop-blur-2xl text-center space-y-8 shadow-[0_0_80px_rgba(255,117,140,0.12)]">
          
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Convaincu.e par ce que{" "}
            <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
              vous venez de découvrir ?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto font-sans leading-relaxed">
            Rejoignez les croyants qui ont cessé de subir la charge mentale et ont instauré la Salât comme pivot décisionnel suprême.
          </p>

          <div>
            <Link
              href="/audit"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(255,117,140,0.4)] hover:scale-105 transition-transform"
            >
              <span>↗ FAIRE L&apos;AUDIT GRATUIT EN 3 MIN</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
