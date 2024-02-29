// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATq1wKIAPkFyHlXdjR9azQQK3X-D-0L6E",
  authDomain: "medicare-86dfb.firebaseapp.com",
  projectId: "medicare-86dfb",
  storageBucket: "medicare-86dfb.appspot.com",
  messagingSenderId: "24741360514",
  appId: "1:24741360514:web:c32002c5ecbf24255b959b",
  measurementId: "G-JL9XMJ8V5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const auth = getAuth(app);
export { dataBase, auth};