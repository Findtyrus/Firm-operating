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

  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: {
      assignedTo: true,
      client: true,
      timeEntries: {
        include: {
          partner: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { date: "desc" },
      },
    },
  });

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(task);
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

  const updateData: any = {
    title: body.title,
    description: body.description,
    status: body.status,
    priority: body.priority,
    assignedToId: body.assignedToId,
    clientId: body.clientId,
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    isRecurring: body.isRecurring,
    recurringFrequency: body.recurringFrequency,
    sopReference: body.sopReference,
  };

  if (body.status === "COMPLETE" && !body.completedAt) {
    updateData.completedAt = new Date();
  }

  const task = await prisma.task.update({
    where: { id: params.id },
    data: updateData,
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },
      client: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.task.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
