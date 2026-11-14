import { getSocialTokens } from "./db";

export async function publishToX(content: string) {
  // Mock pour l'instant
  console.log("Mock publish to X:", content);
  return { success: true };
}

export async function publishToLinkedIn(content: string, isPage: boolean = false) {
  try {
    const tokens = await getSocialTokens();
    if (!tokens.linkedin_access_token || !tokens.linkedin_urn) {
      console.warn("LinkedIn OAuth token is missing. Please connect account in Admin panel.");
      return { success: false, error: "Not authenticated with LinkedIn" };
    }

    const { linkedin_access_token, linkedin_urn } = tokens;
    
    // Si isPage est vrai, on utilise l'URN de la page entreprise (120403945)
    // Sinon, on utilise l'URN du profil personnel stocké
    const authorUrn = isPage ? "urn:li:organization:120403945" : linkedin_urn;

    // Utilisation de l'API LinkedIn UGC (User Generated Content) Post API
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${linkedin_access_token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify({
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: "NONE"
          }
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("LinkedIn API Error:", data);
      return { success: false, error: data.message || "Erreur de publication LinkedIn" };
    }

    console.log(`Published to LinkedIn (${isPage ? 'Page' : 'Perso'}) successfully:`, data);
    return { success: true, data };
  } catch (error: any) {
    console.error("publishToLinkedIn Error:", error);
    return { success: false, error: error.message };
  }
}

export async function publishToFacebook(content: string) {
  try {
    const tokens = await getSocialTokens();
    if (!tokens.facebook_access_token || !tokens.facebook_page_id) {
      console.warn("Facebook OAuth token or page ID is missing. Please connect account in Admin panel.");
      return { success: false, error: "Not authenticated with Facebook" };
    }

    const { facebook_access_token, facebook_page_id } = tokens;

    const response = await fetch(`https://graph.facebook.com/v19.0/${facebook_page_id}/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content,
        access_token: facebook_access_token
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Facebook API Error:", data);
      return { success: false, error: data.error?.message || "Erreur de publication Facebook" };
    }

    console.log(`Published to Facebook Page successfully:`, data);
    return { success: true, data };
  } catch (error: any) {
    console.error("publishToFacebook Error:", error);
    return { success: false, error: error.message };
  }
}

export function resolveInstagramImage(caption?: string, theme?: string, providedUrl?: string, pubTitle?: string, pubId?: string): string {
  if (providedUrl && typeof providedUrl === "string" && providedUrl.trim().startsWith("http") && !providedUrl.includes("/post_default.jpg")) {
    return providedUrl.trim();
  }

  // Génération 100% dynamique du visuel officiel adapté au sujet précis
  if (pubId) {
    return `https://www.briserlesfrontieres.fr/api/og/instagram?id=${encodeURIComponent(pubId)}`;
  }

  const titleToUse = pubTitle || caption?.slice(0, 75) || "La Souveraineté Intérieure";
  const themeToUse = theme || "Ingénierie de la Souveraineté";

  return `https://www.briserlesfrontieres.fr/api/og/instagram?title=${encodeURIComponent(titleToUse)}&theme=${encodeURIComponent(themeToUse)}`;
}

export async function publishToInstagram(caption: string, imageUrl?: string, mediaType: "IMAGE" | "REELS" = "IMAGE") {
  try {
    const tokens = await getSocialTokens();
    const accessToken = tokens.instagram_access_token || process.env.INSTAGRAM_ACCESS_TOKEN || "EAAUcJghfb14BS8nAJKjip1NHcoGAuhvUpr97dbSPSQJlgYbNw4NCY6Lax2YvCxgKRSu2PglJ6C7ixasF14iB4CBOqjpOVjZC8tykwqUgSDoDZCB3T62wSgnPmei6ZBSz3AA785rjnt5iz6QZCZAQxT7mw4w1uLfXX0OoisvTq6eaXziRTRZCysWfJ4ZAAzZBgPUoZAJLIFF6brSMqkSWZBTDcpLVNybvJeeA9mzmCMA5tvxVcGWUJQjwZDZD";
    const accountId = tokens.instagram_account_id || process.env.INSTAGRAM_ACCOUNT_ID || "17841430181270196";

    // Résolution 100% automatique d'une image JPEG conforme Meta Graph API (1080x1080) générée selon le sujet
    const finalImageUrl = imageUrl && imageUrl.trim().startsWith("http")
      ? imageUrl.trim()
      : resolveInstagramImage(caption);

    // 1. Créer le conteneur média
    const params = new URLSearchParams({
      access_token: accessToken,
      caption: caption,
      ...(mediaType === "REELS" ? { media_type: "REELS", video_url: finalImageUrl } : { image_url: finalImageUrl })
    });

    const createRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    const createData = await createRes.json();
    if (!createRes.ok || !createData.id) {
      console.error("Instagram Media Creation Error:", createData);
      return { success: false, error: createData.error?.message || "Erreur création conteneur Instagram" };
    }

    const creationId = createData.id;

    // 2. Publier le conteneur
    const publishParams = new URLSearchParams({
      creation_id: creationId,
      access_token: accessToken
    });

    const publishRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: publishParams.toString()
    });

    const publishData = await publishRes.json();
    if (!publishRes.ok || !publishData.id) {
      console.error("Instagram Publish Error:", publishData);
      return { success: false, error: publishData.error?.message || "Erreur publication Instagram" };
    }

    console.log("Published to Instagram successfully:", publishData);
    return { success: true, mediaId: publishData.id };
  } catch (error: any) {
    console.error("publishToInstagram Error:", error);
    return { success: false, error: error.message };
  }
}

export async function publishPublication(pubId: string, content: string, platforms: string[], imageUrl?: string) {
  const results: Record<string, any> = {};

  if (platforms.includes("X") || platforms.includes("planning_X")) {
    results.X = await publishToX(content);
  }

  // Compatibilité ascendante : "linkedin" ou "linkedin_perso" = profil personnel
  if (platforms.includes("linkedin") || platforms.includes("linkedin_perso") || platforms.includes("planning_linkedin_perso")) {
    results.linkedin_perso = await publishToLinkedIn(content, false);
  }

  // "linkedin_page" = page entreprise
  if (platforms.includes("linkedin_page") || platforms.includes("planning_linkedin_page")) {
    results.linkedin_page = await publishToLinkedIn(content, true);
  }

  if (platforms.includes("facebook") || platforms.includes("planning_facebook")) {
    results.facebook = await publishToFacebook(content);
  }

  if (platforms.includes("instagram") || platforms.includes("planning_instagram")) {
    results.instagram = await publishToInstagram(content, imageUrl);
  }

  return results;
}
