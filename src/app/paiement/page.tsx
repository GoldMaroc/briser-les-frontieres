"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  PRODUCTS_CATALOG,
  ProductCatalogItem,
  getInstallmentCents,
  formatEuros,
} from "@/lib/products";
import {
  FiCheck,
  FiLock,
  FiShield,
  FiCreditCard,
  FiArrowLeft,
  FiCalendar,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";

interface CustomerForm {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  profil: string;
}

function StripeEmbeddedForm({
  paymentIntentId,
  product,
  installments,
  amountCents,
  customer,
  validateCustomer,
}: {
  paymentIntentId: string;
  product: ProductCatalogItem;
  installments: number;
  amountCents: number;
  customer: CustomerForm;
  validateCustomer: () => boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateCustomer()) {
      return;
    }

    if (!stripe || !elements) {
      setErrorMessage("Le module bancaire sécurisé est en cours de chargement.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Mettre à jour le PaymentIntent avec les coordonnées exactes du client
      await fetch("/api/payment-intent", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          offerId: product.id,
          installments,
          ...customer,
        }),
      });

      // 2. Confirmer le paiement directement sur la page sans quitter le site
      const returnUrl = `${window.location.origin}/paiement/confirmation?offre=${product.id}&echeances=${installments}`;
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
          receipt_email: customer.email.trim().toLowerCase(),
          payment_method_data: {
            billing_details: {
              name: `${customer.prenom} ${customer.nom}`.trim(),
              email: customer.email.trim().toLowerCase(),
              phone: customer.telephone.trim(),
            },
          },
        },
      });

      if (error) {
        setErrorMessage(
          error.message || "Le règlement n'a pas pu être validé. Veuillez vérifier vos informations bancaires."
        );
      }
    } catch {
      setErrorMessage("Une erreur est survenue lors de la validation sécurisée.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full min-w-0">
      <div className="bg-[#0A1128] border border-[#D4A853]/30 rounded-sm p-3 sm:p-5 shadow-inner w-full min-w-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold flex items-center gap-1.5">
            <FiCreditCard className="text-[#D4A853] text-sm shrink-0" />
            <span>Terminal Bancaire Chiffré</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#10B981] flex items-center gap-1 font-medium">
            <FiLock className="shrink-0" /> SSL 256-Bits
          </span>
        </div>

        <div className="w-full min-w-0 overflow-hidden">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-300 font-body leading-relaxed">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full py-4 px-4 sm:px-6 bg-[#D4A853] hover:bg-[#E8C468] text-[#0A1128] font-bold text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] rounded-sm transition-all duration-300 shadow-[0_0_25px_rgba(212,168,83,0.25)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-center"
      >
        <FiLock className="text-sm shrink-0" />
        <span>
          {submitting
            ? "Validation sécurisée en cours..."
            : installments > 1
            ? `Régler la 1ère échéance (${formatEuros(amountCents)}) ➔`
            : `Valider mon règlement (${formatEuros(amountCents)}) ➔`}
        </span>
      </button>
    </form>
  );
}

function PaiementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialOfferId = searchParams.get("offre") || "3m";
  const initialInstallmentsParam = Number(searchParams.get("echeances") || "1");

  const [selectedOfferId, setSelectedOfferId] = useState<string>(
    PRODUCTS_CATALOG[initialOfferId] ? initialOfferId : "3m"
  );

  const product = useMemo(
    () => PRODUCTS_CATALOG[selectedOfferId] || PRODUCTS_CATALOG["3m"],
    [selectedOfferId]
  );

  const [installments, setInstallments] = useState<number>(
    product.allowedInstallments.includes(initialInstallmentsParam)
      ? initialInstallmentsParam
      : 1
  );

  useEffect(() => {
    if (!product.allowedInstallments.includes(installments)) {
      setInstallments(1);
    }
  }, [product, installments]);

  const [customer, setCustomer] = useState<CustomerForm>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    profil: "Homme",
  });
  const [customerError, setCustomerError] = useState("");

  const [loadingIntent, setLoadingIntent] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [publishableKey, setPublishableKey] = useState(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  const [fallbackSubmitting, setFallbackSubmitting] = useState(false);
  const [fallbackSuccess, setFallbackSuccess] = useState(false);

  const amountCents = useMemo(
    () => getInstallmentCents(product.totalCents, installments),
    [product.totalCents, installments]
  );

  useEffect(() => {
    let active = true;
    setLoadingIntent(true);

    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerId: selectedOfferId,
        installments,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (data.publishableKey) {
          setPublishableKey(data.publishableKey);
        }
        if (
          data.configured &&
          data.clientSecret &&
          (data.publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        ) {
          setConfigured(true);
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        } else {
          setConfigured(false);
          setClientSecret("");
        }
      })
      .catch(() => {
        if (!active) return;
        setConfigured(false);
      })
      .finally(() => {
        if (active) setLoadingIntent(false);
      });

    return () => {
      active = false;
    };
  }, [selectedOfferId, installments]);

  const stripePromise: Promise<Stripe | null> | null = useMemo(() => {
    const key = publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
    if (!key) return null;
    return loadStripe(key);
  }, [publishableKey]);

  const elementsOptions: StripeElementsOptions = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "night",
        labels: "above",
        variables: {
          colorPrimary: "#d4a853",
          colorBackground: "#0d1b2a",
          colorText: "#f0ede8",
          colorTextSecondary: "#a0aec0",
          colorDanger: "#ef4444",
          fontFamily: "Inter, system-ui, sans-serif",
          spacingUnit: "3px",
          borderRadius: "2px",
        },
        rules: {
          ".Input": {
            backgroundColor: "#0a1128",
            border: "1px solid rgba(212, 168, 83, 0.25)",
            color: "#f0ede8",
            padding: "10px 12px",
            fontSize: "13px",
          },
          ".Input:focus": {
            border: "1px solid #d4a853",
            boxShadow: "0 0 0 1px rgba(212, 168, 83, 0.3)",
          },
          ".Label": {
            color: "#a0aec0",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: "600",
            marginBottom: "5px",
          },
          ".Tab": {
            backgroundColor: "#0a1128",
            border: "1px solid rgba(160, 174, 192, 0.15)",
            color: "#a0aec0",
          },
          ".Tab--selected": {
            backgroundColor: "rgba(212, 168, 83, 0.12)",
            borderColor: "#d4a853",
            color: "#d4a853",
          },
        },
      },
    }),
    [clientSecret]
  );

  const validateCustomer = () => {
    if (!customer.prenom.trim() || !customer.nom.trim()) {
      setCustomerError("Veuillez renseigner votre prénom et votre nom.");
      return false;
    }
    if (!customer.email.trim() || !customer.email.includes("@")) {
      setCustomerError("Veuillez renseigner une adresse e-mail valide pour la réception de votre reçu.");
      return false;
    }
    if (!customer.telephone.trim()) {
      setCustomerError("Veuillez renseigner votre numéro de téléphone.");
      return false;
    }
    setCustomerError("");
    return true;
  };

  const handleFallbackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomer()) return;

    setFallbackSubmitting(true);
    try {
      const scheduleLabel =
        installments > 1
          ? `Paiement en ${installments}x sans frais (0% Riba) — ${formatEuros(amountCents)} / mois (Total : ${product.priceDisplay})`
          : `Paiement comptant en 1x — ${product.priceDisplay}`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: customer.prenom.trim(),
          nom: customer.nom.trim(),
          email: customer.email.trim(),
          telephone: customer.telephone.trim(),
          adresse: "Souscription Directe Page Paiement",
          codePostal: "00000",
          ville: customer.profil,
          typeRelation: `Souscription : ${product.title}`,
          formuleAccompagnement: product.category === "coaching" ? product.title : "aucune",
          livreSelection: product.category === "book" ? product.title : "aucun",
          message: `Demande d'acquisition enregistrée depuis la page de paiement personnalisée.\nPrestation : ${product.title}\nModalité choisie : ${scheduleLabel}\nProfil : ${customer.profil}`,
        }),
      });

      if (res.ok) {
        setFallbackSuccess(true);
      } else {
        setCustomerError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setCustomerError("Impossible de joindre le serveur.");
    } finally {
      setFallbackSubmitting(false);
    }
  };

  const coachingOffers = ["audit", "30j", "3m", "12m"];
  const bookOffers = ["secrets", "rahman"];

  return (
    <div className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 bg-[#0A1128] text-[#F0EDE8] min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Halo lumineux supérieur contenu */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,rgba(212,168,83,0.08)_0%,rgba(10,17,40,0)_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        {/* Barre de retour et en-tête de sécurité */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-5 sm:pb-7 border-b border-white/10">
          <Link
            href={product.category === "book" ? "/livres" : "/offres"}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#A0AEC0] hover:text-[#D4A853] transition-colors"
          >
            <FiArrowLeft className="text-[#D4A853] shrink-0" />
            <span className="truncate">
              Retour {product.category === "book" ? "aux Ouvrages" : "aux Offres"}
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] text-[#A0AEC0] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-[#D4A853]">
              <FiShield className="shrink-0" /> Portail Officiel BLF
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1 text-[#10B981]">
              <FiLock className="shrink-0" /> Zéro Redirection Externe
            </span>
          </div>
        </div>

        {/* Sélecteur rapide de prestation (Grille 2x2 sur mobile sans aucun débordement) */}
        <div className="mt-5 sm:mt-8 mb-6 sm:mb-10 w-full min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] font-bold">
              Prestation Sélectionnée
            </p>
            <button
              type="button"
              onClick={() => {
                const nextId = product.category === "book" ? "3m" : "secrets";
                setSelectedOfferId(nextId);
                router.replace(`/paiement?offre=${nextId}`, { scroll: false });
              }}
              className="text-[10px] text-[#A0AEC0] hover:text-[#D4A853] underline underline-offset-4 cursor-pointer"
            >
              {product.category === "book" ? "Voir Accompagnements ➔" : "Voir Ouvrages ➔"}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full">
            {(product.category === "book" ? bookOffers : coachingOffers).map((id) => {
              const item = PRODUCTS_CATALOG[id];
              const isSelected = id === selectedOfferId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSelectedOfferId(id);
                    router.replace(`/paiement?offre=${id}`, { scroll: false });
                  }}
                  className={`p-2.5 sm:px-4 sm:py-2.5 rounded-sm text-left sm:text-center text-[11px] sm:text-xs font-body transition-all cursor-pointer border min-w-0 ${
                    isSelected
                      ? "bg-[#D4A853] text-[#0A1128] font-bold border-[#D4A853] shadow-[0_0_20px_rgba(212,168,83,0.25)]"
                      : "bg-[#0D1B2A] text-[#A0AEC0] border-white/10 hover:border-[#D4A853]/40 hover:text-[#F0EDE8]"
                  }`}
                >
                  <span className="block truncate">{item.title}</span>
                  <span
                    className={`block text-[10px] sm:inline sm:ml-1 font-bold ${
                      isSelected ? "text-[#0A1128]" : "text-[#D4A853]"
                    }`}
                  >
                    {item.priceDisplay}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille principale : Colonne Gauche (Récapitulatif & Échéancier) / Colonne Droite (Paiement Intégré) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start w-full min-w-0">
          {/* COLONNE GAUCHE : RÉCAPITULATIF & ÉCHÉANCIER 0% RIBA */}
          <div className="lg:col-span-5 space-y-5 w-full min-w-0">
            <div className="bg-[#0D1B2A] border border-[#D4A853]/30 rounded-sm p-4 sm:p-7 md:p-8 relative overflow-hidden shadow-2xl w-full min-w-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/30 text-[#D4A853] text-[10px] font-bold uppercase tracking-widest mb-3 max-w-full">
                {product.category === "book" ? (
                  <FiBookOpen className="shrink-0" />
                ) : (
                  <FiAward className="shrink-0" />
                )}
                <span className="truncate">{product.badge}</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F0EDE8] font-light leading-tight break-words">
                {product.title}
              </h1>
              <p className="text-[11px] sm:text-xs text-[#D4A853] uppercase tracking-widest mt-1 font-medium">
                {product.subtitle}
              </p>

              <p className="text-xs text-[#A0AEC0] leading-relaxed mt-3 pb-5 border-b border-white/10 font-body">
                {product.description}
              </p>

              {/* CHOIX DE L'ÉCHÉANCIER (1x ou Plusieurs fois sans frais) */}
              <div className="py-5 border-b border-white/10 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#F0EDE8] font-semibold flex items-center gap-1.5">
                    <FiCalendar className="text-[#D4A853] shrink-0" /> Modalité de Règlement
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#10B981] font-bold px-2 py-0.5 bg-[#10B981]/10 border border-[#10B981]/25 rounded-sm">
                    0% Riba • Sans Frais
                  </span>
                </div>

                {product.allowedInstallments.length > 1 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.allowedInstallments.map((count) => {
                      const active = installments === count;
                      const perMonth = getInstallmentCents(product.totalCents, count);
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setInstallments(count)}
                          className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer w-full min-w-0 ${
                            active
                              ? "bg-[#D4A853]/15 border-[#D4A853] text-[#F0EDE8] shadow-[0_0_15px_rgba(212,168,83,0.15)]"
                              : "bg-[#0A1128] border-white/10 text-[#A0AEC0] hover:border-[#D4A853]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
                              {count === 1 ? "Comptant (1x)" : `En ${count} fois sans frais`}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                active
                                  ? "border-[#D4A853] bg-[#D4A853] text-[#0A1128]"
                                  : "border-[#A0AEC0]/40"
                              }`}
                            >
                              {active && <FiCheck className="text-[10px] stroke-[3]" />}
                            </div>
                          </div>
                          <div className="text-lg font-heading font-semibold text-[#F0EDE8]">
                            {formatEuros(perMonth)}
                            {count > 1 && (
                              <span className="text-xs font-body text-[#A0AEC0]"> / mois</span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#A0AEC0] mt-0.5">
                            {count === 1
                              ? "Règlement unique intégral"
                              : `${count} mensualités égales • 0 € d'intérêt`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-sm bg-[#0A1128] border border-[#D4A853]/25 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853] block">
                        Règlement Comptant (1 fois)
                      </span>
                      <span className="text-[11px] text-[#A0AEC0]">
                        Accès immédiat dès validation
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-heading font-semibold text-[#F0EDE8] shrink-0">
                      {product.priceDisplay}
                    </span>
                  </div>
                )}

                {/* Détail de l'échéancier si paiement en plusieurs fois */}
                {installments > 1 && (
                  <div className="bg-[#0A1128] border border-[#D4A853]/20 rounded-sm p-3.5 space-y-2 text-xs">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4A853] font-bold mb-1.5">
                      Échéancier Garanti Sans Intérêt (0% Riba)
                    </p>
                    {Array.from({ length: installments }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center gap-2 text-[#A0AEC0] text-[11px]"
                      >
                        <span>
                          {idx === 0
                            ? "Aujourd'hui (1ère échéance)"
                            : `Mois +${idx} (${idx + 1}ème échéance)`}
                        </span>
                        <span
                          className={`shrink-0 ${
                            idx === 0 ? "text-[#D4A853] font-bold" : "text-[#F0EDE8]"
                          }`}
                        >
                          {formatEuros(amountCents)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center font-semibold text-[#F0EDE8] text-xs">
                      <span>Total (0 € de frais)</span>
                      <span className="shrink-0">{product.priceDisplay}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Ce qui est inclus */}
              <div className="pt-5 space-y-2.5">
                <span className="text-[10px] uppercase tracking-widest text-[#D4A853] font-bold block">
                  Inclus dans votre acquisition :
                </span>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-[#A0AEC0] leading-relaxed"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total à régler aujourd'hui */}
              <div className="mt-6 pt-4 border-t border-[#D4A853]/25 flex items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[11px] uppercase tracking-widest text-[#A0AEC0] block">
                    Net à régler aujourd&apos;hui
                  </span>
                  {product.basePriceDisplay && (
                    <span className="text-xs text-[#A0AEC0]/50 line-through">
                      Prix initial : {product.basePriceDisplay}
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-[#D4A853]">
                    {formatEuros(amountCents)}
                  </span>
                  <span className="block text-[10px] text-[#10B981] uppercase tracking-wider">
                    TTC • Aucuns frais cachés
                  </span>
                </div>
              </div>
            </div>

            {/* Encart Charte Éthique 0% Riba */}
            <div className="bg-[#0D1B2A]/80 border border-white/10 rounded-sm p-4 sm:p-5 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/30 flex items-center justify-center text-[#D4A853] shrink-0 text-sm font-bold">
                ⚖
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0EDE8]">
                  Engagement Éthique — 0% Riba
                </h4>
                <p className="text-[11px] text-[#A0AEC0] leading-relaxed">
                  Toutes nos facilités de paiement en 2, 3 ou 6 fois sont proposées{" "}
                  <strong className="text-[#F0EDE8]">
                    strictement sans aucun frais de dossier ni intérêt
                  </strong>
                  , en conformité totale avec nos principes d&apos;éthique spirituelle.
                </p>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE DE SOUSCRIPTION & PAIEMENT INTÉGRÉ */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="bg-[#0D1B2A] border border-[#D4A853]/30 rounded-sm p-4 sm:p-8 md:p-10 shadow-2xl relative w-full min-w-0 overflow-hidden">
              <div className="absolute top-0 left-6 sm:left-10 w-20 sm:w-24 h-px bg-[#D4A853]" />
              <div className="absolute bottom-0 right-6 sm:right-10 w-20 sm:w-24 h-px bg-[#D4A853]" />

              {fallbackSuccess ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl text-[#F0EDE8] font-light">
                    Dossier d&apos;Acquisition Enregistré
                  </h2>
                  <p className="text-sm text-[#A0AEC0] max-w-md mx-auto leading-relaxed">
                    Merci{" "}
                    <strong className="text-[#F0EDE8]">
                      {customer.prenom} {customer.nom}
                    </strong>
                    . Votre demande pour <strong className="text-[#D4A853]">{product.title}</strong>{" "}
                    ({installments > 1 ? `en ${installments}x sans frais` : "règlement comptant"}) a
                    été transmise en priorité à Mounir BYAR.
                  </p>
                  <p className="text-xs text-[#A0AEC0] max-w-md mx-auto">
                    Un e-mail de confirmation vient d&apos;être envoyé à{" "}
                    <strong className="text-[#F0EDE8]">{customer.email}</strong>.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/"
                      className="inline-block px-8 py-3.5 bg-[#D4A853] text-[#0A1128] font-bold text-xs uppercase tracking-widest rounded-sm"
                    >
                      Retour à l&apos;Accueil
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-7 w-full min-w-0">
                  {/* ÉTAPE 1 : COORDONNÉES */}
                  <div className="space-y-4 w-full min-w-0">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] font-bold">
                          Étape 01
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl text-[#F0EDE8] font-light mt-0.5">
                          Vos Coordonnées Personnelles
                        </h2>
                      </div>
                      <span className="text-[10px] text-[#A0AEC0] uppercase tracking-wider shrink-0">
                        Confidentiel
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A0AEC0]">
                          Prénom *
                        </label>
                        <input
                          required
                          type="text"
                          value={customer.prenom}
                          onChange={(e) => setCustomer({ ...customer, prenom: e.target.value })}
                          placeholder="Votre prénom"
                          className="w-full px-3.5 py-3 bg-[#0A1128] text-[#F0EDE8] border border-white/15 focus:border-[#D4A853] outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A0AEC0]">
                          Nom *
                        </label>
                        <input
                          required
                          type="text"
                          value={customer.nom}
                          onChange={(e) => setCustomer({ ...customer, nom: e.target.value })}
                          placeholder="Votre nom"
                          className="w-full px-3.5 py-3 bg-[#0A1128] text-[#F0EDE8] border border-white/15 focus:border-[#D4A853] outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A0AEC0]">
                          Adresse E-mail (reçu & accès) *
                        </label>
                        <input
                          required
                          type="email"
                          value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          placeholder="exemple@domaine.fr"
                          className="w-full px-3.5 py-3 bg-[#0A1128] text-[#F0EDE8] border border-white/15 focus:border-[#D4A853] outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A0AEC0]">
                          Téléphone (WhatsApp / Mobile) *
                        </label>
                        <input
                          required
                          type="tel"
                          value={customer.telephone}
                          onChange={(e) => setCustomer({ ...customer, telephone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          className="w-full px-3.5 py-3 bg-[#0A1128] text-[#F0EDE8] border border-white/15 focus:border-[#D4A853] outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>
                    </div>

                    {product.category === "coaching" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A0AEC0]">
                          Profil d&apos;Accompagnement
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {["Homme", "Femme", "Couple / Famille", "Groupe"].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setCustomer({ ...customer, profil: p })}
                              className={`py-2.5 px-2 text-[11px] sm:text-xs rounded-sm border transition-all cursor-pointer truncate ${
                                customer.profil === p
                                  ? "bg-[#D4A853]/15 border-[#D4A853] text-[#D4A853] font-semibold"
                                  : "bg-[#0A1128] border-white/15 text-[#A0AEC0] hover:border-[#D4A853]/40"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {customerError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-300">
                        {customerError}
                      </div>
                    )}
                  </div>

                  {/* ÉTAPE 2 : PAIEMENT INTÉGRÉ SUR LE SITE */}
                  <div className="space-y-4 w-full min-w-0">
                    <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] font-bold">
                          Étape 02
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl text-[#F0EDE8] font-light mt-0.5">
                          Validation du Règlement
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-[#A0AEC0]">
                        <span className="px-2 py-0.5 bg-[#0A1128] border border-white/15 rounded">
                          CB
                        </span>
                        <span className="px-2 py-0.5 bg-[#0A1128] border border-white/15 rounded">
                          Visa
                        </span>
                        <span className="px-2 py-0.5 bg-[#0A1128] border border-white/15 rounded">
                          Mastercard
                        </span>
                        <span className="px-2 py-0.5 bg-[#0A1128] border border-white/15 rounded">
                          Apple Pay
                        </span>
                      </div>
                    </div>

                    {loadingIntent ? (
                      <div className="py-10 text-center space-y-3 bg-[#0A1128] border border-white/10 rounded-sm">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4A853] mx-auto" />
                        <p className="text-xs text-[#A0AEC0]">
                          Initialisation du terminal bancaire sécurisé BLF...
                        </p>
                      </div>
                    ) : configured && clientSecret && stripePromise ? (
                      <Elements stripe={stripePromise} options={elementsOptions} key={clientSecret}>
                        <StripeEmbeddedForm
                          paymentIntentId={paymentIntentId}
                          product={product}
                          installments={installments}
                          amountCents={amountCents}
                          customer={customer}
                          validateCustomer={validateCustomer}
                        />
                      </Elements>
                    ) : (
                      <form onSubmit={handleFallbackOrder} className="space-y-4">
                        <div className="bg-[#0A1128] border border-[#D4A853]/25 rounded-sm p-4 space-y-3">
                          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                            <span className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold flex items-center gap-1.5">
                              <FiCreditCard className="text-[#D4A853] text-sm shrink-0" />
                              Récapitulatif de Validation
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-[#10B981] flex items-center gap-1 font-medium">
                              <FiLock /> Sécurisé
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs py-1">
                            <span className="text-[#A0AEC0]">Prestation :</span>
                            <span className="text-[#F0EDE8] font-semibold">{product.title}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs py-1 border-t border-white/10 pt-2">
                            <span className="text-[#A0AEC0]">Échéancier choisi :</span>
                            <span className="text-[#D4A853] font-semibold">
                              {installments > 1
                                ? `${installments}x ${formatEuros(amountCents)} sans frais`
                                : `${formatEuros(amountCents)} comptant`}
                            </span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={fallbackSubmitting}
                          className="w-full py-4 px-4 bg-[#D4A853] hover:bg-[#E8C468] text-[#0A1128] font-bold text-xs uppercase tracking-[0.15em] rounded-sm transition-all duration-300 shadow-[0_0_25px_rgba(212,168,83,0.25)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <FiLock className="text-sm shrink-0" />
                          <span>
                            {fallbackSubmitting
                              ? "Validation en cours..."
                              : installments > 1
                              ? `Valider en ${installments}x (${formatEuros(amountCents)}/mois) ➔`
                              : `Valider mon acquisition (${formatEuros(amountCents)}) ➔`}
                          </span>
                        </button>
                      </form>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-[#A0AEC0]/70 text-center sm:text-left">
                      <span className="flex items-center justify-center gap-1.5">
                        <FiLock className="text-[#D4A853] shrink-0" /> Aucune donnée bancaire
                        n&apos;est stockée sur nos serveurs.
                      </span>
                      <span>Cabinet Briser les Frontières — Mounir BYAR</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaiementPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 pb-32 bg-[#0A1128] min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D4A853]" />
        </div>
      }
    >
      <PaiementContent />
    </Suspense>
  );
}
