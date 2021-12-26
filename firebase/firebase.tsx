import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoGguNqudPGoKvOjh-NTO2AFblvxO-Szg",
  authDomain: "next-safari.firebaseapp.com",
  projectId: "next-safari",
  storageBucket: "next-safari.appspot.com",
  messagingSenderId: "1035387976537",
  appId: "1:1035387976537:web:2b60659bf1037a56842a48",
  measurementId: "G-V7T3FQ9YP3",
}; //this is where your firebase app values you copied will go

initializeApp(firebaseConfig);

export const auth = getAuth();
