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

    await sql`
      CREATE TABLE IF NOT EXISTS purchases (
        id VARCHAR(255) PRIMARY KEY,
        session_id VARCHAR(255) UNIQUE NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        book_id VARCHAR(100) NOT NULL,
        amount_total INTEGER NOT NULL,
        payment_status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return NextResponse.json({ success: true, message: "Tables vérifiées/créées avec succès." });
  } catch (error: any) {
    console.error("Init DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
