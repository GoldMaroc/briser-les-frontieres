import Link from "next/link";
import Image from "next/image";

const footerNav = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/offres", label: "Les Offres" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Grille Tarifaire" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/rendez-vous", label: "Prendre RDV (Agenda)" },
  { href: "/contact", label: "Contact Privé" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Colonne 1 - Marque & Baseline KÖM Style */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-sm group hover:border-[#FF758C]/60 transition-all duration-300">
              <Image src="/logo_blf.png" alt="Logo Briser les Frontières" width={32} height={32} className="object-contain" />
              <span className="text-base font-extrabold font-heading tracking-wider uppercase text-white">
                Briser les Frontières
              </span>
            </div>
            
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">
              ↗ L&apos;Ingénierie de la{" "}
              <span className="bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] bg-clip-text text-transparent">
                Souveraineté
              </span>
            </p>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-sans">
              Cabinet BLF — Recherche exégétique et neurobiologie du Sujûd pour dompter le cortisol, briser la procrastination et assumer le mandat de Khalifa.
            </p>
          </div>

          {/* Colonne 2 - Navigation Dédiée KÖM Style */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 font-semibold mb-6 font-mono">
              Cabinet BLF
            </h4>
            <ul className="space-y-3 font-sans">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#FF758C] transition-colors duration-200 font-medium"
                  >
                    <span className="text-xs text-[#FF758C]">↗</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Actions & Réseaux */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 font-semibold font-mono">
              Nous Contacter & Réseaux
            </h4>
            <div className="text-sm text-white/60 space-y-1 font-sans">
              <p className="text-white font-medium">Paris 8ème • Reims Centre — France</p>
              <p className="text-xs font-mono text-white/40 pt-1">
                Consultations du Lun. au Sam. (9h–18h) • Ven. (9h–12h)
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF758C] via-[#FF7EB3] to-[#FEE140] text-black font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,117,140,0.3)] hover:scale-105 transition-transform"
              >
                <span>↗ FAIRE L&apos;AUDIT GRATUIT</span>
              </Link>
            </div>

            <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono text-white/50">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                ↗ INSTAGRAM
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                ↗ LINKEDIN
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                ↗ YOUTUBE
              </a>
            </div>
          </div>

        </div>

        {/* Ligne inférieure */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Briser les Frontières — Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgv" className="hover:text-white transition-colors">
              CGV
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
