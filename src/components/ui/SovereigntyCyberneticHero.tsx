"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface BiometricNode {
  id: string;
  category: string;
  title: string;
  metric: string;
  effect: string;
  scientificInsight: string;
  coordinates: { x: number; y: number }; // Percentage for positioning
  color: "emerald" | "gold" | "cyan" | "amber";
}

const biometricNodes: BiometricNode[] = [
  {
    id: "brain",
    category: "01 // NEUROBIOLOGIE & CORTEX",
    title: "Cortex Préfrontal",
    metric: "-27.3% CORTISOL SÉRIQUE",
    effect: "Extinction du DMN & déclenchement ondes Thêta",
    scientificInsight: "La prosternation (Sujûd) force l'extinction du réseau du mode par défaut (DMN), coupant instantanément le bavardage mental, l'angoisse et la fatigue décisionnelle.",
    coordinates: { x: 34, y: 46 },
    color: "emerald"
  },
  {
    id: "vagus",
    category: "02 // BIO-ÉNERGÉTIQUE & NERF VAGUE",
    title: "Système Parasympathique",
    metric: "FLUX VAGAL : 100% ACTIF",
    effect: "Bascule vagale instantanée & régulation cardiaque",
    scientificInsight: "Stimulation mécanique du nerf vague par la posture : bascule du mode survie (sympathique) vers l'apaisement profond (parasympathique) et réalignement cardio-respiratoire.",
    coordinates: { x: 52, y: 38 },
    color: "cyan"
  },
  {
    id: "earthing",
    category: "03 // DÉCHARGE ÉLECTROSTATIQUE",
    title: "Earthing (7 Points au Sol)",
    metric: "DIFFÉRENTIEL POTENTIEL : 0V",
    effect: "Évacuation de la charge électrostatique vers la Terre",
    scientificInsight: "Le contact direct des 7 points d'appui avec le sol neutralise les charges électrostatiques accumulées par l'exposition aux écrans et rétablit l'équilibre ionique cellulaire.",
    coordinates: { x: 26, y: 72 },
    color: "gold"
  },
  {
    id: "khalifa",
    category: "04 // SOUVERAINETÉ DE L'ENVIRONNEMENT",
    title: "Statut de Khalîfa",
    metric: "RÉGULATION NAFS : SOUVERAIN",
    effect: "Immunité cognitive contre la dispersion algorithmique",
    scientificInsight: "Discipline du Nafs : le croyant cesse d'être le récepteur passif des flux numériques pour redevenir l'ordonnateur souverain de son attention et de son destin.",
    coordinates: { x: 68, y: 52 },
    color: "amber"
  }
];

export default function SovereigntyCyberneticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<BiometricNode>(biometricNodes[0]);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Progress across the 350vh sticky sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ═══════════════════════════════════════════════════════════
  // TRANSFORMATION VALUES FOR SCROLLYTELLING
  // ═══════════════════════════════════════════════════════════

  // Phase 0: Initial Hero Visual (Dawn sanctuary)
  const heroImageScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.08]);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.38, 0.52], [1, 1, 0]);

  // Phase 0: Initial Micro elements (Scroll indicator, Ticker)
  const initialOverlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.8, 0]);

  // Phase 1: The Kinetic Monolith Statement ("Nous avons réinventé...")
  const statement1Opacity = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.52], [0, 1, 1, 0]);
  const statement1Y = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.52], [40, 0, 0, -40]);
  const statement1Scale = useTransform(scrollYProgress, [0.18, 0.35], [0.95, 1]);

  // Phase 2: 3D LiDAR Point Cloud & Sujûd Telemetry ("L'ingénierie sacrée...")
  const pointCloudOpacity = useTransform(scrollYProgress, [0.45, 0.58, 0.88, 0.98], [0, 1, 1, 0]);
  const pointCloudScale = useTransform(scrollYProgress, [0.50, 0.75], [1.05, 1]);

  const statement2Opacity = useTransform(scrollYProgress, [0.52, 0.62, 0.85, 0.95], [0, 1, 1, 0]);
  const statement2Y = useTransform(scrollYProgress, [0.52, 0.62, 0.85, 0.95], [40, 0, 0, -30]);

  const hudNodesOpacity = useTransform(scrollYProgress, [0.65, 0.72, 0.90, 0.98], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#08090A] text-white">

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
            <a href="#sujud-scan" className="hover:text-white transition-colors">
              Sujûd
            </a>
            <a href="#telemetry-cortex" className="hover:text-white transition-colors">
              Neurobiologie
            </a>
            <a href="#bento-ecosystem" className="hover:text-white transition-colors">
              Méthode
            </a>
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
              className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
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
              <a href="#sujud-scan" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#00E599]">Sujûd (Prosternation)</a>
              <a href="#telemetry-cortex" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#00E599]">Neurobiologie & Énergie</a>
              <a href="#bento-ecosystem" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#00E599]">Méthode & Piliers</a>
              <Link href="/livres" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white font-semibold">Les Traités de l&apos;Ingénieur</Link>
              <Link href="/articles" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400">Journal & Recherches</Link>
              <Link href="/candidature" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400">Candidature Privée</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          1. LE VIEWPORT STICKY FULL-BLEED (100vw × 100vh)
          Séquence cinématique de scrollytelling en 3 phases
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative h-[340vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">

          {/* ─────────────────────────────────────────────────────────
              CALQUE A : VISUEL CINÉMATIQUE DE L'AUBE (PHASE INITIALE)
              ───────────────────────────────────────────────────────── */}
          <motion.div 
            style={{ 
              opacity: heroImageOpacity,
              scale: heroImageScale
            }}
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
          >
            <Image
              src="/images/instagram/hero_terminal_dawn.jpg"
              alt="Sanctuaire à l'Aube"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter brightness-90 contrast-105"
            />
            {/* Dégradés cinématiques pour contraste des textes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-[#08090A]/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,9,10,0.85)_100%)]" />
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              CALQUE B : VISUEL 3D LIDAR / POINT-CLOUD DU SUJÛD (PHASE 2)
              ───────────────────────────────────────────────────────── */}
          <motion.div 
            style={{ 
              opacity: pointCloudOpacity,
              scale: pointCloudScale
            }}
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
          >
            <Image
              src="/images/instagram/point_cloud_sujud_telemetry.jpg"
              alt="Scan 3D LiDAR Prosternation"
              fill
              sizes="100vw"
              className="object-cover object-center filter contrast-125 brightness-95"
            />
            {/* Lignes techniques et grille vectorielle façon Terminal */}
            <div 
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,229,153,0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,229,153,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-[#08090A]/70" />
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              OVERLAY 0 : HERO INITIAL ÉPURÉ + SCROLL TO EXPLORE ↓
              ───────────────────────────────────────────────────────── */}
          <motion.div
            style={{ opacity: initialOverlayOpacity }}
            className="relative z-10 w-full h-full flex flex-col justify-between pt-36 pb-12 px-6 sm:px-12 max-w-7xl mx-auto pointer-events-none"
          >
            {/* Badge Télémétrie Supérieur */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase">
                CABINET BLF // ARCHITECTURE DU CERVEAU & EXÉGÈSE
              </span>
            </div>

            {/* Bas de page initial : Ticker & Bouton Scroll */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-4">
              
              {/* Ticker télémétrique */}
              <div className="font-mono text-[11px] text-neutral-400 space-y-1">
                <p className="text-white font-semibold">SOVEREIGNTY OPERATING SYSTEM // V.3.1</p>
                <p>CYCLES CIRCADIENS : SYNCHRONISÉS SUR L&apos;ANGLE SOLAIRE</p>
                <p className="text-[#00E599]">STATUS : CHARGE ALLOSTATIQUE EN RÉDUCTION</p>
              </div>

              {/* Indicateur de Défilement (Terminal style) */}
              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-sans font-bold text-xs tracking-widest uppercase text-white">
                    SCROLL TO EXPLORE
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">
                    [ 01 / 03 ] INITIATION
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center animate-bounce text-[#00E599]">
                  ↓
                </div>
              </div>

            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              OVERLAY 1 (SCROLL 1) : LE MONOLITHE CINÉMATIQUE (TERMINAL STYLE)
              "We have reinvented the future of logistics through the yard."
              ➔ "Nous avons réinventé la reconquête de l'âme par la prosternation."
              ───────────────────────────────────────────────────────── */}
          <motion.div
            style={{
              opacity: statement1Opacity,
              y: statement1Y,
              scale: statement1Scale
            }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          >
            <div className="max-w-5xl mx-auto">
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
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              OVERLAY 2 (SCROLL 2) : LE SCAN 3D DU SUJÛD & HUD VECTEUR
              "AI-native technology that turns the space between your gate"
              ➔ "L'ingénierie sacrée qui réinitialise le cerveau et l'énergie du croyant."
              ───────────────────────────────────────────────────────── */}
          <motion.div
            id="sujud-scan"
            style={{
              opacity: statement2Opacity,
              y: statement2Y
            }}
            className="absolute inset-0 z-20 flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 max-w-7xl mx-auto pointer-events-none"
          >
            {/* Titre Monumental avec la lettre mise en vert comme Terminal */}
            <div className="text-center pt-8">
              <span className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#00E599] mb-3">
                // TÉLÉMÉTRIE & CARTOGRAPHIE EN TEMPS RÉEL
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] max-w-5xl mx-auto drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
                L&apos;ingénierie sacrée qui réinitialise le cerveau et l&apos;énerg<span className="text-[#00E599]">i</span>e.
              </h2>
            </div>

            {/* Réticules Biométriques Flottants sur le Corps (Interactifs) */}
            <motion.div 
              style={{ opacity: hudNodesOpacity }}
              className="relative w-full h-[360px] sm:h-[420px] pointer-events-auto"
            >
              {biometricNodes.map((node) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      onClick={() => setActiveNode(node)}
                      className={`group relative p-2 flex items-center gap-3 transition-all duration-300 ${isSelected ? "scale-110" : "hover:scale-105"}`}
                    >
                      {/* Anneau de ciblage LiDAR */}
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-70" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E599] border-2 border-black" />
                      </span>

                      {/* Étiquette d'ingénierie */}
                      <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all text-left ${isSelected ? "bg-[#121316]/95 border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.3)]" : "bg-black/75 border-white/15 hover:border-white/40"}`}>
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                          {node.category.split("//")[1] || node.category}
                        </span>
                        <span className="block font-sans font-bold text-xs text-white">
                          {node.title}
                        </span>
                        <span className="block font-mono text-[10px] text-[#00E599] font-semibold">
                          {node.metric}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* Fiche active d'analyse scientifique en bas de l'écran */}
              <div id="telemetry-cortex" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 rounded-2xl bg-[#121316]/90 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                        <span className="font-mono text-[10px] text-[#00E599] uppercase tracking-widest font-bold">
                          {activeNode.category}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                        {activeNode.title} — <span className="font-mono text-[#00E599]">{activeNode.metric}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1 leading-snug">
                        {activeNode.scientificInsight}
                      </p>
                    </div>

                    <Link
                      href="/audit"
                      className="flex-shrink-0 px-4 py-2 rounded-xl bg-[#00E599] text-black font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-[#00E599]/30"
                    >
                      Mesurer Mon État
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>

            {/* Footer de l'écran de télémétrie */}
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 pt-2 border-t border-white/10">
              <span>SCAN BIOMÉTRIQUE CONFIRMÉ • DÉCHARGE ÉLECTROSTATIQUE VALIDÉE</span>
              <span className="text-[#00E599] font-bold">[ 02 / 03 ] ARCHITECTURE DU CERVEAU</span>
            </div>

          </motion.div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          2. LA BENTO GRID DE TRANSITION (01, 02, 03 - TERMINAL STYLE)
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
