const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "https://placehold.co/300x200",
    category: "Electronics",
    color: "Black",
    rating: 4.5,
    price: 129.99,
    discount: 20,
    description: "High quality wireless headphones with clear sound, comfortable design, and long battery life."
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "https://placehold.co/300x200",
    category: "Electronics",
    color: "Blue",
    rating: 5,
    price: 249.99,
    discount: 30,
    description: "A modern smart watch with fitness tracking features, notifications, and a stylish design."
  },
  {
    id: 3,
    name: "Gaming Mouse",
    image: "https://placehold.co/300x200",
    category: "Electronics",
    color: "Red",
    rating: 2,
    price: 59.99,
    discount: 10,
    description: "Ergonomic gaming mouse designed for precise control and comfortable long gaming sessions."
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    image: "https://placehold.co/300x200",
    category: "Electronics",
    color: "green",
    rating: 3.5,
    price: 149.99,
    discount: 25,
    description: "Portable Bluetooth speaker with powerful sound quality and easy wireless connectivity."
  },
  {
    id: 5,
    name: "Running Shoes",
    image: "https://placehold.co/300x200",
    category: "Clothing",
    color: "green",
    rating: 4.5,
    price: 119.99,
    discount: 0,
    description: "Comfortable running shoes with lightweight materials and excellent support for daily activities."
  },
  {
    id: 6,
    name: "Denim Jacket",
    image: "https://placehold.co/300x200",
    category: "Clothing",
    color: "blue",
    rating: 4,
    price: 89.99,
    discount: 20,
    description: "Classic denim jacket with a modern style, suitable for casual everyday outfits."
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    image: "https://placehold.co/300x200",
    category: "Clothing",
    color: "green",
    rating: 3,
    price: 29.99,
    discount: 5,
    description: "Soft cotton t-shirt with a comfortable fit and simple casual design."
  },
  {
    id: 8,
    name: "Leather Wallet",
    image: "https://placehold.co/300x200",
    category: "Accessories",
    color: "Blue",
    rating: 4.5,
    price: 49.99,
    discount: 0,
    description: "Premium leather wallet with a compact design and multiple storage compartments."
  },
  {
    id: 9,
    name: "Travel Backpack",
    image: "https://placehold.co/300x200",
    category: "Accessories",
    color: "Black",
    rating: 3,
    price: 99.99,
    discount: 20,
    description: "Durable travel backpack with spacious compartments for carrying personal belongings."
  },
  {
    id: 10,
    name: "Sunglasses",
    image: "https://placehold.co/300x200",
    category: "Accessories",
    color: "Black",
    rating: 3.5,
    price: 39.99,
    discount: 8,
    description: "Stylish sunglasses with a lightweight frame and comfortable fit for daily use."
  }
];

function getProducts(callback){
    callback([...products]);
}