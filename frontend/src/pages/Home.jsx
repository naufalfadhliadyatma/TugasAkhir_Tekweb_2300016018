import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import gambar dari folder assets
import BackgroundImage from "../assets/profile-sriharjo.png";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
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
    setCollapsed(sampleData.reduce((acc, item) => ({ ...acc, [item.id]: true }), {}));
  }, []);

  const toggleCollapse = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative"
        style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="h-screen flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg ml-8 text-orange-800 relative">Kalurahan Sriharjo</h1>
          <button
            onClick={toggleModal}
            className="mt-1 ml-8 px-4 py-3 max-w-xs bg-yellow-400 text-black font-poppins rounded-lg opacity-40 hover:bg-yellow-600 focus:outline-none"
          >
            Learn More
          </button>
        </div>
        <div className="h-8 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-amber-50 rounded-lg p-6 max-w-2xl">
            {/* Konten modal */}
            <h2 className="text-2xl font-bold mb-4 text-amber-800">Sejarah Kalurahan Sriharjo</h2>
            <p className="text-gray-700 text-sm mb-4 text-justify">
              Kalurahan Sriharjo dibentuk pada tahun 1946. Sedangkan nama ‘Sriharjo’ diambil dari geografi wilayah dan mata pencaharian penduduk.
              Menurut mitos Jawa, kata ‘Sriharjo’ adalah pemberian dari Dewi Sri dan ‘harjo’ yaitu raharjo atau sejahtera. Jadi, nama Sriharjo berarti desa
              yang sejahtera dengan mata pencaharian pokok warganya adalah bercocok tanam.
            </p>
            <p className="text-gray-700 text-sm mb-4">
              Kalurahan Sriharjo awalnya merupakan penggabungan tiga kalurahan lama, yaitu:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
              <li>Kalurahan Mojohuro</li>
              <li>Kalurahan Dogongan</li>
              <li>Kalurahan Kedungmiri</li>
            </ul>
            <p className="text-gray-700 text-sm mb-4 text-justify">
              Kantor sementara pada waktu penggabungan bertempat di rumah Bapak Sosro Margono di Padukuhan Mojohuro. Pada tahun 1951 dibangun kantor baru Pemerintah Kalurahan Sriharjo di atas tanah kas desa di wilayah Padukuhan Mojohuro.
            </p>
            <p className="text-gray-700 text-sm mb-4">Berikut pembagian wilayah padukuhan Kalurahan Sriharjo pada saat itu:</p>
            <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
              <li>Padukuhan Miri</li>
              <li>Padukuhan Jati</li>
              <li>Padukuhan Mojohuro</li>
              <li>Padukuhan Pelemadu</li>
              <li>Padukuhan Sungapan</li>
              <li>Padukuhan Gondosuli</li>
              <li>Padukuhan Trukan</li>
              <li>Padukuhan Dogongan</li>
              <li>Padukuhan Ketos</li>
              <li>Padukuhan Ngrancah</li>
              <li>Padukuhan Pengkol</li>
              <li>Padukuhan Sompok</li>
              <li>Padukuhan Wunut</li>
            </ul>
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="p-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-8 p-20">Wisata Kalurahan Sriharjo</h2>
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
                {!collapsed[product.id] && (
                  <p className="text-gray-600 text-sm text-justify">{product.description}</p>
                )}
                <button
                  onClick={() => toggleCollapse(product.id)}
                  className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-lime-600 focus:outline-none"
                >
                  {collapsed[product.id] ? "Show Description" : "Hide Description"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maps Section */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-300 py-40">
        <div className="flex flex-wrap">
          {/* Maps Container */}
          <div className="w-full lg:w-1/2 h-96 px-9 ">
            <MapContainer center={[-7.9441037, 110.3730135]} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-7.9441037, 110.3730135]}>
                <Popup>Kalurahan Sriharjo, Imogiri, Bantul</Popup>
              </Marker>
            </MapContainer>
          </div>
          {/* Kontak Info */}
          <div className="w-full lg:w-1/2 h-52 px-6 flex flex-col justify-center">
            <h3 className="text-4xl font-bold mb-4">Kontak Kami</h3>
            <p className="mb-2 font-poppins text-1xl"><i className="ri-map-pin-fill text-zinc-800 mr-2 text-2xl"></i>Mojohuro, Sriharjo, Imogiri, Bantul</p>
            <p className="mb-2 font-poppins text-1xl"><i className="ri-phone-fill text-zinc-800 mr-2 text-2xl"></i>085643029566</p>
            <p className="mb-4 font-poppins text-1xl"><i className="ri-mail-fill text-zinc-800 mr-2 text-2xl"></i>desa.sriharjo@bantulkab.go.id</p>
            <a
              href="https://www.instagram.com/kalurahan_sriharjo?igsh=eTdmdTRzbXhpdGdy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-1xl font-poppins flex items-center"
            >
              <i className="ri-instagram-fill text-zinc-800 mr-2 text-2xl"></i>kalurahan_sriharjo
            </a>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white text-center py-6">
        © 2024 Copyright: LokalMart
      </footer>
    </div>
  );
};

export default Home;
