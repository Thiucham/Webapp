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
  <button
  className="navigate"
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
>
  📝 Suggest a correction
</button>
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
         <button
  className="favourite"
  onClick={() => toggleFavourite(collection, song.ID)}
>
  {isFavourite(collection, song.ID) ? "⭐" : "☆"}
</button>

          <span>
            {song.ID}
          </span>
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

  <div className="detail-meta">
  <div className="detail-meta-info">
    <p className="song-meta">
      <strong>Key:</strong>{" "}
      {song.Key || "⚪"}
    </p>

    <p className="song-meta">
      <strong>Time signature:</strong>{" "}
      {song["Time signature"] || "⚪"}
    </p>
  </div>

  <div className="detail-actions">
    <button onClick={openProjection}>
      ⛶
    </button>

   <button onClick={() => setShowHelp(true)}>
  ?
</button>
  </div>
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
     </div>
     </>
  );
}
