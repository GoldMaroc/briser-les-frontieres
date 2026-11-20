"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowIcon from "@/components/ui/ArrowIcon";

// Créneaux de 45 minutes précis et aérés
const SLOTS_MORNING_45 = [
  { start: "09:00", end: "09:45" },
  { start: "09:45", end: "10:30" },
  { start: "10:30", end: "11:15" },
  { start: "11:15", end: "12:00" },
];

const SLOTS_AFTERNOON_45 = [
  { start: "14:00", end: "14:45" },
  { start: "14:45", end: "15:30" },
  { start: "15:30", end: "16:15" },
  { start: "16:15", end: "17:00" },
  { start: "17:00", end: "17:45" },
];

export default function AgendaDoctolib() {
  const router = useRouter();

  // Choix du format : Téléphone 48,95 € ou Présentiel Domicile 96,45 €
  const [selectedFormat, setSelectedFormat] = useState<"tel" | "presentiel">("tel");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);

  // Formulaire rapide
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Prix en fonction du format
  const currentPrice = selectedFormat === "tel" ? "48,95 €" : "96,45 €";
  const productId = selectedFormat === "tel" ? "rdv-tel" : "rdv-presentiel";

  // Calcul des 6 jours (Lundi au Samedi)
  const weekDays = useMemo(() => {
    const days = [];
    const baseDate = new Date();
    const currentDay = baseDate.getDay();
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    baseDate.setDate(baseDate.getDate() + diffToMonday + weekOffset * 7);

    const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const monthNames = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    for (let i = 0; i < 6; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const isFriday = i === 4;
      days.push({
        dayName: dayNames[i],
        dayNumber: d.getDate(),
        month: monthNames[d.getMonth()],
        fullDateStr: `${dayNames[i]} ${d.getDate()} ${monthNames[d.getMonth()]}`,
        isFriday,
        dateObj: d,
      });
    }
    return days;
  }, [weekOffset]);

  const activeDay = weekDays[selectedDayIdx] || weekDays[0];

  const handleSelectSlot = (slot: { start: string; end: string }) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !telephone || !selectedSlot) return;

    // Envoi des paramètres vers la page de paiement sécurisé Stripe
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

      {/* CADRE ÉPURÉ SANS CHARGE COGNITIVE */}
      <div className="bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-sm overflow-hidden">
        
        {/* ÉTAPE 1 : CHOIX DU FORMAT (2 CARTES STATUTAIRES CLAIRES) */}
        <div className="p-6 sm:p-8 border-b border-[var(--border)] bg-gradient-to-r from-[var(--surface)] via-[var(--bg)] to-[var(--surface)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#B88E3E]/40 shrink-0 shadow-xs">
                <Image
                  src="/images/sanctuaire/mounir_byar_portrait.png"
                  alt="Mounir Byar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold block">
                  ÉVALUATION INDIVIDUELLE DIRECTE
                </span>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-primary)]">
                  Consultation avec Mounir Byar
                </h3>
              </div>
            </div>

            <div className="text-xs font-mono text-[#B88E3E] dark:text-[#D4A853] bg-[#B88E3E]/10 px-3 py-1.5 rounded-full font-semibold self-start sm:self-auto">
              ✓ Rendez-vous Privé &amp; Confidentiel
            </div>
          </div>

          {/* SÉLECTEUR 2 MODES DE CONSULTATION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* OPTION 1 : TÉLÉPHONE 48,95 € */}
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("tel");
                setSelectedSlot(null);
              }}
              className={`p-5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between ${
                selectedFormat === "tel"
                  ? "bg-[var(--surface)] border-[#B88E3E] dark:border-[#D4A853] shadow-md ring-2 ring-[#B88E3E]/20"
                  : "bg-[var(--surface)]/60 border-[var(--border)] hover:border-[#B88E3E] hover:bg-[var(--surface)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                    <span>📞 Par Téléphone / Visio</span>
                  </span>
                  <span className="text-base font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                    48,95 €
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Séance intensive de <strong>45 minutes</strong>. Diagnostic de votre charge allostatique, identification de vos boucles d&apos;angoisse et remise d&apos;une feuille de route immédiate.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                <span>Durée : 45 min</span>
                <span className={selectedFormat === "tel" ? "text-[#B88E3E] dark:text-[#D4A853] font-bold" : ""}>
                  {selectedFormat === "tel" ? "● Sélectionné" : "Sélectionner"}
                </span>
              </div>
            </button>

            {/* OPTION 2 : PRÉSENTIEL À DOMICILE 96,45 € */}
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("presentiel");
                setSelectedSlot(null);
              }}
              className={`p-5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between ${
                selectedFormat === "presentiel"
                  ? "bg-[var(--surface)] border-[#B88E3E] dark:border-[#D4A853] shadow-md ring-2 ring-[#B88E3E]/20"
                  : "bg-[var(--surface)]/60 border-[var(--border)] hover:border-[#B88E3E] hover:bg-[var(--surface)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                    <span>📍 En Présentiel (Déplacement à Domicile)</span>
                  </span>
                  <span className="text-base font-heading font-extrabold text-[#B88E3E] dark:text-[#D4A853]">
                    96,45 €
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong>Mounir Byar se déplace personnellement chez vous</strong> (1h15). Audit de votre environnement domestique, sanctuarisation de l&apos;espace de prière (Tahara 360°) et restructuration des 8 piliers.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                <span>Durée : 1h15 à domicile</span>
                <span className={selectedFormat === "presentiel" ? "text-[#B88E3E] dark:text-[#D4A853] font-bold" : ""}>
                  {selectedFormat === "presentiel" ? "● Sélectionné" : "Sélectionner"}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* ÉTAPE 2 : CHOIX DU JOUR (SÉLECTEUR AÉRÉ HORIZONTAL) */}
        <div className="p-6 sm:p-8 border-b border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              1. Sélectionnez votre date :
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWeekOffset((p) => Math.max(0, p - 1))}
                disabled={weekOffset === 0}
                className="px-3 py-1 rounded-lg border border-[var(--border)] text-xs font-mono disabled:opacity-30 hover:border-[#B88E3E]"
              >
                ← Semaine préc.
              </button>
              <button
                type="button"
                onClick={() => setWeekOffset((p) => p + 1)}
                className="px-3 py-1 rounded-lg border border-[var(--border)] text-xs font-mono hover:border-[#B88E3E]"
              >
                Semaine suiv. →
              </button>
            </div>
          </div>

          {/* PILULES DES JOURS DE LA SEMAINE */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-3">
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
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? "bg-[#0A1128] text-white border-[#B88E3E] shadow-sm"
                      : "bg-[var(--bg)]/60 border-[var(--border)] hover:bg-[var(--surface)] text-[var(--text-primary)]"
                  }`}
                >
                  <span className="block text-[11px] font-heading font-bold uppercase tracking-wider">
                    {day.dayName}
                  </span>
                  <span className={`block text-xs font-mono font-semibold mt-0.5 ${isSelected ? "text-[#D4A853]" : "text-[var(--text-secondary)]"}`}>
                    {day.dayNumber} {day.month}
                  </span>
                  {day.isFriday && (
                    <span className={`block text-[9px] font-mono mt-1 ${isSelected ? "text-white/70" : "text-[#B88E3E]"}`}>
                      Matin seul
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ÉTAPE 3 : CRÉNEAUX DISPONIBLES (AÉRÉS, PAS DE SURCHARGE VISUELLE) */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              2. Choisissez un créneau pour le <strong>{activeDay.fullDateStr}</strong> :
            </span>
            <span className="text-xs font-mono text-[#B88E3E] dark:text-[#D4A853] font-bold">
              Séance 45 min • {currentPrice}
            </span>
          </div>

          <div className="space-y-4">
            {/* CRÉNEAUX DU MATIN */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                Matinée (09h00 - 12h00)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SLOTS_MORNING_45.map((slot) => {
                  return (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => handleSelectSlot(slot)}
                      className="py-3 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[#B88E3E] hover:text-[#0A1128] dark:hover:bg-[#D4A853] hover:border-[#B88E3E] text-[var(--text-primary)] text-xs font-mono font-semibold transition-all shadow-2xs text-center group cursor-pointer"
                    >
                      <span className="font-bold">{slot.start}</span>
                      <span className="text-[10px] opacity-70 ml-1">({slot.end})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CRÉNEAUX DE L'APRÈS-MIDI (SAUF VENDREDI FERMÉ POUR JUMU'AH) */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                Après-midi (14h00 - 18h00)
              </span>
              {activeDay.isFriday ? (
                <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-mono text-[#B88E3E] text-center">
                  Vendredi après-midi réservé à la prière du Jumu&apos;ah • Aucun créneau disponible après 12h00.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {SLOTS_AFTERNOON_45.map((slot) => {
                    return (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() => handleSelectSlot(slot)}
                        className="py-3 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[#B88E3E] hover:text-[#0A1128] dark:hover:bg-[#D4A853] hover:border-[#B88E3E] text-[var(--text-primary)] text-xs font-mono font-semibold transition-all shadow-2xs text-center group cursor-pointer"
                      >
                        <span className="font-bold">{slot.start}</span>
                        <span className="text-[10px] opacity-70 ml-1">({slot.end})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* MODAL DE RÉSERVATION AVEC PAIEMENT OBLIGATOIRE (48,95 € ou 96,45 €) */}
      {modalOpen && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-bold cursor-pointer"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B88E3E] dark:text-[#D4A853] font-bold">
                VALIDATION &amp; PAIEMENT SÉCURISÉ
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)] mt-1">
                Confirmer votre Consultation
              </h3>
            </div>

            {/* RÉCAPITULATIF SÉLECTION */}
            <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] mb-6 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Format :</span>
                <span className="font-bold text-[var(--text-primary)]">
                  {selectedFormat === "tel" ? "Téléphone / Visio (45 min)" : "Présentiel à Domicile (1h15)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Date &amp; Heure :</span>
                <span className="font-bold text-[#B88E3E] dark:text-[#D4A853]">
                  {activeDay.fullDateStr} ({selectedSlot.start} - {selectedSlot.end})
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[var(--border)]">
                <span className="text-[var(--text-secondary)]">Tarif Ferme :</span>
                <span className="text-[#B88E3E] dark:text-[#D4A853] font-heading font-extrabold text-lg">
                  {currentPrice}
                </span>
              </div>
            </div>

            {/* FORMULAIRE DIRECT */}
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Nom et Prénom *
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

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Adresse E-mail *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: tariq@exemple.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Téléphone (pour vous joindre au créneau) *
                </label>
                <input
                  required
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Ex: 06 12 34 56 78"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                />
              </div>

              {selectedFormat === "presentiel" && (
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Adresse complète du domicile (pour le déplacement de Mounir Byar) *
                  </label>
                  <input
                    required
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    placeholder="Numéro, rue, code postal, ville"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-95"
              >
                <span>Régler {currentPrice} et Verrouiller le Créneau</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[var(--text-secondary)] font-mono">
                🔒 Paiement 100% sécurisé via Stripe • Confirmation immédiate par e-mail
              </p>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
