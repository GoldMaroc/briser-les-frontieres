import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/admin?error=linkedin_not_configured", request.url));
  }

  // L'URL de redirection doit correspondre exactement à celle configurée sur le portail développeur
  const redirectUri = process.env.NODE_ENV === "production"
    ? "https://www.briserlesfrontieres.fr/api/admin/social/linkedin/callback"
    : "http://localhost:3000/api/admin/social/linkedin/callback";

  // Scope nécessaires pour publier au nom de l'utilisateur
  // "w_member_social" permet de créer des posts
  // "openid profile" permet d'identifier l'utilisateur (récupérer son URN)
  const scope = "w_member_social profile openid";
  
  const state = Math.random().toString(36).substring(7);

  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;

  return NextResponse.redirect(linkedinAuthUrl);
}
