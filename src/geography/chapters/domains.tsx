// Geography Chapter 5 · Major Domains of the Earth (NCERT The Earth: Our Habitat, 2020-21, pp. 30–38).
// Wording is original; facts follow the textbook.
import { useState } from "react";
import { ExploreLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";
import { CONTINENTS, flat, flatPath } from "../world";

/* Stop 1 · four domains */
function Domains() {
  return (
    <g>
      <rect width="520" height="320" fill="#8fc8ef" />
      <circle cx="450" cy="50" r="24" fill="#ffd257" />
      <ellipse cx="120" cy="60" rx="50" ry="16" fill="#fff" opacity=".85" />
      <path d="M0 210 L90 120 L150 170 L220 110 L300 200 Z" fill="#8a6a3a" />
      <path d="M200 125 L220 110 L240 125 Z" fill="#f4f8ff" />
      <rect y="200" width="300" height="120" fill="#7a5530" />
      <path d="M300 200 Q 410 190 520 205 V320 H300 Z" fill="#2f78b8" />
      <path d="M310 230 q14 -6 28 0 t28 0 M380 260 q14 -6 28 0 t28 0" stroke="#bfe6ee" strokeWidth="2" fill="none" />
      {[60, 110, 160].map((x) => (
        <g key={x}>
          <rect x={x - 3} y="182" width="6" height="22" fill="#6b4520" />
          <circle cx={x} cy="174" r="14" fill="#3f8f50" />
        </g>
      ))}
      <text x="250" y="190" fontSize="22">🦌</text>
      <text x="420" y="250" fontSize="22">🐟</text>
    </g>
  );
}
function DomainsExplore({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Life exists where land, water and air meet. Tap each glowing domain."
      viewBox="0 0 520 320"
      art={<Domains />}
      spots={[
        { id: "litho", label: "Lithosphere", x: 150, y: 260, text: "The solid part of the earth — rocks of the earth's crust and thin layers of soil with nutrients. Lithos means stone." },
        { id: "hydro", label: "Hydrosphere", x: 420, y: 290, text: "All the water on the earth: oceans, rivers, lakes, ice in glaciers, underground water and water vapour. Hudor means water." },
        { id: "atmo", label: "Atmosphere", x: 330, y: 60, text: "The layers of gases around the earth — oxygen, nitrogen, carbon dioxide and others. Atmos means vapour." },
        { id: "bio", label: "Biosphere", x: 250, y: 182, text: "The narrow zone where land, water and air meet and interact. All forms of life are found here. Bios means life." },
      ]}
      groups={{ litho: ["litho"], hydro: ["hydro"], atmo: ["atmo"], bio: ["bio"] }}
    />
  );
}

/* Stop 2 · continents and oceans */
const CONT_INFO: Record<string, string> = {
  asia: "The largest continent — about one-third of the earth's land. It's in the Eastern Hemisphere and the Tropic of Cancer passes through it. The Ural mountains separate it from Europe.",
  europe: "Much smaller than Asia, to its west. The Arctic Circle passes through it. Water bodies bound it on three sides. Europe + Asia = Eurasia.",
  africa: "The second largest. The only continent crossed by the Tropic of Cancer, the Equator and the Tropic of Capricorn. Home to the Sahara, the largest hot desert, and the Nile, the longest river.",
  northAmerica: "The third largest, entirely in the Northern and Western Hemispheres. It is linked to South America by the narrow Isthmus of Panama.",
  southAmerica: "Mostly in the Southern Hemisphere. The Andes — the world's longest mountain range — run through it, and it has the world's largest river, the Amazon.",
  australia: "The smallest continent, entirely in the Southern Hemisphere. Surrounded by water, it is called an island continent.",
  antarctica: "Completely in the Southern Hemisphere, with the South Pole near its centre. Covered with thick ice sheets; no permanent settlements. India has research stations there: Maitri and Dakshin Gangotri.",
  greenland: "Greenland is a large island, not a continent.",
};
const OCEANS = [
  { id: "pacific", name: "Pacific Ocean", lon: -150, lat: 5, text: "The largest ocean, spread over one-third of the earth and almost circular. The Mariana Trench, the deepest part of the earth (11,022 m), lies here." },
  { id: "atlantic", name: "Atlantic Ocean", lon: -32, lat: 15, text: "The second largest, 'S'-shaped. Its indented coastline makes it ideal for harbours; it is the busiest ocean for trade." },
  { id: "indian", name: "Indian Ocean", lon: 78, lat: -18, text: "The only ocean named after a country — India. It is almost triangular, bounded by Asia, Africa and Australia." },
  { id: "southern", name: "Southern Ocean", lon: 40, lat: -60, text: "It encircles Antarctica and extends northward to 60° S." },
  { id: "arctic", name: "Arctic Ocean", lon: -10, lat: 80, text: "Within the Arctic Circle, surrounding the North Pole. It connects with the Pacific through the shallow Bering Strait." },
];
function WorldExplorer({ discover }: SimProps) {
  const [sel, setSel] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const W = 520;
  const H = 260;
  function pick(id: string) {
    setSel(id);
    const s = [...new Set([...seen, id])];
    setSeen(s);
    if (s.includes("asia")) discover("asia");
    if (s.includes("africa")) discover("africa");
    if (s.includes("australia") && s.includes("antarctica")) discover("south");
    if (OCEANS.filter((o) => s.includes(o.id)).length >= 3) discover("oceans");
  }
  const ocean = OCEANS.find((o) => o.id === sel);
  return (
    <Stage
      caption={
        sel ? (
          <span>
            <b className="text-[#ffd257]">{ocean ? ocean.name : CONTINENTS[sel].name}:</b> {ocean ? ocean.text : CONT_INFO[sel]}
          </span>
        ) : (
          "Seven continents and five oceans. Tap a continent or an ocean label."
        )
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full select-none">
        <rect width={W} height={H} fill="#1f6fa8" />
        {Object.entries(CONTINENTS).map(([k, c]) => (
          <path key={k} d={flatPath(c.pts, W, H)} fill={c.color} stroke={sel === k ? "#fff" : "#00000033"} strokeWidth={sel === k ? 3 : 1} onClick={() => pick(k)} style={{ cursor: "pointer" }} role="button" aria-label={c.name} />
        ))}
        {OCEANS.map((o) => {
          const p = flat(o.lon, o.lat, W, H);
          return (
            <g key={o.id} onClick={() => pick(o.id)} style={{ cursor: "pointer" }} role="button" aria-label={o.name}>
              <rect x={p.x - 44} y={p.y - 10} width="88" height="18" rx="9" fill={sel === o.id ? "#ffd257" : "#0d3f6b"} opacity=".9" />
              <text x={p.x} y={p.y + 3} fontSize="9.5" fontWeight="900" fill={sel === o.id ? "#0d3f6b" : "#cfefff"} textAnchor="middle">
                {o.name.replace(" Ocean", "").toUpperCase()}
              </text>
            </g>
          );
        })}
        <text x={W - 6} y={H - 6} fontSize="10" fontWeight="800" fill="#ffffffaa" textAnchor="end">Sketch map · not to scale</text>
      </svg>
      <div className="grid grid-cols-2 gap-2 border-t border-white/10 px-4 py-3">
        <Readout label="Highest: Mt. Everest" value="8,848 m" color="#ffd257" />
        <Readout label="Deepest: Mariana Trench" value="11,022 m" color="#7fd0ff" />
      </div>
    </Stage>
  );
}

/* Stop 3 · the atmosphere */
const LAYERS = [
  { id: "tropo", name: "Troposphere", color: "#5aa9e6" },
  { id: "strato", name: "Stratosphere", color: "#3f7fc8" },
  { id: "meso", name: "Mesosphere", color: "#2f5aa8" },
  { id: "thermo", name: "Thermosphere", color: "#253f86" },
  { id: "exo", name: "Exosphere", color: "#1a2a5c" },
];
function Atmosphere({ discover }: SimProps) {
  const [alt, setAlt] = useState(0); // 0..1 up the mountain
  const [layer, setLayer] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [mix, setMix] = useState(false);
  const [wind, setWind] = useState(false);
  function pickLayer(id: string) {
    setLayer(id);
    const s = [...new Set([...seen, id])];
    setSeen(s);
    if (s.length === 5) discover("layers");
  }
  const dots = Math.round(40 * (1 - alt * 0.85));
  return (
    <Stage
      caption={
        wind
          ? "Air presses on the earth. Some areas have high pressure, others low. Air moves from high pressure to low pressure — moving air is wind."
          : mix
            ? "Clean, dry air is about 78% nitrogen and 21% oxygen. The remaining 1% includes carbon dioxide and argon. Carbon dioxide absorbs heat from the earth and keeps the planet warm."
            : alt > 0.6
              ? "High up, the air is thin — less dense — and colder. Mountaineers carry oxygen cylinders to breathe."
              : layer
                ? `${LAYERS.find((l) => l.id === layer)!.name}: one of the five layers of the atmosphere, which extends up to about 1,600 km.`
                : "Tap each layer of the atmosphere, then climb the mountain to feel the air change."
      }
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[150px_1fr]">
        <div className="flex flex-col-reverse overflow-hidden rounded-2xl ring-1 ring-white/10">
          {LAYERS.map((l) => (
            <button key={l.id} onClick={() => pickLayer(l.id)} className={`press px-3 py-2.5 text-left text-xs font-extrabold ${layer === l.id ? "ring-2 ring-[#ffd257]" : ""}`} style={{ background: l.color }}>
              {seen.includes(l.id) ? "✓ " : ""}
              {l.name}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 300 220" className="block h-auto w-full rounded-2xl">
          <rect width="300" height="220" fill="#8fc8ef" />
          <path d="M0 220 L150 30 L300 220 Z" fill="#8a6a3a" />
          <path d="M126 60 L150 30 L174 60 Z" fill="#f4f8ff" />
          {Array.from({ length: dots }, (_, i) => (
            <circle key={i} cx={20 + ((i * 53) % 260)} cy={20 + ((i * 37) % 70) + (1 - alt) * 100} r="2.4" fill="#ffffff" opacity=".8" />
          ))}
          <text x={150 + (1 - alt) * 110} y={210 - alt * 170} fontSize="22" textAnchor="middle">
            🧗
          </text>
          <text x="8" y="16" fontSize="11" fontWeight="900" fill="#0d3f6b">
            {alt > 0.6 ? "thin, cold air" : "dense, warm air"}
          </text>
        </svg>
      </div>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Climb</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={alt}
            onChange={(e) => {
              setAlt(+e.target.value);
              if (+e.target.value > 0.6) discover("thin");
            }}
            className="w-full accent-[#ffd257]"
            aria-label="Altitude"
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          <Btn on={mix} onClick={() => (setMix(true), setWind(false), discover("mix"))}>
            🧪 What's in the air?
          </Btn>
          <Btn on={wind} onClick={() => (setWind(true), setMix(false), discover("wind"))}>
            🌬 What makes wind?
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

const chapter: Chapter = {
  id: "gdomains",
  subject: "Geography",
  n: 5,
  title: "Major Domains of the Earth",
  pages: "30–38",
  icon: "🌍",
  theme: { grad: "linear-gradient(135deg,#052a3a 0%,#11789a 55%,#8fd07a 130%)", accent: "#11789a", soft: "#dcf2f6", ink: "#0a5068" },
  opening: "The earth is the only planet with life. Land, water and air come together here. Where exactly do they meet — and what does each one do?",
  stops: [
    {
      id: "four",
      icon: "🧩",
      title: "Four domains",
      pages: "30–31",
      wonder: {
        q: "Where on earth is life found?",
        options: [
          { id: "zone", label: "In a narrow zone where land, water and air meet" },
          { id: "everywhere", label: "Everywhere, even deep inside the earth" },
          { id: "sea", label: "Only in the sea" },
        ],
        answer: "zone",
        reveal: "In the biosphere — the narrow zone where land, water and air meet and interact.",
      },
      explore: { activity: "Figure 5.6", title: "Land, water, air and life", how: "Tap each glowing part of the scene.", Sim: DomainsExplore },
      discoveries: [
        { id: "litho", text: "Lithosphere: the solid land" },
        { id: "hydro", text: "Hydrosphere: all the water" },
        { id: "atmo", text: "Atmosphere: the layers of air" },
        { id: "bio", text: "Biosphere: where life exists" },
      ],
      understand: [
        { title: "Continents and ocean basins", body: "The two main divisions of the earth's surface are large landmasses (continents) and huge water bodies (ocean basins). All oceans are connected." },
        { title: "Sea level", body: "The level of sea water is the same everywhere, so we measure land height from sea level (zero)." },
        { title: "Not enough fresh water", body: "More than 71% of the earth is covered with water, but more than 97% of it is in salty oceans. Only a very small part is fresh water we can use." },
      ],
      check: [{ id: "gd1", kind: "mcq", q: "The domain where land, water and air meet and life exists is the…", options: ["Biosphere", "Lithosphere", "Hydrosphere"], answer: 0, why: "Bios means life." }],
      connect: [
        { icon: "💧", title: "Save water", body: "We live on a 'blue planet' yet face a shortage of fresh water." },
        { icon: "🔤", title: "Word roots", body: "Make new words from lithos, atmos, hudor and bios." },
        { icon: "🌱", title: "All connected", body: "Polluting air, water or land affects all living things." },
      ],
    },
    {
      id: "world",
      icon: "🗺",
      title: "Continents and oceans",
      pages: "31–35",
      wonder: {
        q: "Which is the only continent crossed by the Tropic of Cancer, the Equator and the Tropic of Capricorn?",
        options: [
          { id: "africa", label: "Africa" },
          { id: "asia", label: "Asia" },
          { id: "sa", label: "South America" },
        ],
        answer: "africa",
        reveal: "Africa! The Equator runs almost through its middle.",
      },
      explore: { activity: "Figure 5.1", title: "World explorer", how: "Tap the continents and the oceans to learn about each.", Sim: WorldExplorer },
      discoveries: [
        { id: "asia", text: "Asia is the largest continent" },
        { id: "africa", text: "Africa is crossed by both Tropics and the Equator" },
        { id: "south", text: "Australia is the island continent; Antarctica is covered in ice" },
        { id: "oceans", text: "Five oceans — the Pacific is the largest" },
      ],
      understand: [
        { title: "Seven continents", body: "Asia, Europe, Africa, North America, South America, Australia and Antarctica. The greater part of the land lies in the Northern Hemisphere." },
        { title: "Five oceans", body: "In order of size: the Pacific, Atlantic, Indian, Southern and Arctic Oceans." },
        { title: "Moving waters", body: "Ocean waters are always moving. The three chief movements are waves, tides and ocean currents." },
        { title: "Top of the world", body: "Edmund Hillary and Tenzing Norgay first climbed Mt. Everest on 29 May 1953. Junko Tabei was the first woman (1975); Bachendri Pal the first Indian woman (1984)." },
      ],
      check: [
        { id: "gd2", kind: "mcq", q: "The mountain range that separates Europe from Asia is the…", options: ["Urals", "Andes", "Himalayas"], answer: 0, why: "The Ural mountains lie on Asia's west." },
        { id: "gd3", kind: "mcq", q: "Which is the largest ocean?", options: ["Pacific", "Atlantic", "Indian"], answer: 0, why: "It covers about one-third of the earth." },
      ],
      connect: [
        { icon: "🏔", title: "Everest vs ocean", body: "The deepest ocean point is deeper than Everest is high!" },
        { icon: "❄️", title: "Maitri", body: "India's research stations in Antarctica are Maitri and Dakshin Gangotri." },
        { icon: "🌊", title: "Strait and isthmus", body: "A strait joins two seas; an isthmus joins two landmasses. Find the strait between India and Sri Lanka." },
      ],
    },
    {
      id: "air",
      icon: "🌬",
      title: "The atmosphere",
      pages: "35–36",
      wonder: {
        q: "Why do mountaineers carry oxygen cylinders on very high mountains?",
        options: [
          { id: "thin", label: "The air is thinner and less dense high up" },
          { id: "smoke", label: "There is smoke on mountains" },
          { id: "habit", label: "Just out of habit" },
        ],
        answer: "thin",
        reveal: "The density of air is greatest at sea level and decreases rapidly as we go up, making breathing hard.",
      },
      explore: { activity: "Figure 5.4", title: "Climb through the air", how: "Tap each layer, climb the mountain, and find out what air is made of.", Sim: Atmosphere },
      discoveries: [
        { id: "layers", text: "Five layers: troposphere, stratosphere, mesosphere, thermosphere, exosphere" },
        { id: "mix", text: "Air is about 78% nitrogen and 21% oxygen" },
        { id: "thin", text: "Higher up, air is thinner and colder" },
        { id: "wind", text: "Air moves from high to low pressure: wind" },
      ],
      understand: [
        { title: "A protective blanket", body: "The atmosphere gives us the air we breathe and protects us from the harmful effects of the sun's rays. It extends to about 1,600 km." },
        { title: "Useful gases", body: "Oxygen is the breath of life; nitrogen helps living things grow; carbon dioxide keeps the earth warm and is essential for plants." },
        { title: "Biosphere", body: "Plants and animals depend on each other and on the earth's domains. Life exists only in the biosphere." },
      ],
      check: [
        { id: "gd4", kind: "mcq", q: "The two main gases in the air are…", options: ["Nitrogen and oxygen", "Oxygen and argon", "Carbon dioxide and hydrogen"], answer: 0, why: "Together they make up about 99% of clean, dry air." },
        { id: "gd5", kind: "tf", q: "The temperature of the air decreases as we go upwards.", answer: true, why: "It gets colder higher up." },
      ],
      connect: [
        { icon: "🧗", title: "Mountaineers", body: "Climbers carry oxygen to breathe at high altitudes." },
        { icon: "🌡", title: "Keeping warm", body: "Carbon dioxide traps heat from the earth." },
        { icon: "🎐", title: "Feel the wind", body: "Watch flags and kites to see the direction the wind blows." },
      ],
    },
  ],
  learnt: [
    "The earth has four domains: lithosphere, hydrosphere, atmosphere and biosphere.",
    "There are seven continents and five oceans; Asia and the Pacific are the largest.",
    "More than 71% of the earth is water, but more than 97% of it is salty.",
    "The atmosphere has five layers; air is mostly nitrogen and oxygen; air density and temperature fall with height.",
    "Air moves from high pressure to low pressure, causing wind.",
  ],
  keywords: ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere", "Continent", "Ocean", "Isthmus", "Strait", "Air pressure", "Wind"],
};

export default chapter;
