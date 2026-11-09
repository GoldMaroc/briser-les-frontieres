"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PRODUCTS_CATALOG, formatEuros } from "@/lib/products";

function PaiementConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent") || "";
  const redirectStatus = searchParams.get("redirect_status") || "";
  const initialOffre = searchParams.get("offre") || "3m";

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [offerId, setOfferId] = useState(initialOffre);
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [installments, setInstallments] = useState(1);
  const [amountPaidCents, setAmountPaidCents] = useState(0);

  useEffect(() => {
    if (!paymentIntentId) {
      setStatus("failed");
      return;
    }

    fetch(`/api/payment-intent?payment_intent=${encodeURIComponent(paymentIntentId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "complete" || redirectStatus === "succeeded") {
          setStatus("success");
          setOfferId(data.offerId || initialOffre);
          setEmail(data.customerEmail || "");
          setCustomerName(data.customerName || "");
          setInstallments(data.installments || 1);
          setAmountPaidCents(data.amountPaidCents || 0);
        } else {
          setStatus("failed");
        }
      })
      .catch(() => {
        if (redirectStatus === "succeeded") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      });
  }, [paymentIntentId, redirectStatus, initialOffre]);

  const product = PRODUCTS_CATALOG[offerId] || PRODUCTS_CATALOG["3m"];

  return (
    <div className="relative pt-28 sm:pt-40 pb-24 sm:pb-32 bg-midnight min-h-screen overflow-x-hidden w-full max-w-full">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {status === "loading" && (
          <div className="py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto" />
            <p className="text-sm text-cream-muted font-body">
              Vérification sécurisée de votre transaction auprès du Cabinet BLF...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-8 py-10 bg-midnight-light border border-gold/30 p-8 md:p-12 rounded-sm shadow-2xl max-w-2xl mx-auto relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="w-16 h-16 bg-emerald/15 border border-emerald/30 text-emerald rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>

            <SectionHeading
              label="Transaction Validée"
              title="Bienvenue dans l'Excellence"
              align="center"
            />

            <p className="text-sm text-cream-muted leading-relaxed font-body max-w-lg mx-auto">
              Merci {customerName ? <strong className="text-cream">{customerName}</strong> : ""}. Votre règlement pour{" "}
              <strong className="text-gold">{product.title}</strong> a été validé avec succès.
              {email && (
                <>
                  {" "}Un récapitulatif officiel a été transmis à l&apos;adresse{" "}
                  <strong className="text-cream">{email}</strong>.
                </>
              )}
            </p>

            {/* Récapitulatif financier */}
            <div className="bg-midnight/80 border border-border rounded-sm p-5 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-cream-muted">Prestation :</span>
                <span className="text-cream font-semibold">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-muted">Montant réglé ce jour :</span>
                <span className="text-gold font-bold">
                  {amountPaidCents > 0 ? formatEuros(amountPaidCents) : product.priceDisplay}
                </span>
              </div>
              {installments > 1 && (
                <div className="flex justify-between pt-2 border-t border-border/50">
                  <span className="text-cream-muted">Modalité :</span>
                  <span className="text-emerald font-medium">
                    Paiement en {installments}x sans frais (0% Riba)
                  </span>
                </div>
              )}
            </div>

            {/* Si c'est un ouvrage : Téléchargement immédiat */}
            {product.category === "book" ? (
              <div className="border-t border-border pt-8 space-y-4">
                <h4 className="font-heading text-xl text-cream font-semibold mb-4">
                  Télécharger votre ouvrage immédiatement
                </h4>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href={`/api/download?payment_intent=${paymentIntentId}&format=pdf`}
                    variant="primary"
                    className="py-3.5 px-6 text-center justify-center font-semibold"
                  >
                    📥 Télécharger en PDF
                  </Button>
                  <Button
                    href={`/api/download?payment_intent=${paymentIntentId}&format=epub`}
                    variant="primary"
                    className="py-3.5 px-6 text-center justify-center font-semibold"
                  >
                    📥 Télécharger en EPUB (Liseuse / Mobile)
                  </Button>
                </div>
              </div>
            ) : (
              /* Si c'est un accompagnement : Prochaines étapes */
              <div className="border-t border-border pt-8 space-y-5">
                <h4 className="font-heading text-xl text-gold font-light">
                  Prochaine Étape de votre Protocole
                </h4>
                <p className="text-xs text-cream-muted leading-relaxed max-w-lg mx-auto">
                  Votre dossier client vient d&apos;être ouvert au sein du Cabinet. Mounir BYAR prendra contact avec vous sous <strong className="text-cream">24 heures</strong> pour planifier votre première séance et activer votre Espace Privé sur-mesure.
                </p>
                <div className="pt-2">
                  <Button href="/" variant="primary" className="py-3 px-8 justify-center">
                    Retourner à l&apos;Accueil du Cabinet
                  </Button>
                </div>
              </div>
            )}

            <p className="text-[10px] text-cream-muted/50 font-body pt-2">
              Ingénierie de la Souveraineté — Mounir BYAR
            </p>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-8 py-10 bg-midnight-light border border-border p-8 md:p-12 rounded-sm shadow-2xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>

            <h3 className="font-heading text-2xl text-cream font-light">Validation en Attente</h3>
            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Votre transaction n&apos;a pas pu être confirmée. Vous pouvez réessayer directement sur notre portail sécurisé ou contacter le cabinet :{" "}
              <code className="text-gold">info@briserlesfrontieres.fr</code>
            </p>

            <Button
              href={`/paiement?offre=${offerId}`}
              variant="primary"
              className="w-full py-3 text-center justify-center"
            >
              Retourner à la Page de Paiement
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaiementConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 pb-32 bg-midnight min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold" />
        </div>
      }
    >
      <PaiementConfirmationContent />
    </Suspense>
  );
}
