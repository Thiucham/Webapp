import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useFullscreen from "../hooks/useFullscreen";
import useControlsVisibility from "../hooks/useControlsVisibility";
import useSwipe from "../hooks/useSwipe";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

import "../styles/Projection.css";

const PROJECTION_ORDER = [
  ["V1", "CH-"],
  ["CH", "V1-"],
  ["V2", "CH-"],
  ["CH", "V2-"],
  ["V3", "CH-"],
  ["CH", "V3-"],
  ["V4", "CH-"],
  ["CH", "V4-"],
  ["V5", "CH-"],
  ["CH", "V5-"],
  ["V6", "CH-"],
  ["CH", "V6-"],
  ["V7", "CH-"],
  ["CH", "V7-"],
  ["V8", "CH-"],
  ["CH", "V8-"],
  ["V9", "CH-"],
  ["CH", "V9-"],
  ["V10", "CH-"],
  ["CH", "V10-"],
  ["V11", "CH-"],
  ["CH", "V11-"],
];

export default function Projection() {
  const location = useLocation();
  const navigate = useNavigate();

  const song = location.state?.song;

  const [currentSlide, setCurrentSlide] = useState(0);

  useFullscreen(song);
  const {
  showControls,
  show,
} = useControlsVisibility();

  if (!song) return null;

  const lyrics = [];

  let useFirst = null;

  for (const [first, second] of PROJECTION_ORDER) {
    if (useFirst === null) {
      if (song[first]) {
        useFirst = true;
      } else if (song[second]) {
        useFirst = false;
      } else {
        continue;
      }
    }

    const key = useFirst ? first : second;

    if (!song[key]) {
      if (key.startsWith("CH")) {
        continue;
      }

      break;
    }

    lyrics.push(song[key]);
  }

  function closeProjection() {
    navigate(-1);
  }

  function nextSlide() {
    setCurrentSlide((current) =>
      Math.min(current + 1, lyrics.length - 1)
    );
  }

  function previousSlide() {
    setCurrentSlide((current) =>
      Math.max(current - 1, 0)
    );
  }

  useKeyboardNavigation({
  onNext: nextSlide,
  onPrevious: previousSlide,
  onClose: closeProjection,
   mode: "projection",
});

  const swipeHandlers = useSwipe({
  onSwipeLeft: nextSlide,
  onSwipeRight: previousSlide,
  threshold: 50,
});

  return (
    <div className="projection"
      {...swipeHandlers}
      >
      <div
        className="projection-track"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {lyrics.map((lyric, index) => (
          <div
            key={index}
            className="projection-slide"
             onClick={show}
          >
            <div className="lyrics">
              {lyric}
            </div>
          </div>
        ))}
      </div>
      {showControls && (
    <button
      className="projection-close"
      onClick={closeProjection}
    >
      ❌
    </button>
  )}
    </div>
  );
}
