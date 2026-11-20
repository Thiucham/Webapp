type DetailActionsProps = {
  isFavourite: boolean;
  onToggle: () => void;
  onMore: () => void;
};

export default function DetailActions({
  isFavourite,
  onToggle,
  onMore,
}: DetailActionsProps) {
  return (
    <div className="detail-actions">
      <button
        aria-label="Toggle favourites"
        onClick={onToggle}
      >
        {isFavourite ? "⭐" : "☆"}
      </button>

      <button
        onClick={onMore}
        aria-label="More actions"
        title="More actions"
      >
        ⋮
      </button>
    </div>
  );
}
