import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/offres", label: "Accompagnement" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Grille Tarifaire" },
  { href: "/rendez-vous", label: "Prendre RDV (Agenda)" },
  { href: "/#temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact Privé" },
];

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E0D2] text-[#141210] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Colonne 1 - Marque & Slogan Officiel */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#E8E0D2] shadow-sm group hover:border-[#B88E3E] transition-all duration-300">
              <Image src="/logo_blf.png" alt="Logo Briser les Frontières" width={32} height={32} className="object-contain" />
              <span className="text-base font-extrabold font-heading tracking-wider uppercase text-[#141210]">
                Briser les Frontières
              </span>
            </div>
            <p className="text-xs tracking-[0.18em] uppercase font-mono text-[#8C6214] font-semibold">
              L&apos;Ingénierie de la Souveraineté
            </p>
            <p className="text-sm text-[#5C534A] leading-relaxed max-w-sm font-sans">
              Cabinet BLF — Ingénierie comportementale et recherche exégétique pour restaurer la clarté spirituelle, dompter le cortisol et assumer le mandat de Khalifa.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#7A6F64] font-semibold mb-6 font-mono">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 text-[#5C534A] hover:text-[#B88E3E] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Cabinet & Prise de Rendez-vous */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#7A6F64] font-semibold mb-6 font-mono">
              Cabinet BLF
            </h4>
            <div className="text-sm text-[#5C534A] space-y-1.5 font-sans">
              <p className="text-[#141210] font-medium">Paris 8ème • Reims Centre — France</p>
              <p>Recherche exégétique & sciences du comportement</p>
              <p className="text-xs font-mono text-[#8C6214] pt-2">
                Consultations du Lundi au Samedi (9h–18h) • Vendredi (9h–12h)
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#087B53] text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#066343] transition-all shadow-sm"
              >
                <span>Prendre RDV 📅</span>
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E8E0D2] text-[#141210] text-xs font-heading font-semibold uppercase tracking-wider hover:border-[#B88E3E] transition-all shadow-sm"
              >
                <span>Audit gratuit ↗</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Ligne inférieure */}
        <div className="mt-16 pt-8 border-t border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7A6F64]">
          <p>© {new Date().getFullYear()} Briser les Frontières — Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-[#141210] transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-[#141210] transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgv" className="hover:text-[#141210] transition-colors">
              CGV
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
