"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function TransformationSlider() {
  const [splitPct, setSplitPct] = useState(50);
  const [splitAnimate, setSplitAnimate] = useState(false);
  const isDraggingRef = useRef(false);

  const updateSplit = (pct: number, animate: boolean) => {
    const clamped = Math.max(0, Math.min(100, pct));
    setSplitAnimate(animate);
    setSplitPct(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    updateSplit(((e.clientX - rect.left) / rect.width) * 100, false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateSplit(((e.clientX - rect.left) / rect.width) * 100, false);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E0D2]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* COLONNE GAUCHE : SLIDER INTERACTIF AVANT / APRÈS */}
        <div className="lg:col-span-7">
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] overflow-hidden border border-[#E8E0D2] shadow-[0_20px_50px_rgba(20,18,16,0.08)] cursor-ew-resize select-none bg-white"
          >
            {/* COUCHE 1 : ÉTAT APRÈS (SOUVERAINETÉ & CLARTÉ DU KHALIFA) */}
            <div className="absolute inset-0">
              <Image
                src="/images/photo_khalifa_sunrise.jpg"
                alt="Après : Souveraineté rétablie, clarté mentale et horizon dégagé"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/30 to-transparent" />
              
              {/* BADGE ÉTAT APRÈS */}
              <div className="absolute bottom-6 right-6 text-right text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#087B53] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md mb-1.5">
                  ✓ APRÈS LE PROTOCOLE
                </span>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  Souveraineté & Clarté Mentale
                </h4>
                <p className="text-xs text-white/80 font-sans max-w-xs">
                  Système nerveux régulé, esprit libéré du chaos, foi vivante et pivot sacré sanctuarisé.
                </p>
              </div>
            </div>

            {/* COUCHE 2 : ÉTAT AVANT (PROCRASTINATION & CHARGE COGNITIVE) - CLIP PÉRIMÈTRE DYNAMIQUE */}
            <div
              style={{
                clipPath: `inset(0 ${100 - splitPct}% 0 0)`,
                transition: splitAnimate ? "clip-path 380ms cubic-bezier(0.23, 1, 0.32, 1)" : "none",
              }}
              className="absolute inset-0"
            >
              <Image
                src="/images/photo_man_stressed.png"
                alt="Avant : Surcharge cognitive, fatigue nerveuse et dispersion"
                fill
                className="object-cover filter grayscale contrast-125 brightness-90"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              {/* BADGE ÉTAT AVANT */}
              <div className="absolute bottom-6 left-6 text-left text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md mb-1.5">
                  ✕ AVANT LE PROTOCOLE
                </span>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  Charge Mentale & At-Taswîf
                </h4>
                <p className="text-xs text-white/80 font-sans max-w-xs">
                  Micro-décisions inutiles, pic de cortisol, dispersion constante et perte de présence.
                </p>
              </div>
            </div>

            {/* CURSEUR / POIGNÉE DRAGGABLE */}
            <div
              style={{
                left: `clamp(24px, ${splitPct}%, calc(100% - 24px))`,
                transition: splitAnimate ? "left 380ms cubic-bezier(0.23, 1, 0.32, 1)" : "none",
              }}
              className="absolute inset-y-0 -translate-x-1/2 pointer-events-none flex items-center justify-center z-20"
            >
              {/* LIGNE VERTICALE */}
              <div className="w-[2px] h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
              
              {/* BOUTON POIGNÉE AVEC ICÔNE DRAG */}
              <div className="absolute w-11 h-11 rounded-full bg-white border-2 border-[#141210] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#141210]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 3 12 9 6" />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                  <polyline points="15 18 21 12 15 6" />
                </svg>
              </div>
            </div>

            {/* INDICATEUR D'AIDE */}
            <div className="absolute top-4 inset-x-0 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-mono uppercase tracking-wider">
                Glissez pour comparer l&apos;état Avant / Après
              </span>
            </div>
          </div>

          {/* BOUTONS PRÉDÉFINIS POUR BASCULER RAPIDEMENT */}
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => updateSplit(10, true)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                splitPct <= 20
                  ? "bg-[#141210] text-white font-bold"
                  : "bg-white border border-[#E8E0D2] text-[#5C534A] hover:border-[#141210]"
              }`}
            >
              Afficher : État Avant (Taswîf)
            </button>
            <button
              type="button"
              onClick={() => updateSplit(50, true)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                splitPct > 20 && splitPct < 80
                  ? "bg-[#141210] text-white font-bold"
                  : "bg-white border border-[#E8E0D2] text-[#5C534A] hover:border-[#141210]"
              }`}
            >
              50 / 50 (Scission)
            </button>
            <button
              type="button"
              onClick={() => updateSplit(90, true)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                splitPct >= 80
                  ? "bg-[#087B53] text-white font-bold"
                  : "bg-white border border-[#E8E0D2] text-[#5C534A] hover:border-[#087B53]"
              }`}
            >
              Afficher : État Après (Souveraineté)
            </button>
          </div>
        </div>

        {/* COLONNE DROITE : EXPLICATION COGNITIVE & SCIENTIFIQUE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              PREUVE DU PROTOCOLE C.O.M.E.S.
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight leading-tight">
            De la Procrastination Subie à l&apos;Autorité Absolue.
          </h2>

          <p className="text-sm sm:text-base text-[#403B35] font-sans leading-relaxed">
            La majorité des musulmans pensent que leur manque de régularité dans la prière est une simple « faiblesse de foi ». C&apos;est une erreur diagnostique fatale.
          </p>

          <p className="text-sm sm:text-base text-[#403B35] font-sans leading-relaxed">
            Votre incapacité à prier à l&apos;heure est d&apos;abord le résultat d&apos;un <strong>système nerveux saturé par le cortisol</strong>, de boucles mentales ouvertes et d&apos;un environnement toxique pour le cortex préfrontal.
          </p>

          {/* MÉTRIQUES COMPARATIVES */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-[#E8E0D2]">
              <span className="block text-2xl font-heading font-extrabold text-[#B88E3E]">
                -40%
              </span>
              <span className="block text-xs font-mono text-[#5C534A] mt-1">
                De cortisol sanguin dès la première semaine
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E0D2]">
              <span className="block text-2xl font-heading font-extrabold text-[#087B53]">
                98%
              </span>
              <span className="block text-xs font-mono text-[#5C534A] mt-1">
                De régularité maintenue après 30 jours
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
