import { useEffect, useRef, useState } from "react";

export default function useControlsVisibility() {
  const [showControls, setShowControls] = useState(true);
  const timer = useRef(null);

  function show() {
    if (showControls) {
      clearTimeout(timer.current);
      setShowControls(false);
      return;
    }

    setShowControls(true);

    timer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return {
    showControls,
    show,
  };
}
