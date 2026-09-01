import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Thiucham",
        short_name: "Thiucham",
        description: "Thiucham Web App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/Webapp/",
         scope: "/Webapp/",
        icons: [
          {
            src: "/Webapp/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Webapp/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,json,webp,woff2}",
        ],
      },
    }),
  ],

  base: "/Webapp/",
});
