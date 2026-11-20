import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import { useFavourites } from "~/features/app/contexts/FavouritesProvider.tsx";

import useSwipe from "~/features/app/hooks/useSwipe.ts";
import useKeyboardNavigation from "~/features/app/hooks/useKeyboardNavigation.ts";

import { useSongNavigation } from "~/features/app/hooks/useSongNavigation.ts";
import useLyricsSections from "~/features/app/hooks/useLyricsSections.ts";

import OpaqueOverlay from "~/features/app/components/ui/OpaqueOverlay.tsx";

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

  const song = location.state?.song;
  const songs = location.state?.songs;
  const index = location.state?.index;
  const collection = location.state?.collection;

  const { isFavourite, toggleFavourite } = useFavourites();

  const {
    nextSong,
    previousSong,
    closeDetails,
    openProjection,
  } = useSongNavigation({
    navigate,
    song,
    songs,
    index,
  });

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

  if (!song) return null;

  return (
    <>
      {showHelp && (
  <MoreOptions
    onClose={() => setShowHelp(false)}
  />
)}

      <div className="fullscreen-overlay">
        <main
          className="details"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translateX(${offsetX}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.35s ease",
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
