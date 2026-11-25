import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { registerSW } from "virtual:pwa-register";
import { useEffect } from "react";

import "~/features/app/styles/Variables.css";
import "~/features/app/styles/Global.css";
import "~/features/app/styles/Utilities.css";

export const meta = () => [
  { title: "Thiucham" },
  {
    name: "description",
    content:
      "Explore songs, lyrics and your favourite music collections on Thiucham.",
  },
  {
    name: "keywords",
    content:
      "Hiuna Khomlui, Khristen Madui Lui, Luisan, Liangmai Hymnal, Liangmai Gospel Lyrics",
  },
];

export default function Root() {
  useEffect(() => {
  if (import.meta.env.PROD) {
    registerSW();
  }
}, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />

        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/Webapp/icons/icon-192.png"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
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
