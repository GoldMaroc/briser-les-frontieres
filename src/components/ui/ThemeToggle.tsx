"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("blf-theme") as "light" | "dark" | null;
    const initial = saved || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("blf-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Changer de thème (clair/sombre)"
      title={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
      className="relative p-2 rounded-full border border-neutral-300/60 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-900/70 hover:bg-white dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B53]"
    >
      {theme === "light" ? (
        // Icône Soleil de Nouveau dossier (4)
        <svg
          width="18"
          height="18"
          viewBox="0 0 256 256"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="128" cy="128" r="56" />
          <line x1="128" y1="24" x2="128" y2="44" />
          <line x1="128" y1="212" x2="128" y2="232" />
          <line x1="24" y1="128" x2="44" y2="128" />
          <line x1="212" y1="128" x2="232" y2="128" />
          <line x1="54" y1="54" x2="68" y2="68" />
          <line x1="188" y1="188" x2="202" y2="202" />
          <line x1="54" y1="202" x2="68" y2="188" />
          <line x1="188" y1="68" x2="202" y2="54" />
        </svg>
      ) : (
        // Icône Lune de Nouveau dossier (4)
        <svg
          width="18"
          height="18"
          viewBox="0 0 256 256"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M210.69 158.18A96.78 96.78 0 0 1 192 160 96.11 96.11 0 0 1 96 64a96.78 96.78 0 0 1 1.82-18.69A96.04 96.04 0 1 0 210.69 158.18Z" />
        </svg>
      )}
    </button>
  );
}
