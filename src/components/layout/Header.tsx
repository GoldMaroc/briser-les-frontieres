"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navSteps = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/offres", label: "Les Offres" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Prix" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/rendez-vous", label: "Rendez-vous" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ne pas afficher sur les pages d'administration privée
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-[76px] flex items-center justify-between gap-6">
        
        {/* GAUCHE : Logo + Slogan KÖM Agency Style */}
        <Link 
          href="/" 
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF758C] rounded-full py-1 flex-shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,117,140,0.2)] group-hover:border-[#FF758C] transition-all duration-300">
            <Image 
              src="/logo_blf.png" 
              alt="Logo Briser les Frontières" 
              width={30} 
              height={30} 
              className="object-contain group-hover:scale-105 transition-transform duration-300" 
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-[13px] sm:text-[14px] tracking-[0.14em] uppercase text-white group-hover:text-[#FF758C] transition-colors leading-none">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.20em] uppercase text-white/50 font-semibold leading-none mt-1.5">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : Navigation KÖM Style avec flèches diagonales ↗ (Toutes pages dédiées, aucun ancrage) */}
        <nav 
          aria-label="Navigation principale" 
          className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0"
        >
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative text-[12.5px] xl:text-[13px] tracking-wider uppercase transition-colors duration-200 py-1 font-heading whitespace-nowrap inline-flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#FF758C] font-bold"
                    : "text-white/70 hover:text-white font-medium"
                }`}
              >
                <span className="text-[11px] text-[#FF758C] font-mono">↗</span>
                <span>{step.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicatorKom"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF758C] to-[#FEE140] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DROITE : Bouton Gradient Pilule Signature KÖM (↗ AUDIT GRATUIT) */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/audit"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black text-[11px] font-heading font-extrabold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,117,140,0.35)] hover:shadow-[0_0_35px_rgba(255,117,140,0.6)] hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>↗ AUDIT GRATUIT (3 MIN)</span>
          </Link>
        </div>

        {/* BOUTON BURGER (Mobile) */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/audit"
            className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF758C] to-[#FEE140] text-black text-[10px] font-heading font-extrabold uppercase tracking-wider shadow-sm"
          >
            ↗ AUDIT
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#FF758C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF758C] rounded-lg"
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

      {/* MENU MOBILE DÉROULANT */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/10 bg-[#0A0A0A] px-6 py-6 space-y-4 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-3 font-heading uppercase text-xs tracking-wider">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg transition-colors flex items-center gap-2 ${
                      isActive
                        ? "bg-white/10 text-[#FF758C] font-bold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-[#FF758C]">↗</span>
                    <span>{step.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black text-center text-xs font-heading font-extrabold uppercase tracking-wider shadow-lg"
              >
                ↗ Passer l&apos;audit gratuit (3 min)
              </Link>
              <Link
                href="/rendez-vous"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full border border-white/20 bg-white/5 text-white text-center text-xs font-heading font-semibold uppercase tracking-wider"
              >
                Prendre rendez-vous (Agenda Doctolib) 📅
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
