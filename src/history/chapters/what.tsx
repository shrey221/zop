// History Chapter 1 · What, Where, How and When? (NCERT Our Pasts – I, 2018-19, pp. 1–10).
// Wording is original; facts follow the textbook.
import { ExploreLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { MAP_VIEWBOX, Place, SketchMap, proj } from "../map";

const at = (lon: number, lat: number) => proj(lon, lat);

function WhereMap({ discover }: SimProps) {
  const spots = [
    { id: "narmada", label: "Narmada valley", ...at(77, 22.6), text: "People have lived along the Narmada for several hundred thousand years. Some of the earliest were skilled gatherers and hunters." },
    { id: "sulaiman", label: "Sulaiman & Kirthar hills", ...at(67.5, 28.6), text: "Here, about 8000 years ago, people first began to grow wheat and barley, rear sheep, goats and cattle, and live in villages." },
    { id: "garo", label: "Garo hills & Vindhyas", ...at(90.5, 25.6), text: "Agriculture also developed in the Garo hills and the Vindhyas. Rice was first grown to the north of the Vindhyas." },
    { id: "indus", label: "River Indus", ...at(71.5, 30.5), text: "About 4700 years ago, some of the earliest cities flourished on the banks of the Indus and its tributaries." },
    { id: "ganga", label: "Ganga valley", ...at(81, 26.4), text: "About 2500 years ago, cities developed on the banks of the Ganga and its tributaries, and along the sea coasts." },
    { id: "magadha", label: "Magadha", ...at(85.5, 24.4), text: "The area south of the Ganga along the Son was Magadha (now in Bihar). Its rulers were very powerful and set up a large kingdom." },
  ];
  return (
    <ExploreLab
      discover={discover}
      intro="Tap the glowing dots to find out where people lived, farmed and built cities."
      viewBox={MAP_VIEWBOX}
      art={
        <g>
          <SketchMap />
          <Place lon={85.1} lat={25.6} name="Magadha" dx={10} dy={-8} />
        </g>
      }
      spots={spots}
      groups={{ early: ["narmada"], farming: ["sulaiman", "garo"], cities: ["indus", "ganga"], kingdom: ["magadha"] }}
    />
  );
}

function SourceSort({ discover }: SimProps) {
  const items = [
    { id: "palm", label: "A book on palm leaves", icon: "🍃", bin: "manu", why: "Manuscripts were written by hand, often on palm leaf or the bark of the birch tree." },
    { id: "birch", label: "Writing on birch bark", icon: "📜", bin: "manu", why: "Birch bark from the Himalayas was used to write manuscripts." },
    { id: "rock", label: "Words carved on a rock", icon: "🗿", bin: "insc", why: "Inscriptions are writings on hard surfaces like stone or metal — like Ashoka's rock edicts." },
    { id: "pillar", label: "Writing on a stone pillar", icon: "🏛", bin: "insc", why: "Kings had their orders and victories inscribed on pillars." },
    { id: "pot", label: "An old pot", icon: "🏺", bin: "arch", why: "Archaeologists study objects made and used long ago — pots, tools, ornaments." },
    { id: "coin", label: "A coin", icon: "💰", bin: "arch", why: "Coins are found by archaeologists and tell us about rulers and trade." },
    { id: "bones", label: "Bones of animals", icon: "🦴", bin: "arch", why: "Bones tell archaeologists what people ate." },
    { id: "wall", label: "Ruins of a building", icon: "🧱", bin: "arch", why: "Archaeologists dig to find remains of buildings in stone and brick." },
  ];
  const done = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="How do we know about the past? Sort each clue into its kind of source."
      bins={[
        { id: "manu", label: "Manuscripts", icon: "📜", color: "#ffd257" },
        { id: "insc", label: "Inscriptions", icon: "🏛", color: "#8fb3ff" },
        { id: "arch", label: "Archaeology", icon: "⛏", color: "#ff9b7a" },
      ]}
      items={items}
      rules={[
        { id: "manu", when: (p) => done(p, "manu") },
        { id: "insc", when: (p) => done(p, "insc") },
        { id: "arch", when: (p) => done(p, "arch") },
      ]}
    />
  );
}

function Dates({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Dates in history are counted from the birth of Jesus Christ. Solve these date puzzles."
      cases={[
        { id: "bc", icon: "⏪", prompt: "Which happened earlier: 500 BC or 100 BC?", options: ["500 BC", "100 BC", "They're the same"], answer: 0, explain: "BC means 'Before Christ'. BC dates count backwards, so 500 BC is earlier than 100 BC.", disc: "bc" },
        { id: "ad", icon: "⏩", prompt: "Which happened earlier: AD 1500 or AD 1200?", options: ["AD 1500", "AD 1200"], answer: 1, explain: "AD (Anno Domini, 'in the year of the Lord') dates count forwards from the birth of Christ, so AD 1200 is earlier.", disc: "ad" },
        { id: "ce", icon: "🌍", prompt: "Some books write CE and BCE instead of AD and BC. What does CE mean?", options: ["Common Era", "Christ Era", "Calendar End"], answer: 0, explain: "CE stands for 'Common Era' and BCE for 'Before Common Era'. They are used because this way of dating is now used in most countries.", disc: "ce" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hwhat",
  subject: "History",
  n: 1,
  title: "What, Where, How and When?",
  pages: "1–10",
  icon: "🔍",
  theme: { grad: "linear-gradient(135deg,#2b160a 0%,#9a4a1f 55%,#e9b45a 125%)", accent: "#9a4a1f", soft: "#f8e8d4", ink: "#6b2f10" },
  opening: "Rasheeda sees a newspaper headline: \"One Hundred Years Ago.\" How could anyone know what happened so many years ago?",
  stops: [
    {
      id: "where",
      icon: "🗺",
      title: "Where did people live?",
      pages: "1–4",
      wonder: {
        q: "Where did some of the earliest cities in the subcontinent grow, about 4700 years ago?",
        options: [
          { id: "indus", label: "On the banks of the Indus and its tributaries" },
          { id: "coast", label: "On the islands of the south" },
          { id: "desert", label: "In the middle of the desert" },
        ],
        answer: "indus",
        reveal: "Along the Indus and its tributaries. About 2500 years ago, cities grew along the Ganga and the sea coasts too.",
      },
      explore: { activity: "Map 1", title: "A map of our pasts", how: "Tap each place on the sketch map to see what happened there.", Sim: WhereMap },
      discoveries: [
        { id: "early", text: "People lived along the Narmada for hundreds of thousands of years" },
        { id: "farming", text: "Farming began in the hills of the north-west, north-east and centre" },
        { id: "cities", text: "Cities grew along the Indus, and later the Ganga" },
        { id: "kingdom", text: "Magadha became a powerful kingdom" },
      ],
      understand: [
        { title: "On the move", body: "People travelled across the subcontinent — in search of livelihood, to escape floods or droughts, as armies, as merchants with caravans and ships, and as religious teachers. Ideas were shared along the way.", tag: "think" },
        { title: "Natural frontiers", body: "Hills, mountains and seas form the frontiers of the subcontinent. They made journeys hard, but people still crossed them." },
        { title: "Names of the land", body: "The Persians and Greeks called the Indus 'Hindos' or 'Indos', and the land east of it 'India'. The name 'Bharata' was used for a group of people in the Rigveda, and later for the whole country.", tag: "source" },
      ],
      check: [{ id: "hw1", kind: "mcq", q: "Where did people first begin to grow wheat and barley, about 8000 years ago?", options: ["Sulaiman and Kirthar hills", "Garo hills", "The Narmada valley"], answer: 0, why: "These hills in the north-west are some of the earliest farming areas." }],
      connect: [
        { icon: "🚆", title: "Travel today", body: "Why do people travel nowadays? Many of the reasons are the same as long ago." },
        { icon: "🏞", title: "Rivers", body: "Find the Narmada, Indus and Ganga on a real map of India." },
        { icon: "🇮🇳", title: "India and Bharat", body: "Our country has both names in the Constitution." },
      ],
    },
    {
      id: "sources",
      icon: "📜",
      title: "Clues from the past",
      pages: "5–8",
      wonder: {
        q: "A historian wants to know what a king did 2000 years ago. Where could she look?",
        options: [
          { id: "all", label: "Manuscripts, inscriptions and remains dug up by archaeologists" },
          { id: "tv", label: "Old television news" },
          { id: "none", label: "Nowhere — it's impossible to know" },
        ],
        answer: "all",
        reveal: "All of these! Historians use sources: manuscripts, inscriptions and objects found by archaeologists.",
      },
      explore: { activity: "Finding out about the past", title: "Sort the sources", how: "Put each clue into the right kind of source.", Sim: SourceSort },
      discoveries: [
        { id: "manu", text: "Manuscripts: books written by hand on palm leaf or birch bark" },
        { id: "insc", text: "Inscriptions: writings on stone or metal" },
        { id: "arch", text: "Archaeology: objects and buildings dug up from the past" },
      ],
      understand: [
        { title: "Manuscripts", body: "Books written by hand, long ago, on palm leaf or birch bark. Many were eaten by insects; some survive in temples and monasteries. They are in Sanskrit, Prakrit and Tamil.", tag: "found" },
        { title: "Inscriptions", body: "Writings on hard surfaces like stone or metal. Kings had their orders inscribed so people could see and read them.", tag: "found" },
        { title: "Archaeology", body: "Archaeologists study remains of buildings, tools, weapons, pots, ornaments, coins, bones of animals, birds and fish, and burnt grain.", tag: "found" },
        { title: "Many pasts", body: "Different groups of people — hunters, farmers, rulers, crafts persons — lived different lives. So historians speak of pasts, not just one past.", tag: "think" },
      ],
      check: [{ id: "hw2", kind: "mcq", q: "What is one major difference between a manuscript and an inscription?", options: ["Manuscripts are handwritten on leaves or bark; inscriptions are on stone or metal", "Inscriptions are always longer", "Manuscripts were only about kings"], answer: 0, why: "It's the material and the way of writing that differ." }],
      connect: [
        { icon: "🏛", title: "Museums", body: "Visit a museum to see real coins, pots and inscriptions." },
        { icon: "🎤", title: "Interview", body: "Make a list of five questions you would ask an archaeologist." },
        { icon: "🏺", title: "Rosetta Stone", body: "In Egypt, a stone with the same text in three scripts helped scholars decipher old Egyptian writing." },
      ],
    },
    {
      id: "dates",
      icon: "📅",
      title: "BC, AD and dates",
      pages: "9–10",
      wonder: {
        q: "If something happened in 2000 BC, roughly how long ago was that from 2000 AD?",
        options: [
          { id: "2000", label: "About 2000 years" },
          { id: "4000", label: "About 4000 years" },
          { id: "200", label: "About 200 years" },
        ],
        answer: "4000",
        reveal: "About 4000 years: 2000 years before the birth of Christ, plus 2000 years after.",
      },
      explore: { activity: "What do dates mean?", title: "Date puzzles", how: "Work out which dates are earlier and what the letters mean.", Sim: Dates },
      discoveries: [
        { id: "bc", text: "BC dates count backwards — bigger means earlier" },
        { id: "ad", text: "AD dates count forwards from the birth of Christ" },
        { id: "ce", text: "CE and BCE are another way of writing AD and BC" },
      ],
      understand: [
        { title: "BC", body: "Stands for 'Before Christ'. Dates before the birth of Jesus Christ are counted backwards." },
        { title: "AD", body: "Stands for 'Anno Domini', Latin for 'in the year of the Lord'. 2000 AD is the same as AD 2000." },
        { title: "CE, BCE and BP", body: "CE means Common Era and BCE Before Common Era. Sometimes 'BP' (Before Present) is used." },
      ],
      check: [{ id: "hw3", kind: "tf", q: "200 BC is earlier than 100 BC.", answer: true, why: "BC years count backwards." }],
      connect: [
        { icon: "🎂", title: "Your timeline", body: "Make a timeline of your own life with years marked." },
        { icon: "📆", title: "Calendars", body: "India also uses other calendars, like the Saka calendar." },
        { icon: "📰", title: "Rasheeda's question", body: "Now you know how we can find out what happened long ago!" },
      ],
    },
  ],
  learnt: [
    "People have lived along the Narmada for hundreds of thousands of years; farming began in several hilly regions; cities grew along the Indus and later the Ganga.",
    "People travelled across the subcontinent, sharing ideas.",
    "Historians use sources: manuscripts, inscriptions and remains found by archaeologists.",
    "Dates are counted from the birth of Christ: BC backwards, AD forwards.",
  ],
  keywords: ["Travelling", "Manuscript", "Inscription", "Archaeology", "Historian", "Source", "Decipherment"],
};

export default chapter;
