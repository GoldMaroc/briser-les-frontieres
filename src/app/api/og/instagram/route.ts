import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { getAdminDbData } from "@/lib/db";

export const dynamic = "force-dynamic";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "\'": return "&apos;";
      case "\"": return "&quot;";
      default: return c;
    }
  });
}

function wrapText(text: string, maxCharsPerLine: number = 26): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 4);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pubId = searchParams.get("id");
    let title = searchParams.get("title") || "";
    let theme = searchParams.get("theme") || "";

    // Si un ID de publication est fourni, récupérer les détails précis en base
    if (pubId) {
      try {
        const db = await getAdminDbData();
        const pub = db.publications?.find((p: any) => p.id === pubId);
        if (pub) {
          title = pub.titre || pub.content?.slice(0, 75) || title;
          theme = pub.theme || theme;
        }
      } catch (e) {
        console.warn("Could not fetch publication for OG:", e);
      }
    }

    if (!title) {
      title = "La Souveraineté Intérieure";
    }
    if (!theme) {
      theme = "Ingénierie de la Souveraineté";
    }

    const lines = wrapText(title, 26);
    const startY = 510 - ((lines.length - 1) * 32);

    const tspans = lines.map((l, i) => 
      `<tspan x="540" dy="${i === 0 ? 0 : 64}">${escapeXml(l)}</tspan>`
    ).join("");

    const displayTheme = escapeXml(theme.toUpperCase().slice(0, 40));

    // SVG Haute Précision Prestige 1080x1080
    const svg = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#191824"/>
      <stop offset="60%" stop-color="#0c0b11"/>
      <stop offset="100%" stop-color="#050508"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E6C89C"/>
      <stop offset="50%" stop-color="#C5A880"/>
      <stop offset="100%" stop-color="#9E8055"/>
    </linearGradient>
  </defs>

  <!-- Fond Sombre Minuit -->
  <rect width="1080" height="1080" fill="url(#bgGrad)"/>

  <!-- Cadre Or Prestige -->
  <rect x="45" y="45" width="990" height="990" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.45"/>
  <rect x="58" y="58" width="964" height="964" fill="none" stroke="#C5A880" stroke-width="1" opacity="0.2"/>

  <!-- Ornements de Coins -->
  <rect x="40" y="40" width="10" height="10" fill="#C5A880"/>
  <rect x="1030" y="40" width="10" height="10" fill="#C5A880"/>
  <rect x="40" y="1030" width="10" height="10" fill="#C5A880"/>
  <rect x="1030" y="1030" width="10" height="10" fill="#C5A880"/>

  <!-- Ligne Décorative Haute -->
  <circle cx="540" cy="115" r="4" fill="#C5A880"/>
  <line x1="420" y1="115" x2="520" y2="115" stroke="#C5A880" stroke-width="1" opacity="0.4"/>
  <line x1="560" y1="115" x2="660" y2="115" stroke="#C5A880" stroke-width="1" opacity="0.4"/>

  <!-- Badge Thème Central -->
  <g transform="translate(540, 195)">
    <rect x="-240" y="-24" width="480" height="48" rx="24" fill="#14131b" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <text x="0" y="7" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#E6C89C" text-anchor="middle" letter-spacing="3">${displayTheme}</text>
  </g>

  <!-- Titre / Accroche Principale Spécifique au Sujet -->
  <text x="540" y="${startY}" font-family="'Cormorant Garamond', Georgia, serif" font-size="50" font-weight="700" fill="#FAF7F2" text-anchor="middle" letter-spacing="0.5">
    ${tspans}
  </text>

  <!-- Ligne Décorative Médiane -->
  <line x1="490" y1="740" x2="590" y2="740" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.6"/>
  <circle cx="540" cy="740" r="3" fill="#E6C89C"/>

  <!-- Sous-titre / Baseline -->
  <text x="540" y="790" font-family="'Inter', sans-serif" font-size="19" fill="#A8A396" text-anchor="middle" font-style="italic">
    « La clarté commence là où s&apos;arrête la dispersion. »
  </text>

  <!-- Signature Officielle Mounir Byar -->
  <line x1="440" y1="895" x2="640" y2="895" stroke="#C5A880" stroke-width="1" opacity="0.3"/>
  <text x="540" y="935" font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#E6C89C" text-anchor="middle" letter-spacing="4">MOUNIR BYAR</text>
  <text x="540" y="965" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#757165" text-anchor="middle" letter-spacing="3">BRISER LES FRONTIÈRES</text>
</svg>
    `;

    // Conversion ultra-rapide SVG -> JPEG via Sharp (conforme Meta Instagram)
    const jpegBuffer = await sharp(Buffer.from(svg))
      .jpeg({ quality: 95, chromaSubsampling: "4:4:4" })
      .toBuffer();

    return new NextResponse(new Uint8Array(jpegBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error: any) {
    console.error("Erreur génération image Instagram:", error);
    return new NextResponse("Erreur génération image", { status: 500 });
  }
}
