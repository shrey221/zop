// History Chapter 5 · What Books and Burials Tell Us (NCERT Our Pasts – I, 2018-19, pp. 43–53).
// Wording is original; facts follow the textbook.
import { ExploreLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function Vedas({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Mary sees a set of the Vedas in her school library. Find out about them."
      cases={[
        { id: "four", icon: "📚", prompt: "How many Vedas are there?", options: ["Two", "Four", "Ten"], answer: 1, explain: "Four: the Rigveda, Samaveda, Yajurveda and Atharvaveda.", disc: "four" },
        { id: "old", icon: "⏳", prompt: "The oldest Veda, the Rigveda, was composed about…", options: ["3500 years ago", "500 years ago", "50 years ago"], answer: 0, explain: "About 3500 years ago. It includes more than a thousand hymns called sukta — 'well-said'.", disc: "oldest" },
        { id: "gods", icon: "🔥", prompt: "Which three are especially important in the Rigveda's hymns?", options: ["Agni, Indra and Soma", "Kings, queens and princes", "Sun, Moon and stars only"], answer: 0, explain: "Agni, the god of fire; Indra, a warrior god; and Soma, a plant from which a special drink was made." },
        { id: "heard", icon: "👂", prompt: "How was the Rigveda passed on for centuries?", options: ["Printed in books", "Recited, heard and memorised", "Painted on walls"], answer: 1, explain: "Priests taught students to recite and memorise every syllable. It was written down centuries later and printed less than 200 years ago.", disc: "recited" },
      ]}
    />
  );
}

function Languages({ discover }: SimProps) {
  const items = [
    { id: "sanskrit", label: "Sanskrit", bin: "ie", why: "Sanskrit belongs to the Indo-European family." },
    { id: "hindi", label: "Hindi", bin: "ie" },
    { id: "english", label: "English", bin: "ie", why: "Compare 'matr' (Sanskrit), 'ma' (Hindi) and 'mother' (English) — words in common!" },
    { id: "persian", label: "Persian", bin: "ie" },
    { id: "tamil", label: "Tamil", bin: "dr", why: "Tamil, Telugu, Kannada and Malayalam belong to the Dravidian family." },
    { id: "telugu", label: "Telugu", bin: "dr" },
    { id: "ne", label: "Languages of the north-east", bin: "tb", why: "Many languages of the north-east belong to the Tibeto-Burman family." },
    { id: "jh", label: "Languages of Jharkhand", bin: "aa", why: "Languages of Jharkhand and parts of central India belong to the Austro-Asiatic family." },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Languages that once shared words form a family. Sort each language into its family."
      bins={[
        { id: "ie", label: "Indo-European", color: "#ffd257" },
        { id: "dr", label: "Dravidian", color: "#5fe0a0" },
        { id: "tb", label: "Tibeto-Burman", color: "#8fb3ff" },
        { id: "aa", label: "Austro-Asiatic", color: "#ff9bb0" },
      ]}
      items={items}
      rules={[
        { id: "ie", when: (p) => ["sanskrit", "hindi", "english", "persian"].every((i) => p[i]) },
        { id: "dr", when: (p) => !!p.tamil && !!p.telugu },
        { id: "others", when: (p) => !!p.ne && !!p.jh },
      ]}
    />
  );
}

function Megalith() {
  return (
    <g>
      <rect width="520" height="320" fill="#d9bf8a" />
      <rect y="0" width="520" height="110" fill="#9fc8e6" />
      {/* stone circle seen on surface */}
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={260 + Math.cos((i / 9) * Math.PI * 2) * 120} cy={130 + Math.sin((i / 9) * Math.PI * 2) * 22} rx="16" ry="11" fill="#7d7a70" />
      ))}
      <ellipse cx="260" cy="118" rx="38" ry="18" fill="#8d8a80" />
      {/* underground chamber (cut-away) */}
      <rect x="140" y="170" width="240" height="120" rx="8" fill="#8a6a3a" stroke="#5a4020" strokeWidth="4" />
      <circle cx="140" cy="230" r="14" fill="#2b1a0e" />
      {/* skeletons and goods */}
      <path d="M180 260 h70 M190 252 v16 M240 252 v16" stroke="#f1ead8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="172" cy="260" r="8" fill="#f1ead8" />
      <path d="M290 248 h60" stroke="#f1ead8" strokeWidth="4" strokeLinecap="round" />
      <circle cx="284" cy="248" r="7" fill="#f1ead8" />
      <path d="M300 200 h18 l-3 22 h-12 z" fill="#2b2a30" />
      <path d="M300 200 h18 l-1 7 h-16 z" fill="#b8452a" />
      <path d="M330 270 l30 -24" stroke="#7d8497" strokeWidth="4" />
      <circle cx="210" cy="220" r="4" fill="#e9b33c" />
      <circle cx="220" cy="224" r="4" fill="#e9b33c" />
    </g>
  );
}
function Burials({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="This is a cut-away view of a megalith burial. Tap the glowing clues."
      viewBox="0 0 520 320"
      art={<Megalith />}
      spots={[
        { id: "circle", label: "Stone circle and boulder", x: 260, y: 118, text: "Megaliths ('big stones') were carefully arranged boulders marking burial sites. Stone circles or boulders on the surface showed where burials were underground." },
        { id: "port", label: "Port-hole", x: 140, y: 230, text: "Some megaliths have a port-hole that could be used as an entrance. Archaeologists think stones closing these were removed when other members of the family were buried later." },
        { id: "pots", label: "Black-and-red ware", x: 309, y: 210, text: "The dead were often buried with distinctive pots called Black and Red Ware." },
        { id: "iron", label: "Iron tools and weapons", x: 345, y: 258, text: "Tools and weapons of iron, and sometimes skeletons of horses and horse equipment, were found." },
        { id: "gold", label: "Ornaments", x: 215, y: 222, text: "Some skeletons were buried with more goods — gold beads, stone ornaments — others with only a few pots. This suggests differences in status among the people buried." },
      ]}
      groups={{ marker: ["circle"], family: ["port"], goods: ["pots", "iron"], social: ["gold"] }}
    />
  );
}

const chapter: Chapter = {
  id: "hbooks",
  subject: "History",
  n: 5,
  title: "What Books and Burials Tell Us",
  pages: "43–53",
  icon: "📜",
  theme: { grad: "linear-gradient(135deg,#1c1033 0%,#5b3a8f 55%,#d9a35a 125%)", accent: "#5b3a8f", soft: "#eee6f8", ink: "#3d2466" },
  opening: "In the library, Mary's teacher points to a cupboard: \"Did you know we have a set of the Vedas?\" What are the Vedas — and what other clues tell us about people 3000 years ago?",
  stops: [
    {
      id: "vedas",
      icon: "📖",
      title: "One of the oldest books",
      pages: "43–45",
      wonder: {
        q: "The Rigveda is about 3500 years old. When was it first printed?",
        options: [
          { id: "old", label: "About 3500 years ago" },
          { id: "recent", label: "Less than 200 years ago" },
          { id: "never", label: "It has never been written down" },
        ],
        answer: "recent",
        reveal: "Less than 200 years ago! For centuries it was recited and heard rather than read; it was written down much later.",
      },
      explore: { activity: "One of the oldest books in the world", title: "The Vedas", how: "Answer these questions about the Vedas.", Sim: Vedas },
      discoveries: [
        { id: "four", text: "There are four Vedas" },
        { id: "oldest", text: "The Rigveda, about 3500 years old, has over a thousand hymns" },
        { id: "recited", text: "It was memorised and recited, not read" },
      ],
      understand: [
        { title: "Hymns", body: "The Rigveda's hymns, composed by sages (rishis), praise gods and goddesses. Most were composed by men; a few by women.", tag: "source" },
        { title: "Prayers", body: "There are prayers for cattle, children (especially sons) and horses. Horses were yoked to chariots used in battles.", tag: "source" },
        { title: "Battles", body: "Battles were fought for land, water, and to capture cattle. Some of the wealth was given to priests and some to the people.", tag: "source" },
        { title: "Two groups", body: "The Rigveda describes the Aryas and their opponents, the Dasas or Dasyus. Later, 'dasa' came to mean slave.", tag: "source" },
      ],
      check: [{ id: "hb1", kind: "mcq", q: "'Sukta' means…", options: ["Well-said", "Battle", "Fire"], answer: 0, why: "The hymns of the Rigveda are called sukta, 'well-said'." }],
      connect: [
        { icon: "🏛", title: "Libraries", body: "Visit a library and find the oldest book there." },
        { icon: "🗣", title: "Oral tradition", body: "Many songs and stories are still passed on by memory." },
        { icon: "📚", title: "Then and now", body: "How are the books we read different from the Rigveda?" },
      ],
    },
    {
      id: "langs",
      icon: "🗣",
      title: "Language families",
      pages: "44",
      wonder: {
        q: "The Sanskrit word 'matr', the Hindi word 'ma' and the English word 'mother' sound similar. Why?",
        options: [
          { id: "family", label: "They belong to the same language family" },
          { id: "chance", label: "Pure chance" },
          { id: "copied", label: "English copied Hindi recently" },
        ],
        answer: "family",
        reveal: "They belong to the Indo-European family: these languages originally had words in common.",
      },
      explore: { activity: "Sanskrit and other languages", title: "Family tree of languages", how: "Sort each language into its family.", Sim: Languages },
      discoveries: [
        { id: "ie", text: "Sanskrit, Hindi, English and Persian are Indo-European" },
        { id: "dr", text: "Tamil and Telugu are Dravidian" },
        { id: "others", text: "Tibeto-Burman and Austro-Asiatic families are spoken too" },
      ],
      understand: [
        { title: "Indo-European", body: "Assamese, Gujarati, Hindi, Kashmiri, Sindhi, Persian and many European languages belong to this family." },
        { title: "Dravidian", body: "Tamil, Telugu, Kannada and Malayalam." },
        { title: "More families", body: "Languages of the north-east are mostly Tibeto-Burman; those of Jharkhand and central India are Austro-Asiatic." },
      ],
      check: [{ id: "hb2", kind: "mcq", q: "To which family does Malayalam belong?", options: ["Dravidian", "Indo-European", "Tibeto-Burman"], answer: 0, why: "Malayalam is a Dravidian language." }],
      connect: [
        { icon: "🏠", title: "Your languages", body: "List the languages you hear around you. Which families do they belong to?" },
        { icon: "🔤", title: "Shared words", body: "Find more words that sound alike in Hindi and English." },
        { icon: "🗺", title: "Many tongues", body: "India is home to hundreds of languages." },
      ],
    },
    {
      id: "megaliths",
      icon: "⚱️",
      title: "Silent sentinels: megaliths",
      pages: "47–52",
      wonder: {
        q: "Some skeletons in megaliths have gold beads and many pots; others only a few pots. What might this suggest?",
        options: [
          { id: "status", label: "Differences in status among people" },
          { id: "same", label: "Everyone was equal" },
          { id: "nothing", label: "Nothing at all" },
        ],
        answer: "status",
        reveal: "Archaeologists think it suggests differences in status: some people were richer or more important than others.",
      },
      explore: { activity: "Silent sentinels", title: "Inside a megalith", how: "Tap each clue in this cut-away burial.", Sim: Burials },
      discoveries: [
        { id: "marker", text: "Stone circles and boulders marked burials" },
        { id: "family", text: "Port-holes let families bury members later" },
        { id: "goods", text: "Pots, iron tools and weapons were buried with the dead" },
        { id: "social", text: "Different grave goods suggest differences in status" },
      ],
      understand: [
        { title: "Megaliths", body: "These stone boulders, known as megaliths, mark burial sites. Making them began about 3000 years ago, in the Deccan, south India, the north-east and Kashmir.", tag: "found" },
        { title: "Inamgaon", body: "At Inamgaon, near the river Ghod, adults were usually buried lying straight, head towards the north. One man was buried in a large clay jar in his courtyard — perhaps a chief.", tag: "think" },
        { title: "What they ate", body: "At Inamgaon, archaeologists found seeds of wheat, barley, rice, pulses, millets, peas and sesame, and bones of cattle, buffalo, goat, sheep, dog, horse and deer.", tag: "found" },
        { title: "Skeletons", body: "Studying skeletons tells us much — e.g. a woman's skeleton usually has a larger pelvis. Charaka wrote a book on medicine about 2000 years ago.", tag: "found" },
      ],
      check: [{ id: "hb3", kind: "mcq", q: "Megaliths are found in…", options: ["The Deccan, south India, the north-east and Kashmir", "Only in Delhi", "Only in Egypt"], answer: 0, why: "Megaliths are found across these regions." }],
      connect: [
        { icon: "🌍", title: "Elsewhere: China", body: "About 3500 years ago in China, kings had bones inscribed with questions to know the future." },
        { icon: "🏺", title: "Black and Red Ware", body: "Look for these distinctive pots in museum displays." },
        { icon: "⚱️", title: "Imagine", body: "Describe a burial at Inamgaon 3000 years ago." },
      ],
    },
  ],
  learnt: [
    "There are four Vedas; the oldest, the Rigveda, was composed about 3500 years ago and was recited and heard.",
    "Sanskrit belongs to the Indo-European family of languages; India has several language families.",
    "The Rigveda tells us about cattle, horses, chariots, battles and the Aryas and Dasas.",
    "Megaliths — big stones marking burials — were made from about 3000 years ago; grave goods suggest differences in status.",
  ],
  keywords: ["Veda", "Language", "Hymn", "Chariot", "Sacrifice", "Raja", "Slave", "Megalith", "Burial", "Skeletal", "Iron"],
};

export default chapter;
