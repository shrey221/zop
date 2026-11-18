// Civics Chapter 2 · Diversity and Discrimination (NCERT Social and Political Life – I, pp. 13–24).
// Wording is original; facts follow the textbook. Dr Ambedkar's account is retold, not quoted.
import { useState } from "react";
import { OrderLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";

/* Stop 1 · facts or prejudice? Statements taken from the textbook's activity */
function FactOrPrejudice({ discover }: SimProps) {
  const items = [
    { id: "f1", label: "More than 50% of all Indians live in villages", icon: "🏡", bin: "fact", why: "This is a fact about where people live." },
    { id: "f2", label: "In peak harvest season, families spend 12–14 hours in the fields", icon: "🌾", bin: "fact" },
    { id: "f3", label: "Living in a city is expensive — much of what people earn goes on rent and transport", icon: "🚌", bin: "fact" },
    { id: "f4", label: "Many villagers are forced to move to cities in search of work", icon: "🧳", bin: "fact" },
    { id: "p1", label: "Villagers don't care about their health and are full of superstition", icon: "🙅", bin: "prej", why: "This judges a whole group negatively. That is a prejudice." },
    { id: "p2", label: "People in cities are spoilt and lazy", icon: "🙅", bin: "prej" },
    { id: "p3", label: "City people only care about money and cannot be trusted", icon: "🙅", bin: "prej" },
    { id: "p4", label: "People in villages are backward", icon: "🙅", bin: "prej" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Some sentences about villages and cities are facts. Others judge a whole group of people. Sort them."
      bins={[
        { id: "fact", label: "Fact", icon: "📊", color: "#5fe0a0" },
        { id: "prej", label: "Prejudice", icon: "🙅", color: "#ff9b7a" },
      ]}
      items={items}
      rules={[
        { id: "fact", when: (p) => all(p, "fact") },
        { id: "prejudice", when: (p) => all(p, "prej") },
      ]}
    />
  );
}

/* Stop 2 · girls, boys, or anyone? No answer is "wrong" — then we look again. */
const QUALITIES = [
  { id: "cry", label: "They don't cry" },
  { id: "strong", label: "Physically strong" },
  { id: "gentle", label: "Soft-spoken and gentle" },
  { id: "sport", label: "Good at sport" },
  { id: "cook", label: "Good at cooking" },
  { id: "dance", label: "Good at dance and painting" },
  { id: "naughty", label: "Naughty" },
  { id: "behaved", label: "Well behaved" },
  { id: "emotional", label: "Emotional" },
  { id: "rowdy", label: "Rowdy" },
];
type Box = "g" | "b" | "a";
const BOXES: { id: Box; label: string; icon: string; color: string }[] = [
  { id: "g", label: "Girls", icon: "👧", color: "#ff9bc8" },
  { id: "b", label: "Boys", icon: "👦", color: "#7fb8ff" },
  { id: "a", label: "Anyone", icon: "🧒", color: "#5fe0a0" },
];
function GirlsBoys({ discover }: SimProps) {
  const [placed, setPlaced] = useState<Record<string, Box>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [msg, setMsg] = useState("Where would you put each quality? There's no wrong answer here — put it where you first feel it belongs.");
  const left = QUALITIES.filter((q) => !placed[q.id]);

  function drop(b: Box) {
    if (!sel) return setMsg("First tap a quality, then tap a box.");
    const next = { ...placed, [sel]: b };
    setPlaced(next);
    if (sel === "cry") {
      setMsg("Boys and girls both feel like crying when they're hurt. But boys are often told “Don't cry, you're a boy”, so they learn to stop themselves. It's learnt, not something they're born with.");
      discover("learnt");
    } else setMsg(b === "a" ? "Anyone can be like this." : `Many people would put it there. Is this something ${b === "g" ? "girls" : "boys"} are born with, or something they learn?`);
    setSel(null);
    if (Object.keys(next).length === QUALITIES.length) discover("sorted");
  }
  function lookAgain() {
    setPlaced(Object.fromEntries(QUALITIES.map((q) => [q.id, "a" as Box])));
    setMsg("Every one of these qualities can be found in girls and in boys. Fitting everyone in a group into one image is a stereotype — it stops us seeing each person as unique.");
    discover("anyone");
  }

  return (
    <Stage caption={msg}>
      <div className="p-4">
        <div className="flex min-h-[44px] flex-wrap gap-2">
          {left.map((q) => (
            <button key={q.id} onClick={() => setSel(q.id)} className={`press rounded-full px-3 py-2 text-sm font-extrabold ring-1 ${sel === q.id ? "bg-white text-ink ring-white" : "bg-white/10 ring-white/15"}`}>
              {q.label}
            </button>
          ))}
          {left.length === 0 && <span className="py-2 text-sm font-extrabold text-[#5fe0b4]">✓ All placed</span>}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {BOXES.map((b) => (
            <button key={b.id} aria-label={`Box ${b.label}`} onClick={() => drop(b.id)} className={`min-h-[120px] rounded-2xl border-2 border-dashed p-2 text-left ${sel ? "bg-white/10" : "bg-white/5"}`} style={{ borderColor: b.color }}>
              <span className="block text-xs font-extrabold uppercase" style={{ color: b.color }}>
                {b.icon} {b.label}
              </span>
              <span className="mt-1 flex flex-wrap gap-1">
                {QUALITIES.filter((q) => placed[q.id] === b.id).map((q) => (
                  <span key={q.id} className="animate-pop rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-ink">
                    {q.label}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {left.length === 0 && (
          <Btn on onClick={lookAgain}>
            🔍 Look again
          </Btn>
        )}
        <Btn onClick={() => (setPlaced({}), setSel(null))}>↺ Start over</Btn>
      </div>
    </Stage>
  );
}

/* Stop 3 · Dr Ambedkar's journey, 1901 (retold from his own account in the textbook) */
function AmbedkarJourney({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="In 1901, nine-year-old Bhimrao Ambedkar travelled by train to meet his father. Put the events of his own account in order."
      steps={[
        { id: "train", label: "Travel to meet father in Koregaon", icon: "🚂", detail: "Bhimrao, his brothers and cousins took the train towards Koregaon, in today's Maharashtra. They were happy and excited." },
        { id: "wait", label: "Nobody comes to meet them", icon: "⏳", detail: "They waited at the station for a long time, but neither their father nor his servant came." },
        { id: "ask", label: "The stationmaster asks who they are", icon: "❓", detail: "The children were well dressed, and the stationmaster felt sorry for them. He asked who they were." },
        { id: "mahar", label: "Bhimrao says they are Mahars", icon: "💬", detail: "Mahars were one of the communities treated as “untouchable” then. The stationmaster's attitude changed at once, and he walked away." },
        { id: "carts", label: "No cartman will take them", icon: "🐂", detail: "Many bullock-carts were for hire, but none of the cartmen would carry them — even for double the fare. Money did not work." },
      ]}
      milestones={[
        { id: "caste", at: 4 },
        { id: "dignity", at: 5 },
      ]}
    />
  );
}

/* Stop 4 · striving for equality: what the Constitution set out */
function EqualityPuzzles({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="People struggled for equality, and the writers of the Constitution wrote it into the rules of the nation."
      cases={[
        { id: "struggle", icon: "✊", prompt: "Along with fighting British rule, which groups also struggled to be treated more equally?", options: ["Dalits, women, tribals and peasants", "Only kings", "Nobody"], answer: 0, explain: "Dalits struggled to enter temples, women demanded the right to education, and peasants and tribals fought moneylenders' high interest.", disc: "struggle" },
        { id: "untouch", icon: "⚖️", prompt: "Under the Constitution, untouchability is…", options: ["A crime, abolished by law", "Allowed in villages", "A private matter"], answer: 0, explain: "Untouchability has been legally abolished. Everyone has equal rights and opportunities, people are free to choose their work, and government jobs are open to all.", disc: "constitution" },
        { id: "steps", icon: "🏛", prompt: "The Constitution also asks the government to…", options: ["Take steps to make equality real for poor and marginal communities", "Do nothing", "Choose one language for everyone"], answer: 0, explain: "The government has a responsibility to take specific steps so that the right to equality reaches everyone.", disc: "constitution" },
        { id: "secular", icon: "🙏", prompt: "Why is India called a secular country?", options: ["The government treats all religions equally, and people are free to follow their faith", "Only one religion is allowed", "Religion is banned"], answer: 0, explain: "The writers of the Constitution said no one language, religion or festival should be compulsory for all. Respect for diversity is part of equality.", disc: "secular" },
        { id: "keep", icon: "🌱", prompt: "Now that equality is written in the Constitution, does it happen by itself?", options: ["No — people's struggles and government action are still needed", "Yes, automatically"], answer: 0, explain: "Inequalities still exist. Equality is a value we have to keep striving for.", disc: "striving" },
      ]}
    />
  );
}

/* Stop 5 · what could you do? Every honest answer is respected. */
const SITUATIONS = [
  { id: "poor", text: "A friend begins to tease a classmate because he is poor.", icon: "😟" },
  { id: "food", text: "Children in your class won't share food with a girl because they think she is dirty.", icon: "🍱" },
  { id: "game", text: "Some boys say girls can't play games as well as they can.", icon: "⚽" },
  { id: "joke", text: "Someone tells you a joke that makes fun of a community's accent.", icon: "🗯" },
];
const RESPONSES = [
  { id: "say", label: "Calmly say it's hurtful", note: "Speaking up kindly can make people stop and think. It's easier when a friend speaks up with you." },
  { id: "join", label: "Stand with the person left out", note: "Sitting with them, or inviting them in, shows they are not alone." },
  { id: "adult", label: "Tell a teacher or trusted adult", note: "Adults can help change habits and rules in a class or a family." },
  { id: "quiet", label: "Stay quiet this time", note: "Many people feel this way — it's hard to say something right then. You could still talk to the person later, or to an adult." },
];
function WhatCouldYouDo({ discover }: SimProps) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const s = SITUATIONS[i];
  const r = RESPONSES.find((x) => x.id === picked[s.id]);

  function pick(id: string) {
    const p = { ...picked, [s.id]: id };
    setPicked(p);
    const n = Object.keys(p).length;
    if (n >= 2) discover("options");
    if (n === SITUATIONS.length) discover("together");
  }
  return (
    <Stage caption={r ? r.note : "There's no single right answer. Choose what you might do — then think about what helps."}>
      <div className="p-4">
        <div className="flex gap-1.5">
          {SITUATIONS.map((x, k) => (
            <button key={x.id} onClick={() => setI(k)} className={`press flex-1 rounded-full py-1.5 text-lg ring-1 ${k === i ? "bg-white ring-white" : "bg-white/5 ring-white/10"}`} aria-label={`Situation ${k + 1}`}>
              {x.icon}
              {picked[x.id] && <span className="ml-0.5 text-xs text-[#1fb88a]">✓</span>}
            </button>
          ))}
        </div>
        <p className="mt-4 font-display text-xl font-bold leading-snug">{s.text}</p>
        <p className="mt-1 text-xs font-bold text-white/50">What could you do?</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {RESPONSES.map((x) => (
            <button key={x.id} onClick={() => pick(x.id)} className={`press rounded-2xl px-3 py-3 text-left text-sm font-extrabold ring-1 ${picked[s.id] === x.id ? "bg-[#1fb88a]/20 ring-[#1fb88a]" : "bg-white/5 ring-white/10"}`}>
              {x.label}
            </button>
          ))}
        </div>
        {picked[s.id] && i < SITUATIONS.length - 1 && (
          <div className="mt-3">
            <Btn on onClick={() => setI(i + 1)}>
              Next situation →
            </Btn>
          </div>
        )}
      </div>
    </Stage>
  );
}

const chapter: Chapter = {
  id: "cdiscrim",
  subject: "Civics",
  n: 2,
  title: "Diversity and Discrimination",
  pages: "13–24",
  icon: "⚖️",
  theme: { grad: "linear-gradient(135deg,#1d1440 0%,#5b3fa8 55%,#ff8f6b 130%)", accent: "#5b3fa8", soft: "#ece6fb", ink: "#33206b" },
  opening: "Have you ever been teased, laughed at, or left out for being “different”? Why do such things happen?",
  stops: [
    {
      id: "prejudice",
      icon: "🙅",
      title: "Prejudice",
      pages: "13–14",
      wonder: {
        q: "India has more than 1600 mother tongues and over a hundred dance forms. Is this diversity always celebrated?",
        options: [
          { id: "no", label: "Not always" },
          { id: "yes", label: "Always" },
        ],
        answer: "no",
        reveal: "Not always. We often feel safe with people who look, talk and think like us — and may find others strange.",
      },
      explore: { activity: "Rural and urban life", title: "Fact or prejudice?", how: "Sort the statements about village and city people.", Sim: FactOrPrejudice },
      discoveries: [
        { id: "fact", text: "Some statements are facts that can be checked" },
        { id: "prejudice", text: "Judging a whole group negatively is prejudice" },
      ],
      understand: [
        { title: "Prejudice", body: "Prejudice means judging other people negatively or seeing them as inferior." },
        { title: "Only one right way?", body: "When we think only one way is best — like one language — we stop respecting people who do things differently." },
        { title: "About many things", body: "People can be prejudiced about religion, skin colour, region, accent, clothes and more. Sometimes it even stops friendships." },
      ],
      check: [{ id: "cr1", kind: "mcq", q: "“Everyone from that region is lazy.” This is…", options: ["A prejudice", "A fact", "A law"], answer: 0, why: "It judges a whole group negatively without looking at each person." }],
      connect: [
        { icon: "👂", title: "Notice it", body: "Can you list some prejudices you've noticed around you? How do they affect the way people treat each other?" },
        { icon: "🗣", title: "Languages", body: "Do people around you think some languages are “better” than others?" },
        { icon: "🏙", title: "Village and city", body: "Talk to someone who has lived in both. What did they find?" },
      ],
    },
    {
      id: "stereotypes",
      icon: "🧒",
      title: "Stereotypes",
      pages: "15–17",
      wonder: {
        q: "“We are born as boys and girls. There's nothing to think about.” Are boys born knowing that they shouldn't cry?",
        options: [
          { id: "learn", label: "No — it's something they learn" },
          { id: "born", label: "Yes — they're born that way" },
        ],
        answer: "learn",
        reveal: "It's learnt. Boys are often told “boys don't cry”, so they stop themselves — even though everyone sometimes feels like crying.",
      },
      explore: { activity: "Girls, boys or anyone?", title: "The stereotype box", how: "Place each quality where you feel it belongs, then look again.", Sim: GirlsBoys },
      discoveries: [
        { id: "sorted", text: "We often sort people without thinking" },
        { id: "learnt", text: "Many “boy” and “girl” behaviours are learnt, not born" },
        { id: "anyone", text: "Any quality can belong to anyone — each person is unique" },
      ],
      understand: [
        { title: "Stereotype", body: "When we fix people into one image — “they are stingy”, “they are lazy” — we create a stereotype. There are stingy and generous people in every group." },
        { title: "Why it matters", body: "Stereotypes stop us seeing each person as unique. They can even stop people from doing things they'd be good at." },
        { title: "Children with special needs", body: "The term “disabled” has been changed to “children with special needs”. They face stereotypes too — and have their own thoughts about them." },
      ],
      check: [
        { id: "cr2", kind: "mcq", q: "“Two surgeons were sitting down to lunch when one of them made a call on her mobile…” Who did she call? (Match it in a way that challenges stereotypes.)", options: ["Her daughter, just back from school", "Nobody — surgeons can't be women"], answer: 0, why: "A woman surgeon calling her daughter: the sentence challenges the stereotype that surgeons are men." },
        { id: "cr3", kind: "tf", q: "A stereotype fits large numbers of people into only one pattern.", answer: true, why: "That's exactly what a stereotype does." },
      ],
      connect: [
        { icon: "🏃", title: "Stereotype busters", body: "One of the fastest athletes in the world has chronic asthma. A boy on a wheelchair won the drawing prize. Can you add more?" },
        { icon: "👧", title: "“Girls are a burden”", body: "How could this stereotype affect the way a daughter is treated at home?" },
        { icon: "🏫", title: "Your school", body: "Should children with special needs study in regular schools? Discuss why." },
      ],
    },
    {
      id: "discrimination",
      icon: "🚂",
      title: "Discrimination",
      pages: "17–21",
      wonder: {
        q: "What turns a prejudice into discrimination?",
        options: [
          { id: "act", label: "Acting on it — treating people unfairly" },
          { id: "think", label: "Just thinking about it" },
        ],
        answer: "act",
        reveal: "Discrimination happens when people act on prejudices or stereotypes — keeping others out of jobs, neighbourhoods, wells or even cups.",
      },
      explore: { activity: "Dr Ambedkar's first experience", title: "A journey in 1901", how: "Put the events of Dr Ambedkar's account in order.", Sim: AmbedkarJourney },
      discoveries: [
        { id: "caste", text: "He was treated differently only because of his caste" },
        { id: "dignity", text: "Discrimination denies people respect and dignity — even money didn't help" },
      ],
      understand: [
        { title: "Two reasons", body: "People may face discrimination because their culture isn't valued (diversity), or because they are poor (inequality) — sometimes both." },
        { title: "Caste ladder", body: "In the caste system, groups were placed on a ladder. Those at the bottom were called “untouchables” and kept out of homes, wells, temples and even classroom seats." },
        { title: "Dalit", body: "People of the so-called lower castes use the word Dalit (“broken”) for themselves, rather than “untouchable”. The government uses the term Scheduled Castes." },
        { title: "Poverty, not religion", body: "A common stereotype says Muslims don't want to educate girls. Studies show poverty is the real reason — in Kerala, with nearby schools, buses and many women teachers, many more poor children, including Muslim girls, attend school." },
        { title: "Dr B. R. Ambedkar (1891–1956)", body: "Considered the father of the Indian Constitution and the best-known leader of the Dalits. The first from his caste to finish college, he became a lawyer in England and fought for Dalit rights." },
      ],
      check: [
        { id: "cr4", kind: "mcq", q: "The cartmen refused to take the children even for double fare. This shows that…", options: ["Caste discrimination denies people dignity, not just jobs", "The children had no money", "There were no carts"], answer: 0, why: "The children could pay — they were refused only because of caste." },
        { id: "cr5", kind: "mcq", q: "Making someone sit separately in class because of their background is…", options: ["Discrimination", "Diversity", "A fair rule"], answer: 0, why: "It acts on prejudice and treats them unequally." },
      ],
      connect: [
        { icon: "💭", title: "How would it feel?", body: "How do you think Bhimrao felt when the stationmaster's attitude changed?" },
        { icon: "🔍", title: "Other examples", body: "What other groups face discrimination? How might persons with special needs be treated unfairly?" },
        { icon: "📚", title: "Education matters", body: "Dr Ambedkar urged Dalits to send their children to school and college. Why?" },
      ],
    },
    {
      id: "equality",
      icon: "📜",
      title: "Striving for equality",
      pages: "21–23",
      wonder: {
        q: "When India became independent in 1947, the Constitution set out the rules for the nation. What did it say about equality?",
        options: [
          { id: "all", label: "All people of India are to be treated as equals" },
          { id: "some", label: "Only some people are equal" },
        ],
        answer: "all",
        reveal: "The Constitution says all Indians are entitled to equality of status and opportunity.",
      },
      explore: { activity: "The Constitution", title: "Equality puzzles", how: "Find out what the Constitution set out.", Sim: EqualityPuzzles },
      discoveries: [
        { id: "struggle", text: "Dalits, women, tribals and peasants struggled for equality" },
        { id: "constitution", text: "The Constitution abolished untouchability and gave equal rights" },
        { id: "secular", text: "India is secular — the government treats all religions equally" },
        { id: "striving", text: "Equality has to be kept striving for" },
      ],
      understand: [
        { title: "A key value", body: "The equality of all persons is a key value that unites us as Indians." },
        { title: "Respect for diversity", body: "People must be free to follow their religion, speak their language and celebrate their festivals. None should be forced on everyone." },
        { title: "Still work to do", body: "Inequalities exist even today. People's struggles and positive government action are both needed." },
      ],
      check: [{ id: "cr6", kind: "tf", q: "Government jobs in India are open to all people.", answer: true, why: "The Constitution opened government jobs to all, and people are free to choose their work." }],
      connect: [
        { icon: "📜", title: "The first page", body: "Find the Preamble of the Constitution. Which words talk about equality?" },
        { icon: "🙋", title: "Why equality?", body: "Why do you think it's important for all people to be equal?" },
        { icon: "🌱", title: "Small steps", body: "What is one thing your class could do to make everyone feel included?" },
      ],
    },
    {
      id: "respond",
      icon: "🙋",
      title: "What could you do?",
      pages: "24",
      wonder: {
        q: "Someone makes a hurtful comment and you don't know what to say. Is that unusual?",
        options: [
          { id: "common", label: "No — it happens to lots of people" },
          { id: "rare", label: "Yes, it's rare" },
        ],
        answer: "common",
        reveal: "It's very common — it's hard to say something right then. Thinking about it beforehand helps.",
      },
      explore: { activity: "Discuss in groups", title: "Four situations", how: "For each situation, choose what you might do and read why it can help.", Sim: WhatCouldYouDo },
      discoveries: [
        { id: "options", text: "There are many ways to respond — speaking up, standing with someone, asking for help" },
        { id: "together", text: "Small actions by many people help make equality real" },
      ],
      understand: [
        { title: "It's not easy", body: "Raising an issue can bring problems — friends may disagree. Talking it through in class helps everyone find words." },
        { title: "Everyone can help", body: "Including someone who is left out is a simple, powerful step." },
      ],
      check: [{ id: "cr7", kind: "tf", q: "Including someone who is being left out is one way to challenge discrimination.", answer: true, why: "It shows them they're not alone and makes others think." }],
      connect: [
        { icon: "👥", title: "Group talk", body: "Discuss each situation in a small group and share your ideas with the class." },
        { icon: "📺", title: "At home", body: "What could you say if someone at home made a prejudiced comment while watching TV?" },
        { icon: "🎭", title: "Role play", body: "Act out one situation with friends, and try different responses." },
      ],
    },
  ],
  learnt: [
    "Prejudice means judging others negatively or seeing them as inferior.",
    "A stereotype fixes a whole group into one image and stops us seeing each person as unique.",
    "Discrimination happens when people act on their prejudices or stereotypes.",
    "Dr Ambedkar faced caste discrimination as a child and later fought for the rights of Dalits.",
    "The Constitution made untouchability a crime and promised equality, but we must keep striving for it.",
  ],
  keywords: ["Prejudice", "Stereotype", "Discrimination", "Caste", "Dalit", "Untouchability", "Constitution", "Secular", "Equality"],
};

export default chapter;
