import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "favourites";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored
      ? JSON.parse(stored)
      : {};
  });

  function toggleFavourite(collection, songId) {
    const id = String(songId);

    const current =
      favourites[collection] || [];

    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    const updated = {
      ...favourites,
      [collection]: next,
    };

    setFavourites(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  }

  function isFavourite(collection, songId) {
    return (
      favourites[collection]?.includes(String(songId)) ||
      false
    );
  }

  return (
    <FavouritesContext.Provider
      value={{
        isFavourite,
        toggleFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
