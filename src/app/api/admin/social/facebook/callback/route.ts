import { NextResponse } from "next/server";
import { setSocialTokens } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  // L'URL de notre callback
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = request.headers.get("host") || "localhost:3000";
  const redirectUri = `${protocol}://${host}/api/admin/social/facebook/callback`;

  if (error) {
    return NextResponse.json({ error, error_description }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Code d'autorisation manquant" }, { status: 400 });
  }

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Configuration Facebook (Client ID/Secret) manquante" }, { status: 500 });
  }

  try {
    // 1. Échanger le code contre un User Access Token
    const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${clientSecret}&code=${code}`;
    
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Erreur lors de l'échange du token FB :", tokenData);
      return NextResponse.json({ error: "Échec de l'obtention de l'access token", details: tokenData }, { status: 400 });
    }

    const userAccessToken = tokenData.access_token;

    // 2. Récupérer la liste des pages gérées par cet utilisateur pour obtenir un Page Access Token
    const pagesUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${userAccessToken}`;
    const pagesResponse = await fetch(pagesUrl);
    const pagesData = await pagesResponse.json();

    if (!pagesResponse.ok || !pagesData.data || pagesData.data.length === 0) {
      console.error("Erreur lors de la récupération des pages FB :", pagesData);
      return NextResponse.json({ error: "Aucune page Facebook trouvée ou erreur API", details: pagesData }, { status: 400 });
    }

    // On prend la première page retournée (Briser les Frontières)
    const page = pagesData.data[0];
    const pageAccessToken = page.access_token;
    const pageId = page.id;

    // 3. Sauvegarder dans la DB
    await setSocialTokens({
      facebook_access_token: pageAccessToken,
      facebook_page_id: pageId
    });

    // 4. Rediriger l'admin vers la console
    return NextResponse.redirect(`${protocol}://${host}/admin`);
  } catch (error: any) {
    console.error("Facebook Callback Error:", error);
    return NextResponse.json({ error: "Erreur interne", message: error.message }, { status: 500 });
  }
}
