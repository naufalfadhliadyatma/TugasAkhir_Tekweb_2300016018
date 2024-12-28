import { useState, useEffect } from "react";

const Umkm = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

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

  const handleEdit = (product) => {
    setEditProduct({ ...product }); // Memulai mode edit dengan data produk yang dipilih
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/items/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: editProduct.judul,
          harga_barang: parseFloat(editProduct.harga_barang),
          deskripsi: editProduct.deskripsi,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Perbarui state produk secara lokal setelah berhasil disimpan
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id ? editProduct : product
        )
      );
      setEditProduct(null); // Keluar dari mode edit
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Daftar UMKM Kalurahan Sriharjo
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) =>
          editProduct && editProduct.id === product.id ? (
            <div
              key={product.id}
              className="w-[300px] bg-white shadow-md rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold text-center font-poppins">
                Edit Produk
              </h3>
              <input
                type="text"
                name="judul"
                value={editProduct.judul}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Nama UMKM"
              />
              <input
                type="number"
                name="harga_barang"
                value={editProduct.harga_barang}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Harga"
              />
              <textarea
                name="deskripsi"
                value={editProduct.deskripsi}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Deskripsi UMKM"
              ></textarea>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mt-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              key={product.id}
              className="w-[300px] bg-white shadow-md rounded-xl p-4 transform hover:scale-105 transition-transform"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:3000/items/${product.id}/photo`}
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
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 mt-2 ml-2"
              >
                Hapus
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Umkm;
