
export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      className="google-sign-in-button"
      onClick={() => {
        // Google authentication will be implemented here.
      }}
    >
      <span className="google-icon" aria-hidden="true">
        G
      </span>

      Continue with Google
    </button>
  );
}
