import { useNavigate, useParams } from "react-router";
import type { SongHeader } from "~/features/app/loaders/CollectionsLoader";
import { useFavourites } from "~/features/app/contexts/FavouritesProvider";
import "./List.css";

type ListProps = {
  headers?: SongHeader[];
};

export const SONG_LIST_STORAGE_PREFIX = "active-song-ids:";

export default function List({ headers = [] }: ListProps) {
  const navigate = useNavigate();
  const { collection = "" } = useParams();
  const { isFavourite } = useFavourites();

  function openDetails(id: number) {
    const ids = headers.map((header) => String(header.ID));
    window.sessionStorage.setItem(
      `${SONG_LIST_STORAGE_PREFIX}${collection}`,
      JSON.stringify(ids)
    );
    navigate(`${id}`);
  }

  return (
    <ul className="list">
      {headers.map((header) => (
        <li
          key={header.ID}
          onClick={() => openDetails(header.ID)}
        >
          <span className="id">{header.ID}</span>
          <span className="title">{header.Title}</span>

          {isFavourite(header.ID) && (
            <span className="favourite">⭐</span>
          )}

          {header.Translation && (
            <div className="translation">{header.Translation}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
