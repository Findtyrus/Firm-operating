"use client";

import { useState, useEffect } from "react";
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

interface SOP {
  id: string;
  title: string;
  division: string;
  serviceType: string;
  status: string;
  version: string;
  content: string;
  tags: string[];
}

export default function EditSOPPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sop, setSop] = useState<SOP | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [division, setDivision] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetchSOP();
  }, []);

  const fetchSOP = async () => {
    const response = await fetch(`/api/sops/${params.id}`);
    const data = await response.json();
    setSop(data);
    setTitle(data.title);
    setDivision(data.division);
    setServiceType(data.serviceType);
    setStatus(data.status);
    setContent(data.content);
    setTags(data.tags?.join(", ") || "");
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/sops/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          division,
          serviceType,
          status,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          lastReviewedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        router.push(`/sops/${params.id}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to save SOP:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Edit SOP"
        description={`Editing: ${sop?.title}`}
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/sops/${params.id}`)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        }
      />

      <div className="p-8 max-w-4xl">
        <Card className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="title">SOP Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Monthly Bookkeeping SOP"
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
          </div>
        </Card>
      </div>
    </div>
  );
}
