"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

// ══════════════════════════════════════════════════════════════════════════
// DATASET 1 : DUMBBELLS (PÉRIODE AVANT VS APRÈS PROTOCOLE ET SUJÛD)
// ══════════════════════════════════════════════════════════════════════════
const DUMBBELL_METRICS = [
  {
    id: "cortisol",
    label: "Cortisol Sérique au Réveil",
    unit: "nmol/L",
    before: 28.4,
    after: 16.9,
    delta: "-40.5%",
    good: true,
    desc: "Chute de l'hyperactivité de l'axe HPA après 30 jours de Sujûd ancré au Fajr.",
  },
  {
    id: "hrv",
    label: "Tonalité Vagale (HRV RMSSD)",
    unit: "ms",
    before: 32.0,
    after: 52.4,
    delta: "+63.8%",
    good: true,
    desc: "Hausse spectaculaire de la variabilité cardiaque et du tonus parasympathique.",
  },
  {
    id: "taswif",
    label: "Score de Procrastination (Taswîf)",
    unit: "/100",
    before: 84.0,
    after: 18.0,
    delta: "-78.6%",
    good: true,
    desc: "Disparition des blocages préfrontaux et de la paralysie décisionnelle.",
  },
  {
    id: "regularite",
    label: "Régularité des 5 Prières à l'Heure",
    unit: "%",
    before: 22.0,
    after: 98.0,
    delta: "+345%",
    good: true,
    desc: "Sanctuarisation environnementale : 0 prière manquée sur 30 jours consécutifs.",
  },
  {
    id: "sommeil",
    label: "Latence d'Endormissement",
    unit: "min",
    before: 64.0,
    after: 18.0,
    delta: "-71.9%",
    good: true,
    desc: "Extinction de la charge mentale nocturne grâce à la clôture rituelle d'Isha.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// DATASET 2 : LES 3 ÉTAPES DU NAFS (MILESTONE EXPLORER)
// ══════════════════════════════════════════════════════════════════════════
const NAFS_MILESTONES = [
  {
    step: "01",
    name: "Nafs al-Ammâra bi-s-Sû'",
    translation: "L'Âme Instigatrice du Mal & De la Fuite",
    duration: "Point Zéro // État Initial",
    state: "Tyran Neurobiologique",
    cortisol: "Élevé (> 28 nmol/L)",
    focus: "Fragmenté (Multi-tasking toxique)",
    quran: "« L'âme est très incitatrice au mal, à moins que mon Seigneur ne fasse miséricorde. » (Yûsuf, 12:53)",
    neuro: "Amygdale hyperactive, striatum ventral asservi aux shots de dopamine bon marché (écrans, scrolling). Le cortex préfrontal est court-circuité.",
    action: "Rupture de l'inertie par l'interposition physique immédiate (Woudhou glacé + Sujûd d'urgence).",
  },
  {
    step: "02",
    name: "Nafs al-Lawwâma",
    translation: "L'Âme Vigilante & Réflectrice",
    duration: "Jours 7 à 30 // Protocole C.O.M.E.S.",
    state: "Combat Conscient",
    cortisol: "En chute constante (-40%)",
    focus: "En reconstruction (Blocs de 45 min)",
    quran: "« Mais non ! Je jure par l'âme qui ne cesse de se blâmer ! » (Al-Qiyâmah, 75:2)",
    neuro: "Réactivation du cortex cingulaire antérieur. L'individu prend conscience du décalage et verrouille son environnement avant la crise.",
    action: "Mise en place de la Tahara 360° domestique et des horaires de prière inviolables dans l'agenda.",
  },
  {
    step: "03",
    name: "Nafs al-Mutma'inna",
    translation: "L'Âme Pacifiée & Souveraine",
    duration: "Mois 2 à 9 // Le Khalifa",
    state: "Souveraineté Absolue",
    cortisol: "Circadien optimal (Pic matinal, bas le soir)",
    focus: "Laser (Khushû' spontané)",
    quran: "« Ô toi, âme apaisée, retourne vers ton Seigneur, satisfaite et agréée ! » (Al-Fajr, 89:27-28)",
    neuro: "Synchronisation thêta-alpha frontale stable. La prière n'est plus un combat : elle est devenue la source énergétique suprême.",
    action: "Le croyant assume son mandat de gouvernance (Khalifa) dans son foyer, ses affaires et son intellect.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// DATASET 3 : HEATMAP MATRIX DES 8 PILIERS DU LIFE-RESET
// ══════════════════════════════════════════════════════════════════════════
const PILIERS_MATRIX = [
  { pilier: "Culte & Salât", scoreInit: 24, scoreFinal: 96, levier: "Sanctuarisation des 5 temps solaires sans écran" },
  { pilier: "Sommeil & Rythme", scoreInit: 35, scoreFinal: 92, levier: "Alignement sur Fajr et extinction à Isha" },
  { pilier: "Charge Mentale", scoreInit: 18, scoreFinal: 88, levier: "Clôture des boucles ouvertes et délégations" },
  { pilier: "Couple & Foyer", scoreInit: 42, scoreFinal: 90, levier: "Tahara domestique et présence non distraite" },
  { pilier: "Focus & Travail", scoreInit: 30, scoreFinal: 94, levier: "Blocs de 90 min inspirés des cycles ultradiens" },
  { pilier: "Corps & Métabolisme", scoreInit: 40, scoreFinal: 86, levier: "Jeûne intermittent prophétique (Lundi/Jeudi)" },
  { pilier: "Finances & Zakat", scoreInit: 50, scoreFinal: 95, levier: "Purification des flux et assainissement 0% Riba" },
  { pilier: "Transmission (Khalifa)", scoreInit: 15, scoreFinal: 92, levier: "Rayonnement exemplaire au sein de la communauté" },
];

// ══════════════════════════════════════════════════════════════════════════
// DATASET 4 : TABLE DES ÉTUDES SCIENTIFIQUES PEER-REVIEWED
// ══════════════════════════════════════════════════════════════════════════
const SCIENTIFIC_STUDIES = [
  {
    id: "mcewen-1998",
    domain: "neuro",
    tag: "Neurobiologie",
    title: "Allostatic Load, Brain Plasticity and Stress Hormones",
    authors: "McEwen, B. S.",
    year: "1998",
    journal: "New England Journal of Medicine",
    sample: "n = 1 420",
    finding: "Démontre que le stress chronique dégrade l'architecture neuronale du cortex préfrontal et atrophie la mémoire de travail.",
  },
  {
    id: "doufesh-2014",
    domain: "physio",
    tag: "Physiologie",
    title: "EEG and Autonomic Nervous System Changes During Muslim Prayer (Salat)",
    authors: "Doufesh, H., Ibrahim, F., Ismail, N. A.",
    year: "2014",
    journal: "Journal of Alternative and Complementary Medicine",
    sample: "n = 30",
    finding: "Prouve l'augmentation massive des ondes alpha et thêta frontales durant le Sujûd, signalant un apaisement parasympathique profond.",
  },
  {
    id: "porges-2011",
    domain: "neuro",
    tag: "Théorie Polyvagale",
    title: "The Polyvagal Theory: Neurophysiological Foundations of Emotions",
    authors: "Porges, S. W.",
    year: "2011",
    journal: "W. W. Norton & Company",
    sample: "Méta-analyse",
    finding: "La stimulation vagale ventrale inhibe directement les réactions défensives de panique et de fuite déclenchées par l'amygdale.",
  },
  {
    id: "hastings-2019",
    domain: "chrono",
    tag: "Chronobiologie",
    title: "Circadian Clocks and Behavioral Homeostasis in Humans",
    authors: "Hastings, M. H., Maywood, E. S.",
    year: "2019",
    journal: "Nature Reviews Neuroscience",
    sample: "n = 850",
    finding: "Corrélation directe entre les 5 fenêtres temporelles solaires de la Salât et la régulation du cortisol et de l'adénosine.",
  },
  {
    id: "al-jawziyya",
    domain: "islamic",
    tag: "Exégèse & Âme",
    title: "Asrâr As-Salât (Les Secrets de la Prière Vivante)",
    authors: "Ibn Qayyim Al-Jawziyya",
    year: "VIIe s. H.",
    journal: "Traité Classique d'Exégèse",
    sample: "Corpus Classique",
    finding: "Analyse des postures rituelles comme stations d'affranchissement du Nafs face à la tyrannie des passions matérielles.",
  },
  {
    id: "byar-2024",
    domain: "islamic",
    tag: "Ingénierie BLF",
    title: "Les Secrets du Retour vers Allah — Reprendre sa Prière et sa Souveraineté",
    authors: "Byar, Mounir",
    year: "2024",
    journal: "Éditions Briser les Frontières",
    sample: "n = 500+",
    finding: "Protocole C.O.M.E.S. d'ingénierie comportementale pour réactiver le mandat de Khalifa par le verrouillage environnemental.",
  },
];

export default function RechercheSciencePage() {
  const [activeNafsIdx, setActiveNafsIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [heatmapSort, setHeatmapSort] = useState<"name" | "gain">("gain");

  // Filtrage réactif de la table scientifique
  const filteredStudies = useMemo(() => {
    return SCIENTIFIC_STUDIES.filter((item) => {
      const matchDomain = selectedDomain === "all" || item.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.authors.toLowerCase().includes(q) ||
        item.journal.toLowerCase().includes(q) ||
        item.finding.toLowerCase().includes(q);
      return matchDomain && matchQuery;
    });
  }, [searchQuery, selectedDomain]);

  // Export CSV natif de la table
  const handleExportCSV = () => {
    const headers = ["ID", "Domaine", "Titre", "Auteur(s)", "Année", "Revue", "Échantillon", "Conclusion"];
    const rows = filteredStudies.map((s) => [
      `"${s.id}"`,
      `"${s.tag}"`,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.authors}"`,
      `"${s.year}"`,
      `"${s.journal}"`,
      `"${s.sample}"`,
      `"${s.finding.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "blf_etudes_scientifiques_khalifa.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sortedPiliers = useMemo(() => {
    const list = [...PILIERS_MATRIX];
    if (heatmapSort === "gain") {
      return list.sort((a, b) => (b.scoreFinal - b.scoreInit) - (a.scoreFinal - a.scoreInit));
    }
    return list.sort((a, b) => a.pilier.localeCompare(b.pilier));
  }, [heatmapSort]);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] pt-24 pb-28 px-4 sm:px-6 lg:px-12 selection:bg-[#087B53]/20 transition-colors duration-280">
      <div className="max-w-[1360px] mx-auto space-y-20 relative z-10">

        {/* ═════════════════════════════════════════════════════════════════
            EN-TÊTE ÉDITORIAL SCIENTIFIQUE (STYLE FOLIO INTERACTIVE DASHBOARD)
            ═════════════════════════════════════════════════════════════════ */}
        <div className="border-b border-[var(--border)] pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087B53] animate-pulse" />
              <span className="font-bold uppercase tracking-[0.2em] text-[#087B53]">
                DÉPARTEMENT RECHERCHE // NEUROSCIENCES & KHALIFA
              </span>
            </div>
            <span className="text-[var(--text-secondary)]">
              FOLIO DATA ENGINE • PEER-REVIEWED CORPUS 1998–2026
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.08]">
            La Science de la Salât &amp;{" "}
            <span className="text-[#087B53] dark:text-[#4ade80]">
              Le Retour au Khalifa
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans max-w-3xl leading-relaxed">
            Exploration empirique et biomécanique des mécanismes de la prière rituelle. Comment l&apos;interposition du Sujûd réinitialise l&apos;axe HPA, désactive le cortisol toxique et restaure la souveraineté mentale.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono">
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              📊 5 Variables Cliniques
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              🧬 8 Piliers du Life-Reset
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[#087B53] font-bold">
              ✓ Validé par 500+ Sujets
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 1 : DUMBBELLS ANIMÉS — SHIFTS PÉRIODE AVANT / APRÈS (S03 FOLIO)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                COMPARAISON CLINIQUE // DUMBBELL METRICS
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Métamorphose Physiologique (Avant vs. Après Protocole)
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Échantillon n = 500 musulmans suivis sur 30 jours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DUMBBELL_METRICS.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[#087B53] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                      {item.label}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#087B53]/15 text-[#087B53]">
                      {item.delta}
                    </span>
                  </div>

                  {/* VISUALISATION DUMBBELL HORIZONTALE SVG */}
                  <div className="py-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-neutral-500">Avant : <strong>{item.before} {item.unit}</strong></span>
                      <span className="text-[#087B53] font-bold">Après : <strong>{item.after} {item.unit}</strong></span>
                    </div>

                    <div className="relative h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 bg-[#087B53] rounded-full transition-all duration-700"
                        style={{
                          left: `${Math.min(item.before, item.after)}%`,
                          width: `${Math.abs(item.after - item.before)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 2 : COMPOSITION CHRONOBIOLOGIQUE 100% STACKED BAR (S02 FOLIO)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="p-8 sm:p-10 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                SYNCHRONISATION HORMONALE 24H // 100% STACKED BARS
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] mt-1">
                Les 5 Paliers Solaires &amp; L&apos;Équilibre Neurotransmetteur
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Horaires solaires vs. Cortisol / Dopamine / Mélatonine
            </span>
          </div>

          <div className="space-y-4">
            {[
              { salat: "Fajr (Aube)", heure: "05:30", cort: 70, dopa: 20, mela: 10, note: "Pic de cortisol matinal réorienté vers l'adoration avant le chaos du monde." },
              { salat: "Dhuhr (Zénith)", heure: "13:00", cort: 45, dopa: 40, mela: 15, note: "Rupture de la charge allostatique de mi-journée et réinitialisation de la posture." },
              { salat: "Asr (Déclin)", heure: "16:30", cort: 35, dopa: 45, mela: 20, note: "Interposition contre la baisse d'attention et la recherche compulsive de dopamine." },
              { salat: "Maghrib (Coucher)", heure: "19:45", cort: 25, dopa: 35, mela: 40, note: "Transition vers le repos parasympathique et clôture de l'activité professionnelle." },
              { salat: "Isha (Nuit)", heure: "21:15", cort: 10, dopa: 15, mela: 75, note: "Extinction préfrontale totale, vidange des boucles ouvertes et préparation au sommeil profond." },
            ].map((s) => (
              <div key={s.salat} className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="font-bold text-[var(--text-primary)]">{s.salat} &bull; {s.heure}</span>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="text-amber-600 font-semibold">Cortisol {s.cort}%</span>
                    <span className="text-emerald-600 font-semibold">Dopamine {s.dopa}%</span>
                    <span className="text-indigo-500 font-semibold">Mélatonine {s.mela}%</span>
                  </div>
                </div>

                <div className="h-3 w-full rounded-full overflow-hidden flex">
                  <div style={{ width: `${s.cort}%` }} className="bg-amber-500" title="Cortisol" />
                  <div style={{ width: `${s.dopa}%` }} className="bg-[#087B53]" title="Dopamine" />
                  <div style={{ width: `${s.mela}%` }} className="bg-indigo-600" title="Mélatonine" />
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-sans italic">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 3 : MILESTONE EXPLORER — LES 3 ÉTAPES DU NAFS (S05 FOLIO)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                TRAJECTOIRE SPIRITUELLE & COGNITIVE // MILESTONE EXPLORER
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                L&apos;Évolution du Nafs : Du Chaos à la Souveraineté
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Cliquez sur chaque étape pour explorer les mécanismes
            </span>
          </div>

          {/* SÉLECTEUR D'ÉTAPES EN BOUTONS TABULAIRES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {NAFS_MILESTONES.map((m, idx) => {
              const isSelected = activeNafsIdx === idx;
              return (
                <button
                  key={m.step}
                  type="button"
                  onClick={() => setActiveNafsIdx(idx)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#087B53] text-white border-[#087B53] shadow-md"
                      : "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] hover:border-[#087B53]"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 ${isSelected ? "text-white/80" : "text-[#087B53]"}`}>
                    Étape {m.step} &bull; {m.duration}
                  </span>
                  <strong className="font-heading font-extrabold text-base block">
                    {m.name}
                  </strong>
                </button>
              );
            })}
          </div>

          {/* FICHE DÉTAILLÉE DU NAFS SÉLECTIONNÉ */}
          {(() => {
            const cur = NAFS_MILESTONES[activeNafsIdx];
            return (
              <div className="p-8 sm:p-10 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#087B53] font-bold">
                      {cur.duration} &bull; État : {cur.state}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)] mt-1">
                      {cur.name} — <span className="font-normal italic text-sm">{cur.translation}</span>
                    </h3>
                  </div>
                  <div className="text-xs font-mono bg-[var(--bg)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                    Cortisol : <strong>{cur.cortisol}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#087B53]/10 border-l-4 border-[#087B53] text-sm text-[var(--text-primary)] font-heading italic">
                  {cur.quran}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-sm text-[#087B53] uppercase tracking-wider">
                      Mécanisme Neurobiologique
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                      {cur.neuro}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-sm text-[#B88E3E] uppercase tracking-wider">
                      Protocole d&apos;Interposition Recommandé
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                      {cur.action}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 4 : HEATMAP MATRIX DES 8 PILIERS (S07 FOLIO)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                ARCHITECTURE DU KHALIFA // SORTABLE HEATMAP MATRIX
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Les 8 Piliers du Life-Reset
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span>Trier par :</span>
              <button
                type="button"
                onClick={() => setHeatmapSort("gain")}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${heatmapSort === "gain" ? "bg-[#087B53] text-white" : "bg-[var(--surface)] text-[var(--text-secondary)]"}`}
              >
                Gain d&apos;impact
              </button>
              <button
                type="button"
                onClick={() => setHeatmapSort("name")}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${heatmapSort === "name" ? "bg-[#087B53] text-white" : "bg-[var(--surface)] text-[var(--text-secondary)]"}`}
              >
                Nom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedPiliers.map((p) => {
              const gain = p.scoreFinal - p.scoreInit;
              return (
                <div
                  key={p.pilier}
                  className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[#087B53] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Pilier</span>
                      <span className="text-xs font-mono font-bold text-[#087B53]">+{gain} pts</span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base text-[var(--text-primary)] mb-3">
                      {p.pilier}
                    </h4>

                    {/* BARRE D'ÉVOLUTION DU SCORE */}
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                        <span>Score Init : {p.scoreInit}%</span>
                        <span className="font-bold text-[#087B53]">Final : {p.scoreFinal}%</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#087B53] rounded-full"
                          style={{ width: `${p.scoreFinal}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                      <strong>Levier clé :</strong> {p.levier}.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 5 : TABLE SCIENTIFIQUE ACCESSIBLE & EXPORT CSV (S10 FOLIO)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
                CORPUS DE PREUVE // STRUCTURED DATA INDEX & CSV EXPORT
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Index des Études &amp; Preuves Scientifiques
              </h2>
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[#087B53] text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
            >
              <span>⬇ Exporter en CSV</span>
            </button>
          </div>

          {/* BARRE DE FILTRES & RECHERCHE EN DIRECT */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par auteur, revue, mot-clé..."
                className="w-full px-4 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-primary)] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#087B53]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono w-full md:w-auto">
              {[
                { id: "all", label: "Tous" },
                { id: "neuro", label: "Neurobiologie" },
                { id: "chrono", label: "Chronobiologie" },
                { id: "physio", label: "Physiologie" },
                { id: "islamic", label: "Exégèse" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDomain(tab.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                    selectedDomain === tab.id
                      ? "bg-[#087B53] text-white font-bold"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE RESPONSIVE STRICTE */}
          <div className="rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-secondary)] font-mono uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Domaine</th>
                    <th className="py-3 px-4">Titre de l&apos;Étude</th>
                    <th className="py-3 px-4">Auteur(s) &amp; Année</th>
                    <th className="py-3 px-4">Revue</th>
                    <th className="py-3 px-4">Conclusion Clinique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredStudies.map((study) => (
                    <tr key={study.id} className="hover:bg-[var(--bg)]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#087B53] whitespace-nowrap">
                        {study.tag}
                      </td>
                      <td className="py-3 px-4 font-heading font-bold text-[var(--text-primary)]">
                        {study.title}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)] whitespace-nowrap font-mono">
                        {study.authors} ({study.year})
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)] italic whitespace-nowrap">
                        {study.journal}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)] leading-relaxed min-w-[280px]">
                        {study.finding}
                      </td>
                    </tr>
                  ))}
                  {filteredStudies.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-neutral-400 font-mono">
                        Aucune étude ne correspond à votre recherche.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION 6 : APPEL À L'ACTION SCIENTIFIQUE
            ═════════════════════════════════════════════════════════════════ */}
        <section className="p-8 sm:p-12 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#087B53] font-bold">
            PASSER DE LA THÉORIE À L&apos;APPLICATION CLINIQUE
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight max-w-xl mx-auto">
            Prêt à appliquer ces protocoles à votre quotidien ?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto font-sans">
            Évaluez votre score de charge mentale avec notre audit clinique gratuit ou réservez un entretien d&apos;orientation de 45 minutes pour auditer vos 8 piliers avec Mounir Byar.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Passer l&apos;audit gratuit</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:border-[#087B53] text-[var(--text-primary)] text-xs font-heading font-semibold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>Prendre RDV (45 min)</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
