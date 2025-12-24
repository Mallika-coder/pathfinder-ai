"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../lib/firebase";
import { analyzeLane } from "../lib/geminiAnalyzer";

export default function SentinelUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setSuccess(false);
      setIsUploading(true);
      
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      // Read image as base64 for Gemini analysis
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        const base64Data = imageData.split(',')[1]; // Remove data URL prefix
        setImage(imageData);

        try {
          // Analyze with Gemini
          const analysis = await analyzeLane(base64Data);
          
          // Upload image to Firebase Storage
          const storageRef = ref(storage, `obstacles/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(snapshot.ref);

          // Save to Firestore
          await addDoc(collection(db, "obstacles"), {
            imageUrl,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            timestamp: serverTimestamp(),
            ambulanceReady: analysis.ambulance_ready,
            laneWidth: analysis.lane_width_estimate_m,
            obstacles: analysis.obstacles,
            summary: analysis.summary,
            severity: analysis.severity,
            status: 'reported',
            confidence: analysis.confidence
          });

          setSuccess(true);
          setTimeout(() => {
            setImage(null);
            setSuccess(false);
          }, 3000);
        } catch (analysisError) {
          console.error('Analysis failed:', analysisError);
          setError('Failed to analyze image. Please try again.');
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error capturing image:', err);
      setError('Failed to capture image. Please check camera permissions and try again.');
      setIsUploading(false);
    }
  }, []);

  const resetForm = () => {
    setImage(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Emergency Report</h3>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4 flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm">Report submitted successfully! Emergency responders have been notified.</span>
        </div>
      )}

      <div className="space-y-4">
        <div 
          className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-700/50 transition-colors"
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {image ? (
            <div className="relative">
              <img 
                src={image} 
                alt="Captured obstacle" 
                className="w-full h-48 object-cover rounded-lg"
              />
              {!isUploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetForm();
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {isUploading ? (
                <Loader2 className="h-12 w-12 mx-auto text-emerald-500 animate-spin" />
              ) : (
                <Camera className="h-12 w-12 mx-auto text-slate-400" />
              )}
              <p className="text-sm text-slate-400">
                {isUploading ? 'Analyzing image...' : 'Tap to capture obstacle photo'}
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleCapture}
            disabled={isUploading}
          />
        </div>

                <div className="text-xs text-slate-400 text-center">
          Powered by Google Gemini AI • Location auto-detected
        </div>
      </div>
    </div>
  );
}