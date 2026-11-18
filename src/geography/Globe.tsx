// An interactive 2D globe: drag to spin, optional auto-rotation, night shading and latitude lines.
// Pure SVG, so it runs smoothly on ordinary phones and laptops.
import { ReactNode, useEffect, useRef, useState } from "react";
import { svgPoint } from "../science/ui";
import { CONTINENTS, globeLine, globePath, meridian, ortho, parallel } from "./world";

export type GlobeProps = {
  size?: number; // viewBox is size×size
  lon0?: number; // controlled centre longitude
  onSpin?: (lon0: number) => void;
  autoSpin?: number; // degrees per second (0 = off)
  lat0?: number;
  grid?: boolean;
  parallels?: { lat: number; color: string; label?: string }[];
  meridians?: { lon: number; color: string; label?: string }[];
  night?: number | null; // longitude of the sub-solar point; shades the night side
  highlight?: string | null; // continent key to emphasise
  onContinent?: (key: string) => void;
  children?: (project: (lon: number, lat: number) => { x: number; y: number; visible: boolean }) => ReactNode;
  draggable?: boolean;
};

export default function Globe({
  size = 300,
  lon0: controlled,
  onSpin,
  autoSpin = 0,
  lat0 = 0,
  grid = true,
  parallels = [],
  meridians = [],
  night = null,
  highlight = null,
  onContinent,
  children,
  draggable = true,
}: GlobeProps) {
  const [inner, setInner] = useState(20);
  const lon0 = controlled ?? inner;
  const set = (v: number) => {
    const w = ((v + 540) % 360) - 180;
    if (controlled === undefined) setInner(w);
    onSpin?.(w);
  };
  const drag = useRef<{ x: number; lon: number } | null>(null);
  const R = size / 2 - 6;
  const C = size / 2;

  useEffect(() => {
    if (!autoSpin) return;
    let raf = 0;
    let last = performance.now();
    let cur = lon0;
    const tick = (t: number) => {
      if (!drag.current) {
        cur += (autoSpin * (t - last)) / 1000;
        set(cur);
      }
      last = t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoSpin]); // eslint-disable-line react-hooks/exhaustive-deps

  const project = (lon: number, lat: number) => {
    const q = ortho(lon, lat, lon0, R, lat0);
    return { x: q.x + C, y: q.y + C, visible: q.visible };
  };

  // Night side, for a view centred on the equator with the sun over longitude `night`:
  // the shadow is bounded by half the rim and by the terminator, which projects as a half-ellipse.
  const nightPath = (() => {
    if (night === null) return "";
    const rad = Math.PI / 180;
    const delta = (night - lon0) * rad; // sun's longitude relative to the view centre
    const side = Math.sin(delta) >= 0 ? -1 : 1; // night lies opposite the sun
    let m = delta + Math.PI / 2;
    if (Math.cos(m) < 0) m = delta - Math.PI / 2;
    const a = R * Math.sin(m);
    const pts = Array.from({ length: 37 }, (_, i) => {
      const phi = (-90 + i * 5) * rad;
      return `L${(a * Math.cos(phi)).toFixed(1)} ${(-R * Math.sin(phi)).toFixed(1)}`;
    });
    return `M0 ${-R} A${R} ${R} 0 0 ${side > 0 ? 1 : 0} 0 ${R} ${pts.join(" ")} Z`;
  })();

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="block h-auto w-full select-none"
      onPointerDown={(e) => {
        if (!draggable) return;
        const p = svgPoint(e.currentTarget, e);
        drag.current = { x: p.x, lon: lon0 };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const p = svgPoint(e.currentTarget, e);
        set(drag.current.lon - ((p.x - drag.current.x) / R) * 70);
      }}
      onPointerUp={() => (drag.current = null)}
      style={{ touchAction: draggable ? "pan-y" : undefined, cursor: draggable ? "grab" : undefined }}
    >
      <defs>
        <radialGradient id="ocean" cx=".38" cy=".32" r=".8">
          <stop offset="0" stopColor="#4fb3e8" />
          <stop offset=".7" stopColor="#1f6fa8" />
          <stop offset="1" stopColor="#0d3f6b" />
        </radialGradient>
        <radialGradient id="shine" cx=".32" cy=".28" r=".6">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={R + 4} fill="#7fd0ff" opacity=".15" />
      <circle cx={C} cy={C} r={R} fill="url(#ocean)" />
      <g transform={`translate(${C} ${C})`}>
        {Object.entries(CONTINENTS).map(([k, c]) => {
          const d = globePath(c.pts, lon0, R, lat0);
          return d ? (
            <path
              key={k}
              d={d}
              fill={c.color}
              stroke={highlight === k ? "#fff" : "#00000022"}
              strokeWidth={highlight === k ? 3 : 1}
              opacity={highlight && highlight !== k ? 0.55 : 1}
              onClick={onContinent ? () => onContinent(k) : undefined}
              style={{ cursor: onContinent ? "pointer" : undefined }}
            />
          ) : null;
        })}
        {grid && [-60, -30, 0, 30, 60].map((la) => <path key={"p" + la} d={globeLine(parallel(la), lon0, R, lat0)} stroke="#ffffff" strokeOpacity=".22" strokeWidth="1" fill="none" />)}
        {grid && Array.from({ length: 12 }, (_, i) => i * 30 - 180).map((lo) => <path key={"m" + lo} d={globeLine(meridian(lo), lon0, R, lat0)} stroke="#ffffff" strokeOpacity=".18" strokeWidth="1" fill="none" />)}
        {parallels.map((p) => (
          <path key={"P" + p.lat} d={globeLine(parallel(p.lat), lon0, R, lat0)} stroke={p.color} strokeWidth="2.5" fill="none" strokeDasharray={p.lat === 0 ? undefined : "6 4"} />
        ))}
        {meridians.map((m) => (
          <path key={"M" + m.lon} d={globeLine(meridian(m.lon), lon0, R, lat0)} stroke={m.color} strokeWidth="2.5" fill="none" />
        ))}
        {nightPath && <path d={nightPath} fill="#020617" opacity=".55" />}
      </g>
      <circle cx={C} cy={C} r={R} fill="url(#shine)" pointerEvents="none" />
      {children?.(project)}
    </svg>
  );
}
