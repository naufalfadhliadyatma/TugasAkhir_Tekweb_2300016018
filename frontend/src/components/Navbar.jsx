import { Link } from "react-router-dom";
import { useState } from "react";
import sriharjoImage from "../assets/sriharjo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    // fixed top-0 left-0 w-full z-50
    <nav className="bg-gray-700 text-white shadow-md ">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          {/* Bagian gambar sriharjo.png */}
          <img
            src={sriharjoImage}
            alt="Sriharjo"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold text-amber-300 opacity-95">LokalMart</h1>
            <p className="font-poppins font-thin">Sriharjo Imogiri Bantul</p>
          </div>
        </div>
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            <Link
              to="/"
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
            >
              Home
            </Link>
            <Link
              to="/manage"
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
            >
              Form Products
            </Link>
            <Link
              to="/umkm"
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
            >
              Umkm
            </Link>
            <button
              onClick={toggleDarkMode}
              className="block md:inline-block px-4 py-2 text-white hover:text-cyan-100 font-poppins font-thin"
              aria-label="Toggle Dark Mode"
            >
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

export default Navbar;


