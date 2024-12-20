import { useState, useEffect } from "react";

import WedangUwuh from "../assets/wedanguwuh.png";
import Rempeyek from "../assets/rempeyek.png";
import KeripikTempe from "../assets/tempe.png";
import BatikTulis from "../assets/batiktulis.png";
import MieAyam from "../assets/mieayam.png";
import KerajinanKayu from "../assets/kerajinankayu.png";
import TehHerbal from "../assets/tehherbal.png";
import TasAnyaman from "../assets/tas-anyaman.png";


const Home = () => {
  const [products, setProducts] = useState([]);

  // Contoh data produk
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        name: "Wedang Uwuh",
        price: 15000,
        description: "Minuman tradisional khas Imogiri",
        image: WedangUwuh,
      },
      {
        id: 2,
        name: "Rempeyek",
        price: 10000,
        description: "Camilan tradisional renyah",
        image: Rempeyek,
      },
      {
        id: 3,
        name: "Keripik Tempe",
        price: 12000,
        description: "Camilan sehat dari tempe",
        image: KeripikTempe,
      },
      {
        id: 4,
        name: "Batik Tulis",
        price: 250000,
        description: "Kain batik khas Imogiri Yogyakarta",
        image: BatikTulis,
      },
      {
        id: 5,
        name: "Mie Ayam",
        price: 10000,
        description: "Mie Ayam Bendungan tegal imogiri",
        image: MieAyam,
      },
      {
        id: 6,
        name: "Kerajinan Kayu",
        price: 50000,
        description: "Souvenir dari kayu lokal",
        image: KerajinanKayu,
      },
      {
        id: 7,
        name: "Teh Herbal",
        price: 30000,
        description: "Minuman herbal alami",
        image: TehHerbal,
      },
      {
        id: 8,
        name: "Tas Anyaman",
        price: 75000,
        description: "Tas unik dari anyaman bambu",
        image: TasAnyaman,
      },
    ];
    setProducts(sampleData);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-60 h-auto p-4 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform"
        >
          <div className="relative overflow-hidden rounded-xl flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-[100px] h-[100px] object-cover mb-4 rounded-lg"
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-blue-600">
              {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-2">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
