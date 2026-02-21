"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, BookOpen, Clock } from "lucide-react";

interface SOP {
  id: string;
  title: string;
  division: string;
  serviceType: string;
  status: string;
  version: string;
  tags: string[];
  totalSteps: number;
  completedSteps: number;
  lastReviewedAt: string | null;
  updatedAt: string;
  createdBy: {
    name: string;
    email: string;
  };
}

export default function SOPsPage() {
  const [sops, setSops] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchSOPs();
  }, [divisionFilter, statusFilter, search]);

  const fetchSOPs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (divisionFilter !== "ALL") params.set("division", divisionFilter);
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (search) params.set("search", search);

    const response = await fetch(`/api/sops?${params}`);
    const data = await response.json();
    setSops(data);
    setLoading(false);
  };

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
        title="Standard Operating Procedures"
        description="Firm knowledge base and process documentation"
        action={
          <Link href="/sops/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New SOP
            </Button>
          </Link>
        }
      />

      <div className="p-8 space-y-6">
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-1">
                SOP Best Practices
              </h3>
              <p className="text-sm text-gray-700">
                Keep SOPs updated, follow them consistently, and review quarterly.
                When you discover a better way to do something, update the SOP
                immediately so the whole team benefits. Version control ensures we
                never lose institutional knowledge.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search SOPs by title, service type, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={divisionFilter} onValueChange={setDivisionFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Divisions</SelectItem>
              <SelectItem value="ACCOUNTING">Accounting</SelectItem>
              <SelectItem value="BIZDEV">Business Development</SelectItem>
              <SelectItem value="BOTH">Both</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="LIVE">Live</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading SOPs...</p>
          </div>
        ) : sops.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No SOPs found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {search || divisionFilter !== "ALL" || statusFilter !== "ALL"
                ? "Try adjusting your filters or search term."
                : "Create your first SOP to start building your knowledge base."}
            </p>
            <Link href="/sops/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create SOP
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sops.map((sop) => (
              <Link key={sop.id} href={`/sops/${sop.id}`}>
                <Card className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full border-gray-200/60 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={getStatusColor(sop.status)}>
                      {sop.status}
                    </Badge>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getDivisionColor(
                        sop.division
                      )}`}
                    >
                      {sop.division === "BIZDEV" ? "BizDev" : sop.division}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                    {sop.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    {sop.serviceType}
                  </p>

                  {sop.totalSteps > 0 && (
                    <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground font-medium">Progress</span>
                        <span className="font-bold text-primary">
                          {Math.round((sop.completedSteps / sop.totalSteps) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(sop.completedSteps / sop.totalSteps) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {sop.completedSteps} of {sop.totalSteps} steps completed
                      </p>
                    </div>
                  )}

                  {sop.tags && sop.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {sop.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {sop.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{sop.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t">
                    <span>v{sop.version}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(sop.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
