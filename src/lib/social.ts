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

export async function publishPublication(pubId: string, content: string, platforms: string[]) {
  const results: Record<string, any> = {};

  if (platforms.includes("X")) {
    results.X = await publishToX(content);
  }

  // Compatibilité ascendante : "linkedin" ou "linkedin_perso" = profil personnel
  if (platforms.includes("linkedin") || platforms.includes("linkedin_perso")) {
    results.linkedin_perso = await publishToLinkedIn(content, false);
  }

  // "linkedin_page" = page entreprise
  if (platforms.includes("linkedin_page")) {
    results.linkedin_page = await publishToLinkedIn(content, true);
  }

  if (platforms.includes("facebook")) {
    results.facebook = await publishToFacebook(content);
  }

  return results;
}
