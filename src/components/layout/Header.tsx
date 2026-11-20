"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ThemeToggle from "@/components/ui/ThemeToggle";

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER HAUTE JOAILLERIE — Briser les Frontières
   Restauration fidèle de la version d'il y a 19h (Commit 33926ea / eb05567)
   • Logo Médaillon Doré avec Texte Intégral "BRISER LES FRONTIÈRES" & Slogan Officiel
   • 6 Liens Clairs (Zéro Doublon Rendez-vous)
   • Bouton "Prendre RDV" (SANS AUCUN PRIX)
   • Bouton "Audit Gratuit" (SANS mention 3 min, en Or Royal)
   • Menu Mobile Garanti 100% Visible & Accessible sur tous les écrans
   • ZÉRO Vert Fluo • ZÉRO Boîte Bleue
   ═══════════════════════════════════════════════════════════════════════════ */

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

  // Ne pas afficher le header sur l'admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[80] w-full bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_20px_rgba(20,18,16,0.03)] transition-colors duration-280">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-10 h-[72px] sm:h-[76px] flex items-center justify-between gap-3 sm:gap-6">
        
        {/* GAUCHE : Logo Médaillon Joaillerie + Slogan Officiel (Version Préférée Restaurée) */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 sm:gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E] rounded-full py-1 shrink min-w-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#B88E3E]/50 dark:border-[#D4A853]/60 bg-[var(--surface)] flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(184,142,62,0.15)] group-hover:border-[#B88E3E] transition-all duration-300">
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
            <span className="font-heading font-extrabold text-[11.5px] sm:text-[13.5px] tracking-[0.10em] sm:tracking-[0.14em] uppercase text-[var(--text-primary)] group-hover:text-[#B88E3E] dark:group-hover:text-[#D4A853] transition-colors leading-none truncate">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[8.5px] sm:text-[10px] font-mono tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[#B88E3E] dark:text-[#D4A853] font-semibold leading-none mt-1 sm:mt-1.5 truncate">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : Navigation Principale Haute Joaillerie (Desktop) */}
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

        {/* DROITE : Action Principale Desktop — ZÉRO PRIX DANS PRENDRE RDV */}
        <div className="hidden lg:flex items-center gap-3.5 shrink-0">
          <ThemeToggle />

          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[#B88E3E] dark:hover:border-[#D4A853] text-[var(--text-primary)] text-[11px] xl:text-[11.5px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] animate-pulse" />
            <span>Prendre RDV</span>
          </Link>

          <Link
            href="/audit"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-[11px] font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(184,142,62,0.25)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>Audit Gratuit</span>
            <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* CONTROLES MOBILE : GARANTIS 100% VISIBLES ET FACILES À CLIQUER */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[#B88E3E] dark:hover:border-[#D4A853] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B88E3E] flex items-center justify-center shadow-xs"
            aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* TIROIR DÉROULANT DU MENU MOBILE (LISIBLE, ÉPURÉ, HAUTE QUALITÉ) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden border-b border-[var(--border)] bg-[var(--bg)] px-5 py-6 space-y-4 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-2 font-heading uppercase text-xs tracking-wider">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-3.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#B88E3E]/15 text-[#B88E3E] dark:text-[#D4A853] font-bold"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
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
                className="w-full py-3.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-center text-xs font-heading font-semibold uppercase tracking-wider shadow-sm hover:border-[#B88E3E]"
              >
                Prendre Rendez-vous
              </Link>
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] text-[#0A1128] text-center text-xs font-heading font-bold uppercase tracking-wider shadow-md"
              >
                Passer l&apos;Audit Gratuit →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
