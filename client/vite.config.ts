import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "./img/apple-touch-icon.png"],
      manifest: {
        short_name: "speedrun_system",
        name: "Speedrun System",
        description: "A system for speedrunners.",
        start_url: "/?source=pwa",
        background_color: "#f4f3f3",
        display: "standalone",
        scope: "/",
        theme_color: "#5a458f",
        icons: [
          {
            src: "/img/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
