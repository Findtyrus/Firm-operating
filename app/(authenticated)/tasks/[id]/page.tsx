import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TaskActions } from "@/components/task-actions";
import { Edit, Calendar, User, Clock, AlertCircle, BookOpen } from "lucide-react";
import Link from "next/link";

async function getTask(id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      assignedTo: true,
      client: true,
      timeEntries: {
        include: {
          partner: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { date: "desc" },
      },
    },
  });

  return task;
}

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const task = await getTask(params.id);

  if (!task) {
    notFound();
  }

  const totalHours = task.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "COMPLETE";

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "destructive";
      case "HIGH":
        return "default";
      case "MEDIUM":
        return "secondary";
      case "LOW":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "BLOCKED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <DashboardHeader
        title={task.title}
        description={task.client ? `Client: ${task.client.name}` : "Internal task"}
        action={
          <div className="flex gap-2">
            <TaskActions taskId={task.id} />
            <Link href={`/tasks/${task.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            </Link>
          </div>
        }
      />

      <div className="p-8 max-w-4xl space-y-6">
        {isOverdue && (
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">This task is overdue</p>
                <p className="text-sm text-red-700">
                  Due: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium px-3 py-1 rounded ${getStatusColor(
              task.status
            )}`}
          >
            {task.status.replace("_", " ")}
          </span>
          <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
          {task.isRecurring && (
            <Badge variant="outline">Recurring: {task.recurringFrequency}</Badge>
          )}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">Details</h2>

          {task.description && (
            <div className="mb-6">
              <p className="text-sm text-gray-700">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Assigned To</p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{task.assignedTo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {task.assignedTo.division === "ACCOUNTING"
                      ? "Accounting & Finance"
                      : "Business Development"}
                  </p>
                </div>
              </div>
            </div>

            {task.dueDate && (
              <div>
                <p className="text-muted-foreground mb-1">Due Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            <div>
              <p className="text-muted-foreground mb-1">Time Logged</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">{totalHours.toFixed(1)} hours</span>
              </div>
            </div>

            {task.sopReference && (
              <div>
                <p className="text-muted-foreground mb-1">Related SOP</p>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">{task.sopReference}</span>
                </div>
              </div>
            )}

            {task.completedAt && (
              <div>
                <p className="text-muted-foreground mb-1">Completed At</p>
                <span className="font-medium">
                  {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </Card>

        {task.timeEntries.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-display font-bold mb-4">Time Entries</h2>
            <div className="space-y-3">
              {task.timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.partner.name}</p>
                    {entry.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-semibold">
                      {entry.hours}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
