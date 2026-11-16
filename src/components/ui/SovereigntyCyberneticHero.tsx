"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SalatStageNode {
  title: string;
  metric: string;
  description: string;
  coords: { x: number; y: number }; // Percentage for positioning
  color: "emerald" | "gold" | "cyan" | "amber";
}

interface SalatStage {
  id: string;
  stepNumber: string;
  postureArabic: string;
  postureFrench: string;
  subtitle: string;
  angle: string;
  angleValue: number;
  image: string;
  keyMetric: string;
  metricLabel: string;
  sacredVerse: string;
  scientificInsight: string;
  nodes: SalatStageNode[];
}

const salatStages: SalatStage[] = [
  {
    id: "qiyam",
    stepNumber: "01",
    postureArabic: "QIYÂM",
    postureFrench: "DEBOUT",
    subtitle: "Alignement Vertébral & Ancrage Cognitif",
    angle: "180°",
    angleValue: 180,
    image: "/images/salat_cycle/salat_01_qiyam_debout.jpg",
    keyMetric: "+35% FOCUS PRÉFRONTAL",
    metricLabel: "IMMUNITÉ COGNITIVE & ANCRAGE RADICAL",
    sacredVerse: "« Tiens-toi debout avec droiture pour la Vérité »",
    scientificInsight: "La station debout rigoureuse désactive les micro-mouvements distractifs et synchronise l'attention sélective sur un point focal unique. Rupture immédiate avec la surcharge sensorielle et l'entropie numérique.",
    nodes: [
      { title: "Cortex Préfrontal", metric: "DORSOLATÉRAL ACTIF", description: "Focalisation attentionnelle et extinction du multitâche", coords: { x: 50, y: 15 }, color: "emerald" },
      { title: "Thorax & Plexus", metric: "MAIN SUR LE CŒUR", description: "Fermeture du circuit proprioceptif et apaisement respiratoire", coords: { x: 52, y: 35 }, color: "cyan" },
      { title: "Axe Vertébral 180°", metric: "TENSION RACHIDIENNE : 0", description: "Alignement postural éliminant les compensations posturales", coords: { x: 48, y: 45 }, color: "gold" },
      { title: "Ancrage Podal", metric: "STABILITÉ TERRESTRE", description: "Enracinement au sol rétablissant la proprioception", coords: { x: 50, y: 88 }, color: "emerald" }
    ]
  },
  {
    id: "ruku",
    stepNumber: "02",
    postureArabic: "RUKÛ'",
    postureFrench: "INCLINÉ",
    subtitle: "Flexion Rachidienne & Désengagement de l'Ego",
    angle: "90°",
    angleValue: 90,
    image: "/images/salat_cycle/salat_02_ruku_incline.jpg",
    keyMetric: "-15 BPM DÉCÉLÉRATION VAGALE",
    metricLabel: "DÉCOMPRESSION DU RACHIS & SOUMISSION CONSCIENTE",
    sacredVerse: "« Et inclinez-vous avec ceux qui s'inclinent »",
    scientificInsight: "L'inclinaison à 90° dos plat étire toute la chaîne postérieure et décompresse les vertèbres lombaires. L'inversion hydrostatique partielle prépare le cerveau à l'afflux sanguin tout en soumettant consciemment la volonté de l'ego.",
    nodes: [
      { title: "Rachis Lombaire", metric: "DÉCOMPRESSION DISCO-RACHIDIENNE", description: "Traction axiale douce éliminant les spasmes posturaux", coords: { x: 55, y: 32 }, color: "cyan" },
      { title: "Mains aux Genoux", metric: "VERROUILLAGE BIOMÉCANIQUE", description: "Angle droit parfait stabilisant le centre de gravité", coords: { x: 58, y: 55 }, color: "emerald" },
      { title: "Rythme Cardiaque", metric: "-15 BPM IMMÉDIAT", description: "Frein vagal actif diminuant la pression systolique", coords: { x: 45, y: 36 }, color: "amber" },
      { title: "Colonne Cervicale", metric: "PROLONGEMENT NEUTRE", description: "Zéro contrainte occipitale : regard fixé sur le point de prosternation", coords: { x: 30, y: 30 }, color: "gold" }
    ]
  },
  {
    id: "sujud",
    stepNumber: "03",
    postureArabic: "SUJÛD",
    postureFrench: "PROSTERNÉ",
    subtitle: "Irrigation Frontale & Earthing (7 Points au Sol)",
    angle: "0°",
    angleValue: 0,
    image: "/images/salat_cycle/salat_03_sujud_prosterne.jpg",
    keyMetric: "-27.3% CORTISOL · 0V POTENTIEL",
    metricLabel: "EXTINCTION DU DMN & DÉCHARGE ÉLECTROSTATIQUE",
    sacredVerse: "« Prosterne-toi et rapproche-toi » (Sourate Al-'Alaq)",
    scientificInsight: "L'acmé suprême de la Salât. Le front au sol induit une hyper-irrigation sanguine directe du cortex préfrontal et éteint le réseau du mode par défaut (DMN). Les 7 points au contact de la terre évacuent les charges électrostatiques (Earthing absolu).",
    nodes: [
      { title: "Cortex Préfrontal", metric: "+40% PERFUSION SANGUINE", description: "Irrigation massive du lobe de la décision et de la lucidité", coords: { x: 22, y: 68 }, color: "emerald" },
      { title: "Flux Vagal", metric: "PARASYMPATHIQUE 100%", description: "Stimulation mécanique profonde du nerf vague par la posture", coords: { x: 42, y: 52 }, color: "cyan" },
      { title: "Earthing 7 Points", metric: "DIFFÉRENTIEL 0V", description: "Neutralisation instantanée des charges électrostatiques des écrans", coords: { x: 18, y: 78 }, color: "gold" },
      { title: "Statut de Khalîfa", metric: "DISCIPLINE DU NAFS", description: "L'abandon complet devant l'Absolu restaure la souveraineté sur son monde", coords: { x: 62, y: 48 }, color: "amber" }
    ]
  },
  {
    id: "dua",
    stepNumber: "04",
    postureArabic: "DU'Â",
    postureFrench: "INVOCATION",
    subtitle: "Ondes Thêta & Mandat de Souveraineté",
    angle: "90°",
    angleValue: 90,
    image: "/images/salat_cycle/salat_04_dua_invocation.jpg",
    keyMetric: "ONDES THÊTA (4-8 HZ) · COHÉRENCE 0.1 HZ",
    metricLabel: "RÉCEPTIVITÉ SPIRITUELLE & DISSIPATION DU NAFS",
    sacredVerse: "« Invoquez-Moi, Je répondrai à votre appel » (Sourate Ghafir)",
    scientificInsight: "L'assise méditative (Jalassah) avec les mains levées installe une cohérence cardio-respiratoire parfaite (0.1 Hz). Le cerveau baigne dans les ondes Thêta favorables à l'intuition profonde, au pardon et à la formulation souveraine de ses desseins.",
    nodes: [
      { title: "Mains Ouvertes", metric: "CANAL DE RÉCEPTIVITÉ", description: "Posture d'abandon actif et d'accueil des requêtes spirituelles", coords: { x: 40, y: 42 }, color: "emerald" },
      { title: "Cerveau en Thêta", metric: "FRÉQUENCE 4-8 HZ", description: "Clarté exégétique et réorganisation mémorielle sans bruit mental", coords: { x: 52, y: 22 }, color: "cyan" },
      { title: "Cohérence Cardiaque", metric: "RÉSONANCE 0.1 HZ", description: "Synchronisation parfaite entre respiration et pulsation cardiaque", coords: { x: 55, y: 44 }, color: "gold" },
      { title: "Assise sur Talons", metric: "ANCRAGE PELVIEN", description: "Stabilité pyramidale parfaite verrouillant l'attention", coords: { x: 58, y: 80 }, color: "amber" }
    ]
  }
];

export default function SovereigntyCyberneticHero() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeNode, setActiveNode] = useState<SalatStageNode>(salatStages[0].nodes[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeStage = salatStages[currentStageIndex];

  // Gestion du cycle dynamique continu (Vue continue avec barre de progression)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // mise à jour fluide
    const totalDuration = 4500; // 4.5s par posture
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStageIndex((curr) => {
            const nextIdx = (curr + 1) % salatStages.length;
            setActiveNode(salatStages[nextIdx].nodes[0]);
            return nextIdx;
          });
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Synchroniser le premier nœud actif lors d'un changement de posture
  const handleSelectStage = (idx: number) => {
    setCurrentStageIndex(idx);
    setActiveNode(salatStages[idx].nodes[0]);
    setProgress(0);
  };

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative w-full bg-[#08090A] text-white">

      {/* ═══════════════════════════════════════════════════════════
          0. LA CAPSULE DE COMMANDE FLOTTANTE (STYLE TERMINAL INDUSTRIES)
          Single unified capsule: Logo | Navigation | High-Conversion Actions
          ═══════════════════════════════════════════════════════════ */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[#121316]/85 backdrop-blur-xl border border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300">
          
          {/* Logo BLF */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-[#00E599]/60 transition-colors bg-black/40 flex items-center justify-center">
              <Image 
                src="/logo_blf.png" 
                alt="BLF" 
                width={28} 
                height={28} 
                className="object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-[#00E599] transition-colors leading-none">
                Briser les Frontières
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase leading-none mt-1">
                Ingénierie & Exégèse
              </span>
            </div>
          </Link>

          {/* Navigation Centrale (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium text-neutral-300">
            <button onClick={() => scrollToSection("salat-kinetic-telemetry")} className="hover:text-white transition-colors cursor-pointer">
              Cycle Salât (4 Phases)
            </button>
            <button onClick={() => scrollToSection("salat-kinetic-telemetry")} className="hover:text-white transition-colors cursor-pointer">
              Neurobiologie
            </button>
            <button onClick={() => scrollToSection("bento-ecosystem")} className="hover:text-white transition-colors cursor-pointer">
              Méthode
            </button>
            <Link href="/livres" className="hover:text-white transition-colors">
              Les Traités
            </Link>
            <Link href="/articles" className="hover:text-white transition-colors">
              Journal
            </Link>
          </div>

          {/* Boutons d'Action (Terminal Layout : Vert Électrique + Blanc + Verre) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            
            {/* CTA 1 : AUDIT GRATUIT (Signal Vert Électrique #00E599) */}
            <Link
              href="/audit"
              className="relative group overflow-hidden px-3.5 sm:px-5 py-2 rounded-full bg-[#00E599] text-black font-sans font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,229,153,0.4)] hover:shadow-[0_0_35px_rgba(0,229,153,0.7)] hover:scale-[1.03]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Audit Gratuit
                <span className="hidden sm:inline font-mono opacity-80 text-[10px]">[3 min]</span>
              </span>
            </Link>

            {/* CTA 2 : LES LIVRES (Bouton Blanc pur) */}
            <Link
              href="/livres"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white text-black font-sans font-semibold text-[11px] sm:text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-300 hover:scale-[1.03]"
            >
              Les Livres
            </Link>

            {/* CTA 3 : CANDIDATURE / CONTACT (Verre & Trait fin) */}
            <Link
              href="/candidature"
              className="hidden md:inline-flex items-center px-3.5 py-2 rounded-full border border-white/20 text-white/90 font-sans font-medium text-[11px] tracking-wider uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Candidature
            </Link>

            {/* Bouton Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </nav>

        {/* Menu Déroulant Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 p-4 rounded-3xl bg-[#121316]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-3 text-center font-sans text-sm"
            >
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("salat-kinetic-telemetry"); }} className="py-2 hover:text-[#00E599]">Cycle Salât (4 Phases)</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("salat-kinetic-telemetry"); }} className="py-2 hover:text-[#00E599]">Neurobiologie & Énergie</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("bento-ecosystem"); }} className="py-2 hover:text-[#00E599]">Méthode & Piliers</button>
              <Link href="/livres" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white font-semibold">Les Traités de l&apos;Ingénieur</Link>
              <Link href="/articles" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400">Journal & Recherches</Link>
              <Link href="/candidature" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400">Candidature Privée</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          1. SECTION HERO PRINCIPALE (100vw × 100vh FULL BLEED)
          L'Aube & Le Monolithe Typographique Monumental (Terminal style)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 overflow-hidden">
        
        {/* Image de fond : Sanctuaire à l'Aube (Plein écran immersif) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/instagram/hero_terminal_dawn.jpg"
            alt="Sanctuaire à l'Aube"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          {/* Dégradés cinématiques pour contraste et lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-black/30 to-[#08090A]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,9,10,0.85)_100%)]" />
        </div>

        {/* Badge Télémétrie Supérieur */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase">
              CABINET BLF // ARCHITECTURE DU CERVEAU & EXÉGÈSE
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-[#00E599] bg-[#00E599]/10 px-3 py-1 rounded-full border border-[#00E599]/20">
            SYSTÈME OPÉRATIONNEL ACTIF
          </span>
        </div>

        {/* ── LE MONOLITHE TYPOGRAPHIQUE AU CENTRE (TERMINAL STYLE) ── */}
        <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-8 sm:py-12">
          <div className="transition-all duration-700">
            <span className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-4 py-1.5 rounded-full mb-6">
              // RÉINITIALISATION BIOLOGIQUE
            </span>

            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.06] drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
              Nous avons réinventé<br />
              la reconquête de l&apos;âme<br />
              par la prosternation.
            </h1>

            <p className="mt-8 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              La prosternation (Sujûd) n&apos;est pas une soumission passive. C&apos;est l&apos;arme neurobiologique suprême pour dompter le cortisol et commander son esprit.
            </p>

            {/* CTAs Centraux Intégrés */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#00E599] text-black font-sans font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,229,153,0.5)] hover:scale-105 transition-all"
              >
                Passer l&apos;Audit Prière & Cerveau (3 min) →
              </Link>
              <Link
                href="/livres"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans font-semibold text-sm tracking-wider uppercase transition-all"
              >
                Les Traités de l&apos;Ingénieur
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de page initial : Ticker & Bouton Scroll */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-2">
          
          {/* Ticker télémétrique */}
          <div className="font-mono text-[11px] text-neutral-400 space-y-1">
            <p className="text-white font-semibold">SOVEREIGNTY OPERATING SYSTEM // V.3.1</p>
            <p>CYCLES CIRCADIENS : SYNCHRONISÉS SUR L&apos;ANGLE SOLAIRE</p>
            <p className="text-[#00E599]">STATUS : CHARGE ALLOSTATIQUE EN RÉDUCTION</p>
          </div>

          {/* Indicateur de Défilement (Terminal style - Cliquable) */}
          <button
            onClick={() => scrollToSection("salat-kinetic-telemetry")}
            className="flex items-center gap-3 text-right group cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="font-sans font-bold text-xs tracking-widest uppercase text-white group-hover:text-[#00E599] transition-colors">
                SCROLL TO EXPLORE
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                [ 01 / 03 ] INITIATION
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#00E599] flex items-center justify-center animate-bounce text-[#00E599] transition-colors">
              ↓
            </div>
          </button>

        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. SECTION TÉLÉMÉTRIE DYNAMIQUE DU CYCLE DE LA SALÂT (VUE CONTINUE)
          "fusion dans l'image entre la personne debout -> inclinée -> prosternée -> invocation"
          Axe Cinématique & Biologique 3D LiDAR (Terminal Industries aesthetic)
          ═══════════════════════════════════════════════════════════ */}
      <section id="salat-kinetic-telemetry" className="relative w-full min-h-screen flex flex-col justify-between py-20 px-4 sm:px-12 bg-[#08090A] border-t border-white/10 overflow-hidden">
        
        {/* Grille vectorielle discrète en arrière-plan */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,229,153,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,229,153,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        {/* ── EN-TÊTE DE LA SECTION TÉLÉMÉTRIQUE ── */}
        <div className="relative z-10 text-center max-w-5xl mx-auto pt-4 mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/20 px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
            TÉLÉMÉTRIE DU CYCLE SACRÉ // VUE CONTINUE & DYNAMIQUE
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.1] drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
            L&apos;ingénierie sacrée qui réinitialise le cerveau et l&apos;énerg<span className="text-[#00E599]">i</span>e.
          </h2>
          <p className="mt-4 text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed">
            De la verticalité du <strong className="text-white">Qiyâm</strong> à l&apos;inclinaison du <strong className="text-white">Rukû&apos;</strong>, puis l&apos;effondrement réparateur du <strong className="text-white">Sujûd</strong> et l&apos;ouverture du <strong className="text-white">Du&apos;â</strong> : découvrez la biomécanique continue de la prière.
          </p>
        </div>

        {/* ── BARRE DE CONTRÔLE DYNAMIQUE & 4 ONGLETS AVEC PROGRESSION CONTINUE ── */}
        <div className="relative z-20 max-w-6xl mx-auto w-full mb-6">
          
          {/* Sous-barre : Mode de Lecture & Angle du Rachis */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-2 mb-4 font-mono text-[11px]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isPlaying 
                    ? "bg-[#00E599]/15 border-[#00E599] text-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.3)]" 
                    : "bg-white/5 border-white/20 text-neutral-400 hover:text-white"
                }`}
              >
                <span>{isPlaying ? "⏸" : "▶"}</span>
                <span className="font-bold">{isPlaying ? "LECTURE CONTINUE ACTIVE" : "MODE MANUEL (PAUSE)"}</span>
              </button>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-neutral-400 hidden sm:inline">
                POSTURE : <strong className="text-white">{activeStage.postureArabic} ({activeStage.postureFrench})</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <span className="text-neutral-400">ANGLE VERTÉBRAL :</span>
              <span className="font-bold text-sm text-[#00E599] bg-[#00E599]/10 px-2.5 py-0.5 rounded border border-[#00E599]/30">
                {activeStage.angle}
              </span>
            </div>
          </div>

          {/* Grille des 4 Postures (Interactive & Scrubber) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {salatStages.map((stg, idx) => {
              const isActive = currentStageIndex === idx;
              return (
                <button
                  key={stg.id}
                  onClick={() => handleSelectStage(idx)}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-[#14161C] border-[#00E599] shadow-[0_0_25px_rgba(0,229,153,0.25)]"
                      : "bg-[#0D0E12] border-white/10 hover:border-white/30 text-neutral-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-mono text-[10px] font-bold tracking-widest uppercase ${isActive ? "text-[#00E599]" : "text-neutral-500"}`}>
                      {stg.stepNumber} // {stg.postureArabic}
                    </span>
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${isActive ? "border-[#00E599]/40 bg-[#00E599]/15 text-[#00E599]" : "border-white/10 text-neutral-500"}`}>
                      {stg.angle}
                    </span>
                  </div>

                  <p className={`font-sans font-extrabold text-sm sm:text-base ${isActive ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                    {stg.postureFrench}
                  </p>

                  <p className="text-[10px] font-mono text-neutral-400 truncate mt-1">
                    {stg.keyMetric}
                  </p>

                  {/* Barre de progression dynamique sur l'onglet actif */}
                  {isActive && isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                      <div
                        className="h-full bg-[#00E599] transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* ── LE CANEVAS DE FUSION VISUELLE 3D LIDAR (CONTINUOUS DISSOLVE VIEWPORT) ── */}
        <div className="relative z-20 max-w-6xl mx-auto w-full my-auto">
          
          <div className="relative w-full h-[480px] sm:h-[600px] rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
            
            {/* 1. Superposition des 4 Images en FUSION FLUIDE (Crossfade) */}
            {salatStages.map((stg, idx) => {
              const isVisible = currentStageIndex === idx;
              return (
                <div
                  key={stg.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isVisible
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src={stg.image}
                    alt={stg.postureFrench}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-contain sm:object-cover object-center filter contrast-125 brightness-95"
                  />
                </div>
              );
            })}

            {/* Dégradés d'ambiance cinématique et grille */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

            {/* 2. Badge Télémétrique d'Angle en direct (Coin Supérieur Droit) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 font-mono text-[10px] sm:text-xs bg-[#121316]/90 backdrop-blur-xl border border-white/15 px-3 py-2 rounded-xl text-neutral-300 shadow-xl space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-ping" />
                <span className="text-[#00E599] font-bold">DIGITAL TWIN BIOMÉCANIQUE</span>
              </div>
              <p>INCLINAISON RACHIDIENNE : <strong className="text-white">{activeStage.angle}</strong></p>
              <p className="text-[9px] text-neutral-400">STATUS : ASSISE STABILISÉE</p>
            </div>

            {/* 3. Réticules Biométriques Interactifs Flottants sur le Corps */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              {activeStage.nodes.map((node, nIdx) => {
                const isSelected = activeNode.title === node.title;
                return (
                  <div
                    key={`${activeStage.id}-${nIdx}`}
                    style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  >
                    <button
                      onClick={() => setActiveNode(node)}
                      className={`group relative p-2 flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                        isSelected ? "scale-110" : "hover:scale-105"
                      }`}
                    >
                      {/* Anneau ciblage LiDAR */}
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E599] border-2 border-black" />
                      </span>

                      {/* Tag d'ingénierie */}
                      <div className={`px-2.5 py-1 rounded-lg border backdrop-blur-md transition-all text-left ${
                        isSelected 
                          ? "bg-[#121316]/95 border-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.4)]" 
                          : "bg-black/80 border-white/15 group-hover:border-white/40"
                      }`}>
                        <span className="block font-sans font-bold text-[11px] text-white whitespace-nowrap">
                          {node.title}
                        </span>
                        <span className="block font-mono text-[9px] text-[#00E599] font-semibold whitespace-nowrap">
                          {node.metric}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 4. Carte HUD d'Analyse Scientifique Active (Bas de canevas) */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-30 pointer-events-auto">
              <div className="p-4 sm:p-6 rounded-2xl bg-[#121316]/90 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-[#00E599] uppercase tracking-widest font-bold bg-[#00E599]/10 px-2 py-0.5 rounded border border-[#00E599]/30">
                      {activeStage.stepNumber} // {activeStage.postureArabic}
                    </span>
                    <span className="text-white font-sans font-bold text-sm sm:text-base">
                      {activeStage.subtitle}
                    </span>
                    <span className="font-mono text-[11px] text-amber-400 font-bold">
                      [{activeStage.keyMetric}]
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {activeNode ? activeNode.description : activeStage.scientificInsight}
                  </p>

                  <p className="text-[11px] font-serif italic text-neutral-400">
                    {activeStage.sacredVerse}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                  <Link
                    href="/audit"
                    className="w-full md:w-auto text-center px-5 py-3 rounded-xl bg-[#00E599] text-black font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,229,153,0.35)]"
                  >
                    Mesurer Mon Profil dans l&apos;Audit →
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ── FOOTER DE L'ÉCRAN DE TÉLÉMÉTRIE ── */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-neutral-400 pt-6 border-t border-white/10 gap-2">
          <span>SCAN SACRÉ BIOMÉCANIQUE CONFIRMÉ • 4 POSTURES EN FUSION CONTINUE</span>
          <span className="text-[#00E599] font-bold">[ 02 / 03 ] INITIATION & RÉINITIALISATION</span>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. LA BENTO GRID DE TRANSITION (01, 02, 03 - TERMINAL STYLE)
          Transition fluide vers l'écosystème d'ingénierie BLF
          ═══════════════════════════════════════════════════════════ */}
      <section id="bento-ecosystem" className="relative z-30 py-28 px-6 sm:px-12 bg-[#08090A] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête de section Bento */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E599] block mb-3">
                03 // LES TROIS PILIERS OPÉRATIONNELS
              </span>
              <h2 className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight">
                Une infrastructure complète<br />
                pour reprendre votre souveraineté.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-400 max-w-md font-sans">
              De l&apos;analyse neuro-comportementale à l&apos;exégèse coranique de haute précision, choisissez votre porte d&apos;entrée.
            </p>
          </div>

          {/* Grille Bento 3 Colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARTE 01 : DIAGNOSTIC INITIAL */}
            <Link
              href="/audit"
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#121316] border border-white/10 hover:border-[#00E599]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[#00E599]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00E599]">
                    01 // DIAGNOSTIC INITIAL
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-[#00E599] group-hover:text-black group-hover:border-[#00E599] transition-all">
                    ↗
                  </span>
                </div>
                <h3 className="font-sans font-bold text-2xl text-white group-hover:text-[#00E599] transition-colors mb-4">
                  L&apos;Audit de Souveraineté
                </h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  Cartographiez en 3 minutes votre niveau de fatigue décisionnelle, votre vulnérabilité à l&apos;entropie et la régularité neuro-biologique de votre Salât.
                </p>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">DURÉE : 3 MINUTES</span>
                <span className="text-[#00E599] font-bold uppercase">Lancer l&apos;Audit →</span>
              </div>
            </Link>

            {/* CARTE 02 : LES TRAITÉS DE L'INGÉNIEUR */}
            <Link
              href="/livres"
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                    02 // LES TRAITÉS DE L&apos;INGÉNIEUR
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                    ↗
                  </span>
                </div>
                <h3 className="font-sans font-bold text-2xl text-white mb-4">
                  Les 3 Livres Majeurs
                </h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  Reconstruisez vos fondations intellectuelles et comportementales avec <em>Adam, Père de l&apos;Humanité</em>, <em>Les Secrets du Retour vers Allah</em> et <em>Ar-Rahman</em>.
                </p>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">FORMATS : RELIÉ & NUMÉRIQUE</span>
                <span className="text-white font-bold uppercase">Découvrir le Catalogue →</span>
              </div>
            </Link>

            {/* CARTE 03 : INTERPOSITION EXÉCUTIVE */}
            <Link
              href="/candidature"
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#121316] border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                    03 // INTERPOSITION EXÉCUTIVE
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all">
                    ↗
                  </span>
                </div>
                <h3 className="font-sans font-bold text-2xl text-white group-hover:text-amber-400 transition-colors mb-4">
                  Mentorat & Protocole C.O.M.E.S.
                </h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  Pour les dirigeants et croyants exigeants : 1, 3 ou 9 mois d&apos;immersion privée pour verrouiller votre discipline, vos rythmes circadiens et décupler votre impact.
                </p>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">SÉLECTION : SUR DOSSIER</span>
                <span className="text-amber-400 font-bold uppercase">Postuler →</span>
              </div>
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}
