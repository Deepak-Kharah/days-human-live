// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        googlea62ebf979986f3ac: resolve(
          __dirname,
          "googlea62ebf979986f3ac.html"
        ),
      },
    },
  },
});
