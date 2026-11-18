// History Chapter 3 · From Gathering to Growing Food (NCERT Our Pasts – I, 2018-19, pp. 22–31).
// Wording is original; facts follow the textbook.
import { ExploreLab, OrderLab, SortLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { MAP_VIEWBOX, SketchMap, proj } from "../map";

function Domestication({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="How did people become farmers? Put the steps in order."
      steps={[
        { id: "watch", label: "Watch seeds fall and sprout", icon: "👀", detail: "People probably noticed where edible plants grew, and how seeds broke off stalks, fell to the ground and sprouted." },
        { id: "protect", label: "Protect the young plants", icon: "🛡", detail: "Perhaps they began looking after plants, protecting them from birds and animals so the seeds could ripen." },
        { id: "select", label: "Choose the best plants", icon: "🌾", detail: "They selected plants with large grain and strong stalks that could bear the weight of ripe grain, and that were not prone to disease." },
        { id: "sow", label: "Save and sow their seeds", icon: "🌱", detail: "Seeds from selected plants were saved and sown, so new plants had the same qualities. People had become farmers!" },
      ]}
      milestones={[
        { id: "watch", at: 1 },
        { id: "select", at: 3 },
        { id: "farmer", at: 4 },
      ]}
    />
  );
}

const SITES = [
  { id: "mehrgarh", label: "Mehrgarh", lon: 67.6, lat: 29.4, text: "Wheat, barley, sheep, goat, cattle. One of the earliest villages: people first hunted, later herding became more important. Square or rectangular mud houses, and burials." },
  { id: "burzahom", label: "Burzahom", lon: 74.9, lat: 34.2, text: "Wheat, lentil; dog, cattle, sheep, goat, buffalo. People built pit-houses dug into the ground, with steps — shelter in cold weather." },
  { id: "koldihwa", label: "Koldihwa", lon: 82, lat: 25, text: "Rice and fragmentary animal bones." },
  { id: "chirand", label: "Chirand", lon: 84.8, lat: 25.7, text: "Wheat, green gram, barley; buffalo, ox. Chirand is in Bihar." },
  { id: "hallur", label: "Hallur", lon: 75.6, lat: 14.3, text: "Millet; cattle, sheep, goat, pig." },
  { id: "paiyampalli", label: "Paiyampalli", lon: 78.6, lat: 12.6, text: "Black gram, millet; cattle, sheep, pig." },
];
function SitesMap({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="These are some sites where archaeologists found evidence of early farming and herding. Tap each one."
      viewBox={MAP_VIEWBOX}
      art={
        <g>
          <SketchMap rivers={false} />
          {SITES.map((s) => {
            const p = proj(s.lon, s.lat);
            return (
              <text key={s.id} x={p.x + 14} y={p.y + 4} fontSize="11" fontWeight="800" fill="#3a2414">
                {s.label}
              </text>
            );
          })}
        </g>
      }
      spots={SITES.map((s) => ({ id: s.id, label: s.label, ...proj(s.lon, s.lat), text: s.text }))}
      groups={{ mehrgarh: ["mehrgarh"], burzahom: ["burzahom"], ganga: ["koldihwa", "chirand"], south: ["hallur", "paiyampalli"] }}
    />
  );
}

function LifeSort({ discover }: SimProps) {
  const items = [
    { id: "move", label: "Move often to find food", icon: "🚶", bin: "hg" },
    { id: "follow", label: "Follow herds of wild animals", icon: "🦌", bin: "hg" },
    { id: "season", label: "Gather fruit as it ripens", icon: "🍎", bin: "hg" },
    { id: "stay", label: "Stay in one place for a long time", icon: "🏡", bin: "farm", why: "Crops take time to grow; farmers stay to water, weed and guard them until harvest." },
    { id: "pots", label: "Store grain in pots", icon: "🏺", bin: "farm", why: "Farmers needed pots to store grain and to cook. Pottery appears at many Neolithic sites." },
    { id: "cloth", label: "Weave cloth", icon: "🧵", bin: "farm", why: "People began weaving cloth from cotton, which could now be grown." },
    { id: "grind", label: "Grind grain on stones", icon: "⚙️", bin: "farm", why: "Grinding stones were used to grind grain." },
  ];
  return (
    <SortLab
      discover={discover}
      intro="How did life change? Sort these into the life of hunter-gatherers or of farmers and herders."
      bins={[
        { id: "hg", label: "Hunter-gatherers", icon: "🏹", color: "#ffb86b" },
        { id: "farm", label: "Farmers & herders", icon: "🌾", color: "#5fe0a0" },
      ]}
      items={items}
      rules={[
        { id: "hg", when: (p) => ["move", "follow", "season"].every((i) => p[i]) },
        { id: "settle", when: (p) => !!p.stay },
        { id: "pots", when: (p) => !!p.pots && !!p.cloth },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "hfarm",
  subject: "History",
  n: 3,
  title: "From Gathering to Growing Food",
  pages: "22–31",
  icon: "🌾",
  theme: { grad: "linear-gradient(135deg,#1d2a0c 0%,#5c7a1f 55%,#d9b84a 125%)", accent: "#5c7a1f", soft: "#eef3dc", ink: "#3f5512" },
  opening: "Neinuo loves boiled rice, squash and beans grown by her grandmother. But long ago, people didn't grow their own food at all. How did that change?",
  stops: [
    {
      id: "domestic",
      icon: "🌱",
      title: "The first farmers and herders",
      pages: "22–24",
      wonder: {
        q: "Which animal was the first to be tamed?",
        options: [
          { id: "cow", label: "The cow" },
          { id: "dog", label: "The wild ancestor of the dog" },
          { id: "horse", label: "The horse" },
        ],
        answer: "dog",
        reveal: "The wild ancestor of the dog. Later, gentle grass-eating animals like sheep, goats, cattle and pigs were tamed.",
      },
      explore: { activity: "The beginnings of farming and herding", title: "Becoming farmers", how: "Put the steps of domestication in order.", Sim: Domestication },
      discoveries: [
        { id: "watch", text: "People watched seeds sprout into new plants" },
        { id: "select", text: "They chose the best plants to grow" },
        { id: "farmer", text: "Saving and sowing seeds — people became farmers" },
      ],
      understand: [
        { title: "Domestication", body: "Growing plants and looking after animals is domestication. Tended plants and animals become different from wild ones because people select them.", tag: "think" },
        { title: "Herders", body: "People attracted and tamed animals by leaving food near their shelters, and protected herds from wild animals.", tag: "think" },
        { title: "A slow change", body: "Domestication began about 12,000 years ago, and happened gradually in many parts of the world.", tag: "found" },
      ],
      check: [{ id: "hf1", kind: "mcq", q: "Why did farmers select plants with strong stalks?", options: ["To bear the weight of ripe grain", "To make them taller than trees", "To feed only to animals"], answer: 0, why: "Strong stalks hold up heavy ripe grain." }],
      connect: [
        { icon: "🐕", title: "Dogs and people", body: "Can you think why the dog was perhaps the first animal to be tamed?" },
        { icon: "🌾", title: "Seed banks", body: "Farmers today still save seeds from their best plants." },
        { icon: "🥣", title: "Your cereals", body: "List the cereals you eat. Where are they grown?" },
      ],
    },
    {
      id: "sites",
      icon: "📍",
      title: "Clues from early villages",
      pages: "25–29",
      wonder: {
        q: "At Burzahom in Kashmir, people lived in pit-houses dug into the ground. Why might they have done that?",
        options: [
          { id: "cold", label: "For shelter in cold weather" },
          { id: "hide", label: "To hide from neighbours" },
          { id: "water", label: "To store water" },
        ],
        answer: "cold",
        reveal: "Archaeologists think pit-houses gave shelter in cold weather. Steps led down into them.",
      },
      explore: { activity: "Table on page 25", title: "Early farming sites", how: "Tap each site to see the grain and animal bones found there.", Sim: SitesMap },
      discoveries: [
        { id: "mehrgarh", text: "Mehrgarh: wheat, barley, sheep, goats and square houses" },
        { id: "burzahom", text: "Burzahom: pit-houses, and wheat and lentils" },
        { id: "ganga", text: "Koldihwa and Chirand: rice, wheat and gram" },
        { id: "south", text: "Hallur and Paiyampalli: millets" },
      ],
      understand: [
        { title: "Burnt grain", body: "Archaeologists find grains of wheat, barley, rice, pulses and millets — often burnt, which preserved them.", tag: "found" },
        { title: "Mehrgarh", body: "Near the Bolan Pass, one of the most important routes into Iran. Bones of wild animals in the lower layers and of sheep and goats in higher layers suggest herding became more important later.", tag: "think" },
        { title: "Burials", body: "At Mehrgarh, a dead person was buried with goats — perhaps as food in the next world.", tag: "think" },
      ],
      check: [{ id: "hf2", kind: "tf", q: "Millets have been found at Hallur.", answer: true, why: "Hallur and Paiyampalli both have evidence of millet." }],
      connect: [
        { icon: "🗺", title: "Neinuo's rice", body: "Which sites would Neinuo visit if she wanted to eat rice?" },
        { icon: "💎", title: "Daojali Hading", body: "On hills in Assam, jadeite found there may have been brought from China." },
        { icon: "🏺", title: "Museums", body: "Many of these finds are in museums today." },
      ],
    },
    {
      id: "life",
      icon: "🏡",
      title: "A settled life",
      pages: "26–30",
      wonder: {
        q: "Why do people who grow crops have to stay in the same place for a long time?",
        options: [
          { id: "grow", label: "Crops take time to grow and need looking after" },
          { id: "lazy", label: "They don't like travelling" },
          { id: "law", label: "A king ordered it" },
        ],
        answer: "grow",
        reveal: "Crops take time to grow. Farmers stay to water, weed and protect them until harvest — so people began living in villages.",
      },
      explore: { activity: "Settled life", title: "Then and now", how: "Sort what hunter-gatherers and farmers did.", Sim: LifeSort },
      discoveries: [
        { id: "hg", text: "Hunter-gatherers moved with food and seasons" },
        { id: "settle", text: "Farmers stayed in one place: villages began" },
        { id: "pots", text: "Farmers stored grain in pots and wove cloth" },
      ],
      understand: [
        { title: "Neolithic", body: "Archaeologists call the time of settled farming the Neolithic. Polished stone tools were made then, including grinding stones.", tag: "found" },
        { title: "Storing food", body: "Grain was stored in pots, baskets or pits. Animals were a 'store' of food too — milk and meat.", tag: "think" },
        { title: "Tribes", body: "Many farmers and herders lived in groups called tribes, sharing land and following traditions passed down through generations.", tag: "think" },
      ],
      check: [{ id: "hf3", kind: "mcq", q: "What were pots used for in early villages?", options: ["Storing grain and cooking", "Only decoration", "Building houses"], answer: 0, why: "Pots stored grain and were used for cooking." }],
      connect: [
        { icon: "🌍", title: "Elsewhere: Çatal Hüyük", body: "In Turkey, one of the most famous early towns had houses joined together, entered through the roof." },
        { icon: "🌽", title: "Your garden", body: "Which plants would you grow first? How would you look after them?" },
        { icon: "🧺", title: "Weaving", body: "Weaving of cloth began once cotton could be grown." },
      ],
    },
  ],
  learnt: [
    "About 12,000 years ago people began to domesticate plants and animals and became farmers and herders.",
    "The first animal tamed was the wild ancestor of the dog.",
    "Sites like Mehrgarh, Burzahom, Chirand and Hallur show evidence of early farming and herding.",
    "Farmers lived in villages, stored grain in pots, used grinding stones and wove cloth.",
  ],
  keywords: ["Domestication", "Farmers", "Herders", "Neolithic", "Pots", "Tribes", "Village", "Burials"],
};

export default chapter;
