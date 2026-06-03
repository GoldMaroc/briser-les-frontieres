import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admin_config (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL
      )
    `;
    return NextResponse.json({ success: true, message: "Table admin_config vérifiée/créée avec succès." });
  } catch (error: any) {
    console.error("Init DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
