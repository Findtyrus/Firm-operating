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
import { Plus, Search, Users, DollarSign, MapPin } from "lucide-react";

interface Client {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string | null;
  city: string | null;
  division: string;
  status: string;
  servicePackage: string | null;
  mrr: number | null;
  engagementLevel: string;
  relationshipManager: {
    id: string;
    name: string;
    division: string;
  };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [divisionFilter, setDivisionFilter] = useState("ALL");

  useEffect(() => {
    fetchClients();
  }, [statusFilter, divisionFilter]);

  const fetchClients = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (divisionFilter !== "ALL") params.set("division", divisionFilter);

    const response = await fetch(`/api/clients?${params}`);
    const data = await response.json();
    setClients(data);
    setLoading(false);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.contactName.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "PROSPECT":
        return "secondary";
      case "ONBOARDING":
        return "outline";
      case "OFFBOARDING":
        return "outline";
      case "INACTIVE":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getEngagementColor = (level: string) => {
    switch (level) {
      case "ACTIVE":
        return "text-green-700";
      case "WARM":
        return "text-blue-700";
      case "AT_RISK":
        return "text-red-700";
      case "COLD":
        return "text-gray-700";
      default:
        return "text-gray-700";
    }
  };

  const totalMRR = filteredClients.reduce((sum, c) => sum + (c.mrr || 0), 0);

  return (
    <div>
      <DashboardHeader
        title="Clients"
        description="Manage your client relationships"
        action={
          <Link href="/clients/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Client
            </Button>
          </Link>
        }
      />

      <div className="p-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{filteredClients.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total MRR</p>
                <p className="text-2xl font-bold">${totalMRR.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">
                  {filteredClients.filter((c) => c.status === "ACTIVE").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, contact, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PROSPECT">Prospect</SelectItem>
              <SelectItem value="ONBOARDING">Onboarding</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="OFFBOARDING">Offboarding</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
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
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No clients found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {search || statusFilter !== "ALL" || divisionFilter !== "ALL"
                ? "Try adjusting your filters or search term."
                : "Create your first client to get started."}
            </p>
            <Link href="/clients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Link key={client.id} href={`/clients/${client.id}`}>
                <Card className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full border-gray-200/60 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <span className={`text-xs font-semibold ${getEngagementColor(client.engagementLevel)}`}>
                      {client.engagementLevel}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-gray-900 mb-1">
                    {client.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {client.contactName}
                  </p>

                  {client.city && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{client.city}</span>
                    </div>
                  )}

                  {client.mrr && (
                    <p className="text-lg font-semibold text-primary mb-2">
                      ${client.mrr.toLocaleString()}/mo
                    </p>
                  )}

                  {client.servicePackage && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                      {client.servicePackage}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                    <span>{client.relationshipManager.name.split(" ")[0]}</span>
                    <span
                      className={
                        client.division === "ACCOUNTING"
                          ? "text-blue-700"
                          : client.division === "BIZDEV"
                          ? "text-green-700"
                          : "text-purple-700"
                      }
                    >
                      {client.division === "BIZDEV" ? "BizDev" : client.division}
                    </span>
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
