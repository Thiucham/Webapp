import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./styles/TopBar.css";

export default function TopBar() {
  const location = useLocation();

const collection = location.pathname.split("/")[1];
const title = collection || "THIUCHAM";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  setIsMenuOpen(false);
}, [location.pathname]);

  return (
    <>
      <header className="top-bar">

        <button
          className="top-left"
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          ☰
        </button>

        <div className="top-center">
  {title}
</div>

         <button className="top-right">
  <NavLink to={`/${collection}/search`}>
    🔍
  </NavLink>
</button>

      </header>

      {isMenuOpen && (
        <aside className="left-bar">

          <div className="left-head">
            Category
          </div>

          <NavLink
            to="/Luisan/categories"
            className="left-item"
          >
            ▸ Luisan
          </NavLink>

          <NavLink
            to="/Khristen-Madui-Lui/categories"
            className="left-item"
          >
            ▸ Khristen Madui Lui
          </NavLink>

          <NavLink
            to="/Favourites"
            className="left-item"
          >
            ⭐ Favourites
          </NavLink>

          <a
            className="left-item"
            href="https://sites.google.com/view/thiucham/content-info"
            target="_blank"
            rel="noopener noreferrer"
          >
            ▸ App Info
          </a>

        </aside>
      )}
    </>
  );
}
