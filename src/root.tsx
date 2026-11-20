import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { registerSW } from "virtual:pwa-register";

import "./styles/Variables.css";
import "./styles/Global.css";
import "./styles/Utilities.css";

export default function Root() {
  registerSW();

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
          href="/Webapp/icon-192.png"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />

        <title>Thiucham</title>
        <Meta />
        <Links />
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
