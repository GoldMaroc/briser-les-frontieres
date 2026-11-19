"use client";

import { motion } from "framer-motion";

interface ContinuousMarqueeProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

const DEFAULT_ITEMS = [
  "L'INGÉNIERIE DE LA SOUVERAINETÉ",
  "LA SALÂT COMME ARME DÉCISIONNELLE",
  "DOMPTER LE CORTISOL",
  "BRISER L'AT-TASWÎF (PROCRASTINATION)",
  "LE PROTOCOLE C.O.M.E.S.",
  "ASSUMER LE MANDAT DE KHALIFA",
  "SCIENCE COMPORTEMENTALE & EXÉGÈSE",
  "CABINET BLF PARIS • REIMS",
];

export default function ContinuousMarquee({
  items = DEFAULT_ITEMS,
  speed = 28,
  reverse = false,
  className = "",
}: ContinuousMarqueeProps) {
  // Répéter 3 fois pour garantir une boucle infinie continue et fluide
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap py-4 border-y border-[#E8E0D2] bg-[#F5EFEB] select-none ${className}`}>
      <motion.div
        className="inline-flex items-center gap-8"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-8 flex-shrink-0">
            <span className="font-heading font-extrabold text-xs sm:text-sm tracking-[0.22em] uppercase text-[#141210]">
              {item}
            </span>
            <span className="text-[#B88E3E] text-xs font-mono font-bold">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
