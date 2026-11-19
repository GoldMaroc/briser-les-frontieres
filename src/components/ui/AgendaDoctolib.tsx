"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DaySchedule {
  date: Date;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isFriday: boolean;
  isSunday: boolean;
  slots: string[];
}

export default function AgendaDoctolib() {
  // Modalité de rendez-vous : Téléphonique vs Présentiel
  const [meetingType, setMeetingType] = useState<"telephone" | "presentiel">("telephone");

  // Motif de consultation
  const [motif, setMotif] = useState<string>("Audit Initial & Clarté Salât (30 min - Offert)");

  // Date et créneau sélectionnés
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // État du formulaire client
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [error, setError] = useState("");

  // Décalage de la semaine affichée
  const [weekOffset, setWeekOffset] = useState(0);

  // Générer dynamiquement les jours de la semaine courante/prochaine
  const weekDays = useMemo(() => {
    const days: DaySchedule[] = [];
    const today = new Date();
    
    const currentDay = today.getDay();
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const baseMonday = new Date(today);
    baseMonday.setDate(today.getDate() + distanceToMonday + weekOffset * 7);

    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const monthNames = [
      "Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin",
      "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."
    ];

    for (let i = 0; i < 6; i++) {
      const d = new Date(baseMonday);
      d.setDate(baseMonday.getDate() + i);

      const isFriday = d.getDay() === 5;
      const isSunday = d.getDay() === 0;

      let slots: string[] = [];
      if (!isSunday) {
        if (isFriday) {
          // Vendredi de 9h à 12h uniquement (Salât al-Jumu'ah)
          slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
        } else {
          // Lundi à Samedi : 9h00 à 18h00
          slots = [
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
          ];
        }
      }

      days.push({
        date: d,
        dayName: dayNames[d.getDay()],
        dayNumber: d.getDate(),
        monthName: monthNames[d.getMonth()],
        isFriday,
        isSunday,
        slots,
      });
    }

    return days;
  }, [weekOffset]);

  const handleSelectSlot = (dateStr: string, slotStr: string) => {
    setSelectedDate(dateStr);
    setSelectedSlot(slotStr);
    setError("");
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !nom || !telephone || !email) {
      setError("Veuillez renseigner tous les champs obligatoires (*).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/rendez-vous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typeRdv: meetingType,
          motif,
          date: selectedDate,
          timeSlot: selectedSlot,
          nom,
          prenom,
          telephone,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConfirmedBooking(result.rdv);
      } else {
        setError(result.message || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch {
      setError("Impossible de joindre le serveur de prise de rendez-vous.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id="agenda" 
      data-cursor="view" 
      data-cursor-text="AGENDA ✦"
      className="w-full max-w-5xl mx-auto p-6 sm:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl text-white transition-all duration-300"
    >
      
      {/* En-tête de l'agenda Doctolib KÖM Style */}
      <div className="border-b border-white/10 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF758C] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              PRISE DE RENDEZ-VOUS EN LIGNE • AGENDA OFFICIEL
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            ↗ Agenda des Consultations Mounir Byar
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-1 font-sans">
            Du lundi au samedi (9h00–18h00) • Vendredi matin uniquement (9h00–12h00) • Dimanche fermé.
          </p>
        </div>

        {/* Sélecteur de modalité : Téléphonique vs Présentiel */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 self-start md:self-auto">
          <button
            type="button"
            data-cursor="pointer"
            onClick={() => setMeetingType("telephone")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              meetingType === "telephone"
                ? "bg-white text-black shadow-md font-extrabold"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span>📞 Téléphonique</span>
          </button>
          <button
            type="button"
            data-cursor="pointer"
            onClick={() => setMeetingType("presentiel")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              meetingType === "presentiel"
                ? "bg-white text-black shadow-md font-extrabold"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span>📍 Présentiel (Reims / Paris)</span>
          </button>
        </div>
      </div>

      {/* Si rendez-vous déjà confirmé */}
      {confirmedBooking ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-8 p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-[#10B981]/50 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#10B981] text-black flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
            ✓
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#10B981] font-bold block">
              CONFIRMATION IMMÉDIATE • {confirmedBooking.id}
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Votre rendez-vous est confirmé avec succès !
            </h3>
            <p className="text-sm text-white/60 max-w-lg mx-auto">
              Un accusé de réception a été envoyé pour <strong>{confirmedBooking.client.prenom} {confirmedBooking.client.nom}</strong>.
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm text-left space-y-3 font-sans text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Type de consultation</span>
              <span className="font-bold text-white">
                {confirmedBooking.typeRdv === "telephone" ? "📞 Appel Téléphonique direct" : "📍 Cabinet Présentiel (Reims / Paris)"}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Date & Heure</span>
              <span className="font-bold text-[#FF758C]">
                {confirmedBooking.dateRdv} à {confirmedBooking.timeSlot}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Motif sélectionné</span>
              <span className="font-medium text-white">{confirmedBooking.motif}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Numéro de rappel</span>
              <span className="font-mono font-bold text-white">{confirmedBooking.client.telephone}</span>
            </div>
          </div>

          <p className="text-xs text-white/40 max-w-md mx-auto leading-relaxed">
            Mounir Byar ou son secrétariat prendra directement contact avec vous à l&apos;heure convenue.
          </p>

          <button
            onClick={() => {
              setConfirmedBooking(null);
              setSelectedDate(null);
              setSelectedSlot(null);
            }}
            data-cursor="pointer"
            className="px-6 py-3 rounded-full bg-white text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
          >
            Prendre un autre rendez-vous
          </button>
        </motion.div>
      ) : (
        <div className="pt-6 sm:pt-8 space-y-8">
          
          {/* 1. Sélection du motif */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/50 mb-3">
              1. Choisissez le motif de votre consultation :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Audit Initial & Clarté Salât", desc: "30 min • Gratuit • Diagnostic de vos blocages", time: "30 min" },
                { label: "Consultation Stratégique Neuro-Cognitive", desc: "45 min • Diagnostic approfondi du cortisol et charge mentale", time: "45 min" },
                { label: "Entretien d'Admission Protocole 9 Mois", desc: "60 min • Compagnonnage d'élite sur-mesure", time: "60 min" },
              ].map((m) => (
                <button
                  key={m.label}
                  type="button"
                  data-cursor="pointer"
                  onClick={() => setMotif(m.label)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:-translate-y-0.5 ${
                    motif === m.label
                      ? "border-[#FF758C] bg-white/[0.06] shadow-sm ring-1 ring-[#FF758C]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-xs sm:text-sm text-white">{m.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-semibold">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Grille Calendrier et Créneaux façon Doctolib */}
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-white/50">
                2. Choisissez votre jour et créneau horaire :
              </label>

              {/* Navigation de semaine */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-cursor="pointer"
                  disabled={weekOffset <= 0}
                  onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer text-white"
                >
                  ← Semaine précédente
                </button>
                <button
                  type="button"
                  data-cursor="pointer"
                  onClick={() => setWeekOffset(prev => prev + 1)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono hover:bg-white/10 transition-colors cursor-pointer text-white"
                >
                  Semaine suivante →
                </button>
              </div>
            </div>

            {/* Grille des 6 colonnes de jours (Doctolib UI) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {weekDays.map((day) => {
                const dateKey = `${day.dayName} ${day.dayNumber} ${day.monthName}`;

                return (
                  <div 
                    key={dateKey} 
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                  >
                    {/* En-tête du jour */}
                    <div className={`p-3 text-center border-b border-white/10 ${
                      day.isFriday ? "bg-[#FF758C]/15" : "bg-white/[0.04]"
                    }`}>
                      <span className="font-heading font-bold text-xs uppercase block text-white/70">
                        {day.dayName}
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        {day.dayNumber} {day.monthName}
                      </span>
                      {day.isFriday && (
                        <span className="text-[9px] font-mono text-[#FF758C] font-bold block mt-0.5">
                          Jumu&apos;ah (9h–12h)
                        </span>
                      )}
                    </div>

                    {/* Liste des créneaux horaires */}
                    <div className="p-2 space-y-1.5 max-h-72 overflow-y-auto">
                      {day.slots.map((slot) => {
                        const isSelected = selectedDate === dateKey && selectedSlot === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            data-cursor="book"
                            data-cursor-text={`${slot} ✦`}
                            onClick={() => handleSelectSlot(dateKey, slot)}
                            className={`w-full py-2 px-1 text-center rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-black shadow-lg font-bold scale-[1.03]"
                                : "bg-white/5 text-white/80 border border-white/5 hover:bg-white/15 hover:text-white hover:scale-[1.01]"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Formulaire de validation dès qu'un créneau est choisi */}
          <AnimatePresence>
            {selectedDate && selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-[#FF758C]/40 space-y-6 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#FF758C] tracking-wider block">
                      3. Créneau sélectionné
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {selectedDate} à {selectedSlot} ({meetingType === "telephone" ? "📞 Téléphonique" : "📍 Présentiel"})
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] border border-emerald-500/30 font-mono text-xs font-bold self-start sm:self-auto">
                    Créneau disponible
                  </span>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-white/60">
                        Prénom *
                      </label>
                      <input
                        required
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Ex: Yacine, Mehdi..."
                        className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] outline-none text-sm text-white placeholder-white/30"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-white/60">
                        Nom de famille *
                      </label>
                      <input
                        required
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Ex: Benali, Dr...."
                        className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] outline-none text-sm text-white placeholder-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-white/60">
                        Numéro de téléphone mobile *
                      </label>
                      <input
                        required
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="Ex: 06 12 34 56 78"
                        className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] outline-none text-sm text-white placeholder-white/30"
                      />
                      <span className="text-[10px] text-white/40">
                        {meetingType === "telephone"
                          ? "Le numéro sur lequel Mounir Byar vous appellera."
                          : "Pour l'envoi de l'adresse exacte et du code d'accès au cabinet."}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-white/60">
                        Adresse Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: contact@votredomaine.com"
                        className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] outline-none text-sm text-white placeholder-white/30"
                      />
                      <span className="text-[10px] text-white/40">
                        Envoi instantané de la confirmation et de l&apos;invitation agenda (.ics).
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase text-white/60">
                      Votre objectif / Situation actuelle (Facultatif)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex: Procrastination sur la prière du Fajr, charge mentale d'entrepreneur, manque de concentration..."
                      className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] outline-none text-sm text-white placeholder-white/30 leading-relaxed"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 font-semibold">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    data-cursor="book"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
                  >
                    {loading ? (
                      <span>Confirmation en cours...</span>
                    ) : (
                      <>
                        <span>Confirmer mon rendez-vous {meetingType === "telephone" ? "téléphonique" : "présentiel"}</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Note de réassurance */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span className="text-[#10B981]">🔒</span>
          <span>Confidentialité absolue garantie</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#FF758C]">⏱</span>
          <span>Rappel SMS & Email automatique</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>Cabinet BLF : Reims Centre & Paris 8ème</span>
        </div>
      </div>

    </div>
  );
}
