import { NextResponse } from "next/server";
import { getAdminDbData } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "contacts";
    
    const dbData = await getAdminDbData();
    let data: any[] = [];
    
    if (type === "contacts") {
      data = dbData.contacts || [];
    } else if (type === "candidatures") {
      data = dbData.candidatures || [];
    } else if (type === "audits") {
      data = dbData.audits || [];
    }

    if (!data || data.length === 0) {
      return new NextResponse("No data available", { status: 404 });
    }

    // Convert JSON to CSV
    const headersList = Object.keys(data[0]).join(",");
    const rows = data.map(obj => {
      return Object.values(obj).map(val => {
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(",");
    });

    const csvContent = [headersList, ...rows].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${type}-export-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error: any) {
    console.error("CSV Export error:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
