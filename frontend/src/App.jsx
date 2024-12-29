// Import library dan komponen utama
// - "react-router-dom" untuk navigasi dan pengelolaan route aplikasi.
// - Komponen Navbar, Home, ProductDetail, ManageProduct, dan UmkmPage digunakan sesuai kebutuhan halaman.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Komponen navigasi utama di bagian atas halaman.
import Home from "./pages/Home"; // Halaman utama (home page).
import ProductDetail from "./pages/ProductDetail"; // Halaman detail produk berdasarkan ID.
import ManageProduct from "./pages/ManageProduct"; // Halaman untuk menambah produk UMKM.
import UmkmPage from "./pages/UmkmPage"; // Halaman untuk daftar produk UMKM.

const App = () => {
  return (
    // Router untuk mengatur navigasi berbasis URL.
    <Router>
      {/* Navbar muncul di semua halaman */}
      <Navbar />
      <div className="container mx-auto">
        {/* Routes digunakan untuk mendefinisikan jalur URL aplikasi */}
        <Routes>
          {/* Route utama (Home): menampilkan halaman utama */}
          <Route path="/" element={<Home />} />

          {/* Route detail produk: menampilkan detail produk berdasarkan ID */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Route pengelolaan produk: form untuk menambah atau mengelola produk */}
          <Route path="/manage" element={<ManageProduct />} />

          {/* Route daftar UMKM: menampilkan daftar produk dari UMKM */}
          <Route path="/umkm" element={<UmkmPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
