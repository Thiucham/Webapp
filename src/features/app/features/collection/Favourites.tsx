import { useEffect, useState } from "react";

import { useAppOutletContext } from "~/features/app/components/layouts/AppLayout";
import List from "~/features/app/components/ui/List.tsx";

const STORAGE_KEY = "favourites";

export default function Favourites() {
  const { songs, collection } = useAppOutletContext();

  const [favouriteSongs, setFavouriteSongs] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const favouriteIds = stored[collection] || [];

    const filteredSongs = songs.filter((song) =>
      favouriteIds.includes(String(song.ID))
    );

    setFavouriteSongs(filteredSongs);
  }, [songs, collection]);

  if (favouriteSongs.length === 0) {
    return (
      <main>
        <h2>No favourites yet</h2>
        <p>You have no favourite songs in this <strong>{collection}</strong>.</p>
      </main>
    );
  }

  return (
    <List
      songs={favouriteSongs}
      collection={collection}
    />
  );
}
