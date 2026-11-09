"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiCheck, FiX, FiClock, FiArrowRight, FiShield } from "react-icons/fi";

const featuresList = [
  { label: "Objectif Opérationnel", values: ["L'Éveil (Vos blocages)", "Action (Maîtrise des pulsions)", "Souveraineté (Ordre restauré)", "Le Mandat de Khalifa (Gouvernance absolue)"] },
  { label: "Durée de l'Accompagnement", values: ["Séance unique", "30 Jours", "3 Mois", "12 Mois"] },
  { label: "Bilan & Diagnostic Profond", values: ["1h30 (Audit du stress)", "1h30", "1h30", "Continu & Évolutif"] },
  { label: "Nombre de Séances", values: ["1 Séance d'impact", "4 Séances", "12 Séances", "Illimité (À la demande)"] },
  { label: "Fréquence du Suivi", values: ["-", "Hebdomadaire", "Quotidien", "Immersion Totale"] },
  { label: "Accès Messagerie Privée", values: ["-", "5j/7 (Horaires bureau)", "7j/7 (Prioritaire)", "H24 (Ligne Directe VIP)"] },
  { label: "Méthode C.O.M.E.S.", values: ["Diagnostic uniquement", "Déploiement : Clarifier & Organiser", "Déploiement complet", "Maîtrise systémique et ancrage"] },
  { label: "Synchronisation Spirituelle", values: ["-", "Ajustement sur les horaires de prière", "Couvre-feux digitaux & Sanctuarisation", "Alignement total sur la Barakah"] },
  { label: "Plan d'Action Stratégique", values: ["Inclus (Roadmap d'urgence)", "Inclus (Ajusté mensuellement)", "Inclus (Itératif)", "Inclus (Refonte structurelle)"] },
  { label: "Exercices & Outils Déblocage", values: ["-", "Inclus (Routines anti-procrastination)", "Inclus (Protection mentale)", "Inclus (Protocoles de crise)"] },
  { label: "Environnement (Tahara physique)", values: ["-", "Inclus (Aménagement du bureau)", "Inclus (Réorganisation physique)", "Inclus (Ergonomie premium)"] },
  { label: "Clôture Mentale (Apaisement)", values: ["Identification des boucles ouvertes", "Clôture des dossiers en attente", "Délégation et automatisation", "Tawakkul total (Zéro charge)"] },
];

const plans = [
  {
    id: "audit",
    titre: "Audit Diagnostique",
    sousTitre: "Évaluation Initiale",
    prix: "85,90 €",
    paiement: "En 1 fois",
    mensualite: "Règlement unique",
    stripeLink: "/paiement?offre=audit",
  },
  {
    id: "30j",
    titre: "Protocole 30 Jours",
    sousTitre: "Urgence & Réalignement",
    prix: "612,70 €",
    paiement: "En 1 ou 2 fois",
    mensualite: "ou 2x 306,35 € sans frais",
    stripeLink: "/paiement?offre=30j",
  },
  {
    id: "3m",
    titre: "Transformation 3 Mois",
    sousTitre: "Reconstruction Profonde",
    popular: true,
    prix: "1 655,30 €",
    paiement: "En 1 ou 3 fois",
    mensualite: "ou 3x 551,77 € sans frais",
    stripeLink: "/paiement?offre=3m",
  },
  {
    id: "12m",
    titre: "Mentorat d'Excellence",
    sousTitre: "Alliance VIP 12 Mois",
    prixBase: "6 112,00 €",
    prixPromo: "4 889,60 €",
    paiement: "En 1 ou 6 fois",
    mensualite: "ou 6x 814,93 € sans frais",
    stripeLink: "/paiement?offre=12m",
  },
];

export default function OffresPage() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [activeMobilePlan, setActiveMobilePlan] = useState<string>("all");
  const tableRef = useRef<HTMLDivElement>(null);
  const dragHandlers = useDraggableScroll(tableRef);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const dayOfWeek = firstDay.getDay();
      const daysToFirstFriday = (5 - dayOfWeek + 7) % 7;
      const firstFriday = new Date(now.getFullYear(), now.getMonth(), 1 + daysToFirstFriday);
      firstFriday.setHours(0, 0, 0, 0);

      const endOfSunday = new Date(firstFriday);
      endOfSunday.setDate(firstFriday.getDate() + 2);
      endOfSunday.setHours(23, 59, 59, 999);

      if (now >= firstFriday && now <= endOfSunday) {
        const diff = endOfSunday.getTime() - now.getTime();
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        return `${d}j ${h}h ${m}m ${s}s`;
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 sm:pb-32 bg-midnight min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Gradients contenus pour ne jamais déborder sur mobile */}
      <div className="
        absolute top-1/4 left-0 w-72 sm:w-[500px] h-72 sm:h-[500px]
        bg-gold/5 blur-[100px] rounded-full pointer-events-none
      " />
      <div className="
        absolute bottom-1/4 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px]
        bg-gold/5 blur-[120px] rounded-full pointer-events-none
      " />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Investissement"
          title="Tableau Comparatif des Offres"
          subtitle="Comparez en un clin d'œil les différents niveaux d'accompagnement pour choisir celui qui correspond à vos besoins."
        />

        {/* ════════════════════════════════════════════════════════════════════
            AFFICHAGE MOBILE & TABLETTE (< lg) : CARTES VERTICALES SANS DÉCALAGE
            ════════════════════════════════════════════════════════════════════ */}
        <div className="mt-8 lg:hidden space-y-6">
          {/* Filtre rapide mobile pour afficher toutes les offres ou une seule */}
          <div className="bg-midnight-light/80 border border-border p-2 rounded-sm">
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold text-center mb-2">
              Sélectionner une formule à consulter
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setActiveMobilePlan("all")}
                className={`col-span-2 py-2 px-3 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition-all ${
                  activeMobilePlan === "all"
                    ? "bg-gold text-stone-950 font-bold"
                    : "bg-surface/60 text-cream-muted border border-border"
                }`}
              >
                Voir les 4 Offres ({plans.length})
              </button>
              {plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveMobilePlan(p.id)}
                  className={`py-2 px-2.5 rounded-sm text-[11px] font-medium transition-all truncate ${
                    activeMobilePlan === p.id
                      ? "bg-gold text-stone-950 font-bold"
                      : "bg-surface/40 text-cream border border-border/60"
                  }`}
                >
                  {p.titre}
                </button>
              ))}
            </div>
          </div>

          {/* Cartes verticales 100% adaptées à la largeur de l'écran mobile */}
          <div className="space-y-6">
            {plans.map((plan, planIdx) => {
              if (activeMobilePlan !== "all" && activeMobilePlan !== plan.id) return null;

              const displayPrice =
                plan.id === "12m"
                  ? timeLeft
                    ? plan.prixPromo
                    : plan.prixPromo || plan.prixBase
                  : plan.prix;

              return (
                <div
                  key={plan.id}
                  className={`rounded-sm border p-5 sm:p-6 transition-all relative overflow-hidden ${
                    plan.popular
                      ? "bg-gold/5 border-gold shadow-lg"
                      : "bg-midnight-light/60 border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gold text-stone-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm inline-block mb-3">
                      ★ Offre Recommandée
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-4">
                    <div className="min-w-0">
                      <h3 className="text-xl font-heading text-cream font-semibold leading-tight">
                        {plan.titre}
                      </h3>
                      <p className="text-xs text-cream-muted mt-0.5">{plan.sousTitre}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {plan.id === "12m" && plan.prixBase && (
                        <span className="block text-xs text-cream-muted/60 line-through">
                          {plan.prixBase}
                        </span>
                      )}
                      <span className="text-2xl font-heading font-bold text-gold block leading-none">
                        {displayPrice}
                      </span>
                      <span className="text-[10px] text-emerald font-semibold uppercase tracking-wider block mt-1">
                        {plan.paiement} • 0% Riba
                      </span>
                    </div>
                  </div>

                  {/* Facilité de paiement mise en avant */}
                  <div className="my-3.5 py-2 px-3 bg-surface/50 border border-gold/20 rounded-sm flex items-center justify-between text-xs">
                    <span className="text-cream-muted flex items-center gap-1.5">
                      <FiShield className="text-gold shrink-0" /> Facilité sans frais :
                    </span>
                    <span className="text-cream font-semibold">{plan.mensualite}</span>
                  </div>

                  {/* Liste des 12 critères pour cette offre */}
                  <div className="divide-y divide-border/40 text-xs my-4">
                    {featuresList.map((row, rIdx) => {
                      const val = row.values[planIdx];
                      const isIncluded = val !== "-";
                      return (
                        <div
                          key={rIdx}
                          className="py-2.5 flex items-start justify-between gap-3"
                        >
                          <span className="text-cream-muted font-medium shrink-0 max-w-[48%]">
                            {row.label}
                          </span>
                          <span className="text-right min-w-0">
                            {isIncluded ? (
                              <span className="text-cream font-medium inline-flex items-center justify-end gap-1.5">
                                <FiCheck className="text-emerald shrink-0 w-4 h-4" />
                                <span>{val.replace("Inclus ", "")}</span>
                              </span>
                            ) : (
                              <span className="text-cream-muted/40 inline-flex items-center gap-1">
                                <FiX className="w-3.5 h-3.5" /> Non inclus
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bouton d'action mobile */}
                  <Link
                    href={plan.stripeLink}
                    className={`w-full py-3.5 px-4 rounded-sm font-bold tracking-widest uppercase text-xs transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-gold text-stone-950 hover:bg-gold-light shadow-md"
                        : "bg-gold/15 border border-gold text-gold hover:bg-gold hover:text-stone-950"
                    }`}
                  >
                    <span>Procéder au paiement</span>
                    <FiArrowRight />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            AFFICHAGE ORDINATEUR (lg:block) : TABLEAU COMPARATIF COMPLET
            ════════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden lg:block mt-16 max-w-7xl mx-auto overflow-x-auto pb-8 relative z-10 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={tableRef}
          {...dragHandlers}
        >
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-6 border-b border-border w-1/4"></th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`p-6 border-b border-border w-[18%] text-center align-bottom relative ${
                      plan.popular ? "bg-gold/5 rounded-t-lg border-x border-t border-gold/30" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <span className="bg-gold text-stone-950 text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-sm">
                          Recommandé
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg font-heading text-cream mb-4">{plan.titre}</h3>

                    {plan.id === "12m" && timeLeft ? (
                      <div className="mb-4 flex flex-col items-center">
                        <div className="flex items-center gap-1 text-emerald font-bold mb-1 bg-emerald/10 px-3 py-1 rounded-sm border border-emerald/20 animate-pulse">
                          <FiClock className="w-4 h-4" />
                          <span className="text-xs">{timeLeft}</span>
                        </div>
                        <span className="text-sm text-cream-muted/60 line-through decoration-gold/50">
                          {plan.prixBase}
                        </span>
                        <span className="text-2xl font-bold text-cream mt-1">{plan.prixPromo}</span>
                      </div>
                    ) : (
                      <div className="mb-4">
                        {plan.id === "12m" && plan.prixBase && (
                          <span className="block text-xs text-cream-muted/60 line-through mb-0.5">
                            {plan.prixBase}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-cream">
                          {plan.id === "12m" ? plan.prixPromo : plan.prix}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-cream-muted italic">{plan.paiement}</p>
                    <p className="text-[10px] text-emerald uppercase tracking-widest mt-1 font-semibold">
                      Sans frais (0% Riba)
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuresList.map((row, index) => (
                <tr key={index} className="hover:bg-surface/30 transition-colors">
                  <td className="p-6 border-b border-border/50 text-sm font-medium text-cream">
                    {row.label}
                  </td>
                  {row.values.map((val, idx) => {
                    const isPopular = plans[idx].popular;
                    const isIncluded = val !== "-";
                    return (
                      <td
                        key={idx}
                        className={`p-6 border-b border-border/50 text-center text-sm ${
                          isPopular ? "bg-gold/5 border-x border-gold/30" : ""
                        }`}
                      >
                        {isIncluded ? (
                          val === "Inclus" || val === "Compris" ? (
                            <FiCheck className="mx-auto text-emerald w-5 h-5" />
                          ) : val.startsWith("Inclus ") ? (
                            <div className="flex flex-col items-center justify-center gap-1">
                              <FiCheck className="text-emerald w-5 h-5" />
                              <span className="text-cream-muted text-[11px] leading-tight text-center">
                                {val.replace("Inclus ", "")}
                              </span>
                            </div>
                          ) : (
                            <span className="text-cream-muted text-[13px] leading-snug">{val}</span>
                          )
                        ) : (
                          <FiX className="mx-auto text-cream-muted/40 w-4 h-4" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Row for Checkout Buttons */}
              <tr>
                <td className="p-6 border-b border-border"></td>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={`p-6 border-b border-border text-center ${
                      plan.popular ? "bg-gold/5 rounded-b-lg border-x border-b border-gold/30" : ""
                    }`}
                  >
                    <Link
                      href={plan.stripeLink}
                      className={`inline-block w-full text-center py-3 px-4 rounded-sm font-semibold tracking-wider uppercase text-[11px] transition-all ${
                        plan.popular
                          ? "bg-gold text-stone-950 hover:bg-gold-light"
                          : "border border-gold/50 text-gold hover:bg-gold hover:text-stone-950"
                      }`}
                    >
                      Procéder au paiement
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Éthique et Accessibilité */}
        <div className="mt-14 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto relative z-10">
          {/* Bloc Éthique (Riba) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 border border-gold/20 rounded-sm bg-surface/40 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="font-arabic text-6xl">۞</span>
            </div>
            <h4 className="text-xl font-heading text-gold mb-4">Éthique Financière (0% Riba)</h4>
            <p className="text-sm text-cream leading-relaxed mb-6">
              Nos facilités de paiement en plusieurs fois sont proposées{" "}
              <strong>strictement sans aucun frais supplémentaire ni intérêt</strong>. Nous refusons
              catégoriquement la pratique de l&apos;usure (Riba), en accord avec nos principes
              d&apos;excellence et d&apos;éthique spirituelle.
            </p>
            <blockquote className="border-l-2 border-gold/50 pl-4 mb-4">
              <p className="text-xs text-cream-muted italic mb-2">
                &quot;Allah a rendu licite le commerce, et illicite l&apos;intérêt (Riba).&quot;
              </p>
              <footer className="text-[10px] text-cream-muted/70 uppercase tracking-widest">
                — Coran 2:275
              </footer>
            </blockquote>
            <blockquote className="border-l-2 border-gold/50 pl-4">
              <p className="text-xs text-cream-muted italic mb-2">
                &quot;Le Messager d&apos;Allah ﷺ a maudit celui qui se nourrit de l&apos;usure, celui qui
                la fait consommer, celui qui l&apos;écrit et ses deux témoins.&quot;
              </p>
              <footer className="text-[10px] text-cream-muted/70 uppercase tracking-widest">
                — Sahih Muslim
              </footer>
            </blockquote>
          </motion.div>

          {/* Bloc Difficultés Financières */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 border border-border rounded-sm bg-surface/40 backdrop-blur-sm"
          >
            <h4 className="text-xl font-heading text-cream mb-4">
              L&apos;Argent ne doit pas être un frein
            </h4>
            <p className="text-sm text-cream-muted leading-relaxed mb-6">
              Sachez que la porte reste ouverte. Allah a partagé Sa miséricorde en cent parts, et Il
              accueille le retour de Ses serviteurs avec une indulgence absolue. Si vous traversez de
              réelles difficultés financières, n&apos;hésitez pas.{" "}
              <strong>
                L&apos;investissement de cet accompagnement n&apos;est rien face à la récompense
                ultime : la félicité éternelle (Al-Falah) et la reconquête de votre mandat de Khalifa.
              </strong>{" "}
              Reprenez la responsabilité de votre âme.
            </p>
            <blockquote className="border-l-2 border-border pl-4 mb-8">
              <p className="text-xs text-cream-muted italic mb-2">
                &quot;Allah veut pour vous la facilité, Il ne veut pas la difficulté pour vous.&quot;
              </p>
              <footer className="text-[10px] text-cream-muted/70 uppercase tracking-widest">
                — Coran 2:185
              </footer>
            </blockquote>
            <Link
              href="/contact"
              className="inline-block border-b border-gold text-gold text-sm font-semibold pb-1 hover:text-cream hover:border-cream transition-colors"
            >
              Contactez-nous pour une solution sur-mesure
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
