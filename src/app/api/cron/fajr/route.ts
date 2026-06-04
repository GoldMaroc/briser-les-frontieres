import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { sendFajrEmail } from "@/lib/mail";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

export async function GET(request: Request) {
  try {
    // Basic protection to avoid abuse, but open enough for cron-job.org if no secret is provided
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Allow specific User-Agents like cron-job.org if needed, or just rely on Vercel Cron
      const ua = request.headers.get("user-agent") || "";
      if (!ua.includes("cron-job.org") && process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Fetch all subscribers with valid geolocation
    const { rows } = await sql`SELECT email, latitude, longitude, ville FROM subscribers WHERE latitude IS NOT NULL AND longitude IS NOT NULL`;
    
    if (rows.length === 0) {
      return NextResponse.json({ message: "No subscribers with geolocation found." }, { status: 200 });
    }

    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
    let sentCount = 0;

    for (const sub of rows) {
      if (!sub.latitude || !sub.longitude) continue;

      const coordinates = new Coordinates(sub.latitude, sub.longitude);
      // UOIF method (12 degrees)
      const params = CalculationMethod.UmmAlQura(); // UmmAlQura is often used, but let's configure 12 deg
      params.fajrAngle = 12;
      params.ishaAngle = 12;

      const prayerTimes = new PrayerTimes(coordinates, now, params);
      const fajrTime = prayerTimes.fajr; // Date object in UTC

      if (fajrTime) {
        const fajrHour = fajrTime.getUTCHours();
        const fajrMinute = fajrTime.getUTCMinutes();

        // Si c'est la minute exacte du Fajr
        if (currentHour === fajrHour && currentMinute === fajrMinute) {
          await sendFajrEmail(sub.email, sub.ville || "votre position");
          sentCount++;
        }
      }
    }

    return NextResponse.json({ success: true, processed: rows.length, sent: sentCount }, { status: 200 });

  } catch (error) {
    console.error("Fajr Cron Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
