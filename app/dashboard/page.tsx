
import MapDashboard from "../../components/MapDashboard";
import AnalyticsPanel from "../../components/AnalyticsPanel";

export default function DashboardPage() {
  return (
    <main className="w-full h-screen flex flex-col relative bg-crisis-bg">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-crisis-bg to-transparent pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-crisis-danger">PathFinder</span> AI
              <span className="ml-2 text-xs bg-crisis-danger px-2 py-0.5 rounded text-white uppercase tracking-wider">Responder Mode</span>
            </h1>
          </header>

          <AnalyticsPanel />
        </div>
      </div>

      <div className="flex-1 w-full h-full">
        <MapDashboard />
      </div>
    </main>
  );
}
