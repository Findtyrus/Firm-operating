import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { checklistState } = body;

  // Count completed steps
  const completedSteps = Object.values(checklistState as Record<string, boolean>).filter(
    (checked) => checked === true
  ).length;
  const totalSteps = Object.keys(checklistState as Record<string, boolean>).length;

  const sop = await prisma.sOP.update({
    where: { id: params.id },
    data: {
      checklistState,
      completedSteps,
      totalSteps,
    },
  });

  return NextResponse.json(sop);
}
