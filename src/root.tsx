import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { registerSW } from "virtual:pwa-register";

import "~/features/app/styles/Variables.css";
import "~/features/app/styles/Global.css";
import "~/features/app/styles/Utilities.css";
import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    registerSW();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/Webapp/icons/icon-192.png"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />

        <title>Thiucham</title>
        <meta
  name="description"
  content="Thiucham - Your collection of songs and lyrics."
/>
        <link rel="manifest" href="/Webapp/manifest.webmanifest" />
      </head>
      <body>
        <div id="root">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
