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
    <section className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* COLONNE GAUCHE : SLIDER INTERACTIF AVANT / APRÈS */}
        <div className="lg:col-span-7">
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[var(--border)] shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-ew-resize select-none bg-neutral-900"
          >
            {/* COUCHE 1 : ÉTAT APRÈS (SOUVERAINETÉ, CONTEMPLATION ET ALIGNEMENT) */}
            <div className="absolute inset-0">
              <Image
                src="/images/photo_woman_contemplation.jpg"
                alt="Après : Souveraineté retrouvée, paix intérieure et sérénité de l'esprit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              
              {/* BADGE ÉTAT APRÈS */}
              <div className="absolute bottom-6 right-6 text-right text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] text-[#0A1128] text-[11px] font-mono font-bold uppercase tracking-wider shadow-md mb-1.5">
                  ✓ APRÈS L&apos;ALIGNEMENT
                </span>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  Souveraineté &amp; Sérénité Somatique
                </h4>
                <p className="text-xs text-white/85 font-sans max-w-xs">
                  Système nerveux apaisé, clarté mentale inaltérable, prières sanctuarisées.
                </p>
              </div>
            </div>

            {/* COUCHE 2 : ÉTAT AVANT (SURCHARGE COGNITIVE, STRESS & AT-TASWÎF) */}
            <div
              style={{
                clipPath: `inset(0 ${100 - splitPct}% 0 0)`,
                transition: splitAnimate ? "clip-path 380ms cubic-bezier(0.23, 1, 0.32, 1)" : "none",
              }}
              className="absolute inset-0"
            >
              <Image
                src="/images/instagram/hero_terminal_dawn.jpg"
                alt="Avant : Surcharge cognitive, dispersion numérique et procrastination subie"
                fill
                className="object-cover filter contrast-125 brightness-75 grayscale"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              
              {/* BADGE ÉTAT AVANT */}
              <div className="absolute bottom-6 left-6 text-left text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md mb-1.5">
                  ✕ AVANT L&apos;ACCOMPAGNEMENT
                </span>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  Surcharge Mentale &amp; At-Taswîf
                </h4>
                <p className="text-xs text-white/85 font-sans max-w-xs">
                  Pic de cortisol, dispersion perpétuelle, fatigue de décision et culpabilité.
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
              <div className="absolute w-10 h-10 rounded-full bg-white border-2 border-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-neutral-900">
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
              <span className="inline-block px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono uppercase tracking-wider">
                Glissez pour comparer l&apos;état Avant / Après
              </span>
            </div>
          </div>

          {/* BOUTONS PRÉDÉFINIS POUR BASCULER RAPIDEMENT */}
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => updateSplit(10, true)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                splitPct <= 20
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-bold shadow-xs"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Afficher : État Avant (Surcharge)
            </button>
            <button
              type="button"
              onClick={() => updateSplit(50, true)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                splitPct > 20 && splitPct < 80
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-bold shadow-xs"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              50 / 50 (Scission)
            </button>
            <button
              type="button"
              onClick={() => updateSplit(90, true)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                splitPct >= 80
                  ? "bg-[#B88E3E] dark:bg-[#D4A853] text-[#0A1128] font-bold shadow-xs"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[#B88E3E]"
              }`}
            >
              Afficher : État Après (Souveraineté)
            </button>
          </div>
        </div>

        {/* COLONNE DROITE : EXPLICATION COGNITIVE & SCIENTIFIQUE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214] dark:text-[#D4A853]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              PREUVE DU PROTOCOLE C.O.M.E.S.
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight leading-tight">
            De la Procrastination Subie à la Clarté d&apos;Intention.
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
            La dispersion mentale et la difficulté à maintenir une présence authentique dans ses prières et ses projets ne sont pas une « faiblesse coupable » : elles sont le symptôme direct d&apos;une <strong>surcharge allostatique</strong> et d&apos;un environnement saturé d&apos;injonctions parasites.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
            En réinitialisant les circuits dopaminergiques, en libérant les tensions corporelles et en restaurant la prière comme pivot d&apos;ancrage invariable, vous récupérez votre bande passante cognitive et votre lucidité d&apos;action.
          </p>

          {/* MÉTRIQUES COMPARATIVES ÉPURÉES */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                -40%
              </span>
              <span className="block text-xs font-mono text-[var(--text-secondary)] mt-1.5">
                De cortisol sanguin et réduction du stress physiologique dès 7 jours
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                98%
              </span>
              <span className="block text-xs font-mono text-[var(--text-secondary)] mt-1.5">
                De constance retrouvée dans les 8 piliers de vie après 30 jours
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
