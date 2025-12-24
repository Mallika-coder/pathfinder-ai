import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "pathfinder-ai.firebaseapp.com",
  projectId: "pathfinder-ai",
  storageBucket: "pathfinder-ai.appspot.com",
  messagingSenderId: "000000",
  appId: "1:000:web:000"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
