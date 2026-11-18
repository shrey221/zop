// Civics Chapter 6 · Rural Administration (NCERT Social and Political Life – I, pp. 49–56).
// Wording is original; the story of Mohan and Raghu and the Amrapura record follow the textbook.
// The field map is a simplified original drawing, and the "measured" area is a made-up example.
import { useState } from "react";
import { PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";

/* Stop 1 · a quarrel in the village and the police station */
function PoliceStory({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Mohan noticed that Raghu had moved the bund (boundary) between their fields, taking some of Mohan's land. When Mohan objected, Raghu and a helper beat him up. What happens next?"
      cases={[
        { id: "where", icon: "🚓", prompt: "A neighbour suggests going to the bigger police station in town. Where can Mohan register his case?", options: ["Only at the police station whose area covers his village", "Any police station he likes", "At the post office"], answer: 0, explain: "Every police station has an area under its control. People in that area report theft, accidents, injuries or fights there, and that station must enquire, investigate and act.", disc: "area" },
        { id: "sho", icon: "🧾", prompt: "The Station House Officer (SHO) rudely refuses to write down the complaint. What helps?", options: ["The neighbours who saw the attack insist the case be registered", "Mohan gives up and goes home", "Mohan pays the SHO"], answer: 0, explain: "The neighbours argued that Mohan had been beaten in front of them. Finally the officer agreed, and Mohan wrote down his complaint.", disc: "register" },
        { id: "next", icon: "🔍", prompt: "After the complaint is written, what does the officer say will happen?", options: ["A constable will come the next day to investigate", "Nothing will happen", "Raghu gets Mohan's field"], answer: 0, explain: "Investigating cases in its area is the police station's job.", disc: "investigate" },
      ]}
    />
  );
}

/* Stop 2 · the Patwari's records */
const RECORD = [
  { id: "mohan", owner: "Mohan, son of Raja Ram", area: 0.75, crop: "Soyabean on 0.75 ha", extra: "Owner — not rented out", color: "#e8c46a" },
  { id: "raghu", owner: "Raghu, son of Ratan Lall", area: 3.0, crop: "Soyabean on 2.75 ha, then wheat on 1.75 ha", extra: "Owner · 0.25 ha fallow · one working well, irrigated", color: "#9fd27a" },
  { id: "govt", owner: "Madhya Pradesh Government", area: 6.0, crop: "Grassland", extra: "Used for grazing · one working well", color: "#c7e6a8" },
];
function LandRecord({ discover }: SimProps) {
  const [open, setOpen] = useState<string[]>([]);
  const [measured, setMeasured] = useState(false);
  const [fixed, setFixed] = useState(false);
  const bund = fixed ? 180 : 150; // x of the Mohan/Raghu boundary
  const measuredArea = fixed ? 0.75 : 0.6; // made-up measurement
  function look(id: string) {
    const o = [...new Set([...open, id])];
    setOpen(o);
    if (RECORD.every((r) => o.includes(r.id))) discover("record");
  }
  return (
    <Stage
      caption={
        fixed
          ? "The bund is back where the Patwari's map says it should be. Records like these help settle disputes peacefully."
          : measured
            ? "The record says Mohan owns 0.75 ha, but the field now measures less. The boundary has been shifted!"
            : "This is a simplified version of the Patwari's record for Amrapura village. Tap each field, then measure Mohan's field."
      }
    >
      <svg viewBox="0 0 520 230" className="block h-auto w-full select-none">
        <rect width="520" height="230" fill="#f4efe0" />
        <g onClick={() => look("mohan")} role="button" aria-label="Mohan's field" style={{ cursor: "pointer" }}>
          <rect x="20" y="20" width={bund - 20} height="150" fill={RECORD[0].color} stroke="#5d5848" />
          <text x={(20 + bund) / 2} y="100" fontSize="12" fontWeight="900" fill="#3a2414" textAnchor="middle">
            Mohan
          </text>
        </g>
        <g onClick={() => look("raghu")} role="button" aria-label="Raghu's field" style={{ cursor: "pointer" }}>
          <rect x={bund} y="20" width={300 - bund} height="150" fill={RECORD[1].color} stroke="#5d5848" />
          <text x={(bund + 300) / 2} y="100" fontSize="12" fontWeight="900" fill="#3a2414" textAnchor="middle">
            Raghu
          </text>
          <text x="270" y="150" fontSize="16">⭕</text>
        </g>
        <g onClick={() => look("govt")} role="button" aria-label="Government grassland" style={{ cursor: "pointer" }}>
          <rect x="300" y="20" width="200" height="150" fill={RECORD[2].color} stroke="#5d5848" />
          <text x="400" y="90" fontSize="12" fontWeight="900" fill="#3a2414" textAnchor="middle">
            Government grassland
          </text>
          <text x="380" y="125" fontSize="18">🐄 ⭕</text>
        </g>
        {/* the bund */}
        <line x1={bund} y1="20" x2={bund} y2="170" stroke="#8a5a2b" strokeWidth="6" />
        {!fixed && <line x1="180" y1="20" x2="180" y2="170" stroke="#c4552b" strokeWidth="2" strokeDasharray="6 5" />}
        {!fixed && measured && (
          <text x="184" y="34" fontSize="10" fontWeight="900" fill="#c4552b">
            map's boundary
          </text>
        )}
        {measured && <path d={`M20 182 H${bund}`} stroke="#2b2a30" strokeWidth="2" strokeDasharray="2 3" />}
        <rect y="190" width="520" height="14" fill="#c9b48a" />
        <text x="10" y="222" fontSize="10" fontWeight="800" fill="#5d5848">
          Kachcha road
        </text>
        <text x="510" y="222" fontSize="10" fontWeight="800" fill="#5d5848" textAnchor="end">
          Sketch · not to scale
        </text>
        <g transform="translate(490 44)">
          <path d="M0 -18 L6 2 L0 -2 L-6 2 Z" fill="#2b2a30" />
          <text y="16" fontSize="11" fontWeight="900" fill="#2b2a30" textAnchor="middle">
            N
          </text>
        </g>
      </svg>
      <div className="grid gap-1.5 border-t border-white/10 px-4 py-3">
        {RECORD.filter((r) => open.includes(r.id)).map((r) => (
          <div key={r.id} className="animate-pop rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold ring-1 ring-white/10">
            <b className="text-[#ffd257]">
              {r.owner} · {r.area.toFixed(2)} ha
            </b>
            <br />
            {r.crop} · {r.extra}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        {measured && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            <Readout label="Patwari's record" value="0.75 ha" />
            <Readout label="Measured now" value={`${measuredArea.toFixed(2)} ha`} color={fixed ? "#5fe0a0" : "#ff9b7a"} />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Btn
            on={measured}
            onClick={() => {
              setMeasured(true);
              discover("measure");
            }}
          >
            📏 Measure with the chain
          </Btn>
          {measured && (
            <Btn
              on={fixed}
              onClick={() => {
                setFixed(true);
                discover("settle");
              }}
            >
              ↔ Put the bund back
            </Btn>
          )}
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · who does what */
function WhoDoesWhat({ discover }: SimProps) {
  const items = [
    { id: "p1", label: "Measures fields, sometimes with a long chain", icon: "📏", bin: "patwari", why: "Measuring land and keeping land records is the Patwari's main work." },
    { id: "p2", label: "Maintains and updates the village land records", icon: "📒", bin: "patwari" },
    { id: "p3", label: "Organises collection of land revenue from farmers", icon: "💰", bin: "patwari" },
    { id: "p4", label: "Tells the government which crops are grown", icon: "🌾", bin: "patwari" },
    { id: "t1", label: "Hears land disputes", icon: "⚖️", bin: "tehsildar", why: "Tehsildars are revenue officers working under the District Collector." },
    { id: "t2", label: "Supervises the Patwaris' work", icon: "👀", bin: "tehsildar" },
    { id: "t3", label: "Makes sure students can get caste certificates and farmers copies of records", icon: "📄", bin: "tehsildar" },
    { id: "s1", label: "Registers complaints of theft, injury or fights", icon: "🚓", bin: "police", why: "The police station enquires into, investigates and acts on cases in its area." },
    { id: "s2", label: "Investigates cases in its area", icon: "🔍", bin: "police" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Whose job is it? Tap a card, then the right person."
      bins={[
        { id: "patwari", label: "Patwari", icon: "📒", color: "#ffd257" },
        { id: "tehsildar", label: "Tehsildar", icon: "🏢", color: "#7fb8ff" },
        { id: "police", label: "Police", icon: "🚓", color: "#ff9b7a" },
      ]}
      items={items}
      rules={[
        { id: "patwari", when: (p) => all(p, "patwari") },
        { id: "tehsildar", when: (p) => all(p, "tehsildar") },
        { id: "police", when: (p) => all(p, "police") },
      ]}
    />
  );
}

/* Stop 4 · when is a land record needed? (situations from the textbook) */
function NeedRecord({ discover }: SimProps) {
  const items = [
    { id: "buy", label: "A farmer wants to buy a plot of land from another", icon: "🤝", bin: "yes", why: "Buying land needs proof of who owns it." },
    { id: "loan", label: "A farmer wants a bank loan to dig a well on her land", icon: "🏦", bin: "yes" },
    { id: "divide", label: "A farmer wants to divide his property among his children", icon: "👪", bin: "yes" },
    { id: "sell", label: "A farmer wants to sell her produce to another", icon: "🧺", bin: "no", why: "Selling crops doesn't need the land record." },
    { id: "fert", label: "A farmer wants to buy fertiliser for his field", icon: "🛍", bin: "no" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Farmers have a right to a copy of their land record and map. In which situations would they need it?"
      bins={[
        { id: "yes", label: "Needs the record", icon: "📄", color: "#5fe0a0" },
        { id: "no", label: "Doesn't need it", icon: "✋", color: "#c9cbe0" },
      ]}
      items={items}
      rules={[
        { id: "need", when: (p) => all(p, "yes") },
        { id: "noneed", when: (p) => all(p, "no") },
      ]}
    />
  );
}

/* Stop 5 · a new law: equal shares for daughters */
function NewLaw({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="When we think of farmers who own land, we often think of men. A new law changed this."
      cases={[
        { id: "before", icon: "📜", prompt: "Until recently, in some states, when a Hindu father died, his agricultural land was divided among…", options: ["Only his sons", "His sons and daughters equally", "The village"], answer: 0, explain: "Women worked on the fields but were not seen as owners. Hindu women in some states got no share of the family's agricultural land.", disc: "before" },
        { id: "law", icon: "⚖️", prompt: "Under the Hindu Succession Amendment Act, 2005…", options: ["Sons, daughters and their mothers can get an equal share in the land", "Only the eldest son inherits", "Only mothers inherit"], answer: 0, explain: "The same law applies to all states and union territories, and benefits a large number of women.", disc: "equal" },
        { id: "sudha", icon: "👩", prompt: "After Sudha's father died, her mother wants the land in her own name and all the children's names. Whom does she ask?", options: ["The Patwari, to enter the names in the record", "The cartman", "The SHO"], answer: 0, explain: "Sudha's mother now confidently runs the farm with the younger children, and Sudha knows she can always depend on her share.", disc: "patwari" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "crural",
  subject: "Civics",
  n: 6,
  title: "Rural Administration",
  pages: "49–56",
  icon: "📒",
  theme: { grad: "linear-gradient(135deg,#2b1708 0%,#9a5a1f 55%,#9fd27a 130%)", accent: "#8a4f17", soft: "#f6e9da", ink: "#5a3410" },
  opening: "India has more than six lakh villages. Water, electricity, roads, land records, quarrels — who takes care of all this?",
  stops: [
    {
      id: "police",
      icon: "🚓",
      title: "A quarrel in the village",
      pages: "49–50",
      wonder: {
        q: "Raghu's uncle is the Sarpanch, and his family owns many fields. Mohan is angry — but why might he also be frightened?",
        options: [
          { id: "power", label: "Raghu's family is powerful" },
          { id: "rain", label: "It might rain" },
        ],
        answer: "power",
        reveal: "Raghu's family was powerful. Even so, Mohan plucked up courage and went to talk to Raghu.",
      },
      explore: { activity: "Area of the police station", title: "Mohan goes to the police", how: "Follow Mohan's case step by step.", Sim: PoliceStory },
      discoveries: [
        { id: "area", text: "Every police station has its own area" },
        { id: "register", text: "People have the right to register a complaint" },
        { id: "investigate", text: "The police investigate cases in their area" },
      ],
      understand: [
        { title: "The police", body: "Anyone in a police station's area can report theft, accidents, injuries or fights. The police there must enquire, investigate and take action." },
        { title: "Supervised", body: "The police's work is supervised by senior officers such as the Superintendent of Police." },
      ],
      check: [{ id: "cv1", kind: "mcq", q: "If there's a theft in your house, where do you register a complaint?", options: ["The police station whose area covers your home", "Any police station in the country", "The school"], answer: 0, why: "Each station is responsible for its own area." }],
      connect: [
        { icon: "🎭", title: "Skit", body: "Act out the scene at the police station. How did it feel to play Mohan, the SHO or a neighbour? Could the SHO have acted differently?" },
        { icon: "🗺", title: "Your station", body: "Which police station covers your home?" },
        { icon: "🎉", title: "Festivals", body: "What work do the police do during festivals and public meetings?" },
      ],
    },
    {
      id: "patwari",
      icon: "📒",
      title: "The Patwari's records",
      pages: "51–53",
      wonder: {
        q: "Is there a peaceful way to find out whether the boundary was really moved?",
        options: [
          { id: "records", label: "Yes — check the land records and measure" },
          { id: "fight", label: "No — only by fighting" },
        ],
        answer: "records",
        reveal: "Yes! The Patwari keeps a map and records of who owns what land, and can measure the fields.",
      },
      explore: { activity: "Patwari record, Amrapura", title: "Check the boundary", how: "Read the record for each field, measure Mohan's field and put the bund back.", Sim: LandRecord },
      discoveries: [
        { id: "record", text: "The Patwari's record shows who owns each plot, its area and crops" },
        { id: "measure", text: "Measuring and comparing with the map shows a shifted boundary" },
        { id: "settle", text: "Land records help settle disputes peacefully" },
      ],
      understand: [
        { title: "Patwari", body: "Known by different names — Lekhpal, Kanungo, Karamchari or Village Officer. Each is responsible for a group of villages." },
        { title: "Kept up to date", body: "Farmers may change crops or dig a well, so the Patwari must regularly update the records." },
        { title: "Computerised", body: "In some states, records are being computerised and kept at the Panchayat office, so they're easier to get." },
      ],
      check: [{ id: "cv2", kind: "mcq", q: "The main work of the Patwari is…", options: ["Measuring land and keeping land records", "Running the police station", "Building roads"], answer: 0, why: "The Patwari also organises land revenue collection." }],
      connect: [
        { icon: "🔍", title: "Local name", body: "What is the Patwari called in your state?" },
        { icon: "🏘", title: "How many villages?", body: "If you live in a village, how many villages does your Patwari look after?" },
        { icon: "🗺", title: "Read the map", body: "Who owns the land next to Mohan's field? Who can use the grassland?" },
      ],
    },
    {
      id: "who",
      icon: "🏢",
      title: "Who does what?",
      pages: "50–53",
      wonder: {
        q: "Who heads the revenue department in a district?",
        options: [
          { id: "dc", label: "The District Collector" },
          { id: "sho", label: "The SHO" },
          { id: "sarpanch", label: "The Sarpanch" },
        ],
        answer: "dc",
        reveal: "The District Collector. Under her are revenue officers called tehsildars, who supervise the Patwaris.",
      },
      explore: { activity: "Rural administration", title: "Whose job is it?", how: "Sort each job to the Patwari, Tehsildar or Police.", Sim: WhoDoesWhat },
      discoveries: [
        { id: "patwari", text: "Patwari: measures land, keeps records, organises revenue" },
        { id: "tehsildar", text: "Tehsildar: hears disputes, supervises Patwaris, issues documents" },
        { id: "police", text: "Police: register and investigate cases in their area" },
      ],
      understand: [
        { title: "Districts and tehsils", body: "States are divided into districts. For land matters, districts are divided further into tehsils or talukas." },
        { title: "The Tehsildar's office", body: "This is where land disputes are heard." },
      ],
      check: [{ id: "cv3", kind: "mcq", q: "Land disputes are heard at the…", options: ["Tehsildar's office", "Post office", "Milk society"], answer: 0, why: "Tehsildars hear land disputes." }],
      connect: [
        { icon: "🏪", title: "Public services", body: "List the public services near you — fair price shop, post office, anganwadi, health centre, bank." },
        { icon: "📝", title: "Survey", body: "Pick one service. What problems do people face? How could it improve?" },
        { icon: "👮", title: "In charge", body: "Find out who is in charge of all the police stations in a district." },
      ],
    },
    {
      id: "need",
      icon: "📄",
      title: "When is the record needed?",
      pages: "53",
      wonder: {
        q: "Is it always easy for farmers to get a copy of their land record?",
        options: [
          { id: "no", label: "No — it's their right, but sometimes hard to get" },
          { id: "yes", label: "Yes, always" },
        ],
        answer: "no",
        reveal: "Farmers have a right to this information (they may pay a small fee), but sometimes face many problems getting it.",
      },
      explore: { activity: "Study the situations", title: "Needs the record?", how: "Sort the situations.", Sim: NeedRecord },
      discoveries: [
        { id: "need", text: "Buying land, taking a loan or dividing property needs the land record" },
        { id: "noneed", text: "Everyday buying and selling doesn't" },
      ],
      understand: [{ title: "A right", body: "Farmers have a right to get a copy of their record together with the map." }],
      check: [{ id: "cv4", kind: "tf", q: "A farmer needs a copy of her land record to get a bank loan to dig a well.", answer: true, why: "The bank needs proof that she owns the land." }],
      connect: [
        { icon: "🏦", title: "Ask a farmer", body: "When did a farmer you know last need their land record?" },
        { icon: "💻", title: "Online", body: "Find out if land records in your state can be seen online." },
        { icon: "📑", title: "Your documents", body: "What documents does your family keep safely at home? Why?" },
      ],
    },
    {
      id: "law",
      icon: "⚖️",
      title: "A new law",
      pages: "53–54",
      wonder: {
        q: "“Father will leave the house to my brother… but what about me and my mother?” What issue does this poem raise?",
        options: [
          { id: "share", label: "Daughters' right to a share in the family's property" },
          { id: "dowry", label: "Wanting more silk and gold" },
        ],
        answer: "share",
        reveal: "The daughter in the poem wants a place of her own, not dowry — a share in her father's home.",
      },
      explore: { activity: "Hindu Succession Amendment Act, 2005", title: "Equal shares", how: "Find out what changed.", Sim: NewLaw },
      discoveries: [
        { id: "before", text: "Earlier, in some states, only sons got the family's farmland" },
        { id: "equal", text: "Now sons, daughters and mothers can get equal shares" },
        { id: "patwari", text: "The Patwari enters the new owners' names in the records" },
      ],
      understand: [{ title: "Benefits for women", body: "Owning land gives women like Sudha's mother the confidence to run the farm, and daughters like Sudha security if they ever have a problem." }],
      check: [{ id: "cv5", kind: "mcq", q: "The Hindu Succession Amendment Act, 2005 applies to…", options: ["All states and union territories", "Only one state", "Only cities"], answer: 0, why: "The same law applies across the country." }],
      connect: [
        { icon: "🏠", title: "Women owners", body: "Do women in your neighbourhood own property? How did they get it?" },
        { icon: "📖", title: "The poem", body: "Do you think the issue in the poem is important? Why?" },
        { icon: "🔗", title: "Connections", body: "How are the Panchayat's work and the Patwari's work related?" },
      ],
    },
  ],
  learnt: [
    "Every police station has an area; the police there register complaints and investigate cases.",
    "The Patwari measures land, keeps land records and organises the collection of land revenue.",
    "Tehsildars, under the District Collector, hear land disputes and supervise Patwaris.",
    "Land records are needed to buy land, take loans or divide property, and farmers have a right to them.",
    "Since 2005, sons, daughters and their mothers can get an equal share of a Hindu family's land.",
  ],
  keywords: ["Police station", "SHO", "Patwari", "Land records", "Khasra", "Land revenue", "Tehsildar", "District Collector", "Hindu Succession Amendment Act"],
};

export default chapter;
