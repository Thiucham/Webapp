import { useLocation } from "react-router-dom";
import { useState } from "react";

import "../styles/CorrectionPage.css";
import { API_URL } from "../../../api/config";

export default function CorrectionPage() {
  const location = useLocation();

  const correction = location.state?.correction;

  const [lyrics, setLyrics] = useState(
    correction?.originalLyrics || ""
  );

  function handleChange(event) {
    setLyrics(event.target.value);
  }

 async function handleSubmit() {
  if (lyrics === correction.originalLyrics) {
  alert("No changes have been made. Please make some changes before submitting.");
  return;
}

 const identityToken = localStorage.getItem("identityToken");

const submission = {
  identityToken,
  collection: correction.collection,
  songId: correction.songId,
  originalLyrics: correction.originalLyrics,
  correctedLyrics: lyrics,
};

  console.log(submission);
}

  if (!correction) {
    return (
      <div className="correction-empty">
        No correction session found.
      </div>
    );
  }

  return (
    <div className="fullscreen-overlay">
    <main className="correction">

      <h3>
        {correction.songId}. {correction.title}
      </h3>

      <form className="correction-editor">
        <textarea
          value={lyrics}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

    </main>
    </div>
  );
}
