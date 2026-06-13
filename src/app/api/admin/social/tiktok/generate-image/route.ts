import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Le prompt est requis." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "La clé API GEMINI_API_KEY est manquante sur le serveur." }, { status: 500 });
    }

    // Appel à l'API Google Gemini (Imagen 3)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: prompt,
            },
          ],
          parameters: {
            sampleCount: 1,
            aspectRatio: "9:16", // Format vertical pour TikTok
            outputOptions: {
              mimeType: "image/jpeg",
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur Gemini:", data);
      return NextResponse.json({ error: data.error?.message || "Erreur de génération Google" }, { status: response.status });
    }

    // Récupération de l'image en base64
    const base64Image = data.predictions?.[0]?.bytesBase64;

    if (!base64Image) {
      return NextResponse.json({ error: "Aucune image générée par l'IA." }, { status: 500 });
    }

    return NextResponse.json({ imageBase64: base64Image });

  } catch (error: any) {
    console.error("Erreur interne image:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
