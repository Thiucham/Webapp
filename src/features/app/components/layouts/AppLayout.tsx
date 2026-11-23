import {
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
  type ClientLoaderFunctionArgs,
} from "react-router";

import { CollectionLoader } from "~/features/app/loaders/CollectionLoader";

import "./AppLayout.css";

import TopBar from "./TopBar.tsx";

export interface AppOutletContext {
  collection: string | null;
  songs: any;
}

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  return CollectionLoader(args);
}

export default function AppLayout() {
  const { collection, songs } = useLoaderData<typeof clientLoader>();
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);

  return (
    <div className="app-layout">
      <TopBar path={path} />

      <main className="app-content">
        <Outlet context={{ collection, songs } satisfies AppOutletContext} />
      </main>
    </div>
  );
}

export function useAppOutletContext() {
  return useOutletContext<AppOutletContext>();
}
