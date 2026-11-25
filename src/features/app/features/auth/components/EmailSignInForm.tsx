
import { useState } from "react";
import { useNavigate } from "react-router";

import { API_URL } from "~/features/app/api/config";

export default function EmailSignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          path: "sign in",
          action: "start",
          email: email.trim(),
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(
          result.message ||
          "Failed to send verification code."
        );
        return;
      }

      sessionStorage.setItem(
        "pendingEmail",
        email.trim()
      );

      navigate("/sign-in/verify");

    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Continue with email
      </label>

      <input
        id="email"
        type="email"
        placeholder="your@email.com"
        autoComplete="email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        required
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Continue with email"}
      </button>

      <p className="sign-in-note">
        We'll send a 4-digit verification
        code to your email.
      </p>
    </form>
  );
}
