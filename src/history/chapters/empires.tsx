// History Chapter 11 · New Empires and Kingdoms (NCERT Our Pasts – I, 2018-19, pp. 111–121).
// Wording is original; facts follow the textbook. The prashasti is a praise poem — treated as a source, not plain fact.
import { PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function Prashasti({ discover }: SimProps) {
  const items = [
    { id: "arya", label: "Nine rulers uprooted; their kingdoms made part of his empire", bin: "arya" },
    { id: "dakshina", label: "Twelve rulers surrendered, then were allowed to rule again", bin: "dakshina" },
    { id: "inner", label: "Neighbours like Assam, coastal Bengal and Nepal brought tribute and attended his court", bin: "inner" },
    { id: "outer", label: "Kushanas, Shakas and the ruler of Sri Lanka submitted to him", bin: "outer" },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Samudragupta's prashasti says he dealt with four kinds of rulers in different ways. Match each."
      bins={[
        { id: "arya", label: "Aryavarta (north)", color: "#ffd257" },
        { id: "dakshina", label: "Dakshinapatha (south)", color: "#5fe0a0" },
        { id: "inner", label: "Neighbouring states", color: "#8fb3ff" },
        { id: "outer", label: "Outlying areas", color: "#ff9bb0" },
      ]}
      items={items}
      rules={[
        { id: "arya", when: (p) => !!p.arya },
        { id: "dakshina", when: (p) => !!p.dakshina },
        { id: "rest", when: (p) => !!p.inner && !!p.outer },
      ]}
    />
  );
}

function Rivals({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Harshavardhana, the Pallavas and the Chalukyas. Answer these questions."
      cases={[
        { id: "bana", icon: "📜", prompt: "Who wrote Harshacharita, a biography of Harshavardhana?", options: ["Banabhatta, his court poet", "Megasthenes", "Fa Xian"], answer: 0, explain: "Banabhatta wrote it in Sanskrit. Xuan Zang, who spent a lot of time at Harsha's court, also left a detailed account.", disc: "harsha" },
        { id: "narmada", icon: "🏞", prompt: "Harsha tried to cross the Narmada to march into the Deccan. What happened?", options: ["He was stopped by Pulakeshin II, the Chalukya ruler", "He conquered all of the south", "He became a monk"], answer: 0, explain: "Pulakeshin II of the Chalukyas stopped him — we know this from a prashasti composed by his court poet, Ravikirti.", disc: "pulakeshin" },
        { id: "pallava", icon: "🏰", prompt: "Kanchipuram was the capital of which dynasty?", options: ["The Pallavas", "The Guptas", "The Kushanas"], answer: 0, explain: "The Pallavas ruled from Kanchipuram; the Chalukyas' capital was Aihole, an important trading centre. The two often raided each other.", disc: "pallava" },
      ]}
    />
  );
}

function Admin({ discover }: SimProps) {
  const items = [
    { id: "samanta", label: "Samantas — military leaders who supplied troops", bin: "kings", why: "Kings gave land to samantas, who maintained soldiers and horses and provided them when needed." },
    { id: "here", label: "Hereditary officers — posts passed from father to son", bin: "kings", why: "Some important posts became hereditary, like the poet Harishena, who was a minister like his father." },
    { id: "sabha", label: "Sabha — assembly of brahmin landowners", bin: "local", why: "Sabhas had sub-committees for irrigation, agriculture, roads and temples." },
    { id: "ur", label: "Ur — village assembly of non-brahmin landowners", bin: "local" },
    { id: "nagaram", label: "Nagaram — organisation of merchants", bin: "local" },
  ];
  return (
    <SortLab
      discover={discover}
      intro="How were these kingdoms run? Sort who did what."
      bins={[
        { id: "kings", label: "Help for the king", color: "#ffd257" },
        { id: "local", label: "Local assemblies (south)", color: "#5fe0a0" },
      ]}
      items={items}
      rules={[
        { id: "samanta", when: (p) => !!p.samanta },
        { id: "assemblies", when: (p) => ["sabha", "ur", "nagaram"].every((i) => p[i]) },
        { id: "hereditary", when: (p) => !!p.here },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hempires",
  subject: "History",
  n: 11,
  title: "New Empires and Kingdoms",
  pages: "111–121",
  icon: "🏰",
  theme: { grad: "linear-gradient(135deg,#1e0b2b 0%,#7a2f8f 55%,#e9b45a 125%)", accent: "#7a2f8f", soft: "#f3e3f6", ink: "#55196a" },
  opening: "Arvind is chosen to play a king in the school play — and is told he must also play the veena and recite poetry. A musician-king? Who was that?",
  stops: [
    {
      id: "prashasti",
      icon: "📜",
      title: "Samudragupta's prashasti",
      pages: "111–114",
      wonder: {
        q: "We know about Samudragupta from a long inscription called a prashasti. What does 'prashasti' mean?",
        options: [
          { id: "praise", label: "In praise of" },
          { id: "war", label: "Victory in war" },
          { id: "tax", label: "Tax record" },
        ],
        answer: "praise",
        reveal: "'In praise of'. It was composed by Harishena, a poet and minister at his court, and inscribed on the Ashokan pillar at Allahabad. Since it praises the king, historians read it carefully.",
      },
      explore: { activity: "Samudragupta's prashasti", title: "Four kinds of rulers", how: "Match how the prashasti says Samudragupta treated each group.", Sim: Prashasti },
      discoveries: [
        { id: "arya", text: "In the north (Aryavarta), nine rulers were uprooted" },
        { id: "dakshina", text: "In the south, twelve rulers surrendered and ruled again" },
        { id: "rest", text: "Neighbours paid tribute; distant rulers submitted" },
      ],
      understand: [
        { title: "A warrior-poet?", body: "The prashasti describes Samudragupta as a great warrior and a learned poet. Some of his coins show him playing the veena.", tag: "source" },
        { title: "Read with care", body: "A prashasti was written to praise a ruler, so historians check it against other evidence — it may exaggerate.", tag: "think" },
        { title: "Genealogies", body: "Prashastis list a ruler's ancestors. Samudragupta's mother, Kumara devi, belonged to the Lichchhavi gana. His son Chandragupta II led an army to western India.", tag: "source" },
      ],
      check: [{ id: "he1", kind: "mcq", q: "Who composed Samudragupta's prashasti?", options: ["Harishena", "Banabhatta", "Ravikirti"], answer: 0, why: "Harishena, a poet and minister at his court." }],
      connect: [
        { icon: "🎻", title: "Musician-king", body: "Look for pictures of Samudragupta's coin showing him with a veena." },
        { icon: "👪", title: "Your genealogy", body: "Make a family tree. How many generations can you show?" },
        { icon: "🏛", title: "Allahabad pillar", body: "The same pillar carries inscriptions from Ashoka and Samudragupta." },
      ],
    },
    {
      id: "harsha",
      icon: "⚔️",
      title: "Harsha, Pallavas and Chalukyas",
      pages: "115–118",
      wonder: {
        q: "How do we know about Harshavardhana's life?",
        options: [
          { id: "bio", label: "From a biography by his court poet, and from Xuan Zang's account" },
          { id: "tv", label: "From his own diary" },
          { id: "none", label: "We know nothing about him" },
        ],
        answer: "bio",
        reveal: "From Harshacharita, written by Banabhatta, and from the account of Xuan Zang, who spent time at his court.",
      },
      explore: { activity: "Harshavardhana and the Harshacharita", title: "Rival kingdoms", how: "Answer the questions about these rulers.", Sim: Rivals },
      discoveries: [
        { id: "harsha", text: "Banabhatta wrote Harsha's biography, Harshacharita" },
        { id: "pulakeshin", text: "Pulakeshin II stopped Harsha at the Narmada" },
        { id: "pallava", text: "The Pallavas ruled from Kanchipuram; the Chalukyas from Aihole" },
      ],
      understand: [
        { title: "Harsha", body: "Harsha ruled about 1400 years ago. He became king of Thanesar, then of Kanauj, and led an army east to Magadha and Bengal.", tag: "source" },
        { title: "Raids", body: "The Pallavas and Chalukyas frequently raided each other's lands, especially attacking capital cities.", tag: "source" },
      ],
      check: [{ id: "he2", kind: "tf", q: "Aihole was the capital of the Pallavas.", answer: false, why: "Aihole was the Chalukya capital; the Pallavas ruled from Kanchipuram." }],
      connect: [
        { icon: "📖", title: "Biographies", body: "Who would you write a biography about?" },
        { icon: "🏯", title: "Aihole", body: "Aihole in Karnataka has many old temples." },
        { icon: "🌍", title: "Elsewhere: Arabia", body: "About 1400 years ago, Prophet Muhammad introduced Islam in Arabia." },
      ],
    },
    {
      id: "rule",
      icon: "🏛",
      title: "Running the kingdoms",
      pages: "118–120",
      wonder: {
        q: "Some kings gave land to military leaders called samantas. What did the samantas give in return?",
        options: [
          { id: "troops", label: "Troops — soldiers and horses — when the king needed them" },
          { id: "food", label: "Only food" },
          { id: "nothing", label: "Nothing" },
        ],
        answer: "troops",
        reveal: "Troops. Samantas maintained soldiers and horses and supplied them to the king. Powerful samantas sometimes became independent.",
      },
      explore: { activity: "Administration and assemblies", title: "Who did what?", how: "Sort the officers and assemblies.", Sim: Admin },
      discoveries: [
        { id: "samanta", text: "Samantas supplied troops in exchange for land" },
        { id: "assemblies", text: "Sabha, ur and nagaram were local assemblies in the south" },
        { id: "hereditary", text: "Some important posts passed from father to son" },
      ],
      understand: [
        { title: "Land revenue", body: "Land revenue remained important for rulers. Villages were the basic units of administration.", tag: "source" },
        { title: "Who decided?", body: "These assemblies were controlled by rich and powerful landowners and merchants. Ordinary people had little say.", tag: "think" },
        { title: "Ordinary people", body: "Plays like Kalidasa's, and accounts by Fa Xian, show the lives of ordinary people — including the cruel treatment of untouchables.", tag: "source" },
      ],
      check: [{ id: "he3", kind: "mcq", q: "The 'nagaram' was an organisation of…", options: ["Merchants", "Farmers", "Priests"], answer: 0, why: "The nagaram was an organisation of merchants." }],
      connect: [
        { icon: "🎭", title: "Kalidasa", body: "His plays show life at court and in the kingdom." },
        { icon: "🗳", title: "Local government", body: "Today, panchayats and municipalities are local assemblies." },
        { icon: "⚔️", title: "Wars and people", body: "How do wars affect the lives of ordinary people today?" },
      ],
    },
  ],
  learnt: [
    "Samudragupta, a Gupta ruler, is known from a prashasti composed by Harishena — a praise poem that historians read carefully.",
    "Harshavardhana is known from Banabhatta's Harshacharita and Xuan Zang's account; Pulakeshin II stopped him at the Narmada.",
    "The Pallavas (Kanchipuram) and Chalukyas (Aihole) were powerful in the south.",
    "Samantas, hereditary officers and local assemblies like the sabha, ur and nagaram helped run kingdoms.",
  ],
  keywords: ["Prashasti", "Aryavarta", "Dakshinapatha", "Genealogy", "Hereditary officer", "Samanta", "Assembly", "Nagaram"],
};

export default chapter;
