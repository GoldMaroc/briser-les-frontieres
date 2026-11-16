"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navSteps = [
  { href: "/", label: "Éveil", num: "01" },
  { href: "/audit", label: "Diagnostic", num: "02" },
  { href: "/fondements", label: "Compréhension", num: "03" },
  { href: "/protocole", label: "Méthode", num: "04" },
  { href: "/articles", label: "Journal", num: "05" },
  { href: "/offres", label: "Offres", num: "06" },
  { href: "/livres", label: "Outils", num: "07" },
  { href: "/contact", label: "Contact", num: "08" },
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
      <nav className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 rounded-full bg-[#121316]/90 backdrop-blur-2xl border border-white/12 shadow-[0_12px_45px_rgba(0,0,0,0.85)] transition-all duration-300">
        
        {/* Logo BLF & Identité */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-[#00E599]/70 transition-colors bg-black/50 flex items-center justify-center">
            <Image 
              src="/logo_blf.png" 
              alt="Logo BLF" 
              width={28} 
              height={28} 
              className="object-contain" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-[#00E599] transition-colors leading-none">
              Briser les Frontières
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase leading-none mt-1">
              Ingénierie & Exégèse
            </span>
          </div>
        </Link>

        {/* Navigation Centrale (Les 8 Étapes du Stepper d'Origine) */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs font-medium text-neutral-300">
          {navSteps.map((step) => {
            const isActive = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`relative flex items-center gap-1 text-[11px] font-mono tracking-wider uppercase transition-all duration-300 group whitespace-nowrap ${
                  isActive
                    ? "text-[#00E599] font-bold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <span className={`text-[9px] ${isActive ? "text-[#00E599]" : "text-neutral-500"}`}>
                  {step.num}.
                </span>
                <span className="font-sans text-[11px] font-medium tracking-normal">
                  {step.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#00E599] rounded-full shadow-[0_0_8px_rgba(0,229,153,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Navigation Moyenne (Tablettes / Écrans Moyens : 5 liens essentiels) */}
        <div className="hidden lg:flex xl:hidden items-center gap-3.5 text-xs font-medium text-neutral-300">
          <Link href="/audit" className={`hover:text-[#00E599] transition-colors ${pathname === "/audit" ? "text-[#00E599] font-bold" : ""}`}>Diagnostic</Link>
          <Link href="/fondements" className={`hover:text-[#00E599] transition-colors ${pathname === "/fondements" ? "text-[#00E599] font-bold" : ""}`}>Compréhension</Link>
          <Link href="/protocole" className={`hover:text-[#00E599] transition-colors ${pathname === "/protocole" ? "text-[#00E599] font-bold" : ""}`}>Méthode</Link>
          <Link href="/livres" className={`hover:text-[#00E599] transition-colors ${pathname === "/livres" ? "text-[#00E599] font-bold" : ""}`}>Les Traités</Link>
          <Link href="/articles" className={`hover:text-[#00E599] transition-colors ${pathname === "/articles" ? "text-[#00E599] font-bold" : ""}`}>Journal</Link>
        </div>

        {/* Boutons d'Action (Terminal Industries Layout : Vert Électrique + Blanc + Verre) */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* CTA 1 : AUDIT GRATUIT (Signal Vert Électrique #00E599) */}
          <Link
            href="/audit"
            className="relative group overflow-hidden px-3.5 sm:px-4 py-2 rounded-full bg-[#00E599] text-black font-sans font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,229,153,0.4)] hover:shadow-[0_0_35px_rgba(0,229,153,0.7)] hover:scale-[1.03]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              Audit Gratuit
              <span className="hidden sm:inline font-mono opacity-80 text-[10px]">[3 min]</span>
            </span>
          </Link>

          {/* CTA 2 : LES LIVRES (Bouton Blanc pur) */}
          <Link
            href="/livres"
            className="hidden sm:inline-flex items-center px-3.5 py-2 rounded-full bg-white text-black font-sans font-semibold text-[11px] sm:text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-300 hover:scale-[1.03]"
          >
            Les Livres
          </Link>

          {/* CTA 3 : CANDIDATURE / CONTACT (Verre & Trait fin) */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-3.5 py-2 rounded-full border border-white/20 text-white/90 font-sans font-medium text-[11px] tracking-wider uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Contact
          </Link>

          {/* Bouton Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Menu de navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu Déroulant Mobile Plein Écran Dark Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 p-5 rounded-3xl bg-[#121316]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-2.5 font-sans text-sm"
          >
            {navSteps.map((step) => {
              const isActive = pathname === step.href;
              return (
                <Link
                  key={step.href}
                  href={step.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl transition-colors ${
                    isActive ? "bg-[#00E599]/10 text-[#00E599] font-bold" : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-xs text-neutral-500">{step.num}.</span>
                  <span>{step.label}</span>
                  <span className="text-xs text-neutral-500">→</span>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#00E599] text-black font-bold text-xs uppercase tracking-wider text-center"
              >
                Passer l&apos;Audit Gratuit [3 min]
              </Link>
              <Link
                href="/livres"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs uppercase tracking-wider text-center hover:bg-white/20"
              >
                Consulter les Traités
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
