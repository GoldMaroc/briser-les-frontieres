"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   Composant SectionHeading — Design System BLF
   Label + Titre + Sous-titre animés
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
      className={`flex flex-col gap-4 mb-16 max-w-3xl ${alignment} ${
        align === "center" ? "mx-auto" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Label */}
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
        {label}
      </span>

      {/* Titre */}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-tight text-cream">
        {title}
      </h2>

      {/* Sous-titre */}
      {subtitle && (
        <p className="text-base md:text-lg leading-relaxed text-cream-muted max-w-2xl mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
