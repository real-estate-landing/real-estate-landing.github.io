import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
  apiKey: process.env.VITE_PUBLIC_API_KEY,
  authDomain: process.env.VITE_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.VITE_PUBLIC_DATABASE_URL,
  projectId: process.env.VITE_PUBLIC_PROJECT_ID,
  storageBucket: process.env.VITE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.VITE_PUBLIC_APP_ID,
});
export const db = getFirestore(app);
