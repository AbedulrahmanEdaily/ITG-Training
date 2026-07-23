import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getProducts() {
    try {
        const products = [];
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return products;
    } catch (error) {
        console.error("Error getting products:", error);
        return [];
    }
}