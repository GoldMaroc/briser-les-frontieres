"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function PrixPage() {
  const [activeTab, setActiveTab] = useState<"services" | "livres">("services");

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-280 pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      
      <div className="max-w-[1240px] mx-auto space-y-12 relative z-10">
        
        {/* EN-TÊTE STATUTAIRE & CLARTÉ PSYCHOLOGIQUE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              TRANSPARENCE TARIFAIRE • CABINET BLF
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.08]">
            Tarifs &amp;{" "}
            <span className="text-[#B88E3E]">
              Investissements
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-[1.65]">
            Clarté absolue et zéro charge cognitive. Choisissez entre nos <strong>prestations d&apos;accompagnement clinique</strong> et nos <strong>traités fondateurs de la librairie</strong>.
          </p>

          {/* SÉLECTEUR D'ONGLETS STATUTAIRE (DÉCOUPLAGE STRICT SERVICES VS LIVRES) */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "services"
                    ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === "services" ? "bg-[#087B53]" : "bg-neutral-400"}`} />
                <span>Prestations &amp; Consultations</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("livres")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "livres"
                    ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === "livres" ? "bg-[#B88E3E]" : "bg-neutral-400"}`} />
                <span>La Librairie (Traités Écrits)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            VUE 1 : PRESTATIONS ET PROTOCOLES D'ACCOMPAGNEMENT
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "services" && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#087B53]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                  Accompagnement privé avec Mounir Byar • Consultations payantes et protocoles personnalisés
                </span>
              </div>
              <Link
                href="/rendez-vous"
                className="text-xs font-mono uppercase tracking-wider text-[#B88E3E] font-bold hover:underline"
              >
                Voir les créneaux disponibles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* CARTE 1 : ENTRETIEN TÉLÉPHONIQUE & VISIO */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#087B53] font-bold uppercase tracking-wider">
                      Diagnostic Téléphonique
                    </span>
                    <span className="text-[10px] font-mono bg-[#087B53]/10 text-[#087B53] px-2 py-0.5 rounded-full font-bold">
                      45 Min
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Entretien Téléphonique &amp; Visio
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Analyse chirurgicale de votre charge mentale et de vos blocages de prière. Établissement d&apos;une feuille de route stratégique immédiate avec Mounir Byar.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      48,95 &euro;
                    </div>
                    <span className="text-[11px] font-mono text-[#7A6F64]">
                      Règlement à la réservation
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>45 min d&apos;analyse confidentielle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Cartographie des déclencheurs de stress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Déductible si engagement sous 7j</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/rendez-vous"
                  className="w-full py-3 rounded-full bg-[var(--bg)] border border-[var(--border)] hover:border-[#B88E3E] text-center text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all"
                >
                  Choisir mon Créneau (48,95 &euro;)
                </Link>
              </div>

              {/* CARTE 2 : CONSULTATION PRÉSENTIELLE À DOMICILE */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[#087B53]/50 shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8C6214] font-bold uppercase tracking-wider">
                      À Votre Domicile
                    </span>
                    <span className="text-[10px] font-mono bg-[#B88E3E]/10 text-[#8C6214] px-2 py-0.5 rounded-full font-bold">
                      1h15
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Consultation Présentielle à Domicile
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Mounir Byar se déplace personnellement chez vous. Audit physique de l&apos;habitat, sanctuarisation du lieu de prière (Tahara 360&deg;) et plan d&apos;action remis en main propre.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      96,45 &euro;
                    </div>
                    <span className="text-[11px] font-mono text-[#7A6F64]">
                      Mounir Byar se déplace chez vous
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Déplacement physique à votre domicile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Audit ergonomique et Tahara 360&deg;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Remise du protocole personnalisé</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/rendez-vous"
                  className="w-full py-3 rounded-full bg-[#141210] hover:bg-[#2D2A26] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-sm"
                >
                  Réserver à Domicile (96,45 &euro;)
                </Link>
              </div>

              {/* CARTE 3 : PROTOCOLE 30 JOURS (LE PLUS CHOISI) */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border-2 border-[#087B53] shadow-md flex flex-col justify-between relative">
                <div className="absolute -top-3.5 right-6 bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  Le Plus Choisi
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#087B53] font-bold uppercase tracking-wider">
                      Transformation Ciblée
                    </span>
                    <span className="text-[10px] font-mono bg-[#087B53]/15 text-[#087B53] px-2 py-0.5 rounded-full font-bold">
                      30 Jours
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Protocole C.O.M.E.S. 30 Jours
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Un mois d&apos;intervention intensive pour briser définitivement la procrastination, effondrer le cortisol et sanctuariser les 5 prières quotidiennes.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      612,70 &euro;
                    </div>
                    <span className="text-[11px] font-mono text-[#087B53] font-bold">
                      ou 3x 204,23 &euro; sans aucun frais
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>4 séances individuelles intensives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Messagerie privée 5j/7 en temps réel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Garantie de transformation inaltérable</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/paiement?product=30j"
                  className="w-full py-3.5 rounded-full bg-[#087B53] hover:bg-[#065f40] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-md"
                >
                  Rejoindre le Protocole (612,70 &euro;)
                </Link>
              </div>

              {/* CARTE 4 : MANDAT KHALIFA 9 MOIS */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8C6214] font-bold uppercase tracking-wider">
                      Compagnonnage d&apos;Élite
                    </span>
                    <span className="text-[10px] font-mono bg-[#B88E3E]/10 text-[#8C6214] px-2 py-0.5 rounded-full font-bold">
                      9 Mois
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Mandat Khalifa 9 Mois
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Refonte intégrale de votre existence. Alignement spirituel, professionnel et familial sous la supervision directe et continue de Mounir Byar.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      Sur Mesure
                    </div>
                    <span className="text-[11px] font-mono text-[#7A6F64]">
                      Sélection stricte sur dossier
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Supervision continue &amp; ligne directe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Refonte intégrale des 8 Piliers de vie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Tous les traités &amp; outils inclus</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/rendez-vous"
                  className="w-full py-3 rounded-full bg-[var(--bg)] border border-[var(--border)] hover:border-[#B88E3E] text-center text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all"
                >
                  Candidater à l&apos;Immersion
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            VUE 2 : LA LIBRAIRIE ET TRAITÉS FONDATEURS (SÉPARÉE STRICTEMENT)
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === "livres" && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B88E3E]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                  Ouvrages d&apos;étude autonome • Téléchargement immédiat haute définition (PDF + ePub)
                </span>
              </div>
              <Link
                href="/livres"
                className="text-xs font-mono uppercase tracking-wider text-[#B88E3E] font-bold hover:underline"
              >
                Explorer la page complète des livres &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* LIVRE 1 : LES SECRETS DU RETOUR VERS ALLAH */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#087B53] font-bold uppercase tracking-wider">
                      Manuel Fondateur
                    </span>
                    <span className="text-[10px] font-mono bg-[#087B53]/10 text-[#087B53] px-2 py-0.5 rounded-full font-bold">
                      Digital
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Les Secrets du Retour vers Allah
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Le traité d&apos;ingénierie neurocomportementale du Sujûd. Explication scientifique de chaque station de la prière, rupture du cortisol et libération de la dopamine saine.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      9,90 &euro;
                    </div>
                    <span className="text-[11px] font-mono text-[#7A6F64]">
                      Téléchargement immédiat (PDF + ePub)
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Anatomie du nerf vague et du Sujûd</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Protocoles de neutralisation de l&apos;angoisse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Accessible instantanément sur smartphone et PC</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/paiement?product=secrets"
                  className="w-full py-3 rounded-full bg-[#141210] hover:bg-[#2D2A26] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-sm"
                >
                  Commander l&apos;eBook (9,90 &euro;)
                </Link>
              </div>

              {/* LIVRE 2 : RECUEIL DES INVOCATIONS CIBLÉES */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8C6214] font-bold uppercase tracking-wider">
                      Protocole de Détresse
                    </span>
                    <span className="text-[10px] font-mono bg-[#B88E3E]/10 text-[#8C6214] px-2 py-0.5 rounded-full font-bold">
                      Poche &amp; Digital
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Recueil des Invocations Ciblées
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Formules prophétiques exactes voyellées et phonétisées, accompagnées des explications neuro-émotionnelles de leur impact sur le système nerveux autonome.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      5,90 &euro;
                    </div>
                    <span className="text-[11px] font-mono text-[#7A6F64]">
                      Format de poche &amp; digital HD
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Arabe voyellé, phonétique et traduction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Invocations ciblées aux moments clés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Accès numérique immédiat</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/paiement?product=invocations"
                  className="w-full py-3 rounded-full bg-[#141210] hover:bg-[#2D2A26] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-sm"
                >
                  Commander le Recueil (5,90 &euro;)
                </Link>
              </div>

              {/* LIVRE 3 : AR-RAHMAN */}
              <div className="p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8C6214] font-bold uppercase tracking-wider">
                      Édition de Prestige
                    </span>
                    <span className="text-[10px] font-mono bg-[#B88E3E]/10 text-[#8C6214] px-2 py-0.5 rounded-full font-bold">
                      Ouvrage Intégral
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-2">
                    Ar-Rahman — La Mer sans Rivage
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                    Une exploration exégétique profonde de la Miséricorde divine pour dissoudre l&apos;angoisse existentielle, restaurer l&apos;estime de soi et retrouver la paix du cœur.
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-extrabold text-[var(--text-primary)]">
                      12,65 &euro;
                    </div>
                    <span className="text-[11px] font-mono text-[#7A6F64]">
                      84 pages de recueillement spirituel
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-8 font-sans border-t border-[var(--border)] pt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Contemplation cosmique et exégèse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Commentaires des maîtres traditionnels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#087B53] font-bold">&check;</span>
                      <span>Téléchargement instantané haute résolution</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/paiement?product=rahman"
                  className="w-full py-3 rounded-full bg-[#141210] hover:bg-[#2D2A26] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-sm"
                >
                  Commander l&apos;Ouvrage (12,65 &euro;)
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* SECTION RÉASSURANCE PSYCHOLOGIQUE & SÉCURITÉ */}
        <div className="p-8 sm:p-10 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
              Paiement Sécurisé &amp; Transparence Fiscale
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-xl leading-relaxed font-sans">
              Toutes les transactions sont chiffrées de bout en bout via Stripe. Facture officielle émise immédiatement par le Cabinet BLF. Aucun frais dissimulé, 0% de Riba.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/audit"
              className="px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Passer l&apos;audit gratuit</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/rendez-vous"
              className="px-6 py-3 rounded-full border border-[#B88E3E]/60 bg-white hover:border-[#B88E3E] text-[var(--text-primary)] text-xs font-heading font-semibold uppercase tracking-wider transition-all"
            >
              <span>Prendre RDV</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
