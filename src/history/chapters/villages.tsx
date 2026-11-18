// History Chapter 9 · Vital Villages, Thriving Towns (NCERT Our Pasts – I, 2018-19, pp. 87–98).
// Wording is original; facts follow the textbook.
import { ExploreLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function Iron({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Iron changed farming. Answer these questions."
      cases={[
        { id: "when", icon: "⚒", prompt: "Iron began to be used in the subcontinent about…", options: ["3000 years ago", "300 years ago", "30,000 years ago"], answer: 0, explain: "About 3000 years ago. Some of the largest collections of iron tools and weapons were found in the megalithic burials.", disc: "iron" },
        { id: "axe", icon: "🌳", prompt: "How did iron axes help farmers?", options: ["They cleared forests for new fields", "They made seeds grow faster", "They were used to dig wells only"], answer: 0, explain: "Iron axes were used for clearing forests, and iron ploughshares increased agricultural production.", disc: "tools" },
        { id: "water", icon: "💧", prompt: "Which of these helped irrigate crops?", options: ["Canals, wells, tanks and artificial lakes", "Only rain", "Nothing — irrigation wasn't known"], answer: 0, explain: "Kings and landowners built canals, wells, tanks and artificial lakes for irrigation.", disc: "irrigation" },
      ]}
    />
  );
}

function VillagePeople({ discover }: SimProps) {
  const items = [
    { id: "vellalar", label: "Vellalar — large landowners", bin: "ta", why: "In the Tamil region, large landowners were called vellalar." },
    { id: "uzhavar", label: "Uzhavar — ploughmen", bin: "ta", why: "Ordinary ploughmen were known as uzhavar." },
    { id: "adimai", label: "Kadaisiyar and adimai — landless labourers and slaves", bin: "ta", why: "Landless labourers, including slaves, were called kadaisiyar and adimai." },
    { id: "grama", label: "Gramabhojaka — village headman", bin: "no", why: "The gramabhojaka, often the largest landowner, got his land cultivated by slaves and hired workers. The king used him to collect taxes, and he worked as a judge and sometimes as a policeman." },
    { id: "griha", label: "Grihapatis — independent farmers", bin: "no", why: "Grihapatis were independent farmers, mostly smaller landowners." },
    { id: "dasa", label: "Dasa karmakara — landless labourers", bin: "no", why: "Men and women who did not own land worked on fields owned by others." },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Villages had different groups of people. Sort the words: from the Tamil region, or from the north."
      bins={[
        { id: "ta", label: "Tamil region", icon: "🌴", color: "#5fe0a0" },
        { id: "no", label: "Northern villages", icon: "🌾", color: "#ffd257" },
      ]}
      items={items}
      rules={[
        { id: "tamil", when: (p) => ["vellalar", "uzhavar", "adimai"].every((i) => p[i]) },
        { id: "north", when: (p) => ["grama", "griha", "dasa"].every((i) => p[i]) },
        { id: "landless", when: (p) => !!p.adimai && !!p.dasa },
      ]}
    />
  );
}

function City() {
  return (
    <g>
      <rect width="520" height="320" fill="#e8d6b0" />
      {/* city wall */}
      <rect x="20" y="40" width="300" height="250" fill="none" stroke="#8a5a2b" strokeWidth="10" />
      {/* houses */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={46 + c * 64} y={60 + r * 56} width="46" height="36" fill="#c9a06a" stroke="#8a5a2b" />),
      )}
      {/* ring well */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx="250" cy={250 + i * 6} rx="22" ry="7" fill="none" stroke="#8a5a2b" strokeWidth="4" />
        ))}
      </g>
      {/* market stall with pots and coins */}
      <rect x="60" y="232" width="90" height="40" fill="#b8452a" />
      <circle cx="80" cy="226" r="7" fill="#2b2a30" />
      <circle cx="98" cy="226" r="7" fill="#2b2a30" />
      <rect x="120" y="222" width="18" height="10" rx="3" fill="#c9cfdc" />
      {/* port and ship */}
      <rect x="340" y="0" width="180" height="320" fill="#5aa0d0" />
      <rect x="330" y="150" width="40" height="120" fill="#8a5a2b" />
      <path d="M400 170 h80 l-12 22 h-56 z" fill="#6b4520" />
      <path d="M440 120 v50 M440 122 l26 30 h-26" stroke="#f4efe3" strokeWidth="3" fill="#f4efe3" />
      <text x="440" y="230" fontSize="11" fontWeight="800" fill="#0d3a5c" textAnchor="middle">port</text>
    </g>
  );
}
function CityExplore({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Explore an early city and port. Tap the glowing clues found by archaeologists."
      viewBox="0 0 520 320"
      art={<City />}
      spots={[
        { id: "well", label: "Ring wells", x: 250, y: 260, text: "Rows of pots or ceramic rings arranged one on top of the other. They seem to have been used as toilets, drains and garbage dumps, usually inside individual houses." },
        { id: "pots", label: "Northern Black Polished Ware", x: 89, y: 226, text: "A very fine, glossy pottery, usually black, found at many sites across the subcontinent." },
        { id: "coins", label: "Punch-marked coins", x: 129, y: 227, text: "The earliest coins, used for about 500 years. They were usually rectangular or square, made of silver or copper, with designs punched on them." },
        { id: "shreni", label: "Crafts persons' guilds", x: 133, y: 98, text: "Many crafts persons and merchants formed associations called shrenis. These trained people, procured raw material and distributed the finished product. Shrenis of merchants organised trade." },
        { id: "port", label: "Port of Arikamedu", x: 440, y: 180, text: "At Arikamedu (Puducherry), between 2200 and 1900 years ago, ships unloaded goods from distant lands. Pottery from the Mediterranean region (amphorae, Arretine Ware) and a Roman lamp have been found." },
      ]}
      groups={{ wells: ["well"], coins: ["coins", "pots"], shreni: ["shreni"], port: ["port"] }}
    />
  );
}

const chapter: Chapter = {
  id: "hvillages",
  subject: "History",
  n: 9,
  title: "Vital Villages, Thriving Towns",
  pages: "87–98",
  icon: "🏘",
  theme: { grad: "linear-gradient(135deg,#1f1408 0%,#6b4a1f 55%,#c9a06a 125%)", accent: "#7a4f1c", soft: "#f6ead8", ink: "#55350f" },
  opening: "About 2500 years ago, iron tools changed farming, villages grew, and busy towns and ports appeared. What was life like in them?",
  stops: [
    {
      id: "iron",
      icon: "⚒",
      title: "Iron tools and agriculture",
      pages: "87–89",
      wonder: {
        q: "How did iron ploughshares change farming?",
        options: [
          { id: "more", label: "They increased agricultural production" },
          { id: "less", label: "They made farming harder" },
          { id: "same", label: "No change at all" },
        ],
        answer: "more",
        reveal: "They increased production. Iron axes also helped clear forests.",
      },
      explore: { activity: "Iron tools and agriculture", title: "The age of iron", how: "Answer these questions about iron and irrigation.", Sim: Iron },
      discoveries: [
        { id: "iron", text: "Iron came into use about 3000 years ago" },
        { id: "tools", text: "Iron axes and ploughshares helped farming" },
        { id: "irrigation", text: "Canals, wells, tanks and lakes were built for irrigation" },
      ],
      understand: [
        { title: "Megalith finds", body: "Some of the largest collections of iron tools and weapons were found in the megalithic burials.", tag: "found" },
        { title: "Kings needed farmers", body: "Kings needed taxes from farmers, and better farming meant more taxes.", tag: "think" },
      ],
      check: [{ id: "hv1", kind: "mcq", q: "Which of these was NOT used for irrigation then?", options: ["Canals", "Tanks", "Electric pumps"], answer: 2, why: "Canals, wells, tanks and artificial lakes were used — not electric pumps!" }],
      connect: [
        { icon: "🚜", title: "Farming today", body: "Tractors and pumps have replaced many old tools." },
        { icon: "💧", title: "Tanks", body: "Many old irrigation tanks are still used in south India." },
        { icon: "🔨", title: "Blacksmiths", body: "Village blacksmiths still make and mend iron tools." },
      ],
    },
    {
      id: "village",
      icon: "🌾",
      title: "Who lived in the villages?",
      pages: "89–90",
      wonder: {
        q: "In northern villages, who was the most powerful person?",
        options: [
          { id: "grama", label: "The gramabhojaka, the village headman" },
          { id: "potter", label: "The potter" },
          { id: "child", label: "The youngest child" },
        ],
        answer: "grama",
        reveal: "The gramabhojaka. Often the largest landowner, he collected taxes for the king and acted as judge.",
      },
      explore: { activity: "Who lived in the villages?", title: "Village words", how: "Sort the Tamil and northern words for village people.", Sim: VillagePeople },
      discoveries: [
        { id: "tamil", text: "Tamil villages had vellalar, uzhavar, kadaisiyar and adimai" },
        { id: "north", text: "Northern villages had a gramabhojaka, grihapatis and dasa karmakara" },
        { id: "landless", text: "Some people owned no land and worked for others" },
      ],
      understand: [
        { title: "Sangam literature", body: "Some of the earliest Tamil compositions, known as Sangam literature, were composed about 2300 years ago. They describe village life.", tag: "source" },
        { title: "Village crafts", body: "Villages also had crafts persons such as the blacksmith, potter, carpenter and weaver.", tag: "source" },
      ],
      check: [{ id: "hv2", kind: "mcq", q: "In Tamil, ploughmen were known as…", options: ["Uzhavar", "Vellalar", "Grihapati"], answer: 0, why: "Uzhavar were ordinary ploughmen." }],
      connect: [
        { icon: "🏡", title: "Your village", body: "Who are the important people in a village today?" },
        { icon: "📜", title: "Jatakas", body: "Stories called Jatakas, told by ordinary people and written down by Buddhist monks, describe village life." },
        { icon: "🤝", title: "Panchayats", body: "Today villages are run by elected panchayats." },
      ],
    },
    {
      id: "towns",
      icon: "🏙",
      title: "Thriving towns and ports",
      pages: "90–97",
      wonder: {
        q: "Archaeologists found rows of clay rings stacked in wells inside houses in early cities. What might they have been used for?",
        options: [
          { id: "drains", label: "As toilets, drains and garbage dumps" },
          { id: "music", label: "As musical instruments" },
          { id: "toys", label: "As toys" },
        ],
        answer: "drains",
        reveal: "Archaeologists think these ring wells were used as toilets, drains and garbage dumps.",
      },
      explore: { activity: "Towns and ports", title: "An early city", how: "Tap each clue in this city and port.", Sim: CityExplore },
      discoveries: [
        { id: "wells", text: "Ring wells were toilets, drains and garbage dumps" },
        { id: "coins", text: "Silver punch-marked coins and fine NBPW pottery" },
        { id: "shreni", text: "Shrenis were associations of crafts persons and merchants" },
        { id: "port", text: "Arikamedu traded with the Mediterranean world" },
      ],
      understand: [
        { title: "Mathura", body: "Mathura was an important settlement for over 2500 years — on crossroads of travel and trade, with temples, workshops and a capital of the Kushanas.", tag: "found" },
        { title: "Crafts", body: "Very fine pottery, cloth (Varanasi in the north, Madurai in the south), and other crafts were made. Shrenis organised work.", tag: "source" },
        { title: "Trade", body: "Arikamedu traded with Rome: Mediterranean pottery, a Roman lamp and glassware have been found there.", tag: "found" },
      ],
      check: [{ id: "hv3", kind: "mcq", q: "Punch-marked coins were usually made of…", options: ["Silver", "Gold", "Ivory"], answer: 0, why: "Silver (sometimes copper)." }],
      connect: [
        { icon: "🏛", title: "Elsewhere: Rome", body: "About 2000 years ago Rome had amphitheatres, aqueducts, baths and fountains." },
        { icon: "🚢", title: "Ports today", body: "Mumbai, Chennai and Kolkata are busy ports today." },
        { icon: "💰", title: "Coins", body: "Look at a modern coin. What designs are punched on it?" },
      ],
    },
  ],
  learnt: [
    "Iron came into use about 3000 years ago; iron tools and irrigation increased farm production.",
    "Villages had large landowners, smaller farmers, ploughmen and landless labourers; the gramabhojaka was powerful.",
    "Cities had ring wells, fine pottery, punch-marked coins and shrenis of crafts persons and merchants.",
    "Ports like Arikamedu traded with distant lands.",
  ],
  keywords: ["Iron", "Irrigation", "Village", "Port", "Ring well", "City", "Shreni", "Sangam"],
};

export default chapter;
