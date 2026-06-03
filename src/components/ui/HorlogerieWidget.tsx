"use client";

import React from "react";
import { useTimeTheme } from "./TimeThemeProvider";

export default function HorlogerieWidget() {
  const {
    isFocusMode,
    setIsFocusMode,
    isAudioPlaying,
    toggleAudio,
    nextPrayer,
    locationName,
  } = useTimeTheme();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  return (
    <div className="w-full bg-stone-950 text-stone-300 flex flex-wrap items-center justify-between px-4 sm:px-8 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest font-body border-b border-stone-800 z-50">
      <div className="flex items-center gap-3">
        <span className="text-gold font-bold hidden md:inline">Horlogerie Céleste</span>
        <span className="text-stone-500 hidden sm:inline">{locationName || "Localisation..."}</span>
      </div>

      {nextPrayer ? (
        <div className="flex items-center gap-2 font-bold flex-1 justify-center sm:justify-start md:justify-center">
          <span className="text-stone-500 hidden sm:inline">Prochaine :</span>
          <span className="text-gold">{nextPrayer.name}</span>
          <span className="text-white ml-1">{formatTime(nextPrayer.secondsRemaining)}</span>
        </div>
      ) : (
        <div className="flex-1 text-center text-stone-500">Calcul en cours...</div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={toggleAudio}
          className={`px-2 py-1 sm:px-3 border transition-colors cursor-pointer ${
            isAudioPlaying ? "border-gold text-gold bg-gold/10" : "border-stone-700 text-stone-400 hover:border-gold hover:text-gold"
          }`}
        >
          {isAudioPlaying ? "Ma'thurat ON 📖" : "Ma'thurat OFF 🔇"}
        </button>
        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`px-2 py-1 sm:px-3 border transition-colors cursor-pointer ${
            isFocusMode ? "bg-white text-stone-950 border-white" : "border-stone-700 text-stone-400 hover:border-white hover:text-white"
          }`}
        >
          {isFocusMode ? "Focus ON" : "Focus OFF"}
        </button>
      </div>
    </div>
  );
}
