import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
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
    const { status, internalNotes, followUpDate } = body;

    const dataToUpdate: Record<string, unknown> = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (internalNotes !== undefined) dataToUpdate.internalNotes = internalNotes;
    if (followUpDate !== undefined) {
      dataToUpdate.followUpDate = followUpDate ? new Date(followUpDate) : null;
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error(`Failed to update enquiry ${id}:`, error);
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
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
    await prisma.enquiry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Failed to delete enquiry ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
  }
}
