
import { useState } from "react";
import { useNavigate } from "react-router";

import "./VerifyEmail.css";
import { API_URL } from "~/features/app/api/config";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("pendingEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // No email means the user has not started the sign-in process.
  if (!email) {
    return (
      <main className="verify-email">
        <div className="verify-email-card">
          <h1>Thiucham</h1>

          <p>
            No pending verification was found.
            Please start by entering your email.
          </p>

          <button
            onClick={() => navigate("/sign-in", {
              replace: true,
            })}
          >
            Go to sign in
          </button>
        </div>
      </main>
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          path: "sign in",
          action: "verify",
          email: email,
          otp: otp,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(
          result.message || "Verification failed."
        );
        return;
      }

      localStorage.setItem(
        "identityToken",
        result.data.identityToken
      );

      sessionStorage.removeItem("pendingEmail");

      // Temporary default destination.
      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error("Verification error:", error);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="verify-email">

      <button
        className="verify-go-back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        〈
      </button>

      <div className="verify-email-card">

        <h1>Thiucham</h1>

        <h2>Check your email</h2>

        <p className="verify-description">
          We sent a 4-digit verification code to
          <strong> {email}</strong>.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="otp">
            Verification code
          </label>

          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="0000"
            maxLength={4}
            pattern="[0-9]{4}"
            value={otp}
            onChange={(event) =>
              setOtp(
                event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4)
              )
            }
            required
          />

          {error && (
            <p className="verify-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 4}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

        </form>

        <button
          type="button"
          className="change-email-button"
          onClick={() => navigate("/sign-in")}
          disabled={loading}
        >
          ← Change email
        </button>

      </div>
    </main>
  );
}
