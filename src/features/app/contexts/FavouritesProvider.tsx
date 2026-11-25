import { createContext, useContext, useState } from "react";
import { Outlet, useParams } from "react-router";

const STORAGE_KEY = "favourites";

interface FavouritesContextValue {
  isFavourite: (songId: string | number) => boolean;
  toggleFavourite: (songId: string | number) => void;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export default function FavouritesProvider() {
  const { collection = "" } = useParams();

  const [favourites, setFavourites] = useState<Record<string, string[]>>(() => {
    if (typeof localStorage === "undefined") return {};
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  function toggleFavourite(songId: string | number) {
    const id = String(songId);
    const current = favourites[collection] ?? [];
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    const updated = {
      ...favourites,
      [collection]: next,
    };

    setFavourites(updated);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }

  function isFavourite(songId: string | number) {
    return favourites[collection]?.includes(String(songId)) ?? false;
  }

  return (
    <FavouritesContext.Provider value={{ isFavourite, toggleFavourite }}>
      <Outlet />
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }

  return context;
}
