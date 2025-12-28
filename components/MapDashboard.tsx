
"use client";

import { useEffect, useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { subscribeToReports, SentinelReport } from "../lib/firebase";
import { mapContainerStyle, defaultCenter, darkMapStyle, libraries } from "../lib/maps";
import GeminiInsightCard from "./GeminiInsightCard";
import { Loader2, Navigation, AlertTriangle, Crosshair } from "lucide-react";

export default function MapDashboard() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries as any,
  });

  const [reports, setReports] = useState<SentinelReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<SentinelReport | null>(null);


  // Simulated Ambulance Movement
  const [ambulanceLocation, setAmbulanceLocation] = useState(defaultCenter);

  useEffect(() => {
    // Move ambulance in a small circle/path for demo
    const timer = setInterval(() => {
      const time = Date.now() / 10000;
      setAmbulanceLocation({
        lat: defaultCenter.lat + Math.sin(time) * 0.002,
        lng: defaultCenter.lng + Math.cos(time) * 0.002
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  useEffect(() => {
    // Real-time listener
    const unsubscribe = subscribeToReports((data) => {
      setReports(data);
      // Auto-pan to newest report if it exists
      if (data.length > 0) {
        const newest = data[0]; // Assumes ordered by desc timestamp
        // Only pan if it's recent (optional check, but good for UX)
        setAmbulanceLocation({ lat: newest.location.lat, lng: newest.location.lng });
        setSelectedReport(newest);
      }
    });
    return () => unsubscribe();
  }, []);


  if (loadError) return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-crisis-bg border-l border-slate-800">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Map Connection Failed</h3>
      <p className="text-slate-400 max-w-xs">Review API Keys in .env.local</p>
    </div>
  );

  if (!isLoaded) return (
    <div className="h-full flex flex-col items-center justify-center bg-crisis-bg border-l border-slate-800">
      <Loader2 className="animate-spin text-crisis-accent w-10 h-10 mb-4" />
      <p className="text-slate-500 text-sm tracking-widest uppercase">Initializing Satellite Uplink...</p>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-slate-900 group">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={ambulanceLocation}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {/* Ambulance Marker (Blue Pulse) */}
        <Marker
          position={ambulanceLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#3b82f6",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          }}
          zIndex={100}
        />

        {/* Sentinel Reports */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={{ lat: report.location.lat, lng: report.location.lng }}
            onClick={() => setSelectedReport(report)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: report.analysis.ambulance_ready ? "#34C759" : "#FF3B30", // Green or Red
              fillOpacity: 0.9,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
          />
        ))}

        {selectedReport && (
          <InfoWindow
            position={{ lat: selectedReport.location.lat, lng: selectedReport.location.lng }}
            onCloseClick={() => setSelectedReport(null)}
          >
            <div className="min-w-[320px] max-w-sm">
              <div className="relative h-40 w-full mb-3 rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform">
                <img
                  src={selectedReport.imageUrl}
                  alt="Lane view"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
                  Live Feed
                </div>
              </div>
              <GeminiInsightCard analysis={selectedReport.analysis} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Tactical Overlays */}

      {/* Top Left: Signal Status */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-slate-700/50 px-4 py-2 rounded-full z-10">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-emerald-500">LIVE FEED ACTIVE</span>
      </div>

      {/* Ambulance Overlay UI */}
      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between pointer-events-auto gap-4">

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-blue-600/20 p-4 rounded-2xl animate-pulse-fast border border-blue-600/30">
              <Navigation className="w-8 h-8 text-blue-500 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-lg">Ambulance #KL-09</h3>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">EN ROUTE</span>
              </div>
              <p className="text-slate-400 text-sm">Target: Beadon Street Fire <span className="mx-2">•</span> <span className="text-white">ETA 4m</span></p>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
            <div className="text-right">
              <p className="text-3xl font-bold text-white tabular-nums">42<span className="text-sm text-slate-500 ml-1">km/h</span></p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Speed</p>
            </div>
            <div className="w-px h-10 bg-slate-800 hidden md:block"></div>
            <div className="text-right">
              <p className="text-3xl font-bold text-crisis-safe tabular-nums">2.4<span className="text-sm text-slate-500 ml-1">km</span></p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Distance</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
