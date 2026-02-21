import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const invoice = await prisma.invoice.update({
    where: { id: params.id },
    data: {
      amount: body.amount ? parseFloat(body.amount) : undefined,
      status: body.status,
      servicePackage: body.servicePackage,
      issuedDate: body.issuedDate ? new Date(body.issuedDate) : undefined,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      paidDate: body.paidDate ? new Date(body.paidDate) : undefined,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.invoice.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
