// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbKaV7Xn4cZy5BXk6pHmjKdtUD7HGKFvY",
  authDomain: "react-vite-tailwind-router.firebaseapp.com",
  projectId: "react-vite-tailwind-router",
  storageBucket: "react-vite-tailwind-router.appspot.com",
  messagingSenderId: "159216386199",
  appId: "1:159216386199:web:bd83741495b4cacb03a9d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
