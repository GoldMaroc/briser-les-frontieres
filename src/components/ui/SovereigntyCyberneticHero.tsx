"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SalatPosture {
  id: string;
  stepNum: string;
  postureArabic: string;
  postureFrench: string;
  subtitle: string;
  image: string;
}

const POSTURES_DATA: SalatPosture[] = [
  {
    id: "qiyam",
    stepNum: "01",
    postureArabic: "QIYÂM",
    postureFrench: "Debout de Face",
    subtitle: "Alignement vertébral rigoureux & focalisation attentionnelle. Rupture immédiate avec la surcharge sensorielle.",
    image: "/images/postures/01_qiyam_debout.png",
  },
  {
    id: "ruku",
    stepNum: "02",
    postureArabic: "RUKÛ'",
    postureFrench: "Incliné à 90°",
    subtitle: "Flexion rachidienne & décompression lombaire. Décélération vagale immédiate et apaisement de l'esprit.",
    image: "/images/postures/02_ruku_incline.png",
  },
  {
    id: "sujud",
    stepNum: "03",
    postureArabic: "SUJÛD",
    postureFrench: "Prosterné au Sol",
    subtitle: "Perfusion sanguine du cortex préfrontal & mise à la terre bioélectrique. L'acmé de la sérénité absolue.",
    image: "/images/postures/03_sujud_prosterne.png",
  },
  {
    id: "dua",
    stepNum: "04",
    postureArabic: "DU'Â",
    postureFrench: "Assise & Invocation",
    subtitle: "Ondes cérébrales Thêta & cohérence cardio-respiratoire. Clarté décisionnelle et mandat de souveraineté.",
    image: "/images/postures/04_dua_invocation.png",
  },
];

export default function SovereigntyCyberneticHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // 1. Gestionnaire de défilement fluide
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

  // 2. Boucle d'animation inertielle et dérive des poussières d'étoiles
  useEffect(() => {
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      lastTime = time;

      // Lissage inertiel (lerp) pour un défilement ultra-doux
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.12;
      const p = smoothProgress.current;
      setScrollProgress(p);

      // Animation subtile des poussières cosmiques
      const starsCanvas = starsCanvasRef.current;
      if (starsCanvas) {
        const sCtx = starsCanvas.getContext("2d");
        if (sCtx) {
          sCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
          const w = starsCanvas.width;
          const h = starsCanvas.height;
          const cosmicOffset = (p * 350 + time * 0.012) % h;

          sCtx.fillStyle = "rgba(0, 229, 153, 0.4)";
          for (let i = 0; i < 28; i++) {
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

  // Index de la posture active selon le défilement (0 à 3)
  const activeIdx = Math.min(3, Math.max(0, Math.floor(scrollProgress * 4)));
  const activePosture = POSTURES_DATA[activeIdx];

  // Parallaxe cosmique inversée : le fond spatial descend doucement, le mannequin s'élève
  const spaceBackgroundTranslateY = scrollProgress * 140;
  const characterAscentTranslateY = -scrollProgress * 45;

  return (
    <div className="relative w-full bg-[#08090A] text-white">

      {/* ════════════════════════════════════════════════════════════
          1. SECTION HERO PRINCIPALE (ÉPURÉE, STYLE AYOCIN LUXE)
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden">
        
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

        {/* Badge Discret Supérieur */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
            <span className="font-mono text-[9px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase">
              CABINET BLF // ARCHITECTURE DU CERVEAU & EXÉGÈSE
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
            PARIS // REIMS
          </span>
        </div>

        {/* Le Monolithe Typographique Ayocin */}
        <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-6 sm:py-10">
          <span className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-3.5 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            // RÉINITIALISATION BIOLOGIQUE
          </span>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[5.25rem] tracking-[-0.035em] text-white leading-[1.03] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            Nous avons réinventé<br />
            la reconquête de l&apos;âme<br />
            par la prosternation.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-xl text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            La prosternation (Sujûd) n&apos;est pas une soumission passive. C&apos;est l&apos;arme neurobiologique suprême pour dompter le cortisol et commander son esprit.
          </p>

          {/* Boutons d'Action — Style Ayocin Floating Pills */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/audit"
              className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-6 sm:px-8 py-3.5 rounded-full bg-[#00E599] text-black font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,229,153,0.45)] hover:shadow-[0_0_55px_rgba(0,229,153,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Passer l&apos;Audit Prière & Cerveau (3 min)</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
            <Link
              href="/livres"
              className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-6 sm:px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Les Traités de l&apos;Ingénieur</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* Bas de page initial épuré : Indication de Scroll discrète et noble */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/10">
          <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest">
            Ingénierie Neuro-Cognitive & Souveraineté
          </span>
          <div className="flex items-center gap-2 text-neutral-300 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
            <span>Défiler pour explorer</span>
            <span className="text-[#00E599] animate-bounce">↓</span>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          2. SECTION SCROLLYTELLING ÉPURÉE (STYLE AYOCIN NATUREL)
          - Fond galactique profond et organique (comme la forêt d'Ayocin)
          - Mannequin en PNG transparent pur, zéro artefact, zéro cadre
          - Aucune double-exposition, aucun encombrement
          ════════════════════════════════════════════════════════════ */}
      <section 
        id="salat-kinetic-telemetry" 
        ref={trackRef} 
        className="relative w-full h-[450vh] bg-[#08090A]"
      >
        {/* Conteneur Plein Écran Épinglé (Sticky Top 0 Viewport) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none select-none">
          
          {/* FOND COSMIQUE GALACTIQUE PROFOND (INSPIRATION AYOCIN - HAUTE DÉFINITION NATURELLE SANS AUCUN QUADRILLAGE) */}
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
              className="object-cover object-center filter brightness-105 contrast-115 pointer-events-none select-none"
            />
            
            {/* Voile sombre très subtil pour préserver la lisibilité de la typographie Ayocin */}
            <div className="absolute inset-0 bg-[#08090A]/15 pointer-events-none" />

            {/* Canvas des poussières cosmiques et étoiles scintillantes en dérive */}
            <canvas 
              ref={starsCanvasRef} 
              width={1200} 
              height={800} 
              className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none"
            />
          </div>

          {/* LE MANNEQUIN AU CENTRE ABSOLU (PUR PNG TRANSPARENT, AUCUN FOND, AUCUN CADRE NOIR, AUCUN CADRILLAGE NI RETICULE) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div 
              className="relative w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] flex items-center justify-center transition-transform duration-75 ease-out"
              style={{
                transform: `translateY(${characterAscentTranslateY}px)`
              }}
            >
              {POSTURES_DATA.map((posture, idx) => {
                const isCurrent = activeIdx === idx;
                return (
                  <img
                    key={posture.id}
                    src={posture.image}
                    alt={posture.postureFrench}
                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-all duration-300 ease-out ${
                      isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                    style={{
                      filter: "drop-shadow(0 0 45px rgba(0, 229, 153, 0.45))"
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* LÉGENDE TYPOGRAPHIQUE ÉPURÉE (STYLE AYOCIN LUXE) */}
          <div className="absolute bottom-8 sm:bottom-12 inset-x-4 sm:inset-x-8 lg:inset-x-16 z-20 flex flex-col sm:flex-row sm:items-end justify-between pointer-events-none gap-4">
            
            {/* Titre & Description Sobre */}
            <div className="max-w-xl pointer-events-auto">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-ping" />
                <span className="font-mono text-[11px] sm:text-xs text-[#00E599] tracking-[0.25em] uppercase font-bold">
                  {activePosture.stepNum} // {activePosture.postureArabic}
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-[-0.03em] leading-tight drop-shadow-md">
                {activePosture.postureFrench}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 mt-1 sm:mt-2 leading-relaxed max-w-lg">
                {activePosture.subtitle}
              </p>
            </div>

            {/* Indicateur de Progression Minimaliste (4 Piliers) */}
            <div className="flex items-center gap-2.5 pointer-events-auto bg-[#08090A]/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
              {POSTURES_DATA.map((p, i) => (
                <div
                  key={p.id}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeIdx === i ? "w-7 bg-[#00E599]" : "w-2.5 bg-white/20"
                  }`}
                />
              ))}
              <span className="font-mono text-[10px] text-neutral-300 ml-1.5 font-bold">
                0{activeIdx + 1} / 04
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
              <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl tracking-[-0.03em] text-white max-w-2xl leading-[1.08]">
                Une méthodologie forgée pour le monde moderne.
              </h2>
            </div>
            <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-md">
              Chaque protocole allie rigueur scientifique et exégèse spirituelle pour créer des résultats mesurables et pérennes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#00E599]/40 transition-all duration-300">
              <span className="font-mono text-xs text-[#00E599] font-bold block mb-3">01 // NEUROBIOLOGIE</span>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Maîtrise du Cortisol</h3>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Désactivation du mode survie et basculement immédiat du système nerveux en mode parasympathique.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#00E599]/40 transition-all duration-300">
              <span className="font-mono text-xs text-[#00E599] font-bold block mb-3">02 // EXÉGÈSE SOUVERAINE</span>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Clarté d&apos;Intention</h3>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Purification des motivations profondes pour aligner l&apos;action quotidienne avec le mandat de Khalifa.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#00E599]/40 transition-all duration-300">
              <span className="font-mono text-xs text-[#00E599] font-bold block mb-3">03 // PROTOCOLE C.O.M.E.S.</span>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Discipline Durable</h3>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Ancrage d&apos;une régularité inébranlable dans la Salât pour transformer durablement votre énergie.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
