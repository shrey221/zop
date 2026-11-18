// Chapter 12 · Electricity and Circuits (NCERT Science Class VI, 2018-19, pp. 116–124).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useMemo, useRef, useState } from "react";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage, useSvgDrag } from "../ui";

/* ───────────── shared drawings ───────────── */

function Glow({ x, y, on, r = 70 }: { x: number; y: number; on: boolean; r?: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill="url(#bulbGlow)"
      style={{ opacity: on ? 1 : 0, transition: "opacity .35s" }}
      className={on ? "animate-glow" : ""}
    />
  );
}

function Defs() {
  return (
    <defs>
      <radialGradient id="bulbGlow">
        <stop offset="0" stopColor="#fff6c2" stopOpacity="1" />
        <stop offset=".35" stopColor="#ffd257" stopOpacity=".55" />
        <stop offset="1" stopColor="#ffb534" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="cellBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a3f63" />
        <stop offset=".5" stopColor="#262a48" />
        <stop offset="1" stopColor="#171a31" />
      </linearGradient>
      <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f1f3f8" />
        <stop offset="1" stopColor="#9aa1b5" />
      </linearGradient>
    </defs>
  );
}

// Torch bulb, drawn upright. (x, y) is the top of the glass. Terminals: side of the metal base and the tip.
function Bulb({ x, y, on, fused = false, scale = 1 }: { x: number; y: number; on: boolean; fused?: boolean; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <Glow x={0} y={40} on={on} r={80} />
      <path d="M-36 40 a36 36 0 1 1 72 0 c0 16 -12 24 -16 34 v14 h-40 v-14 c-4 -10 -16 -18 -16 -34 z" fill={on ? "#fff7d0" : "#dfe8f5"} fillOpacity={on ? 0.95 : 0.35} stroke="#c9d6ea" strokeWidth="2" />
      {/* support wires */}
      <path d="M-8 88 L-12 52 M8 88 L12 52" stroke="#8d93a8" strokeWidth="2.4" fill="none" />
      {/* filament */}
      {fused ? (
        <path d="M-12 52 l5 -8 l5 8 M12 52 l-5 -7" stroke="#6b7086" strokeWidth="2" fill="none" />
      ) : (
        <path d="M-12 52 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8" stroke={on ? "#ff9d00" : "#6b7086"} strokeWidth={on ? 3 : 2} fill="none" strokeLinejoin="round" />
      )}
      {/* metal base (one terminal) */}
      <rect x="-20" y="88" width="40" height="26" rx="3" fill="url(#metal)" />
      <path d="M-20 95 h40 M-20 102 h40 M-20 109 h40" stroke="#8a90a3" strokeWidth="1.5" />
      <path d="M-14 114 h28 l-6 8 h-16 z" fill="#2b2f45" />
      {/* tip (other terminal) */}
      <circle cx="0" cy="125" r="6" fill="url(#metal)" stroke="#8a90a3" />
    </g>
  );
}

// Electric cell lying on its side; metal cap (+) on the right, metal disc (−) on the left.
function Cell({ x, y, w = 200 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="56" rx="10" fill="url(#cellBody)" stroke="#4a5080" />
      <rect x={x + w * 0.55} y={y} width={w * 0.45} height="56" rx="10" fill="#e9a822" opacity=".9" />
      <rect x={x + w} y={y + 18} width="12" height="20" rx="3" fill="url(#metal)" />
      <rect x={x - 5} y={y + 6} width="6" height="44" rx="2" fill="url(#metal)" />
      <text x={x + w - 18} y={y + 35} fontSize="20" fontWeight="900" fill="#1d1a3a" textAnchor="middle">+</text>
      <text x={x + 20} y={y + 35} fontSize="22" fontWeight="900" fill="#fff" textAnchor="middle">−</text>
      <text x={x + w * 0.32} y={y + 34} fontSize="12" fontWeight="800" fill="#fff" opacity=".7" textAnchor="middle">1.5 V</text>
    </g>
  );
}

const FLOW = (on: boolean, reverse = false): React.CSSProperties =>
  on ? { strokeDasharray: "4 10", animation: `zflow .8s linear infinite${reverse ? " reverse" : ""}` } : {};

/* ───────────── Stop 1 · Inside a cell and a bulb ───────────── */

const PARTS = [
  { id: "filament", label: "Filament", x: 430, y: 118, text: "The thin wire that gives off light when current flows through it.", disc: "filament" },
  { id: "supports", label: "Thick wires", x: 452, y: 150, text: "Two thicker wires hold the filament up and connect it to the terminals.", disc: "filament" },
  { id: "base", label: "Metal base", x: 403, y: 188, text: "One terminal of the bulb: the metal case at the bottom.", disc: "bulbTerminals" },
  { id: "tip", label: "Metal tip", x: 430, y: 218, text: "The other terminal: the tip at the centre of the base. It never touches the metal case.", disc: "bulbTerminals" },
  { id: "cap", label: "Metal cap (+)", x: 258, y: 300, text: "The positive (+) terminal of the electric cell.", disc: "cellTerminals" },
  { id: "disc", label: "Metal disc (−)", x: 37, y: 300, text: "The negative (−) terminal of the cell.", disc: "cellTerminals" },
  { id: "inside", label: "Inside the cell", x: 140, y: 300, text: "Chemicals stored inside make the electricity. When they are used up, the cell must be replaced.", disc: "chemicals" },
];

function BulbAnatomy({ discover }: SimProps) {
  const [sel, setSel] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [lit, setLit] = useState(false);
  const part = PARTS.find((p) => p.id === sel);

  function pick(id: string) {
    setSel(id);
    const p = PARTS.find((x) => x.id === id)!;
    const s = [...new Set([...seen, id])];
    setSeen(s);
    if (p.disc === "bulbTerminals" ? s.includes("base") && s.includes("tip") : p.disc === "cellTerminals" ? s.includes("cap") && s.includes("disc") : true) discover(p.disc);
  }

  return (
    <Stage
      caption={
        part ? (
          <span>
            <b className="text-[#ffd257]">{part.label}:</b> {part.text}
          </span>
        ) : (
          "Tap the glowing dots to explore each part. Switch the torch on to see which part shines."
        )
      }
    >
      <svg viewBox="0 0 520 360" className="block h-auto w-full">
        <Defs />
        <rect width="520" height="360" fill="#13112b" />
        <text x="20" y="34" fontSize="13" fontWeight="800" fill="#9da3c7" letterSpacing="2">ELECTRIC CELL</text>
        <text x="300" y="34" fontSize="13" fontWeight="800" fill="#9da3c7" letterSpacing="2">TORCH BULB (ZOOMED)</text>
        <Bulb x={430} y={60} on={lit} scale={1.25} />
        <Cell x={40} y={272} w={212} />
        {PARTS.map((p) => (
          <g key={p.id} onClick={() => pick(p.id)} style={{ cursor: "pointer" }} role="button" aria-label={p.label}>
            <circle cx={p.x} cy={p.y} r="16" fill="#ffd257" fillOpacity={sel === p.id ? 0.45 : 0.22} className={seen.includes(p.id) ? "" : "animate-glow"} />
            <circle cx={p.x} cy={p.y} r="7" fill={seen.includes(p.id) ? "#1fb88a" : "#ffd257"} stroke="#13112b" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn
          on={lit}
          onClick={() => {
            setLit((v) => !v);
            discover("filament");
          }}
        >
          {lit ? "💡 Torch ON" : "🔦 Switch torch on"}
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 2 · Build a circuit ───────────── */

type End = { x: number; y: number; snap: "side" | "tip" | null };
const BULB = { x: 420, y: 40 };
const TARGETS = { side: { x: BULB.x - 22, y: BULB.y + 101 }, tip: { x: BULB.x, y: BULB.y + 125 } };
const CELL = { x: 80, y: 290, w: 220 };
const PLUS = { x: CELL.x + CELL.w + 12, y: CELL.y + 28 };
const MINUS = { x: CELL.x - 5, y: CELL.y + 28 };

function useWireEnd(start: End) {
  const [e, setE] = useState<End>(start);
  const drag = useSvgDrag(
    (x, y) => setE({ x: Math.max(10, Math.min(510, x)), y: Math.max(10, Math.min(370, y)), snap: null }),
    () =>
      setE((cur) => {
        for (const k of ["side", "tip"] as const) {
          const t = TARGETS[k];
          if (Math.hypot(cur.x - t.x, cur.y - t.y) < 30) return { ...t, snap: k };
        }
        return cur;
      }),
  );
  return [e, setE, drag] as const;
}

function wirePath(a: { x: number; y: number }, b: { x: number; y: number }, bend: number) {
  return `M${a.x} ${a.y} C${a.x + bend} ${a.y - 40}, ${b.x + bend} ${b.y + 80}, ${b.x} ${b.y}`;
}

function CircuitBuilder({ discover }: SimProps) {
  const [red, setRed, dragRed] = useWireEnd({ x: 360, y: 250, snap: null });
  const [blue, setBlue, dragBlue] = useWireEnd({ x: 250, y: 200, snap: null });
  const [fused, setFused] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const complete = !!red.snap && !!blue.snap && red.snap !== blue.snap;
  const lit = complete && !fused;
  const same = !!red.snap && red.snap === blue.snap;

  useEffect(() => {
    if (lit) discover("lit");
    if (same) discover("same");
    if (complete && fused) discover("fused");
    if (lit && showFlow) discover("direction");
  }, [lit, same, complete, fused, showFlow, discover]);

  const msg = lit
    ? "The bulb glows! Current has a complete path: from one terminal of the cell, through the filament, back to the other."
    : complete && fused
      ? "The path looks complete, but this bulb is fused — its filament is broken, so no current can pass."
      : same
        ? "Both wires touch the same terminal of the bulb. The current never goes through the filament."
        : "Drag the two wire ends (big dots) onto the bulb's terminals: the metal base and the tip.";

  return (
    <Stage caption={msg}>
      <svg viewBox="0 0 520 380" className="block h-auto w-full select-none">
        <Defs />
        <rect width="520" height="380" fill="#13112b" />
        <Bulb x={BULB.x} y={BULB.y} on={lit} fused={fused} />
        {/* drop targets */}
        {(["side", "tip"] as const).map((k) => (
          <g key={k}>
            <circle cx={TARGETS[k].x} cy={TARGETS[k].y} r="13" fill="none" stroke="#ffd257" strokeDasharray="3 3" opacity=".7" />
            <text x={TARGETS[k].x + (k === "side" ? -18 : 18)} y={TARGETS[k].y + 4} fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor={k === "side" ? "end" : "start"}>
              {k === "side" ? "metal base" : "tip"}
            </text>
          </g>
        ))}
        <Cell x={CELL.x} y={CELL.y} w={CELL.w} />
        {/* wires: red from +, blue from − */}
        <path d={wirePath(PLUS, red, 60)} stroke="#e5484d" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={wirePath(MINUS, blue, -60)} stroke="#3d8bfd" strokeWidth="6" fill="none" strokeLinecap="round" />
        {lit && showFlow && (
          <>
            <path d={wirePath(PLUS, red, 60)} stroke="#ffe48a" strokeWidth="3" fill="none" style={FLOW(true)} />
            <path d={wirePath(MINUS, blue, -60)} stroke="#ffe48a" strokeWidth="3" fill="none" style={FLOW(true, true)} />
          </>
        )}
        {[
          [red, dragRed, "#e5484d"],
          [blue, dragBlue, "#3d8bfd"],
        ].map(([e, d, col], i) => {
          const end = e as End;
          return (
            <g key={i} {...(d as ReturnType<typeof useSvgDrag>)}>
              <circle cx={end.x} cy={end.y} r="22" fill="transparent" />
              <circle cx={end.x} cy={end.y} r="11" fill={col as string} stroke="#fff" strokeWidth="3" className={end.snap ? "" : "animate-glow"} />
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={showFlow} onClick={() => setShowFlow((v) => !v)}>
          ➜ Show current
        </Btn>
        <Btn on={fused} onClick={() => setFused((v) => !v)}>
          {fused ? "⚠️ Fused bulb" : "Swap in a fused bulb"}
        </Btn>
        <Btn
          onClick={() => {
            setRed({ x: 360, y: 250, snap: null });
            setBlue({ x: 250, y: 200, snap: null });
          }}
        >
          ↺ Reset wires
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · A safety-pin switch ───────────── */

function SwitchLab({ discover }: SimProps) {
  const [on, setOn] = useState(false);
  const [bridge, setBridge] = useState<"pin" | "eraser">("pin");
  const [askGap, setAskGap] = useState(false);
  const wasOn = useRef(false);
  const lit = on && bridge === "pin";

  useEffect(() => {
    if (lit) {
      discover("on");
      wasOn.current = true;
    }
    if (!on && wasOn.current) discover("off");
    if (on && bridge === "eraser") discover("eraser");
  }, [on, bridge, lit, discover]);

  // switch geometry
  const P1 = { x: 190, y: 300 };
  const P2 = { x: 330, y: 300 };
  const angle = on ? 0 : -32;
  const W1 = "M292 140 C 340 140, 350 161, 400 161";
  const W2 = `M420 188 V300 H${P2.x}`;
  const W3 = `M${P1.x} 300 H40 V140 H55`;

  return (
    <Stage
      caption={
        lit
          ? "Switch ON: the metal safety pin bridges the gap between the drawing pins, so the circuit is complete."
          : on
            ? "The eraser touches both pins, but rubber does not let current pass. No glow!"
            : askGap
              ? "Only air is in the gap — and since the bulb stays dark, air must be an insulator."
              : "Switch OFF: there is a gap, so the circuit is broken. Tap the switch."
      }
    >
      <svg viewBox="0 0 520 380" className="block h-auto w-full select-none">
        <Defs />
        <rect width="520" height="380" fill="#13112b" />
        {/* wires: + → bulb base, bulb tip → right pin, left pin → − */}
        {[W1, W2, W3].map((d) => (
          <path key={d} d={d} stroke="#e5484d" strokeWidth="6" fill="none" strokeLinejoin="round" />
        ))}
        {lit && [W1, W2, W3].map((d) => <path key={"f" + d} d={d} stroke="#ffe48a" strokeWidth="3" fill="none" style={FLOW(true)} />)}
        <g transform="translate(0 -24)">
          <Cell x={CELL.x} y={136} w={220} />
        </g>
        <Bulb x={BULB.x} y={70} on={lit} scale={0.9} />
        {/* thermocol board */}
        <rect x="150" y="270" width="220" height="70" rx="10" fill="#f4f1ea" />
        <text x="260" y="332" fontSize="11" fontWeight="800" fill="#8d8a80" textAnchor="middle" letterSpacing="1.5">THERMOCOL SHEET</text>
        {/* drawing pins */}
        {[P1, P2].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="12" fill="#c9cfdc" stroke="#7d8497" strokeWidth="2" />
            <circle cx={p.x} cy={p.y} r="4" fill="#7d8497" />
          </g>
        ))}
        {/* the bridge: safety pin or eraser, rotating about P1 */}
        <g
          transform={`rotate(${angle} ${P1.x} ${P1.y})`}
          style={{ transition: "transform .35s cubic-bezier(.2,.8,.2,1)", cursor: "pointer" }}
          onClick={() => setOn((v) => !v)}
          role="button"
          aria-label={on ? "Turn switch off" : "Turn switch on"}
        >
          <rect x={P1.x - 10} y={P1.y - 26} width={P2.x - P1.x + 20} height="52" fill="transparent" />
          {bridge === "pin" ? (
            <path d={`M${P1.x} ${P1.y} H${P2.x + 4} a7 7 0 0 0 0 -12 H${P1.x + 26}`} stroke="#d9dde8" strokeWidth="4" fill="none" strokeLinecap="round" />
          ) : (
            <rect x={P1.x + 4} y={P1.y - 12} width={P2.x - P1.x + 6} height="20" rx="5" fill="#f28fae" stroke="#c9668a" strokeWidth="2" />
          )}
        </g>
        {!on && (
          <g onClick={() => { setAskGap(true); if (wasOn.current) discover("air"); }} style={{ cursor: "pointer" }} role="button" aria-label="What is in the gap?">
            <circle cx={(P1.x + P2.x) / 2 + 40} cy={P1.y} r="15" fill="#ffd257" fillOpacity=".25" className="animate-glow" />
            <text x={(P1.x + P2.x) / 2 + 40} y={P1.y + 5} fontSize="15" fontWeight="900" fill="#ffd257" textAnchor="middle">?</text>
          </g>
        )}
        <text x="260" y="258" fontSize="12" fontWeight="800" fill="#ffd257" textAnchor="middle">
          {on ? "ON (closed)" : "OFF (open)"}
        </text>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={on} onClick={() => setOn((v) => !v)}>
          {on ? "Switch OFF" : "Switch ON"}
        </Btn>
        <Btn on={bridge === "eraser"} onClick={() => setBridge((b) => (b === "pin" ? "eraser" : "pin"))}>
          {bridge === "pin" ? "Try an eraser instead" : "Back to the safety pin"}
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 4 · Conduction tester ───────────── */

const SAMPLES = [
  { id: "key", name: "Iron key", icon: "🔑", material: "Metal", conducts: true },
  { id: "coin", name: "Coin", icon: "🔘", material: "Metal", conducts: true },
  { id: "foil", name: "Aluminium foil", icon: "🥈", material: "Metal", conducts: true },
  { id: "needle", name: "Sewing needle", icon: "🧵", material: "Metal", conducts: true },
  { id: "nail", name: "Iron nail", icon: "🔩", material: "Metal", conducts: true },
  { id: "lead", name: "Pencil lead", icon: "✏️", material: "Graphite", conducts: true },
  { id: "eraser", name: "Eraser", icon: "🧽", material: "Rubber", conducts: false },
  { id: "scale", name: "Plastic scale", icon: "📏", material: "Plastic", conducts: false },
  { id: "match", name: "Matchstick", icon: "🥢", material: "Wood", conducts: false },
  { id: "bangle", name: "Glass bangle", icon: "⭕", material: "Glass", conducts: false },
  { id: "cork", name: "Cork", icon: "🍾", material: "Cork", conducts: false },
  { id: "paper", name: "Paper", icon: "📄", material: "Paper", conducts: false },
];

function ConductionTester({ discover }: SimProps) {
  const [inGap, setInGap] = useState<string | null>(null);
  const [tested, setTested] = useState<string[]>([]);
  const s = SAMPLES.find((x) => x.id === inGap);
  const lit = !!s?.conducts;
  const metals = SAMPLES.filter((x) => x.material === "Metal").map((x) => x.id);

  function test(id: string) {
    setInGap(id);
    const t = [...new Set([...tested, id])];
    setTested(t);
    const smp = SAMPLES.find((x) => x.id === id)!;
    if (smp.conducts && smp.material === "Metal") discover("conductor");
    if (!smp.conducts) discover("insulator");
    if (id === "lead") discover("lead");
    if (metals.every((m) => t.includes(m))) discover("metals");
  }

  const results = useMemo(() => SAMPLES.filter((x) => tested.includes(x.id)), [tested]);

  return (
    <Stage caption={s ? `${s.name} (${s.material}): ${s.conducts ? "the bulb glows — it is a conductor." : "no glow — it is an insulator."}` : "Tap an object to place it between the two tester wires."}>
      <svg viewBox="0 0 520 250" className="block h-auto w-full select-none">
        <Defs />
        <rect width="520" height="250" fill="#13112b" />
        <g transform="translate(0 -10)">
          <Cell x={40} y={160} w={180} />
        </g>
        <Bulb x={330} y={14} on={lit} scale={0.8} />
        <path d="M232 178 C 290 178, 280 95, 312 95" stroke="#e5484d" strokeWidth="6" fill="none" />
        <path d="M35 178 H20 V230 H250" stroke="#3d8bfd" strokeWidth="6" fill="none" strokeLinejoin="round" />
        <path d="M330 116 C 330 170, 380 200, 350 230" stroke="#3d8bfd" strokeWidth="6" fill="none" />
        {/* free ends */}
        <circle cx="250" cy="230" r="6" fill="#d9dde8" />
        <circle cx="350" cy="230" r="6" fill="#d9dde8" />
        {s ? (
          <g key={s.id} className="animate-pop" style={{ transformOrigin: "300px 226px" }}>
            <rect x="244" y="214" width="112" height="28" rx="10" fill={s.conducts ? "#e9edf5" : "#f0d9c4"} opacity=".95" />
            <text x="300" y="234" fontSize="18" textAnchor="middle">
              {s.icon}
            </text>
          </g>
        ) : (
          <text x="300" y="234" fontSize="12" fontWeight="800" fill="#9da3c7" textAnchor="middle">
            gap
          </text>
        )}
      </svg>
      <div className="border-t border-white/10 px-3 py-3">
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {SAMPLES.map((x) => {
            const done = tested.includes(x.id);
            return (
              <button
                key={x.id}
                onClick={() => test(x.id)}
                className={`press flex flex-col items-center rounded-2xl px-1 py-2 text-[11px] font-extrabold leading-tight transition ${
                  inGap === x.id ? "bg-white text-ink" : "bg-white/5 text-white/85 ring-1 ring-white/10 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{x.icon}</span>
                <span className="mt-0.5 text-center">{x.name}</span>
                {done && <span className={`mt-0.5 text-[10px] ${x.conducts ? "text-[#ffd257]" : "text-white/40"}`}>{x.conducts ? "glows" : "no glow"}</span>}
              </button>
            );
          })}
        </div>
        {results.length > 0 && (
          <table className="mt-3 w-full text-left text-xs">
            <thead className="text-white/50">
              <tr>
                <th className="py-1 font-extrabold">Object</th>
                <th className="py-1 font-extrabold">Material</th>
                <th className="py-1 font-extrabold">Bulb glows?</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="py-1 font-bold">{r.name}</td>
                  <td className="py-1 text-white/70">{r.material}</td>
                  <td className={`py-1 font-extrabold ${r.conducts ? "text-[#ffd257]" : "text-white/50"}`}>{r.conducts ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Stage>
  );
}

/* ───────────── Chapter data ───────────── */

const chapter: Chapter = {
  id: "electricity",
  n: 12,
  title: "Electricity and Circuits",
  pages: "116–124",
  icon: "💡",
  theme: { grad: "linear-gradient(135deg,#14123a 0%,#2d2a8f 55%,#d98a06 130%)", accent: "#d97706", soft: "#fff1d2", ink: "#7a4300" },
  opening: "When the power goes off at night, we reach for a torch. Its bulb lights up when we press the switch — but where does the torch get its electricity from?",
  stops: [
    {
      id: "parts",
      icon: "🔋",
      title: "Inside a cell and a bulb",
      pages: "116–117",
      wonder: {
        q: "Switch on a torch and look closely at the bulb. Which part actually glows?",
        options: [
          { id: "glass", label: "The whole glass case" },
          { id: "filament", label: "A thin wire in the middle" },
          { id: "base", label: "The metal base" },
        ],
        answer: "filament",
        reveal: "Only the filament — a very thin wire fixed in the middle of the bulb — gives off light. The glass case just protects it.",
      },
      explore: {
        activity: "Activity 1",
        title: "Take apart a torch",
        how: "Explore a zoomed-in torch bulb and an electric cell. Every part has a job!",
        Sim: BulbAnatomy,
      },
      discoveries: [
        { id: "filament", text: "The filament is the thin wire that glows" },
        { id: "bulbTerminals", text: "A bulb has two terminals: the metal base and the tip" },
        { id: "cellTerminals", text: "A cell has a + terminal (metal cap) and a − terminal (metal disc)" },
        { id: "chemicals", text: "A cell makes electricity from chemicals stored inside it" },
      ],
      understand: [
        { title: "The cell is the source", body: "An electric cell provides electricity to devices like torches, clocks and watches. It makes it from the chemicals inside it, and stops when they are used up." },
        { title: "Two terminals on a cell", body: "Every cell has a positive terminal (the metal cap, +) and a negative terminal (the metal disc, −)." },
        { title: "Inside a bulb", body: "The filament is held up by two thicker wires. One goes to the metal case of the base, the other to the metal tip at its centre." },
        { title: "Two terminals on a bulb", body: "The base and the tip are the bulb's two terminals. They are fixed so that they never touch each other." },
      ],
      check: [
        { id: "e1", kind: "mcq", q: "Which part of an electric cell is its positive terminal?", options: ["The metal disc", "The metal cap", "The paper cover"], answer: 1, why: "The metal cap is marked + ; the flat metal disc is the − terminal." },
        { id: "e2", kind: "tf", q: "An electric cell has only one terminal.", answer: false, why: "All electric cells have two terminals — a positive and a negative one." },
        { id: "e3", kind: "mcq", q: "Why does an old cell stop working?", options: ["Its chemicals are used up", "Its terminals fall off", "It runs out of air"], answer: 0, why: "A cell makes electricity from its chemicals. When they are used up, it must be replaced." },
      ],
      connect: [
        { icon: "⏰", title: "Cells everywhere", body: "Alarm clocks, wristwatches, radios, cameras and remote controls all run on electric cells." },
        { icon: "🔦", title: "Your torch", body: "Open one (with an adult) and find the cells, the bulb and the switch you just learnt about." },
        { icon: "⚠️", title: "Stay safe", body: "Never experiment with the wires and sockets at home — that electricity can be deadly. Use only cells for your activities." },
      ],
    },
    {
      id: "circuit",
      icon: "🔁",
      title: "Make a circuit",
      pages: "117–119",
      wonder: {
        q: "You connect a cell to a bulb with two wires, but both wires touch the same terminal of the bulb. Will it glow?",
        options: [
          { id: "yes", label: "Yes — it's connected to the cell" },
          { id: "no", label: "No — something is missing" },
          { id: "dim", label: "Yes, but only dimly" },
        ],
        answer: "no",
        reveal: "No glow! Current must go from one terminal of the cell, through the filament, and back to the other terminal. With both wires on one terminal, it never passes through the filament.",
      },
      explore: {
        activity: "Activities 2 & 3",
        title: "Wire it up",
        how: "Drag the red and blue wire ends onto the bulb. Find the arrangement that makes it glow — and some that don't.",
        Sim: CircuitBuilder,
      },
      discoveries: [
        { id: "lit", text: "The bulb glows when the path through it is complete" },
        { id: "same", text: "Both wires on one terminal: no glow" },
        { id: "fused", text: "A fused bulb has a broken filament, so it can't glow" },
        { id: "direction", text: "Current is taken to flow from + to − around the circuit" },
      ],
      understand: [
        { title: "An electric circuit", body: "A circuit gives a complete path for electricity between the two terminals of the cell — through the bulb." },
        { title: "Only a closed path works", body: "The bulb glows only when current flows through its filament. Any break in the path, and it stays dark." },
        { title: "Which way?", body: "In a circuit, the direction of current is taken to be from the positive terminal to the negative terminal of the cell." },
        { title: "Fused bulbs", body: "A bulb may fuse when its filament breaks. That break is a break in the path, so no current passes." },
      ],
      check: [
        { id: "e4", kind: "tf", q: "In an electric circuit, current is taken to flow from the positive terminal to the negative terminal of the cell.", answer: true, why: "That is the direction we use for current in a circuit." },
        { id: "e5", kind: "mcq", q: "A bulb is connected correctly to a working cell but does not glow. What is the most likely reason?", options: ["The wires are too colourful", "The filament is broken (the bulb is fused)", "The bulb is too far from the cell"], answer: 1, why: "A broken filament breaks the path of the current." },
      ],
      connect: [
        { icon: "🔦", title: "Home-made torch", body: "Wrap a wire round a bulb's base, fix the other end to the − terminal, and touch the bulb's tip to the + terminal. Light!" },
        { icon: "🎄", title: "Decoration lights", body: "In some old strings of tiny bulbs, one fused bulb broke the path and the whole string went dark." },
        { icon: "🏠", title: "Home wiring", body: "The lights at home also need a complete path. Electricians follow it carefully — never try it yourself." },
      ],
    },
    {
      id: "switch",
      icon: "🎚️",
      title: "Switch it on, switch it off",
      pages: "120–121",
      wonder: {
        q: "When a switch is OFF, there is a gap between two metal parts. What is in that gap?",
        options: [
          { id: "nothing", label: "Absolutely nothing" },
          { id: "air", label: "Air" },
          { id: "electricity", label: "Stored-up electricity" },
        ],
        answer: "air",
        reveal: "The gap is filled with air. The bulb stays dark, so air does not let current pass — air is an insulator.",
      },
      explore: {
        activity: "Activity 4",
        title: "A safety-pin switch",
        how: "This switch is made of two drawing pins and a safety pin on a thermocol sheet. Tap the pin to turn it on and off.",
        Sim: SwitchLab,
      },
      discoveries: [
        { id: "on", text: "ON: the safety pin closes the gap and completes the circuit" },
        { id: "off", text: "OFF: a gap breaks the circuit" },
        { id: "air", text: "Air in the gap is an insulator" },
        { id: "eraser", text: "An eraser can't work as a switch — rubber blocks current" },
      ],
      understand: [
        { title: "What a switch does", body: "A switch is a simple device that either completes the circuit or breaks it." },
        { title: "Switch ON", body: "The safety pin is metal, so when it touches both drawing pins, current can cross. The circuit is complete." },
        { title: "Switch OFF", body: "Move the pin away and only air is left in the gap. The circuit is broken and the bulb goes off." },
        { title: "Same idea at home", body: "The switches for lights and fans at home look different, but they work on exactly the same principle." },
      ],
      check: [
        { id: "e6", kind: "mcq", q: "A device that is used to break an electric circuit is called a…", options: ["Filament", "Switch", "Terminal"], answer: 1, why: "A switch breaks or completes the circuit." },
        { id: "e7", kind: "tf", q: "If we use an eraser instead of the safety pin in the switch, the bulb will glow when the switch is closed.", answer: false, why: "Rubber is an insulator, so current cannot cross the gap." },
      ],
      connect: [
        { icon: "💡", title: "Light switches", body: "Every press of a light switch at home closes or opens a gap inside it." },
        { icon: "📺", title: "Built-in switches", body: "Torches, TVs, mixers, fans and hair dryers all have switches built into them." },
        { icon: "🎮", title: "Buttons are switches", body: "Each button on a remote or a game controller completes a tiny circuit when you press it." },
      ],
    },
    {
      id: "conductors",
      icon: "🧪",
      title: "Conductors and insulators",
      pages: "121–122",
      wonder: {
        q: "Which of these will let electric current pass through it?",
        options: [
          { id: "key", label: "An iron key" },
          { id: "eraser", label: "A rubber eraser" },
          { id: "thread", label: "A cotton thread" },
        ],
        answer: "key",
        reveal: "The iron key! Metals let current pass through them — they are conductors. Rubber and cotton thread do not.",
      },
      explore: {
        activity: "Activity 5",
        title: "Conduction tester",
        how: "Remove the switch and you are left with two free wire ends. Put different objects between them: if the bulb glows, current is passing through.",
        Sim: ConductionTester,
      },
      discoveries: [
        { id: "conductor", text: "Metal objects make the bulb glow — they are conductors" },
        { id: "insulator", text: "Rubber, plastic, wood and glass don't — they are insulators" },
        { id: "lead", text: "Surprise: pencil lead conducts too, though it isn't a metal" },
        { id: "metals", text: "Every metal you tested was a conductor" },
      ],
      understand: [
        { title: "Conductors", body: "Materials that allow electric current to pass through them are conductors — like copper, aluminium and other metals. That's why wires are made of metal." },
        { title: "Insulators", body: "Materials that do not allow current to pass are insulators — like rubber, plastic, wood, glass, thermocol and air." },
        { title: "We need both", body: "Switches, plugs and sockets are made of conductors. Rubber and plastic cover wires, plug tops and switches, so people touching them stay safe." },
        { title: "Careful!", body: "Your body is a conductor of electricity. Always be careful when you handle an electrical appliance." },
      ],
      check: [
        {
          id: "e8",
          kind: "sort",
          q: "Sort these into conductors and insulators.",
          bins: ["Conductor", "Insulator"],
          items: [
            { label: "Iron nail", bin: 0 },
            { label: "Copper wire", bin: 0 },
            { label: "Aluminium foil", bin: 0 },
            { label: "Plastic scale", bin: 1 },
            { label: "Rubber eraser", bin: 1 },
            { label: "Glass bangle", bin: 1 },
            { label: "Wooden stick", bin: 1 },
          ],
          why: "Metals are conductors; rubber, plastic, glass and wood are insulators.",
        },
        { id: "e9", kind: "tf", q: "Instead of metal wires, a jute string can be used to make a circuit.", answer: false, why: "Jute is not a conductor, so no current would flow." },
        { id: "e10", kind: "mcq", q: "Why do the screwdrivers and pliers used by electricians have plastic or rubber handles?", options: ["To look colourful", "Plastic and rubber are insulators, so they protect the electrician", "To make the tools lighter"], answer: 1, why: "Insulating handles stop current from passing into the electrician's hand." },
      ],
      connect: [
        { icon: "🔌", title: "Covered wires", body: "Wires are copper or aluminium inside, wrapped in plastic outside: a conductor inside an insulator." },
        { icon: "🧤", title: "Rubber gloves", body: "Electricians wear rubber gloves while repairing switches because rubber is an insulator." },
        { icon: "🎯", title: "How steady is your hand?", body: "A key loop sliding along a bare wire: touch it and the bulb lights up. A fun game built on conductors!" },
      ],
    },
  ],
  learnt: [
    "An electric cell is a source of electricity. It has two terminals: positive (+) and negative (−).",
    "An electric bulb has a filament connected to its two terminals. It glows when current passes through it.",
    "In a closed electric circuit, current passes from one terminal of the cell to the other.",
    "A switch is a simple device used to break an electric circuit or to complete it.",
    "Materials that allow current to pass through them are conductors; those that don't are insulators.",
  ],
  keywords: ["Electric cell", "Terminal", "Filament", "Electric circuit", "Switch", "Conductor", "Insulator"],
};

export default chapter;
