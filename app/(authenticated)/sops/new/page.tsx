"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { TiptapEditor } from "@/components/tiptap-editor";
import { Save, X } from "lucide-react";

export default function NewSOPPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [division, setDivision] = useState("ACCOUNTING");
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [content, setContent] = useState("<h2>SOP Title</h2><p>Start writing your SOP here...</p>");
  const [tags, setTags] = useState("");

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/sops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          division,
          serviceType,
          status,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        const newSOP = await response.json();
        router.push(`/sops/${newSOP.id}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create SOP:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Create New SOP"
        description="Add a new standard operating procedure to the knowledge base"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/sops")}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !title}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Creating..." : "Create SOP"}
            </Button>
          </div>
        }
      />

      <div className="p-8 max-w-4xl">
        <Card className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="title">SOP Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Monthly Bookkeeping SOP"
                required
              />
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Input
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="e.g., Recurring Service"
              />
            </div>

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
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="LIVE">Live</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., bookkeeping, monthly, client-facing"
              />
            </div>
          </div>

          <div>
            <Label>Content</Label>
            <div className="mt-2">
              <TiptapEditor content={content} onChange={setContent} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Use the toolbar to format text, create lists, and add interactive
              checklists. Checklists are perfect for step-by-step procedures.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
