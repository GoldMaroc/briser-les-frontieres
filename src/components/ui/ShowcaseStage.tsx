"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════════════════════════════
   SHOWCASE PLEIN ÉCRAN PINNÉ (STYLE MATERIAL GOURDE)
   • Au scroll : la page ne descend pas, le conteneur reste verrouillé (pin: true)
   • 4 images monumentales lumineuses et impactantes (ZÉRO écran noir, ZÉRO prière)
   • Wipe horizontal fluide de droite à gauche (clipPath)
   • Titre & sous-titre en bas à gauche, 4 pilules de progression en bas à droite
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ShowcaseStageItem {
  src: string;
  alt: string;
  tag: string;
  title: string;
  sub: string;
}

const SHOWCASE_STAGES: ShowcaseStageItem[] = [
  {
    src: "/images/instagram/photo_khalifa_sunrise.jpg",
    alt: "Aurore alpine et contemplation des horizons",
    tag: "01 // ARCHITECTURE COGNITIVE",
    title: "L'Éveil de la Lucidité",
    sub: "Restauration du cortex préfrontal et rupture avec le chaos mental quotidien.",
  },
  {
    src: "/images/instagram/photo_ocean_rahman.jpg",
    alt: "Océan apaisé et immensité de la sérénité",
    tag: "02 // PHYSIOLOGIE DU CALME",
    title: "L'Apaisement Somatique",
    sub: "Activation du nerf vague et régulation somatique profonde du cortisol toxique.",
  },
  {
    src: "/images/instagram/photo_sanctuary_dawn_editorial.jpg",
    alt: "Sanctuaire architectural lumineux à l'aube",
    tag: "03 // ANCRAGE SACRÉ & YAQÎN",
    title: "Le Sanctuaire Intérieur",
    sub: "La crainte vénérée du Créateur qui affranchit l'esprit de toute peur terrestre.",
  },
  {
    src: "/images/photo_woman_contemplation.jpg",
    alt: "Femme en contemplation souveraine et clarté intellectuelle",
    tag: "04 // SOUVERAINETÉ EN ACTION",
    title: "Le Mandat de Khalifa",
    sub: "Gouverner son être, son foyer et sa destinée dans la dignité, la piété et l'autorité souveraine.",
  },
];

export default function ShowcaseStage() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLElement | null)[]>([]);
  const stageIdxRef = useRef<number>(0);
  const stageTimerRef = useRef<number | null>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [captionBlur, setCaptionBlur] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const frames = frameRefs.current.filter(
      (el): el is HTMLElement => el !== null
    );

    const ctx = gsap.context(() => {
      if (!showcaseRef.current || frames.length !== 4) return;

      // Timeline GSAP ScrollTrigger calquée sur le projet Material Flask
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "showcaseTrigger",
          trigger: showcaseRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          onUpdate: (self: { progress: number }) => {
            const t = self.progress * 3.5;
            let nextIdx = 0;
            if (t >= 3.07) nextIdx = 3;
            else if (t >= 2.02) nextIdx = 2;
            else if (t >= 0.97) nextIdx = 1;

            if (nextIdx !== stageIdxRef.current) {
              stageIdxRef.current = nextIdx;
              setCaptionBlur(true);
              if (stageTimerRef.current !== null) {
                window.clearTimeout(stageTimerRef.current);
              }
              stageTimerRef.current = window.setTimeout(() => {
                stageTimerRef.current = null;
                setActiveStage(nextIdx);
                setCaptionBlur(false);
              }, 110);
            }
          },
        },
      });

      // Cadence des wipes : transition fluide droite -> gauche
      const wipeStarts = [0.25, 1.3, 2.35];
      frames.forEach((frame, i) => {
        if (i === 0) return;
        tl.fromTo(
          frame,
          { clipPath: "inset(0 0 0 100%)" },
          { clipPath: "inset(0 0 0 0%)", ease: "none", duration: 0.8 },
          wipeStarts[i - 1]
        );
      });
      tl.set({}, {}, 3.5);

      // Rafraîchir ScrollTrigger pour garantir le calcul exact après chargement
      ScrollTrigger.refresh();
    }, showcaseRef);

    return () => {
      ctx.revert();
      if (stageTimerRef.current !== null) {
        window.clearTimeout(stageTimerRef.current);
      }
    };
  }, []);

  const selectStage = (idx: number) => {
    setActiveStage(idx);
    stageIdxRef.current = idx;

    const st = ScrollTrigger.getById("showcaseTrigger");
    if (st) {
      const progressValues = [0, 0.35, 0.65, 0.95];
      const targetScroll = st.start + (st.end - st.start) * progressValues[idx];
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const current = SHOWCASE_STAGES[activeStage];

  return (
    <section ref={showcaseRef} className="showcase-pin select-none" id="showcase-section">
      <div className="showcase-viewport">
        
        {/* PILE D'IMAGES AVEC TRANSITION WIPE DROITE -> GAUCHE (STYLE MATERIAL GOURDE) */}
        <div className="showcase-frames">
          {SHOWCASE_STAGES.map((stage, i) => (
            <figure
              key={stage.src}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              className={`showcase-frame${i === 0 ? " is-active" : ""}`}
              data-index={i}
            >
              <img
                src={stage.src}
                alt={stage.alt}
                className="showcase-img"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>

        {/* HUD EN PLEIN ÉCRAN : TITRE & SOUS-TITRE EN BAS À GAUCHE + DASH PILLS EN BAS À DROITE */}
        <div className="showcase-hud">
          <div
            className={`showcase-caption${captionBlur ? " is-blurring" : ""}`}
            id="showcase-caption"
          >
            <span className="caption-tag">{current.tag}</span>
            <h2 className="caption-title" id="caption-title">
              {current.title}
            </h2>
            <p className="caption-sub" id="caption-sub">
              {current.sub}
            </p>
          </div>

          <div
            className="showcase-dots"
            role="tablist"
            aria-label="Paliers de progression"
          >
            {SHOWCASE_STAGES.map((stage, i) => (
              <button
                key={stage.title}
                type="button"
                role="tab"
                aria-selected={activeStage === i}
                className={`stage-dot${activeStage === i ? " is-active" : ""}`}
                aria-label={`Palier ${i + 1} - ${stage.title}`}
                onClick={() => selectStage(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
