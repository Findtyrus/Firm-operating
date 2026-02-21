"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, CheckSquare, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Partner {
  id: string;
  name: string;
  email: string;
  division: string;
  role: string;
  _count: {
    clients: number;
    assignedTasks: number;
  };
  clients: Array<{ mrr: number | null }>;
  assignedTasks: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    dueDate: string | null;
    client?: { name: string };
  }>;
}

export default function TeamPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    const response = await fetch("/api/partners?includeStats=true");
    const data = await response.json();
    setPartners(data);
    setLoading(false);
  };

  const getPartnerMRR = (partner: Partner) => {
    return partner.clients.reduce((sum, client) => sum + (client.mrr || 0), 0);
  };

  const getActiveTasks = (partner: Partner) => {
    return partner.assignedTasks.filter((t) => t.status !== "COMPLETE").length;
  };

  const getOverdueTasks = (partner: Partner) => {
    return partner.assignedTasks.filter((t) => {
      if (!t.dueDate || t.status === "COMPLETE") return false;
      return new Date(t.dueDate) < new Date();
    }).length;
  };

  const getCapacityScore = (partner: Partner) => {
    const activeTasks = getActiveTasks(partner);
    if (activeTasks === 0) return 0;
    if (activeTasks <= 5) return 30;
    if (activeTasks <= 10) return 60;
    if (activeTasks <= 15) return 85;
    return 100;
  };

  const getCapacityColor = (score: number) => {
    if (score < 50) return "text-green-600";
    if (score < 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div>
      <DashboardHeader
        title="Team Capacity"
        description="Partner workload and utilization overview"
      />

      <div className="p-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading team data...</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {partners.map((partner) => {
              const capacityScore = getCapacityScore(partner);
              const overdue = getOverdueTasks(partner);
              const activeTasks = getActiveTasks(partner);

              return (
                <Card key={partner.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {partner.division} • {partner.role}
                      </p>
                    </div>
                    <Badge
                      variant={
                        capacityScore < 50
                          ? "secondary"
                          : capacityScore < 75
                          ? "default"
                          : "destructive"
                      }
                    >
                      {capacityScore < 50
                        ? "Available"
                        : capacityScore < 75
                        ? "Moderate"
                        : "At Capacity"}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Workload</span>
                        <span className={`text-sm font-bold ${getCapacityColor(capacityScore)}`}>
                          {capacityScore}%
                        </span>
                      </div>
                      <Progress value={capacityScore} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Clients</span>
                        </div>
                        <p className="text-xl font-bold">{partner._count.clients}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${getPartnerMRR(partner).toLocaleString()} MRR
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                        <p className="text-xl font-bold">{activeTasks}</p>
                        <p className="text-xs text-muted-foreground mt-1">tasks</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Overdue</span>
                        </div>
                        <p className={`text-xl font-bold ${overdue > 0 ? "text-red-600" : ""}`}>
                          {overdue}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">tasks</p>
                      </div>
                    </div>

                    {overdue > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-xs font-semibold text-red-600 mb-2">
                          Overdue Tasks:
                        </p>
                        <div className="space-y-2">
                          {partner.assignedTasks
                            .filter((t) => {
                              if (!t.dueDate || t.status === "COMPLETE") return false;
                              return new Date(t.dueDate) < new Date();
                            })
                            .slice(0, 3)
                            .map((task) => (
                              <Link key={task.id} href={`/tasks/${task.id}`}>
                                <div className="text-xs p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                  <p className="font-medium text-red-900">{task.title}</p>
                                  {task.client && (
                                    <p className="text-red-700 mt-1">{task.client.name}</p>
                                  )}
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
