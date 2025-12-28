
"use client";

import { useState, ChangeEvent } from "react";
import { Upload, MapPin, AlertTriangle, CheckCircle, Loader2, Camera, X } from "lucide-react";
import { uploadImage, saveSentinelReport } from "../lib/firebase";
import { analyzeLaneImage } from "../lib/gemini";

export default function SentinelUpload() {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError("Unable to retrieve your location. Please enable GPS.");
        console.error(err);
      }
    );
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (!location) {
      getLocation();
    }

    // Auto-start process or wait for user confirmation? 
    // "Panic-free" means minimal clicks. Let's auto-upload if location exists, else wait.
    handleUpload(file);
  };


  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);


    // Timeout Promise (Increased to 60s)
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out. Network slow? Retrying might help.")), 60000)
    );

    try {
      // Ensure GPS with timeout
      if (!location) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Quick wait
        // REMOVED logic that ignored state. If still null, we handle it below.
      }

      // 1. Upload to Storage (with timeout race)
      const uploadPromise = uploadImage(file);
      const imageUrl = await Promise.race([uploadPromise, timeout]) as string;

      // 2. Prepare Base64 (Resized/Compressed)
      setAnalyzing(true);
      const base64String = await resizeImage(file); // Use the helper
      const cleanBase64 = base64String.split(',')[1];

      // 3. AI Analysis
      let analysis;
      try {
        const aiPromise = analyzeLaneImage(cleanBase64);
        // Generous timeout for AI
        const aiTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout")), 45000));
        analysis = await Promise.race([aiPromise, aiTimeout]);
      } catch (e) {
        console.error("Gemini manual fallback", e);
        analysis = {
          ambulance_ready: false,
          lane_width_estimate_m: 0,
          obstacles: ["AI Connection Failed"],
          summary: "Manual verification needed"
        };
      }

      // 4. Save to Firestore
      // FIXED: Default to Mumbai (Gateway of India) instead of Kolkata
      const finalLocation = location || { lat: 18.9220, lng: 72.8347 };

      await saveSentinelReport({
        imageUrl,
        location: finalLocation,
        analysis: analysis as any,
      });

      setAnalyzing(false);
      setLoading(false);
      setComplete(true);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Upload failed. Please try again.");
      setLoading(false);
      setAnalyzing(false);
    }
  };

  if (complete) {
    return (
      <div className="bg-crisis-panel/50 backdrop-blur-xl border border-crisis-safe/30 rounded-3xl p-8 text-center shadow-2xl shadow-crisis-safe/20 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-crisis-safe/20 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-12 h-12 text-crisis-safe" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">Verified & Synced</h3>
        <p className="text-slate-300 mb-8 text-lg">
          Responders have received your update.
        </p>
        <button
          onClick={() => {
            setComplete(false);
            setPreview(null);
            setLocation(null);
          }}
          className="w-full py-4 rounded-2xl bg-white text-crisis-bg font-bold text-lg hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
        >
          Report Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-crisis-panel/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Sentinel Upload</h2>
          <p className="text-slate-400 text-sm">Emergency Mode</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2 ${location ? 'bg-crisis-safe/20 text-crisis-safe border border-crisis-safe/50' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'}`}>
          <MapPin className="w-3 h-3" />
          {location ? "GPS LOCKED" : "LOCATING..."}
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Action Area */}
        <div className="relative group">
          <input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />

          <label
            htmlFor="camera-input"
            className={`w-full aspect-square max-h-[400px] mx-auto rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden relative
                  ${loading
                ? 'border-crisis-accent/50 bg-slate-900/80 pointer-events-none'
                : 'border-slate-600 hover:border-crisis-danger hover:bg-crisis-danger/5'
              }
                  ${preview ? 'border-none' : ''}
                `}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                {loading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Loader2 className="w-16 h-16 text-crisis-accent animate-spin mb-4" />
                    <p className="text-xl font-bold text-white animate-pulse">
                      {analyzing ? "Gemini AI Analyzing..." : "Uploading..."}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-crisis-danger to-red-600 flex items-center justify-center shadow-lg shadow-crisis-danger/30 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-white">Tap to Photograph</span>
                  <span className="text-slate-400 text-sm">Auto-scans for obstacles</span>
                </div>
              </>
            )}
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-bottom-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>


      {!loading && !preview && (
        <div className="mt-4 text-center space-y-2">
          <button onClick={getLocation} className="text-sm text-slate-500 underline decoration-slate-700 hover:text-white transition-colors block mx-auto">
            Refresh GPS Location
          </button>
          <button
            onClick={() => {
              // Mock "Mumbai" location for demo
              setLocation({ lat: 18.9220, lng: 72.8347 }); // Gateway of India approx
              setError(null);
            }}
            className="text-xs text-slate-600 hover:text-crisis-accent transition-colors"
          >
            (Dev) Simulate GPS Lock: Mumbai
          </button>
        </div>
      )}
    </div>
  );
}

// Helper to resize image
const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

