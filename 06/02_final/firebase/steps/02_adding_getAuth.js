// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// adding authentication library
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxPiOrmxB39SGzMUOpETa-GI0iF-u1D6c",
  authDomain: "stocktracker-f22f7.firebaseapp.com",
  projectId: "stocktracker-f22f7",
  storageBucket: "stocktracker-f22f7.firebasestorage.app",
  messagingSenderId: "962553682319",
  appId: "1:962553682319:web:79e895662a44d928ccd3fa",
  measurementId: "G-KFSZLDZ720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// exporting our authentication feature
export const  auth = getAuth(app);

export default app;