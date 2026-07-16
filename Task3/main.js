//DOM Elements
const priceValue = document.getElementById("priceValue");
const priceInput= document.getElementById("price");
const selectSort = document.getElementById("sort");
const filterForm = document.getElementById("applyFilter");
const productModal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

//UI
function createProduct(product){
        const section = document.createElement("section");
        section.className = "product";
        const button = document.createElement("button");
        section.dataset.productId = product.id;
        button.className = "love-btn";
        button.type="button";
        button.ariaLabel="Add to wishlist";
        const loveIcon=document.createElement("i");
        loveIcon.className="fa-regular fa-heart"
        button.appendChild(loveIcon);
        if(product.discount>0){
            const discount = document.createElement("p");
            discount.className = "sale"
            discount.textContent = `-${product.discount}$`
            section.appendChild(discount);
        }
        const image = document.createElement("img");
        image.src=`${product.image}`;
        image.alt=`${product.name} image`;
        const information = document.createElement("div");
        information.className = "information";
        const category = document.createElement("p");
        category.className= "category";
        category.textContent=`${product.category}`;
        const name = document.createElement("h3");
        name.textContent = `${product.name}`;
        const rating = document.createElement("div");
        rating.className="rating";
        rating.appendChild(renderStars(product.rating));
        const ratingNumber= document.createElement("p");
        ratingNumber.textContent=`(${product.rating})`;
        rating.appendChild(ratingNumber);
        const price = document.createElement("div");
        price.className="price";
        const priceNumber=document.createElement("p");
        priceNumber.textContent=`${(product.price - product.discount).toFixed(2)}`;
        price.appendChild(priceNumber);
        const addToCart= document.createElement("button");
        addToCart.type="button";
        addToCart.ariaLabel="Add to cart";
        const cartIcon= document.createElement("i");
        cartIcon.className="fa-solid fa-cart-shopping";
        addToCart.appendChild(cartIcon);
        price.appendChild(addToCart);
        information.append(
            category,
            name,
            rating,
            price);
        section.append(button,image,information);
        return section;
}
function renderProducts(products){
    const productCards = document.getElementById("productCards");
    const fragment = document.createDocumentFragment();
    for (const product of products) {
        fragment.appendChild(createProduct(product));
    }
    productCards.replaceChildren(fragment);
}
function renderStars(rating){
    const stars = document.createElement("div");
    stars.className="stars";
    for(let i=1;i<=5;i++){
        const starIcon = document.createElement("i");
        if(rating >= i){
            starIcon.className="fa-solid fa-star";
        }else if(rating >= i - 0.5){
            starIcon.className="fa-solid fa-star-half-stroke";
        }else{
            starIcon.className="fa-regular fa-star";
        }
        stars.appendChild(starIcon);
    }
    return stars;
}

function openModal(product){
    const fragment = document.createDocumentFragment();
    const container = document.createElement("div");
    container.className = "modal-product";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    const info = document.createElement("div");
    info.className = "modal-info";
    const name = document.createElement("h2");
    name.textContent = product.name;
    const category = document.createElement("p");
    category.className = "modal-category";
    category.textContent = product.category;
    const rating = document.createElement("div");
    rating.className = "rating";
    rating.appendChild(renderStars(product.rating));
    const ratingNumber = document.createElement("p");
    ratingNumber.textContent = `(${product.rating})`;
    rating.appendChild(ratingNumber);
    const price = document.createElement("p");
    price.className = "modal-price";
    price.textContent =
        `$${(product.price - product.discount).toFixed(2)}`;
    const description = document.createElement("p");
    description.className = "modal-description";
    description.textContent = product.description;
    const color = document.createElement("p");
    color.textContent = `Color: ${product.color}`;
    const cartButton = document.createElement("button");
    cartButton.className = "add-cart-btn";
    cartButton.textContent = "Add To Cart";
    info.append(
        name,
        category,
        rating,
        price,
        color,
        description,
        cartButton
    );
    container.append(
        image,
        info
    );
    fragment.appendChild(container);
    modalBody.replaceChildren(fragment);
    productModal.classList.add("show");
}


//logic
function getStateFromURL(){
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.getAll("category"),
        color: params.get("color")?? "",
        rating: params.get("rating") ? Number(params.get("rating")) : null,
        price: params.get("price") ? Number(params.get("price")) : 500,
        sort: params.get("sort") ?? "newest"
    };
}
function updateURL(state) {
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("color");
    url.searchParams.delete("rating");
    url.searchParams.delete("price");
    url.searchParams.delete("sort");
    state.category.forEach(category => {
        url.searchParams.append("category", category.toLowerCase());
    });
    if (state.color) {
        url.searchParams.set("color", state.color);
    }
    if (state.rating !== null) {
        url.searchParams.set("rating", state.rating);
    }
    if (state.price !== null) {
        url.searchParams.set("price", state.price);
    }
    if (state.sort) {
        url.searchParams.set("sort", state.sort);
    }
    history.replaceState(null,"",url);
}

function processProducts(products, state){
    let result = [...products];
    result = filterProducts(result,state)
    result = sortProducts(result,state.sort)
    return result;
}
function filterProducts(result,state){
    if(state.category.length>0){
        result = result.filter((product)=>{
            return state.category.includes(product.category.toLowerCase());
        });
    }
    if(state.color){
        result = result.filter((product)=>{
            return product.color.toLowerCase() === state.color.toLowerCase();
        });
    }
    if(state.rating !== null){
        result = result.filter((product)=>{
            return product.rating >= state.rating;
        });
    }
    if(state.price !== null){
    result = result.filter((product)=>{
        const finalPrice = product.price - product.discount;
        return finalPrice <= state.price;
    });
    }
    return result;
}
function sortProducts(result,sortBy){
    if (sortBy === "lowPrice") {
        result.sort((a, b) => (a.price - a.discount) - (b.price - b.discount));
    }

    if (sortBy === "highPrice") {
        result.sort((a, b) => (b.price - b.discount) - (a.price - a.discount));
    }

    if (sortBy === "rating") {
        result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "category") {
        result.sort((a, b) => a.category.localeCompare(b.category));
    }
    return result;
}
function syncFormWithState(state){
    document.querySelectorAll(".categories input[type='checkbox']").forEach(input => {
        input.checked = state.category.includes(input.value);
    });
    document.querySelectorAll(".colors input[name='colors']").forEach(input => {
        input.checked = input.value === state.color;
    });
    document.querySelectorAll(".rating input[name='rating']").forEach(input => {
        input.checked = Number(input.value) === state.rating;
    });
    if (state.price !== null) {
        priceInput.value = state.price;
        priceValue.textContent = `Value: $${state.price}`;
    }
    selectSort.value = state.sort;
}
function refreshProducts() {
    getProducts((products) => {
        const result = processProducts(products, state);
        renderProducts(result);
    });
}

//State
const state = getStateFromURL();

//Events
selectSort.addEventListener("change",(e)=>{
    state.sort = e.target.value;
    updateURL(state);
    refreshProducts();
});
document.addEventListener("click", (e) => {
    if(e.target.closest(".love-btn")){
        e.target.closest(".love-btn").classList.toggle("clicked");
    }
});
priceInput.addEventListener("input",()=>{
    priceValue.textContent = `value: $${priceInput.value}`;
});
filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedCategories = [
        ...document.querySelectorAll(".categories input[type='checkbox']:checked")
    ].map(input => input.value);
    const selectedColor = document.querySelector(
        ".colors input[name='colors']:checked"
    )?.value || "";
    const selectedRating = document.querySelector(
        ".rating input[name='rating']:checked"
    )?.value;
    const selectedPrice = document.getElementById("price").value;
    state.category = selectedCategories;
    state.color = selectedColor;
    state.rating = selectedRating ? Number(selectedRating) : null;
    state.price = selectedPrice ? Number(selectedPrice) : null;
    updateURL(state);
    refreshProducts();
});
document.addEventListener("click",(e)=>{
    const card = e.target.closest(".product");
    if(card && !e.target.closest("button")){
        const id = Number(card.dataset.productId);
        getProducts(products=>{
        const product = products.find(p=>p.id === id);
        openModal(product);
    });
}

});
closeModal.addEventListener("click",()=>{
    productModal.classList.remove("show");
});
//Init
syncFormWithState(state);
refreshProducts();