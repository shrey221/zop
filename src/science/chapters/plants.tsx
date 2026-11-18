// Chapter 7 · Getting to Know Plants (NCERT Science Class VI, 2018-19, pp. 52–65).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { ExploreLab, SortLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage } from "../ui";

/* Stop 1 · herbs, shrubs and trees */
const PLANTS = [
  { id: "grass", label: "Grass", icon: "🌱", bin: "herb", why: "Short with a green, tender stem — a herb." },
  { id: "wheat", label: "Wheat", icon: "🌾", bin: "herb", why: "A herb: green, tender stem and few branches." },
  { id: "tomato", label: "Tomato plant", icon: "🍅", bin: "herb", why: "A herb with a soft, green stem." },
  { id: "rose", label: "Rose", icon: "🌹", bin: "shrub", why: "A shrub: branches come out near the base; the stem is hard but not very thick." },
  { id: "lemon", label: "Lemon", icon: "🍋", bin: "shrub", why: "A shrub with many branches close to the ground." },
  { id: "hibiscus", label: "China rose", icon: "🌺", bin: "shrub", why: "A bushy shrub." },
  { id: "mango", label: "Mango", icon: "🥭", bin: "tree", why: "A tall tree with a thick, hard, brown trunk; branches start high up." },
  { id: "neem", label: "Neem", icon: "🌳", bin: "tree", why: "A tall tree with a thick trunk." },
  { id: "coconut", label: "Coconut", icon: "🌴", bin: "tree", why: "A tall tree." },
];
const allIn = (p: Record<string, string>, b: string) => PLANTS.filter((x) => x.bin === b).every((x) => p[x.id]);
function PlantSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Look at the height, stem and branches. Tap a plant, then its group."
      bins={[
        { id: "herb", label: "Herbs", icon: "🌱", color: "#5fe0a0" },
        { id: "shrub", label: "Shrubs", icon: "🌹", color: "#ff8ab5" },
        { id: "tree", label: "Trees", icon: "🌳", color: "#ffd257" },
      ]}
      items={PLANTS}
      rules={[
        { id: "herb", when: (p) => allIn(p, "herb") },
        { id: "shrub", when: (p) => allIn(p, "shrub") },
        { id: "tree", when: (p) => allIn(p, "tree") },
      ]}
    />
  );
}

/* Stop 2 · water climbs the stem */
function StemInk({ discover }: SimProps) {
  const [t, setT] = useState(0); // 0..3 (hours, roughly)
  const [cut, setCut] = useState(false);
  useEffect(() => {
    if (t >= 1) discover("rise");
    if (t >= 3) discover("veins");
  }, [t, discover]);
  const top = 236 - t * 52; // how high the colour has climbed
  return (
    <Stage
      caption={
        cut
          ? "A thin slice of the stem shows red dots: the coloured water travels up through tiny tubes inside it."
          : t >= 3
            ? "The red colour reached the veins of the leaves! The stem carries water from the roots to the leaves."
            : t >= 1
              ? "Look — the red water is climbing up the stem."
              : "A soft stem stands in water coloured with red ink. Move time forward."
      }
    >
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none">
        <rect width="520" height="280" fill="#13112b" />
        <path d="M200 170 h90 l-8 100 h-74 z" fill="#cfe8ff" fillOpacity=".1" stroke="#cfe8ff" strokeWidth="3" />
        <path d="M203 196 h84 l-6 72 h-72 z" fill="#e5484d" opacity=".75" />
        {/* stem */}
        <rect x="241" y="40" width="8" height="226" rx="4" fill="#3f8f50" />
        <rect x="242.5" y={Math.max(40, top)} width="5" height={266 - Math.max(40, top)} rx="2" fill="#e5484d" style={{ transition: "all .6s" }} />
        {/* leaves with veins */}
        {[
          { y: 70, dir: -1 },
          { y: 110, dir: 1 },
          { y: 150, dir: -1 },
        ].map(({ y, dir }, i) => {
          const reached = top <= y + 10;
          const cx = 245 + dir * 60;
          return (
            <g key={i}>
              <ellipse cx={cx} cy={y} rx="56" ry="22" fill="#3fae5a" transform={`rotate(${dir * -15} ${cx} ${y})`} />
              <path d={`M245 ${y} L${cx + dir * 50} ${y - dir * 12}`} stroke={reached ? "#e5484d" : "#2f8a4a"} strokeWidth="2.5" style={{ transition: "stroke .6s" }} />
              {[-30, -10, 10].map((o) => (
                <path key={o} d={`M${cx + dir * o} ${y - dir * (o / 4)} l${dir * 14} -12 M${cx + dir * o} ${y - dir * (o / 4)} l${dir * 14} 12`} stroke={reached ? "#e5484d" : "#2f8a4a"} strokeWidth="1.5" style={{ transition: "stroke .6s" }} />
              ))}
            </g>
          );
        })}
        {cut && (
          <g className="animate-pop">
            <circle cx="420" cy="90" r="46" fill="#7fc37a" stroke="#3f8f50" strokeWidth="4" />
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={420 + Math.cos((i / 10) * Math.PI * 2) * 28} cy={90 + Math.sin((i / 10) * Math.PI * 2) * 28} r="4.5" fill="#e5484d" />
            ))}
            <text x="420" y="152" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">stem cut across</text>
          </g>
        )}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Time</span>
          <input type="range" min={0} max={3} step={1} value={t} onChange={(e) => setT(+e.target.value)} className="w-full accent-[#e5484d]" aria-label="Time passed" />
        </label>
        <div>
          <Btn
            on={cut}
            onClick={() => {
              setCut(true);
              if (t >= 1) discover("tubes");
            }}
          >
            🔪 Cut a thin slice of the stem
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · leaf veins and roots */
type P = "tulsi" | "grass";
function LeafRoot({ discover }: SimProps) {
  const [leaf, setLeaf] = useState<P | null>(null);
  const [dug, setDug] = useState<P[]>([]);
  function look(p: P) {
    setLeaf(p);
    discover(p === "tulsi" ? "net" : "parallel");
  }
  function dig(p: P) {
    setDug((d) => [...new Set([...d, p])]);
    discover(p === "tulsi" ? "taproot" : "fibrous");
  }
  const Plant = ({ x, p }: { x: number; p: P }) => (
    <g>
      {dug.includes(p) &&
        (p === "tulsi" ? (
          <g className="animate-fade">
            <path d={`M${x} 200 V275`} stroke="#d9c9a0" strokeWidth="6" />
            {[220, 238, 256].map((y, i) => (
              <path key={y} d={`M${x} ${y} l${i % 2 ? 24 : -24} 14 M${x} ${y + 6} l${i % 2 ? -18 : 18} 12`} stroke="#d9c9a0" strokeWidth="2.5" />
            ))}
          </g>
        ) : (
          <g className="animate-fade">
            {[-30, -18, -8, 0, 8, 18, 30].map((o) => (
              <path key={o} d={`M${x} 200 q${o} 30 ${o * 1.4} 70`} stroke="#d9c9a0" strokeWidth="2.5" fill="none" />
            ))}
          </g>
        ))}
      {p === "tulsi" ? (
        <g>
          <rect x={x - 3} y="110" width="6" height="92" fill="#3f8f50" />
          {[120, 145, 170].map((y) => (
            <g key={y}>
              <ellipse cx={x - 22} cy={y} rx="20" ry="11" fill="#3fae5a" />
              <ellipse cx={x + 22} cy={y} rx="20" ry="11" fill="#3fae5a" />
            </g>
          ))}
        </g>
      ) : (
        <g>
          {[-16, -6, 4, 14].map((o) => (
            <path key={o} d={`M${x} 200 q${o} -50 ${o * 2.2} -96`} stroke="#3fae5a" strokeWidth="6" fill="none" strokeLinecap="round" />
          ))}
        </g>
      )}
    </g>
  );
  return (
    <Stage
      caption={
        leaf === "tulsi"
          ? `Tulsi leaf: the veins form a net on both sides of the midrib — reticulate venation.${dug.includes("tulsi") ? " And it has a taproot: one main root with smaller side roots." : " Now dig up its roots."}`
          : leaf === "grass"
            ? `Grass leaf: the veins run side by side — parallel venation.${dug.includes("grass") ? " Its roots are fibrous: no main root, many similar roots." : " Now dig up its roots."}`
            : "Look closely at each plant's leaf, then dig up its roots."
      }
    >
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none">
        <rect width="520" height="280" fill="#13112b" />
        <rect y="200" width="520" height="80" fill={dug.length ? "#4a3420" : "#6b4a2b"} />
        <Plant x={110} p="tulsi" />
        <Plant x={410} p="grass" />
        <text x="110" y="96" fontSize="12" fontWeight="900" fill="#9da3c7" textAnchor="middle">tulsi</text>
        <text x="410" y="96" fontSize="12" fontWeight="900" fill="#9da3c7" textAnchor="middle">grass</text>
        {leaf && (
          <g key={leaf} className="animate-pop" style={{ transformOrigin: "260px 110px" }}>
            {leaf === "tulsi" ? (
              <g>
                <path d="M200 110 C 220 60, 300 60, 320 110 C 300 160, 220 160, 200 110 Z" fill="#3fae5a" />
                <path d="M185 110 H320" stroke="#e9f7d6" strokeWidth="3" />
                {[220, 245, 270, 295].map((x) => (
                  <g key={x} stroke="#e9f7d6" strokeWidth="1.5">
                    <path d={`M${x} 110 l12 -24 M${x} 110 l12 24`} />
                    <path d={`M${x + 6} 98 l8 4 M${x + 6} 122 l8 -4`} />
                  </g>
                ))}
                <text x="190" y="104" fontSize="10" fill="#fff" fontWeight="800">petiole</text>
                <text x="262" y="78" fontSize="10" fill="#fff" fontWeight="800">lamina</text>
              </g>
            ) : (
              <g>
                <path d="M170 116 C 220 96, 330 96, 350 108 C 330 122, 220 126, 170 116 Z" fill="#3fae5a" />
                {[-6, -2, 2, 6].map((o) => (
                  <path key={o} d={`M178 ${115 + o * 0.6} C 230 ${108 + o}, 300 ${106 + o}, 345 ${109 + o * 0.3}`} stroke="#e9f7d6" strokeWidth="1.3" fill="none" />
                ))}
              </g>
            )}
          </g>
        )}
      </svg>
      <div className="grid grid-cols-2 gap-2 border-t border-white/10 px-4 py-3">
        <div className="grid gap-2">
          <Btn on={leaf === "tulsi"} onClick={() => look("tulsi")}>
            🔍 Tulsi leaf
          </Btn>
          <Btn on={dug.includes("tulsi")} onClick={() => dig("tulsi")}>
            ⛏ Dig up tulsi
          </Btn>
        </div>
        <div className="grid gap-2">
          <Btn on={leaf === "grass"} onClick={() => look("grass")}>
            🔍 Grass leaf
          </Btn>
          <Btn on={dug.includes("grass")} onClick={() => dig("grass")}>
            ⛏ Dig up grass
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 4 · inside a flower */
function FlowerArt() {
  return (
    <g>
      <rect width="520" height="340" fill="#13112b" />
      {/* stalk + sepals */}
      <path d="M260 340 V250" stroke="#3f8f50" strokeWidth="10" />
      <path d="M260 255 C 220 250, 200 230, 196 212 C 225 222, 245 230, 260 240 Z M260 255 C 300 250, 320 230, 324 212 C 295 222, 275 230, 260 240 Z" fill="#3fae5a" />
      {/* petals (cut open) */}
      <path d="M260 240 C 170 230, 120 150, 150 90 C 190 150, 220 200, 256 226 Z" fill="#ff6b8a" />
      <path d="M260 240 C 350 230, 400 150, 370 90 C 330 150, 300 200, 264 226 Z" fill="#ff6b8a" />
      {/* pistil: ovary, style, stigma */}
      <ellipse cx="260" cy="218" rx="22" ry="20" fill="#9bd36a" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={250 + i * 10} cy={218} r="4" fill="#f4f8e8" />
      ))}
      <rect x="257" y="110" width="6" height="92" fill="#9bd36a" />
      <circle cx="260" cy="104" r="10" fill="#c6e86b" />
      {/* stamens */}
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={`M260 210 Q${260 + d * 40} 170 ${260 + d * 52} 130`} stroke="#ffe28a" strokeWidth="3" fill="none" />
          <ellipse cx={260 + d * 54} cy="124" rx="7" ry="11" fill="#f5a524" />
        </g>
      ))}
    </g>
  );
}
function FlowerParts({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="This flower has been cut open. Tap each glowing part."
      viewBox="0 0 520 340"
      art={<FlowerArt />}
      spots={[
        { id: "sepal", label: "Sepals", x: 210, y: 222, text: "The small green leaf-like parts on the outermost side. They protect the flower when it is a bud." },
        { id: "petal", label: "Petals", x: 165, y: 120, text: "The colourful parts. Their colour and number differ from flower to flower." },
        { id: "anther", label: "Anther", x: 314, y: 124, text: "The top of a stamen. Stamens have two parts: the anther and the filament." },
        { id: "filament", label: "Filament", x: 296, y: 160, text: "The stalk of the stamen, holding up the anther." },
        { id: "stigma", label: "Stigma", x: 260, y: 102, text: "The top of the pistil." },
        { id: "style", label: "Style", x: 260, y: 160, text: "The long middle part of the pistil." },
        { id: "ovary", label: "Ovary", x: 236, y: 230, text: "The swollen lowest part of the pistil." },
        { id: "ovule", label: "Ovules", x: 270, y: 218, text: "Small bead-like structures inside the ovary." },
      ]}
      groups={{ outer: ["sepal", "petal"], stamen: ["anther", "filament"], pistil: ["stigma", "style", "ovary"], ovules: ["ovule"] }}
    />
  );
}

const chapter: Chapter = {
  id: "plants",
  n: 7,
  title: "Getting to Know Plants",
  pages: "52–65",
  icon: "🌱",
  theme: { grad: "linear-gradient(135deg,#0b2e1a 0%,#2e8b57 55%,#c5e17a 125%)", accent: "#27774a", soft: "#e0f4e6", ink: "#14532d" },
  opening: "Look around: tiny grasses, bushy roses, giant mango trees. Each plant has roots, a stem, leaves and often flowers. What does each part do?",
  stops: [
    {
      id: "kinds",
      icon: "🌳",
      title: "Herbs, shrubs and trees",
      pages: "52–54",
      wonder: {
        q: "A rose bush has many branches coming out near the ground. What kind of plant is it?",
        options: [
          { id: "herb", label: "A herb" },
          { id: "shrub", label: "A shrub" },
          { id: "tree", label: "A tree" },
        ],
        answer: "shrub",
        reveal: "A shrub: its branches come out near the base, and its stem is hard but not very thick.",
      },
      explore: { activity: "Activity 1", title: "Sort the plants", how: "Group the plants by their height, stem and branches.", Sim: PlantSort },
      discoveries: [
        { id: "herb", text: "Herbs are short, with green, tender stems" },
        { id: "shrub", text: "Shrubs branch out near the base; their stems are hard but not thick" },
        { id: "tree", text: "Trees are tall, with thick brown trunks; branches start high up" },
      ],
      understand: [
        { title: "Herbs", body: "Plants with green and tender stems, usually short and with few branches." },
        { title: "Shrubs", body: "Stems branch out near the base. The stem is hard but not very thick." },
        { title: "Trees", body: "Very tall plants with hard, thick, brown stems. Branches grow in the upper part, high above the ground." },
        { title: "Creepers and climbers", body: "Plants with weak stems that can't stand upright spread on the ground (creepers) or take support to climb (climbers)." },
      ],
      check: [{ id: "k1", kind: "mcq", q: "A plant has a long but weak stem and climbs using support. What is it?", options: ["A climber", "A tree", "A shrub"], answer: 0, why: "Climbers take support from neighbouring structures." }],
      connect: [
        { icon: "🏡", title: "Your neighbourhood", body: "Count the herbs, shrubs and trees on your street." },
        { icon: "🥒", title: "Climbers", body: "Bottle gourd and money plant climb with support." },
        { icon: "🎃", title: "Creepers", body: "Pumpkin plants spread along the ground." },
      ],
    },
    {
      id: "stem",
      icon: "🌿",
      title: "What does a stem do?",
      pages: "54–55",
      wonder: {
        q: "A soft stem with leaves is kept in water coloured with red ink. What will you see the next day?",
        options: [
          { id: "none", label: "Nothing — stems don't take in water" },
          { id: "red", label: "Red colour in the stem and the leaf veins" },
          { id: "flowers", label: "Red flowers" },
        ],
        answer: "red",
        reveal: "The red colour rises up the stem and even appears in the leaf veins: the stem conducts water upwards.",
      },
      explore: { activity: "Activity 2", title: "Coloured water climbs", how: "Move time forward, then cut a thin slice of the stem.", Sim: StemInk },
      discoveries: [
        { id: "rise", text: "Water climbs up the stem" },
        { id: "veins", text: "It reaches the leaves through their veins" },
        { id: "tubes", text: "Tiny tubes inside the stem carry the water" },
      ],
      understand: [
        { title: "A two-way path", body: "The stem conducts water and minerals from the roots to the leaves, and food from the leaves to other parts of the plant." },
        { title: "Holds things up", body: "The stem bears the leaves, flowers and fruits." },
        { title: "Like pipes", body: "Water moves up through narrow tubes inside the stem — just like water in pipes." },
      ],
      check: [{ id: "k2", kind: "tf", q: "The stem absorbs water and minerals from the soil.", answer: false, why: "Roots absorb them; the stem conducts them upwards." }],
      connect: [
        { icon: "🌼", title: "Coloured flowers", body: "Put a white flower in coloured water — the petals change colour!" },
        { icon: "🥬", title: "Celery", body: "In celery stalks you can see the tubes clearly." },
        { icon: "🌧", title: "Watering plants", body: "Water the soil, not the leaves — the roots and stem do the rest." },
      ],
    },
    {
      id: "leafroot",
      icon: "🍃",
      title: "Leaves and roots",
      pages: "56–61",
      wonder: {
        q: "A leaf has veins running side by side (parallel). What kind of roots does the plant probably have?",
        options: [
          { id: "tap", label: "A taproot — one main root" },
          { id: "fibrous", label: "Fibrous roots — many similar roots" },
          { id: "none", label: "No roots" },
        ],
        answer: "fibrous",
        reveal: "Fibrous roots! Plants with parallel venation have fibrous roots; plants with reticulate (net-like) venation have taproots.",
      },
      explore: { activity: "Activities 3, 7 & 8", title: "Leaf detective", how: "Look at each leaf's veins, then dig up each plant.", Sim: LeafRoot },
      discoveries: [
        { id: "net", text: "Reticulate venation: veins form a net" },
        { id: "parallel", text: "Parallel venation: veins run side by side" },
        { id: "taproot", text: "Net-veined plants have a taproot" },
        { id: "fibrous", text: "Parallel-veined plants have fibrous roots" },
      ],
      understand: [
        { title: "Parts of a leaf", body: "The petiole joins the leaf to the stem. The broad green part is the lamina. The thick vein in the middle is the midrib." },
        { title: "Transpiration", body: "Leaves give out water vapour through transpiration — try tying a polythene bag over a leafy branch in sunlight." },
        { title: "Photosynthesis", body: "Green leaves make food using water and carbon dioxide in the presence of sunlight. The food is stored as starch." },
        { title: "Roots", body: "Roots absorb water and minerals and hold the plant firmly in the soil. They are taproots or fibrous roots." },
      ],
      check: [
        {
          id: "k3",
          kind: "sort",
          q: "Which leaves have reticulate venation?",
          bins: ["Reticulate", "Parallel"],
          items: [
            { label: "Tulsi", bin: 0 },
            { label: "Coriander", bin: 0 },
            { label: "China rose", bin: 0 },
            { label: "Wheat", bin: 1 },
            { label: "Maize", bin: 1 },
            { label: "Grass", bin: 1 },
          ],
          why: "Tulsi, coriander and China rose have net-like veins; wheat, maize and grass have parallel veins.",
        },
        { id: "k4", kind: "mcq", q: "Which part of the plant makes food?", options: ["Root", "Leaf", "Flower"], answer: 1, why: "Leaves make food by photosynthesis." },
      ],
      connect: [
        { icon: "🖍", title: "Leaf prints", body: "Rub a crayon over a leaf under paper to see its venation." },
        { icon: "🥕", title: "Food-storing roots", body: "Carrot and radish roots store food." },
        { icon: "🌬", title: "Breathing leaves", body: "Leaves release water vapour into the air — part of the water cycle." },
      ],
    },
    {
      id: "flower",
      icon: "🌺",
      title: "Inside a flower",
      pages: "62–64",
      wonder: {
        q: "What are the small green leaf-like parts at the base of a flower called?",
        options: [
          { id: "petals", label: "Petals" },
          { id: "sepals", label: "Sepals" },
          { id: "anthers", label: "Anthers" },
        ],
        answer: "sepals",
        reveal: "Sepals. They are the outermost parts of a flower and protect it when it's a bud.",
      },
      explore: { activity: "Activities 9 & 10", title: "Open up a flower", how: "Tap each part of the cut-open flower.", Sim: FlowerParts },
      discoveries: [
        { id: "outer", text: "Sepals and petals are the outer parts of a flower" },
        { id: "stamen", text: "A stamen has an anther and a filament" },
        { id: "pistil", text: "The pistil has a stigma, a style and an ovary" },
        { id: "ovules", text: "The ovary contains bead-like ovules" },
      ],
      understand: [
        { title: "The parts", body: "The parts of a flower are sepals, petals, stamens and pistil." },
        { title: "Stamens", body: "The male part. Each has a stalk called the filament and a top called the anther." },
        { title: "Pistil", body: "The innermost part. Its swollen base is the ovary; the long middle part is the style; the top is the stigma." },
        { title: "Not always equal", body: "The number of petals and stamens is not always equal, and joined sepals don't mean joined petals." },
      ],
      check: [
        { id: "k5", kind: "mcq", q: "Which is the innermost part of a flower?", options: ["Sepal", "Petal", "Pistil"], answer: 2, why: "The pistil is at the centre." },
        { id: "k6", kind: "tf", q: "The number of petals and stamens in a flower is always equal.", answer: false, why: "They often differ." },
      ],
      connect: [
        { icon: "🌼", title: "Count them", body: "Pick a fallen flower and count its sepals, petals and stamens." },
        { icon: "🐝", title: "Bee visitors", body: "Bees visit flowers for nectar and get covered in pollen from the anthers." },
        { icon: "🍎", title: "From flower to fruit", body: "The ovary later develops into a fruit, and ovules into seeds." },
      ],
    },
  ],
  learnt: [
    "Plants are grouped into herbs, shrubs and trees based on height, stem and branches.",
    "The stem bears leaves, flowers and fruits, and conducts water and food.",
    "A leaf usually has a petiole and a lamina; the pattern of veins is called venation — reticulate or parallel.",
    "Leaves give out water vapour by transpiration and make food by photosynthesis.",
    "Roots absorb water and minerals and anchor the plant. They are taproots or fibrous roots.",
    "The parts of a flower are sepals, petals, stamens and pistil.",
  ],
  keywords: ["Herb", "Shrub", "Tree", "Petiole", "Lamina", "Venation", "Taproot", "Fibrous root", "Transpiration", "Photosynthesis", "Sepal", "Petal", "Stamen", "Pistil"],
};

export default chapter;
