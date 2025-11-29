
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf5RdLz1P1xOG_0IpUWhJHOMolunVmToo",
  authDomain: "prepwise-7f011.firebaseapp.com",
  projectId: "prepwise-7f011",
  storageBucket: "prepwise-7f011.firebasestorage.app",
  messagingSenderId: "885122693367",
  appId: "1:885122693367:web:296ec2329136b583c13bf2",
  measurementId: "G-5HDPSQ9SHK"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) :getApp();
 export const auth = getAuth(app);
  export const db = getFirestore(app);