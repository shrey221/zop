// History Chapter 2 · On the Trail of the Earliest People (NCERT Our Pasts – I, 2018-19, pp. 11–21).
// Wording is original; facts follow the textbook.
import { ExploreLab, OrderLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";

function Camp() {
  return (
    <g>
      <rect width="520" height="320" fill="#f2d9a6" />
      <rect y="0" width="520" height="140" fill="#8fc4e8" />
      <path d="M0 150 Q120 110 240 140 T520 130 V320 H0 Z" fill="#c9a86a" />
      <path d="M300 320 C 320 260, 380 230, 520 220 V320 Z" fill="#5aa0d0" />
      {/* camp */}
      <path d="M90 230 L130 170 L170 230 Z" fill="#8a5a2b" />
      <circle cx="140" cy="250" r="8" fill="#f5a524" />
      {/* fruit tree */}
      <rect x="250" y="160" width="10" height="60" fill="#6b4520" />
      <circle cx="255" cy="150" r="32" fill="#3f8f50" />
      {[240, 262, 270].map((x, i) => (
        <circle key={x} cx={x} cy={140 + i * 8} r="5" fill="#e5484d" />
      ))}
      {/* deer */}
      <text x="400" y="190" fontSize="38">🦌</text>
      <text x="60" y="300" fontSize="12" fontWeight="800" fill="#5a3e1f">hunter-gatherer camp</text>
    </g>
  );
}
function WhyMove({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Hunter-gatherers moved from place to place. Tap the glowing clues to find out why."
      viewBox="0 0 520 320"
      art={<Camp />}
      spots={[
        { id: "food", label: "Food runs out", x: 140, y: 205, text: "If they stayed in one place too long, they would eat up all the plants and animals there, and have to go elsewhere." },
        { id: "animals", label: "Animals move", x: 420, y: 175, text: "Animals move in search of prey, or (like deer and wild cattle) in search of grass and leaves. Hunters followed them." },
        { id: "seasons", label: "Fruit ripens by season", x: 255, y: 145, text: "Plants bear fruit in different seasons, so people moved from season to season." },
        { id: "water", label: "Water dries up", x: 420, y: 260, text: "Some rivers and lakes have water all year (perennial); others are seasonal. In dry seasons people went in search of water." },
      ]}
      groups={{ food: ["food"], animals: ["animals"], seasons: ["seasons"], water: ["water"] }}
    />
  );
}

function Site() {
  return (
    <g>
      <rect width="520" height="320" fill="#d9bf8a" />
      <path d="M0 120 L80 40 L200 90 L280 30 L400 80 L520 50 V320 H0 Z" fill="#a58050" />
      {/* rock shelter */}
      <path d="M40 200 Q 100 110 180 200 Z" fill="#6b4a2b" />
      <path d="M70 190 Q 110 140 150 190 Z" fill="#2b1a0e" />
      {/* painting on rock */}
      <g stroke="#b8452a" strokeWidth="3" fill="none">
        <path d="M230 140 l10 -14 l10 14 M240 126 v-12 m-6 4 h12" />
        <path d="M270 140 q12 -10 24 0 m-24 0 l-4 12 m28 -12 l4 12" />
      </g>
      <rect x="215" y="100" width="100" height="60" fill="none" stroke="#5a3e1f" strokeDasharray="4 4" />
      {/* stone heap */}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx={380 + i * 14} cy={240 - (i % 2) * 8} rx="12" ry="8" fill="#8d8a80" />
      ))}
      {/* ash */}
      <ellipse cx="110" cy="255" rx="34" ry="10" fill="#5c5650" />
      <path d="M0 290 Q 260 270 520 300 V320 H0 Z" fill="#5aa0d0" />
    </g>
  );
}
function SiteExplore({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Archaeologists study sites like Bhimbetka, Hunsgi and Kurnool. Tap the glowing clues."
      viewBox="0 0 520 320"
      art={<Site />}
      spots={[
        { id: "shelter", label: "Rock shelter (habitation site)", x: 110, y: 175, text: "People lived in natural caves and rock shelters, like those at Bhimbetka (Madhya Pradesh), often near water and stone." },
        { id: "factory", label: "Factory site", x: 400, y: 236, text: "Where good stone was found, people made tools — these places are called factory sites. At Hunsgi, tools were made of limestone." },
        { id: "ash", label: "Traces of ash", x: 110, y: 255, text: "In the Kurnool caves, traces of ash have been found. People were familiar with fire." },
        { id: "art", label: "Rock paintings", x: 265, y: 130, text: "Paintings of wild animals were drawn on cave walls, like at Bhimbetka. They show how much people knew about animals." },
      ]}
      groups={{ habitation: ["shelter"], factory: ["factory"], fire: ["ash"], paintings: ["art"] }}
    />
  );
}

function Ages({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="Put these changes in order, from the oldest to the most recent."
      steps={[
        { id: "early", label: "Earliest people in the subcontinent", icon: "👣", detail: "People lived in the subcontinent as early as two million years ago. They hunted and gathered their food." },
        { id: "palaeo", label: "Palaeolithic: old stone tools", icon: "🔨", detail: "The Palaeolithic period stretches from two million years ago to about 12,000 years ago. 'Palaeo' means old, 'lithos' means stone." },
        { id: "fire", label: "Using fire", icon: "🔥", detail: "Fire was used for light, cooking meat, and scaring away animals. Ash has been found in the Kurnool caves." },
        { id: "climate", label: "Climate warms; grasslands spread", icon: "🌾", detail: "Around 12,000 years ago the world's climate became warmer and grasslands developed in many areas." },
        { id: "herds", label: "Deer, goat, sheep and cattle multiply", icon: "🐐", detail: "Animals that ate grass increased. People who hunted them followed them, and began to learn about their habits." },
        { id: "meso", label: "Mesolithic: tiny stone tools", icon: "🗡", detail: "The Mesolithic (middle stone) period, about 12,000 to 10,000 years ago, is known for microliths — tiny stone tools fixed to handles of bone or wood." },
      ]}
      milestones={[
        { id: "fire", at: 3 },
        { id: "climate", at: 4 },
        { id: "micro", at: 6 },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "htrail",
  subject: "History",
  n: 2,
  title: "On the Trail of the Earliest People",
  pages: "11–21",
  icon: "🏹",
  theme: { grad: "linear-gradient(135deg,#22170b 0%,#7a5a2a 55%,#c9a86a 125%)", accent: "#7a5226", soft: "#f4ead8", ink: "#5a3a12" },
  opening: "Tushar watches trees fly past his train window. Before trains and buses, did people stay all their lives where they were born?",
  stops: [
    {
      id: "move",
      icon: "🚶",
      title: "Why keep moving?",
      pages: "11–13",
      wonder: {
        q: "The earliest people were hunter-gatherers. Why did they keep moving from place to place?",
        options: [
          { id: "fun", label: "Just for fun" },
          { id: "food", label: "To find food and water as seasons changed" },
          { id: "cars", label: "Because they had cars" },
        ],
        answer: "food",
        reveal: "To find food and water: plants and animals ran out, animals moved, fruit ripened in different seasons, and some rivers dried up.",
      },
      explore: { activity: "The earliest people", title: "Four reasons to move", how: "Tap the clues in this hunter-gatherer scene.", Sim: WhyMove },
      discoveries: [
        { id: "food", text: "Staying too long would use up the food nearby" },
        { id: "animals", text: "Hunters followed the animals they hunted" },
        { id: "seasons", text: "Fruits ripen in different seasons" },
        { id: "water", text: "Seasonal rivers and lakes dry up" },
      ],
      understand: [
        { title: "Hunter-gatherers", body: "People lived in the subcontinent as early as two million years ago. They hunted animals, caught fish and birds, and gathered fruits, roots, nuts, seeds, leaves and eggs.", tag: "found" },
        { title: "Skills", body: "Hunting needed alertness and quickness. Gathering needed knowledge of which plants were edible and when fruits ripen.", tag: "think" },
        { title: "Tools", body: "Tools of stone, wood and bone were made; stone tools have survived best. They cut meat and bone, scraped bark and hides, chopped fruit and roots.", tag: "found" },
      ],
      check: [{ id: "ht1", kind: "mcq", q: "Which tools have survived best from the time of the earliest people?", options: ["Wooden tools", "Stone tools", "Bone tools"], answer: 1, why: "Stone lasts much longer than wood or bone." }],
      connect: [
        { icon: "🏫", title: "Your journey", body: "How long would it take you to walk to school? To go by bus?" },
        { icon: "🔪", title: "Tools today", body: "What would you use to cut fruit today? What is it made of?" },
        { icon: "🌍", title: "Seasons still matter", body: "Many herders still move with their animals from season to season." },
      ],
    },
    {
      id: "sites",
      icon: "⛰",
      title: "Clues at the sites",
      pages: "13–17",
      wonder: {
        q: "Archaeologists found traces of ash in the Kurnool caves. What does that tell us?",
        options: [
          { id: "fire", label: "People there were familiar with fire" },
          { id: "volcano", label: "A volcano erupted" },
          { id: "nothing", label: "Nothing useful" },
        ],
        answer: "fire",
        reveal: "That people were familiar with the use of fire — for light, roasting meat and frightening away animals.",
      },
      explore: { activity: "Choosing a place to live in", title: "Explore a site", how: "Tap each clue at this site.", Sim: SiteExplore },
      discoveries: [
        { id: "habitation", text: "People lived in caves and rock shelters near water" },
        { id: "factory", text: "Factory sites were where stone tools were made" },
        { id: "fire", text: "Ash at Kurnool shows people used fire" },
        { id: "paintings", text: "Rock paintings show wild animals" },
      ],
      understand: [
        { title: "Sites", body: "A site is a place where the remains of things — tools, pots, buildings — were found. Archaeologists find them on the surface, underground or under water.", tag: "found" },
        { title: "Habitation sites", body: "Places where people lived, such as caves and rock shelters. Bhimbetka in Madhya Pradesh has many.", tag: "found" },
        { title: "Making tools", body: "Stone was struck against stone to remove flakes, or pressure flaking was used to remove smaller chips.", tag: "think" },
        { title: "Paintings", body: "Rock paintings show animals drawn with great skill. We don't know exactly why they were painted.", tag: "unknown" },
      ],
      check: [{ id: "ht2", kind: "mcq", q: "At Hunsgi, tools were made of…", options: ["Limestone", "Iron", "Gold"], answer: 0, why: "Hunsgi tools were made of locally found limestone." }],
      connect: [
        { icon: "🎨", title: "Bhimbetka", body: "A World Heritage Site in Madhya Pradesh with thousands of years of rock paintings." },
        { icon: "🔥", title: "Uses of fire", body: "List three ways early people used fire. Do we still use fire for these?" },
        { icon: "🐦", title: "Ostrich eggs", body: "Ostriches once lived in India! Pieces of their eggshells, some decorated, have been found at Patne in Maharashtra." },
      ],
    },
    {
      id: "ages",
      icon: "⏳",
      title: "A changing world",
      pages: "17–20",
      wonder: {
        q: "About 12,000 years ago, the world's climate changed. What happened?",
        options: [
          { id: "warm", label: "It became warmer and grasslands spread" },
          { id: "ice", label: "Everything froze" },
          { id: "desert", label: "All forests turned to desert" },
        ],
        answer: "warm",
        reveal: "It became warmer and grasslands spread. Grass-eating animals increased — and people began to learn about them.",
      },
      explore: { activity: "Names and dates", title: "Put the past in order", how: "Arrange the changes from oldest to newest.", Sim: Ages },
      discoveries: [
        { id: "fire", text: "Fire came into use" },
        { id: "climate", text: "About 12,000 years ago, grasslands spread" },
        { id: "micro", text: "Microliths: tiny stone tools of the Mesolithic period" },
      ],
      understand: [
        { title: "Palaeolithic", body: "From two million years ago to about 12,000 years ago. Named from 'palaeo' (old) and 'lithos' (stone). It's divided into Lower, Middle and Upper Palaeolithic." },
        { title: "Mesolithic", body: "Middle Stone Age, about 12,000 to 10,000 years ago. Stone tools were tiny — microliths — often fixed to handles of bone or wood." },
        { title: "Neolithic next", body: "The next stage, from about 10,000 years ago, is the Neolithic — when farming begins (Chapter 3)." },
      ],
      check: [{ id: "ht3", kind: "mcq", q: "Grasslands developed around…", options: ["12,000 years ago", "100 years ago", "2 million years ago"], answer: 0, why: "This was a time of major climate change." }],
      connect: [
        { icon: "🌍", title: "Elsewhere: Lascaux", body: "In France, caves at Lascaux have paintings of animals made between 20,000 and 10,000 years ago." },
        { icon: "🎭", title: "Imagine", body: "You live in a cave 12,000 years ago and help paint its walls. What would you draw?" },
        { icon: "🌱", title: "Grass to grain", body: "Grasslands led people to wheat, barley and rice — which grew from wild grasses." },
      ],
    },
  ],
  learnt: [
    "The earliest people in the subcontinent were hunter-gatherers who lived about two million years ago.",
    "They moved to find food and water, following animals and seasons.",
    "Stone tools, ash and rock paintings at sites like Bhimbetka, Hunsgi and Kurnool tell us about them.",
    "The Palaeolithic and Mesolithic periods are named after their stone tools.",
    "About 12,000 years ago the climate became warmer and grasslands spread.",
  ],
  keywords: ["Hunter-gatherer", "Site", "Habitation", "Factory", "Palaeolithic", "Mesolithic", "Microliths"],
};

export default chapter;
