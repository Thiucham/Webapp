type ScreenBackDropProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

import "./ScreenBackDrop.css";

export default function ScreenBackDrop({
  children,
  onClose,
}: ScreenBackDropProps) {
  return (
    <div
      className="transparent-overlay"
      onClick={onClose}
    >
      <div
        className="transparent-overlay-content"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
