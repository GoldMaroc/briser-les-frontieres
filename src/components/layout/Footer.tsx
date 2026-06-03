import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/fondements", label: "Fondements" },
  { href: "/protocole", label: "Protocole C.O.M.E.S." },
  { href: "/offrir", label: "Offrir une prestation 🎁" },
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
                    className="text-sm text-stone-600 hover:text-stone-950 font-medium transition-colors duration-300"
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

