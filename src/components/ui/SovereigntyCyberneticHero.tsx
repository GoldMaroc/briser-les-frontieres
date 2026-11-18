"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProtocolTab {
  id: string;
  tag: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  ctaText: string;
  ctaHref: string;
  ctaVariant: "emerald" | "light";
  image: string;
}

const PROTOCOLS_DATA: ProtocolTab[] = [
  {
    id: "audit",
    tag: "DIAGNOSTIC IMMÉDIAT",
    number: "01",
    title: "L'Audit de Souveraineté",
    headline: "Mesurez vos angles morts cognitifs & votre constance spirituelle.",
    description:
      "Un questionnaire de 3 minutes conçu comme un électroencéphalogramme comportemental. Identifiez les failles d'attention, le niveau de charge allostatique et les fuites d'énergie qui sabotent votre prière et votre discipline quotidienne.",
    metricLabel: "DURÉE ESTIMÉE",
    metricValue: "3 MIN",
    metricSub: "Diagnostic confidentiel immédiat",
    ctaText: "Lancer mon audit gratuit",
    ctaHref: "/audit",
    ctaVariant: "emerald",
    image: "/images/instagram/photo_executive_focus.jpg",
  },
  {
    id: "livre",
    tag: "MÉTHODE AUTONOME",
    number: "02",
    title: "Le Traité C.O.M.E.S. (30 Jours)",
    headline: "L'architecture complète pour vaincre la procrastination (At-Taswîf).",
    description:
      "L'eBook de référence de Mounir Byar. Trente jours pour restructurer vos habitudes autour de la biomécanique du Sujûd, reprogrammer le système nerveux autonome et ériger une constance inébranlable sans forcer la volonté.",
    metricLabel: "DURÉE DU CYCLE",
    metricValue: "30 JRS",
    metricSub: "Feuille de route pas à pas",
    ctaText: "Se procurer le traité (dès 5,90 €)",
    ctaHref: "/livres#secrets",
    ctaVariant: "light",
    image: "/images/instagram/photo_executive_still_life.jpg",
  },
  {
    id: "accompagnement",
    tag: "HAUTE DIRECTION",
    number: "03",
    title: "L'Accompagnement Privé (9 Mois)",
    headline: "Compagnonnage intensif et interposition behavioriste sur-mesure.",
    description:
      "Le programme ultime réservé aux dirigeants, entrepreneurs et créateurs. Un mentorat individuel rigoureux pour intégrer la Salat comme tour de contrôle décisionnelle, assainir votre écosystème mental et assumer pleinement votre mandat de Khalifa.",
    metricLabel: "ENGAGEMENT",
    metricValue: "9 MOIS",
    metricSub: "Candidature sélective sur dossier",
    ctaText: "Postuler à l'accompagnement",
    ctaHref: "#contact-comes",
    ctaVariant: "emerald",
    image: "/images/instagram/photo_khalifa_sunrise.jpg",
  },
];

export default function SovereigntyCyberneticHero() {
  const [activeTabId, setActiveTabId] = useState<string>("audit");
  const activeTab = PROTOCOLS_DATA.find((p) => p.id === activeTabId) || PROTOCOLS_DATA[0];

  return (
    <div className="relative w-full bg-[#08090A] text-white selection:bg-[#00E599]/30 selection:text-white">

      {/* ════════════════════════════════════════════════════════════
          1. HERO PRINCIPALE — ÉLÉGANCE AYOCIN (SCREENSHOT 020)
          - Typographie monumentale en filigrane derrière le contenu
          - Ambiance sanctuaire à l'aube (chaleur naturelle, noble, apaisante)
          - Pilules flottantes et hiérarchie éditoriale pure
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-12 px-5 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* Photographie architecturale immersive en arrière-plan */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/instagram/hero_terminal_dawn.jpg"
            alt="Sanctuaire d'architecture et lumière d'aube"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.82] contrast-105"
          />
          {/* Voile dégradé subtil pour préserver le contraste luxueux */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090A]/90 via-[#08090A]/40 to-[#08090A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,9,10,0.8)_95%)]" />
        </div>

        {/* Titre colossal en filigrane d'arrière-plan (comme ATMOS LAMP sur Ayocin) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-[1] overflow-hidden whitespace-nowrap">
          <span className="font-heading font-bold text-[14vw] tracking-[-0.05em] text-white/[0.035] leading-none uppercase inline-block">
            SOUVERAINETÉ
          </span>
        </div>

        {/* 1.1 Haut de Hero : Micro-label et localisation */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-300 uppercase">
              CABINET BLF // ARCHITECTURE DU CERVEAU & EXÉGÈSE
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
            PARIS // REIMS • EST. 2026
          </span>
        </div>

        {/* 1.2 Centre Hero : Typographie monumentale Systemia & Appels à l'action */}
        <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-10 sm:py-16">
          
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[5.4rem] tracking-[-0.038em] text-white leading-[1.02] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            Nous avons réinventé<br />
            la reconquête de l&apos;esprit<br />
            <span className="text-[#00E599]">par la prosternation.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-sm sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            La prosternation (Sujûd) n&apos;est pas une soumission passive. C&apos;est l&apos;arme neurobiologique suprême pour dompter le cortisol, régénérer l&apos;attention et commander son esprit.
          </p>

          {/* Boutons d'Action style Ayocin Floating Pills */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/audit"
              className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-7 sm:px-8 py-4 rounded-full bg-[#00E599] text-black font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,229,153,0.35)] hover:shadow-[0_0_55px_rgba(0,229,153,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Passer l&apos;Audit Prière & Cerveau (3 min)</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="/livres"
              className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-7 sm:px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explorer les Traités & Protocoles</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>

        </div>

        {/* 1.3 Bas de Hero style Ayocin (Micro-bénéfices horizontaux & scroll) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-8 text-neutral-300 text-xs font-sans">
            <span className="flex items-center gap-2">
              <span className="text-[#00E599]">≈</span> Décompression rachidienne & vagale
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#00E599]">☼</span> Perfusion du cortex préfrontal (+40%)
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#00E599]">▲</span> Rupture chirurgicale de l&apos;inertie
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
            <span>Défiler pour explorer</span>
            <span className="text-[#00E599] animate-bounce">↓</span>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          2. LE MANIFESTE D'ÉVEIL (AYOCIN SCREENSHOT 050)
          - Plein écran immersif avec visuel contemplatif à l'aube
          - Grand titre sobre et puissant
          - Carte flottante glassmorphism à droite avec constat biologique
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center py-24 sm:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden bg-[#0A0C0E]">
        
        {/* Photographie de contemplation à l'aube en plein écran */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/instagram/photo_khalifa_sunrise.jpg"
            alt="Contemplation au lever du soleil sur les monts"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.70] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-[#08090A]/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          
          {/* Titre éditorial percutant (gauche) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#00E599]">
              // 02. L&apos;ÉTAT D&apos;URGENCE INTÉRIEURE
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.035em] leading-[1.05] drop-shadow-lg">
              L&apos;homme moderne passe sa vie dans la surcharge cognitive, coupé de son sanctuaire.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-sans leading-relaxed drop-shadow-md">
              La fragmentation numérique et la quête incessante de validation consument le cortex préfrontal. Chaque heure passée sans ancrage spirituel creuse une fatigue invisible que le repos passif ne peut combler.
            </p>
          </div>

          {/* Carte flottante glassmorphism (droite, style Ayocin) */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121316]/85 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
              <div className="w-10 h-10 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] text-base">
                ◈
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Restauration par le Sujûd
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                Le protocole C.O.M.E.S. inverse ce cycle d&apos;épuisement : la prosternation réaligne le rachis, active la perfusion cérébrale et déclenche une rupture nette avec l&apos;entropie numérique.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#00E599] font-bold text-lg block">-40%</span>
                  <span className="text-neutral-400 text-[10px] uppercase tracking-wider">Cortisol Circulant</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="text-[#00E599] font-bold text-lg block">+35%</span>
                  <span className="text-neutral-400 text-[10px] uppercase tracking-wider">Focus Préfrontal</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="text-[#00E599] font-bold text-lg block">5 / Jour</span>
                  <span className="text-neutral-400 text-[10px] uppercase tracking-wider">Resets Solaire</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          3. LES 3 PILIERS D'INGÉNIERIE (AYOCIN SCREENSHOT 170 STYLE A / B / C)
          - Cartes architecturales distinctes avec indices de lettres A, B, C
          - Équilibre parfait entre photographies de cabinet et typographie noble
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#08090A] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* En-tête de section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E599] block mb-3">
                03 // LES FONDATIONS DU PROTOCOLE
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-[-0.03em] text-white max-w-2xl leading-[1.06]">
                Trois piliers pour réordonner votre existence.
              </h2>
            </div>
            <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-md leading-relaxed">
              Une méthode rigoureuse conciliant neurosciences cognitives, biomécanique vertébrale et exégèse coranique pour passer de la réactivité passive à la souveraineté active.
            </p>
          </div>

          {/* Cartes A, B, C style Ayocin */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CARTE A */}
            <div className="group rounded-3xl bg-[#121316] border border-white/10 overflow-hidden hover:border-[#00E599]/40 transition-all duration-500 flex flex-col justify-between shadow-xl">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/instagram/photo_executive_still_life.jpg"
                  alt="Étude approfondie et traités d'ingénierie"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />
                <span className="absolute top-6 left-6 font-heading font-bold text-3xl text-white/90 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  A
                </span>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-bold">
                    BIOMÉCANIQUE DU CORPS
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white group-hover:text-[#00E599] transition-colors">
                    Neurobiologie du Sujûd
                  </h3>
                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    L&apos;inversion vertébrale irrigue le cortex préfrontal tout en stimulant le nerf vague pour faire chuter immédiatement le rythme cardiaque. Le corps quitte le réflexe de panique pour la clarté.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>EFFET PHYSIOLOGIQUE</span>
                  <span className="text-[#00E599] font-bold">+40% Perfusion Sanguine</span>
                </div>
              </div>
            </div>

            {/* CARTE B */}
            <div className="group rounded-3xl bg-[#121316] border border-white/10 overflow-hidden hover:border-[#00E599]/40 transition-all duration-500 flex flex-col justify-between shadow-xl">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/instagram/photo_executive_focus.jpg"
                  alt="Architecture temporelle face à la cité"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />
                <span className="absolute top-6 left-6 font-heading font-bold text-3xl text-white/90 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  B
                </span>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-bold">
                    CADENCE CIRCADIENNE
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white group-hover:text-[#00E599] transition-colors">
                    Architecture Temporelle
                  </h3>
                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    Les cinq prières agissent comme des verrous temporels calibrés sur la trajectoire solaire. Elles fragmentent le travail en cycles ultra-focalisés et empêchent l&apos;installation de la procrastination.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>CADENCE SOLAIRE</span>
                  <span className="text-[#00E599] font-bold">5 Cycles Circadiens / Jour</span>
                </div>
              </div>
            </div>

            {/* CARTE C */}
            <div className="group rounded-3xl bg-[#121316] border border-white/10 overflow-hidden hover:border-[#00E599]/40 transition-all duration-500 flex flex-col justify-between shadow-xl">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/instagram/photo_sanctuary_dawn_editorial.jpg"
                  alt="Clarté spirituelle et noblesse architecturale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />
                <span className="absolute top-6 left-6 font-heading font-bold text-3xl text-white/90 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  C
                </span>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-bold">
                    MANDAT TRANSCENDANT
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white group-hover:text-[#00E599] transition-colors">
                    Souveraineté & Khalifa
                  </h3>
                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    L&apos;alignement intérieur dissout les peurs artificielles du siècle. Votre esprit s&apos;affranchit du regard d&apos;autrui et dirige son énergie vers la construction d&apos;une œuvre durable et féconde.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>DISCERNEMENT MORAL</span>
                  <span className="text-[#00E599] font-bold">100% Alignement</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. LA SUITE DE PROTOCOLES INTERACTIVE (AYOCIN ATMOS SHOWCASE)
          - Sélecteur d'offres / protocoles épuré avec transitions fluides
          - Zéro gadget 3D, typographie noble, clarté absolue
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#0B0D11] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E599] block mb-3">
              04 // LA SUITE OPÉRATIONNELLE
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-[-0.03em]">
              Choisissez votre niveau d&apos;engagement.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              Trois démarches distinctes selon votre stade de progression, de l&apos;audit instantané au compagnonnage individuel intensif.
            </p>
          </div>

          {/* Onglets sélecteurs de protocole style Ayocin */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            {PROTOCOLS_DATA.map((item) => {
              const isSelected = activeTabId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTabId(item.id)}
                  className={`px-6 sm:px-8 py-3.5 rounded-full font-heading text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? "bg-[#00E599] text-black font-semibold shadow-[0_0_25px_rgba(0,229,153,0.35)] scale-105"
                      : "bg-[#181A20] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isSelected ? "text-black/70" : "text-neutral-500"}`}>
                    {item.number}.
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Contenu dynamique du protocole sélectionné */}
          <div className="relative p-8 sm:p-14 lg:p-16 rounded-3xl bg-[#121316] border border-white/10 shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                
                {/* Colonne gauche : Description éditoriale */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] font-mono text-[10px] uppercase tracking-widest font-bold">
                    {activeTab.tag}
                  </div>
                  
                  <h3 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                    {activeTab.headline}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {activeTab.description}
                  </p>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-8">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                        {activeTab.metricLabel}
                      </span>
                      <span className="font-heading font-bold text-3xl sm:text-4xl text-[#00E599]">
                        {activeTab.metricValue}
                      </span>
                      <span className="text-xs text-neutral-400 font-sans block mt-1">
                        {activeTab.metricSub}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={activeTab.ctaHref}
                        className={`group inline-flex items-center justify-between gap-4 px-8 py-4 rounded-full font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                          activeTab.ctaVariant === "emerald"
                            ? "bg-[#00E599] text-black shadow-[0_0_30px_rgba(0,229,153,0.35)] hover:shadow-[0_0_45px_rgba(0,229,153,0.6)] hover:scale-[1.02]"
                            : "bg-white text-black hover:bg-neutral-200 hover:scale-[1.02]"
                        }`}
                      >
                        <span>{activeTab.ctaText}</span>
                        <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Colonne droite : Visuel photographique noble */}
                <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                  <Image
                    src={activeTab.image}
                    alt={activeTab.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/80 via-transparent to-transparent" />
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. LA GALERIE DES SANCTUAIRES (AYOCIN SCREENSHOT 200)
          - Trio d'espaces architecturaux contemplatifs
          - Lumière naturelle, marbre, silence et horizon
          ════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-16 bg-[#08090A] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E599] block mb-2">
                05 // L&apos;ART DE VIVRE SOUVERAIN
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-[-0.03em]">
                Les Lieux du Recueillement
              </h2>
            </div>
            <p className="font-sans text-neutral-400 text-xs sm:text-sm max-w-sm">
              L&apos;environnement façonne la conscience. Chaque protocole vous apprend à ériger votre propre sanctuaire de clarté.
            </p>
          </div>

          {/* Triptyque d'images style Ayocin Screenshot 200 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/instagram/hero_terminal_dawn.jpg"
                alt="Sanctuaire d'Aube et Béton Brut"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] text-[#00E599] uppercase tracking-widest block mb-1">
                  ESPACE 01
                </span>
                <h4 className="font-heading font-bold text-lg text-white">Le Sanctuaire de l&apos;Aube</h4>
                <p className="text-xs text-neutral-300 font-sans mt-1">Éveil à l&apos;heure du Fajr & silence absolu</p>
              </div>
            </div>

            <div className="group relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/instagram/photo_executive_still_life.jpg"
                alt="Le Cabinet d'Étude & Manuscrits"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] text-[#00E599] uppercase tracking-widest block mb-1">
                  ESPACE 02
                </span>
                <h4 className="font-heading font-bold text-lg text-white">Le Cabinet de Réflexion</h4>
                <p className="text-xs text-neutral-300 font-sans mt-1">Traité, plume & décantation intellectuelle</p>
              </div>
            </div>

            <div className="group relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/instagram/photo_ocean_rahman.jpg"
                alt="L'Horizon Marin Apaisé"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] text-[#00E599] uppercase tracking-widest block mb-1">
                  ESPACE 03
                </span>
                <h4 className="font-heading font-bold text-lg text-white">L&apos;Horizon Infini</h4>
                <p className="text-xs text-neutral-300 font-sans mt-1">Contemplation cosmique & gratitude sincère</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Cabinet BLF • Où la rigueur contemporaine rencontre l&apos;héritage prophétique
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
