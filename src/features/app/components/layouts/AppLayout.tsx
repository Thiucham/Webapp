import {
  Outlet,
  useLoaderData,
  useLocation,
  type ClientLoaderFunctionArgs,
} from "react-router";

import { CollectionLoader } from "~/features/app/loaders/CollectionLoader";

import "../styles/AppLayout.css";

import TopBar from "./TopBar.tsx.tsx";
import BottomBar from "./BottomBar.tsx.tsx";

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  return CollectionLoader(args);
}

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
