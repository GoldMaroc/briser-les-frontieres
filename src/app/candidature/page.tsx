"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import CandidatureForm from "@/components/forms/CandidatureForm";

export default function Candidature() {
  return (
    <div className="relative py-32 bg-midnight min-h-screen">
      {/* Gradients de fond */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(27,40,56,0.35)_0%,rgba(10,17,40,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <SectionHeading
          label="Dossier de Qualification"
          title="Demande d&apos;Interposition Stratégique"
          subtitle="Ce formulaire fait office de pré-diagnostic. Mounir BYAR n&apos;accepte que les candidats montrant une réelle volonté de restructurer leur environnement et d&apos;assumer leur mandat."
        />

        {/* Intégration du formulaire */}
        <div className="mt-16">
          <CandidatureForm />
        </div>

        {/* Note de bas de page */}
        <p className="text-center text-[10px] text-cream-muted/30 max-w-md mx-auto mt-12 leading-relaxed font-body">
          Conformément au secret professionnel de l&apos;Ingénierie de la Souveraineté, toutes les données partagées sont chiffrées de bout en bout et exclusivement lues par Mounir BYAR. Aucun partage à des tiers.
        </p>

      </div>
    </div>
  );
}
