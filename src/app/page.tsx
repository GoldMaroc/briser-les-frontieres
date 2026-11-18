"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { useTimeTheme } from "@/components/ui/TimeThemeProvider";
import { testimonials, Testimonial } from "@/lib/testimonials";
import SovereigntyCyberneticHero from "@/components/ui/SovereigntyCyberneticHero";


export default function Home() {
  const {
    activeTheme,
    setActiveTheme,
    isFocusMode,
    setIsFocusMode,
    isAudioPlaying,
    setIsAudioPlaying,
    nextPrayer,
    locationName,
    setManualOverride
  } = useTimeTheme();

  // États pour les témoignages interactifs (43 avis + avis dynamiques approuvés)
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials);
  const [activeTab, setActiveTab] = useState<'tous' | 'homme' | 'femme' | 'famille' | 'groupe'>("tous");
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragHandlers = useDraggableScroll(carouselRef);
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1);

  // Réinitialiser la page quand on change d'onglet
  useEffect(() => {
    setCurrentTestimonialPage(1);
  }, [activeTab]);

  // États pour laisser un avis
  const [revNom, setRevNom] = useState("");
  const [revLocalisation, setRevLocalisation] = useState("");
  const [revCat, setRevCat] = useState<'homme' | 'femme' | 'famille' | 'groupe'>("homme");
  const [revPeriod, setRevPeriod] = useState("Protocole 9 Mois");
  const [revMsg, setRevMsg] = useState("");
  const [revLoading, setRevLoading] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // Récupérer et fusionner les témoignages réels approuvés
  useEffect(() => {
    const fetchApprovedTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.testimonials) {
            // Fusionner les témoignages statiques et dynamiques approuvés
            setAllTestimonials([...testimonials, ...data.testimonials]);
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des avis approuvés :", err);
      }
    };
    fetchApprovedTestimonials();
  }, [revSubmitted]);

  // États pour les formulaires et modales
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [accompagnementSelect, setAccompagnementSelect] = useState("9mois");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoStep, setVideoStep] = useState(0);

  // Gérer les étapes de la vidéo immersive
  useEffect(() => {
    if (!isVideoOpen) {
      setVideoStep(0);
      return;
    }

    const t1 = setTimeout(() => setVideoStep(1), 1500);   // Verset Arabe (accéléré)
    const t2 = setTimeout(() => setVideoStep(2), 6500);   // Traduction Française
    const t3 = setTimeout(() => setVideoStep(3), 12000);  // Choc de conscience
    const t4 = setTimeout(() => setVideoStep(4), 18000);  // Call to action

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isVideoOpen]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !nom || !message) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, message, accompagnement: accompagnementSelect }),
      });

      if (response.ok) {
        setSubmitted(true);
        setNom("");
        setEmail("");
        setMessage("");
      } else {
        const data = await response.json();
        setError(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revNom || !revMsg) return;

    setRevLoading(true);
    setRevError("");

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: revNom,
          categorie: revCat,
          periode: revPeriod,
          message: revMsg,
          localisation: revLocalisation,
        }),
      });

      if (response.ok) {
        setRevSubmitted(true);
        setRevNom("");
        setRevLocalisation("");
        setRevMsg("");
      } else {
        const data = await response.json();
        setRevError(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setRevError("Impossible de se connecter au serveur.");
    } finally {
      setRevLoading(false);
    }
  };


  return (
    <div className={`relative bg-[#FAF8F5] text-[#181512] selection:bg-[#B88E3E]/20 ${isFocusMode ? "focus-layout-active" : ""}`}>
      
      {/* ═══════════════════════════════════════════
          SECTION 1 : HERO & NARRATIF EN BEIGE & DORÉ
          ═══════════════════════════════════════════ */}
      <SovereigntyCyberneticHero />

      {/* ═══════════════════════════════════════════
          MODALE VIDÉO D&apos;ÉVEIL DE CONSCIENCE (PLEIN ÉCRAN)
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950 p-6 selection:bg-gold/20"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-100 text-xl font-bold cursor-pointer transition-colors p-3 font-body z-50"
              aria-label="Fermer la modale"
            >
              ✕ Fermer
            </button>

            {/* Effet sonore en tâche de fond pour la modale */}
            <iframe 
              src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0&controls=0&loop=1&start=100" 
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
              allow="autoplay"
            />

            <div className="max-w-4xl w-full text-center relative px-4 min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {videoStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-4"
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mx-auto mb-4" />
                    <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">Alignement des fréquences...</p>
                  </motion.div>
                )}

                {videoStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-6"
                  >
                    <h3 className="font-heading text-4xl sm:text-6xl text-gold leading-normal font-light" dir="rtl">
                      أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ...
                    </h3>
                  </motion.div>
                )}

                {videoStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-6"
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold block font-body">
                      Sourate Al-Hadid (57:16)
                    </span>
                    <h2 className="font-heading text-3xl sm:text-5xl font-light text-stone-100 leading-tight">
                      « Le moment n’est-il pas venu pour ceux qui ont cru, que leurs cœurs s’humilient à l’évocation d’Allah et devant ce qui est descendu de la vérité... ? »
                    </h2>
                  </motion.div>
                )}

                {videoStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-8 max-w-2xl font-body"
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 font-semibold block">
                      L&apos;illusion de la procrastination
                    </span>
                    <h3 className="font-heading text-2xl sm:text-4xl text-stone-200 font-light leading-relaxed">
                      Vous vous dites &quot;demain&quot;. Vous remettez à &quot;plus tard&quot;.<br />
                      Chaque jour qui passe dissipe votre potentiel. Reprenez le contrôle de votre temps et de votre vie dès aujourd&apos;hui.
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Chaque prière reportée crée une charge mentale invisible. Libérez-vous de l&apos;inertie pour renouer avec un cœur apaisé et une détermination inébranlable.
                    </p>
                  </motion.div>
                )}

                {videoStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold block font-body">
                      L&apos;Excellence par la méthode
                    </span>
                    <h3 className="font-heading text-4xl sm:text-6xl text-stone-100 font-light">
                      Élevez-vous au-dessus du chaos quotidien.
                    </h3>
                    <p className="text-stone-400 text-sm font-body max-w-md mx-auto leading-relaxed">
                      Le protocole C.O.M.E.S. est conçu pour restructurer vos habitudes cognitives et spirituelles en 30 jours. L&apos;excellence n&apos;est pas un hasard, c&apos;est une méthode d&apos;ingénierie appliquée à votre vie.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <Button onClick={() => { setIsVideoOpen(false); window.location.href="/livres#secrets"; }} variant="primary">
                        Se procurer l&apos;eBook (dès 5,90 €)
                      </Button>
                      <button 
                        onClick={() => { setIsVideoOpen(false); window.location.href="#contact-comes"; }} 
                        className="px-8 py-3 border border-stone-700 text-stone-300 hover:text-stone-100 text-xs tracking-[0.15em] uppercase hover:border-gold transition-all duration-300 cursor-pointer"
                      >
                        Solliciter un contact privé
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ═══════════════════════════════════════════
          SECTION 2.6 : TÉMOIGNAGES & RÉCITS DE TRANSFORMATION (43 Avis Interactifs & Dynamiques)
          ═══════════════════════════════════════════ */}
      <section id="temoignages" className="relative py-16 sm:py-24 bg-[#F4EFEA] border-t border-[#E5E7EB] overflow-hidden text-[#111827]">
        
        {/* Fond décoratif subtil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(184,142,62,0.06)_0%,transparent_80%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeading
            label="Bilan & Élévation"
            title="43 Récits de Transformation"
            subtitle="Découvrez les témoignages authentiques de croyants qui ont restauré leur constance, maîtrisé la charge mentale et réinstauré la prière comme pivot de leur vie."
          />

          {/* Onglets interactifs de catégories avec compteurs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            {[
              { id: 'tous' as const, label: 'Tous les récits', count: allTestimonials.length },
              { id: 'homme' as const, label: 'Hommes', count: allTestimonials.filter(t => t.category === 'homme').length },
              { id: 'femme' as const, label: 'Femmes', count: allTestimonials.filter(t => t.category === 'femme').length },
            ].map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer rounded-full border shadow-sm ${
                    isActive
                      ? "bg-[#111827] text-white border-[#111827]"
                      : "bg-white text-[#374151] border-[#E5E7EB] hover:border-[#111827] hover:text-[#111827]"
                  }`}
                >
                  {tab.label} <span className={`ml-1.5 font-bold ${isActive ? "text-[#E5E7EB]" : "text-[#8C6214]"}`}>({tab.count})</span>
                </button>
              );
            })}
          </div>

          {/* Carousel de témoignages */}
          {(() => {
            const filtered = activeTab === 'tous' 
              ? allTestimonials 
              : allTestimonials.filter(t => t.category === activeTab);

            return (
              <div className="space-y-6">
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                <div className="relative group">
                  {/* Boutons de navigation PC */}
                  {filtered.length > 1 && (
                    <>
                      <button 
                        onClick={() => carouselRef.current?.scrollBy({ left: -420, behavior: 'smooth' })} 
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-[#E5E7EB] shadow-lg rounded-full items-center justify-center text-[#111827] hover:border-[#0D6E52] hover:text-[#0D6E52] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E52]"
                        aria-label="Témoignage précédent"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => carouselRef.current?.scrollBy({ left: 420, behavior: 'smooth' })} 
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-[#E5E7EB] shadow-lg rounded-full items-center justify-center text-[#111827] hover:border-[#0D6E52] hover:text-[#0D6E52] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E52]"
                        aria-label="Témoignage suivant"
                      >
                        →
                      </button>
                    </>
                  )}

                  <motion.div
                    ref={carouselRef}
                    {...dragHandlers}
                    key={activeTab}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scroll-smooth hide-scrollbar px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                  {filtered.map((t) => (
                    <article
                      key={t.id}
                      className="w-[85vw] sm:w-[420px] flex-shrink-0 snap-center p-7 sm:p-8 border border-[#E5E7EB] bg-white rounded-2xl transition-all duration-300 hover:border-[#8C6214]/50 hover:shadow-md flex flex-col justify-between shadow-[0_4px_20px_rgba(17,24,39,0.04)]"
                    >
                      <div className="space-y-4">
                        {/* 5 étoiles dorées pour preuve sociale immédiate */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#8C6214] text-sm" aria-label="5 étoiles sur 5">
                            <span aria-hidden="true">★★★★★</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {t.score !== undefined && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D6E52] px-2.5 py-1 border border-[#0D6E52]/25 rounded-full bg-[#0D6E52]/10 font-mono">
                                Audit : {t.score}%
                              </span>
                            )}
                            {t.period && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6214] px-2.5 py-1 border border-[#8C6214]/25 rounded-full bg-[#8C6214]/10 font-mono">
                                {t.period}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Auteur */}
                        <div>
                          <h3 className="font-heading text-lg text-[#111827] font-bold leading-tight">
                            {t.name}
                          </h3>
                          {t.role && (
                            <p className="text-xs text-[#4B5563] mt-0.5">{t.role}</p>
                          )}
                        </div>

                        {/* Corps : Texte du témoignage */}
                        <p className="text-[15px] text-[#374151] leading-[1.6] font-sans">
                          « {t.text} »
                        </p>
                      </div>

                      {/* Bas de carte : Localisation */}
                      {t.location && (
                        <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#6B7280]">Localisation</span>
                          <span className="text-[#111827] font-semibold">{t.location}</span>
                        </div>
                      )}
                    </article>
                  ))}
                </motion.div>
                </div>

                {/* Indicateur de défilement mobile */}
                {filtered.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-2 text-[#6B7280]">
                    <span className="text-[11px] uppercase tracking-wider font-mono">← Glissez pour découvrir plus de témoignages →</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ────────────────────────────────────────────────────────
              SOUS-SECTION : FORMULAIRE LAISSER UN AVIS
              ──────────────────────────────────────────────────────── */}
          <div className="mt-24 border-t border-[#E5DDD2] pt-20 max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B88E3E] mb-3 block font-body font-bold">
                Partagez votre parcours
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#181512]">
                Laisser un Témoignage
              </h3>
              <p className="mt-4 text-xs text-[#5C534A] leading-relaxed font-body max-w-md mx-auto">
                Votre retour sincère aide les croyants à briser leurs propres frontières cognitives. Chaque témoignage est relu et validé de manière confidentielle avant d&apos;être publié.
              </p>
            </div>

            {revSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-emerald-300 bg-emerald-50 text-center space-y-4 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full border border-emerald-400 flex items-center justify-center mx-auto text-emerald-700">
                  ✓
                </div>
                <h4 className="font-heading text-xl font-bold tracking-tight text-[#181512]">Témoignage transmis avec succès</h4>
                <p className="text-xs text-[#5C534A] font-body leading-relaxed max-w-sm mx-auto">
                  Barakallahu feekum pour votre retour. Mounir Byar étudiera votre message avec attention avant sa publication officielle.
                </p>
                <button
                  onClick={() => setRevSubmitted(false)}
                  className="mt-4 text-[10px] uppercase tracking-wider text-[#B88E3E] hover:underline font-bold font-body cursor-pointer"
                >
                  Déposer un autre avis
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-6 font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Champ Nom */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-nom" className="text-[9px] uppercase tracking-wider text-[#5C534A] font-semibold">Votre Prénom ou Identité</label>
                    <input
                      required
                      type="text"
                      id="rev-nom"
                      value={revNom}
                      onChange={(e) => setRevNom(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Yacine, Leïla, La Famille M..."
                      className="px-4 py-3 bg-white text-[#181512] placeholder-neutral-400 border border-[#E5DDD2] focus:border-[#B88E3E] outline-none text-xs transition-colors rounded-xl shadow-sm"
                    />
                  </div>

                  {/* Champ Categorie */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-cat" className="text-[9px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Vous êtes :</label>
                    <select
                      id="rev-cat"
                      value={revCat}
                      onChange={(e) => setRevCat(e.target.value as any)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-white text-[#181512] border border-[#E5DDD2] focus:border-[#B88E3E] outline-none text-xs transition-colors rounded-xl cursor-pointer shadow-sm"
                    >
                      <option value="homme">Un Homme particulier</option>
                      <option value="femme">Une Femme particulière</option>
                      <option value="famille">Une Famille / Un Couple</option>
                      <option value="groupe">Un Groupe d&apos;amis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Champ Période / Accompagnement */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-period" className="text-[9px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Accompagnement Suivi</label>
                    <select
                      id="rev-period"
                      value={revPeriod}
                      onChange={(e) => setRevPeriod(e.target.value)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-white text-[#181512] border border-[#E5DDD2] focus:border-[#B88E3E] outline-none text-xs transition-colors rounded-xl cursor-pointer shadow-sm"
                    >
                      <option value="Protocole 9 Mois">Protocole de 9 Mois — Accompagnement Complet</option>
                      <option value="Protocole 3 Mois">Protocole de 3 Mois — Structure Intense</option>
                      <option value="Protocole 1 Mois">Protocole de 1 Mois — Réajustement & Doutes</option>
                      <option value="Audit de Souveraineté">Audit de Souveraineté — Bilan initial</option>
                    </select>
                  </div>

                  {/* Champ Localisation (Ville / Commune) */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-localisation" className="text-[9px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Ville / Commune</label>
                    <input
                      required
                      type="text"
                      id="rev-localisation"
                      value={revLocalisation}
                      onChange={(e) => setRevLocalisation(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Chartres, Cormontreuil, Gueux..."
                      className="px-4 py-3 bg-white text-[#181512] placeholder-neutral-400 border border-[#E5DDD2] focus:border-[#B88E3E] outline-none text-xs transition-colors rounded-xl shadow-sm"
                    />
                  </div>
                </div>

                {/* Champ Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="rev-message" className="text-[9px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Récit (Pourquoi étiez-vous perdu ? Quel est l&apos;impact de la Salat ?)</label>
                  <textarea
                    required
                    id="rev-message"
                    rows={4}
                    value={revMsg}
                    onChange={(e) => setRevMsg(e.target.value)}
                    disabled={revLoading}
                    placeholder="Parlez avec sincérité de vos blocages résolus (At-Taswîf, prière saccadée, doutes, péchés abandonnés, retour au Fajr...) et de votre renouveau spirituel..."
                    className="px-4 py-3 bg-white text-[#181512] placeholder-neutral-400 border border-[#E5DDD2] focus:border-[#B88E3E] outline-none text-xs transition-colors rounded-xl shadow-sm leading-relaxed"
                  />
                </div>

                {revError && (
                  <p className="text-xs text-red-600 font-semibold text-center">{revError}</p>
                )}

                <button
                  type="submit"
                  disabled={revLoading}
                  className="w-full py-4 bg-[#B88E3E] text-white text-xs tracking-[0.15em] uppercase hover:bg-[#A37B32] transition-all duration-300 font-bold cursor-pointer inline-flex justify-center items-center gap-2 rounded-full shadow-md"
                >
                  {revLoading ? "Transmission confidentielle..." : "Soumettre mon témoignage pour validation"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION : FORMULAIRE DE CANDIDATURE / CONTACT
          ═══════════════════════════════════════════ */}
      <section id="contact-comes" className="relative py-28 bg-[#FAF8F5] border-t border-[#E5DDD2] text-[#181512]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087B53] mb-4 block font-mono font-bold">
              05 // CANDIDATURE & ACCOMPAGNEMENT
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#181512]">
              Solliciter un Accompagnement Privé
            </h2>
            <p className="mt-6 text-sm text-[#5C534A] leading-relaxed font-sans max-w-xl mx-auto">
              Que ce soit pour le <strong className="text-[#181512]">Protocole de 30 Jours</strong> ou pour postuler à notre accompagnement ultime, le <strong className="text-[#181512]">Protocole de 9 Mois</strong> (compagnonnage intense et interposition behavioriste), déposez votre demande confidentielle.
            </p>
          </div>

          <div className="relative p-8 md:p-14 border border-[#E5DDD2] bg-white shadow-xl rounded-3xl max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-200 text-[#087B53] text-xs tracking-wider uppercase text-center rounded-2xl max-w-md mx-auto font-mono font-semibold"
              >
                Votre demande a été enregistrée en toute discrétion. Mounir BYAR reprendra contact avec vous.
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-md mx-auto font-sans">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="nom-field" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Identité / Prénom</label>
                  <input
                    required
                    type="text"
                    id="nom-field"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: Yacine, Dr. Sliman..."
                    className="px-4 py-3 bg-[#FAF8F5] text-[#181512] placeholder-neutral-400 border border-[#E5DDD2] focus:border-[#087B53] outline-none text-xs transition-colors rounded-xl shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email-field" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Adresse Email Professionnelle</label>
                  <input
                    required
                    type="email"
                    id="email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: contact@votre-domaine.com"
                    className="px-4 py-3 bg-[#FAF8F5] text-[#181512] placeholder-neutral-400 border border-[#E5DDD2] focus:border-[#087B53] outline-none text-xs transition-colors rounded-xl shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="accompagnement-select" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Protocole Souhaité</label>
                  <select
                    id="accompagnement-select"
                    value={accompagnementSelect}
                    onChange={(e) => setAccompagnementSelect(e.target.value)}
                    disabled={loading}
                    className="px-4 py-3 bg-[#FAF8F5] text-[#181512] border border-[#E5DDD2] focus:border-[#087B53] outline-none text-xs transition-colors cursor-pointer rounded-xl shadow-sm"
                  >
                    <option value="9mois">Protocole de 9 Mois — Accompagnement Complet</option>
                    <option value="30jours">Protocole de 30 Jours — Méthode C.O.M.E.S.</option>
                    <option value="autre">Autre Demande spécifique</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message-field" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Situation / Vos Obstacles</label>
                  <textarea
                    required
                    id="message-field"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Qu&apos;est-ce qui sabote votre constance (Salat/spiritualité) ? Pourquoi repoussez-vous à plus tard ? Expliquez brièvement en toute franchise..."
                    className="px-4 py-3 bg-[#FAF8F5] text-[#181512] placeholder-neutral-400 border border-[#E5DDD2] focus:border-[#087B53] outline-none text-xs transition-colors rounded-xl shadow-sm leading-relaxed resize-y"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600 font-semibold text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#087B53] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(8,123,83,0.30)] hover:bg-[#066343] hover:shadow-[0_0_30px_rgba(8,123,83,0.50)] hover:scale-[1.02] cursor-pointer"
                >
                  {loading ? "Transmission confidentielle..." : "Soumettre ma candidature confidentielle →"}
                </button>
              </form>
            )}

            <p className="mt-8 text-center text-[10px] text-[#7A6F64] max-w-xs mx-auto leading-relaxed font-mono">
              CONFIDENTIALITÉ ABSOLUE GARANTIE • CADRE RIGOUROUX ET PROTÉGÉ
            </p>
          </div>
        </div>
      </section>

      {/* SECTION TRANSITION PARCOURS LINÉAIRE */}
      <section className="relative py-24 bg-[#F4EFEA] border-t border-[#E5DDD2] text-center text-[#181512]">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#087B53] font-mono font-semibold block">➔ 06 // PASSER À LA PHASE SUPÉRIEURE</span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#181512]">
            Étape 02 : Lancez Votre Diagnostic
          </h2>
          <p className="text-sm text-[#5C534A] font-sans max-w-lg mx-auto leading-relaxed">
            Vous avez pris conscience des illusions mondaines. Il est temps d&apos;auditer avec précision votre organisation pour retrouver clarté, sérénité et alignement spirituel.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/audit" 
              className="group inline-flex items-center justify-between gap-4 px-8 sm:px-10 py-4 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(8,123,83,0.30)] hover:bg-[#066343] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Commencer le Bilan Gratuit [ 3 min ]</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link 
              href="/prix" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#E5DDD2] text-[#181512] font-heading font-medium text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all"
            >
              <span>Consulter la Grille Tarifaire</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
