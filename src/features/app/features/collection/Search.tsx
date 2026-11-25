import { useEffect, useRef, useState } from "react";
import { useAppData } from "~/features/app/components/layouts/AppLayout";
import type { SongHeader } from "~/features/app/loaders/CollectionsLoader";
import List from "~/features/app/components/ui/List";
import "./Search.css";

function normalize(str?: string) {
  return (str || "")
    .toLowerCase()
    .replace(/[ !,.?'-]/g, "");
}

export default function Search() {
  const { songs, collection } = useAppData();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedQuery = normalize(query);
  const collectionSongs = songs[collection] ?? [];

  const results: SongHeader[] =
    normalizedQuery === ""
      ? []
      : collectionSongs
          .filter(
            (song) =>
              String(song.Header.ID).includes(normalizedQuery) ||
              normalize(song.Header.Title).includes(normalizedQuery) ||
              normalize(song.Header.Translation).includes(normalizedQuery)
          )
          .map((song) => song.Header);

  return (
    <main>
      <input
        ref={inputRef}
        className="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
      />

      <List headers={results} />
    </main>
  );
}
