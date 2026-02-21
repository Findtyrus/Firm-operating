import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const includeStats = searchParams.get("includeStats") === "true";

  if (includeStats) {
    const partners = await prisma.partner.findMany({
      include: {
        _count: {
          select: {
            clients: true,
            assignedTasks: true,
          },
        },
        clients: {
          where: { status: "ACTIVE" },
          select: {
            mrr: true,
          },
        },
        assignedTasks: {
          where: { status: { not: "COMPLETE" } },
          include: {
            client: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { dueDate: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(partners);
  }

  const partners = await prisma.partner.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(partners);
}
