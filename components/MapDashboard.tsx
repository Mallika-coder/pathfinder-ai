"use client";

import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState, useCallback } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, ObstacleReport } from "../lib/firebase";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 22.5726, // Kolkata coordinates
  lng: 88.3639
};

const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

export default function MapDashboard() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [obstacles, setObstacles] = useState<ObstacleReport[]>([]);
  const [selectedObstacle, setSelectedObstacle] = useState<ObstacleReport | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "obstacles"), (snapshot) => {
      const obstacleData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ObstacleReport[];
      setObstacles(obstacleData);
    });

    return () => unsubscribe();
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const getMarkerIcon = (obstacle: ObstacleReport) => {
    if (obstacle.ambulanceReady) {
      return {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
            <path d="M12 20 L18 26 L28 14" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40)
      };
    } else {
      return {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
            <path d="M20 12 L20 20 M20 20 L28 28" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40)
      };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-800">
        <div className="text-white">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false
        }}
      >
        {obstacles.map((obstacle) => (
          <Marker
            key={obstacle.id}
            position={{ lat: obstacle.location.lat, lng: obstacle.location.lng }}
            icon={getMarkerIcon(obstacle)}
            onClick={() => setSelectedObstacle(obstacle)}
          />
        ))}

        {selectedObstacle && (
          <InfoWindow
            position={{ lat: selectedObstacle.location.lat, lng: selectedObstacle.location.lng }}
            onCloseClick={() => setSelectedObstacle(null)}
          >
            <div className="bg-slate-800 p-4 rounded-lg max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">Obstacle Report</h3>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getSeverityColor(selectedObstacle.severity) }}
                />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-slate-300">
                  {selectedObstacle.ambulanceReady ? (
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  )}
                  {selectedObstacle.ambulanceReady ? 'Ambulance Accessible' : 'Blocked'}
                </div>
                
                <div className="text-slate-300">
                  <span className="font-medium">Width:</span> {selectedObstacle.laneWidth.toFixed(1)}m
                </div>
                
                <div className="text-slate-300">
                  <span className="font-medium">Summary:</span> {selectedObstacle.summary}
                </div>
                
                {selectedObstacle.obstacles.length > 0 && (
                  <div className="text-slate-300">
                    <span className="font-medium">Obstacles:</span>
                    <ul className="list-disc list-inside mt-1">
                      {selectedObstacle.obstacles.map((obs, idx) => (
                        <li key={idx} className="text-xs">{obs}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center text-slate-400 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(selectedObstacle.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}