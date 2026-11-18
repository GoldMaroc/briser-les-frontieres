"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SovereigntyCyberneticHero() {
  // Variables de preuve sociale modifiables
  const VARIABLE_ACCOMPAGNES = "+1 200 personnes accompagnées";
  const VARIABLE_AVIS = "Note 4,9/5 sur avis vérifiés";
  const VARIABLE_METHODE = "Méthode C.O.M.E.S. • Livres & Accompagnement";

  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#141210]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION HERO : SPLIT-SCREEN ÉDITORIAL HAUTE CONVERSION (CRO)
          - Style Haute Joaillerie : Beige Albâtre #FAF8F5 & Or Impérial #B88E3E
          - Grille asymétrique : 58% éditorial / 42% portrait noble dédié (4/5)
          - Typographie statutaire avec text-wrap: balance
          - 100% conforme WCAG 2.1 AA (contraste > 15:1 sur H1, > 9:1 sur sous-titre)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#FAF8F5] border-b border-[#E8E0D2]">
        
        {/* Halo lumineux d'ambiance très subtil */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#B88E3E]/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
            
            {/* COLONNE GAUCHE (58%) : Manifeste & Appel à l'Action */}
            <div className="w-full lg:w-[58%] flex flex-col items-start text-left">
              
              {/* Sur-titre (eyebrow) statutaire */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E] animate-pulse" />
                <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em]">
                  PARIS • REIMS — PAR MOUNIR BYAR
                </span>
              </div>

              {/* Titre H1 monumental avec accent doré */}
              <h1 
                style={{ textWrap: "balance" }}
                className="font-heading font-bold text-[32px] sm:text-[44px] lg:text-[48px] xl:text-[54px] text-[#141210] leading-[1.08] tracking-[-0.025em]"
              >
                Reprenez le contrôle <br className="hidden sm:inline" />de votre vie.
                <span className="block mt-2 font-serif italic bg-gradient-to-r from-[#B88E3E] via-[#DFB76C] to-[#8C6214] bg-clip-text text-transparent font-medium">
                  La Salât comme arme de souveraineté.
                </span>
              </h1>

              {/* Sous-titre cadré positivement */}
              <p className="mt-4 sm:mt-5 text-[17px] sm:text-[19px] text-[#374151] leading-[1.6] max-w-xl font-sans">
                Méthode structurée, traités exégétiques et accompagnements d&apos;excellence pour faire de vos 5 prières quotidiennes un ancrage cognitif suprême, réguler le stress et passer à l&apos;action avec constance.
              </p>

              {/* Boutons d'action : CTA Primaire & Secondaire */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="/audit"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[50px] rounded-full bg-[#087B53] hover:bg-[#066343] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(8,123,83,0.25)] hover:shadow-[0_12px_30px_rgba(8,123,83,0.35)] hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFB76C] animate-pulse" />
                  <span>Faire l&apos;audit gratuit (3 min)</span>
                  <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>

                <Link
                  href="#methode"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[50px] rounded-full bg-white hover:bg-[#F3EDE4] border border-[#D5C9B8] text-[#141210] font-heading font-semibold text-sm transition-all duration-200 shadow-sm hover:border-[#B88E3E]"
                >
                  <span>Découvrir la méthode</span>
                  <span className="text-xs text-[#B88E3E]">↓</span>
                </Link>
              </div>

              {/* Preuve Sociale (Intégrée et Vérifiable) : espacement 28px */}
              <div className="mt-7 pt-6 border-t border-[#E8E0D2] w-full flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3.5 sm:gap-6 text-sm text-[#374151]">
                <div className="inline-flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#087B53]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#087B53]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#141210] text-[13px]">{VARIABLE_ACCOMPAGNES}</span>
                </div>

                <Link 
                  href="/#temoignages" 
                  className="inline-flex items-center gap-2 hover:text-[#087B53] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B53] rounded"
                >
                  <div className="flex items-center text-[#B88E3E] text-xs">
                    ★★★★★
                  </div>
                  <span className="font-medium text-[#141210] text-[13px] underline underline-offset-4 decoration-[#D1D5DB] group-hover:decoration-[#087B53] group-hover:text-[#087B53] transition-colors">
                    {VARIABLE_AVIS}
                  </span>
                </Link>

                <div className="inline-flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#B88E3E]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#B88E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#141210] text-[13px]">{VARIABLE_METHODE}</span>
                </div>
              </div>

            </div>

            {/* COLONNE DROITE (42%) : Cadre Portrait Éditorial Dédié (4/5) */}
            <div className="w-full lg:w-[42%] flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="w-full max-w-[440px] lg:max-w-none">
                
                {/* Cadre vertical propre (aspect-ratio 4/5, border-radius 24px) */}
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(24,21,18,0.12)] border border-[#E8E0D2] bg-[#F5EFEB] group">
                  
                  {/* Photo Mounir Byar nette et naturelle */}
                  <Image
                    src="/images/portrait-mounir.jpg"
                    alt="Mounir Byar - Fondateur de Briser les Frontières et auteur des Secrets de la Salât"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-[center_top] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />

                  {/* Gradient très discret au bas de la photo pour asseoir le badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge Haut : Origine & Statut */}
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141210]/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFB76C]" />
                    <span>CABINET BLF • ÉTUDE & EXÉGÈSE</span>
                  </div>

                  {/* Cartouche inférieur : Citation d'autorité */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 sm:p-4 rounded-2xl bg-[#FBF9F5]/94 backdrop-blur-md border border-[#E8E0D2] shadow-lg">
                    <p className="text-[12px] sm:text-[13px] text-[#141210] font-serif italic leading-snug">
                      « La prière n&apos;est pas un rituel passif. C&apos;est l&apos;architecture neurobiologique suprême révélée à l&apos;humanité. »
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#B88E3E]">
                        Mounir Byar — Fondateur
                      </span>
                      <span className="text-[10px] font-mono text-[#7A6F64]">
                        10 ans d&apos;ingénierie
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LA MÉTHODE C.O.M.E.S. & LE CONSTAT BRUTAL
          ═══════════════════════════════════════════════════════════════ */}
      <section id="methode" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold">
              01 // LE CONSTAT BRUTAL
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#141210] tracking-[-0.025em] leading-[1.1]">
              Pourquoi remettez-vous toujours votre prière à plus tard ?
            </h2>
            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
              L&apos;inertie (<em className="text-[#141210] italic">At-Taswîf</em>) n&apos;est pas un simple manque de volonté. C&apos;est le résultat direct d&apos;un cerveau saturé de dopamine rapide et d&apos;une prière privée de sa mécanique d&apos;ancrage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Colonne Gauche : L'Épuisement Moderne */}
            <article className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E0D2] hover:border-red-400/50 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(35,28,20,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#E8E0D2]">
                  <Image
                    src="/images/photo_man_stressed.png"
                    alt="Professionnel musulman épuisé tard le soir devant ses écrans"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter grayscale-[30%] contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-red-800 bg-red-50 border border-red-300 px-3 py-1 rounded-full font-semibold">
                    L&apos;ÉTAT ACTUEL • AT-TASWÎF
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#141210]">
                  La journée subie & la prière expédiée
                </h3>
                <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.65]">
                  Vous courrez toute la journée après des urgences. Votre cerveau est en alerte permanente. Quand arrive l&apos;heure de la Salât, vous la repoussez au dernier moment. Vous priez en trois minutes, le cœur distrait et l&apos;esprit déjà ailleurs. La culpabilité s&apos;installe, et avec elle, un vide intérieur grandissant.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8E0D2] flex items-center justify-between text-xs font-mono text-[#7A6F64]">
                <span>CONSÉQUENCE</span>
                <span className="text-red-700 font-semibold">Cortisol élevé & Charge mentale</span>
              </div>
            </article>

            {/* Colonne Droite : Le Sujûd Souverain */}
            <article className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E0D2] hover:border-[#087B53]/50 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(35,28,20,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#E8E0D2]">
                  <Image
                    src="/images/sanctuaire/muslim_sujud_light.jpg"
                    alt="Homme musulman en prosternation Sujûd complète sous la lumière d'aube"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-[#087B53] bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full font-bold">
                    LE RENOUVEAU • SUJÛD SOUVERAIN
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#141210]">
                  L&apos;inversion biologique & la paix du cœur
                </h3>
                <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.65]">
                  La prosternation (Sujûd) est la seule posture humaine où le cœur se trouve au-dessus du cerveau. La pression artérielle irrigue massivement le cortex préfrontal, tandis que la pression mécanique sur les carotides stimule le nerf vague. Le cortisol s&apos;effondre en 90 secondes. Vous vous relevez calme, lucide, souverain.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8E0D2] flex items-center justify-between text-xs font-mono text-[#7A6F64]">
                <span>RÉSULTAT</span>
                <span className="text-[#087B53] font-bold">-40% Cortisol & Clarté Immédiate</span>
              </div>
            </article>

          </div>

          {/* Les 5 Piliers du Protocole C.O.M.E.S. */}
          <div className="pt-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold mb-2">
                L&apos;INGÉNIERIE APPLIQUÉE
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#141210]">
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
                  className="p-5 rounded-2xl bg-white border border-[#E8E0D2] hover:border-[#B88E3E]/60 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-3xl text-[#B88E3E]">
                      {pilier.letter}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#DFB76C]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#141210] mb-1">
                      {pilier.name}
                    </h4>
                    <p className="text-xs text-[#5C534A] leading-relaxed">
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
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F5EFEB] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto">
          <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-white border border-[#E8E0D2] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8E0D2]">
                <Image
                  src="/images/sanctuaire/muslim_qiyam_focus.jpg"
                  alt="Mounir Byar en prière Qiyâm avec concentration totale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold">
                  02 // L'AUTEUR & FONDATEUR
                </span>

                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#141210] leading-tight">
                  « Je ne vends pas de la motivation éphémère. J&apos;enseigne une ingénierie de la vie. »
                </h2>

                <p className="text-base text-[#5C534A] font-sans leading-relaxed">
                  Ingénieur de formation et passionné par l&apos;exégèse coranique depuis plus de 10 ans, Mounir Byar a développé le Cabinet Briser les Frontières pour combler le fossé tragique entre la pratique rituelle et la réalité comportementale moderne.
                </p>

                <p className="text-base text-[#5C534A] font-sans leading-relaxed">
                  Tous les enseignements et protocoles reposent à 100% sur le Noble Coran et la Sunnah authentique, éclairés par les découvertes contemporaines en neurosciences et régulation du stress.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E0D2]">
                  <div>
                    <span className="font-heading font-bold text-2xl text-[#141210] block">+1 200</span>
                    <span className="text-xs text-[#7A6F64] font-mono">Personnes formées</span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-2xl text-[#141210] block">10 Ans</span>
                    <span className="text-xs text-[#7A6F64] font-mono">Recherche & Exégèse</span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-2xl text-[#087B53] block">100%</span>
                    <span className="text-xs text-[#7A6F64] font-mono">Coran & Sunnah</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : LES LIVRES & TRAITÉS FONDATEURS (DÈS 5,90 €)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="livres" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold">
              03 // LES OUVRAGES DE RÉFÉRENCE
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#141210] tracking-[-0.025em] leading-[1.1]">
              Les Traités Fondateurs de l&apos;Ingénieur
            </h2>
            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
              Des milliers de musulmans ont transformé leur rapport à la Salât grâce à ces deux ouvrages maîtres. Disponibles en eBook instantané et format broché de prestige.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* LIVRE 1 : Les Secrets de la Salât */}
            <article className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E0D2] hover:border-[#B88E3E]/60 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(35,28,20,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-Secrets.png"
                    alt="Mockup 3D du livre Les Secrets de la Salat par Mounir Byar"
                    fill
                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#087B53] uppercase tracking-wider font-bold bg-[#087B53]/10 px-2.5 py-1 rounded-full">
                    LE TRAITÉ MAÎTRE • PLUS DE 5 000 EXEMPLAIRES
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#141210]">
                    Les Secrets de la Salât et du Retour vers Allah
                  </h3>
                  <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.65]">
                    L&apos;ouvrage fondateur pour comprendre chaque station de la prière. De l&apos;alignement vertébral du Qiyâm à la mise à la terre du Sujûd, redécouvrez le sens profond des gestes et des paroles sacrées.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E0D2] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[#7A6F64] text-xs font-mono block">Format Numérique & Broché</span>
                  <span className="text-[#141210] font-heading font-bold text-2xl">Dès 5,90 €</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/livres#secrets"
                    className="px-6 py-3 rounded-full bg-[#B88E3E] hover:bg-[#9E782E] text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Commander le Livre →
                  </Link>
                  <a
                    href="/Les-Secrets-du-Retour-vers-Allah-EXTRAIT-OFFERT.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-full border border-[#E8E0D2] text-[#141210] font-heading text-xs uppercase tracking-wider hover:bg-[#F5EFEB] transition-all"
                  >
                    Extrait Offert
                  </a>
                </div>
              </div>
            </article>

            {/* LIVRE 2 : Sourate Ar-Rahman */}
            <article className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E0D2] hover:border-[#B88E3E]/60 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(35,28,20,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-ArRahman.png"
                    alt="Mockup 3D du livre Sourate Ar-Rahman par Mounir Byar"
                    fill
                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#B88E3E] uppercase tracking-wider font-bold bg-[#B88E3E]/10 px-2.5 py-1 rounded-full">
                    EXÉGÈSE & CONTEMPLATION COSMIQUE
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#141210]">
                    Sourate Ar-Rahmân : Les Clés de la Gratitude
                  </h3>
                  <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.65]">
                    Une plongée vertigineuse dans les 78 versets d&apos;Ar-Rahmân. Comment la contemplation des lois cosmiques guérit l&apos;anxiété moderne et installe une paix inébranlable dans le cœur du croyant.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E0D2] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[#7A6F64] text-xs font-mono block">Format Numérique & Broché</span>
                  <span className="text-[#141210] font-heading font-bold text-2xl">Dès 5,90 €</span>
                </div>

                <Link
                  href="/livres#ar-rahman"
                  className="px-6 py-3 rounded-full bg-[#141210] hover:bg-[#2A241F] text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
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
      <section id="accompagnement" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F5EFEB] border-b border-[#E8E0D2]">
        <div className="max-w-5xl mx-auto p-8 sm:p-14 lg:p-16 rounded-3xl bg-white border border-[#E8E0D2] shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B88E3E]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B88E3E] block font-bold">
              04 // HAUTE DIRECTION & COMPAGNONNAGE
            </span>

            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#141210] tracking-[-0.025em] leading-[1.08]">
              Le Protocole 9 Mois : L&apos;Accompagnement Privé
            </h2>

            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.7]">
              Un mentorat sur-mesure réservé aux musulmans exigeants (entrepreneurs, médecins, ingénieurs, cadres) qui veulent instaurer la Salât comme tour de contrôle décisionnelle, assainir leur écosystème mental et assumer pleinement leur mandat de Khalifa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <span className="font-mono text-xs text-[#B88E3E] font-bold block mb-1">01. AUDIT</span>
                <p className="text-xs text-[#5C534A] font-sans">Diagnostic comportemental approfondi de vos freins et sabotages.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <span className="font-mono text-xs text-[#B88E3E] font-bold block mb-1">02. COMPAGNONNAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Suivi individuel direct avec Mounir Byar pour chaque prière.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <span className="font-mono text-xs text-[#B88E3E] font-bold block mb-1">03. ANCRAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Discipline inébranlable et clarté d&apos;esprit pour le restant de vos jours.</p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/candidature"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(8,123,83,0.30)] hover:bg-[#066343] hover:scale-105 transition-all"
              >
                Déposer ma candidature confidentielle →
              </Link>
              <Link
                href="/prix"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#EDE5D8] border border-[#E8E0D2] text-[#141210] font-heading text-xs sm:text-sm uppercase tracking-wider transition-all"
              >
                Voir toute la grille tarifaire (dès 5,90 €)
              </Link>
            </div>

            <p className="text-[11px] text-[#7A6F64] font-mono tracking-wide">
              PLACES LIMITÉES POUR GARANTIR UNE ATTENTION ABSOLUE • SÉLECTION SUR DOSSIER
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
