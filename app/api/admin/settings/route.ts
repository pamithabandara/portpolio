import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await db.siteSetting.findUnique({
    where: { id: "site_settings" },
  });

  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const updated = await db.siteSetting.upsert({
      where: { id: "site_settings" },
      update: {
        siteTitle: data.siteTitle,
        metaDescription: data.metaDescription,
        heroHeadline: data.heroHeadline,
        heroSubheadline: data.heroSubheadline,
        showReferences: Boolean(data.showReferences),
        showLeadership: Boolean(data.showLeadership),
        showContactInfo: Boolean(data.showContactInfo),
      },
      create: {
        id: "site_settings",
        siteTitle: data.siteTitle || "Chamoth Bandara | Junior Data Analyst",
        metaDescription: data.metaDescription || "",
        heroHeadline: data.heroHeadline || "",
        heroSubheadline: data.heroSubheadline || "",
        showReferences: Boolean(data.showReferences),
        showLeadership: Boolean(data.showLeadership),
        showContactInfo: Boolean(data.showContactInfo),
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
