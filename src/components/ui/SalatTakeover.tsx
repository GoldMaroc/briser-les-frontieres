"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTimeTheme } from "./TimeThemeProvider";

export default function SalatTakeover() {
  const { nextPrayer, triggerTakeover } = useTimeTheme();
  const [localTrigger, setLocalTrigger] = useState(false);
  const [mutedTakeover, setMutedTakeover] = useState(false);

  // Synchroniser avec l'état global, sauf si l'utilisateur a explicitement décliné cette prière spécifique
  useEffect(() => {
    if (triggerTakeover && !mutedTakeover) {
      setLocalTrigger(true);
    } else if (!triggerTakeover) {
      setLocalTrigger(false);
      setMutedTakeover(false); // Réinitialiser pour la prochaine prière
    }
  }, [triggerTakeover, mutedTakeover]);

  if (!nextPrayer) return null;

  const handleMute = () => {
    setLocalTrigger(false);
    setMutedTakeover(true);
  };

  // Convertir le nom de la prière en son équivalent arabe noble pour le prestige
  const getArabicName = (name: string) => {
    switch (name.toLowerCase()) {
      case "fajr": return "الفجر — Al-Fajr";
      case "dhuhr": return "الظهر — Ad-Dhuhr";
      case "asr": return "العصر — Al-Asr";
      case "maghrib": return "المغرب — Al-Maghrib";
      case "isha": return "العشاء — Al-Isha";
      default: return name;
    }
  };

  return (
    <AnimatePresence>
      {localTrigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950/98 backdrop-blur-2xl text-stone-100 p-6 selection:bg-gold/20"
        >
          {/* Grille céleste animée en arrière-plan */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(212,168,83,0.15)_0%,rgba(0,0,0,0)_80%)]" />
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="celestial-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(212, 168, 83, 0.3)" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="1.5" fill="rgba(212, 168, 83, 0.5)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#celestial-grid)" />
          </svg>

          <div className="relative max-w-3xl w-full text-center space-y-12 z-10 px-4">
            
            {/* Titre Sacré */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-3"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold block">
                Mandat Terrestre — Khalifa
              </span>
              <h4 className="font-heading text-xl md:text-2xl text-stone-300 font-light italic">
                L&apos;appel d&apos;{getArabicName(nextPrayer.name)} retentit
              </h4>
            </motion.div>

            {/* Message de Choc de Conscience */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative py-8 px-6 border-y border-gold/15 animate-salat-pulse"
            >
              <h2 className="font-heading text-3xl md:text-5xl font-light text-gold leading-tight tracking-wide">
                « Ne loupe pas ton rendez-vous avec Celui qui t&apos;aime plus que ta mère. »
              </h2>
            </motion.div>

            {/* Compte à Rebours */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="space-y-4 font-body"
            >
              <div className="flex flex-col items-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-2">Rencontre imminente dans</span>
                <span className="font-heading text-5xl md:text-7xl font-light text-stone-100 tracking-wider">
                  {nextPrayer.secondsRemaining} <span className="text-xl md:text-2xl text-stone-500">secondes</span>
                </span>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed max-w-md mx-auto">
                Purifie ton intention, isole ton attention. Prépare-toi à te tenir devant le Maître des mondes, sans intermédiaire.
              </p>
            </motion.div>

            {/* Échappement Discret */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              whileHover={{ opacity: 0.9 }}
              transition={{ delay: 1.5 }}
              onClick={handleMute}
              className="mt-12 text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-gold cursor-pointer transition-colors border-b border-transparent hover:border-gold pb-1 font-body"
            >
              Ignorer temporairement (Urgence) ✕
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
