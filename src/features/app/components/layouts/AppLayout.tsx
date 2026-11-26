import {
  Outlet,
  useParams,
  useRouteLoaderData,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import {
  fetchCollectionsFromPublic,
  type SongsByCollection,
} from "~/features/app/loaders/CollectionsLoader.ts";
import FavouritesProvider from "~/features/app/contexts/FavouritesProvider";
import "./AppLayout.css";
import TopBar from "./TopBar";

type AppLoaderData = { songs: SongsByCollection };

let cachedSongsData: AppLoaderData | null = null;

export async function clientLoader(): Promise<AppLoaderData> {
  if (cachedSongsData) {
    return cachedSongsData;
  }

  const data = await fetchCollectionsFromPublic();
  cachedSongsData = data;
  return data;
}

clientLoader.hydrate = true;

export function shouldRevalidate({}: ShouldRevalidateFunctionArgs) {
  return false;
}

export default function AppLayout() {
  return (
    <FavouritesProvider>
      <div className="app-layout">
        <TopBar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </FavouritesProvider>
  );
}

export function useAppData() {
  const data = useRouteLoaderData("app-layout") as AppLoaderData | undefined;
  const { collection = "" } = useParams();

  return {
    songs: data?.songs ?? {},
    collection,
  };
}
