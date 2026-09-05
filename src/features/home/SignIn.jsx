import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./SignIn.css";
import { API_URL } from "../../api/config";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const correction = location.state?.correction;
  const returnTo = location.state?.returnTo;

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          path: "sign in",
          action: "start",
          email: email,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "Failed to send verification code.");
        return;
      }

      setStep("otp");

    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const otp = form.get("otp");

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
        alert(result.message || "Verification failed.");
        return;
      }

      localStorage.setItem(
        "identityToken",
        result.data.identityToken
      );

       navigate(returnTo, {
  state: { correction },
  replace: true,
});

    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sign-in">

       <button
  className="go-back"
  onClick={() => navigate(-1) }
>
  〈
</button>

      <div className="sign-in-card">

        <h1>Thiucham</h1>

        {step === "email" && (
          <>
            <p className="sign-in-description">
              To keep track of your suggestions,
              we'll verify your email address.
            </p>

            <form onSubmit={handleEmailSubmit}>

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send verification code"}
              </button>

            </form>

            <p className="sign-in-note">
              We'll send a 4-digit verification
              code to this email.
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <h4>Check your email</h4>

            <p className="sign-in-description">
              We sent a 4-digit verification code
              to <strong>{email}</strong>.
            </p>

            <form onSubmit={handleOtpSubmit}>

              <label htmlFor="otp">
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength="4"
                pattern="[0-9]{4}"
                autoComplete="one-time-code"
                placeholder="0000"
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Verifying..."
                  : "Verify"}
              </button>

            </form>

            <button
              type="button"
              onClick={() => setStep("email")}
              disabled={loading}
            >
              ← Change email
            </button>
          </>
        )}

      </div>

    </main>
  );
}
