"use client";

import Image from "next/image";

export default function HeroVerseCard() {
  return (
    <div className="relative w-full max-w-[560px] rounded-[var(--radius-card)] overflow-hidden border border-[#B88E3E]/40 bg-[var(--surface)] p-8 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
      {/* Texture d'arrière-plan cosmique & contemplative (AUCUNE IMAGE DE PRIÈRE) */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen">
        <Image
          src="/images/cosmic_starfield.webp"
          alt="Contemplation cosmique et immensité de la création"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-[var(--surface)]" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        
        {/* EN-TÊTE DU VERSET */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B88E3E]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6214] dark:text-[#D4A853] font-bold">
              SOURATE AL-HADÎD • VERSET 16
            </span>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            L&apos;Appel du Cœur &amp; De la Lucidité
          </span>
        </div>

        {/* VERSET EN ARABE (CALLIGRAPHIE NOBLE ET MAJESTUEUSE) */}
        <div className="py-2 text-right">
          <p 
            dir="rtl"
            lang="ar"
            className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-[var(--text-primary)] leading-[1.8] font-medium tracking-wide drop-shadow-xs"
          >
            أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ
          </p>
        </div>

        {/* TRADUCTION & EXÉGÈSE FONDATRICE */}
        <div className="space-y-3 pt-2">
          <p className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-primary)] leading-snug">
            « Le moment n’est-il pas venu pour ceux qui ont cru, que leurs cœurs s’humilient à l’évocation d’Allah et devant ce qui est descendu de la Vérité... ? »
          </p>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            Ce verset est le point d&apos;inflexion de toute conscience humaine. Il n&apos;est pas un reproche culpabilisant : c&apos;est l&apos;appel du Créateur à réveiller la réflexion profonde, à réapprendre à ressentir la paix dans son être, à fortifier sa foi avec certitude et à reprendre sa place de souveraineté.
          </p>
        </div>

        {/* SCEAU D'AUTORITÉ DU CABINET */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#087B53] font-bold">✓</span>
            <span className="text-[var(--text-primary)] font-semibold">Le Point Zéro de la Transformation</span>
          </div>
          <span className="text-[#8C6214] dark:text-[#D4A853] font-bold">
            Cabinet BLF • Mounir Byar
          </span>
        </div>

      </div>
    </div>
  );
}
