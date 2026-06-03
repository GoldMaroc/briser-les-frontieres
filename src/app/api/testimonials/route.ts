import { NextResponse } from "next/server";
import { getAdminDbData } from "@/lib/db";

export async function GET() {
  try {
    const dbData = await getAdminDbData();
    const approvedTestimonials = (dbData.testimonials || [])
      .filter((t) => t.approved === true)
      .map((t) => ({
        id: t.id,
        name: t.nom,
        role: "", // Pas de profession (80% vide selon instructions)
        category: t.categorie,
        text: t.message,
        period: t.periode,
        location: t.localisation || "", // Support du champ ville/localisation !
      }));

    return NextResponse.json(
      { success: true, testimonials: approvedTestimonials },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages publics :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des avis." },
      { status: 500 }
    );
  }
}
