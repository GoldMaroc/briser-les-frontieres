import { NextResponse } from "next/server";
import { getGeminiApiKey, setGeminiApiKey } from "@/lib/db";

export async function GET() {
  try {
    const dbKey = await getGeminiApiKey();
    const hasKey = !!(process.env.GEMINI_API_KEY || dbKey);
    return NextResponse.json({ hasKey }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { key } = await request.json();
    if (!key || typeof key !== "string" || key.trim().length === 0) {
      return NextResponse.json({ error: "Clé API invalide" }, { status: 400 });
    }

    await setGeminiApiKey(key.trim());
    return NextResponse.json({ success: true, message: "Clé Gemini API enregistrée avec succès dans la base de données !" }, { status: 200 });
  } catch (error: any) {
    console.error("Save Gemini Key Error:", error);
    return NextResponse.json({ error: error.message || "Erreur lors de l'enregistrement de la clé" }, { status: 500 });
  }
}
