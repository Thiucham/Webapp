import { useState } from "react";

const STORAGE_KEY = "favourites";

export default function useFavourites(collection) {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored
      ? JSON.parse(stored)
      : {};
  });

  function save(next) {
    setFavourites(next);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next)
    );
  }

  function isFavourite(songId) {
    return (
      favourites[collection]?.includes(String(songId)) ||
      false
    );
  }

  function toggleFavourite(songId) {
    const id = String(songId);

    const current =
      favourites[collection] || [];

    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    save({
      ...favourites,
      [collection]: next,
    });
  }

  return {
    isFavourite,
    toggleFavourite,
  };
}
