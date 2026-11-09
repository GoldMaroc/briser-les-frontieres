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
    } catch (err: any) {
      setErrorMessage("Une erreur est survenue lors de la validation sécurisée.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-midnight/90 border border-gold/25 rounded-sm p-5 shadow-inner">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <span className="text-[11px] uppercase tracking-widest text-gold font-semibold flex items-center gap-2">
            <FiCreditCard className="text-gold text-sm" />
            Règlement Bancaire Chiffré
          </span>
          <span className="text-[10px] uppercase tracking-wider text-emerald flex items-center gap-1 font-medium">
            <FiLock /> SSL 256-Bits
          </span>
        </div>

        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-300 font-body leading-relaxed">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full py-4 px-6 bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-[0_0_25px_rgba(212,168,83,0.25)] hover:shadow-[0_0_35px_rgba(212,168,83,0.45)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3"
      >
        <FiLock className="text-sm" />
        {submitting
          ? "Validation sécurisée en cours..."
          : installments > 1
          ? `Régler la 1ère échéance (${formatEuros(amountCents)}) ➔`
          : `Valider mon règlement (${formatEuros(amountCents)}) ➔`}
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

  // Synchroniser l'échéancier quand l'offre change
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

  // État Stripe PaymentIntent
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [publishableKey, setPublishableKey] = useState(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  // Mode pré-réservation / demande de lien direct si les clés Stripe ne sont pas encore activées
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
        if (data.configured && data.clientSecret && (data.publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)) {
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
          spacingUnit: "4px",
          borderRadius: "2px",
        },
        rules: {
          ".Input": {
            backgroundColor: "#0a1128",
            border: "1px solid rgba(212, 168, 83, 0.25)",
            color: "#f0ede8",
            padding: "12px",
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
            letterSpacing: "0.08em",
            fontWeight: "600",
            marginBottom: "6px",
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
    <div className="relative pt-32 pb-28 bg-midnight min-h-screen text-cream">
      {/* Halo lumineux supérieur */}
      <div className="absolute top-0 left-0 w-full h-[550px] bg-[radial-gradient(circle_at_50%_0%,rgba(212,168,83,0.08)_0%,rgba(10,17,40,0)_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Barre de retour et en-tête de sécurité */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/60">
          <Link
            href={product.category === "book" ? "/livres" : "/offres"}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream-muted hover:text-gold transition-colors"
          >
            <FiArrowLeft className="text-gold" />
            Retour {product.category === "book" ? "aux Ouvrages" : "aux Offres d'Accompagnement"}
          </Link>

          <div className="flex items-center gap-4 text-[11px] text-cream-muted uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-gold">
              <FiShield /> Portail d&apos;Acquisition Officiel BLF
            </span>
            <span className="hidden md:inline text-border">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald">
              <FiLock /> Zéro Redirection Externe
            </span>
          </div>
        </div>

        {/* Sélecteur rapide de prestation */}
        <div className="mt-8 mb-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-3">
            Prestation Sélectionnée
          </p>
          <div className="flex flex-wrap gap-2">
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
                  className={`px-4 py-2.5 rounded-sm text-xs font-body transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-gold text-midnight font-bold border-gold shadow-[0_0_20px_rgba(212,168,83,0.25)]"
                      : "bg-midnight-light/70 text-cream-muted border-border hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {item.title} — <span className={isSelected ? "text-midnight" : "text-gold"}>{item.priceDisplay}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                const nextId = product.category === "book" ? "3m" : "secrets";
                setSelectedOfferId(nextId);
                router.replace(`/paiement?offre=${nextId}`, { scroll: false });
              }}
              className="px-3.5 py-2.5 rounded-sm text-[11px] font-body text-cream-muted/80 hover:text-gold border border-dashed border-border hover:border-gold/40 transition-colors cursor-pointer ml-auto"
            >
              {product.category === "book" ? "Voir les Accompagnements ➔" : "Voir les Ouvrages Numériques ➔"}
            </button>
          </div>
        </div>

        {/* Grille principale : Colonne Gauche (Récapitulatif & Échéancier) / Colonne Droite (Paiement Intégré) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* COLONNE GAUCHE : RÉCAPITULATIF & ÉCHÉANCIER 0% RIBA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-midnight-light/90 border border-gold/30 rounded-sm p-7 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                {product.category === "book" ? <FiBookOpen /> : <FiAward />}
                {product.badge}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl text-cream font-light leading-tight">
                {product.title}
              </h1>
              <p className="text-xs text-gold uppercase tracking-widest mt-1.5 font-medium">
                {product.subtitle}
              </p>

              <p className="text-xs text-cream-muted leading-relaxed mt-4 pb-6 border-b border-border/60 font-body">
                {product.description}
              </p>

              {/* CHOIX DE L'ÉCHÉANCIER (1x ou Plusieurs fois sans frais) */}
              <div className="py-6 border-b border-border/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-cream font-semibold flex items-center gap-2">
                    <FiCalendar className="text-gold" /> Modalité de Règlement
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-bold px-2 py-0.5 bg-emerald/10 border border-emerald/25 rounded-sm">
                    0% Riba • Sans Frais
                  </span>
                </div>

                {product.allowedInstallments.length > 1 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {product.allowedInstallments.map((count) => {
                      const active = installments === count;
                      const perMonth = getInstallmentCents(product.totalCents, count);
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setInstallments(count)}
                          className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer ${
                            active
                              ? "bg-gold/15 border-gold text-cream shadow-[0_0_15px_rgba(212,168,83,0.15)]"
                              : "bg-midnight/60 border-border text-cream-muted hover:border-gold/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-gold">
                              {count === 1 ? "Comptant (1x)" : `En ${count} fois`}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                active ? "border-gold bg-gold text-midnight" : "border-cream-muted/40"
                              }`}
                            >
                              {active && <FiCheck className="text-[10px] stroke-[3]" />}
                            </div>
                          </div>
                          <div className="text-base font-heading font-semibold text-cream">
                            {formatEuros(perMonth)}
                            {count > 1 && <span className="text-xs font-body text-cream-muted"> / mois</span>}
                          </div>
                          <div className="text-[10px] text-cream-muted mt-0.5">
                            {count === 1
                              ? "Règlement unique intégral"
                              : `${count} mensualités égales • 0 € de frais`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-sm bg-midnight/60 border border-gold/25 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                        Règlement Comptant (1 fois)
                      </span>
                      <span className="text-[11px] text-cream-muted">
                        Accès immédiat dès validation
                      </span>
                    </div>
                    <span className="text-2xl font-heading font-semibold text-cream">
                      {product.priceDisplay}
                    </span>
                  </div>
                )}

                {/* Détail de l'échéancier si paiement en plusieurs fois */}
                {installments > 1 && (
                  <div className="bg-midnight/80 border border-gold/20 rounded-sm p-4 space-y-2 text-xs">
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">
                      Échéancier Garanti Sans Intérêt (0% Riba)
                    </p>
                    {Array.from({ length: installments }).map((_, idx) => (
                      <div key={idx} className="flex justify-between items-center text-cream-muted">
                        <span>
                          {idx === 0
                            ? "Aujourd'hui (1ère échéance)"
                            : `Mois +${idx} (${idx + 1}ème échéance)`}
                        </span>
                        <span className={idx === 0 ? "text-gold font-bold" : "text-cream"}>
                          {formatEuros(amountCents)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-border/50 flex justify-between items-center font-semibold text-cream">
                      <span>Total (Strictement identique au comptant)</span>
                      <span>{product.priceDisplay}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Ce qui est inclus */}
              <div className="pt-6 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
                  Inclus dans votre acquisition :
                </span>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-cream-muted leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-gold/15 border border-gold/30 text-gold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total à régler aujourd'hui */}
              <div className="mt-7 pt-5 border-t border-gold/25 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-cream-muted block">
                    Net à régler aujourd&apos;hui
                  </span>
                  {product.basePriceDisplay && (
                    <span className="text-xs text-cream-muted/50 line-through">
                      Prix initial : {product.basePriceDisplay}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-3xl font-heading font-bold text-gold">
                    {formatEuros(amountCents)}
                  </span>
                  <span className="block text-[10px] text-emerald uppercase tracking-wider">
                    TTC • Aucuns frais cachés
                  </span>
                </div>
              </div>
            </div>

            {/* Encart Charte Éthique 0% Riba */}
            <div className="bg-midnight-light/60 border border-border rounded-sm p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 text-sm font-bold">
                ⚖
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cream">
                  Engagement Éthique — 0% Riba
                </h4>
                <p className="text-[11px] text-cream-muted leading-relaxed">
                  Toutes nos facilités de paiement en 2, 3 ou 6 fois sont proposées{" "}
                  <strong className="text-cream">strictement sans aucun frais de dossier ni intérêt</strong>,
                  en conformité totale avec nos principes d&apos;éthique spirituelle.
                </p>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE DE SOUSCRIPTION & PAIEMENT INTÉGRÉ */}
          <div className="lg:col-span-7">
            <div className="bg-midnight-light/95 border border-gold/30 rounded-sm p-7 md:p-10 shadow-2xl relative">
              <div className="absolute top-0 left-10 w-24 h-px bg-gold" />
              <div className="absolute bottom-0 right-10 w-24 h-px bg-gold" />

              {fallbackSuccess ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/40 text-emerald flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h2 className="font-heading text-3xl text-cream font-light">
                    Dossier d&apos;Acquisition Enregistré
                  </h2>
                  <p className="text-sm text-cream-muted max-w-md mx-auto leading-relaxed">
                    Merci <strong className="text-cream">{customer.prenom} {customer.nom}</strong>. Votre demande pour{" "}
                    <strong className="text-gold">{product.title}</strong> (
                    {installments > 1 ? `en ${installments}x sans frais` : "règlement comptant"}) a été transmise en priorité à Mounir BYAR.
                  </p>
                  <p className="text-xs text-cream-muted max-w-md mx-auto">
                    Un e-mail de confirmation vient d&apos;être envoyé à <strong className="text-cream">{customer.email}</strong>.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/"
                      className="inline-block px-8 py-3.5 bg-gold text-midnight font-bold text-xs uppercase tracking-widest rounded-sm"
                    >
                      Retour à l&apos;Accueil
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* ÉTAPE 1 : COORDONNÉES */}
                  <div className="space-y-5">
                    <div className="border-b border-border/60 pb-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                          Étape 01
                        </span>
                        <h2 className="font-heading text-2xl text-cream font-light mt-0.5">
                          Vos Coordonnées Personnelles
                        </h2>
                      </div>
                      <span className="text-[10px] text-cream-muted uppercase tracking-wider">
                        Confidentiel
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cream-muted">
                          Prénom *
                        </label>
                        <input
                          required
                          type="text"
                          value={customer.prenom}
                          onChange={(e) => setCustomer({ ...customer, prenom: e.target.value })}
                          placeholder="Votre prénom"
                          className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cream-muted">
                          Nom *
                        </label>
                        <input
                          required
                          type="text"
                          value={customer.nom}
                          onChange={(e) => setCustomer({ ...customer, nom: e.target.value })}
                          placeholder="Votre nom"
                          className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cream-muted">
                          Adresse E-mail (pour votre reçu & accès) *
                        </label>
                        <input
                          required
                          type="email"
                          value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          placeholder="exemple@domaine.fr"
                          className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cream-muted">
                          Téléphone (WhatsApp / Mobile) *
                        </label>
                        <input
                          required
                          type="tel"
                          value={customer.telephone}
                          onChange={(e) => setCustomer({ ...customer, telephone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                        />
                      </div>
                    </div>

                    {product.category === "coaching" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cream-muted">
                          Profil d&apos;Accompagnement
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {["Homme", "Femme", "Couple / Famille", "Groupe"].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setCustomer({ ...customer, profil: p })}
                              className={`py-2.5 px-3 text-xs rounded-sm border transition-all cursor-pointer ${
                                customer.profil === p
                                  ? "bg-gold/15 border-gold text-gold font-semibold"
                                  : "bg-midnight border-border text-cream-muted hover:border-gold/40"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {customerError && (
                      <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-300">
                        {customerError}
                      </div>
                    )}
                  </div>

                  {/* ÉTAPE 2 : PAIEMENT INTÉGRÉ SUR LE SITE */}
                  <div className="space-y-5">
                    <div className="border-b border-border/60 pb-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                          Étape 02
                        </span>
                        <h2 className="font-heading text-2xl text-cream font-light mt-0.5">
                          Validation du Règlement
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-cream-muted">
                        <span className="px-2 py-0.5 bg-midnight border border-border rounded text-[10px]">
                          CB
                        </span>
                        <span className="px-2 py-0.5 bg-midnight border border-border rounded text-[10px]">
                          Visa
                        </span>
                        <span className="px-2 py-0.5 bg-midnight border border-border rounded text-[10px]">
                          Mastercard
                        </span>
                        <span className="px-2 py-0.5 bg-midnight border border-border rounded text-[10px]">
                          Apple Pay
                        </span>
                      </div>
                    </div>

                    {loadingIntent ? (
                      <div className="py-12 text-center space-y-3 bg-midnight/60 border border-border rounded-sm">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mx-auto" />
                        <p className="text-xs text-cream-muted">
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
                      /* Si les clés API Stripe Live ne sont pas encore injectées sur Vercel ou si c'est un livre avec lien direct */
                      <form onSubmit={handleFallbackOrder} className="space-y-5">
                        <div className="bg-midnight/90 border border-gold/25 rounded-sm p-5 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-border/60">
                            <span className="text-[11px] uppercase tracking-widest text-gold font-semibold flex items-center gap-2">
                              <FiCreditCard className="text-gold text-sm" />
                              Récapitulatif de Validation Directe
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-emerald flex items-center gap-1 font-medium">
                              <FiLock /> Protocole Sécurisé
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs py-2">
                            <span className="text-cream-muted">Prestation :</span>
                            <span className="text-cream font-semibold">{product.title}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs py-2 border-t border-border/40">
                            <span className="text-cream-muted">Échéancier choisi :</span>
                            <span className="text-gold font-semibold">
                              {installments > 1
                                ? `${installments}x ${formatEuros(amountCents)} sans frais (0% Riba)`
                                : `${formatEuros(amountCents)} comptant`}
                            </span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={fallbackSubmitting}
                          className="w-full py-4 px-6 bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-[0_0_25px_rgba(212,168,83,0.25)] hover:shadow-[0_0_35px_rgba(212,168,83,0.45)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3"
                        >
                          <FiLock className="text-sm" />
                          {fallbackSubmitting
                            ? "Validation en cours..."
                            : installments > 1
                            ? `Valider mon inscription en ${installments}x (${formatEuros(amountCents)}/mois) ➔`
                            : `Valider mon acquisition (${formatEuros(amountCents)}) ➔`}
                        </button>
                      </form>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-cream-muted/70">
                      <span className="flex items-center gap-1.5">
                        <FiLock className="text-gold" /> Aucune donnée bancaire n&apos;est stockée sur nos serveurs.
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
        <div className="pt-40 pb-32 bg-midnight min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold" />
        </div>
      }
    >
      <PaiementContent />
    </Suspense>
  );
}
