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
    <div className={`relative bg-[#0A0908] text-[#FBF9F5] selection:bg-[#B88E3E]/30 ${isFocusMode ? "focus-layout-active" : ""}`}>
      
      {/* SECTION HERO MONUMENTAL & DOCTRINE */}
      <SovereigntyCyberneticHero />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION TÉMOIGNAGES (43 Récits Vérifiés - Style Obys / Dark Luxury)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="temoignages" className="relative py-24 sm:py-32 bg-[#0E0C0A] border-b border-white/10 overflow-hidden text-white">
        
        {/* Glow discret */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(223,183,108,0.06)_0%,transparent_80%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <SectionHeading
            label="Bilan & Élévation"
            title="43 Récits de Transformation"
            subtitle="Découvrez les témoignages authentiques de croyants qui ont restauré leur constance, maîtrisé la charge mentale et réinstauré la prière comme pivot de leur vie."
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
                      ? "bg-white text-[#0A0908] border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {tab.label} <span className={`ml-1.5 font-mono ${isActive ? "text-[#0A0908]" : "text-[#DFB76C]"}`}>({tab.count})</span>
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
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#141210] border border-white/20 shadow-2xl rounded-full items-center justify-center text-white hover:border-[#DFB76C] hover:text-[#DFB76C] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C]"
                        aria-label="Témoignage précédent"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => carouselRef.current?.scrollBy({ left: 420, behavior: 'smooth' })} 
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#141210] border border-white/20 shadow-2xl rounded-full items-center justify-center text-white hover:border-[#DFB76C] hover:text-[#DFB76C] transition-all cursor-pointer text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C]"
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
                      className="w-[85vw] sm:w-[420px] flex-shrink-0 snap-center p-8 sm:p-9 border border-white/10 bg-[#141210] rounded-3xl transition-all duration-300 hover:border-[#DFB76C]/70 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#DFB76C] text-sm" aria-label="5 étoiles sur 5">
                            <span aria-hidden="true">★★★★★</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {t.score !== undefined && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] px-2.5 py-1 border border-emerald-500/30 rounded-full bg-emerald-950/60 font-mono">
                                Audit : {t.score}%
                              </span>
                            )}
                            {t.period && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFB76C] px-2.5 py-1 border border-[#DFB76C]/30 rounded-full bg-[#DFB76C]/10 font-mono">
                                {t.period}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-heading text-lg sm:text-xl text-white font-bold leading-tight">
                            {t.name}
                          </h3>
                          {t.role && (
                            <p className="text-xs text-white/50 mt-1">{t.role}</p>
                          )}
                        </div>

                        <p className="text-sm sm:text-[15px] text-white/80 leading-[1.65] font-sans">
                          « {t.text} »
                        </p>
                      </div>

                      {t.location && (
                        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="text-white/40">Localisation</span>
                          <span className="text-[#DFB76C] font-semibold">{t.location}</span>
                        </div>
                      )}
                    </article>
                  ))}
                </motion.div>
                </div>

                {filtered.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4 text-white/40">
                    <span className="text-[11px] uppercase tracking-wider font-mono">← Glissez pour parcourir les témoignages →</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Formulaire Laisser un Avis */}
          <div className="mt-24 border-t border-white/10 pt-20 max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#DFB76C] mb-2 block font-mono font-bold">
                PARTAGEZ VOTRE PARCOURS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Laisser un Témoignage
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed font-sans max-w-md mx-auto">
                Votre retour sincère aide les croyants à briser leurs propres frontières cognitives. Chaque témoignage est relu et validé avant publication.
              </p>
            </div>

            {revSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-emerald-500/40 bg-emerald-950/40 text-center space-y-4 rounded-3xl"
              >
                <div className="w-12 h-12 rounded-full border border-emerald-400 flex items-center justify-center mx-auto text-[#10B981] text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-heading text-xl font-bold text-white">Témoignage transmis avec succès</h4>
                <p className="text-sm text-white/70 font-sans leading-relaxed max-w-sm mx-auto">
                  Barakallahu feekum pour votre retour. Mounir Byar étudiera votre message avec attention avant sa publication officielle.
                </p>
                <button
                  onClick={() => setRevSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-wider text-[#DFB76C] hover:underline font-bold font-mono cursor-pointer"
                >
                  Déposer un autre avis
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-nom" className="text-[11px] uppercase tracking-wider text-white/60 font-semibold font-mono">Votre Prénom ou Identité</label>
                    <input
                      required
                      type="text"
                      id="rev-nom"
                      value={revNom}
                      onChange={(e) => setRevNom(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Yacine, Leïla, Dr. M..."
                      className="px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 border border-white/10 focus:border-[#DFB76C] outline-none text-sm transition-colors rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-cat" className="text-[11px] uppercase tracking-wider text-white/60 font-semibold font-mono">Vous êtes :</label>
                    <select
                      id="rev-cat"
                      value={revCat}
                      onChange={(e) => setRevCat(e.target.value as any)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-[#141210] text-white border border-white/10 focus:border-[#DFB76C] outline-none text-sm transition-colors rounded-xl cursor-pointer"
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
                    <label htmlFor="rev-period" className="text-[11px] uppercase tracking-wider text-white/60 font-semibold font-mono">Accompagnement Suivi</label>
                    <select
                      id="rev-period"
                      value={revPeriod}
                      onChange={(e) => setRevPeriod(e.target.value)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-[#141210] text-white border border-white/10 focus:border-[#DFB76C] outline-none text-sm transition-colors rounded-xl cursor-pointer"
                    >
                      <option value="Protocole 9 Mois">Protocole de 9 Mois — Accompagnement Complet</option>
                      <option value="Protocole 3 Mois">Protocole de 3 Mois — Structure Intense</option>
                      <option value="Protocole 1 Mois">Protocole de 1 Mois — Réajustement & Doutes</option>
                      <option value="Audit de Souveraineté">Audit de Souveraineté — Bilan initial</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-localisation" className="text-[11px] uppercase tracking-wider text-white/60 font-semibold font-mono">Votre Ville / Région</label>
                    <input
                      required
                      type="text"
                      id="rev-localisation"
                      value={revLocalisation}
                      onChange={(e) => setRevLocalisation(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Paris, Reims, Bruxelles, Lyon..."
                      className="px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 border border-white/10 focus:border-[#DFB76C] outline-none text-sm transition-colors rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rev-message" className="text-[11px] uppercase tracking-wider text-white/60 font-semibold font-mono">Votre Récit & Transformation</label>
                  <textarea
                    required
                    id="rev-message"
                    rows={4}
                    value={revMsg}
                    onChange={(e) => setRevMsg(e.target.value)}
                    disabled={revLoading}
                    placeholder="Parlez avec sincérité de vos blocages résolus (At-Taswîf, prière saccadée, doutes, retour au Fajr...) et de votre renouveau spirituel..."
                    className="px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 border border-white/10 focus:border-[#DFB76C] outline-none text-sm transition-colors rounded-xl leading-relaxed"
                  />
                </div>

                {revError && (
                  <p className="text-xs text-red-400 font-semibold text-center">{revError}</p>
                )}

                <button
                  type="submit"
                  disabled={revLoading}
                  className="w-full py-4 bg-[#DFB76C] hover:bg-[#C9A256] text-[#0A0908] text-xs tracking-[0.15em] uppercase transition-all duration-300 font-heading font-extrabold cursor-pointer inline-flex justify-center items-center gap-2 rounded-full shadow-lg"
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
      <section id="contact-comes" className="relative py-24 sm:py-32 bg-[#0A0908] border-b border-white/10 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#10B981] mb-3 block font-mono font-bold">
              05 // CANDIDATURE & ACCOMPAGNEMENT
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
              Solliciter un Accompagnement Privé
            </h2>
            <p className="mt-4 text-base text-white/70 leading-relaxed font-sans max-w-xl mx-auto">
              Pour postuler au <strong className="text-white">Protocole de 9 Mois</strong> (compagnonnage individuel direct avec Mounir Byar), déposez votre demande confidentielle.
            </p>
          </div>

          <div className="p-8 md:p-14 border border-white/10 bg-[#141210] shadow-2xl rounded-3xl max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-950/60 border border-emerald-500/40 text-[#10B981] text-xs tracking-wider uppercase text-center rounded-2xl max-w-md mx-auto font-mono font-semibold"
              >
                Votre demande a été enregistrée en toute discrétion. Mounir BYAR reprendra contact avec vous.
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 max-w-md mx-auto font-sans">
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nom-field" className="text-[10px] uppercase tracking-wider text-white/60 font-semibold font-mono">Identité / Prénom</label>
                  <input
                    required
                    type="text"
                    id="nom-field"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: Yacine, Dr. Sliman..."
                    className="px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 border border-white/10 focus:border-[#059669] outline-none text-sm transition-colors rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-field" className="text-[10px] uppercase tracking-wider text-white/60 font-semibold font-mono">Adresse Email Professionnelle</label>
                  <input
                    required
                    type="email"
                    id="email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: contact@votre-domaine.com"
                    className="px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 border border-white/10 focus:border-[#059669] outline-none text-sm transition-colors rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="accomp-select" className="text-[10px] uppercase tracking-wider text-white/60 font-semibold font-mono">Format Souhaité</label>
                  <select
                    id="accomp-select"
                    value={accompagnementSelect}
                    onChange={(e) => setAccompagnementSelect(e.target.value)}
                    disabled={loading}
                    className="px-4 py-3 bg-[#141210] text-white border border-white/10 focus:border-[#059669] outline-none text-sm transition-colors rounded-xl cursor-pointer"
                  >
                    <option value="9mois">Protocole 9 Mois — Compagnonnage d&apos;Élite</option>
                    <option value="30jours">Protocole 30 Jours — Réinitialisation Cognitive</option>
                    <option value="audit">Audit Privé de Souveraineté (1h30)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="msg-field" className="text-[10px] uppercase tracking-wider text-white/60 font-semibold font-mono">Votre Démarche & Objectifs</label>
                  <textarea
                    required
                    id="msg-field"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Exposez brièvement votre situation, votre métier et vos attentes..."
                    className="px-4 py-3 bg-white/[0.04] text-white placeholder-white/30 border border-white/10 focus:border-[#059669] outline-none text-sm transition-colors rounded-xl leading-relaxed"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400 font-semibold text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#059669] to-[#047857] hover:brightness-110 text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 font-heading font-extrabold cursor-pointer inline-flex justify-center items-center gap-2 rounded-full shadow-[0_0_25px_rgba(5,150,105,0.4)]"
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
