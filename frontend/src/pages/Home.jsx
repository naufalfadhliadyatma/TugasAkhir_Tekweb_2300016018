import { useState, useEffect } from "react";

// Import gambar dari folder assets
import BackgroundImage from "../assets/profile-sriharjo.png";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Contoh data produk (untuk cards)
    const sampleData = [
      {
        id: 1,
        title: "Srikeminut Kali Oya",
        description: "Srikeminut adalah wisata alam yang terletak di Desa Sriharjo, Imogiri, Bantul, Yogyakarta. Desa Wisata Srikeminut, singkatan dari Sriharjo, Kedungmiri, dan Wunut. Semangat kerjasama dan adanya potensi alam yang dimiliki untuk menuju sebuah cita-cita mewujudkan desa wisata.",
        image: Card1,
      },
      {
        id: 2,
        title: "Lembah Sorory",
        description: "Lembah Sorory yang berarti lembah dibawah pohon bambu ori (pring ori). Pembangunan bumi perkemahanpun Cuma dengan fasilitas sederhana . Namun Setelah adanya wabah Covid -19 ,dan semua kegitan sekolah ditiadakan, warga sepakat untuk merubah bumi perkemahan menjadi tempat wisata.",
        image: Card2,
      },
      {
        id: 3,
        title: "Taman Girli Indah",
        description: "Taman Girli Indah terletak di Karang Kulon, Padukuhan Sungapan tepatnya di pinggir kali Opak.  Destinasi wisata ini memanfaatkan sebagian lahan tidak produktif yang dulunya hanya digunakan untuk membuang sampah kini dibuat menjadi taman untuk wisata.",
        image: Card3,
      },
    ];
    setProducts(sampleData);
  }, []);

  return (
    <div>
      {/* Hero Section dengan background image */}
      <div
        className="h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center "
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg ml-8 text-orange-800">Kalurahan Sriharjo</h1>
        <p className="text-lg max-w-2xl text-justify drop-shadow-md ml-8 text-stone-700">
          Sriharjo adalah Kalurahan yang penuh pesona, terletak di Imogiri, Bantul, Yogyakarta.
          Keindahan alam dan Umkm lokalnya menjadi daya tarik utama bagi wisatawan.
        </p>
      </div>

      {/* Cards Section */}
      <div className="p-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8 p-20">Wisata Desa Sriharjo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-500"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 font-poppins text-lime-950">{product.title}</h3>
                <p className="text-gray-600 text-sm text-justify">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;