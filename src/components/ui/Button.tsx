"use client";

import Link from "next/link";
import { type ReactNode } from "react";

/* ═══════════════════════════════════════════
   Composant Button — Design System BLF
   Variantes : primary | ghost
   ═══════════════════════════════════════════ */

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] rounded-sm transition-all duration-400 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight";

const variants = {
  primary:
    "bg-transparent border border-gold text-gold hover:bg-gold hover:text-stone-950 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-cream border border-cream/20 hover:border-gold hover:text-gold active:scale-[0.97]",
};

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
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
      {children}
    </button>
  );
}
