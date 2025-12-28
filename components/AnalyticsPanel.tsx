
import { Activity, Shield, Clock } from "lucide-react";

export default function AnalyticsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
        <div className="p-3 bg-red-500/10 rounded-lg">
          <Activity className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">12m</p>
          <p className="text-sm text-slate-400">Response Time Saved</p>
        </div>
      </div>

      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-lg">
          <Shield className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">184</p>
          <p className="text-sm text-slate-400">Active Sentinels</p>
        </div>
      </div>

      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">30+</p>
          <p className="text-sm text-slate-400">Lives Protected</p>
        </div>
      </div>
    </div>
  );
}