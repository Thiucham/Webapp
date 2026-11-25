import { useAppData } from "~/features/app/components/layouts/AppLayout";
import { useFavourites } from "~/features/app/contexts/FavouritesProvider";
import List from "~/features/app/components/ui/List";

export default function Favourites() {
  const { songs, collection } = useAppData();
  const { isFavourite } = useFavourites();

  const favouriteHeaders = (songs[collection] ?? [])
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
