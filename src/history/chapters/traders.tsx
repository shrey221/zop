// History Chapter 10 · Traders, Kings and Pilgrims (NCERT Our Pasts – I, 2018-19, pp. 99–110).
// Wording is original; facts follow the textbook.
import { ExploreLab, PickLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { MAP_VIEWBOX, SketchMap, proj } from "../map";

const STOPS = [
  { id: "silk", label: "Towards the Silk Route", lon: 71.6, lat: 34, text: "The Silk Route carried silk from China westwards. Some kings, like the Kushanas who ruled from Peshawar and Mathura about 2000 years ago, controlled large parts of it." },
  { id: "mathura", label: "Mathura", lon: 77.7, lat: 27.5, text: "A Kushana centre. Kushana rulers were among the earliest to issue gold coins, used by traders along the Silk Route." },
  { id: "pepper", label: "Muziris (pepper coast)", lon: 76.2, lat: 10.2, text: "South India was famous for gold, spices — especially pepper, valued so much in Rome it was called 'black gold' — and precious stones." },
  { id: "sea", label: "Sea routes", lon: 72.2, lat: 15.5, text: "Sailors used the monsoon winds to cross the seas more quickly. Many Roman gold coins have been found in south India." },
  { id: "paithan", label: "Satavahana lands", lon: 75.4, lat: 19.5, text: "About 2100 years ago the Satavahanas became powerful in western India. Their best-known ruler, Gautamiputra Shri Satakarni, was called lord of the dakshinapatha — the route leading to the south." },
];
function TradeMap({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Traders crossed land and sea. Tap the glowing places on the sketch map."
      viewBox={MAP_VIEWBOX}
      art={
        <g>
          <SketchMap />
          <path d={`M${proj(56, 18).x} ${proj(56, 18).y} Q ${proj(64, 12).x} ${proj(64, 12).y} ${proj(75.8, 10.5).x} ${proj(75.8, 10.5).y}`} stroke="#ffd257" strokeWidth="3" strokeDasharray="6 6" fill="none" />
          <path d={`M${proj(71.6, 34).x} ${proj(71.6, 34).y} L ${proj(64, 37).x} ${proj(64, 37).y}`} stroke="#ffd257" strokeWidth="3" strokeDasharray="6 6" fill="none" />
        </g>
      }
      spots={STOPS.map((s) => ({ id: s.id, label: s.label, ...proj(s.lon, s.lat), text: s.text }))}
      groups={{ silk: ["silk", "mathura"], pepper: ["pepper"], sea: ["sea"], south: ["paithan"] }}
    />
  );
}

function Chiefs({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Sangam poems tell us about the kings of the south. Answer these questions."
      cases={[
        { id: "muvendar", icon: "👑", prompt: "The Sangam poems mention the muvendar. Who were they?", options: ["Three chiefs: the Cholas, Cheras and Pandyas", "Three rivers", "Three traders"], answer: 0, explain: "Muvendar is a Tamil word meaning three chiefs — the heads of the Cholas, Cheras and Pandyas, who became powerful about 2300 years ago.", disc: "muvendar" },
        { id: "towns", icon: "🏙", prompt: "Puhar and Madurai were…", options: ["Important ports and capitals controlled by these chiefs", "Mountain caves", "Silk-making towns in China"], answer: 0, explain: "Each chief had two centres of power: one inland and one on the coast. Puhar (Kaveripattinam) and Madurai were among the most important.", disc: "towns" },
        { id: "gifts", icon: "🎁", prompt: "Instead of regular taxes, these chiefs…", options: ["Demanded and received gifts, and also raided", "Paid everyone salaries", "Never collected anything"], answer: 0, explain: "They did not collect regular taxes. They demanded and received gifts, went on military expeditions, and collected tribute from neighbouring areas. They also rewarded poets with gifts.", disc: "gifts" },
      ]}
    />
  );
}

function Pilgrims({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Ideas travelled along trade routes too. Answer these questions."
      cases={[
        { id: "fa", icon: "🧭", prompt: "Fa Xian, a Chinese Buddhist pilgrim, came to the subcontinent about…", options: ["1600 years ago", "160 years ago", "16,000 years ago"], answer: 0, explain: "About 1600 years ago. Xuan Zang came about 1400 years ago, and I-Qing about 50 years after him. Pilgrims came to visit places associated with the Buddha's life and famous monasteries.", disc: "pilgrims" },
        { id: "nalanda", icon: "📚", prompt: "Where did Xuan Zang study?", options: ["Nalanda, a Buddhist monastery in Bihar", "Rome", "Athens"], answer: 0, explain: "Xuan Zang and other pilgrims spent time studying at Nalanda, the most famous Buddhist monastery of the period.", disc: "nalanda" },
        { id: "mahayana", icon: "🗿", prompt: "Mahayana Buddhism brought a new change. What was it?", options: ["Images of the Buddha were made, and belief in Bodhisattvas grew", "The Buddha was forgotten", "Monks stopped meditating"], answer: 0, explain: "Earlier, the Buddha's presence was shown only by signs (like a peepal tree). Now statues were made, many in Mathura and Taxila. Bodhisattvas were believed to help others attain enlightenment.", disc: "mahayana" },
        { id: "bhakti", icon: "🙏", prompt: "What does 'bhakti' mean?", options: ["Devotion to a chosen deity", "A kind of tax", "A sea route"], answer: 0, explain: "Bhakti is understood as a person's devotion to his or her chosen deity. Anybody, rich or poor, of any caste, could follow it. The Bhagavad Gita has ideas of bhakti.", disc: "bhakti" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "htraders",
  subject: "History",
  n: 10,
  title: "Traders, Kings and Pilgrims",
  pages: "99–110",
  icon: "⛵",
  theme: { grad: "linear-gradient(135deg,#071f2b 0%,#16697a 55%,#e9b45a 125%)", accent: "#16697a", soft: "#dcf1f3", ink: "#0d4a56" },
  opening: "Jagini loves the village fair, where traders sell pots, cloth and toys from the city. Why are traders always on the move — and what did they carry long ago?",
  stops: [
    {
      id: "routes",
      icon: "🐫",
      title: "Trade and traders",
      pages: "99–102",
      wonder: {
        q: "Pepper from south India was so valued in the Roman Empire that it had a special name. What was it?",
        options: [
          { id: "black", label: "Black gold" },
          { id: "red", label: "Red silver" },
          { id: "green", label: "Green stone" },
        ],
        answer: "black",
        reveal: "Black gold! Many Roman gold coins found in south India show how much trade there was.",
      },
      explore: { activity: "How to find out about trade and traders", title: "Routes over land and sea", how: "Tap the places on the trade map.", Sim: TradeMap },
      discoveries: [
        { id: "silk", text: "The Silk Route carried silk from China; the Kushanas controlled part of it" },
        { id: "pepper", text: "South India traded pepper ('black gold'), gold and precious stones" },
        { id: "sea", text: "Sailors used the monsoon winds to cross the sea" },
        { id: "south", text: "The Satavahanas controlled the route to the south" },
      ],
      understand: [
        { title: "Silk", body: "The technique of making silk was first invented in China about 7000 years ago and kept secret for thousands of years. Silk was carried west along the Silk Route.", tag: "source" },
        { title: "Roman coins", body: "Many Roman gold coins have been found in south India.", tag: "found" },
        { title: "Monsoon winds", body: "Sailors took advantage of the monsoon winds to cross the seas more quickly.", tag: "source" },
      ],
      check: [{ id: "hr1", kind: "mcq", q: "Who controlled large parts of the Silk Route about 2000 years ago?", options: ["The Kushanas", "The Pandyas", "The Romans"], answer: 0, why: "The Kushanas ruled from Peshawar and Mathura." }],
      connect: [
        { icon: "🧵", title: "Silk today", body: "India is now one of the largest producers of silk." },
        { icon: "🌶", title: "Spices", body: "Pepper, cardamom and cinnamon are still traded across the world." },
        { icon: "🎪", title: "Jagini's fair", body: "Who are the traders at a fair near you?" },
      ],
    },
    {
      id: "south",
      icon: "👑",
      title: "Kings of the south",
      pages: "102–104",
      wonder: {
        q: "Some of the earliest Tamil compositions describe the south's chiefs. What are they called?",
        options: [
          { id: "sangam", label: "Sangam poems" },
          { id: "vedas", label: "The Vedas" },
          { id: "jataka", label: "Jatakas" },
        ],
        answer: "sangam",
        reveal: "Sangam poems, composed around 2300 years ago. They were compiled and collected in assemblies (sangams) held in Madurai.",
      },
      explore: { activity: "New kingdoms along the coasts", title: "The muvendar", how: "Answer the questions about the southern chiefs.", Sim: Chiefs },
      discoveries: [
        { id: "muvendar", text: "The Cholas, Cheras and Pandyas were the muvendar" },
        { id: "towns", text: "Puhar and Madurai were great centres" },
        { id: "gifts", text: "These chiefs received gifts rather than regular taxes" },
      ],
      understand: [
        { title: "Poets and kings", body: "The chiefs rewarded poets, who composed poems in their praise.", tag: "source" },
        { title: "Satavahanas", body: "Gautamiputra Shri Satakarni's mother, Gautami Balashri, had an inscription composed about him.", tag: "source" },
      ],
      check: [{ id: "hr2", kind: "tf", q: "The muvendar collected regular taxes from farmers.", answer: false, why: "They demanded gifts and collected tribute instead." }],
      connect: [
        { icon: "📜", title: "Sangam poems", body: "These poems are still read and loved in Tamil Nadu." },
        { icon: "⚓", title: "Puhar", body: "Puhar (Kaveripattinam) was a busy port at the mouth of the Kaveri." },
        { icon: "🎭", title: "Imagine", body: "You are a poet at a chief's court. What would you write?" },
      ],
    },
    {
      id: "faith",
      icon: "🧭",
      title: "Pilgrims and new beliefs",
      pages: "104–109",
      wonder: {
        q: "Why did Chinese pilgrims like Fa Xian and Xuan Zang make the long, dangerous journey to India?",
        options: [
          { id: "buddha", label: "To visit places linked to the Buddha's life and study in monasteries" },
          { id: "war", label: "To fight wars" },
          { id: "gold", label: "To find gold" },
        ],
        answer: "buddha",
        reveal: "To visit places associated with the Buddha and famous monasteries — and they took back books and statues.",
      },
      explore: { activity: "Pilgrims", title: "Ideas on the move", how: "Answer the questions about pilgrims and beliefs.", Sim: Pilgrims },
      discoveries: [
        { id: "pilgrims", text: "Fa Xian and Xuan Zang were Chinese Buddhist pilgrims" },
        { id: "nalanda", text: "Xuan Zang studied at Nalanda" },
        { id: "mahayana", text: "Mahayana Buddhism made images of the Buddha" },
        { id: "bhakti", text: "Bhakti is devotion to a chosen deity, open to all" },
      ],
      understand: [
        { title: "Spread of Buddhism", body: "Buddhism spread west, east and south — to Central Asia, China, Korea, Japan, Sri Lanka, Myanmar, Thailand and Indonesia.", tag: "source" },
        { title: "Theravada", body: "The older form of Buddhism, known as Theravada, was more popular in Sri Lanka and South-East Asia.", tag: "source" },
        { title: "Pilgrims' records", body: "The pilgrims wrote accounts of their journeys, which historians use as sources.", tag: "source" },
      ],
      check: [{ id: "hr3", kind: "mcq", q: "Which Chinese pilgrim came about 1400 years ago?", options: ["Xuan Zang", "Fa Xian", "Megasthenes"], answer: 0, why: "Fa Xian came about 1600 years ago; Xuan Zang about 1400." }],
      connect: [
        { icon: "🌍", title: "Elsewhere: Christianity", body: "About 2000 years ago, Jesus Christ was born in Bethlehem. Christian preachers came to the west coast of India." },
        { icon: "🏛", title: "Nalanda today", body: "The ruins of Nalanda are a World Heritage Site." },
        { icon: "🗿", title: "Buddha statues", body: "Mathura and Gandhara became famous for statues of the Buddha." },
      ],
    },
  ],
  learnt: [
    "Traders carried goods over land and sea — silk from China, pepper and gold from south India; Roman coins are found in south India.",
    "The Kushanas controlled parts of the Silk Route; the Satavahanas controlled routes to the south.",
    "The Cholas, Cheras and Pandyas (muvendar) were powerful in the south; Sangam poems describe them.",
    "Pilgrims like Fa Xian and Xuan Zang came to India; Mahayana Buddhism and bhakti developed.",
  ],
  keywords: ["Silk Route", "Muvendar", "Dakshinapatha", "Pilgrim", "Mahayana", "Bodhisattva", "Theravada", "Bhakti"],
};

export default chapter;
