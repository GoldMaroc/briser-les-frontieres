import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TimeThemeProvider } from "@/components/ui/TimeThemeProvider";
import SalatTakeover from "@/components/ui/SalatTakeover";
import CookieBanner from "@/components/layout/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.briserlesfrontieres.fr'),
  title: {
    default: "Briser les Frontières | Le Chemin du Retour vers Allah",
    template: "%s | Briser les Frontières",
  },
  description:
    "Restaurez votre souveraineté intellectuelle pour maîtriser votre Nafs et accomplir votre mandat de Khalifa. Un accompagnement profond pour réussir votre Retour vers Allah.",
  keywords: [
    "retour vers allah",
    "tazkiya an-nafs",
    "purification de l'âme",
    "charge allostatique",
    "psychologie musulmane",
    "Mounir BYAR",
    "protocole comes",
    "guérison spirituelle",
    "fatigue décisionnelle islam"
  ],
  authors: [{ name: "Mounir BYAR" }],
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Briser les Frontières",
    url: 'https://www.briserlesfrontieres.fr',
    title: "Briser les Frontières | Le Chemin du Retour vers Allah",
    description: "Restaurez votre souveraineté intellectuelle pour maîtriser votre Nafs et accomplir votre mandat de Khalifa.",
    images: [
      {
        url: "/logo_blf.png",
        width: 800,
        height: 600,
        alt: "Briser les Frontières Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Briser les Frontières | Le Chemin du Retour vers Allah",
    description: "Restaurez votre souveraineté intellectuelle pour maîtriser votre Nafs et accomplir votre mandat de Khalifa.",
    images: ["/logo_blf.png"],
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-cream relative">
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
        
        {/* Vercel Analytics (Intégré) */}
        <Analytics />
        
        {/* Google Analytics 4 (Optimisé avec @next/third-parties pour ne pas bloquer le rendu) */}
        <GoogleAnalytics gaId="G-RK4MYTK71H" />
      </body>
    </html>
  );
}
