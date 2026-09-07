import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/CorrectionPage.css";
import { API_URL } from "../../../api/config";

export default function CorrectionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const correction = location.state?.correction;

  const [lyrics, setLyrics] = useState(
    correction?.originalLyrics || ""
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setLyrics(event.target.value);
  }

async function handleSubmit() {
  if (lyrics === correction.originalLyrics) {
    alert(
      "No changes have been made. Please make some changes before submitting."
    );
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

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        path: "correction",
        ...submission,
      }),
    });

    const result = await response.json();

    if (result.success) {
  setSubmitted(true);
} else {
  alert(result.error || "Failed to submit correction.");
}

  } catch (error) {
    alert(error.message || "Failed to submit correction.");
  } finally {
    setLoading(false);
  }
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

      {!submitted ? (
        <>
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
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </>
      ) : (
        <div className="correction-success">
          <h3>Correction submitted</h3>

          <p>
            Thank you. Your correction has been submitted for review.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            OK
          </button>
        </div>
      )}

    </main>
  </div>
);
}
