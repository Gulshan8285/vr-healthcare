import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Failed to fetch admin services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        icon: body.icon || "HeartHandshake",
        features: body.features || "[]",
        active: body.active !== undefined ? body.active : true,
        displayOrder: body.displayOrder || 0,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
      },
    });

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch {}

    return NextResponse.json(service);
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
