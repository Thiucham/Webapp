
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter({
      appDirectory: "src",
    }),

    VitePWA({
      registerType: "autoUpdate",
      scope: "/Webapp/app/",

      manifest: {
        name: "Thiucham",
        short_name: "Thiucham",
        description: "Thiucham Web App",

        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",

        start_url: "/Webapp/app/",
        scope: "/Webapp/app/",

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

  server: {
    host: true,
  },

  base: "/Webapp/",
});
