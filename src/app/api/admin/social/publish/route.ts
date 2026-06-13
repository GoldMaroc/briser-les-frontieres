import { NextResponse } from "next/server";
import { publishPublication } from "@/lib/social";
import { updatePublication } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { id, content, platforms } = await request.json();
    
    if (!id || !content || !platforms) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Force publish right now
    const socialResult = await publishPublication(id, content, platforms);
    
    // Check if it worked
    if (socialResult.linkedin?.success) {
      await updatePublication(id, { status: 'published', published_at: new Date().toISOString() });
      return NextResponse.json({ success: true, message: "Publié avec succès sur LinkedIn" }, { status: 200 });
    } else {
      return NextResponse.json({ error: socialResult.linkedin?.error || "Erreur de publication LinkedIn" }, { status: 500 });
    }

  } catch (error) {
    console.error("Force Publish Error:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
