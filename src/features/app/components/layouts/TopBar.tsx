import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import ScreenBackDrop from "../ui/ScreenBackDrop";

import "./TopBar.css";

export default function TopBar() {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const path = routerLocation.pathname.split("/").filter(Boolean);
  const collection = path[1];
  const showMenu = path.length <= 3;
  const isSearchPage = path[1] === "search";
  const isFavourites = collection === "Favourites";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [routerLocation.pathname]);

  return (
    <>
      <header className="top-bar">
        <button
          className="top-left"
          onClick={() =>
            showMenu
              ? setIsMenuOpen((prev) => !prev)
              : navigate(-1)
          }
        >
          {showMenu ? "☰" : "〈"}
        </button>

        <div className="top-center">{collection}</div>

        {!isFavourites && (
          <button
            className="top-right"
            onClick={() =>
              isSearchPage
                ? navigate(-1)
                : navigate(`/app/${collection}/Search`)
            }
          >
            {isSearchPage ? "✕" : "🔍"}
          </button>
        )}
      </header>

      {isMenuOpen && (
        <ScreenBackDrop onClose={() => setIsMenuOpen(false)}>
          <aside className="left-bar">
            <NavLink to="/app/Hiuna-Khomlui/AllList" className="left-item">
              ⊞ Hiuna Khomlui
            </NavLink>

            <NavLink to="/app/Khristen-Madui-Lui/AllList" className="left-item">
              ⊞ Khristen Madui Lui
            </NavLink>

            <NavLink to="/app/Luisan/AllList" className="left-item">
             ⊞ Luisan
            </NavLink>

            <NavLink to="/app/" end className="left-item">
            ⌂ Home
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
        </ScreenBackDrop>
      )}
    </>
  );
}
