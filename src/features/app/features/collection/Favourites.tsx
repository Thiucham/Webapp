import { useFavourites } from "~/features/app/contexts/FavouritesProvider";
import List from "~/features/app/components/ui/List";
import type { Song } from "~/features/app/loaders/CollectionsLoader.ts";

type FavouritesProps = {
  songs: Song[];
  collection: string;
};

export default function Favourites({ songs, collection }: FavouritesProps) {
  const { isFavourite } = useFavourites();

  const favouriteHeaders = songs
    .filter((song) => isFavourite(song.Header.ID))
    .map((song) => song.Header);

  if (favouriteHeaders.length === 0) {
    return (
      <main>
        <h2>No favourites yet</h2>
        <p>
          You have no favourite songs in this <strong>{collection}</strong>.
        </p>
      </main>
    );
  }

  return <List headers={favouriteHeaders} />;
}
