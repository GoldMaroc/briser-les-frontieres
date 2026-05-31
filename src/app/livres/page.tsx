"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function Livres() {
  const [activeBookId, setActiveBookId] = useState<"secrets" | "rahman" | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [error, setError] = useState("");
  const [checkoutInstance, setCheckoutInstance] = useState<any>(null);

  const handleOpenCheckout = async (bookId: "secrets" | "rahman") => {
    setActiveBookId(bookId);
    setLoadingSession(true);
    setError("");

    try {
      // 1. Initialiser l'appel API pour créer la session Embedded
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      if (!response.ok) {
        throw new Error("Impossible d'initialiser la session de paiement.");
      }

      const { clientSecret } = await response.json();

      // 2. Initialiser Stripe.js côté client
      if (!(window as any).Stripe) {
        throw new Error("Stripe.js n'a pas pu être chargé.");
      }

      const stripe = await (window as any).Stripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      // Détruire toute instance précédente s'il y en a une
      if (checkoutInstance) {
        checkoutInstance.destroy();
      }

      // 3. Monter le formulaire Embedded Checkout de Stripe
      const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
      });

      checkout.mount("#stripe-checkout-mount");
      setCheckoutInstance(checkout);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoadingSession(false);
    }
  };

  const handleCloseCheckout = () => {
    if (checkoutInstance) {
      checkoutInstance.destroy();
      setCheckoutInstance(null);
    }
    setActiveBookId(null);
    setError("");
  };

  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      {/* Script Stripe Officiel sécurisé */}
      <Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />

      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(245,245,240,0.8)_0%,rgba(255,255,255,1)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête de page */}
        <SectionHeading
          label="Les Publications BLF"
          title="Les Livres de Mounir BYAR"
          subtitle="Des ouvrages uniques mariant avec rigueur les méthodes de l'exégèse islamique traditionnelle et la science cognitive contemporaine pour restructurer l'esprit."
        />

        {/* OUVRAGE 1 : Les Secrets du Retour vers Allah */}
        <div id="secrets" className="border-t border-stone-200 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold bg-gold-muted/15 px-3 py-1 rounded-full border border-gold/10 font-body">
              eBook Pratique & Méthode de 30 Jours
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-stone-900">
              Les Secrets du Retour vers Allah
            </h3>
            <p className="text-sm uppercase tracking-wider text-emerald font-semibold font-body">
              Reprendre sa Prière et sa Souveraineté
            </p>
            
            <p className="text-sm text-stone-600 leading-relaxed font-body italic border-l-2 border-gold pl-4 my-4">
              « Ne subissez plus votre quotidien.<br />
              Reprenez votre prière et votre souveraineté. »
            </p>

            <p className="text-sm text-stone-600 leading-relaxed font-body">
              Ce livre n&apos;est pas un appel à l&apos;effort, c&apos;est une ingénierie. Une architecture conçue pour quiconque s&apos;est éloigné de la prière et attend, en silence, de retrouver le chemin.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed font-body">
              Au croisement d&apos;Al-Ghazâlî, d&apos;Ibn Qayyim et des sciences cognitives (B.J. Fogg, V. Frankl), Mounir BYAR propose une méthode en 5 mouvements et un protocole de 30 jours. Pour quiconque a tenté de revenir sans y parvenir.
            </p>

            <div className="bg-stone-50 p-6 border border-stone-200 rounded-sm">
              <h4 className="font-heading text-lg text-stone-900 mb-4 font-semibold">Structure de l&apos;ouvrage</h4>
              <ul className="space-y-2 text-xs text-stone-600 font-body">
                <li><strong className="text-stone-900">Préface</strong> — Un mot avant d&apos;entrer : Moins de combat, plus d&apos;architecture.</li>
                <li><strong className="text-stone-900">Chapitre I : Le Statut de Khalîfa</strong> — La prise de responsabilité radicale.</li>
                <li><strong className="text-stone-900">Chapitre II : L&apos;Anatomie du Retour (At-Tawbah)</strong> — La théorie des divergences du soi et Tazkiyah.</li>
                <li><strong className="text-stone-900">Chapitre III : La Prière (As-Salât)</strong> — Algorithme circadien de baisse de 27,3% du cortisol.</li>
                <li><strong className="text-stone-900">Chapitre IV : Reprendre sa Souveraineté</strong> — Le design environnemental (James Clear / B.J. Fogg).</li>
                <li><strong className="text-stone-900">Chapitre V : L&apos;Écosystème de la Souveraineté</strong> — L&apos;importance cruciale du compagnonnage (Suhba).</li>
                <li><strong className="text-stone-900">Protocole pratique de 30 jours</strong> — Stabilisation, Profondeur, Expansion.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-8 border border-stone-200 bg-stone-50/50 rounded-sm relative"
          >
            <div className="absolute top-0 right-10 w-16 h-px bg-stone-900" />
            <h4 className="font-heading text-xl text-stone-900 mb-4 font-semibold">Se procurer l&apos;ouvrage</h4>
            <p className="text-xs text-stone-600 leading-relaxed font-body mb-6">
              L&apos;eBook complet est disponible immédiatement après règlement sécurisé. Intégrez le protocole dès aujourd&apos;hui.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs uppercase tracking-wider font-body">
                <span className="text-stone-500">Format</span>
                <span className="text-stone-900 font-semibold">eBook (Format ePub)</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs uppercase tracking-wider font-body">
                <span className="text-stone-500">Pagination</span>
                <span className="text-stone-900 font-semibold">160 pages</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs uppercase tracking-wider font-body">
                <span className="text-stone-500">Tarif Numérique</span>
                <span className="text-stone-950 font-bold">5,90 €</span>
              </div>
            </div>

            <Button onClick={() => handleOpenCheckout("secrets")} variant="primary" className="w-full py-4 text-center justify-center">
              Commander l&apos;eBook (ePub)
            </Button>
          </motion.div>

        </div>

        {/* OUVRAGE 2 : Ar-Rahman — La Mer sans Rivage */}
        <div id="rahman" className="border-t border-stone-200 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold bg-gold-muted/15 px-3 py-1 rounded-full border border-gold/10 font-body">
              Volume I — Collection Connaissance du Créateur
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-stone-900">
              Ar-Rahman : La Mer sans Rivage
            </h3>
            <p className="text-sm uppercase tracking-wider text-emerald font-semibold font-body">
              Exégèse du Premier Nom — La Miséricorde Universelle d&apos;Allah
            </p>
            
            <p className="text-sm text-stone-600 leading-relaxed font-body">
              Une plongée de 300 pages dans la linguistique, l&apos;exégèse classique (Tabarî, Qurtubî, Râzî, Ibn Kathîr) et la théologie spirituelle (Ghazâlî, Ibn al-Qayyim) d&apos;un seul nom divin : <strong>Ar-Rahman</strong>. Le premier nom à être invoqué après le nom suprême, contenant en lui une cosmologie entière et s&apos;incarnant comme un remède puissant contre la crise spirituelle moderne.
            </p>

            <div className="bg-stone-50 p-6 border border-stone-200 rounded-sm">
              <h4 className="font-heading text-lg text-stone-900 mb-4 font-semibold">Structure de l&apos;ouvrage</h4>
              <ul className="space-y-2 text-xs text-stone-600 font-body">
                <li><strong className="text-stone-900">Partie I : La Science du Nom</strong> — La tradition des 99 noms (hadiths) et les 4 niveaux d&apos;Ihsâ&apos; de la connaissance.</li>
                <li><strong className="text-stone-900">Partie II : La Miséricorde Cosmologique</strong> — Le Trône divin et la miséricorde universelle.</li>
                <li><strong className="text-stone-900">Partie III : Les Récits de la Miséricorde</strong> — Rahmatan lil-&apos;âlamîn (Le Prophète ﷺ comme miséricorde) et Taïf.</li>
                <li><strong className="text-stone-900">Partie IV : Théologie & Psychologie</strong> — Al-Ghazâlî et l&apos;âme humaine face au désespoir.</li>
                <li><strong className="text-stone-900">Partie V : Vivre le Nom</strong> — Le programme pratique pour incarner la Rahma.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-8 border border-stone-200 bg-stone-50/50 rounded-sm relative"
          >
            <div className="absolute top-0 right-10 w-16 h-px bg-stone-900" />
            <h4 className="font-heading text-xl text-stone-900 mb-4 font-semibold">Se procurer l&apos;ouvrage</h4>
            <p className="text-xs text-stone-600 leading-relaxed font-body mb-6">
              Le premier volume de la collection exclusive est disponible immédiatement en version numérique de prestige (PDF).
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs uppercase tracking-wider font-body">
                <span className="text-stone-500">Format</span>
                <span className="text-stone-900 font-semibold">eBook (Format PDF)</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs uppercase tracking-wider font-body">
                <span className="text-stone-500">Pagination</span>
                <span className="text-stone-900 font-semibold">312 pages</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs uppercase tracking-wider font-body">
                <span className="text-stone-500">Tarif Numérique</span>
                <span className="text-stone-950 font-bold">12,65 €</span>
              </div>
            </div>

            <Button onClick={() => handleOpenCheckout("rahman")} variant="primary" className="w-full py-4 text-center justify-center">
              Commander l&apos;eBook (PDF)
            </Button>
          </motion.div>

        </div>

        {/* Section Incitation Forte au Contact — Étape 6 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center border-t border-stone-200 pt-20 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">➔ Passer à la phase supérieure</span>
          <h3 className="font-heading text-3xl font-light text-stone-900 font-semibold">
            Étape 06 : Entamer l&apos;Interposition Privée
          </h3>
          <p className="text-sm text-stone-600 max-w-xl mx-auto font-body leading-relaxed">
            La lecture des écrits numériques est votre point d&apos;entrée. Si vous aspirez à l&apos;excellence ultime du compagnonnage spirituel (Suhba) et comportemental sous la direction de Mounir BYAR, formulez votre candidature privée.
          </p>
          <div className="flex justify-center pt-2">
            <Button variant="primary" href="/contact" className="shadow-lg shadow-stone-950/10 font-bold tracking-widest px-10 py-4">
              Postuler au Mentorat de 9 Mois →
            </Button>
          </div>
        </motion.div>

      </div>

      {/* MODALE DE PAIEMENT STRIPE INTÉGRÉE (EMBEDDED CHECKOUT) */}
      <AnimatePresence>
        {activeBookId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white border border-stone-200 p-8 shadow-2xl overflow-y-auto max-h-[90vh] rounded-sm"
            >
              {/* Bouton de Fermeture */}
              <button
                onClick={handleCloseCheckout}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-950 text-xl font-bold cursor-pointer transition-colors p-2"
                aria-label="Fermer la fenêtre de paiement"
              >
                ✕
              </button>

              <div className="mb-6 border-b border-stone-200 pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-emerald font-semibold">Transaction Sécurisée</span>
                <h3 className="font-heading text-2xl text-stone-900 font-light mt-1">
                  {activeBookId === "secrets"
                    ? "Les Secrets du Retour vers Allah"
                    : "Ar-Rahman — La Mer sans Rivage"}
                </h3>
                <p className="text-xs text-stone-500 font-body mt-1">
                  Règlement sécurisé crypté par Stripe. Vos coordonnées bancaires ne sont jamais stockées chez nous.
                </p>
              </div>

              {loadingSession && (
                <div className="py-20 text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-950 mx-auto" />
                  <p className="text-xs text-stone-500 font-body">Initialisation du tunnel de paiement bancaire...</p>
                </div>
              )}

              {error && (
                <div className="py-10 text-center space-y-4 font-body">
                  <p className="text-sm text-red-500 font-semibold">{error}</p>
                  <Button onClick={handleCloseCheckout} variant="primary" className="py-2 px-6">
                    Fermer la fenêtre
                  </Button>
                </div>
              )}

              {/* Conteneur physique où Stripe va monter son Embedded Checkout */}
              <div
                id="stripe-checkout-mount"
                className={`w-full min-h-[400px] transition-opacity duration-300 ${
                  loadingSession || error ? "opacity-0 pointer-events-none h-0" : "opacity-100"
                }`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
