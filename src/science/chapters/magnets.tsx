// Chapter 13 · Fun with Magnets (NCERT Science Class VI, 2018-19, pp. 125–135).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useMemo, useRef, useState } from "react";
import { Figure } from "../../civics/kit";
import { ExploreLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage, svgPoint, useSvgDrag } from "../ui";

const RED = "#e5484d";
const BLUE = "#3d7bfd";

// A bar magnet centred at (x, y), rotated by `deg`. North half red, south half blue.
function BarMagnet({ x, y, w = 140, h = 34, deg = 0, label = true }: { x: number; y: number; w?: number; h?: number; deg?: number; label?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${deg})`}>
      <rect x={-w / 2} y={-h / 2} width={w / 2} height={h} rx="4" fill={RED} />
      <rect x={0} y={-h / 2} width={w / 2} height={h} rx="4" fill={BLUE} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="4" fill="none" stroke="#0b0b18" strokeOpacity=".35" strokeWidth="2" />
      {label && (
        <>
          <text x={-w / 2 + 14} y={6} fontSize="16" fontWeight="900" fill="#fff" textAnchor="middle">N</text>
          <text x={w / 2 - 14} y={6} fontSize="16" fontWeight="900" fill="#fff" textAnchor="middle">S</text>
        </>
      )}
    </g>
  );
}

// A crumpled square of aluminium foil.
function Foil({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-14 -10 L-4 -13 L6 -9 L14 -12 L12 0 L15 10 L3 12 L-6 9 L-15 11 L-12 0 Z" fill="#c9cfdc" stroke="#8d93a8" strokeWidth="1.5" />
      <path d="M-8 -5 L2 -2 L9 -6 M-6 4 L4 2 L10 6" stroke="#ffffff" strokeOpacity=".7" strokeWidth="1.5" fill="none" />
    </g>
  );
}

/* ───────────── Stop 1 · The Magnes walk ───────────── */

const THINGS = [
  { id: "clip", name: "Paper clip", icon: "📎", x: 70, y: 250, magnetic: true },
  { id: "nail", name: "Iron nail", icon: "🔩", x: 300, y: 285, magnetic: true },
  { id: "pin", name: "Pin", icon: "📌", x: 440, y: 230, magnetic: true },
  { id: "ball", name: "Iron ball", icon: "", x: 190, y: 300, magnetic: true },
  { id: "scale", name: "Plastic scale", icon: "📏", x: 140, y: 210, magnetic: false },
  { id: "eraser", name: "Eraser", icon: "🧽", x: 380, y: 300, magnetic: false },
  { id: "pencil", name: "Wooden pencil", icon: "✏️", x: 250, y: 225, magnetic: false },
  { id: "sock", name: "Cloth", icon: "🧦", x: 470, y: 295, magnetic: false },
  { id: "paper", name: "Paper", icon: "📄", x: 40, y: 305, magnetic: false },
  { id: "bangle", name: "Glass bangle", icon: "⭕", x: 350, y: 220, magnetic: false },
  { id: "spoon", name: "Steel spoon", icon: "🥄", x: 235, y: 300, magnetic: true },
  { id: "foil", name: "Aluminium foil", icon: "", x: 420, y: 272, magnetic: false },
];

function MagnesWalk({ discover }: SimProps) {
  const [tip, setTip] = useState({ x: 260, y: 120 });
  const [stuck, setStuck] = useState<string[]>([]);
  const [nope, setNope] = useState<string | null>(null);
  const [tested, setTested] = useState<string[]>([]);
  const [askCommon, setAskCommon] = useState(false);
  const magnetic = THINGS.filter((t) => t.magnetic).map((t) => t.id);

  const drag = useSvgDrag((x, y) => {
    const p = { x: Math.max(20, Math.min(500, x)), y: Math.max(40, Math.min(320, y)) };
    setTip(p);
    for (const t of THINGS) {
      if (stuck.includes(t.id) || Math.hypot(t.x - p.x, t.y - p.y) > 34) continue;
      setTested((s) => (s.includes(t.id) ? s : [...s, t.id]));
      if (t.magnetic) setStuck((s) => (s.includes(t.id) ? s : [...s, t.id]));
      else setNope(t.id);
    }
  });

  useEffect(() => {
    if (stuck.length) discover("pull");
    if (nope) discover("not");
    if (magnetic.every((m) => stuck.includes(m))) discover("all");
    if (nope === "foil") discover("metal");
  }, [stuck, nope]); // eslint-disable-line react-hooks/exhaustive-deps

  const nopeThing = THINGS.find((t) => t.id === nope);
  const allFound = magnetic.every((m) => stuck.includes(m));

  return (
    <Stage
      caption={
        askCommon
          ? "They all contain iron (steel is mostly iron)! Materials attracted by a magnet — like iron, nickel and cobalt — are called magnetic."
          : nopeThing
            ? nopeThing.id === "foil"
              ? "Aluminium foil: not attracted! Aluminium is a metal, but it is non-magnetic. Not every metal sticks to a magnet."
              : `${nopeThing.name}: not attracted. It is non-magnetic.`
            : stuck.length
              ? `${stuck.length} of ${magnetic.length} magnetic things picked up. Keep walking!`
              : "Drag the magnet at the end of the stick over the playground. What does it pick up?"
      }
    >
      <svg viewBox="0 0 520 340" className="block h-auto w-full select-none">
        <rect width="520" height="340" fill="#13112b" />
        <rect y="180" width="520" height="160" fill="#2a4a33" />
        {/* school building, tree and sun behind the playground */}
        <circle cx="70" cy="80" r="26" fill="#ffd257" opacity=".85" />
        <rect x="250" y="88" width="230" height="94" rx="4" fill="#3b3768" />
        <path d="M240 92 L365 48 L490 92 Z" fill="#4a4580" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={266 + i * 42} y="108" width="24" height="22" rx="3" fill="#ffe7a3" opacity=".75" />
        ))}
        <rect x="350" y="142" width="30" height="40" rx="3" fill="#24214a" />
        <rect x="150" y="120" width="10" height="62" fill="#6b4a2b" />
        <circle cx="155" cy="108" r="30" fill="#2f6b43" />
        <circle cx="136" cy="122" r="20" fill="#2a5e3b" />
        <path d="M0 180 Q130 170 260 182 T520 178" fill="#335a3e" />
        <text x="16" y="30" fontSize="12" fontWeight="800" fill="#9da3c7" letterSpacing="2">SCHOOL PLAYGROUND</text>
        {THINGS.filter((t) => !stuck.includes(t.id)).map((t) => (
          <g key={t.id} className={nope === t.id ? "animate-[shake_.4s]" : ""} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            {t.icon ? (
              <text x={t.x} y={t.y + 8} fontSize="26" textAnchor="middle">
                {t.icon}
              </text>
            ) : t.id === "foil" ? (
              <Foil x={t.x} y={t.y} />
            ) : (
              <circle cx={t.x} cy={t.y} r="12" fill="#8d93a8" stroke="#5c6176" strokeWidth="2" />
            )}
            {tested.includes(t.id) && (
              <text x={t.x} y={t.y + 30} fontSize="10" fontWeight="800" fill="#ffffff99" textAnchor="middle">
                ✗ not attracted
              </text>
            )}
          </g>
        ))}
        {/* the "Magnes stick" */}
        <g {...drag}>
          <line x1={tip.x} y1={tip.y} x2={tip.x + 130} y2={tip.y - 120} stroke="#b07a3c" strokeWidth="8" strokeLinecap="round" />
          <rect x={tip.x - 26} y={tip.y - 34} width="56" height="56" fill="transparent" />
          <g transform={`translate(${tip.x} ${tip.y}) rotate(-43)`}>
            <rect x="-6" y="-12" width="22" height="24" rx="3" fill={RED} />
            <rect x="16" y="-12" width="14" height="24" rx="3" fill={BLUE} />
          </g>
          {stuck.map((id, k) => {
            const t = THINGS.find((x) => x.id === id)!;
            const ox = [-14, 6, -6, 14, 0][k];
            const oy = [14, 16, 26, 4, 34][k];
            return t.icon ? (
              <text key={id} x={tip.x + ox} y={tip.y + oy + 6} fontSize="20" textAnchor="middle" className="animate-pop">
                {t.icon}
              </text>
            ) : (
              <circle key={id} cx={tip.x + ox} cy={tip.y + oy} r="9" fill="#8d93a8" className="animate-pop" />
            );
          })}
          <circle cx={tip.x} cy={tip.y} r="30" fill="#ffd257" fillOpacity=".14" className="animate-glow" />
        </g>
      </svg>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
        {allFound && !askCommon && (
          <Btn
            onClick={() => {
              setAskCommon(true);
              discover("iron");
            }}
          >
            🤔 What do they have in common?
          </Btn>
        )}
        <Btn
          onClick={() => {
            setStuck([]);
            setTested([]);
            setNope(null);
          }}
        >
          ↺ Drop everything
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 2 · Iron filings find the poles ───────────── */

type Filing = { x: number; y: number; a: number };

// Two poles: a north at P and a south at Q. Field of each pole ~ r / |r|^3.
function field(x: number, y: number, P: { x: number; y: number }, Q: { x: number; y: number }) {
  const f = (cx: number, cy: number, s: number) => {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.max(8, Math.hypot(dx, dy));
    return [(s * dx) / d ** 3, (s * dy) / d ** 3];
  };
  const a = f(P.x, P.y, 1);
  const b = f(Q.x, Q.y, -1);
  return [a[0] + b[0], a[1] + b[1]];
}

type Shape = "bar" | "horseshoe" | "cylinder";
const NEXT_SHAPE: Record<Shape, Shape> = { bar: "horseshoe", horseshoe: "cylinder", cylinder: "bar" };
const SHAPE_NAME: Record<Shape, string> = { bar: "bar", horseshoe: "horseshoe", cylinder: "cylindrical" };

function makeFilings(shape: Shape, seed: number): Filing[] {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const [P, Q] =
    shape === "bar" ? [{ x: 185, y: 150 }, { x: 335, y: 150 }] : shape === "cylinder" ? [{ x: 218, y: 150 }, { x: 302, y: 150 }] : [{ x: 220, y: 200 }, { x: 300, y: 200 }];
  const inside = (x: number, y: number) =>
    shape === "bar"
      ? x > 178 && x < 342 && y > 130 && y < 170
      : shape === "cylinder"
        ? x > 206 && x < 314 && y > 126 && y < 174
        : (Math.hypot(x - 260, y - 130) < 62 && Math.hypot(x - 260, y - 130) > 18 && y < 205) || (y > 120 && y < 210 && ((x > 198 && x < 242) || (x > 278 && x < 322)));
  const out: Filing[] = [];
  let guard = 0;
  while (out.length < 230 && guard++ < 40000) {
    const x = 30 + rnd() * 460;
    const y = 30 + rnd() * 250;
    if (inside(x, y)) continue;
    const [fx, fy] = field(x, y, P, Q);
    const m = Math.hypot(fx, fy);
    if (rnd() > Math.min(1, (m * 900) ** 2)) continue; // stronger pull → many more filings
    out.push({ x, y, a: (Math.atan2(fy, fx) * 180) / Math.PI });
  }
  return out;
}

function PolesFilings({ discover }: SimProps) {
  const [shape, setShape] = useState<Shape>("bar");
  const [on, setOn] = useState(false);
  const [round, setRound] = useState(1);
  const [middle, setMiddle] = useState(false);
  const [shapesTried, setShapesTried] = useState<string[]>([]);
  const filings = useMemo(() => makeFilings(shape, 7 + round * 101 + (shape === "bar" ? 0 : shape === "cylinder" ? 9 : 5)), [shape, round]);
  const scatter = useMemo(() => filings.map((_, i) => ({ x: 20 + ((i * 97) % 480), y: 300 + ((i * 37) % 30), a: (i * 53) % 180 })), [filings]);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!on) return;
    setSettled(false);
    const t = window.setTimeout(() => setSettled(true), 60);
    const tried = [...new Set([...shapesTried, shape])];
    setShapesTried(tried);
    discover("ends");
    if (shape === "horseshoe") discover("horseshoe");
    if (shape === "cylinder") discover("cylinder");
    if (tried.length >= 2) discover("two");
    return () => window.clearTimeout(t);
  }, [on, shape, round]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage
      caption={
        middle
          ? "Hardly any filings stick to the middle. The pull is strongest near the ends — that's where the poles are."
          : on
            ? shape === "bar"
              ? "Look where the filings crowd! Tap the middle of the magnet to compare."
              : shape === "cylinder"
                ? "A short, round cylindrical magnet — and still the filings crowd at its two ends. Two poles again!"
                : "On a horseshoe magnet, the filings crowd near its two tips — its poles."
            : "Sprinkle iron filings on the paper around the magnet."
      }
    >
      <svg viewBox="0 0 520 330" className="block h-auto w-full select-none">
        <rect width="520" height="330" fill="#f4efe3" />
        <text x="16" y="26" fontSize="11" fontWeight="800" fill="#a39c8c" letterSpacing="2">SHEET OF PAPER</text>
        {on &&
          filings.map((f, i) => {
            const p = settled ? f : scatter[i];
            return (
              <line
                key={i}
                x1={-5}
                y1={0}
                x2={5}
                y2={0}
                stroke="#3b3a40"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ transform: `translate(${p.x}px, ${p.y}px) rotate(${p.a}deg)`, transition: `transform ${0.6 + (i % 7) * 0.08}s cubic-bezier(.2,.8,.2,1)` }}
              />
            );
          })}
        {shape === "bar" ? (
          <g onClick={() => on && (setMiddle(true), discover("middle"))} style={{ cursor: on ? "pointer" : "default" }} role="button" aria-label="Tap the middle of the magnet">
            <BarMagnet x={260} y={150} w={164} h={40} />
          </g>
        ) : shape === "cylinder" ? (
          <g>
            <rect x="210" y="128" width="50" height="44" rx="12" fill={RED} />
            <rect x="260" y="128" width="50" height="44" rx="12" fill={BLUE} />
            <rect x="240" y="128" width="40" height="44" fill="#00000018" />
            <text x="228" y="156" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">N</text>
            <text x="292" y="156" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">S</text>
          </g>
        ) : (
          <g>
            <path d="M200 205 V130 a60 60 0 0 1 120 0 V205 h-40 V130 a20 20 0 0 0 -40 0 V205 Z" fill="#9aa0b4" />
            <rect x="200" y="180" width="40" height="25" fill={RED} />
            <rect x="280" y="180" width="40" height="25" fill={BLUE} />
            <text x="220" y="198" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">N</text>
            <text x="300" y="198" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">S</text>
          </g>
        )}
        {on && shape === "bar" && !middle && <circle cx="260" cy="150" r="14" fill="#ffd257" fillOpacity=".5" className="animate-glow" pointerEvents="none" />}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={on} onClick={() => (on ? (setOn(false), setMiddle(false)) : setOn(true))}>
          {on ? "🧹 Shake them off" : "✨ Sprinkle iron filings"}
        </Btn>
        <Btn
          onClick={() => {
            setShape((s) => NEXT_SHAPE[s]);
            setMiddle(false);
            setRound((r) => r + 1);
          }}
        >
          Try a {SHAPE_NAME[NEXT_SHAPE[shape]]} magnet
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · Which way is North? ───────────── */

type Body = "magnet" | "iron" | "wood";

function Suspended({ discover }: SimProps) {
  const [body, setBody] = useState<Body>("magnet");
  const [angle, setAngle] = useState(70); // degrees from North, clockwise
  const [moving, setMoving] = useState(false);
  const vel = useRef(0);
  const ang = useRef(70);
  const grabbing = useRef(false);
  const settles = useRef(0);
  const [dial, setDial] = useState(-55);
  const dialDrag = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = () => {
      if (!grabbing.current) {
        const torque = body === "magnet" ? -0.006 * Math.sin((ang.current * Math.PI) / 180) * 57 : 0;
        vel.current = (vel.current + torque) * (body === "magnet" ? 0.965 : 0.95);
        ang.current += vel.current;
        setAngle(ang.current);
        if (Math.abs(vel.current) < 0.05 && (body !== "magnet" || Math.abs(Math.sin((ang.current * Math.PI) / 180)) < 0.035)) {
          vel.current = 0;
          if (body === "magnet") {
            ang.current = Math.round(ang.current / 360) * 360; // snap neatly onto North
            setAngle(ang.current);
          }
          setMoving(false);
          return;
        }
      }
      raf = requestAnimationFrame(step);
    };
    if (moving) raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [moving, body]);

  useEffect(() => {
    if (moving || grabbing.current) return;
    const a = ((ang.current % 360) + 360) % 360;
    if (body === "magnet" && (a < 4 || a > 356)) {
      settles.current++;
      discover("settles");
      if (settles.current >= 2) discover("again");
    }
    if (body !== "magnet" && settles.current >= 0 && Math.abs(Math.sin((a * Math.PI) / 180)) > 0.15) discover("others");
  }, [moving]); // eslint-disable-line react-hooks/exhaustive-deps

  const C = { x: 160, y: 165 };
  const rotate = (e: React.PointerEvent<SVGElement>, start = false) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement!;
    const p = svgPoint(svg, e);
    const a = (Math.atan2(p.x - C.x, -(p.y - C.y)) * 180) / Math.PI;
    if (start) {
      grabbing.current = true;
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    }
    if (!grabbing.current) return;
    vel.current = 0;
    ang.current = a;
    setAngle(a);
  };

  const dialAngle = (e: React.PointerEvent<SVGElement>) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement!;
    const p = svgPoint(svg, e);
    return (Math.atan2(p.x - 400, -(p.y - 165)) * 180) / Math.PI;
  };
  const aligned = Math.abs(((dial % 360) + 540) % 360 - 180) < 6;
  useEffect(() => {
    if (aligned) discover("compass");
  }, [aligned, discover]);

  return (
    <Stage
      caption={
        moving
          ? "Let go… watch where it comes to rest."
          : body === "magnet"
            ? "A freely hanging magnet always comes to rest pointing North–South. Its red end is the North-seeking pole. Spin it again!"
            : `A hanging ${body === "iron" ? "iron bar" : "wooden scale"} stops wherever it happens to stop — it doesn't point anywhere special.`
      }
    >
      <svg viewBox="0 0 520 330" className="block h-auto w-full select-none">
        <rect width="520" height="330" fill="#13112b" />
        {/* compass rose on the ground under the hanging bar (top view) */}
        <g>
          <circle cx={C.x} cy={C.y} r="120" fill="#1d1a44" stroke="#2f2b66" strokeWidth="2" />
          {["N", "E", "S", "W"].map((d, i) => (
            <text key={d} x={C.x + Math.sin((i * Math.PI) / 2) * 104} y={C.y - Math.cos((i * Math.PI) / 2) * 104 + 6} fontSize="16" fontWeight="900" fill={d === "N" ? "#ffd257" : "#7e7aa8"} textAnchor="middle">
              {d}
            </text>
          ))}
          <line x1={C.x} y1={C.y - 92} x2={C.x} y2={C.y + 92} stroke="#ffd257" strokeOpacity=".25" strokeDasharray="4 6" />
        </g>
        <g
          transform={`rotate(${angle} ${C.x} ${C.y})`}
          onPointerDown={(e) => {
            rotate(e, true);
            setMoving(false);
          }}
          onPointerMove={(e) => rotate(e)}
          onPointerUp={() => {
            grabbing.current = false;
            vel.current = body === "magnet" ? 0 : 2.5;
            setMoving(true);
          }}
          style={{ touchAction: "none", cursor: "grab" }}
        >
          <rect x={C.x - 30} y={C.y - 95} width="60" height="190" fill="transparent" />
          {body === "magnet" ? (
            <BarMagnet x={C.x} y={C.y} w={170} h={30} deg={-90} label />
          ) : (
            <rect x={C.x - 13} y={C.y - 85} width="26" height="170" rx="4" fill={body === "iron" ? "#8d93a8" : "#c9965a"} />
          )}
          <circle cx={C.x} cy={C.y} r="5" fill="#fff" />
        </g>
        <text x={C.x} y="318" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">Hanging bar, seen from above · drag to spin</text>

        {/* compass */}
        <g>
          <circle cx="400" cy="165" r="78" fill="#f4efe3" stroke="#c8b98f" strokeWidth="5" />
          <g
            transform={`rotate(${dial} 400 165)`}
            onPointerDown={(e) => {
              dialDrag.current = dialAngle(e) - dial;
              (e.currentTarget as Element).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => dialDrag.current !== null && setDial(dialAngle(e) - dialDrag.current)}
            onPointerUp={() => (dialDrag.current = null)}
            style={{ touchAction: "none", cursor: "grab" }}
          >
            <circle cx="400" cy="165" r="72" fill="transparent" />
            {["N", "E", "S", "W"].map((d, i) => (
              <text key={d} x={400 + Math.sin((i * Math.PI) / 2) * 56} y={165 - Math.cos((i * Math.PI) / 2) * 56 + 6} fontSize="15" fontWeight="900" fill={d === "N" ? RED : "#5d5848"} textAnchor="middle" transform={`rotate(${i * 90} ${400 + Math.sin((i * Math.PI) / 2) * 56} ${165 - Math.cos((i * Math.PI) / 2) * 56})`}>
                {d}
              </text>
            ))}
            {Array.from({ length: 24 }, (_, i) => (
              <line key={i} x1="400" y1="95" x2="400" y2={i % 6 ? 100 : 104} stroke="#9c9378" strokeWidth="1.5" transform={`rotate(${i * 15} 400 165)`} />
            ))}
          </g>
          {/* needle always points North (up the screen) */}
          <path d="M400 112 L408 165 L400 218 L392 165 Z" fill="#5d5848" />
          <path d="M400 112 L408 165 L392 165 Z" fill={RED} />
          <circle cx="400" cy="165" r="5" fill="#2b2a30" />
          <text x="400" y="270" fontSize="11" fontWeight="800" fill={aligned ? "#1fb88a" : "#9da3c7"} textAnchor="middle">
            {aligned ? "✓ Dial lined up!" : "Compass · turn the dial to match the needle"}
          </text>
        </g>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {(["magnet", "iron", "wood"] as Body[]).map((b) => (
          <Btn
            key={b}
            on={body === b}
            onClick={() => {
              setBody(b);
              vel.current = 3;
              setMoving(true);
            }}
          >
            {b === "magnet" ? "🧲 Bar magnet" : b === "iron" ? "Iron bar" : "Wooden scale"}
          </Btn>
        ))}
      </div>
    </Stage>
  );
}

/* ───────────── Stop 4 · Magnetic cars ───────────── */

type Pole = "N" | "S";

function Car({ x, near, flip }: { x: number; near: Pole; flip: boolean }) {
  // `near` is the pole on the side facing the other car
  const far: Pole = near === "N" ? "S" : "N";
  const left = flip ? near : far;
  const right = flip ? far : near;
  return (
    <g style={{ transform: `translateX(${x}px)`, transition: "transform .7s cubic-bezier(.2,.8,.2,1)" }}>
      <rect x="-70" y="-26" width="140" height="40" rx="12" fill="#f0f2f8" />
      <circle cx="-42" cy="18" r="13" fill="#2b2a30" />
      <circle cx="42" cy="18" r="13" fill="#2b2a30" />
      <circle cx="-42" cy="18" r="5" fill="#8d93a8" />
      <circle cx="42" cy="18" r="5" fill="#8d93a8" />
      <rect x="-60" y="-46" width="60" height="22" rx="3" fill={left === "N" ? RED : BLUE} />
      <rect x="0" y="-46" width="60" height="22" rx="3" fill={right === "N" ? RED : BLUE} />
      <text x="-30" y="-30" fontSize="13" fontWeight="900" fill="#fff" textAnchor="middle">{left}</text>
      <text x="30" y="-30" fontSize="13" fontWeight="900" fill="#fff" textAnchor="middle">{right}</text>
    </g>
  );
}

function MagnetCars({ discover }: SimProps) {
  const [aFront, setAFront] = useState<Pole>("S"); // pole of A's magnet that faces car B
  const [bFront, setBFront] = useState<Pole>("N");
  const [phase, setPhase] = useState<"ready" | "go">("ready");
  const [log, setLog] = useState<Record<string, "attract" | "repel">>({});
  const attract = aFront !== bFront;
  const pair = `${aFront}–${bFront}`;

  function release() {
    setPhase("go");
    const next = { ...log, [pair]: attract ? ("attract" as const) : ("repel" as const) };
    setLog(next);
    discover(attract ? "attract" : "repel");
    if (next["N–N"] && next["S–S"]) discover("likes");
    if (Object.keys(next).length === 4) discover("table");
  }

  const gapShift = phase === "go" ? (attract ? 19 : -70) : 0;
  return (
    <Stage
      caption={
        phase === "go"
          ? attract
            ? `${pair}: the cars rush together — opposite poles attract!`
            : `${pair}: the cars push apart — similar poles repel!`
          : "Choose which poles face each other, then let the cars go."
      }
    >
      <svg viewBox="0 0 520 200" className="block h-auto w-full select-none">
        <rect width="520" height="200" fill="#13112b" />
        <rect y="150" width="520" height="50" fill="#26244a" />
        <path d="M0 175 H520" stroke="#ffffff22" strokeDasharray="18 14" strokeWidth="3" />
        <g transform="translate(0 130)">
          <Car x={170 + gapShift} near={aFront} flip={false} />
          <Car x={350 - gapShift} near={bFront} flip={true} />
        </g>
        <text x={170 + gapShift} y="190" fontSize="12" fontWeight="900" fill="#9da3c7" textAnchor="middle" style={{ transition: "all .7s" }}>
          Car A
        </text>
        <text x={350 - gapShift} y="190" fontSize="12" fontWeight="900" fill="#9da3c7" textAnchor="middle" style={{ transition: "all .7s" }}>
          Car B
        </text>
        {phase === "go" && (
          <text x="260" y="50" fontSize="24" fontWeight="900" fill={attract ? "#1fb88a" : "#ffd257"} textAnchor="middle" className="animate-pop">
            {attract ? "← attract →" : "← repel →"}
          </text>
        )}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <Btn onClick={() => (setPhase("ready"), setAFront((p) => (p === "N" ? "S" : "N")))}>Flip A's magnet</Btn>
          <Btn onClick={() => (setPhase("ready"), setBFront((p) => (p === "N" ? "S" : "N")))}>Flip B's magnet</Btn>
          <Btn on onClick={() => (phase === "go" ? setPhase("ready") : release())}>
            {phase === "go" ? "↺ Put them back" : "▶ Let go"}
          </Btn>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {["N–S", "S–N", "N–N", "S–S"].map((k) => (
            <div key={k} className={`rounded-xl px-1 py-1.5 text-xs font-extrabold ring-1 ${log[k] ? "bg-white/10 ring-white/20" : "ring-white/10 text-white/40"}`}>
              <div>{k}</div>
              <div className={log[k] === "attract" ? "text-[#5fe0b4]" : log[k] === "repel" ? "text-[#ffd257]" : ""}>{log[k] ?? "?"}</div>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 1 · Magnets hiding at home ───────────── */

function HiddenMagnets({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Magnets hide in many everyday things. Tap the glowing spots to find them."
      viewBox="0 0 520 320"
      spots={[
        { id: "sticker", label: "Fridge sticker", x: 74, y: 92, text: "A tiny magnet on its back holds it to the fridge's iron door." },
        { id: "seal", label: "Fridge door", x: 128, y: 176, text: "A magnetic strip inside the rubber seal pulls the door shut tight." },
        { id: "pins", label: "Pin holder", x: 236, y: 132, text: "A magnet inside holds the pins — that's why they seem to stick to it." },
        { id: "box", label: "Pencil box", x: 312, y: 138, text: "Hidden magnets in the lid and box keep it shut, with no lock at all." },
        { id: "needle", label: "Tailor's lost needle", x: 206, y: 278, text: "The tailor sweeps a magnet over the floor — and the needle jumps up to it!" },
        { id: "nails", label: "Carpenter's shavings", x: 352, y: 268, text: "A magnet pulls the iron nails and screws out of the wood shavings. No searching by hand." },
        { id: "doll", label: "Intelligent doll", x: 470, y: 120, text: "A magnet hidden in her glove picks up only iron things — she seems to choose!" },
      ]}
      groups={{ hidden: ["sticker", "seal", "pins", "box"], find: ["needle", "nails"], doll: ["doll"] }}
      art={
        <>
          <rect width="520" height="320" fill="#13112b" />
          <rect y="230" width="520" height="90" fill="#3b2e24" />
          {/* fridge */}
          <rect x="30" y="40" width="110" height="190" rx="8" fill="#dfe3ee" />
          <rect x="30" y="112" width="110" height="4" fill="#9aa0b4" />
          <rect x="128" y="60" width="5" height="40" rx="2" fill="#9aa0b4" />
          <rect x="62" y="80" width="26" height="22" rx="3" fill="#ff8a5b" />
          {/* table with pin holder and pencil box */}
          <rect x="196" y="150" width="150" height="10" rx="3" fill="#a06a35" />
          <rect x="206" y="160" width="8" height="70" fill="#7a4f28" />
          <rect x="328" y="160" width="8" height="70" fill="#7a4f28" />
          <rect x="224" y="124" width="26" height="26" rx="5" fill="#5b8def" />
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={229 + k * 5} y1="124" x2={227 + k * 6} y2="110" stroke="#cfd3e6" strokeWidth="2" />
          ))}
          <rect x="282" y="132" width="60" height="18" rx="3" fill="#1fb88a" />
          <rect x="282" y="126" width="60" height="7" rx="2" fill="#23d39f" />
          {/* floor: needle and thread, shavings with nails */}
          <text x="168" y="290" fontSize="22">
            🧵
          </text>
          <line x1="196" y1="282" x2="222" y2="276" stroke="#cfd3e6" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M${320 + k * 14} 278 q6 -12 12 0`} stroke="#e0b070" strokeWidth="3" fill="none" />
          ))}
          <line x1="342" y1="268" x2="350" y2="282" stroke="#8d93a8" strokeWidth="3" />
          <line x1="366" y1="270" x2="374" y2="262" stroke="#8d93a8" strokeWidth="3" />
          {/* shelf with the doll */}
          <rect x="420" y="150" width="90" height="8" rx="3" fill="#a06a35" />
          <Figure x={465} y={150} child long wave shirt="#e0679b" />
        </>
      }
    />
  );
}

/* ───────────── Stop 1 · A clip that floats (Activity 1) ───────────── */

const BETWEEN = [
  { id: "none", label: "Nothing in between" },
  { id: "paper", label: "Slide in paper" },
  { id: "card", label: "Slide in a thin card" },
];
const CUP_BASE = 96; // the magnet sits inside the cup, just above its base

function FloatingClip({ discover }: SimProps) {
  const [len, setLen] = useState(90); // thread length; the thread is tied at the bottom of the stand
  const [released, setReleased] = useState(false);
  const [between, setBetween] = useState("none");
  const clipY = 268 - len;
  const gap = clipY - CUP_BASE;
  const floats = released && gap <= 46;

  useEffect(() => {
    if (!released) return;
    if (!floats) discover("far");
    else {
      discover("float");
      if (between !== "none") discover("through");
    }
  }, [released, floats, between]); // eslint-disable-line react-hooks/exhaustive-deps

  const y = released && !floats ? 258 : clipY;
  return (
    <Stage
      caption={
        !released
          ? "You are holding the iron clip on its thread. Change the thread length, then let go."
          : floats
            ? between === "none"
              ? "It hangs in the air like a kite! The hidden magnet pulls the clip without touching it."
              : `Still floating — the magnet's pull goes right through the ${between === "paper" ? "paper" : "card"}.`
            : "It drops. With a long thread the clip is too far from the magnet, and the pull is too weak to hold it up."
      }
    >
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#13112b" />
        {/* stand, clamp and cup */}
        <rect x="190" y="268" width="230" height="14" rx="4" fill="#5a4a3a" />
        <rect x="200" y="36" width="10" height="234" fill="#7a6a58" />
        <rect x="205" y="40" width="130" height="8" fill="#7a6a58" />
        <path d="M282 48 L348 48 L340 96 L290 96 Z" fill="#e9e3d6" />
        <rect x="278" y="44" width="74" height="6" rx="2" fill="#ffffff" />
        <g opacity=".35">
          <rect x="300" y="70" width="30" height="20" rx="3" fill={RED} />
        </g>
        <text x="315" y="64" fontSize="8" fontWeight="800" fill="#5c5348" textAnchor="middle">
          magnet inside
        </text>
        {between !== "none" && (
          <rect x="268" y={CUP_BASE + 6} width="96" height={between === "card" ? 6 : 3} rx="1" fill={between === "card" ? "#c79a5b" : "#ffffff"} className="animate-pop" />
        )}
        {/* thread and clip */}
        {released && !floats ? (
          <path d={`M315 268 Q300 262 ${315} ${y + 6}`} stroke="#cfd3e6" strokeWidth="1.5" fill="none" />
        ) : (
          <line x1="315" y1="268" x2="315" y2={y + 10} stroke="#cfd3e6" strokeWidth="1.5" />
        )}
        <g style={{ transform: `translate(315px, ${y}px)`, transition: "transform .5s" }}>
          <path d="M-5 12 L-5 -6 Q-5 -12 0 -12 Q5 -12 5 -6 L5 8 Q5 11 2 11 Q-1 11 -1 8 L-1 -4" stroke="#b9c0d6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
        {!released && (
          <text x="345" y={y + 10} fontSize="22">
            ✋
          </text>
        )}
        <text x="440" y="200" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">
          gap: {Math.max(0, Math.round(gap / 4))} cm
        </text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Thread length</span>
          <input
            type="range"
            min={60}
            max={160}
            value={len}
            onChange={(e) => (setLen(+e.target.value), setReleased(false))}
            className="w-full accent-[#ffd257]"
            aria-label="Thread length"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {BETWEEN.map((b) => (
            <Btn key={b.id} on={between === b.id} onClick={() => (setBetween(b.id), setReleased(false))}>
              {b.label}
            </Btn>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {!released ? (
            <Btn on onClick={() => setReleased(true)}>
              ✋ Let go of the clip
            </Btn>
          ) : (
            <Btn onClick={() => setReleased(false)}>↺ Pick it up again</Btn>
          )}
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 2 · Iron in the soil (Activity 3) ───────────── */

const SOILS = [
  { id: "river", name: "River-bank sand", color: "#c9a66b", iron: 14 },
  { id: "ground", name: "School-ground soil", color: "#8a5a3b", iron: 5 },
  { id: "white", name: "Washed white sand", color: "#e8dfc8", iron: 0 },
];
const SOIL_TOP = 190;
const amount = (n: number) => (n >= 10 ? "Many" : n > 0 ? "Very few" : "None");

function SoilTest({ discover }: SimProps) {
  const [soil, setSoil] = useState(SOILS[0].id);
  const [tip, setTip] = useState({ x: 260, y: 70 });
  const [out, setOut] = useState(false); // pulled out of the soil after a good rub
  const [shaken, setShaken] = useState(false);
  const [table, setTable] = useState<Record<string, number>>({});
  const rub = useRef(0);
  const prev = useRef<{ x: number; y: number } | null>(null);
  const s = SOILS.find((x) => x.id === soil)!;

  const drag = useSvgDrag(
    (x, y) => {
      const p = { x: Math.max(40, Math.min(480, x)), y: Math.max(40, Math.min(290, y)) };
      const before = prev.current;
      prev.current = p;
      setTip(p);
      if (p.y > SOIL_TOP) {
        if (before && before.y > SOIL_TOP) rub.current += Math.hypot(p.x - before.x, p.y - before.y);
        setOut(false);
        setShaken(false);
      } else if (before && before.y > SOIL_TOP && rub.current >= 100) {
        setOut(true);
        rub.current = 0;
      }
    },
    () => {
      prev.current = null;
    },
  );

  function shake() {
    setShaken(true);
    const t = { ...table, [soil]: s.iron };
    setTable(t);
    if (s.iron > 0) discover("shake");
    else discover("none");
    if (SOILS.every((x) => x.id in t)) discover("compare");
  }

  const bits = out ? Array.from({ length: s.iron }, (_, k) => ({ dx: ((k * 37) % 30) - 15, dy: 22 + ((k * 13) % 14), a: (k * 47) % 180 })) : [];
  const sand = out && !shaken ? Array.from({ length: 16 }, (_, k) => ({ dx: ((k * 23) % 36) - 18, dy: 20 + ((k * 11) % 18) })) : [];
  return (
    <Stage
      caption={
        shaken
          ? s.iron > 0
            ? `The sand fell off, but ${s.iron >= 10 ? "lots of" : "a few"} tiny dark bits stay stuck. They are iron! This sample has ${amount(s.iron).toLowerCase()} iron filings.`
            : "Everything fell off. This sand has no iron in it."
          : out
            ? "Sand and soil are clinging to the magnet. Shake it gently — what stays?"
            : "Pick a place. Drag the magnet down into the soil, rub it around, then pull it out."
      }
    >
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#13112b" />
        <rect y={SOIL_TOP} width="520" height={300 - SOIL_TOP} fill={s.color} />
        {Array.from({ length: 40 }, (_, k) => (
          <circle key={k} cx={(k * 61) % 520} cy={SOIL_TOP + 10 + ((k * 29) % 95)} r="2" fill="#00000022" />
        ))}
        <text x="16" y="28" fontSize="12" fontWeight="800" fill="#9da3c7" letterSpacing="2">
          {s.name.toUpperCase()}
        </text>
        <g {...drag}>
          <rect x={tip.x - 30} y={tip.y - 70} width="60" height="110" fill="transparent" />
          <line x1={tip.x} y1={tip.y - 20} x2={tip.x} y2={tip.y - 120} stroke="#b07a3c" strokeWidth="7" strokeLinecap="round" />
          <rect x={tip.x - 12} y={tip.y - 20} width="24" height="20" rx="3" fill={RED} />
          <rect x={tip.x - 12} y={tip.y} width="24" height="20" rx="3" fill={BLUE} />
          {sand.map((g, k) => (
            <circle key={"s" + k} cx={tip.x + g.dx} cy={tip.y + g.dy} r="2.6" fill={s.color} stroke="#00000033" />
          ))}
          {bits.map((b, k) => (
            <line key={"b" + k} x1={-5} y1={0} x2={5} y2={0} stroke="#b9c0d6" strokeWidth="2.6" strokeLinecap="round" style={{ transform: `translate(${tip.x + b.dx}px, ${tip.y + b.dy}px) rotate(${b.a}deg)` }} />
          ))}
        </g>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {SOILS.map((x) => (
            <Btn key={x.id} on={soil === x.id} onClick={() => (setSoil(x.id), setOut(false), setShaken(false), (rub.current = 0), setTip({ x: 260, y: 70 }))}>
              {x.name}
            </Btn>
          ))}
        </div>
        {out && !shaken && (
          <Btn on onClick={shake}>
            👋 Shake it gently
          </Btn>
        )}
        <table className="mt-1 w-full text-left text-xs">
          <thead className="text-white/50">
            <tr>
              <th className="py-1 font-extrabold">Place</th>
              <th className="py-1 font-extrabold">Iron filings on the magnet?</th>
            </tr>
          </thead>
          <tbody>
            {SOILS.map((x) => (
              <tr key={x.id} className="border-t border-white/10">
                <td className="py-1 font-bold text-white/70">{x.name}</td>
                <td className="py-1 font-extrabold">{x.id in table ? amount(table[x.id]) : "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · North from the rising Sun ───────────── */

const TURNS = ["up", "right", "down", "left"] as const; // which way the child faces on the map; right = East
const NORTH_GUESSES = ["In front of me", "On my left", "On my right", "Behind me"];

function SunCompass({ discover }: SimProps) {
  const [face, setFace] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const east = TURNS[face] === "right";
  const right = guess === "On my left";

  useEffect(() => {
    if (east) discover("east");
  }, [east]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage
      caption={
        checked
          ? "The compass agrees, almost! The Sun gives only a rough direction, but it is enough to tell North from South."
          : right
            ? "Yes! Facing East, North is on your left, South on your right and West behind you."
            : guess
              ? "Not quite. Stretch out your arms: which hand points North on the map? Try again."
              : east
                ? "You're facing the rising Sun — that's roughly East. Now: where is North?"
                : "Early morning. Turn until you are facing the rising Sun."
      }
    >
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#1c2a4a" />
        <rect x="430" width="90" height="300" fill="#f5a524" opacity=".25" />
        <circle cx="490" cy="150" r="30" fill="#ffd257" />
        <text x="490" y="200" fontSize="11" fontWeight="800" fill="#ffd257" textAnchor="middle">
          sunrise
        </text>
        {/* the child, seen from above, with an arrow for the way they face */}
        <g style={{ transform: `translate(220px, 150px) rotate(${face * 90}deg)`, transition: "transform .4s" }}>
          <ellipse rx="34" ry="20" fill="#5b8def" />
          <circle r="16" fill="#c98a5e" />
          <path d="M-16 0 A16 16 0 0 0 16 0 Z" fill="#2b1a12" />
          <path d="M0 -60 L-12 -40 L12 -40 Z" fill="#fff" />
          <line x1="0" y1="-40" x2="0" y2="-22" stroke="#fff" strokeWidth="4" />
        </g>
        {right &&
          [
            ["N", 220, 40],
            ["E", 340, 156],
            ["S", 220, 278],
            ["W", 100, 156],
          ].map(([t, x, y]) => (
            <text key={t as string} x={x} y={y} fontSize="22" fontWeight="900" fill={t === "N" ? "#ff8a7a" : "#ffffff"} textAnchor="middle" className="animate-pop">
              {t}
            </text>
          ))}
        {checked && (
          <g transform="translate(360 240)">
            <g className="animate-pop" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <circle r="32" fill="#f4efe3" stroke="#9aa0b4" strokeWidth="3" />
              <g transform="rotate(-6)">
                <path d="M0 -26 L6 0 L-6 0 Z" fill={RED} />
                <path d="M0 26 L6 0 L-6 0 Z" fill="#9aa0b4" />
              </g>
            </g>
            <text y="-38" fontSize="10" fontWeight="900" fill="#ffd257" textAnchor="middle">
              compass
            </text>
          </g>
        )}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        {!east ? (
          <div className="flex flex-wrap gap-2">
            <Btn onClick={() => setFace((f) => (f + 3) % 4)}>↺ Turn to your left</Btn>
            <Btn onClick={() => setFace((f) => (f + 1) % 4)}>↻ Turn to your right</Btn>
          </div>
        ) : !right ? (
          <div className="grid grid-cols-2 gap-2">
            {NORTH_GUESSES.map((g) => (
              <Btn
                key={g}
                on={guess === g}
                onClick={() => {
                  setGuess(g);
                  if (g === "On my left") discover("left");
                }}
              >
                {g}
              </Btn>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {!checked && (
              <Btn
                on
                onClick={() => {
                  setChecked(true);
                  discover("rough");
                }}
              >
                🧭 Check with a compass
              </Btn>
            )}
            <Btn onClick={() => (setFace(0), setGuess(null), setChecked(false))}>↺ Start again</Btn>
          </div>
        )}
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · A compass in a bowl (Activity 6) ───────────── */

const BOWL = { x: 220, y: 150 };

function CorkCompass({ discover }: SimProps) {
  const [magnetised, setMagnetised] = useState(true);
  const [angle, setAngle] = useState(70); // 0 = needle's marked end points North (up)
  const [spinning, setSpinning] = useState(false);
  const [near, setNear] = useState(false);
  const [rest, setRest] = useState<string | null>(null);

  function settle(withMagnet: boolean, isMagnet: boolean, from: number) {
    if (withMagnet) {
      setAngle(from - (((from - 90) % 360) + 540) % 360 + 180);
      setRest("near");
      if (isMagnet) discover("near");
    } else if (isMagnet) {
      setAngle(from - ((((from % 360) + 540) % 360) - 180));
      setRest("north");
      discover("cork");
    } else {
      setRest("plain");
      discover("plain");
    }
  }

  const drag = useSvgDrag(
    (x, y) => {
      setSpinning(true);
      setRest(null);
      setAngle((Math.atan2(x - BOWL.x, -(y - BOWL.y)) * 180) / Math.PI);
    },
    () => {
      setSpinning(false);
      settle(near, magnetised, angle);
    },
  );

  return (
    <Stage
      caption={
        rest === "near"
          ? magnetised
            ? "The magnet pulls the needle away from North! A magnet near a compass confuses it — keep them apart."
            : "Even a plain iron needle turns towards a magnet — iron is attracted."
          : rest === "north"
            ? "However you spin it, the magnetised needle swings back to point North–South. You've made a compass!"
            : rest === "plain"
              ? "A plain needle just stops wherever it is. Only a magnetised needle finds North."
              : "A needle stuck through a cork floats on water. Drag the cork to spin it, then let go."
      }
    >
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#13112b" />
        {[
          ["N", BOWL.x, 22],
          ["S", BOWL.x, 292],
          ["E", BOWL.x + 140, BOWL.y + 6],
          ["W", BOWL.x - 140, BOWL.y + 6],
        ].map(([t, x, y]) => (
          <text key={t as string} x={x} y={y} fontSize="16" fontWeight="900" fill={t === "N" ? "#ff8a7a" : "#9da3c7"} textAnchor="middle">
            {t}
          </text>
        ))}
        <circle cx={BOWL.x} cy={BOWL.y} r="118" fill="#8a7a6a" />
        <circle cx={BOWL.x} cy={BOWL.y} r="108" fill="#3d7bfd" opacity=".55" />
        <g {...drag}>
          <circle cx={BOWL.x} cy={BOWL.y} r="104" fill="transparent" />
          <g style={{ transform: `translate(${BOWL.x}px, ${BOWL.y}px) rotate(${angle}deg)`, transition: spinning ? "none" : "transform 1.6s cubic-bezier(.3,1.5,.5,1)" }}>
            <ellipse rx="26" ry="20" fill="#c79a5b" stroke="#8a6a3a" strokeWidth="2" />
            <line x1="0" y1="-80" x2="0" y2="0" stroke={magnetised ? RED : "#cfd3e6"} strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="0" x2="0" y2="80" stroke="#cfd3e6" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>
        {near && (
          <g className="animate-pop">
            <BarMagnet x={440} y={BOWL.y} w={110} h={30} deg={180} />
          </g>
        )}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={!magnetised} onClick={() => (setMagnetised((m) => !m), setRest(null))}>
          {magnetised ? "Use a plain needle" : "Use a magnetised needle"}
        </Btn>
        <Btn
          on={near}
          onClick={() => {
            const n = !near;
            setNear(n);
            settle(n, magnetised, angle);
          }}
        >
          {near ? "Take the magnet away" : "🧲 Bring a magnet near"}
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · Make your own magnet ───────────── */

const NAIL_Y = 170;
const ON_NAIL = 125; // magnet centre height when its bottom pole touches the nail
const STROKES = 10;

function MakeMagnet({ discover }: SimProps) {
  const [pos, setPos] = useState({ x: 110, y: ON_NAIL });
  const [moving, setMoving] = useState(false);
  const [good, setGood] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const [pins, setPins] = useState<number | null>(null);
  const seg = useRef<{ start: number; last: number } | null>(null);

  useEffect(() => {
    if (good >= 3) discover("stroke");
  }, [good]); // eslint-disable-line react-hooks/exhaustive-deps

  function finish() {
    const s = seg.current;
    seg.current = null;
    if (!s) return;
    const dx = s.last - s.start;
    if (dx >= 220) {
      setGood((g) => Math.min(STROKES, g + 1));
      setNote("A good stroke! The magnet is lifted and brought back to the start.");
      setMoving(false);
      setPos((p) => ({ x: p.x, y: 50 }));
      window.setTimeout(() => setPos({ x: 110, y: 50 }), 250);
      window.setTimeout(() => setPos({ x: 110, y: ON_NAIL }), 550);
    } else if (dx <= -220) {
      setGood((g) => Math.max(0, g - 2));
      setNote("Rubbing back the other way undoes your work! Every stroke must go the same way, with the same pole.");
      discover("oneway");
    }
  }

  const drag = useSvgDrag(
    (x, y) => {
      const p = { x: Math.max(60, Math.min(460, x)), y: Math.max(30, Math.min(150, y)) };
      setMoving(true);
      setPos(p);
      setPins(null);
      if (Math.abs(p.y - ON_NAIL) < 30 && p.x > 70 && p.x < 450) {
        if (!seg.current) seg.current = { start: p.x, last: p.x };
        else seg.current.last = p.x;
      } else finish();
    },
    () => {
      finish();
      setMoving(false);
    },
  );

  const strength = good / STROKES;
  return (
    <Stage
      caption={
        pins !== null
          ? pins === 0
            ? "No pins stick yet. Keep stroking!"
            : good >= STROKES
              ? `${pins} pins cling to the nail. It has become a magnet!`
              : `${pins} pin${pins > 1 ? "s" : ""} cling — it's a weak magnet so far. Keep stroking.`
          : (note ??
            "Drag the magnet so its S pole slides along the iron nail from left to right. Lift it off and start again at the left. (In real life it takes 30–40 strokes; here 10 will do.)")
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#13112b" />
        <rect y="200" width="520" height="60" fill="#3b2e24" />
        {/* the iron nail, glowing more as it becomes magnetised */}
        <rect x="80" y={NAIL_Y - 6} width="350" height="12" rx="3" fill="#8d93a8" />
        <path d={`M430 ${NAIL_Y - 6} L462 ${NAIL_Y} L430 ${NAIL_Y + 6} Z`} fill="#8d93a8" />
        <rect x="70" y={NAIL_Y - 12} width="12" height="24" rx="3" fill="#7d8497" />
        <rect x="80" y={NAIL_Y - 6} width="350" height="12" rx="3" fill="#ffd257" opacity={strength * 0.45} />
        <path d="M110 192 L410 192" stroke="#9da3c7" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M402 186 L414 192 L402 198" stroke="#9da3c7" strokeWidth="2" fill="none" />
        <text x="260" y="214" fontSize="10" fontWeight="800" fill="#9da3c7" textAnchor="middle">
          always this way →
        </text>
        {/* pins picked up at the tip */}
        {pins !== null &&
          Array.from({ length: pins }, (_, k) => (
            <line key={k} x1={462 - k * 4} y1={NAIL_Y + 4} x2={452 - k * 7} y2={NAIL_Y + 30} stroke="#cfd3e6" strokeWidth="2" className="animate-pop" />
          ))}
        <g {...drag} style={{ ...drag.style, transform: `translate(${pos.x}px, ${pos.y}px)`, transition: moving ? "none" : "transform .3s" }}>
          <rect x="-24" y="-48" width="48" height="96" fill="transparent" />
          <rect x="-13" y="-40" width="26" height="40" rx="4" fill={RED} />
          <rect x="-13" y="0" width="26" height="40" rx="4" fill={BLUE} />
          <text y="-16" fontSize="13" fontWeight="900" fill="#fff" textAnchor="middle">
            N
          </text>
          <text y="28" fontSize="13" fontWeight="900" fill="#fff" textAnchor="middle">
            S
          </text>
        </g>
      </svg>
      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 px-4 py-3">
        <div className="min-w-[150px] flex-1">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">
            Good strokes · {good}/{STROKES}
          </div>
          <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#ffd257] transition-all" style={{ width: `${strength * 100}%` }} />
          </div>
        </div>
        <Btn
          on
          onClick={() => {
            setPins(Math.round(strength * 5));
            if (good >= STROKES) discover("magnet");
          }}
        >
          📌 Test it on pins
        </Btn>
        <Btn onClick={() => (setGood(0), setPins(null), setNote(null), setPos({ x: 110, y: ON_NAIL }))}>↺ New nail</Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 4 · Which bar is the magnet? (Paheli's puzzle) ───────────── */

// Bar A is plain iron. Bar B is a magnet whose north pole is at end 1.
const pullOrPush = (bar: string, end: number) => (bar === "B" && end === 1 ? "push" : "pull");

function TwoBars({ discover }: SimProps) {
  const [tests, setTests] = useState<Record<string, string>>({});
  const [last, setLast] = useState<{ bar: string; end: number } | null>(null);
  const [verdict, setVerdict] = useState<string | null>(null);

  function test(bar: string, end: number) {
    const r = pullOrPush(bar, end);
    const t = { ...tests, [`${bar}${end}`]: r };
    setTests(t);
    setLast({ bar, end });
    setVerdict(null);
    if (t.A1 && t.A2) discover("both");
    if (r === "push") discover("pushed");
  }

  const result = last ? pullOrPush(last.bar, last.end) : null;
  const barY = { A: 90, B: 200 } as Record<string, number>;
  // the known magnet's N pole faces the tested end: touching for a pull, pushed back for a push
  const kx = last ? (last.end === 1 ? (result === "pull" ? 138 : 80) : result === "pull" ? 382 : 440) : 0;
  return (
    <Stage
      caption={
        verdict === "B"
          ? "Case solved! Bar B pushed the magnet away at one end. Only a magnet can repel — Bar A is plain iron."
          : verdict === "A"
            ? "Not so fast! Bar A was only ever pulled. Iron is pulled by a magnet too, so pulling proves nothing."
            : last
              ? `The known magnet's N pole near Bar ${last.bar}, end ${last.end}: ${result === "pull" ? "pulled closer." : "pushed away!"}`
              : "Two bars that look exactly the same. One is a magnet, one is plain iron. Test each end with the known magnet's N pole."
      }
    >
      <svg viewBox="0 0 520 290" className="block h-auto w-full select-none">
        <rect width="520" height="290" fill="#13112b" />
        {(["A", "B"] as const).map((b) => (
          <g key={b}>
            <rect x="140" y={barY[b] - 18} width="240" height="36" rx="5" fill="#8d93a8" />
            <text x="260" y={barY[b] + 6} fontSize="15" fontWeight="900" fill="#13112b" textAnchor="middle">
              Bar {b}
            </text>
            <text x="152" y={barY[b] + 34} fontSize="10" fontWeight="800" fill="#9da3c7">
              end 1
            </text>
            <text x="368" y={barY[b] + 34} fontSize="10" fontWeight="800" fill="#9da3c7" textAnchor="end">
              end 2
            </text>
            {tests[`${b}1`] && (
              <text x="130" y={barY[b] - 26} fontSize="10" fontWeight="900" fill={tests[`${b}1`] === "push" ? "#ff8a7a" : "#5fe0a0"}>
                {tests[`${b}1`] === "push" ? "pushed!" : "pulled"}
              </text>
            )}
            {tests[`${b}2`] && (
              <text x="390" y={barY[b] - 26} fontSize="10" fontWeight="900" fill="#5fe0a0" textAnchor="end">
                pulled
              </text>
            )}
          </g>
        ))}
        {last && (
          <g key={`${last.bar}${last.end}`} style={{ transform: `translate(${kx}px, ${barY[last.bar]}px)`, transition: "transform .5s" }}>
            <rect x={last.end === 1 ? -70 : 35} y="-14" width="35" height="28" rx="4" fill={BLUE} />
            <rect x={last.end === 1 ? -35 : 0} y="-14" width="35" height="28" rx="4" fill={RED} />
            <text x={last.end === 1 ? -17 : 17} y="5" fontSize="12" fontWeight="900" fill="#fff" textAnchor="middle">
              N
            </text>
          </g>
        )}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="grid grid-cols-2 gap-2">
          {(["A", "B"] as const).flatMap((b) =>
            [1, 2].map((e) => (
              <Btn key={`${b}${e}`} on={!!tests[`${b}${e}`]} onClick={() => test(b, e)}>
                Bar {b} · end {e}
              </Btn>
            )),
          )}
        </div>
        {Object.keys(tests).length >= 2 && (
          <div className="flex flex-wrap gap-2">
            <Btn onClick={() => setVerdict("A")}>Bar A is the magnet</Btn>
            <Btn
              onClick={() => {
                setVerdict("B");
                if (tests.B1 === "push") discover("solved");
              }}
            >
              Bar B is the magnet
            </Btn>
          </div>
        )}
      </div>
    </Stage>
  );
}

/* ───────────── Stop 4 · Save the magnet ───────────── */

const HARMS = [
  { id: "heat", label: "🔥 Heat it in a flame", text: "Heating made it weaker!" },
  { id: "knock", label: "🔨 Hammer it", text: "Hammering made it weaker!" },
  { id: "knock", label: "⬇️ Drop it from a height", text: "Dropping it made it weaker!" },
];
const STORES = [
  { id: "drawer", label: "Loose in a drawer, near the TV", ok: false, why: "Loose magnets slowly get weaker — and magnets can damage TVs, phones, computers and CDs. Keep them away!" },
  { id: "like", label: "In a pair, N next to N", ok: false, why: "Like poles side by side push against each other, and the magnets slowly lose strength." },
  { id: "keeper", label: "In a pair, N next to S, with wood and iron keepers", ok: true, why: "Perfect! Unlike poles on the same side, a piece of wood between them and soft iron pieces across the ends keep magnets strong." },
];

function SaveMagnet({ discover }: SimProps) {
  const [power, setPower] = useState(100);
  const [hit, setHit] = useState<{ k: number; text: string; icon: string } | null>(null);
  const [store, setStore] = useState<string | null>(null);
  const clips = Math.round(power / 20);
  const chosen = STORES.find((s) => s.id === store);
  return (
    <Stage
      caption={
        chosen ? (chosen.ok ? `✅ ${chosen.why}` : `✗ ${chosen.why}`) : hit ? `${hit.text} It now holds only ${clips} clip${clips === 1 ? "" : "s"}.` : "This magnet holds 5 paper clips. What makes it weaker — and how do we keep it strong?"
      }
    >
      <svg viewBox="0 0 520 220" className="block h-auto w-full select-none">
        <rect width="520" height="220" fill="#13112b" />
        {!store ? (
          <>
            <g key={hit?.k} className={hit ? "animate-[shake_.4s]" : ""} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <BarMagnet x={260} y={90} w={190} h={40} />
            </g>
            {Array.from({ length: clips }, (_, k) => (
              <g key={k} transform={`translate(${172 + (k % 2) * 8} ${116 + k * 14})`}>
                <path d="M-4 0 L-4 10 Q-4 14 0 14 Q4 14 4 10 L4 2" stroke="#cfd3e6" strokeWidth="2" fill="none" />
              </g>
            ))}
            {hit && (
              <text key={hit.k} x="380" y="70" fontSize="40" className="animate-pop">
                {hit.icon}
              </text>
            )}
            <text x="260" y="40" fontSize="12" fontWeight="900" fill="#ffd257" textAnchor="middle">
              Strength {power}%
            </text>
          </>
        ) : (
          <>
            {store === "drawer" && (
              <>
                <BarMagnet x={170} y={120} w={120} h={28} deg={-20} />
                <BarMagnet x={300} y={150} w={120} h={28} deg={35} />
                <text x="420" y="110" fontSize="54">
                  📺
                </text>
              </>
            )}
            {store !== "drawer" && (
              <>
                <BarMagnet x={260} y={80} w={200} h={30} />
                <g transform="translate(260 140)">
                  <BarMagnet x={0} y={0} w={200} h={30} deg={store === "keeper" ? 180 : 0} />
                </g>
                {store === "keeper" && (
                  <>
                    <rect x="160" y="96" width="200" height="28" rx="3" fill="#a06a35" />
                    <text x="260" y="114" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">
                      wood
                    </text>
                    <rect x="146" y="62" width="12" height="96" rx="3" fill="#8d93a8" />
                    <rect x="362" y="62" width="12" height="96" rx="3" fill="#8d93a8" />
                    <text x="152" y="176" fontSize="10" fontWeight="800" fill="#9da3c7" textAnchor="middle">
                      iron keeper
                    </text>
                  </>
                )}
              </>
            )}
          </>
        )}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-white/50">Try these</p>
        <div className="flex flex-wrap gap-2">
          {HARMS.map((h) => (
            <Btn
              key={h.label}
              onClick={() => {
                setStore(null);
                setPower((p) => Math.max(0, p - 30));
                setHit({ k: Date.now(), text: h.text, icon: h.label.split(" ")[0] });
                discover(h.id);
              }}
            >
              {h.label}
            </Btn>
          ))}
          <Btn onClick={() => (setPower(100), setHit(null), setStore(null))}>↺ New magnet</Btn>
        </div>
        <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-white/50">How should we store a pair of magnets?</p>
        <div className="grid gap-2">
          {STORES.map((s) => (
            <Btn
              key={s.id}
              on={store === s.id}
              className="text-left"
              onClick={() => {
                setStore(s.id);
                if (s.ok) discover("store");
                if (s.id === "drawer") discover("devices");
              }}
            >
              {s.label}
            </Btn>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Chapter data ───────────── */

const chapter: Chapter = {
  id: "magnets",
  n: 13,
  title: "Fun with Magnets",
  pages: "125–135",
  icon: "🧲",
  theme: { grad: "linear-gradient(135deg,#2a0a14 0%,#b3202e 50%,#1d4fb8 125%)", accent: "#c8283a", soft: "#ffe5e7", ink: "#8a1622" },
  opening: "At a junkyard, a crane lowers a block onto a heap of scrap — and lifts it away with pieces of iron clinging to it. What is hidden at the end of that crane?",
  stops: [
    {
      id: "magnetic",
      icon: "📎",
      title: "Magnetic or not?",
      pages: "125–127",
      wonder: {
        q: "You bring a magnet near a plastic scale, a paper clip and a wooden pencil. Which one jumps to it?",
        options: [
          { id: "scale", label: "The plastic scale" },
          { id: "clip", label: "The paper clip" },
          { id: "pencil", label: "The wooden pencil" },
        ],
        answer: "clip",
        reveal: "The paper clip — it's made of iron. A magnet attracts iron but not plastic or wood.",
      },
      explore: {
        activity: "Activity 2",
        title: "Go on a Magnes walk",
        how: "Like the shepherd Magnes, walk across the playground with a magnet tied to a stick. Drag it over each object.",
        Sim: MagnesWalk,
      },
      more: [
        {
          activity: "Activity 1",
          title: "A clip that floats",
          how: "A magnet is hidden in the cup. An iron clip is tied to the stand with a thread. Find the thread length that makes the clip hang in the air — then slide something in between.",
          Sim: FloatingClip,
        },
        {
          activity: "Chapter opening · Boojho's question",
          title: "Magnets hiding at home",
          how: "Find the hidden magnets around the house — and help the tailor and the carpenter.",
          Sim: HiddenMagnets,
        },
      ],
      discoveries: [
        { id: "pull", text: "A magnet pulls some objects towards itself", hint: "Drag the magnet onto any object", at: 0 },
        { id: "not", text: "Some objects are not attracted at all — they're non-magnetic", hint: "Drag the magnet onto something that doesn't stick", at: 0 },
        { id: "all", text: "You found every magnetic object", hint: "Keep going until every object that sticks is on the magnet", at: 0 },
        { id: "iron", text: "Everything the magnet picked up contains iron", hint: "After collecting them all, tap \"What do they have in common?\"", at: 0 },
        { id: "metal", text: "Not every metal is magnetic — aluminium isn't", hint: "Test the shiny aluminium foil", at: 0 },
        { id: "far", text: "Too far away, the pull is too weak to hold the clip", hint: "Set a long thread and tap \"Let go of the clip\"", at: 1 },
        { id: "float", text: "A magnet pulls iron without even touching it", hint: "Shorten the thread until the clip stays up in the air", at: 1 },
        { id: "through", text: "The pull works through paper and card", hint: "Get it floating, then slide in paper or card and let go again", at: 1 },
        { id: "hidden", text: "Magnets hide inside fridges, pin holders and pencil boxes", hint: "Tap the fridge sticker, fridge door, pin holder and pencil box", at: 2 },
        { id: "find", text: "A magnet finds lost needles and nails in a flash", hint: "Help the tailor and the carpenter on the floor", at: 2 },
        { id: "doll", text: "A hidden magnet can make a doll 'choose' iron things", hint: "Tap the doll", at: 2 },
      ],
      understand: [
        {
          title: "A shepherd's story",
          body: "Magnes, a shepherd in ancient Greece, found his iron-tipped stick stuck to a rock. The rock was a natural magnet, later named magnetite — perhaps after Magnes, though some believe it was first found at a place called Magnesia. Magnetite contains iron.",
          think: { q: "Magnes's stick got stuck to a rock on the hillside. What was at the tip of his stick?", options: ["Leather", "A piece of iron", "Wood"], answer: 1 },
        },
        {
          title: "Magnetic materials",
          body: "Materials that are attracted towards a magnet are magnetic — for example iron, nickel and cobalt.",
          think: { q: "Which of these is a magnetic material?", options: ["Glass", "Rubber", "Nickel"], answer: 2 },
        },
        {
          title: "Non-magnetic materials",
          body: "Materials like plastic, wood, glass, cloth, paper and rubber are not attracted. They are non-magnetic. Some metals, like aluminium and copper, are non-magnetic too.",
          think: { q: "You bring a magnet near an aluminium plate. What happens?", options: ["It jumps to the magnet — all metals do", "Nothing — aluminium is non-magnetic", "It pushes the magnet away"], answer: 1 },
        },
        {
          title: "Artificial magnets",
          body: "Today, magnets are made from pieces of iron in many shapes: bar, horseshoe, cylindrical and ball-ended.",
          think: { q: "Magnets made by people from pieces of iron are called…", options: ["Artificial magnets", "Magnetite", "Compasses"], answer: 0 },
        },
      ],
      check: [
        { id: "m1", kind: "mcq", q: "Paper is not a ______ material.", options: ["magnetic", "natural", "useful"], answer: 0, why: "A magnet does not attract paper, so paper is non-magnetic." },
        { id: "m2", kind: "tf", q: "Rubber is a magnetic material.", answer: false, why: "Rubber is not attracted by a magnet — it is non-magnetic." },
        { id: "m3", kind: "mcq", q: "A pencil sharpener with a plastic body is attracted by a magnet. Why?", options: ["Plastic is magnetic", "Its blade is made of iron", "Sharpeners are always magnets"], answer: 1, why: "The plastic isn't attracted — but the iron in the blade is." },
      ],
      connect: [
        { icon: "🏗", title: "Junkyard cranes", body: "A huge magnet on a crane lifts iron scrap out of a heap of junk." },
        { icon: "🧷", title: "Find the lost needle", body: "A tailor drops a needle on the floor? Sweep a magnet over it and the needle jumps up." },
        { icon: "🔨", title: "Nails in sawdust", body: "A carpenter can pull iron nails and screws out of wood shavings with a magnet — no searching by hand." },
        { icon: "📚", title: "A floating island", body: "In the book Gulliver's Travels, a whole island called Laputa floats in the air. Could magnets be involved? Find the story and read it!" },
      ],
    },
    {
      id: "poles",
      icon: "✨",
      title: "Where is the pull strongest?",
      pages: "128–129",
      wonder: {
        q: "You sprinkle iron filings around a bar magnet. Where will most of them stick?",
        options: [
          { id: "middle", label: "In the middle" },
          { id: "even", label: "Evenly all over" },
          { id: "ends", label: "Near the two ends" },
        ],
        answer: "ends",
        reveal: "Near the two ends! The pull of a magnet is strongest close to its ends. We say the poles of the magnet are there.",
      },
      explore: {
        activity: "Activity 4",
        title: "Iron filings on paper",
        how: "Sprinkle iron filings around the magnet and watch where they gather. Then try a horseshoe and a cylindrical magnet.",
        Sim: PolesFilings,
      },
      more: [
        {
          activity: "Activity 3",
          title: "Is there iron in the soil?",
          how: "Rub a magnet in sand or soil from three places. Shake it gently and see what stays — then compare in the table.",
          Sim: SoilTest,
        },
      ],
      discoveries: [
        { id: "ends", text: "Filings crowd near the ends of the magnet", hint: "Tap \"Sprinkle iron filings\"", at: 0 },
        { id: "middle", text: "Very few filings stick to the middle", hint: "After sprinkling, tap the middle of the magnet", at: 0 },
        { id: "horseshoe", text: "A horseshoe magnet's poles are at its two tips", hint: "Tap \"Try a horseshoe magnet\"", at: 0 },
        { id: "cylinder", text: "A cylindrical magnet has its poles at its two ends too", hint: "Keep switching until you try the cylindrical magnet", at: 0 },
        { id: "two", text: "Every magnet has two poles, whatever its shape", hint: "Try a second magnet shape", at: 0 },
        { id: "shake", text: "Shaking knocks the sand off, but iron bits stay stuck", hint: "Drag the magnet into sand with iron, rub it around, pull it out and shake", at: 1 },
        { id: "none", text: "Some sand has no iron in it at all", hint: "Test the washed white sand", at: 1 },
        { id: "compare", text: "Soil from different places has different amounts of iron", hint: "Test all three soils", at: 1 },
      ],
      understand: [
        {
          title: "Poles",
          body: "Iron filings are attracted most strongly near the two ends of a bar magnet. The poles of the magnet are near these ends.",
          think: { q: "The places where a magnet's pull is strongest are called its…", options: ["Edges", "Poles", "Centres"], answer: 1 },
        },
        {
          title: "Always two",
          body: "All magnets have two poles, whatever their shape — bar, horseshoe, cylindrical or ball-ended.",
          think: { q: "How many poles does a ball-ended magnet have?", options: ["One", "None", "Two"], answer: 2 },
        },
        {
          title: "Iron in the soil",
          body: "Rub a magnet in sand or soil. If tiny iron filings cling to it, that soil contains iron.",
          think: { q: "You rub a magnet in soil and tiny dark bits stay stuck to it after shaking. What are they most likely to be?", options: ["Bits of iron", "Grains of salt", "Bits of plastic"], answer: 0 },
        },
      ],
      check: [
        { id: "m4", kind: "tf", q: "Maximum iron filings stick in the middle of a bar magnet.", answer: false, why: "Most stick near the ends, where the poles are." },
        { id: "m5", kind: "tf", q: "A cylindrical magnet has only one pole.", answer: false, why: "Every magnet has two poles, whatever its shape." },
        { id: "m6", kind: "mcq", q: "Where are the poles of a bar magnet located?", options: ["Near its two ends", "Exactly at its centre", "All along one side"], answer: 0, why: "The pull is strongest near the ends — that's where the poles are." },
      ],
      connect: [
        { icon: "🏜", title: "Test your soil", body: "Rub a magnet in soil near your home or school. Many filings, few, or none? Compare places." },
        { icon: "📌", title: "Pin holders", body: "Pins seem to stick to some pin holders — a magnet is hidden inside." },
        { icon: "🧸", title: "Magnetic toys", body: "Look at where pieces of a magnetic toy snap together: usually at the poles." },
      ],
    },
    {
      id: "direction",
      icon: "🧭",
      title: "Which way is North?",
      pages: "129–131",
      wonder: {
        q: "You hang a bar magnet from a thread so it can turn freely. Where does it come to rest?",
        options: [
          { id: "any", label: "Anywhere — wherever it stops" },
          { id: "ns", label: "Always pointing North–South" },
          { id: "ew", label: "Always pointing East–West" },
        ],
        answer: "ns",
        reveal: "Always North–South! Turn it as much as you like — a freely suspended bar magnet always comes to rest in the North–South direction.",
      },
      explore: {
        activity: "Activity 5",
        title: "A magnet that finds North",
        how: "Drag the hanging bar to spin it and let go. Then swap it for an iron bar or a wooden scale. Finally, line up the compass dial.",
        Sim: Suspended,
      },
      more: [
        {
          activity: "Section 13.3",
          title: "North from the rising Sun",
          how: "No compass? Use the Sun. Face the sunrise, then work out where North is.",
          Sim: SunCompass,
        },
        {
          activity: "Section 13.4",
          title: "Make your own magnet",
          how: "Turn a plain iron nail into a magnet. Slide the magnet along the nail, always the same way — then test it on pins.",
          Sim: MakeMagnet,
        },
        {
          activity: "Activity 6 · Boojho's question",
          title: "A compass in a bowl",
          how: "A magnetised needle is pushed through a cork floating in water. Spin it and watch. Then try a plain needle — and bring a magnet near.",
          Sim: CorkCompass,
        },
      ],
      discoveries: [
        { id: "settles", text: "The magnet comes to rest pointing North–South", hint: "Drag the bar magnet to spin it, then let go and wait", at: 0 },
        { id: "again", text: "Spin it again: it returns to North–South every time", hint: "Spin the bar magnet a second time", at: 0 },
        { id: "others", text: "An iron bar or a wooden scale just stops anywhere", hint: "Switch to the iron bar or the wooden scale", at: 0 },
        { id: "compass", text: "A compass dial is turned until N lines up with the needle", hint: "Drag the compass dial round until N lines up with the needle", at: 0 },
        { id: "stroke", text: "Each stroke in the same direction makes the nail more magnetic", hint: "Drag the magnet along the nail, left to right, 3 times", at: 2 },
        { id: "oneway", text: "Rubbing back and forth undoes it — strokes must all go one way", hint: "Try rubbing the other way, right to left", at: 2 },
        { id: "magnet", text: "Your iron nail became a magnet and picks up pins!", hint: "Finish all 10 strokes, then tap \"Test it on pins\"", at: 2 },
        { id: "east", text: "The Sun rises roughly in the East", hint: "Turn until you face the Sun", at: 1 },
        { id: "left", text: "Facing East, North is on your left", hint: "Facing the Sun, choose where North is", at: 1 },
        { id: "rough", text: "The Sun gives a rough direction; a compass is more exact", hint: "Tap \"Check with a compass\"", at: 1 },
        { id: "cork", text: "A magnetised needle on a cork swings to North–South", hint: "Drag to spin the cork, then let go", at: 3 },
        { id: "plain", text: "A plain needle just stays where you leave it", hint: "Tap \"Use a plain needle\" and spin it", at: 3 },
        { id: "near", text: "A magnet nearby pulls a compass needle off North", hint: "Tap \"Bring a magnet near\"", at: 3 },
      ],
      understand: [
        {
          title: "North and south poles",
          body: "The end that points North is the north-seeking end, or north pole. The other is the south pole. They are usually marked N and S. To find North roughly, face the rising sun (East): North is on your left.",
          think: { q: "The end of a freely hanging magnet that points North is called its…", options: ["South pole", "North pole", "Middle"], answer: 1 },
        },
        {
          title: "The compass",
          body: "A compass has a magnetised needle that turns freely. When it rests, we rotate the dial until N and S are at its two ends. The north end of the needle is painted a different colour.",
          think: { q: "Inside a compass, what turns freely to show North–South?", options: ["A tiny battery", "A magnetised needle", "A drop of water"], answer: 1 },
        },
        {
          title: "Make your own magnet",
          body: "Stroke an iron bar 30–40 times with one pole of a magnet, always in the same direction and lifting it back each time. The iron becomes a magnet. A needle, a nail or a blade can be magnetised the same way.",
          think: { q: "To turn an iron bar into a magnet, how should you stroke it?", options: ["Back and forth, as fast as you can", "Only once, very hard", "Many times, the same way, with the same pole"], answer: 2 },
        },
        {
          title: "A compass in a cup",
          body: "Push a magnetised needle through a piece of cork and float it on water. It turns to point North–South.",
          think: { q: "A magnetised needle stuck in a cork floats in a bowl of water. Which way does it settle?", options: ["North–South", "East–West", "A different way every time"], answer: 0 },
        },
      ],
      check: [
        { id: "m7", kind: "mcq", q: "In olden days, travellers found directions by hanging a piece of…", options: ["natural magnet (magnetite)", "glass", "copper"], answer: 0, why: "A freely hanging natural magnet points North–South." },
        { id: "m8", kind: "tf", q: "Bar magnets always point towards the North–South direction when suspended freely.", answer: true, why: "That's the special property travellers relied on." },
        { id: "m9", kind: "mcq", q: "How can you make an iron strip into a magnet?", options: ["Heat it in a flame", "Stroke it many times with one pole of a magnet, in the same direction", "Hammer it hard"], answer: 1, why: "Heating or hammering actually makes magnets lose their magnetism!" },
      ],
      connect: [
        { icon: "🏺", title: "The emperor's chariot", body: "A story tells of a Chinese emperor, Hoang Ti, whose chariot had a statue whose arm always pointed South." },
        { icon: "⛵", title: "Sailors and travellers", body: "For centuries, travellers carried magnets or compasses to find their way." },
        { icon: "🏫", title: "Your school gate", body: "Use a compass to find which direction your classroom door and school gate face." },
      ],
    },
    {
      id: "poles2",
      icon: "🚗",
      title: "Push and pull",
      pages: "131–133",
      wonder: {
        q: "Two magnets are brought close with their north poles facing each other. What happens?",
        options: [
          { id: "pull", label: "They pull together" },
          { id: "push", label: "They push each other away" },
          { id: "nothing", label: "Nothing at all" },
        ],
        answer: "push",
        reveal: "They push apart. Similar poles repel each other; opposite poles attract.",
      },
      explore: {
        activity: "Toy car activity",
        title: "Magnetic toy cars",
        how: "Each car carries a bar magnet. Flip the magnets to change which poles face each other, then let the cars go.",
        Sim: MagnetCars,
      },
      more: [
        {
          activity: "Paheli's puzzle",
          title: "Which bar is the magnet?",
          how: "Two bars look exactly alike. Test each end with the north pole of a known magnet, then name the real magnet.",
          Sim: TwoBars,
        },
        {
          activity: "A Few Cautions",
          title: "Save the magnet",
          how: "Find out what weakens a magnet. Then choose the right way to store a pair of magnets.",
          Sim: SaveMagnet,
        },
      ],
      discoveries: [
        { id: "attract", text: "Opposite poles attract — the cars rush together", hint: "Tap \"Let go\" with different poles facing", at: 0 },
        { id: "repel", text: "Similar poles repel — the cars push apart", hint: "Flip one magnet so the same poles face, then let go", at: 0 },
        { id: "likes", text: "N–N and S–S both repel", hint: "Try N–N and also S–S", at: 0 },
        { id: "table", text: "You tested all four arrangements", hint: "Fill all four boxes in the table", at: 0 },
        { id: "both", text: "Plain iron is pulled at both ends — pulling proves nothing", hint: "Test both ends of Bar A", at: 1 },
        { id: "pushed", text: "Only a magnet can push another magnet away", hint: "Keep testing ends until one pushes away", at: 1 },
        { id: "solved", text: "Case solved: repulsion found the real magnet", hint: "Test the ends, then choose which bar is the magnet", at: 1 },
        { id: "heat", text: "Heating weakens a magnet", hint: "Tap \"Heat it in a flame\"", at: 2 },
        { id: "knock", text: "Hammering or dropping weakens it too", hint: "Hammer it or drop it", at: 2 },
        { id: "store", text: "Stored in pairs with keepers, magnets stay strong", hint: "Pick the right way to store a pair", at: 2 },
        { id: "devices", text: "Keep magnets away from TVs, phones and computers", hint: "Try keeping it in the drawer", at: 2 },
      ],
      understand: [
        {
          title: "Attraction and repulsion",
          body: "Opposite poles of two magnets attract each other. Similar poles repel each other.",
          think: { q: "The S pole of one magnet faces the N pole of another. What happens?", options: ["They push apart", "They pull together", "Nothing"], answer: 1 },
        },
        {
          title: "The surest test",
          body: "Iron is attracted by both poles of a magnet. Only another magnet can be repelled — so repulsion tells you which bar is the magnet.",
          think: { q: "Iron is pulled by both poles of a magnet. What can only another magnet do?", options: ["Get repelled", "Get attracted", "Get heavier"], answer: 0 },
        },
        {
          title: "Handle with care",
          body: "Magnets lose their properties if they are heated, hammered or dropped from a height.",
          think: { q: "Which of these makes a magnet weaker?", options: ["Storing it with a keeper", "Wrapping it in paper", "Dropping it from a height"], answer: 2 },
        },
        {
          title: "Store them safely",
          body: "Keep bar magnets in pairs with unlike poles on the same side, a piece of wood between them and soft iron pieces across their ends. A horseshoe magnet gets one iron piece across its poles. Keep magnets away from phones, TVs, computers and CDs.",
          think: { q: "How should two bar magnets be stored?", options: ["Like poles side by side", "Unlike poles on the same side, wood between, iron pieces across the ends", "Loose, next to the TV"], answer: 1 },
        },
      ],
      check: [
        {
          id: "m10",
          kind: "sort",
          q: "One pole of a magnet is brought near a pole of another. Attract or repel?",
          bins: ["Attract", "Repel"],
          items: [
            { label: "N – S", bin: 0 },
            { label: "S – N", bin: 0 },
            { label: "N – N", bin: 1 },
            { label: "S – S", bin: 1 },
          ],
          why: "Opposite poles attract; similar poles repel.",
        },
        { id: "m11", kind: "tf", q: "Similar poles of magnets repel each other.", answer: true, why: "N–N and S–S both push apart." },
        { id: "m12", kind: "mcq", q: "Two bars look identical. One is a magnet, one is plain iron. Which test tells them apart for sure?", options: ["See which one attracts a paper clip", "See which one repels a pole of a known magnet", "See which one is heavier"], answer: 1, why: "Only a magnet can repel another magnet's pole." },
      ],
      connect: [
        { icon: "🎎", title: "The intelligent doll", body: "Hide a small magnet in a doll's gloved hand — it \"chooses\" to pick up only iron things." },
        { icon: "📱", title: "Keep them apart", body: "Keep magnets away from mobiles, TVs, music systems, CDs and computers." },
        { icon: "🗄", title: "Fridge doors", body: "Fridge doors and pencil boxes stay shut using hidden magnets." },
      ],
    },
  ],
  challenge: [
    { id: "x1", kind: "mcq", q: "Artificial magnets are made in different shapes such as…", options: ["square, oval and star", "bar, horseshoe and cylindrical", "only round"], answer: 1, why: "Bar, horseshoe, cylindrical and ball-ended magnets are all common." },
    { id: "x2", kind: "mcq", q: "Materials which are attracted towards a magnet are called…", options: ["magnetic", "non-magnetic", "natural"], answer: 0, why: "Iron, nickel and cobalt are magnetic materials." },
    { id: "x3", kind: "mcq", q: "A magnet always has ____ poles.", options: ["one", "two", "four"], answer: 1, why: "Every magnet has a north pole and a south pole, whatever its shape." },
    { id: "x16", kind: "mcq", q: "Paper is not a ______ material.", options: ["natural", "magnetic", "useful"], answer: 1, why: "A magnet doesn't attract paper, so it is non-magnetic." },
    { id: "x17", kind: "mcq", q: "In olden days, sailors found directions by hanging a piece of…", options: ["glass", "copper", "natural magnet"], answer: 2, why: "A freely hanging natural magnet points North–South." },
    { id: "x4", kind: "tf", q: "Artificial magnets were discovered in Greece.", answer: false, why: "The story from Greece is about a natural magnet on a hillside. Artificial magnets were made much later, from pieces of iron." },
    { id: "x5", kind: "tf", q: "A compass can be used to find the East–West direction at any place.", answer: true, why: "Once the compass shows North and South, East and West are at right angles to them." },
    {
      id: "x18",
      kind: "sort",
      q: "True or false?",
      bins: ["True", "False"],
      items: [
        { label: "A cylindrical magnet has only one pole", bin: 1 },
        { label: "Similar poles of a magnet repel each other", bin: 0 },
        { label: "Most iron filings stick to the middle of a bar magnet", bin: 1 },
        { label: "A freely hanging bar magnet points North–South", bin: 0 },
        { label: "Rubber is a magnetic material", bin: 1 },
      ],
      why: "Magnets always have two poles, strongest near the ends; like poles repel; rubber is non-magnetic.",
    },
    { id: "x19", kind: "mcq", q: "A pencil sharpener with a plastic body is attracted by both poles of a magnet. What might part of it be made of?", options: ["Glass", "Iron", "Aluminium"], answer: 1, why: "Its blade contains iron, which both poles attract." },
    { id: "x6", kind: "mcq", q: "Which of these are two properties of a magnet?", options: ["It attracts iron, and its like poles repel", "It attracts glass, and it melts in water", "It attracts wood, and it has one pole"], answer: 0, why: "A magnet attracts magnetic materials, always has two poles, points North–South when hung freely, and its like poles repel." },
    { id: "x7", kind: "mcq", q: "A bar magnet has no markings. How can you find out which end is its north pole?", options: ["See which end is heavier", "Hang it freely — the end that points North is its north pole", "Rub it on paper"], answer: 1, why: "A freely suspended magnet always rests North–South." },
    { id: "x20", kind: "mcq", q: "You are given an iron strip. How will you make it into a magnet?", options: ["Stroke it 30–40 times with one pole of a magnet, always the same way", "Heat it until it is red-hot", "Hammer it flat"], answer: 0, why: "Heating and hammering weaken magnets — stroking in one direction makes one." },
    { id: "x8", kind: "mcq", q: "How is a compass used to find directions?", options: ["Shake it until the needle stops at N", "Hold it next to a magnet", "Let the needle come to rest, then turn the box until N and S on the dial are at the two ends of the needle"], answer: 2, why: "The needle shows North–South; the dial is turned to match it." },
    { id: "x9", kind: "mcq", q: "Toy boat: a magnet brought from any direction pulls the boat towards it. Why?", options: ["The boat is made of a magnetic material", "The boat is made of a non-magnetic material", "The boat has a magnet with its north pole at its head"], answer: 0, why: "A magnet attracts magnetic material from any direction." },
    { id: "x10", kind: "mcq", q: "Toy boat: the magnet doesn't affect the boat at all. Why?", options: ["The boat has a magnet along its length", "The boat is made of a non-magnetic material", "The magnet is too strong"], answer: 1, why: "Non-magnetic materials are not attracted." },
    { id: "x11", kind: "mcq", q: "Toy boat: the boat moves towards the magnet when the magnet's north pole is brought near the boat's head. What is fitted in the boat?", options: ["A magnet with its north pole towards its head", "A magnet with its south pole towards its head", "Nothing at all"], answer: 1, why: "Opposite poles attract: the magnet's N pulls the boat's S." },
    { id: "x12", kind: "mcq", q: "Toy boat: the boat moves away when the magnet's north pole is brought near its head. Why?", options: ["The boat has a magnet with its north pole towards its head", "The boat is made of iron", "The boat is made of plastic"], answer: 0, why: "Similar poles repel: N pushes N away." },
    { id: "x13", kind: "mcq", q: "Two equal bar magnets are placed one on top of the other, with their north poles on the same side. What happens?", options: ["They stick firmly together", "Nothing happens", "The top magnet is pushed up or slides off — like poles repel"], answer: 2, why: "N sits over N and S over S, so they repel each other." },
    { id: "x14", kind: "mcq", q: "What will happen if a magnet is brought near a compass?", options: ["The needle turns towards or away from the magnet", "Nothing — a compass only feels the Earth", "The compass stops working forever"], answer: 0, why: "The compass needle is a small magnet, so another magnet attracts or repels its poles." },
    { id: "x15", kind: "mcq", q: "You stand facing the rising sun, which is roughly East. Which way is North?", options: ["To your right", "To your left", "Behind you"], answer: 1, why: "Face East and North is on your left. It's a rough method, but it tells North from South." },
  ],
  book: [
    { id: "b1", kind: "idea", page: "125", text: "Magnets hidden in stickers, pin holders and pencil boxes", by: ["d:magnetic.hidden", "c:poles.2", "c:poles2.3"] },
    { id: "b2", kind: "idea", page: "125–126", text: "Magnes story; magnetite is a natural magnet that contains iron; Magnesia", by: ["t:magnetic.1", "q:x17"] },
    { id: "b3", kind: "idea", page: "126", text: "Artificial magnets come in shapes: bar, horseshoe, cylindrical, ball-ended", by: ["t:magnetic.4", "q:x1", "d:poles.horseshoe", "d:poles.cylinder"] },
    { id: "b4", kind: "activity", page: "126", text: "Activity 1: a paper clip held in the air by a hidden magnet", by: ["d:magnetic.float", "d:magnetic.far", "d:magnetic.through"] },
    { id: "b5", kind: "activity", page: "127", text: "Activity 2: the Magnes walk", by: ["d:magnetic.pull", "d:magnetic.all"] },
    { id: "b6", kind: "idea", page: "127", text: "Magnetic materials: iron, nickel, cobalt", by: ["d:magnetic.iron", "t:magnetic.2", "q:x2"] },
    { id: "b7", kind: "idea", page: "127", text: "Non-magnetic materials, including metals like aluminium", by: ["d:magnetic.not", "d:magnetic.metal", "t:magnetic.3", "q:m1", "q:m2"] },
    { id: "b8", kind: "box", page: "127", text: "Boojho: help the tailor find his needle", by: ["d:magnetic.find", "c:magnetic.2"] },
    { id: "b9", kind: "activity", page: "128", text: "Activity 3: rub a magnet in soil to find iron (Table 13.2)", by: ["d:poles.shake", "d:poles.none", "d:poles.compare", "t:poles.3", "c:poles.1"] },
    { id: "b10", kind: "activity", page: "128", text: "Activity 4: iron filings show where the pull is strongest", by: ["d:poles.ends", "d:poles.middle", "q:m4"] },
    { id: "b11", kind: "idea", page: "129", text: "Poles are near the ends; every magnet has two poles", by: ["d:poles.two", "t:poles.1", "t:poles.2", "q:m5", "q:m6", "q:x3"] },
    { id: "b12", kind: "box", page: "129", text: "Paheli: which of two identical bars is the magnet?", by: ["d:poles2.both", "d:poles2.pushed", "d:poles2.solved", "t:poles2.2", "q:m12"] },
    { id: "b13", kind: "idea", page: "129", text: "Emperor Hoang Ti's direction-finding chariot", by: ["c:direction.1"] },
    { id: "b14", kind: "activity", page: "129–130", text: "Activity 5: a freely suspended magnet rests North–South", by: ["d:direction.settles", "d:direction.again", "d:direction.others"] },
    { id: "b15", kind: "idea", page: "130", text: "Finding East from the rising sun; North is on your left", by: ["d:direction.east", "d:direction.left", "d:direction.rough", "t:direction.1", "q:x15"] },
    { id: "b16", kind: "idea", page: "130", text: "North-seeking and south-seeking poles, marked N and S", by: ["t:direction.1", "q:x7"] },
    { id: "b17", kind: "idea", page: "130", text: "Travellers found directions with hanging natural magnets", by: ["q:m7", "c:direction.2"] },
    { id: "b18", kind: "idea", page: "130–131", text: "The compass and how to use it", by: ["d:direction.compass", "t:direction.2", "q:x8", "q:x5"] },
    { id: "b19", kind: "box", page: "130", text: "Which direction does your school gate face?", by: ["c:direction.3"] },
    { id: "b20", kind: "activity", page: "131", text: "Make your own magnet by stroking an iron bar", by: ["d:direction.stroke", "d:direction.oneway", "d:direction.magnet", "t:direction.3", "q:m9"] },
    { id: "b21", kind: "activity", page: "131", text: "Activity 6: a needle-and-cork compass", by: ["d:direction.cork", "d:direction.plain", "t:direction.4"] },
    { id: "b22", kind: "activity", page: "131–132", text: "Toy cars: attraction and repulsion between poles", by: ["d:poles2.attract", "d:poles2.repel", "d:poles2.likes", "d:poles2.table", "q:m10", "q:m11"] },
    { id: "b23", kind: "box", page: "132", text: "Boojho: a magnet brought near a compass", by: ["d:direction.near", "q:x14"] },
    { id: "b24", kind: "idea", page: "132", text: "Heating, hammering and dropping weaken magnets", by: ["d:poles2.heat", "d:poles2.knock", "t:poles2.3"] },
    { id: "b25", kind: "idea", page: "133", text: "Storing magnets safely; keep them away from TVs, phones and computers", by: ["d:poles2.store", "d:poles2.devices", "t:poles2.4"] },
    { id: "e1", kind: "exercise", page: "134", text: "Q1 Fill in the blanks", by: ["q:x1", "q:x2", "q:x16", "q:x17", "q:x3"] },
    { id: "e2", kind: "exercise", page: "134", text: "Q2 True or false (7 statements)", by: ["q:x18", "q:x4", "q:x5"] },
    { id: "e3", kind: "exercise", page: "134", text: "Q3 The pencil sharpener", by: ["q:x19", "q:m3"] },
    { id: "e4", kind: "exercise", page: "134", text: "Q4 Attraction or repulsion table", by: ["q:m10"] },
    { id: "e5", kind: "exercise", page: "134", text: "Q5 Two properties of a magnet", by: ["q:x6"] },
    { id: "e6", kind: "exercise", page: "134", text: "Q6 Where are the poles of a bar magnet?", by: ["q:m6"] },
    { id: "e7", kind: "exercise", page: "134", text: "Q7 Find the north pole of an unmarked magnet", by: ["q:x7"] },
    { id: "e8", kind: "exercise", page: "134", text: "Q8 Make an iron strip into a magnet", by: ["q:x20", "d:direction.magnet"] },
    { id: "e9", kind: "exercise", page: "134", text: "Q9 How is a compass used?", by: ["q:x8"] },
    { id: "e10", kind: "exercise", page: "134–135", text: "Q10 The magnet and the toy boat", by: ["q:x9", "q:x10", "q:x11", "q:x12"] },
    { id: "p1", kind: "project", page: "135", text: "Find which way your windows and door face, with a compass", by: ["c:direction.3"] },
    { id: "p2", kind: "project", page: "135", text: "Two bar magnets placed one above the other", by: ["q:x13"] },
    { id: "p3", kind: "project", page: "135", text: "Help the carpenter find nails in wood shavings", by: ["d:magnetic.find", "c:magnetic.3"] },
    { id: "p4", kind: "project", page: "135", text: "Make an 'intelligent doll'", by: ["d:magnetic.doll", "c:poles2.1"] },
    { id: "p5", kind: "project", page: "135", text: "Things to read: Gulliver's Travels and the floating island", by: ["c:magnetic.4"] },
  ],
  learnt: [
    "Magnetite is a natural magnet.",
    "A magnet attracts materials like iron, nickel and cobalt — these are magnetic materials. Materials not attracted are non-magnetic.",
    "Each magnet has two poles: North and South.",
    "A freely suspended magnet always comes to rest in the North–South direction.",
    "Opposite poles of two magnets attract each other, while similar poles repel.",
  ],
  keywords: ["Magnetite", "Magnet", "Magnetic", "Non-magnetic", "North pole", "South pole", "Compass"],
};

export default chapter;
