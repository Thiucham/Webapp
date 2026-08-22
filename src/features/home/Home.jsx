import { useNavigate } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <h1 className="home-title">THIUCHAM</h1>

      <p className="home-subtitle">Choose a collection</p>

      <div className="home-collections">
        <button onClick={() => navigate("/Hiuna-Khomlui")}>
          ▸ Hiuna Khomlui
        </button>

        <button onClick={() => navigate("/Khristen-Madui-Lui")}>
          ▸ Khristen Madui Lui
        </button>

        <button onClick={() => navigate("/Luisan")}>
          ▸ Luisan
        </button>
      </div>

      <button
        className="home-favourites"
        onClick={() => navigate("/favourites")}
      >
        ⭐ Favourites
      </button>
    </main>
  );
}
