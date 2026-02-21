import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const partnerId = searchParams.get("partnerId");
  const clientId = searchParams.get("clientId");

  const where: any = {};

  if (partnerId && partnerId !== "ALL") {
    where.partnerId = partnerId;
  }

  if (clientId && clientId !== "ALL") {
    where.clientId = clientId;
  }

  const entries = await prisma.timeEntry.findMany({
    where,
    include: {
      partner: {
        select: {
          id: true,
          name: true,
        },
      },
      client: {
        select: {
          id: true,
          name: true,
        },
      },
      task: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: { date: "desc" },
    take: 50,
  });

  return NextResponse.json(entries);
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

  const entry = await prisma.timeEntry.create({
    data: {
      partnerId: partner.id,
      clientId: body.clientId || null,
      taskId: body.taskId || null,
      date: new Date(body.date),
      hours: parseFloat(body.hours),
      description: body.description || null,
    },
    include: {
      partner: {
        select: {
          name: true,
        },
      },
      client: {
        select: {
          name: true,
        },
      },
      task: {
        select: {
          title: true,
        },
      },
    },
  });

  return NextResponse.json(entry);
}
