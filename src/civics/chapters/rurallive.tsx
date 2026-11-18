// Civics Chapter 8 · Rural Livelihoods (NCERT Social and Political Life – I, pp. 67–75).
// Wording is original; the people of Kalpattu and Pudupet follow the textbook.
// The debt game and the auction amount use made-up numbers to show an idea.
import { useState } from "react";
import { PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";
import { CompareLab, Figure } from "../kit";

/* Stop 1 · work in Kalpattu: farm and non-farm */
function KalpattuWork({ discover }: SimProps) {
  const items = [
    { id: "transplant", label: "Transplanting paddy", icon: "🌱", bin: "farm", why: "Preparing land, sowing, weeding and harvesting are farm work." },
    { id: "weed", label: "Weeding the fields", icon: "🌿", bin: "farm" },
    { id: "harvest", label: "Harvesting", icon: "🌾", bin: "farm" },
    { id: "spray", label: "Spraying pesticides", icon: "💨", bin: "farm" },
    { id: "smith", label: "Blacksmith's workshop", icon: "🔨", bin: "non", why: "Kalpattu has lots of non-farm work too — crafts, services and shops." },
    { id: "tea", label: "Running a teashop (idli, dosai, vadai)", icon: "☕", bin: "non" },
    { id: "cycle", label: "Cycle hire and repair", icon: "🚲", bin: "non" },
    { id: "wash", label: "Washing clothes", icon: "👕", bin: "non" },
    { id: "craft", label: "Making baskets, pots and bricks", icon: "🧺", bin: "non" },
    { id: "lorry", label: "Driving a lorry in the nearby town", icon: "🚚", bin: "non" },
  ];
  const all = (p: Record<string, string>, b: string) => items.filter((i) => i.bin === b).every((i) => p[i.id]);
  return (
    <SortLab
      discover={discover}
      intro="Kalpattu is a village near the sea coast in Tamil Nadu. People here do many kinds of work. Is each job farm or non-farm work?"
      bins={[
        { id: "farm", label: "Farm work", icon: "🌾", color: "#9fd27a" },
        { id: "non", label: "Non-farm work", icon: "🔧", color: "#7fb8ff" },
      ]}
      items={items}
      rules={[
        { id: "farm", when: (p) => all(p, "farm") },
        { id: "nonfarm", when: (p) => all(p, "non") },
      ]}
    />
  );
}

/* Stop 2 · three lives in Kalpattu */
function ThreeLives({ discover }: SimProps) {
  return (
    <CompareLab
      discover={discover}
      intro="Meet three people who depend on farming in Kalpattu. Pick a person, then tap each question to fill the table."
      people={[
        { id: "thulasi", name: "Thulasi", icon: "👩", tag: "Agricultural labourer" },
        { id: "sekar", name: "Sekar", icon: "👨", tag: "Small farmer" },
        { id: "ram", name: "Ramalingam", icon: "🧔", tag: "Large farmer" },
      ]}
      rows={[
        { id: "land", label: "Land", icon: "🌾" },
        { id: "labour", label: "Who works it", icon: "💪" },
        { id: "loan", label: "Loans", icon: "🏦" },
        { id: "sell", label: "Selling harvest", icon: "🧺" },
        { id: "other", label: "Other work", icon: "🔧" },
      ]}
      cells={{
        thulasi: {
          land: { short: "None", long: "Thulasi and her husband Raman don't own any land." },
          labour: { short: "Works for others", long: "She transplants, weeds and harvests on Ramalingam's fields, 8.30 to 4.30, for Rs 40 a day — but only at certain times of the year." },
          loan: { short: "From Ramalingam", long: "When one of her daughters fell ill, they borrowed from Ramalingam and had to sell their cow to pay it back." },
          sell: { short: "No harvest", long: "She owns no land, so she has no harvest of her own to sell." },
          other: { short: "Housework, firewood, water", long: "She cooks, cleans and washes, collects firewood from the forest and fetches water from a borewell a kilometre away. Raman loads sand or stone when there's no farm work." },
        },
        sekar: {
          land: { short: "2 acres", long: "Sekar owns only two acres." },
          labour: { short: "His family", long: "His family does the work. At harvest he swaps help with other small farmers." },
          loan: { short: "From a trader", long: "The trader gave him seeds and fertiliser as a loan." },
          sell: { short: "To the trader, cheaper", long: "To repay, he must sell his paddy to the trader at a somewhat lower price than the market. What's left lasts his family only about eight months." },
          other: { short: "Rice mill, milk", long: "He works in Ramalingam's rice mill, and sells milk from his hybrid cow to the local milk cooperative." },
        },
        ram: {
          land: { short: "20 acres", long: "Ramalingam has twenty acres of paddy fields." },
          labour: { short: "Hired labourers", long: "Labourers like Thulasi work his fields, supervised by his wife Karuthamma." },
          loan: { short: "Government bank", long: "For the rice mill, his family used some of their own money and borrowed from the government bank." },
          sell: { short: "Rice to town traders", long: "His mill buys paddy from the village and nearby villages, and sells rice to traders in nearby towns." },
          other: { short: "Rice mill, shop", long: "His family owns a rice mill and a shop selling seeds and pesticides. This gives them a substantial income." },
        },
      }}
      rules={[
        { id: "landless", need: [["thulasi", "land"], ["thulasi", "labour"]] },
        { id: "small", need: [["sekar", "land"], ["sekar", "sell"]] },
        { id: "large", need: [["ram", "land"], ["ram", "other"]] },
        { id: "loans", need: [["thulasi", "loan"], ["sekar", "loan"], ["ram", "loan"]] },
      ]}
      art={(who) => (
        <svg viewBox="0 0 520 110" className="mt-3 block h-auto w-full select-none">
          <rect width="520" height="110" fill="#bfe3ff" />
          <rect y="60" width="520" height="50" fill={who === "ram" ? "#6fbf5a" : who === "sekar" ? "#8fd07a" : "#a8c98a"} />
          {Array.from({ length: who === "ram" ? 20 : who === "sekar" ? 2 : 0 }, (_, i) => (
            <rect key={i} x={10 + i * 25} y="66" width="20" height="36" rx="3" fill="#4f9a3f" />
          ))}
          {who === "thulasi" && (
            <text x="260" y="92" fontSize="13" fontWeight="900" fill="#3a2414" textAnchor="middle">
              No land of her own
            </text>
          )}
          <Figure x={who === "thulasi" ? 120 : 470} y={104} s={0.8} shirt={who === "thulasi" ? "#ff8a5b" : who === "sekar" ? "#7fb8ff" : "#ffd257"} long={who === "thulasi"} />
          <text x="510" y="20" fontSize="10" fontWeight="900" fill="#13112b" textAnchor="end">
            {who === "ram" ? "▮ = 1 acre · 20 acres" : who === "sekar" ? "▮ = 1 acre · 2 acres" : ""}
          </text>
        </svg>
      )}
    />
  );
}

/* Stop 3 · how a loan becomes debt (made-up units) */
function DebtTrap({ discover }: SimProps) {
  const [debt, setDebt] = useState(0);
  const [seasons, setSeasons] = useState<("good" | "poor")[]>([]);
  const [msg, setMsg] = useState("A small farmer borrows each season to buy seeds, fertiliser and pesticides. Play some seasons — choose the monsoon.");
  function play(rain: "good" | "poor") {
    let d = debt + 2; // borrow for inputs
    if (rain === "good") {
      d = Math.max(0, d - 2);
      setMsg("A good monsoon and a good crop: the farmer repays this season's loan.");
    } else {
      d = d + 1;
      setMsg("The monsoon didn't bring enough rain and the crop was ruined. The farmer can't repay, and borrows even more for the family to survive.");
      discover("fail");
    }
    discover("borrow");
    setDebt(d);
    setSeasons([...seasons, rain]);
    if (d >= 6) {
      setMsg("Now the loan is so large that no matter what the farmer earns, it can't be repaid. This is being caught in debt — a major cause of distress among farmers.");
      discover("trap");
    }
  }
  return (
    <Stage caption={msg}>
      <svg viewBox="0 0 520 170" className="block h-auto w-full select-none">
        <rect width="520" height="170" fill="#1a1838" />
        <Figure x={70} y={150} s={1} shirt="#7fb8ff" />
        {seasons.slice(-8).map((s, i) => (
          <text key={i} x={140 + i * 30} y="40" fontSize="20">
            {s === "good" ? "🌾" : "🥀"}
          </text>
        ))}
        <text x="140" y="70" fontSize="11" fontWeight="900" fill="#c9cbe0">
          Seasons played: {seasons.length}
        </text>
        {Array.from({ length: Math.min(debt, 12) }, (_, i) => (
          <rect key={i} x={360} y={150 - (i + 1) * 11} width="120" height="9" rx="2" fill={debt >= 6 ? "#ff6b6b" : "#ffb46b"} />
        ))}
        <text x="420" y="164" fontSize="11" fontWeight="900" fill="#fff" textAnchor="middle">
          Debt: {debt} units
        </text>
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn onClick={() => play("good")}>🌧 Good monsoon</Btn>
        <Btn onClick={() => play("poor")}>☀️ Poor monsoon</Btn>
        <Btn onClick={() => (setDebt(0), setSeasons([]))}>↺ Start over</Btn>
      </div>
      <p className="px-4 pb-3 text-[11px] font-bold text-white/40">Units are made up to show the idea.</p>
    </Stage>
  );
}

/* Stop 4 · Aruna and Paarivelan's fishing family */
function ShareCatch({ discover }: SimProps) {
  const [money, setMoney] = useState(1200);
  const [monsoon, setMonsoon] = useState(false);
  const [engine, setEngine] = useState(false);
  const share = Math.round(money / 4);
  return (
    <Stage
      caption={
        monsoon
          ? "For about four months in the monsoon, they can't go to sea — that's when fish breed. They survive by borrowing from a trader, and later must sell their fish to that trader instead of auctioning it. Those lean months are the hardest."
          : engine
            ? "They took a bank loan to buy an engine for the catamaran. Now they can go far out to sea for a better catch."
            : "At 7 a.m. the catamarans come back. Aruna keeps some fish for the family and auctions the rest. The money is split into four shares. Move the slider."
      }
    >
      <svg viewBox="0 0 520 180" className="block h-auto w-full select-none">
        <rect width="520" height="180" fill={monsoon ? "#4a5a6a" : "#bfe3ff"} />
        <rect y="70" width="520" height="60" fill={monsoon ? "#2c4a66" : "#2f89c9"} />
        <rect y="130" width="520" height="50" fill="#e8d6a6" />
        {monsoon ? (
          <text x="260" y="50" fontSize="28" textAnchor="middle">
            🌧🌧🌧
          </text>
        ) : (
          <text x={engine ? 420 : 300} y="100" fontSize="30">
            🛶
          </text>
        )}
        {!monsoon && engine && (
          <text x="380" y="102" fontSize="14">
            〰
          </text>
        )}
        <Figure x={60} y={170} shirt="#ff8a5b" long />
        <text x="90" y="150" fontSize="22">🐟🐟</text>
        {!monsoon &&
          ["Paarivelan", "Brother", "Brother-in-law", "Equipment"].map((w, i) => (
            <g key={w}>
              <rect x={170 + i * 86} y="140" width="80" height="34" rx="8" fill={i === 3 ? "#ffd257" : "#ffffffcc"} />
              <text x={210 + i * 86} y="154" fontSize="9" fontWeight="900" fill="#13112b" textAnchor="middle">
                {w}
              </text>
              <text x={210 + i * 86} y="168" fontSize="11" fontWeight="900" fill="#13112b" textAnchor="middle">
                Rs {share}
              </text>
            </g>
          ))}
      </svg>
      <div className="border-t border-white/10 px-4 py-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-white/50">Money from the auction (made up)</label>
        <input
          aria-label="Auction money"
          type="range"
          min="400"
          max="2400"
          step="100"
          value={money}
          onChange={(e) => {
            setMoney(+e.target.value);
            discover("share");
          }}
          className="mt-2 w-full accent-[#2f89c9]"
        />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Readout label="Each share" value={`Rs ${share}`} />
          <Readout label="Aruna's family gets" value={`Rs ${share * 2}`} color="#5fe0a0" />
        </div>
        <p className="mt-2 text-xs font-semibold text-white/60">One share each for the three men who went fishing, and one for the equipment. Aruna's family owns the catamaran, engine and nets, so it gets that share too.</p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn
          on={engine}
          onClick={() => {
            setEngine(true);
            setMonsoon(false);
            discover("engine");
          }}
        >
          🏦 Bank loan for an engine
        </Btn>
        <Btn
          on={monsoon}
          onClick={() => {
            setMonsoon(!monsoon);
            discover("monsoon");
          }}
        >
          🌧 Monsoon months
        </Btn>
      </div>
    </Stage>
  );
}

/* Stop 5 · other ways of earning in rural India */
function OtherLivelihoods({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Apart from farming, many rural people depend on forests, animals, dairy and fishing."
      cases={[
        { id: "terrace", icon: "⛰", prompt: "In Chizami village in Nagaland, the Chakhesang people cut a hill slope into flat steps with raised edges. Why?", options: ["So water stands in the fields — best for rice", "To build roads", "To stop all farming"], answer: 0, explain: "This is terrace cultivation. Families have their own fields but also work together in groups of six or eight, clearing whole mountainsides and eating together after work.", disc: "terrace" },
        { id: "forest", icon: "🍯", prompt: "In some villages in central India, people earn extra by collecting from the forest. What might they collect?", options: ["Mahua, tendu leaves and honey", "Pashmina wool", "Fish"], answer: 0, explain: "Collecting mahua, tendu leaves and honey to sell to traders is an important source of extra income alongside farming.", disc: "forest" },
        { id: "dairy", icon: "🥛", prompt: "For some families, the main way to earn a living is…", options: ["Selling milk to the village cooperative or in town", "Only growing paddy", "Working in a call centre"], answer: 0, explain: "Selling milk to the village cooperative society, or taking it to a nearby town, can be a family's main livelihood.", disc: "dairy" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "crurallive",
  subject: "Civics",
  n: 8,
  title: "Rural Livelihoods",
  pages: "67–75",
  icon: "🌾",
  theme: { grad: "linear-gradient(135deg,#1f2a0a 0%,#5a8a1f 55%,#ffd36b 130%)", accent: "#4f7a18", soft: "#eef5dc", ink: "#334f0f" },
  opening: "In a village near the coast, some people transplant paddy, some run teashops, some go out to sea. How do people in villages earn a living — and do they all get equal chances?",
  stops: [
    {
      id: "kalpattu",
      icon: "🏘",
      title: "Work in Kalpattu",
      pages: "67–68",
      wonder: {
        q: "In a village, does everyone work on farms?",
        options: [
          { id: "no", label: "No — there's lots of non-farm work too" },
          { id: "yes", label: "Yes, everyone farms" },
        ],
        answer: "no",
        reveal: "No! Kalpattu has blacksmiths, nurses, teachers, washermen, weavers, barbers, shopkeepers, traders and more. But most families earn through agriculture.",
      },
      explore: { activity: "Kalpattu village", title: "Farm or non-farm?", how: "Sort the work people do in Kalpattu.", Sim: KalpattuWork },
      discoveries: [
        { id: "farm", text: "Farm work: preparing land, sowing, weeding, harvesting" },
        { id: "nonfarm", text: "Non-farm work: crafts, services, shops and town jobs" },
      ],
      understand: [
        { title: "Kalpattu", body: "Paddy is the main crop on irrigated land. There are also coconut groves, cotton, sugar cane, plantain and mango orchards, all surrounded by low hills." },
        { title: "The bazaar", body: "The main street has teashops, grocery and barber shops, a cloth shop, a tailor and two fertiliser and seed shops." },
      ],
      check: [{ id: "cl1", kind: "mcq", q: "Which of these is non-farm work?", options: ["Repairing cycles", "Weeding", "Harvesting"], answer: 0, why: "It's a service, not work on the fields." }],
      connect: [
        { icon: "✏️", title: "Draw it", body: "Draw some work you've seen people do in rural areas, and describe it." },
        { icon: "🌾", title: "Your region", body: "Which crops are grown in your region or nearby?" },
        { icon: "☕", title: "Teashop menu", body: "Kalpattu's teashops serve idli, dosai and upama in the morning. What's served near you?" },
      ],
    },
    {
      id: "lives",
      icon: "👥",
      title: "Three lives",
      pages: "68–72",
      wonder: {
        q: "Does Thulasi, who works on other people's fields, find work all year round?",
        options: [
          { id: "no", label: "No — only at certain times of the year" },
          { id: "yes", label: "Yes, every day" },
        ],
        answer: "no",
        reveal: "Only at certain times — transplanting, weeding and harvesting. Not earning all year forces many rural people to migrate for work in some seasons.",
      },
      explore: { activity: "Thulasi, Sekar, Ramalingam", title: "Compare their lives", how: "Fill in the table for all three.", Sim: ThreeLives },
      discoveries: [
        { id: "landless", text: "Landless labourers work on others' fields for low wages" },
        { id: "small", text: "Small farmers' land barely meets their needs" },
        { id: "large", text: "Large farmers also earn from mills, shops and trade" },
        { id: "loans", text: "Everyone borrows — but on very different terms" },
      ],
      understand: [
        { title: "Across India", body: "Nearly two out of every five rural families are agricultural labourer families." },
        { title: "Small and large", body: "80 per cent of India's farmers are small farmers like Sekar. Only 20 per cent are like Ramalingam — but large farmers cultivate most of the village land." },
        { title: "Inequality", body: "Thulasi often lacks good medical care and schools. The difference between her life and Ramalingam's is one of inequality." },
      ],
      check: [{ id: "cl2", kind: "mcq", q: "About what share of India's farmers are small farmers?", options: ["80 per cent", "20 per cent", "5 per cent"], answer: 0, why: "Most farmers are small farmers, whose land barely meets their needs." }],
      connect: [
        { icon: "⚖️", title: "Is it fair?", body: "Do you think the difference between Thulasi and Ramalingam is fair? What could be done?" },
        { icon: "🌾", title: "If Thulasi owned land", body: "How would her life be different if she owned some farmland?" },
        { icon: "🧳", title: "Migration", body: "Why do some people travel far for work in certain seasons?" },
      ],
    },
    {
      id: "debt",
      icon: "🏦",
      title: "Caught in debt",
      pages: "70–71",
      wonder: {
        q: "Why do small farmers often need to borrow money?",
        options: [
          { id: "inputs", label: "To buy seeds, fertilisers and pesticides" },
          { id: "fun", label: "To go on holiday" },
        ],
        answer: "inputs",
        reveal: "To buy basic things for farming — often from moneylenders or traders.",
      },
      explore: { activity: "On being in debt", title: "The debt game", how: "Play season after season. See what poor monsoons do.", Sim: DebtTrap },
      discoveries: [
        { id: "borrow", text: "Farmers borrow every season for seeds and fertiliser" },
        { id: "fail", text: "Poor seeds, pests or a weak monsoon can ruin the crop" },
        { id: "trap", text: "Borrowing more and more can trap farmers in debt" },
      ],
      understand: [
        { title: "Caught in debt", body: "When crops fail, farmers can't repay and must borrow more. Soon the loan is so large they can't repay it whatever they earn." },
        { title: "Distress", body: "In recent years debt has become a major cause of distress among farmers." },
      ],
      check: [{ id: "cl3", kind: "tf", q: "If the monsoon doesn't bring enough rain, crops can be ruined and farmers may fall into debt.", answer: true, why: "Farming depends on nature." }],
      connect: [
        { icon: "🏛", title: "Government help", body: "What could the government do to help farmers like Sekar when they get into debt?" },
        { icon: "💬", title: "Mina and the agent", body: "Sekar's sister Mina wants to repay the trader in money, not paddy. Write their conversation." },
        { icon: "🌧", title: "Rain and food", body: "How does a good monsoon affect the food on your plate?" },
      ],
    },
    {
      id: "fishing",
      icon: "🐟",
      title: "A fishing family",
      pages: "73–74",
      wonder: {
        q: "What time do Paarivelan and his relatives set out to sea?",
        options: [
          { id: "two", label: "Around 2 in the morning" },
          { id: "noon", label: "At noon" },
          { id: "evening", label: "In the evening" },
        ],
        answer: "two",
        reveal: "Around 2 a.m. They return at about 7 a.m., and in the evening untangle and repair their nets.",
      },
      explore: { activity: "Aruna and Paarivelan, Pudupet", title: "Share the catch", how: "Move the slider to share the auction money, then see the engine loan and the monsoon months.", Sim: ShareCatch },
      discoveries: [
        { id: "share", text: "Auction money is shared: one share each, plus one for equipment" },
        { id: "engine", text: "A bank loan for an engine lets them fish farther out" },
        { id: "monsoon", text: "In the monsoon they can't fish and must borrow from traders" },
      ],
      understand: [
        { title: "Selling fish", body: "Women buy fish on the beach and carry them in baskets to nearby villages. Traders buy for shops in town." },
        { title: "The tsunami", body: "The year before, fishing families like Aruna's suffered a lot because of the tsunami." },
      ],
      check: [{ id: "cl4", kind: "mcq", q: "Why can't they fish for about four months in the monsoon?", options: ["It's when the fish breed", "The sea dries up", "It's a holiday"], answer: 0, why: "During the breeding months they can't go to sea." }],
      connect: [
        { icon: "🌊", title: "Tsunami", body: "What is a tsunami? What damage might it do to a fishing family's life?" },
        { icon: "🤔", title: "Loan or not?", body: "You're in a fishing family deciding whether to take a bank loan for an engine. What would you say?" },
        { icon: "🔁", title: "Compare", body: "Why do both Sekar's and Aruna's families borrow? What's similar and different?" },
      ],
    },
    {
      id: "other",
      icon: "⛰",
      title: "Other livelihoods",
      pages: "72–74",
      wonder: {
        q: "Do rural people in different regions face similar problems, even if they grow different crops?",
        options: [
          { id: "yes", label: "Yes — many face similar life situations" },
          { id: "no", label: "No, nothing in common" },
        ],
        answer: "yes",
        reveal: "Yes. Most small farmers, labourers, fishing families and craftspersons don't find enough work all year round.",
      },
      explore: { activity: "Across rural India", title: "Ways of earning", how: "Solve the puzzles.", Sim: OtherLivelihoods },
      discoveries: [
        { id: "terrace", text: "Terrace farming on hill slopes in Nagaland" },
        { id: "forest", text: "Forest collection: mahua, tendu leaves and honey" },
        { id: "dairy", text: "Selling milk can be a family's main livelihood" },
      ],
      understand: [
        { title: "Seasons", body: "Farming depends on nature, so life revolves around seasons — busy at sowing and harvest, less so in between." },
        { title: "Borrowing", body: "Many families need to borrow money for their work, or when no work is available." },
      ],
      check: [{ id: "cl5", kind: "mcq", q: "Terrace cultivation is done on…", options: ["Hill slopes cut into steps", "Flat coastal sand", "City rooftops"], answer: 0, why: "The steps hold water, which is best for rice." }],
      connect: [
        { icon: "🤝", title: "Working together", body: "Chizami villagers clear each other's fields in groups. Where do people work together near you?" },
        { icon: "🍯", title: "From the forest", body: "What things from forests do you use at home?" },
        { icon: "🥛", title: "Milk", body: "Where does your family's milk come from?" },
      ],
    },
  ],
  learnt: [
    "People in villages do farm work and many kinds of non-farm work.",
    "Landless labourers like Thulasi, small farmers like Sekar and large farmers like Ramalingam live very unequal lives.",
    "Nearly two in five rural families are agricultural labourers; 80% of farmers are small farmers.",
    "Crop failure can trap farmers in debt; fishing families also borrow in lean months.",
    "Rural people also live by terrace farming, forest collection, dairy and fishing.",
  ],
  keywords: ["Livelihood", "Agricultural labourer", "Small farmer", "Large farmer", "Debt", "Moneylender", "Migration", "Catamaran", "Auction", "Terrace farming"],
};

export default chapter;
