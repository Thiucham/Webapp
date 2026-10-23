import { Outlet, useLocation } from "react-router-dom";

import "../styles/AppLayout.css";

import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default function AppLayout() {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);

  const showBottomBar = path.length <= 2;

  return (
    <div className="app-layout">
      <TopBar path={path} />

      <main className="app-content">
        <Outlet />
      </main>

      {showBottomBar && <BottomBar />}
    </div>
  );
}
