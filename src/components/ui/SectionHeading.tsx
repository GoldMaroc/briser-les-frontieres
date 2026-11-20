"use client";

import { motion } from "framer-motion";

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
      className={`flex flex-col gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-3xl ${alignment} ${
        align === "center" ? "mx-auto" : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {/* Label Badge Statutaire Haute Joaillerie */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214] dark:text-[#D4A853] shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] animate-pulse" />
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      {/* Titre Haute Visibilité & Contraste WCAG 2.1 AA */}
      <h2 
        style={{ textWrap: "balance" }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]"
      >
        {title}
      </h2>

      {/* Sous-titre */}
      {subtitle && (
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
