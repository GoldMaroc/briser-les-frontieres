import { getSocialTokens } from "./db";

export async function publishToX(content: string) {
  // Mock pour l'instant
  console.log("Mock publish to X:", content);
  return { success: true };
}

export async function publishToLinkedIn(content: string) {
  try {
    const tokens = await getSocialTokens();
    if (!tokens.linkedin_access_token || !tokens.linkedin_urn) {
      console.warn("LinkedIn OAuth token is missing. Please connect account in Admin panel.");
      return { success: false, error: "Not authenticated with LinkedIn" };
    }

    const { linkedin_access_token, linkedin_urn } = tokens;

    // Utilisation de l'API LinkedIn UGC (User Generated Content) Post API
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${linkedin_access_token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify({
        author: linkedin_urn,
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

    console.log("Published to LinkedIn successfully:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("publishToLinkedIn Error:", error);
    return { success: false, error: error.message };
  }
}

export async function publishPublication(pubId: string, content: string, platforms: string[]) {
  const results: Record<string, any> = {};

  if (platforms.includes("X")) {
    results.X = await publishToX(content);
  }

  if (platforms.includes("linkedin")) {
    results.linkedin = await publishToLinkedIn(content);
  }

  return results;
}
