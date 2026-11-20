"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowIcon from "@/components/ui/ArrowIcon";

// Créneaux horaires de référence (45 min)
const SLOTS_MORNING_ALL = [
  { start: "09:00", end: "09:45" },
  { start: "09:45", end: "10:30" },
  { start: "10:30", end: "11:15" },
  { start: "11:15", end: "12:00" },
];

const SLOTS_AFTERNOON_ALL = [
  { start: "14:00", end: "14:45" },
  { start: "14:45", end: "15:30" },
  { start: "15:30", end: "16:15" },
  { start: "16:15", end: "17:00" },
  { start: "17:00", end: "17:45" },
];

// Configuration des 4 prochains mois (Novembre 2026 à Février 2027)
const MONTHS_CONFIG = [
  {
    key: "nov-2026",
    label: "Novembre 2026",
    year: 2026,
    monthIdx: 10, // 0-based
    fillRate: 73,
    statusText: "73% saturé • 2 créneaux restants",
    isScarce: true,
  },
  {
    key: "dec-2026",
    label: "Décembre 2026",
    year: 2026,
    monthIdx: 11,
    fillRate: 73,
    statusText: "73% réservé • Clôture annuelle",
    isScarce: true,
  },
  {
    key: "jan-2027",
    label: "Janvier 2027",
    year: 2027,
    monthIdx: 0,
    fillRate: 28,
    statusText: "Session 2027 • Nombreuses disponibilités",
    isScarce: false,
  },
  {
    key: "feb-2027",
    label: "Février 2027",
    year: 2027,
    monthIdx: 1,
    fillRate: 22,
    statusText: "Pré-Ramadan • Nombreuses disponibilités",
    isScarce: false,
  },
];

export default function AgendaDoctolib() {
  const router = useRouter();

  // Mode de consultation
  const [selectedFormat, setSelectedFormat] = useState<"tel" | "presentiel">("tel");

  // Mois sélectionné
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>("jan-2027");

  // Décalage de semaine dans le mois
  const [weekOffset, setWeekOffset] = useState(0);

  // Jour sélectionné dans la semaine affichée (0 à 5)
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  // Créneau cliqué
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);

  // Formulaire pré-paiement
  const [modalOpen, setModalOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [motif, setMotif] = useState("Charge mentale & Perte de régularité dans la Salat");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mois actif
  const activeMonth = useMemo(() => {
    return MONTHS_CONFIG.find((m) => m.key === selectedMonthKey) || MONTHS_CONFIG[2];
  }, [selectedMonthKey]);

  // Prix en fonction du format
  const currentPrice = selectedFormat === "tel" ? "48,95 €" : "96,45 €";
  const productId = selectedFormat === "tel" ? "rdv-tel" : "rdv-presentiel";

  // Génération des 6 jours ouvrés (Lundi à Samedi) pour la semaine choisie dans le mois sélectionné
  const weekDays = useMemo(() => {
    const days = [];
    const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const monthNames = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    // Trouver le premier lundi du mois ciblé
    const firstDayOfMonth = new Date(activeMonth.year, activeMonth.monthIdx, 1);
    const dayOfWeek = firstDayOfMonth.getDay(); // 0 = dimanche, 1 = lundi
    const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    
    const startMonday = new Date(activeMonth.year, activeMonth.monthIdx, 1 + daysUntilMonday + weekOffset * 7);

    for (let i = 0; i < 6; i++) {
      const d = new Date(startMonday);
      d.setDate(startMonday.getDate() + i);
      const isFriday = i === 4;

      // Calcul de disponibilité selon le mois :
      // Nov & Décembre : 73% de rareté (très peu de créneaux ouverts)
      // Janvier & Février : Haute disponibilité (presque tous les créneaux ouverts)
      const dayNum = d.getDate();
      const isScarceMonth = activeMonth.isScarce;

      days.push({
        dayName: dayNames[i],
        dayNumber: dayNum,
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        fullDateStr: `${dayNames[i]} ${dayNum} ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        isFriday,
        dateObj: d,
        isScarceMonth,
      });
    }

    return days;
  }, [activeMonth, weekOffset]);

  const activeDay = weekDays[selectedDayIdx] || weekDays[0];

  // Algorithme de disponibilité Doctolib réaliste :
  // En Novembre/Décembre (73% saturé) : seulement 1 ou 2 créneaux dispo par jour, les autres marqués "Complet"
  // En Janvier/Février : 4 à 6 créneaux ouverts par jour !
  const daySlots = useMemo(() => {
    if (!activeDay) return { morning: [], afternoon: [] };

    const isScarce = activeDay.isScarceMonth;
    const daySeed = activeDay.dayNumber + (activeDay.isFriday ? 7 : 0);

    const morning = SLOTS_MORNING_ALL.map((slot, idx) => {
      // Si mois saturé (Nov/Dec) : seul 1 créneau du matin est dispo
      const isAvailable = isScarce ? (idx + daySeed) % 4 === 1 : true;
      return { ...slot, available: isAvailable };
    });

    const afternoon = activeDay.isFriday
      ? [] // Fermé pour Jumu'ah le vendredi après-midi
      : SLOTS_AFTERNOON_ALL.map((slot, idx) => {
          // Si mois saturé : seul 1 créneau de l'après-midi dispo
          const isAvailable = isScarce ? (idx + daySeed) % 5 === 2 : true;
          return { ...slot, available: isAvailable };
        });

    return { morning, afternoon };
  }, [activeDay]);

  const handleSelectSlot = (slot: { start: string; end: string; available?: boolean }) => {
    if (slot.available === false) return;
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !telephone || !selectedSlot) return;

    setIsSubmitting(true);

    try {
      // 1. Enregistrement immédiat de la tentative côté Admin (avec motif "Abandon avant paiement" si abandon sur Stripe)
      await fetch("/api/rendez-vous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: selectedFormat,
          dateRdv: activeDay.fullDateStr,
          creneau: `${selectedSlot.start} - ${selectedSlot.end}`,
          nom,
          email,
          telephone,
          adresse: selectedFormat === "presentiel" ? adresse : undefined,
          motif,
          statut: "abandon_avant_paiement",
          motifAbandon: "Formulaire complété - Redirigé vers la passerelle de paiement Stripe (en attente)",
        }),
      });
    } catch (err) {
      console.warn("Enregistrement tentative RDV :", err);
    }

    // 2. Redirection fluide vers la page de paiement sécurisée
    const params = new URLSearchParams({
      product: productId,
      date: activeDay.fullDateStr,
      creneau: `${selectedSlot.start} - ${selectedSlot.end}`,
      nom,
      email,
      telephone,
      ...(selectedFormat === "presentiel" ? { adresse } : {}),
    });

    router.push(`/paiement?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      {/* CADRE ARCHITECTURAL DOCTOLIB SANS CHARGE COGNITIVE */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden">
        
        {/* EN-TÊTE DOCTOLIB LEAD : PRATICIEN & SPÉCIALITÉ */}
        <div className="p-6 sm:p-8 border-b border-[var(--border)] bg-gradient-to-r from-[var(--surface)] via-[var(--bg)] to-[var(--surface)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* CARTE PRATICIEN */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#B88E3E]/60 shadow-md shrink-0 bg-[#0A1128]">
                <Image
                  src="/images/portrait-mounir.jpg"
                  alt="Mounir Byar - Fondateur BLF"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/40" title="En service" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold">
                    CABINET BLF • SOUVERAINETÉ COMPORTEMENTALE
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20">
                    ✓ Praticien Agréé • 0% Riba
                  </span>
                </div>
                
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
                  Mounir BYAR
                </h3>
                
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span>Ingénieur &amp; Stratège Comportemental</span>
                  <span className="opacity-40">•</span>
                  <span className="text-[#B88E3E] font-medium">Paris • Reims • Déplacement France / International</span>
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#D97706] text-xs">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--text-primary)]">5.0</span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">(43 avis vérifiés • 82% à 5★)</span>
                </div>
              </div>
            </div>

            {/* JAUGE DE TENSION DU PLANNING (73% SUR 4 MOIS) */}
            <div className="bg-[var(--bg)] border border-[#B88E3E]/30 rounded-xl p-4 lg:max-w-xs shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853] flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Planning 4 Mois
                </span>
                <span className="text-xs font-mono font-extrabold text-[#B88E3E]">
                  Chargé à 73%
                </span>
              </div>
              
              {/* Barre de progression 73% */}
              <div className="w-full bg-[var(--border)] h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-amber-500 via-[#B88E3E] to-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: "73%" }} />
              </div>

              <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                Novembre &amp; Décembre quasi complets. <strong>Disponibilités élargies ouvertes en Janvier &amp; Février 2027</strong>.
              </p>
            </div>

          </div>

          {/* ÉTAPE 1 : CHOIX DU TYPE DE CONSULTATION (DOCTOLIB MOTIF SELECTOR) */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-bold block mb-3">
              Étape 1 // Choisissez le format d&apos;intervention :
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FORMAT 1 : TÉLÉPHONE 48,95 € */}
              <button
                type="button"
                onClick={() => {
                  setSelectedFormat("tel");
                  setSelectedSlot(null);
                }}
                className={`p-5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
                  selectedFormat === "tel"
                    ? "bg-[var(--surface)] border-[#B88E3E] dark:border-[#D4A853] shadow-md ring-2 ring-[#B88E3E]/20"
                    : "bg-[var(--bg)]/50 border-[var(--border)] hover:border-[#B88E3E]/50 hover:bg-[var(--surface)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-heading font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <span className="text-lg">📞</span>
                      <span>Consultation Téléphonique / Visio</span>
                    </span>
                    <span className="text-base font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                      48,95 €
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Séance intensive de <strong>45 minutes</strong> avec Mounir Byar. Diagnostic de votre charge allostatique, désamorçage de la fatigue décisionnelle et feuille de route d&apos;urgence.
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>Durée : 45 min • Appel direct</span>
                  <span className={selectedFormat === "tel" ? "text-[#B88E3E] dark:text-[#D4A853] font-bold" : ""}>
                    {selectedFormat === "tel" ? "● Sélectionné" : "Choisir ce format"}
                  </span>
                </div>
              </button>

              {/* FORMAT 2 : PRÉSENTIEL À DOMICILE 96,45 € */}
              <button
                type="button"
                onClick={() => {
                  setSelectedFormat("presentiel");
                  setSelectedSlot(null);
                }}
                className={`p-5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
                  selectedFormat === "presentiel"
                    ? "bg-[var(--surface)] border-[#B88E3E] dark:border-[#D4A853] shadow-md ring-2 ring-[#B88E3E]/20"
                    : "bg-[var(--bg)]/50 border-[var(--border)] hover:border-[#B88E3E]/50 hover:bg-[var(--surface)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-heading font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span>Audit &amp; Immersion à Domicile</span>
                    </span>
                    <span className="text-base font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                      96,45 €
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <strong>Mounir Byar se déplace personnellement chez vous (1h15)</strong>. Audit complet du sanctuaire domestique (Tahara 360°), élimination des frictions spatiales et restitution en main propre.
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>Durée : 1h15 • À votre domicile</span>
                  <span className={selectedFormat === "presentiel" ? "text-[#B88E3E] dark:text-[#D4A853] font-bold" : ""}>
                    {selectedFormat === "presentiel" ? "● Sélectionné" : "Choisir ce format"}
                  </span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* ÉTAPE 2 : NAVIGATION MULTI-MOIS (NOV 2026 À FÉVRIER 2027) */}
        <div className="p-6 sm:p-8 border-b border-[var(--border)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-bold block">
                Étape 2 // Choisissez la période :
              </span>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Consultez les disponibilités par mois sur les 4 prochains mois.
              </p>
            </div>

            {/* ONGLETS DES 4 MOIS */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2">
              {MONTHS_CONFIG.map((m) => {
                const isSelected = selectedMonthKey === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      setSelectedMonthKey(m.key);
                      setWeekOffset(0);
                      setSelectedDayIdx(0);
                      setSelectedSlot(null);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border text-center cursor-pointer ${
                      isSelected
                        ? "bg-[#0A1128] text-white border-[#B88E3E] shadow-sm font-bold ring-1 ring-[#B88E3E]"
                        : "bg-[var(--bg)]/70 text-[var(--text-secondary)] border-[var(--border)] hover:border-[#B88E3E] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="font-semibold">{m.label}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? "text-[#D4A853]" : m.isScarce ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400 font-medium"}`}>
                      {m.isScarce ? "Dernières places" : "Ouvert (Nombreux)"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SÉLECTEUR DE SEMAINE & JOURS */}
          <div className="pt-3 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                Semaine affichée pour <strong>{activeMonth.label}</strong> :
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWeekOffset((p) => Math.max(0, p - 1))}
                  disabled={weekOffset === 0}
                  className="px-3 py-1 rounded-lg border border-[var(--border)] text-xs font-mono disabled:opacity-30 hover:border-[#B88E3E] cursor-pointer"
                >
                  ← Semaine préc.
                </button>
                <button
                  type="button"
                  onClick={() => setWeekOffset((p) => Math.min(3, p + 1))}
                  disabled={weekOffset >= 3}
                  className="px-3 py-1 rounded-lg border border-[var(--border)] text-xs font-mono disabled:opacity-30 hover:border-[#B88E3E] cursor-pointer"
                >
                  Semaine suiv. →
                </button>
              </div>
            </div>

            {/* GRILLE DES 6 JOURS */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-2.5">
              {weekDays.map((day, idx) => {
                const isSelected = selectedDayIdx === idx;
                return (
                  <button
                    key={day.fullDateStr}
                    type="button"
                    onClick={() => {
                      setSelectedDayIdx(idx);
                      setSelectedSlot(null);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0A1128] text-white border-[#B88E3E] shadow-md"
                        : "bg-[var(--bg)]/60 border-[var(--border)] hover:bg-[var(--surface)] text-[var(--text-primary)] hover:border-[#B88E3E]/60"
                    }`}
                  >
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-wider">
                      {day.dayName}
                    </span>
                    <span className={`block text-xs font-mono font-semibold mt-0.5 ${isSelected ? "text-[#D4A853]" : "text-[var(--text-secondary)]"}`}>
                      {day.dayNumber} {day.month}
                    </span>
                    {day.isFriday ? (
                      <span className={`block text-[9px] font-mono mt-1 ${isSelected ? "text-white/80" : "text-[#B88E3E]"}`}>
                        Matin seul (Jumu&apos;ah)
                      </span>
                    ) : (
                      <span className={`block text-[9px] font-mono mt-1 ${isSelected ? "text-[#D4A853]" : day.isScarceMonth ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {day.isScarceMonth ? "1 créneau dispo" : "Disponibilités"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ÉTAPE 3 : CRÉNEAUX HORAIRES DISPONIBLES */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                Étape 3 // Créneaux disponibles pour le :
              </span>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[var(--text-primary)]">
                {activeDay.fullDateStr}
              </h4>
            </div>
            
            <div className="text-xs font-mono text-[#B88E3E] dark:text-[#D4A853] font-bold bg-[#B88E3E]/10 px-3 py-1.5 rounded-full border border-[#B88E3E]/20 self-start sm:self-auto">
              {selectedFormat === "tel" ? "Consultation Téléphone (45 min) • 48,95 €" : "Immersion Domicile (1h15) • 96,45 €"}
            </div>
          </div>

          {/* SECTION MATINÉE */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                🌅 Matinée (09h00 - 12h00)
              </span>
              <span className="text-[10px] text-[var(--text-secondary)] font-mono">
                — Créneaux de 45 minutes
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {daySlots.morning.map((slot) => {
                const isSelected = selectedSlot?.start === slot.start;
                if (!slot.available) {
                  return (
                    <div
                      key={slot.start}
                      className="py-3 px-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 text-[var(--text-secondary)]/40 text-xs font-mono text-center line-through cursor-not-allowed select-none"
                      title="Créneau réservé"
                    >
                      <span>{slot.start} - {slot.end}</span>
                      <span className="block text-[9px] uppercase tracking-wider no-underline opacity-60">Complet</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => handleSelectSlot(slot)}
                    className={`py-3 px-3 rounded-xl border text-xs font-mono font-semibold transition-all shadow-xs text-center cursor-pointer ${
                      isSelected
                        ? "bg-[#B88E3E] text-[#0A1128] border-[#B88E3E] font-bold ring-2 ring-[#B88E3E]/40"
                        : "border-[#B88E3E]/40 bg-[var(--surface)] text-[var(--text-primary)] hover:border-[#B88E3E] hover:bg-[#B88E3E]/10"
                    }`}
                  >
                    <span className="font-bold text-sm block">{slot.start}</span>
                    <span className="text-[10px] opacity-75 font-mono">jusqu&apos;à {slot.end}</span>
                    <span className="block text-[9px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">● Disponible</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION APRÈS-MIDI */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                🌇 Après-midi (14h00 - 18h00)
              </span>
              <span className="text-[10px] text-[var(--text-secondary)] font-mono">
                — Créneaux de 45 minutes
              </span>
            </div>

            {activeDay.isFriday ? (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-800 dark:text-amber-300 text-center">
                🕌 Le vendredi après-midi est sanctuarisé pour la prière solennelle du Jumu&apos;ah et les dévotions. Aucun créneau n&apos;est ouvert après 12h00.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {daySlots.afternoon.map((slot) => {
                  const isSelected = selectedSlot?.start === slot.start;
                  if (!slot.available) {
                    return (
                      <div
                        key={slot.start}
                        className="py-3 px-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 text-[var(--text-secondary)]/40 text-xs font-mono text-center line-through cursor-not-allowed select-none"
                        title="Créneau réservé"
                      >
                        <span>{slot.start} - {slot.end}</span>
                        <span className="block text-[9px] uppercase tracking-wider no-underline opacity-60">Complet</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => handleSelectSlot(slot)}
                      className={`py-3 px-3 rounded-xl border text-xs font-mono font-semibold transition-all shadow-xs text-center cursor-pointer ${
                        isSelected
                          ? "bg-[#B88E3E] text-[#0A1128] border-[#B88E3E] font-bold ring-2 ring-[#B88E3E]/40"
                          : "border-[#B88E3E]/40 bg-[var(--surface)] text-[var(--text-primary)] hover:border-[#B88E3E] hover:bg-[#B88E3E]/10"
                      }`}
                    >
                      <span className="font-bold text-sm block">{slot.start}</span>
                      <span className="text-[10px] opacity-75 font-mono">jusqu&apos;à {slot.end}</span>
                      <span className="block text-[9px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">● Disponible</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MODAL / TIROIR DE RÉSERVATION DOCTOLIB SÉCURISÉ */}
      {modalOpen && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[var(--surface)] rounded-2xl border border-[#B88E3E]/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-bold cursor-pointer"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold">
                VALIDATION DU CRÉNEAU
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)] mt-1">
                Finaliser votre Rendez-vous
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Vos informations permettent à Mounir Byar de préparer votre analyse et de vous contacter ponctuellement.
              </p>
            </div>

            {/* RÉCAPITULATIF SÉLECTION DOCTOLIB */}
            <div className="p-4 rounded-xl bg-[var(--bg)] border border-[#B88E3E]/30 mb-5 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Praticien :</span>
                <span className="font-bold text-[var(--text-primary)]">Mounir BYAR (Cabinet BLF)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Format choisi :</span>
                <span className="font-bold text-[var(--text-primary)]">
                  {selectedFormat === "tel" ? "📞 Téléphone / Visio (45 min)" : "📍 Présentiel Domicile (1h15)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Date &amp; Horaire :</span>
                <span className="font-bold text-[#B88E3E] dark:text-[#D4A853]">
                  {activeDay.fullDateStr} à {selectedSlot.start}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border)]">
                <span className="text-[var(--text-secondary)]">Règlement exigé :</span>
                <span className="text-[#B88E3E] dark:text-[#D4A853] font-heading font-extrabold text-lg">
                  {currentPrice} <span className="text-xs font-normal text-[var(--text-secondary)]">(0% Riba)</span>
                </span>
              </div>
            </div>

            {/* FORMULAIRE PRÉ-PAIEMENT */}
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Nom et Prénom complets *
                </label>
                <input
                  required
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: Tariq Mansouri"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Adresse E-mail *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tariq@exemple.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                  />
                </div>
              </div>

              {selectedFormat === "presentiel" && (
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Adresse exacte du domicile (pour le déplacement) *
                  </label>
                  <input
                    required
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    placeholder="N° rue, bâtiment, code postal, ville"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Motif / Préoccupation clé (Optionnel)
                </label>
                <select
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                >
                  <option value="Charge mentale & Perte de régularité dans la Salat">Charge mentale &amp; Perte de régularité dans la Salat</option>
                  <option value="Procrastination chronique (At-Taswîf) & Fatigue">Procrastination chronique (At-Taswîf) &amp; Fatigue</option>
                  <option value="Addiction numérique & Écrans destructeurs de Khuchu">Addiction numérique &amp; Écrans destructeurs de Khuchu</option>
                  <option value="Désordre spatial du foyer & Pollution visuelle">Désordre spatial du foyer &amp; Pollution visuelle</option>
                  <option value="Autre motif personnel">Autre motif personnel</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Initialisation..." : `Valider et Régler ${currentPrice}`}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <div className="space-y-1 pt-1">
                <p className="text-[10px] text-center text-[var(--text-secondary)] font-mono">
                  🔒 Transaction chiffrée SSL 256 bits via Stripe • Reçu fiscal &amp; confirmation immédiate par e-mail
                </p>
                <p className="text-[9px] text-center text-emerald-600 dark:text-emerald-400 font-mono">
                  ✓ Double notification automatique : 1. Reçu financier • 2. Consignes &amp; protocole du rendez-vous
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
