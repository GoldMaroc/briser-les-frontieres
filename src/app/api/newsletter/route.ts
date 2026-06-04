import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Adresse email invalide ou manquante." },
        { status: 400 }
      );
    }

    // Capture location using Vercel headers
    let lat = null;
    let lon = null;
    let ville = "Inconnue";

    try {
      const vLat = request.headers.get("x-vercel-ip-latitude");
      const vLon = request.headers.get("x-vercel-ip-longitude");
      const vCity = request.headers.get("x-vercel-ip-city");

      if (vLat && vLon) {
        lat = parseFloat(vLat);
        lon = parseFloat(vLon);
        if (vCity) ville = decodeURIComponent(vCity);
      } else {
        // Fallback to IP geolocation if Vercel headers missing
        const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "";
        if (ip && ip !== "::1" && ip !== "127.0.0.1") {
          const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
          if (geoRes.ok) {
            const geo = await geoRes.json();
            if (geo.status === "success") {
              lat = geo.lat;
              lon = geo.lon;
              ville = geo.city;
            }
          }
        }
      }
    } catch (e) {
      console.warn("Geoloc capture failed", e);
    }

    // Enregistrement persistant en base de données avec géolocalisation
    const result = await addSubscriber(email, lat, lon, ville);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      );
    }

    // Déclencher l'e-mail de Bienvenue en arrière-plan
    sendWelcomeEmail(email).catch(console.error);

    return NextResponse.json(
      { message: "Inscription validée au protocole de recherche." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { message: "Erreur interne lors du traitement." },
      { status: 500 }
    );
  }
}
