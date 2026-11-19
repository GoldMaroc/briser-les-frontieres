import { Metadata } from "next";
import Link from "next/link";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";

export const metadata: Metadata = {
  title: "Prendre Rendez-vous — Agenda Officiel | Mounir BYAR",
  description:
    "Réservez votre entretien téléphonique ou votre consultation présentielle avec Mounir Byar. Du lundi au samedi de 9h à 18h (vendredi de 9h à 12h). Cabinet BLF Reims & Paris.",
};

export default function RendezVousPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#FF758C]/30">
      
      {/* Halos d'ambiance volumétriques KÖM */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-[#FF758C]/15 via-[#F59E0B]/10 to-transparent rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#9333EA]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE ÉDITORIAL KÖM STYLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              CABINET BLF • PRISE DE RENDEZ-VOUS EN LIGNE
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
            ↗ Prenez Rendez-vous avec{" "}
            <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
              Mounir Byar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-sans leading-[1.65]">
            Que vous souhaitiez un diagnostic téléphonique offert de 30 minutes ou une consultation présentielle approfondie en cabinet (Reims / Paris), sélectionnez votre créneau en toute autonomie ci-dessous.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-white/50">
            <div className="flex items-center gap-1.5">
              <span className="text-[#10B981] font-bold">✓</span>
              <span>Du Lundi au Samedi : 9h00 – 18h00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#FF758C] font-bold">★</span>
              <span>Vendredi matin uniquement : 9h00 – 12h00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#FEE140] font-bold">✦</span>
              <span>Audit 30 min offert</span>
            </div>
          </div>
        </div>

        {/* L'AGENDA INTERACTIF DOCTOLIB SOMBRE DÉPOLI */}
        <AgendaDoctolib />

        {/* 3 BLOCS DE RÉASSURANCE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-lg font-bold border border-emerald-500/20">
              📞
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Entretien Téléphonique Direct
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
              Mounir Byar vous contacte directement sur votre ligne mobile à l&apos;heure précise. Aucun téléchargement d&apos;application requis.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF758C]/10 text-[#FF758C] flex items-center justify-center text-lg font-bold border border-[#FF758C]/20">
              📍
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Consultation en Cabinet Présentiel
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
              Accueil feutré et confidentiel au Cabinet BLF à Reims Centre ou Paris 8ème. L&apos;adresse exacte et les codes d&apos;accès vous sont communiqués par SMS.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center text-lg font-bold border border-white/20">
              🔒
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Discrétion & Secret Professionnel
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
              Toutes les données et échanges sont strictement confidentiels. Aucune relance intrusive ni partage de vos coordonnées.
            </p>
          </div>
        </div>

        {/* LIEN VERS LES TARIFS ET L'AUDIT EN LIGNE */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div className="space-y-1">
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-white">
              ↗ Vous préférez consulter nos tarifs ou faire l&apos;audit en autonomie ?
            </h4>
            <p className="text-xs text-white/50">
              Découvrez tous nos livres dès 5,90 € et nos accompagnements sur-mesure.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/prix"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              ↗ Voir la grille tarifaire
            </Link>
            <Link
              href="/audit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black text-xs font-heading font-extrabold uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              ↗ Passer l&apos;audit (3 min)
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
