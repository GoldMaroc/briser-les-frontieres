"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function EditorialBentoGrid() {
  return (
    <section className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[var(--border)]">
      {/* EN-TÊTE DE SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] dark:text-[#D4A853] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
            ARCHITECTURE DU SYSTÈME
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight">
            Ingénierie Conçue pour Durer.
          </h2>
        </div>
        <Link
          href="/fondements"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] hover:text-[#8C6214] transition-colors"
        >
          <span>Comprendre les 5 Dimensions</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* GRILLE BENTO ASYMÉTRIQUE ÉDITORIALE SANS BOÎTES LOURDES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* TUILE 1 : TALL (COLONNE GAUCHE 7 COLS) - ARCHITECTURE COGNITIVE & CALME VAGAL */}
        <article className="lg:col-span-7 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
            <Image
              src="/images/instagram/photo_sanctuary_dawn_editorial.jpg"
              alt="Architecture du sanctuaire et éveil de la lucidité"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 750px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-6 left-6">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold uppercase tracking-wider border border-white/20 shadow-xs">
                Axiome 01 • Neurophysiologie
              </span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1.5 rounded-full bg-[#087B53] text-white text-[11px] font-mono font-bold shadow-md">
                -40% Cortisol
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B88E3E] dark:text-[#D4A853]">
                Le Point Zéro Cognitif
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-white mt-1">
                La Réinitialisation Parasympathique
              </h3>
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              La prière et le recueillement profond exercent une régulation immédiate sur l&apos;axe limbique. La stimulation du tonus vagal permet de réduire drastiquement l&apos;adrénaline et de libérer la bande passante du cortex préfrontal pour une prise de décision lucide.
            </p>
            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span>Régulation somatique mesurée</span>
              <span className="text-[#087B53] font-semibold">✓ Preuve clinique validée</span>
            </div>
          </div>
        </article>

        {/* COLONNE DROITE (5 COLS) : 2 TUILES VERTICALES */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
          
          {/* TUILE 2 (TOP) : ARCHITECTURE DE L'ESPACE & TAHARA */}
          <article className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/20 text-[#8C6214] dark:text-[#D4A853] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Axiome 02 • Environnement
                </span>
                <span className="text-xs font-mono text-[var(--text-secondary)]">Tahara 360°</span>
              </div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-primary)]">
                Le Verrouillage Environnemental
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Votre esprit est le reflet direct de votre espace. Éliminer la friction domestique et fermer les boucles de décision parasites pour que chaque moment d&apos;élévation devienne un refuge naturel, jamais une épreuve logistique.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[#087B53] font-semibold">
              <span>Sanctuarisation des 8 Piliers</span>
              <span>→ Zéro dispersion</span>
            </div>
          </article>

          {/* TUILE 3 (BOTTOM) : HARMONISATION CIRCADIENNE */}
          <article className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#087B53]/10 border border-[#087B53]/20 text-[#087B53] dark:text-[#4ade80] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Axiome 03 • Chronobiologie
                </span>
                <span className="text-xs font-mono text-[#8C6214] dark:text-[#D4A853] font-semibold">5 Paliers</span>
              </div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-primary)]">
                L&apos;Harmonisation Circadienne Céleste
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                De l&apos;aurore de l&apos;Aube (Fajr) au crépuscule d&apos;Isha, chaque temps de recueillement s&apos;accorde avec les oscillations hormonales de vigilance, de créativité et de restauration de l&apos;organisme humain.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border)] grid grid-cols-5 gap-1.5 text-center font-mono text-[10px]">
              <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)]">Fajr</div>
              <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)]">Dhuhr</div>
              <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)]">Asr</div>
              <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)]">Maghrib</div>
              <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)]">Isha</div>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
