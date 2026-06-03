import { NextResponse } from "next/server";
import { getPublications, addPublication, updatePublication, deletePublication } from "@/lib/db";

export async function GET() {
  try {
    const publications = await getPublications();
    // Trie par date de création ou scheduled_for décroissant
    publications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json({ success: true, publications });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await addPublication(data);
    if (result.success) {
      return NextResponse.json({ success: true, id: result.id });
    }
    return NextResponse.json({ error: "Erreur lors de l'ajout" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    const success = await updatePublication(id, updates);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    const success = await deletePublication(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
