import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sop = await prisma.sOP.findUnique({
    where: { id: params.id },
    include: {
      createdBy: {
        select: {
          name: true,
          email: true,
          division: true,
        },
      },
    },
  });

  if (!sop) {
    return NextResponse.json({ error: "SOP not found" }, { status: 404 });
  }

  return NextResponse.json(sop);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const sop = await prisma.sOP.update({
    where: { id: params.id },
    data: {
      title: body.title,
      division: body.division,
      serviceType: body.serviceType,
      status: body.status,
      content: body.content,
      checklist: body.checklist,
      tags: body.tags,
      lastReviewedAt: body.lastReviewedAt ? new Date(body.lastReviewedAt) : undefined,
    },
    include: {
      createdBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(sop);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.sOP.update({
    where: { id: params.id },
    data: { status: "ARCHIVED" },
  });

  return NextResponse.json({ success: true });
}
