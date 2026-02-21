import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SOPChecklistViewer } from "@/components/sop-checklist-viewer";
import { Edit, Clock, User } from "lucide-react";
import Link from "next/link";

async function getSOP(id: string) {
  const sop = await prisma.sOP.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          name: true,
          email: true,
          division: true,
        },
      },
    },
  });

  return sop;
}

export default async function SOPDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const sop = await getSOP(params.id);

  if (!sop) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE":
        return "default";
      case "DRAFT":
        return "secondary";
      case "ARCHIVED":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getDivisionColor = (division: string) => {
    switch (division) {
      case "ACCOUNTING":
        return "bg-blue-100 text-blue-800";
      case "BIZDEV":
        return "bg-green-100 text-green-800";
      case "BOTH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <DashboardHeader
        title={sop.title}
        description={`${sop.serviceType} • Version ${sop.version}`}
        action={
          <Link href={`/sops/${sop.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit SOP
            </Button>
          </Link>
        }
      />

      <div className="p-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Badge variant={getStatusColor(sop.status)}>{sop.status}</Badge>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${getDivisionColor(
              sop.division
            )}`}
          >
            {sop.division === "BIZDEV" ? "BizDev" : sop.division}
          </span>
          {sop.tags && sop.tags.length > 0 && (
            <>
              <span className="text-muted-foreground">•</span>
              <div className="flex flex-wrap gap-1">
                {sop.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <Card className="p-6 mb-6 bg-gray-50">
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Created By</p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">{sop.createdBy.name}</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Last Updated</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {new Date(sop.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Last Reviewed</p>
              <span className="font-medium">
                {sop.lastReviewedAt
                  ? new Date(sop.lastReviewedAt).toLocaleDateString()
                  : "Never"}
              </span>
            </div>
          </div>
        </Card>

        <SOPChecklistViewer 
          sopId={sop.id} 
          content={sop.content}
          initialChecklistState={(sop.checklistState as Record<string, boolean>) || {}}
        />
      </div>
    </div>
  );
}
