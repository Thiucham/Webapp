
import "./SignIn.css";

import GoogleSignInButton from "./components/GoogleSignInButton";
import EmailSignInForm from "./components/EmailSignInForm";

export default function SignIn() {
  return (
    <main className="sign-in">
      <button
        className="go-back"
        onClick={() => window.history.back()}
        aria-label="Go back"
      >
        〈
      </button>

      <div className="sign-in-card">
        <h1>Thiucham</h1>

        <p className="sign-in-description">
          To keep track of your suggestions,
          please verify your identity.
        </p>

        <GoogleSignInButton />

        <div className="sign-in-divider">
          <span>OR</span>
        </div>

        <EmailSignInForm />
      </div>
    </main>
  );
}
