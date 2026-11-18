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
    <header className="sticky top-0 z-50 h-[74px] w-full bg-[#FAF8F5]/92 backdrop-blur-2xl border-b border-[#E8E0D2] shadow-[0_4px_24px_rgba(35,28,20,0.03)] transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* GAUCHE : Logo Médaillon Joaillerie + Slogan Impérial */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E] rounded-full py-1 flex-shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B88E3E]/40 bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-[#B88E3E] transition-all duration-300">
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
            <span className="font-heading font-bold text-[13px] sm:text-[14px] tracking-[0.12em] uppercase text-[#141210] group-hover:text-[#B88E3E] transition-colors leading-none">
              BRISER LES FRONTIÈRES
            </span>
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.18em] uppercase text-[#B88E3E] font-semibold leading-none mt-1.5">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* CENTRE : Navigation Haute Couture (Desktop) */}
        <nav 
          aria-label="Navigation principale" 
          className="hidden lg:flex items-center gap-8"
        >
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative text-[13px] tracking-wide transition-colors duration-200 py-1 font-heading ${
                  isActive
                    ? "text-[#B88E3E] font-bold"
                    : "text-[#574F46] hover:text-[#141210] font-medium"
                }`}
              >
                <span>{step.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DFB76C] via-[#B88E3E] to-[#8F6826] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DROITE : CTA Joaillerie & Mobile Trigger */}
        <div className="flex items-center gap-4">
          
          {/* Bouton CTA Joyau Émeraude & Or */}
          <Link
            href="/audit"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#087B53] hover:bg-[#066343] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(8,123,83,0.25)] hover:shadow-[0_6px_22px_rgba(8,123,83,0.35)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B53] focus-visible:ring-offset-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#DFB76C] animate-pulse" />
            <span>Audit Gratuit</span>
            <span className="opacity-80 font-mono text-[10px]">[3 min]</span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </Link>

          {/* Bouton Burger Mobile accessible */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-[#574F46] hover:text-[#141210] hover:bg-[#F0EAE1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth={1.8}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

      </div>

      {/* Menu Mobile Déroulant Haute Joaillerie */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
            className="lg:hidden border-b border-[#E8E0D2] bg-[#FAF8F5]/98 backdrop-blur-2xl shadow-xl overflow-hidden"
          >
            <nav className="px-5 pt-3 pb-6 space-y-2">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-heading tracking-wide transition-all ${
                      isActive
                        ? "bg-[#B88E3E]/12 text-[#B88E3E] font-bold border border-[#B88E3E]/20"
                        : "text-[#574F46] hover:bg-[#F3EDE4] hover:text-[#141210]"
                    }`}
                  >
                    <span>{step.label}</span>
                    <span className="text-xs text-[#B88E3E] font-mono">→</span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#E8E0D2] flex flex-col gap-2.5">
                <Link
                  href="/audit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-full bg-[#087B53] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md text-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFB76C] animate-pulse" />
                  <span>Passer l&apos;Audit Gratuit [3 min] ↗</span>
                </Link>
                <Link
                  href="/prix"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full border border-[#E8E0D2] bg-white text-[#141210] font-heading font-semibold text-xs uppercase tracking-wider text-center"
                >
                  Consulter les Tarifs
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
