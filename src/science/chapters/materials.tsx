// Chapter 4 · Sorting Materials into Groups (NCERT Science Class VI, 2018-19, pp. 26–34).
// Wording is original; facts and activities follow the textbook.
import { TestLab, TestItem } from "../kit";
import type { Chapter, SimProps } from "../types";

/* Stop 1 · lustre and hardness */
const SOLIDS: TestItem[] = [
  { id: "key", name: "Iron key", icon: "🔑", results: { lustre: true, soft: false } },
  { id: "copper", name: "Copper wire", icon: "🔶", results: { lustre: true, soft: false } },
  { id: "foil", name: "Aluminium sheet", icon: "🥈", results: { lustre: true, soft: false } },
  { id: "wood", name: "Wood", icon: "🥢", results: { lustre: false, soft: false } },
  { id: "stone", name: "Stone", icon: "⚫", results: { lustre: false, soft: false } },
  { id: "chalk", name: "Chalk", icon: "🖍", results: { lustre: false, soft: true } },
  { id: "cotton", name: "Cotton wool", icon: "☁️", results: { lustre: false, soft: true } },
  { id: "sponge", name: "Sponge", icon: "🧽", results: { lustre: false, soft: true } },
];
function LustreHard({ discover }: SimProps) {
  return (
    <TestLab
      discover={discover}
      intro="Choose a test, then tap a material to try it."
      tests={[
        { id: "lustre", label: "Look for shine", icon: "✨", yes: "shiny — it has lustre", no: "dull — no lustre", color: "#ffd257" },
        { id: "soft", label: "Squeeze or scratch", icon: "✊", yes: "easy to squeeze or scratch — soft", no: "hard to squeeze or scratch — hard", color: "#8fb3ff" },
      ]}
      items={SOLIDS}
      rules={[
        { id: "lustre", when: (s) => s.test.id === "lustre" && !!s.positive },
        { id: "dull", when: (s) => s.test.id === "lustre" && s.positive === false },
        { id: "soft", when: (s) => s.test.id === "soft" && !!s.positive },
        { id: "hard", when: (s) => s.test.id === "soft" && s.positive === false },
      ]}
      explain={(s) =>
        s.item && s.test.id === "lustre" && s.positive
          ? `${s.item.name} shines — metals have lustre. Old metal can look dull because of air and moisture; scratch it and the shine shows.`
          : undefined
      }
    />
  );
}

/* Stop 2 · does it dissolve in water? */
const STIRS: (TestItem & { liquid?: boolean; oily?: boolean })[] = [
  { id: "sugar", name: "Sugar", icon: "🍬", results: { mix: true } },
  { id: "salt", name: "Salt", icon: "🧂", results: { mix: true } },
  { id: "chalk", name: "Chalk powder", icon: "🖍", results: { mix: false } },
  { id: "sand", name: "Sand", icon: "🏖", results: { mix: false } },
  { id: "sawdust", name: "Sawdust", icon: "🌰", results: { mix: false } },
  { id: "vinegar", name: "Vinegar", icon: "🍶", results: { mix: true }, liquid: true },
  { id: "lemon", name: "Lemon juice", icon: "🍋", results: { mix: true }, liquid: true },
  { id: "oil", name: "Mustard oil", icon: "🛢", results: { mix: false }, liquid: true, oily: true },
  { id: "kerosene", name: "Kerosene", icon: "⛽", results: { mix: false }, liquid: true, oily: true },
];
function Dissolve({ discover }: SimProps) {
  return (
    <TestLab
      discover={discover}
      intro="Tap a substance to stir it into a glass of water."
      tests={[{ id: "mix", label: "Stir into water", icon: "🥄", yes: "it dissolves / mixes completely", no: "it does not dissolve or mix", color: "#4fb6e0" }]}
      items={STIRS}
      rules={[
        { id: "soluble", when: (s) => !!s.positive && !(s.item as (typeof STIRS)[0]).liquid },
        { id: "insoluble", when: (s) => s.positive === false && !(s.item as (typeof STIRS)[0]).liquid },
        { id: "mixes", when: (s) => !!s.positive && !!(s.item as (typeof STIRS)[0]).liquid },
        { id: "layer", when: (s) => !!(s.item as (typeof STIRS)[0])?.oily },
      ]}
      explain={(s) => {
        const it = s.item as (typeof STIRS)[0] | undefined;
        if (!it) return undefined;
        if (it.oily) return `${it.name} doesn't mix with water — it forms a separate layer on top.`;
        if (it.liquid) return `${it.name} mixes completely with water.`;
        return it.results.mix ? `${it.name} disappears into the water — it is soluble.` : `${it.name} stays visible even after stirring — it is insoluble. Some floats, some settles at the bottom.`;
      }}
      scene={({ item }) => {
        const it = item as (typeof STIRS)[0] | undefined;
        return (
          <svg viewBox="0 0 520 220" className="block h-auto w-full select-none">
            <rect width="520" height="220" fill="#13112b" />
            <path d="M200 30 h120 l-10 170 h-100 z" fill="#cfe8ff" fillOpacity=".12" stroke="#cfe8ff" strokeWidth="3" />
            <path d="M205 70 h110 l-8 128 h-94 z" fill={it?.results.mix ? (it.id === "lemon" ? "#e9f08a" : it.id === "vinegar" ? "#e9dcc4" : "#7fc3f0") : "#4fb6e0"} opacity=".75" style={{ transition: "fill .5s" }} />
            {it?.oily && <path d="M205 70 h110 l-1 14 h-108 z" fill="#e8c35a" className="animate-fade" />}
            {it && !it.results.mix && !it.liquid &&
              Array.from({ length: 24 }, (_, i) => (
                <circle key={it.id + i} cx={220 + ((i * 37) % 80)} cy={it.id === "sawdust" && i % 2 ? 78 + (i % 3) * 3 : 186 + (i % 3) * 4} r={it.id === "sand" ? 2.5 : 2} fill={it.id === "sawdust" ? "#c9965a" : it.id === "sand" ? "#e2c48a" : "#f4f4f4"} className="animate-fade" />
              ))}
            <text x="260" y="22" fontSize="13" fontWeight="900" fill="#ffd257" textAnchor="middle">
              {it ? it.name : "A glass of water"}
            </text>
          </svg>
        );
      }}
    />
  );
}

/* Stop 3 · float or sink */
const DROPS: TestItem[] = [
  { id: "leaf", name: "Dry leaf", icon: "🍂", results: { float: true } },
  { id: "cork", name: "Cork", icon: "🍾", results: { float: true } },
  { id: "stick", name: "Wooden stick", icon: "🥢", results: { float: true } },
  { id: "sponge", name: "Sponge", icon: "🧽", results: { float: true } },
  { id: "key", name: "Key", icon: "🔑", results: { float: false } },
  { id: "nail", name: "Iron nail", icon: "🔩", results: { float: false } },
  { id: "pin", name: "Safety pin", icon: "🧷", results: { float: false } },
  { id: "egg", name: "Egg", icon: "🥚", results: { float: false } },
];
function FloatSink({ discover }: SimProps) {
  return (
    <TestLab
      discover={discover}
      intro="Tap an object to drop it into the tub of water."
      tests={[{ id: "float", label: "Drop into water", icon: "💧", yes: "it floats", no: "it sinks to the bottom", color: "#4fb6e0" }]}
      items={DROPS}
      rules={[
        { id: "float", when: (s) => !!s.positive },
        { id: "sink", when: (s) => s.positive === false },
        { id: "group", when: (s) => (s.tested.float?.length ?? 0) >= 6 },
      ]}
      scene={({ item, positive }) => (
        <svg viewBox="0 0 520 220" className="block h-auto w-full select-none">
          <rect width="520" height="220" fill="#13112b" />
          <rect x="120" y="60" width="280" height="140" rx="10" fill="#2c3a63" />
          <rect x="124" y="80" width="272" height="116" rx="8" fill="#2f78b8" />
          <path d="M126 80 q17 -6 34 0 t34 0 t34 0 t34 0 t34 0 t34 0 t34 0 t34 0" stroke="#9fd8ff" strokeWidth="2" fill="none" />
          {item && (
            <text key={item.id} x="260" y={positive ? 88 : 190} fontSize="40" textAnchor="middle" style={{ animation: "rise .7s cubic-bezier(.2,.8,.2,1) both" }}>
              {item.icon}
            </text>
          )}
          <text x="260" y="40" fontSize="14" fontWeight="900" fill={item ? "#ffd257" : "#9da3c7"} textAnchor="middle">
            {item ? `${item.name} ${positive ? "floats" : "sinks"}` : "A tub of water"}
          </text>
        </svg>
      )}
    />
  );
}

/* Stop 4 · transparent, translucent, opaque */
const SHEETS: TestItem[] = [
  { id: "glass", name: "Glass sheet", icon: "⬜", results: { clear: true, light: true } },
  { id: "water", name: "Water", icon: "💧", results: { clear: true, light: true } },
  { id: "plastic", name: "Clear plastic", icon: "🛍", results: { clear: true, light: true } },
  { id: "oiled", name: "Oiled paper", icon: "📃", results: { clear: false, light: true } },
  { id: "butter", name: "Butter paper", icon: "🧻", results: { clear: false, light: true } },
  { id: "frosted", name: "Frosted glass", icon: "🚿", results: { clear: false, light: true } },
  { id: "card", name: "Cardboard", icon: "📦", results: { clear: false, light: false } },
  { id: "wood", name: "Wooden board", icon: "🚪", results: { clear: false, light: false } },
  { id: "metal", name: "Metal sheet", icon: "🔲", results: { clear: false, light: false } },
];
function SeeThrough({ discover }: SimProps) {
  return (
    <TestLab
      discover={discover}
      intro="Hold each material in front of a lighted bulb. Try both tests."
      tests={[
        { id: "clear", label: "See the bulb clearly?", icon: "👀", yes: "you can see through it clearly", no: "you can't see clearly through it", color: "#ffd257" },
        { id: "light", label: "Does any light pass?", icon: "💡", yes: "some light passes through", no: "no light passes through", color: "#ffd257" },
      ]}
      items={SHEETS}
      rules={[
        { id: "transparent", when: (s) => s.test.id === "clear" && !!s.positive },
        { id: "translucent", when: (s) => s.test.id === "light" && !!s.positive && !s.item?.results.clear },
        { id: "opaque", when: (s) => s.test.id === "light" && s.positive === false },
      ]}
      explain={({ item }) =>
        !item ? undefined : item.results.clear ? `${item.name} is transparent: you can see clearly through it.` : item.results.light ? `${item.name} is translucent: you can see through it, but not clearly.` : `${item.name} is opaque: you cannot see through it at all.`
      }
      scene={({ item }) => {
        const kind = !item ? null : item.results.clear ? "t" : item.results.light ? "l" : "o";
        return (
          <svg viewBox="0 0 520 220" className="block h-auto w-full select-none">
            <defs>
              <filter id="blurBulb">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <radialGradient id="bulbG2">
                <stop offset="0" stopColor="#fff6c2" />
                <stop offset=".4" stopColor="#ffd257" stopOpacity=".6" />
                <stop offset="1" stopColor="#ffd257" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="520" height="220" fill="#13112b" />
            <g filter={kind === "l" ? "url(#blurBulb)" : undefined}>
              <circle cx="380" cy="110" r="70" fill="url(#bulbG2)" />
              <circle cx="380" cy="100" r="26" fill="#fff1b8" />
              <rect x="368" y="124" width="24" height="20" rx="3" fill="#cfcbe0" />
            </g>
            {kind && <rect x="250" y="20" width="60" height="180" rx="6" fill={kind === "t" ? "#cfe8ff" : kind === "l" ? "#f4efe3" : "#7a5530"} opacity={kind === "t" ? 0.18 : kind === "l" ? 0.5 : 1} stroke="#ffffff55" />}
            {kind === "o" && <rect x="310" y="20" width="160" height="180" fill="#13112b" opacity=".92" />}
            <text x="120" y="100" fontSize="40" textAnchor="middle">
              👁
            </text>
            <text x="120" y="140" fontSize="13" fontWeight="900" fill="#ffd257" textAnchor="middle">
              {kind === "t" ? "Transparent" : kind === "l" ? "Translucent" : kind === "o" ? "Opaque" : "Your eye"}
            </text>
          </svg>
        );
      }}
    />
  );
}

const chapter: Chapter = {
  id: "materials",
  n: 4,
  title: "Sorting Materials into Groups",
  pages: "26–34",
  icon: "🧱",
  theme: { grad: "linear-gradient(135deg,#1c2433 0%,#4b5d7e 55%,#c9a36a 125%)", accent: "#4b5d7e", soft: "#e7ecf4", ink: "#2d3a52" },
  opening: "Your tumbler could be glass, steel or plastic. A chair could be wood or metal. How do we decide which material to use — and how can we group them?",
  stops: [
    {
      id: "look",
      icon: "✨",
      title: "Shiny or dull? Hard or soft?",
      pages: "26–29",
      wonder: {
        q: "An old copper coin looks dull. If you scratch it with sandpaper, what will you see?",
        options: [
          { id: "dull", label: "It stays dull all through" },
          { id: "shine", label: "A shiny surface underneath" },
          { id: "crumble", label: "It crumbles" },
        ],
        answer: "shine",
        reveal: "A shiny surface! Metals have lustre. They look dull over time because of air and moisture acting on them.",
      },
      explore: { activity: "Activities 1–3", title: "Material detectives", how: "Test each material for lustre (shine) and for hardness.", Sim: LustreHard },
      discoveries: [
        { id: "lustre", text: "Metals like iron, copper and aluminium have lustre" },
        { id: "dull", text: "Wood, stone and chalk have no lustre" },
        { id: "soft", text: "Sponge and cotton are soft — easy to squeeze" },
        { id: "hard", text: "Iron and stone are hard — difficult to compress" },
      ],
      understand: [
        { title: "Many materials", body: "Objects are made of materials like glass, wood, metal, plastic and cotton. One material can make many objects, and one object can use many materials." },
        { title: "Appearance", body: "Materials that shine have lustre — usually metals, like iron, copper, aluminium and gold." },
        { title: "Hardness", body: "Materials that can be compressed or scratched easily are soft; those difficult to compress are hard." },
      ],
      check: [
        { id: "s1", kind: "mcq", q: "Which of these has lustre?", options: ["Wood", "Aluminium", "Chalk"], answer: 1, why: "Metals like aluminium are shiny." },
        { id: "s2", kind: "tf", q: "Sponge is a hard material.", answer: false, why: "Sponge is easy to compress — it's soft." },
      ],
      connect: [
        { icon: "🍽", title: "Kitchen utensils", body: "Steel, aluminium and glass vessels — why is each used?" },
        { icon: "🏪", title: "Grocery shop", body: "Shopkeepers group similar things together so they're easy to find." },
        { icon: "💺", title: "Same object, many materials", body: "Chairs can be wooden, metal or plastic." },
      ],
    },
    {
      id: "dissolve",
      icon: "🥄",
      title: "Does it dissolve?",
      pages: "29–31",
      wonder: {
        q: "You stir a spoon of sand into water. What happens?",
        options: [
          { id: "gone", label: "It disappears completely" },
          { id: "stays", label: "It stays visible and settles down" },
          { id: "floats", label: "It all floats" },
        ],
        answer: "stays",
        reveal: "Sand does not dissolve. It stays visible and settles at the bottom — sand is insoluble in water.",
      },
      explore: { activity: "Activities 4 & 5", title: "Stir it in", how: "Stir solids and liquids into water and watch what happens.", Sim: Dissolve },
      discoveries: [
        { id: "soluble", text: "Sugar and salt dissolve — they are soluble" },
        { id: "insoluble", text: "Sand, chalk and sawdust don't dissolve — they are insoluble" },
        { id: "mixes", text: "Vinegar and lemon juice mix completely with water" },
        { id: "layer", text: "Oil and kerosene form a separate layer" },
      ],
      understand: [
        { title: "Soluble", body: "Substances that completely disappear or dissolve in water are soluble — like sugar and salt." },
        { title: "Insoluble", body: "Substances that do not mix with water even after stirring are insoluble — like sand and sawdust." },
        { title: "Liquids", body: "Some liquids mix completely with water (vinegar, lemon juice). Others form a separate layer (mustard oil, kerosene)." },
        { title: "Gases dissolve too", body: "Some gases dissolve in water. Oxygen dissolved in water is very important for animals and plants living in water." },
      ],
      check: [
        {
          id: "s3",
          kind: "sort",
          q: "Soluble or insoluble in water?",
          bins: ["Soluble", "Insoluble"],
          items: [
            { label: "Sugar", bin: 0 },
            { label: "Salt", bin: 0 },
            { label: "Vinegar", bin: 0 },
            { label: "Sand", bin: 1 },
            { label: "Chalk powder", bin: 1 },
            { label: "Oil", bin: 1 },
          ],
          why: "Sugar, salt and vinegar mix with water; sand, chalk and oil do not.",
        },
      ],
      connect: [
        { icon: "🍋", title: "Nimbu pani", body: "Sugar and salt dissolve; lemon juice mixes — a perfect solution!" },
        { icon: "🐟", title: "Breathing in water", body: "Fish use oxygen dissolved in water." },
        { icon: "🍳", title: "Oil on water", body: "Watch oil float on water in a cooking pot." },
      ],
    },
    {
      id: "float",
      icon: "🛶",
      title: "Float or sink?",
      pages: "31",
      wonder: {
        q: "Drop a dry leaf and a key into a tub of water. What happens?",
        options: [
          { id: "both", label: "Both float" },
          { id: "leaf", label: "The leaf floats, the key sinks" },
          { id: "neither", label: "Both sink" },
        ],
        answer: "leaf",
        reveal: "The leaf floats and the key sinks. Whether a thing floats or sinks is another property we can use to group materials.",
      },
      explore: { activity: "Section 4.2", title: "The float test", how: "Drop objects into the tub one by one.", Sim: FloatSink },
      discoveries: [
        { id: "float", text: "Some objects float on water" },
        { id: "sink", text: "Some objects sink to the bottom" },
        { id: "group", text: "Floating and sinking is a way to group objects" },
      ],
      understand: [
        { title: "Floaters and sinkers", body: "Some solids, like sawdust, a dry leaf and cork, float on water. Others, like sand, a key and an iron nail, sink." },
        { title: "Why group?", body: "Grouping materials makes them convenient to store, find and study — and helps us notice patterns in their properties." },
      ],
      check: [{ id: "s4", kind: "mcq", q: "Which of these will sink in water?", options: ["Cork", "Iron nail", "Dry leaf"], answer: 1, why: "An iron nail sinks; cork and dry leaves float." }],
      connect: [
        { icon: "🎣", title: "Fishing floats", body: "Floats keep a fishing line near the surface." },
        { icon: "⛵", title: "Boats", body: "Wooden boats float — even big metal ships float because of their shape." },
        { icon: "🌾", title: "Washing grains", body: "When you wash dal, husk floats up and can be poured off." },
      ],
    },
    {
      id: "see",
      icon: "👀",
      title: "Can you see through it?",
      pages: "31–32",
      wonder: {
        q: "You put a few drops of oil on paper and look at a bulb through it. What do you see?",
        options: [
          { id: "clear", label: "The bulb, perfectly clearly" },
          { id: "blur", label: "Some light, but not clearly" },
          { id: "nothing", label: "Nothing at all" },
        ],
        answer: "blur",
        reveal: "You see some light, but not clearly. Oiled paper is translucent.",
      },
      explore: { activity: "Activity 6", title: "Look at a bulb", how: "Hold each material between your eye and a lighted bulb.", Sim: SeeThrough },
      discoveries: [
        { id: "transparent", text: "Transparent: you can see clearly through it" },
        { id: "translucent", text: "Translucent: you can see through, but not clearly" },
        { id: "opaque", text: "Opaque: you cannot see through it at all" },
      ],
      understand: [
        { title: "Transparent", body: "Materials through which things can be seen clearly — glass, water, air, some plastics. Shopkeepers keep biscuits in transparent jars." },
        { title: "Translucent", body: "Materials through which things can be seen, but not clearly — like oiled paper and frosted glass." },
        { title: "Opaque", body: "Materials you cannot see through at all — wood, cardboard and metal." },
      ],
      check: [
        {
          id: "s5",
          kind: "sort",
          q: "Can you see through it clearly?",
          bins: ["Transparent", "Not clearly / not at all"],
          items: [
            { label: "Glass", bin: 0 },
            { label: "Water", bin: 0 },
            { label: "Air", bin: 0 },
            { label: "Oiled paper", bin: 1 },
            { label: "Cardboard", bin: 1 },
            { label: "Wood", bin: 1 },
          ],
          why: "Glass, water and air are transparent; oiled paper is translucent; cardboard and wood are opaque.",
        },
      ],
      connect: [
        { icon: "🍪", title: "Glass jars", body: "Shops keep sweets in transparent jars so buyers can see them." },
        { icon: "🚿", title: "Bathroom windows", body: "Frosted glass lets light in but keeps the bathroom private." },
        { icon: "🖐", title: "Your palm", body: "Hold a torch behind your hand — is your palm opaque, transparent or translucent?" },
      ],
    },
  ],
  learnt: [
    "Objects around us are made of a large variety of materials; one material can make many objects.",
    "Different materials have different properties: some are shiny, some dull; some rough, some smooth; some hard, some soft.",
    "Some materials are soluble in water and some are insoluble.",
    "Some materials are transparent, some translucent and some opaque.",
    "Materials are grouped by their properties, which makes them easy to find and to study.",
  ],
  keywords: ["Lustre", "Hard", "Soft", "Soluble", "Insoluble", "Transparent", "Translucent", "Opaque"],
};

export default chapter;
