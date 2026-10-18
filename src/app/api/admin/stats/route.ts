import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const [
      total,
      newCount,
      contactedCount,
      followUpCount,
      discussionCount,
      convertedCount,
      closedCount,
      spamCount,
      recentEnquiries,
      serviceGroups,
    ] = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "New" } }),
      prisma.enquiry.count({ where: { status: "Contacted" } }),
      prisma.enquiry.count({ where: { status: "Follow-up Required" } }),
      prisma.enquiry.count({ where: { status: "In Discussion" } }),
      prisma.enquiry.count({ where: { status: "Converted" } }),
      prisma.enquiry.count({ where: { status: "Closed" } }),
      prisma.enquiry.count({ where: { status: "Spam" } }),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.enquiry.groupBy({
        by: ["requiredService"],
        _count: {
          id: true,
        },
      }),
    ]);

    const serviceBreakdown = serviceGroups.map((g) => ({
      service: g.requiredService,
      count: g._count.id,
    }));

    return NextResponse.json({
      total,
      newCount,
      contactedCount,
      followUpCount,
      discussionCount,
      convertedCount,
      closedCount,
      spamCount,
      recentEnquiries,
      serviceBreakdown,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to load dashboard statistics" }, { status: 500 });
  }
}
