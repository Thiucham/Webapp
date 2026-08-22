import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeaderList from "../components/HeaderList";

export default function CategoriesList() {
  const { collection } = useParams();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function loadSongs() {
      try {
        const response = await  fetch(
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

  const grouped = {};

  songs.forEach((song) => {
    const category = song.Category || "Others";

    if (!grouped[category]) {
      grouped[category] = {
      songs: [],
      collection,
    };
    }

     grouped[category].songs.push(song);
  });

  return <HeaderList groups={grouped} />;
}
