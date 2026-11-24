
export default function Download() {
  return (
    <main>
      {/* Page Heading */}
      <section>
        <h1>Install Thiucham App on your Android device</h1>

        <div>
          <a
            href="https://rawcdn.githack.com/Thiucham/Webapp/953119da918ed03e92d91dccb6e8771f705f6910/base.apk"
            download
          >
            Download App
          </a>

          <a
            href="https://thiucham.github.io/Webapp/"
            target="_blank"
            rel="noreferrer"
          >
            Open from browser
          </a>
        </div>
      </section>

      {/* Installation Guide */}
      <section>
        <h2>Simplified APK Installation Guide</h2>

        <div>
          <h3>1. Download the App</h3>
          <p>Tap the "Download App" button.</p>
        </div>

        <div>
          <h3>2. Open the File</h3>
          <p>
            Once it's downloaded, open your phone's
            "Downloads" folder (you can usually find this
            in your file manager app or through your
            browser's download list). Then, tap on the
            downloaded Thiucham App APK file.
          </p>
        </div>

        <div>
          <h3>3. Allow Installation</h3>
          <p>
            Your phone will likely warn you that this
            type of file can be harmful. This is normal
            for apps not from the Google Play Store.
            You'll need to allow your browser (like
            Chrome) to install apps from unknown sources.
            The exact steps for this vary a little, but
            generally you'll:
          </p>

          <ul>
            <li>Go to your device's Settings.</li>
            <li>
              Look for Apps, Apps & Notifications, or
              Security & Privacy.
            </li>
            <li>
              Find Special app access or Install
              unknown apps.
            </li>
            <li>
              Select the browser you used to download
              the file (e.g., Chrome) and toggle on
              the permission to "Allow from this source".
            </li>
          </ul>
        </div>

        <div>
          <h3>4. Install and Open</h3>
          <p>
            After granting permission, you can proceed
            with the installation. Once it's done,
            you'll find the Thiucham App on your
            device's home screen. The first time you
            open it, you'll need an internet connection
            to set it up.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2>Public User Reviews</h2>

        <a
          href="https://sites.google.com/view/thiucham/We-Love-Your-Review"
          target="_blank"
          rel="noreferrer"
        >
          Leave a review
        </a>
      </section>
    </main>
  );
}
