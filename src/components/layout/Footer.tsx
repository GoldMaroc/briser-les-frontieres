import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/fondements", label: "La Méthode" },
  { href: "/offres", label: "Accompagnement" },
  { href: "/livres", label: "Les Livres" },
  { href: "/prix", label: "Grille Tarifaire" },
  { href: "/#temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact Privé" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0908] border-t border-white/10 text-white transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonne 1 - Marque */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/[0.04] px-4 py-2 rounded-full border border-white/10 shadow-sm group hover:border-[#DFB76C]/60 transition-all duration-300">
              <Image src="/logo_blf.png" alt="Logo Briser les Frontières" width={32} height={32} className="object-contain" />
              <span className="text-base font-extrabold font-heading tracking-wider uppercase text-white">
                Briser les Frontières
              </span>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase font-mono text-[#DFB76C] font-semibold">
              L&apos;Ingénierie de la Souveraineté
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm font-sans">
              Cabinet BLF — Ingénierie comportementale et recherche exégétique pour restaurer la clarté spirituelle, dompter le cortisol et assumer le mandat de Khalifa.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 font-semibold mb-6 font-mono">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 text-white/70 hover:text-[#DFB76C] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Cabinet & Réseaux */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 font-semibold mb-6 font-mono">
              Cabinet BLF
            </h4>
            <div className="text-sm text-white/60 space-y-1 font-sans">
              <p className="text-white font-medium">Paris • Reims — France</p>
              <p>Recherche exégétique & sciences du comportement</p>
            </div>
            
            <div className="flex gap-4 mt-6 mb-4">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all duration-300 shadow-sm" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>

            <Link href="/contact" className="inline-block text-xs font-semibold uppercase tracking-wider text-[#DFB76C] hover:underline transition-colors font-mono">
              Solliciter un contact privé →
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} Briser les Frontières. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
