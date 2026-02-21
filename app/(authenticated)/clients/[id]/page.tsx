import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { ClientActions } from "@/components/client-actions";
import { ClientDetailView } from "./client-detail-view";
import { Edit } from "lucide-react";
import Link from "next/link";

async function getClient(id: string) {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      relationshipManager: true,
      tasks: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      invoices: {
        orderBy: { issuedDate: "desc" },
      },
      files: {
        include: {
          uploadedBy: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return client;
}

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const client = await getClient(params.id);

  if (!client) {
    notFound();
  }

  return (
    <div>
      <DashboardHeader
        title={client.name}
        description={`${client.division} • ${client.status}`}
        action={
          <div className="flex gap-2">
            <ClientActions clientId={client.id} clientName={client.name} />
            <Link href={`/clients/${client.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Client
              </Button>
            </Link>
          </div>
        }
      />
      <ClientDetailView client={client} />
    </div>
  );
}
