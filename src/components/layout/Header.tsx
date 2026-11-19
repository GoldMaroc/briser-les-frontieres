"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navSteps = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/offres", label: "Accompagnement" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Prix" },
  { href: "/rendez-vous", label: "Rendez-vous" },
  { href: "/#temoignages", label: "Témoignages" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ne pas afficher sur les pages d'administration privée
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/92 backdrop-blur-xl border-b border-[#E8E0D2] shadow-[0_4px_20px_rgba(20,18,16,0.03)] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-[76px] flex items-center justify-between gap-6">
        
        {/* GAUCHE : Logo Médaillon Joaillerie + Slogan Officiel */}
        <Link 
          href="/" 
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E] rounded-full py-1 flex-shrink-0 mr-2 xl:mr-6"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B88E3E]/40 bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_10px_rgba(184,142,62,0.15)] group-hover:border-[#B88E3E] transition-all duration-300">
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
            <span className="font-heading font-extrabold text-[12.5px] sm:text-[13.5px] tracking-[0.14em] uppercase text-[#141210] group-hover:text-[#B88E3E] transition-colors leading-none">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.18em] uppercase text-[#8C6214] font-semibold leading-none mt-1.5">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : Navigation Haute Joaillerie (Desktop) */}
        <nav 
          aria-label="Navigation principale" 
          className="hidden lg:flex items-center gap-5 xl:gap-7 flex-shrink-0"
        >
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative text-[12.5px] xl:text-[13px] tracking-wider uppercase transition-colors duration-200 py-1 font-heading whitespace-nowrap ${
                  isActive
                    ? "text-[#B88E3E] font-bold"
                    : "text-[#5C534A] hover:text-[#141210] font-medium"
                }`}
              >
                {step.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B88E3E] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DROITE : Dual CTAs Haute Conversion (Prendre RDV + Audit Gratuit) */}
        <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 flex-shrink-0">
          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 px-3.5 xl:px-4 py-2.5 rounded-full border border-[#B88E3E]/40 bg-white hover:bg-[#FAF8F5] text-[#141210] text-[11px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:border-[#B88E3E] whitespace-nowrap"
          >
            <span className="text-sm">📅</span>
            <span>Prendre RDV</span>
          </Link>

          <Link
            href="/audit"
            className="group relative inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-[#087B53] hover:bg-[#066343] text-white text-[11px] font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_2px_12px_rgba(8,123,83,0.25)] hover:shadow-[0_4px_18px_rgba(8,123,83,0.4)] whitespace-nowrap"
          >
            <span>AUDIT GRATUIT [3 MIN]</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </Link>
        </div>

        {/* BOUTON BURGER (Mobile) */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/rendez-vous"
            className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-full bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider shadow-sm"
          >
            RDV 📅
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#141210] hover:text-[#B88E3E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B88E3E] rounded-lg"
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
            className="lg:hidden border-b border-[#E8E0D2] bg-[#FAF8F5] px-6 py-6 space-y-4 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col space-y-3 font-heading uppercase text-xs tracking-wider">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#B88E3E]/10 text-[#B88E3E] font-bold"
                        : "text-[#5C534A] hover:bg-[#F5EFEB] hover:text-[#141210]"
                    }`}
                  >
                    {step.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E8E0D2] flex flex-col gap-2.5">
              <Link
                href="/rendez-vous"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full border border-[#B88E3E]/40 bg-white text-[#141210] text-center text-xs font-heading font-semibold uppercase tracking-wider shadow-sm"
              >
                Prendre un Rendez-vous (Tél / Présentiel) 📅
              </Link>
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#087B53] text-white text-center text-xs font-heading font-bold uppercase tracking-wider shadow-md"
              >
                Passer l&apos;audit gratuit (3 min) ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
