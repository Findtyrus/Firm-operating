"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
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
import { Card } from "@/components/ui/card";
import { Save, X } from "lucide-react";

interface Client {
  id: string;
  name: string;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  const [clientId, setClientId] = useState("loading");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [servicePackage, setServicePackage] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchClients();
    // Set default dates
    const today = new Date().toISOString().split("T")[0];
    setIssuedDate(today);
    setDueDate(today);
  }, []);

  const fetchClients = async () => {
    const response = await fetch("/api/clients?status=ACTIVE");
    const data = await response.json();
    setClients(data);
    if (data.length > 0) {
      setClientId(data[0].id);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          amount: parseFloat(amount),
          status,
          servicePackage,
          issuedDate,
          dueDate,
          notes,
        }),
      });

      if (response.ok) {
        router.push("/financials");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Create New Invoice"
        description="Generate a new invoice for a client"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/financials")}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || clientId === "loading" || !clientId || !amount}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        }
      />

      <div className="p-8 max-w-2xl">
        <Card className="p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <Label htmlFor="client">Client *</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.length === 0 ? (
                    <SelectItem value="loading">Loading clients...</SelectItem>
                  ) : (
                    clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="amount">Amount ($) *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="425.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="SENT">Sent</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="OVERDUE">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="servicePackage">Service Package</Label>
              <Input
                id="servicePackage"
                value={servicePackage}
                onChange={(e) => setServicePackage(e.target.value)}
                placeholder="e.g., Professional Bookkeeping - February 2026"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="issuedDate">Issued Date</Label>
                <Input
                  id="issuedDate"
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Internal notes about this invoice..."
                rows={3}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
