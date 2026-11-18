// Geography Chapter 6 · Major Landforms of the Earth (NCERT The Earth: Our Habitat, 2020-21, pp. 39–46).
// Wording is original; facts follow the textbook.
import { useState } from "react";
import { ExploreLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";

/* Stop 1 · explore a landscape */
function Landscape() {
  return (
    <g>
      <rect width="520" height="340" fill="#9fd0f0" />
      {/* mountain with glacier */}
      <path d="M0 230 L70 70 L110 120 L150 40 L230 230 Z" fill="#7d6a52" />
      <path d="M130 70 L150 40 L170 72 Q150 64 130 70 Z" fill="#f4f8ff" />
      <path d="M150 74 Q146 110 156 150" stroke="#dff4ff" strokeWidth="6" fill="none" />
      {/* plateau with waterfall */}
      <path d="M220 230 L250 130 L380 130 L400 230 Z" fill="#c99a5b" />
      <rect x="250" y="128" width="130" height="8" fill="#a07a3a" />
      <path d="M380 140 v80" stroke="#7fd0ff" strokeWidth="6" />
      {/* plain with river */}
      <rect x="0" y="228" width="520" height="112" fill="#8fcf6a" />
      <path d="M156 150 C 170 240, 260 250, 340 270 S 470 300, 520 300" stroke="#4fa3d8" strokeWidth="9" fill="none" />
      <path d="M380 220 C 400 240, 430 250, 470 262" stroke="#4fa3d8" strokeWidth="6" fill="none" />
      {[300, 330, 450, 480].map((x, i) => (
        <rect key={i} x={x} y={300 - (i % 2) * 10} width="14" height="10" fill="#b8452a" />
      ))}
      {/* elevation chart */}
      <g transform="translate(410 20)">
        <rect width="104" height="96" rx="8" fill="#ffffffcc" />
        {[
          ["Everest", 8848, "#7d6a52"],
          ["Tibet", 5000, "#c99a5b"],
          ["Plains", 200, "#8fcf6a"],
        ].map(([n, h, c], i) => (
          <g key={n as string}>
            <rect x={10 + i * 32} y={84 - ((h as number) / 8848) * 60} width="22" height={((h as number) / 8848) * 60} fill={c as string} />
            <text x={21 + i * 32} y="93" fontSize="7" fontWeight="800" fill="#2b2a30" textAnchor="middle">
              {n}
            </text>
          </g>
        ))}
        <text x="52" y="14" fontSize="8" fontWeight="900" fill="#2b2a30" textAnchor="middle">
          Height (m)
        </text>
      </g>
    </g>
  );
}
function TerrainExplore({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Tap the glowing spots to explore mountains, plateaus and plains."
      viewBox="0 0 520 340"
      art={<Landscape />}
      spots={[
        { id: "peak", label: "Mountain", x: 110, y: 150, text: "A natural elevation much higher than the surrounding area, with a small summit and broad base. Generally, a steep hill more than 600 m high is called a mountain. It gets colder as you go higher." },
        { id: "glacier", label: "Glacier", x: 150, y: 90, text: "Permanently frozen rivers of ice on some mountains. Many rivers start from glaciers." },
        { id: "plateau", label: "Plateau", x: 310, y: 150, text: "An elevated flat land — a flat-topped table land standing above the surrounding area, with one or more steep sides." },
        { id: "fall", label: "Waterfall", x: 380, y: 190, text: "On plateaus, rivers may fall from a great height, forming waterfalls — like Hundru Falls on the Subarnarekha and Jog Falls in Karnataka." },
        { id: "plain", label: "Plain", x: 220, y: 300, text: "Large stretches of flat land, generally not more than 200 m above mean sea level. Most are formed by rivers depositing stones, sand and silt." },
        { id: "chart", label: "Heights compared", x: 462, y: 68, text: "Mt. Everest is 8,848 m high; the Tibet plateau is 4,000–6,000 m; plains are generally under 200 m. Mauna Kea, an undersea mountain near Hawaii, is 10,205 m — taller than Everest!" },
      ]}
      groups={{ mountain: ["peak", "glacier"], plateau: ["plateau", "fall"], plain: ["plain"], compare: ["chart"] }}
    />
  );
}

/* Stop 2 · how mountains form */
type Kind = "fold" | "block" | "volcano";
function MakeMountain({ discover }: SimProps) {
  const [kind, setKind] = useState<Kind>("fold");
  const [push, setPush] = useState(0);
  function set(k: Kind) {
    setKind(k);
    setPush(0);
  }
  function slide(v: number) {
    setPush(v);
    if (v >= 0.8) discover(kind);
  }
  const amp = push * 70;
  return (
    <Stage
      caption={
        kind === "fold"
          ? push >= 0.8
            ? "Pushed from both sides, the layers fold up into peaks — a fold mountain! The Himalayas and the Alps are young fold mountains; the Aravalis are among the oldest in the world."
            : "Like pushing a pile of paper from both sides… slide to push the layers of rock together."
          : kind === "block"
            ? push >= 0.8
              ? "Large areas broke and moved vertically. The raised blocks are horsts; the lowered ones are graben. The Rhine valley and the Vosges mountains in Europe are examples."
              : "Slide to make the land crack and move up and down."
            : push >= 0.8
              ? "Volcanic eruptions piled up lava and ash into a cone — a volcanic mountain, like Mt. Kilimanjaro in Africa and Mt. Fujiyama in Japan."
              : "Slide to make the volcano erupt again and again."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#9fd0f0" />
        {kind === "fold" &&
          [0, 1, 2, 3].map((i) => {
            const y = 150 + i * 22;
            const left = 40 + push * 60;
            const right = 480 - push * 60;
            const mid = (left + right) / 2;
            return (
              <path
                key={i}
                d={`M${left} ${y} Q ${(left + mid) / 2} ${y - amp} ${mid} ${y - amp * 0.2} T ${right} ${y}`}
                stroke={["#c99a5b", "#a07a3a", "#7d6a52", "#5a4a38"][i]}
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        {kind === "fold" && (
          <>
            <text x={20 + push * 60} y="120" fontSize="28">👉</text>
            <text x={470 - push * 60} y="120" fontSize="28">👈</text>
          </>
        )}
        {kind === "block" && (
          <g>
            <rect x="20" y={140 - push * 40} width="150" height="120" fill="#a07a3a" />
            <rect x="185" y={140 + push * 40} width="150" height="120" fill="#7d6a52" />
            <rect x="350" y={140 - push * 40} width="150" height="120" fill="#a07a3a" />
            <path d="M177 100 V260 M343 100 V260" stroke="#2b2a30" strokeWidth="3" strokeDasharray="6 5" />
            {push >= 0.5 && (
              <>
                <text x="95" y={130 - push * 40} fontSize="13" fontWeight="900" fill="#2b2a30" textAnchor="middle">horst</text>
                <text x="260" y={130 + push * 40} fontSize="13" fontWeight="900" fill="#2b2a30" textAnchor="middle">graben</text>
                <text x="425" y={130 - push * 40} fontSize="13" fontWeight="900" fill="#2b2a30" textAnchor="middle">horst</text>
              </>
            )}
          </g>
        )}
        {kind === "volcano" && (
          <g>
            <rect y="230" width="520" height="30" fill="#7d6a52" />
            <path d={`M${260 - 40 - push * 150} 232 L${260 - 18} ${232 - 20 - push * 160} L${260 + 18} ${232 - 20 - push * 160} L${260 + 40 + push * 150} 232 Z`} fill="#5a4a38" />
            {push > 0.1 && (
              <g>
                <path d={`M242 ${212 - push * 160} q18 -30 36 0`} fill="#ff6a2a" className="animate-glow" />
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={250 + i * 10} cy={190 - push * 160} r={8 + i * 2} fill="#8d8a80" opacity=".6" style={{ animation: `zrise 2s ease-out ${i * 0.4}s infinite` }} />
                ))}
              </g>
            )}
          </g>
        )}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">{kind === "fold" ? "Push" : kind === "block" ? "Crack & shift" : "Erupt"}</span>
          <input type="range" min={0} max={1} step={0.05} value={push} onChange={(e) => slide(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Mountain-building force" />
        </label>
        <div className="flex flex-wrap gap-1.5">
          <Btn on={kind === "fold"} onClick={() => set("fold")}>
            〰 Fold
          </Btn>
          <Btn on={kind === "block"} onClick={() => set("block")}>
            ▭ Block
          </Btn>
          <Btn on={kind === "volcano"} onClick={() => set("volcano")}>
            🌋 Volcanic
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · landforms and the people */
function UsesSort({ discover }: SimProps) {
  const items = [
    { id: "glacier", label: "Glaciers feed rivers", bin: "mtn", why: "Mountains are a storehouse of water; many rivers start in glaciers." },
    { id: "hydel", label: "Hydro-electricity", bin: "mtn", why: "Mountain water is harnessed for irrigation and hydro-electricity." },
    { id: "ski", label: "Skiing and paragliding", bin: "mtn", why: "Adventure sports are popular in the mountains." },
    { id: "minerals", label: "Rich in minerals", bin: "plat", why: "Many mining areas are on plateaus: gold and diamonds in Africa; iron, coal and manganese in the Chhotanagpur plateau." },
    { id: "black", label: "Black soil on lava plateaus", bin: "plat", why: "Lava plateaus have fertile black soil." },
    { id: "falls", label: "Waterfalls", bin: "plat" },
    { id: "crowded", label: "Most densely populated", bin: "plain", why: "Plains have fertile soil and easy transport, so many people live there — like the Indo-Gangetic plains." },
    { id: "roads", label: "Easy to build roads and houses", bin: "plain" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="How do people use each landform? Sort these."
      bins={[
        { id: "mtn", label: "Mountains", icon: "⛰", color: "#c9b79c" },
        { id: "plat", label: "Plateaus", icon: "🏜", color: "#e8b46a" },
        { id: "plain", label: "Plains", icon: "🌾", color: "#8fcf6a" },
      ]}
      items={items}
      rules={[
        { id: "mtn", when: (p) => all(p, "mtn") },
        { id: "plat", when: (p) => all(p, "plat") },
        { id: "plain", when: (p) => all(p, "plain") },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "glandforms",
  subject: "Geography",
  n: 6,
  title: "Major Landforms of the Earth",
  pages: "39–46",
  icon: "⛰",
  theme: { grad: "linear-gradient(135deg,#2a1a0a 0%,#7d6a52 50%,#8fcf6a 125%)", accent: "#6e5a3c", soft: "#efe8dc", ink: "#4a3a22" },
  opening: "The ground you stand on is slowly moving! Why is the earth's surface rugged in some places and flat in others?",
  stops: [
    {
      id: "explore",
      icon: "🏞",
      title: "Mountains, plateaus and plains",
      pages: "39–43",
      wonder: {
        q: "What is a plateau?",
        options: [
          { id: "flat", label: "An elevated flat land, like a table" },
          { id: "valley", label: "A deep valley" },
          { id: "peak", label: "A pointed mountain peak" },
        ],
        answer: "flat",
        reveal: "A flat-topped table land standing above the surrounding area.",
      },
      explore: { activity: "Figure 6.1", title: "Landscape explorer", how: "Tap each feature of the landscape.", Sim: TerrainExplore },
      discoveries: [
        { id: "mountain", text: "Mountains are high, often with glaciers" },
        { id: "plateau", text: "Plateaus are raised flat lands, often with waterfalls" },
        { id: "plain", text: "Plains are flat lands formed by rivers" },
        { id: "compare", text: "Everest 8,848 m; Tibet plateau 4,000–6,000 m; plains under 200 m" },
      ],
      understand: [
        { title: "Two processes", body: "Internal processes lift up or sink parts of the earth's surface. External processes wear down and rebuild it." },
        { title: "Erosion and deposition", body: "The wearing away of the surface is erosion; rebuilding is deposition. Running water, ice and wind do this work." },
        { title: "Plateaus of the world", body: "The Deccan plateau is one of the oldest. The Tibet plateau is the highest in the world." },
        { title: "Great plains", body: "Some of the largest river plains are in Asia and North America — like the plains of the Ganga and Brahmaputra, and the Yangtze." },
      ],
      check: [
        { id: "gl1", kind: "mcq", q: "Plains are generally not more than ______ above sea level.", options: ["200 m", "2,000 m", "8,000 m"], answer: 0, why: "Plains are large, low, flat stretches of land." },
        { id: "gl2", kind: "mcq", q: "The wearing away of the earth's surface is called…", options: ["Erosion", "Deposition", "Eruption"], answer: 0, why: "Deposition is the rebuilding." },
      ],
      connect: [
        { icon: "🏔", title: "Hill stations", body: "People visit the mountains for their beauty and cool climate." },
        { icon: "💦", title: "Waterfalls", body: "Find Jog Falls and Hundru Falls on a map." },
        { icon: "🚜", title: "Farming", body: "Plains are easy to farm, so they feed many people." },
      ],
    },
    {
      id: "mountains",
      icon: "🌋",
      title: "How mountains form",
      pages: "40–41",
      wonder: {
        q: "Push a pile of paper sheets from both sides. What happens?",
        options: [
          { id: "fold", label: "They fold and rise into a peak" },
          { id: "flat", label: "They stay flat" },
          { id: "tear", label: "They tear into pieces" },
        ],
        answer: "fold",
        reveal: "They fold and rise into a peak — the same way the Himalayas and the Alps were formed!",
      },
      explore: { activity: "Let's Do (Making of a mountain)", title: "Mountain maker", how: "Choose a type of mountain and use the slider to build it.", Sim: MakeMountain },
      discoveries: [
        { id: "fold", text: "Fold mountains: rock layers pushed into folds" },
        { id: "block", text: "Block mountains: horsts rise, graben sink" },
        { id: "volcano", text: "Volcanic mountains: built by eruptions" },
      ],
      understand: [
        { title: "Ranges", body: "Mountains in a line form a range. The Himalayas, Alps and Andes are ranges in Asia, Europe and South America." },
        { title: "Young and old", body: "Young fold mountains have rugged relief and high conical peaks. Old ones, like the Appalachians and Urals, are rounded and low." },
        { title: "Useful mountains", body: "Mountains store water, have rich plant and animal life, provide forest products, and attract tourists." },
      ],
      check: [{ id: "gl3", kind: "mcq", q: "Mt. Kilimanjaro and Mt. Fujiyama are…", options: ["Volcanic mountains", "Block mountains", "Fold mountains"], answer: 0, why: "They were formed by volcanic activity." }],
      connect: [
        { icon: "📄", title: "Paper mountains", body: "Try the paper-pushing experiment at home." },
        { icon: "🏔", title: "Young mountains", body: "The Himalayas and the Alps are young fold mountains with high, conical peaks." },
        { icon: "🗾", title: "Fujiyama", body: "Mt. Fuji in Japan is a famous volcanic mountain." },
      ],
    },
    {
      id: "people",
      icon: "🏘",
      title: "Landforms and people",
      pages: "41–44",
      wonder: {
        q: "Why do so many people live on plains?",
        options: [
          { id: "flat", label: "Flat, fertile land is easy to farm and build on" },
          { id: "cold", label: "Plains are always cold" },
          { id: "minerals", label: "Plains have the most minerals" },
        ],
        answer: "flat",
        reveal: "Plains have fertile soils and flat land for houses, farms and roads — so they are very thickly populated.",
      },
      explore: { activity: "Landforms and the people", title: "Who uses what?", how: "Sort how people use each landform.", Sim: UsesSort },
      discoveries: [
        { id: "mtn", text: "Mountains give water, power and adventure" },
        { id: "plat", text: "Plateaus are rich in minerals and black soil" },
        { id: "plain", text: "Plains are fertile and densely populated" },
      ],
      understand: [
        { title: "Different lives", body: "Life is difficult in mountains; plains provide much better conditions for crops, houses and roads." },
        { title: "Natural calamities", body: "Earthquakes, volcanic eruptions, storms and floods can cause destruction. Awareness can lower the risks." },
        { title: "Use land wisely", body: "We sometimes waste land — building houses on fertile land, or throwing garbage on land and in water." },
      ],
      check: [{ id: "gl4", kind: "mcq", q: "Iron, coal and manganese are found in India's…", options: ["Chhotanagpur plateau", "Thar desert", "Ganga plains"], answer: 0, why: "Plateaus are rich in minerals." }],
      connect: [
        { icon: "🏡", title: "Your landform", body: "Do you live on a plain, plateau or in the mountains? How does it shape life?" },
        { icon: "🗑", title: "Keep it clean", body: "Don't throw garbage on land or in rivers." },
        { icon: "🚨", title: "Be prepared", body: "Learn what to do during an earthquake or flood." },
      ],
    },
  ],
  learnt: [
    "Landforms are shaped by internal processes (uplift and sinking) and external processes (erosion and deposition).",
    "Mountains are much higher than their surroundings; they are fold, block or volcanic.",
    "Plateaus are elevated flat lands, often rich in minerals.",
    "Plains are flat lands, mostly formed by rivers, and are densely populated.",
  ],
  keywords: ["Landform", "Erosion", "Deposition", "Mountain", "Glacier", "Range", "Fold mountain", "Block mountain", "Volcanic mountain", "Plateau", "Plain"],
};

export default chapter;
