"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSlot {
  time: string;
  available: boolean;
}

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

  // Décalage de la semaine affichée (0 = semaine en cours, 1 = semaine suivante, etc.)
  const [weekOffset, setWeekOffset] = useState(0);

  // Générer dynamiquement les jours de la semaine courante/prochaine
  const weekDays = useMemo(() => {
    const days: DaySchedule[] = [];
    const today = new Date();
    
    // Calculer le lundi de référence
    const currentDay = today.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const baseMonday = new Date(today);
    baseMonday.setDate(today.getDate() + distanceToMonday + weekOffset * 7);

    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const monthNames = [
      "Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin",
      "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."
    ];

    // Créer les 6 jours de Lundi à Samedi
    for (let i = 0; i < 6; i++) {
      const d = new Date(baseMonday);
      d.setDate(baseMonday.getDate() + i);

      const isFriday = d.getDay() === 5;
      const isSunday = d.getDay() === 0;

      // Horaires :
      // Lundi au Samedi : 9h00 à 18h00
      // Vendredi : 9h00 à 12h00 UNIQUEMENT
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
    <div id="agenda" className="w-full max-w-5xl mx-auto p-5 sm:p-8 lg:p-10 rounded-3xl bg-white border border-[#E8E0D2] shadow-[0_15px_45px_rgba(40,30,20,0.06)] text-[#141210]">
      
      {/* En-tête de l'agenda Doctolib */}
      <div className="border-b border-[#E8E0D2] pb-6 sm:pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087B53]/10 border border-[#087B53]/20 text-[#087B53] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              PRISE DE RENDEZ-VOUS EN LIGNE • AGENDA OFFICIEL
            </span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#141210]">
            Agenda des Rendez-vous & Consultations
          </h2>
          <p className="text-xs sm:text-sm text-[#5C534A] mt-1 font-sans">
            Du lundi au samedi (9h00–18h00) • Vendredi matin uniquement (9h00–12h00) • Dimanche fermé.
          </p>
        </div>

        {/* Sélecteur de modalité : Téléphonique vs Présentiel */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#F5EFEB] border border-[#E8E0D2] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMeetingType("telephone")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              meetingType === "telephone"
                ? "bg-white text-[#141210] shadow-sm border border-[#E8E0D2]"
                : "text-[#5C534A] hover:text-[#141210]"
            }`}
          >
            <span>📞 Téléphonique</span>
          </button>
          <button
            type="button"
            onClick={() => setMeetingType("presentiel")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              meetingType === "presentiel"
                ? "bg-white text-[#141210] shadow-sm border border-[#E8E0D2]"
                : "text-[#5C534A] hover:text-[#141210]"
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
          className="my-8 p-8 sm:p-12 rounded-3xl bg-[#087B53]/5 border-2 border-[#087B53]/40 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#087B53] text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
            ✓
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#087B53] font-bold block">
              CONFIRMATION IMMÉDIATE • {confirmedBooking.id}
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#141210]">
              Votre rendez-vous est confirmé avec succès !
            </h3>
            <p className="text-sm text-[#5C534A] max-w-lg mx-auto">
              Un accusé de réception a été envoyé pour <strong>{confirmedBooking.client.prenom} {confirmedBooking.client.nom}</strong>.
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm text-left space-y-3 font-sans text-xs">
            <div className="flex justify-between border-b border-[#E8E0D2] pb-2">
              <span className="text-[#7A6F64]">Type de consultation</span>
              <span className="font-bold text-[#141210]">
                {confirmedBooking.typeRdv === "telephone" ? "📞 Appel Téléphonique direct" : "📍 Cabinet Présentiel (Reims / Paris)"}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E8E0D2] pb-2">
              <span className="text-[#7A6F64]">Date & Heure</span>
              <span className="font-bold text-[#087B53]">
                {confirmedBooking.dateRdv} à {confirmedBooking.timeSlot}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E8E0D2] pb-2">
              <span className="text-[#7A6F64]">Motif sélectionné</span>
              <span className="font-medium text-[#141210]">{confirmedBooking.motif}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6F64]">Numéro de rappel</span>
              <span className="font-mono font-bold text-[#141210]">{confirmedBooking.client.telephone}</span>
            </div>
          </div>

          <p className="text-xs text-[#7A6F64] max-w-md mx-auto leading-relaxed">
            Mounir Byar ou son secrétariat prendra directement contact avec vous à l&apos;heure convenue. Vous recevrez également un rappel avant la séance.
          </p>

          <button
            onClick={() => {
              setConfirmedBooking(null);
              setSelectedDate(null);
              setSelectedSlot(null);
            }}
            className="px-6 py-3 rounded-full bg-[#141210] text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-[#2A241F] transition-all cursor-pointer shadow-md"
          >
            Prendre un autre rendez-vous
          </button>
        </motion.div>
      ) : (
        <div className="pt-6 sm:pt-8 space-y-8">
          
          {/* 1. Sélection du motif */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7A6F64] mb-3">
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
                  onClick={() => setMotif(m.label)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    motif === m.label
                      ? "border-[#B88E3E] bg-[#B88E3E]/5 shadow-sm ring-1 ring-[#B88E3E]"
                      : "border-[#E8E0D2] bg-white hover:border-[#B88E3E]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-xs sm:text-sm text-[#141210]">{m.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F5EFEB] text-[#7A6F64] font-semibold">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-[#5C534A] leading-relaxed">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Grille Calendrier et Créneaux façon Doctolib */}
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A6F64]">
                2. Choisissez votre jour et créneau horaire :
              </label>

              {/* Navigation de semaine */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={weekOffset <= 0}
                  onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#E8E0D2] text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F5EFEB] transition-colors"
                >
                  ← Semaine précédente
                </button>
                <button
                  type="button"
                  onClick={() => setWeekOffset(prev => prev + 1)}
                  className="px-3 py-1.5 rounded-lg border border-[#E8E0D2] text-xs font-mono hover:bg-[#F5EFEB] transition-colors"
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
                    className="flex flex-col rounded-2xl border border-[#E8E0D2] bg-[#FAF8F5] overflow-hidden"
                  >
                    {/* En-tête du jour */}
                    <div className={`p-3 text-center border-b border-[#E8E0D2] ${
                      day.isFriday ? "bg-[#B88E3E]/10" : "bg-white"
                    }`}>
                      <span className="font-heading font-bold text-xs uppercase block text-[#141210]">
                        {day.dayName}
                      </span>
                      <span className="text-sm font-extrabold text-[#141210]">
                        {day.dayNumber} {day.monthName}
                      </span>
                      {day.isFriday && (
                        <span className="text-[9px] font-mono text-[#8C6214] font-bold block mt-0.5">
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
                            onClick={() => handleSelectSlot(dateKey, slot)}
                            className={`w-full py-2 px-1 text-center rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#087B53] text-white shadow-sm ring-2 ring-[#087B53]/50 scale-[1.02]"
                                : "bg-white text-[#141210] border border-[#E8E0D2] hover:bg-[#087B53]/10 hover:border-[#087B53]/40 hover:text-[#087B53]"
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
                className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#B88E3E]/30 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E0D2] pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#8C6214] tracking-wider block">
                      3. Créneau sélectionné
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#141210]">
                      {selectedDate} à {selectedSlot} ({meetingType === "telephone" ? "📞 Téléphonique" : "📍 Présentiel"})
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#087B53]/10 text-[#087B53] font-mono text-xs font-bold self-start sm:self-auto">
                    Créneau réservable
                  </span>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-[#5C534A]">
                        Prénom *
                      </label>
                      <input
                        required
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Ex: Yacine, Mehdi..."
                        className="px-4 py-3 rounded-xl bg-white border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm text-[#141210] placeholder-neutral-400"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-[#5C534A]">
                        Nom de famille *
                      </label>
                      <input
                        required
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Ex: Benali, Dr...."
                        className="px-4 py-3 rounded-xl bg-white border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm text-[#141210] placeholder-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-[#5C534A]">
                        Numéro de téléphone mobile *
                      </label>
                      <input
                        required
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="Ex: 06 12 34 56 78"
                        className="px-4 py-3 rounded-xl bg-white border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm text-[#141210] placeholder-neutral-400"
                      />
                      <span className="text-[10px] text-[#7A6F64]">
                        {meetingType === "telephone"
                          ? "Le numéro sur lequel Mounir Byar vous appellera."
                          : "Pour l'envoi de l'adresse exacte et du code d'accès au cabinet."}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase text-[#5C534A]">
                        Adresse Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: contact@votredomaine.com"
                        className="px-4 py-3 rounded-xl bg-white border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm text-[#141210] placeholder-neutral-400"
                      />
                      <span className="text-[10px] text-[#7A6F64]">
                        Envoi instantané de la confirmation et de l&apos;invitation agenda (.ics).
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase text-[#5C534A]">
                      Votre objectif / Situation actuelle (Facultatif)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex: Procrastination sur la prière du Fajr, charge mentale d'entrepreneur, manque de concentration..."
                      className="px-4 py-3 rounded-xl bg-white border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm text-[#141210] placeholder-neutral-400 leading-relaxed"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 font-semibold">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[#087B53] hover:bg-[#066343] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
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

      {/* Note rassurante de bas d'agenda */}
      <div className="mt-8 pt-6 border-t border-[#E8E0D2] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7A6F64]">
        <div className="flex items-center gap-2">
          <span className="text-[#087B53]">🔒</span>
          <span>Confidentialité médicale & spirituelle absolue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#B88E3E]">⏱</span>
          <span>Rappel SMS & Email 24h avant</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>Cabinet BLF : Reims Centre & Paris 8ème</span>
        </div>
      </div>

    </div>
  );
}
