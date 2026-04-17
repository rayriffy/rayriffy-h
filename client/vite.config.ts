import { defineConfig } from "vite";

import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import tailwind from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
// import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwind(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    generouted(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //   },
    // }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
