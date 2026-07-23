import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCC7lC8Pa1HWLRkyw2uhUVb1knGcO-bPGA",
    authDomain: "itg-training-3c8c6.firebaseapp.com",
    projectId: "itg-training-3c8c6",
    storageBucket: "itg-training-3c8c6.appspot.com",
    messagingSenderId: "505162137043",
    appId: "1:505162137043:web:7c3967bc2b7a0eefcf4326",
    measurementId: "G-SLX1W91TK2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);