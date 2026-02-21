"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-screen w-72 flex-col bg-white/70 backdrop-blur-2xl border-r border-gray-200/40">
      <div className="flex h-20 items-center px-6">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
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
  );
}
