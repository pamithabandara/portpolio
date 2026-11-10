import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const education = await db.education.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json({ education });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.degree || !data.institution || !data.startYear) {
      return NextResponse.json(
        { error: "Degree, institution, and start year are required" },
        { status: 400 }
      );
    }

    const item = await db.education.create({
      data: {
        degree: data.degree.trim(),
        institution: data.institution.trim(),
        institutionUrl: data.institutionUrl || null,
        location: data.location || "Sri Lanka",
        startYear: data.startYear.trim(),
        endYear: data.endYear ? data.endYear.trim() : "Present",
        description: data.description || "",
        grade: data.grade || null,
        order: Number(data.order) || 0,
      },
    });

    return NextResponse.json({ success: true, education: item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
