import { useEffect, useState } from "react";

export default function useControlsVisibility() {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (!showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  function show() {
    setShowControls(true);
  }

  return {
    showControls,
    show,
  };
}
