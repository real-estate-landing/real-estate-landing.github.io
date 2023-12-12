import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDglu9H4HOJipz9iSWbUKEuO-pjMfxg79k",
  authDomain: "real-estate-72f54.firebaseapp.com",
  databaseURL:
    "https://real-estate-72f54-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "real-estate-72f54",
  storageBucket: "real-estate-72f54.appspot.com",
  messagingSenderId: "592970894895",
  appId: "1:592970894895:web:3a96a3204cd5a702a8c0da",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
