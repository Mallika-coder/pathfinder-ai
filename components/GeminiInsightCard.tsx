"use client";
import { Brain } from "lucide-react";

export default function GeminiInsightCard({ summary }: { summary: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex items-center">
      <Brain className="h-4 w-4 text-emerald-500 mr-2" />
      <span className="text-xs text-slate-300">{summary}</span>
    </div>
  );
}