"use client";

import Image from "next/image";

export default function HeroVerseCard() {
  return (
    <div className="relative w-full max-w-[560px] rounded-2xl sm:rounded-[var(--radius-card)] overflow-hidden border border-[#B88E3E]/40 bg-[var(--surface)] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      {/* Texture d'arrière-plan cosmique & contemplative (AUCUNE IMAGE DE PRIÈRE) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
        <Image
          src="/images/cosmic_starfield.webp"
          alt="Contemplation cosmique et immensité de la création"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-[var(--surface)]" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
        
        {/* EN-TÊTE DU VERSET */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 sm:pb-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B88E3E]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold">
              SOURATE AL-HADÎD • 57:16
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            Le Réveil de la Conscience
          </span>
        </div>

        {/* VERSET EN ARABE (CALLIGRAPHIE NOBLE ET MAJESTUEUSE) */}
        <div className="py-1 sm:py-2 text-right">
          <p 
            dir="rtl"
            lang="ar"
            className="font-serif text-xl sm:text-3xl lg:text-[2.2rem] text-[var(--text-primary)] leading-[1.8] font-medium tracking-wide drop-shadow-xs"
          >
            أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ
          </p>
        </div>

        {/* TRADUCTION & SOUVERAINETÉ */}
        <div className="space-y-2.5 pt-1 sm:pt-2">
          <p className="font-heading font-extrabold text-base sm:text-xl text-[var(--text-primary)] leading-snug">
            « Le moment n’est-il pas venu pour ceux qui ont cru, que leurs cœurs s’humilient à l’évocation d’Allah et devant ce qui est descendu de la Vérité... ? »
          </p>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            Ce verset est le point d&apos;inflexion de votre destinée. Il n&apos;est pas un reproche, mais l&apos;appel du Créateur à réveiller la réflexion lucide, à apaiser vos sensations, à fortifier votre foi et à reprendre votre place de Khalifa.
          </p>
        </div>

        {/* SCEAU D'AUTORITÉ DU CABINET */}
        <div className="pt-3 sm:pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#087B53] dark:text-[#10B981] font-bold">✓</span>
            <span className="text-[var(--text-primary)] font-semibold">Point Zéro de la Souveraineté</span>
          </div>
          <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">
            Cabinet BLF
          </span>
        </div>

      </div>
    </div>
  );
}
