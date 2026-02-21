"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  assignedTo: {
    id: string;
    name: string;
  };
  client: {
    id: string;
    name: string;
  } | null;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, newStatus: string) => void;
  onTaskClick: (taskId: string) => void;
}

const COLUMNS = [
  { id: "TODO", label: "To Do", color: "bg-gray-100" },
  { id: "IN_PROGRESS", label: "In Progress", color: "bg-blue-100" },
  { id: "BLOCKED", label: "Blocked", color: "bg-red-100" },
  { id: "COMPLETE", label: "Complete", color: "bg-green-100" },
];

export function KanbanBoard({ tasks, onTaskUpdate, onTaskClick }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: string) => {
    if (draggedTask) {
      onTaskUpdate(draggedTask, status);
      setDraggedTask(null);
    }
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

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return (
          <div key={column.id} className="flex flex-col">
            <div className={`${column.color} rounded-t-lg px-4 py-3 border border-b-0`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{column.label}</h3>
                <span className="text-xs font-mono bg-white px-2 py-0.5 rounded">
                  {columnTasks.length}
                </span>
              </div>
            </div>

            <div
              className="flex-1 bg-gray-50 rounded-b-lg border border-t-0 p-2 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              <div className="space-y-2">
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onClick={() => onTaskClick(task.id)}
                    className={`p-4 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded-xl ${
                      isOverdue(task.dueDate) && task.status !== "COMPLETE"
                        ? "border-red-300 bg-red-50 shadow-red-100"
                        : "border-gray-200/60"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm flex-1">{task.title}</h4>
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>

                      {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {task.client && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span className="truncate">{task.client.name}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground truncate">
                          {task.assignedTo.name.split(" ")[0]}
                        </span>
                        {task.dueDate && (
                          <div
                            className={`flex items-center gap-1 ${
                              isOverdue(task.dueDate) && task.status !== "COMPLETE"
                                ? "text-red-600 font-semibold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {isOverdue(task.dueDate) && task.status !== "COMPLETE" && (
                              <AlertCircle className="h-3 w-3" />
                            )}
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
