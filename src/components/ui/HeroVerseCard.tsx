"use client";

export default function HeroVerseCard() {
  return (
    <div className="relative w-full max-w-[560px] py-4 sm:py-6 px-2 sm:px-4">
      {/* Halo d'ambiance sacrée diffus (aucun contour rectangulaire) */}
      <div 
        aria-hidden="true" 
        className="absolute -top-12 -right-8 w-72 h-72 rounded-full bg-radial from-[#087B53]/15 via-[#C59B4B]/10 to-transparent blur-3xl pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col space-y-6 sm:space-y-7">
        
        {/* EN-TÊTE ÉPURÉ & STATUTAIRE */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.22em] text-[#087B53] dark:text-[#4ade80] font-bold">
              SOURATE AL-HADÎD • 57:16
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)] tracking-wider uppercase opacity-75">
            L&apos;Appel du Créateur
          </span>
        </div>

        {/* VERSET EN ARABE (CALLIGRAPHIE NOBLE, GRANDEUR ET FLUIDITÉ) */}
        <div className="py-2 text-right relative">
          <p 
            dir="rtl"
            lang="ar"
            style={{ fontFamily: "'Traditional Arabic', 'Amiri', 'Scheherazade New', 'Lateef', 'Times New Roman', serif" }}
            className="text-2xl sm:text-3xl lg:text-[2.35rem] text-[var(--text-primary)] leading-[2.1] font-normal tracking-wide drop-shadow-xs select-all"
          >
            أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ
          </p>
        </div>

        {/* ORNEMENT CALLIGRAPHIQUE ARTISTIQUE (SEPARATEUR FLUIDE) */}
        <div className="flex items-center justify-center gap-3 py-1 opacity-70">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087B53]/40 to-transparent" />
          <span className="text-[#C59B4B] dark:text-[#D4A853] text-sm select-none">۞</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087B53]/40 to-transparent" />
        </div>

        {/* TRADUCTION ÉDITORIALE & CONTEMPLATION */}
        <div className="space-y-3">
          <p className="font-serif italic text-base sm:text-lg lg:text-xl text-[var(--text-primary)] leading-relaxed font-normal">
            « Le moment n’est-il pas venu pour ceux qui ont cru, que leurs cœurs s’humilient à l’évocation d’Allah et devant ce qui est descendu de la Vérité... ? »
          </p>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            Ce verset est le point d&apos;inflexion de votre destinée. Il réveille la lucidité de l&apos;esprit, apaise les sensations, fortifie la certitude (Yaqîn) et restaure le mandat souverain de Khalifa.
          </p>
        </div>

        {/* PIED DE LECTURE DISCRET SANS RECTANGLE */}
        <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-1.5 text-[#087B53] dark:text-[#4ade80] font-semibold">
            <span>◆</span>
            <span>Point Zéro de la Souveraineté</span>
          </span>
          <span className="tracking-widest uppercase text-[10px] opacity-60">
            Cabinet BLF // Ingénierie
          </span>
        </div>

      </div>
    </div>
  );
}
