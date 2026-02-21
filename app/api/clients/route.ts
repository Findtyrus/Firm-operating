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
  const division = searchParams.get("division");

  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (division && division !== "ALL") {
    where.division = division;
  }

  const clients = await prisma.client.findMany({
    where,
    include: {
      relationshipManager: {
        select: {
          id: true,
          name: true,
          division: true,
        },
      },
    },
    orderBy: [
      { status: "asc" },
      { name: "asc" },
    ],
  });

  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const client = await prisma.client.create({
    data: {
      name: body.name,
      contactName: body.contactName,
      email: body.email,
      phone: body.phone,
      city: body.city,
      division: body.division,
      status: body.status || "PROSPECT",
      servicePackage: body.servicePackage,
      mrr: body.mrr ? parseFloat(body.mrr) : null,
      contractStartDate: body.contractStartDate ? new Date(body.contractStartDate) : null,
      monthlyTransactionVolume: body.monthlyTransactionVolume ? parseInt(body.monthlyTransactionVolume) : null,
      bankAccountCount: body.bankAccountCount ? parseInt(body.bankAccountCount) : null,
      relationshipManagerId: body.relationshipManagerId,
      engagementLevel: body.engagementLevel || "WARM",
      notes: body.notes,
    },
    include: {
      relationshipManager: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(client);
}
