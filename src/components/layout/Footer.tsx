import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/components/ui/ArrowIcon";

const footerNav = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/recherche", label: "Science & Khalifa" },
  { href: "/offres", label: "Accompagnement" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Grille Tarifaire" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/rendez-vous", label: "Prendre RDV" },
  { href: "/contact", label: "Contact Privé" },
];

export default function Footer() {
  return (
    <footer className="bg-[#141210] border-t border-[#2D2A26] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Colonne 1 - Marque & Baseline Officielle */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-sm group hover:border-[#B88E3E]/60 transition-all duration-300">
              <Image src="/logo_blf.png" alt="Logo Briser les Frontières" width={32} height={32} className="object-contain" />
              <span className="text-base font-extrabold font-heading tracking-wider uppercase text-white">
                Briser les Frontières
              </span>
            </div>
            
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">
              L&apos;Ingénierie de la{" "}
              <span className="text-[#B88E3E]">
                Souveraineté
              </span>
            </p>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-sans">
              Cabinet BLF — Recherche exégétique et neurobiologie du Sujûd pour dompter le cortisol, briser la procrastination et assumer le mandat de Khalifa.
            </p>
          </div>

          {/* Colonne 2 - Navigation Dédiée */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#B88E3E] font-semibold mb-6 font-mono">
              Cabinet BLF
            </h4>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider uppercase">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group py-1"
                  >
                    <ArrowIcon className="w-3 h-3 text-[#B88E3E] transition-transform duration-200 group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Prise de Contact & Audit */}
          <div className="space-y-5">
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#B88E3E] font-semibold mb-6 font-mono">
              Prise de Contact
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Cabinet basé à Reims & Paris. Entretiens sur rendez-vous par téléphone/visio (48,95 €) ou en présentiel à domicile (96,45 €).
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B88E3E] hover:bg-[#8C6214] dark:bg-[#D4A853] dark:hover:bg-[#E8C468] text-[#0A1128] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md text-center"
              >
                <span>Passer l&apos;audit gratuit</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-heading font-semibold uppercase tracking-wider transition-all text-center"
              >
                <span>Agenda & Réservation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de page légal */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} Briser les Frontières — Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/conditions-generales" className="hover:text-white transition-colors">
              Conditions Générales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
