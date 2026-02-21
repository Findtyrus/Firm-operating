"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Calendar, User, Plus } from "lucide-react";
import Link from "next/link";

interface TimeEntry {
  id: string;
  date: string;
  hours: number;
  description: string;
  partner: { name: string };
  client?: { name: string };
  task?: { title: string };
}

interface Client {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  clientId: string | null;
}

export default function TimeTrackingPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState("");
  const [clientId, setClientId] = useState("none");
  const [taskId, setTaskId] = useState("none");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (clientId && clientId !== "none") {
      fetchTasksForClient(clientId);
    } else {
      setTasks([]);
      setTaskId("none");
    }
  }, [clientId]);

  const fetchData = async () => {
    const [entriesRes, clientsRes] = await Promise.all([
      fetch("/api/time-entries"),
      fetch("/api/clients"),
    ]);
    const entriesData = await entriesRes.json();
    const clientsData = await clientsRes.json();
    setEntries(entriesData);
    setClients(clientsData);
    setLoading(false);
  };

  const fetchTasksForClient = async (clientId: string) => {
    const response = await fetch(`/api/tasks?clientId=${clientId}`);
    const data = await response.json();
    setTasks(data);
  };

  const handleSave = async () => {
    if (!hours || parseFloat(hours) <= 0) {
      alert("Please enter valid hours");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/time-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          hours: parseFloat(hours),
          clientId: clientId === "none" ? null : clientId,
          taskId: taskId === "none" ? null : taskId,
          description,
        }),
      });

      if (response.ok) {
        setHours("");
        setClientId("none");
        setTaskId("none");
        setDescription("");
        fetchData();
      }
    } catch (error) {
      console.error("Error saving time entry:", error);
      alert("Failed to save time entry");
    } finally {
      setSaving(false);
    }
  };

  const totalHoursThisWeek = entries
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      return entryDate >= weekStart;
    })
    .reduce((sum, entry) => sum + entry.hours, 0);

  const totalHoursToday = entries
    .filter((entry) => entry.date === new Date().toISOString().split("T")[0])
    .reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div>
      <DashboardHeader
        title="Time Tracking"
        description="Log billable hours and track utilization"
      />

      <div className="p-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{totalHoursToday.toFixed(1)}h</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{totalHoursThisWeek.toFixed(1)}h</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold">{entries.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Log Time</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="hours">Hours *</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  placeholder="e.g. 2.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="client">Client (Optional)</Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Client</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {clientId !== "none" && tasks.length > 0 && (
                <div>
                  <Label htmlFor="task">Task (Optional)</Label>
                  <Select value={taskId} onValueChange={setTaskId}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Task</SelectItem>
                      {tasks.map((task) => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What did you work on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={saving || !hours}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Log Time"}
              </Button>
            </div>
          </Card>

          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Recent Time Entries</h3>
              {loading ? (
                <p className="text-muted-foreground text-center py-8">Loading...</p>
              ) : entries.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No time entries yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Log your first entry using the form
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-xl border border-gray-200/60 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-primary">
                              {entry.hours}h
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {entry.description && (
                            <p className="text-sm text-gray-700 mb-2">
                              {entry.description}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{entry.partner.name}</span>
                            {entry.client && (
                              <>
                                <span>•</span>
                                <span className="font-medium text-gray-700">
                                  {entry.client.name}
                                </span>
                              </>
                            )}
                            {entry.task && (
                              <>
                                <span>•</span>
                                <span>{entry.task.title}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
