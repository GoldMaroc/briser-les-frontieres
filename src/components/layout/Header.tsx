"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const stepperSteps = [
  { href: "/", label: "Éveil", num: "01" },
  { href: "/audit", label: "Diagnostic", num: "02" },
  { href: "/fondements", label: "Compréhension", num: "03" },
  { href: "/protocole", label: "Méthode", num: "04" },
  { href: "/livres", label: "Outils", num: "05" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-midnight/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-heading text-2xl font-semibold tracking-[0.15em] text-cream">
            BLF
          </span>
        </Link>
 
        {/* Navigation Desktop (Stepper Linéaire) */}
        <div className="hidden lg:flex items-center gap-5">
          {stepperSteps.map((step, i) => {
            const isActive = pathname === step.href;
            return (
              <div key={step.href} className="flex items-center gap-5">
                <Link
                  href={step.href}
                  className={`relative flex items-center gap-1.5 text-[11px] font-body tracking-[0.15em] uppercase transition-all duration-300 group ${
                    isActive
                      ? "text-gold font-bold scale-102"
                      : "text-cream-muted hover:text-cream"
                  }`}
                >
                  <span className={`text-[9px] ${isActive ? "text-gold" : "text-cream-muted/60"}`}>
                    {step.num}.
                  </span>
                  {step.label}
                  <span className={`absolute -bottom-1 left-1/2 h-px bg-gold transition-all duration-400 ${isActive ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"}`} />
                </Link>
                {i < stepperSteps.length - 1 && (
                  <span className="text-cream-muted/40 text-xs font-light select-none">➔</span>
                )}
              </div>
            );
          })}
          
          <Link
            href="/offrir"
            className={`ml-4 text-[11px] font-body tracking-[0.15em] uppercase hover:text-gold-light transition-colors ${
              pathname === "/offrir" ? "text-gold font-bold" : "text-cream-muted"
            }`}
          >
            Offrir 🎁
          </Link>
          
          <Link
            href="/contact"
            className={`ml-4 px-5 py-2.5 border-2 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-400 ${
              pathname === "/contact"
                ? "bg-gold border-gold text-stone-950 font-bold"
                : "border-cream text-cream hover:bg-cream hover:text-midnight"
            }`}
          >
            06. Souveraineté
          </Link>
        </div>

        {/* Hamburger Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu de navigation"
        >
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>

        {/* Menu Mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-midnight/98 text-cream backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6"
            >
              {stepperSteps.map((step, i) => {
                const isActive = pathname === step.href;
                return (
                  <motion.div
                    key={step.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={step.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 text-xl font-heading tracking-[0.1em] transition-colors ${
                        isActive ? "text-gold font-semibold" : "text-cream-muted hover:text-cream"
                      }`}
                    >
                      <span className="text-xs text-cream-muted/60 font-body uppercase">{step.num}.</span>
                      {step.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/offrir"
                  onClick={() => setMenuOpen(false)}
                  className={`mt-2 text-center text-gold text-lg font-heading tracking-[0.1em] transition-colors block ${
                    pathname === "/offrir" ? "font-semibold" : ""
                  }`}
                >
                  Offrir une Prestation 🎁
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={`mt-4 px-8 py-3 border-2 text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-400 block ${
                    pathname === "/contact"
                      ? "bg-gold border-gold text-stone-950 font-bold"
                      : "border-cream text-cream hover:bg-cream hover:text-midnight"
                  }`}
                >
                  06. Souveraineté (Contact)
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
