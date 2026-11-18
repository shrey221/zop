// Chapter 2 · Components of Food (NCERT Science Class VI, 2018-19, pp. 8–17).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { ExploreLab, SortLab, TestLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Readout, Stage } from "../ui";

/* Stop 1 · food tests */
const FOODS = [
  { id: "potato", name: "Raw potato", icon: "🥔", results: { starch: true, protein: false, fat: false } },
  { id: "rice", name: "Cooked rice", icon: "🍚", results: { starch: true, protein: false, fat: false } },
  { id: "bread", name: "Bread", icon: "🍞", results: { starch: true, protein: false, fat: false } },
  { id: "egg", name: "Egg white", icon: "🥚", results: { starch: false, protein: true, fat: false } },
  { id: "dal", name: "Dal paste", icon: "🥣", results: { starch: true, protein: true, fat: false } },
  { id: "milk", name: "Milk", icon: "🥛", results: { starch: false, protein: true, fat: true } },
  { id: "nut", name: "Groundnut", icon: "🥜", results: { starch: false, protein: true, fat: true } },
  { id: "oil", name: "Cooking oil", icon: "🛢", results: { starch: false, protein: false, fat: true } },
  { id: "coconut", name: "Coconut", icon: "🥥", results: { starch: false, protein: false, fat: true } },
  { id: "apple", name: "Apple", icon: "🍎", results: { starch: false, protein: false, fat: false } },
];
function FoodTests({ discover }: SimProps) {
  return (
    <TestLab
      discover={discover}
      intro="Pick a test, then tap a food to try it."
      tests={[
        { id: "starch", label: "Iodine test for starch", icon: "🧪", yes: "turns blue-black: starch is present", no: "no blue-black colour: no starch", color: "#24227a" },
        { id: "protein", label: "Copper sulphate + caustic soda for protein", icon: "💜", yes: "turns violet: protein is present", no: "no violet colour: no protein", color: "#8b5cf6" },
        { id: "fat", label: "Paper rub for fat", icon: "📄", yes: "leaves an oily patch: fat is present", no: "no oily patch: no fat", color: "#e8c35a" },
      ]}
      items={FOODS}
      rules={[
        { id: "starch", when: (s) => s.test.id === "starch" && !!s.positive },
        { id: "protein", when: (s) => s.test.id === "protein" && !!s.positive },
        { id: "fat", when: (s) => s.test.id === "fat" && !!s.positive },
        { id: "two", when: (s) => FOODS.some((f) => ["starch", "protein", "fat"].filter((t) => s.tested[t]?.includes(f.id) && f.results[t as "fat"]).length >= 2) },
      ]}
    />
  );
}

/* Stop 2 · what nutrients do */
const JOBS = [
  { id: "rice", label: "Rice", icon: "🍚", bin: "energy", why: "Rich in carbohydrates — they give energy." },
  { id: "potato", label: "Potato", icon: "🥔", bin: "energy", why: "Starch is a carbohydrate, an energy food." },
  { id: "ghee", label: "Ghee", icon: "🥄", bin: "energy", why: "Fats give even more energy than carbohydrates." },
  { id: "dal", label: "Dal", icon: "🥣", bin: "build", why: "Pulses are rich in proteins — body-building food." },
  { id: "egg", label: "Egg", icon: "🥚", bin: "build", why: "Proteins help the body grow and repair itself." },
  { id: "paneer", label: "Paneer", icon: "🧀", bin: "build", why: "Paneer gives protein (and calcium)." },
  { id: "orange", label: "Orange", icon: "🍊", bin: "protect", why: "Vitamin C protects us from disease and keeps gums healthy." },
  { id: "spinach", label: "Spinach", icon: "🥬", bin: "protect", why: "Green leafy vegetables give vitamins and minerals like iron." },
  { id: "carrot", label: "Carrot", icon: "🥕", bin: "protect", why: "Vitamin A keeps our eyes and skin healthy." },
];
const all = (p: Record<string, string>, bin: string) => JOBS.filter((j) => j.bin === bin).every((j) => p[j.id]);
function JobSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Tap a food, then the job its main nutrient does in the body."
      bins={[
        { id: "energy", label: "Energy", icon: "⚡", color: "#ffd257" },
        { id: "build", label: "Growth", icon: "💪", color: "#ff8a7a" },
        { id: "protect", label: "Protection", icon: "🛡", color: "#5fe0a0" },
      ]}
      items={JOBS}
      rules={[
        { id: "energy", when: (p) => all(p, "energy") },
        { id: "build", when: (p) => all(p, "build") },
        { id: "protect", when: (p) => all(p, "protect") },
      ]}
    />
  );
}

/* Stop 3 · build a balanced plate */
type Dish = { id: string; label: string; icon: string; e?: 1; g?: 1; p?: 1; r?: 1; w?: 1; fried?: 1 };
const DISHES: Dish[] = [
  { id: "rice", label: "Rice", icon: "🍚", e: 1 },
  { id: "roti", label: "Roti", icon: "🍞", e: 1, r: 1 },
  { id: "dal", label: "Dal", icon: "🥣", g: 1 },
  { id: "egg", label: "Egg", icon: "🥚", g: 1 },
  { id: "milk", label: "Milk", icon: "🥛", g: 1, p: 1 },
  { id: "salad", label: "Salad", icon: "🥗", p: 1, r: 1 },
  { id: "fruit", label: "Fruit", icon: "🍎", p: 1, r: 1 },
  { id: "water", label: "Water", icon: "💧", w: 1 },
  { id: "samosa", label: "Samosa", icon: "🥟", e: 1, fried: 1 },
  { id: "pakora", label: "Pakora", icon: "🍤", e: 1, fried: 1 },
  { id: "sweet", label: "Fried sweet", icon: "🍩", e: 1, fried: 1 },
];
function Plate({ discover }: SimProps) {
  const [plate, setPlate] = useState<string[]>([]);
  const items = plate.map((id) => DISHES.find((d) => d.id === id)!);
  const sum = (k: keyof Dish) => items.filter((d) => d[k]).length;
  const [e, g, p, r, w, fried] = (["e", "g", "p", "r", "w", "fried"] as const).map(sum);
  const mix = e > 0 && g > 0 && p > 0;
  const balanced = mix && r > 0 && w > 0 && fried <= 1;
  useEffect(() => {
    if (mix) discover("mix");
    if (r > 0) discover("roughage");
    if (fried >= 2) discover("fried");
    if (balanced) discover("balanced");
  }, [mix, r, fried, balanced, discover]);

  return (
    <Stage
      caption={
        fried >= 2
          ? "Too much fried food! Eating lots of fat-rich food can make us obese. Swap some for salad or fruit."
          : balanced
            ? "A balanced meal: energy, body-building and protective foods, plus roughage and water. 🎉"
            : mix
              ? "Good mix of nutrients! Now add roughage (salad, fruit or roti) and some water."
              : "Tap foods to put them on the plate (up to 8). Can you make a balanced meal?"
      }
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_190px]">
        <div className="relative mx-auto grid aspect-square w-full max-w-[260px] place-items-center rounded-full bg-[#f4efe3] shadow-[inset_0_0_0_10px_#e2dccd]">
          <div className="flex max-w-[200px] flex-wrap justify-center gap-1">
            {items.length === 0 && <span className="text-sm font-extrabold text-ink/40">empty plate</span>}
            {items.map((d, i) => (
              <button key={i} onClick={() => setPlate((pl) => pl.filter((_, k) => k !== i))} className="animate-pop text-4xl" aria-label={`Remove ${d.label}`}>
                {d.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
          <Readout label="Energy" value={"⚡".repeat(Math.min(e, 4)) || "–"} />
          <Readout label="Growth" value={"💪".repeat(Math.min(g, 4)) || "–"} color="#ff8a7a" />
          <Readout label="Protection" value={"🛡".repeat(Math.min(p, 4)) || "–"} color="#5fe0a0" />
          <Readout label="Roughage · Water" value={`${r ? "✓" : "–"} · ${w ? "✓" : "–"}`} color="#7fe3f0" />
        </div>
      </div>
      <div className="border-t border-white/10 px-3 py-3">
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
          {DISHES.map((d) => (
            <button
              key={d.id}
              onClick={() => plate.length < 8 && setPlate((pl) => [...pl, d.id])}
              className="press flex flex-col items-center rounded-2xl bg-white/5 px-1 py-2 text-[11px] font-extrabold ring-1 ring-white/10 hover:bg-white/10"
            >
              <span className="text-xl">{d.icon}</span>
              {d.label}
            </button>
          ))}
        </div>
        <div className="mt-2">
          <Btn onClick={() => setPlate([])}>↺ Clear the plate</Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 4 · deficiency diseases on a body map */
function Body() {
  return (
    <g>
      <rect width="520" height="360" fill="#13112b" />
      <circle cx="260" cy="70" r="44" fill="#f2c39b" />
      <circle cx="244" cy="62" r="5" fill="#2b2a30" />
      <circle cx="276" cy="62" r="5" fill="#2b2a30" />
      <path d="M246 90 q14 10 28 0" stroke="#a0522d" strokeWidth="3" fill="none" />
      <rect x="246" y="112" width="28" height="18" fill="#f2c39b" />
      <rect x="214" y="128" width="92" height="110" rx="20" fill="#5b8def" />
      <path d="M214 140 L176 220 M306 140 L344 220" stroke="#f2c39b" strokeWidth="18" strokeLinecap="round" />
      <path d="M240 236 Q228 290 236 340 M280 236 Q292 290 284 340" stroke="#f2c39b" strokeWidth="20" strokeLinecap="round" fill="none" />
      <circle cx="290" cy="180" r="10" fill="#e5484d" opacity=".75" />
    </g>
  );
}
function Deficiency({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Tap each glowing part of the body to see which nutrient keeps it healthy — and what happens without it."
      viewBox="0 0 520 360"
      art={<Body />}
      spots={[
        { id: "eyes", label: "Eyes · Vitamin A", x: 260, y: 62, text: "Without enough vitamin A, eyesight gets poor — especially at night (night blindness). Carrots, milk, papaya and leafy greens help." },
        { id: "gums", label: "Gums · Vitamin C", x: 260, y: 96, text: "Lack of vitamin C causes scurvy: bleeding gums and slow-healing wounds. Eat citrus fruits like oranges and amla." },
        { id: "teeth", label: "Teeth · Calcium", x: 300, y: 104, text: "Lack of calcium leads to weak bones and tooth decay. Milk and curd are good sources." },
        { id: "legs", label: "Bones · Vitamin D", x: 236, y: 300, text: "Without vitamin D, bones become soft and bent — a disease called rickets. Sunlight helps our body make vitamin D." },
        { id: "neck", label: "Neck · Iodine", x: 260, y: 122, text: "Lack of iodine causes goitre: glands in the neck swell up. Iodised salt prevents it." },
        { id: "blood", label: "Blood · Iron", x: 290, y: 180, text: "Lack of iron causes anaemia — a person feels weak and tired. Spinach, jaggery and dates contain iron." },
        { id: "muscle", label: "Muscles · Vitamin B1", x: 176, y: 214, text: "Lack of vitamin B1 causes beriberi: weak muscles and very little energy to work." },
      ]}
      groups={{ eyes: ["eyes"], gums: ["gums"], bones: ["legs", "teeth"], minerals: ["neck", "blood"] }}
    />
  );
}

const chapter: Chapter = {
  id: "nutrients",
  n: 2,
  title: "Components of Food",
  pages: "8–17",
  icon: "🥗",
  theme: { grad: "linear-gradient(135deg,#0d3320 0%,#1f8a4c 55%,#a7d65a 125%)", accent: "#1b7f45", soft: "#e2f6e6", ink: "#11552f" },
  opening: "Food in Kerala, Punjab and Assam looks very different. Yet everyone stays healthy. What do all these meals have in common?",
  stops: [
    {
      id: "tests",
      icon: "🧪",
      title: "What's in my food?",
      pages: "8–11",
      wonder: {
        q: "A drop of iodine solution is put on a piece of raw potato. What happens?",
        options: [
          { id: "nothing", label: "Nothing changes" },
          { id: "blue", label: "It turns blue-black" },
          { id: "violet", label: "It turns violet" },
        ],
        answer: "blue",
        reveal: "It turns blue-black — the sign that the potato contains starch, a carbohydrate.",
      },
      explore: { activity: "Activity 2", title: "Three food tests", how: "Test foods for starch, protein and fat. Build a results table like Table 2.2.", Sim: FoodTests },
      discoveries: [
        { id: "starch", text: "Iodine turns starchy food blue-black" },
        { id: "protein", text: "Copper sulphate + caustic soda turns protein food violet" },
        { id: "fat", text: "Fatty food leaves an oily patch on paper" },
        { id: "two", text: "Some foods contain more than one nutrient" },
      ],
      understand: [
        { title: "Nutrients", body: "The useful components of food our body needs are nutrients: carbohydrates, proteins, fats, vitamins and minerals." },
        { title: "Also needed", body: "Food also contains dietary fibres (roughage) and water, which our body needs." },
        { title: "Testing food", body: "Starch turns blue-black with iodine. Protein turns violet with copper sulphate and caustic soda. Fat leaves an oily patch on paper." },
      ],
      check: [
        { id: "n1", kind: "mcq", q: "Which colour shows starch in the iodine test?", options: ["Violet", "Blue-black", "Yellow"], answer: 1, why: "Starch gives a blue-black colour with dilute iodine solution." },
        { id: "n2", kind: "tf", q: "Food usually contains more than one nutrient.", answer: true, why: "Milk, for example, has both protein and fat." },
      ],
      connect: [
        { icon: "🍳", title: "Kitchen chemistry", body: "With an adult's help, try the iodine test on bread or rice at home." },
        { icon: "🗺", title: "Same nutrients, different food", body: "Idli, roti and rice look different but all give carbohydrates." },
        { icon: "📋", title: "Read labels", body: "Food packets list carbohydrates, proteins and fats in each serving." },
      ],
    },
    {
      id: "jobs",
      icon: "💪",
      title: "What do nutrients do?",
      pages: "11–13",
      wonder: {
        q: "You're growing fast. Which nutrient does most to build your body?",
        options: [
          { id: "carb", label: "Carbohydrates" },
          { id: "protein", label: "Proteins" },
          { id: "fat", label: "Fats" },
        ],
        answer: "protein",
        reveal: "Proteins are body-building foods: they're needed for growth and repair. Carbohydrates and fats mainly give energy.",
      },
      explore: { activity: "Section 2.2", title: "Who does what?", how: "Sort foods by the main job their nutrients do in the body.", Sim: JobSort },
      discoveries: [
        { id: "energy", text: "Carbohydrates and fats give us energy" },
        { id: "build", text: "Proteins help the body grow and repair" },
        { id: "protect", text: "Vitamins and minerals protect us from disease" },
      ],
      understand: [
        { title: "Energy-giving", body: "Carbohydrates and fats mainly provide energy. Fats give much more energy than the same amount of carbohydrates." },
        { title: "Body-building", body: "Proteins are needed for growth and the maintenance of our body." },
        { title: "Protective", body: "Vitamins (A, B, C, D, E, K) protect us from diseases. Minerals like iodine, iron and calcium are needed in small amounts." },
        { title: "Roughage and water", body: "Dietary fibre helps the body get rid of undigested food. Water helps absorb nutrients and remove wastes as urine and sweat." },
      ],
      check: [
        { id: "n3", kind: "mcq", q: "Which nutrients mainly provide energy?", options: ["Carbohydrates and fats", "Vitamins and minerals", "Proteins only"], answer: 0, why: "Carbohydrates and fats are energy-giving foods." },
        { id: "n4", kind: "mcq", q: "Roughage in our food…", options: ["gives lots of energy", "helps get rid of undigested food", "builds muscles"], answer: 1, why: "Dietary fibre mainly helps remove undigested food." },
      ],
      connect: [
        { icon: "☀️", title: "Sunshine vitamin", body: "Our body makes vitamin D in the presence of sunlight." },
        { icon: "🧂", title: "Iodised salt", body: "Salt with added iodine helps prevent goitre." },
        { icon: "💧", title: "Drink water", body: "Water carries away wastes as urine and sweat." },
      ],
    },
    {
      id: "plate",
      icon: "🍽",
      title: "A balanced diet",
      pages: "14–15",
      wonder: {
        q: "Boojho eats only fried food — samosas, pooris, sweets — because fats give the most energy. Is he right?",
        options: [
          { id: "yes", label: "Yes, more energy is always better" },
          { id: "no", label: "No — he needs other nutrients too, and too much fat is harmful" },
          { id: "sometimes", label: "Only on school days" },
        ],
        answer: "no",
        reveal: "No! Too much fat-rich food can make us obese, and a diet of only fats lacks proteins, vitamins, minerals and roughage.",
      },
      explore: { activity: "Section 2.3", title: "Build a balanced plate", how: "Tap foods to add them to the plate. Aim for energy, growth and protection — plus roughage and water.", Sim: Plate },
      discoveries: [
        { id: "mix", text: "A good meal mixes energy, body-building and protective foods" },
        { id: "roughage", text: "Salad, fruit and roti add roughage" },
        { id: "fried", text: "Too much fried food leads to obesity" },
        { id: "balanced", text: "You made a balanced meal!" },
      ],
      understand: [
        { title: "Balanced diet", body: "A balanced diet gives all the nutrients our body needs in the right amounts, along with enough roughage and water." },
        { title: "It needn't be costly", body: "Pulses, groundnut, soybean, sprouted seeds, fermented foods, fresh fruit and vegetables can make cheap, healthy meals." },
        { title: "Cook carefully", body: "Don't wash vegetables after cutting, and don't throw away extra cooking water — nutrients are lost. Vitamin C is easily destroyed by heat, so eat some raw fruit and vegetables." },
      ],
      check: [
        { id: "n5", kind: "tf", q: "Eating too much fat-rich food can make a person obese.", answer: true, why: "Excess fat in food is harmful for the body." },
        { id: "n6", kind: "mcq", q: "Why eat some raw fruits and vegetables?", options: ["Vitamin C is easily destroyed by cooking", "Raw food has no vitamins", "Cooked food has too much water"], answer: 0, why: "Heat destroys vitamin C." },
      ],
      connect: [
        { icon: "📝", title: "Your day's menu", body: "Write down everything you eat in a day. Is it balanced?" },
        { icon: "🥬", title: "Wash, then cut", body: "Washing vegetables after cutting them washes away vitamins." },
        { icon: "🍚", title: "Cooking water", body: "Rice water and dal water carry nutrients — don't waste them." },
      ],
    },
    {
      id: "deficiency",
      icon: "⚕️",
      title: "Deficiency diseases",
      pages: "15–16",
      wonder: {
        q: "Someone's gums bleed easily and their wounds heal slowly. Which nutrient might they be missing?",
        options: [
          { id: "c", label: "Vitamin C" },
          { id: "iron", label: "Iron" },
          { id: "fat", label: "Fat" },
        ],
        answer: "c",
        reveal: "Vitamin C. Its long-term lack causes scurvy. Citrus fruits like oranges and amla are rich in vitamin C.",
      },
      explore: { activity: "Table 2.3", title: "A body map of nutrients", how: "Tap each glowing spot to find out which nutrient keeps that part of the body healthy.", Sim: Deficiency },
      discoveries: [
        { id: "eyes", text: "Lack of vitamin A causes poor eyesight (night blindness)" },
        { id: "gums", text: "Lack of vitamin C causes scurvy" },
        { id: "bones", text: "Lack of vitamin D or calcium makes bones and teeth weak" },
        { id: "minerals", text: "Lack of iodine causes goitre; lack of iron causes anaemia" },
      ],
      understand: [
        { title: "Deficiency diseases", body: "Diseases caused by a lack of nutrients over a long period are called deficiency diseases." },
        { title: "Not enough protein", body: "Too little protein for a long time can cause stunted growth, a swollen face, discoloured hair, skin diseases and diarrhoea." },
        { title: "Prevention", body: "All deficiency diseases can be prevented by eating a balanced diet." },
      ],
      check: [
        {
          id: "n7",
          kind: "sort",
          q: "Vitamin or mineral? Which one is missing?",
          bins: ["A vitamin", "A mineral"],
          items: [
            { label: "Scurvy", bin: 0 },
            { label: "Rickets", bin: 0 },
            { label: "Beriberi", bin: 0 },
            { label: "Goitre", bin: 1 },
            { label: "Anaemia", bin: 1 },
          ],
          why: "Scurvy (C), rickets (D), beriberi (B1) are vitamin deficiencies; goitre (iodine) and anaemia (iron) are mineral deficiencies.",
        },
        { id: "n8", kind: "mcq", q: "Which disease is caused by a lack of vitamin D?", options: ["Rickets", "Goitre", "Scurvy"], answer: 0, why: "Without vitamin D, bones become soft and bent." },
      ],
      connect: [
        { icon: "🍊", title: "Amla and oranges", body: "Packed with vitamin C." },
        { icon: "🧂", title: "Iodised salt", body: "Check the label on the salt packet at home." },
        { icon: "🌞", title: "Play outside", body: "Sunlight helps your body make vitamin D for strong bones." },
      ],
    },
  ],
  learnt: [
    "The major nutrients in food are carbohydrates, proteins, fats, vitamins and minerals. Food also has dietary fibre and water.",
    "Carbohydrates and fats mainly provide energy.",
    "Proteins and minerals are needed for growth and maintenance of the body.",
    "Vitamins help protect our body against diseases.",
    "A balanced diet provides all the nutrients our body needs in the right amounts, with roughage and water.",
    "Deficiency of nutrients over a long time can cause deficiency diseases.",
  ],
  keywords: ["Nutrients", "Carbohydrates", "Proteins", "Fats", "Vitamins", "Minerals", "Roughage", "Balanced diet", "Deficiency diseases"],
};

export default chapter;
