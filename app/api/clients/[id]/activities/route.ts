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

  const activities = await prisma.clientActivity.findMany({
    where: { clientId: params.id },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(activities);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
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

  const activity = await prisma.clientActivity.create({
    data: {
      clientId: params.id,
      createdById: partner.id,
      type: body.type || "NOTE",
      content: body.content,
    },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(activity);
}
