// Civics Chapter 4 · Key Elements of a Democratic Government (NCERT Social and Political Life – I, pp. 35–40).
// Wording is original; facts follow the textbook. The playground vote is an invented classroom analogy.
import { useState } from "react";
import { PickLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";
import { Figure } from "../kit";

/* Stop 1 · Maya's story: South Africa under apartheid, and after 1994 */
const PLACES = [
  { id: "hospital", label: "Hospitals and ambulances", icon: "🚑", x: 70, text: { then: "Hospitals were separate, and so were ambulances. An ambulance for white people was well equipped; one for black people was not.", now: "Today people of all races use the same hospitals." } },
  { id: "bus", label: "Buses and trains", icon: "🚌", x: 180, text: { then: "There were separate trains and buses — even separate bus stops for black and white people.", now: "Since 1994, people of all races are considered equal." } },
  { id: "vote", label: "Voting", icon: "🗳", x: 290, text: { then: "Non-whites were not allowed to vote.", now: "In 1994 South Africa became a democracy where everyone can vote." } },
  { id: "land", label: "Land", icon: "🏡", x: 400, text: { then: "The best land was reserved for white people; non-whites had to live on the worst land.", now: "All people are now equal under the law." } },
];
function Apartheid({ discover }: SimProps) {
  const [mode, setMode] = useState<"then" | "now">("then");
  const [sel, setSel] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  function tap(id: string) {
    setSel(id);
    if (mode !== "then") return;
    const s = [...new Set([...seen, id])];
    setSeen(s);
    if (["hospital", "bus", "land"].every((x) => s.includes(x))) discover("separate");
    if (id === "vote") discover("novote");
    if (id === "soweto") discover("hector");
  }
  const place = PLACES.find((p) => p.id === sel);
  return (
    <Stage
      caption={
        sel === "soweto" ? (
          "Soweto (South Western Township): Hector Pieterson and his classmates protested against being forced to learn Afrikaans, the language the whites spoke — they wanted to learn their own language, Zulu. On 16 June 1976 police shot at the crowd, and a bullet killed Hector."
        ) : place ? (
          <span>
            <b className="text-[#ffd257]">{place.label}:</b> {place.text[mode]}
          </span>
        ) : mode === "then" ? (
          "Apartheid means separation on the basis of race. People were divided into white, black, Indian and coloured, and could not mix or share facilities. Tap each place."
        ) : (
          "The African National Congress and its best-known leader, Nelson Mandela, fought apartheid for years. In 1994 South Africa became a democratic country where people of all races are equal."
        )
      }
    >
      <svg viewBox="0 0 520 250" className="block h-auto w-full select-none">
        <rect width="520" height="250" fill={mode === "then" ? "#3a2f2a" : "#1f4a3a"} />
        <rect y="190" width="520" height="60" fill={mode === "then" ? "#5a4a3c" : "#3e7a52"} />
        {PLACES.map((p) => (
          <g key={p.id} onClick={() => tap(p.id)} role="button" aria-label={p.label} style={{ cursor: "pointer" }}>
            <rect x={p.x - 48} y="40" width="96" height="130" rx="12" fill={sel === p.id ? "#ffffff22" : "#ffffff0d"} stroke={sel === p.id ? "#ffd257" : "#ffffff22"} />
            <text x={p.x} y="78" fontSize="30" textAnchor="middle">
              {p.icon}
            </text>
            {mode === "then" ? (
              <g>
                <line x1={p.x} y1="92" x2={p.x} y2="160" stroke="#ff9b7a" strokeWidth="3" strokeDasharray="5 4" />
                <text x={p.x - 24} y="114" fontSize="14" fontWeight="900" fill="#ffe6b0" textAnchor="middle">
                  W
                </text>
                <text x={p.x + 24} y="114" fontSize="14" fontWeight="900" fill="#ffb8a0" textAnchor="middle">
                  NW
                </text>
                <Figure x={p.x - 24} y={160} s={0.55} shirt="#7fb8ff" skin="#f0c6a8" />
                <Figure x={p.x + 24} y={160} s={0.55} shirt="#a58a6a" skin="#6b4430" />
              </g>
            ) : (
              <g>
                <Figure x={p.x - 16} y={160} s={0.55} shirt="#7fb8ff" skin="#f0c6a8" wave />
                <Figure x={p.x + 16} y={160} s={0.55} shirt="#ffd257" skin="#6b4430" wave />
              </g>
            )}
            <text x={p.x} y="186" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">
              {p.label.split(" ")[0]}
            </text>
          </g>
        ))}
        {mode === "then" && (
          <g onClick={() => tap("soweto")} role="button" aria-label="Soweto, 1976" style={{ cursor: "pointer" }}>
            <rect x="460" y="200" width="54" height="40" rx="8" fill={sel === "soweto" ? "#ffd257" : "#ffffff22"} />
            <text x="487" y="218" fontSize="10" fontWeight="900" fill={sel === "soweto" ? "#13112b" : "#fff"} textAnchor="middle">
              Soweto
            </text>
            <text x="487" y="232" fontSize="10" fontWeight="900" fill={sel === "soweto" ? "#13112b" : "#fff"} textAnchor="middle">
              1976
            </text>
          </g>
        )}
        <text x="12" y="26" fontSize="15" fontWeight="900" fill="#fff">
          {mode === "then" ? "South Africa under apartheid" : "South Africa after 1994"}
        </text>
        {mode === "then" && (
          <text x="508" y="26" fontSize="13" fontWeight="900" fill="#ffe6b0" textAnchor="end">
            W = whites · NW = non-whites
          </text>
        )}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={mode === "then"} onClick={() => (setMode("then"), setSel(null))}>
          Under apartheid
        </Btn>
        <Btn
          on={mode === "now"}
          onClick={() => {
            setMode("now");
            setSel(null);
            discover("equal");
          }}
        >
          After 1994
        </Btn>
      </div>
    </Stage>
  );
}

/* Stop 2 · a school decides how to use its playground (an analogy) */
const GROUPS = [
  { id: "cricket", label: "A cricket pitch", icon: "🏏", votes: 12, color: "#7fb8ff", reason: "“We play every break. A proper pitch means fewer arguments over space.”" },
  { id: "garden", label: "A garden with benches", icon: "🌳", votes: 10, color: "#5fe0a0", reason: "“Not everyone plays sport. Some of us want shade, and a quiet place to sit and read.”" },
  { id: "kho", label: "Open space for kho-kho", icon: "🏃", votes: 8, color: "#ffd257", reason: "“Open ground lets lots of small groups play many different games at once.”" },
];
function PlaygroundVote({ discover }: SimProps) {
  const [heard, setHeard] = useState<string[]>([]);
  const [focus, setFocus] = useState<string | null>(null);
  const [mine, setMine] = useState<string | null>(null);
  const [stage, setStage] = useState<"talk" | "result" | "respect" | "term">("talk");
  const tally = GROUPS.map((g) => ({ ...g, n: g.votes + (mine === g.id ? 1 : 0) }));
  const winner = [...tally].sort((a, b) => b.n - a.n)[0];
  const total = tally.reduce((s, g) => s + g.n, 0);

  function listen(id: string) {
    setFocus(id);
    const h = [...new Set([...heard, id])];
    setHeard(h);
    if (h.length === GROUPS.length) discover("voices");
  }
  const caption =
    stage === "result"
      ? `${winner.icon} ${winner.label} wins with ${winner.n} of ${total} votes — a majority decision. Everyone had an equal vote, including you.`
      : stage === "respect"
        ? `A majority decision doesn't mean the others don't matter. The class could add a shady corner with benches, or keep one day a week for open games — so everyone's needs are respected.`
        : stage === "term"
          ? "Next year, the class can vote again. Governments, too, are elected for a fixed period — five years in India — and must face the people again."
          : focus
            ? `${GROUPS.find((g) => g.id === focus)!.icon} ${GROUPS.find((g) => g.id === focus)!.reason}`
            : "Your school must decide how to use its one shared playground. First listen to each group, then vote. (This is a classroom example to help us think — real democracy is much bigger!)";

  return (
    <Stage caption={caption}>
      <svg viewBox="0 0 520 220" className="block h-auto w-full select-none">
        <rect width="520" height="220" fill="#7fc27a" />
        <rect x="20" y="20" width="480" height="120" rx="14" fill="#9ad38e" stroke="#fff" strokeWidth="3" strokeDasharray="8 6" />
        <text x="260" y="88" fontSize="44" textAnchor="middle">
          {stage === "talk" ? "❔" : winner.icon}
        </text>
        {GROUPS.map((g, i) => {
          const x = 90 + i * 170;
          const n = tally[i].n;
          return (
            <g key={g.id} onClick={() => listen(g.id)} role="button" aria-label={`Listen: ${g.label}`} style={{ cursor: "pointer" }}>
              <rect x={x - 70} y="150" width="140" height="64" rx="12" fill={focus === g.id ? "#fff" : "#ffffffaa"} stroke={g.color} strokeWidth="3" />
              {[0, 1, 2].map((k) => (
                <Figure key={k} x={x - 40 + k * 22} y={206} s={0.42} shirt={g.color} long={k === 1} child />
              ))}
              <text x={x + 38} y="180" fontSize="20" textAnchor="middle">
                {g.icon}
              </text>
              <text x={x + 38} y="202" fontSize="12" fontWeight="900" fill="#13112b" textAnchor="middle">
                {stage === "talk" ? (heard.includes(g.id) ? "✓ heard" : "listen") : `${n} votes`}
              </text>
              {stage !== "talk" && <rect x={x - 60} y="142" width={(n / total) * 360} height="6" rx="3" fill={g.color} />}
            </g>
          );
        })}
      </svg>
      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-white/50">Your vote</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <Btn
              key={g.id}
              on={mine === g.id}
              onClick={() => {
                setMine(g.id);
                setStage("talk");
              }}
            >
              {g.icon} {g.label}
            </Btn>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn
          on={stage === "result"}
          onClick={() => {
            if (!mine) return;
            setStage("result");
            discover("majority");
          }}
        >
          🗳 Count the votes{mine ? "" : " (vote first)"}
        </Btn>
        {stage !== "talk" && (
          <>
            <Btn
              on={stage === "respect"}
              onClick={() => {
                setStage("respect");
                discover("respect");
              }}
            >
              🤝 And the others?
            </Btn>
            <Btn
              on={stage === "term"}
              onClick={() => {
                setStage("term");
                discover("term");
              }}
            >
              📅 Next year?
            </Btn>
          </>
        )}
      </div>
    </Stage>
  );
}

/* Stop 3 · other ways of participating: the electricity price rise of 2005 */
const ACTIONS = [
  { id: "rally", label: "Take out a rally", icon: "📣" },
  { id: "sign", label: "Signature campaign", icon: "✍️" },
  { id: "letter", label: "Letter to the editor", icon: "📰" },
  { id: "dharna", label: "Hold a dharna", icon: "✊" },
  { id: "tv", label: "Discuss it on TV", icon: "📺" },
];
function SpeakUp({ discover }: SimProps) {
  const [done, setDone] = useState<string[]>([]);
  const n = done.length;
  function act(id: string) {
    const d = [...new Set([...done, id])];
    setDone(d);
    if (d.length >= 3) discover("ways");
    if (d.length >= 4) discover("listen");
  }
  const govSays = n >= 4 ? "We have listened. The increase is withdrawn." : n >= 2 ? "Let us explain why we raised the price…" : "Electricity prices are going up.";
  return (
    <Stage
      caption={
        n >= 4
          ? "In August 2005, when a government raised the price of electricity, people protested sharply. It tried to explain and defend its decision, but finally listened and withdrew the increase — because it is responsible to the people."
          : "Elections come once in five years. But people can take part in between too. Choose ways for people to make their views heard."
      }
    >
      <svg viewBox="0 0 520 200" className="block h-auto w-full select-none">
        <rect width="520" height="200" fill="#1a1838" />
        <rect x="300" y="30" width="200" height="90" rx="12" fill="#2f78b8" />
        <text x="400" y="56" fontSize="12" fontWeight="900" fill="#cfe6ff" textAnchor="middle">
          🏛 Government
        </text>
        <foreignObject x="310" y="62" width="180" height="56">
          <div style={{ color: "#fff", fontSize: 12, fontWeight: 800, lineHeight: 1.2, textAlign: "center" }}>“{govSays}”</div>
        </foreignObject>
        <text x="150" y="60" fontSize="16" fontWeight="900" fill="#ffd257" textAnchor="middle">
          ⚡ Price ↑
        </text>
        {Array.from({ length: Math.min(9, 3 + n * 2) }, (_, i) => (
          <Figure key={i} x={30 + i * 30} y={185} s={0.6} shirt={["#ff8a5b", "#5fe0a0", "#7fb8ff", "#ffd257"][i % 4]} long={i % 2 === 0} wave={n > 0 && i % 3 === 0} />
        ))}
        {done.map((d, i) => (
          <text key={d} x={40 + i * 50} y="110" fontSize="26">
            {ACTIONS.find((a) => a.id === d)!.icon}
          </text>
        ))}
        <rect x="300" y="140" width="200" height="12" rx="6" fill="#ffffff22" />
        <rect x="300" y="140" width={Math.min(200, n * 50)} height="12" rx="6" fill="#5fe0a0" />
        <text x="400" y="170" fontSize="10" fontWeight="900" fill="#c9cbe0" textAnchor="middle">
          people's voice
        </text>
      </svg>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3">
        {ACTIONS.map((a) => (
          <Btn key={a.id} on={done.includes(a.id)} onClick={() => act(a.id)}>
            {a.icon} {a.label}
          </Btn>
        ))}
      </div>
    </Stage>
  );
}

/* Stop 4 · the Cauvery: sharing one river between two states */
function Cauvery({ discover }: SimProps) {
  const [release, setRelease] = useState(20);
  const [fair, setFair] = useState(false);
  const TOTAL = 100;
  const NEED = 70; // each state's need, in made-up units
  const ka = TOTAL - release;
  const tn = release;
  function set(v: number) {
    setRelease(v);
    setFair(false);
    if (v <= 30) discover("downstream");
    if (v >= 70) discover("upstream");
  }
  return (
    <Stage
      caption={
        fair
          ? "Neither state can get as much as it needs from one river. The central government has to step in and see that a fair distribution is worked out — following the rules laid down in the Constitution."
          : tn < NEED && ka < NEED
            ? "Both states are short of water. A conflict grows."
            : tn < NEED
              ? "The Mettur dam in Tamil Nadu fills only if water is released upstream. Crops in the delta are short of water."
              : "Now Karnataka keeps less for its districts and for Bengaluru city."
      }
    >
      <svg viewBox="0 0 520 220" className="block h-auto w-full select-none">
        <rect width="520" height="220" fill="#d9caa2" />
        <rect width="260" height="220" fill="#e6d7ae" />
        <text x="130" y="22" fontSize="13" fontWeight="900" fill="#5a3d22" textAnchor="middle">
          Karnataka (upstream)
        </text>
        <text x="390" y="22" fontSize="13" fontWeight="900" fill="#5a3d22" textAnchor="middle">
          Tamil Nadu (downstream)
        </text>
        <path d="M10 120 C 90 100, 160 140, 260 120 S 420 100, 510 130" stroke="#4fa3d8" strokeWidth={6 + release / 8} fill="none" />
        <path d="M10 120 C 90 100, 160 140, 180 128" stroke="#4fa3d8" strokeWidth="18" fill="none" />
        <rect x="170" y="98" width="16" height="56" fill="#6b6b78" />
        <text x="178" y="172" fontSize="10" fontWeight="900" fill="#2b2a30" textAnchor="middle">
          KRS dam
        </text>
        <rect x="380" y="96" width="16" height="56" fill="#6b6b78" />
        <text x="388" y="170" fontSize="10" fontWeight="900" fill="#2b2a30" textAnchor="middle">
          Mettur dam
        </text>
        <text x="70" y="70" fontSize="20">🏙</text>
        <text x="40" y="190" fontSize="20">🌾</text>
        <text x="460" y="190" fontSize="22">🌾🌾</text>
        {fair && (
          <text x="260" y="70" fontSize="30" textAnchor="middle">
            🏛
          </text>
        )}
        <text x="510" y="214" fontSize="9" fontWeight="800" fill="#5a3d22" textAnchor="end">
          Sketch · water amounts are made up
        </text>
      </svg>
      <div className="border-t border-white/10 px-4 py-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-white/50">Water released from the KRS dam</label>
        <input aria-label="Water released" type="range" min="0" max="100" step="5" value={release} onChange={(e) => set(+e.target.value)} className="mt-2 w-full accent-[#4fa3d8]" />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Readout label="Karnataka keeps" value={`${ka} / needs ${NEED}`} color={ka >= NEED ? "#5fe0a0" : "#ff9b7a"} />
          <Readout label="Tamil Nadu gets" value={`${tn} / needs ${NEED}`} color={tn >= NEED ? "#5fe0a0" : "#ff9b7a"} />
        </div>
        <div className="mt-3">
          <Btn
            on={fair}
            onClick={() => {
              setFair(true);
              setRelease(50);
              discover("central");
            }}
          >
            🏛 Central government steps in
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 5 · equality and justice */
function Justice({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Equality and justice can't be separated. Solve these."
      cases={[
        { id: "maya", icon: "🌍", prompt: "In Maya's story, did the apartheid government support the idea that all people are equal?", options: ["No", "Yes"], answer: 0, explain: "Apartheid laws kept races apart and unequal. That was unjust.", disc: "unequal" },
        { id: "untouch", icon: "🚫", prompt: "The earlier practice of untouchability is now…", options: ["Banned by law", "Encouraged", "Still allowed"], answer: 0, explain: "People treated as untouchable were denied education, transport, medical care and even prayer. Dr Ambedkar and others knew justice needs equal treatment.", disc: "justice" },
        { id: "girls", icon: "👧", prompt: "Society often values a boy child more than a girl child. What can the government do?", options: ["Make special provisions — like waiving or lowering fees for girls", "Nothing", "Close girls' schools"], answer: 0, explain: "The government makes special provisions for groups that are treated unequally, to promote justice.", disc: "special" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "cdemo",
  subject: "Civics",
  n: 4,
  title: "Key Elements of a Democratic Government",
  pages: "35–40",
  icon: "🗳",
  theme: { grad: "linear-gradient(135deg,#0f2a26 0%,#1f8a6c 55%,#ffd36b 130%)", accent: "#1a7a5f", soft: "#e2f5ee", ink: "#0f4d3c" },
  opening: "Maya, an eleven-year-old in Johannesburg, finds a scrapbook with photos of a schoolboy who was shot by police. Why did it happen — and what makes a government democratic?",
  stops: [
    {
      id: "maya",
      icon: "🌍",
      title: "Maya's story",
      pages: "35–36",
      wonder: {
        q: "What does “apartheid” mean?",
        options: [
          { id: "sep", label: "Separation on the basis of race" },
          { id: "vote", label: "Voting together" },
          { id: "lang", label: "Learning a new language" },
        ],
        answer: "sep",
        reveal: "Separation on the basis of race. Under apartheid laws, races couldn't mix, live near each other or share facilities.",
      },
      explore: { activity: "South Africa", title: "Then and now", how: "Tap each place under apartheid, find Soweto, then see South Africa after 1994.", Sim: Apartheid },
      discoveries: [
        { id: "separate", text: "Under apartheid, hospitals, buses and land were kept separate and unequal" },
        { id: "novote", text: "Non-whites were not allowed to vote" },
        { id: "hector", text: "Students like Hector Pieterson protested — he was killed in 1976" },
        { id: "equal", text: "In 1994 South Africa became a democracy where all races are equal" },
      ],
      understand: [
        { title: "A long struggle", body: "The African National Congress and Nelson Mandela fought apartheid for many years, and succeeded in 1994." },
        { title: "Key elements", body: "This chapter looks at three key elements of democracy: people's participation, resolving conflict, and equality and justice." },
      ],
      check: [{ id: "cm1", kind: "mcq", q: "Hector and his classmates were protesting against…", options: ["Being forced to learn Afrikaans instead of their own language", "Too many holidays", "A new school building"], answer: 0, why: "They wanted to learn in their own language, Zulu." }],
      connect: [
        { icon: "🧒", title: "Maya today", body: "How would Maya's life be different in South Africa today?" },
        { icon: "🤔", title: "Could it be avoided?", body: "Do you think the police shooting of Hector could have been avoided? How?" },
        { icon: "⚖️", title: "Fair for all", body: "Why is it important for all persons to be treated equally?" },
      ],
    },
    {
      id: "vote",
      icon: "🗳",
      title: "Why do we vote?",
      pages: "36–37",
      wonder: {
        q: "In India, how long is a government elected for?",
        options: [
          { id: "five", label: "Five years" },
          { id: "life", label: "For life" },
          { id: "one", label: "One month" },
        ],
        answer: "five",
        reveal: "Five years. To stay in power, a government has to be re-elected — so regular elections limit its power.",
      },
      explore: { activity: "A classroom example", title: "The playground vote", how: "Listen to every group, cast your vote, then think about the others and next year.", Sim: PlaygroundVote },
      discoveries: [
        { id: "voices", text: "Everyone's voice matters — listen before deciding" },
        { id: "majority", text: "A majority decision: each person has one equal vote" },
        { id: "respect", text: "Majority decisions should still respect others' needs" },
        { id: "term", text: "Elections come again after a fixed period" },
      ],
      understand: [
        { title: "Representatives", body: "Through elections, people choose leaders to represent them. These representatives are expected to keep people's voices and interests in mind." },
        { title: "Power is limited", body: "Governments are elected for fixed periods — five years in India — so they must go back to the people. This is when people feel their power." },
        { title: "Just an example", body: "A school vote is a simple analogy. A real democracy has a Constitution, laws, courts and many more ways for people to take part." },
      ],
      check: [{ id: "cm2", kind: "tf", q: "Regular elections help to limit the power of a government.", answer: true, why: "If a government wants to continue, it must be re-elected by the people." }],
      connect: [
        { icon: "📰", title: "In the news", body: "Read about an election in the newspaper. Why do you think elections are held after a fixed period?" },
        { icon: "🏫", title: "Class decisions", body: "What could your class decide together by voting?" },
        { icon: "👂", title: "Listen first", body: "How did hearing others' reasons change what you thought?" },
      ],
    },
    {
      id: "participate",
      icon: "📣",
      title: "Other ways to take part",
      pages: "37–38",
      wonder: {
        q: "Is voting once every five years the only way people take part in a democracy?",
        options: [
          { id: "no", label: "No — there are many other ways" },
          { id: "yes", label: "Yes, that's all" },
        ],
        answer: "no",
        reveal: "People also take an interest in how the government works, and criticise it when needed.",
      },
      explore: { activity: "August 2005", title: "Make your voice heard", how: "A government has raised electricity prices. Use different ways to make people's views heard.", Sim: SpeakUp },
      discoveries: [
        { id: "ways", text: "Rallies, signature campaigns, dharnas, strikes and letters are ways to take part" },
        { id: "listen", text: "A democratic government is responsible to the people and can change its decision" },
      ],
      understand: [
        { title: "Media", body: "Newspapers, magazines and TV also discuss government issues and responsibilities. A letter to the editor can ask the government to act — for example, to stop the poaching of tigers." },
        { title: "Social movements", body: "Not everyone gets to participate equally. Minority communities, Dalits, adivasis, women and others often organise social movements to challenge the government." },
        { title: "Alert citizens", body: "If people are alert and interested in how the country is run, its democracy is stronger." },
      ],
      check: [{ id: "cm3", kind: "mcq", q: "Which of these is a way for people to participate in government?", options: ["A signature campaign", "Ignoring the news", "Staying silent always"], answer: 0, why: "It shows the government what many people think." }],
      connect: [
        { icon: "📣", title: "Next rally", body: "Next time you see a rally, find out what it's about and who is taking part." },
        { icon: "✉️", title: "Write a letter", body: "What issue would you write a letter to the editor about?" },
        { icon: "📺", title: "News watch", body: "Notice how news channels question the government." },
      ],
    },
    {
      id: "conflict",
      icon: "🌊",
      title: "Resolving conflict",
      pages: "38–39",
      wonder: {
        q: "A river starts in one state and flows into another. Both need its water. What may happen?",
        options: [
          { id: "conflict", label: "A conflict over sharing the water" },
          { id: "nothing", label: "Nothing — there's always enough" },
        ],
        answer: "conflict",
        reveal: "Conflicts can arise between states — like the Cauvery water dispute between Karnataka and Tamil Nadu.",
      },
      explore: { activity: "The Cauvery", title: "Share the river", how: "Move the slider to release water from the upstream dam. Can both states get what they need?", Sim: Cauvery },
      discoveries: [
        { id: "downstream", text: "The downstream dam fills only if water is released upstream" },
        { id: "upstream", text: "Releasing more leaves less for the upstream state" },
        { id: "central", text: "The central government steps in to work out a fair distribution" },
      ],
      understand: [
        { title: "Why conflicts happen", body: "Conflicts can occur between people of different cultures, religions, regions or economic backgrounds, or when some feel discriminated against." },
        { title: "Processions", body: "When a procession's route causes tension, the police bring community representatives together to find a solution — and make sure violence doesn't take place." },
        { title: "The Constitution", body: "The Constitution lays down basic rules for both the government and the people. Conflicts must be resolved according to these." },
      ],
      check: [{ id: "cm4", kind: "mcq", q: "In the Cauvery dispute, who steps in to work out a fair distribution?", options: ["The central government", "One village", "A private company"], answer: 0, why: "The dispute is between two states, so the central government steps in." }],
      connect: [
        { icon: "🎉", title: "Festivals", body: "How are processions managed in your area during festivals?" },
        { icon: "🤝", title: "Your conflicts", body: "How do you and your friends settle arguments fairly?" },
        { icon: "💧", title: "Water sharing", body: "Is water shared fairly where you live?" },
      ],
    },
    {
      id: "justice",
      icon: "⚖️",
      title: "Equality and justice",
      pages: "40",
      wonder: {
        q: "Can there be justice if people are not treated equally?",
        options: [
          { id: "no", label: "No — equality and justice go together" },
          { id: "yes", label: "Yes, they are unrelated" },
        ],
        answer: "no",
        reveal: "Equality and justice are inseparable. A democratic government is committed to both.",
      },
      explore: { activity: "Equality and justice", title: "Justice puzzles", how: "Solve the puzzles about fairness.", Sim: Justice },
      discoveries: [
        { id: "unequal", text: "Apartheid did not treat people as equals" },
        { id: "justice", text: "Untouchability is banned: justice needs equal treatment" },
        { id: "special", text: "Special provisions help groups treated unequally" },
      ],
      understand: [
        { title: "Special provisions", body: "Because girls are often valued less than boys, the government may waive or lower fees for girls in government schools or colleges." },
      ],
      check: [{ id: "cm5", kind: "mcq", q: "Lowering school fees for girls is an example of…", options: ["A special provision to promote justice", "Discrimination against boys", "A new tax"], answer: 0, why: "It helps girls overcome the injustice they face." }],
      connect: [
        { icon: "🎒", title: "Helping out", body: "Have you ever helped someone out of an unfair situation? Did everyone see it the same way?" },
        { icon: "📋", title: "Key ideas", body: "Make a list of key ideas of a democratic government — e.g. all people are equal." },
        { icon: "🏫", title: "Fees", body: "How would lower fees help more girls attend school?" },
      ],
    },
  ],
  learnt: [
    "Under apartheid, South Africa kept people apart by race; in 1994 it became a democracy of equals.",
    "Through elections held after fixed periods (five years in India), people choose representatives and limit the government's power.",
    "People also take part through rallies, signature campaigns, dharnas, the media and social movements.",
    "The government helps resolve conflicts, such as the Cauvery water dispute, following the Constitution.",
    "Equality and justice are inseparable; special provisions help those treated unequally.",
  ],
  keywords: ["Apartheid", "Participation", "Election", "Representative", "Majority", "Conflict", "Constitution", "Equality", "Justice"],
};

export default chapter;
