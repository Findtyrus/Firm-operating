"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  BookOpen,
  DollarSign,
  FileText,
  Settings,
  Plus,
  Search,
} from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "t" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push("/tasks/new");
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push("/clients/new");
      }

      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [router]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard"))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Firm Overview Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/my-dashboard"))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>My Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/clients"))}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Clients</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/tasks"))}
          >
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Tasks</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/sops"))}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            <span>SOPs</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/financials"))}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Financials</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/files"))}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Files</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/settings"))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/tasks/new"))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Task</span>
            <kbd className="ml-auto text-xs text-muted-foreground">⌘T</kbd>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/clients/new"))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Client</span>
            <kbd className="ml-auto text-xs text-muted-foreground">⌘C</kbd>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/sops/new"))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New SOP</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Keyboard Shortcuts">
          <CommandItem disabled>
            <kbd className="mr-2 text-xs">⌘K</kbd>
            <span>Toggle command palette</span>
          </CommandItem>
          <CommandItem disabled>
            <kbd className="mr-2 text-xs">⌘T</kbd>
            <span>New task</span>
          </CommandItem>
          <CommandItem disabled>
            <kbd className="mr-2 text-xs">⌘C</kbd>
            <span>New client</span>
          </CommandItem>
          <CommandItem disabled>
            <kbd className="mr-2 text-xs">/</kbd>
            <span>Search (opens palette)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
