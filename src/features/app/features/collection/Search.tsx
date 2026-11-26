import { useEffect, useRef, useState } from "react";
import type { Song, SongHeader } from "~/features/app/loaders/CollectionsLoader";
import List from "~/features/app/components/ui/List";
import "./Search.css";

type SearchProps = {
  songs: Song[];
  collection: string;
};

function normalize(str?: string) {
  return (str || "")
    .toLowerCase()
    .replace(/[ !,.?'-]/g, "");
}

export default function Search({ songs }: SearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedQuery = normalize(query);

  const results: SongHeader[] =
    normalizedQuery === ""
      ? []
      : songs
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
