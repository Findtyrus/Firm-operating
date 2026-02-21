"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center p-8">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Error Loading Page</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {error.message || "Failed to load this page"}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="outline" size="sm">
            Try Again
          </Button>
          <Button onClick={() => window.location.href = "/dashboard"} size="sm">
            Go to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
