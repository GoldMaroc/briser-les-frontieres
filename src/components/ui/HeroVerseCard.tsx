"use client";

import Image from "next/image";

export default function HeroVerseCard() {
  return (
    <div className="relative w-full max-w-[540px] rounded-[36px] overflow-hidden border border-[#B88E3E]/40 bg-gradient-to-b from-white via-[#FAF8F5] to-white p-8 sm:p-10 shadow-[0_24px_70px_rgba(184,142,62,0.12)]">
      {/* Texture d'arrière-plan avec portrait spirituel fondu */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply">
        <Image
          src="/images/sanctuaire/muslim_sujud_focus.jpg"
          alt="Prosternation Sujûd et recueillement profond"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        
        {/* EN-TÊTE DU VERSET */}
        <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B88E3E]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6214] font-bold">
              SOURATE AL-HADÎD • VERSET 16
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#7A6F64] uppercase tracking-wider">
            La Révélation du Cœur
          </span>
        </div>

        {/* VERSET EN ARABE (CALLIGRAPHIE NOBLE ET MAJESTUEUSE) */}
        <div className="py-2 text-right">
          <p 
            dir="rtl"
            lang="ar"
            className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-[#141210] leading-[1.8] font-medium tracking-wide drop-shadow-xs"
          >
            أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ
          </p>
        </div>

        {/* TRADUCTION POIGNANTE */}
        <div className="space-y-3 pt-2">
          <p className="font-heading font-extrabold text-lg sm:text-xl text-[#141210] leading-snug">
            « Le moment n’est-il pas venu pour ceux qui ont cru, que leurs cœurs s’humilient à l’évocation d’Allah et devant ce qui est descendu de la Vérité... ? »
          </p>
          <p className="text-xs sm:text-sm text-[#5C534A] font-sans leading-relaxed">
            Ce verset a réveillé les plus grands géants de notre histoire. Il n&apos;est pas une condamnation : c&apos;est l&apos;appel d&apos;urgence du Créateur à briser l&apos;inertie, à cesser de fuir et à reprendre le contrôle absolu de son âme par la prière.
          </p>
        </div>

        {/* SCEAU D'AUTORITÉ INFERIEUR */}
        <div className="pt-4 border-t border-[#E8E0D2] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#087B53] font-bold">✓</span>
            <span className="text-[#141210] font-semibold">Le Point Zéro de la Souveraineté</span>
          </div>
          <span className="text-[#8C6214] font-bold">
            Cabinet BLF • Mounir Byar
          </span>
        </div>

      </div>
    </div>
  );
}
