import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

const Umkm = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/items");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Daftar UMKM Kalurahan Sriharjo
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[300px] bg-white shadow-md rounded-xl p-4 transform hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-4">
              <img
                src={product.foto_barang}
                alt={product.judul}
                className="w-[150px] h-[150px] object-cover rounded"
              />
            </div>
            <h3 className="text-lg font-semibold text-center font-poppins">
              {product.judul}
            </h3>
            <p className="text-center text-red-800 text-lg">
              Rp {product.harga_barang.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 mt-2 text-center">
              {product.deskripsi}
            </p>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 mt-2"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Umkm;
