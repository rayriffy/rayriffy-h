import { defineConfig } from "vite";

import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import tailwind from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwind(), react(), babel({ presets: [reactCompilerPreset()] }), generouted()],
  resolve: {
    tsconfigPaths: true,
  },
});
