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

  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      client: {
        select: {
          id: true,
          name: true,
          contactName: true,
          email: true,
        },
      },
    },
    orderBy: [
      { status: "asc" },
      { issuedDate: "desc" },
    ],
  });

  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const invoice = await prisma.invoice.create({
    data: {
      clientId: body.clientId,
      amount: parseFloat(body.amount),
      status: body.status || "DRAFT",
      servicePackage: body.servicePackage,
      issuedDate: body.issuedDate ? new Date(body.issuedDate) : null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      paidDate: body.paidDate ? new Date(body.paidDate) : null,
      notes: body.notes,
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(invoice);
}
