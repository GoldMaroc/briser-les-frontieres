"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SovereigntyCyberneticHero() {
  const [activePortal, setActivePortal] = useState<number | null>(null);

  // Variables de preuve sociale
  const VARIABLE_ACCOMPAGNES = "+1 200 Dirigeants & Croyants";
  const VARIABLE_AVIS = "Note 4,9/5 sur Avis Vérifiés (43 Récits)";
  const VARIABLE_METHODE = "Doctrine C.O.M.E.S. • Livres & Accompagnement";

  return (
    <div className="relative w-full bg-[#0A0908] text-[#FBF9F5] overflow-hidden selection:bg-[#B88E3E]/30 selection:text-white">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO MONUMENTAL 2026 (TYPOGRAPHIE XXL & SPATIAL)
          Inspiré des plus grands standards (Gucci Cosmos, Apple Vision Pro, Obys Agency)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-12 sm:pt-16 lg:pt-20 pb-16 px-4 sm:px-6 lg:px-12 border-b border-white/10">
        
        {/* Halos d'ambiance cosmique et or champagne (Glows volumétriques) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[500px] bg-gradient-to-b from-[#B88E3E]/15 via-[#087B53]/10 to-transparent rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#DFB76C]/10 rounded-full filter blur-[120px] pointer-events-none" />

        {/* CONTENU CENTRAL DU HERO */}
        <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center text-center relative z-10 my-auto">
          
          {/* Eyebrow Pillule 2026 avec télémétrie */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#DFB76C]/30 backdrop-blur-xl shadow-[0_0_20px_rgba(223,183,108,0.1)] mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#DFB76C]">
              PARIS • REIMS — PAR MOUNIR BYAR
            </span>
            <span className="text-white/20 font-mono text-xs">|</span>
            <span className="font-mono text-[10px] text-white/60 tracking-wider hidden sm:inline">
              INGÉNIERIE COGNITIVE & EXÉGÈSE
            </span>
          </motion.div>

          {/* TITRE MONUMENTAL XXL (Le Statement 2026) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full space-y-3 sm:space-y-4"
          >
            <h1 className="font-heading font-extrabold text-[11vw] sm:text-[8.5vw] md:text-[7vw] lg:text-[6.5rem] xl:text-[7.5rem] tracking-[-0.04em] leading-[0.92] uppercase text-[#FBF9F5] select-none">
              REPRENEZ LE CONTRÔLE<span className="text-[#DFB76C]">.</span>
            </h1>

            <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] bg-gradient-to-r from-[#FFF0C2] via-[#DFB76C] to-[#B88E3E] bg-clip-text text-transparent font-medium tracking-tight">
              « La Salât comme arme de souveraineté. »
            </p>
          </motion.div>

          {/* SOUS-TITRE CADRÉ AVEC AUTORITÉ & PRÉCISION SCIENTIFIQUE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg text-white/70 font-sans leading-[1.65] font-normal"
          >
            La prière n&apos;est pas un rituel passif. C&apos;est l&apos;architecture neurobiologique suprême révélée à l&apos;humanité pour dompter le cortisol, briser la procrastination (<em className="text-white not-italic font-medium">At-Taswîf</em>) et commander son destin avec une clarté inaltérable.
          </motion.p>

          {/* DUO DE BOUTONS D'ACTION (CRO 2026 AVEC PHYSIQUE HAUT DE GAMME) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/audit"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[54px] rounded-full bg-gradient-to-r from-[#059669] via-[#087B53] to-[#047857] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.12em] shadow-[0_0_35px_rgba(5,150,105,0.4)] hover:shadow-[0_0_50px_rgba(5,150,105,0.6)] hover:scale-[1.03] transition-all duration-300 text-center border border-emerald-400/30"
            >
              <span className="w-2 h-2 rounded-full bg-[#DFB76C] animate-pulse" />
              <span>Faire l&apos;audit gratuit (3 min)</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <Link
              href="#methode"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[54px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-[#DFB76C]/60 text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 shadow-sm"
            >
              <span>Explorer la doctrine C.O.M.E.S.</span>
              <span className="text-xs text-[#DFB76C]">↓</span>
            </Link>
          </motion.div>

          {/* PREUVE SOCIALE STATUTAIRE IMMÉDIATE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 pt-6 border-t border-white/10 w-full max-w-2xl flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-white/60"
          >
            <div className="inline-flex items-center gap-2">
              <span className="text-[#10B981]">✓</span>
              <span className="text-white/80 font-medium">{VARIABLE_ACCOMPAGNES}</span>
            </div>

            <Link href="/#temoignages" className="inline-flex items-center gap-2 hover:text-[#DFB76C] transition-colors group">
              <span className="text-[#DFB76C]">★★★★★</span>
              <span className="text-white/80 group-hover:underline underline-offset-4 font-medium">{VARIABLE_AVIS}</span>
            </Link>

            <div className="inline-flex items-center gap-2">
              <span className="text-[#DFB76C]">✦</span>
              <span className="text-white/80 font-medium">{VARIABLE_METHODE}</span>
            </div>
          </motion.div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            LE TRIPTYQUE DES 3 PORTAILS (EXPÉRIENCE VISUELLE 2026)
            Remplacement du bloc photo 2 colonnes par une galerie spatiale interactive
            ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            
            {/* PORTAIL 1 : QIYÂM // L'ALIGNEMENT DU CORTEX */}
            <div 
              onMouseEnter={() => setActivePortal(1)}
              onMouseLeave={() => setActivePortal(null)}
              className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-white/[0.02] backdrop-blur-md group hover:border-[#DFB76C]/70 transition-all duration-500 shadow-2xl"
            >
              <Image
                src="/images/sanctuaire/muslim_qiyam_focus.jpg"
                alt="Station Qiyâm - Focus et verticalité sacrée"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#DFB76C]">
                <span>01 // STATION QIYÂM</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2">
                <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase tracking-wider block">
                  +35% CLARTÉ PRÉFRONTALE
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-tight">
                  L&apos;Alignement Rachidien
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 font-sans">
                  Immobilité absolue et rupture totale avec la dispersion mentale. Le cortex reprend l&apos;autorité sur les impulsions.
                </p>
              </div>
            </div>

            {/* PORTAIL 2 : SUJÛD // L'INVERSION DU STRESS */}
            <div 
              onMouseEnter={() => setActivePortal(2)}
              onMouseLeave={() => setActivePortal(null)}
              className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-[#DFB76C]/40 bg-white/[0.02] backdrop-blur-md group hover:border-[#DFB76C] transition-all duration-500 shadow-[0_0_40px_rgba(223,183,108,0.15)]"
            >
              <Image
                src="/images/sanctuaire/muslim_sujud_light.jpg"
                alt="Station Sujûd - Inversion vagale et apaisement profond"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center filter grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/90 backdrop-blur-md border border-emerald-300 text-[10px] font-mono text-white font-bold">
                <span>02 // CŒUR DU PROTOCOLE</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2">
                <span className="font-mono text-[10px] text-[#DFB76C] font-bold uppercase tracking-wider block">
                  -40% CORTISOL EN 90 SECONDES
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-tight">
                  Le Sujûd Souverain
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 font-sans">
                  L&apos;unique station où le cœur surplombe le cerveau. Décharge allostatique et paix viscérale instantanée.
                </p>
              </div>
            </div>

            {/* PORTAIL 3 : L'INGÉNIEUR // LES TRAITÉS & L'EXÉGÈSE */}
            <div 
              onMouseEnter={() => setActivePortal(3)}
              onMouseLeave={() => setActivePortal(null)}
              className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-white/[0.02] backdrop-blur-md group hover:border-[#DFB76C]/70 transition-all duration-500 shadow-2xl"
            >
              <Image
                src="/images/portrait-mounir.jpg"
                alt="Mounir Byar - Ingénieur et Auteur des Secrets de la Salât"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#DFB76C]">
                <span>03 // CABINET BLF</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2">
                <span className="font-mono text-[10px] text-[#DFB76C] font-bold uppercase tracking-wider block">
                  10 ANS D&apos;INGÉNIERIE & EXÉGÈSE
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-tight">
                  Mounir Byar & Ses Traités
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 font-sans">
                  Deux ouvrages majeurs et un accompagnement privé sur-mesure pour ancrer définitivement la souveraineté.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LE CONSTAT BRUTAL (TENSION ÉDITORIALE STYLE OBYS)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="methode" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-white/10 bg-[#0E0C0A]">
        <div className="max-w-[1300px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#DFB76C] block font-bold">
              01 // LE CONSTAT BRUTAL
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
              Pourquoi remettez-vous toujours votre prière à plus tard ?
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans leading-[1.65]">
              L&apos;inertie (<em className="text-[#DFB76C] not-italic">At-Taswîf</em>) n&apos;est pas un simple manque de volonté. C&apos;est le résultat d&apos;un cerveau saturé de dopamine rapide et d&apos;une prière privée de sa mécanique d&apos;ancrage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* L'Épuisement Moderne */}
            <article className="p-8 sm:p-12 rounded-3xl bg-[#141210] border border-red-500/20 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-xl">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/photo_man_stressed.png"
                    alt="Professionnel musulman épuisé tard le soir devant ses écrans"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter grayscale-[40%] contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-red-400 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full font-bold">
                    L&apos;ÉTAT ACTUEL • AT-TASWÎF
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  La journée subie & la prière expédiée
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-sans leading-[1.7]">
                  Vous courrez toute la journée après des urgences. Votre cerveau est en alerte permanente. Quand arrive l&apos;heure de la Salât, vous la repoussez au dernier moment. Vous priez en trois minutes, le cœur distrait et l&apos;esprit déjà ailleurs. La culpabilité s&apos;installe, et avec elle, un vide intérieur grandissant.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">CONSÉQUENCE BIOLOGIQUE</span>
                <span className="text-red-400 font-bold">Cortisol saturé & Charge mentale</span>
              </div>
            </article>

            {/* Le Sujûd Souverain */}
            <article className="p-8 sm:p-12 rounded-3xl bg-[#141210] border border-[#059669]/30 hover:border-[#059669]/70 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-xl">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/sanctuaire/muslim_sujud_light.jpg"
                    alt="Homme musulman en prosternation Sujûd sous la lumière d'aube"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-[#10B981] bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full font-bold">
                    LE RENOUVEAU • SUJÛD SOUVERAIN
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  L&apos;inversion biologique & la paix du cœur
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-sans leading-[1.7]">
                  La prosternation (Sujûd) est la seule posture humaine où le cœur se trouve au-dessus du cerveau. La pression artérielle irrigue massivement le cortex préfrontal, tandis que la pression mécanique sur les carotides stimule le nerf vague. Le cortisol s&apos;effondre en 90 secondes. Vous vous relevez calme, lucide, souverain.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">RÉSULTAT MESURÉ</span>
                <span className="text-[#10B981] font-bold">-40% Cortisol & Clarté Immédiate</span>
              </div>
            </article>

          </div>

          {/* LES 5 PILIERS C.O.M.E.S. EN TYPOGRAPHIE XXL */}
          <div className="pt-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#DFB76C] block font-bold mb-2">
                L&apos;INGÉNIERIE APPLIQUÉE
              </span>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-white">
                Le Protocole C.O.M.E.S. en 5 Piliers
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { letter: "C", name: "Clarté Cognitive", desc: "Stopper la rumination mentale et le bruit numérique avant d'entrer en prière." },
                { letter: "O", name: "Ordre Circadien", desc: "Synchroniser votre énergie biologique sur les 5 angles solaires révélés." },
                { letter: "M", name: "Maîtrise Vagal", desc: "Activer le système parasympathique par l'inversion sanguine du Sujûd." },
                { letter: "E", name: "Exégèse Vivante", desc: "Vibrer à chaque mot de la Fâtiha sans récitation mécanique distraite." },
                { letter: "S", name: "Souveraineté", desc: "Commander votre journée avec autorité, constance et discipline inaltérable." },
              ].map((pilier) => (
                <div 
                  key={pilier.letter}
                  className="p-6 rounded-3xl bg-[#141210] border border-white/10 hover:border-[#DFB76C]/80 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-4xl text-[#DFB76C] group-hover:scale-110 transition-transform">
                      {pilier.letter}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-white mb-2">
                      {pilier.name}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed font-sans">
                      {pilier.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : L'AUTEUR & L'INGÉNIEUR (MOUNIR BYAR)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-white/10 bg-[#0A0908]">
        <div className="max-w-[1300px] mx-auto">
          <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-[#141210] border border-white/10 shadow-2xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src="/images/sanctuaire/muslim_qiyam_focus.jpg"
                  alt="Mounir Byar en prière Qiyâm avec concentration totale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#DFB76C] block font-bold">
                  02 // L&apos;AUTEUR & FONDATEUR
                </span>

                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                  « Je ne vends pas de la motivation éphémère. J&apos;enseigne une ingénierie de la vie. »
                </h2>

                <p className="text-base text-white/70 font-sans leading-relaxed">
                  Ingénieur de formation et passionné par l&apos;exégèse coranique depuis plus de 10 ans, Mounir Byar a développé le Cabinet Briser les Frontières pour combler le fossé tragique entre la pratique rituelle et la réalité comportementale moderne.
                </p>

                <p className="text-base text-white/70 font-sans leading-relaxed">
                  Tous les enseignements et protocoles reposent à 100% sur le Noble Coran et la Sunnah authentique, éclairés par les découvertes contemporaines en neurosciences et régulation du stress.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <span className="font-heading font-extrabold text-3xl text-white block">+1 200</span>
                    <span className="text-xs text-white/50 font-mono">Personnes formées</span>
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-3xl text-[#DFB76C] block">10 Ans</span>
                    <span className="text-xs text-white/50 font-mono">Recherche & Exégèse</span>
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-3xl text-[#10B981] block">100%</span>
                    <span className="text-xs text-white/50 font-mono">Coran & Sunnah</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : LES TRAITÉS DE L'INGÉNIEUR (LIVRES DÈS 5,90 €)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="livres" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-white/10 bg-[#0E0C0A]">
        <div className="max-w-[1300px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#DFB76C] block font-bold">
              03 // LES OUVRAGES DE RÉFÉRENCE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Les Traités Fondateurs de l&apos;Ingénieur
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans leading-[1.65]">
              Des milliers de musulmans ont transformé leur rapport à la Salât grâce à ces deux ouvrages maîtres. Disponibles en format numérique immédiat et édition brochée de luxe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* LIVRE 1 : Les Secrets de la Salât */}
            <article className="p-8 sm:p-12 rounded-3xl bg-[#141210] border border-white/10 hover:border-[#DFB76C]/70 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-2xl">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-Secrets.png"
                    alt="Mockup 3D du livre Les Secrets de la Salat par Mounir Byar"
                    fill
                    className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#10B981] uppercase tracking-wider font-bold bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
                    LE TRAITÉ MAÎTRE • PLUS DE 5 000 EXEMPLAIRES
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    Les Secrets de la Salât et du Retour vers Allah
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 font-sans leading-[1.65]">
                    L&apos;ouvrage fondateur pour comprendre chaque station de la prière. De l&apos;alignement vertébral du Qiyâm à la mise à la terre du Sujûd, redécouvrez le sens profond des gestes et des paroles sacrées.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-white/40 text-xs font-mono block">Format Numérique & Broché</span>
                  <span className="text-[#DFB76C] font-heading font-bold text-2xl">Dès 5,90 €</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/livres#secrets"
                    className="px-6 py-3 rounded-full bg-[#DFB76C] hover:bg-[#C9A256] text-[#0A0908] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Commander le Livre →
                  </Link>
                  <a
                    href="/Les-Secrets-du-Retour-vers-Allah-EXTRAIT-OFFERT.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-full border border-white/20 text-white font-heading text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                  >
                    Extrait Offert
                  </a>
                </div>
              </div>
            </article>

            {/* LIVRE 2 : Sourate Ar-Rahman */}
            <article className="p-8 sm:p-12 rounded-3xl bg-[#141210] border border-white/10 hover:border-[#DFB76C]/70 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-2xl">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-ArRahman.png"
                    alt="Mockup 3D du livre Sourate Ar-Rahman par Mounir Byar"
                    fill
                    className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#DFB76C] uppercase tracking-wider font-bold bg-[#DFB76C]/15 border border-[#DFB76C]/40 px-3 py-1 rounded-full">
                    EXÉGÈSE & CONTEMPLATION COSMIQUE
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    Sourate Ar-Rahmân : Les Clés de la Gratitude
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 font-sans leading-[1.65]">
                    Une plongée vertigineuse dans les 78 versets d&apos;Ar-Rahmân. Comment la contemplation des lois cosmiques guérit l&apos;anxiété moderne et installe une paix inébranlable dans le cœur du croyant.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-white/40 text-xs font-mono block">Format Numérique & Broché</span>
                  <span className="text-[#DFB76C] font-heading font-bold text-2xl">Dès 5,90 €</span>
                </div>

                <Link
                  href="/livres#ar-rahman"
                  className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-[#0A0908] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Découvrir l&apos;Ouvrage →
                </Link>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 : L'ACCOMPAGNEMENT PRIVÉ D'EXCELLENCE (PROTOCOLE 9 MOIS)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="accompagnement" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-white/10 bg-[#0A0908]">
        <div className="max-w-5xl mx-auto p-8 sm:p-14 lg:p-16 rounded-3xl bg-[#141210] border border-white/10 shadow-2xl relative overflow-hidden text-center">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFB76C]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#DFB76C] block font-bold">
              04 // HAUTE DIRECTION & COMPAGNONNAGE
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08]">
              Le Protocole 9 Mois : L&apos;Accompagnement Privé
            </h2>

            <p className="text-base sm:text-lg text-white/70 font-sans leading-[1.7]">
              Un mentorat sur-mesure réservé aux musulmans exigeants (entrepreneurs, médecins, ingénieurs, cadres) qui veulent instaurer la Salât comme tour de contrôle décisionnelle, assainir leur écosystème mental et assumer pleinement leur mandat de Khalifa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-[#DFB76C] font-bold block mb-1">01. AUDIT</span>
                <p className="text-xs text-white/60 font-sans">Diagnostic comportemental approfondi de vos freins et sabotages.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-[#DFB76C] font-bold block mb-1">02. COMPAGNONNAGE</span>
                <p className="text-xs text-white/60 font-sans">Suivi individuel direct avec Mounir Byar pour chaque prière.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-[#DFB76C] font-bold block mb-1">03. ANCRAGE</span>
                <p className="text-xs text-white/60 font-sans">Discipline inébranlable et clarté d&apos;esprit pour le restant de vos jours.</p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/candidature"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(5,150,105,0.4)] hover:scale-105 transition-all"
              >
                Déposer ma candidature confidentielle →
              </Link>
              <Link
                href="/prix"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 text-white font-heading text-xs sm:text-sm uppercase tracking-wider transition-all"
              >
                Voir toute la grille tarifaire (dès 5,90 €)
              </Link>
            </div>

            <p className="text-[11px] text-white/40 font-mono tracking-wide">
              PLACES LIMITÉES POUR GARANTIR UNE ATTENTION ABSOLUE • SÉLECTION SUR DOSSIER
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
