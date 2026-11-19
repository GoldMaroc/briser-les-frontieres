import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TimeThemeProvider } from "@/components/ui/TimeThemeProvider";
import SalatTakeover from "@/components/ui/SalatTakeover";
import CookieBanner from "@/components/layout/CookieBanner";
import KomCursor from "@/components/ui/KomCursor";

const systemia = localFont({
  src: [
    {
      path: "../fonts/Systemia-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Systemia-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Systemia-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-systemia",
  display: "swap",
});

const azeretMono = localFont({
  src: [
    {
      path: "../fonts/AzeretMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono-systemia",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Briser les Frontières — L'Ingénierie de la Souveraineté | Mounir BYAR",
    template: "%s | Briser les Frontières",
  },
  description:
    "Cabinet BLF par Mounir Byar. Ingénierie comportementale et neurobiologie du Sujûd pour vaincre la procrastination (At-Taswîf), maîtriser le cortisol et instaurer la Salât comme arme de souveraineté.",
  keywords: [
    "prière islam",
    "salat",
    "sujud",
    "vaincre la procrastination",
    "at-taswif",
    "protocole COMES",
    "Mounir BYAR",
    "neurobiologie salat",
    "ingénierie comportementale",
    "secrets de la salat",
    "livre islam",
    "khalifa",
    "agenda rdv doctolib",
  ],
  authors: [{ name: "Mounir BYAR" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Briser les Frontières",
    title: "Briser les Frontières — L'Ingénierie de la Souveraineté",
    description:
      "Reprenez le contrôle de votre vie. La Salât comme arme de souveraineté — Traités exégétiques, protocoles neurocognitifs et prise de rendez-vous en ligne.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
      className={`${systemia.variable} ${azeretMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070707] text-white relative font-sans selection:bg-[#FF758C]/30 selection:text-white">
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
                "addressLocality": "Grand Reims & Paris",
                "postalCode": "51100",
                "addressCountry": "FR"
              },
              "founder": {
                "@type": "Person",
                "name": "Mounir BYAR",
                "jobTitle": "Fondateur & Stratège Comportemental"
              },
              "description": "Cabinet BLF — L'Ingénierie de la Souveraineté. Recherche exégétique et neurobiologie pour dompter le cortisol et instaurer une discipline inaltérable."
            })
          }}
        />
        {/* Curseur dynamique fluide inspiré de KÖM */}
        <KomCursor />
        
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
