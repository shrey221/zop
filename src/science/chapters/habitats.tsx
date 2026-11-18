// Chapter 9 · The Living Organisms — Characteristics and Habitats (NCERT Science Class VI, 2018-19, pp. 79–94).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { ExploreLab, SortLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage } from "../ui";

/* Stop 1 · who lives where? */
const LIVES = [
  { id: "camel", label: "Camel", icon: "🐫", bin: "desert", why: "Camels are adapted to hot, dry deserts." },
  { id: "cactus", label: "Cactus", icon: "🌵", bin: "desert", why: "Cacti store water and lose very little of it." },
  { id: "fish", label: "Fish", icon: "🐟", bin: "ocean", why: "Fish breathe through gills and swim with fins." },
  { id: "dolphin", label: "Dolphin", icon: "🐬", bin: "ocean", why: "Dolphins have streamlined bodies and come up to breathe air through a blowhole." },
  { id: "octopus", label: "Octopus", icon: "🐙", bin: "ocean", why: "Sea animals like the octopus live deep in the ocean." },
  { id: "pine", label: "Pine tree", icon: "🌲", bin: "mountain", why: "Cone-shaped trees with sloping branches let snow slide off." },
  { id: "yak", label: "Yak", icon: "🐂", bin: "mountain", why: "Yaks have long hair to keep them warm in the cold mountains." },
  { id: "goat", label: "Mountain goat", icon: "🐐", bin: "mountain", why: "Strong hooves help mountain goats run up rocky slopes." },
  { id: "lion", label: "Lion", icon: "🦁", bin: "grass", why: "A lion's light brown colour helps it hide in dry grass while hunting." },
  { id: "deer", label: "Deer", icon: "🦌", bin: "grass", why: "Long ears and side eyes help deer sense danger in grasslands." },
];
const binDone = (p: Record<string, string>, b: string) => LIVES.filter((l) => l.bin === b).every((l) => p[l.id]);
function HabitatSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Tap a living thing, then the habitat it is adapted to."
      bins={[
        { id: "desert", label: "Desert", icon: "🏜", color: "#ffd257" },
        { id: "ocean", label: "Ocean", icon: "🌊", color: "#7fc3f0" },
        { id: "mountain", label: "Mountains", icon: "🏔", color: "#c9d0e6" },
        { id: "grass", label: "Grassland", icon: "🌾", color: "#5fe0a0" },
      ]}
      items={LIVES}
      rules={[
        { id: "desert", when: (p) => binDone(p, "desert") },
        { id: "ocean", when: (p) => binDone(p, "ocean") },
        { id: "mountain", when: (p) => binDone(p, "mountain") },
        { id: "grass", when: (p) => binDone(p, "grass") },
      ]}
    />
  );
}

/* Stop 2 · a camel and a fish up close */
function CamelFish() {
  return (
    <g>
      <rect width="520" height="300" fill="#13112b" />
      <rect width="260" height="300" fill="#4a3518" opacity=".55" />
      <rect x="260" width="260" height="300" fill="#123a5a" opacity=".8" />
      {/* camel */}
      <g fill="#c99a5b">
        <ellipse cx="120" cy="140" rx="62" ry="32" />
        <ellipse cx="108" cy="110" rx="26" ry="22" />
        <path d="M170 128 q24 -40 30 -64 l16 4 q-6 30 -30 70 z" />
        <ellipse cx="214" cy="62" rx="16" ry="10" />
        {[78, 98, 142, 160].map((x) => (
          <rect key={x} x={x} y="160" width="10" height="100" rx="4" />
        ))}
      </g>
      <rect x="20" y="258" width="220" height="10" fill="#e2c48a" />
      <text x="130" y="288" fontSize="11" fontWeight="800" fill="#f1dcc0" textAnchor="middle">hot desert sand</text>
      {/* fish */}
      <g>
        <path d="M300 150 C 340 100, 430 100, 460 150 C 430 200, 340 200, 300 150 Z" fill="#f5a524" />
        <path d="M300 150 L270 122 L276 150 L270 178 Z" fill="#f5a524" />
        <path d="M380 112 l14 -24 l14 28 z M380 188 l14 22 l10 -22 z" fill="#e08a12" />
        <circle cx="436" cy="140" r="6" fill="#13112b" />
        <path d="M418 128 q-8 22 0 44" stroke="#c0392b" strokeWidth="4" fill="none" />
      </g>
      <text x="390" y="288" fontSize="11" fontWeight="800" fill="#cfefff" textAnchor="middle">ocean water</text>
    </g>
  );
}
function Adaptations({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Tap the glowing features of the camel and the fish."
      viewBox="0 0 520 300"
      art={<CamelFish />}
      spots={[
        { id: "legs", label: "Long legs", x: 103, y: 215, text: "Long legs keep the camel's body away from the heat of the sand." },
        { id: "water", label: "Saving water", x: 120, y: 140, text: "A camel excretes little urine, its dung is dry and it does not sweat. Losing so little water, it can live for many days without drinking." },
        { id: "shape", label: "Streamlined body", x: 340, y: 150, text: "A fish's streamlined shape helps it move easily through water. Slippery scales protect it and help it glide." },
        { id: "gills", label: "Gills", x: 418, y: 150, text: "Gills help a fish use the oxygen dissolved in water to breathe." },
        { id: "fins", label: "Fins and tail", x: 394, y: 104, text: "Flat fins and the tail help a fish change direction and keep its balance." },
      ]}
      groups={{ legs: ["legs"], water: ["water"], streamlined: ["shape", "fins"], gills: ["gills"] }}
    />
  );
}

/* Stop 3 · cactus vs leafy plant */
function CactusLeafy({ discover }: SimProps) {
  const [t, setT] = useState(0);
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (t >= 2) {
      discover("leafy");
      discover("cactus");
    }
  }, [t, discover]);
  const leafyDrops = t * 9;
  const cactusDrops = Math.floor(t / 2);
  return (
    <Stage
      caption={
        close
          ? "In a cactus, the leaves are just spines, so very little water is lost. The thick, green stem stores water and makes food. Roots go deep into the soil."
          : t >= 2
            ? "Lots of water drops in the leafy plant's bag — but hardly any in the cactus bag. The cactus loses very little water."
            : "Polythene bags are tied over a leafy plant and a cactus in sunlight. Move time forward."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#13112b" />
        <circle cx="470" cy="40" r="20" fill="#ffd257" className="animate-glow" />
        {[130, 390].map((x, i) => (
          <g key={x}>
            <path d={`M${x - 40} 220 h80 l-10 36 h-60 z`} fill="#b8452a" />
            {i === 0 ? (
              <g>
                <rect x={x - 3} y="110" width="6" height="110" fill="#3f8f50" />
                {[120, 145, 170, 195].map((y, k) => (
                  <ellipse key={y} cx={x + (k % 2 ? 26 : -26)} cy={y} rx="26" ry="12" fill="#3fae5a" />
                ))}
              </g>
            ) : (
              <g>
                <rect x={x - 16} y="110" width="32" height="110" rx="16" fill="#3f8f50" />
                <path d={`M${x - 16} 160 h-20 v-30 a10 10 0 0 1 20 0`} fill="#3f8f50" />
                <path d={`M${x + 16} 150 h20 v-26 a10 10 0 0 0 -20 0`} fill="#3f8f50" />
                {Array.from({ length: 12 }, (_, k) => (
                  <path key={k} d={`M${x - 16 + (k % 2) * 32} ${120 + k * 8} l${k % 2 ? 7 : -7} -3`} stroke="#f1e7c3" strokeWidth="1.5" />
                ))}
              </g>
            )}
            {/* polythene bag */}
            <path d={`M${x - 52} 216 C ${x - 64} 140, ${x - 40} 92, ${x} 92 C ${x + 40} 92, ${x + 64} 140, ${x + 52} 216 Z`} fill="#cfe8ff" fillOpacity=".12" stroke="#cfe8ff" strokeOpacity=".5" strokeWidth="2" />
            {Array.from({ length: i === 0 ? leafyDrops : cactusDrops }, (_, k) => (
              <ellipse key={k} cx={x - 44 + ((k * 23) % 88)} cy={104 + ((k * 31) % 104)} rx="3" ry="4" fill="#9fd8ff" className="animate-pop" />
            ))}
            <text x={x} y="80" fontSize="12" fontWeight="900" fill="#9da3c7" textAnchor="middle">
              {i === 0 ? "leafy plant" : "cactus"}
            </text>
          </g>
        ))}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Hours in sunlight</span>
          <input type="range" min={0} max={3} step={1} value={t} onChange={(e) => setT(+e.target.value)} className="w-full accent-[#5fe0a0]" aria-label="Hours in sunlight" />
        </label>
        <div>
          <Btn
            on={close}
            onClick={() => {
              setClose(true);
              discover("spines");
            }}
          >
            🔍 Look closely at the cactus
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 4 · living or non-living? */
const THINGS = [
  { id: "dog", label: "Dog", icon: "🐕", bin: "living", why: "A dog eats, breathes, grows, responds and reproduces." },
  { id: "tree", label: "Mango tree", icon: "🌳", bin: "living", why: "Plants are living: they make food, respire, grow and reproduce." },
  { id: "mushroom", label: "Mushroom", icon: "🍄", bin: "living", why: "Mushrooms grow and reproduce — they are living." },
  { id: "seed", label: "Moong seed", icon: "🌰", bin: "living", why: "Tricky! A seed in a shop shows almost no sign of life — but it respires, and in soil with water it grows into a plant." },
  { id: "car", label: "Car", icon: "🚗", bin: "non", why: "A car moves, but it doesn't eat, grow, breathe or reproduce." },
  { id: "cloud", label: "Cloud", icon: "☁️", bin: "non", why: "A cloud can move and grow bigger, but it isn't alive." },
  { id: "clock", label: "Clock", icon: "⏰", bin: "non", why: "Its hands move, but a clock is non-living." },
  { id: "river", label: "River", icon: "🌊", bin: "non", why: "River water flows, but it is non-living." },
];
function LivingSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Living or non-living? Careful — some things move without being alive!"
      bins={[
        { id: "living", label: "Living", icon: "💚", color: "#5fe0a0" },
        { id: "non", label: "Non-living", icon: "⚙️", color: "#c9d0e6" },
      ]}
      items={THINGS}
      rules={[
        { id: "living", when: (p) => ["dog", "tree", "mushroom"].every((i) => p[i]) },
        { id: "non", when: (p) => ["clock", "river"].every((i) => p[i]) },
        { id: "moves", when: (p) => !!p.car && !!p.cloud },
        { id: "seed", when: (p) => !!p.seed },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "habitats",
  n: 9,
  title: "The Living Organisms — Characteristics and Habitats",
  pages: "79–94",
  icon: "🐪",
  theme: { grad: "linear-gradient(135deg,#2b1a05 0%,#a86a12 50%,#1f8a8a 125%)", accent: "#a2600f", soft: "#fdf0d8", ink: "#6b3f06" },
  opening: "A fish dies out of water, and a camel would struggle in the sea. Why does each living thing live where it does?",
  stops: [
    {
      id: "homes",
      icon: "🏜",
      title: "Who lives where?",
      pages: "79–84",
      wonder: {
        q: "Why can't a camel live in the ocean or a fish in the desert?",
        options: [
          { id: "adapted", label: "Each has features suited to its own surroundings" },
          { id: "choice", label: "They just prefer their homes" },
          { id: "size", label: "Because of their size" },
        ],
        answer: "adapted",
        reveal: "Each is adapted to its habitat: special body features and habits let it survive there — and not somewhere else.",
      },
      explore: { activity: "Activity 1", title: "Habitat match", how: "Put each living thing in the habitat it is adapted to.", Sim: HabitatSort },
      discoveries: [
        { id: "desert", text: "Deserts: camels and cacti cope with heat and little water" },
        { id: "ocean", text: "Oceans: fish, dolphins and octopuses live in water" },
        { id: "mountain", text: "Mountains: yaks, goats and pines handle the cold" },
        { id: "grass", text: "Grasslands: lions and deer" },
      ],
      understand: [
        { title: "Habitat", body: "The place where an organism lives is its habitat. It provides food, water, air, shelter and other needs." },
        { title: "Adaptation", body: "Special features or habits that help a plant or animal live in a particular place are its adaptations." },
        { title: "Two kinds", body: "Terrestrial habitats are on land (forests, grasslands, deserts, mountains). Aquatic habitats are in water (ponds, lakes, rivers, oceans)." },
        { title: "Biotic and abiotic", body: "The living things in a habitat are its biotic components; rocks, soil, air and water are abiotic components." },
      ],
      check: [
        { id: "h1", kind: "mcq", q: "Rocks, soil, air and water in a habitat are its…", options: ["biotic components", "abiotic components", "adaptations"], answer: 1, why: "Non-living components are abiotic." },
        { id: "h2", kind: "tf", q: "Several kinds of plants and animals may share the same habitat.", answer: true, why: "A forest is home to many plants and animals." },
      ],
      connect: [
        { icon: "🏫", title: "Your school", body: "List the plants and animals living around your school." },
        { icon: "🌍", title: "Habitats in India", body: "India has deserts, mountains, forests, grasslands and long coasts." },
        { icon: "🐾", title: "Losing homes", body: "When habitats are destroyed, the animals living there can't survive." },
      ],
    },
    {
      id: "adapt",
      icon: "🐟",
      title: "Built for their homes",
      pages: "82–88",
      wonder: {
        q: "A camel can go many days without drinking water. What helps it?",
        options: [
          { id: "hump", label: "It drinks from its hump" },
          { id: "save", label: "It loses very little water from its body" },
          { id: "magic", label: "It doesn't need water at all" },
        ],
        answer: "save",
        reveal: "It saves water: a camel excretes little urine, its dung is dry and it does not sweat.",
      },
      explore: { activity: "Section 9.3", title: "Camel and fish, up close", how: "Tap the glowing features to see how each animal is adapted.", Sim: Adaptations },
      discoveries: [
        { id: "legs", text: "Long legs keep a camel above the hot sand" },
        { id: "water", text: "Camels lose very little water" },
        { id: "streamlined", text: "A fish's streamlined body and fins help it swim" },
        { id: "gills", text: "Gills let a fish use oxygen dissolved in water" },
      ],
      understand: [
        { title: "Deserts", body: "Desert rats and snakes stay in burrows during the hot day. Desert plants have spines or tiny leaves to lose less water." },
        { title: "Mountains", body: "Trees are cone-shaped with sloping branches so snow slides off. Yaks have long hair; snow leopards have thick fur." },
        { title: "Grasslands", body: "A lion's colour hides it while hunting; front-facing eyes judge distance. Deer have long ears and side eyes to sense danger." },
        { title: "Water", body: "Fish are streamlined with gills and fins. Dolphins and whales breathe air through nostrils (blowholes) on top of their heads." },
      ],
      check: [
        { id: "h3", kind: "mcq", q: "Why are mountain trees often cone-shaped with sloping branches?", options: ["So snow slides off easily", "To catch more rain", "To look pretty"], answer: 0, why: "Sloping branches shed snow." },
        { id: "h4", kind: "tf", q: "Dolphins breathe through gills.", answer: false, why: "They breathe air through blowholes on top of their heads." },
      ],
      connect: [
        { icon: "🐆", title: "Snow leopard", body: "Thick fur, even on its feet, keeps it warm in the snow." },
        { icon: "🦎", title: "Desert burrows", body: "Desert animals hide in burrows during the hot day." },
        { icon: "🐋", title: "Whales", body: "Whales surface regularly to breathe air." },
      ],
    },
    {
      id: "cactus",
      icon: "🌵",
      title: "Cactus vs leafy plant",
      pages: "84–86",
      wonder: {
        q: "Bags are tied over a leafy plant and a cactus in sunlight. Which bag will have more water drops after a few hours?",
        options: [
          { id: "leafy", label: "The leafy plant's bag" },
          { id: "cactus", label: "The cactus bag" },
          { id: "same", label: "Both the same" },
        ],
        answer: "leafy",
        reveal: "The leafy plant's bag! A cactus loses very little water — useful in the desert.",
      },
      explore: { activity: "Activity 3", title: "The bag test", how: "Move time forward, then look closely at the cactus.", Sim: CactusLeafy },
      discoveries: [
        { id: "leafy", text: "A leafy plant loses lots of water through its leaves" },
        { id: "cactus", text: "A cactus loses very little water" },
        { id: "spines", text: "Cactus leaves are spines; its stem stores water and makes food" },
      ],
      understand: [
        { title: "Desert plants", body: "They lose very little water through transpiration. Their leaves are absent, very small, or turned into spines." },
        { title: "Green stems", body: "In a cactus, photosynthesis happens in the green stem. A waxy layer on the stem helps keep water in." },
        { title: "Deep roots", body: "Roots go very deep into the soil to absorb water." },
      ],
      check: [{ id: "h5", kind: "mcq", q: "In a cactus, which part makes food?", options: ["Spines", "The green stem", "The roots"], answer: 1, why: "The leaves are spines, so the green stem does photosynthesis." }],
      connect: [
        { icon: "🏜", title: "Rajasthan", body: "Spot cacti and other spiny plants in desert areas." },
        { icon: "🌿", title: "Indoor plants", body: "Succulents need very little watering — they store water." },
        { icon: "🍃", title: "Waxy leaves", body: "Some plants have shiny, waxy leaves that lose less water." },
      ],
    },
    {
      id: "life",
      icon: "💚",
      title: "What makes something alive?",
      pages: "88–93",
      wonder: {
        q: "A car moves and a cloud grows. Are they living?",
        options: [
          { id: "yes", label: "Yes — they move and grow" },
          { id: "no", label: "No — living things show many more characteristics" },
          { id: "car", label: "Only the car" },
        ],
        answer: "no",
        reveal: "No. Living things need food, respire, respond to stimuli, excrete, reproduce, grow and move. Cars and clouds don't show all these.",
      },
      explore: { activity: "Activities 4–6", title: "Living or not?", how: "Sort these things. Watch out for tricky ones!", Sim: LivingSort },
      discoveries: [
        { id: "living", text: "Animals, plants and mushrooms are living" },
        { id: "non", text: "Clocks and rivers are non-living" },
        { id: "moves", text: "Moving or growing alone doesn't make something alive" },
        { id: "seed", text: "Even a dry seed is living — it respires" },
      ],
      understand: [
        { title: "Signs of life", body: "Living things need food, grow, respire, respond to changes (stimuli), excrete wastes, reproduce, move and die." },
        { title: "Stimuli", body: "A plant bends towards sunlight; leaves of a 'touch-me-not' fold when touched. These are responses to stimuli." },
        { title: "Reproduction", body: "Plants reproduce through seeds, cuttings (rose, menhdi) and buds (potato eyes). Animals lay eggs or give birth to young ones." },
        { title: "Seeds respire", body: "Push your hand into a sack of wheat — it's warm inside. The seeds are respiring and giving out heat." },
      ],
      check: [
        { id: "h6", kind: "mcq", q: "Which of these is a characteristic of all living things?", options: ["They move on wheels", "They respire", "They are green"], answer: 1, why: "All living things respire." },
        { id: "h7", kind: "tf", q: "Plants do not respond to stimuli.", answer: false, why: "Plants bend towards light; touch-me-not leaves fold when touched." },
      ],
      connect: [
        { icon: "🌱", title: "Plant a cutting", body: "Plant a rose or menhdi cutting and watch it grow roots." },
        { icon: "🥔", title: "Potato eyes", body: "The 'eyes' of a potato can grow into new plants." },
        { icon: "🌿", title: "Touch-me-not", body: "Touch its leaves and watch them fold." },
      ],
    },
  ],
  learnt: [
    "The surroundings where plants and animals live is their habitat. Several kinds of organisms can share a habitat.",
    "Features and habits that help an organism live in its habitat are adaptations.",
    "Habitats are broadly terrestrial (on land) or aquatic (in water).",
    "Habitats have biotic (living) and abiotic (non-living, like rocks, soil, air, water) components.",
    "Living things need food, respire, respond to stimuli, excrete, reproduce, grow and move.",
  ],
  keywords: ["Habitat", "Adaptation", "Terrestrial", "Aquatic", "Biotic", "Abiotic", "Stimulus", "Respiration", "Excretion", "Reproduction"],
};

export default chapter;
