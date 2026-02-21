import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const [clients, tasks, sops, files] = await Promise.all([
    prisma.client.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { contactName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        contactName: true,
        status: true,
      },
      take: 10,
    }),

    prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        status: true,
        client: {
          select: {
            name: true,
          },
        },
      },
      take: 10,
    }),

    prisma.sOP.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { serviceType: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        division: true,
        status: true,
      },
      take: 10,
    }),

    prisma.file.findMany({
      where: {
        fileName: { contains: query, mode: "insensitive" },
      },
      select: {
        id: true,
        fileName: true,
        category: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 10,
    }),
  ]);

  const results = [
    ...clients.map((c) => ({
      type: "client" as const,
      id: c.id,
      title: c.name,
      subtitle: c.contactName,
      badge: c.status,
      url: `/clients/${c.id}`,
    })),
    ...tasks.map((t) => ({
      type: "task" as const,
      id: t.id,
      title: t.title,
      subtitle: t.client?.name,
      badge: t.status,
      url: `/tasks/${t.id}`,
    })),
    ...sops.map((s) => ({
      type: "sop" as const,
      id: s.id,
      title: s.title,
      subtitle: s.division,
      badge: s.status,
      url: `/sops/${s.id}`,
    })),
    ...files.map((f) => ({
      type: "file" as const,
      id: f.id,
      title: f.fileName,
      subtitle: f.client.name,
      badge: f.category,
      url: `/clients/${f.client.id}`,
    })),
  ];

  return NextResponse.json(results);
}
