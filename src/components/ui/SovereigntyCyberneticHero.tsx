"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SalatPosture {
  id: string;
  image: string;
  cameraAngle: string;
  angleTarget: number;
  postureArabic: string;
  postureFrench: string;
  phaseLabel: string;
  keyMetric: string;
  subtitle: string;
  scientificInsight: string;
  sacredVerse: string;
  nodes: { title: string; metric: string; coords: { x: number; y: number } }[];
}

const salatPostures: SalatPosture[] = [
  {
    id: "qiyam",
    image: "/images/salat_cycle/salat_01_qiyam_droite.jpg",
    cameraAngle: "VUE DE DROITE (PROFIL)",
    angleTarget: 180,
    postureArabic: "QIYÂM",
    postureFrench: "DEBOUT",
    phaseLabel: "ALIGNEMENT VERTICAL 180°",
    keyMetric: "+35% FOCUS PRÉFRONTAL",
    subtitle: "Alignement Vertébral & Ancrage Cognitif",
    scientificInsight: "La station debout rigoureuse désactive les micro-mouvements distractifs et synchronise l'attention sélective sur un point focal unique. Rupture immédiate avec la surcharge sensorielle et l'entropie numérique.",
    sacredVerse: "« Tiens-toi debout avec droiture pour la Vérité »",
    nodes: [
      { title: "Cortex Préfrontal (Cerveau)", metric: "DORSOLATÉRAL ACTIF", coords: { x: 54, y: 12 } },
      { title: "Cœur & Thorax (Plexus)", metric: "MAIN SUR LE CŒUR", coords: { x: 55, y: 32 } },
      { title: "Axe Vertébral (Rachis 180°)", metric: "TENSION RACHIDIENNE : 0", coords: { x: 47, y: 44 } },
      { title: "Pieds & Ancrage au Sol", metric: "STABILITÉ TERRESTRE", coords: { x: 50, y: 92 } }
    ]
  },
  {
    id: "ruku",
    image: "/images/salat_cycle/salat_02_ruku_34droite.jpg",
    cameraAngle: "VUE 3/4 DROITE",
    angleTarget: 90,
    postureArabic: "RUKÛ'",
    postureFrench: "INCLINÉ",
    phaseLabel: "FLEXION RACHIDIENNE 90°",
    keyMetric: "-15 BPM DÉCÉLÉRATION VAGALE",
    subtitle: "Flexion Rachidienne & Décompression Lombaire",
    scientificInsight: "L'inclinaison à 90° dos plat étire toute la chaîne postérieure et décompresse les vertèbres lombaires. L'inversion hydrostatique partielle prépare le cerveau à l'afflux sanguin tout en soumettant consciemment la volonté de l'ego.",
    sacredVerse: "« Et inclinez-vous avec ceux qui s'inclinent »",
    nodes: [
      { title: "Cerveau & Boîte Crânienne", metric: "PULSE CÉRÉBRAL INVERSÉ", coords: { x: 76, y: 24 } },
      { title: "Rachis Lombaire (Dos Plat 90°)", metric: "DÉCOMPRESSION DISCO-RACHIDIENNE", coords: { x: 35, y: 22 } },
      { title: "Cœur & Cage Thoracique", metric: "-15 BPM IMMÉDIAT", coords: { x: 55, y: 28 } },
      { title: "Mains aux Genoux", metric: "VERROUILLAGE BIOMÉCANIQUE", coords: { x: 36, y: 55 } }
    ]
  },
  {
    id: "sujud",
    image: "/images/salat_cycle/salat_03_sujud_face.jpg",
    cameraAngle: "VUE DE FACE (SYMÉTRIQUE)",
    angleTarget: 0,
    postureArabic: "SUJÛD",
    postureFrench: "PROSTERNÉ",
    phaseLabel: "CONTACT TERRESTRE 0°",
    keyMetric: "-27.3% CORTISOL · 0V POTENTIEL",
    subtitle: "Irrigation Frontale & Earthing (7 Points au Sol)",
    scientificInsight: "L'acmé suprême de la Salât vue de face. Le front et le nez au sol induisent une hyper-irrigation sanguine directe du cortex préfrontal et éteignent le réseau du mode par défaut (DMN). Les 7 points de contact évacuent les charges électrostatiques.",
    sacredVerse: "« Prosterne-toi et rapproche-toi » (Sourate Al-'Alaq)",
    nodes: [
      { title: "Cortex Préfrontal (Front au Sol)", metric: "+40% PERFUSION SANGUINE", coords: { x: 50, y: 76 } },
      { title: "Mains au Sol (Symétrie)", metric: "POINTS 2 & 3 / 7", coords: { x: 22, y: 74 } },
      { title: "Cœur & Nerf Vague", metric: "PARASYMPATHIQUE 100%", coords: { x: 50, y: 52 } },
      { title: "Earthing 7 Points", metric: "DIFFÉRENTIEL 0V TERRESTRE", coords: { x: 50, y: 88 } }
    ]
  },
  {
    id: "dua",
    image: "/images/salat_cycle/salat_04_dua_34gauche.jpg",
    cameraAngle: "VUE 3/4 GAUCHE",
    angleTarget: 90,
    postureArabic: "DU'Â",
    postureFrench: "INVOCATION",
    phaseLabel: "ASSISE SOUVERAINE & MAINS LEVÉES",
    keyMetric: "ONDES THÊTA (4-8 HZ) · COHÉRENCE 0.1 HZ",
    subtitle: "Ondes Thêta & Mandat de Souveraineté",
    scientificInsight: "L'assise sur les talons (Jalassah) avec les mains levées en coupe installe une cohérence cardio-respiratoire parfaite (0.1 Hz). Le cerveau baigne dans les ondes Thêta propices à l'intuition profonde et à la formulation souveraine de ses desseins.",
    sacredVerse: "« Invoquez-Moi, Je répondrai à votre appel » (Sourate Ghafir)",
    nodes: [
      { title: "Cerveau (Ondes Thêta)", metric: "FRÉQUENCE 4-8 HZ", coords: { x: 53, y: 20 } },
      { title: "Mains Ouvertes en Du'â", metric: "CANAL DE RÉCEPTIVITÉ", coords: { x: 36, y: 44 } },
      { title: "Cœur & Cohérence Cardiaque", metric: "RÉSONANCE 0.1 HZ", coords: { x: 54, y: 44 } },
      { title: "Assise sur Talons", metric: "ANCRAGE PELVIEN", coords: { x: 60, y: 82 } }
    ]
  }
];

export default function SovereigntyCyberneticHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackScrollable = rect.height - window.innerHeight;
      if (trackScrollable <= 0) return;

      const rawProgress = -rect.top / trackScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. CALCUL DE L'ANGLE DEGRÉ PAR DEGRÉ EN CONTINU (180° -> 179° -> ... -> 0°)
  let currentRachisAngle = 180;
  if (scrollProgress <= 0.72) {
    const t = scrollProgress / 0.72;
    currentRachisAngle = Math.round(180 - t * 180); // 180° -> 0°
  } else {
    const t = (scrollProgress - 0.72) / 0.28;
    currentRachisAngle = Math.round(t * 90); // 0° -> 90° (Du'â)
  }

  // 2. DESCENTE PHYSIQUE DU PERSONNAGE DANS LE FOND (translateY vers la terre)
  let avatarTranslateY = 0;
  if (scrollProgress <= 0.72) {
    const t = scrollProgress / 0.72;
    avatarTranslateY = Math.pow(t, 1.25) * 120; // 0px -> 120px vers le bas
  } else {
    const t = (scrollProgress - 0.72) / 0.28;
    avatarTranslateY = 120 - t * 45; // 75px en assise
  }

  // 3. SÉLECTION NETTE DE LA POSTURE (AUCUN DOUBLE-EXPOSITION NI FANTÔME CHEVAUCHÉ)
  // 4 cadrans distincts :
  // 0.00 à 0.26 : QIYÂM (Vue de droite)
  // 0.26 à 0.52 : RUKÛ' (Vue 3/4 droite)
  // 0.52 à 0.78 : SUJÛD (Vue de face)
  // 0.78 à 1.00 : DU'Â (Vue 3/4 gauche)
  let activePostureIdx = 0;
  if (scrollProgress < 0.26) {
    activePostureIdx = 0;
  } else if (scrollProgress < 0.52) {
    activePostureIdx = 1;
  } else if (scrollProgress < 0.78) {
    activePostureIdx = 2;
  } else {
    activePostureIdx = 3;
  }

  const activePosture = salatPostures[activePostureIdx];

  // Rotation 3D continue du radar et léger lacet selon l'angle de la caméra
  const radarRotation = Math.round((scrollProgress * 360) % 360);
  const cameraYaw = activePostureIdx === 0 ? 0 : activePostureIdx === 1 ? -6 : activePostureIdx === 2 ? 0 : 6;

  return (
    <div className="relative w-full bg-[#08090A] text-white">

      {/* ════════════════════════════════════════════════════════════
          1. SECTION HERO PRINCIPALE (100vw × 100vh FULL BLEED)
          L'Aube & Le Monolithe Typographique Monumental (Terminal style)
          ════════════════════════════════════════════════════════════ */}
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

            <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.035em] text-white leading-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
              Nous avons réinventé<br />
              la reconquête de l&apos;âme<br />
              par la prosternation.
            </h1>

            <p className="mt-8 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              La prosternation (Sujûd) n&apos;est pas une soumission passive. C&apos;est l&apos;arme neurobiologique suprême pour dompter le cortisol et commander son esprit.
            </p>

            {/* CTAs Centraux Intégrés — Style Ayocin Floating Pill */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-8 py-4 rounded-full bg-[#00E599] text-black font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,229,153,0.45)] hover:shadow-[0_0_55px_rgba(0,229,153,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Passer l&apos;Audit Prière & Cerveau (3 min)</span>
                <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
              <Link
                href="/livres"
                className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Les Traités de l&apos;Ingénieur</span>
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de page initial : Ticker & Indication de Scroll */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-2">
          
          <div className="font-mono text-[11px] text-neutral-400 space-y-1">
            <p className="text-white font-semibold">SOVEREIGNTY OPERATING SYSTEM // V.3.1</p>
            <p>CYCLES CIRCADIENS : SYNCHRONISÉS SUR L&apos;ANGLE SOLAIRE</p>
            <p className="text-[#00E599]">STATUS : CHARGE ALLOSTATIQUE EN RÉDUCTION</p>
          </div>

          <div className="flex items-center gap-3 text-right group">
            <div className="flex flex-col items-end">
              <span className="font-sans font-bold text-xs tracking-widest uppercase text-white">
                SCROLL TO EXPLORE
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                [ 01 / 03 ] INITIATION
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#00E599] animate-bounce">
              ↓
            </div>
          </div>

        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          2. SECTION SCROLLYTELLING PLEINE LARGEUR DU CYCLE DE LA SALÂT
          Les 4 angles exacts demandés :
          - Debout : vue de droite
          - Incliné : vue 3/4 droite
          - Prosterné : vue de face
          - Main et agenouillé : vue 3/4 gauche
          Pleine largeur, sans boîte ni double-exposition d'images
          ════════════════════════════════════════════════════════════ */}
      <section 
        id="salat-kinetic-telemetry" 
        ref={trackRef} 
        className="relative w-full h-[400vh] bg-[#08090A]"
      >
        {/* Conteneur Plein Écran Épinglé (Sticky Top Viewport) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-6 sm:px-12 lg:px-16 pointer-events-none select-none">
          
          {/* Grille vectorielle de perspective au sol (Plein écran sans bordure) */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,229,153,0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,229,153,0.2) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse at 50% 65%, black 25%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 65%, black 25%, transparent 85%)"
            }}
          />

          {/* Faisceau Laser LiDAR en balayage vertical synchronisé au scroll */}
          <div 
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E599] to-transparent shadow-[0_0_20px_#00E599] pointer-events-none opacity-40 transition-all duration-75"
            style={{
              top: `${(scrollProgress * 90 + 5)}%`
            }}
          />

          {/* Anneau Gyroscopique LiDAR Orbital (Radar en rotation continue au scroll) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] sm:w-[720px] sm:h-[720px] lg:w-[920px] lg:h-[920px] rounded-full border border-dashed border-[#00E599]/15 pointer-events-none transition-transform duration-100 ease-out"
            style={{
              transform: `translate(-50%, -50%) rotate(${radarRotation}deg)`
            }}
          >
            <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">0° RADAR</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">90° EST</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">180° SUD</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">270° OUEST</span>
          </div>

          {/* ── BARRE SUPÉRIEURE TÉLÉMÉTRIQUE ── */}
          <div className="relative z-10 w-full flex items-center justify-between text-neutral-400 font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
              <span className="text-[#00E599] font-bold tracking-widest uppercase">
                ROTATION ORBITALE 360° // {activePosture.cameraAngle}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>ANGLE DU RACHIS : <strong className="text-[#00E599] font-mono text-sm">{currentRachisAngle}°</strong></span>
              <span>ANGLE CAMÉRA : <strong className="text-white font-mono">{activePosture.cameraAngle}</strong></span>
              <span>PHASE : <strong className="text-white">{activePosture.phaseLabel}</strong></span>
            </div>
          </div>

          {/* ── L'AVATAR EN PLEINE LARGEUR & PLEIN ÉCRAN AU CENTRE (AUCUNE COUPE NI BOÎTE) ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            
            <div 
              className="relative w-full max-w-4xl lg:max-w-5xl h-[78vh] sm:h-[84vh] flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                perspective: "1200px",
                transform: `perspective(1200px) translateY(${avatarTranslateY}px) rotateY(${cameraYaw}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              
              {/* Image Actuelle Unique : AUCUN CHEVAUCHEMENT / PAS DE DOUBLE EXPOSITION */}
              <div
                key={activePosture.id}
                className="relative w-full h-full flex items-center justify-center transition-opacity duration-150"
                style={{
                  maskImage: "radial-gradient(circle at 50% 50%, black 60%, rgba(0,0,0,0.85) 75%, transparent 98%)",
                  WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 60%, rgba(0,0,0,0.85) 75%, transparent 98%)"
                }}
              >
                <Image
                  src={activePosture.image}
                  alt={`${activePosture.postureFrench} - ${activePosture.cameraAngle}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-contain object-center filter contrast-125 brightness-105"
                />
              </div>

              {/* Réticules Anatomiques Rigoureux pour la Posture Actuelle */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {activePosture.nodes.map((node, nIdx) => (
                  <div
                    key={nIdx}
                    style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                  >
                    <div className="flex items-center gap-2 group">
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E599] border-2 border-black" />
                      </span>

                      <div className="px-2.5 py-1 rounded-lg bg-[#08090A]/95 backdrop-blur-md border border-[#00E599]/40 shadow-[0_0_15px_rgba(0,229,153,0.35)]">
                        <span className="block font-sans font-bold text-[10px] sm:text-[11px] text-white whitespace-nowrap">
                          {node.title}
                        </span>
                        <span className="block font-mono text-[8px] sm:text-[9px] text-[#00E599] font-semibold whitespace-nowrap">
                          {node.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* ── COUCHE HUD FLOTTANTE SUPÉRIEURE & LATÉRALE (STYLE TERMINAL INDUSTRIES) ── */}
          <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex items-center justify-between pointer-events-none">
            
            {/* BLOC GAUCHE : COMPTEUR 180° -> 0° & DONNÉES SWISS */}
            <div className="max-w-md sm:max-w-lg space-y-4 text-left pointer-events-auto">
              
              {/* COMPTEUR EN DIRECT DEGRÉ PAR DEGRÉ */}
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-black text-6xl sm:text-7xl lg:text-9xl text-white tracking-tighter leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
                  {currentRachisAngle}
                </span>
                <span className="font-mono font-bold text-4xl sm:text-5xl text-[#00E599]">
                  °
                </span>
                <div className="flex flex-col pl-3 border-l border-[#00E599]/40 ml-2">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#00E599] font-bold">
                    INCLINAISON RACHIDIENNE
                  </span>
                  <span className="font-mono text-[9px] text-neutral-400">
                    CAMÉRA : {activePosture.cameraAngle}
                  </span>
                </div>
              </div>

              {/* Titre Posture Monumental */}
              <div>
                <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] text-white leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
                  {activePosture.postureArabic}
                </h2>
                <p className="font-sans font-bold text-base sm:text-xl text-neutral-300 mt-1">
                  {activePosture.postureFrench} · <span className="text-[#00E599] font-mono text-sm sm:text-base">{activePosture.subtitle}</span>
                </p>
              </div>

              {/* Badge Métrique Clé */}
              <div className="inline-block font-mono text-xs sm:text-sm font-bold text-[#00E599] bg-[#00E599]/15 border border-[#00E599]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,229,153,0.3)]">
                {activePosture.keyMetric}
              </div>

              {/* Explication Scientifique */}
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {activePosture.scientificInsight}
              </p>

              {/* Verset Sacré */}
              <p className="text-[11px] sm:text-xs font-serif italic text-amber-300/80 max-w-md border-l-2 border-[#00E599]/50 pl-3 py-0.5">
                {activePosture.sacredVerse}
              </p>

            </div>

            {/* BLOC DROIT : INDICATEUR VERTICAL DE LA ROTATION ORBITALE */}
            <div className="hidden lg:flex flex-col items-end space-y-6 font-mono text-xs pointer-events-auto">
              <div className="relative pl-4 border-l border-white/15 space-y-6">
                {[
                  { label: "DEBOUT", deg: "180°", cam: "VUE DE DROITE", idx: 0 },
                  { label: "INCLINÉ", deg: "90°", cam: "VUE 3/4 DROITE", idx: 1 },
                  { label: "PROSTERNÉ", deg: "0°", cam: "VUE DE FACE", idx: 2 },
                  { label: "INVOCATION", deg: "90°", cam: "VUE 3/4 GAUCHE", idx: 3 }
                ].map((item) => {
                  const isActive = activePostureIdx === item.idx;
                  return (
                    <div key={item.idx} className="relative transition-all duration-200 text-right">
                      {isActive && (
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00E599] shadow-[0_0_12px_#00E599]" />
                      )}
                      <p className={`font-mono text-[10px] tracking-widest uppercase ${isActive ? "text-[#00E599] font-bold" : "text-neutral-500"}`}>
                        {item.label} ({item.deg})
                      </p>
                      <p className={`font-sans text-[11px] ${isActive ? "text-white font-semibold" : "text-neutral-500"}`}>
                        {item.cam}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Jauge de progression continue */}
              <div className="w-36 text-right">
                <span className="text-[10px] text-neutral-400 block mb-1">ORBITE 360° // DÉFILEMENT</span>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00E599] transition-all duration-75" 
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* ── BARRE INFÉRIEURE : TÉLÉMÉTRIE EN DIRECT & INVITATION AU SCROLL ── */}
          <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-neutral-400 gap-2 border-t border-white/10 pt-4">
            <div className="flex items-center gap-3">
              <span>SCAN : <strong className="text-[#00E599]">ACTIF</strong></span>
              <span>•</span>
              <span>CAMÉRA : <strong className="text-white">{activePosture.cameraAngle}</strong></span>
              <span>•</span>
              <span>DESCENTE AU SOL : <strong className="text-white">{Math.round(avatarTranslateY)} PX</strong></span>
              <span>•</span>
              <span>COURBURE RACHIDIENNE : <strong className="text-[#00E599] font-bold text-xs">{currentRachisAngle}°</strong></span>
            </div>

            <div className="flex items-center gap-2 text-[#00E599]">
              <span className="animate-pulse">↓</span>
              <span className="uppercase tracking-widest font-bold">
                DÉFILEZ POUR POURSUIVRE L&apos;ORBITE 360° [ {currentRachisAngle}° ]
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. LA BENTO GRID DE TRANSITION (01, 02, 03 - TERMINAL STYLE)
          Transition fluide vers l'écosystème d'ingénierie BLF
          ════════════════════════════════════════════════════════════ */}
      <section id="bento-ecosystem" className="relative z-30 py-28 px-6 sm:px-12 bg-[#08090A] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E599] block mb-3">
                03 // LES TROIS PILIERS OPÉRATIONNELS
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.25rem] text-white tracking-[-0.03em] leading-[1.05]">
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
                <h3 className="font-heading font-bold text-2xl text-white group-hover:text-[#00E599] tracking-[-0.02em] transition-colors mb-4">
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
                <h3 className="font-heading font-bold text-2xl text-white tracking-[-0.02em] mb-4">
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
                <h3 className="font-heading font-bold text-2xl text-white group-hover:text-amber-400 tracking-[-0.02em] transition-colors mb-4">
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
