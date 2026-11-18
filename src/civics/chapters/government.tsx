// Civics Chapter 3 · What is Government? (NCERT Social and Political Life – I, pp. 27–34).
// Wording is original; facts follow the textbook. The town is an original drawing.
import { useState } from "react";
import { ExploreLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";
import { Bldg, Figure } from "../kit";

/* Stop 1 · what does the government do? */
function TownArt() {
  return (
    <g>
      <rect width="520" height="320" fill="#bfe3ff" />
      <rect y="120" width="520" height="200" fill="#9ccf7a" />
      <rect y="200" width="520" height="30" fill="#6b6b78" />
      <path d="M0 215 H520" stroke="#fff" strokeWidth="2" strokeDasharray="14 10" />
      {/* railway */}
      <rect y="292" width="520" height="8" fill="#7a5a3a" />
      {Array.from({ length: 27 }, (_, i) => (
        <rect key={i} x={i * 20} y="288" width="4" height="16" fill="#5a3d22" />
      ))}
      <text x="440" y="292" fontSize="28">🚂</text>
      <Bldg x={20} y={140} w={70} h={50} color="#ffe08a" icon="🏫" label="School" />
      <Bldg x={110} y={140} w={70} h={50} color="#ffffff" icon="🏥" label="Health centre" roof="#d94848" />
      <Bldg x={200} y={130} w={90} h={60} color="#efe2c4" icon="⚖️" label="Court" roof="#6b5a3a" />
      <Bldg x={310} y={145} w={60} h={45} color="#ffc9a6" icon="📮" label="Post office" />
      <Bldg x={390} y={145} w={110} h={45} color="#f4b1c2" icon="🧅" label="Market" roof="#a8475a" />
      <Bldg x={30} y={240} w={60} h={34} color="#fff" icon="⛺" label="Relief camp" roof="#2f78b8" />
      {/* power line */}
      <g stroke="#3b3550" strokeWidth="3">
        <line x1="150" y1="240" x2="150" y2="282" />
        <line x1="138" y1="246" x2="162" y2="246" />
        <line x1="260" y1="240" x2="260" y2="282" />
        <line x1="248" y1="246" x2="272" y2="246" />
      </g>
      <path d="M138 246 Q205 262 248 246 M162 246 Q215 262 272 246" stroke="#3b3550" strokeWidth="1.5" fill="none" />
      {/* border post */}
      <rect x="470" y="40" width="40" height="70" fill="#7e8f5e" />
      <text x="490" y="84" fontSize="20" textAnchor="middle">🛡</text>
      <path d="M440 120 V30" stroke="#5a3d22" strokeWidth="3" strokeDasharray="6 4" />
      <text x="436" y="26" fontSize="10" fontWeight="900" fill="#2b2a30" textAnchor="end">
        Border
      </text>
      <text x="40" y="60" fontSize="26">☁️</text>
      <Figure x={330} y={228} shirt="#2f78b8" />
      <Figure x={355} y={228} shirt="#ff8a5b" long child />
    </g>
  );
}
function WhatGovDoes({ discover }: SimProps) {
  return (
    <ExploreLab
      viewBox="0 0 520 320"
      art={<TownArt />}
      intro="Look around the town. Tap each glowing dot to see what the government does there."
      spots={[
        { id: "road", label: "Roads", x: 300, y: 214, text: "The government decides where roads should be built." },
        { id: "school", label: "School", x: 55, y: 165, text: "It decides where to build schools and runs many of them." },
        { id: "health", label: "Health centre", x: 145, y: 165, text: "It is responsible for making sure citizens have enough to eat and good health facilities." },
        { id: "court", label: "Court", x: 245, y: 160, text: "If there is a dispute or a crime, people go to court. Courts are also part of the government — like the Supreme Court." },
        { id: "post", label: "Post office", x: 340, y: 168, text: "It runs postal services." },
        { id: "market", label: "Market", x: 445, y: 168, text: "When prices shoot up — say, onions become too expensive — the government decides how to bring them down." },
        { id: "power", label: "Power lines", x: 205, y: 256, text: "It finds ways to increase the supply of electricity." },
        { id: "rail", label: "Railway", x: 455, y: 282, text: "It runs railway services. The Indian Railways is part of the government." },
        { id: "relief", label: "Relief camp", x: 60, y: 256, text: "After natural disasters like a tsunami or an earthquake, the government mainly organises aid for the people affected." },
        { id: "border", label: "Border", x: 490, y: 60, text: "It protects the country's boundaries and keeps peaceful relations with other countries." },
      ]}
      groups={{ build: ["road", "school"], services: ["post", "rail", "power"], care: ["health", "market", "relief"], protect: ["border", "court"] }}
      discover={discover}
    />
  );
}

/* Stop 2 · levels of government */
function Levels({ discover }: SimProps) {
  const items = [
    { id: "well", label: "Deciding where to put a common well in a village", icon: "💧", bin: "local", why: "This is local: it affects one village." },
    { id: "road", label: "Repairing the road that links a village to the highway", icon: "🛣", bin: "local", why: "In Chapter 5, a village Panchayat plans just this kind of road repair." },
    { id: "light", label: "Replacing a broken street light in a city", icon: "💡", bin: "local", why: "In Chapter 7, the city's Municipal Corporation looks after street lights." },
    { id: "exam", label: "West Bengal deciding on Class 8 Board exams for its government schools", icon: "📝", bin: "state", why: "This covers a whole state." },
    { id: "power", label: "Haryana deciding to give free electricity to all farmers", icon: "⚡", bin: "state" },
    { id: "russia", label: "Keeping peaceful relations with Russia", icon: "🤝", bin: "central", why: "Relations with other countries are decided for the whole country." },
    { id: "train", label: "Two new trains between Dibrugarh and Kanyakumari", icon: "🚆", bin: "central" },
    { id: "note", label: "Introducing a new currency note", icon: "💵", bin: "central" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Which level of government would take each decision? Tap a card, then a level."
      bins={[
        { id: "local", label: "Local", icon: "🏘", color: "#5fe0a0" },
        { id: "state", label: "State", icon: "🗺", color: "#ffd257" },
        { id: "central", label: "Central", icon: "🏛", color: "#ff9bb0" },
      ]}
      items={items}
      rules={[
        { id: "local", when: (p) => all(p, "local") },
        { id: "state", when: (p) => all(p, "state") },
        { id: "central", when: (p) => all(p, "central") },
      ]}
    />
  );
}

/* Stop 3 · laws */
function LawPuzzles({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="The government makes laws that everyone in the country must follow. Solve these."
      cases={[
        { id: "licence", icon: "🛵", prompt: "The law says anyone driving a motor vehicle must have a licence. What can happen to someone caught driving without one?", options: ["They can be jailed or fined a large sum", "Nothing at all", "They get a free licence"], answer: 0, explain: "The government has the power to make decisions and also to enforce them. Without that, laws wouldn't be much use.", disc: "enforce" },
        { id: "court", icon: "⚖️", prompt: "Someone feels they were not hired for a job because of their religion or caste. What can they do?", options: ["Approach the court and say the law is not being followed", "Nothing — they must accept it", "Make their own law"], answer: 0, explain: "People can also take steps if they feel a law isn't being followed. The court can then give orders about what should be done.", disc: "court" },
        { id: "why", icon: "📏", prompt: "Why do governments make rules for everyone?", options: ["So decisions can be made and carried out for all the people living in the country", "So only rulers have rules", "To stop people from working"], answer: 0, explain: "When people live and work together, some organisation and rules are needed — for example, to control resources and protect the territory so people feel secure.", disc: "laws" },
      ]}
    />
  );
}

/* Stop 4 · who gives the government its power? */
function PowerDiagram({ discover }: SimProps) {
  const [type, setType] = useState<"demo" | "mon" | null>(null);
  const [asked, setAsked] = useState(false);
  function pick(t: "demo" | "mon") {
    setType(t);
    setAsked(false);
    discover(t === "demo" ? "democracy" : "monarchy");
  }
  return (
    <Stage
      caption={
        !type
          ? "Pick a type of government to see where its power comes from."
          : asked
            ? type === "demo"
              ? "In a democracy, the government has to explain its actions and defend its decisions to the people."
              : "Kings and queens do not have to explain their actions or defend their decisions."
            : type === "demo"
              ? "In a democracy, people give the government its power. They vote in elections, and the people elected form the government."
              : "In a monarchy, the king or queen has the power. There may be a small group to discuss matters with, but the final decision is the monarch's."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#1a1838" />
        {type === "demo" && (
          <g>
            {Array.from({ length: 9 }, (_, i) => (
              <Figure key={i} x={70 + i * 47} y={240} s={0.75} shirt={["#ff8a5b", "#5fe0a0", "#7fb8ff", "#ffd257", "#ff9bc8"][i % 5]} long={i % 2 === 1} />
            ))}
            <text x="260" y="168" fontSize="22" textAnchor="middle">🗳 🗳 🗳</text>
            <path d="M200 175 L240 120 M320 175 L280 120" stroke="#5fe0a0" strokeWidth="3" markerEnd="url(#cg-arr)" />
            <rect x="170" y="40" width="180" height="70" rx="14" fill="#2f78b8" />
            <text x="260" y="70" fontSize="15" fontWeight="900" fill="#fff" textAnchor="middle">
              Elected representatives
            </text>
            <text x="260" y="92" fontSize="12" fontWeight="800" fill="#cfe6ff" textAnchor="middle">
              form the government
            </text>
            {asked && <path d="M360 80 Q470 120 420 190" stroke="#ffd257" strokeWidth="3" strokeDasharray="6 5" fill="none" markerEnd="url(#cg-arr2)" />}
            {asked && (
              <text x="440" y="110" fontSize="11" fontWeight="900" fill="#ffd257">
                explains to people
              </text>
            )}
            <text x="30" y="160" fontSize="11" fontWeight="900" fill="#5fe0a0">
              people vote ↑
            </text>
          </g>
        )}
        {type === "mon" && (
          <g>
            <text x="260" y="90" fontSize="56" textAnchor="middle">👑</text>
            <text x="260" y="120" fontSize="13" fontWeight="900" fill="#ffd257" textAnchor="middle">
              Monarch decides
            </text>
            {[170, 350].map((x) => (
              <Figure key={x} x={x} y={130} s={0.7} shirt="#8e7bd6" />
            ))}
            <text x="260" y="150" fontSize="10" fontWeight="800" fill="#c9cbe0" textAnchor="middle">
              small group of advisers
            </text>
            <path d="M260 160 V185" stroke="#ff9b7a" strokeWidth="3" markerEnd="url(#cg-arr3)" />
            {Array.from({ length: 9 }, (_, i) => (
              <Figure key={i} x={70 + i * 47} y={240} s={0.75} shirt="#5d5a78" long={i % 2 === 1} />
            ))}
            {asked && (
              <text x="260" y="40" fontSize="13" fontWeight="900" fill="#ff9b7a" textAnchor="middle">
                No need to explain decisions to the people
              </text>
            )}
          </g>
        )}
        {!type && (
          <text x="260" y="135" fontSize="16" fontWeight="900" fill="#9da3c7" textAnchor="middle">
            Who gives the government its power?
          </text>
        )}
        <defs>
          <marker id="cg-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#5fe0a0" />
          </marker>
          <marker id="cg-arr2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#ffd257" />
          </marker>
          <marker id="cg-arr3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#ff9b7a" />
          </marker>
        </defs>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={type === "demo"} onClick={() => pick("demo")}>
          🗳 Democracy
        </Btn>
        <Btn on={type === "mon"} onClick={() => pick("mon")}>
          👑 Monarchy
        </Btn>
        {type && (
          <Btn
            on={asked}
            onClick={() => {
              setAsked(true);
              discover("explain");
            }}
          >
            ❓ Must they explain their decisions?
          </Btn>
        )}
      </div>
    </Stage>
  );
}

/* Stop 5 · who gets to vote? */
const CROWD = [
  { man: true, rich: true, edu: true },
  { man: false, rich: true, edu: true },
  { man: true, rich: false, edu: false },
  { man: false, rich: false, edu: false },
  { man: true, rich: false, edu: true },
  { man: false, rich: false, edu: true },
  { man: true, rich: true, edu: true },
  { man: false, rich: false, edu: false },
  { man: true, rich: false, edu: false },
  { man: false, rich: true, edu: false },
];
const ERAS = [
  { id: "early", label: "Earliest elections", can: (p: (typeof CROWD)[0]) => p.man && p.rich && p.edu, text: "In their earliest forms, governments let only men who owned property and were educated vote. Women, the poor and the uneducated could not. In India before Independence, too, only a small minority could vote." },
  { id: "fight", label: "The struggle", can: (p: (typeof CROWD)[0]) => p.man && p.rich && p.edu, text: "Nowhere have governments willingly shared power. Women and the poor had to fight to take part. Suffragettes chained themselves to railings and went on hunger strikes; American women won the vote in 1920, and women in the UK voted on the same terms as men in 1928. In India, Gandhiji and others demanded the vote for all adults." },
  { id: "uaf", label: "Universal adult franchise", can: () => true, text: "Universal adult franchise: all adults in the country can vote — rich or poor, women or men, educated or not. Today a government can't call itself democratic without it." },
];
function WhoVotes({ discover }: SimProps) {
  const [era, setEra] = useState(0);
  const e = ERAS[era];
  const n = CROWD.filter(e.can).length;
  function go(k: number) {
    setEra(k);
    discover(["few", "suffrage", "uaf"][k]);
  }
  return (
    <Stage caption={e.text}>
      <svg viewBox="0 0 520 210" className="block h-auto w-full select-none">
        <rect width="520" height="210" fill="#1a1838" />
        <rect x="200" y="20" width="120" height="44" rx="10" fill="#2f78b8" />
        <text x="260" y="48" fontSize="18" fontWeight="900" fill="#fff" textAnchor="middle">
          🗳 {n} of {CROWD.length} vote
        </text>
        {CROWD.map((p, i) => {
          const ok = e.can(p);
          const x = 40 + i * 49;
          return (
            <g key={i} opacity={ok ? 1 : 0.35}>
              <Figure x={x} y={180} s={0.85} shirt={p.rich ? "#ffd257" : "#a58a6a"} long={!p.man} />
              {ok && (
                <text x={x} y={110} fontSize="16" textAnchor="middle">
                  ☝️
                </text>
              )}
              {era === 1 && !ok && i % 3 === 0 && (
                <g>
                  <rect x={x - 20} y="88" width="40" height="18" rx="3" fill="#fff" />
                  <text x={x} y="101" fontSize="8" fontWeight="900" fill="#a8475a" textAnchor="middle">
                    VOTES!
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <text x="510" y="80" fontSize="13" fontWeight="800" fill="#c9cbe0" textAnchor="end">
          Yellow shirt = owns property
        </text>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {ERAS.map((x, k) => (
          <Btn key={x.id} on={era === k} onClick={() => go(k)}>
            {k + 1}. {x.label}
          </Btn>
        ))}
      </div>
    </Stage>
  );
}

const chapter: Chapter = {
  id: "cgovt",
  subject: "Civics",
  n: 3,
  title: "What is Government?",
  pages: "27–34",
  icon: "🏛",
  theme: { grad: "linear-gradient(135deg,#0c2341 0%,#1f5f9e 55%,#ffcf5a 130%)", accent: "#1f5f9e", soft: "#e3eefb", ink: "#123a66" },
  opening: "Building roads, bringing down onion prices, running trains, helping after an earthquake — who does all this, and how?",
  stops: [
    {
      id: "does",
      icon: "🏙",
      title: "What does it do?",
      pages: "27–28",
      wonder: {
        q: "Which of these is the government's work?",
        options: [
          { id: "all", label: "Roads, railways, post, courts and disaster relief" },
          { id: "roads", label: "Only roads" },
          { id: "none", label: "None of these" },
        ],
        answer: "all",
        reveal: "All of them! Every country needs a government to make decisions and get things done.",
      },
      explore: { activity: "Newspaper headlines", title: "Government around town", how: "Explore the town and find the government at work.", Sim: WhatGovDoes },
      discoveries: [
        { id: "build", text: "It decides where to build roads and schools" },
        { id: "services", text: "It runs services like post, railways and electricity" },
        { id: "care", text: "It looks after health, food prices and disaster relief" },
        { id: "protect", text: "It protects borders, and courts settle disputes" },
      ],
      understand: [
        { title: "Why a government?", body: "When people live and work together, they need organisation so decisions can be made and rules apply to everyone." },
        { title: "On our behalf", body: "Governments lead, take decisions and carry them out for all the people living in their territory." },
        { title: "Part of the government", body: "The Supreme Court, the Indian Railways and Bharat Petroleum are examples of institutions that are part of the government." },
      ],
      check: [{ id: "cg1", kind: "tf", q: "Courts are also a part of the government.", answer: true, why: "People go to court for disputes or crimes; courts are part of the government." }],
      connect: [
        { icon: "📰", title: "Headlines", body: "Find three newspaper headlines about something the government is doing." },
        { icon: "🏠", title: "In your day", body: "List five ways the government affects your daily life." },
        { icon: "🌊", title: "In a disaster", body: "Who helped people after a flood or earthquake you have heard about?" },
      ],
    },
    {
      id: "levels",
      icon: "🗺",
      title: "Three levels",
      pages: "28–30, 34",
      wonder: {
        q: "The main road in your town is badly damaged. Who should help fix it?",
        options: [
          { id: "depends", label: "It depends — different levels of government look after different things" },
          { id: "pm", label: "Always the national government" },
          { id: "nobody", label: "Nobody — roads fix themselves" },
        ],
        answer: "depends",
        reveal: "Government works at the local, state and national levels. A village road, for example, is the kind of work a Gram Panchayat does (Chapter 5).",
      },
      explore: { activity: "Local, state or central?", title: "Sort the decisions", how: "Decide which level each decision belongs to.", Sim: Levels },
      discoveries: [
        { id: "local", text: "Local: your village, town or locality" },
        { id: "state", text: "State: a whole state, like Haryana or Assam" },
        { id: "central", text: "Central (national): the entire country" },
      ],
      understand: [
        { title: "Three levels", body: "Local level means your village, town or locality. State level covers a whole state. National level covers the entire country." },
        { title: "Coming up", body: "Later in this book you'll see how local government works. In higher classes, you'll learn about state and central government." },
      ],
      check: [{ id: "cg2", kind: "mcq", q: "Keeping peaceful relations with other countries is the work of the…", options: ["Central government", "Gram Panchayat", "Municipal Council"], answer: 0, why: "Relations with other countries are decided for the whole nation." }],
      connect: [
        { icon: "🗺", title: "Your map", body: "Name your state or union territory, your district, and their neighbours." },
        { icon: "🚌", title: "To the capital", body: "Find a route from your district to New Delhi." },
        { icon: "🏘", title: "Local work", body: "Find one thing near you that local government looks after." },
      ],
    },
    {
      id: "laws",
      icon: "📏",
      title: "Laws",
      pages: "31",
      wonder: {
        q: "If the government makes a decision but has no way to make people follow it, what happens?",
        options: [
          { id: "useless", label: "The decision isn't of much use" },
          { id: "fine", label: "Everyone follows it anyway" },
        ],
        answer: "useless",
        reveal: "The government has the power to make decisions — and also to enforce them, through laws everyone has to follow.",
      },
      explore: { activity: "Laws and the government", title: "Law puzzles", how: "See how laws are made, enforced and protected.", Sim: LawPuzzles },
      discoveries: [
        { id: "laws", text: "Laws apply to everyone living in the country" },
        { id: "enforce", text: "The government can enforce its laws" },
        { id: "court", text: "People can go to court if a law isn't followed" },
      ],
      understand: [
        { title: "Laws", body: "The government makes laws, and everyone who lives in the country must follow them. This is how governments function." },
        { title: "People's power", body: "If someone feels a law isn't being followed, they can approach the court, which can give orders about what should be done." },
      ],
      check: [{ id: "cg3", kind: "mcq", q: "Driving a motor vehicle without a licence can lead to…", options: ["A jail term or a large fine", "A prize", "Nothing"], answer: 0, why: "The government enforces this law." }],
      connect: [
        { icon: "🚦", title: "Another law", body: "Think of another law. Why is it important that people follow it?" },
        { icon: "🏫", title: "School rules", body: "Which rules at school apply to everyone? Who makes sure they are followed?" },
        { icon: "🪖", title: "Helmets", body: "Why might there be a law about wearing helmets?" },
      ],
    },
    {
      id: "types",
      icon: "👑",
      title: "Democracy or monarchy?",
      pages: "31–32",
      wonder: {
        q: "Who gives the government its power to make decisions?",
        options: [
          { id: "type", label: "It depends on the type of government" },
          { id: "army", label: "Always the army" },
        ],
        answer: "type",
        reveal: "In a democracy, the people. In a monarchy, the king or queen holds the power.",
      },
      explore: { activity: "Types of government", title: "Follow the power", how: "Switch between democracy and monarchy. Then ask who must explain their decisions.", Sim: PowerDiagram },
      discoveries: [
        { id: "democracy", text: "In a democracy, people give power to the government through elections" },
        { id: "monarchy", text: "In a monarchy, the king or queen holds the power" },
        { id: "explain", text: "A democratic government must explain and defend its decisions to people" },
      ],
      understand: [
        { title: "Rule by the people", body: "India is a democracy — the result of a long struggle by the Indian people. Democracy is, in a sense, rule by the people." },
        { title: "Representative democracy", body: "People don't take part directly. They choose representatives through elections, who make decisions for the whole population." },
      ],
      check: [
        { id: "cg4", kind: "tf", q: "In a monarchy, citizens can elect whomever they want.", answer: false, why: "That's a democracy. In a monarchy, the monarch decides." },
        { id: "cg5", kind: "tf", q: "In a democracy, a king has absolute powers.", answer: false, why: "In a democracy, people elect the government, which must explain its decisions." },
      ],
      connect: [
        { icon: "🙋", title: "Your say", body: "Why is it important for people to be involved in decisions that affect them?" },
        { icon: "🏫", title: "Class monitor", body: "How is your class monitor chosen? Is it more like a democracy or a monarchy?" },
        { icon: "🌍", title: "Around the world", body: "People in many places have struggled to have democracies." },
      ],
    },
    {
      id: "vote",
      icon: "☝️",
      title: "Who gets to vote?",
      pages: "32–33",
      wonder: {
        q: "Have all adults always been allowed to vote?",
        options: [
          { id: "no", label: "No — many people had to fight for it" },
          { id: "yes", label: "Yes, always" },
        ],
        answer: "no",
        reveal: "No! At first only a few men could vote. Women and the poor had to struggle for the right.",
      },
      explore: { activity: "Universal adult franchise", title: "Who can vote?", how: "Step through the eras and watch who gets to vote.", Sim: WhoVotes },
      discoveries: [
        { id: "few", text: "At first, only educated men with property could vote" },
        { id: "suffrage", text: "Women and the poor fought for the right to vote" },
        { id: "uaf", text: "Universal adult franchise: every adult can vote" },
      ],
      understand: [
        { title: "Suffrage", body: "Suffrage means the right to vote. During the First World War, women did work once called “men's work”, and people began to see them as equally capable of making decisions." },
        { title: "Gandhiji's view", body: "Writing in Young India in 1931, Gandhiji said he could not accept that wealth should decide who gets to vote, while honest, hard-working poor people could not." },
        { title: "One vote each", body: "When people vote, a mark is put on the finger so that each person votes only once." },
      ],
      check: [{ id: "cg6", kind: "mcq", q: "Universal adult franchise means…", options: ["All adults in the country can vote", "Only property owners vote", "Only educated people vote"], answer: 0, why: "Every adult, whatever their wealth, education or gender, has the vote." }],
      connect: [
        { icon: "👵", title: "Ask an elder", body: "Ask an elder at home what it felt like to vote for the first time." },
        { icon: "🤔", title: "Discuss", body: "Some people feel illiterate people shouldn't vote. Would that be a form of discrimination? Why?" },
        { icon: "☝️", title: "The ink mark", body: "Look for the ink mark on an adult's finger after an election." },
      ],
    },
  ],
  learnt: [
    "A government makes decisions and gets things done for the whole country — from roads to disaster relief.",
    "Government works at three levels: local, state and national.",
    "The government makes laws that everyone must follow, and has the power to enforce them.",
    "In a democracy, people give power to the government through elections; in a monarchy, the monarch holds power.",
    "Universal adult franchise means all adults can vote — a right won through long struggles.",
  ],
  keywords: ["Government", "Local, state and national levels", "Law", "Democracy", "Monarchy", "Representative democracy", "Suffrage", "Universal adult franchise"],
};

export default chapter;
