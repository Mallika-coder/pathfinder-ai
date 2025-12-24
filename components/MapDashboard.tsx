// "use client";

// import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
// import { useEffect, useState, useCallback } from "react";
// import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
// import { db, ObstacleReport } from "../lib/firebase";
// import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%'
// };

// const center = {
//   lat: 22.5726, // Kolkata coordinates
//   lng: 88.3639
// };

// const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

// export default function MapDashboard() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries,
//   });

//   const [obstacles, setObstacles] = useState<ObstacleReport[]>([]);
//   const [selectedObstacle, setSelectedObstacle] = useState<ObstacleReport | null>(null);
//   const [map, setMap] = useState<google.maps.Map | null>(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "obstacles"), (snapshot) => {
//       const obstacleData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as ObstacleReport[];
//       setObstacles(obstacleData);
//     });

//     return () => unsubscribe();
//   }, []);

//   const onLoad = useCallback((map: google.maps.Map) => {
//     setMap(map);
//   }, []);

//   const getMarkerIcon = (obstacle: ObstacleReport) => {
//     if (obstacle.ambulanceReady) {
//       return {
//         url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
//           <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
//             <path d="M12 20 L18 26 L28 14" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>
//         `),
//         scaledSize: new google.maps.Size(40, 40)
//       };
//     } else {
//       return {
//         url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
//           <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="20" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
//             <path d="M20 12 L20 20 M20 20 L28 28" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
//           </svg>
//         `),
//         scaledSize: new google.maps.Size(40, 40)
//       };
//     }
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       case 'low': return '#10b981';
//       default: return '#6b7280';
//     }
//   };

//   if (!isLoaded) {
//     return (
//       <div className="flex items-center justify-center w-full h-full bg-slate-800">
//         <div className="text-white">Loading map...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-full">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={16}
//         onLoad={onLoad}
//         options={{
//           styles: [
//             {
//               featureType: "poi",
//               elementType: "labels",
//               stylers: [{ visibility: "off" }]
//             },
//             {
//               featureType: "transit",
//               elementType: "labels",
//               stylers: [{ visibility: "off" }]
//             }
//           ],
//           disableDefaultUI: true,
//           zoomControl: true,
//           streetViewControl: false
//         }}
//       >
//         {obstacles.map((obstacle) => (
//           <Marker
//             key={obstacle.id}
//             position={{ lat: obstacle.location.lat, lng: obstacle.location.lng }}
//             icon={getMarkerIcon(obstacle)}
//             onClick={() => setSelectedObstacle(obstacle)}
//           />
//         ))}

//         {selectedObstacle && (
//           <InfoWindow
//             position={{ lat: selectedObstacle.location.lat, lng: selectedObstacle.location.lng }}
//             onCloseClick={() => setSelectedObstacle(null)}
//           >
//             <div className="bg-slate-800 p-4 rounded-lg max-w-xs">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold text-white">Obstacle Report</h3>
//                 <div 
//                   className="w-3 h-3 rounded-full"
//                   style={{ backgroundColor: getSeverityColor(selectedObstacle.severity) }}
//                 />
//               </div>
              
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center text-slate-300">
//                   {selectedObstacle.ambulanceReady ? (
//                     <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
//                   ) : (
//                     <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
//                   )}
//                   {selectedObstacle.ambulanceReady ? 'Ambulance Accessible' : 'Blocked'}
//                 </div>
                
//                 <div className="text-slate-300">
//                   <span className="font-medium">Width:</span> {selectedObstacle.laneWidth.toFixed(1)}m
//                 </div>
                
//                 <div className="text-slate-300">
//                   <span className="font-medium">Summary:</span> {selectedObstacle.summary}
//                 </div>
                
//                 {selectedObstacle.obstacles.length > 0 && (
//                   <div className="text-slate-300">
//                     <span className="font-medium">Obstacles:</span>
//                     <ul className="list-disc list-inside mt-1">
//                       {selectedObstacle.obstacles.map((obs, idx) => (
//                         <li key={idx} className="text-xs">{obs}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
                
//                 <div className="flex items-center text-slate-400 text-xs">
//                   <Clock className="w-3 h-3 mr-1" />
//                   {new Date(selectedObstacle.timestamp).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Siren,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 22.5726, // Kolkata default
  lng: 88.3639,
};

export default function MapDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reports"), (snap) => {
      setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* MAP */}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: true,
            styles: darkMapStyle,
          }}
        >
          {/* MARKERS */}
          {reports.map((r) => (
            <Marker
              key={r.id}
              position={{
                lat: r.location.lat,
                lng: r.location.lng,
              }}
              icon={{
                url: r.ambulanceReady
                  ? "/markers/green.png"
                  : "/markers/red.png",
                scaledSize: new window.google.maps.Size(36, 36),
              }}
              onClick={() => setSelected(r)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* LEGEND */}
      <div className="absolute top-6 left-6 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-bold text-white">Legend</h3>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          🟢 Ambulance Accessible
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          🔴 Blocked / Unsafe
        </div>
      </div>

      {/* GEMINI INSIGHT PANEL */}
      {selected && (
        <div className="absolute bottom-6 right-6 w-[340px] bg-slate-950/95 border border-white/10 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">AI Insight</h3>
            <button
              onClick={() => setSelected(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              {selected.ambulanceReady ? (
                <ShieldCheck className="text-emerald-400" />
              ) : (
                <AlertTriangle className="text-red-400" />
              )}
              <span>
                {selected.ambulanceReady
                  ? "Ambulance Ready"
                  : "Blocked / Unsafe"}
              </span>
            </div>

            <p className="text-slate-300">
              <span className="font-semibold">Summary:</span>{" "}
              {selected.summary}
            </p>

            <div className="flex items-center gap-2">
              <Siren className="text-red-400" />
              <span className="uppercase text-xs tracking-widest">
                Severity: {selected.severity}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* DARK MAP STYLE */
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#020617" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
];
