// Mengimpor dependensi yang dibutuhkan dari React Router dan React
import { Link } from "react-router-dom";
import { useState } from "react";

// Mengimpor gambar aset lokal untuk ditampilkan di navbar
import sriharjoImage from "../assets/sriharjo.png";

// Komponen Navbar untuk menampilkan navigasi utama aplikasi
const Navbar = () => {
  // State untuk menentukan apakah menu navigasi pada perangkat kecil sedang terbuka (toggle menu mobile)
  const [isOpen, setIsOpen] = useState(false);

  // State untuk menentukan mode terang atau gelap (Dark Mode)
  const [darkMode, setDarkMode] = useState(false);

  // Fungsi untuk mengganti tema aplikasi antara Dark Mode dan Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Mengubah state darkMode
    document.body.classList.toggle("dark-mode"); // Menambahkan atau menghapus kelas 'dark-mode' di elemen body
  };

  // Struktur dan tampilan navbar
  return (
    <nav className="bg-gray-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Bagian logo dan deskripsi lokasi */}
        <div className="flex items-center space-x-3">
          <img
            src={sriharjoImage} // Menampilkan gambar Sriharjo
            alt="Sriharjo" // Teks alternatif gambar
            className="w-12 h-12 rounded-full" // Styling gambar
          />
          <div>
            {/* Judul aplikasi */}
            <h1 className="text-xl font-bold text-amber-200">
              LokalMart
            </h1>
            {/* Deskripsi lokasi */}
            <p className="font-poppins font-thin">Sriharjo Imogiri Bantul</p>
          </div>
        </div>

        {/* Tombol menu untuk perangkat kecil */}
        <button
          className="text-white md:hidden" // Hanya muncul pada perangkat kecil
          onClick={() => setIsOpen(!isOpen)} // Mengatur state untuk membuka/menutup menu
        >
          {/* Ikon menu dalam format SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7" // Garis horizontal menu
            />
          </svg>
        </button>

        {/* Daftar tautan navigasi */}
        <div
          className={`${
            isOpen ? "block" : "hidden" // Tampil atau sembunyikan menu berdasarkan state isOpen
          } md:flex md:items-center w-full md:w-auto`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Tautan ke halaman utama */}
            <Link
              to="/" // Rute ke halaman Home
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
            >
              Home
            </Link>
            {/* Tautan ke halaman Form Products */}
            <Link
              to="/manage" // Rute ke halaman Form Products
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
            >
              Form Products
            </Link>
            {/* Tautan ke halaman UMKM */}
            <Link
              to="/umkm" // Rute ke halaman UMKM
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
            >
              Umkm
            </Link>
            {/* Tombol untuk mengganti tema aplikasi (Dark Mode / Light Mode) */}
            <button
              onClick={toggleDarkMode} // Fungsi untuk mengganti tema
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
              aria-label="Toggle Dark Mode" // Deskripsi untuk aksesibilitas
            >
              {/* Menampilkan ikon matahari untuk Light Mode dan ikon bulan untuk Dark Mode */}
              {darkMode ? (
                <i className="ri-sun-line"></i>
              ) : (
                <i className="ri-moon-line"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // Mengekspor komponen untuk digunakan di file lain
