import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router";

import type { clientLoader } from "~/features/app/components/layouts/AppLayout";

import HeaderList from "~/features/app/components/ui/HeaderList.tsx";

const STORAGE_KEY = "favourites";

export default function Favourites() {
  const collections = useRouteLoaderData<typeof clientLoader>("app-layout");

  const [groups, setGroups] = useState<any>({});

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const result: any = {};

    for (const collection of Object.keys(stored)) {
      const favouriteIds = stored[collection];

      if (
        !Array.isArray(favouriteIds) ||
        favouriteIds.length === 0
      ) {
        continue;
      }

      const songs = collections[collection];

      if (!songs) continue;

      result[collection] = {
        songs: songs.filter((song: any) =>
          favouriteIds.includes(String(song.ID))
        ),
        collection,
      };
    }

    setGroups(result);
  }, [collections]);

  const hasFavourites = Object.values(groups).some(
    (group: any) => group.songs.length > 0
  );

  if (!hasFavourites) {
    return (
      <main>
        <h2>No favourites yet</h2>
        <p>
          You have no favourites in any collection.
        </p>
      </main>
    );
  }

  return <HeaderList groups={groups} />;
}
