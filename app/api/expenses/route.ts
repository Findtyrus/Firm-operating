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
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const where: any = {};

  if (partnerId && partnerId !== "ALL") {
    where.partnerId = partnerId;
  }

  if (startDate) {
    where.date = { ...where.date, gte: new Date(startDate) };
  }

  if (endDate) {
    where.date = { ...where.date, lte: new Date(endDate) };
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: {
      partner: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(expenses);
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

  const expense = await prisma.expense.create({
    data: {
      partnerId: body.partnerId || partner.id,
      amount: parseFloat(body.amount),
      category: body.category,
      description: body.description,
      date: new Date(body.date),
      receipt: body.receipt,
    },
    include: {
      partner: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(expense);
}
