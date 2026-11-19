import { Metadata } from "next";
import Link from "next/link";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Prendre Rendez-vous (45 min) — Agenda Officiel | Mounir BYAR",
  description:
    "Réservez votre entretien d'orientation stratégique de 45 minutes avec Mounir Byar. Téléphone/Visio ou présentiel à Paris et Reims. Du lundi au samedi entre 9h et 18h (vendredi de 9h à 12h).",
};

export default function RendezVousPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141210] pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      
      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE ÉDITORIAL HAUTE JOAILLERIE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              CABINET BLF • AGENDA OFFICIEL (CRÉNEAUX 45 MIN)
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#141210] tracking-tight leading-[1.08]">
            Prenez Rendez-vous avec{" "}
            <span className="text-[#B88E3E]">
              Mounir Byar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
            Que vous choisissiez un entretien d&apos;orientation téléphonique de 45 minutes ou une consultation présentielle en cabinet (Reims / Paris), sélectionnez votre créneau directement ci-dessous.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-mono text-[#5C534A]">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E8E0D2]">
              ⏱ Durée stricte : <strong>45 minutes</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E8E0D2]">
              📅 Lun–Sam 09h–18h (Ven matin 09h–12h)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E8E0D2] text-[#087B53] font-semibold">
              ✓ Gratuit & Sans engagement
            </span>
          </div>
        </div>

        {/* COMPOSANT AGENDA DOCTOLIB HAUTE JOAILLERIE */}
        <div className="relative">
          <AgendaDoctolib />
        </div>

        {/* SECTION RÉASSURANCE ET LOCALISATION DU CABINET */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E8E0D2]">
          <div className="p-6 rounded-2xl bg-white border border-[#E8E0D2] space-y-2">
            <span className="text-lg">📍</span>
            <h4 className="font-heading font-bold text-sm text-[#141210]">Lieux des Consultations</h4>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              Présentiel sur rendez-vous au Cabinet BLF à Reims Centre et à Paris (Quartier Opéra / Madeleine), ou par téléconsultation sécurisée partout en France et à l&apos;international.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8E0D2] space-y-2">
            <span className="text-lg">🔒</span>
            <h4 className="font-heading font-bold text-sm text-[#141210]">Confidentialité Absolue</h4>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              Vos échanges avec Mounir Byar sont protégés par le secret professionnel le plus strict. Vos données ne sont jamais partagées à des tiers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8E0D2] space-y-2">
            <span className="text-lg">⚡</span>
            <h4 className="font-heading font-bold text-sm text-[#141210]">Avant l&apos;Entretien</h4>
            <p className="text-xs text-[#5C534A] leading-relaxed">
              Pour préparer au mieux vos 45 minutes, nous vous invitons à remplir au préalable l&apos;audit rapide de 3 minutes afin que nous ayons déjà votre cartographie cognitive.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#087B53] font-bold hover:underline pt-1"
            >
              <span>Passer l&apos;audit d&apos;abord</span>
              <ArrowIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
