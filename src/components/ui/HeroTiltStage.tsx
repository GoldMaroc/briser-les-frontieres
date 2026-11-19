"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type PostureKey = "qiyam" | "ruku" | "sujud";

interface PostureMeta {
  key: PostureKey;
  name: string;
  station: string;
  subtitle: string;
  image: string;
  alt: string;
  badge: string;
  metric: string;
  metricLabel: string;
}

const POSTURES: Record<PostureKey, PostureMeta> = {
  qiyam: {
    key: "qiyam",
    name: "Station Debout",
    station: "01. Le Qiyâm",
    subtitle: "Verticalité, Présence & Clarté Préfrontale",
    image: "/images/sanctuaire/muslim_qiyam_focus.jpg",
    alt: "Mounir Byar en station debout Qiyâm",
    badge: "Alignement Mental",
    metric: "100%",
    metricLabel: "Bande passante réinitialisée",
  },
  ruku: {
    key: "ruku",
    name: "L'Inclinaison",
    station: "02. Le Rukû'",
    subtitle: "Humilité & Rupture de la Tension Musculaire",
    image: "/images/sanctuaire/muslim_ruku_focus.jpg",
    alt: "Posture d'inclinaison Rukû'",
    badge: "Relâchement Spinal",
    metric: "-28%",
    metricLabel: "Tension cervicale et dorsale",
  },
  sujud: {
    key: "sujud",
    name: "La Prosternation",
    station: "03. Le Sujûd",
    subtitle: "Activation du Nerf Vague & Chute du Cortisol",
    image: "/images/sanctuaire/muslim_sujud_focus.jpg",
    alt: "Prosternation Sujûd front au sol",
    badge: "Neurobiologie Suprême",
    metric: "-40%",
    metricLabel: "Effondrement du cortisol",
  },
};

export default function HeroTiltStage() {
  const [activePosture, setActivePosture] = useState<PostureKey>("sujud");
  const stageRef = useRef<HTMLDivElement>(null);

  // Valeurs de mouvement avec physique ressort (GSAP/Lenis style)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const current = POSTURES[activePosture];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* SCÈNE 3D INTERACTIVE AVEC TILT PHYSIQUE */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full max-w-[540px] aspect-[4/5] sm:aspect-[4/5] rounded-[32px] cursor-grab active:cursor-grabbing perspective-[1200px] select-none"
      >
        {/* OMBRE DYNAMIQUE PROJETÉE AU SOL */}
        <motion.div
          style={{ x: shadowX }}
          className="absolute -bottom-6 inset-x-8 h-12 bg-black/15 blur-2xl rounded-full pointer-events-none"
        />

        {/* CONTENEUR QUI S'INCLINE EN 3D */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full rounded-[32px] overflow-hidden border border-[#E8E0D2] bg-white shadow-[0_24px_64px_rgba(20,18,16,0.08)]"
        >
          {/* IMAGE DE LA POSTURE ACTIVE */}
          <div className="relative w-full h-full">
            <Image
              src={current.image}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, 540px"
              priority
              className="object-cover object-center transition-all duration-700 filter contrast-[1.04]"
            />

            {/* DÉGRADÉ SUPÉRIEUR ET INFÉRIEUR POUR LISIBILITÉ */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-[#141210]/15 to-transparent pointer-events-none" />

            {/* BADGE STATUTAIRE EN HAUT À GAUCHE */}
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[#141210] text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
                {current.station}
              </span>
            </div>

            {/* MÉTRIQUE FLOTTANTE EN HAUT À DROITE */}
            <div className="absolute top-6 right-6 z-10 text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-[#087B53] text-white text-[11px] font-mono font-bold shadow-md">
                {current.metric}
              </span>
              <span className="block text-[9.5px] font-mono text-white/80 mt-1 uppercase tracking-wider drop-shadow">
                {current.metricLabel}
              </span>
            </div>

            {/* LÉGENDE INFÉRIEURE */}
            <div className="absolute bottom-6 inset-x-6 z-10 text-white">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B88E3E]/80 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest font-semibold mb-2 text-white">
                {current.badge}
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white leading-tight">
                {current.subtitle}
              </h3>
              <p className="text-xs text-white/80 font-sans mt-1 line-clamp-2">
                Pointez la souris pour incliner la scène en 3D.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SÉLECTEUR DE POSTURES (SWATCHES INSPIRÉES DE MATERIAL FLASK) */}
      <div
        role="radiogroup"
        aria-label="Sélectionner la station de la prière"
        className="mt-6 inline-flex p-1.5 rounded-full bg-white border border-[#E8E0D2] shadow-sm gap-1 z-10"
      >
        {(Object.keys(POSTURES) as PostureKey[]).map((key) => {
          const item = POSTURES[key];
          const isActive = activePosture === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setActivePosture(key)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-[#141210] text-white shadow-sm"
                  : "text-[#5C534A] hover:text-[#141210] hover:bg-[#FAF8F5]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive ? "bg-[#087B53] scale-125" : "bg-[#B88E3E]"
                }`}
              />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
