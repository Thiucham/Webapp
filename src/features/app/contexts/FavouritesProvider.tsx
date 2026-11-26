
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router";

const STORAGE_KEY = "favourites";

interface FavouritesContextValue {
  isFavourite: (songId: string | number) => boolean;
  toggleFavourite: (songId: string | number) => void;
  isHydrated: boolean;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

function readFavouritesFromStorage(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeFavouritesToStorage(value: Record<string, string[]>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage quota or privacy-mode errors
  }
}

export default function FavouritesProvider({ children }: { children: ReactNode }) {
  const { collection = "" } = useParams();
  const [favourites, setFavourites] = useState<Record<string, string[]>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setFavourites(readFavouritesFromStorage());
    setIsHydrated(true);
  }, []);

  function toggleFavourite(songId: string | number) {
    const id = String(songId);
    const key = collection;

    setFavourites((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      const updated = {
        ...prev,
        [key]: next,
      };

      writeFavouritesToStorage(updated);
      return updated;
    });
  }

  function isFavourite(songId: string | number) {
    return favourites[collection]?.includes(String(songId)) ?? false;
  }

  return (
    <FavouritesContext.Provider
      value={{ isFavourite, toggleFavourite, isHydrated }}
    >
      {children}
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
