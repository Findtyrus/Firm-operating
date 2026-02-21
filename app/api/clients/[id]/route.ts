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

  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      relationshipManager: true,
      tasks: true,
      invoices: true,
      files: true,
    },
  });

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
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

  const client = await prisma.client.update({
    where: { id: params.id },
    data: {
      name: body.name,
      contactName: body.contactName,
      email: body.email,
      phone: body.phone,
      city: body.city,
      division: body.division,
      status: body.status,
      servicePackage: body.servicePackage,
      mrr: body.mrr ? parseFloat(body.mrr) : null,
      relationshipManagerId: body.relationshipManagerId,
      engagementLevel: body.engagementLevel,
      notes: body.notes,
    },
    include: {
      relationshipManager: true,
    },
  });

  return NextResponse.json(client);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.client.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
