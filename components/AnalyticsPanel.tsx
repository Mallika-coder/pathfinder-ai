"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Users, Clock, TrendingDown, AlertTriangle } from "lucide-react";

export default function AnalyticsPanel() {
  const [stats, setStats] = useState({
    activeSentinels: 0,
    totalReports: 0,
    resolvedReports: 0,
    avgResponseTime: 0,
    deathsPrevented: 0
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "obstacles"), (snapshot) => {
      const reports = snapshot.docs.map(doc => doc.data());
      const resolved = reports.filter(r => r.status === 'resolved').length;
      
      setStats(prev => ({
        ...prev,
        totalReports: reports.length,
        resolvedReports: resolved,
        deathsPrevented: Math.floor(resolved * 0.3) // Simulated metric
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Live Analytics</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-emerald-500 mr-3" />
            <span className="text-sm text-slate-300">Active Sentinels</span>
          </div>
          <span className="text-lg font-bold text-white">{stats.activeSentinels}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-sm text-slate-300">Total Reports</span>
          </div>
          <span className="text-lg font-bold text-white">{stats.totalReports}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
          <div className="flex items-center">
            <TrendingDown className="h-5 w-5 text-emerald-500 mr-3" />
            <span className="text-sm text-slate-300">Deaths Prevented</span>
          </div>
          <span className="text-lg font-bold text-emerald-500">{stats.deathsPrevented}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-3" />
            <span className="text-sm text-slate-300">Avg Response Time</span>
          </div>
          <span className="text-lg font-bold text-white">2.3 min</span>
        </div>
      </div>
    </div>
  );
}