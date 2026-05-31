"use client";

import { motion } from "framer-motion";

interface CardProps {
  icon?: React.ReactNode;
  label?: string;
  title: string;
  description: string;
  index?: number;
  variant?: "default" | "bordered" | "highlight";
}

export default function Card({
  icon,
  label,
  title,
  description,
  index = 0,
  variant = "default",
}: CardProps) {
  const variants = {
    default: "bg-surface/50 border-border hover:border-border-hover",
    bordered: "bg-transparent border-emerald/20 hover:border-emerald/40",
    highlight:
      "bg-gradient-to-b from-surface to-midnight-light border-gold-muted hover:border-gold/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`group p-8 border rounded-sm transition-all duration-500 hover:-translate-y-1 ${variants[variant]}`}
    >
      {icon && <div className="mb-5 text-emerald">{icon}</div>}
      {label && (
        <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
          {label}
        </span>
      )}
      <h3 className="font-heading text-xl md:text-2xl font-light mt-3 mb-4 text-cream group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-cream-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}
