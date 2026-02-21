"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/components/kanban-board";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, List, LayoutGrid, Calendar, User, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  completedAt: string | null;
  assignedTo: {
    id: string;
    name: string;
    email: string;
    division: string;
  };
  client: {
    id: string;
    name: string;
    status: string;
  } | null;
}

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [assigneeFilter, setAssigneeFilter] = useState("ALL");

  useEffect(() => {
    fetchTasks();
  }, [priorityFilter, assigneeFilter]);

  const fetchTasks = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (priorityFilter !== "ALL") params.set("priority", priorityFilter);
    if (assigneeFilter !== "ALL") params.set("assignedTo", assigneeFilter);

    const response = await fetch(`/api/tasks?${params}`);
    const data = await response.json();
    setTasks(data);
    setLoading(false);
  };

  const handleTaskUpdate = async (taskId: string, newStatus: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...task,
          status: newStatus,
          completedAt: newStatus === "COMPLETE" ? new Date().toISOString() : task.completedAt,
        }),
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleTaskClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

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

  const isOverdue = (dueDate: string | null, status: string) => {
    if (!dueDate || status === "COMPLETE") return false;
    return new Date(dueDate) < new Date();
  };

  const partners = Array.from(
    new Map(
      tasks
        .filter((t) => t.assignedTo && t.assignedTo.id) // Filter out invalid entries
        .map((t) => [t.assignedTo.id, { id: t.assignedTo.id, name: t.assignedTo.name }])
    ).values()
  );

  return (
    <div>
      <DashboardHeader
        title="Tasks"
        description="Manage tasks and workflows"
        action={
          <Link href="/tasks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </Link>
        }
      />

      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
            <TabsList>
              <TabsTrigger value="kanban">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priorities</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Partners</SelectItem>
                {partners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    {partner.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : (
          <>
            {view === "kanban" ? (
              <KanbanBoard
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskClick={handleTaskClick}
              />
            ) : (
              <Card className="p-6">
                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No tasks found</p>
                      <Link href="/tasks/new">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Task
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    tasks.map((task) => {
                      const overdue = isOverdue(task.dueDate, task.status);
                      return (
                        <div
                          key={task.id}
                          onClick={() => handleTaskClick(task.id)}
                          className={`flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer ${
                            overdue ? "border-red-300 bg-red-50" : ""
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-sm">{task.title}</h4>
                              {overdue && (
                                <span className="text-xs font-bold text-red-600">
                                  OVERDUE
                                </span>
                              )}
                            </div>

                            {task.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {task.description}
                              </p>
                            )}

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{task.assignedTo.name}</span>
                              </div>

                              {task.client && (
                                <span>{task.client.name}</span>
                              )}

                              {task.dueDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status.replace("_", " ")}
                            </span>
                            <Badge variant={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
