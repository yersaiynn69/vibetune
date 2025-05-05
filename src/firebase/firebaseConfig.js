// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ ТВОЙ НОВЫЙ FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC5jVEdRS5xrYaTcg7DGeX0HHQn00Mn2UU",
  authDomain: "vibe2-25e44.firebaseapp.com",
  projectId: "vibe2-25e44",
  storageBucket: "vibe2-25e44.firebasestorage.app",
  messagingSenderId: "1008985732947",
  appId: "1:1008985732947:web:7e17e5dd3a803ec5af13a6"
};

// ✅ Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт авторизации и базы
export const auth = getAuth(app);
export const db = getFirestore(app);
