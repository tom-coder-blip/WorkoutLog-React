// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9aaEihqlajsHS3DvTzURJMNWx3IahF94",
  authDomain: "workoutlogapp-c53e7.firebaseapp.com",
  projectId: "workoutlogapp-c53e7",
  storageBucket: "workoutlogapp-c53e7.firebasestorage.app",
  messagingSenderId: "142683505857",
  appId: "1:142683505857:web:b59c3ba2be7645084a4040",
  measurementId: "G-42H27MJ55L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);