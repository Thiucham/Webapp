import { useEffect, useRef, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

import List from "../components/List";
import "../styles/Search.css";

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[ !,.?'-]/g, "");
}

export default function SearchList() {
  const { collection } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    async function loadSongs() {
      try {
        const response = await fetch(
  `${import.meta.env.BASE_URL}data/${collection}.json`
);

        if (!response.ok) {
          throw new Error("Failed to load songs");
        }

        const data = await response.json();

        setSongs(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSongs();
  }, [collection]);

  useEffect(() => {
  setSelectedIndex(0);
}, [query]);

  const normalizedQuery = normalize(query);

  const results =
    normalizedQuery === ""
      ? []
      : songs.filter((song) =>
          song.ID.toString().includes(normalizedQuery) ||
          normalize(song.Title).includes(normalizedQuery) ||
          normalize(song.Translation).includes(normalizedQuery)
        );

      function openSelectedSong() {
  const song = results[selectedIndex];

  if (!song) return;

  const index = songs.indexOf(song);

  navigate(`${song.ID}`, {
    state: {
      song,
      songs: results,
      index: selectedIndex,
      collection,
    },
  });
}

useKeyboardNavigation({
  onEnter: openSelectedSong,
});

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
  onSelect={setSelectedIndex}
/>
    </main>
  );
}

