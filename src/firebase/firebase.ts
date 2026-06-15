// Import the functions you need from the Firebase SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase project: strato-craft-6c348 · Web app "Strato-Craft Website"
// (Public client config - security is enforced with Storage/Rules/IAM/API key restrictions.)
const firebaseConfig = {
  apiKey: "AIzaSyCVsQpS08cYd2wXR_MbOStcoBDEDRg-dCs",
  authDomain: "strato-craft-6c348.firebaseapp.com",
  projectId: "strato-craft-6c348",
  storageBucket: "strato-craft-6c348.firebasestorage.app",
  messagingSenderId: "310764074898",
  appId: "1:310764074898:web:9384a4ed1131ec3421334b",
  measurementId: "G-W0J3P4QZCM",
};

const app = initializeApp(firebaseConfig);
export const firebaseApp = app;
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);
