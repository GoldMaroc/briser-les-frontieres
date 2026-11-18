"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTimeTheme } from "@/components/ui/TimeThemeProvider";
import { testimonials, Testimonial } from "@/lib/testimonials";
import SovereigntyCyberneticHero from "@/components/ui/SovereigntyCyberneticHero";

export default function Home() {
  const {
    isFocusMode,
  } = useTimeTheme();

  // États pour les témoignages interactifs (43 avis + avis dynamiques approuvés)
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials);
  const [activeTab, setActiveTab] = useState<'tous' | 'homme' | 'femme' | 'famille' | 'groupe'>("tous");
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragHandlers = useDraggableScroll(carouselRef);

  // Récupérer et fusionner les témoignages réels approuvés
  useEffect(() => {
    const fetchApprovedTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.testimonials) {
            setAllTestimonials([...testimonials, ...data.testimonials]);
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des avis :", err);
      }
    };
    fetchApprovedTestimonials();
  }, []);

  // États pour laisser un avis
  const [revNom, setRevNom] = useState("");
  const [revLocalisation, setRevLocalisation] = useState("");
  const [revCat, setRevCat] = useState<'homme' | 'femme' | 'famille' | 'groupe'>("homme");
  const [revPeriod, setRevPeriod] = useState("Protocole 9 Mois");
  const [revMsg, setRevMsg] = useState("");
  const [revLoading, setRevLoading] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // États pour le formulaire de candidature
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [accompagnementSelect, setAccompagnementSelect] = useState("9mois");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
    } catch {
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
    } catch {
      setRevError("Impossible de se connecter au serveur.");
    } finally {
      setRevLoading(false);
    }
  };

  return (
    <div className={`relative bg-[#FAF8F5] text-[#141210] selection:bg-[#B88E3E]/20 ${isFocusMode ? "focus-layout-active" : ""}`}>
      
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 : HERO & NARRATIF ÉDITORIAL HAUTE JOAILLERIE
          ═══════════════════════════════════════════════════════════════ */}
      <SovereigntyCyberneticHero />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION : TÉMOIGNAGES & RÉCITS DE TRANSFORMATION (43 Avis Vérifiés)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="temoignages" className="relative py-20 sm:py-28 bg-[#F5EFEB] border-b border-[#E8E0D2] overflow-hidden text-[#141210]">
        
        {/* Voile décoratif discret */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(184,142,62,0.06)_0%,transparent_80%)] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
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
                      ? "bg-[#141210] text-white border-[#141210]"
                      : "bg-white text-[#5C534A] border-[#E8E0D2] hover:border-[#141210] hover:text-[#141210]"
                  }`}
                >
                  {tab.label} <span className={`ml-1.5 font-bold ${isActive ? "text-[#E8E0D2]" : "text-[#B88E3E]"}`}>({tab.count})</span>
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
                  {/* Boutons de navigation Desktop */}
                  {filtered.length > 1 && (
                    <>
                      <button 
                        onClick={() => carouselRef.current?.scrollBy({ left: -420, behavior: 'smooth' })} 
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-[#E8E0D2] shadow-lg rounded-full items-center justify-center text-[#141210] hover:border-[#B88E3E] hover:text-[#B88E3E] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E]"
                        aria-label="Témoignage précédent"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => carouselRef.current?.scrollBy({ left: 420, behavior: 'smooth' })} 
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-[#E8E0D2] shadow-lg rounded-full items-center justify-center text-[#141210] hover:border-[#B88E3E] hover:text-[#B88E3E] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E]"
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
                      className="w-[85vw] sm:w-[420px] flex-shrink-0 snap-center p-7 sm:p-8 border border-[#E8E0D2] bg-white rounded-3xl transition-all duration-300 hover:border-[#B88E3E]/60 hover:shadow-lg flex flex-col justify-between shadow-[0_4px_20px_rgba(24,21,18,0.04)]"
                    >
                      <div className="space-y-4">
                        {/* 5 étoiles dorées pour preuve sociale immédiate */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#B88E3E] text-sm" aria-label="5 étoiles sur 5">
                            <span aria-hidden="true">★★★★★</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {t.score !== undefined && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#087B53] px-2.5 py-1 border border-[#087B53]/25 rounded-full bg-[#087B53]/10 font-mono">
                                Audit : {t.score}%
                              </span>
                            )}
                            {t.period && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B88E3E] px-2.5 py-1 border border-[#B88E3E]/25 rounded-full bg-[#B88E3E]/10 font-mono">
                                {t.period}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Auteur */}
                        <div>
                          <h3 className="font-heading text-lg text-[#141210] font-bold leading-tight">
                            {t.name}
                          </h3>
                          {t.role && (
                            <p className="text-xs text-[#7A6F64] mt-0.5">{t.role}</p>
                          )}
                        </div>

                        {/* Corps : Texte du témoignage */}
                        <p className="text-[15px] text-[#4A433B] leading-[1.6] font-sans">
                          « {t.text} »
                        </p>
                      </div>

                      {/* Bas de carte : Localisation */}
                      {t.location && (
                        <div className="mt-6 pt-4 border-t border-[#E8E0D2] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#7A6F64]">Localisation</span>
                          <span className="text-[#141210] font-semibold">{t.location}</span>
                        </div>
                      )}
                    </article>
                  ))}
                </motion.div>
                </div>

                {/* Indicateur de défilement mobile */}
                {filtered.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-2 text-[#7A6F64]">
                    <span className="text-[11px] uppercase tracking-wider font-mono">← Glissez pour découvrir plus de témoignages →</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Formulaire Laisser un Avis */}
          <div className="mt-20 border-t border-[#E8E0D2] pt-16 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B88E3E] mb-2 block font-mono font-bold">
                PARTAGEZ VOTRE PARCOURS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#141210]">
                Laisser un Témoignage
              </h3>
              <p className="mt-3 text-sm text-[#5C534A] leading-relaxed font-sans max-w-md mx-auto">
                Votre retour sincère aide les croyants à briser leurs propres frontières cognitives. Chaque témoignage est relu et validé avant publication.
              </p>
            </div>

            {revSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-emerald-300 bg-emerald-50 text-center space-y-4 rounded-3xl"
              >
                <div className="w-12 h-12 rounded-full border border-emerald-400 flex items-center justify-center mx-auto text-[#087B53] text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-heading text-xl font-bold text-[#141210]">Témoignage transmis avec succès</h4>
                <p className="text-sm text-[#5C534A] font-sans leading-relaxed max-w-sm mx-auto">
                  Barakallahu feekum pour votre retour. Mounir Byar étudiera votre message avec attention avant sa publication officielle.
                </p>
                <button
                  onClick={() => setRevSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-wider text-[#B88E3E] hover:underline font-bold font-mono cursor-pointer"
                >
                  Déposer un autre avis
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Champ Nom */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-nom" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Prénom ou Identité</label>
                    <input
                      required
                      type="text"
                      id="rev-nom"
                      value={revNom}
                      onChange={(e) => setRevNom(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Yacine, Leïla, La Famille M..."
                      className="px-4 py-3 bg-white text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#B88E3E] outline-none text-sm transition-colors rounded-xl shadow-sm"
                    />
                  </div>

                  {/* Champ Categorie */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-cat" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Vous êtes :</label>
                    <select
                      id="rev-cat"
                      value={revCat}
                      onChange={(e) => setRevCat(e.target.value as any)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-white text-[#141210] border border-[#E8E0D2] focus:border-[#B88E3E] outline-none text-sm transition-colors rounded-xl cursor-pointer shadow-sm"
                    >
                      <option value="homme">Un Homme particulier</option>
                      <option value="femme">Une Femme particulière</option>
                      <option value="famille">Une Famille / Un Couple</option>
                      <option value="groupe">Un Groupe d&apos;amis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Champ Période / Accompagnement */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-period" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Accompagnement Suivi</label>
                    <select
                      id="rev-period"
                      value={revPeriod}
                      onChange={(e) => setRevPeriod(e.target.value)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-white text-[#141210] border border-[#E8E0D2] focus:border-[#B88E3E] outline-none text-sm transition-colors rounded-xl cursor-pointer shadow-sm"
                    >
                      <option value="Protocole 9 Mois">Protocole de 9 Mois — Accompagnement Complet</option>
                      <option value="Protocole 3 Mois">Protocole de 3 Mois — Structure Intense</option>
                      <option value="Protocole 1 Mois">Protocole de 1 Mois — Réajustement & Doutes</option>
                      <option value="Audit de Souveraineté">Audit de Souveraineté — Bilan initial</option>
                    </select>
                  </div>

                  {/* Champ Localisation */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-localisation" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Ville / Région</label>
                    <input
                      required
                      type="text"
                      id="rev-localisation"
                      value={revLocalisation}
                      onChange={(e) => setRevLocalisation(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Paris, Reims, Bruxelles, Lyon..."
                      className="px-4 py-3 bg-white text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#B88E3E] outline-none text-sm transition-colors rounded-xl shadow-sm"
                    />
                  </div>
                </div>

                {/* Champ Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rev-message" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Récit & Transformation</label>
                  <textarea
                    required
                    id="rev-message"
                    rows={4}
                    value={revMsg}
                    onChange={(e) => setRevMsg(e.target.value)}
                    disabled={revLoading}
                    placeholder="Parlez avec sincérité de vos blocages résolus (At-Taswîf, prière saccadée, doutes, retour au Fajr...) et de votre renouveau spirituel..."
                    className="px-4 py-3 bg-white text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#B88E3E] outline-none text-sm transition-colors rounded-xl shadow-sm leading-relaxed"
                  />
                </div>

                {revError && (
                  <p className="text-xs text-red-600 font-semibold text-center">{revError}</p>
                )}

                <button
                  type="submit"
                  disabled={revLoading}
                  className="w-full py-4 bg-[#B88E3E] hover:bg-[#9E782E] text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 font-heading font-bold cursor-pointer inline-flex justify-center items-center gap-2 rounded-full shadow-md"
                >
                  {revLoading ? "Transmission confidentielle..." : "Soumettre mon témoignage pour validation"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION : FORMULAIRE DE CANDIDATURE / CONTACT
          ═══════════════════════════════════════════════════════════════ */}
      <section id="contact-comes" className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E0D2] text-[#141210]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#087B53] mb-3 block font-mono font-bold">
              05 // CANDIDATURE & ACCOMPAGNEMENT
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#141210]">
              Solliciter un Accompagnement Privé
            </h2>
            <p className="mt-4 text-base text-[#5C534A] leading-relaxed font-sans max-w-xl mx-auto">
              Que ce soit pour le <strong className="text-[#141210]">Protocole de 30 Jours</strong> ou pour postuler à notre accompagnement ultime, le <strong className="text-[#141210]">Protocole de 9 Mois</strong> (compagnonnage individuel direct avec Mounir Byar), déposez votre demande confidentielle.
            </p>
          </div>

          <div className="relative p-8 md:p-14 border border-[#E8E0D2] bg-white shadow-xl rounded-3xl max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-200 text-[#087B53] text-xs tracking-wider uppercase text-center rounded-2xl max-w-md mx-auto font-mono font-semibold"
              >
                Votre demande a été enregistrée en toute discrétion. Mounir BYAR reprendra contact avec vous.
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 max-w-md mx-auto font-sans">
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nom-field" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Identité / Prénom</label>
                  <input
                    required
                    type="text"
                    id="nom-field"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: Yacine, Dr. Sliman..."
                    className="px-4 py-3 bg-[#FAF8F5] text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-field" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Adresse Email Professionnelle</label>
                  <input
                    required
                    type="email"
                    id="email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: contact@votre-domaine.com"
                    className="px-4 py-3 bg-[#FAF8F5] text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="accomp-select" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Format Souhaité</label>
                  <select
                    id="accomp-select"
                    value={accompagnementSelect}
                    onChange={(e) => setAccompagnementSelect(e.target.value)}
                    disabled={loading}
                    className="px-4 py-3 bg-[#FAF8F5] text-[#141210] border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl cursor-pointer shadow-sm"
                  >
                    <option value="9mois">Protocole 9 Mois — Compagnonnage d&apos;Élite</option>
                    <option value="30jours">Protocole 30 Jours — Réinitialisation Cognitive</option>
                    <option value="audit">Audit Privé de Souveraineté (1h30)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="msg-field" className="text-[10px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Démarche & Objectifs</label>
                  <textarea
                    required
                    id="msg-field"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Exposez brièvement votre situation, votre métier et vos attentes..."
                    className="px-4 py-3 bg-[#FAF8F5] text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl shadow-sm leading-relaxed"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600 font-semibold text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#087B53] hover:bg-[#066343] text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 font-heading font-bold cursor-pointer inline-flex justify-center items-center gap-2 rounded-full shadow-lg"
                >
                  {loading ? "Envoi en cours..." : "Transmettre ma candidature →"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
