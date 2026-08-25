import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import List from "../components/List";
import useSwipe from "../hooks/useSwipe";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

const COLLECTIONS = [
  "Hiuna-Khomlui",
  "Khristen-Madui-Lui",
  "Luisan",
];

export default function CollectionList() {
  const { collection } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  function nextCollection() {
    if (!songs.length) return;

    const currentIndex =
      COLLECTIONS.indexOf(collection);

    const nextIndex =
      (currentIndex + 1) % 3;

    navigate(`/${COLLECTIONS[nextIndex]}/list`);
  }

  function previousCollection() {
    if (!songs.length) return;

    const currentIndex =
      COLLECTIONS.indexOf(collection);

    const previousIndex =
      (currentIndex - 1 + 3) % 3;

    navigate(`/${COLLECTIONS[previousIndex]}/list`);
  }

  function openSelectedSong() {
    const song = songs[selectedIndex];

    if (!song) return;

    navigate(`${song.ID}`, {
      state: {
        song,
        songs,
        index: selectedIndex,
        collection,
      },
    });
  }

  useKeyboardNavigation({
    onNext: nextCollection,
    onPrevious: previousCollection,
    onEnter: openSelectedSong,
  });

  const swipeHandlers = useSwipe({
    onSwipeLeft: nextCollection,
    onSwipeRight: previousCollection,
  });

  return (
    <main {...swipeHandlers}>
      <List
        songs={songs}
        collection={collection}
        onSelect={setSelectedIndex}
      />
    </main>
  );
}
