// import React from "react";
import { useState } from "react"; // Import useState untuk state management
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ManageProduct from "./pages/ManageProduct";
import UmkmPage from "./pages/UmkmPage"; // Pastikan ini mengarah ke file UmkmPage yang benar

const App = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk

  // Fungsi untuk menambahkan produk baru ke dalam state
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: prevProducts.length + 1 }, // Menambahkan ID unik ke setiap produk
    ]);
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/manage"
            element={<ManageProduct onAddProduct={handleAddProduct} />} // Mengoper fungsi handleAddProduct ke ManageProduct
          />
          <Route
            path="/umkm"
            element={<UmkmPage products={products} />} // Mengoper data produk ke UmkmPage
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
