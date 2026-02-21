"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  BookOpen,
  DollarSign,
  FileText,
  Settings,
  User,
  Clock,
  UsersRound,
  Menu,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Firm Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Dashboard", href: "/dashboard/my-dashboard", icon: User },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "SOPs", href: "/sops", icon: BookOpen },
  { name: "Time Tracking", href: "/time-tracking", icon: Clock },
  { name: "Team Capacity", href: "/team", icon: UsersRound },
  { name: "Financials", href: "/financials", icon: DollarSign },
  { name: "Files", href: "/files", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/40">
      <div className="flex items-center justify-between px-4 h-16">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-screen flex-col">
              <div className="flex h-20 items-center px-6 border-b">
                <Link href="/dashboard" className="flex items-center space-x-3" onClick={() => setOpen(false)}>
                  <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base">M</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 leading-none tracking-tight">
                      Magnolia
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">Advisory Group</p>
                  </div>
                </Link>
              </div>

              <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-[12px] px-4 py-3 text-[15px] font-semibold transition-all duration-200",
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-gray-700 hover:bg-gray-100/80 active:scale-[0.98]"
                      )}
                    >
                      <item.icon className="h-5 w-5" strokeWidth={2.5} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-gray-200/40 p-5 bg-white/50">
                <div className="flex items-center gap-3">
                  <UserButton afterSignOutUrl="/sign-in" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">Partner</p>
                    <p className="text-xs text-gray-500 truncate font-medium">
                      Magnolia Advisory
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg">Magnolia</span>
        </Link>

        <Button variant="ghost" size="icon" onClick={() => {
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
        }}>
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
