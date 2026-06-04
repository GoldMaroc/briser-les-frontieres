import { sql } from "@vercel/postgres";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  try {
    console.log("Creating ai_drafts table...");
    await sql`
      CREATE TABLE IF NOT EXISTS ai_drafts (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        recipient_email VARCHAR(255),
        subject VARCHAR(255) NOT NULL,
        content_html TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Done.");
  } catch (e) {
    console.error(e);
  }
}

main();
