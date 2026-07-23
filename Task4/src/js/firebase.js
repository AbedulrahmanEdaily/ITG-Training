import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyCcocx2-vPdI1m_-6Q6S59ifghHVxmNYHw",
    authDomain: "product-listing-c6474.firebaseapp.com",
    projectId: "product-listing-c6474",
    storageBucket: "product-listing-c6474.appspot.com",
    messagingSenderId: "26357270315",
    appId: "1:26357270315:web:5e4da54e15716fce31276e",
    measurementId: "G-5K1KE1QMR2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);