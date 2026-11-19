import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      typeRdv,
      motif,
      date,
      timeSlot,
      nom,
      prenom,
      telephone,
      email,
      message,
    } = data;

    if (!nom || !telephone || !email || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, message: "Veuillez renseigner tous les champs obligatoires (*)." },
        { status: 400 }
      );
    }

    const rdvData = {
      id: "RDV-" + Date.now().toString(36).toUpperCase(),
      dateCreation: new Date().toISOString(),
      typeRdv: typeRdv || "telephone", // "telephone" ou "presentiel"
      motif: motif || "Audit Initial",
      dateRdv: date,
      timeSlot,
      client: {
        nom,
        prenom: prenom || "",
        telephone,
        email,
        message: message || "",
      },
      statut: "confirme",
    };

    // Sauvegarde locale de sécurité
    try {
      const dataDir = path.join(process.cwd(), "protected_books");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const logFile = path.join(dataDir, "rendez-vous.json");
      let allRdvs = [];
      if (fs.existsSync(logFile)) {
        try {
          allRdvs = JSON.parse(fs.readFileSync(logFile, "utf-8"));
        } catch {}
      }
      allRdvs.push(rdvData);
      fs.writeFileSync(logFile, JSON.stringify(allRdvs, null, 2), "utf-8");
    } catch (saveErr) {
      console.error("Erreur lors de la sauvegarde locale du rendez-vous:", saveErr);
    }

    return NextResponse.json({
      success: true,
      message: "Rendez-vous confirmé avec succès.",
      rdv: rdvData,
    });
  } catch (error) {
    console.error("Erreur API rendez-vous:", error);
    return NextResponse.json(
      { success: false, message: "Une erreur interne est survenue." },
      { status: 500 }
    );
  }
}
