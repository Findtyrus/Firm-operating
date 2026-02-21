"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Phone, Mail, FileText, Calendar } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  content: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
}

interface ClientActivityProps {
  clientId: string;
}

export function ClientActivity({ clientId }: ClientActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [clientId]);

  const fetchActivities = async () => {
    const response = await fetch(`/api/clients/${clientId}/activities`);
    if (response.ok) {
      const data = await response.json();
      setActivities(data);
    }
    setLoading(false);
  };

  const handleSaveNote = async () => {
    if (!newNote.trim()) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/clients/${clientId}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "NOTE",
          content: newNote,
        }),
      });

      if (response.ok) {
        setNewNote("");
        fetchActivities();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setSaving(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "CALL":
        return <Phone className="h-4 w-4" />;
      case "EMAIL":
        return <Mail className="h-4 w-4" />;
      case "MEETING":
        return <Calendar className="h-4 w-4" />;
      case "FILE":
        return <FileText className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "CALL":
        return "bg-blue-100 text-blue-700";
      case "EMAIL":
        return "bg-green-100 text-green-700";
      case "MEETING":
        return "bg-purple-100 text-purple-700";
      case "FILE":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Activity & Notes</h3>

      <div className="mb-6 space-y-3">
        <Textarea
          placeholder="Add a note about this client (call summary, meeting notes, action items, etc.)"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
        />
        <Button onClick={handleSaveNote} disabled={saving || !newNote.trim()}>
          <Plus className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Add Note"}
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Loading activities...
          </p>
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No activity yet. Add your first note above.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 rounded-xl border border-gray-200/60 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.createdBy.name}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {activity.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
