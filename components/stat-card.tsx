import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
  return (
    <Card className="p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 border-0 rounded-2xl bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mb-2">{title}</p>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">
            {value}
          </p>
          {trend && (
            <p
              className={`text-sm font-semibold mt-3 flex items-center gap-1 ${
                trend.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.value}
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-2 font-medium">{description}</p>
          )}
        </div>
        <div className="ml-5">
          <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner">
            <Icon className="h-7 w-7 text-primary" strokeWidth={2} />
          </div>
        </div>
      </div>
    </Card>
  );
}
