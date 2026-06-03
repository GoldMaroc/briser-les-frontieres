import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TimeThemeProvider } from "@/components/ui/TimeThemeProvider";
import SalatTakeover from "@/components/ui/SalatTakeover";
import CookieBanner from "@/components/layout/CookieBanner";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Briser les Frontières — Ingénierie de la Souveraineté",
    template: "%s | Briser les Frontières",
  },
  description:
    "Protocole C.O.M.E.S. — Ingénierie comportementale pour restaurer la clarté intellectuelle, maîtriser le Nafs et assumer le mandat de Khalifa.",
  keywords: [
    "ingénierie comportementale",
    "souveraineté cognitive",
    "protocole COMES",
    "Khalifa",
    "Nafs",
    "Salat",
    "Mounir BYAR",
  ],
  authors: [{ name: "Mounir BYAR" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Briser les Frontières",
    title: "Briser les Frontières — Ingénierie de la Souveraineté",
    description:
      "Protocole C.O.M.E.S. — Restaurez votre souveraineté cognitive et assumez votre mandat de Khalifa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-cream grain-overlay relative">
        {/* Arrière-plan céleste sacré (Temps, Vie, Mort, Miséricorde) */}
        <div 
          className="fixed inset-0 bg-[url('/celestial_bg.png')] bg-cover bg-center pointer-events-none z-0 transition-opacity duration-1000" 
          style={{ opacity: 'var(--celestial-bg-opacity, 0.05)' }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Briser les Frontières",
              "image": "https://www.briserlesfrontieres.fr/Couverture-Secrets.png",
              "@id": "https://www.briserlesfrontieres.fr/#organization",
              "url": "https://www.briserlesfrontieres.fr",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Grand Reims",
                "postalCode": "51100",
                "addressCountry": "FR"
              },
              "founder": {
                "@type": "Person",
                "name": "Mounir BYAR",
                "jobTitle": "Ingénieur en Souveraineté Cognitive"
              },
              "description": "Protocole C.O.M.E.S. — Ingénierie comportementale pour restaurer la clarté intellectuelle, maîtriser le Nafs et assumer le mandat de Khalifa."
            })
          }}
        />
        <TimeThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SalatTakeover />
          <CookieBanner />
        </TimeThemeProvider>
      </body>
    </html>
  );
}
