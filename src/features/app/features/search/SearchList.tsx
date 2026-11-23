import { useEffect, useRef, useState } from "react";
import {
  useNavigate
} from "react-router";

import { useAppOutletContext } from "~/features/app/components/layouts/AppLayout";

import List from "~/features/app/components/ui/List.tsx";
import "./Search.css";

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[ !,.?'-]/g, "");
}

export default function SearchList() {
  const navigate = useNavigate();

  const { songs, collection } = useAppOutletContext();

  const [query, setQuery] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedQuery = normalize(query);

  const results =
    normalizedQuery === ""
      ? []
      : songs.filter(
          (song) =>
            song.ID.toString().includes(normalizedQuery) ||
            normalize(song.Title).includes(normalizedQuery) ||
            normalize(song.Translation).includes(normalizedQuery)
        );

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

      <List
        songs={results}
        collection={collection}
      />
    </main>
  );
}
