// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_7PASvAvReevg4ZwWb8fqv9oj1zA6_TI",
  authDomain: "mens-test-app.firebaseapp.com",
  projectId: "mens-test-app",
  storageBucket: "mens-test-app.appspot.com",
  messagingSenderId: "914032432345",
  appId: "1:914032432345:web:7b0923961220d717571ac8",
  measurementId: "G-8WVK43KL63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const analytics = getAnalytics(app);