
import type { ReactNode, TouchEvent } from "react";
import useSwipe from "~/features/app/hooks/useSwipe.ts";

import "./SlideTrack.css";

type SlideTrackProps = {
  children: ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
  threshold?: number;
  duration?: number;
  onSlideClick?: () => void;
};

export default function SlideTrack({
  children,
  currentIndex,
  onIndexChange,
  className = "",
  threshold = 50,
  duration = 350,
  onSlideClick,
}: SlideTrackProps) {
  const totalSlides = children.length;

  function nextSlide() {
    onIndexChange(
      Math.min(currentIndex + 1, totalSlides - 1)
    );
  }

  function previousSlide() {
    onIndexChange(
      Math.max(currentIndex - 1, 0)
    );
  }

  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    offsetX,
    isDragging,
  } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: previousSlide,
    threshold,
  });

  return (
    <div
      className={`slide-track-viewport ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="slide-track"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${offsetX}px))`,
          transition: isDragging
            ? "none"
            : `transform ${duration}ms ease`,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="slide-track-item"
            onClick={onSlideClick}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
