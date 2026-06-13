"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

type ThemeType = "fajr" | "zenith" | "maghrib" | "isha";

interface NextPrayerType {
  name: string;
  time: Date;
  secondsRemaining: number;
}

interface TimeThemeContextType {
  activeTheme: ThemeType;
  setActiveTheme: (theme: ThemeType) => void;
  isFocusMode: boolean;
  setIsFocusMode: (focus: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (play: boolean) => void;
  toggleAudio: () => void;
  prayerTimings: Record<string, string> | null;
  nextPrayer: NextPrayerType | null;
  locationName: string;
  triggerTakeover: boolean;
  setTriggerTakeover: (trigger: boolean) => void;
  manualOverride: boolean;
  setManualOverride: (override: boolean) => void;
}

const TimeThemeContext = createContext<TimeThemeContextType | undefined>(undefined);

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<ThemeType>("zenith");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [prayerTimings, setPrayerTimings] = useState<Record<string, string> | null>(null);
  const [nextPrayer, setNextPrayer] = useState<NextPrayerType | null>(null);
  const [locationName, setLocationName] = useState("Reims, France");
  const [triggerTakeover, setTriggerTakeover] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);
  const [mounted, setMounted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prayerTimingsRef = useRef<Record<string, string> | null>(null);

  // 1. Initialisation côté client
  useEffect(() => {
    setMounted(true);
    
    // Création de l'élément audio pour le fond spirituel (Al-Ma'thurat complet)
    const audio = new Audio("/mathurat.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audio.currentTime = 100; // Commence directement à 1 minute 40 (100 secondes) pour supprimer l'intro
    audioRef.current = audio;

    // Détection de l'IP et chargement des horaires de prière
    const fetchLocationAndPrayers = async () => {
      let lat = 48.8566; // Fallback Paris
      let lon = 2.3522;
      let city = "Paris";
      let country = "France";

      try {
        const consent = localStorage.getItem("blf_cookies_consent");
        // Si consentement donné, on géolocalise
        if (consent === "accepted") {
          const ipResponse = await fetch("https://ipapi.co/json/");
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            if (ipData.latitude && ipData.longitude) {
              lat = ipData.latitude;
              lon = ipData.longitude;
              city = ipData.city || "Reims";
              country = ipData.country_name || "France";
              setLocationName(`${city}, ${country}`);
            }
          }
        } else {
          // Sinon, on affiche une localisation générique sans tracker IP
          setLocationName("France (Souveraine)");
        }
      } catch (e) {
        console.warn("Échec de la géolocalisation IP.", e);
        setLocationName("France (Souveraine)");
      }

      try {
        // UOIF (méthode 12) pour la France
        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=12`
        );
        if (prayerResponse.ok) {
          const prayerData = await prayerResponse.json();
          const timings = prayerData.data.timings;
          
          // Ne conserver que les 5 prières principales
          const filteredTimings = {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha,
          };
          
          setPrayerTimings(filteredTimings);
          prayerTimingsRef.current = filteredTimings;
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des horaires de prière.", e);
      }
    };

    fetchLocationAndPrayers();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // 2. Fonction synchrone pour contourner les restrictions d'autoplay des navigateurs
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((err) => {
          console.warn("La lecture audio a été bloquée ou a échoué :", err);
          setIsAudioPlaying(false);
        });
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  // 3. Boucle de vérification temporelle (chaque seconde)
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const now = new Date();
      
      // A. Désactivation du thème circadien automatique (visibilité trop variable)
      // Le thème est désormais verrouillé sur "fajr" (clair, premium et lisible)
      if (!manualOverride) {
        if (activeTheme !== "fajr") {
          setActiveTheme("fajr");
        }
      }

      // B. Calculer la prochaine prière et le compte à rebours
      const timings = prayerTimingsRef.current;
      if (!timings) return;

      let closestPrayerName = "";
      let closestPrayerTime = new Date();
      let minDelta = Infinity;

      Object.entries(timings).forEach(([name, timeStr]) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const pTime = new Date(now);
        pTime.setHours(hours, minutes, 0, 0);

        // Si l'heure calculée est déjà passée aujourd'hui, c'est pour demain
        if (pTime.getTime() < now.getTime()) {
          pTime.setDate(pTime.getDate() + 1);
        }

        const delta = pTime.getTime() - now.getTime();
        if (delta < minDelta) {
          minDelta = delta;
          closestPrayerName = name;
          closestPrayerTime = pTime;
        }
      });

      if (closestPrayerName) {
        const secondsRemaining = Math.max(0, Math.floor(minDelta / 1000));
        setNextPrayer({
          name: closestPrayerName,
          time: closestPrayerTime,
          secondsRemaining,
        });

        // Déclencher le Takeover plein écran 60 secondes avant l'heure de prière
        if (secondsRemaining > 0 && secondsRemaining <= 60) {
          setTriggerTakeover(true);
        } else {
          setTriggerTakeover(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted, manualOverride]);

  // 4. Appliquer la classe de thème sur l'élément HTML racine
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.className = `theme-${activeTheme}`;
  }, [activeTheme, mounted]);

  return (
    <TimeThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
        isFocusMode,
        setIsFocusMode,
        isAudioPlaying,
        setIsAudioPlaying,
        toggleAudio,
        prayerTimings,
        nextPrayer,
        locationName,
        triggerTakeover,
        setTriggerTakeover,
        manualOverride,
        setManualOverride,
      }}
    >
      {children}
    </TimeThemeContext.Provider>
  );
}

export function useTimeTheme() {
  const context = useContext(TimeThemeContext);
  if (context === undefined) {
    throw new Error("useTimeTheme doit être utilisé à l'intérieur d'un TimeThemeProvider");
  }
  return context;
}
