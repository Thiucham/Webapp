import { useRef } from "react";

export default function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 140,
}) {
  const startX = useRef(null);

  function onTouchStart(event) {
    startX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event) {
    if (startX.current === null) return;

    const endX = event.changedTouches[0].clientX;

    const distance = endX - startX.current;

    if (distance < -threshold) {
      onSwipeLeft();
    }

    if (distance > threshold) {
      onSwipeRight();
    }

    startX.current = null;
  }

  return {
    onTouchStart,
    onTouchEnd,
  };
}
