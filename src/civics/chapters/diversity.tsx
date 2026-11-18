// Civics Chapter 1 · Understanding Diversity (NCERT Social and Political Life – I, pp. 3–12).
// Wording is original; facts follow the textbook. Pictures are original drawings.
import { useState } from "react";
import { PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";
import { proj, SketchMap } from "../../history/map";
import { Figure } from "../kit";

/* Stop 1 · two friends: which differences are diversity, and which are inequality? */
function TwoSamirs({ discover }: SimProps) {
  const items = [
    { id: "lang", label: "One is more at home in English, the other in Hindi", icon: "🗣", bin: "div", why: "Speaking different languages is part of diversity — and the two friends still found a way to talk." },
    { id: "faith", label: "One is Hindu, the other is Muslim", icon: "🙏", bin: "div" },
    { id: "fest", label: "They celebrate different festivals", icon: "🪔", bin: "div" },
    { id: "draw", label: "Everyone draws a person in their own style", icon: "✏️", bin: "div" },
    { id: "school", label: "One goes to school; the other never got the chance and sells newspapers", icon: "📰", bin: "ineq", why: "This is not just a difference. One boy does not have the opportunity the other has — that is inequality." },
    { id: "food", label: "Some families don't have enough to eat or a place to live", icon: "🍚", bin: "ineq" },
    { id: "caste", label: "Under the caste system, a potter's child could only become a potter", icon: "🏺", bin: "ineq", why: "People were kept in fixed groups and could not change their work. This created inequality." },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Samir Ek and Samir Do became friends at a busy traffic light. Is each difference below diversity, or inequality? Tap a card, then a box."
      bins={[
        { id: "div", label: "Diversity", icon: "🌈", color: "#5fe0a0" },
        { id: "ineq", label: "Inequality", icon: "⚖️", color: "#ff9b7a" },
      ]}
      items={items}
      rules={[
        { id: "diversity", when: (p) => all(p, "div") },
        { id: "inequality", when: (p) => all(p, "ineq") },
      ]}
    />
  );
}

/* Stop 2 · Ladakh and Kerala: geography and history shape a region */
type Lens = "land" | "food" | "work" | "trade" | "culture";
const LENSES: { id: Lens; icon: string; label: string }[] = [
  { id: "land", icon: "🏔", label: "Land & climate" },
  { id: "food", icon: "🍚", label: "Food" },
  { id: "work", icon: "🧶", label: "Work" },
  { id: "trade", icon: "⛵", label: "Traders" },
  { id: "culture", icon: "🎶", label: "Faith & culture" },
];
const REGIONS = {
  ladakh: {
    name: "Ladakh",
    lon: 77.6,
    lat: 34.2,
    text: {
      land: "A desert in the mountains. It gets almost no rain, is under snow for much of the year, and very few trees grow. Drinking water comes from snow melting in summer.",
      food: "People eat meat and milk products like cheese and butter. Each family owns some goats, cows and dzos (yak-cows).",
      work: "People keep sheep and goats. The goats give prized pashmina wool, which is sold to traders from Kashmir, where pashmina shawls are mainly woven.",
      trade: "Its many mountain passes made it a good trade route. Caravans carried textiles, spices, raw silk and carpets towards what is today Tibet.",
      culture: "Buddhism reached Tibet via Ladakh, which is also called Little Tibet. Islam came more than 400 years ago. Muslims and Buddhists both sing local versions of the Kesar Saga.",
    } as Record<Lens, string>,
  },
  kerala: {
    name: "Kerala",
    lon: 76.4,
    lat: 10.2,
    text: {
      land: "In the south-west corner of India, with the sea on one side and hills on the other. The fertile land and climate suit rice.",
      food: "Most people here eat rice, fish and vegetables.",
      work: "Pepper, cloves and cardamom grow on the hills. Fishers use nets called cheena-vala, which look just like Chinese fishing nets.",
      trade: "Spices drew traders here — Jewish and Arab traders came first. Ibn Battuta wrote about the Muslims here, and Vasco da Gama landed here when the Portuguese found the sea route from Europe.",
      culture: "St Thomas is believed to have brought Christianity nearly 2000 years ago. People here follow Judaism, Islam, Christianity, Hinduism and Buddhism. The boat race is a big part of Onam.",
    } as Record<Lens, string>,
  },
};
type RegionId = keyof typeof REGIONS;

function LadakhScene({ lens }: { lens: Lens }) {
  return (
    <g>
      <rect width="520" height="230" fill="#cfe6f7" />
      <path d="M0 170 L70 70 L120 120 L200 40 L270 130 L330 60 L410 140 L470 80 L520 130 L520 230 L0 230 Z" fill="#a58a6a" />
      <path d="M50 98 L70 70 L88 92 Z M182 64 L200 40 L218 62 Z M315 80 L330 60 L346 82 Z M456 98 L470 80 L484 98 Z" fill="#fff" />
      <rect y="170" width="520" height="60" fill="#c8a97c" />
      <text x="330" y="205" fontSize="26">🐐</text>
      <text x="380" y="212" fontSize="22">🐑</text>
      <text x="430" y="206" fontSize="26">🐐</text>
      {lens === "trade" && <text x="150" y="196" fontSize="28">🐫🐫</text>}
      {lens === "work" && <Figure x={250} y={212} shirt="#8e3b5b" skin="#d9a27a" long />}
      {lens === "culture" && <text x="90" y="160" fontSize="30">🏯</text>}
      {lens === "food" && <text x="240" y="208" fontSize="28">🧀🥛</text>}
      {lens === "land" && <text x="250" y="110" fontSize="26">❄️</text>}
    </g>
  );
}
function KeralaScene({ lens }: { lens: Lens }) {
  return (
    <g>
      <rect width="520" height="230" fill="#bfe6ff" />
      <path d="M300 230 L330 110 Q380 70 430 100 Q480 70 520 90 L520 230 Z" fill="#3e9b57" />
      <rect y="150" width="300" height="80" fill="#2f89c9" />
      <path d="M0 150 Q75 140 150 150 T300 150" stroke="#9fd6ff" strokeWidth="3" fill="none" />
      <text x="300" y="168" fontSize="34">🌴</text>
      <text x="345" y="150" fontSize="28">🌴</text>
      {/* cheena-vala: a lift net on poles */}
      <g stroke="#5a3d22" strokeWidth="3" fill="none">
        <path d="M80 165 L130 95 L180 165" />
        <path d="M95 140 Q130 175 165 140" stroke="#e8e0cf" strokeWidth="1.5" />
      </g>
      {lens === "trade" && <text x="200" y="185" fontSize="30">⛵</text>}
      {lens === "work" && <text x="420" y="140" fontSize="24">🌶</text>}
      {lens === "culture" && <text x="30" y="205" fontSize="28">🛶</text>}
      {lens === "food" && <text x="400" y="200" fontSize="26">🍚🐟</text>}
      {lens === "land" && <text x="430" y="70" fontSize="26">🌧</text>}
    </g>
  );
}

function TwoRegions({ discover }: SimProps) {
  const [region, setRegion] = useState<RegionId>("ladakh");
  const [lens, setLens] = useState<Lens>("land");
  const [seen, setSeen] = useState<string[]>(["ladakh:land"]);
  const [shared, setShared] = useState(false);

  function look(r: RegionId, l: Lens) {
    setRegion(r);
    setLens(l);
    setShared(false);
    const s = [...new Set([...seen, `${r}:${l}`])];
    setSeen(s);
    const both = (x: Lens) => s.includes(`ladakh:${x}`) && s.includes(`kerala:${x}`);
    if (both("land")) discover("geography");
    if (both("food") && both("work")) discover("livelihood");
    if (both("trade") && both("culture")) discover("history");
  }
  const r = REGIONS[region];

  return (
    <Stage
      caption={
        shared ? (
          <span>
            <b className="text-[#ffd257]">What they share:</b> both regions were influenced by Chinese and Arab traders. Kerala's spices and Ladakh's wool drew traders — so history and geography are tied together in the life of a region.
          </span>
        ) : (
          <span>
            <b className="text-[#ffd257]">
              {r.name} · {LENSES.find((x) => x.id === lens)!.label}:
            </b>{" "}
            {r.text[lens]}
          </span>
        )
      }
    >
      <svg viewBox="0 0 520 230" className="block h-auto w-full select-none">
        {region === "ladakh" ? <LadakhScene lens={lens} /> : <KeralaScene lens={lens} />}
        {/* locator map */}
        <g transform="translate(8 8) scale(.27)">
          <rect width="520" height="440" rx="30" fill="#173b5c" />
          <SketchMap rivers={false} />
          {(Object.keys(REGIONS) as RegionId[]).map((k) => {
            const p = proj(REGIONS[k].lon, REGIONS[k].lat);
            return <circle key={k} cx={p.x} cy={p.y} r={k === region ? 22 : 14} fill={k === region ? "#ffd257" : "#ff8a5b"} stroke="#13112b" strokeWidth="5" />;
          })}
        </g>
        <text x="512" y="22" fontSize="13" fontWeight="900" fill="#13112b" textAnchor="end">
          {r.name}
        </text>
      </svg>
      <div className="grid grid-cols-2 gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={region === "ladakh"} onClick={() => look("ladakh", lens)}>
          🏔 Ladakh
        </Btn>
        <Btn on={region === "kerala"} onClick={() => look("kerala", lens)}>
          🌴 Kerala
        </Btn>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3">
        {LENSES.map((l) => (
          <Btn key={l.id} on={lens === l.id && !shared} onClick={() => look(region, l.id)}>
            {l.icon} {l.label}
            {seen.includes(`ladakh:${l.id}`) && seen.includes(`kerala:${l.id}`) ? " ✓" : ""}
          </Btn>
        ))}
        <Btn
          on={shared}
          onClick={() => {
            setShared(true);
            discover("shared");
          }}
        >
          🤝 What do they share?
        </Btn>
      </div>
    </Stage>
  );
}

/* Stop 3 · many ways of doing the same things, and unity in diversity */
function UnityPuzzles({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="We do many similar things, just in different ways. And our differences have often brought us together."
      cases={[
        { id: "greet", icon: "👋", prompt: "In Jharkhand, many adivasis greet each other by saying…", options: ["“Johar”", "“Phanek”", "“Cheena-vala”"], answer: 0, explain: "Johar! People greet, dress, pray, marry and cook rice in many different ways — we do similar things differently.", disc: "ways" },
        { id: "dress", icon: "🥻", prompt: "In Manipur, many women wear a…", options: ["Phanek", "Pashmina net", "Dzo"], answer: 0, explain: "A phanek. Other ways of dressing, praying or cooking rice (like biryani) show the same idea — similar things, different ways.", disc: "ways" },
        { id: "british", icon: "✊", prompt: "During British rule, the British thought they could keep ruling because…", options: ["They could divide Indians, who were so different", "Indians all had the same culture", "Nobody opposed them"], answer: 0, explain: "But people of different religions, regions and backgrounds worked together, went to jail together and opposed the British — different, yet united.", disc: "freedom" },
        { id: "nehru", icon: "📖", prompt: "Who described India with the phrase “unity in diversity”?", options: ["Jawaharlal Nehru", "Ibn Battuta", "Vasco da Gama"], answer: 0, explain: "Nehru coined the phrase. In The Discovery of India he wrote that Indian unity was not imposed from outside, but came from tolerance of many beliefs and customs.", disc: "nehru" },
        { id: "song", icon: "🌹", prompt: "The song sung after the Jallianwala Bagh massacre honours people who…", options: ["Gathered together — Hindus, Sikhs and Muslims, rich and poor — to protest", "Belonged to just one community", "Supported the British general"], answer: 0, explain: "In Amritsar a British general fired on a large, peaceful, unarmed crowd. The song remembers how people of all backgrounds stood together.", disc: "symbols" },
        { id: "anthem", icon: "🎵", prompt: "India's national anthem — another expression of India's unity — was composed by…", options: ["Rabindranath Tagore", "Jawaharlal Nehru", "St Thomas"], answer: 0, explain: "Rabindranath Tagore. Songs and symbols from the freedom struggle, like the flag, remind us of our tradition of respecting diversity.", disc: "symbols" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "cdiversity",
  subject: "Civics",
  n: 1,
  title: "Understanding Diversity",
  pages: "3–12",
  icon: "🌈",
  theme: { grad: "linear-gradient(135deg,#2b1144 0%,#a23e7a 55%,#ffb44d 130%)", accent: "#a23e7a", soft: "#f8e6f0", ink: "#5c1d44" },
  opening: "Look around your classroom. Is there anyone who looks exactly like you, speaks exactly like you and draws exactly like you?",
  stops: [
    {
      id: "samirs",
      icon: "🚦",
      title: "Different, and friends",
      pages: "3–6",
      wonder: {
        q: "Samir Ek goes to school and speaks English at ease. Samir Do sells newspapers and speaks Hindi. Could they become friends?",
        options: [
          { id: "yes", label: "Yes — they can make the effort to talk" },
          { id: "no", label: "No — they are too different" },
        ],
        answer: "yes",
        reveal: "They did! They made the effort to talk because the friendship mattered to them. In the story, even their names turn out to be the same.",
      },
      explore: { activity: "The Lights Changed", title: "Diversity or inequality?", how: "Sort the differences between the two Samirs (and others) into diversity and inequality.", Sim: TwoSamirs },
      discoveries: [
        { id: "diversity", text: "Language, religion, festivals, style: differences that are diversity" },
        { id: "inequality", text: "Not having the resources and opportunities others have is inequality" },
      ],
      understand: [
        { title: "Diversity", body: "People differ in looks, language, culture, religion and much more. These differences make life richer — and more fun." },
        { title: "Inequality", body: "Inequality comes about when a person does not have the resources and opportunities that are available to others — like Samir Do, who never got to go to school." },
        { title: "Caste and inequality", body: "Under the caste system, people were put in groups by the work they did and were supposed to stay there. This was a form of inequality." },
      ],
      check: [
        { id: "cd1", kind: "mcq", q: "Some children go to school and others have to work instead. This is an example of…", options: ["Inequality", "Diversity", "Unity"], answer: 0, why: "They don't have the same opportunities — that's inequality, not just difference." },
        { id: "cd2", kind: "tf", q: "Being different from someone means you cannot be friends with them.", answer: false, why: "The two Samirs were different in many ways and still became friends." },
      ],
      connect: [
        { icon: "🗣", title: "Words you know", body: "List languages, besides your mother tongue, in which you know at least one or two words." },
        { icon: "🍛", title: "Food map", body: "Make a list of foods you have eaten from different parts of India." },
        { icon: "🤝", title: "Your story", body: "Think of a time you made friends with someone very different from you." },
      ],
    },
    {
      id: "regions",
      icon: "🏔",
      title: "Why are regions diverse?",
      pages: "7–11",
      wonder: {
        q: "Long ago, people travelled to new places to trade, to find land or work, or to escape famine and war. What happened to their ways of life?",
        options: [
          { id: "mix", label: "Old and new mixed, making something new" },
          { id: "same", label: "Nothing changed at all" },
          { id: "lost", label: "They forgot everything old" },
        ],
        answer: "mix",
        reveal: "Their languages, food, music and religions became a mix of the old and the new. Each region also adapted to its own land — the sea or the mountains.",
      },
      explore: { activity: "Ladakh and Kerala", title: "Two regions explorer", how: "Switch between Ladakh and Kerala. Look at each through every lens, then find what they share.", Sim: TwoRegions },
      discoveries: [
        { id: "geography", text: "Geography shapes life: a cold mountain desert vs a hilly coast" },
        { id: "livelihood", text: "Land and climate shape the food people eat and the work they do" },
        { id: "history", text: "Traders and travellers brought new religions and ideas" },
        { id: "shared", text: "Both regions were influenced by Chinese and Arab traders" },
      ],
      understand: [
        { title: "History shapes regions", body: "As people settled in new places, cultures mixed. Many cultural influences shaped life in each region, giving it its own history." },
        { title: "Geography shapes regions", body: "People adapt their lives to where they live. Life by the sea is very different from life in the mountains." },
        { title: "Tied together", body: "Kerala's spices and Ladakh's wool drew traders. So the history and geography of a place are often tied together." },
        { title: "Still happening", body: "Today people move for work, and their traditions slowly become part of their new homes." },
      ],
      check: [
        { id: "cd3", kind: "mcq", q: "Pashmina wool comes from…", options: ["Special goats in Ladakh", "Coconut trees in Kerala", "Fishing nets"], answer: 0, why: "Ladakh's goats produce pashmina wool, which is sold to traders from Kashmir." },
        { id: "cd4", kind: "mcq", q: "What drew traders to Kerala?", options: ["Spices like pepper, cloves and cardamom", "Snow", "Pashmina shawls"], answer: 0, why: "Spices grown on Kerala's hills attracted Jewish, Arab and later European traders." },
      ],
      connect: [
        { icon: "🗺", title: "Your region", body: "Pick another region of India. How do its history and geography shape its food, clothes and work?" },
        { icon: "🏙", title: "In cities", body: "City people often buy food from the market, so it's easy to forget how closely life is tied to the land." },
        { icon: "🏘", title: "Your neighbourhood", body: "Who lives near you? What stories and customs have you heard from them?" },
      ],
    },
    {
      id: "unity",
      icon: "🤝",
      title: "Unity in diversity",
      pages: "8, 11–12",
      wonder: {
        q: "Imagine a place where everyone wears red and white, eats only potatoes and plays only snakes and ladders. Would writers there tell many kinds of stories?",
        options: [
          { id: "few", label: "Probably not — life would be the same everywhere" },
          { id: "many", label: "Yes, lots of different stories" },
        ],
        answer: "few",
        reveal: "Diversity gives us ideas! Writers get stories from many different lives, places and people.",
      },
      explore: { activity: "Many ways, one country", title: "Unity puzzles", how: "Solve the puzzles about how we live differently — and how we came together.", Sim: UnityPuzzles },
      discoveries: [
        { id: "ways", text: "We do similar things in different ways" },
        { id: "freedom", text: "People of all backgrounds united in the freedom movement" },
        { id: "nehru", text: "Nehru described India with the phrase “unity in diversity”" },
        { id: "symbols", text: "Songs and symbols remind us of our respect for diversity" },
      ],
      understand: [
        { title: "A source of strength", body: "India's diversity has always been seen as a source of its strength." },
        { title: "United against British rule", body: "The British thought they could divide Indians because they were so different. But people showed they could be different and still be united." },
        { title: "Songs and symbols", body: "The national anthem by Rabindranath Tagore, and the flag that was used as a symbol of protest, express India's unity." },
      ],
      check: [{ id: "cd5", kind: "mcq", q: "“Unity in diversity” means…", options: ["Being different, yet united", "Everyone must be the same", "Each group stays apart"], answer: 0, why: "We can respect our differences and still stand together." }],
      connect: [
        { icon: "🪔", title: "Shared festivals", body: "Which festivals in your area are celebrated by people of different communities?" },
        { icon: "🎵", title: "The anthem", body: "Next time you sing the national anthem, notice the many regions it names." },
        { icon: "💭", title: "What it adds", body: "What does living with India's diversity add to your own life?" },
      ],
    },
  ],
  learnt: [
    "People differ in many ways — language, religion, culture, festivals and more. This is diversity.",
    "Inequality is when people don't have the resources and opportunities that others have.",
    "A region's history and geography shape the life of the people there, as in Ladakh and Kerala.",
    "India's diversity is a strength: people of different backgrounds came together against British rule.",
  ],
  keywords: ["Diversity", "Inequality", "Caste system", "Pashmina", "Cheena-vala", "Unity in diversity", "Freedom movement", "National anthem"],
};

export default chapter;
