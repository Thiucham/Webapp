import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/TopBar.css";

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

const path = location.pathname.split("/");
const collection = path[1];
const showMenu = !path[3];
const isSearchPage = path[2] === "search";
const isFavourites = collection === "Favourites";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  setIsMenuOpen(false);
}, [location.pathname]);

  return (
    <>
      <header className="top-bar">

        <button
  className="top-left"
  onClick={() =>
    showMenu
      ? setIsMenuOpen(prev => !prev)
      : navigate(-1)
  }
>
  {showMenu ? "☰" : "〈"}
</button>

        <div className="top-center">
  {collection}
</div>

{!isFavourites && (
         <button
  className="top-right"
  onClick={() => {
    isSearchPage
  ? navigate(-1)
  : navigate(`/${collection}/search`);
  }}
>
  {isSearchPage ? "✕" : "🔍"}
</button>
)}

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
            to="/Favourites/list"
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
