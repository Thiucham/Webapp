import { NavLink } from "react-router-dom";

import "./styles/BottomBar.css";

export default function BottomBar() {
  return (
    <nav className="bottom-bar">

      <NavLink
        to="/Hiuna-Khomlui/list"
        className="bottom-item"
      >
        Hiuna Khomlui
      </NavLink>

      <NavLink
        to="/Khristen-Madui-Lui/list"
        className="bottom-item"
      >
        Khristen Madui Lui
      </NavLink>

      <NavLink
        to="/Luisan/list"
        className="bottom-item"
      >
        Luisan
      </NavLink>

    </nav>
  );
}
