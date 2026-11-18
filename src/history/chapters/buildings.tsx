// History Chapter 12 · Buildings, Paintings and Books (NCERT Our Pasts – I, 2018-19, pp. 122–133).
// Wording is original; facts follow the textbook.
import { ExploreLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function Stupa() {
  return (
    <g>
      <rect width="520" height="320" fill="#f2e3c4" />
      <rect y="250" width="520" height="70" fill="#c9a86a" />
      {/* railing */}
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={80 + i * 26} y="218" width="8" height="40" fill="#b8956a" />
      ))}
      <rect x="76" y="222" width="380" height="7" fill="#a5835a" />
      <rect x="76" y="240" width="380" height="7" fill="#a5835a" />
      {/* gateway */}
      <g fill="#8a6a3a">
        <rect x="40" y="150" width="10" height="110" />
        <rect x="76" y="150" width="10" height="110" />
        <rect x="30" y="148" width="66" height="8" />
        <rect x="30" y="166" width="66" height="8" />
      </g>
      {/* dome (anda) */}
      <path d="M150 218 A 115 100 0 0 1 380 218 Z" fill="#e9d6b0" stroke="#b8956a" strokeWidth="3" />
      {/* cut-away relic box */}
      <rect x="250" y="150" width="30" height="24" rx="3" fill="#8a5a2b" stroke="#e9b33c" strokeWidth="2" />
      {/* harmika + umbrella */}
      <rect x="250" y="106" width="30" height="16" fill="#b8956a" />
      <path d="M265 106 V70 M245 82 h40 M250 72 h30" stroke="#8a6a3a" strokeWidth="4" />
      {/* path around */}
      <path d="M120 290 Q 265 320 410 290" stroke="#8a6a3a" strokeWidth="3" strokeDasharray="6 6" fill="none" />
    </g>
  );
}
function StupaExplore({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Stupas like the one at Sanchi were built about 2000 years ago. Tap the glowing parts."
      viewBox="0 0 520 320"
      art={<Stupa />}
      spots={[
        { id: "relic", label: "Relic casket", x: 265, y: 162, text: "At the heart of a stupa is a small box. It may contain bodily remains of the Buddha or his followers — teeth, bone or ashes — or things they used, or precious stones and coins." },
        { id: "dome", label: "The mound", x: 330, y: 190, text: "The word stupa means a mound. A dome-shaped mound of earth, later covered with bricks or stone, was built over the casket." },
        { id: "railing", label: "Railing", x: 420, y: 232, text: "Stupas were surrounded by railings, often carved with beautiful sculpture." },
        { id: "gate", label: "Gateway", x: 63, y: 160, text: "Elaborately carved gateways led in. Sanchi's gateways are famous." },
        { id: "path", label: "Circular path", x: 265, y: 300, text: "A path, known as the pradakshina patha, was laid around the stupa. Devotees walked around it in a clockwise direction, as a mark of devotion." },
      ]}
      groups={{ relic: ["relic"], mound: ["dome"], decor: ["railing", "gate"], path: ["path"] }}
    />
  );
}

function Temples({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Temples, cave paintings and an iron pillar that hasn't rusted. Answer these questions."
      cases={[
        { id: "garbha", icon: "🏯", prompt: "In a temple, what is the garbhagriha?", options: ["The most important room, where the image of the chief deity was placed", "The kitchen", "A gateway"], answer: 0, explain: "The garbhagriha was where priests performed rituals and devotees offered worship. A tower, the shikhara, was often built on top to mark this sacred place.", disc: "garbha" },
        { id: "monolith", icon: "⛰", prompt: "Some temples at Mahabalipuram were 'monoliths'. What does that mean?", options: ["Each was carved out of a huge, single piece of stone", "They were made of wood", "They were built in one night"], answer: 0, explain: "Monolithic temples were cut out of a single massive rock. Some of the finest stone temples were built in Mahabalipuram and Aihole about 1400 years ago.", disc: "monolith" },
        { id: "ajanta", icon: "🎨", prompt: "How were the paintings in the Ajanta caves made?", options: ["In dark caves, by the light of torches, with colours from plants and minerals", "With electric lights and plastic paints", "By printing"], answer: 0, explain: "Monks lived in these caves. Artists painted by torchlight; colours made from plants and minerals have remained vivid for 1500 years. We don't know the names of the artists.", disc: "ajanta" },
        { id: "pillar", icon: "🗼", prompt: "What is remarkable about the iron pillar at Mehrauli, Delhi?", options: ["It hasn't rusted in about 1500 years", "It is made of gold", "It moves by itself"], answer: 0, explain: "It is about 7.2 m high, weighs over 3 tonnes, and was made about 1500 years ago — yet it hasn't rusted. An inscription mentions a ruler named Chandra, probably of the Gupta dynasty.", disc: "pillar" },
      ]}
    />
  );
}

function BooksSort({ discover }: SimProps) {
  const items = [
    { id: "maha", label: "Mahabharata", bin: "epic", why: "A story about a war between the Kauravas and Pandavas, compiled about 1500 years ago. Vyasa is believed to have compiled it." },
    { id: "rama", label: "Ramayana", bin: "epic", why: "The story of Rama, prince of Kosala. Valmiki is recognised as its author." },
    { id: "puranas", label: "Puranas", bin: "epic", why: "Stories about gods and goddesses in simple Sanskrit verse, meant to be heard by everybody — including women and shudras." },
    { id: "silap", label: "Silappadikaram", bin: "tamil", why: "A Tamil epic composed about 1800 years ago by Ilango, about a merchant named Kovalan." },
    { id: "mani", label: "Manimekalai", bin: "tamil", why: "A Tamil epic by Sattanar, about 1400 years ago, describing the story of the daughter of Kovalan and Madhavi." },
    { id: "arya", label: "Aryabhatiyam", bin: "sci", why: "Aryabhata wrote that day and night are caused by the earth rotating on its axis, and explained eclipses scientifically." },
    { id: "zero", label: "Zero and the place-value system", bin: "sci", why: "Indian mathematicians invented a special symbol for zero. The Arabs carried this system west; it spread to Europe." },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Sort these books and ideas."
      bins={[
        { id: "epic", label: "Sanskrit epics & Puranas", color: "#ffd257" },
        { id: "tamil", label: "Tamil epics", color: "#5fe0a0" },
        { id: "sci", label: "Science & maths", color: "#8fb3ff" },
      ]}
      items={items}
      rules={[
        { id: "epics", when: (p) => !!p.maha && !!p.rama },
        { id: "tamil", when: (p) => !!p.silap && !!p.mani },
        { id: "science", when: (p) => !!p.arya && !!p.zero },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hbuildings",
  subject: "History",
  n: 12,
  title: "Buildings, Paintings and Books",
  pages: "122–133",
  icon: "🏛",
  theme: { grad: "linear-gradient(135deg,#2b1408 0%,#a3502a 55%,#f0c27a 125%)", accent: "#a3502a", soft: "#fbe9dc", ink: "#6e3014" },
  opening: "Marutasami's brother wheels him past the Qutb Minar up to an iron pillar that has stood for about 1500 years — without rusting. How did people long ago build such things?",
  stops: [
    {
      id: "stupa",
      icon: "☸️",
      title: "Stupas",
      pages: "123–125",
      wonder: {
        q: "What does the word 'stupa' mean?",
        options: [
          { id: "mound", label: "A mound" },
          { id: "tower", label: "A tower" },
          { id: "cave", label: "A cave" },
        ],
        answer: "mound",
        reveal: "A mound. Stupas were built over relics of the Buddha or his followers.",
      },
      explore: { activity: "Stupas", title: "Inside a stupa", how: "Tap each part of the stupa.", Sim: StupaExplore },
      discoveries: [
        { id: "relic", text: "A relic casket is at the heart of the stupa" },
        { id: "mound", text: "A dome-shaped mound covers it" },
        { id: "decor", text: "Carved railings and gateways surround it" },
        { id: "path", text: "Devotees walk the circular path, clockwise" },
      ],
      understand: [
        { title: "Who paid?", body: "Kings and queens, merchants, crafts persons, and ordinary people gave gifts for building stupas. Inscriptions record their names.", tag: "found" },
        { title: "Sanchi and Amaravati", body: "Sanchi (Madhya Pradesh) and Amaravati (Andhra Pradesh) had famous stupas with fine carving.", tag: "found" },
      ],
      check: [{ id: "hs1", kind: "mcq", q: "The path around a stupa is called the…", options: ["Pradakshina patha", "Garbhagriha", "Shikhara"], answer: 0, why: "Devotees walk clockwise along the pradakshina patha." }],
      connect: [
        { icon: "🏛", title: "Sanchi", body: "Sanchi's stupa is a World Heritage Site." },
        { icon: "🔨", title: "Builders", body: "Imagine carving a stone gateway with hand tools." },
        { icon: "🙏", title: "Pilgrims", body: "Buddhists from many countries visit Sanchi." },
      ],
    },
    {
      id: "art",
      icon: "🏯",
      title: "Temples, caves and an iron pillar",
      pages: "122–129",
      wonder: {
        q: "The Ajanta cave paintings are about 1500 years old but still bright. What were the colours made from?",
        options: [
          { id: "nature", label: "Plants and minerals" },
          { id: "plastic", label: "Plastic paint" },
          { id: "crayons", label: "Wax crayons" },
        ],
        answer: "nature",
        reveal: "Plants and minerals. The artists — whose names we don't know — worked by torchlight inside the caves.",
      },
      explore: { activity: "Paintings and temples", title: "Marvels in stone and iron", how: "Answer each question.", Sim: Temples },
      discoveries: [
        { id: "garbha", text: "The garbhagriha held the chief deity; the shikhara rose above it" },
        { id: "monolith", text: "Monolithic temples were carved from a single rock" },
        { id: "ajanta", text: "Ajanta's paintings were made with natural colours" },
        { id: "pillar", text: "The iron pillar hasn't rusted in about 1500 years" },
      ],
      understand: [
        { title: "Early temples", body: "Some of the earliest Hindu temples were built about this time, for gods like Vishnu, Shiva and Durga. The temple at Bhitargaon (UP) was built of baked brick and stone about 1500 years ago.", tag: "found" },
        { title: "Mandapa", body: "Many temples had a mandapa — a hall where people could assemble.", tag: "found" },
        { title: "Who built them?", body: "Building these needed many workers and lots of resources. Kings and queens likely spent wealth on them to show their devotion and power.", tag: "think" },
      ],
      check: [{ id: "hs2", kind: "mcq", q: "Where are some of the finest monolithic temples?", options: ["Mahabalipuram", "Pataliputra", "Mehrgarh"], answer: 0, why: "Mahabalipuram has temples carved from single rocks." }],
      connect: [
        { icon: "🎨", title: "Ajanta & Ellora", body: "Both are World Heritage Sites in Maharashtra." },
        { icon: "🗼", title: "The iron pillar", body: "You can see it in the Qutb complex in Mehrauli, Delhi." },
        { icon: "♿", title: "Access for all", body: "Ramps like the one Marutasami used help everyone enjoy heritage sites." },
      ],
    },
    {
      id: "books",
      icon: "📚",
      title: "Books, stories and science",
      pages: "129–132",
      wonder: {
        q: "Aryabhata, a mathematician and astronomer about 1500 years ago, explained day and night. How?",
        options: [
          { id: "rotate", label: "The earth rotates on its axis" },
          { id: "sun", label: "The sun switches off at night" },
          { id: "moon", label: "The moon blocks the sun every evening" },
        ],
        answer: "rotate",
        reveal: "The earth rotates on its axis, even though it seems the sun is rising and setting. He also gave a scientific explanation for eclipses.",
      },
      explore: { activity: "Books", title: "A library of the past", how: "Sort the books and ideas.", Sim: BooksSort },
      discoveries: [
        { id: "epics", text: "The Mahabharata and Ramayana are great Sanskrit epics" },
        { id: "tamil", text: "Silappadikaram and Manimekalai are Tamil epics" },
        { id: "science", text: "Aryabhata explained day and night; zero was invented here" },
      ],
      understand: [
        { title: "Epics", body: "Epics are grand, long compositions about heroic men and women, with stories about gods.", tag: "source" },
        { title: "Kalidasa", body: "Kalidasa is known for his works in Sanskrit, like the Meghaduta.", tag: "source" },
        { title: "Stories for all", body: "Many stories, like those in the Panchatantra and the Jatakas, were told and retold by ordinary people.", tag: "source" },
      ],
      check: [{ id: "hs3", kind: "mcq", q: "Who wrote the Silappadikaram?", options: ["Ilango", "Sattanar", "Kalidasa"], answer: 0, why: "Ilango composed it about 1800 years ago." }],
      connect: [
        { icon: "0️⃣", title: "Zero", body: "Every number you write uses the place-value system with zero." },
        { icon: "🌍", title: "Elsewhere: paper", body: "Paper was invented in China, and the technique later spread to other parts of the world." },
        { icon: "📖", title: "Your favourite story", body: "Which old story do you know? Who told it to you?" },
      ],
    },
  ],
  learnt: [
    "The iron pillar at Mehrauli, about 1500 years old, hasn't rusted.",
    "Stupas were built over relics, with railings, gateways and a circular path. Sanchi's are famous.",
    "Early temples had a garbhagriha and shikhara; monolithic temples were carved at Mahabalipuram; Ajanta's caves have paintings.",
    "Epics like the Mahabharata, Ramayana, Silappadikaram and Manimekalai were composed; Aryabhata explained day and night.",
  ],
  keywords: ["Stupa", "Relic", "Pradakshina patha", "Garbhagriha", "Shikhara", "Mandapa", "Monolith", "Epic", "Purana", "Zero"],
};

export default chapter;
