// History Chapter 7 · New Questions and Ideas (NCERT Our Pasts – I, 2018-19, pp. 65–74).
// Wording is original; facts follow the textbook.
import { OrderLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function BuddhaLife({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="Put the events of the Buddha's life in order."
      steps={[
        { id: "born", label: "Born into the Sakya gana", icon: "👶", detail: "Siddhartha, also known as Gautama, was born about 2500 years ago. He belonged to the Sakya gana and was a kshatriya." },
        { id: "left", label: "Leaves home to seek knowledge", icon: "🚶", detail: "As a young man he left the comforts of his home in search of knowledge, wandering for several years and holding discussions with other thinkers." },
        { id: "bodh", label: "Enlightenment at Bodh Gaya", icon: "🌳", detail: "He decided to find his own path, and meditated for days under a peepal tree at Bodh Gaya in Bihar, where he attained enlightenment. He was then known as the Buddha, the Wise One." },
        { id: "sarnath", label: "First teaching at Sarnath", icon: "🗣", detail: "He went to Sarnath, near Varanasi, where he taught for the first time." },
        { id: "travel", label: "Teaches for the rest of his life", icon: "👣", detail: "He spent the rest of his life travelling on foot, teaching people, until he passed away at Kusinara." },
      ]}
      milestones={[
        { id: "enlight", at: 3 },
        { id: "sarnath", at: 4 },
        { id: "life", at: 5 },
      ]}
    />
  );
}

function Teachings({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="What did the Buddha teach? Choose the best answer."
      cases={[
        { id: "tanha", icon: "💭", prompt: "According to the Buddha, what causes suffering and unhappiness?", options: ["Constant cravings and wishes (tanha)", "Bad weather", "Not having servants"], answer: 0, explain: "Life is full of suffering and unhappiness, caused by cravings and desires that are never fully satisfied. He called this thirst 'tanha'.", disc: "tanha" },
        { id: "moderation", icon: "⚖️", prompt: "How did he say people could overcome this?", options: ["By following moderation in everything", "By eating as much as possible", "By never speaking"], answer: 0, explain: "He taught that this endless craving could be removed by following moderation in everything.", disc: "moderation" },
        { id: "karma", icon: "🔁", prompt: "What did he say about our actions?", options: ["The results of our actions (karma), good or bad, affect us in this life and the next", "Actions don't matter", "Only kings' actions matter"], answer: 0, explain: "He taught people to be kind and to respect the lives of others, including animals, because the results of our actions (karma) affect us.", disc: "karma" },
        { id: "prakrit", icon: "🗣", prompt: "In which language did he teach?", options: ["Prakrit, the language of ordinary people", "Only Sanskrit", "Greek"], answer: 0, explain: "He taught in Prakrit so that everybody could understand his message. He also encouraged people to think for themselves rather than simply accept what he said.", disc: "prakrit" },
      ]}
    />
  );
}

function Thinkers({ discover }: SimProps) {
  const items = [
    { id: "peepal", label: "Meditated under a peepal tree", bin: "buddha" },
    { id: "sarnath", label: "First taught at Sarnath", bin: "buddha" },
    { id: "vardhamana", label: "Vardhamana, a Lichchhavi prince", bin: "jina", why: "Vardhamana Mahavira belonged to the Lichchhavis, part of the Vajji sangha." },
    { id: "ahimsa", label: "Never harm any living being — even insects", bin: "jina", why: "Jainas followed very strict rules of ahimsa: not hurting or killing living beings." },
    { id: "atman", label: "Atman and brahman", bin: "upa", why: "Upanishadic thinkers believed the individual soul (atman) and the universal soul (brahman) were ultimately one." },
    { id: "dialogue", label: "Dialogues between teachers and students", bin: "upa", why: "Many ideas in the Upanishads were developed through dialogues between teachers and students." },
  ];
  const both = (p: Record<string, string>, a: string, b: string) => !!p[a] && !!p[b];
  return (
    <SortLab
      discover={discover}
      intro="Three great traditions of new ideas, about 2500 years ago. Sort each clue."
      bins={[
        { id: "buddha", label: "The Buddha", color: "#ffd257" },
        { id: "jina", label: "Mahavira (Jaina)", color: "#5fe0a0" },
        { id: "upa", label: "Upanishads", color: "#8fb3ff" },
      ]}
      items={items}
      rules={[
        { id: "buddha", when: (p) => both(p, "peepal", "sarnath") },
        { id: "jina", when: (p) => both(p, "vardhamana", "ahimsa") },
        { id: "upa", when: (p) => both(p, "atman", "dialogue") },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hideas",
  subject: "History",
  n: 7,
  title: "New Questions and Ideas",
  pages: "65–74",
  icon: "🧘",
  theme: { grad: "linear-gradient(135deg,#2a1a05 0%,#b9781c 55%,#f2d38a 125%)", accent: "#a66a12", soft: "#fbefd6", ink: "#6b4206" },
  opening: "Anagha is going on a school trip to Varanasi. Her mother says: tell the children about the Buddha, and take them to Sarnath. Who was the Buddha, and what new ideas did people have 2500 years ago?",
  stops: [
    {
      id: "buddha",
      icon: "🌳",
      title: "The story of the Buddha",
      pages: "65–67",
      wonder: {
        q: "Siddhartha was a prince. Why did he leave the comforts of his home?",
        options: [
          { id: "knowledge", label: "In search of knowledge and the meaning of life" },
          { id: "war", label: "To fight a war" },
          { id: "trade", label: "To become a trader" },
        ],
        answer: "knowledge",
        reveal: "In search of knowledge. It was a time of rapid change, and many thinkers were trying to understand the true meaning of life.",
      },
      explore: { activity: "The story of the Buddha", title: "A life in five steps", how: "Arrange the events of the Buddha's life.", Sim: BuddhaLife },
      discoveries: [
        { id: "enlight", text: "He attained enlightenment under a peepal tree at Bodh Gaya" },
        { id: "sarnath", text: "He first taught at Sarnath, near Varanasi" },
        { id: "life", text: "He taught, travelling on foot, until he passed away at Kusinara" },
      ],
      understand: [
        { title: "A time of change", body: "Kings in the mahajanapadas were growing more powerful, cities were developing, and life in villages was changing. Thinkers questioned the meaning of life.", tag: "think" },
        { title: "The Wise One", body: "After enlightenment, Siddhartha became known as the Buddha, or the Wise One.", tag: "source" },
      ],
      check: [{ id: "hi1", kind: "mcq", q: "Where did the Buddha attain enlightenment?", options: ["Bodh Gaya", "Sarnath", "Kusinara"], answer: 0, why: "Under a peepal tree at Bodh Gaya in Bihar." }],
      connect: [
        { icon: "🦁", title: "Sarnath today", body: "The lion capital found at Sarnath is our national emblem." },
        { icon: "🌳", title: "Mahabodhi", body: "The temple at Bodh Gaya is a World Heritage Site." },
        { icon: "🚆", title: "Anagha's trip", body: "Plan a trip to Sarnath on a map." },
      ],
    },
    {
      id: "teach",
      icon: "💭",
      title: "What the Buddha taught",
      pages: "67–68",
      wonder: {
        q: "A woman named Kisagotami came to the Buddha, grieving for her son. He asked her to bring mustard seeds from a house where no one had died. What did she learn?",
        options: [
          { id: "death", label: "That death comes to every family" },
          { id: "seeds", label: "That mustard seeds cure sadness" },
          { id: "nothing", label: "Nothing" },
        ],
        answer: "death",
        reveal: "She could not find such a house. She understood that death comes to everyone — the story, told in Buddhist texts, teaches about suffering.",
      },
      explore: { activity: "The Buddha's teachings", title: "Big ideas", how: "Choose the best answer about each teaching.", Sim: Teachings },
      discoveries: [
        { id: "tanha", text: "Constant cravings (tanha) cause suffering" },
        { id: "moderation", text: "Moderation in everything ends the craving" },
        { id: "karma", text: "The results of our actions (karma) matter" },
        { id: "prakrit", text: "He taught in Prakrit, so everyone could understand" },
      ],
      understand: [
        { title: "Kindness", body: "He taught people to be kind and to respect the lives of others, including animals.", tag: "source" },
        { title: "Think for yourself", body: "He encouraged people to think for themselves rather than simply accept what he said.", tag: "source" },
      ],
      check: [{ id: "hi2", kind: "mcq", q: "The Buddha's word for constant craving is…", options: ["Tanha", "Sangha", "Ahimsa"], answer: 0, why: "Tanha means 'thirst' — never-ending desire." }],
      connect: [
        { icon: "🙏", title: "Kindness today", body: "Which of the Buddha's teachings are important even today?" },
        { icon: "🌱", title: "Respect for animals", body: "Many people today choose not to harm animals." },
        { icon: "⚖️", title: "Moderation", body: "Too much of anything — even screen time! — can make us unhappy." },
      ],
    },
    {
      id: "thinkers",
      icon: "🕉",
      title: "Upanishads, Mahavira and the sangha",
      pages: "68–73",
      wonder: {
        q: "Jaina teachings say: never harm any living being. How strict were the Jainas about this?",
        options: [
          { id: "strict", label: "Very strict — they tried not to harm even insects" },
          { id: "loose", label: "It only applied to big animals" },
          { id: "none", label: "They didn't care" },
        ],
        answer: "strict",
        reveal: "Very strict. Followers of Mahavira tried not to hurt or kill any living being, even insects. Farmers found this hard, since they had to kill insects to protect crops — Jainism was supported mainly by traders.",
      },
      explore: { activity: "Upanishads, Jainism and the sangha", title: "Three traditions", how: "Sort each clue into the right tradition.", Sim: Thinkers },
      discoveries: [
        { id: "buddha", text: "The Buddha's path began at Bodh Gaya and Sarnath" },
        { id: "jina", text: "Mahavira taught strict ahimsa" },
        { id: "upa", text: "Upanishadic thinkers spoke of atman and brahman" },
      ],
      understand: [
        { title: "Upanishads", body: "Thinkers wanted to know about life after death and why sacrifices should be performed. They believed there was something permanent in the universe, the atman, one with brahman. Most were men, especially brahmins and rajas; a few women, like Gargi, took part in debates.", tag: "source" },
        { title: "Mahavira", body: "Vardhamana Mahavira, a Lichchhavi prince, left home at 30 and lived in a forest for 12 years. He taught in Prakrit that people who wished to know the truth must leave their homes and follow ahimsa.", tag: "source" },
        { title: "The sangha", body: "Both the Buddha and Mahavira felt only those who left home could gain true knowledge. They arranged for them to stay together in the sangha. Monks and nuns lived simple lives, meditated, and begged for food.", tag: "source" },
        { title: "Viharas", body: "Over time, monasteries (viharas) were built for monks and nuns — at first of wood, later of brick, and some in caves in hills in western India.", tag: "found" },
      ],
      check: [{ id: "hi3", kind: "mcq", q: "The Jaina teachings were written down about…", options: ["1500 years ago", "50 years ago", "5000 years ago"], answer: 0, why: "They were written down at Valabhi in Gujarat about 1500 years ago." }],
      connect: [
        { icon: "🏔", title: "Karle caves", body: "Buddhist caves in western India were homes for monks." },
        { icon: "🌍", title: "Elsewhere: Zoroaster", body: "In Iran, the prophet Zoroaster taught 'good thoughts, good words and good deeds'." },
        { icon: "🙏", title: "Ashramas", body: "Brahmins later developed the system of four stages of life — ashramas." },
      ],
    },
  ],
  learnt: [
    "The Buddha, born about 2500 years ago in the Sakya gana, attained enlightenment at Bodh Gaya and first taught at Sarnath.",
    "He taught that cravings cause suffering, that moderation helps, and that our actions matter. He taught in Prakrit.",
    "Upanishadic thinkers spoke of atman and brahman.",
    "Mahavira taught strict ahimsa. Monks and nuns lived in sanghas and later in viharas.",
  ],
  keywords: ["Tanha", "Prakrit", "Upanishads", "Atman", "Brahman", "Jaina", "Ahimsa", "Sangha", "Vihara", "Ashrama"],
};

export default chapter;
