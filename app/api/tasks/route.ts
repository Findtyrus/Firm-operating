import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const assignedTo = searchParams.get("assignedTo");
  const clientId = searchParams.get("clientId");

  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (priority && priority !== "ALL") {
    where.priority = priority;
  }

  if (assignedTo && assignedTo !== "ALL") {
    where.assignedToId = assignedTo;
  }

  if (clientId) {
    where.clientId = clientId;
  }

  const tasks = await prisma.task.findMany({
    where,
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          division: true,
        },
      },
      client: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
    },
    orderBy: [
      { status: "asc" },
      { priority: "desc" },
      { dueDate: "asc" },
    ],
  });

  return NextResponse.json(tasks);
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

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status || "TODO",
      priority: body.priority || "MEDIUM",
      assignedToId: body.assignedToId || partner.id,
      clientId: body.clientId,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      isRecurring: body.isRecurring || false,
      recurringFrequency: body.recurringFrequency,
      sopReference: body.sopReference,
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      client: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(task);
}
