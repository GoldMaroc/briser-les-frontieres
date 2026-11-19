"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";
import ContinuousMarquee from "@/components/ui/ContinuousMarquee";

export default function SovereigntyCyberneticHero() {
  // Variables de preuve sociale vérifiables
  const VARIABLE_ACCOMPAGNES = "+1 200 Musulmans accompagnés";
  const VARIABLE_AVIS = "Note 4,9/5 sur avis vérifiés";
  const VARIABLE_METHODE = "Méthode C.O.M.E.S. • Livres & Accompagnement";

  // Posture active pour l'interaction dynamique 3D (Style KÖM)
  const [activePosture, setActivePosture] = useState<number>(0);

  const posturesData = [
    {
      id: 0,
      code: "01. QIYÂM",
      title: "L'Alignement Rachidien",
      metric: "+35% FOCUS",
      metricLabel: "Activation préfrontale",
      desc: "Verticalité stricte, ancrage proprioceptif et rupture chirurgicale avec l'agitation du monde. Le cortex préfrontal inhibe les stimuli périphériques.",
      effect: "Rétablissement immédiat de la vigilance et de l'autorité",
      action: "Inhibition du Nafs",
    },
    {
      id: 1,
      code: "02. RUKÛ'",
      title: "L'Inclinaison & Rupture d'Ego",
      metric: "BASCULE VAGALE",
      metricLabel: "Activation parasympathique",
      desc: "Décompression active des disques lombaires et soumission physique délibérée. Le système nerveux bascule vers l'apaisement viscéral.",
      effect: "Chute de la tension artérielle et du rythme cardiaque",
      action: "Neutralisation de l'arrogance",
    },
    {
      id: 2,
      code: "03. SUJÛD",
      title: "Le Sommet Neurocognitif",
      metric: "-40% CORTISOL",
      metricLabel: "En 90 secondes",
      desc: "L'unique station où le cœur surplombe le lobe frontal. Afflux sanguin cérébral, décharge allostatique et anéantissement des ruminations mentales.",
      effect: "Clarté décisionnelle absolue et sérénité inébranlable",
      action: "Annihilation de l'inertie",
    },
    {
      id: 3,
      code: "04. TASHAHHUD",
      title: "L'Ancrage & Souveraineté",
      metric: "INTÉGRATION",
      metricLabel: "Homéostasie décisionnelle",
      desc: "Post-assise stable, engagement solennel et clarté d'intention. La séance se conclut par la projection sereine vers l'action du monde.",
      effect: "Retour au monde réel en Khalifa souverain",
      action: "Commandement de son destin",
    },
  ];

  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#141210]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO PRINCIPAL (HAUTE JOAILLERIE & DYNAMISME KÖM)
          - Entrée typographique dynamique avec masquage par mot/ligne
          - Portrait de Mounir en Qiyâm intégré de manière fluide (sans boîte rigide)
          - Dual CTA à physique magnétique (hover lift + magnetic glow)
          - Curseur interactif contextualisé
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#FAF8F5] border-b border-[#E8E0D2] overflow-hidden min-h-[90vh] flex items-center">
        
        {/* VISUEL AMBIANT FLUIDE SANS AUCUN CADRE (FONDU ORGANIQUE) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none select-none z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/sanctuaire/muslim_qiyam_focus.jpg"
              alt="Mounir Byar - Alignement et verticalité dans la prière"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center lg:object-right opacity-25 lg:opacity-35 mix-blend-multiply transition-transform duration-1000 ease-out"
            />
            {/* Dégradés radiaux et latéraux pour une intégration 100% organique */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,transparent_20%,#FAF8F5_85%)]" />
          </div>
        </div>

        {/* CONTENU ÉDITORIAL DU HERO AVEC EFFETS KÖM */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
          <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
            
            {/* Double eyebrow statutaire avec animation d'entrée */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 mb-5 sm:mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
                <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em]">
                  CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#7A6F64] hidden sm:inline">
                PARIS // REIMS • PAR MOUNIR BYAR
              </span>
            </motion.div>

            {/* Titre monumental avec effet de révélation masquée (Style KÖM) */}
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ textWrap: "balance" }}
                className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.65rem] text-[#141210] tracking-[-0.03em] leading-[1.10]"
              >
                Reprenez le contrôle de votre vie.
                <span className="block mt-2 font-serif italic font-normal text-[#B88E3E] text-2xl sm:text-4xl lg:text-[3.15rem] leading-[1.15]">
                  La Salât comme arme de souveraineté.
                </span>
              </motion.h1>
            </div>

            {/* Sous-titre avec transition fluide */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-[#403B35] font-sans leading-[1.65] max-w-xl sm:max-w-2xl font-normal"
            >
              La prière n&apos;est pas une corvée répétitive. C&apos;est le protocole neurobiologique suprême révélé à l&apos;humanité pour dompter le cortisol, briser la procrastination et commander son existence avec une clarté inaltérable.
            </motion.p>

            {/* Trio d'Actions à Physique Magnétique (KÖM CTA Interaction) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <Link
                href="/audit"
                data-cursor="pointer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-full bg-[#087B53] hover:bg-[#066343] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(8,123,83,0.3)] hover:shadow-[0_8px_30px_rgba(8,123,83,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Faire l&apos;audit gratuit (3 min)</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>

              <a
                href="#agenda"
                data-cursor="book"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-full bg-white hover:bg-[#F5EFEB] border border-[#B88E3E]/50 hover:border-[#B88E3E] text-[#141210] font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Prendre un rendez-vous</span>
                <span className="text-sm transition-transform duration-300 group-hover:scale-110">📅</span>
              </a>

              <Link
                href="/prix"
                data-cursor="pointer"
                className="group inline-flex items-center justify-center gap-1.5 px-4 py-4 text-xs font-mono font-bold text-[#8C6214] hover:text-[#5C3F08] transition-colors underline underline-offset-4 text-center sm:text-left"
              >
                <span>Consulter les prix & formats</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            {/* Preuve sociale intégrée et vérifiable */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-8 pt-6 border-t border-[#E8E0D2] w-full flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-[#5C534A]"
            >
              <div className="inline-flex items-center gap-1.5">
                <span className="text-[#087B53] font-bold">✓</span>
                <span className="font-semibold">{VARIABLE_ACCOMPAGNES}</span>
              </div>

              <Link href="/#temoignages" className="inline-flex items-center gap-1.5 hover:text-[#8C6214] transition-colors group">
                <span className="text-[#B88E3E]">★★★★★</span>
                <span className="group-hover:underline underline-offset-2">{VARIABLE_AVIS}</span>
              </Link>

              <div className="inline-flex items-center gap-1.5">
                <span className="text-[#B88E3E]">✦</span>
                <span>Fondé sur 10 ans de recherche</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MARQUEE CONTINU (SIGNATURE KÖM EN VELOCITÉ CONSTANTE)
          ═══════════════════════════════════════════════════════════════ */}
      <ContinuousMarquee speed={32} />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LES AXIOMES THÉORIQUES & LA DÉGRADATION DU CAPITAL MENTAL
          - Avec barres de progression animées au scroll trigger
          ═══════════════════════════════════════════════════════════════ */}
      <section id="methode" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-16">
          
          {/* En-tête des axiomes */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/20 text-[#8C6214] font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              • LES AXIOMES THÉORIQUES •
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#141210] tracking-tight">
              L&apos;Ingénierie de la Souveraineté
            </h2>
            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-relaxed">
              Une science comportementale rigoureuse à l&apos;intersection de la révélation divine et des neurosciences cognitives modernes. Rien n&apos;est laissé au hasard.
            </p>
          </div>

          {/* Grille : Science cognitive + Métriques de perte d'efficacité */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Colonne gauche (7 cols) : Dégradation du capital mental */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#8C6214] block">
                SCIENCE COGNITIVE APPLIQUÉE
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#141210] leading-snug">
                La Dégradation Silencieuse du Capital Mental
              </h3>
              <p className="text-sm sm:text-base text-[#403B35] leading-relaxed font-sans">
                Chaque individu dispose d&apos;une <strong>énergie mentale limitée</strong>. Sous l&apos;effet de la désorganisation quotidienne — micro-décisions inutiles, chaos domestique, distractions numériques et notifications — le cerveau accumule une charge mentale invisible.
              </p>
              <p className="text-sm sm:text-base text-[#403B35] leading-relaxed font-sans">
                Cette surcharge fatigue l&apos;esprit, entraînant une vulnérabilité aux mauvaises impulsions (le <em>Nafs</em>) et une incapacité à maintenir la maîtrise de soi. Le résultat est une détérioration de la présence d&apos;esprit lors de la prière (Salât) et une perte de sens au quotidien.
              </p>
              <div className="pt-2">
                <Link
                  href="/fondements"
                  data-cursor="pointer"
                  className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#087B53] hover:text-[#066343] transition-colors"
                >
                  <span>Lire l&apos;exégèse cognitive complète</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* Colonne droite (5 cols) : Carte Métriques animées */}
            <div 
              data-cursor="view"
              data-cursor-text="ÉTUDES ✦"
              className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-6 hover:shadow-md hover:border-[#B88E3E]/50 transition-all duration-300"
            >
              <div className="border-b border-[#E8E0D2] pb-3">
                <h4 className="font-heading font-bold text-base sm:text-lg text-[#8C6214]">
                  Métriques de Perte d&apos;Efficacité
                </h4>
                <p className="text-[11px] text-[#7A6F64] font-sans">
                  Impact moyen constaté avant l&apos;application du protocole
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[#141210] font-semibold mb-1.5">
                    <span>BANDE PASSANTE SATURÉE</span>
                    <span className="text-[#8C6214] font-bold">62%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "62%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[#8C6214] rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#141210] font-semibold mb-1.5">
                    <span>VOLONTÉ ACTIVE RÉSIDUELLE (FIN DE JOURNÉE)</span>
                    <span className="text-red-700 font-bold">15%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "15%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      className="h-full bg-red-600 rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#141210] font-semibold mb-1.5">
                    <span>TEMPS DE RÉACTIVITÉ SPIRITUELLE</span>
                    <span className="text-red-700 font-bold uppercase">ALTÉRÉ</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      className="h-full bg-red-500 rounded-full" 
                    />
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#7A6F64] pt-2 border-t border-[#E8E0D2] leading-relaxed">
                Source : Études de neuro-ergonomie et de physiologie comportementale appliquées aux cycles religieux (Cabinet BLF, 2024–2026).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 : L'AGENDA DYNAMIQUE DOCTOLIB (PRISE DE RENDEZ-VOUS)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="agenda" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F5EFEB] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087B53]/10 border border-[#087B53]/25 text-[#087B53] font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              • PRISE DE RENDEZ-VOUS DIRECTE •
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#141210] tracking-tight">
              Réservez Votre Consultation en Ligne
            </h2>
            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-relaxed">
              Choisissez votre modalité (appel téléphonique ou présentiel à Reims / Paris) et sélectionnez un créneau disponible en temps réel dans l&apos;agenda ci-dessous.
            </p>
          </div>

          {/* Intégration du composant Doctolib */}
          <AgendaDoctolib />

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 : LA STRUCTURE DE LA SOUVERAINETÉ (POSTURES INTERACTIVES DYNAMIQUES)
          - Inspiré des sélecteurs interactifs de KÖM
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C6214] block">
              02 // GÉOMÉTRIE SOMATO-SENSORIELLE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#141210] tracking-tight">
              Les 4 Postures de Régulation Neurale
            </h2>
            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-relaxed">
              La biomécanique de la prière n&apos;est pas fortuite. Cliquez sur chaque station pour découvrir ses leviers neuro-comportementaux.
            </p>
          </div>

          {/* Sélecteur dynamique de posture (Interactive Tabs KÖM Style) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {posturesData.map((p, idx) => {
              const isActive = activePosture === idx;
              return (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => setActivePosture(idx)}
                  className={`px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#141210] text-white shadow-md scale-105"
                      : "bg-white text-[#5C534A] border border-[#E8E0D2] hover:border-[#B88E3E] hover:text-[#141210]"
                  }`}
                >
                  <span>{p.code}</span>
                  {isActive && <span className="ml-2 text-[#B88E3E]">●</span>}
                </button>
              );
            })}
          </div>

          {/* Panneau actif avec transition fluide AnimatePresence */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {(() => {
                const p = posturesData[activePosture];
                return (
                  <motion.div
                    key={p.code}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E0D2] shadow-lg flex flex-col md:flex-row gap-8 items-center justify-between"
                  >
                    <div className="space-y-4 max-w-xl">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#8C6214] px-3 py-1 rounded-full bg-[#B88E3E]/10">
                          {p.code}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#087B53] px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                          {p.metric} • {p.metricLabel}
                        </span>
                      </div>
                      
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#141210]">
                        {p.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#403B35] font-sans leading-relaxed">
                        {p.desc}
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row gap-4 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2] flex-1">
                          <span className="text-[#7A6F64] block text-[10px] uppercase">Impact physiologique</span>
                          <span className="font-semibold text-[#141210] mt-0.5 block">{p.effect}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2] flex-1">
                          <span className="text-[#7A6F64] block text-[10px] uppercase">Rôle spirituel</span>
                          <span className="font-semibold text-[#8C6214] mt-0.5 block">{p.action}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center">
                      <span className="font-heading font-black text-6xl text-[#B88E3E]/20 select-none">
                        0{activePosture + 1}
                      </span>
                      <a
                        href="#agenda"
                        data-cursor="book"
                        className="mt-4 px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#066343] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                      >
                        Tester le protocole 📅
                      </a>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Grille des 4 cartes avec micro-interactions au survol */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posturesData.map((p, idx) => (
              <div 
                key={p.code}
                onClick={() => setActivePosture(idx)}
                data-cursor="pointer"
                className={`p-6 rounded-3xl bg-white border shadow-sm space-y-3 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  activePosture === idx
                    ? "border-[#B88E3E] ring-2 ring-[#B88E3E]/20 shadow-md"
                    : "border-[#E8E0D2] hover:border-[#B88E3E]/50"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#8C6214]">{p.code}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B88E3E]/10 text-[#8C6214] font-bold">
                      {p.metric}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#141210]">{p.title}</h4>
                  <p className="text-xs text-[#5C534A] font-sans leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E0D2] text-[11px] font-mono text-[#087B53] font-semibold flex items-center justify-between">
                  <span>En savoir plus</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 : LE PROTOCOLE C.O.M.E.S. (LES 5 PILIERS AVEC HOVER LIFT)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F5EFEB] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C6214] block">
              03 // CADRE MÉTHODOLOGIQUE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#141210] tracking-tight">
              Le Protocole C.O.M.E.S.
            </h2>
            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-relaxed">
              Cinq piliers architecturés pour éliminer définitivement la procrastination spirituelle et faire de vos 5 prières un rempart inébranlable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                letter: "C",
                title: "Cadre",
                desc: "Écologie physique et temporelle. Sanctuarisation de l'espace de prière et neutralisation des stimuli parasites.",
              },
              {
                letter: "O",
                title: "Ordre",
                desc: "Hiérarchie impériale des priorités : la Salât structure l'agenda professionnel, jamais l'inverse.",
              },
              {
                letter: "M",
                title: "Mesure",
                desc: "Diagnostic objectif des points de friction, du temps de présence mentale et du taux de complétion.",
              },
              {
                letter: "E",
                title: "Exécution",
                desc: "Suppression des micro-négociations avec le Nafs. Déclenchement chirurgical sans hésitation.",
              },
              {
                letter: "S",
                title: "Souveraineté",
                desc: "Maîtrise totale de ses impulsions, sortie de l'esclavage algorithmique et assomption du mandat de Khalifa.",
              },
            ].map((pillar) => (
              <div 
                key={pillar.letter}
                data-cursor="view"
                data-cursor-text={pillar.letter}
                className="group p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3 hover:border-[#B88E3E] hover:-translate-y-1.5 transition-all duration-300"
              >
                <span className="font-heading font-black text-3xl text-[#B88E3E] block group-hover:scale-110 transition-transform duration-300 origin-left">
                  {pillar.letter}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#141210]">{pillar.title}</h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 : LES LIVRES & TRAITÉS DE MOUNIR BYAR
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E0D2]">
        <div className="max-w-[1240px] mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E0D2] pb-6">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C6214] block mb-2">
                04 // PUBLICATIONS OFFICIELLES
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#141210]">
                Les Traités Fondateurs
              </h2>
            </div>
            <Link
              href="/livres"
              data-cursor="pointer"
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#087B53] hover:text-[#066343] transition-colors"
            >
              <span>Voir la bibliothèque complète</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Livre 1 */}
            <div 
              data-cursor="view"
              data-cursor-text="LIVRE ↗"
              className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col sm:flex-row gap-6 items-center hover:border-[#B88E3E] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-36 sm:w-44 aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-[#E8E0D2]">
                <Image
                  src="/Couverture-Secrets.png"
                  alt="Livre Les Secrets de la Prière"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 flex-1 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6214] font-bold block">
                  TRAITÉ FONDAMENTAL • 320 PAGES
                </span>
                <h3 className="font-heading font-bold text-xl text-[#141210]">
                  Les Secrets de la Prière (Salât)
                </h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">
                  L&apos;ouvrage de référence révélant les clés physiologiques et exégétiques de chaque posture pour anéantir la procrastination.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-heading font-bold text-base text-[#141210]">Dès 5,90 €</span>
                  <Link
                    href="/livres"
                    className="px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#F5EFEB] border border-[#E8E0D2] text-[#141210] font-heading text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Découvrir l&apos;ouvrage →
                  </Link>
                </div>
              </div>
            </div>

            {/* Livre 2 */}
            <div 
              data-cursor="view"
              data-cursor-text="MANUEL ↗"
              className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col sm:flex-row gap-6 items-center hover:border-[#B88E3E] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-36 sm:w-44 aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-[#E8E0D2] bg-[#F5EFEB] flex items-center justify-center">
                <Image
                  src="/Couverture-Manuel.png"
                  alt="Livre Le Manuel de l'Ingénierie Comportementale"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 flex-1 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6214] font-bold block">
                  MANUEL PRATIQUE • CAHIER D&apos;EXERCICES
                </span>
                <h3 className="font-heading font-bold text-xl text-[#141210]">
                  Manuel d&apos;Ingénierie Comportementale
                </h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">
                  Feuilles de route, protocoles de désensibilisation à la distraction et grilles de suivi quotidien du système dopaminergique.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-heading font-bold text-base text-[#141210]">Dès 9,90 €</span>
                  <Link
                    href="/livres"
                    className="px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#F5EFEB] border border-[#E8E0D2] text-[#141210] font-heading text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Découvrir l&apos;ouvrage →
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 : LE PROTOCOLE 9 MOIS (ACCOMPAGNEMENT D'ÉLITE)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="accompagnement" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F5EFEB] border-b border-[#E8E0D2]">
        <div className="max-w-5xl mx-auto p-8 sm:p-14 lg:p-16 rounded-3xl bg-white border border-[#E8E0D2] shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B88E3E]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C6214] block">
              05 // HAUTE DIRECTION & COMPAGNONNAGE
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#141210] tracking-tight leading-[1.08]">
              Le Protocole 9 Mois : L&apos;Accompagnement Privé
            </h2>

            <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-relaxed max-w-3xl mx-auto">
              Un mentorat sur-mesure réservé aux musulmans exigeants (entrepreneurs, médecins, ingénieurs, cadres) qui veulent instaurer la Salât comme tour de contrôle décisionnelle, assainir leur écosystème mental et assumer pleinement leur mandat de Khalifa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] hover:-translate-y-1 transition-transform">
                <span className="font-mono text-xs text-[#8C6214] font-bold block mb-1">01. AUDIT</span>
                <p className="text-xs text-[#5C534A] font-sans">Diagnostic comportemental approfondi de vos freins et sabotages.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] hover:-translate-y-1 transition-transform">
                <span className="font-mono text-xs text-[#8C6214] font-bold block mb-1">02. COMPAGNONNAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Suivi individuel direct avec Mounir Byar pour chaque prière.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] hover:-translate-y-1 transition-transform">
                <span className="font-mono text-xs text-[#8C6214] font-bold block mb-1">03. ANCRAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Discipline inébranlable et clarté d&apos;esprit pour le restant de vos jours.</p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#agenda"
                data-cursor="book"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#087B53] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-[#066343] hover:scale-105 transition-all"
              >
                Prendre rendez-vous pour candidater 📅
              </a>
              <Link
                href="/prix"
                data-cursor="pointer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#EDE5D8] border border-[#E8E0D2] text-[#141210] font-heading text-xs sm:text-sm uppercase tracking-wider transition-all"
              >
                Voir toute la grille tarifaire (dès 5,90 €) →
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
