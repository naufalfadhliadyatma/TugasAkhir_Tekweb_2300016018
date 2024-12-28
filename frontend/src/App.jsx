import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ManageProduct from "./pages/ManageProduct";
import UmkmPage from "./pages/UmkmPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/manage"
            element={<ManageProduct />} // Tidak perlu prop tambahan
          />
          <Route
            path="/umkm"
            element={<UmkmPage />} // Jika tidak menggunakan `products`, tidak perlu mengirim state
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
