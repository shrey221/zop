// Geography Chapter 4 · Maps (NCERT The Earth: Our Habitat, 2020-21, pp. 23–29).
// Wording is original; facts follow the textbook. The village map is an original drawing.
import { useState } from "react";
import { PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";

function MapTypes({ discover }: SimProps) {
  const items = [
    { id: "mtn", label: "Mountains, plateaus and rivers", icon: "⛰", bin: "phys", why: "Natural features are shown on physical (relief) maps." },
    { id: "ocean", label: "Oceans and plains", icon: "🌊", bin: "phys" },
    { id: "states", label: "States and their capitals", icon: "🏙", bin: "pol", why: "Countries, states, cities and boundaries are shown on political maps." },
    { id: "border", label: "Boundaries of countries", icon: "🗺", bin: "pol" },
    { id: "rain", label: "Rainfall", icon: "🌧", bin: "them", why: "Maps focusing on one kind of information — like rainfall — are thematic maps." },
    { id: "forest", label: "Distribution of forests", icon: "🌳", bin: "them" },
    { id: "roads", label: "Roads", icon: "🛣", bin: "them" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="What kind of map would show each of these? Tap an item, then the map type."
      bins={[
        { id: "phys", label: "Physical", icon: "⛰", color: "#c9a06a" },
        { id: "pol", label: "Political", icon: "🏛", color: "#ff9bb0" },
        { id: "them", label: "Thematic", icon: "🎯", color: "#5fe0a0" },
      ]}
      items={items}
      rules={[
        { id: "phys", when: (p) => all(p, "phys") },
        { id: "pol", when: (p) => all(p, "pol") },
        { id: "them", when: (p) => all(p, "them") },
      ]}
    />
  );
}

/* Stop 2 · a village map: directions, scale and symbols */
const PLACES: Record<string, { name: string; x: number; y: number; icon: string }> = {
  school: { name: "School", x: 120, y: 80, icon: "🏫" },
  temple: { name: "Temple", x: 400, y: 80, icon: "⛩" },
  well: { name: "Well", x: 120, y: 260, icon: "⭕" },
  post: { name: "Post office", x: 400, y: 260, icon: "📮" },
  tree: { name: "Big tree", x: 260, y: 170, icon: "🌳" },
};
const SCALE_PX_PER_CM = 28; // drawing units per map centimetre
const M_PER_CM = 10; // 1 cm on the map = 10 m on the ground
const QUESTIONS = [
  { q: "In which direction is the temple from the school?", a: "E", options: ["N", "E", "S", "W"] },
  { q: "In which direction is the well from the school?", a: "S", options: ["N", "E", "S", "W"] },
  { q: "In which direction is the post office from the school?", a: "SE", options: ["NE", "SE", "SW", "NW"] },
  { q: "In which direction is the temple from the well?", a: "NE", options: ["NE", "SE", "SW", "NW"] },
];
const SYMBOLS = [
  { id: "rail", label: "Railway line", text: "A line with short cross-bars shows a railway line." },
  { id: "river", label: "Blue = water", text: "Blue is generally used for water bodies like rivers, lakes and the sea." },
  { id: "road", label: "Road", text: "Roads are shown by double or single lines." },
  { id: "hut", label: "Huts and houses", text: "Small squares or shapes stand for buildings." },
];
function VillageMap({ discover }: SimProps) {
  const [mode, setMode] = useState<"dir" | "measure" | "sym">("dir");
  const [qi, setQi] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [picks, setPicks] = useState<string[]>([]);
  const [sym, setSym] = useState<string | null>(null);
  const [symSeen, setSymSeen] = useState<string[]>([]);

  function answer(o: string) {
    const q = QUESTIONS[qi];
    if (o !== q.a) return setWrong(o);
    setWrong(null);
    const s = [...new Set([...solved, qi])];
    setSolved(s);
    if (s.includes(0) || s.includes(1)) discover("cardinal");
    if (s.includes(2) || s.includes(3)) discover("intermediate");
    if (qi < QUESTIONS.length - 1) window.setTimeout(() => setQi(qi + 1), 600);
  }
  function tapPlace(k: string) {
    if (mode !== "measure") return;
    const p = picks.length >= 2 ? [k] : [...picks, k];
    setPicks(p);
    if (p.length === 2 && p[0] !== p[1]) discover("scale");
  }
  function tapSym(id: string) {
    setSym(id);
    const s = [...new Set([...symSeen, id])];
    setSymSeen(s);
    if (s.length >= 3) discover("symbols");
  }
  const [a, b] = picks.map((k) => PLACES[k]);
  const cm = a && b ? Math.hypot(a.x - b.x, a.y - b.y) / SCALE_PX_PER_CM : 0;

  return (
    <Stage
      caption={
        mode === "dir"
          ? "Use the north line (N) in the corner. Find directions from one place to another."
          : mode === "measure"
            ? a && b
              ? `On the map: ${cm.toFixed(1)} cm. With a scale of 1 cm = ${M_PER_CM} m, that's about ${Math.round(cm * M_PER_CM)} m on the ground (as the crow flies).`
              : "Tap two places on the map to measure the distance between them."
            : sym
              ? SYMBOLS.find((s) => s.id === sym)!.text
              : "Maps use symbols and colours instead of drawing real shapes. Tap the symbols in the key."
      }
    >
      <svg viewBox="0 0 520 340" className="block h-auto w-full select-none">
        <rect width="520" height="340" fill="#f4efe0" />
        {/* river */}
        <path d="M0 200 C 80 190, 140 220, 200 210 S 330 180, 520 200" stroke="#4fa3d8" strokeWidth={sym === "river" ? 18 : 12} fill="none" />
        {/* road */}
        <path d="M120 80 H400 V260 H120 Z" stroke="#b9a37a" strokeWidth={sym === "road" ? 12 : 8} fill="none" />
        {/* railway */}
        <g stroke="#2b2a30" strokeWidth={sym === "rail" ? 3 : 2}>
          <line x1="40" y1="0" x2="40" y2="340" />
          {Array.from({ length: 17 }, (_, i) => (
            <line key={i} x1="34" y1={10 + i * 20} x2="46" y2={10 + i * 20} />
          ))}
        </g>
        {/* huts */}
        {[[200, 120], [230, 130], [300, 230], [330, 240], [460, 130]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="16" height="12" fill={sym === "hut" ? "#e5484d" : "#8a5a2b"} />
        ))}
        {Object.entries(PLACES).map(([k, p]) => (
          <g key={k} onClick={() => tapPlace(k)} style={{ cursor: mode === "measure" ? "pointer" : "default" }} role="button" aria-label={p.name}>
            <circle cx={p.x} cy={p.y} r="20" fill={picks.includes(k) ? "#ffd257" : "#ffffff"} stroke="#5d5848" strokeWidth="2" />
            <text x={p.x} y={p.y + 7} fontSize="20" textAnchor="middle">
              {p.icon}
            </text>
            <text x={p.x} y={p.y + 36} fontSize="11" fontWeight="800" fill="#3a2414" textAnchor="middle">
              {p.name}
            </text>
          </g>
        ))}
        {a && b && <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#e5484d" strokeWidth="3" strokeDasharray="6 5" pointerEvents="none" />}
        {/* north line */}
        <g transform="translate(486 44)">
          <path d="M0 -26 L8 4 L0 -2 L-8 4 Z" fill="#2b2a30" />
          <text y="20" fontSize="14" fontWeight="900" fill="#2b2a30" textAnchor="middle">
            N
          </text>
        </g>
        {/* scale bar */}
        <g transform="translate(330 318)">
          <rect width={SCALE_PX_PER_CM * 4} height="6" fill="none" stroke="#2b2a30" />
          <rect width={SCALE_PX_PER_CM} height="6" fill="#2b2a30" />
          <rect x={SCALE_PX_PER_CM * 2} width={SCALE_PX_PER_CM} height="6" fill="#2b2a30" />
          <text y="-4" fontSize="10" fontWeight="800" fill="#2b2a30">
            0
          </text>
          <text x={SCALE_PX_PER_CM * 4} y="-4" fontSize="10" fontWeight="800" fill="#2b2a30" textAnchor="middle">
            40 m
          </text>
        </g>
      </svg>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3">
        <Btn on={mode === "dir"} onClick={() => setMode("dir")}>
          🧭 Directions
        </Btn>
        <Btn on={mode === "measure"} onClick={() => (setMode("measure"), setPicks([]))}>
          📏 Measure
        </Btn>
        <Btn on={mode === "sym"} onClick={() => setMode("sym")}>
          🔣 Symbols
        </Btn>
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        {mode === "dir" && (
          <div>
            <p className="font-display text-lg font-bold">{QUESTIONS[qi].q}</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {QUESTIONS[qi].options.map((o) => (
                <button
                  key={o}
                  onClick={() => answer(o)}
                  className={`press rounded-2xl py-3 text-lg font-extrabold ring-1 ${solved.includes(qi) && o === QUESTIONS[qi].a ? "bg-[#1fb88a]/25 ring-[#1fb88a]" : wrong === o ? "animate-[shake_.4s] bg-[#c4552b]/20 ring-[#c4552b]" : "bg-white/5 ring-white/10"}`}
                >
                  {o}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs font-bold text-white/50">
              Question {qi + 1} of {QUESTIONS.length} · {solved.length} solved
            </p>
          </div>
        )}
        {mode === "measure" && (
          <div className="grid grid-cols-2 gap-2">
            <Readout label="On the map" value={cm ? `${cm.toFixed(1)} cm` : "–"} />
            <Readout label="On the ground" value={cm ? `≈ ${Math.round(cm * M_PER_CM)} m` : "–"} color="#5fe0a0" />
          </div>
        )}
        {mode === "sym" && (
          <div className="flex flex-wrap gap-1.5">
            {SYMBOLS.map((s) => (
              <Btn key={s.id} on={sym === s.id} onClick={() => tapSym(s.id)}>
                {s.label}
              </Btn>
            ))}
          </div>
        )}
      </div>
    </Stage>
  );
}

function SketchPlan({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Sketches, plans, scales and colours. Solve these puzzles."
      cases={[
        { id: "sketch", icon: "✏️", prompt: "A rough drawing made from memory and observation, not to scale, is a…", options: ["Sketch", "Plan", "Physical map"], answer: 0, explain: "A sketch is drawn mainly from memory and spot observation, not to scale.", disc: "sketch" },
        { id: "plan", icon: "📐", prompt: "A drawing of a small area, like your classroom, on a large scale is a…", options: ["Plan", "Globe", "Thematic map"], answer: 0, explain: "A plan shows a small area on a large scale, with the real lengths and breadths of things.", disc: "plan" },
        { id: "large", icon: "🔍", prompt: "Which gives more information: a large-scale map or a small-scale map?", options: ["Large-scale map", "Small-scale map"], answer: 0, explain: "A large scale shows a small area (like a village) in detail — e.g. 5 cm for 500 m. A small scale shows large areas (like countries) — e.g. 5 cm for 500 km.", disc: "scale" },
        { id: "colour", icon: "🎨", prompt: "On maps, which colour is generally used for mountains?", options: ["Brown", "Blue", "Green"], answer: 0, explain: "Generally: blue for water bodies, brown for mountains, yellow for plateaus and green for plains.", disc: "colours" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "gmaps",
  subject: "Geography",
  n: 4,
  title: "Maps",
  pages: "23–29",
  icon: "🗺",
  theme: { grad: "linear-gradient(135deg,#2a1d06 0%,#8a6a2a 55%,#7fc38a 130%)", accent: "#8a5f1c", soft: "#f6ecd6", ink: "#5a3d0e" },
  opening: "A globe shows the whole earth, but you can't fold it into your bag — and it can't show your street. How can we show the world on flat paper?",
  stops: [
    {
      id: "types",
      icon: "🗺",
      title: "Why maps?",
      pages: "23–24",
      wonder: {
        q: "If you cut an old rubber ball and try to flatten it, what happens to drawings on it?",
        options: [
          { id: "same", label: "They stay exactly the same" },
          { id: "distort", label: "They get stretched and distorted" },
          { id: "vanish", label: "They disappear" },
        ],
        answer: "distort",
        reveal: "They get distorted — a round shape can never be flattened perfectly. Still, maps are very useful.",
      },
      explore: { activity: "Physical, political and thematic maps", title: "Kinds of maps", how: "Sort what each kind of map shows.", Sim: MapTypes },
      discoveries: [
        { id: "phys", text: "Physical maps show natural features" },
        { id: "pol", text: "Political maps show countries, states and cities" },
        { id: "them", text: "Thematic maps focus on one kind of information" },
      ],
      understand: [
        { title: "What is a map?", body: "A drawing of the earth's surface, or part of it, on a flat surface according to a scale." },
        { title: "Maps vs globe", body: "A globe is useful for the whole earth. To study a country, district or village, we use maps — they give more information." },
        { title: "Atlas", body: "Many maps put together make an atlas." },
      ],
      check: [{ id: "gp1", kind: "mcq", q: "Maps showing the distribution of forests are…", options: ["Thematic maps", "Physical maps", "Political maps"], answer: 0, why: "They focus on one specific theme." }],
      connect: [
        { icon: "📱", title: "Phone maps", body: "Map apps can switch between road, satellite and terrain views." },
        { icon: "📚", title: "Your atlas", body: "Find a physical and a political map of India in an atlas." },
        { icon: "🏏", title: "Theme it", body: "What thematic map would you like to make?" },
      ],
    },
    {
      id: "village",
      icon: "🧭",
      title: "Read a map",
      pages: "24–27",
      wonder: {
        q: "The three components of a map are…",
        options: [
          { id: "dds", label: "Distance, direction and symbol" },
          { id: "cc", label: "Colours, countries and capitals" },
          { id: "ll", label: "Latitude, longitude and language" },
        ],
        answer: "dds",
        reveal: "Distance (using a scale), direction (using the north line) and symbols.",
      },
      explore: { activity: "Figure 4.1", title: "The village map lab", how: "Find directions, measure distances using the scale, and explore the symbols.", Sim: VillageMap },
      discoveries: [
        { id: "cardinal", text: "The four cardinal directions: North, South, East, West" },
        { id: "intermediate", text: "Intermediate directions: NE, SE, SW, NW" },
        { id: "scale", text: "A scale turns map distances into real distances" },
        { id: "symbols", text: "Conventional symbols and colours carry lots of information" },
      ],
      understand: [
        { title: "Scale", body: "Scale is the ratio between the actual distance on the ground and the distance on the map. 2 cm for 10 km means 1 cm = 5 km." },
        { title: "Direction", body: "Most maps have an arrow marked N in the upper right corner — the north line. A compass's magnetic needle always points north–south." },
        { title: "Symbols", body: "Buildings, roads, bridges, trees, railway lines and wells are shown with symbols. Conventional symbols are agreed internationally — maps have a universal language." },
      ],
      check: [
        { id: "gp2", kind: "mcq", q: "A compass is used to…", options: ["Find the main directions", "Show symbols", "Measure distance"], answer: 0, why: "Its needle always points north–south." },
        { id: "gp3", kind: "mcq", q: "Blue colour on a map shows…", options: ["Water bodies", "Mountains", "Plains"], answer: 0, why: "Blue is generally used for water." },
      ],
      connect: [
        { icon: "🏫", title: "Your school", body: "Draw a sketch of your school showing the library, playground and drinking water." },
        { icon: "🧭", title: "Use a compass", body: "Which direction does your front door face?" },
        { icon: "🚶", title: "Walking distance", body: "The road distance is often longer than the straight-line distance on the map." },
      ],
    },
    {
      id: "plans",
      icon: "📐",
      title: "Sketches and plans",
      pages: "26–27",
      wonder: {
        q: "You draw your classroom showing the teacher's table, desks, door and windows to scale. What have you made?",
        options: [
          { id: "plan", label: "A plan" },
          { id: "globe", label: "A globe" },
          { id: "atlas", label: "An atlas" },
        ],
        answer: "plan",
        reveal: "A plan — a drawing of a small area on a large scale.",
      },
      explore: { activity: "Sketch and plan", title: "Map puzzles", how: "Solve these puzzles about sketches, plans, scale and colours.", Sim: SketchPlan },
      discoveries: [
        { id: "sketch", text: "A sketch is drawn from memory, not to scale" },
        { id: "plan", text: "A plan shows a small area on a large scale" },
        { id: "scale", text: "Large-scale maps give more detail than small-scale maps" },
        { id: "colours", text: "Blue water, brown mountains, yellow plateaus, green plains" },
      ],
      understand: [
        { title: "Sketch", body: "A drawing mainly based on memory and spot observation, not to scale." },
        { title: "Plan", body: "A drawing of a small area on a large scale." },
      ],
      check: [{ id: "gp4", kind: "mcq", q: "A scale is necessary for…", options: ["A map", "A sketch", "Symbols"], answer: 0, why: "Maps are always drawn to scale; sketches are not." }],
      connect: [
        { icon: "🎡", title: "Fun park plan", body: "Make a plan of a fun park with swings, slides and a merry-go-round." },
        { icon: "🏠", title: "Your home", body: "Draw a plan of your room with a scale." },
        { icon: "🗺", title: "Treasure map", body: "Make a treasure map for a friend using directions and a scale." },
      ],
    },
  ],
  learnt: [
    "A map is a drawing of the earth's surface, or a part of it, on a flat surface according to a scale.",
    "Maps are physical, political or thematic.",
    "The three components of maps are distance, direction and symbols.",
    "A sketch is not drawn to scale; a plan shows a small area on a large scale.",
  ],
  keywords: ["Map", "Atlas", "Physical map", "Political map", "Thematic map", "Scale", "Cardinal points", "Compass", "Conventional symbols", "Sketch", "Plan"],
};

export default chapter;
