import { useFavourites } from "~/features/app/contexts/FavouritesProvider";
import List from "~/features/app/components/ui/List";

type FavouritesProps = {
  songs: any;
  collection: string;
};

export default function Favourites({ songs, collection }: FavouritesProps) {
  const { isFavourite } = useFavourites();

  const favouriteHeaders = songs
    .filter((song) => isFavourite(song.Header.ID))
    .map((song) => song.Header);

  if (favouriteHeaders.length === 0) {
    return (
      <>
        <h2>No favourites yet</h2>
        <p>
          You have no favourite songs in this <strong>{collection}</strong>.
        </p>
         </>
    );
  }

  return <List headers={favouriteHeaders} />;
}
