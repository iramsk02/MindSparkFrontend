import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from "@firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCLgJ7hRXihmUcMK5ybNj6HiLW6ZO6eBGU",
  authDomain: "micro-learning-app-856ab.firebaseapp.com",
  projectId: "micro-learning-app-856ab",
//   storageBucket: "micro-learning-app-856ab.firebasestorage.app",
  storageBucket: "micro-learning-app-856ab.appspot.com",


  messagingSenderId: "184898976056",
  appId: "1:184898976056:web:5ac5b3bd80071984f5a9cd",
  measurementId: "G-SJ7M69ZX25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore=getFirestore(app)



export { storage,firestore };