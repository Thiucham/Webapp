import { Outlet, useLocation } from "react-router";

import "../styles/AppLayout.css";

import TopBar from "./TopBar.tsx.tsx";
import BottomBar from "./BottomBar.tsx.tsx";

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
