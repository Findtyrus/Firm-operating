import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  CheckSquare,
  Clock,
} from "lucide-react";

async function getDashboardData() {
  const [
    totalClients,
    activeClients,
    totalMRR,
    accountingMRR,
    bizdevMRR,
    overdueTasks,
    tasksThisWeek,
    recentActivity,
  ] = await Promise.all([
    prisma.client.count(),
    prisma.client.count({ where: { status: "ACTIVE" } }),
    prisma.client.aggregate({
      where: { status: "ACTIVE", mrr: { not: null } },
      _sum: { mrr: true },
    }),
    prisma.client.aggregate({
      where: {
        status: "ACTIVE",
        division: { in: ["ACCOUNTING", "BOTH"] },
        mrr: { not: null },
      },
      _sum: { mrr: true },
    }),
    prisma.client.aggregate({
      where: {
        status: "ACTIVE",
        division: { in: ["BIZDEV", "BOTH"] },
        mrr: { not: null },
      },
      _sum: { mrr: true },
    }),
    prisma.task.count({
      where: {
        status: { not: "COMPLETE" },
        dueDate: { lt: new Date() },
      },
    }),
    prisma.task.findMany({
      where: {
        status: { not: "COMPLETE" },
        dueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        assignedTo: true,
        client: true,
      },
      orderBy: { dueDate: "asc" },
      take: 10,
    }),
    prisma.task.findMany({
      where: { updatedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      include: {
        assignedTo: true,
        client: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
  ]);

  return {
    totalClients,
    activeClients,
    totalMRR: totalMRR._sum.mrr || 0,
    accountingMRR: accountingMRR._sum.mrr || 0,
    bizdevMRR: bizdevMRR._sum.mrr || 0,
    overdueTasks,
    tasksThisWeek,
    recentActivity,
  };
}

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const data = await getDashboardData();

  return (
    <div>
      <DashboardHeader
        title="Firm Dashboard"
        description="Overview of Magnolia Advisory Group operations"
      />

      <div className="p-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Clients"
            value={data.activeClients}
            icon={Users}
            description={`${data.totalClients} total clients`}
          />
          <StatCard
            title="Total MRR"
            value={`$${data.totalMRR.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Accounting MRR"
            value={`$${data.accountingMRR.toLocaleString()}`}
            icon={TrendingUp}
          />
          <StatCard
            title="BizDev MRR"
            value={`$${data.bizdevMRR.toLocaleString()}`}
            icon={TrendingUp}
          />
        </div>

        {data.overdueTasks > 0 && (
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">
                  {data.overdueTasks} Overdue Task{data.overdueTasks !== 1 ? "s" : ""}
                </p>
                <p className="text-sm text-red-700">
                  These tasks require immediate attention
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-display font-bold mb-4">
              Tasks Due This Week
            </h2>
            <div className="space-y-3">
              {data.tasksThisWeek.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tasks due this week
                </p>
              ) : (
                data.tasksThisWeek.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between gap-4 p-3 rounded-lg border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {task.assignedTo.name}
                        </span>
                        {task.client && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {task.client.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
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
                      {task.dueDate && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-display font-bold mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {data.recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              ) : (
                data.recentActivity.map((task) => (
                  <div key={task.id} className="flex items-start gap-3">
                    {task.status === "COMPLETE" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : task.status === "IN_PROGRESS" ? (
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    ) : (
                      <CheckSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.assignedTo.name}
                        {task.client && ` • ${task.client.name}`}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">
            Standing Rules
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm">
                <strong>Never start work</strong> until: Agreement signed + Invoice
                paid + QBO access confirmed
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm">
                <strong>Never accept a client</strong> outside ICP: service business,
                &lt;200 tx/mo, no inventory
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm">
                <strong>Never do out-of-scope work</strong> without signed change
                order and updated invoice
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm">
                <strong>Always deliver reports</strong> by the 5th–10th of the month
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm">
                <strong>Always require full payment upfront</strong> — no exceptions
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm">
                <strong>Always match price to value</strong> — use phased ramp if
                needed
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
