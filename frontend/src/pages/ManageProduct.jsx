import PropTypes from "prop-types";
import { useState } from "react";

const ManageProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    judul: "",
    harga_barang: "",
    deskripsi: "",
  });
  const [productImage, setProductImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("judul", formData.judul);
    formDataToSend.append("harga_barang", parseFloat(formData.harga_barang));
    formDataToSend.append("deskripsi", formData.deskripsi);
    if (productImage) {
      formDataToSend.append("foto_barang", productImage);
    }

    try {
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      const savedProduct = await response.json();
      console.log("Produk berhasil disimpan:", savedProduct);
      onProductAdded(savedProduct);
      setFormData({ judul: "", harga_barang: "", deskripsi: "" }); // Reset form
      setProductImage(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 p-6 rounded shadow-md w-[500px]"
      >
        <h2 className="text-xl font-bold mb-4 text-center font-poppins">
          Tambah Produk UMKM
        </h2>
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
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
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
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
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
            className="mt-1 p-2 border rounded w-full"
            rows="3"
            required
          ></textarea>
        </div>
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
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-poppins"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

ManageProduct.propTypes = {
  onProductAdded: PropTypes.func.isRequired,
};

export default ManageProduct;