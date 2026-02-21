import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const category = searchParams.get("category");

  const where: any = {};

  if (clientId) {
    where.clientId = clientId;
  }

  if (category && category !== "ALL") {
    where.category = category;
  }

  const files = await prisma.file.findMany({
    where,
    include: {
      client: {
        select: {
          id: true,
          name: true,
        },
      },
      uploadedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(files);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const partner = await prisma.partner.findUnique({
    where: { clerkId: userId },
  });

  if (!partner) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  const body = await request.json();

  const file = await prisma.file.create({
    data: {
      clientId: body.clientId,
      uploadedById: partner.id,
      fileName: body.fileName,
      fileUrl: body.fileUrl,
      fileType: body.fileType,
      category: body.category || "OTHER",
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
      uploadedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(file);
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return NextResponse.json({ error: "File ID required" }, { status: 400 });
  }

  await prisma.file.delete({
    where: { id: fileId },
  });

  return NextResponse.json({ success: true });
}
