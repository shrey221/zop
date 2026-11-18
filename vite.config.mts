// Builds Zopio as an installable web app (PWA) into dist/.
// Upload dist/ to any static host (e.g. Netlify Drop), open the link on a phone and "Add to Home screen".
// After the first visit everything is cached by sw.js, so the demo works with no internet.
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const MODULE_FILES = ["light-lab.html", "time-travel.html"];

// Copies the two learning modules into the build and writes a service worker that pre-caches every file.
function offlinePwa(): Plugin {
  return {
    name: "zopio-offline",
    apply: "build",
    generateBundle(_, bundle) {
      for (const f of MODULE_FILES) {
        this.emitFile({ type: "asset", fileName: `modules/${f}`, source: fs.readFileSync(path.join(here, "modules", f)) });
      }
      const publicFiles = fs.readdirSync(path.join(here, "public"), { recursive: true, withFileTypes: true })
        .filter((d) => d.isFile())
        .map((d) => path.relative(path.join(here, "public"), path.join(d.parentPath, d.name)).replace(/\\/g, "/"));
      const files = ["./", ...Object.keys(bundle), ...publicFiles].map((f) => (f === "./" ? f : `./${f}`));
      const version = Date.now().toString(36);
      const sw = fs.readFileSync(path.join(here, "src/sw.template.js"), "utf8")
        .replace("__VERSION__", version)
        .replace("__FILES__", JSON.stringify(files));
      this.emitFile({ type: "asset", fileName: "sw.js", source: sw });
    },
  };
}

export default defineConfig({
  root: here,
  base: "./",
  plugins: [react(), offlinePwa()],
  define: { __SINGLE__: "false" },
  css: { postcss: { plugins: [tailwindcss(path.join(here, "tailwind.config.ts"))] } },
  server: { port: 5175 },
  build: { outDir: path.join(here, "dist"), emptyOutDir: true },
});
