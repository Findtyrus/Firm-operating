"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface SOPChecklistViewerProps {
  sopId: string;
  content: string;
  initialChecklistState?: Record<string, boolean>;
}

export function SOPChecklistViewer({
  sopId,
  content,
  initialChecklistState = {},
}: SOPChecklistViewerProps) {
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(
    initialChecklistState
  );
  const [saving, setSaving] = useState(false);

  // Extract checklist items from HTML content
  const extractChecklistItems = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const items: { id: string; text: string }[] = [];

    doc.querySelectorAll('[data-type="taskItem"]').forEach((item, index) => {
      const text = item.textContent || "";
      const id = `item-${index}`;
      items.push({ id, text });
    });

    return items;
  };

  const [checklistItems, setChecklistItems] = useState<
    { id: string; text: string }[]
  >([]);

  useEffect(() => {
    const items = extractChecklistItems(content);
    setChecklistItems(items);
  }, [content]);

  const handleToggle = async (itemId: string) => {
    const newState = {
      ...checklistState,
      [itemId]: !checklistState[itemId],
    };
    setChecklistState(newState);

    // Save to backend
    setSaving(true);
    try {
      await fetch(`/api/sops/${sopId}/checklist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checklistState: newState }),
      });
    } catch (error) {
      console.error("Failed to save checklist state:", error);
    } finally {
      setSaving(false);
    }
  };

  const completedCount = Object.values(checklistState).filter(
    (checked) => checked
  ).length;
  const totalCount = checklistItems.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Render content with interactive checkboxes
  const renderContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    
    doc.querySelectorAll('[data-type="taskItem"]').forEach((item, index) => {
      const id = `item-${index}`;
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.setAttribute("data-item-id", id);
        if (checklistState[id]) {
          checkbox.setAttribute("checked", "true");
        } else {
          checkbox.removeAttribute("checked");
        }
      }
    });

    return doc.body.innerHTML;
  };

  return (
    <div className="space-y-6">
      {totalCount > 0 && (
        <Card className="p-6 border-0 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Progress</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {completedCount} of {totalCount} steps completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </Card>
      )}

      <Card className="p-8 border-0 shadow-sm">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "INPUT" && target.getAttribute("type") === "checkbox") {
              const itemId = target.getAttribute("data-item-id");
              if (itemId) {
                e.preventDefault();
                handleToggle(itemId);
              }
            }
          }}
        />
        {checklistItems.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist Items</h4>
            <div className="space-y-3">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleToggle(item.id)}
                >
                  {checklistState[item.id] ? (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm ${
                      checklistState[item.id]
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {saving && (
          <div className="text-xs text-gray-500 mt-4">Saving progress...</div>
        )}
      </Card>
    </div>
  );
}
