"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   Composant SectionHeading — Style Ayocin Neo-Grotesque
   Label Monospace + Titre Monumental + Sous-titre Épuré
   ═══════════════════════════════════════════ */

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col gap-3 sm:gap-4 mb-16 max-w-3xl ${alignment} ${
        align === "center" ? "mx-auto" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {/* Label Ayocin Monospace avec dot indicateur */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/25 text-[#00E599]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
        <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>

      {/* Titre Ayocin Monumental Systemia */}
      <h2 className="font-heading text-3xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.04]">
        {title}
      </h2>

      {/* Sous-titre */}
      {subtitle && (
        <p className="font-sans text-base md:text-lg leading-relaxed text-neutral-300 max-w-2xl mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
