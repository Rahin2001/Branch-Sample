// ===============================
// Simple Express Server (Node.js)
// ===============================

// Import packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Create an Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// In-memory database (temporary)
let users = [];
let products = [];

// ===============================
// Reusable Helper Functions
// ===============================

// Generate random ID
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

// Check if email already exists
function emailExists(email) {
  return users.some((u) => u.email === email);
}

// Response generator
function sendResponse(res, success, message, data = null) {
  res.json({ success, message, data });
}

// ===============================
// ROUTES
// ===============================

// Home route
app.get("/", (req, res) => {
  sendResponse(res, true, "Welcome to Node.js API!");
});

// Register user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return sendResponse(res, false, "All fields required");

  if (emailExists(email))
    return sendResponse(res, false, "Email already exists");

  const newUser = { id: generateId(), name, email, password };
  users.push(newUser);

  sendResponse(res, true, "User registered successfully", newUser);
});

// Login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return sendResponse(res, false, "Invalid credentials");

  sendResponse(res, true, "Login successful", user);
});

// Add product
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price)
    return sendResponse(res, false, "Name and price required");

  const newProduct = { id: generateId(), name, price };
  products.push(newProduct);

  sendResponse(res, true, "Product added", newProduct);
});

// Get all products
app.get("/products", (req, res) => {
  sendResponse(res, true, "All products", products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) return sendResponse(res, false, "Product not found");

  sendResponse(res, true, "Product details", product);
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  sendResponse(res, true, "Product deleted");
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
