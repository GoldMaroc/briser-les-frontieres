import { NextResponse } from "next/server";
import { generateWeeklyNewsletterDraft } from "@/lib/ai";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      const ua = request.headers.get("user-agent") || "";
      if (!ua.includes("cron-job.org") && process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Instead of sending the email to everyone directly, we ask the AI to generate a draft.
    // The admin will review and approve it from the dashboard.
    const themes = [
      "Fatigue Décisionnelle et Entropie Numérique",
      "Le Khuchu dans un monde de distraction",
      "Restaurer son mandat de Khalifa",
      "La discipline du Nafs face à l'immédiateté",
      "L'Ingénierie Spatiale : Purifier son environnement de travail",
      "As-Salat : Le premier système de gestion du temps"
    ];
    // Pick a random theme for this week
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const result = await generateWeeklyNewsletterDraft(randomTheme);

    if (result.success) {
      // In a real scenario, we could send an SMS/Push/Email to the admin to say "Draft ready"
      console.log(`Weekly Draft generated successfully. ID: ${result.draftId}`);
      return NextResponse.json({ success: true, message: "Draft generated and waiting for approval" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to generate AI draft" }, { status: 500 });
    }

  } catch (error) {
    console.error("Weekly Cron Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

