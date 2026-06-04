import { sql } from "@vercel/postgres";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  try {
    console.log("Altering subscribers table...");
    await sql`
      ALTER TABLE subscribers
      ADD COLUMN IF NOT EXISTS latitude FLOAT,
      ADD COLUMN IF NOT EXISTS longitude FLOAT,
      ADD COLUMN IF NOT EXISTS ville VARCHAR(255);
    `;
    console.log("Done.");
  } catch (e) {
    console.error(e);
  }
}

main();
