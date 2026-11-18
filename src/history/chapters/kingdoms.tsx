// History Chapter 6 · Kingdoms, Kings and an Early Republic (NCERT Our Pasts – I, 2018-19, pp. 54–64).
// Wording is original; facts follow the textbook.
import { OrderLab, PickLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function Ashvamedha({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="One way to become a raja was a great sacrifice, the ashvamedha. Put its steps in order."
      steps={[
        { id: "release", label: "A horse is let loose", icon: "🐎", detail: "A horse was let loose to wander freely, guarded by the raja's men." },
        { id: "wander", label: "It wanders into other kingdoms", icon: "🗺", detail: "If the horse wandered into the kingdoms of other rajas and they stopped it, they had to fight." },
        { id: "accept", label: "Others let it pass", icon: "🤝", detail: "If they allowed the horse to pass, it meant they accepted that the raja who wanted to perform the sacrifice was stronger than them." },
        { id: "sacrifice", label: "The sacrifice is performed", icon: "🔥", detail: "Specially trained priests performed the sacrifice. The raja was a central figure, often seated on a special throne." },
        { id: "gifts", label: "Rajas bring gifts", icon: "🎁", detail: "Rajas who had accepted the horse brought gifts. The charioteer sang tales of the raja's glory." },
      ]}
      milestones={[
        { id: "release", at: 1 },
        { id: "accept", at: 3 },
        { id: "sacrifice", at: 5 },
      ]}
    />
  );
}

function Taxes({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Rulers of the mahajanapadas needed taxes to build forts and pay armies. Who paid what?"
      cases={[
        { id: "farm", icon: "🌾", prompt: "Farmers paid taxes on their crops. Usually how much?", options: ["1/6th of what was produced (bhaga)", "Everything they grew", "Nothing"], answer: 0, explain: "Taxes on crops were the most important, because most people were farmers. Usually it was fixed at 1/6th of the produce — called bhaga, or a share.", disc: "farmers" },
        { id: "craft", icon: "🔨", prompt: "How did crafts persons often pay?", options: ["In labour — e.g. working one day a month for the king", "In gold only", "They didn't pay"], answer: 0, explain: "Crafts persons — such as a blacksmith or weaver — may have had to work one day a month for the king.", disc: "crafts" },
        { id: "herd", icon: "🐄", prompt: "How did herders pay?", options: ["With animals or animal produce", "With books", "With iron"], answer: 0, explain: "Herders paid taxes in the form of animals or animal produce.", disc: "herders" },
        { id: "trade", icon: "🛒", prompt: "What about traders?", options: ["Taxes on goods bought and sold", "Nothing", "Only salt"], answer: 0, explain: "There were taxes on goods bought and sold through trade. Hunters and gatherers paid in forest produce.", disc: "traders" },
      ]}
    />
  );
}

function Assembly({ discover }: SimProps) {
  const items = [
    { id: "rajas", label: "Many rajas of the Vajji gana", icon: "👑", bin: "in", why: "In a gana, there were many rulers. They met in assemblies and decided by discussion and debate." },
    { id: "women", label: "Women", icon: "👩", bin: "out", why: "Women, dasas and kammakaras could not take part in the assemblies of the ganas." },
    { id: "dasa", label: "Dasas and kammakaras (labourers)", icon: "👷", bin: "out", why: "They were not allowed to participate." },
    { id: "athens", label: "Free men over 30 in Athens", icon: "🏛", bin: "in", why: "Elsewhere: about 2500 years ago Athens set up a democracy. All free men over 30 were full citizens." },
    { id: "slaves", label: "Slaves in Athens", icon: "⛓", bin: "out", why: "Several thousand slaves worked in Athens; they were not citizens." },
    { id: "foreign", label: "Foreign merchants in Athens", icon: "🧳", bin: "out", why: "Foreigners who lived and worked in Athens had no rights as citizens." },
  ];
  return (
    <SortLab
      discover={discover}
      intro="Who could take part in meetings of the assembly? Sort these people."
      bins={[
        { id: "in", label: "Took part", icon: "✅", color: "#5fe0a0" },
        { id: "out", label: "Left out", icon: "🚫", color: "#ff8a7a" },
      ]}
      items={items}
      rules={[
        { id: "rajas", when: (p) => !!p.rajas },
        { id: "excluded", when: (p) => !!p.women && !!p.dasa },
        { id: "athens", when: (p) => !!p.athens && !!p.slaves },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hkingdoms",
  subject: "History",
  n: 6,
  title: "Kingdoms, Kings and an Early Republic",
  pages: "54–64",
  icon: "👑",
  theme: { grad: "linear-gradient(135deg,#2a0d12 0%,#8f2436 55%,#e9b45a 125%)", accent: "#8f2436", soft: "#f8e3e6", ink: "#651726" },
  opening: "Today, we choose our leaders by voting in elections. How did people become rulers long ago — and could everyone have a say?",
  stops: [
    {
      id: "raja",
      icon: "🐎",
      title: "How some men became rulers",
      pages: "54–56",
      wonder: {
        q: "About 3000 years ago, how did some men become recognised as rajas?",
        options: [
          { id: "vote", label: "By winning an election" },
          { id: "sacrifice", label: "By performing very big sacrifices, like the ashvamedha" },
          { id: "lottery", label: "By lottery" },
        ],
        answer: "sacrifice",
        reveal: "By performing very big sacrifices. The ashvamedha, or horse sacrifice, was one of them.",
      },
      explore: { activity: "How some men became rulers", title: "The horse sacrifice", how: "Put the steps of the ashvamedha in order.", Sim: Ashvamedha },
      discoveries: [
        { id: "release", text: "A horse was let loose, guarded by the raja's men" },
        { id: "accept", text: "Letting it pass meant accepting the raja as stronger" },
        { id: "sacrifice", text: "Priests performed the sacrifice; others brought gifts" },
      ],
      understand: [
        { title: "Janapadas", body: "Rajas of big sacrifices were now rulers of janapadas — 'the land where the jana set its foot and settled down'.", tag: "source" },
        { title: "Varnas", body: "Priests divided people into four groups called varnas: brahmins, kshatriyas, vaishyas and shudras. Some people were classified as untouchables. Not everyone agreed with this system.", tag: "source" },
        { title: "Evidence", body: "Archaeologists have excavated janapada sites like Purana Qila in Delhi, Hastinapura and Atranjikhera. People lived in huts and kept cattle; they grew rice, wheat, barley, pulses and sugarcane.", tag: "found" },
      ],
      check: [{ id: "hk1", kind: "mcq", q: "Which group did the priests say should perform sacrifices and study the Vedas?", options: ["Brahmins", "Shudras", "Vaishyas only"], answer: 0, why: "According to the priests, brahmins studied and taught the Vedas and performed sacrifices." }],
      connect: [
        { icon: "🗳", title: "Elections today", body: "Today leaders are chosen by voting — very different from sacrifices!" },
        { icon: "🏺", title: "Painted Grey Ware", body: "Special grey pottery with painted designs is found at janapada sites." },
        { icon: "🏰", title: "Purana Qila", body: "Visit this site in Delhi where a janapada settlement was found." },
      ],
    },
    {
      id: "maha",
      icon: "🏰",
      title: "Mahajanapadas and Magadha",
      pages: "57–60",
      wonder: {
        q: "About 2500 years ago, some janapadas became more important. Many of their capitals were fortified. Why might rulers build huge walls?",
        options: [
          { id: "fear", label: "Fear of attacks, and to show off wealth and power" },
          { id: "rain", label: "To stop the rain" },
          { id: "art", label: "Just for painting on" },
        ],
        answer: "fear",
        reveal: "Historians think forts were built because of fear of attacks, to show how rich and powerful the king was, and to control the people living inside.",
      },
      explore: { activity: "Mahajanapadas", title: "Who paid taxes?", how: "Find out how different people paid taxes.", Sim: Taxes },
      discoveries: [
        { id: "farmers", text: "Farmers paid a sixth of their produce — bhaga" },
        { id: "crafts", text: "Crafts persons paid in labour" },
        { id: "herders", text: "Herders paid in animals or animal produce" },
        { id: "traders", text: "Traders paid taxes on goods" },
      ],
      understand: [
        { title: "Armies", body: "The new rajas maintained armies — soldiers were paid regular salaries — and so they needed taxes.", tag: "source" },
        { title: "Changes in farming", body: "Iron ploughshares turned heavy clay soil better than wooden ones, and transplantation of paddy increased production.", tag: "think" },
        { title: "Magadha", body: "Magadha became the most important mahajanapada in about 200 years. Rivers like the Ganga and Son helped transport and water supply; forests gave elephants for the army; iron ore was nearby.", tag: "source" },
        { title: "Powerful rulers", body: "Bimbisara and Ajatasattu, and later Mahapadma Nanda, were powerful rulers of Magadha. Its capital was first Rajagriha, then Pataliputra.", tag: "source" },
      ],
      check: [{ id: "hk2", kind: "mcq", q: "Why was Magadha able to become so powerful?", options: ["Rivers, forests with elephants, and iron mines nearby", "It had no rivers", "It was very small"], answer: 0, why: "These resources made Magadha strong." }],
      connect: [
        { icon: "💰", title: "Taxes today", body: "We still pay taxes, which governments use for roads, schools and hospitals." },
        { icon: "🐘", title: "War elephants", body: "Magadha's forests supplied elephants for its army." },
        { icon: "🗺", title: "Rajgir", body: "Rajagriha is today's Rajgir in Bihar." },
      ],
    },
    {
      id: "vajji",
      icon: "🗣",
      title: "The Vajji gana",
      pages: "61–63",
      wonder: {
        q: "In the Vajji gana with its capital at Vaishali, who ruled?",
        options: [
          { id: "one", label: "A single king" },
          { id: "many", label: "Many rulers, who met in an assembly" },
          { id: "none", label: "Nobody" },
        ],
        answer: "many",
        reveal: "In a gana or sangha, there were many rulers, each sometimes called a raja. They met in assemblies and decided by discussion.",
      },
      explore: { activity: "A closer look — Vajji", title: "Who could join the assembly?", how: "Sort who took part in assemblies — in the Vajji gana and in ancient Athens.", Sim: Assembly },
      discoveries: [
        { id: "rajas", text: "Many rajas met and decided together in the gana" },
        { id: "excluded", text: "Women, dasas and kammakaras were left out" },
        { id: "athens", text: "Athens had a democracy too — but slaves weren't citizens" },
      ],
      understand: [
        { title: "Ganas", body: "Both the Buddha and Mahavira belonged to ganas. Ajatasattu tried to attack the Vajjis.", tag: "source" },
        { title: "Lasting long", body: "Ganas lasted a very long time, until about 1500 years ago, when the last were conquered by the Gupta rulers.", tag: "source" },
        { title: "Sources", body: "Buddhist books describe the life of the sanghas. Coins and some inscriptions also tell us about them.", tag: "source" },
      ],
      check: [{ id: "hk3", kind: "tf", q: "Women could take part in the assemblies of the ganas.", answer: false, why: "Women, dasas and kammakaras could not." }],
      connect: [
        { icon: "🌍", title: "Elsewhere: Athens", body: "Was Athens a true democracy if women and slaves couldn't vote?" },
        { icon: "🏛", title: "Our Parliament", body: "Today every adult citizen can vote." },
        { icon: "🗳", title: "Class elections", body: "How does your class choose its monitor?" },
      ],
    },
  ],
  learnt: [
    "About 3000 years ago, some men became rajas by performing big sacrifices like the ashvamedha.",
    "Priests divided people into four varnas; not everyone accepted this.",
    "About 2500 years ago, some janapadas became mahajanapadas, with fortified capitals and armies paid from taxes.",
    "Magadha became the most powerful mahajanapada.",
    "In ganas like the Vajji, many rulers decided things together in assemblies — but women, dasas and kammakaras were left out.",
  ],
  keywords: ["Raja", "Ashvamedha", "Varna", "Janapada", "Mahajanapada", "Fortification", "Army", "Tax", "Transplantation", "Gana or sangha", "Democracy"],
};

export default chapter;
