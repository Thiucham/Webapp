import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import { useFavourites } from "../contexts/FavouritesProvider";

import useSwipe from "../hooks/useSwipe";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

import "../styles/Details.css";

const DETAIL_ORDER = [
  ["V1", "CH-"],
  ["CH", "V1-"],
  ["V2", "V2-"],
  ["V3", "V3-"],
  ["V4", "V4-"],
  ["V5", "V5-"],
  ["V6", "V6-"],
  ["V7", "V7-"],
  ["V8", "V8-"],
  ["V9", "V9-"],
  ["V10", "V10-"],
  ["V11", "V11-"],
];

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showHelp, setShowHelp] = useState(false);

const song = location.state?.song;
const songs = location.state?.songs;
const index = location.state?.index;
const collection = location.state?.collection;

  if (!song) return null;

   const {
  isFavourite,
  toggleFavourite,
} = useFavourites();

  function closeDetails() {
    navigate(-1);
  }

  function openProjection() {
  navigate("../projection", {
    state: { song },
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

const sections = DETAIL_ORDER
  .map(([first, second]) => {
    const key =
      song[first]
        ? first
        : song[second]
          ? second
          : null;

    if (!key) return null;

    return {
      key,
      text: song[key],
    };
  })
  .filter(Boolean);

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
  <div className="help-overlay">
    <div className="help-box">
      <button className="close"
      onClick={() => setShowHelp(false)}>
        ❌
      </button>

      <h4>Controls</h4>

      <h5>Touch</h5>
      <p>Swipe left — Next song</p>
      <p>Swipe right — Previous song</p>
      <p>Double-click lyrics — Projection</p>

      <h5>Keyboard</h5>
      <p>→ — Next song</p>
      <p>← — Previous song</p>
      <p>Enter — Projection</p>
      <p>Esc — Close</p>
 </div>
  </div>
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
      <div className="detail-head">
        <div>
            {song.ID}
        </div>

        <div>
          {song.Title}
        </div>
      </div>

      {song.Translation && (
        <div className="translation">
          {song.Translation}
        </div>
      )}

  <div className="detail-meta-info">
    <div className="song-meta-item">
      <span className="song-meta-label">KEY</span>
      <span className="song-meta-value">
        {song.Key || "⚪"}
      </span>
    </div>

    <div className="song-meta-item">
      <span className="song-meta-label">TIME</span>
      <span className="song-meta-value">
        {song["Time signature"] || "⚪"}
      </span>
    </div>
  </div>

  <div className="detail-actions">
    <button
    aria-label="Toggle-Favourites"
  onClick={() => toggleFavourite(collection, song.ID)}
>
  {isFavourite(collection, song.ID) ? "⭐" : "☆"}
</button>

    <button
      onClick={() => setShowHelp(true)}
      aria-label="Help"
    >ⓘ
    </button>

    <button
      aria-label="Suggest a correction"
      onClick={() => {
    const originalLyrics = sections
      .map(({ text }) => text)
      .join("\n\n");

    const correction = {
      collection,
      songId: song.ID,
      title: song.Title,
      originalLyrics,
    };

    const identityToken = localStorage.getItem("identityToken");

    if (identityToken) {
      navigate("../suggest-correction", {
        state: { correction },
      });
      return;
    }

    navigate("/sign-in", {
      state: {
        correction,
        returnTo: location.pathname.replace(
      /\/[^/]+$/,
      "/suggest-correction"
    ),
      },
    });
  }}
    >✎
    </button>
  </div>


      <div className="lyrics-container"
      onDoubleClick={openProjection}
      >
       {sections.map(({ key, text }) => (
  <div
    key={key}
    className="lyrics"
  >
    {text}
  </div>
))}
      </div>
    </main>

    <button className="projection" onClick={openProjection} aria-label="Open projection">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7l5-6z" />
    </svg>
  </button>

     </div>
     </>
  );
}
