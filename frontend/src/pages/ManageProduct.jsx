import { useState } from "react";

const ManageProduct = () => {
  // State untuk menyimpan data form input (judul, harga_barang, dan deskripsi)
  const [formData, setFormData] = useState({
    judul: "",
    harga_barang: "",
    deskripsi: "",
  });

  // State untuk menyimpan file gambar produk yang dipilih
  const [productImage, setProductImage] = useState(null);

  /**
   * Mengupdate state formData berdasarkan input pengguna.
   * @param {Event} e - Event perubahan input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Mengupdate state productImage dengan file yang dipilih dari input file.
   * @param {Event} e - Event perubahan file input
   */
  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  /**
   * Mengirim data produk baru ke backend melalui HTTP POST.
   * @param {Event} e - Event submit form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat FormData untuk mengirim data produk bersama gambar
    const formDataToSend = new FormData();
    formDataToSend.append("judul", formData.judul);
    formDataToSend.append("harga_barang", parseFloat(formData.harga_barang)); // Konversi harga ke tipe angka
    formDataToSend.append("deskripsi", formData.deskripsi);
    if (productImage) {
      formDataToSend.append("foto_barang", productImage);
    }

    try {
      // Mengirim permintaan POST ke backend dengan FormData
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        body: formDataToSend,
      });

      // Validasi respon dari server
      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      const savedProduct = await response.json();
      console.log("Produk berhasil disimpan:", savedProduct);

      // Reset form setelah berhasil submit
      setFormData({ judul: "", harga_barang: "", deskripsi: "" });
      setProductImage(null);
      alert("Produk berhasil ditambahkan!");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Gagal menambahkan produk. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-400 to-amber-200 min-h-screen flex justify-center items-center pb-14">
      {/* Form untuk menambahkan produk UMKM */}
      <form
        onSubmit={handleSubmit}
        className="bg-amber-100 p-6 rounded-2xl shadow-md w-[500px]"
      >
        <h2 className="text-xl font-bold mb-4 text-center font-poppins text-amber-800">
          Tambah Produk UMKM
        </h2>

        {/* Input untuk nama produk */}
        <div className="mb-4">
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700 font-poppins"
          >
            Nama UMKM
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full bg-amber-50"
            required
          />
        </div>

        {/* Input untuk harga produk */}
        <div className="mb-4">
          <label
            htmlFor="harga_barang"
            className="block text-sm font-medium text-gray-700 font-poppins"
          >
            Harga UMKM
          </label>
          <input
            type="number"
            id="harga_barang"
            name="harga_barang"
            value={formData.harga_barang}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full bg-amber-50"
            required
          />
        </div>

        {/* Input untuk deskripsi produk */}
        <div className="mb-4">
          <label
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-700 font-poppins"
          >
            Deskripsi UMKM
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full bg-amber-50"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Input untuk upload foto produk */}
        <div className="mb-4">
          <label
            htmlFor="foto_barang"
            className="block text-sm font-medium text-gray-700 font-poppins"
          >
            Foto Produk (150x150 px)
          </label>
          <input
            type="file"
            id="foto_barang"
            name="foto_barang"
            accept="image/*" //untuk menerima foto saja
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {/* Tombol submit untuk menambah produk */}
        <button
          type="submit"
          className="bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-400 w-full font-poppins"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default ManageProduct;
