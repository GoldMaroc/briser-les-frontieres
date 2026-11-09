"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { FiBookOpen, FiLock, FiChevronLeft, FiChevronRight, FiCheck, FiEye } from "react-icons/fi";

interface BookExcerptPage {
  pageNumber: number;
  title: string;
  locked?: boolean;
}

const EXCERPT_PAGES: BookExcerptPage[] = [
  { pageNumber: 6, title: "Sommaire" },
  { pageNumber: 7, title: "Préface (1/2)" },
  { pageNumber: 8, title: "Préface (2/2)" },
  { pageNumber: 9, title: "Introduction (1/3)" },
  { pageNumber: 10, title: "Introduction (2/3)" },
  { pageNumber: 11, title: "Introduction (3/3)" },
  { pageNumber: 12, title: "Chapitre I (p. 12)" },
  { pageNumber: 13, title: "Pages 13 à 41 (Verrouillé)", locked: true },
];

export default function Livres() {
  const [activeCover, setActiveCover] = useState<"both" | "recto" | "verso">("both");
  const [currentPage, setCurrentPage] = useState<number>(6);

  const goPrevPage = () => {
    setCurrentPage((p) => Math.max(6, p - 1));
  };

  const goNextPage = () => {
    setCurrentPage((p) => Math.min(13, p + 1));
  };

  return (
    <div className="relative pt-28 sm:pt-40 pb-24 sm:pb-32 bg-midnight min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Halo de lumière doré circadien et texture */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-[radial-gradient(circle_at_50%_0%,var(--color-gold-muted)_0%,transparent_60%)] pointer-events-none opacity-40 md:opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête de la page */}
        <SectionHeading
          label="Les Publications BLF"
          title="Les Livres de Mounir BYAR"
          subtitle="Des ouvrages uniques mariant avec rigueur les méthodes de l'exégèse islamique traditionnelle et la science cognitive contemporaine pour restructurer l'esprit."
        />

        {/* ════════════════════════════════════════════════════════════════════
            OUVRAGE 1 : Les Secrets du Retour vers Allah
            ════════════════════════════════════════════════════════════════════ */}
        <div id="secrets" className="border-t border-border/60 pt-14 sm:pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* COLONNE GAUCHE : PRÉSENTATION & COUVERTURES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 min-w-0"
            >
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold bg-gold-muted px-4 py-1.5 border border-gold/20 font-body">
                eBook Pratique & Méthode de 30 Jours
              </span>
              <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
                Les Secrets du Retour vers Allah
              </h3>
              <p className="text-sm uppercase tracking-widest text-emerald font-semibold font-body">
                Reprendre sa Prière et sa Souveraineté
              </p>

              {/* GALERIE DES COUVERTURES (1ère et 4ème de couverture) */}
              <div className="bg-midnight-light/60 border border-gold/25 rounded-sm p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                  <span className="text-[11px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                    <FiEye className="text-gold" /> Couvertures Officielles de l&apos;Édition
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveCover("both")}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                        activeCover === "both"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      Recto & Verso
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCover("recto")}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                        activeCover === "recto"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      1ère de Couverture
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCover("verso")}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                        activeCover === "verso"
                          ? "bg-gold text-stone-950 font-bold border-gold"
                          : "bg-midnight text-cream-muted border-border hover:border-gold/40"
                      }`}
                    >
                      4ème de Couverture
                    </button>
                  </div>
                </div>

                <div
                  className={`grid gap-4 sm:gap-6 items-center justify-center ${
                    activeCover === "both" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"
                  }`}
                >
                  {(activeCover === "both" || activeCover === "recto") && (
                    <div className="space-y-2 text-center">
                      <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
                        <img
                          src="/books/secrets-couverture-recto.png"
                          alt="1ère de couverture — Les Secrets du Retour vers Allah"
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-cream-muted block">
                        Première de Couverture
                      </span>
                    </div>
                  )}

                  {(activeCover === "both" || activeCover === "verso") && (
                    <div className="space-y-2 text-center">
                      <div className="relative rounded-sm overflow-hidden border border-gold/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
                        <img
                          src="/books/secrets-couverture-verso.png"
                          alt="4ème de couverture — Les Secrets du Retour vers Allah"
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-cream-muted block">
                        Quatrième de Couverture
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-cream-muted leading-relaxed font-body italic border-l-2 border-gold pl-4 my-6">
                « Ne subissez plus votre quotidien.
                <br />
                Reprenez votre prière et votre souveraineté. »
              </p>

              <p className="text-sm text-cream-muted leading-relaxed font-body">
                Ce livre n&apos;est pas un appel à l&apos;effort, c&apos;est une ingénierie. Une
                architecture conçue pour quiconque s&apos;est éloigné de la prière et attend, en
                silence, de retrouver le chemin.
              </p>

              <p className="text-sm text-cream-muted leading-relaxed font-body">
                Au croisement d&apos;Al-Ghazâlî, d&apos;Ibn Qayyim et des sciences cognitives (B.J.
                Fogg, V. Frankl), Mounir BYAR propose une méthode en 5 mouvements et un protocole de
                30 jours. Pour quiconque a tenté de revenir sans y parvenir.
              </p>

              {/* Plan de l'ouvrage stylisé haut de gamme */}
              <div className="bg-midnight-light/50 p-6 sm:p-8 border border-border/80 rounded-sm">
                <h4 className="font-heading text-lg text-cream mb-4 font-medium tracking-wide">
                  Structure de l&apos;ouvrage
                </h4>
                <ul className="space-y-3.5 text-xs text-cream-muted font-body">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">Préface</strong> — Un mot avant
                      d&apos;entrer : Moins de combat, plus d&apos;architecture.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">
                        Chapitre I : Le Statut de Khalîfa
                      </strong>{" "}
                      — La prise de responsabilité radicale.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">
                        Chapitre II : L&apos;Anatomie du Retour (At-Tawbah)
                      </strong>{" "}
                      — La théorie des divergences du soi et Tazkiyah.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">
                        Chapitre III : La Prière (As-Salât)
                      </strong>{" "}
                      — Algorithme circadien de baisse de 27,3% du cortisol.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">
                        Chapitre IV : Reprendre sa Souveraineté
                      </strong>{" "}
                      — Le design environnemental (James Clear / B.J. Fogg).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">
                        Chapitre V : L&apos;Écosystème de la Souveraineté
                      </strong>{" "}
                      — L&apos;importance cruciale du compagnonnage (Suhba).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-cream font-medium">
                        Protocole pratique de 30 jours
                      </strong>{" "}
                      — Stabilisation, Profondeur, Expansion.
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* COLONNE DROITE : MODULE D'ACQUISITION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 p-6 sm:p-8 border border-border bg-midnight-light/60 backdrop-blur-md rounded-sm relative shadow-2xl hover:border-gold/30 transition-all duration-500 lg:sticky lg:top-28"
            >
              <div className="absolute top-0 right-10 w-20 h-px bg-gold/50" />
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/50">
                <img
                  src="/books/secrets-couverture-recto.png"
                  alt="Les Secrets du Retour vers Allah"
                  className="w-16 h-auto rounded-sm border border-gold/30 shadow-md shrink-0"
                />
                <div>
                  <h4 className="font-heading text-xl text-cream font-semibold tracking-wide">
                    Se procurer l&apos;ouvrage
                  </h4>
                  <p className="text-xs text-emerald font-medium mt-0.5">
                    Téléchargement immédiat (PDF + ePub)
                  </p>
                </div>
              </div>

              <p className="text-xs text-cream-muted leading-relaxed font-body mb-6">
                L&apos;ouvrage complet (41 pages) est disponible immédiatement après règlement
                sécurisé sur notre portail. Intégrez le protocole dès aujourd&apos;hui.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                  <span className="text-cream-muted">Format</span>
                  <span className="text-cream font-medium">PDF Haute Définition + ePub</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                  <span className="text-cream-muted">Pagination</span>
                  <span className="text-cream font-medium">41 pages</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                  <span className="text-cream-muted">Extrait Gratuit</span>
                  <span className="text-emerald font-semibold">Pages 6 à 12 ci-dessous ↓</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                  <span className="text-cream-muted">Tarif Numérique</span>
                  <span className="text-gold font-bold text-lg">5,90 €</span>
                </div>
              </div>

              <Button
                href="/paiement?offre=secrets"
                variant="primary"
                className="w-full py-4 text-center justify-center font-bold tracking-widest"
              >
                Commander l&apos;Ouvrage (5,90 €)
              </Button>

              <a
                href="#extrait-secrets"
                className="mt-3 w-full py-3 px-4 border border-gold/30 hover:border-gold text-gold text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <FiBookOpen /> Lire l&apos;extrait gratuit (Pages 6 à 12)
              </a>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              LECTEUR D'EXTRAIT INTERACTIF : PAGES 6 À 12 (BLOQUÉ À LA PAGE 13)
              ════════════════════════════════════════════════════════════════════ */}
          <div id="extrait-secrets" className="mt-16 pt-12 border-t border-border/40">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
                <FiBookOpen /> Aperçu Officiel — Pages 6 à 12
              </span>
              <h4 className="font-heading text-2xl sm:text-3xl text-cream font-light">
                Feuilleter un Extrait du Livre
              </h4>
              <p className="text-xs text-cream-muted">
                Découvrez gratuitement le Sommaire, la Préface, l&apos;Introduction et le début du
                Chapitre Premier. La lecture au-delà de la page 12 est réservée aux détenteurs de
                l&apos;ouvrage.
              </p>
            </div>

            {/* Barre d'onglets des pages 6 à 12 + Page 13 verrouillée */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
              {EXCERPT_PAGES.map((item) => {
                const isActive = currentPage === item.pageNumber;
                return (
                  <button
                    key={item.pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(item.pageNumber)}
                    className={`px-3 py-2 rounded-sm text-[11px] font-body transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isActive
                        ? "bg-gold text-stone-950 font-bold border-gold shadow-md"
                        : item.locked
                        ? "bg-midnight-light/80 text-gold/80 border-gold/30 hover:border-gold"
                        : "bg-midnight-light/60 text-cream-muted border-border hover:border-gold/40 hover:text-cream"
                    }`}
                  >
                    {item.locked ? (
                      <>
                        <FiLock className="text-xs shrink-0" />
                        <span>p. 13–41</span>
                      </>
                    ) : (
                      <span>Page {item.pageNumber}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Conteneur de la page du livre (aspect papier d'édition #FAF8F5) */}
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#FAF8F5] text-[#1A1A1A] border-2 border-[#C9A84C]/40 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-6 sm:p-12 md:p-16 min-h-[540px] flex flex-col justify-between relative overflow-hidden select-none"
                >
                  {/* Filigrane supérieur discret */}
                  <div className="text-center text-[9px] uppercase tracking-[0.35em] text-[#8C7A5B] pb-4 mb-6 border-b border-[#C9A84C]/25 flex items-center justify-between">
                    <span>Les Secrets du Retour vers Allah</span>
                    <span>
                      {currentPage <= 12
                        ? `Extrait Gratuit • Page ${currentPage} / 41`
                        : "Accès Restreint • Pages 13 à 41"}
                    </span>
                  </div>

                  {/* CONTENU DE LA PAGE SÉLECTIONNÉE */}
                  <div className="flex-1 flex flex-col justify-center">
                    {currentPage === 6 && (
                      <div className="space-y-8 py-4">
                        <div className="text-center space-y-3">
                          <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#143D2B]">
                            Sommaire
                          </h3>
                          <div className="text-[#C59B27] tracking-[0.5em] text-xs">◆ ◆ ◆</div>
                        </div>

                        <div className="space-y-3.5 max-w-lg mx-auto text-sm sm:text-base font-serif">
                          {[
                            { label: "Préface — Un mot avant d'entrer", target: 7 },
                            { label: "Introduction — La Crise de la Déconnexion", target: 9 },
                            { label: "I. Le Statut de Khalîfa", target: 12 },
                            { label: "II. L'Anatomie du Retour (At-Tawbah)", target: 13, locked: true },
                            { label: "III. La Prière (As-Salât)", target: 13, locked: true },
                            { label: "IV. Reprendre sa Souveraineté", target: 13, locked: true },
                            { label: "V. L'Écosystème de la Souveraineté", target: 13, locked: true },
                            { label: "Protocole de Souveraineté — 30 Jours", target: 13, locked: true },
                            {
                              label: "Synthèse finale — Ce que vous avez entre les mains",
                              target: 13,
                              locked: true,
                            },
                            { label: "L'Auteur — Mounir BYAR", target: 13, locked: true },
                            { label: "Pour aller plus loin — Contact", target: 13, locked: true },
                          ].map((ch, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCurrentPage(ch.target)}
                              className="w-full text-left flex items-center justify-between gap-2 pb-1.5 border-b border-[#143D2B]/15 text-[#143D2B] hover:text-[#9E7331] transition-colors cursor-pointer"
                            >
                              <span className="underline underline-offset-4">{ch.label}</span>
                              {ch.locked ? (
                                <span className="text-[10px] uppercase tracking-wider text-[#9E7331] flex items-center gap-1 shrink-0 font-sans font-semibold">
                                  <FiLock /> p.13+
                                </span>
                              ) : (
                                <span className="text-xs text-[#143D2B]/60 shrink-0 font-sans">
                                  Lire →
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        <p className="text-center text-xs italic text-[#666] pt-4">
                          → Cliquez sur un chapitre pour y accéder directement.
                        </p>
                      </div>
                    )}

                    {currentPage === 7 && (
                      <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                        <div className="text-center space-y-2 mb-6">
                          <span className="text-[11px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                            P R É F A C E
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#143D2B]">
                            Un mot avant d&apos;entrer
                          </h3>
                          <div className="text-[#C59B27] tracking-[0.5em] text-xs">◆ ◆ ◆</div>
                        </div>

                        <p className="indent-6">
                          Avant d&apos;entrer dans cet ouvrage, vous devez savoir une chose : ce
                          livre ne vous demandera pas plus d&apos;effort. Il vous proposera moins de
                          combat.
                        </p>
                        <p className="indent-6">
                          Les pages qui suivent ne sont pas un manuel de plus ajouté à la pile des
                          livres qui vous attendent. Elles sont une{" "}
                          <strong>ingénierie</strong> — une architecture conçue pour quiconque
                          s&apos;est éloigné de sa prière et qui, en silence, attend de retrouver le
                          chemin sans savoir par où commencer.
                        </p>
                        <p className="indent-6">
                          J&apos;ai écrit ce livre parce que je l&apos;ai cherché et que je ne
                          l&apos;ai pas trouvé. J&apos;avais besoin d&apos;un texte qui parle à la
                          fois au croyant désorienté et à l&apos;esprit moderne formé aux sciences.
                          Un texte qui ne sépare pas l&apos;âme du corps, ni la révélation de
                          l&apos;observation, ni la sagesse classique d&apos;Al-Ghazâlî de la
                          psychologie comportementale contemporaine. Un texte qui ose dire que
                          reprendre sa prière n&apos;est pas une question de volonté héroïque, mais
                          une question d&apos;<strong>architecture mentale</strong>.
                        </p>
                        <p className="indent-6">
                          Cet ouvrage est ma réponse à ce besoin. Il s&apos;adresse à vous si vous
                          reconnaissez l&apos;un des états suivants — sans jugement ni condition :
                        </p>
                        <p className="indent-6">
                          Vous avez arrêté de prier depuis des mois ou des années, et vous portez ce
                          silence comme un poids.
                        </p>
                        <p className="indent-6">
                          Vous priez encore, mais quelque chose s&apos;est éteint à
                          l&apos;intérieur, et les gestes ne touchent plus le cœur.
                        </p>
                      </div>
                    )}

                    {currentPage === 8 && (
                      <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                        <p className="indent-6">
                          Vous ressentez la déconnexion sans pouvoir la nommer — ce vide diffus que
                          la productivité, les écrans et les acquisitions ne comblent pas.
                        </p>
                        <p className="indent-6">
                          Vous voulez revenir, mais vous ne savez pas par où commencer et toute
                          tentative précédente s&apos;est soldée par un retour à la case départ.
                        </p>

                        <div className="my-6 py-5 border-y border-[#C59B27] text-center italic text-base sm:text-lg text-[#143D2B]">
                          Ce livre est pour vous. Exactement là où vous êtes. Pas là où vous devriez
                          être.
                        </div>

                        <p className="indent-6">
                          Vous y trouverez cinq chapitres, un protocole de trente jours, et une
                          promesse simple : si vous lisez et appliquez avec rigueur, votre prière
                          reviendra. Non parce que ces pages contiennent quelque magie, mais parce
                          qu&apos;elles mettent en méthode ce que la sagesse islamique et les
                          sciences cognitives ont, chacune de leur côté, observé.
                        </p>
                        <p className="indent-6">
                          Une dernière chose. Ce livre n&apos;a pas été écrit pour vous flatter ni
                          pour vous culpabiliser. Il a été écrit pour vous rendre{" "}
                          <strong>lucide</strong> et <strong>libre</strong>. La lucidité vient de la
                          rigueur. La liberté vient du retour.
                        </p>

                        <div className="pt-6 text-center space-y-2 text-[#9E7331] italic">
                          <p>Que la lecture vous soit utile.</p>
                          <p>Et qu&apos;Allah vous facilite chaque pas.</p>
                          <p className="pt-4 not-italic font-sans text-xs tracking-widest uppercase text-[#1A1A1A]">
                            Mounir BYAR
                          </p>
                        </div>
                      </div>
                    )}

                    {currentPage === 9 && (
                      <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                        <div className="text-center space-y-2 mb-6">
                          <span className="text-[11px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                            I N T R O D U C T I O N
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#143D2B]">
                            La Crise de la Déconnexion
                          </h3>
                          <p className="text-sm italic text-[#9E7331]">
                            L&apos;Ingénierie de la Souveraineté
                          </p>
                        </div>

                        <p>
                          L&apos;époque contemporaine se caractérise par une accélération
                          technologique, cognitive et sociale d&apos;une ampleur inédite dans
                          l&apos;histoire de l&apos;humanité. Les architectures numériques, les flux
                          d&apos;informations continus et la pression omniprésente de la performance
                          ont engendré une fragmentation massive et systémique de l&apos;attention
                          humaine. Le cœur humain, conceptualisé dans l&apos;épistémologie islamique
                          sous le terme de <em>Qalb</em>, a toujours été considéré comme
                          l&apos;organe central de la contemplation, de la cognition morale et de la
                          perception de la transcendance divine.
                        </p>
                        <p className="indent-6">
                          Or, dans l&apos;écosystème moderne, ce centre perceptif est
                          continuellement bombardé par des stimuli éphémères, le réduisant à un
                          simple processeur réactif saturé d&apos;informations. Cette surcharge
                          cognitive perpétuelle génère un phénomène délétère que l&apos;on peut
                          qualifier d&apos;<strong>entropie spirituelle</strong>. Plus le système
                          nerveux humain est sollicité par des mécanismes de gratification
                          immédiate, moins les ressources exécutives et psychologiques de
                          l&apos;esprit demeurent disponibles pour l&apos;introspection, le
                          recueillement et la transcendance.
                        </p>
                        <p className="indent-6">
                          La déconnexion vis-à-vis de la religion observée massivement à l&apos;ère
                          moderne ne relève pas systématiquement d&apos;une perte de foi idéologique
                          ou d&apos;un scepticisme intellectuel. Elle résulte plus fondamentalement
                          et plus insidieusement d&apos;un...
                        </p>
                      </div>
                    )}

                    {currentPage === 10 && (
                      <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                        <p>
                          ...environnement dont l&apos;architecture même détourne l&apos;attention
                          humaine du sens ultime. L&apos;individu moderne évolue dans un monde où
                          les algorithmes, le marketing et les structures sociales sont
                          minutieusement calibrés pour capter le regard, monopoliser le temps et
                          drainer l&apos;énergie. Ce processus instaure un état d&apos;oubli — un
                          concept que la théologie islamique identifie sous le terme de{" "}
                          <em>Ghaflah</em>.
                        </p>

                        <h4 className="font-heading text-lg sm:text-xl font-bold italic text-[#143D2B] pt-2">
                          L&apos;Ingénierie de la Souveraineté
                        </h4>

                        <p>
                          C&apos;est ici qu&apos;intervient le concept fondamental d&apos;
                          <strong>Ingénierie de la Souveraineté</strong>. Cette discipline se
                          définit comme la science clinique, psychologique et spirituelle du retour
                          à Allah, conceptualisé comme l&apos;acte suprême de libération
                          existentielle. Dans cette perspective, le monothéisme pur (
                          <em>Tawhîd</em>) dépasse largement le cadre de la simple adhésion
                          dogmatique. Il s&apos;incarne comme une dynamique opératoire concrète de
                          désenvoûtement face aux multiples dépendances qui aliènent l&apos;être
                          humain moderne.
                        </p>

                        <div className="my-5 py-4 border-y border-[#C59B27] text-center italic text-base text-[#143D2B]">
                          La souveraineté personnelle ne se définit nullement par une domination
                          exercée sur autrui, mais par la maîtrise absolue du soi.
                        </div>

                        <p className="indent-6">
                          La souveraineté personnelle se définit par la maîtrise du <em>Nafs</em>{" "}
                          face aux stimuli incessants de l&apos;environnement. C&apos;est la
                          capacité à ne dépendre ultimement que du Créateur, annulant l&apos;emprise
                          des validations sociales, des injonctions consuméristes et des addictions
                          comportementales. Le retour à Allah, formalisé par le...
                        </p>
                      </div>
                    )}

                    {currentPage === 11 && (
                      <div className="space-y-6 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                        <p>
                          ...processus d&apos;<em>At-Tawbah</em>, devient dès lors un processus
                          d&apos;ingénierie intérieure méthodique et mesurable.
                        </p>

                        <div className="p-6 sm:p-8 bg-[#F4F1EA] border border-[#C59B27]/50 rounded-sm space-y-4 my-8">
                          <span className="text-[10px] uppercase tracking-[0.35em] text-[#7A6B53] font-sans font-semibold block">
                            H A D I T H
                          </span>
                          <p className="italic text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
                            « Allah est plus heureux du repentir de Son serviteur que l&apos;un de
                            vous ne l&apos;est de retrouver son chameau perdu dans le désert. »
                          </p>
                          <p className="text-right text-[11px] uppercase tracking-[0.3em] text-[#555] font-sans">
                            M U S L I M — 2 7 4 7
                          </p>
                        </div>
                      </div>
                    )}

                    {currentPage === 12 && (
                      <div className="space-y-5 text-sm sm:text-[15px] leading-[1.85] text-[#1A1A1A] font-serif">
                        <div className="text-center space-y-1.5 mb-5">
                          <span className="text-[10px] uppercase tracking-[0.35em] text-[#9E7331] font-sans font-semibold block">
                            C H A P I T R E &nbsp; P R E M I E R
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#143D2B]">
                            Le Statut de Khalîfa
                          </h3>
                          <p className="text-xs italic text-[#9E7331]">
                            L&apos;honneur de la responsabilité
                          </p>
                        </div>

                        <p>
                          Avant d&apos;aborder la mécanique du repentir ou de la prière, il est
                          impératif de comprendre la position ontologique de l&apos;être humain dans
                          l&apos;épistémologie islamique. Allah a conféré à l&apos;être humain un
                          honneur cosmique en le désignant comme <em>Khalîfa</em> — vicaire,
                          représentant ou gérant — sur terre. Le Coran relate cet événement
                          fondateur.
                        </p>

                        <div className="p-5 sm:p-6 bg-[#F4F1EA] border-l-4 border-[#C59B27] space-y-3 my-4">
                          <p
                            className="text-right text-lg sm:text-xl text-[#143D2B] leading-loose"
                            dir="rtl"
                          >
                            وَإِذْ قَالَ رَبُّكَ لِلْمَلَٰٓئِكَةِ إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ
                            خَلِيفَةً
                          </p>
                          <p className="italic text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                            « Et lorsque ton Seigneur dit aux Anges : « Je vais établir sur la terre
                            un successeur (Khalîfa) ». Ils dirent : « Vas-Tu y désigner un qui y
                            mettra le désordre et répandra le sang ? » Allah répondit : « En vérité,
                            Je sais ce que vous ne savez pas. » »
                          </p>
                          <p className="text-right text-[10px] uppercase tracking-[0.25em] text-[#7A6B53] font-sans">
                            S O U R A T E &nbsp; A L - B A Q A R A — 2 : 3 0
                          </p>
                        </div>

                        <p className="indent-6">
                          Cet honneur suprême a été scellé lorsqu&apos;Allah a ordonné aux anges de
                          se prosterner devant Adam. Cette prosternation n&apos;était pas un acte
                          d&apos;adoration, formellement interdite envers la création, mais une{" "}
                          <strong>reconnaissance solennelle</strong> de la capacité cognitive, du
                          libre arbitre et de la lourde responsabilité confiée à l&apos;être humain.
                          Iblîs, mu par l&apos;arrogance et refusant de reconnaître cette dignité
                          conférée par Allah, s&apos;enfla d&apos;orgueil et devint l&apos;archétype
                          du refus.
                        </p>
                      </div>
                    )}

                    {/* PAGE 13+ : ÉCRAN DE VERROUILLAGE DE LA LECTURE */}
                    {currentPage >= 13 && (
                      <div className="relative py-6">
                        {/* Texte flouté en arrière-plan pour montrer la continuité bloquée */}
                        <div
                          className="space-y-4 text-sm font-serif text-[#1A1A1A]/50 blur-[5px] select-none pointer-events-none"
                          aria-hidden="true"
                        >
                          <h4 className="font-heading text-xl font-bold text-[#143D2B]">
                            La prise de responsabilité comme fondation
                          </h4>
                          <p>
                            À l&apos;inverse d&apos;Iblîs, lorsque Adam et Ève commirent
                            l&apos;erreur de manger de l&apos;arbre interdit et perdirent leur
                            équilibre initial, leur réaction fut la fondation même de la
                            souveraineté humaine : la prise de responsabilité immédiate par le
                            repentir...
                          </p>
                          <div className="p-6 bg-[#F4F1EA] border-l-4 border-[#C59B27]">
                            <p>
                              « Ô notre Seigneur, nous avons fait du tort à nous-mêmes. Et si Tu ne
                              nous pardonnes pas et ne nous fais pas miséricorde... »
                            </p>
                          </div>
                          <p>
                            Être Khalîfa ne confère aucune supériorité hautaine ou despotique sur
                            les autres créatures ou sur la nature. Il s&apos;agit au contraire
                            d&apos;une reddition de comptes...
                          </p>
                        </div>

                        {/* Carte de verrouillage au premier plan */}
                        <div className="inset-0 flex items-center justify-center mt-[-220px] relative z-10">
                          <div className="bg-[#0A1128] text-[#F0EDE8] border-2 border-[#D4A853] rounded-sm p-6 sm:p-8 max-w-lg w-full text-center shadow-[0_20px_50px_rgba(10,17,40,0.85)] space-y-5">
                            <div className="w-14 h-14 rounded-full bg-[#D4A853]/15 border border-[#D4A853] text-[#D4A853] flex items-center justify-center mx-auto text-2xl">
                              <FiLock />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A853] font-bold block">
                                Fin de l&apos;Extrait Gratuit (Pages 6 à 12)
                              </span>
                              <h4 className="font-heading text-2xl sm:text-3xl text-[#F0EDE8] font-light">
                                Débloquez les Pages 13 à 41
                              </h4>
                            </div>

                            <p className="text-xs text-[#A0AEC0] leading-relaxed font-sans">
                              La suite de cet ouvrage (Chapitres II à V, biomarqueurs de la Salât,
                              méthode du Habit Stacking et{" "}
                              <strong className="text-[#F0EDE8]">
                                Protocole complet de 30 Jours
                              </strong>
                              ) est réservée aux acquéreurs de l&apos;édition numérique.
                            </p>

                            <div className="bg-[#0D1B2A] border border-white/10 rounded-sm p-3.5 text-left space-y-1.5 text-[11px] text-[#A0AEC0] font-sans">
                              <div className="flex items-center gap-2">
                                <FiCheck className="text-[#10B981] shrink-0" />
                                <span>Ouvrage intégral de 41 pages (PDF + ePub Liseuse)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiCheck className="text-[#10B981] shrink-0" />
                                <span>Accès et téléchargement immédiat après validation</span>
                              </div>
                            </div>

                            <Link
                              href="/paiement?offre=secrets"
                              className="w-full py-4 px-6 bg-[#D4A853] hover:bg-[#E8C468] text-[#0A1128] font-bold text-xs uppercase tracking-[0.18em] rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 font-sans"
                            >
                              <FiLock className="shrink-0" />
                              <span>Acquérir le Livre Complet (5,90 €) ➔</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pied de page du livre + Boutons Précédent / Suivant */}
                  <div className="pt-6 mt-8 border-t border-[#C9A84C]/25 flex items-center justify-between gap-2 font-sans">
                    <button
                      type="button"
                      onClick={goPrevPage}
                      disabled={currentPage <= 6}
                      className="px-3.5 py-2 rounded-sm border border-[#143D2B]/20 text-xs font-semibold text-[#143D2B] disabled:opacity-30 hover:bg-[#143D2B] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft /> Page précédente
                    </button>

                    <span className="font-serif text-sm font-bold text-[#143D2B]">
                      {currentPage <= 12 ? currentPage : "🔒 13 / 41"}
                    </span>

                    {currentPage <= 12 ? (
                      <button
                        type="button"
                        onClick={goNextPage}
                        className="px-3.5 py-2 rounded-sm bg-[#143D2B] text-white text-xs font-semibold hover:bg-[#0F2E20] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {currentPage === 12 ? (
                          <>
                            <span>Page 13 (Suite)</span> <FiLock className="text-[#D4A853]" />
                          </>
                        ) : (
                          <>
                            <span>Page suivante</span> <FiChevronRight />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        href="/paiement?offre=secrets"
                        className="px-3.5 py-2 rounded-sm bg-[#C59B27] text-[#0A1128] text-xs font-bold hover:bg-[#D4A853] transition-colors flex items-center gap-1.5"
                      >
                        <span>Débloquer (5,90 €)</span> <FiChevronRight />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            OUVRAGE 2 : Ar-Rahman — La Mer sans Rivage
            ════════════════════════════════════════════════════════════════════ */}
        <div
          id="rahman"
          className="border-t border-border/60 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold bg-gold-muted px-4 py-1.5 border border-gold/20 font-body">
              Volume I — Collection Connaissance du Créateur
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-cream">
              Ar-Rahman : La Mer sans Rivage
            </h3>
            <p className="text-sm uppercase tracking-widest text-emerald font-semibold font-body">
              Exégèse du Premier Nom — La Miséricorde Universelle d&apos;Allah
            </p>

            <p className="text-sm text-cream-muted leading-relaxed font-body">
              Une plongée de 84 pages dans la linguistique, l&apos;exégèse classique (Tabarî,
              Qurtubî, Râzî, Ibn Kathîr) et la théologie spirituelle (Ghazâlî, Ibn al-Qayyim)
              d&apos;un seul nom divin : <strong className="text-cream">Ar-Rahman</strong>. Le
              premier nom à être invoqué après le nom suprême, contenant en lui une cosmologie
              entière et s&apos;incarnant comme un remède puissant contre la crise spirituelle
              moderne.
            </p>

            {/* Plan de l'ouvrage stylisé */}
            <div className="bg-midnight-light/50 p-6 sm:p-8 border border-border/80 rounded-sm">
              <h4 className="font-heading text-lg text-cream mb-4 font-medium tracking-wide">
                Structure de l&apos;ouvrage
              </h4>
              <ul className="space-y-3.5 text-xs text-cream-muted font-body">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie I : La Science du Nom</strong>{" "}
                    — La tradition des 99 noms (hadiths) et les 4 niveaux d&apos;Ihsâ&apos; de la
                    connaissance.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">
                      Partie II : La Miséricorde Cosmologique
                    </strong>{" "}
                    — Le Trône divin et la miséricorde universelle.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">
                      Partie III : Les Récits de la Miséricorde
                    </strong>{" "}
                    — Rahmatan lil-&apos;âlamîn (Le Prophète ﷺ comme miséricorde) et Taïf.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">
                      Partie IV : Théologie & Psychologie
                    </strong>{" "}
                    — Al-Ghazâlî et l&apos;âme humaine face au désespoir.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-emerald/60 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-cream font-medium">Partie V : Vivre le Nom</strong> — Le
                    programme pratique pour incarner la Rahma dans le quotidien.
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Module d'Achat direct Stripe - Prestige */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 p-6 sm:p-8 border border-border bg-midnight-light/60 backdrop-blur-md rounded-sm relative shadow-2xl hover:border-gold/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-10 w-20 h-px bg-gold/50" />
            <h4 className="font-heading text-xl text-cream mb-3 font-semibold tracking-wide">
              Se procurer l&apos;ouvrage
            </h4>
            <p className="text-xs text-cream-muted leading-relaxed font-body mb-6">
              Le premier volume de la collection exclusive est disponible immédiatement en version
              numérique de prestige (PDF).
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Format</span>
                <span className="text-cream font-medium">eBook (Format PDF)</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Pagination</span>
                <span className="text-cream font-medium">84 pages</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-3 text-[10px] uppercase tracking-wider font-body">
                <span className="text-cream-muted">Tarif Numérique</span>
                <span className="text-gold font-bold text-base">12,65 €</span>
              </div>
            </div>

            <Button
              href="/paiement?offre=rahman"
              variant="primary"
              className="w-full py-4 text-center justify-center font-bold tracking-widest"
            >
              Commander l&apos;eBook (PDF)
            </Button>
          </motion.div>
        </div>

        {/* Section Incitation au Mentorat Privé — Étape 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-24 text-center border-t border-border/60 pt-16 sm:pt-20 space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">
            ➔ Passer à la phase supérieure
          </span>
          <h3 className="font-heading text-3xl font-light text-cream tracking-wide">
            Étape 06 : Entamer l&apos;Interposition Privée
          </h3>
          <p className="text-sm text-cream-muted max-w-xl mx-auto font-body leading-relaxed">
            La lecture des écrits numériques est votre point d&apos;entrée. Si vous aspirez à
            l&apos;excellence ultime du compagnonnage spirituel (Suhba) et comportemental sous la
            direction de Mounir BYAR, formulez votre candidature privée.
          </p>
          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              href="/contact"
              className="shadow-2xl shadow-stone-950/20 font-bold tracking-widest px-10 py-4"
            >
              Postuler au Mentorat de 9 Mois →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
