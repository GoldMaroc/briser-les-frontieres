import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "BLF_SUPER_SECRET_KEY_2026");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BLF_ADMIN_2026";

export async function POST(request: Request) {
  let client;
  try {
    client = await db.connect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis." }, { status: 400 });
    }

    // 1. Récupérer l'utilisateur depuis Postgres
    const { rows } = await client.sql`SELECT * FROM utilisateurs WHERE email = ${email} LIMIT 1`;
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ message: "Aucun compte trouvé avec cet e-mail." }, { status: 404 });
    }

    // 2. Vérification du mot de passe
    let isAuthorized = false;
    let isImpersonation = false;

    // A. Est-ce le mot de passe maître de l'admin ?
    if (password === ADMIN_PASSWORD) {
      isAuthorized = true;
      isImpersonation = true;
    } 
    // B. Sinon, est-ce le vrai mot de passe du client ?
    else {
      isAuthorized = await bcrypt.compare(password, user.mot_de_passe_hash);
    }

    if (!isAuthorized) {
      return NextResponse.json({ message: "Mot de passe incorrect." }, { status: 401 });
    }

    // 3. Création du Token JWT
    const alg = "HS256";
    const jwt = await new SignJWT({ 
      userId: user.id_utilisateur, 
      email: user.email, 
      nom: user.nom,
      prenom: user.prenom,
      isImpersonated: isImpersonation 
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("7d") // Session de 7 jours
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      message: isImpersonation ? "Connexion Maître réussie." : "Connexion réussie.",
      redirect: "/espace-client"
    }, { status: 200 });

    // 4. Configuration du cookie sécurisé (HTTP-Only)
    response.cookies.set({
      name: "blf_client_session",
      value: jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Erreur d'authentification client:", error);
    return NextResponse.json({ message: "Erreur interne lors de la connexion." }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
