"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function Confirmation() {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [email, setEmail] = useState("");
  const [bookId, setBookId] = useState("secrets");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (sessionId) {
        setSessionId(sessionId);
        fetch(`/api/checkout-session?session_id=${sessionId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "complete" && data.payment_status === "paid") {
              setStatus("success");
              setEmail(data.customer_email || "");
              setBookId(data.bookId || "secrets");
            } else {
              setStatus("failed");
            }
          })
          .catch(() => setStatus("failed"));
      } else {
        setStatus("failed");
      }
    }
  }, []);

  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {status === "loading" && (
          <div className="py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto" />
            <p className="text-sm text-cream-muted font-body">Vérification de la transaction sécurisée...</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-8 py-10 bg-midnight-light border border-border p-8 md:p-12 rounded-sm shadow-2xl max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-emerald/10 border border-emerald/20 text-emerald rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            
            <SectionHeading
              label="Transaction Réussie"
              title="Merci pour votre Acquisition"
              align="center"
            />

            <p className="text-sm text-cream-muted leading-relaxed font-body max-w-md mx-auto">
              Votre paiement a été validé avec succès. Un reçu de transaction a été transmis à l&apos;adresse <strong className="text-cream">{email}</strong>.
            </p>

            <div className="border-t border-border pt-8 space-y-4">
              <h4 className="font-heading text-lg text-cream font-semibold mb-4">Télécharger votre ouvrage immédiatement</h4>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href={`/api/download?session_id=${sessionId}&format=pdf`} variant="primary" className="py-3 px-6 text-center justify-center font-semibold">
                  📥 Version PDF
                </Button>
                <Button href={`/api/download?session_id=${sessionId}&format=epub`} variant="primary" className="py-3 px-6 text-center justify-center font-semibold">
                  📥 Version EPUB (Liseuse / Mobile)
                </Button>
              </div>
            </div>

            <p className="text-[10px] text-cream-muted/50 font-body">
              Ingénierie de la Souveraineté — Mounir BYAR
            </p>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-8 py-10 bg-midnight-light border border-border p-8 md:p-12 rounded-sm shadow-2xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            
            <h3 className="font-heading text-2xl text-cream font-light">Validation Suspendue</h3>
            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Nous n&apos;avons pas pu confirmer le statut du règlement. Si le montant a bien été débité, contactez le cabinet à l&apos;adresse : <code className="text-gold">contact@briserlesfrontieres.fr</code>
            </p>

            <Button href="/livres" variant="primary" className="w-full py-3 text-center justify-center">
              Retourner aux Ouvrages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
