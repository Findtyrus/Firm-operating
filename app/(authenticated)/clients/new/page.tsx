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

interface Partner {
  id: string;
  name: string;
}

export default function NewClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);

  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [division, setDivision] = useState("ACCOUNTING");
  const [status, setStatus] = useState("PROSPECT");
  const [servicePackage, setServicePackage] = useState("");
  const [mrr, setMrr] = useState("");
  const [relationshipManagerId, setRelationshipManagerId] = useState("loading");
  const [engagementLevel, setEngagementLevel] = useState("WARM");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const response = await fetch("/api/partners");
    const data = await response.json();
    setPartners(data);
    if (data.length > 0) {
      setRelationshipManagerId(data[0].id);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contactName,
          email,
          phone,
          city,
          division,
          status,
          servicePackage: servicePackage || null,
          mrr: mrr ? parseFloat(mrr) : null,
          relationshipManagerId,
          engagementLevel,
          notes,
        }),
      });

      if (response.ok) {
        router.push("/clients");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create client:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Add New Client"
        description="Create a new client profile"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/clients")}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !name || !email || relationshipManagerId === "loading"}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Client"}
            </Button>
          </div>
        }
      />

      <div className="p-8 max-w-4xl">
        <Card className="p-8 shadow-sm">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., River City Consulting"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g., Sarah Mitchell"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@business.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(601) 555-0101"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Jackson"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="text-lg font-semibold">Service Details</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="division">Division</Label>
                  <Select value={division} onValueChange={setDivision}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACCOUNTING">Accounting & Finance</SelectItem>
                      <SelectItem value="BIZDEV">Business Development</SelectItem>
                      <SelectItem value="BOTH">Both Divisions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PROSPECT">Prospect</SelectItem>
                      <SelectItem value="ONBOARDING">Onboarding</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="OFFBOARDING">Offboarding</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="servicePackage">Service Package</Label>
                  <Input
                    id="servicePackage"
                    value={servicePackage}
                    onChange={(e) => setServicePackage(e.target.value)}
                    placeholder="e.g., Professional Bookkeeping"
                  />
                </div>

                <div>
                  <Label htmlFor="mrr">Monthly Recurring Revenue ($)</Label>
                  <Input
                    id="mrr"
                    type="number"
                    value={mrr}
                    onChange={(e) => setMrr(e.target.value)}
                    placeholder="425"
                  />
                </div>

                <div>
                  <Label htmlFor="relationshipManager">Relationship Manager</Label>
                  <Select value={relationshipManagerId} onValueChange={setRelationshipManagerId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {partners.length === 0 ? (
                        <SelectItem value="loading">Loading...</SelectItem>
                      ) : (
                        partners.map((partner) => (
                          <SelectItem key={partner.id} value={partner.id}>
                            {partner.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="engagementLevel">Engagement Level</Label>
                  <Select value={engagementLevel} onValueChange={setEngagementLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COLD">Cold</SelectItem>
                      <SelectItem value="WARM">Warm</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="AT_RISK">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Internal notes about this client..."
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
