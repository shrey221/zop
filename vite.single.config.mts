// Builds the whole Zopio app — including both learning modules — into ONE html file
// (dist-single/zopio.html) that opens straight from disk on any laptop. Backup for the demo.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import tailwindcss from "tailwindcss";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: here,
  base: "./",
  publicDir: false,
  plugins: [
    react(),
    viteSingleFile(),
    {
      // No manifest or icon files beside a single html file: embed the icon instead.
      name: "inline-icon",
      transformIndexHtml(html) {
        const icon = fs.readFileSync(path.join(here, "public/icons/icon-192.png")).toString("base64");
        return html
          .replace(/\s*<link rel="manifest"[^>]*>/, "")
          .replace(/\s*<link rel="apple-touch-icon"[^>]*>/, "")
          .replace(/href="\.\/icons\/icon-192\.png"/, `href="data:image/png;base64,${icon}"`);
      },
    },
    {
      name: "rename-output",
      closeBundle() {
        const out = path.join(here, "dist-single");
        fs.renameSync(path.join(out, "index.html"), path.join(out, "zopio.html"));
      },
    },
  ],
  define: { __SINGLE__: "true" },
  css: { postcss: { plugins: [tailwindcss(path.join(here, "tailwind.config.ts"))] } },
  build: { outDir: path.join(here, "dist-single"), emptyOutDir: true, assetsInlineLimit: 100_000_000 },
});
