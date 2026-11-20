"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

/* ═══════════════════════════════════════════════════════════
   Composant Button — Haute Joaillerie & Dossier de Maître
   Variantes : primary (Or Royal & Encre Bleu Nuit) | dark (Obsidienne) | ghost (Glassmorphism)
   ZÉRO VERT FLUO • ZÉRO ICÔNE BLEUE
   ═══════════════════════════════════════════════════════════ */

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "dark" | "ghost";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  withArrow?: boolean;
}

const baseStyles =
  "group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-[#B88E3E] dark:bg-[#D4A853] hover:bg-[#8C6214] dark:hover:bg-[#E8C468] text-[#0A1128] shadow-[0_4px_20px_rgba(184,142,62,0.28)] hover:shadow-[0_6px_28px_rgba(184,142,62,0.40)] border border-[#B88E3E]/40 dark:border-[#D4A853]/50",
  dark:
    "bg-[#0A1128] dark:bg-[#F0EDE8] text-[#FAF8F5] dark:text-[#0A1128] hover:bg-[#142238] dark:hover:bg-[#FFFFFF] border border-[#B88E3E]/50 shadow-[0_4px_20px_rgba(10,17,40,0.3)]",
  ghost:
    "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[#B88E3E] dark:hover:border-[#D4A853] hover:bg-[var(--surface)]/80 shadow-xs",
};

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  withArrow = true,
}: ButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="tracking-widest">{children}</span>
      {withArrow && (
        <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
