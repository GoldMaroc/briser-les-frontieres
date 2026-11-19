"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { testimonials, Testimonial } from "@/lib/testimonials";

export default function TemoignagesPage() {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials);
  const [activeTab, setActiveTab] = useState<'tous' | 'homme' | 'femme' | 'famille' | 'groupe'>("tous");

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

  const filtered = activeTab === 'tous' 
    ? allTestimonials 
    : allTestimonials.filter(t => t.category === activeTab);

  return (
    <div className="relative min-h-screen bg-[#070707] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#F59E0B]/30">
      
      {/* Glows d'ambiance KÖM Style */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-[#FF6A88]/15 via-[#F59E0B]/10 to-transparent rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#10B981]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE ÉDITORIAL KÖM STYLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              BILAN & ÉLÉVATION • 43 RÉCITS VÉRIFIÉS
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
            ↗ Ils peuvent en{" "}
            <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
              témoigner
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-sans leading-[1.65]">
            Nos clients ne sont pas seulement satisfaits, ils deviennent les ambassadeurs de leur propre souveraineté. Découvrez leurs récits authentiques.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-white/50">
            <div>★ Note moyenne : 4,9/5</div>
            <div>• +1 200 personnes accompagnées</div>
            <div>✓ Récits 100% authentifiés</div>
          </div>
        </div>

        {/* ONGLETS DE FILTRE KÖM STYLE */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            { id: 'tous' as const, label: 'Tous les récits', count: allTestimonials.length },
            { id: 'homme' as const, label: 'Hommes', count: allTestimonials.filter(t => t.category === 'homme').length },
            { id: 'femme' as const, label: 'Femmes', count: allTestimonials.filter(t => t.category === 'femme').length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-cursor="pointer"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-black shadow-[0_0_20px_rgba(255,117,140,0.4)] scale-105"
                    : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* GRILLE DES TÉMOIGNAGES (KÖM CARDS STYLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              data-cursor="view"
              data-cursor-text="AVIS ✦"
              className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#FF758C] text-sm">
                    <span>★★★★★</span>
                  </div>
                  {t.score !== undefined && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981] px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                      Audit : {t.score}%
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {t.name}
                  </h3>
                  {t.role && (
                    <p className="text-xs text-white/50">{t.role}</p>
                  )}
                </div>

                <p className="text-sm text-white/80 font-sans leading-relaxed">
                  « {t.text} »
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>{t.period || "Protocole C.O.M.E.S."}</span>
                <span className="text-white/60 font-semibold">{t.location || "France"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BANNIÈRE KÖM POUR LAISSER UN AVIS */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF758C]">
              PARTAGEZ VOTRE EXPÉRIENCE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              ↗ Laisser un témoignage
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-sans">
              Votre retour d&apos;expérience permet à d&apos;autres croyants d&apos;assumer leur souveraineté.
            </p>
          </div>

          {revSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
              <span className="text-emerald-400 font-bold block text-lg">✓ Témoignage enregistré</span>
              <p className="text-xs text-white/70">
                Barakallahu feekum. Mounir Byar étudiera votre message avec attention avant sa publication.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-white/60">Votre prénom *</label>
                  <input
                    required
                    type="text"
                    value={revNom}
                    onChange={(e) => setRevNom(e.target.value)}
                    placeholder="Ex: Yacine, Dr. Mehdi..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] text-white outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-white/60">Votre ville / région *</label>
                  <input
                    required
                    type="text"
                    value={revLocalisation}
                    onChange={(e) => setRevLocalisation(e.target.value)}
                    placeholder="Ex: Paris, Reims, Bruxelles..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/60">Votre récit & transformation *</label>
                <textarea
                  required
                  rows={4}
                  value={revMsg}
                  onChange={(e) => setRevMsg(e.target.value)}
                  placeholder="Exposez vos blocages initiaux et l'impact du protocole sur votre clarté mentale et votre prière..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FF758C] text-white outline-none leading-relaxed"
                />
              </div>

              {revError && <p className="text-red-400 text-center">{revError}</p>}

              <button
                type="submit"
                disabled={revLoading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
              >
                {revLoading ? "Transmission..." : "↗ Soumettre mon témoignage"}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
