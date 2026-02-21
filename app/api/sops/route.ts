import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const division = searchParams.get("division");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: any = {};
  
  if (division && division !== "ALL") {
    where.division = division;
  }
  
  if (status && status !== "ALL") {
    where.status = status;
  }
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { serviceType: { contains: search, mode: "insensitive" } },
      { tags: { has: search } },
    ];
  }

  const sops = await prisma.sOP.findMany({
    where,
    include: {
      createdBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: [
      { status: "asc" },
      { updatedAt: "desc" },
    ],
  });

  return NextResponse.json(sops);
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

  const sop = await prisma.sOP.create({
    data: {
      title: body.title,
      division: body.division,
      serviceType: body.serviceType,
      status: body.status || "DRAFT",
      content: body.content,
      checklist: body.checklist,
      tags: body.tags || [],
      createdById: partner.id,
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
