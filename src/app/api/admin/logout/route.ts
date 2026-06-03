import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteAdminSession } from "@/lib/db";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("blf_admin_session")?.value;

    if (sessionToken) {
      // Révoquer la session côté serveur en base de données JSON
      await deleteAdminSession(sessionToken);
    }

    const response = NextResponse.json(
      { success: true, message: "Déconnexion de la session administrative effectuée avec succès." },
      { status: 200 }
    );

    // Supprimer le cookie HTTP-Only côté client en réglant sa durée de vie à zéro
    response.cookies.set("blf_admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la déconnexion administrative :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la déconnexion." },
      { status: 500 }
    );
  }
}
