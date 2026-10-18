import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const service = searchParams.get("service");

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") where.status = status;
  if (service && service !== "ALL") where.requiredService = service;

  try {
    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV Header
    const headers = [
      "Reference Number",
      "Customer Name",
      "Phone",
      "Email",
      "Required Service",
      "Status",
      "Submission Date",
      "Preferred Time",
      "Internal Notes",
    ];

    // Escape CSV cell
    const escapeCsv = (str: string | null | undefined) => {
      if (str === null || str === undefined) return '""';
      const escaped = String(str).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const rows = enquiries.map((e) => [
      escapeCsv(e.referenceNumber),
      escapeCsv(e.customerName),
      escapeCsv(e.phone),
      escapeCsv(e.email || ""),
      escapeCsv(e.requiredService),
      escapeCsv(e.status),
      escapeCsv(e.createdAt.toISOString()),
      escapeCsv(e.preferredTime || ""),
      escapeCsv(e.internalNotes || ""),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="VR_Healthcare_Enquiries_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
