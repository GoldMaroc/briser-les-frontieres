import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/fondements", label: "Fondements" },
  { href: "/protocole", label: "Protocole C.O.M.E.S." },
  { href: "/offrir", label: "Offrir une prestation" },
  { href: "/a-propos", label: "L'Ingénieur" },
  { href: "/contact", label: "Contact privé" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 text-stone-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonne 1 - Marque */}
          <div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 group hover:border-gold-500/30 transition-all duration-300">
              <Image src="/logo_blf.png" alt="Logo Briser les Frontières" width={40} height={40} className="object-contain group-hover:scale-105 transition-transform duration-300" />
              <span className="text-xl font-bold font-serif tracking-wide bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent group-hover:from-gold-400 group-hover:to-gold-600 transition-all">
                Briser les Frontières
              </span>
            </div>
            <p className="mt-4 text-sm text-stone-600 leading-relaxed max-w-xs font-body">
              Ingénierie de la Souveraineté — Accompagnement exégétique et neuro-cognitif pour restaurer la clarté spirituelle, discipliner le Nafs et assumer le mandat de Khalifa.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-500 font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 font-body">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-300 ${link.href === '/offrir' ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950 font-medium'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Contact & Réseaux */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-500 font-semibold mb-6">
              Contact & Réseaux
            </h4>
            <div className="text-sm text-stone-600 space-y-1 font-body">
              <p>Grand Reims — France</p>
              <p>Région Parisienne & International</p>
            </div>
            
            <div className="flex gap-4 mt-6 mb-4">
              {/* LinkedIn Icon */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* X/Twitter Icon */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-black hover:text-white transition-colors duration-300 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {/* Facebook Icon */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-[#1877F2] hover:text-white transition-colors duration-300 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              {/* Instagram Icon */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-[#E4405F] hover:text-white transition-colors duration-300 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* TikTok Icon */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-black hover:text-white transition-colors duration-300 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>

            <Link
              href="/contact"
              className="inline-block mt-4 text-sm text-stone-950 font-semibold hover:underline tracking-wide transition-all duration-300"
            >
              Solliciter un contact privé →
            </Link>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 font-body">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Briser les Frontières. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-stone-400">
            <Link href="/conditions-generales" className="hover:text-gold transition-colors font-medium">
              Mentions Légales & CGV
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-gold transition-colors font-medium">
              Politique de Confidentialité
            </Link>
          </div>
          <p className="text-xs text-stone-400">
            Ingénierie de la Souveraineté — Mounir BYAR
          </p>
        </div>
      </div>
    </footer>
  );
}

