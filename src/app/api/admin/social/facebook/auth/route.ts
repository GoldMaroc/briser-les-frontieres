import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const clientId = process.env.FACEBOOK_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({ error: "FACEBOOK_CLIENT_ID manquant" }, { status: 500 });
  }

  // L'URL de notre callback
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = request.headers.get("host") || "localhost:3000";
  const redirectUri = encodeURIComponent(`${protocol}://${host}/api/admin/social/facebook/callback`);

  // Permissions nécessaires pour publier sur une page Entreprise Facebook
  // "pages_show_list" permet de lister les pages gérées
  // "pages_manage_posts" permet de publier au nom de la page
  // "pages_read_engagement" permet de lire les interactions
  const scope = "pages_show_list,pages_manage_posts,pages_read_engagement";

  const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return NextResponse.redirect(facebookAuthUrl);
}
