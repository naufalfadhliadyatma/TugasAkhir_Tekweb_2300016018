const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for products
let products = [];

// Endpoint untuk menambahkan produk
app.post("/add-product", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({ message: "Product added successfully!", product: newProduct });
});

// Endpoint untuk mendapatkan daftar produk
app.get("/products", (req, res) => {
  res.status(200).json(products);
}); 

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
