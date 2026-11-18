"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PrixPage() {
  const [billingCycle, setBillingCycle] = useState<"unique" | "mensuel">("unique");

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#181512] pt-32 pb-24 px-5 sm:px-10 lg:px-16 selection:bg-[#B88E3E]/20">
      
      {/* Voile décoratif discret */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,62,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* ════════════════════════════════════════════════════════════
            EN-TÊTE : CLARTÉ TARIFAIRE ABSOLUE
            ════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] font-bold block">
            TRANSPARENCE TARIFAIRE • CABINET BLF
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl text-[#181512] tracking-[-0.025em] leading-[1.08]">
            Grille Tarifaire & Investissements Souverains
          </h1>
          <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
            De l&apos;accès autonome immédiat dès 5,90 € au compagnonnage d&apos;excellence sur 12 mois. Choisissez l&apos;accompagnement adapté à votre ambition, sans aucun frais caché.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1 : LES LIVRES & TRAITÉS FONDATEURS (DÈS 5,90 €)
            ════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="border-b border-[#E5DDD2] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] text-[#B88E3E] uppercase tracking-wider font-bold block">
                NIVEAU 01 • ACCÈS IMMÉDIAT EN AUTONOMIE
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#181512]">
                Les Traités Fondateurs de Mounir Byar
              </h2>
            </div>
            <span className="text-xs text-[#7A6F64] font-sans">
              Téléchargement instantané (eBook) ou expédition postale suivie
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Livre 1 : Secrets de la Salat */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDD2] shadow-[0_10px_30px_rgba(50,40,30,0.04)] hover:border-[#B88E3E]/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="relative h-56 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-Secrets.png"
                    alt="Mockup du livre Les Secrets de la Salat"
                    fill
                    className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#087B53] bg-[#087B53]/10 px-2.5 py-1 rounded-full">
                    LE LIVRE DE RÉFÉRENCE (+5 000 LECTEURS)
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[#181512]">
                    Les Secrets de la Salât et du Retour vers Allah
                  </h3>
                  <p className="text-sm text-[#5C534A] leading-[1.65]">
                    L&apos;ouvrage magistral pour transformer votre prière. Comprenez chaque geste (Qiyâm, Rukû&apos;, Sujûd) et leurs répercussions neurobiologiques pour éliminer définitivement la distraction et la culpabilité.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6F64] block font-mono">Format Numérique & Broché</span>
                  <span className="font-heading font-bold text-2xl text-[#181512]">
                    5,90 € <span className="text-xs font-normal text-[#7A6F64]">/ 19,90 € broché</span>
                  </span>
                </div>
                <Link
                  href="/livres#secrets"
                  className="px-6 py-3 rounded-full bg-[#B88E3E] text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-[#A37B32] transition-all shadow-md"
                >
                  Commander ↗
                </Link>
              </div>
            </div>

            {/* Livre 2 : Sourate Ar-Rahman */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDD2] shadow-[0_10px_30px_rgba(50,40,30,0.04)] hover:border-[#B88E3E]/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="relative h-56 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-ArRahman.png"
                    alt="Mockup du livre Sourate Ar-Rahman"
                    fill
                    className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B88E3E] bg-[#B88E3E]/10 px-2.5 py-1 rounded-full">
                    EXÉGÈSE & SÉRÉNITÉ
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[#181512]">
                    Sourate Ar-Rahmân : Les Clés de la Gratitude
                  </h3>
                  <p className="text-sm text-[#5C534A] leading-[1.65]">
                    Une immersion profonde dans les lois de la Création. Comment la contemplation des bienfaits divins guérit l&apos;anxiété du siècle et restaure une sérénité intérieure inébranlable.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6F64] block font-mono">Format Numérique & Broché</span>
                  <span className="font-heading font-bold text-2xl text-[#181512]">
                    5,90 € <span className="text-xs font-normal text-[#7A6F64]">/ 19,90 € broché</span>
                  </span>
                </div>
                <Link
                  href="/livres#ar-rahman"
                  className="px-6 py-3 rounded-full bg-[#181512] text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-[#2A241F] transition-all shadow-md"
                >
                  Commander ↗
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 : LES PROTOCOLES & FORMATIONS C.O.M.E.S.
            ════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="border-b border-[#E5DDD2] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] text-[#087B53] uppercase tracking-wider font-bold block">
                NIVEAU 02 • MÉTHODE APPLIQUÉE & SUIVI INDIVIDUEL
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#181512]">
                Les Protocoles de Transformation C.O.M.E.S.
              </h2>
            </div>
            <span className="text-xs text-[#7A6F64] font-sans">
              Facilités de paiement en 1x, 2x ou 3x sans frais
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* OFFRE 1 : L'Audit Diagnostique */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5DDD2] shadow-[0_10px_30px_rgba(50,40,30,0.04)] hover:border-[#087B53]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A6F64]">
                  ÉVALUATION INITIALE
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#181512]">
                  Audit Diagnostique
                </h3>
                <p className="text-xs text-[#5C534A] leading-[1.6]">
                  Séance individuelle approfondie d&apos;1h30 pour cartographier vos blocages inconscients, votre niveau de cortisol et la racine de votre inertie.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-[#5C534A] font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#087B53] font-bold">✓</span> 1h30 d&apos;audit individuel en direct
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#087B53] font-bold">✓</span> Cartographie des sabotages
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#087B53] font-bold">✓</span> Feuille de route d&apos;urgence
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] space-y-3">
                <div className="font-heading font-bold text-3xl text-[#181512]">
                  85,90 €
                </div>
                <Link
                  href="/paiement?offre=audit"
                  className="w-full py-3 rounded-full bg-[#181512] text-white font-heading font-semibold text-xs uppercase tracking-wider text-center block hover:bg-[#2A241F] transition-all"
                >
                  Réserver l&apos;Audit ↗
                </Link>
              </div>
            </div>

            {/* OFFRE 2 : Protocole 30 Jours */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5DDD2] shadow-[0_10px_30px_rgba(50,40,30,0.04)] hover:border-[#087B53]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#087B53]">
                  RÉALIGNEMENT INTENSIF
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#181512]">
                  Protocole 30 Jours
                </h3>
                <p className="text-xs text-[#5C534A] leading-[1.6]">
                  Un mois pour briser net l&apos;At-Taswîf, caler votre rythme sur le soleil et installer la régularité sans forcer la volonté.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-[#5C534A] font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#087B53] font-bold">✓</span> 4 Séances hebdomadaires de travail
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#087B53] font-bold">✓</span> Suivi messagerie 5j/7
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#087B53] font-bold">✓</span> Routines anti-procrastination
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] space-y-3">
                <div>
                  <div className="font-heading font-bold text-3xl text-[#181512]">
                    612,70 €
                  </div>
                  <span className="text-[11px] text-[#7A6F64] font-mono">ou 2x 306,35 € sans frais</span>
                </div>
                <Link
                  href="/paiement?offre=30j"
                  className="w-full py-3 rounded-full bg-[#181512] text-white font-heading font-semibold text-xs uppercase tracking-wider text-center block hover:bg-[#2A241F] transition-all"
                >
                  S&apos;inscrire au 30 Jours ↗
                </Link>
              </div>
            </div>

            {/* OFFRE 3 : Transformation 3 Mois (Le Choix Recommandé) */}
            <div className="p-8 rounded-3xl bg-[#FAF6F0] border-2 border-[#B88E3E] shadow-[0_15px_40px_rgba(184,142,62,0.12)] relative flex flex-col justify-between space-y-6">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#B88E3E] text-white font-mono text-[9px] font-bold uppercase tracking-widest shadow-md">
                LE PROGRAMME RECOMMANDÉ
              </span>

              <div className="space-y-4 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B88E3E]">
                  RECONSTRUCTION COMPLÈTE
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#181512]">
                  Transformation 3 Mois
                </h3>
                <p className="text-xs text-[#5C534A] leading-[1.6]">
                  Le protocole étendu pour désactiver les automatismes toxiques, sanctuariser l&apos;environnement et ancrer la souveraineté pour toujours.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-[#5C534A] font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#B88E3E] font-bold">✓</span> 12 Séances d&apos;impact individuel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B88E3E] font-bold">✓</span> Suivi quotidien 7j/7 par messagerie
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B88E3E] font-bold">✓</span> Refonte de l&apos;écosystème physique
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#B88E3E] font-bold">✓</span> Clôture définitive de la charge allostatique
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] space-y-3">
                <div>
                  <div className="font-heading font-bold text-3xl text-[#181512]">
                    1 655,30 €
                  </div>
                  <span className="text-[11px] text-[#7A6F64] font-mono">ou 3x 551,77 € sans frais</span>
                </div>
                <Link
                  href="/paiement?offre=3m"
                  className="w-full py-3.5 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs uppercase tracking-wider text-center block hover:bg-[#066343] transition-all shadow-md"
                >
                  Démarrer la Transformation ↗
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3 : HAUTE DIRECTION • ALLIANCE VIP 12 MOIS
            ════════════════════════════════════════════════════════════ */}
        <section className="p-8 sm:p-14 rounded-3xl bg-white border border-[#E5DDD2] shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B88E3E] bg-[#B88E3E]/10 px-3 py-1 rounded-full">
                NIVEAU 03 • MENTORAT PRIVÉ & INTERPOSITION
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#181512]">
                Alliance VIP 12 Mois — Le Mandat de Khalifa
              </h2>
              <p className="text-sm text-[#5C534A] font-sans leading-[1.65]">
                Réservé aux entrepreneurs, dirigeants et esprits influents qui exigent une transformation absolue de leur existence. Un compagnonnage direct avec Mounir Byar pour faire de la Salât et de la foi l&apos;axe central de vos décisions stratégiques.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#5C534A]">
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span> Séances individuelles illimitées à la demande
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span> Ligne directe VIP H24 avec Mounir Byar
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span> Restructuration complète de vos entreprises
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087B53] font-bold">✓</span> Garantie d&apos;ancrage et tawakkul absolu
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD2] text-center space-y-4">
              <div>
                <span className="text-xs text-[#7A6F64] line-through block font-mono">6 112,00 €</span>
                <span className="font-heading font-bold text-3xl sm:text-4xl text-[#181512] block">
                  4 889,60 €
                </span>
                <span className="text-xs text-[#B88E3E] font-mono font-bold">
                  ou 6x 814,93 € sans frais
                </span>
              </div>
              <Link
                href="/candidature"
                className="w-full py-4 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs uppercase tracking-wider block hover:bg-[#066343] transition-all shadow-md"
              >
                Postuler au Mentorat VIP ↗
              </Link>
              <span className="text-[10px] text-[#7A6F64] font-mono block">
                Candidature sélective sur dossier
              </span>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4 : SÉCURITÉ & FACILITÉS DE PAIEMENT
            ════════════════════════════════════════════════════════════ */}
        <section className="p-8 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD2] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs font-sans text-[#5C534A]">
          <div className="space-y-1">
            <span className="font-heading font-bold text-sm text-[#181512] block">Paiement Sécurisé</span>
            <p>Cryptage SSL 256-bit par Stripe (CB, Visa, Mastercard, Apple Pay).</p>
          </div>
          <div className="space-y-1">
            <span className="font-heading font-bold text-sm text-[#181512] block">Échelonnement Sans Frais</span>
            <p>Possibilité de régler en 2, 3 ou 6 fois sans intérêt additionnel.</p>
          </div>
          <div className="space-y-1">
            <span className="font-heading font-bold text-sm text-[#181512] block">Facturation Professionnelle</span>
            <p>Facture avec TVA émise pour les indépendants et entreprises.</p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5 : QUESTION PRÉALABLE ?
            ════════════════════════════════════════════════════════════ */}
        <div className="text-center pt-8 border-t border-[#E5DDD2] space-y-4">
          <h3 className="font-heading font-bold text-xl text-[#181512]">
            Vous hésitez sur la formule la plus adaptée à votre situation ?
          </h3>
          <p className="text-sm text-[#5C534A] max-w-md mx-auto">
            Commencez par notre audit gratuit de 3 minutes pour obtenir un diagnostic instantané de vos priorités.
          </p>
          <div className="pt-2">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-[#066343] transition-all shadow-md"
            >
              <span>Passer l&apos;Audit Gratuit (3 min)</span>
              <span>↗</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
