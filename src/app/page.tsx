"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTimeTheme } from "@/components/ui/TimeThemeProvider";
import { testimonials, Testimonial } from "@/lib/testimonials";
import SovereigntyCyberneticHero from "@/components/ui/SovereigntyCyberneticHero";

export default function Home() {
  const { isFocusMode } = useTimeTheme();

  // États pour les témoignages interactifs
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials);
  const [activeTab, setActiveTab] = useState<'tous' | 'homme' | 'femme' | 'famille' | 'groupe'>("tous");
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragHandlers = useDraggableScroll(carouselRef);

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

  // Formulaire Avis
  const [revNom, setRevNom] = useState("");
  const [revLocalisation, setRevLocalisation] = useState("");
  const [revCat, setRevCat] = useState<'homme' | 'femme' | 'famille' | 'groupe'>("homme");
  const [revPeriod, setRevPeriod] = useState("Protocole 9 Mois");
  const [revMsg, setRevMsg] = useState("");
  const [revLoading, setRevLoading] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // Formulaire Candidature
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
      
      {/* SECTION HERO MONUMENTAL, AXIOMES, AGENDA DOCTOLIB & DOCTRINE */}
      <SovereigntyCyberneticHero />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION TÉMOIGNAGES (43 Récits Vérifiés - Style Haute Joaillerie)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="temoignages" className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E0D2] overflow-hidden text-[#141210]">
        
        {/* Glow discret */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(184,142,62,0.04)_0%,transparent_80%)] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <SectionHeading
            label="Bilan & Élévation"
            title="43 Récits de Transformation"
            subtitle="Découvrez les témoignages authentiques de croyants qui ont restauré leur clarté d'esprit, vaincu la procrastination et replacé la prière au centre de leur vie."
          />

          {/* Onglets interactifs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
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
                  className={`px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-full border ${
                    isActive
                      ? "bg-[#141210] text-white border-[#141210] shadow-sm"
                      : "bg-white text-[#5C534A] border-[#E8E0D2] hover:border-[#B88E3E] hover:text-[#141210]"
                  }`}
                >
                  {tab.label} <span className={`ml-1.5 font-mono ${isActive ? "text-[#B88E3E]" : "text-[#8C6214]"}`}>({tab.count})</span>
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
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-[#E8E0D2] shadow-md rounded-full items-center justify-center text-[#141210] hover:border-[#B88E3E] hover:text-[#B88E3E] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E]"
                        aria-label="Témoignage précédent"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => carouselRef.current?.scrollBy({ left: 420, behavior: 'smooth' })} 
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-[#E8E0D2] shadow-md rounded-full items-center justify-center text-[#141210] hover:border-[#B88E3E] hover:text-[#B88E3E] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E]"
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
                      className="w-[85vw] sm:w-[420px] flex-shrink-0 snap-center p-8 sm:p-9 border border-[#E8E0D2] bg-white rounded-3xl transition-all duration-300 hover:border-[#B88E3E] hover:shadow-[0_10px_35px_rgba(40,30,20,0.06)] flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#B88E3E] text-sm" aria-label="5 étoiles sur 5">
                            <span aria-hidden="true">★★★★★</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {t.score !== undefined && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#087B53] px-2.5 py-1 border border-emerald-200 rounded-full bg-emerald-50 font-mono">
                                Audit : {t.score}%
                              </span>
                            )}
                            {t.period && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6214] px-2.5 py-1 border border-[#B88E3E]/20 rounded-full bg-[#B88E3E]/10 font-mono">
                                {t.period}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-heading text-lg sm:text-xl text-[#141210] font-bold leading-tight">
                            {t.name}
                          </h3>
                          {t.role && (
                            <p className="text-xs text-[#7A6F64] mt-1">{t.role}</p>
                          )}
                        </div>

                        <p className="text-sm sm:text-[15px] text-[#403B35] leading-[1.65] font-sans">
                          « {t.text} »
                        </p>
                      </div>

                      {t.location && (
                        <div className="mt-8 pt-5 border-t border-[#E8E0D2] flex items-center justify-between text-xs font-mono">
                          <span className="text-[#7A6F64]">Localisation</span>
                          <span className="text-[#8C6214] font-semibold">{t.location}</span>
                        </div>
                      )}
                    </article>
                  ))}
                </motion.div>
                </div>

                {filtered.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4 text-[#7A6F64]">
                    <span className="text-[11px] uppercase tracking-wider font-mono">← Glissez pour parcourir les témoignages →</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Formulaire Laisser un Avis */}
          <div className="mt-20 border-t border-[#E8E0D2] pt-16 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#8C6214] mb-2 block font-mono font-bold">
                PARTAGEZ VOTRE PARCOURS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#141210]">
                Laisser un Témoignage
              </h3>
              <p className="mt-2 text-sm text-[#5C534A] leading-relaxed font-sans max-w-md mx-auto">
                Votre retour sincère aide les croyants à briser leurs propres frontières cognitives. Chaque témoignage est relu et validé avant publication.
              </p>
            </div>

            {revSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-emerald-200 bg-emerald-50 text-center space-y-4 rounded-3xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#087B53] text-white flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-heading text-xl font-bold text-[#141210]">Témoignage transmis avec succès</h4>
                <p className="text-sm text-[#5C534A] font-sans leading-relaxed max-w-sm mx-auto">
                  Barakallahu feekum pour votre retour. Mounir Byar étudiera votre message avec attention avant sa publication officielle.
                </p>
                <button
                  onClick={() => setRevSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-wider text-[#087B53] hover:underline font-bold font-mono cursor-pointer"
                >
                  Déposer un autre avis
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E0D2] shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-nom" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Prénom ou Identité</label>
                    <input
                      required
                      type="text"
                      id="rev-nom"
                      value={revNom}
                      onChange={(e) => setRevNom(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Yacine, Leïla, Dr. M..."
                      className="px-4 py-3 bg-[#FAF8F5] text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-cat" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Vous êtes :</label>
                    <select
                      id="rev-cat"
                      value={revCat}
                      onChange={(e) => setRevCat(e.target.value as any)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-[#FAF8F5] text-[#141210] border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl cursor-pointer"
                    >
                      <option value="homme">Un Homme particulier</option>
                      <option value="femme">Une Femme particulière</option>
                      <option value="famille">Une Famille / Un Couple</option>
                      <option value="groupe">Un Groupe d&apos;amis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-period" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Accompagnement Suivi</label>
                    <select
                      id="rev-period"
                      value={revPeriod}
                      onChange={(e) => setRevPeriod(e.target.value)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-[#FAF8F5] text-[#141210] border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl cursor-pointer"
                    >
                      <option value="Protocole 9 Mois">Protocole de 9 Mois — Accompagnement Complet</option>
                      <option value="Protocole 3 Mois">Protocole de 3 Mois — Structure Intense</option>
                      <option value="Protocole 1 Mois">Protocole de 1 Mois — Réajustement & Doutes</option>
                      <option value="Audit de Souveraineté">Audit de Souveraineté — Bilan initial</option>
                    </select>
                  </div>

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
                      className="px-4 py-3 bg-[#FAF8F5] text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl"
                    />
                  </div>
                </div>

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
                    className="px-4 py-3 bg-[#FAF8F5] text-[#141210] placeholder-neutral-400 border border-[#E8E0D2] focus:border-[#087B53] outline-none text-sm transition-colors rounded-xl leading-relaxed"
                  />
                </div>

                {revError && (
                  <p className="text-xs text-red-600 font-semibold text-center">{revError}</p>
                )}

                <button
                  type="submit"
                  disabled={revLoading}
                  className="w-full py-4 bg-[#087B53] hover:bg-[#066343] text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 font-heading font-bold cursor-pointer inline-flex justify-center items-center gap-2 rounded-full shadow-lg"
                >
                  {revLoading ? "Transmission confidentielle..." : "Soumettre mon témoignage pour validation"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION CANDIDATURE / CONTACT PRIVÉ
          ═══════════════════════════════════════════════════════════════ */}
      <section id="contact-comes" className="relative py-20 sm:py-28 bg-[#F5EFEB] border-b border-[#E8E0D2] text-[#141210]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-[#8C6214] mb-2 block font-mono font-bold">
              06 // CANDIDATURE & ACCOMPAGNEMENT PRIVÉ
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#141210]">
              Solliciter un Accompagnement
            </h2>
            <p className="mt-3 text-base text-[#5C534A] leading-relaxed font-sans">
              Pour postuler au <strong>Protocole de 9 Mois</strong> ou poser vos questions préalables à Mounir Byar, adressez votre demande ci-dessous.
            </p>
          </div>

          <div className="p-8 sm:p-12 border border-[#E8E0D2] bg-white shadow-xl rounded-3xl max-w-xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-200 text-[#087B53] text-xs tracking-wider uppercase text-center rounded-2xl max-w-md mx-auto font-mono font-semibold"
              >
                Votre demande a été enregistrée en toute discrétion. Mounir BYAR reprendra contact avec vous.
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-md mx-auto font-sans">
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nom-field" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Identité / Prénom</label>
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
                  <label htmlFor="email-field" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Adresse Email Professionnelle</label>
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
                  <label htmlFor="accomp-select" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Format Souhaité</label>
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
                  <label htmlFor="msg-field" className="text-[11px] uppercase tracking-wider text-[#5C534A] font-semibold font-mono">Votre Démarche & Objectifs</label>
                  <textarea
                    required
                    id="msg-field"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Exposez brièvement votre situation, vos objectifs et vos attentes..."
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
