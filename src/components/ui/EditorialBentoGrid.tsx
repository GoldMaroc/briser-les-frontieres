"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function EditorialBentoGrid() {
  return (
    <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E0D2]">
      {/* EN-TÊTE DE SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
            ARCHITECTURE DU SYSTÈME
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight">
            Ingénierie Conçue pour Durer.
          </h2>
        </div>
        <Link
          href="/fondements"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#B88E3E] hover:text-[#8C6214] transition-colors"
        >
          <span>Comprendre les fondements</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* GRILLE BENTO ASYMÉTRIQUE ÉDITORIALE (STYLE MATERIAL FLASK BENTO) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TUILE 1 : TALL (COLONNE GAUCHE 7 COLS) - INTELLIGENCE SOMATIQUE & RÉINITIALISATION VAGALE */}
        <article className="lg:col-span-7 rounded-[32px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
            <Image
              src="/images/photo_ocean_rahman.jpg"
              alt="Intelligence somatique et apaisement profond du système nerveux"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm border border-white/10">
                Axiome 01 • Neurophysiologie
              </span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1.5 rounded-full bg-[#087B53] text-white text-[11px] font-mono font-bold shadow-md">
                -40% Cortisol
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A853]">
                Le Point Zéro Somatique
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mt-1">
                L&apos;Apaisement Somatique &amp; Le Nerf Vague
              </h3>
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-3">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              La paix intérieure n&apos;est pas une simple idée abstraite : elle s&apos;enracine dans la physiologie. L&apos;abaissement conscient du rythme cardiaque et respiratoire comprime les barorécepteurs, forçant le système nerveux parasympathique à freiner la tempête d&apos;adrénaline et à réinstaller un calme souverain.
            </p>
            <div className="pt-3 border-t border-[#E8E0D2] flex items-center justify-between text-xs font-mono text-[#7A6F64]">
              <span>Durée minimale recommandée : 40 secondes</span>
              <span className="text-[#087B53] font-semibold">✓ Effet mesuré cliniquement</span>
            </div>
          </div>
        </article>

        {/* COLONNE DROITE (5 COLS) : 2 TUILES VERTICALES */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* TUILE 2 (TOP) : TAHARA PHYSIQUE & SANCTUAIRE */}
          <article className="rounded-[32px] overflow-hidden border border-[#E8E0D2] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#B88E3E]/10 text-[#8C6214] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Axiome 02 • Environnement
                </span>
                <span className="text-xs font-mono text-[#7A6F64]">Tahara 360°</span>
              </div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#141210]">
                Le Verrouillage Environnemental
              </h3>
              <p className="text-xs text-[#5C534A] leading-relaxed">
                Votre esprit est le reflet direct de votre espace. Éliminer la friction domestique et numériser vos boucles de décision pour que la prière devienne un refuge naturel, jamais une épreuve logistique.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E0D2] flex items-center justify-between text-[11px] font-mono text-[#087B53] font-semibold">
              <span>Sanctuarisation de l&apos;espace de prière</span>
              <span>→ Zéro distraction</span>
            </div>
          </article>

          {/* TUILE 3 (BOTTOM) : HORLOGE CIRCADIENNE DES 5 PRIÈRES */}
          <article className="rounded-[32px] overflow-hidden border border-[#E8E0D2] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#087B53]/10 text-[#087B53] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Axiome 03 • Chronobiologie
                </span>
                <span className="text-xs font-mono text-[#8C6214] font-semibold">5 Paliers</span>
              </div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#141210]">
                L&apos;Harmonisation Circadienne Céleste
              </h3>
              <p className="text-xs text-[#5C534A] leading-relaxed">
                Du Fajr au crépuscule d&apos;Isha, chaque temps de prière s&apos;aligne parfaitement avec les pics hormonaux de vigilance et de repos de l&apos;organisme humain.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E0D2] grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
              <div className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">Fajr</div>
              <div className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">Dhuhr</div>
              <div className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">Asr</div>
              <div className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">Maghrib</div>
              <div className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">Isha</div>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
