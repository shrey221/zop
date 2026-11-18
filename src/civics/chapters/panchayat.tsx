// Civics Chapter 5 · Panchayati Raj (NCERT Social and Political Life – I, pp. 43–48).
// Wording is original; the Hardas story and its characters follow the textbook. Pictures are original.
import { useState } from "react";
import { ExploreLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";
import { Figure } from "../kit";

/* Stop 1 · the Gram Sabha meets: the water problem in Hardas */
const SPEAKERS = [
  { id: "sarpanch", name: "Sarpanch", x: 260, y: 92, shirt: "#ffd257", long: false, says: "The Sarpanch and the Panchs present a plan to repair the road that links the village to the main highway. Then the talk turns to water." },
  { id: "tijia", name: "Tijia", x: 80, y: 175, shirt: "#ff8a5b", long: true, says: "Tijia: the water problem is very bad. The water has dropped below the handpumps' depth, the taps are nearly dry, and women walk 3 km to the Suru river." },
  { id: "pipe", name: "A member", x: 190, y: 190, shirt: "#7fb8ff", long: false, says: "One member suggests piping water from the Suru and building an overhead tank. Others feel this will be expensive." },
  { id: "deepen", name: "Others", x: 330, y: 190, shirt: "#c58bff", long: true, says: "Others think it's better to deepen the handpumps and clean the wells for this season." },
  { id: "anwar", name: "Anwar", x: 440, y: 175, shirt: "#5fe0a0", long: false, says: "Anwar saw watershed development in a village in Maharashtra: people planted trees and built check-dams and tanks to recharge (refill) the water. He'd heard the government gives money for it." },
];
function GramSabha({ discover }: SimProps) {
  const [sel, setSel] = useState<string | null>(null);
  const [heard, setHeard] = useState<string[]>([]);
  const [q, setQ] = useState<null | "season" | "lasting">(null);
  const [ans, setAns] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState(false);
  function hear(id: string) {
    setSel(id);
    setQ(null);
    const h = [...new Set([...heard, id])];
    setHeard(h);
    if (h.includes("tijia")) discover("problem");
  }
  function answer(which: "season" | "lasting", id: string) {
    const right = which === "season" ? "deepen" : "anwar";
    if (id !== right) return setWrong(true);
    setWrong(false);
    setAns({ ...ans, [which]: id });
    discover(which === "season" ? "short" : "long");
  }
  const sp = SPEAKERS.find((s) => s.id === sel);
  const canAsk = ["tijia", "pipe", "deepen", "anwar"].every((x) => heard.includes(x));
  return (
    <Stage
      caption={
        q === "season"
          ? ans.season
            ? "Right — deepening two handpumps and cleaning a well can help this season."
            : "Which idea helps the village get through this season?"
          : q === "lasting"
            ? ans.lasting
              ? "Yes. Tijia said groundwater falls every year because they use more than seeps in — so a lasting fix must refill the ground. The Panchayat was asked to find out more about watershed development."
              : "Which idea is a more permanent solution?"
            : sp
              ? sp.says
              : "It's the first Gram Sabha meeting after the new Gram Panchayat's election. Tap each person to hear them."
      }
    >
      <svg viewBox="0 0 520 230" className="block h-auto w-full select-none">
        <rect width="520" height="230" fill="#f2dfb0" />
        <circle cx="440" cy="40" r="22" fill="#ffd257" />
        <path d="M0 130 Q260 110 520 130 V230 H0 Z" fill="#d9c08a" />
        <text x="40" y="60" fontSize="34">🌳</text>
        <rect x="200" y="96" width="120" height="10" rx="4" fill="#8a5a2b" />
        {SPEAKERS.map((s) => (
          <g key={s.id} onClick={() => hear(s.id)} role="button" aria-label={s.name} style={{ cursor: "pointer" }}>
            <circle cx={s.x} cy={s.y - 32} r="34" fill={sel === s.id ? "#ffffff88" : "#ffffff00"} />
            <Figure x={s.x} y={s.y} s={0.9} shirt={s.shirt} long={s.long} wave={sel === s.id} />
            <text x={s.x} y={s.y + 16} fontSize="11" fontWeight="900" fill="#3a2414" textAnchor="middle">
              {s.name}
              {heard.includes(s.id) ? " ✓" : ""}
            </text>
          </g>
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <Figure key={i} x={30 + i * 75} y={228} s={0.55} shirt="#a58a6a" long={i % 2 === 1} />
        ))}
        <text x="500" y="110" fontSize="22">🚰</text>
      </svg>
      {canAsk && (
        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <Btn on={q === "season"} onClick={() => (setQ("season"), setWrong(false))}>
              ⏱ For this season?
            </Btn>
            <Btn on={q === "lasting"} onClick={() => (setQ("lasting"), setWrong(false))}>
              🌱 For the long term?
            </Btn>
          </div>
          {q && (
            <div className="mt-3 grid gap-2">
              {[
                { id: "pipe", label: "Pipe water from the Suru to an overhead tank" },
                { id: "deepen", label: "Deepen the handpumps and clean the wells" },
                { id: "anwar", label: "Watershed development: trees, check-dams, tanks" },
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => answer(q, o.id)}
                  className={`press rounded-2xl px-4 py-3 text-left text-sm font-bold ring-1 ${ans[q] === o.id ? "bg-[#1fb88a]/20 ring-[#1fb88a]" : "bg-white/5 ring-white/10"}`}
                >
                  {ans[q] === o.id ? "✓ " : ""}
                  {o.label}
                </button>
              ))}
              {wrong && <p className="text-xs font-bold text-[#ff9b7a]">Think again about what each idea would do, and how soon.</p>}
            </div>
          )}
        </div>
      )}
    </Stage>
  );
}

/* Stop 2 · finalising the BPL list */
function BplList({ discover }: SimProps) {
  const [open, setOpen] = useState<string[]>([]);
  const [step, setStep] = useState<"list" | "quiet" | "saroj">("list");
  function flag(id: string) {
    const o = [...new Set([...open, id])];
    setOpen(o);
    if (o.includes("natwar") && o.includes("birju")) discover("doubt");
    if (id === "om") discover("missing");
  }
  const rows = [
    { id: "natwar", name: "Natwar", note: "“He just bought a colour TV, and his son sent him a new motorcycle. How can he be below the poverty line?”" },
    { id: "birju", name: "Birju", note: "“How did Birju get on the list? He has so much land!” Both Natwar and Birju are friends of Amirchand." },
  ];
  return (
    <Stage
      caption={
        step === "quiet"
          ? "Soorajmal keeps quiet. Amirchand was the village's earlier zamindar (landowner), still controls a lot of land, and is sitting there watching everyone. It can be hard to speak up against the powerful."
          : step === "saroj"
            ? "Saroj stands up and says Om Prakash should be on the list, and others agree. The teacher who did the survey says his house was locked — he may have gone to look for work. The Sarpanch orders that his family's income be checked, and if it is below the government's limit, his name added."
            : "The Gram Sabha must approve the list of families below the poverty line (BPL). As it is read out, people start whispering. Tap names to hear what they say."
      }
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-2xl bg-[#fbf3dc] p-3 text-ink">
          <p className="text-xs font-extrabold uppercase tracking-wider text-ink-mute">📋 BPL list · Hardas</p>
          {rows.map((r) => (
            <button key={r.id} onClick={() => flag(r.id)} className={`press mt-2 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-extrabold ring-1 ${open.includes(r.id) ? "bg-[#ffe1d6] ring-[#c4552b]" : "bg-white ring-black/10"}`}>
              {r.name} <span className="text-xs">{open.includes(r.id) ? "❓ questioned" : "tap"}</span>
            </button>
          ))}
          <p className="mt-2 text-xs font-bold text-ink-mute">…and other families</p>
          <button onClick={() => flag("om")} className={`press mt-2 w-full rounded-xl border-2 border-dashed px-3 py-2 text-left text-sm font-extrabold ${open.includes("om") ? "border-[#1fb88a] bg-[#e1f7ee]" : "border-black/20"}`}>
            {open.includes("om") ? "Om Prakash — a landless labourer who can barely make ends meet. He's missing!" : "🔍 Is anyone missing?"}
          </button>
        </div>
        <div className="grid content-start gap-2 text-sm font-semibold text-white/80">
          {rows
            .filter((r) => open.includes(r.id))
            .map((r) => (
              <p key={r.id} className="animate-pop rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                🗣 {r.note}
              </p>
            ))}
        </div>
      </div>
      {open.includes("om") && (
        <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
          <Btn on={step === "quiet"} onClick={() => setStep("quiet")}>
            🤐 Why doesn't Soorajmal speak?
          </Btn>
          <Btn
            on={step === "saroj"}
            onClick={() => {
              setStep("saroj");
              discover("speak");
            }}
          >
            🙋 Saroj speaks up
          </Btn>
        </div>
      )}
    </Stage>
  );
}

/* Stop 3 · who is who in Panchayati Raj */
function TierArt() {
  const box = (x: number, y: number, w: number, label: string, sub: string, fill: string) => (
    <g pointerEvents="none">
      <rect x={x} y={y} width={w} height="44" rx="10" fill={fill} />
      <text x={x + w / 2} y={y + 19} fontSize="13" fontWeight="900" fill="#13112b" textAnchor="middle">
        {label}
      </text>
      <text x={x + w / 2} y={y + 35} fontSize="10" fontWeight="800" fill="#3b3550" textAnchor="middle">
        {sub}
      </text>
    </g>
  );
  return (
    <g>
      <rect width="520" height="340" fill="#1a1838" />
      {box(150, 14, 220, "Zila Parishad", "district level", "#ff9bb0")}
      {box(150, 84, 220, "Panchayat Samiti / Janpad", "block level", "#ffd257")}
      {box(110, 154, 300, "Gram Panchayat", "Sarpanch + Ward Panchs · 5 years", "#5fe0a0")}
      {box(410, 214, 104, "Secretary", "appointed", "#c9cbe0")}
      {box(20, 214, 120, "Ward Panchs", "one per ward", "#7fb8ff")}
      {box(160, 214, 120, "Sarpanch", "President", "#7fb8ff")}
      {box(60, 284, 400, "Gram Sabha", "every adult (18+) who can vote", "#ffb46b")}
      <g stroke="#ffffff66" strokeWidth="2.5">
        <line x1="260" y1="58" x2="260" y2="84" />
        <line x1="260" y1="128" x2="260" y2="154" />
        <line x1="80" y1="258" x2="80" y2="284" />
        <line x1="220" y1="258" x2="220" y2="284" />
        <line x1="80" y1="214" x2="80" y2="198" />
        <line x1="220" y1="214" x2="220" y2="198" />
        <line x1="440" y1="214" x2="400" y2="198" />
      </g>
      <text x="300" y="276" fontSize="10" fontWeight="900" fill="#ffb46b">
        ↑ elects
      </text>
    </g>
  );
}
function Tiers({ discover }: SimProps) {
  return (
    <ExploreLab
      viewBox="0 0 520 340"
      art={<TierArt />}
      intro="This is Panchayati Raj — people taking part in their own government. Tap each dot, starting from the Gram Sabha at the bottom."
      spots={[
        { id: "sabha", label: "Gram Sabha", x: 440, y: 306, text: "A meeting of all adults who live in the area of a Panchayat — one village or a few. Anyone aged 18 or more who has the right to vote is a member." },
        { id: "ward", label: "Ward Panchs", x: 30, y: 236, text: "Each Panchayat is divided into wards. Each ward elects a Ward Member, called a Panch." },
        { id: "sarpanch", label: "Sarpanch", x: 270, y: 236, text: "All members of the Gram Sabha also elect a Sarpanch — the Panchayat President." },
        { id: "panchayat", label: "Gram Panchayat", x: 395, y: 166, text: "The Ward Panchs and the Sarpanch form the Gram Panchayat, elected for five years. It is answerable to the Gram Sabha that elected it." },
        { id: "secretary", label: "Secretary", x: 500, y: 226, text: "Not elected but appointed by the government. Calls the meetings of the Gram Sabha and Gram Panchayat and keeps a record of them." },
        { id: "samiti", label: "Panchayat Samiti", x: 355, y: 96, text: "The block level, also called the Janpad Panchayat. It has many Gram Panchayats under it." },
        { id: "zila", label: "Zila Parishad", x: 355, y: 26, text: "The district level. It makes development plans for the district and, with the Panchayat Samitis, regulates how money is shared among Gram Panchayats." },
      ]}
      groups={{ elect: ["sabha", "ward", "sarpanch"], panchayat: ["panchayat", "secretary"], three: ["samiti", "zila"] }}
      discover={discover}
    />
  );
}

/* Stop 4 · what the Gram Panchayat does, and where its money comes from */
function WorkAndMoney({ discover }: SimProps) {
  const items = [
    { id: "water", label: "Build and look after water sources", icon: "🚰", bin: "work", why: "Building and maintaining water sources, roads, drains and school buildings is the Panchayat's work." },
    { id: "road", label: "Build and repair roads", icon: "🛣", bin: "work" },
    { id: "drain", label: "Build and maintain drainage", icon: "🕳", bin: "work" },
    { id: "school", label: "Look after school buildings", icon: "🏫", bin: "work" },
    { id: "jobs", label: "Run government schemes that create jobs in the village", icon: "👷", bin: "work" },
    { id: "tax", label: "Taxes on houses and market places", icon: "🏠", bin: "money", why: "The Panchayat levies and collects local taxes." },
    { id: "scheme", label: "Government scheme funds, through the Janpad and Zila Panchayats", icon: "🏛", bin: "money" },
    { id: "donate", label: "Donations for community works", icon: "🤲", bin: "money" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Is each card part of the Gram Panchayat's work, or a source of its money?"
      bins={[
        { id: "work", label: "Its work", icon: "🛠", color: "#5fe0a0" },
        { id: "money", label: "Its money", icon: "💰", color: "#ffd257" },
      ]}
      items={items}
      rules={[
        { id: "work", when: (p) => all(p, "work") },
        { id: "funds", when: (p) => all(p, "money") },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "cpanchayat",
  subject: "Civics",
  n: 5,
  title: "Panchayati Raj",
  pages: "43–48",
  icon: "🌳",
  theme: { grad: "linear-gradient(135deg,#2a2208 0%,#8a7a1f 55%,#7fd38a 130%)", accent: "#6b6014", soft: "#f3f0d6", ink: "#4a420c" },
  opening: "It's a special day in Hardas village — everyone is rushing to the first Gram Sabha meeting after the Panchayat election. What will they decide?",
  stops: [
    {
      id: "sabha",
      icon: "🗣",
      title: "The Gram Sabha meets",
      pages: "43–44",
      wonder: {
        q: "Who can be a member of the Gram Sabha?",
        options: [
          { id: "adults", label: "Every adult (18 or more) who has the right to vote" },
          { id: "rich", label: "Only landowners" },
          { id: "panchs", label: "Only the elected Panchs" },
        ],
        answer: "adults",
        reveal: "Every adult who lives in the Panchayat's area and is 18 or older with the right to vote. People take part directly and question their representatives.",
      },
      explore: { activity: "Hardas village", title: "The water problem", how: "Hear everyone at the meeting, then decide which idea is for this season and which lasts.", Sim: GramSabha },
      discoveries: [
        { id: "problem", text: "Villagers raise their problems directly at the Gram Sabha" },
        { id: "short", text: "A short-term fix: deepen handpumps and clean wells" },
        { id: "long", text: "A lasting fix: watershed development to recharge water" },
      ],
      understand: [
        { title: "Gram Sabha", body: "A meeting of all adults in the area covered by a Panchayat. All plans for the Gram Panchayat's work are placed before it." },
        { title: "Direct participation", body: "Here people take part directly and seek answers from the people they elected." },
      ],
      check: [{ id: "cp1", kind: "mcq", q: "Why was the water problem in Hardas getting worse every year?", options: ["They used more water than was seeping into the ground", "It rained too much", "The river was too close"], answer: 0, why: "Groundwater levels were falling — so a lasting fix had to recharge it." }],
      connect: [
        { icon: "💧", title: "Watershed", body: "Find out more about watershed development and how it helps an area." },
        { icon: "🎤", title: "Interview", body: "Ask your teacher to invite a Panch or Sarpanch to talk about their work." },
        { icon: "🏘", title: "Nearby", body: "What problems would people in your area raise at a meeting?" },
      ],
    },
    {
      id: "bpl",
      icon: "📋",
      title: "Keeping watch",
      pages: "44–45",
      wonder: {
        q: "The BPL list should include…",
        options: [
          { id: "poor", label: "Only families who are really poor" },
          { id: "friends", label: "Friends of powerful people" },
        ],
        answer: "poor",
        reveal: "Only poor families — the Gram Sabha has to approve the list.",
      },
      explore: { activity: "The BPL list", title: "Check the list", how: "Question the names that don't fit, find who is missing, and see who speaks up.", Sim: BplList },
      discoveries: [
        { id: "doubt", text: "Villagers spot names that shouldn't be on the list" },
        { id: "missing", text: "A really poor family was missing" },
        { id: "speak", text: "Speaking up at the Gram Sabha got the list checked" },
      ],
      understand: [
        { title: "A watchdog", body: "The Gram Sabha stops the Panchayat from doing wrong things, like misusing money or favouring certain people." },
        { title: "Responsible to the people", body: "It keeps an eye on elected representatives and makes them responsible to those who elected them." },
        { title: "Not everyone can speak", body: "Some people, like Soorajmal, find it hard to speak against the powerful. That is why everyone attending matters." },
      ],
      check: [{ id: "cp2", kind: "tf", q: "The Gram Sabha can stop the Panchayat from favouring certain people.", answer: true, why: "All plans are placed before the Gram Sabha, which keeps watch." }],
      connect: [
        { icon: "🙋", title: "Speaking up", body: "Have you seen someone unable to speak for themselves? What stopped them?" },
        { icon: "👥", title: "Why attend?", body: "Should all members attend Gram Sabha meetings? Why?" },
        { icon: "❓", title: "Your question", body: "Write one question villagers could ask the Panchayat at the next meeting." },
      ],
    },
    {
      id: "tiers",
      icon: "🏛",
      title: "Three levels of Panchayats",
      pages: "45, 47–48",
      wonder: {
        q: "Who elects the Sarpanch?",
        options: [
          { id: "sabha", label: "All members of the Gram Sabha" },
          { id: "govt", label: "The state government appoints them" },
          { id: "zamindar", label: "The biggest landowner" },
        ],
        answer: "sabha",
        reveal: "All the Gram Sabha's members elect the Sarpanch. Each ward elects its own Panch.",
      },
      explore: { activity: "Panchayati Raj", title: "Who's who", how: "Climb up from the Gram Sabha to the Zila Parishad.", Sim: Tiers },
      discoveries: [
        { id: "elect", text: "The Gram Sabha's members elect Ward Panchs and the Sarpanch" },
        { id: "panchayat", text: "The Gram Panchayat is elected; its Secretary is appointed" },
        { id: "three", text: "Three levels: Gram Panchayat, Panchayat Samiti, Zila Parishad" },
      ],
      understand: [
        { title: "First tier", body: "Panchayati Raj is the first tier, or level, of democratic government." },
        { title: "State laws", body: "Within guidelines in the Constitution, each state has its own laws about Panchayats — to give people more space to take part." },
      ],
      check: [
        { id: "cp3", kind: "mcq", q: "Which of these is NOT elected?", options: ["The Secretary", "The Sarpanch", "A Ward Panch"], answer: 0, why: "The Secretary is appointed by the government." },
        { id: "cp4", kind: "mcq", q: "Development plans for the whole district are made by the…", options: ["Zila Parishad", "Gram Sabha", "Ward Panch"], answer: 0, why: "The Zila Parishad works at the district level." },
      ],
      connect: [
        { icon: "🗺", title: "Your block", body: "What is the name of your block or district? Who represents it?" },
        { icon: "🏫", title: "School council", body: "Does your school have class representatives? How are they chosen?" },
        { icon: "📅", title: "Five years", body: "When was the last Panchayat election near you?" },
      ],
    },
    {
      id: "work",
      icon: "🛠",
      title: "Work and money",
      pages: "46–47",
      wonder: {
        q: "The Hardas Panchayat had money for maintaining handpumps. What did it decide?",
        options: [
          { id: "use", label: "Use it to deepen two handpumps and clean a well" },
          { id: "keep", label: "Keep it and do nothing" },
        ],
        answer: "use",
        reveal: "It used that money for the short-term work, and decided to ask the Block Development Officer about the watershed scheme.",
      },
      explore: { activity: "The Gram Panchayat", title: "Work or money?", how: "Sort each card.", Sim: WorkAndMoney },
      discoveries: [
        { id: "work", text: "Its work: water, roads, drains, school buildings and job schemes" },
        { id: "funds", text: "Its money: local taxes, government schemes and donations" },
      ],
      understand: [
        { title: "Committees", body: "In some states, Gram Sabhas form committees — like construction and development committees — with members of both the Sabha and the Panchayat." },
        { title: "Approved by the people", body: "The Gram Panchayat's work has to be approved by the Gram Sabha." },
      ],
      check: [{ id: "cp5", kind: "mcq", q: "Which is a source of money for a Gram Panchayat?", options: ["Taxes on houses and market places", "Profits from a cinema in another country", "Nothing — it has no money"], answer: 0, why: "It collects local taxes, gets government scheme funds and receives donations." }],
      connect: [
        { icon: "🔍", title: "Investigate", body: "Pick a task a Panchayat near you did. Why was it taken up? Where did the money come from? Is it finished?" },
        { icon: "📰", title: "Fair sharing", body: "A news report from Nimone village told of a man attacked for asking that tanker water be shared equally among all castes. Is that discrimination? Why?" },
        { icon: "🏅", title: "Award", body: "Two village Panchs from Maharashtra won the Nirmal Gram Puraskar in 2005 for excellent Panchayat work." },
      ],
    },
  ],
  learnt: [
    "The Gram Sabha is a meeting of all adults in a Panchayat's area; anyone 18 or older with the right to vote is a member.",
    "Ward Panchs and the Sarpanch, elected for five years, form the Gram Panchayat; its Secretary is appointed.",
    "The Gram Sabha keeps watch over the Panchayat and makes it responsible to the people.",
    "Panchayati Raj has three levels: Gram Panchayat, Panchayat Samiti (block) and Zila Parishad (district).",
    "The Gram Panchayat builds and maintains water sources, roads and drains, using taxes, scheme funds and donations.",
  ],
  keywords: ["Gram Sabha", "Gram Panchayat", "Sarpanch", "Panch", "Ward", "Secretary", "BPL list", "Panchayat Samiti", "Zila Parishad", "Watershed"],
};

export default chapter;
