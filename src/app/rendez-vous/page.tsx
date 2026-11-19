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
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141210] pt-24 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      
      {/* Halo subtil d'ambiance */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#B88E3E]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE ÉDITORIAL */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/25 text-[#8C6214]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              CABINET BLF • PRISE DE RENDEZ-VOUS EN LIGNE
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#141210] tracking-tight leading-[1.08]">
            Prenez Rendez-vous avec Mounir Byar
          </h1>

          <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
            Que vous souhaitiez un diagnostic téléphonique offert de 30 minutes ou une consultation présentielle approfondie en cabinet (Reims / Paris), sélectionnez votre créneau en toute autonomie ci-dessous.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-[#7A6F64]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#087B53] font-bold">✓</span>
              <span>Du Lundi au Samedi : 9h00 – 18h00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#B88E3E] font-bold">★</span>
              <span>Vendredi matin uniquement : 9h00 – 12h00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#141210] font-bold">✦</span>
              <span>Audit 30 min offert</span>
            </div>
          </div>
        </div>

        {/* L'AGENDA INTERACTIF DOCTOLIB */}
        <AgendaDoctolib />

        {/* 3 BLOCS DE RÉASSURANCE COMPLÉMENTAIRES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#087B53]/10 text-[#087B53] flex items-center justify-center text-lg font-bold">
              📞
            </div>
            <h3 className="font-heading font-bold text-lg text-[#141210]">
              Entretien Téléphonique Direct
            </h3>
            <p className="text-xs sm:text-sm text-[#5C534A] font-sans leading-relaxed">
              Mounir Byar vous contacte directement sur votre ligne mobile à l&apos;heure précise. Aucun téléchargement d&apos;application requis.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B88E3E]/10 text-[#B88E3E] flex items-center justify-center text-lg font-bold">
              📍
            </div>
            <h3 className="font-heading font-bold text-lg text-[#141210]">
              Consultation en Cabinet Présentiel
            </h3>
            <p className="text-xs sm:text-sm text-[#5C534A] font-sans leading-relaxed">
              Accueil feutré et confidentiel au Cabinet BLF à Reims Centre ou Paris 8ème. L&apos;adresse exacte et les codes d&apos;accès vous sont communiqués par SMS.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#141210]/5 text-[#141210] flex items-center justify-center text-lg font-bold">
              🔒
            </div>
            <h3 className="font-heading font-bold text-lg text-[#141210]">
              Discrétion & Secret Professionnel
            </h3>
            <p className="text-xs sm:text-sm text-[#5C534A] font-sans leading-relaxed">
              Toutes les données et échanges sont strictement confidentiels. Aucune relance intrusive ni partage de vos coordonnées.
            </p>
          </div>
        </div>

        {/* LIEN VERS LES TARIFS ET L'AUDIT EN LIGNE */}
        <div className="p-8 rounded-3xl bg-[#F5EFEB] border border-[#E8E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-base sm:text-lg text-[#141210]">
              Vous préférez d&apos;abord consulter nos tarifs ou faire l&apos;audit autonome ?
            </h4>
            <p className="text-xs text-[#5C534A]">
              Découvrez tous nos livres dès 5,90 € et nos accompagnements sur-mesure.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/prix"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#E8E0D2] text-[#141210] text-xs font-heading font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              Voir la grille tarifaire →
            </Link>
            <Link
              href="/audit"
              className="px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#066343] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Passer l&apos;audit en 3 min ↗
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
