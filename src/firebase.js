// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlUvVYK_u6ntMRSbzR1FSNMtS1HiF7QyQ",
    authDomain: "test-63c24.firebaseapp.com",
    projectId: "test-63c24",
    storageBucket: "test-63c24.appspot.com",
    messagingSenderId: "542427163114",
    appId: "1:542427163114:web:af85e9431126f54d63ea93",
    measurementId: "G-8QYV8WLG6S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
