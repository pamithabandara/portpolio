import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await db.profile.findUnique({
    where: { id: "main_profile" },
    select: { cvUrl: true },
  });

  return NextResponse.json({ cvUrl: profile?.cvUrl || "/uploads/Chamoth_Bandara_CV.pdf" });
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cvUrl } = await req.json();

    if (!cvUrl) {
      return NextResponse.json({ error: "CV URL is required" }, { status: 400 });
    }

    const updated = await db.profile.update({
      where: { id: "main_profile" },
      data: { cvUrl },
    });

    return NextResponse.json({ success: true, cvUrl: updated.cvUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
