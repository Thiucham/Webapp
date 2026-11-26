import { useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router";
import type { AppLoaderData } from "~/features/app/components/layouts/AppLayout";

import { useFavourites } from "~/features/app/contexts/FavouritesProvider";

import useSwipe from "~/features/app/hooks/useSwipe";
import useKeyboardNavigation from "~/features/app/hooks/useKeyboardNavigation";
import useLyricsSections from "./hooks/useLyricsSections";

import ScreenBackDrop from "~/features/app/components/ui/ScreenBackDrop";
import DetailHeader from "./components/DetailHeader";
import DetailActions from "./components/DetailActions";
import LyricsContent from "./components/LyricsContent";
import MoreOptions from "./components/MoreOptions";
import ProjectionIcon from "~/features/app/components/ui/icons/ProjectionIcon";

import "./Details.css";

export default function Details() {
  const { collection = "", songId } = useParams();
  const navigate = useNavigate();
  const appData = useRouteLoaderData("app-layout") as AppLoaderData | undefined;
  const { isFavourite, toggleFavourite } = useFavourites();

  const [showHelp, setShowHelp] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const songs = appData?.songs ?? {};
  const allCollectionSongs = songs[collection] ?? [];

  let orderedIds: string[] = [];
  if (typeof window !== "undefined") {
    const raw = window.sessionStorage.getItem(
      `${SONG_LIST_STORAGE_PREFIX}${collection}`
    );
    if (raw) {
      orderedIds = JSON.parse(raw);
    }
  }

  const songById = new Map(
    allCollectionSongs.map((item) => [String(item.Header.ID), item])
  );

  const navigableSongs =
    orderedIds.length > 0
      ? orderedIds
          .map((id) => songById.get(String(id)))
          .filter((item) => Boolean(item))
      : allCollectionSongs;

  const index = navigableSongs.findIndex(
    (item) => String(item.Header.ID) === songId
  );
  const song = index >= 0 ? navigableSongs[index] : undefined;
  const songHeader = song?.Header;
  const songLyrics = song?.Lyrics;

  const sections = useLyricsSections(songLyrics ?? {});

  function closeDetails() {
    navigate(-1);
  }

  function openProjection() {
    if (!song || !songId || !songLyrics) return;
    navigate(`${songId}/projection`, {
      state: { lyrics: songLyrics },
    });
  }

  function nextSong() {
    if (index < 0 || index >= navigableSongs.length - 1) return;

    const nextItem = navigableSongs[index + 1];
    setDirection("left");
    navigate(`../${nextItem.Header.ID}`, { replace: true });
  }

  function previousSong() {
    if (index <= 0) return;

    const previousItem = navigableSongs[index - 1];
    setDirection("right");
    navigate(`../${previousItem.Header.ID}`, { replace: true });
  }

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

  if (!song) {
    return (
      <div className="fullscreen-overlay">
        <main className="details">
          <p>Song not found.</p>
        </main>
      </div>
    );
  }

  return (
    <>
      {showHelp && (
        <ScreenBackDrop onClose={() => setShowHelp(false)}>
          <MoreOptions onClose={() => setShowHelp(false)} />
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
            transition: isDragging
              ? "none"
              : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <DetailHeader song={songHeader} />

          <DetailActions
            isFavourite={isFavourite(songHeader.ID)}
            onToggle={() => toggleFavourite(songHeader.ID)}
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
