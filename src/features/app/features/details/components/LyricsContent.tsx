type LyricsSection = {
  key: string;
  text: string;
};

type LyricsContentProps = {
  sections: LyricsSection[];
  onDoubleClick: () => void;
};

export default function LyricsContent({
  sections,
  onDoubleClick,
}: LyricsContentProps) {
  return (
    <div
      className="lyrics-container"
      onDoubleClick={onDoubleClick}
    >
      {sections.map(({ key, text }) => (
        <div
          key={key}
          className="lyrics"
        >
          {text}
        </div>
      ))}
    </div>
  );
}
