"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";

export interface ShowcaseStageItem {
  src: string;
  alt: string;
  tag: string;
  title: string;
  sub: string;
  ctaText: string;
  ctaHref: string;
}

const SHOWCASE_STAGES: ShowcaseStageItem[] = [
  {
    src: "/images/hero_terminal_dawn.jpg",
    alt: "Aube alpine monumentale et pureté de la réflexion",
    tag: "DIMENSION I // COGNITION & BANDE PASSANTE",
    title: "L'Éveil de la Réflexion.",
    sub: "Sortir du pilotage automatique, de la saturation mentale et du chaos des micro-décisions. Restaurer la lucidité et la bande passante exécutive du cortex préfrontal.",
    ctaText: "Découvrir la Méthode",
    ctaHref: "/fondements",
  },
  {
    src: "/images/photo_ocean_rahman.jpg",
    alt: "Immense océan de paix, régulation du système nerveux et apaisement",
    tag: "DIMENSION II // INTELLIGENCE SOMATIQUE",
    title: "L'Apaisement du Système Nerveux.",
    sub: "Régulation profonde du nerf vague, effondrement du cortisol et cohérence cardiaque. Réapprendre à ressentir le calme intérieur physique et habiter son corps en pleine présence.",
    ctaText: "Explorer la Science",
    ctaHref: "/recherche",
  },
  {
    src: "/images/cosmic_starfield.webp",
    alt: "Ciel cosmique étoilé et immensité de la création",
    tag: "DIMENSION III // FOI INÉBRANLABLE & YAQÎN",
    title: "La Certitude du Cœur.",
    sub: "Passer de la routine mécanique à une adoration vivante par amour, vénération et conviction absolue (Yaqîn) face à l'immensité de l'ordre divin.",
    ctaText: "Consulter les Traités",
    ctaHref: "/livres",
  },
  {
    src: "/images/photo_khalifa_sunrise.jpg",
    alt: "Lever de soleil majestueux et horizon de souveraineté",
    tag: "DIMENSION IV // LE MANDAT DE SOUVERAINETÉ",
    title: "Le Khalifa & Le Pivot Sacré.",
    sub: "Reprendre l'autorité sur son foyer, son temps et son destin. La Salât rétablie dans sa fonction première : le pivot d'ancrage sacré qui réinitialise l'être 5 fois par jour.",
    ctaText: "Prendre RDV (Cabinet)",
    ctaHref: "/rendez-vous",
  },
];

export default function ShowcaseStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [wipePercentages, setWipePercentages] = useState<number[]>([100, 0, 0, 0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 stages => 3 transition zones:
    // Zone 1: 0.05 to 0.30 -> Slide 1 wipes in (0 -> 100%)
    // Zone 2: 0.38 to 0.63 -> Slide 2 wipes in (0 -> 100%)
    // Zone 3: 0.70 to 0.95 -> Slide 3 wipes in (0 -> 100%)
    const p1 = Math.max(0, Math.min(100, ((latest - 0.05) / 0.25) * 100));
    const p2 = Math.max(0, Math.min(100, ((latest - 0.38) / 0.25) * 100));
    const p3 = Math.max(0, Math.min(100, ((latest - 0.70) / 0.25) * 100));

    setWipePercentages([100, p1, p2, p3]);

    let current = 0;
    if (latest >= 0.75) current = 3;
    else if (latest >= 0.45) current = 2;
    else if (latest >= 0.15) current = 1;

    setActiveIdx(current);
  });

  const scrollToStage = (index: number) => {
    if (!containerRef.current) return;
    const targets = [0, 0.25, 0.55, 0.85];
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const dest = containerTop + totalScrollable * targets[index];
    window.scrollTo({ top: dest, behavior: "smooth" });
  };

  const current = SHOWCASE_STAGES[activeIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#0c100e]"
    >
      {/* CADRE PLEIN ÉCRAN ÉPINGLÉ (PINNED STICKY 100VH / 100VW) */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden select-none">
        
        {/* COUCHES D'IMAGES EN WIPING HORIZONTAL PROGRESSIF DE NOUVEAU DOSSIER (4) */}
        {SHOWCASE_STAGES.map((stage, i) => {
          const wipePct = wipePercentages[i] ?? (i === 0 ? 100 : 0);
          return (
            <div
              key={stage.src}
              style={{
                clipPath: i === 0 ? "inset(0 0 0 0%)" : `inset(0 0 0 ${100 - wipePct}%)`,
                transition: "clip-path 40ms linear",
                zIndex: i + 1,
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={stage.src}
                alt={stage.alt}
                fill
                priority={i === 0}
                className="object-cover object-center scale-[1.03] transition-transform duration-1000 ease-out"
                sizes="100vw"
              />
              {/* GRADIENTS D'ATMOSPHÈRE & PROFONDEUR DE CHAMP CINÉMATIQUE */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c100e]/95 via-[#0c100e]/40 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c100e]/90 via-[#0c100e]/30 to-transparent" />
            </div>
          );
        })}

        {/* HUD SUPÉRIEUR : TAG DE DIMENSION CLINIQUE & STATUT */}
        <div className="absolute top-8 left-6 sm:top-10 sm:left-12 z-30 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-white/90">
              {current.tag}
            </span>
          </div>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            SCÈNE {activeIdx + 1} / {SHOWCASE_STAGES.length}
          </span>
        </div>

        {/* HUD INFÉRIEUR : TITRE MONUMENTAL, SOUS-TITRE & DASH INDICATOR NOUVEAU DOSSIER (4) */}
        <div className="absolute bottom-8 inset-x-6 sm:bottom-12 sm:inset-x-12 z-30 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          {/* BLOC ÉDITORIAL AVEC ANIMATION DE TRANSITION FLUIDE */}
          <div className="max-w-3xl">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.02em] leading-[1.08] drop-shadow-lg">
              {current.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/85 font-sans leading-relaxed max-w-2xl drop-shadow-md font-normal">
              {current.sub}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={current.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(8,123,83,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{current.ctaText}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* DASH PAGINATION INDICATOR (COPIE EXACTE DU PATTERN NOUVEAU DOSSIER 4) */}
          <div className="flex items-center gap-2.5 self-start lg:self-end bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 shadow-xl">
            {SHOWCASE_STAGES.map((_, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToStage(i)}
                  aria-label={`Aller à la séquence ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-9 h-2.5 bg-white shadow-sm"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
