
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCASCfwgJ1BpmbZq-8YPs5sHxoDJONX144",
  authDomain: "prepwise-3e1b4.firebaseapp.com",
  projectId: "prepwise-3e1b4",
  storageBucket: "prepwise-3e1b4.firebasestorage.app",
  messagingSenderId: "294573955587",
  appId: "1:294573955587:web:24bb78b9de2c8f3ac94c36",
  measurementId: "G-1014N0JQK8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig)  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);