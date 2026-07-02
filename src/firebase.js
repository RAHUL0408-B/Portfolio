// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp1EsnJUwbnePEYvdNycvaKF4Pp746UZI",
  authDomain: "portfolio-8710f.firebaseapp.com",
  databaseURL: "https://portfolio-8710f-default-rtdb.firebaseio.com",
  projectId: "portfolio-8710f",
  storageBucket: "portfolio-8710f.firebasestorage.app",
  messagingSenderId: "189284673378",
  appId: "1:189284673378:web:ea01c78000e0e46e6eae3b",
  measurementId: "G-NHPCQPLK31"
};

import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
