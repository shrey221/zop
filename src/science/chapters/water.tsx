// Chapter 14 · Water (NCERT Science Class VI, 2018-19, pp. 136–146).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useRef, useState } from "react";
import type { Chapter, SimProps } from "../types";
import { Btn, Readout, Stage } from "../ui";

const rise = (delay: number, dur = 2.4): React.CSSProperties => ({ animation: `zrise ${dur}s ease-out ${delay}s infinite`, transformBox: "fill-box" });
const fall = (delay: number, dur = 0.9): React.CSSProperties => ({ animation: `zfall ${dur}s linear ${delay}s infinite` });

/* ───────────── Stop 1 · How much water do we use? ───────────── */

const UNITS = { glass: { name: "glasses", litres: 0.25 }, mug: { name: "mugs", litres: 1 }, bucket: { name: "buckets", litres: 15 } } as const;
const USES: { id: string; icon: string; label: string; unit: keyof typeof UNITS; start: number }[] = [
  { id: "drink", icon: "🥛", label: "Drinking", unit: "glass", start: 0 },
  { id: "brush", icon: "🦷", label: "Brushing", unit: "mug", start: 0 },
  { id: "bath", icon: "🛁", label: "Bathing", unit: "bucket", start: 0 },
  { id: "utensils", icon: "🍽", label: "Washing utensils", unit: "bucket", start: 0 },
  { id: "clothes", icon: "👕", label: "Washing clothes", unit: "bucket", start: 0 },
  { id: "toilet", icon: "🚽", label: "Toilets", unit: "bucket", start: 0 },
  { id: "floor", icon: "🧹", label: "Cleaning the floor", unit: "bucket", start: 0 },
];

function WaterUse({ discover }: SimProps) {
  const [n, setN] = useState<Record<string, number>>(() => Object.fromEntries(USES.map((u) => [u.id, u.start])));
  const [family, setFamily] = useState(4);
  const [period, setPeriod] = useState<"day" | "year">("day");
  const [hidden, setHidden] = useState(false);
  const day = USES.reduce((s, u) => s + n[u.id] * UNITS[u.unit].litres, 0);
  const filled = USES.filter((u) => n[u.id] > 0).length;
  const shown = period === "day" ? day : day * 365;

  useEffect(() => {
    if (filled >= 3) discover("total");
    if (filled >= 3 && period === "year") discover("year");
    if (filled >= 3 && family !== 4) discover("person");
  }, [filled, period, family, discover]);

  const buckets = Math.min(30, Math.round(day / 15));

  return (
    <Stage
      caption={
        hidden
          ? "Hidden water: about two glasses of water go into making each page of a book. And wheat plants lose nearly 500 litres through their leaves for every kilogram of wheat we get!"
          : filled < 3
            ? "Tap + to count how many glasses, mugs or buckets your family uses for each activity in a day."
            : `That's about ${Math.round(day)} litres a day — around ${buckets} bucket${buckets === 1 ? "" : "s"}. Imagine carrying it all from a far-away well!`
      }
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_170px]">
        <ul className="grid gap-1.5">
          {USES.map((u) => (
            <li key={u.id} className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
              <span className="text-xl" aria-hidden="true">
                {u.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold">{u.label}</span>
                <span className="block text-[11px] font-bold text-white/50">
                  {UNITS[u.unit].name} · {UNITS[u.unit].litres} L each
                </span>
              </span>
              <button aria-label={`Fewer ${u.label}`} onClick={() => setN((s) => ({ ...s, [u.id]: Math.max(0, s[u.id] - 1) }))} className="press grid h-8 w-8 place-items-center rounded-full bg-white/10 text-lg font-extrabold">
                −
              </button>
              <span className="w-6 text-center font-display text-lg font-extrabold">{n[u.id]}</span>
              <button aria-label={`More ${u.label}`} onClick={() => setN((s) => ({ ...s, [u.id]: s[u.id] + 1 }))} className="press grid h-8 w-8 place-items-center rounded-full bg-[#38c6d9] text-lg font-extrabold text-[#062a4a]">
                +
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-3">
          {/* tank */}
          <svg viewBox="0 0 120 160" className="h-40 w-auto">
            <rect x="10" y="10" width="100" height="140" rx="12" fill="#1d2b4a" stroke="#38c6d9" strokeOpacity=".4" strokeWidth="3" />
            <clipPath id="tankClip">
              <rect x="12" y="12" width="96" height="136" rx="10" />
            </clipPath>
            <rect x="12" y={148 - Math.min(136, (day / 450) * 136)} width="96" height="136" fill="#38c6d9" clipPath="url(#tankClip)" style={{ transition: "y .5s" }} />
            <text x="60" y="88" fontSize="20" fontWeight="900" fill="#fff" textAnchor="middle">
              {Math.round(day)} L
            </text>
            <text x="60" y="106" fontSize="10" fontWeight="800" fill="#ffffffaa" textAnchor="middle">
              per day
            </text>
          </svg>
          <div className="grid w-full grid-cols-1 gap-2">
            <Readout label={period === "day" ? "Family · per day" : "Family · per year"} value={`${Math.round(shown).toLocaleString("en-IN")} L`} color="#7fe3f0" />
            <Readout label={`Each of ${family} people`} value={`${Math.round(shown / family).toLocaleString("en-IN")} L`} color="#ffd257" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={period === "year"} onClick={() => setPeriod((p) => (p === "day" ? "year" : "day"))}>
          📅 {period === "day" ? "Show for a whole year" : "Back to one day"}
        </Btn>
        <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-sm font-extrabold ring-1 ring-white/15">
          👪
          <button aria-label="Fewer family members" onClick={() => setFamily((f) => Math.max(1, f - 1))} className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
            −
          </button>
          {family}
          <button aria-label="More family members" onClick={() => setFamily((f) => Math.min(12, f + 1))} className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
            +
          </button>
        </span>
        <Btn
          on={hidden}
          onClick={() => {
            setHidden(true);
            discover("hidden");
          }}
        >
          🔎 Hidden water
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 2 · The disappearing trick ───────────── */

function Plate({ x, level, label, sunny, salty }: { x: number; level: number; label: string; sunny: boolean; salty: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy="200" rx="78" ry="20" fill="#e9edf5" />
      <ellipse cx={x} cy="196" rx={66 * Math.sqrt(level) + 0.01} ry={14 * Math.sqrt(level) + 0.01} fill="#4fb6e0" opacity=".9" style={{ transition: "all .4s" }} />
      {salty && level < 0.35 &&
        Array.from({ length: Math.round((0.35 - level) * 40) }, (_, i) => (
          <rect key={i} x={x - 40 + ((i * 29) % 80)} y={192 + ((i * 13) % 10)} width="4" height="4" fill="#fff" transform={`rotate(${i * 37} ${x - 38 + ((i * 29) % 80)} ${194 + ((i * 13) % 10)})`} />
        ))}
      {level > 0.02 && [0, 1, 2].map((i) => <circle key={i} cx={x - 30 + i * 30} cy="186" r="3" fill="#cfefff" style={rise(i * (sunny ? 0.5 : 1.3), sunny ? 1.8 : 3.6)} />)}
      <text x={x} y="244" fontSize="13" fontWeight="900" fill="#fff" textAnchor="middle">
        {label}
      </text>
      <text x={x} y="262" fontSize="11" fontWeight="800" fill="#ffffff99" textAnchor="middle">
        {level <= 0 ? (salty ? "dry — salt left!" : "dry!") : `${Math.round(level * 100)}% water left`}
      </text>
    </g>
  );
}

function Evaporation({ discover }: SimProps) {
  const [t, setT] = useState(0); // minutes
  const [salty, setSalty] = useState(false);
  const [ice, setIce] = useState(false);
  const [drops, setDrops] = useState(0);
  const sun = Math.max(0, 1 - t / 60);
  const shade = Math.max(0, 1 - t / 150);

  useEffect(() => {
    if (t >= 60) discover("sun");
    if (t >= 30) discover("shade");
    if (t >= 60 && salty) discover("salt");
  }, [t, salty, discover]);

  useEffect(() => {
    if (!ice) return setDrops(0);
    const id = window.setInterval(() => setDrops((d) => Math.min(14, d + 1)), 260);
    return () => window.clearInterval(id);
  }, [ice]);
  useEffect(() => {
    if (drops >= 10) discover("dew");
  }, [drops, discover]);

  return (
    <Stage
      caption={
        drops >= 10
          ? "Drops on the OUTSIDE of the cold glass! The icy glass cools the air around it, and water vapour in that air condenses into water."
          : t >= 60
            ? `The plate in sunlight dried up first. The one in shade is drying too — warm air gives it heat, just more slowly.${salty ? " The salt was left behind: only water evaporates." : ""}`
            : "Move the clock forward and watch both plates. Check every 15 minutes!"
      }
    >
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none">
        <rect width="520" height="280" fill="#13112b" />
        <rect width="260" height="280" fill="#2a2a5a" opacity=".5" />
        <circle cx="70" cy="60" r="30" fill="#ffd257" className="animate-glow" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={70 + Math.cos((i * Math.PI) / 4) * 40} y1={60 + Math.sin((i * Math.PI) / 4) * 40} x2={70 + Math.cos((i * Math.PI) / 4) * 52} y2={60 + Math.sin((i * Math.PI) / 4) * 52} stroke="#ffd257" strokeWidth="4" strokeLinecap="round" />
        ))}
        <rect x="290" y="40" width="200" height="40" rx="8" fill="#1d1a44" />
        <text x="390" y="66" fontSize="12" fontWeight="800" fill="#9da3c7" textAnchor="middle">
          roof · shade
        </text>
        <Plate x={130} level={sun} label="☀ In sunlight" sunny salty={salty} />
        <Plate x={390} level={shade} label="In shade" sunny={false} salty={salty} />
        <text x="260" y="24" fontSize="14" fontWeight="900" fill="#ffd257" textAnchor="middle">
          ⏱ {t} min
        </text>
      </svg>
      <div className="grid gap-3 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Time</span>
          <input type="range" min={0} max={90} step={15} value={t} onChange={(e) => setT(+e.target.value)} className="w-full accent-[#38c6d9]" aria-label="Minutes passed" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn on={salty} onClick={() => (setSalty((v) => !v), setT(0))}>
            🧂 {salty ? "Salty water" : "Use salty water"}
          </Btn>
          <Btn onClick={() => setT(0)}>↺ Refill plates</Btn>
        </div>
      </div>
      {/* iced glass */}
      <div className="flex items-center gap-4 border-t border-white/10 px-4 py-3">
        <svg viewBox="0 0 100 120" className="h-28 w-auto shrink-0">
          <path d="M20 10 L80 10 L72 112 L28 112 Z" fill="#cfe8ff" fillOpacity=".18" stroke="#cfe8ff" strokeWidth="2" />
          <path d="M23 50 L77 50 L72 110 L28 110 Z" fill="#4fb6e0" opacity=".7" />
          {ice && [0, 1, 2].map((i) => <rect key={i} x={30 + i * 14} y={52 + (i % 2) * 8} width="13" height="13" rx="3" fill="#eaf8ff" className="animate-pop" />)}
          {Array.from({ length: drops }, (_, i) => (
            <ellipse key={i} cx={i % 2 ? 14 + (i % 3) * 2 : 84 - (i % 3) * 2} cy={30 + ((i * 17) % 76)} rx="3" ry="4" fill="#dff4ff" className="animate-pop" />
          ))}
        </svg>
        <div>
          <p className="text-sm font-extrabold">Activity 3 · A glass of iced water</p>
          <p className="text-xs font-bold text-white/60">Wipe the glass dry, add ice and wait.</p>
          <div className="mt-2">
            <Btn on={ice} onClick={() => setIce((v) => !v)}>
              {ice ? "❄️ Ice added" : "❄️ Add ice"}
            </Btn>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · The water cycle ───────────── */

function WaterCycle({ discover }: SimProps) {
  const [heat, setHeat] = useState(false);
  const [trees, setTrees] = useState(false);
  const [cloud, setCloud] = useState(0);
  const [raining, setRaining] = useState(false);
  const [flowing, setFlowing] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!heat || raining) return;
    discover("evap");
    const id = window.setInterval(() => setCloud((c) => Math.min(1, c + 0.08)), 350);
    return () => window.clearInterval(id);
  }, [heat, raining, discover]);
  useEffect(() => {
    if (cloud >= 0.45) discover("cloud");
  }, [cloud, discover]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function rain() {
    setRaining(true);
    discover("rain");
    timers.current.push(
      window.setTimeout(() => setFlowing(true), 1400),
      window.setTimeout(() => discover("back"), 2600),
      window.setTimeout(() => {
        setRaining(false);
        setCloud(0.15);
      }, 5200),
    );
  }

  const cs = 0.55 + cloud * 0.6;
  const shade = Math.round(255 - cloud * 120);

  return (
    <Stage
      caption={
        flowing
          ? "Rain and melting snow flow down as streams and rivers, and back to the ocean. Some water seeps underground. The cycle goes on and on!"
          : raining
            ? "Droplets joined into drops so heavy they fall: rain over the land, snow on the cold mountain top."
            : cloud >= 1
              ? "The cloud is heavy with droplets. Let it rain!"
              : cloud >= 0.45
                ? "High up, the air is cool. Water vapour condenses into tiny droplets — they float as a cloud."
                : heat
                  ? "The Sun heats the ocean: water evaporates as invisible vapour (the salt stays behind). Tap the trees too!"
                  : "Switch on the Sun to start the water cycle."
      }
    >
      <svg viewBox="0 0 520 340" className="block h-auto w-full select-none">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2f6b" />
            <stop offset="1" stopColor="#3a6fb0" />
          </linearGradient>
        </defs>
        <rect width="520" height="340" fill="url(#sky)" />
        {/* sun */}
        <g onClick={() => setHeat((h) => !h)} style={{ cursor: "pointer" }} role="button" aria-label="Switch the Sun on or off">
          <circle cx="460" cy="48" r="26" fill={heat ? "#ffd257" : "#8d8a6a"} className={heat ? "animate-glow" : ""} />
          {heat && Array.from({ length: 8 }, (_, i) => <line key={i} x1={460 + Math.cos((i * Math.PI) / 4) * 33} y1={48 + Math.sin((i * Math.PI) / 4) * 33} x2={460 + Math.cos((i * Math.PI) / 4) * 43} y2={48 + Math.sin((i * Math.PI) / 4) * 43} stroke="#ffd257" strokeWidth="4" strokeLinecap="round" />)}
        </g>
        {/* cloud */}
        <g transform={`translate(270 78) scale(${cs})`} style={{ transition: "transform .4s" }} opacity={cloud > 0.04 ? 1 : 0}>
          {[[-50, 8, 30], [-15, -10, 38], [25, -2, 34], [55, 12, 26], [0, 16, 32]].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={`rgb(${shade},${shade + 5},${Math.min(255, shade + 20)})`} />
          ))}
        </g>
        {/* rain & snow */}
        {raining &&
          Array.from({ length: 22 }, (_, i) => {
            const x = 150 + ((i * 37) % 210);
            return x < 205 ? (
              <circle key={i} cx={x - 90} cy={110 + ((i * 11) % 20)} r="3" fill="#fff" style={fall(i * 0.07, 1.4)} />
            ) : (
              <line key={i} x1={x} y1={112 + ((i * 13) % 20)} x2={x - 3} y2={124 + ((i * 13) % 20)} stroke="#bfe6ff" strokeWidth="2.5" strokeLinecap="round" style={fall(i * 0.05)} />
            );
          })}
        {/* mountain with snow cap */}
        <path d="M0 250 L95 95 L200 250 Z" fill="#4c5a74" />
        <path d="M70 136 L95 95 L120 136 Q108 128 95 140 Q82 128 70 136 Z" fill="#f4f8ff" />
        {/* land, soil and ground water */}
        <path d="M0 250 L330 250 L345 262 L345 340 L0 340 Z" fill="#6b4a2b" />
        <path d="M0 246 Q160 238 330 248 L345 262 L0 262 Z" fill="#3f8f50" />
        <rect x="0" y="312" width="345" height="28" fill="#2f78b8" opacity={flowing ? 0.95 : 0.6} style={{ transition: "opacity 1s" }} />
        <text x="12" y="330" fontSize="10" fontWeight="800" fill="#dff4ff">ground water</text>
        {flowing && [60, 140, 220].map((x, i) => <path key={x} d={`M${x} 266 v36`} stroke="#9fd8ff" strokeWidth="3" strokeDasharray="4 6" style={{ animation: `zflow 1s linear ${i * 0.2}s infinite` }} />)}
        {/* river */}
        <path d="M110 150 C140 200, 170 236, 230 250 S 320 254, 350 258" stroke="#4fb6e0" strokeWidth={flowing ? 7 : 3} fill="none" strokeLinecap="round" style={{ transition: "stroke-width 1s" }} />
        {flowing && <path d="M110 150 C140 200, 170 236, 230 250 S 320 254, 350 258" stroke="#dff4ff" strokeWidth="2.5" fill="none" style={{ strokeDasharray: "4 10", animation: "zflow .6s linear infinite" }} />}
        {/* trees */}
        <g onClick={() => { if (heat) { setTrees(true); discover("transp"); } }} style={{ cursor: "pointer" }} role="button" aria-label="Tap the trees">
          {[245, 290].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="222" width="6" height="26" fill="#6b4a2b" />
              <circle cx={x} cy="214" r="17" fill="#2f8a4a" />
            </g>
          ))}
          {heat && trees && [0, 1, 2].map((i) => <circle key={i} cx={252 + i * 18} cy="196" r="3" fill="#dff4ff" style={rise(i * 0.6, 2.6)} />)}
          {heat && !trees && <circle cx="268" cy="214" r="30" fill="#ffd257" fillOpacity=".18" className="animate-glow" />}
        </g>
        {/* ocean */}
        <path d="M345 262 L345 250 Q430 244 520 250 L520 340 L345 340 Z" fill="#1f6fa8" />
        <path d="M360 262 q10 -5 20 0 t20 0 M420 270 q10 -5 20 0 t20 0 M470 258 q10 -5 20 0 t20 0" stroke="#9fd8ff" strokeWidth="2" fill="none" />
        <text x="430" y="300" fontSize="12" fontWeight="900" fill="#cfefff" textAnchor="middle" letterSpacing="2">OCEAN</text>
        {heat && !raining && Array.from({ length: 7 }, (_, i) => <circle key={i} cx={365 + i * 22} cy="244" r="3.2" fill="#dff4ff" style={rise(i * 0.35, 2.8)} />)}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={heat} onClick={() => setHeat((h) => !h)}>
          ☀️ {heat ? "Sun is shining" : "Switch on the Sun"}
        </Btn>
        {cloud >= 1 && !raining && (
          <Btn on onClick={rain}>
            🌧 Let it rain
          </Btn>
        )}
        <Btn
          onClick={() => {
            setHeat(false);
            setTrees(false);
            setCloud(0);
            setRaining(false);
            setFlowing(false);
          }}
        >
          ↺ Start again
        </Btn>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 4 · Rainwater harvesting ───────────── */

type Roof = "drain" | "tank" | "pit";

function Harvest({ discover }: SimProps) {
  const [ground, setGround] = useState<"soil" | "concrete">("concrete");
  const [roof, setRoof] = useState<Roof>("drain");
  const [gw, setGw] = useState(0.4); // ground water level 0..1
  const [tank, setTank] = useState(0);
  const [weather, setWeather] = useState<"none" | "rain" | "dry">("none");
  const [runoff, setRunoff] = useState(false);

  function monsoon() {
    setWeather("rain");
    const lost = ground === "concrete" && roof !== "pit";
    setRunoff(lost);
    if (roof === "tank") setTank((v) => Math.min(1, v + 0.5));
    const gain = (ground === "soil" ? 0.12 : 0) + (roof === "pit" ? 0.25 : 0);
    setGw((v) => Math.min(1, v + gain));
    if (ground === "concrete" && roof === "drain") discover("runoff");
    if (roof === "tank") discover("tank");
    if (roof === "pit") discover("recharge");
    window.setTimeout(() => setWeather("none"), 2600);
  }
  function dryYear() {
    setWeather("dry");
    setRunoff(false);
    setGw((v) => Math.max(0, v - 0.3));
    setTank((v) => Math.max(0, v - 0.6));
  }

  const gwTop = 300 - gw * 70;
  const wellWater = Math.max(gwTop, 236);

  return (
    <Stage
      caption={
        weather === "dry"
          ? gw <= 0.05
            ? "No rain for a long time: ground water has sunk and the well is dry. This is a drought."
            : "A dry year: soil and ponds lose water by evaporation and it isn't replaced. The ground water level drops."
          : weather === "rain"
            ? roof === "pit"
              ? "Roof water goes into a pit and seeps into the soil, refilling the ground water."
              : roof === "tank"
                ? "Roof water is collected in a tank for later use — after filtering."
                : ground === "concrete"
                  ? "On concrete, rain can't soak in. It rushes into drains and is carried far away."
                  : "On open soil, some rain seeps in and slowly refills the ground water."
            : "Choose the ground and where the roof water goes, then bring the monsoon."
      }
    >
      <svg viewBox="0 0 520 320" className="block h-auto w-full select-none">
        <rect width="520" height="320" fill={weather === "dry" ? "#3d2f1f" : "#1b2f6b"} style={{ transition: "fill .6s" }} />
        {weather === "dry" && <circle cx="440" cy="50" r="28" fill="#ffb534" className="animate-glow" />}
        {weather === "rain" && (
          <>
            <path d="M40 40 h440" stroke="#8a97b8" strokeWidth="34" strokeLinecap="round" opacity=".8" />
            {Array.from({ length: 30 }, (_, i) => (
              <line key={i} x1={20 + ((i * 53) % 480)} y1={60 + ((i * 7) % 20)} x2={17 + ((i * 53) % 480)} y2={72 + ((i * 7) % 20)} stroke="#bfe6ff" strokeWidth="2.5" strokeLinecap="round" style={fall(i * 0.04, 0.8)} />
            ))}
          </>
        )}
        {/* house */}
        <rect x="60" y="130" width="140" height="80" fill="#e9dcc4" />
        <path d="M45 132 L130 82 L215 132 Z" fill="#b8452a" />
        <rect x="112" y="165" width="28" height="45" fill="#6b4a2b" />
        {/* pipe from the roof */}
        <path d={roof === "drain" ? "M212 132 V210 H300" : roof === "tank" ? "M212 132 V150 H245" : "M212 132 V232"} stroke="#9aa1b5" strokeWidth="7" fill="none" strokeLinejoin="round" />
        {weather === "rain" && <path d={roof === "drain" ? "M212 132 V210 H300" : roof === "tank" ? "M212 132 V150 H245" : "M212 132 V232"} stroke="#bfe6ff" strokeWidth="3" fill="none" style={{ strokeDasharray: "4 8", animation: "zflow .5s linear infinite" }} />}
        {/* tank */}
        {roof === "tank" && (
          <g>
            <rect x="245" y="140" width="56" height="70" rx="6" fill="#28324f" stroke="#7fe3f0" strokeOpacity=".5" strokeWidth="2" />
            <rect x="248" y={207 - tank * 64} width="50" height={tank * 64} fill="#38c6d9" style={{ transition: "all .8s" }} />
            <text x="273" y="134" fontSize="10" fontWeight="800" fill="#dff4ff" textAnchor="middle">tank</text>
          </g>
        )}
        {/* ground surface */}
        <rect x="0" y="210" width="520" height="12" fill={ground === "concrete" ? "#8d93a8" : "#3f8f50"} />
        <rect x="0" y="222" width="520" height="98" fill="#6b4a2b" />
        {roof === "pit" && <rect x="200" y="214" width="26" height="40" fill="#3a2a1a" stroke="#c9a37a" strokeDasharray="3 3" />}
        {/* drain */}
        <rect x="300" y="204" width="80" height="10" fill="#4a5068" />
        <text x="340" y="200" fontSize="10" fontWeight="800" fill="#c9d0e6" textAnchor="middle">drain</text>
        {runoff && weather === "rain" && <path d="M300 209 H480" stroke="#bfe6ff" strokeWidth="4" style={{ strokeDasharray: "8 8", animation: "zflow .4s linear infinite" }} />}
        {runoff && weather === "rain" && <text x="470" y="198" fontSize="11" fontWeight="900" fill="#ffd257" textAnchor="end">→ away to a far river</text>}
        {/* seepage */}
        {weather === "rain" && (ground === "soil" || roof === "pit") &&
          [90, 213, 150].map((x, i) => <path key={x} d={`M${x} 226 v${gwTop - 232}`} stroke="#9fd8ff" strokeWidth="3" strokeDasharray="4 6" style={{ animation: `zflow 1s linear ${i * 0.2}s infinite` }} />)}
        {/* ground water */}
        <rect x="0" y={gwTop} width="520" height={320 - gwTop} fill="#2f78b8" style={{ transition: "y .8s, height .8s" }} />
        <text x="12" y="312" fontSize="10" fontWeight="800" fill="#dff4ff">ground water</text>
        {/* well */}
        <rect x="420" y="170" width="44" height="40" fill="#7d8497" />
        <rect x="428" y="222" width="28" height="96" fill="#20180f" />
        <rect x="428" y={wellWater} width="28" height={Math.max(0, 318 - wellWater)} fill="#2f78b8" style={{ transition: "all .8s" }} />
        <text x="442" y="164" fontSize="10" fontWeight="800" fill="#c9d0e6" textAnchor="middle">well</text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <Btn on={ground === "concrete"} onClick={() => setGround("concrete")}>
            Concrete
          </Btn>
          <Btn on={ground === "soil"} onClick={() => setGround("soil")}>
            Open soil
          </Btn>
          <span className="mx-1 w-px bg-white/15" />
          <Btn on={roof === "drain"} onClick={() => setRoof("drain")}>
            Roof → drain
          </Btn>
          <Btn on={roof === "tank"} onClick={() => setRoof("tank")}>
            Roof → tank
          </Btn>
          <Btn on={roof === "pit"} onClick={() => setRoof("pit")}>
            Roof → pit
          </Btn>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn on onClick={monsoon}>
            🌧 Monsoon rain
          </Btn>
          <Btn onClick={dryYear}>☀️ A year with no rain</Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Chapter data ───────────── */

const chapter: Chapter = {
  id: "water",
  n: 14,
  title: "Water",
  pages: "136–146",
  icon: "💧",
  theme: { grad: "linear-gradient(135deg,#062a4a 0%,#0e6fb0 55%,#2fb8cc 125%)", accent: "#0e78bf", soft: "#dcf0fb", ink: "#0b4f80" },
  opening: "Suppose your whole family got just one bucket of water a day for a week. Could you cook, wash and bathe? How much water do we really use?",
  stops: [
    {
      id: "use",
      icon: "🚰",
      title: "How much water do we use?",
      pages: "136–137",
      wonder: {
        q: "Apart from drinking, cooking and washing, where else does a lot of our water go?",
        options: [
          { id: "nowhere", label: "Nowhere else, really" },
          { id: "food", label: "Into growing our food and making things" },
          { id: "garden", label: "Only into watering the garden" },
        ],
        answer: "food",
        reveal: "Into our food and almost everything we use! Water grows wheat, rice, pulses and the plants that give us fibres, and industries need water to make almost every product.",
      },
      explore: {
        activity: "Activity 1",
        title: "Your family's water count",
        how: "Count how much water your family uses in a day for each activity, then see it for a whole year.",
        Sim: WaterUse,
      },
      discoveries: [
        { id: "total", text: "Your family uses many litres of water every day" },
        { id: "year", text: "Over a year, it adds up to a huge amount" },
        { id: "person", text: "Divide by family members to see one person's share" },
        { id: "hidden", text: "Food and things like books use 'hidden' water too" },
      ],
      understand: [
        { title: "Daily uses", body: "We use water for drinking, brushing, bathing, washing clothes and utensils, toilets and cleaning floors." },
        { title: "Hidden uses", body: "Water is also needed to grow our food and fibres, and industries use it to produce almost everything we use." },
        { title: "Where it comes from", body: "Our water comes from rivers, lakes, ponds and wells. Tap water is also drawn from these and supplied through a network of pipes." },
      ],
      check: [
        { id: "w1", kind: "mcq", q: "The water in our taps comes from…", options: ["Factories that make water", "Lakes, rivers or wells", "Only from the ocean"], answer: 1, why: "Tap water is drawn from a lake, river or well and supplied through pipes." },
        { id: "w2", kind: "tf", q: "We need water only for drinking and washing.", answer: false, why: "Farms and industries use huge amounts of water too." },
        { id: "w3", kind: "mcq", q: "About how much water does it take to produce one page of a book?", options: ["A drop", "About two glasses", "Ten buckets"], answer: 1, why: "Paheli's fact: about two glasses of water per page." },
      ],
      connect: [
        { icon: "🚶", title: "Fetching water", body: "If you had to carry water from far away, would you use as much? Many people in our country do this every day." },
        { icon: "🗺", title: "Not the same everywhere", body: "People in different regions don't get the same amount of water. Some areas get far too little." },
        { icon: "🌾", title: "Water on your plate", body: "Every chapati and every bowl of rice needed water to grow." },
      ],
    },
    {
      id: "evap",
      icon: "☀️",
      title: "The disappearing trick",
      pages: "138–140",
      wonder: {
        q: "Two plates hold the same amount of water — one in sunlight, one in the shade. What happens over time?",
        options: [
          { id: "sun", label: "Only the sunny plate loses water" },
          { id: "both", label: "Both lose water — the sunny one faster" },
          { id: "none", label: "Neither changes" },
        ],
        answer: "both",
        reveal: "Both lose water! The sunny plate dries first, but warm air gives the shaded plate heat too. Water evaporates from every open surface.",
      },
      explore: {
        activity: "Activities 2 & 3",
        title: "Sun vs shade, and a cold glass",
        how: "Slide the clock forward and compare the two plates. Then add ice to a glass and watch its outside.",
        Sim: Evaporation,
      },
      discoveries: [
        { id: "shade", text: "Water disappears even from the plate in the shade" },
        { id: "sun", text: "In sunlight, water evaporates faster" },
        { id: "salt", text: "Salt is left behind — only water evaporates" },
        { id: "dew", text: "Water vapour condenses on a cold glass" },
      ],
      understand: [
        { title: "Evaporation", body: "On heating, water changes into water vapour, which mixes with the air and can't usually be seen. The salts dissolved in it are left behind." },
        { title: "Heat from Sun and air", body: "Sunlight heats oceans, rivers, ponds and fields. In the daytime, warm air also gives heat, so water evaporates even in the shade — just more slowly." },
        { title: "Slow but constant", body: "Evaporation is slow, which is why we rarely notice a full bucket losing water. It happens faster in sunlight and faster still on a burner." },
        { title: "Condensation", body: "When air meets a cold surface, the water vapour in it condenses into drops of water — like on a glass of iced water." },
      ],
      check: [
        {
          id: "w4",
          kind: "sort",
          q: "Is it evaporation or condensation?",
          bins: ["Evaporation", "Condensation"],
          items: [
            { label: "Blackboard drying after wiping", bin: 0 },
            { label: "Steam from clothes being ironed", bin: 0 },
            { label: "Water on a hot griddle vanishing", bin: 0 },
            { label: "Drops outside a glass of cold water", bin: 1 },
            { label: "Fog on a winter morning", bin: 1 },
            { label: "Breathing on spectacles", bin: 1 },
          ],
          why: "Evaporation turns water into vapour; condensation turns vapour back into water.",
        },
        { id: "w5", kind: "tf", q: "Evaporation of water takes place only in sunlight.", answer: false, why: "It happens in the shade too — warm air provides the heat." },
      ],
      connect: [
        { icon: "👕", title: "Drying clothes", body: "Wet clothes dry on a line as their water evaporates — faster on a sunny, windy day." },
        { icon: "🧂", title: "Salt from the sea", body: "Sea water is left in shallow pits; the water evaporates and the salt stays behind." },
        { icon: "🌿", title: "Dew on grass", body: "On cold mornings, water vapour condenses as dew on leaves and iron gates." },
      ],
    },
    {
      id: "cycle",
      icon: "🌧",
      title: "The water cycle",
      pages: "139–142",
      wonder: {
        q: "Ocean water is salty. So why is rain water not salty?",
        options: [
          { id: "filter", label: "Clouds filter out the salt" },
          { id: "evap", label: "Only water evaporates — the salt stays behind" },
          { id: "rivers", label: "Rain comes from rivers, not the ocean" },
        ],
        answer: "evap",
        reveal: "When sea water evaporates, only the water goes into the air as vapour. The salt is left behind in the ocean.",
      },
      explore: {
        activity: "Sections 14.3 – 14.4",
        title: "Run the water cycle",
        how: "Switch on the Sun, tap the trees, wait for the cloud to grow — then let it rain and watch where the water goes.",
        Sim: WaterCycle,
      },
      discoveries: [
        { id: "evap", text: "The Sun evaporates water from the ocean" },
        { id: "transp", text: "Plants release water vapour too — transpiration" },
        { id: "cloud", text: "High up, vapour condenses into droplets: clouds" },
        { id: "rain", text: "Heavy drops fall as rain, hail or snow" },
        { id: "back", text: "Rivers carry water back to the ocean; some seeps underground" },
      ],
      understand: [
        { title: "Into the air", body: "Water vapour enters the air through evaporation from water and land, and through transpiration from plants." },
        { title: "Clouds", body: "Air gets cooler as it rises. High up, water vapour condenses into tiny droplets that float — we see them as clouds." },
        { title: "Rain, hail and snow", body: "Many droplets come together into larger drops. When they are heavy enough, they fall as rain — or, in special conditions, as hail or snow." },
        { title: "Back to the ocean", body: "Snow melts into streams, rain fills rivers, lakes and ponds, and most water returns to the oceans. Some seeps into the ground and becomes ground water." },
      ],
      check: [
        { id: "w6", kind: "tf", q: "Water vapour condenses to form tiny droplets of water in the upper layers of air, where it is cooler.", answer: true, why: "That's how clouds form." },
        { id: "w7", kind: "mcq", q: "Water vapour gets added to the air by…", options: ["Evaporation and transpiration", "Condensation only", "Rain and snow"], answer: 0, why: "Water evaporates from surfaces, and plants release vapour through transpiration." },
        { id: "w8", kind: "tf", q: "Water vapour is present in the air only during the monsoon.", answer: false, why: "Evaporation goes on all year, so there is always some water vapour in the air." },
      ],
      connect: [
        { icon: "🌾", title: "Thirsty wheat", body: "Wheat plants lose nearly 500 litres of water by transpiration for every kilogram of wheat — about 25 big buckets!" },
        { icon: "🌫", title: "Fog", body: "Fog near the ground on winter mornings is water vapour condensing close to the ground." },
        { icon: "🏔", title: "Snow-fed rivers", body: "Snow on the mountains melts and flows down as streams and rivers for months." },
      ],
    },
    {
      id: "harvest",
      icon: "🏠",
      title: "Too much, too little",
      pages: "142–144",
      wonder: {
        q: "In a city covered with concrete roads and buildings, where does most rainwater go?",
        options: [
          { id: "ground", label: "Into the ground" },
          { id: "drains", label: "Into drains, and far away" },
          { id: "stays", label: "It stays on the roads" },
        ],
        answer: "drains",
        reveal: "Into the drains! Concrete stops rain seeping into the ground, so it flows to rivers or lakes far away and ground water isn't refilled.",
      },
      explore: {
        activity: "Section 14.8",
        title: "Catch water where it falls",
        how: "Pick the ground and where the roof water goes, then bring the monsoon. Try a year with no rain too.",
        Sim: Harvest,
      },
      discoveries: [
        { id: "runoff", text: "On concrete, rainwater runs off into drains" },
        { id: "tank", text: "Rooftop water can be stored in a tank" },
        { id: "recharge", text: "A recharge pit refills the ground water" },
      ],
      understand: [
        { title: "Floods", body: "Heavy rain can make rivers, lakes and ponds overflow. Floods can drown crops, animals, homes and people." },
        { title: "Droughts", body: "With no rain for a year or more, soil dries, ponds and wells go dry and ground water becomes scarce. Food and fodder become hard to find." },
        { title: "Limited water", body: "The total water on Earth stays the same, but water fit for use is limited — and more people, farms and industries need it every year." },
        { title: "Rainwater harvesting", body: "\"Catch water where it falls\": send rooftop rain to a tank, or into a pit to recharge ground water. Roadside drains can also let rain soak into the ground." },
      ],
      check: [
        { id: "w9", kind: "mcq", q: "No rainfall in a region for a year or more may lead to…", options: ["Flood", "Drought", "Snow"], answer: 1, why: "Without rain, soil, ponds and wells dry up: drought." },
        { id: "w10", kind: "mcq", q: "Excessive rain may cause…", options: ["Floods", "Droughts", "Evaporation to stop"], answer: 0, why: "Too much rain makes rivers and lakes overflow." },
        { id: "w11", kind: "tf", q: "The total amount of water on Earth stays the same, but the water available for our use is limited.", answer: true, why: "Most of it is salty ocean water, and usable water is decreasing with over-use." },
      ],
      connect: [
        { icon: "🏘", title: "Rooftop harvesting", body: "Many homes and schools pipe roof water into tanks or recharge pits." },
        { icon: "🚿", title: "Save water", body: "Turn off the tap while brushing, fix leaks and reuse water for plants." },
        { icon: "📣", title: "Spread the word", body: "Make a poster or write your own 'Save Water' slogans for your school notice board." },
      ],
    },
  ],
  learnt: [
    "Water is essential for life.",
    "Water vapour gets added to air by evaporation and transpiration.",
    "Water vapour condenses into tiny droplets that form clouds; many droplets come together and fall as rain, snow or hail.",
    "Rain, hail and snow refill rivers, lakes, ponds, wells and the soil. The circulation of water between ocean and land is the water cycle.",
    "Too much rain may cause floods; no rain for a long time may cause droughts.",
    "The amount of usable water on Earth is limited, so it must be used carefully.",
  ],
  keywords: ["Evaporation", "Condensation", "Transpiration", "Clouds", "Water cycle", "Ground water", "Flood", "Drought", "Rainwater harvesting"],
};

export default chapter;
