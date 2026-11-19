"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function KomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "book">("default");
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physique fluide inspirée de KÖM (GSAP quickTo / Framer spring)
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Ne pas activer sur les écrans tactiles
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Détecter l'élément sous le curseur
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea");

      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor") as "view" | "book" | "pointer";
        setCursorType(type || "pointer");
        setCursorText(cursorTarget.getAttribute("data-cursor-text") || (type === "view" ? "VOIR ↗" : type === "book" ? "RÉSERVER 📅" : ""));
      } else if (isClickable) {
        setCursorType("pointer");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isExpanded = cursorType === "view" || cursorType === "book";

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Curseur principal dynamique */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 84 : cursorType === "pointer" ? 44 : 14,
          height: isExpanded ? 84 : cursorType === "pointer" ? 44 : 14,
          backgroundColor: isExpanded
            ? "rgba(20, 18, 16, 0.92)"
            : cursorType === "pointer"
            ? "rgba(184, 142, 62, 0.18)"
            : "rgba(184, 142, 62, 0.9)",
          borderColor: isExpanded
            ? "rgba(184, 142, 62, 0.6)"
            : cursorType === "pointer"
            ? "rgba(184, 142, 62, 0.8)"
            : "transparent",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="rounded-full border backdrop-blur-[2px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-[#B88E3E] text-center px-2 select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
