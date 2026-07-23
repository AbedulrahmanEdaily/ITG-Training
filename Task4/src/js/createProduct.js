import{addDoc,collection,doc,updateDoc}from"firebase/firestore";
import{db}from"./firebase.js";
import{getProductById,updateProduct }from"./data.js";

const form=document.getElementById("createProductForm");
const imageInput=document.getElementById("image");
const imagePreview=document.getElementById("previewImage");

const params=new URLSearchParams(location.search);
const productId=params.get("id");

async function handleCreateProduct(form){
    const product=createProduct(form);
    if(!validateProduct(product))return false;
    let result;
    if(productId){
        result=await updateProduct(productId,product);
    }else{
        result=await storeProduct(product);
    }
    return result;
}

async function storeProduct(product){
    try{
        await addDoc(collection(db,"products"),{
            name:product.name,
            image:product.image,
            category:product.category,
            color:product.color,
            rating:product.rating,
            price:product.price,
            discount:product.discount,
            description:product.description
        });
        return true;
    }catch(error){
        console.error("Error adding product:",error);
        return false;
    }
}

async function loadProductForEdit(){
    if(!productId)return;
    const product=await getProductById(productId);
    if(product){
        fillForm(product);
        imagePreview.src=product.image;
        imagePreview.classList.add("show");
    }
}

function fillForm(product){
    document.getElementById("name").value=product.name;
    document.getElementById("image").value=product.image;
    document.getElementById("category").value=product.category;
    document.getElementById("color").value=product.color;
    document.getElementById("rating").value=product.rating;
    document.getElementById("price").value=product.price;
    document.getElementById("discount").value=product.discount;
    document.getElementById("description").value=product.description;
}

function displayErrorMessage(message){
    const parent=document.querySelector(".image-preview");
    parent.querySelector(".error")?.remove();
    const errorMessage=document.createElement("p");
    errorMessage.className="error";
    errorMessage.textContent=message;
    parent.appendChild(errorMessage);
}

function validateProduct(product){
    if(!product.name){
        displayErrorMessage("Name required");
        return false;
    }
    if(!product.image){
        displayErrorMessage("Image URL required");
        return false;
    }
    if(!isValidImageUrl(product.image)){
        displayErrorMessage("Invalid image URL");
        return false;
    }
    if(!product.category){
        displayErrorMessage("Category required");
        return false;
    }
    if(!product.color){
        displayErrorMessage("Color required");
        return false;
    }
    if(product.rating<0.5||product.rating>5){
        displayErrorMessage("Rating must be between 0.5 and 5");
        return false;
    }
    if(product.price<=0){
        displayErrorMessage("Price must be more than 0");
        return false;
    }
    if(product.discount>=product.price||product.discount<0){
        displayErrorMessage("Discount Invalid");
        return false;
    }
    if(!product.description){
        displayErrorMessage("Description required");
        return false;
    }
    return true;
}

function isValidImageUrl(url){
    try{
        const imageUrl=new URL(url);
        return imageUrl.protocol==="http:"||imageUrl.protocol==="https:";
    }catch{
        return false;
    }
}

function createProduct(form){
    const formData=new FormData(form);
    return{
        name:formData.get("name"),
        image:formData.get("image"),
        category:formData.get("category"),
        color:formData.get("color"),
        rating:Number(formData.get("rating")),
        price:Number(formData.get("price")),
        discount:Number(formData.get("discount"))||0,
        description:formData.get("description")
    };
}

imageInput.addEventListener("input",()=>{
    const url=imageInput.value;
    if(url){
        imagePreview.src=url;
        imagePreview.classList.add("show");
    }else{
        imagePreview.classList.remove("show");
    }
});

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const success=await handleCreateProduct(form);
    if(success){
        window.location.href="index.html";
    }
});

loadProductForEdit();