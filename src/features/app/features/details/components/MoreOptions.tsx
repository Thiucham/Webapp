import TransparentOverlay from "~/features/app/components/ui/TransparentOverlay.tsx";

type MoreOptionsProps = {
  onClose: () => void;
};

export default function MoreOptions({
  onClose,
}: MoreOptionsProps) {

  return (
    <TransparentOverlay onClose={onClose}>
      <div className="more-options">
        <button
          className="close"
          onClick={onClose}
          aria-label="Close"
        >
          ❌
        </button>

        {/* More options will go here */}
      </div>
    </TransparentOverlay>
  );
}
