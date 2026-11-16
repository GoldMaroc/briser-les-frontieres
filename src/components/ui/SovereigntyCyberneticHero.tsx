"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SalatPosture {
  id: string;
  image: string;
  angleTarget: number;
  postureArabic: string;
  postureFrench: string;
  phaseLabel: string;
  keyMetric: string;
  subtitle: string;
  scientificInsight: string;
  sacredVerse: string;
}

const salatPostures: SalatPosture[] = [
  {
    id: "qiyam",
    image: "/images/salat_cycle/salat_01_qiyam_debout.jpg",
    angleTarget: 180,
    postureArabic: "QIYÂM",
    postureFrench: "DEBOUT",
    phaseLabel: "STATION VERTICALE",
    keyMetric: "+35% FOCUS PRÉFRONTAL",
    subtitle: "Alignement Vertébral & Ancrage Cognitif",
    scientificInsight: "La station debout rigoureuse désactive les micro-mouvements distractifs et synchronise l'attention sélective sur un point focal unique. Rupture immédiate avec la surcharge sensorielle et l'entropie numérique.",
    sacredVerse: "« Tiens-toi debout avec droiture pour la Vérité »"
  },
  {
    id: "incline_trans",
    image: "/images/salat_cycle/salat_01b_incline_transition.jpg",
    angleTarget: 135,
    postureArabic: "INFLEXION",
    postureFrench: "AMORCE DE FLEXION",
    phaseLabel: "AMORCE DE FLEXION 135°",
    keyMetric: "-8 BPM DÉBUT DE FREIN VAGAL",
    subtitle: "Désengagement de la Posture Dominante",
    scientificInsight: "Le buste bascule en avant à 45°. Les récepteurs proprioceptifs dorsaux signalent le passage d'une posture de contrôle à une posture d'humilité consentie.",
    sacredVerse: "« Ils se courbent et s'inclinent en cherchant Sa Grâce »"
  },
  {
    id: "ruku",
    image: "/images/salat_cycle/salat_02_ruku_incline.jpg",
    angleTarget: 90,
    postureArabic: "RUKÛ'",
    postureFrench: "INCLINÉ",
    phaseLabel: "ANGLE DROIT 90°",
    keyMetric: "-15 BPM DÉCÉLÉRATION VAGALE",
    subtitle: "Flexion Rachidienne & Décompression Lombaire",
    scientificInsight: "L'inclinaison à 90° dos plat étire toute la chaîne postérieure et décompresse les disques lombaires. L'inversion hydrostatique partielle prépare le cerveau à l'afflux sanguin.",
    sacredVerse: "« Et inclinez-vous avec ceux qui s'inclinent »"
  },
  {
    id: "descent_trans",
    image: "/images/salat_cycle/salat_02b_descent_transition.jpg",
    angleTarget: 45,
    postureArabic: "DESCENTE",
    postureFrench: "PLONGÉE VERS LE SOL",
    phaseLabel: "DESCENTE VERS LA TERRE 45°",
    keyMetric: "-20% CHUTE DU CORTISOL",
    subtitle: "Transition vers l'Ancrage Terrestre",
    scientificInsight: "Les genoux se posent au sol, les mains devancent le front. Le centre de gravité chute radicalement, préparant la décharge complète des tensions allostatiques.",
    sacredVerse: "« De la terre Nous vous avons créés, et en elle Nous vous ferons retourner »"
  },
  {
    id: "sujud",
    image: "/images/salat_cycle/salat_03_sujud_prosterne.jpg",
    angleTarget: 0,
    postureArabic: "SUJÛD",
    postureFrench: "PROSTERNÉ",
    phaseLabel: "CONTACT TERRESTRE 0°",
    keyMetric: "-27.3% CORTISOL · 0V POTENTIEL",
    subtitle: "Irrigation Frontale & Earthing (7 Points au Sol)",
    scientificInsight: "L'acmé suprême de la Salât. Le front au sol induit une hyper-irrigation sanguine directe du cortex préfrontal et éteint le réseau du mode par défaut (DMN). Les 7 points au contact de la terre évacuent les charges électrostatiques.",
    sacredVerse: "« Prosterne-toi et rapproche-toi » (Sourate Al-'Alaq)"
  },
  {
    id: "dua",
    image: "/images/salat_cycle/salat_04_dua_invocation.jpg",
    angleTarget: 90,
    postureArabic: "DU'Â",
    postureFrench: "INVOCATION",
    phaseLabel: "ASSISE SOUVERAINE",
    keyMetric: "ONDES THÊTA (4-8 HZ) · COHÉRENCE 0.1 HZ",
    subtitle: "Ondes Thêta & Mandat de Souveraineté",
    scientificInsight: "L'assise sur les talons avec les mains levées installe une cohérence cardio-respiratoire idéale (0.1 Hz). Le cerveau baigne dans les ondes Thêta favorables à l'intuition profonde et à la formulation souveraine de ses desseins.",
    sacredVerse: "« Invoquez-Moi, Je répondrai à votre appel » (Sourate Ghafir)"
  }
];

// Trajectoires continues des 4 nœuds biomécaniques clés
interface TrajectoryPoint {
  p: number;
  x: number;
  y: number;
  title: string;
  metric: string;
}

const trajectoryCerveau: TrajectoryPoint[] = [
  { p: 0.00, x: 51, y: 13, title: "Cortex Préfrontal", metric: "DORSOLATÉRAL ACTIF" },
  { p: 0.18, x: 38, y: 19, title: "Cortex Préfrontal", metric: "BASCULE EN COURS" },
  { p: 0.36, x: 26, y: 28, title: "Cerveau & Boîte Crânienne", metric: "PULSE INVERSÉ" },
  { p: 0.54, x: 22, y: 52, title: "Cerveau (Descente)", metric: "IRRIGATION GRADUELLE" },
  { p: 0.72, x: 20, y: 76, title: "Cortex Préfrontal (Front au Sol)", metric: "+40% PERFUSION SANGUINE" },
  { p: 1.00, x: 53, y: 20, title: "Cerveau (Ondes Thêta)", metric: "FRÉQUENCE 4-8 HZ" }
];

const trajectoryCoeur: TrajectoryPoint[] = [
  { p: 0.00, x: 52, y: 32, title: "Cœur & Thorax (Plexus)", metric: "MAIN SUR LE CŒUR" },
  { p: 0.18, x: 45, y: 34, title: "Cœur & Thorax", metric: "AMORCE FREIN VAGAL" },
  { p: 0.36, x: 38, y: 36, title: "Cœur & Cage Thoracique", metric: "-15 BPM DÉCÉLÉRATION" },
  { p: 0.54, x: 40, y: 44, title: "Cœur & Nerf Vague", metric: "STIMULATION PARASYMPATHIQUE" },
  { p: 0.72, x: 42, y: 52, title: "Cœur & Nerf Vague", metric: "PARASYMPATHIQUE 100%" },
  { p: 1.00, x: 54, y: 42, title: "Cœur & Cohérence Cardiaque", metric: "RÉSONANCE 0.1 HZ" }
];

const trajectoryRachis: TrajectoryPoint[] = [
  { p: 0.00, x: 47, y: 46, title: "Axe Vertébral", metric: "RACHIS 180° · TENSION 0" },
  { p: 0.18, x: 50, y: 35, title: "Axe Vertébral (135°)", metric: "FLEXION DORSALE 45°" },
  { p: 0.36, x: 54, y: 24, title: "Rachis Lombaire", metric: "DOS PLAT 90° · DÉCOMPRESSION" },
  { p: 0.54, x: 58, y: 34, title: "Rachis Lombaire (45°)", metric: "TRACTION LOMBO-SACRÉE" },
  { p: 0.72, x: 62, y: 44, title: "Rachis & Soumission", metric: "DISCIPLINE DU NAFS" },
  { p: 1.00, x: 59, y: 80, title: "Assise sur Talons", metric: "ANCRAGE PELVIEN" }
];

const trajectoryPieds: TrajectoryPoint[] = [
  { p: 0.00, x: 49, y: 91, title: "Pieds & Ancrage au Sol", metric: "STABILITÉ TERRESTRE" },
  { p: 0.18, x: 53, y: 74, title: "Mains aux Cuisses", metric: "GUIDAGE BIOMÉCANIQUE" },
  { p: 0.36, x: 57, y: 56, title: "Mains aux Genoux", metric: "VERROUILLAGE BIOMÉCANIQUE" },
  { p: 0.54, x: 38, y: 70, title: "Genoux à Terre", metric: "APPROCHE DU SOL" },
  { p: 0.72, x: 18, y: 84, title: "Earthing 7 Points", metric: "DIFFÉRENTIEL 0V" },
  { p: 1.00, x: 34, y: 43, title: "Mains en Du'â", metric: "CANAL DE RÉCEPTIVITÉ" }
];

function interpolateNode(trajectory: TrajectoryPoint[], progress: number) {
  if (progress <= trajectory[0].p) return trajectory[0];
  if (progress >= trajectory[trajectory.length - 1].p) return trajectory[trajectory.length - 1];
  for (let i = 0; i < trajectory.length - 1; i++) {
    const p1 = trajectory[i];
    const p2 = trajectory[i + 1];
    if (progress >= p1.p && progress <= p2.p) {
      const t = (progress - p1.p) / (p2.p - p1.p);
      const smoothT = (1 - Math.cos(t * Math.PI)) / 2;
      return {
        x: p1.x + (p2.x - p1.x) * smoothT,
        y: p1.y + (p2.y - p1.y) * smoothT,
        title: t < 0.5 ? p1.title : p2.title,
        metric: t < 0.5 ? p1.metric : p2.metric
      };
    }
  }
  return trajectory[0];
}

export default function SovereigntyCyberneticHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLElement>(null);

  // Synchronisation continue du cycle de la Salât avec le scroll
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

  // 1. CALCUL DE L'ANGLE DEGRÉ PAR DEGRÉ EN TEMPS RÉEL (180° -> 179° -> ... -> 0°)
  let currentRachisAngle = 180;
  if (scrollProgress <= 0.72) {
    const t = scrollProgress / 0.72;
    currentRachisAngle = Math.round(180 - t * 180); // 180° -> 0°
  } else {
    const t = (scrollProgress - 0.72) / 0.28;
    currentRachisAngle = Math.round(t * 90); // 0° -> 90° (Du'â)
  }

  // 2. DESCENTE PHYSIQUE DU PERSONNAGE DANS LE FOND AU FIL DU SCROLL
  // "le personnage est dans le fond général et on descend là, le personnage doit descendre dans le scroll de la page"
  let avatarTranslateY = 0;
  if (scrollProgress <= 0.72) {
    const t = scrollProgress / 0.72;
    // Descente fluide de 0px jusqu'à 135px (le personnage plonge vers la grille terrestre)
    avatarTranslateY = Math.pow(t, 1.25) * 135;
  } else {
    const t = (scrollProgress - 0.72) / 0.28;
    avatarTranslateY = 135 - t * 55; // Reste au sol en assise (80px)
  }

  const avatarPitch = Math.sin(Math.min(1, scrollProgress / 0.72) * Math.PI) * 12;
  const avatarScale = 1 - (scrollProgress <= 0.72 ? (scrollProgress / 0.72) * 0.08 : (1 - (scrollProgress - 0.72) / 0.28) * 0.08);

  // 3. INDEX ACTIF DE LA POSTURE PRINCIPALE (SUR 6 ÉTAPES DENSES)
  const postureTargets = [0.00, 0.18, 0.36, 0.54, 0.72, 0.90];
  let activePostureIndex = 0;
  let minDiff = 999;
  postureTargets.forEach((tgt, idx) => {
    const diff = Math.abs(scrollProgress - tgt);
    if (diff < minDiff) {
      minDiff = diff;
      activePostureIndex = idx;
    }
  });
  const activePosture = salatPostures[activePostureIndex];

  // Opacité continue des 6 images en transition fluide
  const getPostureOpacity = (index: number, p: number) => {
    const target = postureTargets[index];
    const span = 0.18;
    const dist = Math.abs(p - target);
    if (dist >= span) return 0;
    return (1 + Math.cos((dist / span) * Math.PI)) / 2;
  };

  // 4. COORDONNÉES DES NŒUDS ANATOMIQUES INTERPOLÉES EN CONTINU
  const nodeCerveau = interpolateNode(trajectoryCerveau, scrollProgress);
  const nodeCoeur = interpolateNode(trajectoryCoeur, scrollProgress);
  const nodeRachis = interpolateNode(trajectoryRachis, scrollProgress);
  const nodePieds = interpolateNode(trajectoryPieds, scrollProgress);

  const activeNodes = [nodeCerveau, nodeCoeur, nodeRachis, nodePieds];
  const radarRotation = Math.round((scrollProgress * 360) % 360);

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

        {/* Bas de page initial : Ticker & Indication de Scroll */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-2">
          
          {/* Ticker télémétrique */}
          <div className="font-mono text-[11px] text-neutral-400 space-y-1">
            <p className="text-white font-semibold">SOVEREIGNTY OPERATING SYSTEM // V.3.1</p>
            <p>CYCLES CIRCADIENS : SYNCHRONISÉS SUR L&apos;ANGLE SOLAIRE</p>
            <p className="text-[#00E599]">STATUS : CHARGE ALLOSTATIQUE EN RÉDUCTION</p>
          </div>

          {/* Indicateur de Défilement (Terminal style) */}
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
          "on voit le 180°, 179°, 178° etc. jusqu'au 0°"
          "le personnage doit descendre dans le scroll de la page"
          ════════════════════════════════════════════════════════════ */}
      <section 
        id="salat-kinetic-telemetry" 
        ref={trackRef} 
        className="relative w-full h-[420vh] bg-[#08090A]"
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] sm:w-[720px] sm:h-[720px] lg:w-[880px] lg:h-[880px] rounded-full border border-dashed border-[#00E599]/15 pointer-events-none transition-transform duration-100 ease-out"
            style={{
              transform: `translate(-50%, -50%) rotate(${radarRotation}deg)`
            }}
          >
            <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">0° RADAR</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">90° EST</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">180° SUD</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#00E599]/60 bg-black/60 px-2 py-0.5 rounded">270° OUEST</span>
          </div>

          {/* ── BARRE SUPÉRIEURE TÉLÉMÉTRIQUE (MINIMALISTE SANS BOUTONS) ── */}
          <div className="relative z-10 w-full flex items-center justify-between text-neutral-400 font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
              <span className="text-[#00E599] font-bold tracking-widest uppercase">
                TÉLÉMÉTRIE DYNAMIQUE DU CYCLE // KINÉTIQUE TEMPS RÉEL
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>ANGLE DU RACHIS : <strong className="text-[#00E599] font-mono text-sm">{currentRachisAngle}°</strong></span>
              <span>ROTATION RADAR : <strong className="text-white">{radarRotation}°</strong></span>
              <span>PHASE : <strong className="text-white">{activePosture.phaseLabel}</strong></span>
            </div>
          </div>

          {/* ── SCÈNE PRINCIPALE : L'AVATAR UNIQUE QUI DESCEND ET LES DONNÉES EN DIRECT ── */}
          <div className="relative z-20 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* COLONNE GAUCHE : COMPTEUR D'ANGLE 180° -> 0° & INFOS SWISS DYNAMIQUES */}
            <div className="lg:col-span-4 space-y-4 text-left transition-all duration-300">
              
              {/* COMPTEUR EN DIRECT DEGRÉ PAR DEGRÉ (180° -> 179° -> 178° ... -> 0°) */}
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
                    {currentRachisAngle > 90 
                      ? "QIYÂM ➔ RUKÛ' (FLEXION)" 
                      : currentRachisAngle > 0 
                      ? "RUKÛ' ➔ SUJÛD (DESCENTE)" 
                      : "SUJÛD (PROSTERNATION)"}
                  </span>
                </div>
              </div>

              {/* Titre Posture Monumental */}
              <div>
                <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
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

              {/* Explication Scientifique & Neurobiologique */}
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {activePosture.scientificInsight}
              </p>

              {/* Verset Sacré */}
              <p className="text-[11px] sm:text-xs font-serif italic text-amber-300/80 max-w-md border-l-2 border-[#00E599]/50 pl-3 py-0.5">
                {activePosture.sacredVerse}
              </p>

            </div>

            {/* COLONNE CENTRALE : LE PERSONNAGE UNIQUE EN DESCENTE PHYSIQUE AU SOL */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Repère Carré 1:1 avec DESCENTE DYNAMIQUE AU FIL DU SCROLL (translateY + pitch) */}
              <div 
                className="relative aspect-square w-[320px] sm:w-[460px] md:w-[540px] lg:w-[620px] max-h-[70vh] mx-auto flex items-center justify-center transition-transform duration-100 ease-out"
                style={{
                  perspective: "1200px",
                  transform: `perspective(1200px) translateY(${avatarTranslateY}px) rotateX(${avatarPitch}deg) scale(${avatarScale})`,
                  transformStyle: "preserve-3d"
                }}
              >
                
                {/* 1. Métamorphose Dense (6 Postures Progressifs du Debout au Sol) */}
                {salatPostures.map((stg, idx) => {
                  const op = getPostureOpacity(idx, scrollProgress);
                  return (
                    <div
                      key={stg.id}
                      className="absolute inset-0 transition-opacity duration-150 ease-out"
                      style={{
                        opacity: op,
                        maskImage: "radial-gradient(circle at 50% 50%, black 58%, rgba(0,0,0,0.85) 75%, transparent 95%)",
                        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 58%, rgba(0,0,0,0.85) 75%, transparent 95%)"
                      }}
                    >
                      <Image
                        src={stg.image}
                        alt={stg.postureFrench}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 768px) 340px, 620px"
                        className="object-contain object-center filter contrast-125 brightness-105"
                      />
                    </div>
                  );
                })}

                {/* 2. Réticules Biomécaniques : INTERPOLÉS ET EN MOUVEMENT CONTINU SUR L'ANATOMIE */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                  {activeNodes.map((node, nIdx) => (
                    <div
                      key={nIdx}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
                    >
                      <div className="flex items-center gap-2 group">
                        
                        {/* Réticule laser LiDAR pulsant */}
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E599] border-2 border-black" />
                        </span>

                        {/* Puce Télémétrique Flottante dans l'espace */}
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

            {/* COLONNE DROITE : INDICATEUR VERTICAL D'ANGLE ET DE PROGRESSION (TERMINAL STYLE) */}
            <div className="lg:col-span-2 hidden lg:flex flex-col items-end space-y-6 font-mono text-xs">
              <div className="relative pl-4 border-l border-white/15 space-y-6">
                {[
                  { label: "QIYÂM", deg: "180°", min: 135, isDua: false },
                  { label: "INFLEXION", deg: "135°", min: 110, isDua: false },
                  { label: "RUKÛ'", deg: "90°", min: 65, isDua: false },
                  { label: "DESCENTE", deg: "45°", min: 20, isDua: false },
                  { label: "SUJÛD", deg: "0°", min: -1, isDua: false },
                  { label: "DU'Â", deg: "90°", min: 0, isDua: true }
                ].map((item, idx) => {
                  const isActive = item.isDua 
                    ? scrollProgress > 0.72 
                    : (scrollProgress <= 0.72 && currentRachisAngle <= (idx === 0 ? 180 : item.min + 45) && currentRachisAngle >= item.min);
                  return (
                    <div key={idx} className="relative transition-all duration-200">
                      {isActive && (
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00E599] shadow-[0_0_12px_#00E599]" />
                      )}
                      <p className={`font-mono text-[10px] tracking-widest uppercase ${isActive ? "text-[#00E599] font-bold" : "text-neutral-500"}`}>
                        {item.label}
                      </p>
                      <p className={`font-sans font-bold text-xs ${isActive ? "text-white" : "text-neutral-500"}`}>
                        {item.deg}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Jauge de progression continue */}
              <div className="w-32 text-right">
                <span className="text-[10px] text-neutral-400 block mb-1">DESCENTE RACHIDIENNE</span>
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
              <span>SCAN LASER : <strong className="text-[#00E599]">ACTIF</strong></span>
              <span>•</span>
              <span>DESCENTE AU SOL : <strong className="text-white">{Math.round(avatarTranslateY)} PX</strong></span>
              <span>•</span>
              <span>COURBURE RACHIDIENNE : <strong className="text-[#00E599] font-bold text-xs">{currentRachisAngle}°</strong></span>
            </div>

            <div className="flex items-center gap-2 text-[#00E599]">
              <span className="animate-pulse">↓</span>
              <span className="uppercase tracking-widest font-bold">
                DÉFILEZ POUR POURSUIVRE LA DESCENTE [ {currentRachisAngle}° ]
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
