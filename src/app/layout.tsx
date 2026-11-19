import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TimeThemeProvider } from "@/components/ui/TimeThemeProvider";
import CookieBanner from "@/components/layout/CookieBanner";

const dmSans = localFont({
  src: [
    {
      path: "../fonts/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = localFont({
  src: [
    {
      path: "../fonts/DMMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Briser les Frontières — L'Ingénierie de la Souveraineté | Mounir BYAR",
    template: "%s | Briser les Frontières",
  },
  description:
    "Cabinet BLF par Mounir Byar. Ingénierie comportementale et neurobiologie du Sujûd pour dompter le cortisol, vaincre la procrastination et instaurer la Salât comme arme de souveraineté.",
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
      data-theme="light"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text-primary)] relative font-sans selection:bg-[#087B53]/20 transition-colors duration-280">
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
        <TimeThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </TimeThemeProvider>
      </body>
    </html>
  );
}
