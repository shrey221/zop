// Geography Chapter 8 · India: Climate, Vegetation and Wildlife (NCERT The Earth: Our Habitat, 2020-21, pp. 56–62).
// Wording is original; facts follow the textbook.
import { useEffect, useState } from "react";
import { MAP_VIEWBOX, SketchMap, proj } from "../../history/map";
import { ExploreLab, PickLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";

/* Stop 1 · seasons of India */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const seasonOf = (m: number) => (m === 11 || m <= 1 ? "cold" : m <= 4 ? "hot" : m <= 8 ? "monsoon" : "retreat");
const SEASONS = {
  cold: { name: "Cold weather season (winter)", months: "December to February", text: "The sun's rays do not fall directly on the region, so temperatures are quite low in northern India.", color: "#8fb3ff" },
  hot: { name: "Hot weather season (summer)", months: "March to May", text: "The sun's rays fall more or less directly; temperatures become very high. Hot, dry winds called loo blow during the day.", color: "#ff8a5c" },
  monsoon: { name: "South-west monsoon season (rainy)", months: "June to September", text: "Winds blow from the Arabian Sea and the Bay of Bengal towards the land, carrying moisture. When they strike mountain barriers, rain falls.", color: "#5fe0a0" },
  retreat: { name: "Retreating monsoon (autumn)", months: "October and November", text: "Winds move back from the mainland to the Bay of Bengal. Tamil Nadu and Andhra Pradesh get rain in this season.", color: "#ffd257" },
} as const;
function IndiaSeasons({ discover }: SimProps) {
  const [m, setM] = useState(0);
  const s = seasonOf(m);
  const S = SEASONS[s];
  useEffect(() => discover(s), [s, discover]);
  const arrows =
    s === "monsoon"
      ? [[[66, 14], [73, 18]], [[66, 10], [75, 13]], [[86, 15], [88, 21]], [[89, 15], [91, 22]]]
      : s === "retreat"
        ? [[[85, 25], [87, 18]], [[82, 22], [84, 16]], [[80, 18], [81.5, 13]]]
        : [];
  return (
    <Stage caption={`${S.name} · ${S.months}. ${S.text}`}>
      <svg viewBox={MAP_VIEWBOX} className="block h-auto w-full select-none">
        <SketchMap rivers={false} />
        <rect width="520" height="440" fill={S.color} opacity=".12" />
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#fff" />
          </marker>
        </defs>
        {arrows.map(([a, b], i) => {
          const p = proj(a[0], a[1]);
          const q = proj(b[0], b[1]);
          return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#fff" strokeWidth="5" markerEnd="url(#arr)" strokeDasharray="10 6" style={{ animation: "zflow .8s linear infinite" }} />;
        })}
        {s === "monsoon" &&
          Array.from({ length: 24 }, (_, i) => {
            const p = proj(72 + ((i * 7) % 22), 12 + ((i * 5) % 16));
            return <line key={i} x1={p.x} y1={p.y} x2={p.x - 3} y2={p.y + 10} stroke="#bfe6ff" strokeWidth="2" style={{ animation: `zfall .9s linear ${i * 0.05}s infinite` }} />;
          })}
        {s === "hot" && <text x={proj(73, 26).x} y={proj(73, 26).y} fontSize="14" fontWeight="900" fill="#b8452a">~ loo ~</text>}
        {s === "retreat" && <circle cx={proj(79, 11).x} cy={proj(79, 11).y} r="26" fill="#5fe0a0" opacity=".45" className="animate-glow" />}
        <text x="20" y="40" fontSize="30" fontWeight="900" fill="#0d3f6b">
          {MONTHS[m]}
        </text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Month</span>
          <input type="range" min={0} max={11} value={m} onChange={(e) => setM(+e.target.value)} className="w-full accent-[#5fe0a0]" aria-label="Month" />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(SEASONS) as (keyof typeof SEASONS)[]).map((k) => (
            <span key={k} className={`rounded-full px-3 py-1 text-xs font-extrabold ${k === s ? "bg-white text-ink" : "bg-white/10 text-white/60"}`}>
              {SEASONS[k].name.split(" (")[0]}
            </span>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* Stop 2 · weather and climate */
function WeatherClimate({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Weather or climate? And why do places differ? Solve these."
      cases={[
        { id: "weather", icon: "⛅", prompt: "'It's cloudy and windy today' describes…", options: ["Weather", "Climate"], answer: 0, explain: "Weather is the day-to-day change in the atmosphere — temperature, rainfall, sunshine.", disc: "weather" },
        { id: "climate", icon: "📊", prompt: "The average weather of a place measured over many years is its…", options: ["Climate", "Weather"], answer: 0, explain: "Climate is the average weather condition measured over many years. India's climate is described as monsoon type.", disc: "climate" },
        { id: "rain", icon: "🌧", prompt: "Which place receives the world's highest rainfall?", options: ["Mawsynram, Meghalaya", "Jaisalmer, Rajasthan", "Drass"], answer: 0, explain: "Mawsynram in Meghalaya gets the world's highest rainfall, while some years it may not rain at all in Jaisalmer.", disc: "places" },
        { id: "factors", icon: "🧭", prompt: "Mumbai and Kolkata are neither too hot nor too cold, but humid. Why?", options: ["They are on the coast", "They are on high mountains", "They are in the desert"], answer: 0, explain: "Climate depends on location, altitude, distance from the sea and relief. Coastal places have moderate, humid climates; Drass and Kargil are freezing; Jaisalmer and Bikaner are very hot.", disc: "factors" },
      ]}
    />
  );
}

/* Stop 3 · why forests matter */
function Forest({ discover }: SimProps) {
  const [cover, setCover] = useState(80);
  const [planted, setPlanted] = useState(false);
  const low = cover < 30;
  useEffect(() => {
    if (cover <= 20) {
      discover("erosion");
      discover("habitat");
    }
    if (planted && cover >= 80) discover("plant");
  }, [cover, planted, discover]);
  const trees = Math.round(cover / 7);
  const animals = Math.max(0, Math.round((cover - 15) / 15));
  return (
    <Stage
      caption={
        low
          ? "With few trees, nothing binds the soil — rain washes it away (soil erosion). Animals lose their home, and fewer plants take in carbon dioxide and give out oxygen."
          : planted && cover >= 80
            ? "Planting and protecting trees brings the forest back — like the Van Mahotsav programme, or Leela's family, who planted a sapling every birthday."
            : "Forests give oxygen, bind the soil and are home to wildlife. Slide to cut down trees — then plant them back."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#9fd0f0" />
        <rect y="190" width="520" height="70" fill={low ? "#a07a3a" : "#5aa04a"} style={{ transition: "fill .6s" }} />
        {low && Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${40 + i * 60} 200 q10 20 30 34`} stroke="#7a5530" strokeWidth="4" fill="none" style={{ animation: `zflow 1s linear ${i * 0.1}s infinite`, strokeDasharray: "6 6" }} />)}
        {Array.from({ length: 14 }, (_, i) => {
          const x = 25 + i * 35;
          const alive = i < trees;
          return alive ? (
            <g key={i} className="animate-pop">
              <rect x={x - 3} y="150" width="7" height="44" fill="#6b4520" />
              <circle cx={x} cy="140" r="20" fill={i % 2 ? "#2f8a4a" : "#3fae5a"} />
            </g>
          ) : (
            <rect key={i} x={x - 4} y="184" width="9" height="8" fill="#8a5a2b" />
          );
        })}
        {Array.from({ length: animals }, (_, i) => (
          <text key={i} x={60 + i * 80} y="222" fontSize="22" className="animate-pop">
            {["🐅", "🐘", "🦌", "🐒", "🦚"][i % 5]}
          </text>
        ))}
        {!low && Array.from({ length: Math.round(cover / 20) }, (_, i) => <circle key={i} cx={60 + i * 100} cy="80" r="5" fill="#dff4ff" style={{ animation: `zrise 2.4s ease-out ${i * 0.3}s infinite` }} />)}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Forest cover</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={cover}
            onChange={(e) => {
              const v = +e.target.value;
              if (v > cover && cover <= 30) setPlanted(true);
              setCover(v);
            }}
            className="w-full accent-[#5fe0a0]"
            aria-label="Forest cover"
          />
        </label>
        <div className="grid grid-cols-3 gap-2">
          <Readout label="Trees" value={trees} color="#5fe0a0" />
          <Readout label="Wild animals" value={animals} color="#ffd257" />
          <Readout label="Soil" value={low ? "eroding" : "held"} color={low ? "#ff8a7a" : "#7fd0ff"} />
        </div>
        <div>
          <Btn
            onClick={() => {
              if (cover <= 30) setPlanted(true);
              setCover(100);
            }}
          >
            🌱 Plant trees
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 4 · wildlife of India */
const ANIMALS = [
  { id: "tiger", label: "Tiger — national animal", lon: 80, lat: 22, text: "The tiger is our national animal and is found in various parts of the country. Project Tiger was started to protect it." },
  { id: "lion", label: "Gir forest", lon: 70.8, lat: 21.1, text: "The Gir forest in Gujarat is the home of the Asiatic lion." },
  { id: "rhino", label: "Assam", lon: 93, lat: 26.4, text: "Elephants and one-horned rhinoceroses roam the forests of Assam." },
  { id: "elephant", label: "Kerala & Karnataka", lon: 76, lat: 11.5, text: "Elephants are also found in Kerala and Karnataka. Project Elephant protects them." },
  { id: "desert", label: "Desert & Rann of Kuchchh", lon: 71, lat: 25.5, text: "Camels are found in the Great Indian Desert and wild asses in the Rann of Kuchchh." },
  { id: "himalaya", label: "Himalayas", lon: 78, lat: 32.5, text: "Wild goats, snow leopards and bears are found in the Himalayan region." },
];
function Wildlife({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Forests are home to a huge variety of wildlife. Tap each place on the map."
      viewBox={MAP_VIEWBOX}
      art={
        <g>
          <SketchMap rivers={false} />
          {[["🐅", 80, 22], ["🦁", 70.8, 21.1], ["🦏", 93, 26.4], ["🐘", 76, 11.5], ["🐪", 71, 25.5], ["🐐", 78, 32.5]].map(([e, lo, la]) => {
            const p = proj(lo as number, la as number);
            return (
              <text key={e as string} x={p.x + 14} y={p.y + 8} fontSize="20">
                {e}
              </text>
            );
          })}
        </g>
      }
      spots={ANIMALS.map((a) => ({ id: a.id, label: a.label, ...proj(a.lon, a.lat), text: a.text }))}
      groups={{ tiger: ["tiger"], lion: ["lion"], east: ["rhino", "elephant"], extremes: ["desert", "himalaya"] }}
    />
  );
}

const chapter: Chapter = {
  id: "gclimate",
  subject: "Geography",
  n: 8,
  title: "India: Climate, Vegetation and Wildlife",
  pages: "56–62",
  icon: "🌦",
  theme: { grad: "linear-gradient(135deg,#06281a 0%,#1f8a4c 55%,#7fd0ff 130%)", accent: "#1b7a45", soft: "#ddf3e6", ink: "#11552f" },
  opening: "Some days you need a sweater; some days only cold sharbat will do. Why do India's seasons change — and why are some places freezing while others are scorching?",
  stops: [
    {
      id: "seasons",
      icon: "🌧",
      title: "The seasons of India",
      pages: "56–57",
      wonder: {
        q: "Which winds bring most of India's rain?",
        options: [
          { id: "monsoon", label: "Monsoon winds" },
          { id: "loo", label: "The loo" },
          { id: "polar", label: "Winds from the North Pole" },
        ],
        answer: "monsoon",
        reveal: "Monsoon winds. 'Monsoon' comes from the Arabic word 'mausim', meaning seasons.",
      },
      explore: { activity: "Major seasons", title: "A year in India", how: "Slide through the months. Watch the winds and rain change.", Sim: IndiaSeasons },
      discoveries: [
        { id: "cold", text: "December to February: the cold weather season" },
        { id: "hot", text: "March to May: the hot season, with the loo" },
        { id: "monsoon", text: "June to September: south-west monsoon winds bring rain" },
        { id: "retreat", text: "October–November: retreating monsoon rains Tamil Nadu and Andhra Pradesh" },
      ],
      understand: [
        { title: "Monsoon climate", body: "India's climate is described as monsoon type. Being in the tropical region, most of its rain comes from monsoon winds." },
        { title: "Farming depends on rain", body: "Good monsoons mean enough rain and a good crop. If the monsoon fails, crops suffer and well water levels go down." },
      ],
      check: [{ id: "gc1", kind: "mcq", q: "Hot, dry winds that blow during summer days are called…", options: ["Loo", "Monsoon", "Breeze"], answer: 0, why: "The loo blows in the hot weather season." }],
      connect: [
        { icon: "🥤", title: "Sharbat", body: "Raw mango, bel, lemon, kokum and buttermilk drinks protect us from the loo." },
        { icon: "🎶", title: "Rain songs", body: "Every Indian language has songs about the rains — learn two!" },
        { icon: "☔", title: "Words for rain", body: "Varsha, Barish, Borsha… collect names for rain in different languages." },
      ],
    },
    {
      id: "climate",
      icon: "🌡",
      title: "Weather and climate",
      pages: "56–58",
      wonder: {
        q: "What's the difference between weather and climate?",
        options: [
          { id: "time", label: "Weather is day-to-day; climate is the average over many years" },
          { id: "same", label: "They mean the same thing" },
          { id: "place", label: "Weather is only for cities" },
        ],
        answer: "time",
        reveal: "Weather is the day-to-day change in the atmosphere; climate is the average weather measured over many years.",
      },
      explore: { activity: "Weather and climate", title: "Climate detective", how: "Solve each puzzle.", Sim: WeatherClimate },
      discoveries: [
        { id: "weather", text: "Weather is the day-to-day state of the atmosphere" },
        { id: "climate", text: "Climate is the average weather over many years" },
        { id: "places", text: "Mawsynram gets the world's highest rainfall" },
        { id: "factors", text: "Location, altitude, distance from the sea and relief affect climate" },
      ],
      understand: [
        { title: "Regional differences", body: "Jaisalmer and Bikaner are very hot; Drass and Kargil are freezing cold; coastal Mumbai and Kolkata are moderate and humid." },
        { title: "Natural vegetation", body: "Grasses, shrubs and trees that grow on their own, without help from people. The amount of rainfall is very important in deciding what grows." },
      ],
      check: [{ id: "gc2", kind: "tf", q: "Climate is the day-to-day change in the atmosphere.", answer: false, why: "That's weather. Climate is the long-term average." }],
      connect: [
        { icon: "📺", title: "Weather report", body: "Watch the weather forecast on TV for a week." },
        { icon: "🧥", title: "Dress for it", body: "What do people wear in Drass vs Jaisalmer?" },
        { icon: "🌴", title: "Coastal life", body: "Why do coastal cities feel humid?" },
      ],
    },
    {
      id: "forests",
      icon: "🌳",
      title: "Why forests matter",
      pages: "58–59",
      wonder: {
        q: "What happens to soil when all the trees on a hillside are cut down?",
        options: [
          { id: "erode", label: "Rain washes the soil away" },
          { id: "better", label: "The soil gets better" },
          { id: "nothing", label: "Nothing happens" },
        ],
        answer: "erode",
        reveal: "Plant roots bind the soil. Without them, the soil is eroded.",
      },
      explore: { activity: "Why are forests necessary?", title: "Forest cause and effect", how: "Cut the forest down with the slider, then plant it back.", Sim: Forest },
      discoveries: [
        { id: "erosion", text: "Without tree roots, soil is eroded" },
        { id: "habitat", text: "Cutting forests destroys the home of wildlife" },
        { id: "plant", text: "Planting and protecting trees brings forests back" },
      ],
      understand: [
        { title: "Forests give us", body: "Oxygen, timber for furniture, fuel wood, fodder, medicinal plants and herbs, lac, honey and gum." },
        { title: "Reckless cutting", body: "Natural vegetation has been destroyed to a large extent by reckless cutting of trees." },
        { title: "Van Mahotsav", body: "Special programmes like Van Mahotsav involve people in making the earth green." },
      ],
      check: [{ id: "gc3", kind: "mcq", q: "How do plants control soil erosion?", options: ["Their roots bind the soil", "Their leaves make rain", "They make soil hard as rock"], answer: 0, why: "Roots hold the soil in place." }],
      connect: [
        { icon: "🎂", title: "Birthday trees", body: "Leela's parents planted a sapling on every birthday — by 20 she had 21 trees!" },
        { icon: "🌱", title: "Plant one", body: "Plant and look after a sapling at home or school." },
        { icon: "🛋", title: "Furniture", body: "Which things in your home come from forests?" },
      ],
    },
    {
      id: "wildlife",
      icon: "🐅",
      title: "Wildlife of India",
      pages: "59–61",
      wonder: {
        q: "Where in India does the Asiatic lion live?",
        options: [
          { id: "gir", label: "The Gir forest in Gujarat" },
          { id: "assam", label: "The forests of Assam" },
          { id: "himalaya", label: "The Himalayas" },
        ],
        answer: "gir",
        reveal: "The Gir forest in Gujarat is the home of the Asiatic lion.",
      },
      explore: { activity: "Wild life", title: "Wildlife map", how: "Tap each place to see which animals live there.", Sim: Wildlife },
      discoveries: [
        { id: "tiger", text: "The tiger is our national animal" },
        { id: "lion", text: "Asiatic lions live in the Gir forest" },
        { id: "east", text: "Elephants and one-horned rhinos live in Assam; elephants in Kerala and Karnataka" },
        { id: "extremes", text: "Camels in the desert, wild asses in Kuchchh, snow leopards in the Himalayas" },
      ],
      understand: [
        { title: "Birds and snakes", body: "The peacock is our national bird. India has hundreds of kinds of snakes, including cobras and kraits." },
        { title: "Protecting wildlife", body: "Cutting forests and hunting have made many species decline; some are extinct. National parks, sanctuaries, biosphere reserves, Project Tiger and Project Elephant protect them." },
        { title: "You can help", body: "Refuse to buy things made from animal bones, horns, fur, skin and feathers. Wildlife Week is in the first week of October." },
      ],
      check: [
        { id: "gc4", kind: "mcq", q: "The national bird of India is the…", options: ["Peacock", "Parrot", "Pigeon"], answer: 0, why: "The peacock is our national bird." },
        { id: "gc5", kind: "tf", q: "Project Tiger was started to protect tigers.", answer: true, why: "Project Elephant protects elephants too." },
      ],
      connect: [
        { icon: "🦚", title: "Bird sanctuaries", body: "Bird sanctuaries protect birds from hunters. Name one near you." },
        { icon: "📅", title: "Wildlife Week", body: "Plan a poster for Wildlife Week in October." },
        { icon: "🚫", title: "Say no", body: "Don't buy products made from animal parts." },
      ],
    },
  ],
  learnt: [
    "Weather is the day-to-day state of the atmosphere; climate is the average over many years.",
    "India's four seasons: cold weather, hot weather, south-west monsoon and retreating monsoon. India has a monsoon climate.",
    "Climate depends on location, altitude, distance from the sea and relief.",
    "Natural vegetation depends mainly on rainfall. Forests give oxygen, bind the soil and are home to wildlife.",
    "Wildlife is protected through national parks, sanctuaries, biosphere reserves, Project Tiger and Project Elephant.",
  ],
  keywords: ["Weather", "Climate", "Monsoon", "Loo", "Natural vegetation", "Wildlife", "Sanctuary", "National park", "Biosphere reserve"],
};

export default chapter;
