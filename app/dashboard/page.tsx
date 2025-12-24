import MapDashboard from "@/components/MapDashboard";
import AnalyticsPanel from "@/components/AnalyticsPanel";

export default function DashboardPage() {
  return (
    <div className="h-screen flex bg-crisis-bg">
      <aside className="w-80 bg-crisis-panel p-4 space-y-6">
        <h2 className="text-xl font-bold">Live Analytics</h2>
        <AnalyticsPanel />
      </aside>

      <main className="flex-1 relative">
        <MapDashboard />
      </main>
    </div>
  );
}
