"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SalatStageNode {
  title: string;
  metric: string;
  description: string;
  coords: { x: number; y: number }; // Pourcentage exact dans le repère carré 1:1
}

interface SalatStage {
  id: string;
  stepNumber: string;
  postureArabic: string;
  postureFrench: string;
  subtitle: string;
  angle: string;
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
    image: "/images/salat_cycle/salat_01_qiyam_debout.jpg",
    keyMetric: "+35% FOCUS PRÉFRONTAL",
    metricLabel: "IMMUNITÉ COGNITIVE & ANCRAGE RADICAL",
    sacredVerse: "« Tiens-toi debout avec droiture pour la Vérité »",
    scientificInsight: "La station debout rigoureuse désactive les micro-mouvements distractifs et synchronise l'attention sélective sur un point focal unique. Rupture immédiate avec la surcharge sensorielle et l'entropie numérique.",
    nodes: [
      { title: "Cortex Préfrontal (Cerveau)", metric: "DORSOLATÉRAL ACTIF", description: "Focalisation attentionnelle maximale et extinction du multitâche", coords: { x: 51, y: 13 } },
      { title: "Cœur & Thorax (Plexus)", metric: "MAIN SUR LE CŒUR", description: "Fermeture du circuit proprioceptif et apaisement cardio-respiratoire", coords: { x: 52, y: 32 } },
      { title: "Axe Vertébral (Rachis 180°)", metric: "TENSION RACHIDIENNE : 0", description: "Alignement vertical parfait éliminant les compensations posturales", coords: { x: 47, y: 46 } },
      { title: "Pieds & Ancrage au Sol", metric: "STABILITÉ TERRESTRE", description: "Enracinement au sol rétablissant la proprioception spatiale", coords: { x: 49, y: 91 } }
    ]
  },
  {
    id: "ruku",
    stepNumber: "02",
    postureArabic: "RUKÛ'",
    postureFrench: "INCLINÉ",
    subtitle: "Flexion Rachidienne & Désengagement de l'Ego",
    angle: "90°",
    image: "/images/salat_cycle/salat_02_ruku_incline.jpg",
    keyMetric: "-15 BPM DÉCÉLÉRATION VAGALE",
    metricLabel: "DÉCOMPRESSION DU RACHIS & SOUMISSION CONSCIENTE",
    sacredVerse: "« Et inclinez-vous avec ceux qui s'inclinent »",
    scientificInsight: "L'inclinaison à 90° dos plat étire toute la chaîne postérieure et décompresse les vertèbres lombaires. L'inversion hydrostatique partielle prépare le cerveau à l'afflux sanguin tout en soumettant consciemment la volonté de l'ego.",
    nodes: [
      { title: "Cerveau & Boîte Crânienne", metric: "PULSE CÉRÉBRAL INVERSÉ", description: "Abaissement du flux d'urgence et afflux sanguin modéré", coords: { x: 26, y: 28 } },
      { title: "Rachis Lombaire (Dos Plat 90°)", metric: "DÉCOMPRESSION DISCO-RACHIDIENNE", description: "Traction axiale douce éliminant les spasmes posturaux", coords: { x: 54, y: 24 } },
      { title: "Cœur & Cage Thoracique", metric: "-15 BPM IMMÉDIAT", description: "Frein vagal actif diminuant la pression systolique", coords: { x: 38, y: 36 } },
      { title: "Mains aux Genoux", metric: "VERROUILLAGE BIOMÉCANIQUE", description: "Angle droit parfait stabilisant le centre de gravité", coords: { x: 57, y: 56 } }
    ]
  },
  {
    id: "sujud",
    stepNumber: "03",
    postureArabic: "SUJÛD",
    postureFrench: "PROSTERNÉ",
    subtitle: "Irrigation Frontale & Earthing (7 Points au Sol)",
    angle: "0°",
    image: "/images/salat_cycle/salat_03_sujud_prosterne.jpg",
    keyMetric: "-27.3% CORTISOL · 0V POTENTIEL",
    metricLabel: "EXTINCTION DU DMN & DÉCHARGE ÉLECTROSTATIQUE",
    sacredVerse: "« Prosterne-toi et rapproche-toi » (Sourate Al-'Alaq)",
    scientificInsight: "L'acmé suprême de la Salât. Le front au sol induit une hyper-irrigation sanguine directe du cortex préfrontal et éteint le réseau du mode par défaut (DMN). Les 7 points au contact de la terre évacuent les charges électrostatiques (Earthing absolu).",
    nodes: [
      { title: "Cortex Préfrontal (Front au Sol)", metric: "+40% PERFUSION SANGUINE", description: "Irrigation massive du lobe de la décision et extinction du bavardage mental", coords: { x: 20, y: 76 } },
      { title: "Cœur & Nerf Vague", metric: "PARASYMPATHIQUE 100%", description: "Stimulation mécanique profonde du nerf vague par la posture", coords: { x: 42, y: 52 } },
      { title: "Earthing 7 Points au Sol", metric: "DIFFÉRENTIEL 0V", description: "Neutralisation instantanée des charges électrostatiques des écrans", coords: { x: 18, y: 84 } },
      { title: "Rachis & Statut de Khalîfa", metric: "DISCIPLINE DU NAFS", description: "L'abandon complet devant l'Absolu restaure la souveraineté sur son monde", coords: { x: 62, y: 44 } }
    ]
  },
  {
    id: "dua",
    stepNumber: "04",
    postureArabic: "DU'Â",
    postureFrench: "INVOCATION",
    subtitle: "Ondes Thêta & Mandat de Souveraineté",
    angle: "90°",
    image: "/images/salat_cycle/salat_04_dua_invocation.jpg",
    keyMetric: "ONDES THÊTA (4-8 HZ) · COHÉRENCE 0.1 HZ",
    metricLabel: "RÉCEPTIVITÉ SPIRITUELLE & DISSIPATION DU NAFS",
    sacredVerse: "« Invoquez-Moi, Je répondrai à votre appel » (Sourate Ghafir)",
    scientificInsight: "L'assise méditative (Jalassah) avec les mains levées installe une cohérence cardio-respiratoire parfaite (0.1 Hz). Le cerveau baigne dans les ondes Thêta favorables à l'intuition profonde, au pardon et à la formulation souveraine de ses desseins.",
    nodes: [
      { title: "Cerveau (Ondes Thêta)", metric: "FRÉQUENCE 4-8 HZ", description: "Clarté exégétique et réorganisation mémorielle sans bruit mental", coords: { x: 53, y: 20 } },
      { title: "Mains Ouvertes en Du'â", metric: "CANAL DE RÉCEPTIVITÉ", description: "Posture d'abandon actif et d'accueil des requêtes spirituelles", coords: { x: 34, y: 43 } },
      { title: "Cœur & Cohérence Cardiaque", metric: "RÉSONANCE 0.1 HZ", description: "Synchronisation parfaite entre respiration et pulsation cardiaque", coords: { x: 54, y: 42 } },
      { title: "Assise sur Talons", metric: "ANCRAGE PELVIEN", description: "Stabilité pyramidale parfaite verrouillant l'attention", coords: { x: 59, y: 80 } }
    ]
  }
];

export default function SovereigntyCyberneticHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLElement>(null);

  // Synchronisation continue du cycle de la Salât avec le scroll de l'utilisateur
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

  // Calcul de l'étape active selon la progression du scroll (0.0 à 1.0)
  const activeIdx = Math.min(3, Math.max(0, Math.floor(scrollProgress * 3.999)));
  const activeStage = salatStages[activeIdx];

  // Fonction de crossfade continu et fluide entre les 4 postures
  const getStageOpacity = (stageIndex: number, p: number) => {
    if (stageIndex === 0) {
      if (p <= 0.20) return 1;
      if (p >= 0.28) return 0;
      return (0.28 - p) / 0.08;
    }
    if (stageIndex === 1) {
      if (p < 0.20) return 0;
      if (p >= 0.20 && p < 0.28) return (p - 0.20) / 0.08;
      if (p >= 0.28 && p <= 0.47) return 1;
      if (p > 0.47 && p < 0.55) return (0.55 - p) / 0.08;
      return 0;
    }
    if (stageIndex === 2) {
      if (p < 0.47) return 0;
      if (p >= 0.47 && p < 0.55) return (p - 0.47) / 0.08;
      if (p >= 0.55 && p <= 0.72) return 1;
      if (p > 0.72 && p < 0.80) return (0.80 - p) / 0.08;
      return 0;
    }
    if (stageIndex === 3) {
      if (p < 0.72) return 0;
      if (p >= 0.72 && p < 0.80) return (p - 0.72) / 0.08;
      return 1;
    }
    return 0;
  };

  const currentRotationDegrees = Math.round((scrollProgress * 360) % 360);
  const dynamicYaw = Math.sin(scrollProgress * Math.PI * 4) * 8; // Légère rotation 3D continue

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
          "en pleine large pas de btn ou bouton, il faut vraiment voir qu'un seul personnage, 
          pas dans une fenetre, et on voit les mouvements quand on scroll les infos s'affichent"
          ════════════════════════════════════════════════════════════ */}
      <section 
        id="salat-kinetic-telemetry" 
        ref={trackRef} 
        className="relative w-full h-[380vh] bg-[#08090A]"
      >
        {/* Conteneur Plein Écran Épinglé (Sticky Top Viewport) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-6 sm:px-12 lg:px-16 pointer-events-none select-none">
          
          {/* Grille vectorielle discrète en arrière-plan (Plein écran sans bordure) */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,229,153,0.18) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,229,153,0.18) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse at 50% 60%, black 25%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 60%, black 25%, transparent 85%)"
            }}
          />

          {/* Anneau Gyroscopique LiDAR Orbital (Radar en rotation continue au scroll) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] sm:w-[720px] sm:h-[720px] lg:w-[860px] lg:h-[860px] rounded-full border border-dashed border-[#00E599]/15 pointer-events-none transition-transform duration-100 ease-out"
            style={{
              transform: `translate(-50%, -50%) rotate(${currentRotationDegrees}deg)`
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
                TÉLÉMÉTRIE DU CYCLE // SCROLL KINÉTIQUE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>ANGLE DU RACHIS : <strong className="text-[#00E599]">{activeStage.angle}</strong></span>
              <span>ROTATION 360° : <strong className="text-white">{currentRotationDegrees}°</strong></span>
              <span>POSTURE ACTUELLE : <strong className="text-white">{activeStage.postureFrench}</strong></span>
            </div>
          </div>

          {/* ── SCÈNE PRINCIPALE : L'AVATAR UNIQUE AU CENTRE & LES INFOS EN TYPOGRAPHIE SWISS MONUMENTALE ── */}
          <div className="relative z-20 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* COLONNE GAUCHE : LES INFOS DYNAMIQUES QUI S'AFFICHENT AU SCROLL (TERMINAL STYLE) */}
            <div className="lg:col-span-4 space-y-4 text-left transition-all duration-500">
              
              <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/25 px-3 py-1 rounded-full">
                <span>CYCLE 0{activeIdx + 1} / 04</span>
                <span>•</span>
                <span>{activeStage.angle}</span>
              </div>

              {/* Titre Posture Monumental */}
              <div>
                <h2 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                  {activeStage.postureArabic}
                </h2>
                <p className="font-sans font-bold text-lg sm:text-2xl text-neutral-300 mt-1">
                  {activeStage.postureFrench} · <span className="text-[#00E599] font-mono text-base sm:text-lg">{activeStage.subtitle}</span>
                </p>
              </div>

              {/* Badge Métrique Clé */}
              <div className="inline-block font-mono text-xs sm:text-sm font-bold text-[#00E599] bg-[#00E599]/15 border border-[#00E599]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,229,153,0.3)]">
                {activeStage.keyMetric}
              </div>

              {/* Explication Scientifique & Neurobiologique */}
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {activeStage.scientificInsight}
              </p>

              {/* Verset Sacré */}
              <p className="text-[11px] sm:text-xs font-serif italic text-amber-300/80 max-w-md border-l-2 border-[#00E599]/50 pl-3 py-0.5">
                {activeStage.sacredVerse}
              </p>

            </div>

            {/* COLONNE CENTRALE : LE PERSONNAGE UNIQUE EN LIBERTÉ DANS L'ESPACE (PAS DANS UNE FENÊTRE) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Repère Carré 1:1 pour Ancrage Rigoureux au Millimètre des Points */}
              <div 
                className="relative aspect-square w-[320px] sm:w-[460px] md:w-[540px] lg:w-[620px] max-h-[70vh] mx-auto flex items-center justify-center transition-transform duration-200 ease-out"
                style={{
                  perspective: "1200px",
                  transform: `perspective(1200px) rotateY(${dynamicYaw}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                
                {/* 1. Métamorphose Continue : Crossfade Fluide des 4 Postures au Fil du Scroll */}
                {salatStages.map((stg, idx) => {
                  const op = getStageOpacity(idx, scrollProgress);
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

                {/* 2. Réticules Biomécaniques : Exactement Ancrés sur l'Anatomie (Cerveau, Cœur, Dos, Pieds) */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                  {activeStage.nodes.map((node, nIdx) => (
                    <div
                      key={`${activeStage.id}-${nIdx}`}
                      style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
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

            {/* COLONNE DROITE : INDICATEUR VERTICAL DE DÉFILEMENT ÉPURÉ (TERMINAL STYLE) */}
            <div className="lg:col-span-2 hidden lg:flex flex-col items-end space-y-8 font-mono text-xs">
              <div className="relative pl-4 border-l border-white/15 space-y-8">
                {salatStages.map((stg, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <div key={stg.id} className="relative transition-all duration-300">
                      {isActive && (
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00E599] shadow-[0_0_12px_#00E599]" />
                      )}
                      <p className={`font-mono text-[10px] tracking-widest uppercase ${isActive ? "text-[#00E599] font-bold" : "text-neutral-500"}`}>
                        {stg.stepNumber} // {stg.postureArabic}
                      </p>
                      <p className={`font-sans font-bold text-xs ${isActive ? "text-white" : "text-neutral-500"}`}>
                        {stg.postureFrench} ({stg.angle})
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Jauge de progression continue */}
              <div className="w-32 text-right">
                <span className="text-[10px] text-neutral-400 block mb-1">MÉTAMORPHOSE</span>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00E599] transition-all duration-100" 
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
              <span>AFFLUX SANGUIN PRÉFRONTAL : <strong className="text-white">EN ÉLÉVATION</strong></span>
              <span>•</span>
              <span>COURBURE RACHIDIENNE : <strong className="text-white">{activeStage.angle}</strong></span>
            </div>

            <div className="flex items-center gap-2 text-[#00E599]">
              <span className="animate-pulse">↓</span>
              <span className="uppercase tracking-widest font-bold">
                DÉFILEZ POUR POURSUIVRE LA MÉTAMORPHOSE [ {activeIdx + 1} / 04 ]
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
