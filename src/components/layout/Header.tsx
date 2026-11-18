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
    <header className="sticky top-0 z-50 h-[72px] w-full bg-[#FFFFFF] border-b border-[#E5E7EB] transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* GAUCHE : Logo + BRISER LES FRONTIÈRES + Sous-titre unique */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E52] focus-visible:ring-offset-2 rounded-lg py-1 flex-shrink-0"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E5E7EB] bg-[#FAF9F6] flex items-center justify-center flex-shrink-0 group-hover:border-[#0D6E52] transition-colors">
            <Image 
              src="/logo_blf.png" 
              alt="Logo Briser les Frontières" 
              width={28} 
              height={28} 
              className="object-contain" 
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm sm:text-[15px] tracking-[0.04em] uppercase text-[#111827] group-hover:text-[#0D6E52] transition-colors leading-none">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[11px] sm:text-[12px] font-sans tracking-normal text-[#4B5563] leading-none mt-1">
              L&apos;ingénierie de la souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : 4 liens de navigation clairs (Desktop) */}
        <nav 
          aria-label="Navigation principale" 
          className="hidden md:flex items-center gap-7 lg:gap-8"
        >
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`text-sm font-medium transition-colors duration-150 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E52] focus-visible:ring-offset-2 rounded-md ${
                  isActive
                    ? "text-[#0D6E52] font-semibold"
                    : "text-[#374151] hover:text-[#111827]"
                }`}
              >
                {step.label}
              </Link>
            );
          })}
        </nav>

        {/* DROITE : Bouton CTA principal + Burger mobile */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/audit"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-lg bg-[#0D6E52] hover:bg-[#09523D] text-white font-medium text-sm shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E52] focus-visible:ring-offset-2"
          >
            Audit gratuit (3 min)
          </Link>

          {/* Bouton Burger Mobile accessible */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#374151] hover:text-[#111827] hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E52] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Menu Mobile Déroulant accessible */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#E5E7EB] bg-[#FFFFFF] shadow-lg overflow-hidden"
          >
            <nav className="px-4 pt-3 pb-5 space-y-2">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#0D6E52]/10 text-[#0D6E52] font-semibold"
                        : "text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]"
                    }`}
                  >
                    {step.label}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-[#E5E7EB]">
                <Link
                  href="/audit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-4 py-3 min-h-[48px] rounded-lg bg-[#0D6E52] hover:bg-[#09523D] text-white font-semibold text-sm shadow-sm transition-colors text-center"
                >
                  Audit gratuit (3 min)
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
