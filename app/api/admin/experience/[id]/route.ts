import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const updated = await db.experience.update({
      where: { id: params.id },
      data: {
        title: data.title,
        company: data.company,
        companyUrl: data.companyUrl,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        current: Boolean(data.current),
        responsibilities: typeof data.responsibilities === "string"
          ? data.responsibilities
          : JSON.stringify(data.responsibilities || []),
        technologies: data.technologies,
        order: Number(data.order) || 0,
      },
    });

    return NextResponse.json({ success: true, experience: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.experience.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
