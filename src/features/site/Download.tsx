export default function Download() {
  return (
    <main>
      {/* Page Heading */}
      <section>
        <h1>Install Thiucham App</h1>
        <p>
          Thiucham works as an installable web app—no app store or APK download
          needed. Add it to your home screen for full-screen access and faster
          loading.
        </p>

        <div>
          <a
            href="https://thiucham.github.io/Webapp/"
            target="_blank"
            rel="noreferrer"
          >
            Open Thiucham Web App
          </a>
        </div>
      </section>

      {/* Platform Guides */}
      <section>
        <h2>How to Install on Your Device</h2>

        {/* Android */}
        <div>
          <h3>Android (Chrome / Edge / Brave)</h3>
          <ol>
            <li>
              Open{" "}
              <a
                href="https://thiucham.github.io/Webapp/"
                target="_blank"
                rel="noreferrer"
              >
                thiucham.github.io/Webapp
              </a>{" "}
              in <strong>Chrome</strong>.
            </li>
            <li>
              Tap the <strong>three-dot menu (⋮)</strong> in the top-right
              corner of the browser.
            </li>
            <li>
              Tap <strong>Add to Home screen</strong> or{" "}
              <strong>Install app</strong>, then confirm by tapping{" "}
              <strong>Install</strong>.
            </li>
          </ol>
        </div>

        {/* iOS */}
        <div>
          <h3>iPhone &amp; iPad (Safari)</h3>
          <ol>
            <li>
              Open{" "}
              <a
                href="https://thiucham.github.io/Webapp/"
                target="_blank"
                rel="noreferrer"
              >
                thiucham.github.io/Webapp
              </a>{" "}
              in <strong>Safari</strong>.
            </li>
            <li>
              Tap the <strong>Share</strong> icon (the square with an arrow
              pointing up) at the bottom of the screen.
            </li>
            <li>
              Scroll down and tap <strong>Add to Home Screen</strong>, then tap{" "}
              <strong>Add</strong> in the top-right corner.
            </li>
          </ol>
        </div>

        {/* Desktop */}
        <div>
          <h3>Desktop (Chrome / Edge)</h3>
          <ol>
            <li>
              Open{" "}
              <a
                href="https://thiucham.github.io/Webapp/"
                target="_blank"
                rel="noreferrer"
              >
                thiucham.github.io/Webapp
              </a>{" "}
              in Chrome or Edge.
            </li>
            <li>
              Click the <strong>Install icon</strong> on the right side of the
              address bar (or open the browser menu <strong>⋮</strong> →{" "}
              <strong>Cast, save, and share</strong> →{" "}
              <strong>Install page as app</strong>).
            </li>
            <li>
              Click <strong>Install</strong> to add Thiucham to your apps and
              desktop.
            </li>
          </ol>
        </div>
      </section>

      {/* Helpful Notes */}
      <section>
        <h2>Good to Know</h2>
        <ul>
          <li>
            <strong>Automatic updates:</strong> Unlike an APK, the installed
            web app updates automatically whenever new songs or features are
            published—you never have to reinstall it.
          </li>
          <li>
            <strong>Use the main browser:</strong> If you opened this link
            inside WhatsApp, Facebook, or Instagram&apos;s in-app browser, tap
            the menu and choose <strong>Open in Chrome</strong> or{" "}
            <strong>Open in Safari</strong> first, as in-app browsers do not
            support installing apps.
          </li>
          <li>
            <strong>Already on the app?</strong> If you are viewing this page
            inside Thiucham right now, just open your browser&apos;s menu
            directly without opening a new tab.
          </li>
        </ul>
      </section>
    </main>
  );
}
