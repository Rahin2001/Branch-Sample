// A simple TypeScript example

// 1. Type annotation
let username: string = "Rahin";
let age: number = 22;

// 2. Function with types
function greet(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old!`;
}

// 3. Interface example
interface User {
    id: number;
    name: string;
    isAdmin: boolean;
}

// 4. Object with interface
const user: User = {
    id: 1,
    name: "Rahin",
    isAdmin: false
};

// 5. Calling the function
console.log(greet(username, age));
console.log("User Info:", user);
// ==========================
// FRONTEND JS SAMPLE (LONG)
// ==========================

// API URL
const API = "https://fakestoreapi.com/products";

// HTML Selectors
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cartCount = document.getElementById("cart-count");

// Cart array
let cart = [];

// ===========================
// Fetch Products from API
// ===========================
async function fetchProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    displayProducts(data);
  } catch (err) {
    console.error("API Error:", err);
  }
}

// ===========================
// Display Products in UI
// ===========================
function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.title}', ${p.price})">
        Add to Cart
      </button>
    `;

    productList.appendChild(div);
  });
}

// ===========================
// Add Items to Cart
// ===========================
function addToCart(id, title, price) {
  cart.push({ id, title, price });
  updateCart();
}

// ===========================
// Update Cart UI
// ===========================
function updateCart() {
  cartList.innerHTML = "";
  cartCount.textContent = cart.length;

  cart.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${c.title} - ₹${c.price}
      <button onclick="removeFromCart(${i})">Remove</button>
    `;
    cartList.appendChild(li);
  });
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// ===========================
// Search Functionality
// ===========================
searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();

  const items = document.querySelectorAll(".product-card h3");

  items.forEach((title) => {
    const card = title.parentElement;
    card.style.display = title.textContent.toLowerCase().includes(text)
      ? "block"
      : "none";
  });
});

// ===========================
// Sort Functionality
// ===========================
sortSelect.addEventListener("change", () => {
  let products = [...productList.children];

  if (sortSelect.value === "low-high") {
    products.sort(
      (a, b) =>
        parseFloat(a.querySelector("p").textContent.replace("₹", "")) -
        parseFloat(b.querySelector("p").textContent.replace("₹", ""))
    );
  } else if (sortSelect.value === "high-low") {
    products.sort(
      (a, b) =>
        parseFloat(b.querySelector("p").textContent.replace("₹", "")) -
        parseFloat(a.querySelector("p").textContent.replace("₹", ""))
    );
  }

  productList.innerHTML = "";
  products.forEach((p) => productList.appendChild(p));
});

// Initial call
fetchProducts();
