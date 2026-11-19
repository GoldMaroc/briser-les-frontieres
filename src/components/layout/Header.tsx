"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Navigation principale découplée et épurée (ZÉRO doublon)
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
    <header className="sticky top-0 z-[60] w-full bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_25px_rgba(10,17,40,0.04)] transition-colors duration-280">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-10 h-[64px] sm:h-[76px] flex items-center justify-between gap-2 sm:gap-4">
        
        {/* GAUCHE : Logo Médaillon + Nom Officiel (Ultra-compact sur mobile pour zéro débordement) */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B53] rounded-full py-1 shrink min-w-0"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#B88E3E]/50 dark:border-[#D4A853]/60 bg-[var(--surface)] flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(184,142,62,0.15)] group-hover:border-[#087B53] transition-all duration-300">
            <Image 
              src="/logo_blf.png" 
              alt="Logo Briser les Frontières" 
              fill
              sizes="40px"
              priority
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-extrabold text-[11.5px] sm:text-[13.5px] tracking-[0.10em] sm:tracking-[0.14em] uppercase text-[var(--text-primary)] group-hover:text-[#B88E3E] dark:group-hover:text-[#D4A853] transition-colors leading-none truncate max-w-[155px] xs:max-w-none">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.14em] uppercase text-[#B88E3E] dark:text-[#D4A853] font-semibold leading-none mt-1 hidden sm:block">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : Liens Clairs Desktop (Cachés sur mobile et tablette < lg) */}
        <nav 
          aria-label="Navigation principale" 
          className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0"
        >
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative text-[12px] xl:text-[12.5px] tracking-wider uppercase transition-colors duration-200 py-1 font-heading whitespace-nowrap ${
                  isActive
                    ? "text-[#B88E3E] dark:text-[#D4A853] font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium"
                }`}
              >
                {step.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavStep"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B88E3E] dark:bg-[#D4A853]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DROITE DESKTOP : Switcher Thème + Prendre RDV + Audit Gratuit (>= lg) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />

          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[#B88E3E] text-[var(--text-primary)] text-[11px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#087B53] dark:bg-[#10B981] animate-pulse" />
            <span>Prendre RDV (48,95 €)</span>
          </Link>

          <Link
            href="/audit"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-[11px] font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(8,123,83,0.20)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>Audit Gratuit</span>
            <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* DROITE MOBILE & TABLETTE (< lg) : THÈME + BOUTON MENU BURGER 100% GARANTI VISIBLE */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#B88E3E] dark:border-[#D4A853] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[#B88E3E] transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          >
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853]">
              {mobileMenuOpen ? "Fermer" : "Menu"}
            </span>
            <svg
              className="w-4 h-4 text-[#B88E3E] dark:text-[#D4A853] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU DÉROULANT MOBILE (GRAND, ULTRA-LISIBLE, HAUTE CONVERSION) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-b border-[var(--border)] bg-[var(--bg)] px-4 sm:px-6 py-6 space-y-5 shadow-2xl overflow-hidden max-h-[calc(100vh-70px)] overflow-y-auto"
          >
            {/* Titre Navigation Mobile */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B88E3E] dark:text-[#D4A853] font-bold">
                SOMMAIRE ÉDITORIAL BLF
              </span>
              <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                6 SECTIONS
              </span>
            </div>

            {/* Liens avec Numérotation Élégante */}
            <nav className="flex flex-col space-y-1 font-heading uppercase text-xs sm:text-sm tracking-wider">
              {navSteps.map((step, idx) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#B88E3E]/15 text-[#B88E3E] dark:text-[#D4A853] font-extrabold border-l-4 border-[#B88E3E] dark:border-[#D4A853]"
                        : "text-[var(--text-primary)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <span>{step.label}</span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)] font-semibold">
                      0{idx + 1}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Bloc d'Actions Mobiles Haute Conversion */}
            <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-3">
              <Link
                href="/rendez-vous"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl border border-[#B88E3E]/40 bg-[var(--surface)] text-[var(--text-primary)] text-center text-xs font-heading font-bold uppercase tracking-wider shadow-xs hover:border-[#B88E3E] flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#087B53] dark:bg-[#10B981] animate-pulse shrink-0" />
                <span className="truncate">Prendre RDV (Tél 48,95 € • Domicile 96,45 €)</span>
              </Link>
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#087B53] hover:bg-[#065F40] text-white text-center text-xs font-heading font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
              >
                <span>Passer l&apos;Audit Gratuit</span>
                <ArrowIcon className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
