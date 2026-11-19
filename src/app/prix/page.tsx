import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Grille Tarifaire & Investissements — Cabinet BLF | Mounir BYAR",
  description:
    "Transparence tarifaire absolue du Cabinet BLF. Des traités fondateurs dès 5,90 € aux protocoles de transformation comportementale de 30 jours à 12 mois.",
};

export default function PrixPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#FF758C]/30">
      
      {/* Halos d'ambiance KÖM Style */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[350px] bg-gradient-to-b from-[#FF758C]/15 via-[#F59E0B]/10 to-transparent rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#9333EA]/10 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE : CLARTÉ TARIFAIRE KÖM STYLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              TRANSPARENCE TARIFAIRE • CABINET BLF
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
            ↗ Grille Tarifaire &{" "}
            <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
              Investissements
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 font-sans leading-[1.65]">
            De l&apos;accès autonome immédiat dès 5,90 € au compagnonnage d&apos;excellence sur 12 mois. Choisissez l&apos;accompagnement adapté à votre ambition, en toute clarté.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/rendez-vous"
              data-cursor="book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              <span>↗ PRENDRE UN RENDEZ-VOUS (AGENDA)</span>
            </Link>
            <Link
              href="/audit"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>↗ FAIRE L&apos;AUDIT GRATUIT (3 MIN)</span>
            </Link>
          </div>
        </div>

        {/* SECTION 1 : LES LIVRES & TRAITÉS FONDATEURS */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-[11px] text-[#FF758C] uppercase tracking-wider font-bold block">
                NIVEAU 01 • ACCÈS IMMÉDIAT EN AUTONOMIE
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                ↗ Les Traités Fondateurs de Mounir Byar
              </h2>
            </div>
            <span className="text-xs text-white/50 font-sans">
              Téléchargement instantané (eBook) ou expédition postale suivie
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Livre 1 */}
            <div 
              data-cursor="view"
              data-cursor-text="LIVRE ↗"
              className="p-8 sm:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-6">
                <div className="relative h-56 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-Secrets.png"
                    alt="Mockup du livre Les Secrets de la Salat"
                    fill
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981] bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-1 rounded-full">
                    LE LIVRE DE RÉFÉRENCE (+5 000 LECTEURS)
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Les Secrets de la Salât et du Retour vers Allah
                  </h3>
                  <p className="text-sm text-white/70 leading-[1.65]">
                    L&apos;ouvrage magistral pour transformer votre prière. Comprenez chaque geste (Qiyâm, Rukû&apos;, Sujûd) et leurs répercussions neurobiologiques pour éliminer définitivement la distraction.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/40 block font-mono">Format Numérique & Broché</span>
                  <span className="font-heading font-extrabold text-3xl text-white">
                    5,90 € <span className="text-xs font-normal text-white/50">/ 19,90 € broché</span>
                  </span>
                </div>
                <Link
                  href="/livres#secrets"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md"
                >
                  ↗ COMMANDER
                </Link>
              </div>
            </div>

            {/* Livre 2 */}
            <div 
              data-cursor="view"
              data-cursor-text="LIVRE ↗"
              className="p-8 sm:p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-6">
                <div className="relative h-56 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-ArRahman.png"
                    alt="Mockup du livre Sourate Ar-Rahman"
                    fill
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF758C] bg-[#FF758C]/10 border border-[#FF758C]/30 px-2.5 py-1 rounded-full">
                    EXÉGÈSE & SÉRÉNITÉ
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Sourate Ar-Rahmân : Les Clés de la Gratitude
                  </h3>
                  <p className="text-sm text-white/70 leading-[1.65]">
                    Une immersion profonde dans les lois de la Création. Comment la contemplation des bienfaits divins guérit l&apos;anxiété du siècle et restaure une paix intérieure inébranlable.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/40 block font-mono">Format Numérique & Broché</span>
                  <span className="font-heading font-extrabold text-3xl text-white">
                    5,90 € <span className="text-xs font-normal text-white/50">/ 19,90 € broché</span>
                  </span>
                </div>
                <Link
                  href="/livres#ar-rahman"
                  className="px-6 py-3 rounded-full bg-white text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-md"
                >
                  ↗ COMMANDER
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2 : LES PROTOCOLES & FORMATIONS C.O.M.E.S. */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-[11px] text-[#10B981] uppercase tracking-wider font-bold block">
                NIVEAU 02 • MÉTHODE APPLIQUÉE & SUIVI INDIVIDUEL
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                ↗ Les Protocoles de Transformation C.O.M.E.S.
              </h2>
            </div>
            <span className="text-xs text-white/50 font-sans">
              Facilités de paiement en 1x, 2x ou 3x sans frais
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* OFFRE 1 */}
            <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                  ÉVALUATION INITIALE
                </span>
                <h3 className="font-heading font-bold text-2xl text-white">
                  Audit Diagnostique
                </h3>
                <p className="text-xs text-white/70 leading-[1.6]">
                  Séance individuelle approfondie d&apos;1h30 pour cartographier vos blocages inconscients, votre niveau de cortisol et la racine de votre inertie.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-white/60 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> 1h30 d&apos;audit individuel en direct
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Cartographie des sabotages
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Feuille de route d&apos;urgence
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="font-heading font-extrabold text-3xl text-white">
                  85,90 €
                </div>
                <Link
                  href="/paiement?offre=audit"
                  className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider text-center block transition-all"
                >
                  ↗ Réserver l&apos;Audit
                </Link>
              </div>
            </div>

            {/* OFFRE 2 */}
            <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
                  RÉALIGNEMENT INTENSIF
                </span>
                <h3 className="font-heading font-bold text-2xl text-white">
                  Protocole 30 Jours
                </h3>
                <p className="text-xs text-white/70 leading-[1.6]">
                  Un mois pour briser net l&apos;At-Taswîf, caler votre rythme sur le soleil et installer la régularité sans forcer la volonté.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-white/60 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> 4 Séances hebdomadaires de travail
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Suivi messagerie 5j/7
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-bold">✓</span> Routines anti-procrastination
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div>
                  <div className="font-heading font-extrabold text-3xl text-white">
                    612,70 €
                  </div>
                  <span className="text-[11px] text-white/40 font-mono">ou 2x 306,35 € sans frais</span>
                </div>
                <Link
                  href="/paiement?offre=30j"
                  className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider text-center block transition-all"
                >
                  ↗ S&apos;inscrire au 30 Jours
                </Link>
              </div>
            </div>

            {/* OFFRE 3 */}
            <div className="p-8 rounded-[32px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-[#FF758C] shadow-[0_0_40px_rgba(255,117,140,0.15)] relative flex flex-col justify-between space-y-6">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-black font-mono text-[9px] font-extrabold uppercase tracking-widest shadow-md">
                LE PROGRAMME RECOMMANDÉ
              </span>

              <div className="space-y-4 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF758C]">
                  RECONSTRUCTION COMPLÈTE
                </span>
                <h3 className="font-heading font-bold text-2xl text-white">
                  Transformation 3 Mois
                </h3>
                <p className="text-xs text-white/70 leading-[1.6]">
                  Le protocole étendu pour désactiver les automatismes toxiques, sanctuariser l&apos;environnement et ancrer la souveraineté pour toujours.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-white/70 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF758C] font-bold">✓</span> 12 Séances d&apos;impact individuel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF758C] font-bold">✓</span> Suivi quotidien 7j/7 par messagerie
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF758C] font-bold">✓</span> Refonte de l&apos;écosystème physique
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div>
                  <div className="font-heading font-extrabold text-3xl text-white">
                    1 655,30 €
                  </div>
                  <span className="text-[11px] text-white/40 font-mono">ou 3x 551,77 € sans frais</span>
                </div>
                <Link
                  href="/paiement?offre=3m"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider text-center block hover:scale-105 transition-transform shadow-lg"
                >
                  ↗ Démarrer la Transformation
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3 : HAUTE DIRECTION • ALLIANCE VIP 12 MOIS */}
        <section className="p-8 sm:p-14 rounded-[36px] bg-white/[0.03] border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF758C] bg-[#FF758C]/10 border border-[#FF758C]/30 px-3 py-1 rounded-full">
                NIVEAU 03 • MENTORAT PRIVÉ & INTERPOSITION
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
                ↗ Alliance VIP 12 Mois — Le Mandat de Khalifa
              </h2>
              <p className="text-sm text-white/70 font-sans leading-[1.65]">
                Réservé aux entrepreneurs, dirigeants et esprits influents qui exigent une transformation absolue de leur existence. Un compagnonnage direct avec Mounir Byar pour faire de la Salât et de la foi l&apos;axe central de vos décisions stratégiques.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span> Séances individuelles illimitées à la demande
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span> Ligne directe VIP H24 avec Mounir Byar
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span> Restructuration complète de vos entreprises
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span> Garantie d&apos;ancrage et tawakkul absolu
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-3xl bg-white/[0.04] border border-white/10 text-center space-y-4">
              <div>
                <span className="text-xs text-white/30 line-through block font-mono">6 112,00 €</span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white block">
                  4 889,60 €
                </span>
                <span className="text-xs text-[#FF758C] font-mono font-bold">
                  ou 6x 814,93 € sans frais
                </span>
              </div>
              <Link
                href="/candidature"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider block hover:scale-105 transition-transform shadow-lg"
              >
                ↗ Postuler au Mentorat VIP
              </Link>
              <span className="text-[10px] text-white/40 font-mono block">
                Candidature sélective sur dossier
              </span>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
