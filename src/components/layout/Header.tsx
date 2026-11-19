"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ThemeToggle from "@/components/ui/ThemeToggle";

// ZÉRO DOUBLON : Rendez-vous est exclusivement dans le bouton d'action à droite
const navSteps = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/recherche", label: "Science & Khalifa" },
  { href: "/offres", label: "Accompagnement" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Tarifs" },
  { href: "/temoignages", label: "Témoignages" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg)]/92 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_20px_rgba(20,18,16,0.03)] transition-colors duration-280">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-[76px] flex items-center justify-between gap-4">
        
        {/* GAUCHE : Logo Médaillon + Slogan Officiel */}
        <Link 
          href="/" 
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B53] rounded-full py-1 shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B88E3E]/40 bg-white dark:bg-neutral-900 flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(184,142,62,0.15)] group-hover:border-[#087B53] transition-all duration-300">
            <Image 
              src="/logo_blf.png" 
              alt="Logo Briser les Frontières" 
              fill
              sizes="40px"
              priority
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-[12.5px] sm:text-[13.5px] tracking-[0.14em] uppercase text-[var(--text-primary)] group-hover:text-[#087B53] transition-colors leading-none">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.18em] uppercase text-[#8C6214] dark:text-[#D4A853] font-semibold leading-none mt-1.5">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : Liens Clairs (ZÉRO doublon, navigation directe) */}
        <nav 
          aria-label="Navigation principale" 
          className="hidden xl:flex items-center gap-6 2xl:gap-8 shrink-0"
        >
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative text-[12px] 2xl:text-[12.5px] tracking-wider uppercase transition-colors duration-200 py-1 font-heading whitespace-nowrap ${
                  isActive
                    ? "text-[#087B53] dark:text-[#4ade80] font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium"
                }`}
              >
                {step.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavStep"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#087B53]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DROITE : Action Principale + ThemeToggle de Nouveau dossier (4) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />

          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300/70 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 hover:bg-white dark:hover:bg-neutral-800 text-[var(--text-primary)] text-[11px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:border-[#087B53]"
          >
            <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
            <span>Prendre RDV</span>
          </Link>

          <Link
            href="/audit"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-[11px] font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(8,123,83,0.20)] hover:shadow-[0_6px_20px_rgba(8,123,83,0.30)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>Audit Gratuit</span>
            <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* BOUTON BURGER (Mobile / Tablette) */}
        <div className="xl:hidden flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/audit"
            className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-full bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider shadow-sm"
          >
            Audit Gratuit
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text-primary)] hover:text-[#087B53] transition-colors focus:outline-none focus:ring-2 focus:ring-[#087B53] rounded-lg cursor-pointer"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU DÉROULANT MOBILE */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-b border-[var(--border)] bg-[var(--bg)] px-6 py-6 space-y-4 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col space-y-2.5 font-heading uppercase text-xs tracking-wider">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#087B53]/15 text-[#087B53] font-bold"
                        : "text-[var(--text-secondary)] hover:bg-neutral-200/50 dark:hover:bg-neutral-800 hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {step.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-2.5">
              <Link
                href="/rendez-vous"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[var(--text-primary)] text-center text-xs font-heading font-semibold uppercase tracking-wider shadow-xs"
              >
                Prendre RDV (Tél 48,95 &euro; • Domicile 96,45 &euro;)
              </Link>
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#087B53] text-white text-center text-xs font-heading font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span>Passer l&apos;Audit Gratuit</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
