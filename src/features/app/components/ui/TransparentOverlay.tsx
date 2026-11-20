type TransparentOverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export default function TransparentOverlay({
  children,
  onClose,
}: TransparentOverlayProps) {
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
