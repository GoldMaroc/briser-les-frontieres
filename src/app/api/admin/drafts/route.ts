import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { sendWeeklyAdviceEmail } from "@/lib/mail"; // Assuming we have a general broadcast function, we might need a generic send broadcast function

export async function GET(request: Request) {
  try {
    const { rows } = await sql`SELECT * FROM ai_drafts WHERE status = 'pending' ORDER BY created_at DESC`;
    return NextResponse.json({ drafts: rows }, { status: 200 });
  } catch (error) {
    console.error("Fetch Drafts Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { draftId, action, modifiedContent } = body; // action can be 'approve' or 'reject'

    if (!draftId || !action) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Fetch the draft to know what to do
    const { rows } = await sql`SELECT * FROM ai_drafts WHERE id = ${draftId} LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 });
    }

    const draft = rows[0];

    if (action === "reject") {
      await sql`UPDATE ai_drafts SET status = 'rejected' WHERE id = ${draftId}`;
      return NextResponse.json({ success: true, message: "Draft rejected" }, { status: 200 });
    }

    if (action === "approve") {
      const finalContent = modifiedContent || draft.content_html;
      
      // Update DB
      await sql`UPDATE ai_drafts SET status = 'approved', content_html = ${finalContent} WHERE id = ${draftId}`;

      // Execute Send action based on type
      if (draft.type === "newsletter") {
        // Here we should fetch all subscribers and send them the email. 
        // For simplicity, we assume there's a function or we do it directly.
        const { getTransporter, SMTP_FROM } = await import("@/lib/mail");
        const transporter = getTransporter();
        
        if (transporter) {
          const { rows: subs } = await sql`SELECT email FROM subscribers`;
          for (const sub of subs) {
            try {
              await transporter.sendMail({
                from: SMTP_FROM,
                to: sub.email,
                subject: draft.subject,
                html: finalContent,
              });
            } catch(e) { console.error(e) }
          }
        }
      } else if (draft.type === "reply") {
        const { getTransporter, SMTP_FROM } = await import("@/lib/mail");
        const transporter = getTransporter();
        if (transporter) {
          try {
            await transporter.sendMail({
              from: SMTP_FROM,
              to: draft.recipient_email,
              subject: draft.subject,
              html: finalContent,
            });
          } catch(e) { console.error(e) }
        }
      }

      return NextResponse.json({ success: true, message: "Draft approved and sent" }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Action Draft Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
