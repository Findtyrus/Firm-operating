import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  CheckSquare,
  AlertCircle,
  Clock,
  Plus,
} from "lucide-react";

async function getPartnerData(clerkId: string) {
  const partner = await prisma.partner.findUnique({
    where: { clerkId },
    include: {
      clients: {
        where: { status: "ACTIVE" },
      },
      assignedTasks: {
        where: { status: { not: "COMPLETE" } },
        include: { client: true },
        orderBy: { dueDate: "asc" },
      },
    },
  });

  if (!partner) {
    return null;
  }

  const myMRR = partner.clients.reduce(
    (sum, client) => sum + (client.mrr || 0),
    0
  );

  const todaysTasks = partner.assignedTasks.filter((task) => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  });

  const overdueTasks = partner.assignedTasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  });

  return {
    partner,
    myMRR,
    todaysTasks,
    overdueTasks,
    activeTasks: partner.assignedTasks,
  };
}

export default async function MyDashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const data = await getPartnerData(userId);

  if (!data) {
    return (
      <div className="p-8">
        <p className="text-red-600">
          Partner profile not found. Please contact support.
        </p>
      </div>
    );
  }

  const { partner, myMRR, todaysTasks, overdueTasks, activeTasks } = data;

  return (
    <div>
      <DashboardHeader
        title={`Welcome, ${partner.name.split(" ")[0]}`}
        description={`${partner.division === "ACCOUNTING" ? "Accounting & Finance" : "Business Development"} Division`}
      />

      <div className="p-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="My Active Clients"
            value={partner.clients.length}
            icon={Users}
          />
          <StatCard
            title="My MRR Contribution"
            value={`$${myMRR.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Open Tasks"
            value={activeTasks.length}
            icon={CheckSquare}
          />
        </div>

        {overdueTasks.length > 0 && (
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">
                  {overdueTasks.length} Overdue Task{overdueTasks.length !== 1 ? "s" : ""}
                </p>
                <p className="text-sm text-red-700">
                  These tasks require immediate attention
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold">Today&apos;s Tasks</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
          <div className="space-y-3">
            {todaysTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No tasks due today
              </p>
            ) : (
              todaysTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{task.title}</p>
                    {task.client && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.client.name}
                      </p>
                    )}
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      task.priority === "URGENT"
                        ? "destructive"
                        : task.priority === "HIGH"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">All My Tasks</h2>
          <div className="space-y-3">
            {activeTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No active tasks
              </p>
            ) : (
              activeTasks.map((task) => {
                const isOverdue =
                  task.dueDate && new Date(task.dueDate) < new Date();
                return (
                  <div
                    key={task.id}
                    className={cn(
                      "flex items-start justify-between gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer",
                      isOverdue && "border-red-200 bg-red-50"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        {isOverdue && (
                          <span className="text-xs text-red-600 font-semibold">
                            OVERDUE
                          </span>
                        )}
                      </div>
                      {task.client && (
                        <p className="text-xs text-muted-foreground">
                          {task.client.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={
                          task.status === "IN_PROGRESS"
                            ? "default"
                            : task.status === "BLOCKED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {task.status.replace("_", " ")}
                      </Badge>
                      {task.dueDate && (
                        <span
                          className={cn(
                            "text-xs",
                            isOverdue ? "text-red-600" : "text-muted-foreground"
                          )}
                        >
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">My Clients</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {partner.clients.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 col-span-2 text-center">
                No active clients
              </p>
            ) : (
              partner.clients.map((client) => (
                <div
                  key={client.id}
                  className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{client.name}</h3>
                    <Badge variant="outline">{client.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {client.contactName}
                  </p>
                  {client.mrr && (
                    <p className="text-sm font-semibold text-primary">
                      ${client.mrr}/mo
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {client.servicePackage}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
