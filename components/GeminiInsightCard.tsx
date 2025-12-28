
import { AlertCircle, CheckCircle, Construction, Ruler, Info } from "lucide-react";
import type { AnalysisResult } from "../lib/gemini";

interface GeminiInsightCardProps {
  analysis: AnalysisResult | null;
  loading?: boolean;
}

export default function GeminiInsightCard({ analysis, loading }: GeminiInsightCardProps) {
  if (loading) {
    return (
      <div className="bg-crisis-bg rounded-xl p-4 animate-pulse border border-slate-800">
        <div className="h-4 bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-800 rounded w-full"></div>
          <div className="h-3 bg-slate-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const isSafe = analysis.ambulance_ready;

  return (
    <div className={`rounded-xl p-5 border shadow-lg backdrop-blur-sm ${isSafe
        ? "bg-emerald-950/40 border-emerald-500/30 shadow-emerald-900/10"
        : "bg-red-950/40 border-red-500/30 shadow-red-900/10"
      }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {isSafe ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-500" />
          )}
          <h3 className={`font-bold text-lg ${isSafe ? "text-emerald-400" : "text-red-400"}`}>
            {isSafe ? "Ambulance Accessible" : "Path Blocked"}
          </h3>
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
          Gemini 1.5 Pro
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Ruler className="w-3 h-3" />
            Estimated Width
          </div>
          <p className="text-xl font-bold text-white">
            {analysis.lane_width_estimate_m}m
          </p>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Construction className="w-3 h-3" />
            Obstacles
          </div>
          <p className="text-sm font-medium text-white truncate">
            {analysis.obstacles.length > 0 ? analysis.obstacles[0] : "None"}
          </p>
        </div>
      </div>

      <div className="text-sm text-slate-300 bg-slate-900/30 p-3 rounded-lg border border-slate-800/30">
        <span className="text-sky-400 font-semibold mr-2 max-w-[10px] inline-block">why?</span>
        {analysis.summary}
      </div>
    </div>
  );
}