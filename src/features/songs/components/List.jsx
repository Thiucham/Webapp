import { useNavigate } from "react-router-dom";

import { useFavourites } from "../../../contexts/FavouritesProvider";

import "../styles/List.css";

export default function List({
  songs = [],
  collection,
  onSelect,
}) {
  const navigate = useNavigate();

  const { isFavourite } =
    useFavourites();

  function openDetails(song, index) {
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
           onMouseEnter={() => onSelect(index)}
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
