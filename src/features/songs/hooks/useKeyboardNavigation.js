import { useEffect } from "react";

export default function useKeyboardNavigation({
  onNext,
  onPrevious,
  onClose,
  onEnter,
  mode = "",
}) {
  useEffect(() => {
    function handleKeyDown(event) {

      if (
        event.key === "ArrowRight" ||
        (
          mode === "projection" &&
          (
            event.key === "ArrowDown" ||
            event.key === " "
          )
        )
      ) {
        onNext();
        return;
      }

      if (
        event.key === "ArrowLeft" ||
        (
          mode === "projection" &&
          event.key === "ArrowUp"
        )
      ) {
        onPrevious();
        return;
      }

      if (
        event.key === "Enter" &&
        onEnter
      ) {
        onEnter();
        return;
      }

      if (event.key === "Escape" &&
        onClose
      ) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    onNext,
    onPrevious,
    onClose,
    onEnter,
    mode,
  ]);
}
