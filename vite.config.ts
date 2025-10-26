// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        projects: "projects.html",
        experience: "experience.html",
        contact: "contact.html",
      },
    },
  },
  server: {
    open: "/index.html",
  },
});
