// Mengimpor hook useState dan useEffect dari React untuk mengelola state dan efek samping
import { useState, useEffect } from "react";

// Komponen utama untuk halaman UMKM
const Umkm = () => {
  // State untuk menyimpan daftar produk yang diperoleh dari server
  const [products, setProducts] = useState([]);
  // State untuk menentukan produk yang sedang dalam mode edit
  const [editProduct, setEditProduct] = useState(null);

  // Mengambil data produk dari server menggunakan efek samping setelah komponen dirender
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/items"); // Endpoint data produk
        const data = await response.json(); // Parsing data dalam format JSON
        setProducts(data); // Menyimpan data ke state produk
      } catch (error) {
        console.error("Error fetching products:", error); // Menangani error ketika fetch gagal
      }
    };

    fetchProducts();
  }, []); // Efek hanya berjalan sekali saat komponen pertama kali dimuat

  // Menghapus produk dari server berdasarkan ID
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" }); // Permintaan DELETE ke server
      setProducts(products.filter((product) => product.id !== id)); // Memperbarui daftar produk secara lokal
    } catch (error) {
      console.error("Error deleting product:", error); // Menangani error saat gagal menghapus
    }
  };

  // Memulai mode edit dengan menyimpan data produk ke state editProduct
  const handleEdit = (product) => {
    setEditProduct({ ...product }); //clone product
  };

  // Mengelola perubahan input pada mode edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev, // Menjaga data sebelumnya
      [name]: value, // Memperbarui field yang diubah
    }));
  };

  // Menyimpan perubahan produk ke server menggunakan metode PUT
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/items/${editProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            judul: editProduct.judul, // Nama UMKM
            harga_barang: parseFloat(editProduct.harga_barang), // Harga dalam format angka
            deskripsi: editProduct.deskripsi, // Deskripsi produk
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Mengupdate produk secara lokal setelah berhasil disimpan ke server
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id ? editProduct : product
        )
      );
      setEditProduct(null); // Keluar dari mode edit setelah selesai
    } catch (error) {
      console.error("Error saving product:", error); // Menangani error saat gagal menyimpan
    }
  };

  return (
    <div className="bg-amber-100 min-h-screen pt-9">
      {/* Header halaman */}
      <h1 className="text-3xl font-bold text-center mb-6 font-montserrat">
        Daftar UMKM Kalurahan Sriharjo
      </h1>

      {/* Daftar produk UMKM */}
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) =>
          // Tampilan mode edit untuk produk tertentu
          editProduct && editProduct.id === product.id ? (
            <div
              key={product.id}
              className="w-[300px] bg-slate-100 shadow-md rounded-xl p-4"            >
              <h3 className="text-lg font-semibold text-center font-poppins text-zinc-800 ">
                Edit Produk
              </h3>
              {/* Input untuk mengedit nama UMKM */}
              <input
                type="text"
                name="judul"
                value={editProduct.judul}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full text-gray-800"
                placeholder="Nama UMKM"
              />
              {/* Input untuk mengedit harga produk */}
              <input
                type="number"
                name="harga_barang"
                value={editProduct.harga_barang}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full text-gray-800"
                placeholder="Harga"
              />
              {/* Textarea untuk mengedit deskripsi produk */}
              <textarea
                name="deskripsi"
                value={editProduct.deskripsi}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full text-gray-800"
                placeholder="Deskripsi UMKM"
              ></textarea>
              {/* Tombol untuk menyimpan perubahan */}
              <button
                onClick={handleSave}
                className="bg-amber-500 text-white py-1 px-4 rounded hover:bg-amber-600 mt-2 font-poppins"
              >
                Save
              </button>
              {/* Tombol untuk membatalkan edit */}
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 mt-2 ml-2 font-poppins"
              >
                Cancel
              </button>
            </div>
          ) : (
            // Tampilan biasa untuk daftar produk
            <div
              key={product.id}
              className="w-[300px] bg-gradient-to-b from-zinc-100 to-amber-100 shadow-md rounded-xl p-4 transform  transition-transform"
            >
              {/* hover:scale-105 --> kode class diatas bagian card jika ingin hover */}
              {/* Gambar produk */}
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:3000/items/${product.id}/photo`}
                  alt={product.judul}
                  className="w-[150px] h-[150px] object-cover rounded"
                />
              </div>
              {/* Informasi produk */}
              <h3 className="text-lg font-semibold text-center font-poppins text-zinc-800">
                {product.judul}
              </h3>
              <p className="text-center text-red-800 text-lg">
                Rp {product.harga_barang.toLocaleString("id-ID")}
              </p>
              <p className="text-gray-600 mt-2 text-center">
                {product.deskripsi}
              </p>
              {/* Tombol untuk mengedit produk */}
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 mt-2 font-poppins"
              >
                Edit
              </button>
              {/* Tombol untuk menghapus produk */}
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 mt-2 ml-2 font-poppins"
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

export default Umkm; // Mengekspor komponen untuk digunakan di file lain
