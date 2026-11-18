// History Chapter 8 · Ashoka, the Emperor Who Gave Up War (NCERT Our Pasts – I, 2018-19, pp. 75–86).
// Wording is original; facts follow the textbook. Ashoka's messages are paraphrased, never quoted.
import { ExploreLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { MAP_VIEWBOX, SketchMap, proj } from "../map";

const PLACES = [
  { id: "patali", label: "Pataliputra", lon: 85.1, lat: 25.6, text: "The capital of the Mauryan empire. Areas around it were under the direct control of the emperor." },
  { id: "taxila", label: "Taxila", lon: 72.8, lat: 33.7, text: "A provincial capital — a gateway to the northwest, including Central Asia." },
  { id: "ujjain", label: "Ujjain", lon: 75.8, lat: 23.2, text: "A provincial capital on the route from north to south India. Merchants, officials and crafts persons lived here." },
  { id: "kalinga", label: "Kalinga", lon: 85.5, lat: 20.3, text: "The ancient name of coastal Orissa (Odisha). Ashoka fought a war to conquer it, about eight years after he became ruler." },
  { id: "sarnath", label: "Sarnath", lon: 83, lat: 25.4, text: "The lion capital on top of an Ashokan pillar here is now our national emblem." },
];
function EmpireMap({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="The Mauryan empire was huge. Tap the important places."
      viewBox={MAP_VIEWBOX}
      art={
        <g>
          <SketchMap />
          {PLACES.map((p) => {
            const q = proj(p.lon, p.lat);
            return (
              <text key={p.id} x={q.x + (p.id === "sarnath" ? -14 : 14)} y={q.y + (p.id === "sarnath" ? -12 : 4)} fontSize="11" fontWeight="800" fill="#3a2414" textAnchor={p.id === "sarnath" ? "end" : "start"}>
                {p.label}
              </text>
            );
          })}
        </g>
      }
      spots={PLACES.map((p) => ({ id: p.id, label: p.label, ...proj(p.lon, p.lat), text: p.text }))}
      groups={{ capital: ["patali"], provinces: ["taxila", "ujjain"], kalinga: ["kalinga"], emblem: ["sarnath"] }}
    />
  );
}

function Dhamma({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Ashoka's inscriptions tell us what he thought. Answer these questions."
      cases={[
        { id: "kalinga", icon: "⚔️", prompt: "How did Ashoka feel after the Kalinga war, according to his own inscription?", options: ["Filled with sorrow at the violence and bloodshed", "Proud and eager for more wars", "He felt nothing"], answer: 0, explain: "His inscription describes his sorrow at the killing and suffering. He decided to give up war — the only king in history known to have done so after winning one.", disc: "kalinga" },
        { id: "dhamma", icon: "☸️", prompt: "What was Ashoka's dhamma?", options: ["A set of messages on how to behave well — not worship of a god or sacrifices", "A new army", "A tax on farmers"], answer: 0, explain: "His dhamma did not involve worship of a god or performance of a sacrifice. He felt, like a father, that it was his duty to instruct his subjects. He was inspired by the teachings of the Buddha.", disc: "dhamma" },
        { id: "spread", icon: "📜", prompt: "How did Ashoka spread his messages?", options: ["Inscriptions on rocks and pillars, and officials called dhamma mahamattas", "Television", "Only by word of mouth"], answer: 0, explain: "His messages were inscribed on rocks and pillars, and officials called dhamma mahamattas went from place to place teaching people about dhamma.", disc: "spread" },
        { id: "abroad", icon: "⛵", prompt: "Where did he send messengers to spread ideas about dhamma?", options: ["Syria, Egypt, Greece and Sri Lanka", "America", "Nowhere"], answer: 0, explain: "He sent messengers to other lands, such as Syria, Egypt, Greece and Sri Lanka.", disc: "abroad" },
      ]}
    />
  );
}

function DhammaSort({ discover }: SimProps) {
  const items = [
    { id: "kind", label: "Be gentle with slaves and servants", bin: "yes" },
    { id: "elders", label: "Respect elders", bin: "yes" },
    { id: "animals", label: "Treat all creatures with compassion", bin: "yes" },
    { id: "religions", label: "Respect religions other than your own", bin: "yes", why: "Ashoka asked people to respect the religions and beliefs of others." },
    { id: "rituals", label: "Hold useless rituals", bin: "no", why: "Ashoka felt that many rituals, like those at the birth of a child or before a journey, were useless." },
    { id: "sacrifice", label: "Sacrifice animals", bin: "no", why: "He asked people not to kill animals in sacrifices." },
    { id: "praise", label: "Praise your own religion and criticise others'", bin: "no" },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Ashoka's messages encouraged some things and discouraged others. Sort them."
      bins={[
        { id: "yes", label: "Dhamma encouraged", icon: "👍", color: "#5fe0a0" },
        { id: "no", label: "Dhamma discouraged", icon: "👎", color: "#ff8a7a" },
      ]}
      items={items}
      rules={[
        { id: "kindness", when: (p) => ["kind", "elders", "animals"].every((i) => p[i]) },
        { id: "respect", when: (p) => !!p.religions && !!p.praise },
        { id: "rituals", when: (p) => !!p.rituals && !!p.sacrifice },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hashoka",
  subject: "History",
  n: 8,
  title: "Ashoka, the Emperor Who Gave Up War",
  pages: "75–86",
  icon: "🦁",
  theme: { grad: "linear-gradient(135deg,#0d1f3a 0%,#2a5aa8 55%,#e9c46a 125%)", accent: "#2a5aa8", soft: "#e2ebf8", ink: "#1b3d75" },
  opening: "Roshan notices a tiny set of lions on her new rupee notes. What are those lions, and why are they there?",
  stops: [
    {
      id: "empire",
      icon: "🗺",
      title: "A very big kingdom",
      pages: "75–79",
      wonder: {
        q: "A very big kingdom with many different peoples and lands is called…",
        options: [
          { id: "empire", label: "An empire" },
          { id: "village", label: "A village" },
          { id: "gana", label: "A gana" },
        ],
        answer: "empire",
        reveal: "An empire. The Mauryan empire, founded by Ashoka's grandfather Chandragupta about 2300 years ago, stretched across much of the subcontinent.",
      },
      explore: { activity: "Map 5", title: "The Mauryan empire", how: "Tap the important places on the sketch map.", Sim: EmpireMap },
      discoveries: [
        { id: "capital", text: "Pataliputra was the capital" },
        { id: "provinces", text: "Taxila and Ujjain were provincial capitals" },
        { id: "kalinga", text: "Kalinga was conquered in a terrible war" },
        { id: "emblem", text: "The lion capital at Sarnath is our national emblem" },
      ],
      understand: [
        { title: "The founder", body: "Chandragupta Maurya founded the empire about 2300 years ago. He was supported by a wise man named Chanakya or Kautilya, whose ideas are written in the Arthashastra.", tag: "source" },
        { title: "Ruling an empire", body: "Different parts were ruled differently: the area around Pataliputra directly, provinces from capitals like Taxila and Ujjain, and other areas less tightly. Taxes and tribute were collected.", tag: "source" },
        { title: "Megasthenes", body: "Megasthenes, an ambassador sent by the Greek ruler of West Asia, lived at Chandragupta's court and wrote about what he saw.", tag: "source" },
      ],
      check: [{ id: "ha1", kind: "mcq", q: "Who founded the Mauryan empire?", options: ["Chandragupta Maurya", "Ashoka", "Bimbisara"], answer: 0, why: "Chandragupta Maurya, Ashoka's grandfather." }],
      connect: [
        { icon: "💵", title: "Your rupee note", body: "Look for the lions on a coin or note." },
        { icon: "📚", title: "Arthashastra", body: "Ideas about ruling a kingdom were written in this book." },
        { icon: "🧱", title: "Elsewhere: China", body: "About 2400 years ago, Chinese rulers began building the Great Wall." },
      ],
    },
    {
      id: "war",
      icon: "☸️",
      title: "Ashoka's war and his dhamma",
      pages: "79–84",
      wonder: {
        q: "After winning the war in Kalinga, what did Ashoka decide?",
        options: [
          { id: "more", label: "To conquer even more lands" },
          { id: "giveup", label: "To give up war" },
          { id: "retire", label: "To stop being king" },
        ],
        answer: "giveup",
        reveal: "He decided to give up war — he is the only king in history known to have given up conquest after winning a war.",
      },
      explore: { activity: "Ashoka's war in Kalinga", title: "Read the inscriptions", how: "Answer each question about Ashoka's messages.", Sim: Dhamma },
      discoveries: [
        { id: "kalinga", text: "Ashoka was filled with sorrow by the war" },
        { id: "dhamma", text: "Dhamma was about behaving well, not about worship or sacrifice" },
        { id: "spread", text: "Inscriptions and dhamma mahamattas spread his messages" },
        { id: "abroad", text: "He sent messengers to Syria, Egypt, Greece and Sri Lanka" },
      ],
      understand: [
        { title: "Inscriptions", body: "Most of Ashoka's inscriptions were in Prakrit and written in the Brahmi script.", tag: "found" },
        { title: "Problems he saw", body: "People followed different religions, which sometimes led to conflict; animals were sacrificed; slaves and servants were ill-treated; there were quarrels in families and among neighbours.", tag: "source" },
        { title: "Other work", body: "He built roads, dug wells, built rest houses, and arranged medical treatment for people and animals.", tag: "source" },
      ],
      check: [{ id: "ha2", kind: "mcq", q: "In which script were most of Ashoka's inscriptions written?", options: ["Brahmi", "Roman", "Devanagari"], answer: 0, why: "Brahmi, used to write Prakrit." }],
      connect: [
        { icon: "🕊", title: "Peace", body: "Why do you think Ashoka's decision to give up war still inspires people?" },
        { icon: "🏛", title: "Find an inscription", body: "Ashokan rock edicts survive at many places, like Dhauli in Odisha." },
        { icon: "🏥", title: "Care for all", body: "He arranged medical treatment for both people and animals." },
      ],
    },
    {
      id: "dhamma",
      icon: "🙏",
      title: "Living by dhamma",
      pages: "82–84",
      wonder: {
        q: "Did Ashoka's dhamma ask people to worship a particular god?",
        options: [
          { id: "yes", label: "Yes, a single god" },
          { id: "no", label: "No — it was about how to behave" },
          { id: "king", label: "Yes, the king himself" },
        ],
        answer: "no",
        reveal: "No. Dhamma did not involve worship of a god or performing sacrifices. It was about how people should behave towards each other.",
      },
      explore: { activity: "Ashoka's dhamma", title: "Encouraged or discouraged?", how: "Sort Ashoka's messages.", Sim: DhammaSort },
      discoveries: [
        { id: "kindness", text: "Be kind to servants, respect elders, care for animals" },
        { id: "respect", text: "Respect other people's religions" },
        { id: "rituals", text: "Give up useless rituals and animal sacrifice" },
      ],
      understand: [
        { title: "Like a father", body: "Ashoka felt, like a father, that it was his duty to instruct his subjects.", tag: "source" },
        { title: "Inspired by the Buddha", body: "He was inspired by the Buddha's teachings and tried to spread them.", tag: "source" },
        { title: "Does it matter today?", body: "Many of these ideas — kindness, respect for others' beliefs — matter just as much today.", tag: "think" },
      ],
      check: [{ id: "ha3", kind: "tf", q: "Ashoka asked people to respect the religions of others.", answer: true, why: "Respect for others' beliefs was part of his dhamma." }],
      connect: [
        { icon: "🏫", title: "School rules", body: "Write your own 'dhamma' of five good rules for your class." },
        { icon: "🌍", title: "Many faiths", body: "India is home to many religions living side by side." },
        { icon: "🐾", title: "Animal welfare", body: "Today laws protect animals from cruelty." },
      ],
    },
  ],
  learnt: [
    "The Mauryan empire was founded by Chandragupta Maurya about 2300 years ago; Pataliputra was its capital.",
    "Ashoka fought a war in Kalinga, was filled with sorrow, and gave up war.",
    "His dhamma was about behaving well — kindness, respect for others' beliefs, and no animal sacrifice.",
    "His messages were inscribed on rocks and pillars, mostly in Prakrit and the Brahmi script.",
  ],
  keywords: ["Empire", "Capital", "Province", "Ambassador", "Dhamma", "Inscription", "Brahmi"],
};

export default chapter;
