import { useEffect, useState } from "react";

import HeaderList from "../components/HeaderList";

const STORAGE_KEY = "favourites";

export default function Favourites() {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    async function loadFavourites() {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      const result = {};

      for (const collection of Object.keys(stored)) {
        const favouriteIds = stored[collection];

        if (
          !Array.isArray(favouriteIds) ||
          favouriteIds.length === 0
        ) {
          continue;
        }

        const response = await fetch(
  `${import.meta.env.BASE_URL}data/${collection}.json`
);

        if (!response.ok) {
          throw new Error(
            `Failed to load ${collection}`
          );
        }

        const songs = await response.json();

       result[collection] = {
  songs: songs.filter((song) =>
    favouriteIds.includes(String(song.ID))
  ),
  collection,
};
      }

      setGroups(result);
    }

    loadFavourites().catch(console.error);
  }, []);

  return <HeaderList groups={groups} />;
}
