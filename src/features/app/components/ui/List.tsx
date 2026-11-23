import { useNavigate } from "react-router";

import { useFavourites } from "~/features/app/contexts/FavouritesProvider.tsx";

import "./List.css";

type ListProps = {
  songs?: any[];
  collection?: string;
};

export default function List({
  songs = [],
  collection,
}: ListProps) {
  const navigate = useNavigate();

  const { isFavourite } = useFavourites();

  function openDetails(song: any, index: number) {
    navigate(`${song.ID}`, {
      state: {
        song,
        songs,
        index,
        collection,
      },
    });
  }

  return (
    <ul className="list">
      {songs.map((song, index) => (
        <li
          key={song.ID}
          onClick={() => openDetails(song, index)}
        >
          <span className="id">
            {song.ID}
          </span>

          <span className="title">
            {song.Title}
          </span>

          {isFavourite(collection, song.ID) && (
            <span className="favourite">
              ⭐
            </span>
          )}

          {song.Translation && (
            <div className="translation">
              {song.Translation}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
