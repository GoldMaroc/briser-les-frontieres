import { NextResponse } from "next/server";
import { publishPublication } from "@/lib/social";
import { updatePublication } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { id, content, platforms, imageUrl } = await request.json();
    
    if (!id || !content || !platforms) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Force publish right now
    const socialResult = await publishPublication(id, content, platforms, imageUrl);
    
    const successes: string[] = [];
    const errors: string[] = [];

    if (socialResult.instagram) {
      if (socialResult.instagram.success) successes.push("Instagram");
      else errors.push(`Instagram: ${socialResult.instagram.error}`);
    }
    if (socialResult.facebook) {
      if (socialResult.facebook.success) successes.push("Facebook");
      else errors.push(`Facebook: ${socialResult.facebook.error}`);
    }
    if (socialResult.linkedin_perso) {
      if (socialResult.linkedin_perso.success) successes.push("LinkedIn (Perso)");
      else errors.push(`LinkedIn: ${socialResult.linkedin_perso.error}`);
    }
    if (socialResult.linkedin_page) {
      if (socialResult.linkedin_page.success) successes.push("LinkedIn (Page)");
      else errors.push(`LinkedIn Page: ${socialResult.linkedin_page.error}`);
    }
    if (socialResult.X) {
      if (socialResult.X.success) successes.push("X");
    }

    if (successes.length > 0) {
      await updatePublication(id, { status: "published", published_at: new Date().toISOString() });
      return NextResponse.json(
        { 
          success: true, 
          message: `Publié avec succès sur ${successes.join(", ")} !`,
          results: socialResult,
          partialErrors: errors.length > 0 ? errors : undefined
        }, 
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: errors.join(" | ") || "Échec de publication sur les réseaux sélectionnés", results: socialResult }, 
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Force Publish Error:", error);
    return NextResponse.json({ error: "Erreur interne", message: error.message }, { status: 500 });
  }
}
