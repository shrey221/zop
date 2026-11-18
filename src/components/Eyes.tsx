// The Zopio logo, drawn in code so it stays sharp and the eyes can move, blink and follow a finger.
import { useEffect, useRef, useState } from "react";

export type Look = { x: number; y: number };

const EYE_R = 18.5;
const PUPIL_R = 10.5;
const MAX = 8; // how far a pupil may travel from the centre of its eye
const EYES = [29, 71];
export const BRAND_LOOK: Look = { x: 7, y: -4.5 };

type Props = {
  size?: number;
  look?: Look | null; // fixed gaze; overrides following
  follow?: boolean; // track the pointer / finger
  blink?: boolean;
  bare?: boolean; // eyes only, no black tile
  className?: string;
  title?: string;
};

export default function Eyes({ size = 64, look = null, follow = false, blink = true, bare = false, className = "", title }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [gaze, setGaze] = useState<Look>(BRAND_LOOK);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!follow || look) return;
    const move = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(MAX, d / 18) / d;
      setGaze({ x: dx * k, y: dy * k });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", move);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
    };
  }, [follow, look]);

  useEffect(() => {
    if (!blink) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(() => {
        setClosed(true);
        window.setTimeout(() => setClosed(false), 140);
        loop();
      }, 2200 + Math.random() * 2800);
    };
    loop();
    return () => window.clearTimeout(t);
  }, [blink]);

  const g = look ?? gaze;
  const m = Math.hypot(g.x, g.y);
  const p = m > MAX ? { x: (g.x / m) * MAX, y: (g.y / m) * MAX } : g;

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {!bare && <rect width="100" height="100" rx="22" fill="#0e0e10" />}
      {EYES.map((cx) => (
        <g
          key={cx}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transform: closed ? "scaleY(.08)" : "none",
            transition: "transform 90ms ease-in",
          }}
        >
          <circle cx={cx} cy={50} r={EYE_R} fill="#fff" />
          <circle
            cx={cx}
            cy={50}
            r={PUPIL_R}
            fill="#0e0e10"
            style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: "transform 160ms cubic-bezier(.2,.8,.2,1)" }}
          />
        </g>
      ))}
    </svg>
  );
}

// Eyes that glance around on their own — for splash and loading screens.
export function useWander(active: boolean, steps: Look[], every = 700) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % steps.length), every);
    return () => window.clearInterval(t);
  }, [active, steps.length, every]);
  return steps[i];
}

export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-display font-extrabold lowercase leading-none tracking-tight ${className}`}>zopio</span>;
}
