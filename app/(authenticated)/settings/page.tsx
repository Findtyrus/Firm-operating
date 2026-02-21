import { DashboardHeader } from "@/components/dashboard-header";

export default function SettingsPage() {
  return (
    <div>
      <DashboardHeader
        title="Settings"
        description="Firm and account settings"
      />
      <div className="p-8">
        <p className="text-muted-foreground">Settings coming soon...</p>
      </div>
    </div>
  );
}
