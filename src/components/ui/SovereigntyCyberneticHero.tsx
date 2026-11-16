"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BiometricNode {
  id: string;
  category: string;
  title: string;
  metric: string;
  effect: string;
  scientificInsight: string;
  coordinates: { x: number; y: number }; // Percentage for positioning
  color: "emerald" | "gold" | "cyan" | "amber";
}

const biometricNodes: BiometricNode[] = [
  {
    id: "brain",
    category: "01 // NEUROBIOLOGIE & CORTEX",
    title: "Cerveau & Cortex Préfrontal",
    metric: "-27.3% CORTISOL SÉRIQUE",
    effect: "Décharge de la fatigue décisionnelle & onde thêta",
    scientificInsight: "La prosternation (Sujûd) augmente l'irrigation sanguine du cortex préfrontal et force l'extinction du réseau du mode par défaut (DMN), coupant instantanément le bavardage mental et l'anxiété.",
    coordinates: { x: 38, y: 32 },
    color: "emerald"
  },
  {
    id: "energy",
    category: "02 // BIO-ÉNERGÉTIQUE & POLARITÉ",
    title: "Énergie & Système Parasympathique",
    metric: "EARTHING // FLUX VAGAL 100%",
    effect: "Ancrage électrostatique & régulation cardiaque",
    scientificInsight: "Le contact direct des 7 points d'appui avec le sol neutralise les charges électrostatiques accumulées par l'exposition aux rayonnements numériques et active le nerf vague.",
    coordinates: { x: 50, y: 55 },
    color: "cyan"
  },
  {
    id: "prayer",
    category: "03 // SYNCHRONISATION COSMIQUE",
    title: "La Prière (Salât) & Rythmes Circadiens",
    metric: "5 PALIERS ASTRONOMIQUES",
    effect: "Interruption obligatoire de l'entropie quotidienne",
    scientificInsight: "La Salât n'est pas un rituel aléatoire : c'est une horloge de réinitialisation biologique calée sur l'angle solaire, empêchant le système cognitif de s'effondrer sous la surcharge moderne.",
    coordinates: { x: 62, y: 38 },
    color: "gold"
  },
  {
    id: "environment",
    category: "04 // SOUVERAINETÉ COMPORTEMENTALE",
    title: "Éveil & Maîtrise de l'Environnement",
    metric: "STATUT DE KHALÎFA // ZERO GHAFLAH",
    effect: "Immunité contre la dispersion & reprise de contrôle",
    scientificInsight: "Discipline du Nafs : l'Homme cesse d'être le produit passif des algorithmes et des stimuli pour redevenir l'ordonnateur souverain de son attention et de sa destinée.",
    coordinates: { x: 74, y: 65 },
    color: "amber"
  }
];

export default function SovereigntyCyberneticHero() {
  const [activeNode, setActiveNode] = useState<BiometricNode>(biometricNodes[0]);
  const [pulseActive, setPulseActive] = useState(true);

  return (
    <section className="relative min-h-screen bg-[#0A0C0E] text-cream overflow-hidden pt-32 pb-24 border-b border-white/10 selection:bg-emerald/30 selection:text-white">
      
      {/* ═══════════════════════════════════════════════════════════
          ARRIÈRE-PLAN : GRILLE TECHNIQUE (INSPIRÉE DE TERMINAL)
          ═══════════════════════════════════════════════════════════ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,#00E599_0%,transparent_60%)] opacity-[0.08] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════
          COMMAND CAPSULE (NAVBAR FLOTTANTE DE COMMANDE EN TÊTE)
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2.5 rounded-2xl bg-midnight-light/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
          
          {/* Badge Système Temps Réel */}
          <div className="flex items-center gap-3 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-cream/80">
              BLF // SOVEREIGNTY OPERATING SYSTEM
            </span>
          </div>

          {/* Navigation Rapide & Télémétrie */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono uppercase tracking-wider text-cream-muted">
            <span className="text-emerald/90">● SÉCURISÉ</span>
            <span>CYCLES CIRCADIENS: NOMINAL</span>
            <span>CHARGE ALLOSTATIQUE: SURVEILLÉE</span>
          </div>

          {/* Boutons d'Action Clés (Capsules) */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
            <Link
              href="/audit"
              className="flex-1 md:flex-none text-center px-4 py-2 rounded-xl bg-emerald text-midnight font-heading font-semibold text-xs tracking-wider uppercase hover:bg-emerald-light transition-all shadow-lg shadow-emerald/20 hover:scale-[1.02]"
            >
              Audit Prière & Cerveau (3 min)
            </Link>
            <Link
              href="/livres"
              className="flex-1 md:flex-none text-center px-4 py-2 rounded-xl bg-white/5 border border-gold/40 text-gold hover:text-cream hover:bg-gold/10 font-heading font-semibold text-xs tracking-wider uppercase transition-all"
            >
              Les Traités
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TITRE MONUMENTAL D'INGÉNIERIE & PROPOSITION DE VALEUR
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald/30 bg-emerald/5 mb-6"
        >
          <span className="text-emerald font-mono text-[10px] tracking-[0.25em] uppercase font-bold">
            Cabinet BLF // Ingénierie Neuro-Cognitive & Exégèse
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-cream max-w-5xl mx-auto leading-[1.15]"
        >
          L&apos;Ingénierie de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-light via-cream to-gold">Souveraineté</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-cream-muted/90 max-w-3xl mx-auto font-body leading-relaxed"
        >
          La prosternation (Sujûd) n&apos;est pas une soumission passive. C&apos;est la plus haute décharge énergétique et neurobiologique de l&apos;Homme moderne pour maîtriser son environnement et discipliner son Nafs.
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LE SCANNER BIOMÉTRIQUE & HUD INTERACTIF (INSPIRÉ DE TERMINAL)
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <div className="relative rounded-2xl bg-midnight-light/90 border border-white/10 overflow-hidden shadow-2xl shadow-black">
          
          {/* Header du terminal télémétrique */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 text-[11px] font-mono text-cream-muted">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" />
              <span className="text-cream font-bold">HUD // CARTOGRAPHIE DE LA PROSTERNATION (SUJÛD)</span>
            </div>
            <div className="flex items-center gap-4">
              <span>RÉSEAU NEURAL: COHÉRENT</span>
              <span className="text-gold">ENTROPIE: CANALISÉE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Visualisation Centrale Interactive (7 colonnes) */}
            <div className="lg:col-span-7 relative bg-gradient-to-b from-black/60 to-midnight flex items-center justify-center p-6 overflow-hidden min-h-[380px]">
              
              {/* Image Réelle d'Atmosphère Aube & Recueillement */}
              <div 
                className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-luminosity filter contrast-125"
                style={{ backgroundImage: "url('/images/instagram/photo_salat_sanctuary.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent pointer-events-none" />

              {/* Réticule de visée / Wireframe Mesh overlay façon Terminal */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hudGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hudGrid)" />
                {/* Lignes de ciblage */}
                <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(0,229,153,0.2)" strokeDasharray="4 4" />
                <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(212,175,55,0.2)" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="160" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
              </svg>

              {/* Réticules Cliquables sur le Corps / Prosternation */}
              {biometricNodes.map((node) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group p-3 cursor-pointer transition-transform duration-300 ${isSelected ? "scale-125 z-30" : "scale-100 hover:scale-110 z-20"}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${node.color === 'emerald' ? 'bg-emerald' : node.color === 'gold' ? 'bg-gold' : node.color === 'cyan' ? 'bg-cyan-400' : 'bg-amber-400'}`} />
                      <div className={`w-4 h-4 rounded-full border-2 border-midnight flex items-center justify-center shadow-lg ${node.color === 'emerald' ? 'bg-emerald shadow-emerald/50' : node.color === 'gold' ? 'bg-gold shadow-gold/50' : node.color === 'cyan' ? 'bg-cyan-400 shadow-cyan-400/50' : 'bg-amber-400 shadow-amber-400/50'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-midnight" />
                      </div>
                      
                      {/* Étiquette flottante */}
                      <span className={`absolute left-6 whitespace-nowrap px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase border transition-all ${isSelected ? "bg-midnight/90 border-emerald text-emerald" : "bg-black/60 border-white/20 text-cream-muted group-hover:text-cream"}`}>
                        {node.title.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Légende interactive au bas du visuel */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-cream-muted/70 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5">
                <span>CLIQUEZ SUR LES MARQUEURS POUR DÉCODER LES FLUX</span>
                <span className="text-emerald font-bold">RÉPONSE BIOMÉTRIQUE CONFIRMÉE</span>
              </div>
            </div>

            {/* Panneau Latéral d'Ingénierie & Données Scientifiques (5 colonnes) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-surface/50 border-t lg:border-t-0 lg:border-l border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald font-bold block mb-1">
                      {activeNode.category}
                    </span>
                    <h3 className="font-heading text-2xl font-medium text-cream">
                      {activeNode.title}
                    </h3>
                  </div>

                  {/* Badge de Télémétrie */}
                  <div className="p-4 rounded-xl bg-midnight border border-emerald/30 shadow-inner">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-cream-muted block mb-1">
                      MÉTRIQUE PHYSIOLOGIQUE CLÉ
                    </span>
                    <div className="text-lg font-mono font-bold text-emerald tracking-wide">
                      {activeNode.metric}
                    </div>
                    <div className="text-xs text-cream-muted mt-1">
                      {activeNode.effect}
                    </div>
                  </div>

                  {/* Analyse & Exégèse */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">
                      RÉSOLUTION DE L&apos;INGÉNIEUR
                    </span>
                    <p className="text-sm font-body text-cream/90 leading-relaxed">
                      {activeNode.scientificInsight}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bouton de Passage à l'Action Contextuel */}
              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  href="/audit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald/20 to-emerald/10 border border-emerald/50 hover:bg-emerald hover:text-midnight text-cream transition-all duration-300 text-xs font-heading font-semibold uppercase tracking-wider group"
                >
                  <span>Mesurer mon état dans l&apos;Audit Clinique</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BENTO GRID EN 3 COLONNES (01 FAST START STYLE TERMINAL)
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald font-bold block mb-2">
            MÉTHODOLOGIE D&apos;EXÉCUTION
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-cream tracking-tight">
            Restructurez votre vie à votre rythme.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARTE 01 : DIAGNOSTIC RAPIDE */}
          <div className="group rounded-2xl bg-midnight-light/80 border border-white/10 hover:border-emerald/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald block mb-3">
                01 // DIAGNOSTIC INITIAL
              </span>
              <h3 className="font-heading text-xl font-medium text-cream mb-3 group-hover:text-emerald-light transition-colors">
                L&apos;Audit de Souveraineté
              </h3>
              <p className="text-cream-muted text-xs sm:text-sm font-body leading-relaxed mb-6">
                Cartographiez votre niveau de fatigue décisionnelle, votre résistance à l&apos;entropie et la régularité de votre Salât en 3 minutes confidentielles.
              </p>
            </div>
            <div>
              <Link
                href="/audit"
                className="inline-flex items-center text-xs font-heading font-semibold uppercase tracking-wider text-emerald hover:text-emerald-light"
              >
                <span>Passer l&apos;Audit Gratuit</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* CARTE 02 : LES TRAITÉS DE L'INGÉNIEUR */}
          <div className="group rounded-2xl bg-midnight-light/80 border border-white/10 hover:border-gold/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-gold block mb-3">
                02 // LES TRAITÉS DE L&apos;INGÉNIEUR
              </span>
              <h3 className="font-heading text-xl font-medium text-cream mb-3 group-hover:text-gold-light transition-colors">
                Les 3 Livres Majeurs
              </h3>
              <p className="text-cream-muted text-xs sm:text-sm font-body leading-relaxed mb-6">
                Reconstruisez vos fondations intellectuelles et exégétiques avec *Adam, Père de l&apos;Humanité*, *Les Secrets du Retour vers Allah* et *Ar-Rahman*.
              </p>
            </div>
            <div>
              <Link
                href="/livres"
                className="inline-flex items-center text-xs font-heading font-semibold uppercase tracking-wider text-gold hover:text-gold-light"
              >
                <span>Découvrir le Catalogue</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* CARTE 03 : L'INTERPOSITION PRIVÉE */}
          <div className="group rounded-2xl bg-midnight-light/80 border border-white/10 hover:border-white/30 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-cream/70 block mb-3">
                03 // INTERPOSITION EXÉCUTIVE
              </span>
              <h3 className="font-heading text-xl font-medium text-cream mb-3 group-hover:text-cream transition-colors">
                Mentorat & Protocole C.O.M.E.S.
              </h3>
              <p className="text-cream-muted text-xs sm:text-sm font-body leading-relaxed mb-6">
                Pour les dirigeants et croyants exigeants : 1, 3 ou 9 mois d&apos;immersion privée pour verrouiller votre discipline et décupler votre impact.
              </p>
            </div>
            <div>
              <Link
                href="/candidature"
                className="inline-flex items-center text-xs font-heading font-semibold uppercase tracking-wider text-cream/90 hover:text-white"
              >
                <span>Déposer un Dossier</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
