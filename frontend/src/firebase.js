import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUQQjO1vzPRUc0p6tW7VFWPldW7VpRN-I",
  authDomain: "drdoapplicationverification.firebaseapp.com",
  projectId: "drdoapplicationverification",
  storageBucket: "drdoapplicationverification.appspot.com",
  messagingSenderId: "437694226672",
  appId: "1:437694226672:web:7f54943b04f5621690a235",
  measurementId: "G-Z33LCTFZ24",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Firestore instance
export const storage = getStorage(app); // Firebase Storage instance
