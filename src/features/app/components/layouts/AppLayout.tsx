import {
  Outlet,
  useLoaderData,
  useParams,
  useRouteLoaderData,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import {
  fetchCollectionsFromPublic,
  loadCollectionsFromDisk,
  type SongsByCollection,
} from "~/features/app/loaders/CollectionsLoader.ts";
import "./AppLayout.css";
import TopBar from "./TopBar";

let cachedSongsData: { songs: SongsByCollection } | null = null;

export async function loader() {
  return loadCollectionsFromDisk();
}

export async function clientLoader() {
  if (cachedSongsData) {
    return cachedSongsData;
  }

  const data = await fetchCollectionsFromPublic();
  cachedSongsData = data;
  return data;
}

export function shouldRevalidate({}: ShouldRevalidateFunctionArgs) {
  return false;
}

export default function AppLayout() {
  const { songs } = useLoaderData<typeof clientLoader>();

  return (
    <div className="app-layout">
      <TopBar />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export function useAppData() {
  const data = useRouteLoaderData<typeof clientLoader>("app-layout");
  const { collection = "" } = useParams();

  return {
    songs: (data?.songs ?? {}) as SongsByCollection,
    collection,
  };
}
