import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");

  let whereClause: any = {};
  if (filter === "unread") whereClause = { read: false };
  else if (filter === "read") whereClause = { read: true };

  let messages: any[] = [];
  try {
    messages = await db.contactMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.warn("DB messages fallback:", e);
  }

  return NextResponse.json({ messages });
}
