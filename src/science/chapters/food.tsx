// Chapter 1 · Food: Where Does It Come From? (NCERT Science Class VI, 2018-19, pp. 1–7).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { ExploreLab, SortLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Stage } from "../ui";

/* Stop 1 · plant or animal? */
const SOURCES = [
  { id: "rice", label: "Rice", icon: "🍚", bin: "plant", why: "Rice grains come from paddy plants." },
  { id: "wheat", label: "Wheat atta", icon: "🌾", bin: "plant", why: "Atta is ground from wheat grains." },
  { id: "sugar", label: "Sugar", icon: "🍬", bin: "plant", why: "Sugar comes from the stem of sugarcane." },
  { id: "spinach", label: "Spinach", icon: "🥬", bin: "plant", why: "We eat the leaves of the spinach plant." },
  { id: "oil", label: "Groundnut oil", icon: "🥜", bin: "plant", why: "Oil is pressed from groundnut seeds." },
  { id: "milk", label: "Milk", icon: "🥛", bin: "animal", why: "Cows, buffaloes and goats give us milk." },
  { id: "egg", label: "Egg", icon: "🥚", bin: "animal", why: "Eggs come from hens and other birds." },
  { id: "paneer", label: "Paneer", icon: "🧀", bin: "animal", why: "Paneer is made from milk — an animal product." },
  { id: "honey", label: "Honey", icon: "🍯", bin: "animal", why: "Bees collect nectar from flowers, turn it into honey and store it in their hive." },
];
const has = (p: Record<string, string>, ids: string[]) => ids.every((i) => p[i]);
function SourceSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Tap a food ingredient, then tap where it comes from."
      bins={[
        { id: "plant", label: "From plants", icon: "🌱", color: "#5fe0a0" },
        { id: "animal", label: "From animals", icon: "🐄", color: "#ffb86b" },
      ]}
      items={SOURCES}
      rules={[
        { id: "plants", when: (p) => has(p, SOURCES.filter((s) => s.bin === "plant").map((s) => s.id)) },
        { id: "animals", when: (p) => has(p, ["milk", "egg", "paneer"]) },
        { id: "honey", when: (p) => !!p.honey },
      ]}
    />
  );
}

/* Stop 2 · which part of a plant do we eat? */
function PlantArt() {
  return (
    <g>
      <rect width="520" height="340" fill="#cfe9ff" />
      <rect y="220" width="520" height="120" fill="#7a5530" />
      <text x="14" y="240" fontSize="11" fontWeight="800" fill="#f1dcc0">SOIL</text>
      {/* tap root shaped like a carrot */}
      <path d="M252 222 L268 222 L262 318 Z" fill="#f28c28" />
      <path d="M258 250 l-26 20 M262 270 l26 18 M260 292 l-20 14" stroke="#f1dcc0" strokeWidth="2" />
      {/* underground stem (potato) */}
      <path d="M262 226 C 300 236, 320 246, 330 256" stroke="#c8b07a" strokeWidth="4" fill="none" />
      <ellipse cx="344" cy="262" rx="26" ry="18" fill="#c9a25f" />
      <circle cx="336" cy="258" r="2" fill="#8a6a36" />
      <circle cx="352" cy="266" r="2" fill="#8a6a36" />
      {/* stem */}
      <path d="M260 222 V70" stroke="#3f8f50" strokeWidth="9" strokeLinecap="round" />
      {/* leaves */}
      <path d="M260 170 C 210 150, 180 175, 160 160 C 190 200, 230 190, 260 175 Z" fill="#3fae5a" />
      <path d="M260 130 C 310 110, 340 135, 360 120 C 330 165, 290 150, 260 136 Z" fill="#3fae5a" />
      {/* flower */}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="260" cy="48" rx="11" ry="22" fill="#ffe28a" transform={`rotate(${a} 260 66)`} />
      ))}
      <circle cx="260" cy="66" r="10" fill="#f5a524" />
      {/* fruit (brinjal) */}
      <path d="M260 196 C 290 200, 300 205, 300 214" stroke="#3f8f50" strokeWidth="4" fill="none" />
      <ellipse cx="312" cy="222" rx="14" ry="22" fill="#6a2c91" transform="rotate(-25 312 222)" />
      {/* seed pod */}
      <path d="M260 100 C 220 96, 205 100, 196 92" stroke="#3f8f50" strokeWidth="4" fill="none" />
      <path d="M150 86 q24 -18 48 0 q-24 18 -48 0 z" fill="#b9d36c" />
      {[160, 172, 184].map((x) => (
        <circle key={x} cx={x} cy={86} r="4" fill="#d9a441" />
      ))}
    </g>
  );
}
function PlantParts({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Tap the glowing dots to find which part of a plant each food comes from."
      viewBox="0 0 520 340"
      art={<PlantArt />}
      spots={[
        { id: "root", label: "Root", x: 262, y: 290, text: "We eat the roots of carrot, radish, beetroot and sweet potato." },
        { id: "stem", label: "Stem", x: 344, y: 262, text: "A potato is really a stem that grows underground! Sugarcane is a stem too — it gives us sugar." },
        { id: "leaf", label: "Leaf", x: 205, y: 168, text: "Spinach, cabbage, methi and mustard leaves are all leafy vegetables." },
        { id: "flower", label: "Flower", x: 260, y: 40, text: "Cauliflower and broccoli are flowers. Some people eat pumpkin flowers dipped in rice paste and fried." },
        { id: "fruit", label: "Fruit", x: 312, y: 222, text: "Brinjal, tomato, mango and chillies are fruits of plants." },
        { id: "seed", label: "Seed", x: 172, y: 86, text: "Rice, wheat, dals and groundnuts are seeds. Mustard seeds give oil — and its leaves are a vegetable too!" },
      ]}
      groups={{ root: ["root"], stem: ["stem"], leafflower: ["leaf", "flower"], fruitseed: ["fruit", "seed"] }}
    />
  );
}

/* Stop 3 · sprouting seeds */
const DAYS = ["Dry seeds", "Soaked for a day", "Wrapped in a wet cloth", "Ready to eat"];
function Sprouts({ discover }: SimProps) {
  const [day, setDay] = useState(0);
  useEffect(() => {
    if (day >= 1) discover("swell");
    if (day >= 2) discover("sprout");
    if (day >= 3) discover("grow");
  }, [day, discover]);
  const seeds = Array.from({ length: 14 }, (_, i) => ({ x: 170 + ((i * 47) % 180), y: 150 + ((i * 23) % 40), a: (i * 61) % 360 }));
  const r = day === 0 ? 7 : 10;
  const len = [0, 0, 14, 34][day];
  return (
    <Stage
      caption={
        [
          "Dry moong seeds are small and hard. Soak them in water for a day.",
          "The seeds soaked up water and swelled. Now drain the water and wrap them in a wet cloth.",
          "A small white structure has grown out of each seed — the seeds have sprouted!",
          "After washing, sprouts can be eaten raw or boiled with a little spice. A tasty snack!",
        ][day]
      }
    >
      <svg viewBox="0 0 520 250" className="block h-auto w-full select-none">
        <rect width="520" height="250" fill="#13112b" />
        <path d="M120 140 Q260 250 400 140 Z" fill="#e9edf5" />
        {day === 1 && <path d="M136 150 Q260 236 384 150 Z" fill="#4fb6e0" opacity=".55" />}
        {day === 2 && <path d="M150 128 q110 -40 220 0 q-110 30 -220 0 z" fill="#f4efe3" opacity=".55" />}
        {seeds.map((s, i) => (
          <g key={i} transform={`rotate(${s.a} ${s.x} ${s.y})`}>
            {len > 0 && <path d={`M${s.x + r - 2} ${s.y} q${len * 0.6} ${-len * 0.2} ${len} ${-len * 0.5}`} stroke="#f4f8e8" strokeWidth="3" fill="none" strokeLinecap="round" style={{ transition: "all .5s" }} />}
            <ellipse cx={s.x} cy={s.y} rx={r} ry={r * 0.7} fill={day === 0 ? "#3f8f50" : "#5fae5a"} style={{ transition: "all .5s" }} />
          </g>
        ))}
        <text x="260" y="40" fontSize="15" fontWeight="900" fill="#ffd257" textAnchor="middle">
          Day {day} · {DAYS[day]}
        </text>
      </svg>
      <div className="border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Day</span>
          <input type="range" min={0} max={3} step={1} value={day} onChange={(e) => setDay(+e.target.value)} className="w-full accent-[#5fe0a0]" aria-label="Days passed" />
        </label>
      </div>
    </Stage>
  );
}

/* Stop 4 · what do animals eat? */
const EATERS = [
  { id: "cow", label: "Cow", icon: "🐄", bin: "herb", why: "A cow eats grass, hay and grains — only plants." },
  { id: "deer", label: "Deer", icon: "🦌", bin: "herb", why: "A deer eats only plant products." },
  { id: "rabbit", label: "Rabbit", icon: "🐇", bin: "herb", why: "Rabbits eat grass, leaves and vegetables." },
  { id: "lion", label: "Lion", icon: "🦁", bin: "carn", why: "A lion eats only other animals." },
  { id: "tiger", label: "Tiger", icon: "🐅", bin: "carn", why: "A tiger eats only meat." },
  { id: "lizard", label: "House lizard", icon: "🦎", bin: "carn", why: "A house lizard eats insects." },
  { id: "crow", label: "Crow", icon: "🐦", bin: "omni", why: "A crow eats grains and fruit, but also insects and scraps of meat." },
  { id: "bear", label: "Bear", icon: "🐻", bin: "omni", why: "Bears eat fruit, honey and roots, and also fish and small animals." },
  { id: "human", label: "Human", icon: "🧒", bin: "omni", why: "Many people eat both plant food and animal products like milk, eggs or meat." },
];
function AnimalSort({ discover }: SimProps) {
  const ids = (b: string) => EATERS.filter((e) => e.bin === b).map((e) => e.id);
  return (
    <SortLab
      discover={discover}
      intro="Tap an animal, then the group that matches what it eats."
      bins={[
        { id: "herb", label: "Herbivores", icon: "🌿", color: "#5fe0a0" },
        { id: "carn", label: "Carnivores", icon: "🍖", color: "#ff8a7a" },
        { id: "omni", label: "Omnivores", icon: "🍽", color: "#ffd257" },
      ]}
      items={EATERS}
      rules={[
        { id: "herb", when: (p) => has(p, ids("herb")) },
        { id: "carn", when: (p) => has(p, ids("carn")) },
        { id: "omni", when: (p) => has(p, ["crow", "bear"]) },
        { id: "human", when: (p) => !!p.human },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "food",
  n: 1,
  title: "Food: Where Does It Come From?",
  pages: "1–7",
  icon: "🍲",
  theme: { grad: "linear-gradient(135deg,#3b1a05 0%,#c2560e 55%,#f2b84b 125%)", accent: "#c2560e", soft: "#ffedd9", ink: "#7a3505" },
  opening: "What did you eat at home today? What did your friend eat? Every meal is made of ingredients — and every ingredient comes from somewhere.",
  stops: [
    {
      id: "sources",
      icon: "🧺",
      title: "Plants or animals?",
      pages: "1–3",
      wonder: {
        q: "Honey is sweet and sticky. Where does it come from?",
        options: [
          { id: "plant", label: "Straight from a plant" },
          { id: "bees", label: "From bees" },
          { id: "factory", label: "It is made in factories" },
        ],
        answer: "bees",
        reveal: "From bees! They collect nectar from flowers, turn it into honey and store it in their hive to use all year.",
      },
      explore: { activity: "Activities 1–3", title: "Trace the ingredients", how: "Every dish is made of ingredients. Sort them by where they come from.", Sim: SourceSort },
      discoveries: [
        { id: "plants", text: "Grains, sugar, vegetables and oil come from plants" },
        { id: "animals", text: "Milk, eggs and paneer come from animals" },
        { id: "honey", text: "Bees make honey from the nectar of flowers" },
      ],
      understand: [
        { title: "So much variety", body: "People in different regions of India eat many different foods. Some dishes need two ingredients (rice and water); others, like a curry, need many." },
        { title: "Ingredients", body: "The materials needed to prepare a dish are its ingredients." },
        { title: "Two main sources", body: "Plants give us grains, vegetables, fruits and oil. Animals give us milk, eggs and meat. Milk products include butter, cream, cheese and curd." },
      ],
      check: [
        { id: "f1", kind: "mcq", q: "Which of these is an animal product?", options: ["Atta", "Ghee", "Sugar"], answer: 1, why: "Ghee is made from milk, which comes from animals." },
        { id: "f2", kind: "mcq", q: "We get sugar from…", options: ["Sugarcane", "Bees", "Salt water"], answer: 0, why: "Sugar is made from the stem of sugarcane." },
      ],
      connect: [
        { icon: "🗺", title: "Food across India", body: "Make a map of foods eaten in different states. Look how varied it is!" },
        { icon: "🐝", title: "Beehives", body: "Bees store nectar as honey because flowers bloom only for part of the year." },
        { icon: "🥣", title: "Your plate", body: "Pick today's meal and list each ingredient and its source." },
      ],
    },
    {
      id: "parts",
      icon: "🥕",
      title: "Which part do we eat?",
      pages: "3–4",
      wonder: {
        q: "A potato grows under the ground. Which part of the plant is it?",
        options: [
          { id: "root", label: "A root" },
          { id: "stem", label: "A stem" },
          { id: "fruit", label: "A fruit" },
        ],
        answer: "stem",
        reveal: "Surprise — a potato is a stem that grows underground! Carrots and radishes are the roots.",
      },
      explore: { activity: "Activity 4", title: "Edible plant parts", how: "Tap each glowing part of the plant to find foods we eat from it.", Sim: PlantParts },
      discoveries: [
        { id: "root", text: "Carrots and radishes are roots" },
        { id: "stem", text: "A potato is an underground stem" },
        { id: "leafflower", text: "We eat leaves (spinach) and flowers (cauliflower)" },
        { id: "fruitseed", text: "Fruits and seeds are food too — like brinjal and dal" },
      ],
      understand: [
        { title: "Many edible parts", body: "We eat roots, stems, leaves, flowers, fruits and seeds of different plants." },
        { title: "Two parts, one plant", body: "Some plants have two or more edible parts. Mustard seeds give oil and its leaves are a vegetable. Think of the banana plant!" },
        { title: "Be careful", body: "Never taste unknown plants to see if they are edible — some plants are poisonous." },
      ],
      check: [
        {
          id: "f3",
          kind: "sort",
          q: "Which part of the plant do we eat?",
          bins: ["Root or stem", "Leaf, flower or fruit"],
          items: [
            { label: "Carrot", bin: 0 },
            { label: "Potato", bin: 0 },
            { label: "Sugarcane", bin: 0 },
            { label: "Spinach", bin: 1 },
            { label: "Cauliflower", bin: 1 },
            { label: "Brinjal", bin: 1 },
          ],
          why: "Carrot is a root; potato and sugarcane are stems. Spinach is a leaf, cauliflower a flower, brinjal a fruit.",
        },
        { id: "f4", kind: "tf", q: "All living beings need exactly the same kind of food.", answer: false, why: "A cow eats grass, a lion eats meat — food varies a lot." },
      ],
      connect: [
        { icon: "🍌", title: "Banana plant", body: "We eat its fruit, its flower is cooked as a vegetable, and its stem too in some places." },
        { icon: "🌸", title: "Pumpkin flowers", body: "Dipped in rice paste and fried — have you tried them?" },
        { icon: "🥗", title: "Salad detective", body: "Make a salad and name the plant part of every ingredient." },
      ],
    },
    {
      id: "sprouts",
      icon: "🌱",
      title: "Grow your own sprouts",
      pages: "4",
      wonder: {
        q: "You soak moong seeds in water for a day, then wrap them in a wet cloth. What happens next?",
        options: [
          { id: "nothing", label: "Nothing — they're just wet" },
          { id: "sprout", label: "Little white shoots grow out" },
          { id: "dissolve", label: "They dissolve" },
        ],
        answer: "sprout",
        reveal: "They sprout! A small white structure grows out of each seed. Sprouts are a healthy snack.",
      },
      explore: { activity: "Activity 5", title: "Sprouting moong", how: "Slide through the days and watch the seeds change.", Sim: Sprouts },
      discoveries: [
        { id: "swell", text: "Soaked seeds swell up with water" },
        { id: "sprout", text: "In a wet cloth, the seeds sprout" },
        { id: "grow", text: "Sprouts grow longer — ready to wash and eat" },
      ],
      understand: [
        { title: "Seeds are alive", body: "With water and time, a seed starts to grow into a new plant. Sprouting is the very first step." },
        { title: "Sprouts as food", body: "Washed sprouts can be eaten raw or boiled with spices." },
        { title: "Try it yourself", body: "Moong and chana are easy to sprout. If they haven't sprouted, wash, drain and wait another day." },
      ],
      check: [{ id: "f5", kind: "mcq", q: "What did the seeds need to sprout?", options: ["Water and a little time", "Salt", "Bright lamp light only"], answer: 0, why: "Soaking and a wet cloth gave the seeds the water they needed." }],
      connect: [
        { icon: "📏", title: "Sprout project", body: "Grow sprouts for a week and measure their length every day with a string." },
        { icon: "🥙", title: "Sprout chaat", body: "Add onion, tomato, lemon and spice to sprouts for a tasty snack." },
        { icon: "🌾", title: "Farms start here", body: "Every field of wheat began with seeds sprouting in the soil." },
      ],
    },
    {
      id: "eaters",
      icon: "🦁",
      title: "What do animals eat?",
      pages: "5–6",
      wonder: {
        q: "A crow eats grains — and insects too. Which group does it belong to?",
        options: [
          { id: "herb", label: "Herbivore" },
          { id: "carn", label: "Carnivore" },
          { id: "omni", label: "Omnivore" },
        ],
        answer: "omni",
        reveal: "Omnivore — an animal that eats both plants and other animals.",
      },
      explore: { activity: "Activities 6 & 7", title: "Sort the eaters", how: "Put each animal in the group that matches its food.", Sim: AnimalSort },
      discoveries: [
        { id: "herb", text: "Herbivores eat only plants or plant products" },
        { id: "carn", text: "Carnivores eat only other animals" },
        { id: "omni", text: "Omnivores eat both plants and animals" },
        { id: "human", text: "Many humans are omnivores" },
      ],
      understand: [
        { title: "Herbivores", body: "Animals that eat only plants or plant products — like cows, deer and rabbits." },
        { title: "Carnivores", body: "Animals that eat other animals — like lions and tigers." },
        { title: "Omnivores", body: "Animals that eat both plants and animals — like crows, bears and many humans." },
        { title: "Food for all", body: "Many people still don't get enough food. We must grow more food, make it available to everyone, and not waste it." },
      ],
      check: [
        { id: "f6", kind: "mcq", q: "A tiger is a ______ because it eats only meat.", options: ["herbivore", "carnivore", "omnivore"], answer: 1, why: "Animals that eat only other animals are carnivores." },
        { id: "f7", kind: "mcq", q: "A deer eats only plant products, so it is a…", options: ["herbivore", "carnivore", "omnivore"], answer: 0, why: "Plant-eaters are herbivores." },
      ],
      connect: [
        { icon: "🐿", title: "Watch a squirrel", body: "What does a squirrel eat? Observe and find out." },
        { icon: "🦎", title: "Lizards", body: "Compare what a garden lizard and a house lizard eat." },
        { icon: "🍛", title: "Don't waste food", body: "Take only what you can eat — food is precious." },
      ],
    },
  ],
  learnt: [
    "There is a lot of variety in the food eaten in different regions of India.",
    "The main sources of our food are plants and animals.",
    "Animals that eat only plants are herbivores; those that eat only animals are carnivores.",
    "Animals that eat both plants and animals are omnivores.",
  ],
  keywords: ["Ingredients", "Edible", "Nectar", "Sprouted seeds", "Herbivore", "Carnivore", "Omnivore"],
};

export default chapter;
