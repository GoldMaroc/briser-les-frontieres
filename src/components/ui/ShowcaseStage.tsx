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
  const [activeStage, setActiveStage] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const setStage = useCallback((idx: number) => {
    setActiveStage(idx);
  }, []);

  const nextStage = useCallback(() => {
    setActiveStage((prev) => (prev + 1) % SHOWCASE_STAGES.length);
  }, []);

  const prevStage = useCallback(() => {
    setActiveStage((prev) => (prev - 1 + SHOWCASE_STAGES.length) % SHOWCASE_STAGES.length);
  }, []);

  // Défilement automatique fluide (6 secondes)
  useEffect(() => {
    autoPlayRef.current = setInterval(nextStage, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextStage]);

  const current = SHOWCASE_STAGES[activeStage];

  return (
    <section className="relative w-full h-[580px] sm:h-[680px] lg:h-[760px] overflow-hidden select-none bg-neutral-950 text-white">
      
      {/* COUCHES D'IMAGES EN SCÈNE CINÉMATIQUE AVEC TRANSITION FLUIDE (ZÉRO BLOCAGE DU SCROLL) */}
      {SHOWCASE_STAGES.map((stage, i) => {
        const isActive = activeStage === i;
        return (
          <div
            key={stage.src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
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
            {/* GRADIENTS ÉDITORIAUX LÉGERS (IMAGES TOUJOURS VIVANTES ET CLAIRES) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* EN-TÊTE DISCRET / TOP BADGE STATUTAIRE */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-white/95 drop-shadow-sm">
          {current.tag}
        </span>
      </div>

      {/* CONTRÔLES FLÉCHÉS DE NAVIGATION */}
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
        
        {/* TEXTES ÉDITORIAUX STABLES SANS FLOU NI ÉCHO */}
        <div className="max-w-2xl">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] drop-shadow-lg">
            {current.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/90 font-sans leading-relaxed max-w-xl drop-shadow-sm font-normal">
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

    </section>
  );
}
