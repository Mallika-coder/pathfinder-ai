
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit, GeoPoint } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Types
export interface SentinelReport {
  id?: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  analysis: {
    ambulance_ready: boolean;
    lane_width_estimate_m: number;
    obstacles: string[];
    summary: string;
  };
  timestamp: any;
  status: "verified" | "pending";
}

// Helpers
export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `sentinel-uploads/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const saveSentinelReport = async (data: Omit<SentinelReport, "id" | "timestamp" | "status">) => {
  return await addDoc(collection(db, "reports"), {
    ...data,
    location: new GeoPoint(data.location.lat, data.location.lng),
    timestamp: serverTimestamp(),
    status: "verified", // Auto-verifying for demo purposes
  });
};

export const subscribeToReports = (callback: (reports: SentinelReport[]) => void) => {
  const q = query(collection(db, "reports"), orderBy("timestamp", "desc"), limit(50));
  
  return onSnapshot(q, (snapshot) => {
    const reports = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        imageUrl: data.imageUrl,
        location: {
          lat: data.location.latitude,
          lng: data.location.longitude,
        },
        analysis: data.analysis,
        timestamp: data.timestamp,
        status: data.status,
      } as SentinelReport;
    });
    callback(reports);
  });
};

export { db, storage };