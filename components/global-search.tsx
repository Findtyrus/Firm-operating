"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, CheckSquare, BookOpen, FileText, Loader2 } from "lucide-react";

interface SearchResult {
  type: "client" | "task" | "sop" | "file";
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  url: string;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.url);
    setOpen(false);
    setQuery("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "client":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "task":
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case "sop":
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      case "file":
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Search clients, tasks, SOPs, files... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 h-14 text-base"
            autoFocus
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {results.length === 0 && query.trim() !== "" && !loading && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {results.length === 0 && query.trim() === "" && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Quick search across your workspace
              </p>
              <p className="text-xs text-muted-foreground">
                Try searching for clients, tasks, SOPs, or files
              </p>
            </div>
          )}

          <div className="space-y-1">
            {results.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  {getIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{result.title}</p>
                  {result.subtitle && (
                    <p className="text-xs text-muted-foreground truncate">
                      {result.subtitle}
                    </p>
                  )}
                </div>
                {result.badge && (
                  <Badge variant="outline" className="text-xs">
                    {result.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground">
          <kbd className="px-2 py-1 bg-gray-100 rounded">↵</kbd> to select •
          <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">Esc</kbd> to close
        </div>
      </DialogContent>
    </Dialog>
  );
}
