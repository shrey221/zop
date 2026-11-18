// Geography Chapter 7 · Our Country – India (NCERT The Earth: Our Habitat, 2020-21, pp. 47–55).
// Wording is original; facts follow the textbook.
import { useState } from "react";
import { MAP_VIEWBOX, SketchMap, proj } from "../../history/map";
import { ExploreLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";

/* Stop 1 · where is India? */
function Locate({ discover }: SimProps) {
  const [show, setShow] = useState<string[]>([]);
  const [sun, setSun] = useState(0); // 0..1 sweep of sunrise from east to west
  function add(id: string) {
    const s = [...new Set([...show, id])];
    setShow(s);
    if (id === "tropic") discover("tropic");
    if (s.includes("ns") && s.includes("ew")) discover("extent");
    if (id === "ist") discover("ist");
  }
  const vline = (lon: number, c: string, dash = false) => {
    const a = proj(lon, 37.5);
    const b = proj(lon, 6);
    return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeWidth="2.5" strokeDasharray={dash ? "6 5" : undefined} />;
  };
  const hline = (lat: number, c: string, dash = false) => {
    const a = proj(60, lat);
    const b = proj(98, lat);
    return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeWidth="2.5" strokeDasharray={dash ? "6 5" : undefined} />;
  };
  const sunLon = 97.4 - sun * 29.3;
  return (
    <Stage
      caption={
        sun >= 0.98
          ? "The sun rises about two hours earlier in Arunachal Pradesh (east) than in Gujarat (west) — because India stretches about 29° of longitude, and local time changes 4 minutes per degree."
          : show.includes("ist")
            ? "The 82°30′ E meridian is India's Standard Meridian. Its local time is Indian Standard Time for the whole country."
            : show.includes("tropic")
              ? "The Tropic of Cancer (23°30′ N) passes almost halfway through India. India lies in the Northern Hemisphere."
              : "Add lines to the map to locate India, then slide the sunrise across the country."
      }
    >
      <svg viewBox={MAP_VIEWBOX} className="block h-auto w-full select-none">
        <SketchMap rivers={false} />
        {show.includes("ns") && (
          <g>
            {hline(8.07, "#ff9bb0", true)}
            {hline(37.1, "#ff9bb0", true)}
          </g>
        )}
        {show.includes("ew") && (
          <g>
            {vline(68.1, "#9fe6b0", true)}
            {vline(97.4, "#9fe6b0", true)}
          </g>
        )}
        {show.includes("tropic") && hline(23.5, "#ff8a5c")}
        {show.includes("ist") && vline(82.5, "#ffd257")}
        {sun > 0 && <rect x={proj(sunLon, 0).x} y="0" width={proj(97.4, 0).x - proj(sunLon, 0).x} height="440" fill="#ffd257" opacity=".22" />}
        {sun > 0 && sun < 0.98 && <text x={proj(sunLon, 0).x} y="30" fontSize="18" textAnchor="middle">☀️</text>}
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          <Btn on={show.includes("tropic")} onClick={() => add("tropic")}>
            Tropic of Cancer
          </Btn>
          <Btn on={show.includes("ns")} onClick={() => add("ns")}>
            8°4′ N – 37°6′ N
          </Btn>
          <Btn on={show.includes("ew")} onClick={() => add("ew")}>
            68°7′ E – 97°25′ E
          </Btn>
          <Btn on={show.includes("ist")} onClick={() => add("ist")}>
            82°30′ E
          </Btn>
        </div>
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">🌅 Sunrise</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={sun}
            onChange={(e) => {
              setSun(+e.target.value);
              if (+e.target.value >= 0.98) discover("sunrise");
            }}
            className="w-full accent-[#ffd257]"
            aria-label="Sunrise sweep"
          />
        </label>
      </div>
    </Stage>
  );
}

/* Stop 2 · physical divisions */
const DIVS = [
  { id: "himalaya", label: "The Himalayas", lon: 80, lat: 31, text: "'Him + alaya' means the abode of snow. Three parallel ranges: the Great Himalaya (Himadri) with the world's highest peaks, the Middle Himalaya (Himachal) with many hill stations, and the Shiwaliks in the south." },
  { id: "plains", label: "Northern Plains", lon: 81, lat: 26.5, text: "Level, flat land formed by alluvial deposits of the Indus, Ganga, Brahmaputra and their tributaries. Fertile — so many people live here." },
  { id: "desert", label: "Great Indian Desert", lon: 71.5, lat: 27, text: "In the west: a dry, hot, sandy stretch with very little vegetation." },
  { id: "plateau", label: "Peninsular Plateau", lon: 77.5, lat: 19, text: "Triangular and uneven, with many hill ranges and valleys. The Aravalis, one of the oldest ranges in the world, lie to its north-west. The Vindhyas and Satpuras are important ranges. It's rich in coal and iron ore." },
  { id: "ghats", label: "Western & Eastern Ghats", lon: 74.5, lat: 14, text: "The Western Ghats (Sahyadris) border the plateau in the west and are almost continuous. The Eastern Ghats are broken and uneven." },
  { id: "coast", label: "Coastal plains", lon: 81.5, lat: 15.5, text: "The western coastal plains are very narrow; the eastern ones are much broader, with fertile river deltas." },
  { id: "islands", label: "Islands", lon: 92.5, lat: 12, text: "Two groups: the Andaman and Nicobar Islands in the Bay of Bengal, and Lakshadweep in the Arabian Sea — coral islands built up from the skeletons of tiny polyps." },
];
function Divisions({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="India has mountains, plains, a desert, a plateau, coasts and islands. Tap each region."
      viewBox={MAP_VIEWBOX}
      art={
        <g>
          <SketchMap />
          <path d={`M${proj(73.5, 33.5).x} ${proj(73.5, 33.5).y} Q ${proj(84, 30.5).x} ${proj(84, 30.5).y} ${proj(95, 28).x} ${proj(95, 28).y}`} stroke="#8a6a3a" strokeWidth="12" fill="none" strokeLinecap="round" opacity=".7" />
          <ellipse cx={proj(71.5, 27).x} cy={proj(71.5, 27).y} rx="30" ry="20" fill="#f2d98a" opacity=".85" />
          {[[92.7, 12.5], [92.8, 11.5], [93, 10.7], [93.5, 8.5]].map(([lo, la], i) => (
            <circle key={i} cx={proj(lo, la).x} cy={proj(lo, la).y} r="3" fill="#e9dcc0" stroke="#b9a37a" />
          ))}
          {[[72.6, 10.5], [72.8, 11.3]].map(([lo, la], i) => (
            <circle key={i} cx={proj(lo, la).x} cy={proj(lo, la).y} r="2.5" fill="#e9dcc0" stroke="#b9a37a" />
          ))}
        </g>
      }
      spots={DIVS.map((d) => ({ id: d.id, label: d.label, ...proj(d.lon, d.lat), text: d.text }))}
      groups={{ mountains: ["himalaya"], plains: ["plains", "desert"], plateau: ["plateau", "ghats"], coasts: ["coast", "islands"] }}
    />
  );
}

/* Stop 3 · rivers */
function Rivers({ discover }: SimProps) {
  const items = [
    { id: "narmada", label: "Narmada", bin: "w", why: "The Narmada and Tapi flow west through the Vindhya and Satpura ranges into the Arabian Sea." },
    { id: "tapi", label: "Tapi", bin: "w" },
    { id: "mahanadi", label: "Mahanadi", bin: "e", why: "East-flowing rivers drain into the Bay of Bengal and form fertile deltas at their mouths." },
    { id: "godavari", label: "Godavari", bin: "e" },
    { id: "krishna", label: "Krishna", bin: "e" },
    { id: "kaveri", label: "Kaveri", bin: "e" },
    { id: "ganga", label: "Ganga & Brahmaputra", bin: "e", why: "Together they form the Sundarbans delta — the world's largest delta — where they flow into the Bay of Bengal." },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Which way does each river flow? Sort them by the sea they drain into."
      bins={[
        { id: "w", label: "Into the Arabian Sea (west)", icon: "⬅️", color: "#7fd0ff" },
        { id: "e", label: "Into the Bay of Bengal (east)", icon: "➡️", color: "#5fe0a0" },
      ]}
      items={items}
      rules={[
        { id: "west", when: (p) => !!p.narmada && !!p.tapi },
        { id: "east", when: (p) => ["mahanadi", "godavari", "krishna", "kaveri"].every((i) => p[i]) },
        { id: "delta", when: (p) => !!p.ganga },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "gindia",
  subject: "Geography",
  n: 7,
  title: "Our Country – India",
  pages: "47–55",
  icon: "🗺",
  theme: { grad: "linear-gradient(135deg,#3a1505 0%,#e07a1f 45%,#1f8a4c 120%)", accent: "#c25e10", soft: "#fdebd8", ink: "#7a3a08" },
  opening: "From the snowy Himalayas to the sandy desert, from the plains to the coasts and islands — India is vast and varied. Where exactly is it, and what is it like?",
  stops: [
    {
      id: "locate",
      icon: "📍",
      title: "Where is India?",
      pages: "47–48",
      wonder: {
        q: "The sun rises in Arunachal Pradesh about how much earlier than in Gujarat?",
        options: [
          { id: "2h", label: "About two hours" },
          { id: "same", label: "At the same time" },
          { id: "12h", label: "About twelve hours" },
        ],
        answer: "2h",
        reveal: "About two hours earlier — India stretches across about 29° of longitude.",
      },
      explore: { activity: "Locational setting", title: "Locate India", how: "Add India's key lines to the map, then slide the sunrise across the country.", Sim: Locate },
      discoveries: [
        { id: "tropic", text: "The Tropic of Cancer passes almost halfway through India" },
        { id: "extent", text: "India extends from 8°4′ N to 37°6′ N and 68°7′ E to 97°25′ E" },
        { id: "ist", text: "82°30′ E is India's Standard Meridian" },
        { id: "sunrise", text: "The sun rises about two hours earlier in the east than the west" },
      ],
      understand: [
        { title: "Size", body: "India has an area of about 3.28 million sq. km. From Kashmir to Kanyakumari it's about 3,200 km; from Arunachal Pradesh to Kuchchh about 2,900 km." },
        { title: "Boundaries", body: "The Himalayas in the north, the Arabian Sea in the west, the Bay of Bengal in the east and the Indian Ocean in the south." },
        { title: "Neighbours", body: "Seven countries share land boundaries with India. Sri Lanka and Maldives are island neighbours; the Palk Strait separates India from Sri Lanka." },
        { title: "States", body: "India is divided into states and union territories, formed mainly on the basis of languages. Delhi is the national capital." },
      ],
      check: [
        { id: "gi1", kind: "mcq", q: "Which latitude passes almost halfway through India?", options: ["Tropic of Cancer", "Equator", "Arctic Circle"], answer: 0, why: "23°30′ N crosses the middle of India." },
        { id: "gi2", kind: "mcq", q: "India is separated from Sri Lanka by the…", options: ["Palk Strait", "Isthmus of Panama", "Bering Strait"], answer: 0, why: "The Palk Strait lies between them." },
      ],
      connect: [
        { icon: "🌐", title: "Hemispheres", body: "India lies in the Northern and Eastern Hemispheres." },
        { icon: "⏰", title: "One time zone", body: "Large countries like the USA have several time zones; India uses one — IST." },
        { icon: "🗺", title: "Neighbours", body: "Name the seven countries that share land borders with India." },
      ],
    },
    {
      id: "divisions",
      icon: "⛰",
      title: "Physical divisions",
      pages: "49–52",
      wonder: {
        q: "What does 'Himalaya' mean?",
        options: [
          { id: "snow", label: "The abode of snow" },
          { id: "high", label: "The highest land" },
          { id: "river", label: "The source of rivers" },
        ],
        answer: "snow",
        reveal: "'Him + alaya' means the abode of snow.",
      },
      explore: { activity: "Figure 7.3", title: "India's landscapes", how: "Tap each region on the sketch map.", Sim: Divisions },
      discoveries: [
        { id: "mountains", text: "The Himalayas have three parallel ranges" },
        { id: "plains", text: "Fertile Northern Plains and the dry Great Indian Desert" },
        { id: "plateau", text: "The Peninsular Plateau, bordered by the Ghats" },
        { id: "coasts", text: "Coastal plains and two groups of islands" },
      ],
      understand: [
        { title: "Many features", body: "Mountains, plateaus, plains, coasts and islands give India great diversity." },
        { title: "Coral islands", body: "Lakshadweep islands are made of coral — skeletons of tiny marine animals called polyps, built up layer on layer." },
      ],
      check: [{ id: "gi3", kind: "mcq", q: "The oldest mountain range in India is the…", options: ["Aravali hills", "Western Ghats", "Himalayas"], answer: 0, why: "The Aravalis are among the oldest ranges in the world." }],
      connect: [
        { icon: "🏔", title: "Hill stations", body: "Find five hill stations in the Middle Himalaya." },
        { icon: "🐠", title: "Coral reefs", body: "Coral islands are home to colourful sea life." },
        { icon: "🏜", title: "Thar", body: "The Great Indian Desert is also called the Thar." },
      ],
    },
    {
      id: "rivers",
      icon: "🏞",
      title: "Rivers and deltas",
      pages: "50–52",
      wonder: {
        q: "Most rivers of the plateau flow east. Which two flow west?",
        options: [
          { id: "nt", label: "Narmada and Tapi" },
          { id: "gk", label: "Godavari and Krishna" },
          { id: "gb", label: "Ganga and Brahmaputra" },
        ],
        answer: "nt",
        reveal: "The Narmada and Tapi flow west into the Arabian Sea.",
      },
      explore: { activity: "Physical divisions", title: "Which way does it flow?", how: "Sort the rivers by the sea they flow into.", Sim: Rivers },
      discoveries: [
        { id: "west", text: "The Narmada and Tapi flow west to the Arabian Sea" },
        { id: "east", text: "The Mahanadi, Godavari, Krishna and Kaveri flow east to the Bay of Bengal" },
        { id: "delta", text: "The Ganga and Brahmaputra form the Sundarbans delta" },
      ],
      understand: [
        { title: "Tributaries", body: "A tributary is a river or stream that flows into a main river." },
        { title: "Deltas", body: "A delta is land formed at the mouth of a river, where it enters the sea. The Sundarbans delta is the world's largest." },
        { title: "Alluvial soil", body: "Very fine soil brought by rivers and deposited in their basins." },
      ],
      check: [{ id: "gi4", kind: "mcq", q: "The Sundarbans delta is formed by…", options: ["The Ganga and Brahmaputra", "The Narmada and Tapi", "The Krishna and Kaveri"], answer: 0, why: "They meet the Bay of Bengal there." }],
      connect: [
        { icon: "👧", title: "River names", body: "Many people are named after rivers — Yamuna, Kaveri, Mandakini. Do you know anyone?" },
        { icon: "🗺", title: "Find the delta", body: "Locate the Sundarbans where the Ganga and Brahmaputra meet the Bay of Bengal." },
        { icon: "🌾", title: "Fertile deltas", body: "Deltas have rich soil for farming." },
      ],
    },
  ],
  learnt: [
    "India lies in the Northern Hemisphere; the Tropic of Cancer passes almost through its middle.",
    "India extends from 8°4′ N to 37°6′ N and 68°7′ E to 97°25′ E. 82°30′ E is its Standard Meridian.",
    "Its physical divisions are the Himalayas, the Northern Plains, the Great Indian Desert, the Peninsular Plateau, the coastal plains and the islands.",
    "The Narmada and Tapi flow west; the Mahanadi, Godavari, Krishna and Kaveri flow east and form deltas.",
  ],
  keywords: ["Peninsula", "Tropic of Cancer", "Standard Meridian", "Himalayas", "Northern Plains", "Peninsular Plateau", "Coastal plains", "Islands", "Delta", "Tributary"],
};

export default chapter;
