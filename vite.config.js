import { defineConfig } from "vite";

// Match the project repository path on GitHub Pages; local development stays at /.
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? "/pet-heaven/" : "/",
  server: { host: "127.0.0.1" },
}));
