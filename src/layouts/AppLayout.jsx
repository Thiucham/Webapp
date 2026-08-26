import { Outlet } from "react-router-dom";

import "./styles/AppLayout.css";

import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <TopBar />

      <main
  className="app-content"
>
  <Outlet />
</main>

      <BottomBar />
    </div>
  );
}
