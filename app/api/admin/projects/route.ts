import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.title || !data.shortDescription) {
      return NextResponse.json(
        { error: "Title and short description are required" },
        { status: 400 }
      );
    }

    const baseSlug = (data.slug || data.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await db.project.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const project = await db.project.create({
      data: {
        title: data.title.trim(),
        slug: uniqueSlug,
        shortDescription: data.shortDescription.trim(),
        fullDescription: data.fullDescription || "",
        category: data.category || "Power BI & Dashboards",
        technologies: data.technologies || "",
        problemStatement: data.problemStatement || null,
        objectives: data.objectives || null,
        contribution: data.contribution || null,
        developmentProcess: data.developmentProcess || null,
        keyFeatures: data.keyFeatures || null,
        outcomes: data.outcomes || null,
        thumbnailUrl: data.thumbnailUrl || null,
        images: typeof data.images === "string" ? data.images : JSON.stringify(data.images || []),
        githubUrl: data.githubUrl || null,
        liveDemoUrl: data.liveDemoUrl || null,
        featured: Boolean(data.featured),
        published: Boolean(data.published !== false),
        order: Number(data.order) || 0,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
