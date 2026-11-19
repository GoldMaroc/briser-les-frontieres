"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export interface ShowcaseStageItem {
  src: string;
  alt: string;
  tag: string;
  title: string;
  sub: string;
  ctaText?: string;
  ctaHref?: string;
}

const SHOWCASE_STAGES: ShowcaseStageItem[] = [
  {
    src: "/images/instagram/photo_khalifa_sunrise.jpg",
    alt: "Horizon d'aurore et contemplation de la création",
    tag: "01 // ARCHITECTURE COGNITIVE",
    title: "L'Éveil de la Réflexion.",
    sub: "Sortir du pilotage automatique et de l'engourdissement mental. Restaurer la lucidité préfrontale et la clarté d'intention face au bruit quotidien.",
    ctaText: "Découvrir la Méthode",
    ctaHref: "/fondements",
  },
  {
    src: "/images/instagram/photo_ocean_rahman.jpg",
    alt: "Océan apaisé et immensité de la paix intérieure",
    tag: "02 // PHYSIOLOGIE DU CALME",
    title: "L'Intelligence des Sensations.",
    sub: "Réapprendre à habiter son corps. Apaisement du système nerveux autonome, activation du nerf vague et libération des tensions somatiques accumulées.",
    ctaText: "Explorer les Neurosciences",
    ctaHref: "/recherche",
  },
  {
    src: "/images/cosmic_starfield.webp",
    alt: "Profondeurs de l'univers et nébuleuses célestes",
    tag: "03 // CONVICTION & ANCRAGE SACRÉ",
    title: "La Foi Inébranlable (Yaqîn).",
    sub: "Passer de la croyance passive à la certitude vivante. Une foi nourrie de contemplation, de révélation et de crainte vénérée qui libère de toutes les peurs terrestres.",
    ctaText: "Le Mandat de Khalifa",
    ctaHref: "/recherche",
  },
  {
    src: "/images/instagram/photo_executive_still_life.jpg",
    alt: "Espace d'étude exécutif, rigueur et gouvernance personnelle",
    tag: "04 // SOUVERAINETÉ EN ACTION",
    title: "Le Pivot & La Maîtrise de Soi.",
    sub: "La Salât comme ancre sacrée de réinitialisation cinq fois par jour. Reprenez les commandes de votre foyer, de votre temps et de votre destinée.",
    ctaText: "Passer l'Audit Stratégique",
    ctaHref: "/audit",
  },
];

export default function ShowcaseStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isScrollingByClick = useRef(false);

  // Synchronisation du défilement épinglé (Pinned Scrollytelling 100vw / 100vh)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isScrollingByClick.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const scrollDistance = -rect.top;
          const maxScroll = rect.height - window.innerHeight;

          if (maxScroll > 0) {
            const rawProgress = scrollDistance / maxScroll;
            const progress = Math.max(0, Math.min(0.999, rawProgress));
            const stageIndex = Math.min(
              SHOWCASE_STAGES.length - 1,
              Math.floor(progress * SHOWCASE_STAGES.length)
            );

            setActiveStage((prev) => {
              if (prev !== stageIndex) {
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 200);
                return stageIndex;
              }
              return prev;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setStage = useCallback((idx: number) => {
    if (idx === activeStage) return;
    setIsTransitioning(true);
    setActiveStage(idx);
    setTimeout(() => setIsTransitioning(false), 200);

    // Permettre la navigation par clic sur les indicateurs dash
    if (containerRef.current) {
      isScrollingByClick.current = true;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const maxScroll = rect.height - window.innerHeight;
      const targetScroll = containerTop + (idx / (SHOWCASE_STAGES.length - 1)) * maxScroll;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrollingByClick.current = false;
      }, 700);
    }
  }, [activeStage]);

  const nextStage = () => {
    const next = (activeStage + 1) % SHOWCASE_STAGES.length;
    setStage(next);
  };

  const prevStage = () => {
    const prev = (activeStage - 1 + SHOWCASE_STAGES.length) % SHOWCASE_STAGES.length;
    setStage(prev);
  };

  const current = SHOWCASE_STAGES[activeStage];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-black text-white"
    >
      {/* VUE ÉPINGLÉE PLEIN ÉCRAN (100vw / 100vh / 100dvh) */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden select-none bg-neutral-950">
        
        {/* COUCHES D'IMAGES EN SCÈNE CINÉMATIQUE AVEC BALAYAGE PARALLAXE */}
        {SHOWCASE_STAGES.map((stage, i) => {
          const isActive = activeStage === i;
          return (
            <div
              key={stage.src}
              style={{
                clipPath: isActive ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
                transition: "clip-path 750ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={stage.src}
                alt={stage.alt}
                fill
                priority={i === 0}
                className={`object-cover object-center transition-transform duration-1000 ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
                sizes="100vw"
              />
              {/* FILTRES CINÉMATIQUES ÉDITORIAUX PLEIN ÉCRAN */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* EN-TÊTE DISCRET / TOP BADGE STATUTAIRE */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-white/90 drop-shadow-sm">
            {current.tag}
          </span>
        </div>

        {/* CONTRÔLES FLÉCHÉS DISCRETS */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-12 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={prevStage}
            aria-label="Étape précédente"
            className="p-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextStage}
            aria-label="Étape suivante"
            className="p-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* HUD INFÉRIEUR : TITRE MONUMENTAL, SOUS-TITRE & DASH INDICATOR */}
        <div className="absolute bottom-8 inset-x-6 sm:bottom-14 sm:inset-x-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* TEXTES ÉDITORIAUX */}
          <div
            className={`max-w-2xl transition-all duration-300 ${
              isTransitioning ? "opacity-30 blur-xs translate-y-1.5" : "opacity-100 blur-none translate-y-0"
            }`}
          >
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] drop-shadow-lg">
              {current.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/85 font-sans leading-relaxed max-w-xl drop-shadow-sm font-normal">
              {current.sub}
            </p>

            {current.ctaHref && current.ctaText && (
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(8,123,83,0.35)] hover:-translate-y-0.5"
                >
                  <span>{current.ctaText}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* DASH PAGINATION INDICATOR (IDENTIQUE À NOUVEAU DOSSIER 4) */}
          <div className="flex items-center gap-2 self-start md:self-end bg-black/45 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
            {SHOWCASE_STAGES.map((_, i) => {
              const isActive = activeStage === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStage(i)}
                  aria-label={`Aller à la séquence ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-9 h-2.5 bg-white"
                      : "w-3 h-2.5 bg-white/35 hover:bg-white/60"
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
