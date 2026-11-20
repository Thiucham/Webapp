import { useEffect } from "react";

export default function useFullscreen(enabled) {
  useEffect(() => {
    if (!enabled) return;

    async function enterFullscreen() {
      try {
        await document.documentElement.requestFullscreen();

        if (window.innerHeight > window.innerWidth) {
          await screen.orientation?.lock("landscape");
        }
      } catch {}
    }

    enterFullscreen();

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      screen.orientation?.unlock();
    };
  }, [enabled]);
}
