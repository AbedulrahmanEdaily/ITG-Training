import { collection, deleteDoc, doc, getDocs,updateDoc,getDoc,onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

export function getProducts(callback){
    return onSnapshot(
        collection(db,"products"),
        (snapshot)=>{
            const products=[];
            snapshot.forEach(doc=>{
                products.push({
                    id:doc.id,
                    ...doc.data()
                });
            });
            callback(products);
        }
    );
}

export async function deleteProduct(id) {
    try {
        await deleteDoc(doc(db, "products", id));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getProductById(id){
    const snapshot = await getDoc(doc(db,"products",id));
    if(snapshot.exists()){
        return{
            id:snapshot.id,
            ...snapshot.data()
        }
    }
    return null;
}

export async function updateProduct(id,product){
    try{
        await updateDoc(doc(db,"products",id),{
            ...product
        });
        return true;
    }
    catch(error){
        console.error(error);
        return false;
    }
}