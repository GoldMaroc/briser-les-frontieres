"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { testimonials, Testimonial } from "@/lib/testimonials";
import ArrowIcon from "@/components/ui/ArrowIcon";

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
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141210] pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      
      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE ÉDITORIAL HAUTE JOAILLERIE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              BILAN & ÉLÉVATION • 43 RÉCITS VÉRIFIÉS
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#141210] tracking-tight leading-[1.08]">
            Ils peuvent en{" "}
            <span className="text-[#B88E3E]">
              témoigner
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
            Découvrez les témoignages authentiques d&apos;hommes, de femmes, de familles et de confrères qui ont restauré leur clarté d&apos;esprit et vaincu la procrastination grâce au protocole C.O.M.E.S.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-[#5C534A]">
            <div><span className="text-[#B88E3E]">★★★★★</span> Note moyenne : 4,9/5</div>
            <div>• +1 200 personnes accompagnées</div>
            <div><span className="text-[#087B53]">✓</span> Récits 100% authentifiés</div>
          </div>
        </div>

        {/* ONGLETS DE FILTRE */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            { id: 'tous' as const, label: 'Tous les récits', count: allTestimonials.length },
            { id: 'homme' as const, label: 'Hommes', count: allTestimonials.filter(t => t.category === 'homme').length },
            { id: 'femme' as const, label: 'Femmes', count: allTestimonials.filter(t => t.category === 'femme').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-[#141210] text-white border-[#141210] shadow-sm'
                  : 'bg-white text-[#5C534A] border-[#E8E0D2] hover:border-[#B88E3E] hover:text-[#141210]'
              }`}
            >
              {tab.label} <span className="opacity-60 ml-1">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* GRILLE DES TÉMOIGNAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
              className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#B88E3E] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-[#141210]">
                      {item.name}
                    </h3>
                    {item.role && (
                      <p className="text-xs font-mono text-[#7A6F64]">
                        {item.role}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#087B53]/10 text-[#087B53] font-semibold">
                    {item.period || "Protocole C.O.M.E.S."}
                  </span>
                </div>

                <div className="text-xs text-[#B88E3E] tracking-wider">
                  ★★★★★
                </div>

                <p className="text-xs sm:text-sm text-[#403B35] leading-relaxed italic">
                  « {item.text} »
                </p>
              </div>

              {item.score && (
                <div className="mt-6 pt-4 border-t border-[#E8E0D2] flex items-center justify-between text-xs font-mono text-[#087B53] font-semibold">
                  <span>Audit de Souveraineté</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#087B53]/10">{item.score}%</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* FORMULAIRE DE DÉPÔT D'AVIS */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E0D2] max-w-2xl mx-auto shadow-sm">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6214] font-bold">
              PARTAGE D&apos;EXPÉRIENCE
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-[#141210] mt-1">
              Vous avez suivi un protocole ?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C534A] mt-2">
              Votre retour aide d&apos;autres frères et sœurs à sauter le pas vers leur souveraineté.
            </p>
          </div>

          {revSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#087B53]/10 border border-[#087B53]/30 text-center space-y-2">
              <span className="text-2xl text-[#087B53] font-bold">✓</span>
              <h4 className="font-heading font-bold text-base text-[#141210]">
                Merci infiniment pour votre témoignage !
              </h4>
              <p className="text-xs font-mono text-[#5C534A]">
                Votre retour a été transmis et sera publié après validation par notre équipe.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#141210] mb-1.5">
                    Votre Prénom / Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={revNom}
                    onChange={(e) => setRevNom(e.target.value)}
                    placeholder="Ex : Karim B."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF8F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087B53] text-sm text-[#141210]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#141210] mb-1.5">
                    Ville ou Pays
                  </label>
                  <input
                    type="text"
                    value={revLocalisation}
                    onChange={(e) => setRevLocalisation(e.target.value)}
                    placeholder="Ex : Paris, France"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF8F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087B53] text-sm text-[#141210]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#141210] mb-1.5">
                    Catégorie
                  </label>
                  <select
                    value={revCat}
                    onChange={(e) => setRevCat(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF8F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087B53] text-sm text-[#141210]"
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="famille">Famille</option>
                    <option value="groupe">Groupe d&apos;amis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#141210] mb-1.5">
                    Format Suivi
                  </label>
                  <select
                    value={revPeriod}
                    onChange={(e) => setRevPeriod(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF8F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087B53] text-sm text-[#141210]"
                  >
                    <option value="Protocole 30 Jours">Protocole 30 Jours</option>
                    <option value="Protocole 9 Mois">Protocole 9 Mois</option>
                    <option value="Les Livres & Traités">Les Livres & Traités</option>
                    <option value="Bilan Décideur">Bilan Décideur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#141210] mb-1.5">
                  Votre Récit de Transformation *
                </label>
                <textarea
                  rows={4}
                  required
                  value={revMsg}
                  onChange={(e) => setRevMsg(e.target.value)}
                  placeholder="Partagez votre situation avant / après le protocole, ce qui a changé dans votre Salât et votre quotidien..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF8F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087B53] text-xs text-[#141210]"
                />
              </div>

              {revError && (
                <div className="text-xs font-mono text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  {revError}
                </div>
              )}

              <button
                type="submit"
                disabled={revLoading}
                className="w-full py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                {revLoading ? "Envoi en cours..." : "Transmettre mon témoignage"}
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
