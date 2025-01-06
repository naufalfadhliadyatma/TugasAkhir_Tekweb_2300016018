// Mengimpor dependensi yang dibutuhkan dari React Router dan React
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Mengimpor gambar aset lokal untuk ditampilkan di navbar
import sriharjoImage from "../assets/sriharjo.png";

/**
 * Komponen Navbar
 * Komponen ini bertanggung jawab untuk menampilkan navigasi utama aplikasi,
 * termasuk tombol untuk perangkat kecil, navigasi utama, serta tema terang/gelap.
 */
const Navbar = () => {
  // State untuk menentukan apakah menu navigasi pada perangkat kecil sedang terbuka (toggle menu mobile)
  const [isOpen, setIsOpen] = useState(false);

  // State untuk menentukan mode terang atau gelap (Dark Mode)
  const [darkMode, setDarkMode] = useState(false);

  // State untuk background transparan saat scroll
  const [isScrolled, setIsScrolled] = useState(false);

  /**
   * Fungsi toggleDarkMode
   * Mengganti tema aplikasi antara Dark Mode dan Light Mode.
   * Juga menambahkan/menghapus kelas CSS 'dark-mode' pada elemen body.
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  /**
   * useEffect untuk menangani perubahan latar belakang saat halaman di-scroll.
   * Menambahkan event listener untuk mendeteksi posisi scroll dan
   * mengatur state `isScrolled` untuk memengaruhi tampilan navbar.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Struktur dan tampilan navbar.
   * Navbar memiliki dua mode tampilan utama:
   * 1. Untuk perangkat kecil (dengan toggle menu sidebar).
   * 2. Untuk perangkat besar (menu horizontal).
   */
  return (
    <nav
      className={`sticky top-0 text-white shadow-md z-50 transition-all duration-300 ${
        isScrolled ? "bg-opacity-30 backdrop-blur bg-amber-800" : "bg-amber-800"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Bagian logo dan deskripsi lokasi */}
        <div className="flex items-center space-x-3">
          <img
            src={sriharjoImage} // Menampilkan gambar Sriharjo
            alt="Sriharjo" // Teks alternatif untuk gambar
            className="w-12 h-12 rounded-full" // Styling gambar logo
          />
          <div>
            <h1 className="text-xl font-bold text-yellow-200">LokalMart</h1>
            <p className="font-poppins font-thin">Sriharjo Imogiri Bantul</p>
          </div>
        </div>

        {/* Tombol menu untuk perangkat kecil */}
        <button
          className="text-white md:hidden" // Tombol hanya muncul di perangkat kecil
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-2xl">
            <i className="ri-menu-fold-4-fill"></i>
          </p>
        </button>

        {/* Daftar tautan navigasi dalam sidebar untuk perangkat kecil */}
        <div
          className={`fixed top-0 left-0 h-full bg-amber-800 text-white shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col h-full p-6 space-y-4">
            {/* Tombol close menu */}
            <button
              className="text-right text-white"
              onClick={() => setIsOpen(false)}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Tautan navigasi */}
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/manage"
              className="block px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
              onClick={() => setIsOpen(false)}
            >
              Form Products
            </Link>
            <Link
              to="/umkm"
              className="block px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
              onClick={() => setIsOpen(false)}
            >
              UMKM
            </Link>
            {/* Tombol untuk mengganti tema */}
            <button
              onClick={() => {
                toggleDarkMode();
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <i className="ri-sun-line"></i> : <i className="ri-moon-line"></i>}
            </button>
          </div>
        </div>

        {/* Daftar tautan navigasi untuk perangkat besar */}
        <div className="hidden md:flex md:items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
          >
            Home
          </Link>
          <Link
            to="/manage"
            className="px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
          >
            Form Products
          </Link>
          <Link
            to="/umkm"
            className="px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
          >
            UMKM
          </Link>
          {/* Tombol untuk mengganti tema */}
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-white hover:text-yellow-400 font-poppins font-thin"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <i className="ri-sun-line"></i> : <i className="ri-moon-line"></i>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
