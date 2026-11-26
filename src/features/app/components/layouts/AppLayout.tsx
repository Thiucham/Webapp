import {
  Outlet,
  useLoaderData,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import {
  fetchCollectionsFromPublic,
  type SongsByCollection,
} from "~/features/app/loaders/CollectionsLoader.ts";
import FavouritesProvider from "~/features/app/contexts/FavouritesProvider";
import "./AppLayout.css";
import TopBar from "./TopBar";

export type AppLoaderData = { songs: SongsByCollection };

let cachedSongsData: AppLoaderData | null = null;

export async function clientLoader(): Promise<AppLoaderData> {
  if (cachedSongsData) {
    return cachedSongsData;
  }

  const data = await fetchCollectionsFromPublic();
  cachedSongsData = data;
  return data;
}

clientLoader.hydrate = true as const;

export function shouldRevalidate({}: ShouldRevalidateFunctionArgs) {
  return false;
}

export default function AppLayout() {
  const data = useLoaderData() as AppLoaderData | undefined;

  return (
    <FavouritesProvider>
      <div className="app-layout">
        <TopBar />
        <main className="app-content">
          <Outlet context={data} />
        </main>
      </div>
    </FavouritesProvider>
  );
}
