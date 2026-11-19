import { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Grille Tarifaire & Investissements — Cabinet BLF | Mounir BYAR",
  description:
    "Transparence tarifaire absolue du Cabinet BLF. Des traités fondateurs dès 5,90 € aux protocoles de transformation comportementale de 30 jours à 12 mois.",
};

export default function PrixPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141210] pt-28 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#B88E3E]/20">
      
      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        
        {/* EN-TÊTE : CLARTÉ TARIFAIRE HAUTE JOAILLERIE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88E3E]/10 border border-[#B88E3E]/30 text-[#8C6214]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              TRANSPARENCE TARIFAIRE • CABINET BLF
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#141210] tracking-tight leading-[1.08]">
            Grille Tarifaire &{" "}
            <span className="text-[#B88E3E]">
              Investissements
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C534A] font-sans leading-[1.65]">
            De l&apos;accès autonome immédiat dès 5,90 € au compagnonnage d&apos;excellence sur 12 mois. Choisissez l&apos;accompagnement adapté à votre ambition, en toute clarté.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Faire l&apos;audit gratuit (3 min)</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#B88E3E]/50 bg-white hover:border-[#B88E3E] text-[#141210] text-xs font-heading font-semibold uppercase tracking-wider transition-all"
            >
              <span>Prendre RDV (45 min)</span>
            </Link>
          </div>
        </div>

        {/* SECTION 1 : LES LIVRES ET TRAITÉS (DÈS 5,90 €) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6214] font-bold">
                ÉCHELON I • FONDEMENTS
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#141210] mt-1">
                Traités Exégétiques & Neurobiologiques
              </h2>
            </div>
            <Link
              href="/livres"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B88E3E] hover:text-[#8C6214]"
            >
              <span>Voir les livres</span>
              <ArrowIcon className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Livre 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#B88E3E] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#087B53] uppercase tracking-wider font-semibold">
                  Manuel Fondateur
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-2 mb-2">
                  Les Secrets de la Salât
                </h3>
                <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                  Le traité d&apos;ingénierie neurocomportementale du Sujûd. Explication de chaque station, rupture du cortisol et libération de la dopamine saine.
                </p>
                <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                  9,90 € <span className="text-xs text-[#7A6F64] font-normal">(eBook immédiat)</span>
                </div>
              </div>
              <Link
                href="/livres"
                className="w-full py-3 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] hover:border-[#B88E3E] text-center text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all"
              >
                Accéder au Livre
              </Link>
            </div>

            {/* Livre 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#B88E3E] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#8C6214] uppercase tracking-wider font-semibold">
                  Protocole de Détresse
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-2 mb-2">
                  Recueil des Invocations Ciblées
                </h3>
                <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                  Formules prophétiques exactes phonétisées avec explications de leurs mécanismes physiologiques et spirituels pour surmonter l&apos;angoisse.
                </p>
                <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                  5,90 € <span className="text-xs text-[#7A6F64] font-normal">(Format de poche & digital)</span>
                </div>
              </div>
              <Link
                href="/livres"
                className="w-full py-3 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] hover:border-[#B88E3E] text-center text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all"
              >
                Accéder au Recueil
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 2 : PROTOCOLES D'ACCOMPAGNEMENT */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6214] font-bold">
                ÉCHELON II • TRANSFORMATION COMPORTEMENTALE
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#141210] mt-1">
                Protocoles Individuels Intensifs
              </h2>
            </div>
            <Link
              href="/offres"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B88E3E] hover:text-[#8C6214]"
            >
              <span>Comparer les protocoles</span>
              <ArrowIcon className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Diagnostic Unique */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F64]">Séance Unique</span>
                <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-1 mb-2">Bilan Décideur</h3>
                <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                  1h30 d&apos;analyse approfondie avec Mounir Byar. Diagnostic de vos boucles d&apos;angoisse et remise d&apos;un plan d&apos;urgence.
                </p>
                <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                  190,00 € <span className="text-xs text-[#7A6F64] font-normal">séance 1h30</span>
                </div>
              </div>
              <Link
                href="/rendez-vous"
                className="w-full py-3 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] hover:border-[#B88E3E] text-center text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all"
              >
                Réserver mon Bilan
              </Link>
            </div>

            {/* Protocole 30 Jours */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#087B53] shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-[#087B53] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Le Plus Choisi
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#087B53] font-bold">Rupture du Taswîf</span>
                <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-1 mb-2">Protocole 30 Jours</h3>
                <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                  4 séances hebdomadaires, messagerie privée 5j/7, mise en place des ancrages environnementaux pour ne plus jamais manquer une prière.
                </p>
                <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                  612,70 € <span className="text-xs text-[#7A6F64] font-normal">ou 3x 204,23 €</span>
                </div>
              </div>
              <Link
                href="/offres"
                className="w-full py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-center text-xs font-heading font-bold uppercase tracking-wider text-white transition-all shadow-sm"
              >
                Démarrer les 30 Jours
              </Link>
            </div>

            {/* Accompagnement 9 Mois */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col justify-between hover:border-[#B88E3E] transition-all">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6214] font-bold">Souveraineté Intégrale</span>
                <h3 className="font-heading font-extrabold text-xl text-[#141210] mt-1 mb-2">Mandat Khalifa 9 Mois</h3>
                <p className="text-xs text-[#5C534A] leading-relaxed mb-6">
                  Transformation holistique. Alignement de votre capital mental, gestion du temps, famille, leadership et gouvernance de vos pulsions.
                </p>
                <div className="text-2xl font-heading font-extrabold text-[#141210] mb-6">
                  Sur Devis <span className="text-xs text-[#7A6F64] font-normal">(Sélection stricte)</span>
                </div>
              </div>
              <Link
                href="/rendez-vous"
                className="w-full py-3 rounded-full bg-[#FAF8F5] border border-[#E8E0D2] hover:border-[#B88E3E] text-center text-xs font-heading font-bold uppercase tracking-wider text-[#141210] transition-all"
              >
                Candidater à l&apos;Immersion
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 3 : BANNIÈRE D'AIDE AU CHOIX */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E0D2] text-center space-y-4">
          <h3 className="font-heading font-extrabold text-2xl text-[#141210]">
            Vous hésitez sur le format adapté à votre situation ?
          </h3>
          <p className="text-sm text-[#5C534A] max-w-xl mx-auto leading-relaxed">
            Passez notre audit gratuit ou réservez un créneau d&apos;orientation de 45 minutes pour faire le point sans engagement avec Mounir Byar.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#087B53] hover:bg-[#065f40] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Passer l&apos;audit gratuit (3 min)</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#B88E3E]/50 bg-[#FAF8F5] hover:border-[#B88E3E] text-[#141210] text-xs font-heading font-semibold uppercase tracking-wider transition-all"
            >
              <span>Prendre RDV (45 min)</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
