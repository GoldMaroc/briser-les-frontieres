"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Configuration des mois disponibles (Novembre 2026 à Février 2027)
const MONTHS_DATA = [
  {
    key: "nov-2026",
    label: "novembre 2026",
    year: 2026,
    monthIdx: 10, // 0-based
    daysInMonth: 30,
    firstDayOffset: 6, // 1er nov 2026 = Dimanche (si semaine commence Lun: 6)
    fillRate: 73,
    // En Nov/Dec : rareté (~73% complets, seuls quelques jours disponibles)
    availableDays: [4, 10, 16, 24, 27],
  },
  {
    key: "dec-2026",
    label: "décembre 2026",
    year: 2026,
    monthIdx: 11,
    daysInMonth: 31,
    firstDayOffset: 1, // 1er déc 2026 = Mardi (offset 1)
    fillRate: 73,
    availableDays: [1, 3, 4, 8, 9, 10, 11, 15, 17],
  },
  {
    key: "jan-2027",
    label: "janvier 2027",
    year: 2027,
    monthIdx: 0,
    daysInMonth: 31,
    firstDayOffset: 4, // 1er janv 2027 = Vendredi (offset 4)
    fillRate: 25,
    // En Janvier & Février : large ouverture des créneaux (presque tous les jours ouvrés)
    availableDays: [4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30],
  },
  {
    key: "feb-2027",
    label: "février 2027",
    year: 2027,
    monthIdx: 1,
    daysInMonth: 28,
    firstDayOffset: 0, // 1er fév 2027 = Lundi (offset 0)
    fillRate: 20,
    availableDays: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27],
  },
];

// Créneaux horaires
const SLOTS_MORNING = ["09:30", "11:00", "12:00"];
const SLOTS_AFTERNOON = ["13:15", "14:30", "16:00", "17:30"];

export default function AgendaDoctolib() {
  const router = useRouter();

  // Écran : "select-event" | "calendar" | "form"
  const [screen, setScreen] = useState<"calendar" | "form">("calendar");

  // Format choisi
  const [format, setFormat] = useState<"tel" | "presentiel">("tel");

  // Mois actif dans Cal.com (par défaut Janvier 2027 ou Novembre 2026)
  const [monthIndex, setMonthIndex] = useState(0); // 0 = Nov, 1 = Déc, 2 = Jan, 3 = Fév
  const currentMonth = MONTHS_DATA[monthIndex] || MONTHS_DATA[0];

  // Jour sélectionné dans le mois
  const [selectedDay, setSelectedDay] = useState<number>(24);

  // Créneau sélectionné
  const [selectedSlot, setSelectedSlot] = useState<string>("12:00");

  // Format horaire 24h / 12h
  const [timeFormat, setTimeFormat] = useState<"24h" | "12h">("24h");

  // Formulaire de réservation
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [indicatif, setIndicatif] = useState("+33");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [motif, setMotif] = useState("Charge mentale, anxiété & perte de Khuchu");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Prix & durée
  const priceFormatted = format === "tel" ? "48,95 €" : "96,45 €";
  const durationLabel = format === "tel" ? "45 min" : "1h 15min";
  const eventTitle =
    format === "tel"
      ? "Première consultation : Diagnostic & Déblocage"
      : "Audit In Situ & Sanctuarisation à Domicile";
  const eventLocation =
    format === "tel" ? "Téléphone / Google Meet" : "Déplacement In Situ à votre domicile";

  // Nom des jours de la semaine
  const dayNamesShort = ["LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM.", "DIM."];

  // Calcul du jour de la semaine pour le jour sélectionné
  const selectedDayDateObj = useMemo(() => {
    return new Date(currentMonth.year, currentMonth.monthIdx, selectedDay);
  }, [currentMonth, selectedDay]);

  const selectedDayFormatted = useMemo(() => {
    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const months = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    const dName = days[selectedDayDateObj.getDay()];
    const mName = months[selectedDayDateObj.getMonth()];
    return `${dName} ${selectedDay} ${mName} ${selectedDayDateObj.getFullYear()}`;
  }, [selectedDayDateObj, selectedDay]);

  const shortDayLabel = useMemo(() => {
    const daysShort = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
    const dName = daysShort[selectedDayDateObj.getDay()];
    return `${dName} ${selectedDay}`;
  }, [selectedDayDateObj, selectedDay]);

  const isFriday = selectedDayDateObj.getDay() === 5;

  // Créneaux disponibles pour le jour
  const availableSlotsForDay = useMemo(() => {
    if (isFriday) {
      // Vendredi : matinée ouverte, après-midi sanctuarisé pour Jumu'ah (fermé après 12h00)
      return SLOTS_MORNING;
    }
    // Si mois saturé (Nov/Dec) : 2 ou 3 créneaux max
    if (currentMonth.fillRate >= 70) {
      return selectedDay % 2 === 0
        ? ["12:00", "13:15", "16:00"]
        : ["14:30", "16:00", "17:30"];
    }
    // Janvier/Février : tous les créneaux disponibles
    return [...SLOTS_MORNING, ...SLOTS_AFTERNOON];
  }, [isFriday, currentMonth, selectedDay]);

  // Passage à la réservation
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !telephone) return;

    setIsSubmitting(true);
    const fullPhone = `${indicatif} ${telephone}`.trim();

    try {
      // Enregistrement de la tentative dans la base (trace d'abandon si paiement non finalisé)
      await fetch("/api/rendez-vous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typeRdv: format === "tel" ? "telephone" : "presentiel",
          format,
          dateRdv: selectedDayFormatted,
          timeSlot: selectedSlot,
          creneau: selectedSlot,
          nom,
          email,
          telephone: fullPhone,
          adresse: format === "presentiel" ? adresse : undefined,
          motif: motif + (notes ? ` | Notes : ${notes}` : ""),
          statut: "abandon_avant_paiement",
          motifAbandon: "Tunnel Cal.com complété - En attente de règlement bancaire sur Stripe",
        }),
      });
    } catch (err) {
      console.warn("Log tentative RDV :", err);
    }

    const productId = format === "tel" ? "rdv-tel" : "rdv-presentiel";
    const params = new URLSearchParams({
      product: productId,
      date: selectedDayFormatted,
      creneau: selectedSlot,
      nom,
      email,
      telephone: fullPhone,
      ...(format === "presentiel" ? { adresse } : {}),
    });

    router.push(`/paiement?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      {/* SÉLECTEUR DE TYPE DE CONSULTATION (STYLE CAL.COM CARD) */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#087B53]/30 shrink-0 bg-[#0D1B2A] flex items-center justify-center font-heading font-extrabold text-[#E2BA6E] text-base select-none shadow-xs">
              {!imgError ? (
                <Image
                  src="/images/portrait-mounir.jpg"
                  alt="Mounir Byar"
                  fill
                  className="object-cover object-top"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <span>MB</span>
              )}
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[var(--text-primary)]">
                Mounir Byar
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Cabinet Briser les Frontières • Ingénierie de la Souveraineté
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-[#087B53] dark:text-[#34D399] bg-[#087B53]/10 px-3 py-1.5 rounded-full font-semibold self-start sm:self-auto border border-[#087B53]/20">
            ✓ 0% Riba • Garantie de Sérieux
          </div>
        </div>

        {/* 2 CARTES DE PRESTATION (CAL.COM SELECTION) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => {
              setFormat("tel");
              setScreen("calendar");
            }}
            className={`p-4 rounded-xl text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
              format === "tel"
                ? "bg-[var(--surface-elevated)] border-[#087B53] dark:border-[#34D399] ring-2 ring-[#087B53]/15 shadow-sm"
                : "bg-[var(--bg)]/50 border-[var(--border)] hover:border-[#087B53]/40"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-sm text-[var(--text-primary)]">
                  Première consultation
                </span>
                <span className="font-mono font-extrabold text-sm text-[#087B53] dark:text-[#34D399]">
                  48,95 €
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Consultation de déblocage par téléphone ou visio. Analyse de la charge allostatique et plan d&apos;urgence.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
              <span>⏱ 45m • 📞 Téléphone / Visio</span>
              <span className={format === "tel" ? "text-[#087B53] dark:text-[#34D399] font-bold" : ""}>
                {format === "tel" ? "● Actif" : "Sélectionner →"}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormat("presentiel");
              setScreen("calendar");
            }}
            className={`p-4 rounded-xl text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
              format === "presentiel"
                ? "bg-[var(--surface-elevated)] border-[#087B53] dark:border-[#34D399] ring-2 ring-[#087B53]/15 shadow-sm"
                : "bg-[var(--bg)]/50 border-[var(--border)] hover:border-[#087B53]/40"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-sm text-[var(--text-primary)]">
                  Audit In Situ à Domicile
                </span>
                <span className="font-mono font-extrabold text-sm text-[#087B53] dark:text-[#34D399]">
                  96,45 €
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Mounir Byar se déplace personnellement à votre domicile (1h15). Sanctuarisation Tahara 360° du sanctuaire domestique.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
              <span>⏱ 1h 15m • 📍 À Domicile</span>
              <span className={format === "presentiel" ? "text-[#087B53] dark:text-[#34D399] font-bold" : ""}>
                {format === "presentiel" ? "● Actif" : "Sélectionner →"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          CALENDRIER REPRODUISANT CAL.COM À LA PERFECTION (3 COLONNES)
          ═════════════════════════════════════════════════════════════════ */}
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden">
        
        {screen === "calendar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            
            {/* COLONNE 1 : DÉTAILS DE LA CONSULTATION (GAUCHE - ~33%) */}
            <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#087B53]/30 shrink-0 bg-[#0D1B2A] flex items-center justify-center font-heading font-extrabold text-[#E2BA6E] text-sm select-none shadow-xs">
                    {!imgError ? (
                      <Image
                        src="/images/portrait-mounir.jpg"
                        alt="Mounir Byar"
                        fill
                        className="object-cover object-top"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <span>MB</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-secondary)] block font-sans">
                      Mounir Byar
                    </span>
                    <h4 className="font-heading font-extrabold text-lg text-[var(--text-primary)] leading-tight">
                      {eventTitle}
                    </h4>
                  </div>
                </div>

                {/* TEXTE D'ENGAGEMENT CAL.COM */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans mb-6">
                  Suite à de nombreux rendez-vous non honorés, le paiement de la consultation est maintenant demandé lors de la réservation afin de garantir votre niveau d&apos;engagement et sanctuariser ce temps.
                  <br /><br />
                  <strong className="text-[var(--text-primary)]">En cas d&apos;empêchement</strong> notifié 24h à l&apos;avance, le report ou le remboursement intégral vous sera adressé.
                </p>

                {/* LIGNES D'INFOS AVEC ICÔNES CAL.COM */}
                <div className="space-y-3 text-xs font-sans text-[var(--text-secondary)] pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[var(--text-primary)]">⏱</span>
                    <span className="font-medium text-[var(--text-primary)]">{durationLabel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[var(--text-primary)]">📞</span>
                    <span>{eventLocation}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[var(--text-primary)]">💳</span>
                    <span className="font-mono font-bold text-[var(--text-primary)]">{priceFormatted}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[var(--text-primary)]">🌐</span>
                    <span>Europe/Paris (fuseau horaire)</span>
                  </div>
                </div>
              </div>

              {/* JAUGE DE SATURATION DISCRÈTE */}
              <div className="pt-4 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-secondary)]">
                <span className="text-[#087B53] dark:text-[#34D399] font-bold">
                  ● {currentMonth.fillRate >= 70 ? "Forte affluence (~73% réservé)" : "Session ouverte"}
                </span>
                <span className="block mt-0.5 opacity-80">
                  {currentMonth.label}
                </span>
              </div>
            </div>

            {/* COLONNE 2 : LE CALENDRIER MENSUEL INTERACTIF (CENTRE - ~42%) */}
            <div className="lg:col-span-5 p-6 sm:p-7 space-y-5">
              {/* EN-TÊTE DU MOIS AVEC FLÈCHES < > */}
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-extrabold text-base text-[var(--text-primary)] capitalize">
                  {currentMonth.label}
                </h4>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (monthIndex > 0) {
                        setMonthIndex(monthIndex - 1);
                        setSelectedDay(MONTHS_DATA[monthIndex - 1].availableDays[0] || 1);
                      }
                    }}
                    disabled={monthIndex === 0}
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] disabled:opacity-30 cursor-pointer"
                    aria-label="Mois précédent"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (monthIndex < MONTHS_DATA.length - 1) {
                        setMonthIndex(monthIndex + 1);
                        setSelectedDay(MONTHS_DATA[monthIndex + 1].availableDays[0] || 1);
                      }
                    }}
                    disabled={monthIndex >= MONTHS_DATA.length - 1}
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] disabled:opacity-30 cursor-pointer"
                    aria-label="Mois suivant"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* JOURS DE LA SEMAINE (LUN. MAR. MER...) */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {dayNamesShort.map((dName) => (
                  <span
                    key={dName}
                    className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider py-1"
                  >
                    {dName}
                  </span>
                ))}
              </div>

              {/* GRILLE DES JOURS DU MOIS (STYLE CAL.COM EXACT) */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Cases vides pour décaler le 1er jour */}
                {Array.from({ length: currentMonth.firstDayOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10" />
                ))}

                {/* Numéros du mois (1 à daysInMonth) */}
                {Array.from({ length: currentMonth.daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isAvailable = currentMonth.availableDays.includes(dayNum);
                  const isSelected = selectedDay === dayNum;

                  if (!isAvailable) {
                    return (
                      <div
                        key={dayNum}
                        className="h-10 flex items-center justify-center text-xs font-sans text-[var(--text-secondary)]/40 select-none"
                      >
                        {dayNum}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => {
                        setSelectedDay(dayNum);
                      }}
                      className={`h-10 w-full rounded-xl text-xs font-sans font-semibold transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? "bg-[#C25E5E] dark:bg-[#C25E5E] text-white font-bold shadow-md ring-2 ring-[#C25E5E]/30"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-zinc-100"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* LÉGENDE FRATERNELLE */}
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                <span>● Cases grisées = jours ouverts</span>
                <span className="text-[#C25E5E] font-bold">● Sélection = actif</span>
              </div>
            </div>

            {/* COLONNE 3 : CRÉNEAUX HORAIRES DU JOUR (DROITE - ~25%) */}
            <div className="lg:col-span-3 p-6 sm:p-7 space-y-4 bg-[var(--surface)]/30">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <span className="font-heading font-extrabold text-sm text-[var(--text-primary)] capitalize">
                  {shortDayLabel}
                </span>

                <div className="inline-flex rounded-lg border border-[var(--border)] p-0.5 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setTimeFormat("12h")}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      timeFormat === "12h" ? "bg-[var(--surface-elevated)] font-bold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    12 h
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFormat("24h")}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      timeFormat === "24h" ? "bg-[var(--surface-elevated)] font-bold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    24 h
                  </button>
                </div>
              </div>

              {/* AVERTISSEMENT JUMU'AH LE VENDREDI */}
              {isFriday && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-800 dark:text-amber-300">
                  🕌 Vendredi : créneaux du matin uniquement (sanctuaire de Jumu&apos;ah l&apos;après-midi).
                </div>
              )}

              {/* LISTE DES BOUTONS CRÉNEAUX STYLE CAL.COM EXACT */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {availableSlotsForDay.map((slot) => {
                  const isSlotActive = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setScreen("form");
                      }}
                      className={`w-full py-3 px-4 rounded-xl border text-center text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSlotActive
                          ? "border-[#087B53] dark:border-[#34D399] bg-[#087B53]/10 text-[#087B53] dark:text-[#34D399] shadow-xs ring-1 ring-[#087B53]/20"
                          : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--text-primary)] text-[var(--text-primary)]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] text-center text-[var(--text-secondary)] font-mono pt-2">
                Cliquez sur un horaire pour passer aux coordonnées.
              </p>
            </div>

          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════
             ÉTAPE DU FORMULAIRE DE RÉSERVATION (STYLE CAL.COM EXACT)
             ═══════════════════════════════════════════════════════════════ */
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] p-6 sm:p-10">
            
            {/* RÉCAPITULATIF GAUCHE (STYLE CAL.COM IMAGE 7) */}
            <div className="lg:col-span-5 pr-0 lg:pr-8 pb-8 lg:pb-0 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#087B53]/30 shrink-0 bg-[#0D1B2A] flex items-center justify-center font-heading font-extrabold text-[#E2BA6E] text-base select-none shadow-xs">
                  {!imgError ? (
                    <Image
                      src="/images/portrait-mounir.jpg"
                      alt="Mounir Byar"
                      fill
                      className="object-cover object-top"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span>MB</span>
                  )}
                </div>
                <div>
                  <span className="text-xs text-[var(--text-secondary)] block font-sans">
                    Mounir Byar
                  </span>
                  <h4 className="font-heading font-extrabold text-xl text-[var(--text-primary)] leading-tight">
                    {eventTitle}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                Suite à de nombreux rendez-vous de première consultation non honorés, le paiement de la consultation est maintenant demandé lors de la réservation afin de garantir votre niveau d&apos;engagement et de sérieux.
                <br /><br />
                <strong className="text-[var(--text-primary)]">En cas d&apos;empêchement</strong>, le remboursement intégral vous sera adressé.
              </p>

              <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-2.5 text-xs font-sans text-[var(--text-primary)]">
                <div className="flex items-center gap-2.5 font-bold text-[#C25E5E]">
                  <span>📅</span>
                  <span className="capitalize">{selectedDayFormatted}</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono">
                  <span>⏰</span>
                  <span>{selectedSlot} ({durationLabel})</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span>📞</span>
                  <span>{eventLocation}</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold text-[#087B53] dark:text-[#34D399]">
                  <span>💳</span>
                  <span>{priceFormatted} (Règlement sécurisé Stripe)</span>
                </div>
              </div>
            </div>

            {/* FORMULAIRE DROITE (STYLE CAL.COM IMAGE 7) */}
            <div className="lg:col-span-7 pl-0 lg:pl-8 pt-8 lg:pt-0">
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--text-primary)] mb-1">
                    Votre nom *
                  </label>
                  <input
                    required
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Tariq Mansouri"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#087B53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--text-primary)] mb-1">
                    Adresse e-mail *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: tariq@exemple.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#087B53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--text-primary)] mb-1">
                    Numéro de téléphone *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={indicatif}
                      onChange={(e) => setIndicatif(e.target.value)}
                      className="px-2.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] font-mono"
                    >
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+212">🇲🇦 +212</option>
                      <option value="+213">🇩🇿 +213</option>
                      <option value="+216">🇹🇳 +216</option>
                      <option value="+1">🇨🇦 +1</option>
                    </select>
                    <input
                      required
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="flex-1 px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#087B53]"
                    />
                  </div>
                </div>

                {format === "presentiel" && (
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--text-primary)] mb-1">
                      Adresse complète du domicile (pour le déplacement) *
                    </label>
                    <input
                      required
                      type="text"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      placeholder="N° rue, bâtiment, code postal, ville"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#087B53]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--text-primary)] mb-1">
                    Motif de consultation *
                  </label>
                  <select
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#087B53]"
                  >
                    <option value="Charge mentale, anxiété & perte de Khuchu">Charge mentale, anxiété &amp; perte de Khuchu</option>
                    <option value="Surmenage, fatigue décisionnelle & burn-out">Surmenage, fatigue décisionnelle &amp; burn-out</option>
                    <option value="Procrastination chronique (At-Taswîf) & écrans">Procrastination chronique (At-Taswîf) &amp; écrans</option>
                    <option value="Perte d'alignement avec les valeurs spirituelles">Perte d&apos;alignement avec les valeurs spirituelles</option>
                    <option value="Soutien face à une épreuve (Deuil, maladie, transition)">Soutien face à une épreuve (Deuil, maladie, transition)</option>
                    <option value="Autre motif personnel">Autre motif personnel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--text-primary)] mb-1">
                    Notes supplémentaires (facultatif)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Merci de renseigner tout ce qui aidera à préparer notre rendez-vous."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#087B53]"
                  />
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] font-sans leading-relaxed pt-2">
                  Mounir Byar utilise cette interface pour planifier les consultations du Cabinet BLF. Vos données sont chiffrées et confidentielles.
                </p>

                {/* BOUTONS RETOUR & PAYER POUR RÉSERVER (STYLE CAL.COM IMAGE 7) */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setScreen("calendar")}
                    className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-xs font-sans font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    Retour
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-[#C25E5E] hover:bg-[#a84d4d] text-white text-xs font-sans font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Initialisation..." : `Payer pour réserver (${priceFormatted})`}
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* LOGO DE BAS DE PAGE STYLE CAL.COM */}
        <div className="py-3 text-center border-t border-[var(--border)] bg-[var(--surface)]/40">
          <span className="font-heading font-extrabold text-xs text-[var(--text-secondary)] tracking-tight">
            Cal.com
          </span>
        </div>

      </div>

    </div>
  );
}
