import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;

    const updated = await prisma.fAQ.update({
      where: { id },
      data: body,
    });

    try {
      revalidatePath("/");
    } catch {}

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update FAQ error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.fAQ.delete({
      where: { id },
    });

    try {
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete FAQ error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
