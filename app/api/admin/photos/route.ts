import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const photos = await db.profilePhoto.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url, altText, isPrimary } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    if (isPrimary) {
      // Unset previous primary
      await db.profilePhoto.updateMany({
        data: { isPrimary: false },
      });
      // Also update Profile avatarUrl
      await db.profile.update({
        where: { id: "main_profile" },
        data: { avatarUrl: url },
      });
    }

    const photo = await db.profilePhoto.create({
      data: {
        url,
        altText: altText || "Chamoth Bandara Profile Photo",
        isPrimary: Boolean(isPrimary),
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, isPrimary } = await req.json();

    if (isPrimary) {
      await db.profilePhoto.updateMany({
        data: { isPrimary: false },
      });

      const photo = await db.profilePhoto.update({
        where: { id },
        data: { isPrimary: true },
      });

      // Synchronize with main profile avatar
      await db.profile.update({
        where: { id: "main_profile" },
        data: { avatarUrl: photo.url },
      });

      return NextResponse.json({ success: true, photo });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.profilePhoto.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
