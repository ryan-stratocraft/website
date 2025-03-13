// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //"AIzaSyDjLSl2dKg3IAZ0GQg4fx6NsMRcPdMuvms",
  authDomain: "strato-craft.firebaseapp.com",
  projectId: "strato-craft",
  storageBucket: "strato-craft.firebasestorage.app",
  messagingSenderId: "1078258918920",
  appId: "1:1078258918920:web:70afe90102e9792d8c53bd",
  measurementId: "G-1WM79E0XNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);