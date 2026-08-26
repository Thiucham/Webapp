import { useRef, useState } from "react";

export default function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 115,
}) {
  const startX = useRef(null);
  const startY = useRef(null);
  const axis = useRef(null);

  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function onTouchStart(event) {
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
    axis.current = null;
  }

  function onTouchMove(event) {
    if (startX.current === null) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const dx = currentX - startX.current;

    // Decide the axis once
    if (axis.current === null) {
      const currentY = event.touches[0].clientY;
       const dy = currentY - startY.current;

      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        return;
      }

      axis.current =
        Math.abs(dx) > Math.abs(dy)
          ? "x"
          : "y";
    }

   if (axis.current === "x") {
    setIsDragging(true);
    setOffsetX(dx);
  }
  }

  function onTouchEnd(event) {
    if (startX.current === null) return;

   if (axis.current === "x") {
    const endX = event.changedTouches[0].clientX;
    const distance = endX - startX.current;

      if (distance < -threshold) {
        onSwipeLeft();
      } else if (distance > threshold) {
        onSwipeRight();
      }
    }

    startX.current = null;
    startY.current = null;
    axis.current = null;

    setIsDragging(false);
    setOffsetX(0);
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    offsetX,
    isDragging,
  };
}
