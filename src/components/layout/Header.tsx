"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navSteps = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/livres", label: "Les Livres" },
  { href: "/offres", label: "Accompagnement" },
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl pointer-events-auto">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[#FAF8F5]/92 backdrop-blur-2xl border border-[#E5DDD2] shadow-[0_10px_35px_rgba(50,40,30,0.08)] transition-all duration-300">
        
        {/* Logo BLF & Identité (Slogan : L'Ingénierie de la Souveraineté) */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#DCD2C4] group-hover:border-[#B88E3E] transition-colors bg-[#F3EDE4] flex items-center justify-center">
            <Image 
              src="/logo_blf.png" 
              alt="Logo BLF" 
              width={26} 
              height={26} 
              className="object-contain" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs sm:text-[13px] tracking-wide uppercase text-[#181512] group-hover:text-[#B88E3E] transition-colors leading-none">
              Briser les Frontières
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#7A6F64] uppercase leading-none mt-1">
              L&apos;Ingénierie de la Souveraineté
            </span>
          </div>
        </Link>

        {/* Navigation Centrale Épurée & Aérée (avec Prix) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[#4A433B]">
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative py-1 text-xs xl:text-[13px] font-heading font-medium tracking-normal transition-all duration-300 group whitespace-nowrap ${
                  isActive
                    ? "text-[#B88E3E] font-semibold"
                    : "text-[#4A433B] hover:text-[#181512]"
                }`}
              >
                <span>{step.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B88E3E] rounded-full shadow-[0_0_8px_rgba(184,142,62,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bouton d'Action Unique & Prestigieux */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/audit"
            className="group relative overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(8,123,83,0.30)] hover:bg-[#066343] hover:shadow-[0_0_25px_rgba(8,123,83,0.50)] hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Audit Gratuit</span>
              <span className="font-mono opacity-80 text-[10px] hidden sm:inline">[3 min]</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </span>
          </Link>

          {/* Bouton Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#4A433B] hover:text-[#181512] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </nav>

      {/* Menu Déroulant Mobile Plein Écran */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 p-5 rounded-3xl bg-[#FAF8F5]/98 backdrop-blur-2xl border border-[#E5DDD2] shadow-2xl space-y-4"
          >
            <div className="flex flex-col gap-2">
              {navSteps.map((step) => {
                const isActive = pathname === step.href;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-[#B88E3E]/15 text-[#B88E3E] font-bold border border-[#B88E3E]/30" 
                        : "text-[#4A433B] hover:bg-[#EDE5D8] hover:text-[#181512]"
                    }`}
                  >
                    <span className="text-sm font-heading font-medium">{step.label}</span>
                    <span className="text-xs text-[#7A6F64] font-mono">→</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E5DDD2] flex flex-col gap-2">
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#087B53] text-white font-heading font-bold text-xs text-center uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <span>Passer l&apos;Audit Gratuit [3 min]</span>
                <span>↗</span>
              </Link>
              <Link
                href="/prix"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#B88E3E] text-white font-heading font-semibold text-xs text-center uppercase tracking-wider"
              >
                Consulter les Prix & Formats
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
