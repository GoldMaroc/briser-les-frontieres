import type { Metadata } from "next";
import AuditClient from "@/components/pages/AuditClient";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Bilan Gratuit de Souveraineté Cognitive — Diagnostic de Rectitude",
  description:
    "Auditez votre entropie décisionnelle, votre discipline numérique et l'alignement de vos Salat sous la grille d'évaluation du Protocole C.O.M.E.S.",
};

export default function AuditPage() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Gradients de fond prestigieux thématiques */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_70%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Diagnostic de Rectitude"
          title="Bilan de Souveraineté Cognitive"
          subtitle="Prenez 3 minutes pour évaluer votre degré de vulnérabilité cognitive face à l'entropie du monde moderne et de votre Nafs."
        />

        <div className="mt-12">
          <AuditClient />
        </div>
      </div>
    </div>
  );
}
