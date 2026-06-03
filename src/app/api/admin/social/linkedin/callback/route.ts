import { NextResponse } from "next/server";
import { setSocialTokens } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const error_description = url.searchParams.get("error_description");

  if (error) {
    return NextResponse.json({ error, description: error_description }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.NODE_ENV === "production"
    ? "https://www.briserlesfrontieres.fr/api/admin/social/linkedin/callback"
    : "http://localhost:3000/api/admin/social/linkedin/callback";

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing LinkedIn credentials" }, { status: 500 });
  }

  try {
    // 1. Échanger le code contre un Access Token
    const tokenParams = new URLSearchParams();
    tokenParams.append("grant_type", "authorization_code");
    tokenParams.append("code", code);
    tokenParams.append("redirect_uri", redirectUri);
    tokenParams.append("client_id", clientId);
    tokenParams.append("client_secret", clientSecret);

    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      throw new Error(tokenData.error_description || tokenData.error || "Failed to get access token");
    }

    const accessToken = tokenData.access_token;

    // 2. Récupérer l'URN de l'utilisateur (nécessaire pour publier en son nom)
    const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const profileData = await profileRes.json();
    if (!profileRes.ok) {
      throw new Error("Failed to fetch user profile");
    }

    // Le sub correspond à l'ID utilisateur (Person URN = urn:li:person:{sub})
    const personUrn = `urn:li:person:${profileData.sub}`;

    // 3. Sauvegarder dans la base de données
    await setSocialTokens({
      linkedin_access_token: accessToken,
      linkedin_urn: personUrn
    });

    // 4. Rediriger vers l'admin
    return NextResponse.redirect(new URL("/admin?linkedin=success", request.url));

  } catch (err: any) {
    console.error("LinkedIn OAuth Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
