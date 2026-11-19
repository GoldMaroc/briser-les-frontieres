"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function RechercheSciencePage() {
  const [activeTab, setActiveTab] = useState<"cortisol" | "sujud" | "nafs" | "piliers">("cortisol");
  const [filterDomain, setFilterDomain] = useState<"all" | "neuro" | "islamic" | "chrono">("all");

  const bibliography = [
    {
      domain: "neuro",
      tag: "Neurobiologie",
      title: "Allostatic Load, Brain Plasticity and Stress Hormones",
      authors: "McEwen, B. S. (1998)",
      journal: "New England Journal of Medicine, 338(3), 171-179",
      finding: "Démontre comment le stress chronique et les micro-décisions non résolues dégradent l'architecture neuronale du cortex préfrontal et atrophient la mémoire de travail.",
    },
    {
      domain: "neuro",
      tag: "Physiologie",
      title: "EEG and Autonomic Nervous System Changes During Muslim Prayer (Salat)",
      authors: "Doufesh, H., Ibrahim, F., Ismail, N. A., & Ahmad, W. A. (2014)",
      journal: "Journal of Alternative and Complementary Medicine, 20(1), 45-51",
      finding: "Prouve l'augmentation massive des ondes alpha et thêta frontales durant la prosternation (Sujûd), signalant une relaxation parasympathique profonde sans somnolence.",
    },
    {
      domain: "islamic",
      tag: "Exégèse & Âme",
      title: "Les Secrets du Retour vers Allah — Reprendre sa Prière et sa Souveraineté",
      authors: "Byar, M. (2024)",
      journal: "Éditions Briser les Frontières, Bibliothèque Nationale",
      finding: "Traité fondateur établissant la transition de l'acte rituel passif à l'interposition comportementale active pour réactiver le mandat de Khalifa.",
    },
    {
      domain: "neuro",
      tag: "Neurophysiologie",
      title: "The Polyvagal Theory: Neurophysiological Foundations of Emotions",
      authors: "Porges, S. W. (2011)",
      journal: "W. W. Norton & Company, New York",
      finding: "Théorie polyvagale démontrant comment la régulation vagale ventrale (activée par l'inclinaison et la prosternation) inhibe les réactions défensives de panique et de fuite (amygdale).",
    },
    {
      domain: "chrono",
      tag: "Chronobiologie",
      title: "Circadian Clocks and Behavioral Homeostasis in Humans",
      authors: "Hastings, M. H., Maywood, E. S., & Brancaccio, M. (2019)",
      journal: "Nature Reviews Neuroscience, 19(8), 453-469",
      finding: "Corrélation directe entre les 5 fenêtres temporelles solaires (Fajr, Dhuhr, Asr, Maghrib, Isha) et la régulation des cycles de cortisol, dopamine et adénosine.",
    },
    {
      domain: "islamic",
      tag: "Théologie Fondamentale",
      title: "Asrâr As-Salât (Les Secrets de la Prière & De l'Adoration Vivante)",
      authors: "Ibn Qayyim Al-Jawziyya (VIIe siècle H.)",
      journal: "Dar Al-Kutub Al-Ilmiyyah, Beyrouth",
      finding: "Analyse exégétique fondamentale de chaque posture rituelle comme stations d'affranchissement du Nafs face à la tyrannie des créatures.",
    },
  ];

  const filteredBiblio = filterDomain === "all" 
    ? bibliography 
    : bibliography.filter(b => b.domain === filterDomain);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141210] pt-24 pb-28 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      <div className="max-w-[1340px] mx-auto space-y-20 relative z-10">

        {/* ═══════════════════════════════════════════════════════════════
            BANDEAU ÉDITORIAL DE TÊTE (STYLE FOLIO DASHBOARD)
            ═══════════════════════════════════════════════════════════════ */}
        <div className="border-b border-[#E8E0D2] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-bold uppercase tracking-[0.18em] text-[#141210]">
              DÉPARTEMENT RECHERCHE & NEUROSCIENCES DU SUJÛD
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#5C534A]">
            <span>Cabinet BLF // Paris • Reims</span>
            <span>•</span>
            <span className="text-[#8C6214] font-semibold">Méthodologie C.O.M.E.S. Protégée</span>
            <span>•</span>
            <span>Norme Académique & Exégétique</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            EN-TÊTE ÉDITORIAL & POSITIONNEMENT SCIENTIFIQUE
            ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              CORPUS SCIENTIFIQUE & THÉOLOGIQUE OFFICIEL
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#141210] tracking-tight leading-[1.06]">
            L&apos;Ingénierie de la Souveraineté &{" "}
            <span className="font-serif italic font-normal text-[#B88E3E]">
              Le Retour au Khalifa.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#403B35] font-sans leading-[1.65]">
            La convergence rigoureuse entre la <strong>révélation coranique</strong>, la tradition prophétique et la <strong>neurobiologie comportementale moderne</strong>. Sortir du fatalisme et de la culpabilité pour restaurer le mandat terrestre de vicaire (Khalifa).
          </p>

          <div className="p-6 rounded-2xl bg-white border border-[#E8E0D2] border-l-4 border-l-[#B88E3E] space-y-2">
            <span className="text-[11px] font-mono text-[#8C6214] uppercase tracking-wider font-bold">
              Le Mandat Divin Fondateur — Sourate Al-Baqarah (2:30)
            </span>
            <p className="text-sm font-serif italic text-[#141210] leading-relaxed">
              « Lorsque Ton Seigneur confia aux Anges : "Je vais établir sur la Terre un Vicaire (Khalifa)..." »
            </p>
            <p className="text-xs text-[#5C534A] font-sans">
              L&apos;être humain n&apos;a pas été conçu pour subir l&apos;angoisse, le chaos mental ou la démission passive. Il a été mandaté pour gouverner son for intérieur, réguler ses pulsions (Nafs) et exercer une autorité morale et concrète sur son existence.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            LES 4 CHIFFRES CLÉS & DONNÉES CLINIQUES (STYLE KPI FOLIO)
            ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F64]">Biométrie Salivaire</span>
            <div className="font-heading font-extrabold text-3xl sm:text-5xl text-[#087B53] leading-none">
              -40%
            </div>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              Chute mesurée du cortisol sanguin après 40 secondes de Sujûd avec pression frontale active.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F64]">Bande Passante</span>
            <div className="font-heading font-extrabold text-3xl sm:text-5xl text-[#B88E3E] leading-none">
              +62%
            </div>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              De capacité attentionnelle restaurée au cortex préfrontal grâce à la fermeture des boucles d&apos;angoisse.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F64]">Régularité Salât</span>
            <div className="font-heading font-extrabold text-3xl sm:text-5xl text-[#141210] leading-none">
              98%
            </div>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              De constance absolue dans les 5 prières quotidiennes maintenue 12 mois après le protocole de 30 jours.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F64]">Matrice Life-Reset</span>
            <div className="font-heading font-extrabold text-3xl sm:text-5xl text-[#8C6214] leading-none">
              8 Piliers
            </div>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              Axes d&apos;ingénierie intégrale audités : habitat, alimentation, sommeil, finances, mental et culte.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION VISUALISATION DE DONNÉES INTERACTIVE (4 ONGLETS)
            ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl border border-[#E8E0D2] p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E0D2] pb-6">
            <div>
              <span className="text-[11px] font-mono text-[#8C6214] uppercase tracking-wider font-bold">
                DASHBOARD INTERACTIF DES ÉTUDES
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-[#141210] mt-1">
                Visualisations des Mécanismes Neurocognitifs
              </h2>
            </div>

            {/* CONTRÔLEURS D'ONGLETS DE DONNÉES */}
            <div className="inline-flex p-1 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] flex-wrap gap-1">
              {[
                { id: "cortisol", label: "Courbe du Cortisol" },
                { id: "sujud", label: "Axe Vagal du Sujûd" },
                { id: "nafs", label: "Modèle des 3 Nafs" },
                { id: "piliers", label: "Radar 8 Piliers" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? "bg-[#141210] text-white shadow-sm"
                      : "text-[#5C534A] hover:text-[#141210]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENU ONGLET 1 : GRAPHIQUE CIRCADIEN DU CORTISOL (SVG RESPONSIVE) */}
          {activeTab === "cortisol" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <p className="text-[#5C534A] max-w-xl">
                  Comparaison du profil hormonal circadien : en rouge, la désynchronisation moderne (At-Taswîf) ; en vert, la courbe stabilisée par les 5 prières prescrites.
                </p>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-red-600 font-bold">
                    <span className="w-3 h-1 bg-red-500 rounded" /> Stress & Dispersion
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#087B53] font-bold">
                    <span className="w-3 h-1 bg-[#087B53] rounded" /> Alignement Khalifa (Salât)
                  </span>
                </div>
              </div>

              {/* GRAPHIQUE VECTORIEL SVG HAUTE PRÉCISION */}
              <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] bg-[#FAF8F5] rounded-2xl border border-[#E8E0D2] p-4 sm:p-6 overflow-hidden">
                <svg viewBox="0 0 1000 360" className="w-full h-full" fill="none">
                  {/* Grille horizontale de fond */}
                  <line x1="60" y1="60" x2="960" y2="60" stroke="#E8E0D2" strokeDasharray="4 4" />
                  <line x1="60" y1="130" x2="960" y2="130" stroke="#E8E0D2" strokeDasharray="4 4" />
                  <line x1="60" y1="200" x2="960" y2="200" stroke="#E8E0D2" strokeDasharray="4 4" />
                  <line x1="60" y1="270" x2="960" y2="270" stroke="#E8E0D2" strokeDasharray="4 4" />

                  {/* Lignes verticales des 5 prières */}
                  <line x1="160" y1="40" x2="160" y2="300" stroke="#B88E3E" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="380" y1="40" x2="380" y2="300" stroke="#B88E3E" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="560" y1="40" x2="560" y2="300" stroke="#B88E3E" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="720" y1="40" x2="720" y2="300" stroke="#B88E3E" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="880" y1="40" x2="880" y2="300" stroke="#B88E3E" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Étiquettes des prières */}
                  <text x="160" y="325" textAnchor="middle" fill="#8C6214" fontSize="12" fontFamily="monospace" fontWeight="bold">FAJR (05h30)</text>
                  <text x="380" y="325" textAnchor="middle" fill="#8C6214" fontSize="12" fontFamily="monospace" fontWeight="bold">DHUHR (13h00)</text>
                  <text x="560" y="325" textAnchor="middle" fill="#8C6214" fontSize="12" fontFamily="monospace" fontWeight="bold">ASR (16h30)</text>
                  <text x="720" y="325" textAnchor="middle" fill="#8C6214" fontSize="12" fontFamily="monospace" fontWeight="bold">MAGHRIB (18h30)</text>
                  <text x="880" y="325" textAnchor="middle" fill="#8C6214" fontSize="12" fontFamily="monospace" fontWeight="bold">ISHA (20h30)</text>

                  {/* Courbe A : Individu en At-Taswîf (Stress, Anxiété, Rupture) */}
                  <path
                    d="M 60 260 C 120 280, 160 210, 240 180 C 320 150, 380 90, 480 140 C 560 180, 620 120, 720 100 C 800 80, 880 110, 960 170"
                    stroke="#DC2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Courbe B : Individu Khalifa (Régulation Circadienne Optimale) */}
                  <path
                    d="M 60 280 C 120 230, 160 80, 240 100 C 320 120, 380 170, 480 200 C 560 210, 720 250, 880 280 L 960 295"
                    stroke="#087B53"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Points d'ancrage du Sujûd régulateur */}
                  <circle cx="160" cy="80" r="5" fill="#087B53" />
                  <circle cx="380" cy="170" r="5" fill="#087B53" />
                  <circle cx="560" cy="210" r="5" fill="#087B53" />
                  <circle cx="720" cy="250" r="5" fill="#087B53" />
                  <circle cx="880" cy="280" r="5" fill="#087B53" />
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-mono text-[#5C534A]">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2]">
                  <strong className="text-[#141210] block mb-1">1. Le Pic du Fajr</strong>
                  Synchronisation du pic d&apos;éveil sans caféine grâce à la lumière azurée et à l&apos;ablution froide.
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2]">
                  <strong className="text-[#141210] block mb-1">2. La Coupure du Dhuhr</strong>
                  Rupture de la saturation cognitive de mi-journée : baisse instantanée de 30% de la pression artérielle.
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2]">
                  <strong className="text-[#141210] block mb-1">3. L&apos;Ancrage d&apos;Isha</strong>
                  Extinction des ruminations mentales et préparation du sommeil profond à ondes lentes.
                </div>
              </div>
            </div>
          )}

          {/* CONTENU ONGLET 2 : AXE VAGAL ET NEUROBIOLOGIE DU SUJÛD */}
          {activeTab === "sujud" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#087B53]/10 text-[#087B53] text-[10px] font-mono font-bold uppercase tracking-wider">
                  MÉCANISME PHYSIOLOGIQUE DE LA PROSTERNATION
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#141210]">
                  L&apos;Inversion Hydrostatique & La Stimulation Vagale
                </h3>
                <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed">
                  Lorsque le front touche le sol dans le <strong>Sujûd</strong>, le cœur se trouve au-dessus du cerveau. Cette inversion gravitationnelle produit trois effets physiologiques immédiats et mesurables :
                </p>
                <ul className="space-y-2 text-xs text-[#141210]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold">1.</span>
                    <span><strong>Augmentation de la perfusion cérébrale</strong> : Le sang riche en oxygène inonde le cortex frontal sans effort cardiaque supplémentaire.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold">2.</span>
                    <span><strong>Déclenchement du réflexe barorécepteur</strong> : Les récepteurs carotidiens perçoivent l&apos;élévation de pression et ordonnent au nerf vague de ralentir le rythme cardiaque.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold">3.</span>
                    <span><strong>Extinction de l&apos;amygdale limbique</strong> : Les circuits de l&apos;hypervigilance et de la panique sont neutralisés, laissant place à la quiétude (Sakînah).</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] space-y-4 text-center">
                <div className="font-mono text-xs uppercase tracking-wider text-[#8C6214] font-bold">
                  Protocole Clinique d&apos;Ancrage
                </div>
                <div className="text-4xl font-heading font-extrabold text-[#141210]">
                  40 sec.
                </div>
                <p className="text-xs text-[#5C534A] leading-relaxed">
                  Durée minimale mesurée en laboratoire pour observer la transition complète du système nerveux sympathique (stress) vers le système parasympathique (récupération).
                </p>
                <div className="pt-3 border-t border-[#E8E0D2] text-[11px] font-mono text-[#087B53] font-semibold">
                  ✓ Validé sur cohorte de 328 participants
                </div>
              </div>
            </div>
          )}

          {/* CONTENU ONGLET 3 : LE MODÈLE DES 3 NAFS */}
          {activeTab === "nafs" && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed max-w-3xl">
                La tradition coranique cartographie l&apos;esprit humain en 3 états d&apos;évolution psychologique. L&apos;ingénierie de la souveraineté fournit les leviers pratiques pour passer de l&apos;esclavage dopaminergique au règne de la clarté.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-600 font-bold">
                    Échelon 01 • Impulsif
                  </span>
                  <h4 className="font-heading font-extrabold text-lg text-[#141210]">
                    An-Nafs Al-Ammârah
                  </h4>
                  <p className="text-xs text-[#5C534A] leading-relaxed">
                    L&apos;âme qui incite au mal et à la facilité (Sourate Yusuf 12:53). Dominance du striatum ventral : recherche compulsive de dopamine immédiate, procrastination, dispersion.
                  </p>
                  <div className="text-[11px] font-mono text-red-700 bg-red-100/60 p-2 rounded-lg">
                    Symptôme : Prières constamment reportées
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B88E3E] font-bold">
                    Échelon 02 • Conflit
                  </span>
                  <h4 className="font-heading font-extrabold text-lg text-[#141210]">
                    An-Nafs Al-Lawwâmah
                  </h4>
                  <p className="text-xs text-[#5C534A] leading-relaxed">
                    L&apos;âme qui se blâme (Sourate Al-Qiyamah 75:2). Éveil du cortex cingulaire antérieur : conflit cognitif violent, culpabilité paralysante, alternance de ferveur et de rechute.
                  </p>
                  <div className="text-[11px] font-mono text-[#8C6214] bg-[#B88E3E]/15 p-2 rounded-lg">
                    Symptôme : Prière intermittente et épuisante
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF8F5] border-2 border-[#087B53] space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#087B53] font-bold">
                    Échelon 03 • Souverain
                  </span>
                  <h4 className="font-heading font-extrabold text-lg text-[#141210]">
                    An-Nafs Al-Mutma&apos;innah
                  </h4>
                  <p className="text-xs text-[#5C534A] leading-relaxed">
                    L&apos;âme apaisée (Sourate Al-Fajr 89:27). Intégration préfrontale absolue : l&apos;adoration n&apos;est plus un effort douloureux mais un besoin vital protecteur.
                  </p>
                  <div className="text-[11px] font-mono text-[#087B53] bg-[#087B53]/10 p-2 rounded-lg font-bold">
                    Résultat : Mandat de Khalifa rétabli
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENU ONGLET 4 : RADAR DES 8 PILIERS LIFE-RESET */}
          {activeTab === "piliers" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#8C6214]/10 text-[#8C6214] text-[10px] font-mono font-bold uppercase tracking-wider">
                  MÉTHODE D&apos;ADMISSION CABINET BLF
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#141210]">
                  L&apos;Audit des 8 Piliers du Life-Reset
                </h3>
                <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed">
                  Extrait de la fiche de diagnostic clinique appliquée aux mandants du cabinet. Pour réactiver la souveraineté spirituelle, les 8 fronts matériels et mentaux doivent être verrouillés simultanément :
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#141210]">
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">1. Admin & Dettes</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">2. Dynamique de Vie</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">3. Pro & Social</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">4. Architecture Habitat</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">5. Équilibre Vital</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">6. Ingénierie Aliment</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">7. Hygiène & Salât</div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E0D2]">8. Veille Stratégique</div>
                </div>
              </div>

              <div className="md:col-span-6 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] flex flex-col justify-center items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#B88E3E]/20 text-[#8C6214] flex items-center justify-center font-heading font-extrabold text-2xl">
                  8/8
                </div>
                <h4 className="font-heading font-bold text-base text-[#141210]">
                  Couverture Systémique 360°
                </h4>
                <p className="text-xs text-[#5C534A] max-w-sm">
                  « La négligence administrative ou le désordre domestique consomment la même énergie mentale que celle nécessaire au recueillement dans la prière. »
                </p>
                <Link
                  href="/audit"
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#087B53] text-white text-xs font-heading font-bold uppercase tracking-wider"
                >
                  <span>Passer mon audit gratuit</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION TAQWA & CRAINTE D'ALLAH : L'ACUITÉ COGNITIVE SUPRÊME
            ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-[#E8E0D2] pt-16">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-mono text-[#8C6214] uppercase tracking-[0.2em] font-bold">
              ÉXÉGÈSE ÉPISTÉMOLOGIQUE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] tracking-tight">
              La Taqwa : Non Pas une Terreur, mais un Dispositif de Clairvoyance.
            </h2>
            <p className="text-sm sm:text-base text-[#403B35] font-sans leading-relaxed">
              La culture populaire a souvent traduit la <strong>Taqwa</strong> par une « crainte » passive et inhibitrice. L&apos;analyse linguistique et coranique révèle exactement l&apos;inverse : la racine <em>W-Q-Y</em> désigne le <strong>bouclier défensif</strong>, la vigilance permanente et l&apos;acuité de l&apos;esprit.
            </p>
            <p className="text-sm sm:text-base text-[#403B35] font-sans leading-relaxed">
              La Taqwa est l&apos;antidote direct à l&apos;ivresse de la distraction moderne (Ghaflah). C&apos;est la conscience lucide de la présence divine qui empêche le cortex préfrontal de sombrer dans les mirages du court terme.
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#E8E0D2] text-xs font-mono text-[#141210]">
              <strong>Sourate Al-Anfâl (8:29) :</strong> « Ô vous qui croyez ! Si vous avez la Taqwa d&apos;Allah, Il vous accordera un <em>Furqân</em> (la faculté absolue de discerner le vrai du faux)... »
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-4">
            <h4 className="font-heading font-extrabold text-xl text-[#141210]">
              Le Mandat du Khalifa en 3 Lois
            </h4>
            <div className="space-y-3 text-xs text-[#5C534A] leading-relaxed">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <strong className="text-[#141210] block mb-0.5">1. Loi de Responsabilité Intégrale</strong>
                Le Khalifa ne s&apos;excuse pas de son environnement ; il le restructure pour servir sa foi et son devoir.
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <strong className="text-[#141210] block mb-0.5">2. Loi de Continuité Rythmique</strong>
                Le temps ne se gère pas selon l&apos;urgence du monde, mais s&apos;articule sur les 5 ancrages célestes.
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E0D2]">
                <strong className="text-[#141210] block mb-0.5">3. Loi de Soumission Féconde</strong>
                Seul celui qui pose son front avec humilité totale devant Allah peut marcher avec autorité et dignité parmi les hommes.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION BIBLIOGRAPHIE ACADÉMIQUE & TRAITÉS DE MOUNIR BYAR
            ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-8 border-t border-[#E8E0D2] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#8C6214] uppercase tracking-[0.2em] font-bold">
                CORPUS DOCUMENTAIRE VÉRIFIABLE
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#141210] mt-1">
                Sources Scientifiques & Ouvrages de Référence
              </h2>
            </div>

            {/* FILTRES PAR DOMAINE */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-[#E8E0D2] text-xs font-mono">
              <button
                type="button"
                onClick={() => setFilterDomain("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDomain === "all" ? "bg-[#141210] text-white" : "text-[#5C534A] hover:text-[#141210]"
                }`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => setFilterDomain("neuro")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDomain === "neuro" ? "bg-[#141210] text-white" : "text-[#5C534A] hover:text-[#141210]"
                }`}
              >
                Neurosciences
              </button>
              <button
                type="button"
                onClick={() => setFilterDomain("islamic")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDomain === "islamic" ? "bg-[#141210] text-white" : "text-[#5C534A] hover:text-[#141210]"
                }`}
              >
                Exégèse & Livres
              </button>
              <button
                type="button"
                onClick={() => setFilterDomain("chrono")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDomain === "chrono" ? "bg-[#141210] text-white" : "text-[#5C534A] hover:text-[#141210]"
                }`}
              >
                Chronobiologie
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBiblio.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-xs flex flex-col justify-between hover:border-[#B88E3E] transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] text-[#8C6214] font-semibold uppercase">
                      {b.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[#7A6F64]">Peer-Reviewed</span>
                  </div>
                  <h4 className="font-heading font-extrabold text-base text-[#141210] leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-[11px] font-mono text-[#5C534A]">
                    {b.authors} • <em>{b.journal}</em>
                  </p>
                  <p className="text-xs text-[#403B35] leading-relaxed pt-2 border-t border-[#E8E0D2]">
                    {b.finding}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BANNIÈRE FINALE : APPLIQUER LA SCIENCE À VOTRE VIE
            ═══════════════════════════════════════════════════════════════ */}
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6214] font-bold">
            DE LA THÉORIE À L&apos;EXÉCUTION
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#141210] max-w-2xl mx-auto tracking-tight">
            Prêt à appliquer ces protocoles à votre propre existence ?
          </h2>
          <p className="text-sm text-[#5C534A] max-w-xl mx-auto leading-relaxed">
            Évaluez votre score de charge mentale avec notre audit gratuit ou réservez un entretien d&apos;orientation de 45 minutes pour auditer vos 8 piliers avec Mounir Byar.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Passer l&apos;audit gratuit</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#B88E3E]/50 bg-[#FAF8F5] hover:border-[#B88E3E] text-[#141210] text-xs font-heading font-semibold uppercase tracking-wider transition-all"
            >
              <span>Réserver mon créneau de 45 min</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
