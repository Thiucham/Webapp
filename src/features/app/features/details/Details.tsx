import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import { useFavourites } from "~/features/app/contexts/FavouritesProvider.tsx";

import useSongData from "./hooks/useSongData.ts";

import useSwipe from "~/features/app/hooks/useSwipe.ts";
import useKeyboardNavigation from "~/features/app/hooks/useKeyboardNavigation.ts";

import useLyricsSections from "./hooks/useLyricsSections.ts";

import ScreenBackDrop from "~/features/app/components/ui/ScreenBackDrop.tsx";

import DetailHeader from "./components/DetailHeader.tsx";
import DetailActions from "./components/DetailActions.tsx";
import LyricsContent from "./components/LyricsContent.tsx";
import MoreOptions from "./components/MoreOptions.tsx";
import ProjectionIcon from "~/features/app/components/ui/icons/ProjectionIcon.tsx";

import "./Details.css";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showHelp, setShowHelp] = useState(false);

  const fallbackData = useSongData();

let song = location.state?.song;
let songs;
let index;
let collection;

if (!song) {
  ({ collection, songs, song, index } = fallbackData);
} else {
  songs = location.state?.songs;
  index = location.state?.index;
  collection = location.state?.collection;
}

 function closeDetails() {
    navigate(-1);
  }

  function openProjection() {
  navigate("../projection", {
    state: { lyrics: song.Lyrics },
  });
}

function nextSong() {
  if (index >= songs.length - 1) return;

  const nextIndex = index + 1;
  const nextSong = songs[nextIndex];

  navigate(`../${nextSong.ID}`, {
    replace: true,
    state: {
      song: nextSong,
      songs,
      index: nextIndex,
      collection,
    },
  });
}

function previousSong() {
  if (index <= 0) return;

  const previousIndex = index - 1;
  const previousSong = songs[previousIndex];

  navigate(`../${previousSong.ID}`, {
    replace: true,
    state: {
      song: previousSong,
      songs,
      index: previousIndex,
      collection,
    },
  });
}

  const { isFavourite, toggleFavourite } = useFavourites();

  const sections = useLyricsSections(song.Lyrics);

  useKeyboardNavigation({
    onNext: nextSong,
    onPrevious: previousSong,
    onClose: closeDetails,
    onEnter: openProjection,
  });

  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    offsetX,
    isDragging,
  } = useSwipe({
    onSwipeLeft: nextSong,
    onSwipeRight: previousSong,
  });

  return (
    <>
      {showHelp && (
        <ScreenBackDrop onClose={() => setShowHelp(false)}>
  <MoreOptions
    onClose={() => setShowHelp(false)}
  />
  </ScreenBackDrop>
)}

      <div className="fullscreen-overlay">
        <main
  className={`details ${
    direction === "left"
      ? "details--enter-left"
      : "details--enter-right"
  }`}
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
  style={{
    transform: `translate3d(${offsetX}px, 0, 0)`,
    transition: isDragging ? "none" : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
  }}
>
          <DetailHeader song={song.Header} />

         <DetailActions
  isFavourite={isFavourite(collection, songId)}
  onToggle={() => toggleFavourite(collection, songId)}
  onMore={() => setShowHelp(true)}
/>

          <LyricsContent
  sections={sections}
  onDoubleClick={openProjection}
/>
        </main>

        <button
      className="projection"
      onClick={openProjection}
      aria-label="Open projection"
    >
      <ProjectionIcon />
    </button>
      </div>
    </>
  );
}
