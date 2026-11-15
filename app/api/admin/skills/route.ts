import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";
import { initialSkills } from "@/lib/initialData";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let skills = initialSkills;
  try {
    const dbSkills = await db.skill.findMany({ orderBy: { order: "asc" } });
    if (dbSkills && dbSkills.length > 0) skills = dbSkills as any;
  } catch (e) {
    console.warn("DB skills fallback:", e);
  }

  return NextResponse.json({ skills });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.name || !data.category) {
      return NextResponse.json(
        { error: "Name and Category are required" },
        { status: 400 }
      );
    }

    const skill = await db.skill.create({
      data: {
        name: data.name.trim(),
        category: data.category.trim(),
        icon: data.icon || null,
        order: Number(data.order) || 0,
        featured: Boolean(data.featured),
      },
    });

    return NextResponse.json({ success: true, skill });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
