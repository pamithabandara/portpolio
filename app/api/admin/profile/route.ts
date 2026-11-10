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
  });

  return NextResponse.json({ profile });
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const updated = await db.profile.upsert({
      where: { id: "main_profile" },
      update: {
        fullName: data.fullName,
        title: data.title,
        headline: data.headline,
        bio: data.bio,
        summary: data.summary,
        email: data.email,
        phone: data.phone,
        location: data.location,
        availability: data.availability,
        availableForWork: Boolean(data.availableForWork),
        cvUrl: data.cvUrl,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        avatarUrl: data.avatarUrl,
      },
      create: {
        id: "main_profile",
        fullName: data.fullName || "Chamoth Bandara",
        title: data.title || "Junior Data Analyst",
        headline: data.headline || "",
        bio: data.bio || "",
        summary: data.summary || "",
        email: data.email || "pamithabandara123@gmail.com",
        phone: data.phone || "+94 71 929 9354",
        location: data.location || "Thulhiriya / Colombo, Sri Lanka",
        availability: data.availability || "Available for Data Analyst & BI roles",
        availableForWork: Boolean(data.availableForWork),
        cvUrl: data.cvUrl || "/uploads/Chamoth_Bandara_CV.pdf",
        githubUrl: data.githubUrl || "https://github.com",
        linkedinUrl: data.linkedinUrl || "https://linkedin.com",
        avatarUrl: data.avatarUrl || "/uploads/chamoth_profile.jpg",
      },
    });

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
