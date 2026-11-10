import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    projectsCount,
    skillsCount,
    experienceCount,
    educationCount,
    certificationsCount,
    unreadMessagesCount,
    totalMessagesCount,
    recentMessages,
  ] = await Promise.all([
    db.project.count(),
    db.skill.count(),
    db.experience.count(),
    db.education.count(),
    db.certification.count(),
    db.contactMessage.count({ where: { read: false } }),
    db.contactMessage.count(),
    db.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({
    projectsCount,
    skillsCount,
    experienceCount,
    educationCount,
    certificationsCount,
    unreadMessagesCount,
    totalMessagesCount,
    recentMessages,
  });
}
