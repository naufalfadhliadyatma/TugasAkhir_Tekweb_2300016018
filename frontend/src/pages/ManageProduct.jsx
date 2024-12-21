import PropTypes from "prop-types";
import { useState } from "react";

const ManageProduct = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
    };
    onAddProduct(newProduct); // Mengirim data produk baru ke App.jsx
    setFormData({ name: "", price: "", description: "" }); // Reset form
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 p-6 rounded shadow-md w-[500px]"
      >
        <h2 className="text-xl font-bold mb-4 text-center font-poppins">Tambah Produk UMKM</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-poppins">
            Nama UMKM
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 font-poppins">
            Harga UMKM
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 font-poppins">
            Deskripsi UMKM
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            rows="3"
            required
          ></textarea>
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

// Menambahkan prop-types untuk validasi props
ManageProduct.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default ManageProduct;
