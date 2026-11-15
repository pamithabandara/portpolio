import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";
import { initialCertifications } from "@/lib/initialData";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let certifications = initialCertifications;
  try {
    const dbCerts = await db.certification.findMany({ orderBy: { order: "asc" } });
    if (dbCerts && dbCerts.length > 0) certifications = dbCerts as any;
  } catch (e) {
    console.warn("DB certifications fallback:", e);
  }

  return NextResponse.json({ certifications });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.title || !data.issuer) {
      return NextResponse.json(
        { error: "Title and issuer are required" },
        { status: 400 }
      );
    }

    const cert = await db.certification.create({
      data: {
        title: data.title.trim(),
        issuer: data.issuer.trim(),
        issueDate: data.issueDate ? data.issueDate.trim() : "2026",
        expiryDate: data.expiryDate || null,
        credentialUrl: data.credentialUrl || null,
        imageUrl: data.imageUrl || null,
        pdfUrl: data.pdfUrl || null,
        order: Number(data.order) || 0,
      },
    });

    return NextResponse.json({ success: true, certification: cert });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
