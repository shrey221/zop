// Chapter 15 · Air Around Us (NCERT Science Class VI, 2018-19, pp. 147–154).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useRef, useState } from "react";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage } from "../ui";

const rise = (delay: number, dur = 1.6): React.CSSProperties => ({ animation: `zrise ${dur}s ease-out ${delay}s infinite` });
const spin = (speed: number, reverse = false): React.CSSProperties =>
  speed > 0 ? { animation: `zspin ${(2.4 / speed).toFixed(2)}s linear infinite${reverse ? " reverse" : ""}`, transformBox: "fill-box", transformOrigin: "center" } : { transformBox: "fill-box", transformOrigin: "center" };

/* ───────────── Stop 1 · The "empty" bottle ───────────── */

function BottleBucket({ discover }: SimProps) {
  const [depth, setDepth] = useState(0); // 0 = above water, 1 = pushed deep
  const [tilt, setTilt] = useState(0);
  const [fill, setFill] = useState(0);
  const under = depth > 0.55;

  useEffect(() => {
    if (under && tilt < 8) discover("trapped");
    if (!under || tilt < 15 || fill >= 1) return;
    discover("bubbles");
    const id = window.setInterval(() => setFill((f) => Math.min(1, f + tilt / 1400)), 60);
    return () => window.clearInterval(id);
  }, [under, tilt, fill, discover]);
  useEffect(() => {
    if (fill >= 1) discover("full");
  }, [fill, discover]);

  const y = 30 + depth * 120; // top of the bottle
  const WATER = 160;

  return (
    <Stage
      caption={
        fill >= 1
          ? "All the air bubbled out and water took its place. The bottle was never empty — it was full of air!"
          : under && tilt >= 15
            ? "Bubbles! Air escapes from the tilted bottle and water flows in to fill the space it leaves."
            : under
              ? "Pushed in upside down, water can't get in: the air inside has nowhere to go. Now tilt the bottle."
              : "Is this bottle empty? Push it, upside down, into the bucket of water."
      }
    >
      <svg viewBox="0 0 520 320" className="block h-auto w-full select-none">
        <rect width="520" height="320" fill="#13112b" />
        {/* bucket */}
        <path d="M130 110 L390 110 L365 305 L155 305 Z" fill="#2c3a63" />
        <clipPath id="bucketIn">
          <path d="M136 114 L384 114 L360 300 L160 300 Z" />
        </clipPath>
        <rect x="120" y={WATER} width="280" height="160" fill="#2f78b8" clipPath="url(#bucketIn)" />
        <path d={`M140 ${WATER} q15 -5 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`} stroke="#9fd8ff" strokeWidth="2" fill="none" clipPath="url(#bucketIn)" />
        {/* bottle: drawn mouth-down, tilting about its mouth */}
        <g transform={`translate(260 ${y}) rotate(${tilt} 0 140)`} style={{ transition: "transform .25s" }}>
          <clipPath id="bottleIn">
            <path d="M-34 4 h68 v100 q0 10 -10 16 l-12 6 v14 h-24 v-14 l-12 -6 q-10 -6 -10 -16 z" />
          </clipPath>
          <rect x="-40" y={140 - fill * 140} width="80" height={fill * 140} fill="#2f78b8" clipPath="url(#bottleIn)" style={{ transition: "all .1s" }} />
          <path d="M-36 0 h72 v104 q0 12 -12 18 l-10 5 v13 h-28 v-13 l-10 -5 q-12 -6 -12 -18 z" fill="#cfe8ff" fillOpacity=".16" stroke="#cfe8ff" strokeWidth="3" />
          {fill < 0.98 && <text x="0" y={(140 - fill * 140) / 2 + 6} fontSize="14" fontWeight="900" fill="#ffffffcc" textAnchor="middle">air</text>}
          {under && tilt >= 15 && fill < 1 && [0, 1, 2, 3].map((i) => <circle key={i} cx={-6 + i * 5} cy={136} r={3 + (i % 2)} fill="#dff4ff" style={rise(i * 0.25, 1.2)} />)}
        </g>
        <text x="455" y="300" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">bucket of water</text>
      </svg>
      <div className="grid gap-3 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="w-28 shrink-0">Push down</span>
          <input type="range" min={0} max={1} step={0.05} value={depth} onChange={(e) => setDepth(+e.target.value)} className="w-full accent-[#9be7c4]" aria-label="Push the bottle down" />
        </label>
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="w-28 shrink-0">Tilt the bottle</span>
          <input type="range" min={0} max={50} step={1} value={tilt} onChange={(e) => setTilt(+e.target.value)} className="w-full accent-[#9be7c4]" aria-label="Tilt the bottle" />
        </label>
        <div>
          <Btn onClick={() => (setDepth(0), setTilt(0), setFill(0))}>↺ Empty the bottle</Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 2 · What is air made of? ───────────── */

function Flame({ x, y, size }: { x: number; y: number; size: number }) {
  if (size <= 0.02) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} style={{ transition: "transform .3s" }}>
      <ellipse cx="0" cy="-14" rx="16" ry="26" fill="#ffb534" opacity=".35" className="animate-glow" />
      <path d="M0 -34 C10 -18 10 -6 0 0 C-10 -6 -10 -18 0 -34 Z" fill="#ffd257" />
      <path d="M0 -20 C5 -12 5 -5 0 -2 C-5 -5 -5 -12 0 -20 Z" fill="#fff6c2" />
    </g>
  );
}

const MIX = [
  { id: "n", name: "Nitrogen", n: 78, color: "#6c8cff" },
  { id: "o", name: "Oxygen", n: 21, color: "#1fb88a" },
  { id: "x", name: "Carbon dioxide, water vapour & other gases", n: 1, color: "#ffd257" },
];

function CandleJar({ discover }: SimProps) {
  const [lit, setLit] = useState(false);
  const [covered, setCovered] = useState(false);
  const [left, setLeft] = useState(1); // flame size of the covered candle
  const [asked, setAsked] = useState(false);
  const [mix, setMix] = useState(false);
  const [slit, setSlit] = useState(false);

  useEffect(() => {
    if (!lit || !covered) return;
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 0.06)), 250);
    return () => window.clearInterval(id);
  }, [lit, covered]);
  useEffect(() => {
    if (left <= 0) discover("out");
  }, [left, discover]);

  return (
    <Stage
      caption={
        mix
          ? "Air is a mixture. Nitrogen and oxygen together make up 99% of it; the last 1% is carbon dioxide, water vapour and a few other gases."
          : asked
            ? "There is still air in the glass — mostly nitrogen, which does not support burning."
            : left <= 0
              ? "The covered candle went out: the part of the air that supports burning — oxygen — was used up. The other candle keeps getting fresh air."
              : covered
                ? "Watch the covered flame…"
                : lit
                  ? "Both candles are burning. Now cover one with a glass tumbler."
                  : "Light both candles (your teacher would do this part)."
      }
    >
      <svg viewBox="0 0 520 250" className="block h-auto w-full select-none">
        <rect width="520" height="250" fill="#13112b" />
        <rect y="200" width="520" height="50" fill="#3a2a1a" />
        {[150, 370].map((x, i) => (
          <g key={x}>
            <rect x={x - 14} y="130" width="28" height="70" rx="4" fill="#f4efe3" />
            <line x1={x} y1="130" x2={x} y2="122" stroke="#2b2a30" strokeWidth="2" />
            {lit && <Flame x={x} y={124} size={i === 0 ? left : 1} />}
            {lit && i === 0 && left <= 0 && [0, 1, 2].map((k) => <circle key={k} cx={x - 4 + k * 4} cy={112} r="4" fill="#9a96a8" opacity=".6" style={rise(k * 0.4, 2.4)} />)}
          </g>
        ))}
        {covered && (
          <g className="animate-rise">
            <path d="M100 200 V60 q0 -8 8 -8 h84 q8 0 8 8 V200" fill="#cfe8ff" fillOpacity=".12" stroke="#cfe8ff" strokeWidth="3" />
            <text x="150" y="44" fontSize="11" fontWeight="800" fill="#cfe8ff" textAnchor="middle">glass tumbler</text>
          </g>
        )}
        <text x="370" y="230" fontSize="11" fontWeight="800" fill="#c9b79c" textAnchor="middle">open to the air</text>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={lit} onClick={() => (setLit(true), setLeft(1))}>
          🕯 Light both candles
        </Btn>
        <Btn on={covered} onClick={() => lit && setCovered((c) => !c)}>
          {covered ? "Lift the glass" : "Cover one with a glass"}
        </Btn>
        {left <= 0 && (
          <Btn
            on={asked}
            onClick={() => {
              setAsked(true);
              discover("nitrogen");
            }}
          >
            🤔 What's left in the glass?
          </Btn>
        )}
        <Btn
          on={mix}
          onClick={() => {
            setMix(true);
            discover("mix");
          }}
        >
          🧪 What is air made of?
        </Btn>
      </div>
      {mix && (
        <div className="border-t border-white/10 px-4 py-3">
          <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1" role="img" aria-label="100 dots: 78 nitrogen, 21 oxygen, 1 other">
            {MIX.flatMap((m) => Array.from({ length: m.n }, (_, i) => <span key={m.id + i} className="aspect-square animate-pop rounded-full" style={{ background: m.color, animationDelay: `${i * 8}ms` }} />))}
          </div>
          <ul className="mt-3 grid gap-1 text-xs font-extrabold">
            {MIX.map((m) => (
              <li key={m.id} className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: m.color }} />
                {m.name} <span className="text-white/50">· about {m.n}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* dust in a beam of sunlight */}
      <div className="flex items-center gap-4 border-t border-white/10 px-4 py-3">
        <svg viewBox="0 0 160 110" className="h-28 w-auto shrink-0 rounded-xl">
          <rect width="160" height="110" fill="#07060f" />
          <rect x="0" y="10" width="8" height="90" fill="#3a3560" />
          {slit && (
            <>
              <path d="M8 36 L160 70 L160 96 L8 46 Z" fill="#ffe7a3" opacity=".35" />
              {Array.from({ length: 16 }, (_, i) => (
                <circle key={i} cx={20 + ((i * 41) % 130)} cy={42 + ((i * 17) % 34) + ((i * 41) % 130) * 0.2} r="1.3" fill="#fff6c2" style={{ animation: `float ${2 + (i % 4)}s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </>
          )}
        </svg>
        <div>
          <p className="text-sm font-extrabold">Activity 4 · A dark room</p>
          <p className="text-xs font-bold text-white/60">Let sunlight in through a narrow slit only.</p>
          <div className="mt-2">
            <Btn
              on={slit}
              onClick={() => {
                setSlit(true);
                discover("dust");
              }}
            >
              ☀️ Open the window a crack
            </Btn>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 3 · Air hiding in water and soil ───────────── */

function HiddenAir({ discover }: SimProps) {
  const [temp, setTemp] = useState(25);
  const [boiled, setBoiled] = useState(false);
  const [poured, setPoured] = useState(false);
  const tiny = !boiled && temp >= 45 && temp < 100;
  const boiling = temp >= 100;

  useEffect(() => {
    if (tiny) discover("dissolved");
    if (boiling) discover("boil");
    if (boiled && temp >= 60 && temp < 100) discover("boiled");
  }, [tiny, boiling, boiled, temp, discover]);

  return (
    <Stage
      caption={
        boiling
          ? "Now the water itself is turning into vapour — big bubbles: it's boiling."
          : tiny
            ? "Tiny bubbles on the inside of the pot, long before boiling! This is air that was dissolved in the water, escaping."
            : boiled && temp >= 60
              ? "Water that was already boiled and sealed shows no tiny bubbles — its dissolved air escaped the first time."
              : "Heat the water slowly and watch the inside of the pot."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#13112b" />
        {/* pot of water on a tripod with burner */}
        <path d="M60 80 h170 v120 q0 12 -12 12 h-146 q-12 0 -12 -12 z" fill="#cfe8ff" fillOpacity=".12" stroke="#cfe8ff" strokeWidth="3" />
        <rect x="63" y="100" width="164" height="110" rx="8" fill="#2f78b8" opacity=".85" />
        {tiny &&
          Array.from({ length: 22 }, (_, i) => {
            const side = i % 3;
            const x = side === 0 ? 68 : side === 1 ? 222 : 80 + ((i * 23) % 130);
            const y = side === 2 ? 205 : 110 + ((i * 29) % 90);
            return <circle key={i} cx={x} cy={y} r="2" fill="#dff4ff" className="animate-pop" style={{ animationDelay: `${i * 40}ms` }} />;
          })}
        {boiling && Array.from({ length: 9 }, (_, i) => <circle key={i} cx={80 + i * 17} cy={205} r={5 + (i % 3) * 2} fill="#dff4ff" fillOpacity=".8" style={rise(i * 0.15, 1)} />)}
        <path d="M80 212 L70 245 M210 212 L220 245 M145 212 V245" stroke="#7d8497" strokeWidth="4" />
        {temp > 25 && <Flame x={145} y={238} size={0.5 + (temp / 100) * 0.6} />}
        <text x="145" y="70" fontSize="14" fontWeight="900" fill="#ffd257" textAnchor="middle">
          🌡 {temp}°C
        </text>
        {/* soil in a glass */}
        <path d="M330 70 h130 l-10 170 h-110 z" fill="#cfe8ff" fillOpacity=".12" stroke="#cfe8ff" strokeWidth="3" />
        <path d="M345 170 q20 -30 50 -26 q30 -6 45 22 l-4 70 h-90 z" fill="#7a5530" />
        {poured && <rect x="336" y="120" width="118" height="118" fill="#2f78b8" opacity=".55" className="animate-fade" />}
        {poured && Array.from({ length: 8 }, (_, i) => <circle key={i} cx={360 + i * 11} cy={165} r={3} fill="#dff4ff" style={rise(i * 0.22, 1.4)} />)}
        <text x="395" y="58" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">lump of dry soil</text>
      </svg>
      <div className="grid gap-3 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="w-20 shrink-0">Heat</span>
          <input type="range" min={25} max={100} step={5} value={temp} onChange={(e) => setTemp(+e.target.value)} className="w-full accent-[#ff9d00]" aria-label="Water temperature" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn on={boiled} onClick={() => (setBoiled((b) => !b), setTemp(25))}>
            {boiled ? "Using boiled water" : "Use boiled, sealed water"}
          </Btn>
          <Btn
            on={poured}
            onClick={() => {
              setPoured(true);
              discover("soil");
            }}
          >
            💧 Pour water on the soil
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Stop 4 · Wind at work ───────────── */

function WindWork({ discover }: SimProps) {
  const [speed, setSpeed] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [pumped, setPumped] = useState(0);
  const [seedsGone, setSeedsGone] = useState(false);
  const flips = useRef(0);

  useEffect(() => {
    if (speed > 0) discover("firki");
    if (!speed) return;
    const id = window.setInterval(() => setPumped((p) => p + speed * 0.12), 400);
    return () => window.clearInterval(id);
  }, [speed, discover]);
  useEffect(() => {
    if (pumped >= 3) discover("mill");
  }, [pumped, discover]);

  const buckets = Math.min(5, Math.floor(pumped));

  return (
    <Stage
      caption={
        speed === 0
          ? "The air is still. Make the wind blow!"
          : seedsGone
            ? "Whoosh — the wind carries the seeds far away. Air helps scatter seeds and pollen."
            : `Moving air is wind. The firki spins, the weather cock swings round to show the wind's direction, and the windmill pumps water (${buckets} bucket${buckets === 1 ? "" : "s"} so far).`
      }
    >
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none">
        <rect width="520" height="280" fill="#173b5c" />
        <rect y="220" width="520" height="60" fill="#3f8f50" />
        {/* wind streaks */}
        {speed > 0 &&
          [50, 90, 140].map((y, i) => (
            <path key={y} d={`M${dir > 0 ? 20 : 500} ${y} h${dir * 120}`} stroke="#ffffff55" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: "30 40", animation: `zflow ${(1.2 / speed).toFixed(2)}s linear ${i * 0.2}s infinite${dir < 0 ? " reverse" : ""}` }} />
          ))}
        {/* firki */}
        <g>
          <line x1="80" y1="150" x2="80" y2="225" stroke="#b07a3c" strokeWidth="5" />
          <g style={spin(speed, dir < 0)}>
            {[0, 90, 180, 270].map((a, i) => (
              <path key={a} d="M80 150 L80 112 Q100 120 80 150" fill={["#e5484d", "#ffd257", "#3d7bfd", "#1fb88a"][i]} transform={`rotate(${a} 80 150)`} />
            ))}
          </g>
          <circle cx="80" cy="150" r="4" fill="#fff" />
          <text x="80" y="245" fontSize="11" fontWeight="800" fill="#e8f5e9" textAnchor="middle">firki</text>
        </g>
        {/* weather cock on a pole */}
        <g>
          <line x1="200" y1="100" x2="200" y2="225" stroke="#9aa1b5" strokeWidth="4" />
          <g transform={`translate(200 100) scale(${speed > 0 ? -dir : 1} 1)`} style={{ transition: "transform .6s cubic-bezier(.2,.8,.2,1)" }}>
            <path d="M-34 0 H26" stroke="#2b2a30" strokeWidth="4" />
            <path d="M26 0 l-10 -7 v14 z" fill="#2b2a30" />
            <path d="M-34 0 l-8 -12 h14 z M-34 0 l-8 12 h14 z" fill="#2b2a30" />
            <path d="M-6 -6 q4 -18 16 -14 q6 2 4 10 l6 2 l-8 4 q-6 8 -18 4 z" fill="#ffd257" />
          </g>
          <text x="200" y="245" fontSize="11" fontWeight="800" fill="#e8f5e9" textAnchor="middle">weather cock</text>
        </g>
        {/* windmill pumping water */}
        <g>
          <path d="M320 225 L334 120 L346 120 L360 225 Z" fill="#c9b79c" />
          <g style={spin(speed * 0.8, dir < 0)}>
            {[0, 90, 180, 270].map((a) => (
              <rect key={a} x="336" y="70" width="8" height="50" rx="2" fill="#f4efe3" transform={`rotate(${a} 340 120)`} />
            ))}
          </g>
          <circle cx="340" cy="120" r="5" fill="#2b2a30" />
          <path d="M360 205 H392 V215" stroke="#9aa1b5" strokeWidth="4" fill="none" />
          {speed > 0 && <path d="M392 216 v8" stroke="#9fd8ff" strokeWidth="3" style={{ strokeDasharray: "3 4", animation: "zflow .5s linear infinite" }} />}
          <path d="M378 222 h30 l-4 22 h-22 z" fill="#4a5068" />
          <rect x="381" y={244 - Math.min(1, pumped / 3) * 20} width="24" height={Math.min(1, pumped / 3) * 20} fill="#38c6d9" />
          <text x="345" y="262" fontSize="11" fontWeight="800" fill="#e8f5e9" textAnchor="middle">windmill</text>
        </g>
        {/* dandelion */}
        <g
          onClick={() => {
            if (!speed) return;
            setSeedsGone(true);
            discover("seeds");
          }}
          style={{ cursor: "pointer" }}
          role="button"
          aria-label="Tap the dandelion"
        >
          <line x1="470" y1="170" x2="470" y2="225" stroke="#2f8a4a" strokeWidth="3" />
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2;
            const gone = seedsGone;
            return (
              <g key={i} style={{ transform: gone ? `translate(${dir * (90 + i * 22)}px, ${-40 - (i % 4) * 22}px)` : "none", opacity: gone ? 0 : 1, transition: `transform ${1.4 + i * 0.12}s ease-out, opacity ${1.4 + i * 0.12}s ease-in` }}>
                <line x1="470" y1="170" x2={470 + Math.cos(a) * 16} y2={170 + Math.sin(a) * 16} stroke="#f4f8ff" strokeWidth="1.5" />
                <circle cx={470 + Math.cos(a) * 17} cy={170 + Math.sin(a) * 17} r="2.6" fill="#f4f8ff" />
              </g>
            );
          })}
          {!seedsGone && speed > 0 && <circle cx="470" cy="170" r="24" fill="#ffd257" fillOpacity=".15" className="animate-glow" />}
          <text x="470" y="245" fontSize="11" fontWeight="800" fill="#e8f5e9" textAnchor="middle">dandelion</text>
        </g>
      </svg>
      <div className="grid gap-3 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="w-24 shrink-0">Wind speed</span>
          <input type="range" min={0} max={3} step={0.5} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full accent-[#9be7c4]" aria-label="Wind speed" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn
            onClick={() => {
              setDir((d) => (d === 1 ? -1 : 1));
              flips.current++;
              if (speed > 0) discover("cock");
            }}
          >
            ⇄ Change wind direction
          </Btn>
          <Btn onClick={() => setSeedsGone(false)}>🌼 New dandelion</Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ───────────── Chapter data ───────────── */

const chapter: Chapter = {
  id: "air",
  n: 15,
  title: "Air Around Us",
  pages: "147–154",
  icon: "🌬️",
  theme: { grad: "linear-gradient(135deg,#08302f 0%,#178a7c 55%,#7fd9b5 130%)", accent: "#12806f", soft: "#dbf4ee", ink: "#0c5c52" },
  opening: "You have never seen air — yet leaves rustle, clothes on the line sway and kites fly. How do we know air is all around us?",
  stops: [
    {
      id: "space",
      icon: "🍶",
      title: "Is the bottle empty?",
      pages: "147–148",
      wonder: {
        q: "You push an 'empty' bottle, upside down, into a bucket of water. What happens?",
        options: [
          { id: "fills", label: "Water rushes in and fills it" },
          { id: "air", label: "Water can't get in — there's something inside" },
          { id: "breaks", label: "The bottle cracks" },
        ],
        answer: "air",
        reveal: "Water can't get in, because the bottle is full of air! Tilt it, and the air escapes as bubbles while water takes its place.",
      },
      explore: {
        activity: "Activity 2",
        title: "The upside-down bottle",
        how: "Push the bottle into the water, then slowly tilt it. Watch what comes out.",
        Sim: BottleBucket,
      },
      discoveries: [
        { id: "trapped", text: "Upside down, water can't enter — air is trapped inside" },
        { id: "bubbles", text: "Tilt it and air escapes as bubbles" },
        { id: "full", text: "Water fills the space the air leaves: air occupies space" },
      ],
      understand: [
        { title: "Air occupies space", body: "The 'empty' bottle was completely filled with air. Air fills every space and is present everywhere around us." },
        { title: "Invisible but real", body: "Air has no colour and we can see through it — it is transparent. We feel it when leaves rustle, a firki turns or a kite flies." },
        { title: "Wind", body: "Air in motion is called wind. Storms are winds so fast they can uproot trees." },
        { title: "The atmosphere", body: "A thin layer of air called the atmosphere surrounds the Earth. Higher up, the air gets rarer — so mountaineers carry oxygen cylinders." },
      ],
      check: [
        { id: "a1", kind: "tf", q: "Air occupies space.", answer: true, why: "That's why water couldn't enter the upside-down bottle." },
        { id: "a2", kind: "mcq", q: "The layer of air around the Earth is known as the…", options: ["Atmosphere", "Ozone", "Water cycle"], answer: 0, why: "The envelope of air around the Earth is the atmosphere." },
        { id: "a3", kind: "mcq", q: "Why do mountaineers carry oxygen cylinders?", options: ["Air gets rarer higher up", "Mountains have no air at all", "To cook food"], answer: 0, why: "Higher in the atmosphere, the air is thinner, so there's less oxygen in each breath." },
      ],
      connect: [
        { icon: "🍃", title: "Kites and firkis", body: "Moving air lifts kites and spins a paper firki." },
        { icon: "🎈", title: "Balloons and tyres", body: "Blow air into a balloon or pump it into a cycle tyre — it takes up space and pushes outwards." },
        { icon: "🏔", title: "High mountains", body: "Climbers carry oxygen because the air near mountain tops is thin." },
      ],
    },
    {
      id: "mixture",
      icon: "🕯",
      title: "What is air made of?",
      pages: "148–151",
      wonder: {
        q: "Two candles are burning. One is covered with a glass tumbler. What happens to it?",
        options: [
          { id: "same", label: "It keeps burning, just like the other" },
          { id: "out", label: "It goes out after a while" },
          { id: "bright", label: "It burns even brighter" },
        ],
        answer: "out",
        reveal: "It goes out. Burning uses up the part of air that supports burning — oxygen. The open candle keeps getting fresh air.",
      },
      explore: {
        activity: "Activities 3 & 4",
        title: "Candles, a glass and a sunbeam",
        how: "Light both candles and cover one. Then find out what air is made of, and look for dust in a beam of sunlight.",
        Sim: CandleJar,
      },
      discoveries: [
        { id: "out", text: "The covered candle goes out — oxygen supports burning" },
        { id: "nitrogen", text: "Air remains in the glass: mostly nitrogen, which doesn't support burning" },
        { id: "mix", text: "Air is a mixture of gases — mostly nitrogen and oxygen" },
        { id: "dust", text: "Tiny dust particles float in the air" },
      ],
      understand: [
        { title: "Oxygen", body: "The part of air that supports burning is oxygen. Living things also need it to breathe." },
        { title: "Nitrogen", body: "The major part of air is nitrogen. It does not support burning." },
        { title: "Carbon dioxide", body: "A small part of air. Plants and animals produce it when they respire, and burning produces it too. In a closed room with something burning, it can make you feel suffocated." },
        { title: "Water vapour, dust and smoke", body: "Air also has water vapour and dust. Smoke from burning fuel is harmful. Fine hair and mucus in your nose stop dust from getting in — so breathe through your nose!" },
      ],
      check: [
        { id: "a4", kind: "mcq", q: "Which component of air supports burning?", options: ["Nitrogen", "Oxygen", "Water vapour"], answer: 1, why: "The candle went out once the oxygen in the glass was used up." },
        { id: "a5", kind: "tf", q: "Nitrogen and oxygen together make up about 99% of the air.", answer: true, why: "The remaining 1% is carbon dioxide, water vapour and a few other gases." },
        { id: "a6", kind: "mcq", q: "Why are we told to breathe through the nose, not the mouth?", options: ["The nose is bigger", "Hair and mucus in the nose trap dust", "Air in the mouth is warmer"], answer: 1, why: "Through the mouth, harmful dust particles may enter the body." },
      ],
      connect: [
        { icon: "🔥", title: "Blanket on a fire", body: "Wrapping a woollen blanket over a burning object cuts off its air supply." },
        { icon: "👮", title: "Masks at crossings", body: "Traffic police at busy crossings often wear masks against dust and smoke." },
        { icon: "🏭", title: "Tall chimneys", body: "Chimneys carry smoke away from our noses — but closer to birds in the sky. Don't burn dry leaves or crop remains." },
      ],
    },
    {
      id: "hidden",
      icon: "🐟",
      title: "Air in water and soil",
      pages: "151–152",
      wonder: {
        q: "Heat water slowly. Long before it boils, tiny bubbles appear on the inside of the pot. What are they?",
        options: [
          { id: "air", label: "Air that was dissolved in the water" },
          { id: "steam", label: "Steam" },
          { id: "pot", label: "Bits of the pot" },
        ],
        answer: "air",
        reveal: "They are bubbles of air that was dissolved in the water. As the water warms, the air escapes first. Only later does the water itself boil.",
      },
      explore: {
        activity: "Activities 5 & 6",
        title: "Find the hidden air",
        how: "Slowly heat the pot of water. Then try water that was boiled before. Finally, pour water on a dry lump of soil.",
        Sim: HiddenAir,
      },
      discoveries: [
        { id: "dissolved", text: "Tiny bubbles before boiling: air is dissolved in water" },
        { id: "boil", text: "At boiling, the water itself turns into vapour" },
        { id: "boiled", text: "Boiled, sealed water has lost its dissolved air" },
        { id: "soil", text: "Bubbles from soil: there is air in the soil too" },
      ],
      understand: [
        { title: "Air in water", body: "Water has air dissolved in it. Animals living in water use this dissolved oxygen to breathe." },
        { title: "Air in soil", body: "Water poured on soil pushes out the air in its spaces as bubbles. Roots and soil animals breathe this air." },
        { title: "Burrows", body: "Animals that live in soil make burrows and holes, which let air move in and out of the soil." },
        { title: "Earthworms in the rain", body: "Heavy rain fills all the air spaces in soil. Animals like earthworms then have to come out to breathe." },
      ],
      check: [
        { id: "a7", kind: "tf", q: "Animals living in water use the oxygen dissolved in it.", answer: true, why: "Fish and other water animals breathe dissolved oxygen." },
        { id: "a8", kind: "mcq", q: "Why do earthworms come out of the soil during heavy rain?", options: ["To drink the rain", "Water fills the air spaces in the soil", "They like getting wet"], answer: 1, why: "With the air pushed out, they come up to breathe." },
        { id: "a9", kind: "mcq", q: "Why does a lump of cotton wool shrink when put in water?", options: ["Water pushes out the air trapped between its fibres", "Cotton dissolves in water", "Water is heavier than cotton"], answer: 0, why: "Cotton wool is full of air spaces; water takes their place." },
      ],
      connect: [
        { icon: "🐟", title: "Fish in a pond", body: "Fish breathe the oxygen dissolved in the water around them." },
        { icon: "🐠", title: "Aquarium pumps", body: "Pumps bubble air into aquarium water so the fish get enough oxygen." },
        { icon: "🐛", title: "After the rain", body: "Seen earthworms on the path after a downpour? Their burrows were flooded." },
      ],
    },
    {
      id: "work",
      icon: "🌀",
      title: "Air at work",
      pages: "152",
      wonder: {
        q: "Animals and people use oxygen all the time. Why hasn't the air run out of it?",
        options: [
          { id: "plants", label: "Plants make oxygen during photosynthesis" },
          { id: "ocean", label: "The oceans release it" },
          { id: "soon", label: "It will run out very soon" },
        ],
        answer: "plants",
        reveal: "Plants produce oxygen when they make their food by photosynthesis. They use some for respiration, but produce more than they use.",
      },
      explore: {
        activity: "Section 15.4",
        title: "Wind at work",
        how: "Turn up the wind and change its direction. Then tap the dandelion.",
        Sim: WindWork,
      },
      discoveries: [
        { id: "firki", text: "Moving air — wind — makes a firki spin" },
        { id: "cock", text: "A weather cock swings round to show the wind's direction" },
        { id: "mill", text: "A windmill uses wind to pump water" },
        { id: "seeds", text: "Wind carries seeds far away" },
      ],
      understand: [
        { title: "Who refills the oxygen?", body: "In photosynthesis, plants make food and release oxygen — more than they use. Animals breathe in oxygen and give out carbon dioxide." },
        { title: "Living together", body: "Respiration and photosynthesis keep the balance of oxygen and carbon dioxide in the air. Plants and animals depend on each other." },
        { title: "Wind power", body: "Windmills draw water from tubewells, run flour mills and generate electricity." },
        { title: "Air helps us move", body: "Air helps sailing yachts, gliders, parachutes and aeroplanes move. Birds, bats and insects fly because of air, and air scatters seeds and pollen." },
      ],
      check: [
        { id: "a10", kind: "mcq", q: "Green plants use which component of air to make their food?", options: ["Nitrogen", "Carbon dioxide", "Dust"], answer: 1, why: "Plants take in carbon dioxide for photosynthesis and release oxygen." },
        { id: "a11", kind: "tf", q: "Plants produce more oxygen than they use.", answer: true, why: "That's why we say plants produce oxygen." },
        { id: "a12", kind: "mcq", q: "Air in motion is called…", options: ["Wind", "Atmosphere", "Vapour"], answer: 0, why: "Moving air is wind." },
      ],
      connect: [
        { icon: "⚡", title: "Wind farms", body: "Rows of giant windmills turn wind into electricity." },
        { icon: "✈️", title: "Gliders & parachutes", body: "They depend on air to stay up and land gently." },
        { icon: "🌳", title: "Plant a tree", body: "More plants, more oxygen — trees help keep the air healthy." },
      ],
    },
  ],
  learnt: [
    "Air is found everywhere. We cannot see air, but we can feel it. Air in motion is wind.",
    "Air occupies space. It is also present in water and in soil.",
    "Air is a mixture of nitrogen, oxygen, carbon dioxide, water vapour and a few other gases, with some dust.",
    "Oxygen supports burning and is needed by living things.",
    "The envelope of air around the Earth is the atmosphere — essential for life.",
    "Plants and animals depend on each other for the exchange of oxygen and carbon dioxide.",
  ],
  keywords: ["Atmosphere", "Wind", "Oxygen", "Nitrogen", "Carbon dioxide", "Composition of air", "Smoke", "Windmill"],
};

export default chapter;
