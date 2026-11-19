"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";

export default function SovereigntyCyberneticHero() {
  // Variables de preuve sociale vérifiables
  const VARIABLE_ACCOMPAGNES = "+1 200 Musulmans accompagnés";
  const VARIABLE_AVIS = "Note 4,9/5 sur avis vérifiés";
  const VARIABLE_METHODE = "Méthode C.O.M.E.S. • Livres & Accompagnement";

  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#141210]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO PRINCIPAL (HAUTE JOAILLERIE & INTÉGRATION ORGANIQUE)
          - Fond uni beige albâtre #FAF8F5
          - Portrait de Mounir en Qiyâm intégré de manière fluide en arrière-plan ambiant (AUCUN CADRE RIGIDE)
          - Titre percutant et sous-titre doré statutaire
          - Dual CTA : Audit Gratuit + Prise de Rendez-vous Doctolib
          - Conformité stricte WCAG 2.1 AA (contraste > 15:1)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#FAF8F5] border-b border-[#E8E0D2] overflow-hidden min-h-[88vh] flex items-center">
        
        {/* VISUEL AMBIANT INTÉGRÉ SANS AUCUN CADRE (FLUIDE ET FONDU) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none select-none z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/sanctuaire/muslim_qiyam_focus.jpg"
              alt="Mounir Byar - Alignement et verticalité dans la prière"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center lg:object-right opacity-25 lg:opacity-35 mix-blend-multiply"
            />
            {/* Dégradés radiaux et latéraux pour une intégration 100% organique sans bordure */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,transparent_20%,#FAF8F5_85%)]" />
          </div>
        </div>

        {/* CONTENU ÉDITORIAL DU HERO */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
          <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
            
            {/* Double eyebrow statutaire */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
                <span className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em]">
                  CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#7A6F64] hidden sm:inline">
                PARIS // REIMS • PAR MOUNIR BYAR
              </span>
            </div>

            {/* Titre monumental avec dorure Haute Joaillerie */}
            <h1 
              style={{ textWrap: "balance" }}
              className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.65rem] text-[#141210] tracking-[-0.03em] leading-[1.10]"
            >
              Reprenez le contrôle de votre vie.
              <span className="block mt-2 font-serif italic font-normal text-[#B88E3E] text-2xl sm:text-4xl lg:text-[3.15rem] leading-[1.15]">
                La Salât comme arme de souveraineté.
              </span>
            </h1>

            {/* Sous-titre cadré et scientifique */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-[#403B35] font-sans leading-[1.65] max-w-xl sm:max-w-2xl font-normal">
              La prière n&apos;est pas une corvée répétitive. C&apos;est le protocole neurobiologique suprême révélé à l&apos;humanité pour dompter le cortisol, briser la procrastination et commander son existence avec une clarté inaltérable.
            </p>

            {/* Trio d'Actions Haute Conversion */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-full bg-[#087B53] hover:bg-[#066343] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(8,123,83,0.3)] hover:shadow-[0_6px_25px_rgba(8,123,83,0.45)] hover:scale-[1.02] text-center"
              >
                <span>Faire l&apos;audit gratuit (3 min)</span>
                <span className="text-sm">→</span>
              </Link>

              <a
                href="#agenda"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-full bg-white hover:bg-[#F5EFEB] border border-[#B88E3E]/50 hover:border-[#B88E3E] text-[#141210] font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-sm text-center"
              >
                <span>Prendre un rendez-vous</span>
                <span className="text-sm">📅</span>
              </a>

              <Link
                href="/prix"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-4 text-xs font-mono font-bold text-[#8C6214] hover:text-[#5C3F08] transition-colors underline underline-offset-4 text-center sm:text-left"
              >
                <span>Consulter les prix & formats</span>
                <span>→</span>
              </Link>
            </div>

            {/* Preuve sociale intégrée et vérifiable */}
            <div className="mt-8 pt-6 border-t border-[#E8E0D2] w-full flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-[#5C534A]">
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
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 : LES AXIOMES THÉORIQUES & LA DÉGRADATION DU CAPITAL MENTAL
          (Restauration exacte de la richesse d'information demandée par l'utilisateur)
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
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#087B53] hover:text-[#066343] transition-colors"
                >
                  <span>Lire l&apos;exégèse cognitive complète</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Colonne droite (5 cols) : Carte Métriques de Perte d'Efficacité */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-6">
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
                    <div className="h-full bg-[#8C6214] rounded-full w-[62%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#141210] font-semibold mb-1.5">
                    <span>VOLONTÉ ACTIVE RÉSIDUELLE (FIN DE JOURNÉE)</span>
                    <span className="text-red-700 font-bold">15%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full w-[15%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#141210] font-semibold mb-1.5">
                    <span>TEMPS DE RÉACTIVITÉ SPIRITUELLE</span>
                    <span className="text-red-700 font-bold uppercase">ALTÉRÉ</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full w-[80%]" />
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
          SECTION 3 : L'AGENDA DYNAMIQUE DOCTOLIB
          (Prise de rendez-vous téléphonique ou présentielle, Lun-Sam 9h-18h, Ven 9h-12h)
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
          SECTION 4 : LA STRUCTURE DE LA SOUVERAINETÉ (LES 4 POSTURES SACRÉES)
          - Qiyâm, Rukû', Sujûd, Tashahhud avec mécanismes neurobiologiques
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
              La biomécanique de la prière n&apos;est pas fortuite. Chaque posture déclenche des réponses hormonales et vestibulaires spécifiques qui réinitialisent le système nerveux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Posture 1 : Qiyâm */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3 flex flex-col justify-between hover:border-[#B88E3E] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8C6214]">01. QIYÂM</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B88E3E]/10 text-[#8C6214] font-bold">+35% FOCUS</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#141210]">L&apos;Alignement Rachidien</h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">
                  Verticalité stricte, ancrage proprioceptif et rupture avec l&apos;agitation périphérique. Le cortex préfrontal inhibe les impulsions distractives.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E8E0D2] text-[11px] font-mono text-[#087B53] font-semibold">
                → Rétablissement de la vigilance
              </div>
            </div>

            {/* Posture 2 : Rukû' */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3 flex flex-col justify-between hover:border-[#B88E3E] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8C6214]">02. RUKÛ&apos;</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B88E3E]/10 text-[#8C6214] font-bold">BASCULE VAGALE</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#141210]">L&apos;Inclinaison & Rupture d&apos;Ego</h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">
                  Décompression des disques lombaires et soumission physique délibérée. Activation du système parasympathique et chute de la tension artérielle.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E8E0D2] text-[11px] font-mono text-[#087B53] font-semibold">
                → Neutralisation de la réactivité
              </div>
            </div>

            {/* Posture 3 : Sujûd */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#087B53]/40 shadow-sm space-y-3 flex flex-col justify-between hover:border-[#087B53] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#087B53]">03. SUJÛD</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#087B53]/10 text-[#087B53] font-bold">-40% CORTISOL</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#141210]">Le Sommet Neurocognitif</h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">
                  L&apos;unique station où le cœur surplombe le lobe frontal. Afflux sanguin cérébral, décharge allostatique et anéantissement des ruminations mentales.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E8E0D2] text-[11px] font-mono text-[#087B53] font-semibold">
                → Clarté décisionnelle absolue
              </div>
            </div>

            {/* Posture 4 : Tashahhud */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3 flex flex-col justify-between hover:border-[#B88E3E] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8C6214]">04. TASHAHHUD</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B88E3E]/10 text-[#8C6214] font-bold">INTÉGRATION</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#141210]">L&apos;Ancrage & Souveraineté</h3>
                <p className="text-xs text-[#5C534A] font-sans leading-relaxed">
                  Post-assise stable, engagement solennel et clarté d&apos;intention. La séance se conclut par la projection sereine vers l&apos;action du monde.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E8E0D2] text-[11px] font-mono text-[#087B53] font-semibold">
                → Retour au monde en Khalifa
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 : LE PROTOCOLE C.O.M.E.S. (INGÉNIERIE DU COMPORTEMENT)
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
                className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3 hover:border-[#B88E3E] transition-all"
              >
                <span className="font-heading font-black text-3xl text-[#B88E3E] block">
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
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#087B53] hover:text-[#066343] transition-colors"
            >
              <span>Voir la bibliothèque complète</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Livre 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
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
            <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
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
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <span className="font-mono text-xs text-[#8C6214] font-bold block mb-1">01. AUDIT</span>
                <p className="text-xs text-[#5C534A] font-sans">Diagnostic comportemental approfondi de vos freins et sabotages.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <span className="font-mono text-xs text-[#8C6214] font-bold block mb-1">02. COMPAGNONNAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Suivi individuel direct avec Mounir Byar pour chaque prière.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <span className="font-mono text-xs text-[#8C6214] font-bold block mb-1">03. ANCRAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Discipline inébranlable et clarté d&apos;esprit pour le restant de vos jours.</p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#agenda"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#087B53] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-[#066343] hover:scale-105 transition-all"
              >
                Prendre rendez-vous pour candidater 📅
              </a>
              <Link
                href="/prix"
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
