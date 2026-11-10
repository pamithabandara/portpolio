import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const experiences = await db.experience.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json({ experiences });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.title || !data.company || !data.startDate) {
      return NextResponse.json(
        { error: "Title, company, and start date are required" },
        { status: 400 }
      );
    }

    const exp = await db.experience.create({
      data: {
        title: data.title.trim(),
        company: data.company.trim(),
        companyUrl: data.companyUrl || null,
        location: data.location || "Sri Lanka",
        startDate: data.startDate.trim(),
        endDate: data.endDate ? data.endDate.trim() : "Present",
        current: Boolean(data.current),
        responsibilities: typeof data.responsibilities === "string" 
          ? data.responsibilities 
          : JSON.stringify(data.responsibilities || []),
        technologies: data.technologies || "",
        order: Number(data.order) || 0,
      },
    });

    return NextResponse.json({ success: true, experience: exp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
