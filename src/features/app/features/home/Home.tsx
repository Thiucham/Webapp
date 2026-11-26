import { useNavigate } from "react-router";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <h1>THIUCHAM</h1>

      <p>Choose a collection</p>

      <div className="home-collections">
        <button onClick={() => navigate("/app/Hiuna-Khomlui/AllList")}>
          Hiuna Khomlui
        </button>

        <button onClick={() => navigate("/app/Khristen-Madui-Lui/AllList")}>
          Khristen Madui Lui
        </button>

        <button onClick={() => navigate("/app/Luisan/AllList")}>
          Luisan
        </button>
      </div>


    </main>
  );
}
