import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";
import { initialProjects, initialSkills, initialExperiences, initialEducation, initialCertifications } from "@/lib/initialData";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let projectsCount = initialProjects.length;
  let skillsCount = initialSkills.length;
  let experienceCount = initialExperiences.length;
  let educationCount = initialEducation.length;
  let certificationsCount = initialCertifications.length;
  let unreadMessagesCount = 0;
  let totalMessagesCount = 0;
  let recentMessages: any[] = [];

  try {
    const [
      pCount, sCount, eCount, edCount, cCount,
      unMsgCount, totMsgCount, recMsgs,
    ] = await Promise.all([
      db.project.count(),
      db.skill.count(),
      db.experience.count(),
      db.education.count(),
      db.certification.count(),
      db.contactMessage.count({ where: { read: false } }),
      db.contactMessage.count(),
      db.contactMessage.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);
    projectsCount = pCount;
    skillsCount = sCount;
    experienceCount = eCount;
    educationCount = edCount;
    certificationsCount = cCount;
    unreadMessagesCount = unMsgCount;
    totalMessagesCount = totMsgCount;
    recentMessages = recMsgs;
  } catch (e) {
    console.warn("DB stats fallback:", e);
  }

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
