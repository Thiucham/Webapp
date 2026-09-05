import { useNavigate } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <h1>THIUCHAM</h1>

      <p>Choose a collection</p>

      <div className="home-collections">
        <button onClick={() => navigate("/Hiuna-Khomlui/list")}>
          ▸ Hiuna Khomlui
        </button>

        <button onClick={() => navigate("/Khristen-Madui-Lui/list")}>
          ▸ Khristen Madui Lui
        </button>

        <button onClick={() => navigate("/Luisan/list")}>
          ▸ Luisan
        </button>
         <button
        className="home-favourites"
        onClick={() => navigate("/favourites")}
      >
        ⭐ Favourites
      </button>
      </div>


    </main>
  );
}
