// Geography Chapter 1 · The Earth in the Solar System (NCERT The Earth: Our Habitat, 2020-21, pp. 1–9).
// Wording is original; facts follow the textbook.
import { useEffect, useRef, useState } from "react";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";

/* Stop 1 · the night sky */
const SAPTA: [number, number][] = [[150, 190], [190, 178], [228, 186], [262, 168], [276, 214], [330, 222], [338, 172]];
const POLE = { x: 384, y: 60 };
function NightSky({ discover }: SimProps) {
  const [line, setLine] = useState(false);
  const [planet, setPlanet] = useState(false);
  const [moon, setMoon] = useState(0); // 0 new … 14 full
  useEffect(() => {
    if (moon >= 14) discover("full");
  }, [moon, discover]);
  const stars = Array.from({ length: 46 }, (_, i) => ({ x: (i * 97) % 520, y: (i * 53) % 300, r: 0.8 + (i % 3) * 0.5, d: (i % 7) * 0.4 }));
  const P1 = SAPTA[5];
  const P2 = SAPTA[6];
  const k = (POLE.y - P1[1]) / (P2[1] - P1[1]);
  return (
    <Stage
      caption={
        line
          ? "The line through the two pointer stars of the Saptarishi leads to the Pole Star. It always stays in the same position and shows the north."
          : planet
            ? "This bright dot doesn't twinkle — it's a planet. Planets have no light of their own; they shine with the sun's light."
            : moon >= 14
              ? "Full moon night — Poornima. About a fortnight later comes the new moon night, Amavasya, when the sky is darkest."
              : "Most dots twinkle — those are stars. Tap the steady bright one, find the Saptarishi, and slide the moon through its phases."
      }
    >
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#070b24" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" style={{ animation: `glow ${1.4 + s.d}s ease-in-out ${s.d}s infinite` }} />
        ))}
        {SAPTA.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i >= 5 ? 4.5 : 3.6} fill={i >= 5 ? "#ffe9a8" : "#fff"} style={{ animation: "glow 1.8s ease-in-out infinite" }} />
        ))}
        <path d={SAPTA.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ") + ` L${SAPTA[3][0]} ${SAPTA[3][1]}`} stroke="#ffffff33" strokeWidth="1.5" fill="none" />
        <text x="236" y="248" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">Saptarishi</text>
        {line && <line x1={P1[0]} y1={P1[1]} x2={P1[0] + (P2[0] - P1[0]) * k} y2={POLE.y} stroke="#ffd257" strokeWidth="2" strokeDasharray="5 5" className="animate-fade" />}
        <circle cx={POLE.x} cy={POLE.y} r={line ? 6 : 3} fill="#fff6c2" style={{ transition: "r .4s" }} />
        {line && <text x={POLE.x + 10} y={POLE.y + 4} fontSize="12" fontWeight="900" fill="#ffd257">Pole Star (North)</text>}
        {/* a planet: bright and steady */}
        <g onClick={() => (setPlanet(true), discover("planet"))} style={{ cursor: "pointer" }} role="button" aria-label="Tap the steady bright dot">
          <circle cx="90" cy="70" r="16" fill="#ffd257" fillOpacity=".15" className={planet ? "" : "animate-glow"} />
          <circle cx="90" cy="70" r="5" fill="#ffe6b3" />
        </g>
        {/* moon */}
        <g transform="translate(450 230)">
          <circle r="26" fill="#1a2047" />
          <path d={`M0 -26 A26 26 0 0 1 0 26 A${Math.abs(26 - (moon / 14) * 52)} 26 0 0 ${moon / 14 > 0.5 ? 1 : 0} 0 -26`} fill="#f4f1de" opacity={moon === 0 ? 0 : 1} />
        </g>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Moon</span>
          <input type="range" min={0} max={14} value={moon} onChange={(e) => setMoon(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Days after new moon" />
        </label>
        <div>
          <Btn on={line} onClick={() => (setLine(true), discover("pole"))}>
            ✨ Join the pointer stars
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 2 · the solar family (not to scale) */
const PLANETS = [
  { id: "mercury", name: "Mercury", r: 4, orbit: 42, color: "#b9b3a8", days: 88, info: "Nearest to the sun. One orbit takes about 88 days; one spin takes 59 days. An inner planet, made of rock." },
  { id: "venus", name: "Venus", r: 6, orbit: 60, color: "#e8c27a", days: 225, info: "Called 'Earth's twin' because its size and shape are very similar to the earth's. One spin takes 243 days. An inner, rocky planet." },
  { id: "earth", name: "Earth", r: 6.5, orbit: 80, color: "#4f9fd1", days: 365, info: "The third planet from the sun and the fifth largest. One orbit takes 365 days; one spin, 1 day. It has one moon. Two-thirds of it is covered by water — the blue planet." },
  { id: "mars", name: "Mars", r: 5, orbit: 100, color: "#d9643f", days: 687, info: "One orbit takes 687 days; one spin is about 1 day. Mars has two moons. An inner, rocky planet." },
  { id: "jupiter", name: "Jupiter", r: 13, orbit: 132, color: "#d9a46a", days: 4330, info: "The largest planet. One orbit takes about 12 years; one spin only 9 hours 56 minutes! An outer planet made of gases and liquids, with rings." },
  { id: "saturn", name: "Saturn", r: 11, orbit: 166, color: "#e8cf8a", days: 10760, info: "One orbit takes 29 years 5 months; one spin 10 hours 40 minutes. It has rings of small debris. An outer planet." },
  { id: "uranus", name: "Uranus", r: 8, orbit: 196, color: "#8fd6e0", days: 30660, info: "One orbit takes 84 years; one spin 17 hours 14 minutes. It has rings. An outer planet." },
  { id: "neptune", name: "Neptune", r: 8, orbit: 222, color: "#4f7ff0", days: 59860, info: "The farthest planet. One orbit takes 164 years; one spin 16 hours 7 minutes. An outer planet." },
];
function Orrery({ discover }: SimProps) {
  const [sel, setSel] = useState<string | null>(null);
  const [speed, setSpeed] = useState(40); // earth days per second
  const [day, setDay] = useState(0);
  const [mnemonic, setMnemonic] = useState(false);
  const seen = useRef(new Set<string>());
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      setDay((d) => d + ((t - last) / 1000) * speed);
      last = t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  function pick(id: string) {
    setSel(id);
    seen.current.add(id);
    const s = seen.current;
    if (id === "earth") discover("earth");
    if (["mercury", "venus", "mars"].some((x) => s.has(x))) discover("inner");
    if (["jupiter", "saturn", "uranus", "neptune"].some((x) => s.has(x))) discover("outer");
  }
  const p = PLANETS.find((x) => x.id === sel);
  return (
    <Stage
      caption={
        p ? (
          <span>
            <b className="text-[#ffd257]">{p.name}:</b> {p.info}
          </span>
        ) : mnemonic ? (
          "My Very Efficient Mother Just Served Us Nuts: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."
        ) : (
          "Eight planets move round the sun in fixed paths called orbits. Tap any planet."
        )
      }
    >
      <svg viewBox="0 0 520 500" className="block h-auto w-full select-none">
        <rect width="520" height="500" fill="#070b24" />
        <g transform="translate(260 250)">
          {/* asteroid belt between Mars and Jupiter */}
          {Array.from({ length: 70 }, (_, i) => {
            const a = (i / 70) * Math.PI * 2 + day / 900;
            const rr = 114 + ((i * 7) % 8);
            return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr * 0.92} r="1.1" fill="#8d8a80" />;
          })}
          {PLANETS.map((pl) => (
            <ellipse key={pl.id + "o"} rx={pl.orbit} ry={pl.orbit * 0.92} fill="none" stroke="#ffffff1f" />
          ))}
          <circle r="22" fill="#ffd257" className="animate-glow" />
          <circle r="16" fill="#ffb534" />
          {PLANETS.map((pl) => {
            const a = (day / pl.days) * Math.PI * 2;
            const x = Math.cos(a) * pl.orbit;
            const y = Math.sin(a) * pl.orbit * 0.92;
            return (
              <g key={pl.id} onClick={() => pick(pl.id)} style={{ cursor: "pointer" }} role="button" aria-label={pl.name}>
                <circle cx={x} cy={y} r={pl.r + 9} fill="transparent" />
                {pl.id === "saturn" && <ellipse cx={x} cy={y} rx={pl.r + 7} ry={3} fill="none" stroke="#e8cf8a" strokeWidth="2" />}
                <circle cx={x} cy={y} r={pl.r} fill={pl.color} stroke={sel === pl.id ? "#fff" : "none"} strokeWidth="2" />
              </g>
            );
          })}
        </g>
        <text x="510" y="492" fontSize="10" fontWeight="800" fill="#7e86b0" textAnchor="end">Sizes and distances are not to scale</text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Speed</span>
          <input type="range" min={0} max={400} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Simulation speed" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn on={mnemonic} onClick={() => (setMnemonic(true), setSel(null), discover("order"))}>
            🧠 Remember the order
          </Btn>
          <Readout label="Earth years passed" value={(day / 365).toFixed(1)} color="#7fd0ff" />
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · Earth and Moon */
function MoonOrbit({ discover }: SimProps) {
  const [t, setT] = useState(0);
  const [mark, setMark] = useState(false);
  const [fact, setFact] = useState<"size" | "far" | null>(null);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setT((v) => v + 0.02);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  useEffect(() => {
    if (!mark) return;
    if (start.current === null) start.current = t;
    if (t - start.current >= Math.PI * 2) discover("oneside");
  }, [t, mark, discover]);
  const a = t;
  const mx = Math.cos(a) * 150;
  const my = Math.sin(a) * 110;
  return (
    <Stage
      caption={
        fact === "size"
          ? "The moon's diameter is only one-quarter that of the earth. It looks big because it is much nearer to us than other celestial bodies."
          : fact === "far"
            ? "The moon is about 3,84,400 km away. The sun is about 150 million km away — its light takes about eight minutes to reach us!"
            : mark
              ? "Watch the red mark: the moon spins once in the same time it takes to go round the earth (about 27 days), so the same side always faces us."
              : "The moon is the earth's only natural satellite. Put a mark on it and watch it go round."
      }
    >
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#070b24" />
        <ellipse cx="260" cy="150" rx="150" ry="110" fill="none" stroke="#ffffff22" strokeDasharray="4 6" />
        <circle cx="260" cy="150" r="32" fill="#2f7fc0" />
        <path d="M240 140 q10 -14 24 -6 q8 10 -4 18 q-14 4 -20 -12z M270 160 q12 -6 16 6 q-6 10 -16 -6z" fill="#7fbf6a" />
        <g transform={`translate(${260 + mx} ${150 + my}) rotate(${(a * 180) / Math.PI + 180})`}>
          <circle r="10" fill="#d8d4c4" />
          {mark && <circle cx="-8" cy="0" r="3" fill="#e5484d" />}
        </g>
        <text x="510" y="292" fontSize="10" fontWeight="800" fill="#7e86b0" textAnchor="end">Not to scale</text>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={mark} onClick={() => setMark(true)}>
          🔴 Mark the moon's face
        </Btn>
        <Btn on={fact === "size"} onClick={() => (setFact("size"), discover("size"))}>
          📏 How big is it?
        </Btn>
        <Btn on={fact === "far"} onClick={() => (setFact("far"), discover("far"))}>
          🚀 How far is it?
        </Btn>
      </div>
    </Stage>
  );
}

const chapter: Chapter = {
  id: "gsolar",
  subject: "Geography",
  n: 1,
  title: "The Earth in the Solar System",
  pages: "1–9",
  icon: "☀️",
  theme: { grad: "linear-gradient(135deg,#050816 0%,#1e2a78 55%,#f5a524 135%)", accent: "#3b4fd8", soft: "#e6e9fb", ink: "#1e2a78" },
  opening: "After sunset, one or two bright dots appear in the sky — then countless more. Some twinkle, some don't. What are they all?",
  stops: [
    {
      id: "sky",
      icon: "✨",
      title: "Stars, planets and the moon",
      pages: "1–3",
      wonder: {
        q: "Why can't we see the stars during the day?",
        options: [
          { id: "gone", label: "They disappear in the day" },
          { id: "bright", label: "The very bright light of the sun hides them" },
          { id: "clouds", label: "Clouds always cover them" },
        ],
        answer: "bright",
        reveal: "The bright light of the sun does not let us see them. The stars are still there!",
      },
      explore: { activity: "Let's Do (torch activity)", title: "A night sky", how: "Find a planet, trace the Saptarishi to the Pole Star and watch the moon change.", Sim: NightSky },
      discoveries: [
        { id: "planet", text: "Planets shine steadily with reflected sunlight; stars twinkle" },
        { id: "pole", text: "The Saptarishi's pointer stars lead to the Pole Star (north)" },
        { id: "full", text: "Full moon (Poornima) comes about once a month" },
      ],
      understand: [
        { title: "Celestial bodies", body: "The sun, the moon and all the objects shining in the night sky are celestial bodies." },
        { title: "Stars", body: "Stars are big, hot bodies made of gases with their own heat and light. The sun is a star; other stars look tiny because they are very far away." },
        { title: "Constellations", body: "Patterns of stars are constellations, like Ursa Major (Big Bear). The Saptarishi — seven sages — is part of it." },
        { title: "Planets", body: "Planets have no heat and light of their own; they are lit by stars. 'Planet' comes from the Greek 'planetai', meaning wanderers." },
      ],
      check: [
        { id: "gs1", kind: "mcq", q: "How does a planet differ from a star?", options: ["A planet has no light of its own", "A planet is always bigger", "A planet twinkles more"], answer: 0, why: "Stars make their own heat and light; planets reflect a star's light." },
        { id: "gs2", kind: "tf", q: "The Pole Star always remains in the same position in the sky.", answer: true, why: "That's why it was used to find north at night." },
      ],
      connect: [
        { icon: "🔦", title: "Torch stars", body: "Prick holes in paper over a torch and shine it in a dark room — then switch on the lights and watch the 'stars' vanish." },
        { icon: "🧭", title: "Night navigation", body: "In ancient times people found directions at night using stars." },
        { icon: "🌌", title: "Akash Ganga", body: "The Milky Way is a huge band of millions of stars." },
      ],
    },
    {
      id: "family",
      icon: "🌞",
      title: "The solar family",
      pages: "3–5",
      wonder: {
        q: "Which planet is called 'Earth's twin'?",
        options: [
          { id: "mars", label: "Mars" },
          { id: "venus", label: "Venus" },
          { id: "jupiter", label: "Jupiter" },
        ],
        answer: "venus",
        reveal: "Venus — its size and shape are very similar to the earth's.",
      },
      explore: { activity: "Figure 1.2", title: "A working solar system", how: "Watch the planets move. Change the speed and tap each planet.", Sim: Orrery },
      discoveries: [
        { id: "inner", text: "Inner planets are close to the sun and made of rock" },
        { id: "outer", text: "Outer planets are huge and made of gases and liquids" },
        { id: "earth", text: "The earth is the third planet and the fifth largest" },
        { id: "order", text: "Remember the order: My Very Efficient Mother Just Served Us Nuts" },
      ],
      understand: [
        { title: "The solar system", body: "The sun, eight planets, satellites and other bodies like asteroids and meteoroids form the solar system — the solar family, with the sun as its head." },
        { title: "The sun", body: "The sun is in the centre, made of extremely hot gases. Its pull binds the solar system. It is about 150 million km from the earth." },
        { title: "Pluto", body: "Until August 2006, Pluto was called a planet. The International Astronomical Union then decided to call it a 'dwarf planet'." },
        { title: "Asteroids and meteoroids", body: "Asteroids are tiny bodies found between the orbits of Mars and Jupiter. Meteoroids are small pieces of rock that sometimes come near the earth and fall." },
      ],
      check: [
        { id: "gs3", kind: "mcq", q: "Asteroids are found between the orbits of…", options: ["Saturn and Jupiter", "Mars and Jupiter", "The Earth and Mars"], answer: 1, why: "The asteroid belt lies between Mars and Jupiter." },
        { id: "gs4", kind: "mcq", q: "Which planet is nearest to the sun?", options: ["Mercury", "Venus", "Earth"], answer: 0, why: "Mercury orbits closest, taking about 88 days." },
      ],
      connect: [
        { icon: "🔭", title: "Rings", body: "Jupiter, Saturn and Uranus have rings of small debris, seen through powerful telescopes." },
        { icon: "🌍", title: "Blue planet", body: "From space the earth looks blue — two-thirds is covered by water." },
        { icon: "👩‍🔬", title: "Aryabhata", body: "This ancient Indian astronomer said the moon and planets shine due to reflected sunlight." },
      ],
    },
    {
      id: "moon",
      icon: "🌙",
      title: "Our moon",
      pages: "5–6",
      wonder: {
        q: "Why do we always see the same side of the moon?",
        options: [
          { id: "spin", label: "It spins once in the same time it takes to go round the earth" },
          { id: "still", label: "It doesn't move at all" },
          { id: "flat", label: "It's flat like a coin" },
        ],
        answer: "spin",
        reveal: "The moon goes round the earth in about 27 days and takes exactly the same time to spin once — so only one side faces us.",
      },
      explore: { activity: "The Moon", title: "Earth and moon", how: "Mark the moon, watch it orbit, and compare its size and distance.", Sim: MoonOrbit },
      discoveries: [
        { id: "oneside", text: "The same side of the moon always faces the earth" },
        { id: "size", text: "The moon's diameter is a quarter of the earth's" },
        { id: "far", text: "The moon is about 3,84,400 km away; sunlight takes 8 minutes to reach us" },
      ],
      understand: [
        { title: "A satellite", body: "A satellite is a celestial body that moves around a planet. The moon is the earth's only natural satellite." },
        { title: "No life", body: "The moon has no conditions favourable for life. It has mountains, plains and depressions that cast shadows." },
        { title: "Human-made satellites", body: "Scientists design satellites to gather information or for communication. Rockets place them in orbit. Indian satellites include INSAT, IRS and EDUSAT." },
        { title: "First on the moon", body: "Neil Armstrong was the first person to step on the moon, on 20 July 1969." },
      ],
      check: [{ id: "gs5", kind: "mcq", q: "About how far is the moon from the earth?", options: ["3,84,400 km", "150 million km", "100 km"], answer: 0, why: "150 million km is the distance to the sun." }],
      connect: [
        { icon: "📡", title: "Satellites at work", body: "TV, weather forecasts and maps on phones use satellites." },
        { icon: "🌕", title: "Watch it", body: "Look at the full moon and spot the shadows of its mountains." },
        { icon: "🚀", title: "India's missions", body: "Find out about India's own missions to the moon." },
      ],
    },
  ],
  learnt: [
    "Stars have their own heat and light; planets are lit by the sun. The sun is a star.",
    "The solar system has the sun, eight planets, satellites, asteroids and meteoroids.",
    "The earth is the third planet from the sun, the fifth largest, and the only one known to support life.",
    "The moon is the earth's only natural satellite; the same side always faces us.",
  ],
  keywords: ["Celestial bodies", "Star", "Constellation", "Planet", "Satellite", "Orbit", "Solar system", "Asteroid", "Meteoroid", "Geoid"],
};

export default chapter;
