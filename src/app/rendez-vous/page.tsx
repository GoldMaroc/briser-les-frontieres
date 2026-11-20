import { Metadata } from "next";
import Link from "next/link";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Prendre Rendez-vous — Consultation avec Mounir BYAR | Cabinet BLF",
  description:
    "Réservez votre consultation avec Mounir Byar. Par téléphone/visio (48,95 € - 45 min) ou en présentiel à domicile (96,45 € - 1h15). Du lundi au samedi entre 9h et 18h (vendredi de 9h à 12h).",
};

export default function RendezVousPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-280 pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      
      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE ÉDITORIAL HAUTE JOAILLERIE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214] dark:text-[#D4A853]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E] dark:bg-[#D4A853] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              CABINET BLF • CONSULTATION PRIVÉE AVEC MOUNIR BYAR
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.08]">
            Prenez Rendez-vous avec{" "}
            <span className="text-[#B88E3E] dark:text-[#D4A853]">
              Mounir Byar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-[1.65]">
            Sélectionnez votre modalité ci-dessous : un entretien individuel par <strong>téléphone/visio (48,95 &euro;)</strong> ou une <strong>consultation en présentiel où Mounir Byar se déplace personnellement à votre domicile (96,45 &euro;)</strong>.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border)]">
              ⏱ Durée : <strong>45 min (tél) ou 1h15 (domicile)</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border)]">
              📅 Lun–Sam 09h–18h (Ven matin 09h–12h)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border)] text-[#B88E3E] dark:text-[#D4A853] font-semibold">
              ✓ Validation immédiate &amp; Paiement sécurisé
            </span>
          </div>
        </div>

        {/* COMPOSANT AGENDA DOCTOLIB SANS CHARGE COGNITIVE */}
        <div className="relative">
          <AgendaDoctolib />
        </div>

        {/* SECTION RÉASSURANCE ET LOCALISATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border)]">
          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <span className="text-lg">🏡</span>
            <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Déplacement à Domicile &amp; Visio</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              Pour le présentiel (96,45 &euro;), Mounir Byar se déplace directement chez vous afin d&apos;auditer votre habitat et sanctuariser l&apos;espace de prière. Les consultations téléphoniques (48,95 &euro;) s&apos;effectuent partout en France et à l&apos;étranger.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <span className="text-lg">🔒</span>
            <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Confidentialité &amp; Secret Médical</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              Vos échanges avec Mounir Byar sont protégés par le secret professionnel le plus rigoureux. Vos données ne sont jamais partagées ni transmises à aucun tiers.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <span className="text-lg">⚡</span>
            <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Préparer votre Entretien</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              Pour maximiser l&apos;impact de votre consultation, nous vous recommandons de passer notre audit clinique gratuit afin de poser au préalable votre cartographie de charge mentale.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#B88E3E] dark:text-[#D4A853] font-bold hover:underline pt-1"
            >
              <span>Passer l&apos;audit préparatoire</span>
              <ArrowIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
