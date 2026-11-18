// Civics Chapter 7 · Urban Administration (NCERT Social and Political Life – I, pp. 57–64).
// Wording is original; the story of Yasmin Khala and Gangabai follows the textbook. Pictures are original.
import { useState } from "react";
import { ExploreLab, OrderLab, PickLab } from "../../science/kit";
import type { Case } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Stage } from "../../science/ui";
import { Bldg, Figure } from "../kit";

/* Stop 1 · who looks after the city? */
function CityArt() {
  return (
    <g>
      <rect width="520" height="300" fill="#cfe6f7" />
      <rect y="110" width="520" height="190" fill="#d8d2c4" />
      <rect y="190" width="520" height="36" fill="#6b6b78" />
      <path d="M0 208 H520" stroke="#fff" strokeWidth="2" strokeDasharray="14 10" />
      <Bldg x={20} y={120} w={80} h={56} color="#ffe08a" icon="🏫" label="School" />
      <Bldg x={120} y={120} w={80} h={56} color="#fff" icon="🏥" label="Dispensary" roof="#d94848" />
      <Bldg x={330} y={125} w={160} h={50} color="#f4b1c2" icon="🛒" label="Market" roof="#a8475a" />
      {/* street light, broken */}
      <line x1="250" y1="190" x2="250" y2="110" stroke="#3b3550" strokeWidth="4" />
      <path d="M250 110 Q265 104 272 112" stroke="#3b3550" strokeWidth="4" fill="none" />
      <circle cx="272" cy="116" r="6" fill="#9da3c7" />
      <text x="290" y="120" fontSize="12">💥</text>
      {/* garbage heap */}
      <path d="M40 260 Q70 232 100 260 Z" fill="#8a7a5a" />
      <text x="56" y="254" fontSize="16">🗑</text>
      {/* water pipe */}
      <rect x="150" y="262" width="160" height="10" rx="5" fill="#4fa3d8" />
      <text x="316" y="274" fontSize="16">🚰</text>
      {/* garden */}
      <rect x="380" y="236" width="130" height="56" rx="10" fill="#7fc27a" />
      <text x="400" y="272" fontSize="22">🌳🌷🌳</text>
      {/* malaria board */}
      <rect x="210" y="228" width="70" height="28" rx="4" fill="#fff" stroke="#c4552b" strokeWidth="2" />
      <text x="245" y="246" fontSize="9" fontWeight="900" fill="#c4552b" textAnchor="middle">
        🦟 MALARIA
      </text>
      <Figure x={180} y={204} s={0.6} shirt="#5fe0a0" child />
      <Figure x={200} y={204} s={0.6} shirt="#ff8a5b" child long />
      <text x="214" y="168" fontSize="16">🏏</text>
    </g>
  );
}
function WhoLooksAfter({ discover }: SimProps) {
  return (
    <ExploreLab
      viewBox="0 0 520 300"
      art={<CityArt />}
      intro="Rehana's shot broke a street light! Who replaces it? Tap around the city to find out who looks after it."
      spots={[
        { id: "light", label: "Street light", x: 272, y: 116, text: "Street lights are looked after by the Municipal Corporation — no one person to pay. In smaller towns it's called a Municipal Council." },
        { id: "garbage", label: "Garbage", x: 70, y: 248, text: "It collects garbage. Uncollected garbage attracts dogs, rats and flies, and makes people ill." },
        { id: "water", label: "Water supply", x: 230, y: 266, text: "It supplies water to the city." },
        { id: "market", label: "Market", x: 410, y: 150, text: "It keeps the streets and markets clean." },
        { id: "malaria", label: "Malaria sign", x: 245, y: 242, text: "It makes sure diseases do not break out — like putting up signs about malaria." },
        { id: "dispensary", label: "Dispensary", x: 160, y: 150, text: "It runs hospitals and dispensaries." },
        { id: "school", label: "School", x: 60, y: 150, text: "It runs schools." },
        { id: "garden", label: "Garden", x: 445, y: 262, text: "It makes gardens and maintains them." },
      ]}
      groups={{ basic: ["light", "garbage", "water", "market"], health: ["malaria", "dispensary"], more: ["school", "garden"] }}
      discover={discover}
    />
  );
}

/* Stop 2 · wards, councillors and the Commissioner */
const WARDS = [
  "M20 20 H180 V120 H20 Z",
  "M180 20 H340 V120 H180 Z",
  "M340 20 H500 V120 H340 Z",
  "M20 120 H180 V220 H20 Z",
  "M180 120 H340 V220 H180 Z",
  "M340 120 H500 V220 H340 Z",
];
function WardArt({ c, solved }: { c: Case; solved: boolean }) {
  const focus = c.id;
  return (
    <svg viewBox="0 0 520 240" className="block h-auto w-full select-none">
      <rect width="520" height="240" fill="#1a1838" />
      {WARDS.map((d, i) => (
        <path key={i} d={d} fill={focus === "wires" && i === 4 ? "#ffd257" : focus === "bus" || focus === "budget" ? "#7fb8ff33" : "#ffffff10"} stroke="#ffffff55" strokeWidth="2" />
      ))}
      {WARDS.map((_, i) => (
        <text key={i} x={100 + (i % 3) * 160} y={40 + Math.floor(i / 3) * 100} fontSize="10" fontWeight="900" fill="#c9cbe0" textAnchor="middle">
          Ward {i + 1}
        </text>
      ))}
      {WARDS.map((_, i) => (
        <Figure key={i} x={100 + (i % 3) * 160} y={105 + Math.floor(i / 3) * 100} s={0.6} shirt={focus === "elected" || (focus === "wires" && i === 4) || focus === "bus" || focus === "budget" ? "#5fe0a0" : "#8e8aa8"} long={i % 2 === 1} />
      ))}
      {focus === "wires" && <text x="290" y="180" fontSize="22">⚡</text>}
      {(focus === "staff" || focus === "elected") && (
        <g>
          <rect x="420" y="190" width="90" height="44" rx="8" fill={focus === "staff" ? "#ffd257" : "#ffffff22"} />
          <text x="465" y="208" fontSize="10" fontWeight="900" fill={focus === "staff" ? "#13112b" : "#fff"} textAnchor="middle">
            Commissioner
          </text>
          <text x="465" y="224" fontSize="9" fontWeight="800" fill={focus === "staff" ? "#3b3550" : "#c9cbe0"} textAnchor="middle">
            + staff (appointed)
          </text>
        </g>
      )}
      {(focus === "bus" || focus === "budget") && solved && (
        <text x="260" y="234" fontSize="11" fontWeight="900" fill="#7fb8ff" textAnchor="middle">
          {focus === "bus" ? "Councillors' committee decides for the whole city" : "All councillors meet and make the budget"}
        </text>
      )}
    </svg>
  );
}
function Councillors({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      art={(c, solved) => <WardArt c={c} solved={solved} />}
      intro="The city is divided into wards. Each ward elects a councillor. Solve each problem."
      cases={[
        { id: "wires", icon: "⚡", prompt: "Dangerous electrical wires are hanging down in your ward. Whom can you contact?", options: ["Your Ward Councillor", "The Gram Sabha", "The Patwari"], answer: 0, explain: "For problems within a ward, people contact their councillor — who can help them reach the electricity authority.", disc: "ward" },
        { id: "bus", icon: "🚌", prompt: "Bus stands across the whole city need improving. Who decides?", options: ["A committee of councillors", "One shopkeeper", "The school principal"], answer: 0, explain: "Big decisions affecting the whole city are taken by groups of councillors who form committees — for water, garbage, street lighting and more.", disc: "committee" },
        { id: "staff", icon: "🏢", prompt: "Once councillors decide, who carries out the work?", options: ["The Commissioner and the administrative staff", "The councillors themselves", "Nobody"], answer: 0, explain: "Councillors decide; the Commissioner and the staff implement those decisions.", disc: "staff" },
        { id: "elected", icon: "🗳", prompt: "Which of these are elected?", options: ["Councillors", "The Commissioner", "The administrative staff"], answer: 0, explain: "Councillors are elected. The Commissioner and the staff are appointed.", disc: "staff" },
        { id: "budget", icon: "📒", prompt: "How is it decided how the city's money will be spent?", options: ["All the Ward Councillors meet and make a budget", "The Commissioner spends as he likes", "Money is never spent"], answer: 0, explain: "Councillors try to make sure their ward's needs are placed before the whole council. Then the staff carry out the decisions.", disc: "budget" },
      ]}
    />
  );
}

/* Stop 3 · how does the Municipal Corporation get its money? */
const SOURCES = [
  { id: "property", label: "Property tax", icon: "🏠", text: "People who own homes pay property tax — the larger the house, the more the tax. But property tax is only about 25–30% of the Corporation's money." },
  { id: "water", label: "Water and service taxes", icon: "🚰", text: "Home owners also pay taxes for water and other services." },
  { id: "edu", label: "Education and amenities taxes", icon: "🎓", text: "There are taxes for education and other amenities too." },
  { id: "shop", label: "Shop and hotel tax", icon: "🏨", text: "If you own a shop or a hotel, you pay a tax for it." },
  { id: "movie", label: "Tax on movie tickets", icon: "🎬", text: "Look at your movie ticket next time — part of the price is a tax!" },
];
function CityPurse({ discover }: SimProps) {
  const [got, setGot] = useState<string[]>([]);
  const [last, setLast] = useState<string | null>(null);
  function add(id: string) {
    const g = [...new Set([...got, id])];
    setGot(g);
    setLast(id);
    discover("tax");
    if (id === "property") discover("property");
    if (SOURCES.every((s) => g.includes(s.id))) discover("wider");
  }
  const others = got.filter((g) => g !== "property").length;
  const src = SOURCES.find((s) => s.id === last);
  return (
    <Stage
      caption={
        got.length === SOURCES.length
          ? "So while richer people pay property taxes, a much wider population pays the more general taxes. Taxes pay for roads, bridges, parks and street lights."
          : src
            ? src.text
            : "A tax is money people pay to the government for the services it provides. Tap each source to fill the Corporation's purse."
      }
    >
      <svg viewBox="0 0 520 150" className="block h-auto w-full select-none">
        <rect width="520" height="150" fill="#1a1838" />
        <text x="20" y="34" fontSize="13" fontWeight="900" fill="#fff">
          🏛 Municipal Corporation's money
        </text>
        <rect x="20" y="50" width="480" height="40" rx="10" fill="#ffffff14" />
        {got.includes("property") && <rect x="20" y="50" width={480 * 0.28} height="40" rx="10" fill="#ffd257" />}
        {got.includes("property") && (
          <text x={20 + 240 * 0.28} y="75" fontSize="11" fontWeight="900" fill="#13112b" textAnchor="middle">
            Property 25–30%
          </text>
        )}
        {others > 0 && <rect x={20 + 480 * 0.28} y="50" width={((480 * 0.72) / 4) * others} height="40" fill="#5fe0a0" />}
        {others > 0 && (
          <text x={20 + 480 * 0.28 + ((480 * 0.72) / 8) * others} y="75" fontSize="11" fontWeight="900" fill="#13112b" textAnchor="middle">
            Other taxes
          </text>
        )}
        {got.map((g, i) => (
          <text key={g} x={30 + i * 40} y="126" fontSize="24">
            {SOURCES.find((s) => s.id === g)!.icon}
          </text>
        ))}
        <text x="500" y="142" fontSize="9" fontWeight="800" fill="#9da3c7" textAnchor="end">
          Bar is a rough picture; only the property share comes from the textbook
        </text>
      </svg>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3">
        {SOURCES.map((s) => (
          <Btn key={s.id} on={got.includes(s.id)} onClick={() => add(s.id)}>
            {s.icon} {s.label}
          </Btn>
        ))}
      </div>
    </Stage>
  );
}

/* Stop 4 · Gangabai's community protest */
function Gangabai({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="Yasmin Khala tells the children how her neighbourhood got its garbage collected. Put the events in order."
      steps={[
        { id: "pile", label: "Garbage piles up in the streets", icon: "🗑", detail: "It was so bad that children stopped playing cricket in the street — parents feared they'd fall ill." },
        { id: "house", label: "Gangabai's group protests at the Ward Councillor's house", icon: "📣", detail: "Gangabai said they should go to the Ward Councillor, since they had elected him. He came out and listened." },
        { id: "petition", label: "Children collect signatures for a petition", icon: "✍️", detail: "The councillor asked for a petition signed by all the adults. Children ran from house to house." },
        { id: "office", label: "They meet the Commissioner with the sanitation engineer", icon: "🏢", detail: "A large group of women, the councillor and the sanitation engineer went to the Corporation office." },
        { id: "trucks", label: "“You have trucks for the rich localities!”", icon: "🚛", detail: "The Commissioner said there weren't enough trucks. Gangabai pointed out there seemed to be enough for the rich localities. He promised action." },
        { id: "regular", label: "After a bigger protest, collection becomes regular", icon: "✅", detail: "It wasn't done in two days — but after a larger, noisier protest, garbage collection in the locality became more regular." },
      ]}
      milestones={[
        { id: "elected", at: 2 },
        { id: "petition", at: 3 },
        { id: "equal", at: 5 },
        { id: "result", at: 6 },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "curban",
  subject: "Civics",
  n: 7,
  title: "Urban Administration",
  pages: "57–64",
  icon: "🏙",
  theme: { grad: "linear-gradient(135deg,#101a33 0%,#3a5aa8 55%,#ff9b6b 130%)", accent: "#3a5aa8", soft: "#e6ecfa", ink: "#22366b" },
  opening: "One lazy Sunday, Rehana's big hit broke a street light! Who owns the lights on the streets — and who will replace them?",
  stops: [
    {
      id: "city",
      icon: "💡",
      title: "Who runs the city?",
      pages: "57–58",
      wonder: {
        q: "To whom should the children pay for the broken street light?",
        options: [
          { id: "none", label: "No one person — a big organisation looks after it" },
          { id: "neighbour", label: "The nearest neighbour" },
          { id: "shop", label: "The light-bulb shop" },
        ],
        answer: "none",
        reveal: "There's no one person. The Municipal Corporation looks after the city's street lights.",
      },
      explore: { activity: "Pune city", title: "Around the city", how: "Tap each part of the city to see who looks after it.", Sim: WhoLooksAfter },
      discoveries: [
        { id: "basic", text: "Street lights, garbage, water and clean streets: the Municipal Corporation" },
        { id: "health", text: "It also stops diseases and runs dispensaries" },
        { id: "more", text: "It runs schools and maintains gardens" },
      ],
      understand: [
        { title: "Corporation or Council", body: "A big city like Pune has a Municipal Corporation. Smaller towns have a Municipal Council." },
        { title: "Departments", body: "The work is divided into departments — water, garbage collection, gardens, roads. Yasmin Khala worked in accounts in the sanitation department." },
      ],
      check: [{ id: "cu1", kind: "mcq", q: "In a small town, the body that looks after street lights and garbage is the…", options: ["Municipal Council", "Gram Sabha", "Zila Parishad"], answer: 0, why: "Smaller towns have a Municipal Council; big cities a Municipal Corporation." }],
      connect: [
        { icon: "🔦", title: "Your street", body: "Who would you contact if a street light near you broke?" },
        { icon: "🏢", title: "Departments", body: "List four tasks the municipality does in your town." },
        { icon: "♻️", title: "Kabadi wallah", body: "Kabadi wallahs have long recycled paper, metal, glass and plastic — even your old notebooks!" },
      ],
    },
    {
      id: "ward",
      icon: "🗳",
      title: "Wards and councillors",
      pages: "58–59",
      wonder: {
        q: "Who decides where a new park or hospital should go?",
        options: [
          { id: "councillors", label: "Usually the Ward Councillors" },
          { id: "accounts", label: "The accounts office" },
        ],
        answer: "councillors",
        reveal: "Decisions like these are usually made by the elected Ward Councillors.",
      },
      explore: { activity: "The ward councillor and staff", title: "City problems", how: "Solve each problem and see who handles it.", Sim: Councillors },
      discoveries: [
        { id: "ward", text: "For a problem in your ward, contact your councillor" },
        { id: "committee", text: "Committees of councillors decide city-wide issues" },
        { id: "staff", text: "Councillors are elected; the Commissioner and staff are appointed and implement" },
        { id: "budget", text: "Councillors make a budget for how money is spent" },
      ],
      understand: [
        { title: "Panchayat and city", body: "In a panchayat the elected members are Panchs; in a municipal corporation they are councillors. Both are elected every five years." },
      ],
      check: [
        { id: "cu2", kind: "mcq", q: "A city is divided into several…", options: ["Wards", "Tehsils", "Gram Sabhas"], answer: 0, why: "Each ward elects a councillor." },
        { id: "cu3", kind: "tf", q: "The Commissioner is elected by the people.", answer: false, why: "The Commissioner is appointed; councillors are elected." },
      ],
      connect: [
        { icon: "🗺", title: "Your ward", body: "Which ward do you live in? Who is your councillor?" },
        { icon: "📝", title: "Committees", body: "If you were a councillor, which committee would you join?" },
        { icon: "🙋", title: "Ask an adult", body: "Ask someone who works for the city about their job, like the children asked Yasmin Khala." },
      ],
    },
    {
      id: "money",
      icon: "💰",
      title: "Where the money comes from",
      pages: "59, 62",
      wonder: {
        q: "Property tax is paid by home owners. How much of the Corporation's money does it bring in?",
        options: [
          { id: "quarter", label: "Only about 25–30%" },
          { id: "all", label: "All of it" },
        ],
        answer: "quarter",
        reveal: "Only about 25–30%. The rest comes from many other taxes paid by a much wider population.",
      },
      explore: { activity: "Taxes", title: "Fill the city's purse", how: "Tap each tax to see where the Corporation's money comes from.", Sim: CityPurse },
      discoveries: [
        { id: "tax", text: "A tax is money paid to the government for its services" },
        { id: "property", text: "Property tax is only 25–30% of the Corporation's money" },
        { id: "wider", text: "A much wider population pays general taxes, like on movie tickets" },
      ],
      understand: [
        { title: "Fair spending?", body: "Poor people who keep the city clean often live in slums with little water or sanitation. Middle-class areas pay little tax compared with what's spent on their parks and lights — so the poor deserve the same facilities." },
      ],
      check: [{ id: "cu4", kind: "tf", q: "When you buy a cinema ticket, you also pay a tax.", answer: true, why: "There's a tax on movie tickets — one of many general taxes." }],
      connect: [
        { icon: "🎟", title: "Check a ticket", body: "Look at a movie or bus ticket. Can you find the tax?" },
        { icon: "🌉", title: "Taxes at work", body: "Taxes pay for roads, bridges, parks and street lights. List three more things they pay for." },
        { icon: "🏘", title: "Same for all?", body: "Is garbage collected as often in every neighbourhood of your city? Why not?" },
      ],
    },
    {
      id: "protest",
      icon: "📣",
      title: "A community protest",
      pages: "59–62",
      wonder: {
        q: "Garbage isn't being collected in your area. Whom should you go to first?",
        options: [
          { id: "councillor", label: "The Ward Councillor we elected" },
          { id: "nobody", label: "Nobody — just wait" },
        ],
        answer: "councillor",
        reveal: "Gangabai said they should go to the Ward Councillor — because they were the ones who had elected him.",
      },
      explore: { activity: "Gangabai's story", title: "How the streets got cleaned", how: "Put the events of the protest in order.", Sim: Gangabai },
      discoveries: [
        { id: "elected", text: "People can hold the councillor they elected responsible" },
        { id: "petition", text: "A petition signed by many adults shows the problem is shared" },
        { id: "equal", text: "Every locality, rich or poor, deserves the same services" },
        { id: "result", text: "Organised protest made the Corporation act" },
      ],
      understand: [
        { title: "Sub-contracting", body: "To save money, several municipalities now hire private contractors to collect garbage. Contract workers get paid less, their jobs are temporary, and they often lack safety measures." },
        { title: "Surat, 1994", body: "Surat was one of India's dirtiest cities when a plague scare hit. Several people died and over 3,00,000 left the city. The Corporation then cleaned up the city completely, and Surat stays one of India's cleanest." },
        { title: "Two dustbins", body: "The Corporation suggested sorting household garbage into two dustbins — it reduces their work and keeps streets clean." },
        { title: "Swachh Bharat", body: "The Government of India launched the Swachh Bharat Mission on 2 October 2014 to promote cleanliness in rural and urban areas." },
      ],
      check: [{ id: "cu5", kind: "mcq", q: "The councillor asked Gangabai for a petition signed by all the adults. How might that help?", options: ["It shows the Commissioner that many people face the problem", "It raises money", "It elects a new councillor"], answer: 0, why: "Many signatures show it's a problem shared by the whole locality." }],
      connect: [
        { icon: "🧹", title: "Swachh poster", body: "Watch how Swachh Bharat is carried out by your municipality or panchayat, and make a poster." },
        { icon: "🦺", title: "Safe work", body: "Why don't garbage workers always have safe equipment? What could change?" },
        { icon: "🗑", title: "Sort it", body: "Does your home use two dustbins? What goes in each?" },
      ],
    },
  ],
  learnt: [
    "The Municipal Corporation (or Council, in small towns) looks after street lights, garbage, water, cleanliness, health, schools and gardens.",
    "The city is divided into wards; ward councillors are elected, while the Commissioner and staff are appointed.",
    "Councillors decide (in committees and through a budget), and the administrative staff implement.",
    "The Corporation's money comes from taxes; property tax is only about 25–30% of it.",
    "Citizens, like Gangabai's group, can protest and petition to get services they're entitled to.",
  ],
  keywords: ["Municipal Corporation", "Municipal Council", "Ward", "Councillor", "Commissioner", "Committee", "Tax", "Property tax", "Petition", "Sub-contracting"],
};

export default chapter;
