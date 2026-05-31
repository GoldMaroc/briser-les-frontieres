"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTimeTheme } from "./TimeThemeProvider";

export default function HorlogerieWidget() {
  const {
    activeTheme,
    setActiveTheme,
    isFocusMode,
    setIsFocusMode,
    isAudioPlaying,
    toggleAudio,
    nextPrayer,
    locationName,
    setManualOverride,
  } = useTimeTheme();

  const [isOpen, setIsOpen] = useState(false);

  // Formater le temps restant avant la prière
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-body select-none">
      <AnimatePresence>
        {/* Le panneau de contrôle ouvert */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white/90 dark:bg-stone-950/90 backdrop-blur-lg border border-gold/30 p-5 w-72 rounded-sm shadow-2xl mb-4 space-y-4 text-stone-900 dark:text-stone-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Horlogerie Céleste</span>
              <span className="text-[9px] text-stone-500 dark:text-stone-400 font-semibold">{locationName}</span>
            </div>

            {/* Prochaine Prière & Compte à Rebours */}
            {nextPrayer ? (
              <div className="space-y-1 py-1">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>Prochaine rencontre :</span>
                  <strong className="text-stone-950 dark:text-stone-100 font-bold uppercase tracking-wider">{nextPrayer.name}</strong>
                </div>
                <div className="font-heading text-3xl font-light text-gold tracking-widest text-center py-1">
                  {formatTime(nextPrayer.secondsRemaining)}
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-stone-400 italic text-center py-2">Calcul des coordonnées IP...</p>
            )}

            {/* Contrôles Principaux (Audio & Focus) */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200 dark:border-stone-800">
              {/* Bouton Al-Mathurat */}
              <button
                onClick={toggleAudio}
                className={`py-2 px-3 text-[10px] uppercase tracking-wider border rounded-sm font-semibold transition-all duration-300 cursor-pointer text-center justify-center flex ${
                  isAudioPlaying
                    ? "bg-gold/10 border-gold text-gold"
                    : "border-stone-300 dark:border-stone-700 text-stone-500 hover:border-gold hover:text-gold"
                }`}
              >
                {isAudioPlaying ? "Ma'thurat ON 📖" : "Ma'thurat OFF 🔇"}
              </button>

              {/* Bouton Focus */}
              <button
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={`py-2 px-3 text-[10px] uppercase tracking-wider border rounded-sm font-semibold transition-all duration-300 cursor-pointer text-center justify-center flex ${
                  isFocusMode
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-900 dark:border-stone-100"
                    : "border-stone-300 dark:border-stone-700 text-stone-500 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                {isFocusMode ? "Focus ON" : "Focus OFF"}
              </button>
            </div>

            {/* Molettes de Thèmes Circadiens pour tests */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1">
              <span className="text-[8px] uppercase tracking-[0.2em] text-stone-400 block mb-1">Simuler un Cycle Terrestre</span>
              <div className="grid grid-cols-4 gap-1 text-[9px] uppercase tracking-wider font-semibold">
                <button
                  onClick={() => { setManualOverride(true); setActiveTheme("fajr"); }}
                  className={`py-1 text-center border rounded-sm transition-all cursor-pointer ${
                    activeTheme === "fajr" ? "border-gold text-gold bg-gold-muted/5" : "border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                  }`}
                >
                  Fajr
                </button>
                <button
                  onClick={() => { setManualOverride(true); setActiveTheme("zenith"); }}
                  className={`py-1 text-center border rounded-sm transition-all cursor-pointer ${
                    activeTheme === "zenith" ? "border-gold text-gold bg-gold-muted/5" : "border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                  }`}
                >
                  Midi
                </button>
                <button
                  onClick={() => { setManualOverride(true); setActiveTheme("maghrib"); }}
                  className={`py-1 text-center border rounded-sm transition-all cursor-pointer ${
                    activeTheme === "maghrib" ? "border-gold text-gold bg-gold-muted/5" : "border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                  }`}
                >
                  Maghr.
                </button>
                <button
                  onClick={() => { setManualOverride(true); setActiveTheme("isha"); }}
                  className={`py-1 text-center border rounded-sm transition-all cursor-pointer ${
                    activeTheme === "isha" ? "border-gold text-gold bg-gold-muted/5" : "border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                  }`}
                >
                  Isha
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Le bouton d&apos;ouverture flottant (de type cadran horloger prestigieux) */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center p-3.5 bg-white/95 dark:bg-stone-950/95 border border-gold/40 rounded-full shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 ${
            isOpen ? "bg-gold text-stone-950 dark:text-stone-950" : "text-gold"
          }`}
          aria-label="Contrôles de l&apos;horlogerie sacrée"
        >
          {isOpen ? (
            <span className="text-sm font-bold font-body">✕</span>
          ) : (
            <svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
