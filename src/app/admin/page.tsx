import type { Metadata } from "next";
import AdminClient from "@/components/pages/AdminClient";

export const metadata: Metadata = {
  title: "Console de Qualificiation — Administration",
  description: "Portail administratif réservé au pilotage comportemental in situ et au suivi des cohortes de Briser les Frontières.",
  robots: {
    index: false, // Ne jamais indexer l'espace d'administration sur les moteurs de recherche
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="relative py-32 bg-midnight min-h-screen">
      {/* Gradients prestigieux thématiques */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_30%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <AdminClient />
      </div>
    </div>
  );
}
