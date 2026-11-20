
type DetailHeaderProps = {
  header: {
    ID: string;
    Title: string;
    Translation?: string;
    Key?: string;
    Time?: string;
  };
};

export default function DetailHeader({ header }: DetailHeaderProps) {
  return (
    <>
      <div className="primary">
        <div>{header.ID}</div>
        <div>{header.Title}</div>
      </div>

      {header.Translation && (
        <div className="secondary">
          {header.Translation}
        </div>
      )}

      <div className="helper">
        <div className="song-meta-item">
          <span className="song-meta-label">KEY</span>
          <span className="song-meta-value">
            {header.Key || "⚪"}
          </span>
        </div>

        <div className="song-meta-item">
          <span className="song-meta-label">TIME</span>
          <span className="song-meta-value">
            {header.Time || "⚪"}
          </span>
        </div>
      </div>
    </>
  );
}
