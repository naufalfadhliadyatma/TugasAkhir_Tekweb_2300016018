import React, { useState, useEffect } from "react";

const Umkm = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Daftar UMKM</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-[300px] bg-white shadow-md rounded p-4 transform hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/150" // Placeholder gambar
                alt={product.name}
                className="w-[150px] h-[150px] object-cover rounded"
              />
            </div>
            <h3 className="text-lg font-bold text-center">{product.name}</h3>
            <p className="text-center text-blue-600 text-lg">
              Rp {parseInt(product.price).toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 mt-2 text-center">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Umkm;
