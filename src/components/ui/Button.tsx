"use client";

import Link from "next/link";
import { type ReactNode } from "react";

/* ═══════════════════════════════════════════
   Composant Button — Style Ayocin Floating Pill
   Variantes : primary (Émeraude / Sombre) | ghost (Glassmorphism)
   ═══════════════════════════════════════════ */

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  withArrow?: boolean;
}

const baseStyles =
  "group inline-flex items-center justify-between gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E599]/50 select-none";

const variants = {
  primary:
    "bg-[#00E599] text-black shadow-[0_0_30px_rgba(0,229,153,0.4)] hover:shadow-[0_0_45px_rgba(0,229,153,0.7)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-white/10 text-white backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-[0.98] disabled:opacity-50",
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
      <span>{children}</span>
      {withArrow && (
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            variant === "primary"
              ? "bg-black/15 text-black"
              : "bg-white/15 text-white"
          }`}
        >
          ↗
        </span>
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
