"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SalatPosture {
  id: string;
  cameraAngle: string;
  angleTarget: number;
  postureArabic: string;
  postureFrench: string;
  phaseLabel: string;
  keyMetric: string;
  subtitle: string;
  scientificInsight: string;
  sacredVerse: string;
  frameRange: [number, number];
  nodes: { title: string; metric: string; coords: { x: number; y: number } }[];
}

const TOTAL_FRAMES = 96;

const salatPostures: SalatPosture[] = [
  {
    id: "qiyam",
    cameraAngle: "VUE DE FACE (0°)",
    angleTarget: 180,
    postureArabic: "QIYÂM",
    postureFrench: "DEBOUT DE FACE",
    phaseLabel: "ALIGNEMENT VERTICAL 180°",
    keyMetric: "+35% FOCUS PRÉFRONTAL",
    subtitle: "Alignement Rachidien & Ancrage Cognitif",
    scientificInsight: "La station debout de face rigoureuse désactive les micro-mouvements distractifs et synchronise l'attention sélective sur un point focal unique. Rupture immédiate avec la surcharge sensorielle et l'entropie numérique.",
    sacredVerse: "« Tiens-toi debout avec droiture pour la Vérité »",
    frameRange: [0, 23],
    nodes: [
      { title: "Cortex Préfrontal (Cerveau)", metric: "DORSOLATÉRAL ACTIF", coords: { x: 50, y: 15 } },
      { title: "Cœur & Thorax (Plexus)", metric: "MAINS SUR LA POITRINE", coords: { x: 50, y: 34 } },
      { title: "Axe Vertébral (Rachis 180°)", metric: "TENSION RACHIDIENNE : 0", coords: { x: 50, y: 52 } },
      { title: "Pieds & Ancrage au Sol", metric: "STABILITÉ TERRESTRE", coords: { x: 50, y: 92 } }
    ]
  },
  {
    id: "ruku",
    cameraAngle: "VUE 45° DROITE (3/4)",
    angleTarget: 90,
    postureArabic: "RUKÛ'",
    postureFrench: "INCLINÉ 45° DROITE",
    phaseLabel: "FLEXION RACHIDIENNE 90°",
    keyMetric: "-15 BPM DÉCÉLÉRATION VAGALE",
    subtitle: "Flexion Rachidienne & Décompression Lombaire",
    scientificInsight: "L'inclinaison à 90° dos plat étire toute la chaîne postérieure et décompresse les vertèbres lombaires. L'inversion hydrostatique partielle prépare le cerveau à l'afflux sanguin tout en soumettant consciemment la volonté de l'ego.",
    sacredVerse: "« Et inclinez-vous avec ceux qui s'inclinent »",
    frameRange: [24, 47],
    nodes: [
      { title: "Cerveau & Boîte Crânienne", metric: "PULSE CÉRÉBRAL INVERSÉ", coords: { x: 74, y: 28 } },
      { title: "Rachis Lombaire (Dos Plat 90°)", metric: "DÉCOMPRESSION DISCO-RACHIDIENNE", coords: { x: 38, y: 22 } },
      { title: "Cœur & Cage Thoracique", metric: "-15 BPM IMMÉDIAT", coords: { x: 56, y: 32 } },
      { title: "Mains aux Genoux", metric: "VERROUILLAGE BIOMÉCANIQUE", coords: { x: 42, y: 56 } }
    ]
  },
  {
    id: "sujud",
    cameraAngle: "VUE 90° À DROITE (PROFIL)",
    angleTarget: 0,
    postureArabic: "SUJÛD",
    postureFrench: "PROSTERNÉ 90° DROITE",
    phaseLabel: "CONTACT TERRESTRE 0°",
    keyMetric: "-27.3% CORTISOL · 0V POTENTIEL",
    subtitle: "Irrigation Frontale & Earthing (7 Points au Sol)",
    scientificInsight: "L'acmé suprême de la Salât vue de profil droit à 90°. Le front et le nez au sol induisent une hyper-irrigation sanguine directe du cortex préfrontal et éteignent le réseau du mode par défaut (DMN). Les 7 points de contact évacuent les charges électrostatiques.",
    sacredVerse: "« Prosterne-toi et rapproche-toi » (Sourate Al-'Alaq)",
    frameRange: [48, 71],
    nodes: [
      { title: "Cortex Préfrontal (Front au Sol)", metric: "+40% PERFUSION SANGUINE", coords: { x: 82, y: 72 } },
      { title: "Mains au Sol (Grounding)", metric: "POINTS 2 & 3 / 7", coords: { x: 74, y: 75 } },
      { title: "Cœur & Nerf Vague", metric: "PARASYMPATHIQUE 100%", coords: { x: 62, y: 54 } },
      { title: "Earthing 7 Points", metric: "DIFFÉRENTIEL 0V TERRESTRE", coords: { x: 22, y: 68 } }
    ]
  },
  {
    id: "dua",
    cameraAngle: "VUE 90° À GAUCHE (PROFIL)",
    angleTarget: 90,
    postureArabic: "DU'Â",
    postureFrench: "INVOCATION 90° GAUCHE",
    phaseLabel: "ASSISE SOUVERAINE & MAINS LEVÉES",
    keyMetric: "ONDES THÊTA (4-8 HZ) · COHÉRENCE 0.1 HZ",
    subtitle: "Ondes Thêta & Mandat de Souveraineté",
    scientificInsight: "L'assise sur les talons (Jalsah) vue de profil gauche à 90° avec les mains levées en coupe installe une cohérence cardio-respiratoire parfaite (0.1 Hz). Le cerveau baigne dans les ondes Thêta propices à l'intuition profonde et à l'élévation céleste.",
    sacredVerse: "« Invoquez-Moi, Je répondrai à votre appel » (Sourate Ghafir)",
    frameRange: [72, 95],
    nodes: [
      { title: "Cerveau (Ondes Thêta)", metric: "FRÉQUENCE 4-8 HZ", coords: { x: 54, y: 22 } },
      { title: "Mains Ouvertes en Du'â", metric: "CANAL DE RÉCEPTIVITÉ", coords: { x: 34, y: 38 } },
      { title: "Cœur & Cohérence Cardiaque", metric: "RÉSONANCE 0.1 HZ", coords: { x: 56, y: 46 } },
      { title: "Assise sur Talons", metric: "ANCRAGE PELVIEN", coords: { x: 50, y: 84 } }
    ]
  }
];

export default function SovereigntyCyberneticHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Buffer d'images préchargées pour scrubbing 60/120fps instantané
  const framesBuffer = useRef<HTMLImageElement[]>([]);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // 1. Préchargement optimisé des 96 images WebP
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = i.toString().padStart(3, "0");
      img.src = `/images/salat_frames/frame_${numStr}.webp`;
      images.push(img);
    }

    framesBuffer.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // 2. Gestionnaire de défilement (Scroll & Touch)
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      if (trackHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / trackHeight));
      targetProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Boucle de rendu Canvas & Physique de lévitation cosmique inversée
  useEffect(() => {
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lissage inertiel (lerp) pour un défilement soyeux
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.15;
      const p = smoothProgress.current;
      setScrollProgress(p);

      // Frame exacte (0 à 95)
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(p * TOTAL_FRAMES)));
      setCurrentFrame(frameIdx);

      // ── RENDU DU MANNEQUIN SUR LE CANVAS PRINCIPAL ──
      const canvas = canvasRef.current;
      if (canvas && framesBuffer.current.length > 0) {
        const ctx = canvas.getContext("2d");
        const img = framesBuffer.current[frameIdx];

        if (ctx && img && img.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }

      // ── RENDU DU FOND COSMIQUE QUI DESCEND (PARALLAXE INVERSÉE) ──
      const starsCanvas = starsCanvasRef.current;
      if (starsCanvas) {
        const sCtx = starsCanvas.getContext("2d");
        if (sCtx) {
          sCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
          const w = starsCanvas.width;
          const h = starsCanvas.height;

          // Vitesse de descente du fond cosmique liée au défilement vers le bas
          const cosmicOffset = (p * 450 + time * 0.015) % h;

          sCtx.fillStyle = "rgba(0, 229, 153, 0.4)";
          for (let i = 0; i < 35; i++) {
            const sx = (i * 97) % w;
            const sy = ((i * 131) + cosmicOffset) % h;
            const size = (i % 3 === 0) ? 1.5 : 1.0;
            sCtx.fillRect(sx, sy, size, size);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Détermination de la posture active selon la frame courante
  const activePostureIdx = Math.min(
    3,
    Math.max(
      0,
      salatPostures.findIndex(
        (posture) => currentFrame >= posture.frameRange[0] && currentFrame <= posture.frameRange[1]
      )
    )
  );
  const activePosture = salatPostures[activePostureIdx] || salatPostures[0];

  // Calcul du degré dynamique affiché (180° -> 90° -> 0° -> 90°)
  let currentRachisAngle = 180;
  if (currentFrame < 24) {
    const t = currentFrame / 24;
    currentRachisAngle = Math.round(180 - t * 90);
  } else if (currentFrame < 48) {
    const t = (currentFrame - 24) / 24;
    currentRachisAngle = Math.round(90 - t * 90);
  } else if (currentFrame < 72) {
    const t = (currentFrame - 48) / 24;
    currentRachisAngle = Math.round(t * 90);
  } else {
    currentRachisAngle = 90;
  }

  // ── PHYSIQUE COSMIQUE INVERSÉE : FOND QUI DESCEND, HOMME QUI MONTE ──
  const spaceBackgroundTranslateY = scrollProgress * 180; // Descente du fond spatial
  const characterAscentTranslateY = -scrollProgress * 90; // L'homme qui s'élève vers le haut

  return (
    /* IMPORTANT : Pas d'overflow-hidden sur ce conteneur racine pour préserver le sticky natif */
    <div className="relative w-full bg-[#08090A] text-white">

      {/* ════════════════════════════════════════════════════════════
          1. SECTION HERO PRINCIPALE (FULL BLEED)
          Typographie Systemia d'Ayocin + Boutons Pillules avec Flèche (↗)
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-4 sm:px-8 lg:px-12 overflow-hidden">
        
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-black/35 to-[#08090A]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,9,10,0.85)_100%)]" />
        </div>

        {/* Badge Télémétrie Supérieur */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
            <span className="font-mono text-[9px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase">
              CABINET BLF // ARCHITECTURE DU CERVEAU & EXÉGÈSE
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-[#00E599] bg-[#00E599]/10 px-3 py-1 rounded-full border border-[#00E599]/20">
            SYSTÈME OPÉRATIONNEL ACTIF
          </span>
        </div>

        {/* ── LE MONOLITHE TYPOGRAPHIQUE AYOCIN ── */}
        <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-4 sm:py-8">
          <div className="transition-all duration-700">
            <span className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-3.5 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
              // RÉINITIALISATION BIOLOGIQUE
            </span>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[5.25rem] tracking-[-0.035em] text-white leading-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
              Nous avons réinventé<br />
              la reconquête de l&apos;âme<br />
              par la prosternation.
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-xl text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              La prosternation (Sujûd) n&apos;est pas une soumission passive. C&apos;est l&apos;arme neurobiologique suprême pour dompter le cortisol et commander son esprit.
            </p>

            {/* CTAs Centraux Intégrés — Style Ayocin Floating Pill */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/audit"
                className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#00E599] text-black font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,229,153,0.45)] hover:shadow-[0_0_55px_rgba(0,229,153,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Passer l&apos;Audit Prière & Cerveau (3 min)</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
              <Link
                href="/livres"
                className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Les Traités de l&apos;Ingénieur</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de page initial : Ticker & Indication de Scroll */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pb-2">
          <div className="font-mono text-[9px] sm:text-[11px] text-neutral-400 space-y-1">
            <p className="text-white font-semibold">SOVEREIGNTY OPERATING SYSTEM // V.3.1</p>
            <p>CYCLES CIRCADIENS : SYNCHRONISÉS SUR L&apos;ANGLE SOLAIRE</p>
            <p className="text-[#00E599]">STATUS : CHARGE ALLOSTATIQUE EN RÉDUCTION</p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-end">
              <span className="font-heading font-bold text-xs tracking-widest uppercase text-white">
                DÉFILEZ POUR ACTIVER LA MÉTAMORPHOSE
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400">
                [ 96 FRAMES // 24 PAR POSITION ]
              </span>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-[#00E599] animate-bounce">
              ↓
            </div>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          2. SECTION SCROLLYTELLING À 96 FRAMES & PARALLAXE INVERSÉE
          - Debout de face (0°)
          - Incliné 45° droite
          - Prosterné 90° droite
          - Invocation 90° gauche
          Le fond descend, l'homme monte au défilement (comme un homme qui vogue dans l'espace)
          ════════════════════════════════════════════════════════════ */}
      <section 
        id="salat-kinetic-telemetry" 
        ref={trackRef} 
        className="relative w-full h-[450vh] bg-[#08090A]"
      >
        {/* Conteneur Plein Écran Épinglé (Sticky Top 0 Viewport - Pinned across 450vh) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none select-none">
          
          {/* 1. FOND COSMIQUE GALACTIQUE PROFOND (INSPIRATION AYOCIN - HAUTE DÉFINITION NATURELLE SANS QUADRILLAGE) */}
          <div 
            className="absolute -top-[25%] -bottom-[25%] -left-[10%] -right-[10%] pointer-events-none transition-transform duration-75 ease-out overflow-hidden"
            style={{
              transform: `translateY(${spaceBackgroundTranslateY}px)`
            }}
          >
            {/* Image Haute Définition de la Galaxie Cosmique et du Champ Stellaire */}
            <Image
              src="/images/cosmic_starfield.webp"
              alt="Galaxie Céleste et Ciel Étoilé"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter brightness-110 contrast-120 pointer-events-none select-none"
            />
            
            {/* Voile sombre très subtil pour préserver la lisibilité de la typographie Ayocin */}
            <div className="absolute inset-0 bg-[#08090A]/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,9,10,0.85)_100%)] pointer-events-none" />

            {/* Canvas des poussières cosmiques et étoiles scintillantes en dérive */}
            <canvas 
              ref={starsCanvasRef} 
              width={1200} 
              height={800} 
              className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen pointer-events-none"
            />
          </div>

          {/* 2. LE MANNEQUIN AU CENTRE ABSOLU (L'HOMME QUI VOGUE DANS LA GALAXIE, PUR ET SANS CADRE NI POINTS PARASITES) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div 
              className="relative w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] flex items-center justify-center transition-transform duration-75 ease-out"
              style={{
                transform: `translateY(${characterAscentTranslateY}px)`
              }}
            >
              {/* Image transparente PNG/WebP avec mode screen : aucun fond, aucun carré noir, intégration 100% pure */}
              <img
                src={`/images/salat_frames/frame_${currentFrame.toString().padStart(3, "0")}.webp`}
                alt={`Salât Posture ${currentFrame}`}
                className="w-full h-full object-contain filter contrast-125 brightness-110 drop-shadow-[0_0_50px_rgba(0,229,153,0.5)] pointer-events-none select-none mix-blend-screen"
              />
            </div>
          </div>

          {/* 3. COUCHE TÉLÉMÉTRIQUE SUPÉRIEURE (FIXÉE SOUS LE HEADER) */}
          <div className="absolute top-16 sm:top-20 inset-x-3 sm:inset-x-8 lg:inset-x-12 z-20 flex items-center justify-between text-neutral-400 font-mono text-[9px] sm:text-xs pointer-events-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00E599] animate-ping" />
              <span className="text-[#00E599] font-bold tracking-widest uppercase">
                {activePosture.postureFrench} // {activePosture.cameraAngle}
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <span>ANGLE : <strong className="text-[#00E599] font-mono text-xs sm:text-sm">{currentRachisAngle}°</strong></span>
              <span className="hidden sm:inline">FRAME : <strong className="text-white font-mono">{currentFrame + 1} / {TOTAL_FRAMES}</strong></span>
            </div>
          </div>

          {/* 4. COUCHE HUD FLOTTANTE BASSE (GAUCHE & DROITE) */}
          <div className="absolute bottom-10 sm:bottom-12 inset-x-3 sm:inset-x-8 lg:inset-x-12 z-20 flex items-end justify-between pointer-events-none">
            
            {/* BLOC GAUCHE : ANGLE ET POSTURE */}
            <div className="max-w-xs sm:max-w-md lg:max-w-lg space-y-1 sm:space-y-1.5 text-left pointer-events-auto bg-[#08090A]/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 shadow-2xl">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="font-mono font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tighter leading-none">
                  {currentRachisAngle}
                </span>
                <span className="font-mono font-bold text-xl sm:text-2xl text-[#00E599]">°</span>
                <div className="flex flex-col pl-2 border-l border-[#00E599]/40 ml-1">
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#00E599] font-bold">
                    INCLINAISON RACHIDIENNE
                  </span>
                  <span className="font-mono text-[7px] sm:text-[8px] text-neutral-400">
                    {activePosture.cameraAngle}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg sm:text-2xl lg:text-3xl tracking-[-0.03em] text-white leading-none">
                  {activePosture.postureArabic}
                </h2>
                <p className="font-sans font-bold text-[11px] sm:text-sm text-neutral-300 mt-0.5">
                  {activePosture.postureFrench} · <span className="text-[#00E599] font-mono text-[9px] sm:text-[11px]">{activePosture.subtitle}</span>
                </p>
              </div>

              <div className="inline-block font-mono text-[8px] sm:text-[10px] font-bold text-[#00E599] bg-[#00E599]/15 border border-[#00E599]/30 px-2 py-0.5 rounded-full">
                {activePosture.keyMetric}
              </div>

              <p className="hidden sm:block text-[10px] sm:text-[11px] text-neutral-300 font-sans leading-snug max-w-sm">
                {activePosture.scientificInsight}
              </p>

              <p className="text-[8px] sm:text-[10px] font-sans italic text-amber-300/80 max-w-sm border-l-2 border-[#00E599]/50 pl-2">
                {activePosture.sacredVerse}
              </p>
            </div>

            {/* BLOC DROIT : JAUGE DES 4 ÉTAPES EXACTES */}
            <div className="hidden lg:flex flex-col items-end space-y-2.5 font-mono text-xs pointer-events-auto bg-[#08090A]/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 shadow-2xl">
              <div className="relative pl-3 border-l border-white/15 space-y-3">
                {[
                  { label: "DEBOUT DE FACE", deg: "180°", cam: "VUE 0°", idx: 0 },
                  { label: "INCLINÉ 45° DROITE", deg: "90°", cam: "VUE 3/4 DROITE", idx: 1 },
                  { label: "PROSTERNÉ 90° DROITE", deg: "0°", cam: "PROFIL DROIT", idx: 2 },
                  { label: "INVOCATION 90° GAUCHE", deg: "90°", cam: "PROFIL GAUCHE", idx: 3 }
                ].map((item) => {
                  const isActive = activePostureIdx === item.idx;
                  return (
                    <div key={item.idx} className="relative transition-all duration-200 text-right">
                      {isActive && (
                        <span className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_10px_#00E599]" />
                      )}
                      <p className={`font-mono text-[9px] tracking-widest uppercase ${isActive ? "text-[#00E599] font-bold" : "text-neutral-500"}`}>
                        {item.label} ({item.deg})
                      </p>
                      <p className={`font-sans text-[10px] ${isActive ? "text-white font-semibold" : "text-neutral-500"}`}>
                        {item.cam}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="w-32 text-right">
                <span className="text-[8px] text-neutral-400 block mb-1 font-mono">FRAME {currentFrame + 1}/96</span>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00E599] transition-all duration-75" 
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* 5. BARRE INFÉRIEURE : STATUT & CUE */}
          <div className="absolute bottom-2 inset-x-3 sm:inset-x-8 lg:inset-x-12 z-20 flex items-center justify-between font-mono text-[8px] text-neutral-400 border-t border-white/10 pt-1 pointer-events-none">
            <div className="flex items-center gap-2 flex-wrap">
              <span>SCAN : <strong className="text-[#00E599]">ACTIF</strong></span>
              <span>•</span>
              <span>CAMÉRA : <strong className="text-white">{activePosture.cameraAngle}</strong></span>
              <span>•</span>
              <span>LÉVITATION : <strong className="text-[#00E599]">{Math.abs(Math.round(characterAscentTranslateY))} PX</strong></span>
              <span>•</span>
              <span>COURBURE : <strong className="text-[#00E599] font-bold">{currentRachisAngle}°</strong></span>
            </div>

            <div className="flex items-center gap-1.5 text-[#00E599]">
              <span className="animate-pulse">↓</span>
              <span className="uppercase tracking-widest font-bold">
                SCROLLEZ POUR CONDUIRE L&apos;ASCENSION [ {currentRachisAngle}° ]
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. LA BENTO GRID DE TRANSITION (01, 02, 03)
          ════════════════════════════════════════════════════════════ */}
      <section id="bento-ecosystem" className="relative z-30 py-20 px-4 sm:px-8 lg:px-12 bg-[#08090A] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E599] block mb-2 sm:mb-3">
                03 // LES TROIS PILIERS OPÉRATIONNELS
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-[3rem] text-white tracking-[-0.03em] leading-[1.05]">
                Une infrastructure complète<br />
                pour reprendre votre souveraineté.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-sans">
              De l&apos;analyse neuro-comportementale à l&apos;exégèse coranique de haute précision, choisissez votre porte d&apos;entrée.
            </p>
          </div>

          {/* Grille Bento 3 Colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* CARTE 01 : DIAGNOSTIC INITIAL */}
            <Link
              href="/audit"
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/10 hover:border-[#00E599]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[#00E599]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00E599]">
                    01 // DIAGNOSTIC INITIAL
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-[#00E599] group-hover:text-black group-hover:border-[#00E599] transition-all">
                    ↗
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#00E599] tracking-[-0.02em] transition-colors mb-3 sm:mb-4">
                  L&apos;Audit de Souveraineté
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  Cartographiez en 3 minutes votre niveau de fatigue décisionnelle, votre vulnérabilité à l&apos;entropie et la régularité neuro-biologique de votre Salât.
                </p>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/5 mt-6 sm:mt-8 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">DURÉE : 3 MINUTES</span>
                <span className="text-[#00E599] font-bold uppercase">Lancer l&apos;Audit →</span>
              </div>
            </Link>

            {/* CARTE 02 : LES TRAITÉS DE L'INGÉNIEUR */}
            <Link
              href="/livres"
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                    02 // LES TRAITÉS DE L&apos;INGÉNIEUR
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                    ↗
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-[-0.02em] mb-3 sm:mb-4">
                  Les 3 Livres Majeurs
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  Reconstruisez vos fondations intellectuelles et comportementales avec <em>Adam, Père de l&apos;Humanité</em>, <em>Les Secrets du Retour vers Allah</em> et <em>Ar-Rahman</em>.
                </p>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/5 mt-6 sm:mt-8 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">FORMATS : RELIÉ & NUMÉRIQUE</span>
                <span className="text-white font-bold uppercase">Découvrir le Catalogue →</span>
              </div>
            </Link>

            {/* CARTE 03 : INTERPOSITION EXÉCUTIVE */}
            <Link
              href="/candidature"
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                    03 // INTERPOSITION EXÉCUTIVE
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all">
                    ↗
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-amber-400 tracking-[-0.02em] transition-colors mb-3 sm:mb-4">
                  Mentorat & Protocole C.O.M.E.S.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  Pour les dirigeants et croyants exigeants : 1, 3 ou 9 mois d&apos;immersion privée pour verrouiller votre discipline, vos rythmes circadiens et décupler votre impact.
                </p>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/5 mt-6 sm:mt-8 flex items-center justify-between text-xs font-mono">
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
