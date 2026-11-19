"use client";

import { useState, useRef, useEffect } from "react";
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
    src: "/images/sanctuaire/muslim_sujud_focus.jpg",
    alt: "Prosternation Sujûd et recueillement profond à l'aube",
    tag: "STATION SUPRÊME // NEUROBIOLOGIE",
    title: "La Salât comme arme de souveraineté.",
    sub: "Le protocole millénaire révélé pour effondrer le cortisol, stimuler le nerf vague et restaurer la clarté mentale.",
    ctaText: "Découvrir la Science",
    ctaHref: "/recherche",
  },
  {
    src: "/images/sanctuaire/muslim_qiyam_focus.jpg",
    alt: "Station verticale Qiyâm face au Créateur",
    tag: "ALIGNEMENT MENTAL // FOYER PRÉFRONTAL",
    title: "Rupture radicale d'At-Taswîf.",
    sub: "En finir avec la procrastination spirituelle. Verrouillez votre environnement pour ne plus jamais manquer une prière.",
    ctaText: "Rejoindre le Protocole 30J",
    ctaHref: "/offres",
  },
  {
    src: "/images/sanctuaire/muslim_ruku_focus.jpg",
    alt: "Inclinaison Rukû' et décompression axiale",
    tag: "DÉCOMPRESSION // BIO-MÉCANIQUE",
    title: "Le Mandat de Khalifa rétabli.",
    sub: "Votre vie n'est pas faite pour être subie dans le chaos numérique. Restaurez votre autorité et vos 8 piliers de vie.",
    ctaText: "Passer l'Audit Gratuit",
    ctaHref: "/audit",
  },
];

export default function ShowcaseStage() {
  const [activeStage, setActiveStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const setStage = (idx: number) => {
    if (idx === activeStage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveStage(idx);
      setIsTransitioning(false);
    }, 140);
  };

  const nextStage = () => {
    const next = (activeStage + 1) % SHOWCASE_STAGES.length;
    setStage(next);
  };

  const prevStage = () => {
    const prev = (activeStage - 1 + SHOWCASE_STAGES.length) % SHOWCASE_STAGES.length;
    setStage(prev);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextStage, 7000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeStage]);

  const current = SHOWCASE_STAGES[activeStage];

  return (
    <section className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] overflow-hidden rounded-[20px] sm:rounded-[28px] border border-neutral-300/40 dark:border-neutral-700/40 bg-neutral-900 text-white select-none shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
      
      {/* COUCHES D'IMAGES EN SCÈNE CINÉMATIQUE */}
      {SHOWCASE_STAGES.map((stage, i) => {
        const isActive = activeStage === i;
        return (
          <div
            key={stage.src}
            style={{
              clipPath: isActive ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
              transition: "clip-path 700ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={stage.src}
              alt={stage.alt}
              fill
              priority={i === 0}
              className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
              sizes="100vw"
            />
            {/* GRADIENT CINÉMATIQUE AMBIANT DE NOUVEAU DOSSIER (4) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          </div>
        );
      })}

      {/* EN-TÊTE DISCRET / TOP BADGE */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 drop-shadow-sm">
          {current.tag}
        </span>
      </div>

      {/* CONTRÔLES FLÉCHÉS SUBTILS SUR GRAND ÉCRAN */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={prevStage}
          aria-label="Image précédente"
          className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 text-white transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={nextStage}
          aria-label="Image suivante"
          className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 text-white transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* HUD INFÉRIEUR : TITRE, SOUS-TITRE & DASH INDICATOR DE NOUVEAU DOSSIER (4) */}
      <div className="absolute bottom-6 inset-x-6 sm:bottom-10 sm:inset-x-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* TITRE & SOUS-TITRE AVEC BLUR FLUIDE */}
        <div
          className={`max-w-2xl transition-all duration-200 ${
            isTransitioning ? "opacity-40 blur-xs translate-y-1" : "opacity-100 blur-none translate-y-0"
          }`}
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] drop-shadow-md">
            {current.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-white/85 font-sans leading-relaxed max-w-xl drop-shadow-sm">
            {current.sub}
          </p>

          {current.ctaHref && current.ctaText && (
            <div className="mt-5 flex items-center gap-3">
              <Link
                href={current.ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>{current.ctaText}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* DASH PAGINATION INDICATOR IDENTIQUE AUX CAPTURES D'ÉCRAN */}
        <div className="flex items-center gap-2 self-start md:self-end bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
          {SHOWCASE_STAGES.map((_, i) => {
            const isActive = activeStage === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setStage(i)}
                aria-label={`Aller au tableau ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-8 h-2 bg-white"
                    : "w-2.5 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>

      </div>

    </section>
  );
}
