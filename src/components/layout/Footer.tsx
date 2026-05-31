import Link from "next/link";

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
            <span className="font-heading text-2xl font-bold tracking-[0.15em] text-stone-950">
              BLF
            </span>
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

          {/* Colonne 3 - Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-500 font-semibold mb-6">
              Contact
            </h4>
            <div className="text-sm text-stone-600 space-y-1 font-body">
              <p>Grand Reims — France</p>
              <p>Région Parisienne & International</p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-6 text-sm text-stone-950 font-semibold hover:underline tracking-wide transition-all duration-300"
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
              Mentions Légales & Conditions Générales
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

