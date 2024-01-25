// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-netflix-clone-e5da7.firebaseapp.com",
  projectId: "mern-netflix-clone-e5da7",
  storageBucket: "mern-netflix-clone-e5da7.appspot.com",
  messagingSenderId: "825614240253",
  appId: "1:825614240253:web:8fefff9cde0f86628cf194",
  measurementId: "G-8CEW297ZBQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
