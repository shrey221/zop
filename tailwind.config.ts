import type { Config } from "tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export default {
  content: [path.join(here, "index.html"), path.join(here, "src/**/*.{ts,tsx}")],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0e0e10", soft: "#2a2a2e", mute: "#6b6a70" },
        cream: { DEFAULT: "#f6f2ea", deep: "#ece5d8" },
        sci: { DEFAULT: "#5b3df5", deep: "#1c1452", glow: "#ffc93d" },
        his: { DEFAULT: "#c4552b", deep: "#5a2412", glow: "#f2b04a" },
        mint: "#1fb88a",
      },
      fontFamily: {
        display: ['"Baloo 2"', "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(14,14,16,.04), 0 10px 30px -12px rgba(14,14,16,.25)",
        lift: "0 20px 50px -18px rgba(14,14,16,.45)",
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        pop: { "0%": { opacity: "0", transform: "scale(.6)" }, "60%": { opacity: "1", transform: "scale(1.06)" }, "100%": { transform: "scale(1)" } },
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
        up: { from: { transform: "translateY(100%)" }, to: { transform: "none" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        shine: { from: { transform: "translateX(-120%) skewX(-20deg)" }, to: { transform: "translateX(320%) skewX(-20deg)" } },
        glow: { "0%,100%": { opacity: ".55" }, "50%": { opacity: "1" } },
        shake: { "0%,100%": { transform: "translateX(0)" }, "25%": { transform: "translateX(-6px)" }, "75%": { transform: "translateX(6px)" } },
        wave: { "0%,60%,100%": { transform: "rotate(0)" }, "15%,45%": { transform: "rotate(18deg)" }, "30%": { transform: "rotate(-10deg)" } },
      },
      animation: {
        rise: "rise .6s cubic-bezier(.2,.8,.2,1) both",
        pop: "pop .7s cubic-bezier(.2,.8,.2,1) both",
        fade: "fade .4s ease both",
        up: "up .45s cubic-bezier(.2,.8,.2,1) both",
        float: "float 4s ease-in-out infinite",
        shine: "shine 2.8s ease-in-out infinite",
        glow: "glow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
