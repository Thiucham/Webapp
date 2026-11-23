import {
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
  type ClientLoaderFunctionArgs,
} from "react-router";

import { CollectionLoader } from "~/features/app/loaders/CollectionLoader";

import "../styles/AppLayout.css";

import TopBar from "./TopBar.tsx";
import BottomBar from "./BottomBar.tsx";

export interface AppOutletContext {
  songs: any;
}

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  return CollectionLoader(args);
}

export default function AppLayout() {
  const { songs } = useLoaderData<typeof clientLoader>();
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);

  const showBottomBar = path.length <= 2;

  return (
    <div className="app-layout">
      <TopBar path={path} />

      <main className="app-content">
        <Outlet context={{ songs } satisfies AppOutletContext} />
      </main>

      {showBottomBar && <BottomBar />}
    </div>
  );
}

export function useAppOutletContext() {
  return useOutletContext<AppOutletContext>();
}
