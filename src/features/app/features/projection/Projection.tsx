import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import useFullscreen from "../hooks/useFullscreen.ts";
import useControlsVisibility from "../hooks/useControlsVisibility.ts";
import useSwipe from "../hooks/useSwipe.ts";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation.ts";

import "./Projection.css";

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
  const [orientationLocked, setOrientationLocked] = useState(false);

  useFullscreen(song);

  async function toggleOrientation() {
  try {
    if (orientationLocked) {
      screen.orientation?.unlock();
      setOrientationLocked(false);
    } else {
      await screen.orientation?.lock("landscape");
      setOrientationLocked(true);
    }
  } catch (error) {
    console.error("Orientation error:", error);
  }
  }

  const { showControls, show } = useControlsVisibility();

  const lyrics = [];

  let useFirst = null;

  if (song) {
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
  }

  const totalSlides = lyrics.length;
const lastSlide = totalSlides - 1;
<<<<<<< HEAD
  
=======

>>>>>>> d5d5e1a (update for today.)
  function closeProjection() {
    navigate(-1);
  }

  function nextSlide() {
    setCurrentSlide((current) =>
      Math.min(current + 1, lastSlide)
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

  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    offsetX,
    isDragging,
  } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: previousSlide,
    threshold: 50,
  });

  if (!song) return null;

  return (
    <div className="projection-main">
      <div
        className="projection-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="projection-track"
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${offsetX}px))`,
            transition: isDragging
              ? "none"
              : "transform 350ms ease",
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
      </div>

      {showControls && (
  <>
    <button
      className="projection-close"
      onClick={closeProjection}
    >
      ❌
    </button>

    <div className="projection-counter">
      {currentSlide + 1} / {totalSlides}
    </div>

    <button
      className="projection-rotate"
      onClick={toggleOrientation}
    >
      Rotate
    </button>
  </>
)}
    </div>
  );
}
