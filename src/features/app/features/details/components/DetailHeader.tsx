type DetailHeaderProps = {
  header: {
    ID: string;
    Title: string;
    Translation?: string;
    Key?: string;
    Time?: string;
  };
};

import "./DetailHeader.css";

export default function DetailHeader({ header }: DetailHeaderProps) {
  return (
    <>
      <div className="detail-head">
        <div>{header.ID}</div>
        <div>{header.Title}</div>
      </div>

      {header.Translation && (
        <div className="translation">
          {header.Translation}
        </div>
      )}

      <div className="detail-meta-info">
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
