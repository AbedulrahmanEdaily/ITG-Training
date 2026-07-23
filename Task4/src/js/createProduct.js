import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase.js";

// DOM Elements
const form = document.getElementById("createProductForm");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("previewImage");


async function handleCreateProduct(form) {
    const product = createProduct(form);
    if (!validateProduct(product)) {
        return false;
    }
    const store = await storeProduct(product);
    if (!store) {
        return false;
    }
    return true;
}


async function storeProduct(product) {
    try {
        await addDoc(collection(db, "products"), {
            name: product.name,
            image: product.image,
            category: product.category,
            color: product.color,
            rating: product.rating,
            price: product.price,
            discount: product.discount,
            description: product.description,
        });
        return true;
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}


function displayErrorMessage(message) {
    const parent = document.querySelector(".image-preview");
    parent.querySelector(".error")?.remove();
    const errorMessage = document.createElement("p");
    errorMessage.className = "error";
    errorMessage.textContent = message;
    parent.appendChild(errorMessage);
}

function validateProduct(product) {
    if (!product.name) {
        displayErrorMessage("Name required");
        return false;
    }
    if (!product.image) {
        displayErrorMessage("Image URL required");
        return false;
    }
    if (!isValidImageUrl(product.image)) {
        displayErrorMessage("Invalid image URL");
        return false;
    }
    if (!product.category) {
        displayErrorMessage("Category required");
        return false;
    }
    if (!product.color) {
        displayErrorMessage("Color required");
        return false;
    }
    if (product.rating < 0.5 || product.rating > 5) {
        displayErrorMessage("Rating must be between 0.5 and 5");
        return false;
    }
    if (product.price <= 0) {
        displayErrorMessage("Price must be more than 0");
        return false;
    }
    if (product.discount >= product.price || product.discount < 0) {
        displayErrorMessage("Discount Invalid");
        return false;
    }
    if (!product.description) {
        displayErrorMessage("Description required");
        return false;
    }
    return true;
}

function isValidImageUrl(url) {
    try {
        const imageUrl = new URL(url);
        return (
            imageUrl.protocol === "http:" ||
            imageUrl.protocol === "https:"
        );
    } catch {
        return false;
    }

}

function createProduct(form) {
    const formData = new FormData(form);
    return {
        name: formData.get("name"),
        image: formData.get("image"),
        category: formData.get("category"),
        color: formData.get("color"),
        rating: Number(formData.get("rating")),
        price: Number(formData.get("price")),
        discount: Number(formData.get("discount")) || 0,
        description: formData.get("description")
    };
}

// Image Preview
imageInput.addEventListener("input", () => {
    const url = imageInput.value;
    if (url) {
        imagePreview.src = url;
        imagePreview.classList.add("show");
    } else {
        imagePreview.classList.remove("show");
    }
});

// Submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const success = await handleCreateProduct(form);
    if (success) {
        window.location.href = "index.html"
    }
});