// What Zopio offers: subjects, their NCERT chapters, and the interactive modules built so far.
export type SubjectId = "science" | "history" | "geography" | "civics";
export type ModuleId =
  | "light"
  | "harappa"
  | "cdiversity"
  | "cdiscrim"
  | "cgovt"
  | "cdemo"
  | "cpanchayat"
  | "crural"
  | "curban"
  | "crurallive"
  | "curbanlive"
  | "gsolar"
  | "gglobe"
  | "gmotion"
  | "gmaps"
  | "gdomains"
  | "glandforms"
  | "gindia"
  | "gclimate"
  | "hwhat"
  | "htrail"
  | "hfarm"
  | "hbooks"
  | "hkingdoms"
  | "hideas"
  | "hashoka"
  | "hvillages"
  | "htraders"
  | "hempires"
  | "hbuildings"
  | "food"
  | "nutrients"
  | "fabric"
  | "materials"
  | "separation"
  | "changes"
  | "plants"
  | "movement"
  | "habitats"
  | "motion"
  | "electricity"
  | "magnets"
  | "water"
  | "air";

export type LearningModule = {
  id: ModuleId;
  subject: SubjectId;
  kind: "frame" | "chapter"; // a separate page shown in a frame, or a chapter built into the app
  file?: string;
  icon: string;
  name: string;
  chapter: number;
  chapterTitle: string;
  blurb: string;
  minutes: number;
  features: { icon: string; label: string }[];
};

export const MODULES: Record<ModuleId, LearningModule> = {
  light: {
    id: "light",
    subject: "science",
    kind: "frame",
    icon: "🔦",
    file: "modules/light-lab.html",
    name: "Light Lab",
    chapter: 11,
    chapterTitle: "Light, Shadows and Reflections",
    blurb: "Switch off the lights, cast shadows, build a pinhole camera and bounce beams off mirrors.",
    minutes: 25,
    features: [
      { icon: "🧪", label: "6 hands-on experiments" },
      { icon: "✨", label: "21 discoveries to make" },
      { icon: "💡", label: "4 big ideas, step by step" },
    ],
  },
  harappa: {
    id: "harappa",
    subject: "history",
    kind: "frame",
    icon: "🏛",
    file: "modules/time-travel.html",
    name: "Time Travel: Harappa",
    chapter: 4,
    chapterTitle: "In the Earliest Cities",
    blurb: "Travel back 4,700 years. Walk through a Harappan city and solve the mysteries of how people lived.",
    minutes: 30,
    features: [
      { icon: "🏛", label: "13 places to explore" },
      { icon: "🔍", label: "6 investigations to solve" },
      { icon: "🏷", label: "Fact vs. guess labels" },
    ],
  },
  food: {
    id: "food",
    subject: "science",
    kind: "chapter",
    icon: "🍲",
    name: "Food Detective",
    chapter: 1,
    chapterTitle: "Food: Where Does It Come From?",
    blurb: "Trace every ingredient to a plant or an animal, find the parts of plants we eat, grow sprouts and sort the eaters.",
    minutes: 15,
    features: [
      { icon: "🧺", label: "4 hands-on labs" },
      { icon: "✨", label: "14 discoveries" },
      { icon: "🌱", label: "Grow sprouts" },
    ],
  },
  nutrients: {
    id: "nutrients",
    subject: "science",
    kind: "chapter",
    icon: "🥗",
    name: "Nutrition Lab",
    chapter: 2,
    chapterTitle: "Components of Food",
    blurb: "Test foods for starch, protein and fat, build a balanced plate and map deficiency diseases on the body.",
    minutes: 15,
    features: [
      { icon: "🧪", label: "3 food tests" },
      { icon: "✨", label: "15 discoveries" },
      { icon: "🍽", label: "Balanced plate game" },
    ],
  },
  fabric: {
    id: "fabric",
    subject: "science",
    kind: "chapter",
    icon: "🧵",
    name: "Fabric Lab",
    chapter: 3,
    chapterTitle: "Fibre to Fabric",
    blurb: "Zoom from cloth to fibres, follow cotton from field to fabric, and weave and knit row by row.",
    minutes: 15,
    features: [
      { icon: "🔍", label: "Zoom into fabric" },
      { icon: "✨", label: "12 discoveries" },
      { icon: "🧶", label: "Weave vs knit" },
    ],
  },
  materials: {
    id: "materials",
    subject: "science",
    kind: "chapter",
    icon: "🧱",
    name: "Materials Lab",
    chapter: 4,
    chapterTitle: "Sorting Materials into Groups",
    blurb: "Test materials for shine and hardness, stir things into water, drop them in a tub and look at a bulb through them.",
    minutes: 15,
    features: [
      { icon: "🔬", label: "5 material tests" },
      { icon: "✨", label: "14 discoveries" },
      { icon: "👀", label: "See-through test" },
    ],
  },
  separation: {
    id: "separation",
    subject: "science",
    kind: "chapter",
    icon: "⚗️",
    name: "Separation Lab",
    chapter: 5,
    chapterTitle: "Separation of Substances",
    blurb: "Pick, winnow and sieve grains, clean muddy water, get salt from sea water and fill a solution until it is saturated.",
    minutes: 15,
    features: [
      { icon: "🌾", label: "4 hands-on labs" },
      { icon: "✨", label: "13 discoveries" },
      { icon: "💧", label: "Clean muddy water" },
    ],
  },
  changes: {
    id: "changes",
    subject: "science",
    kind: "chapter",
    icon: "🔄",
    name: "Changes Lab",
    chapter: 6,
    chapterTitle: "Changes Around Us",
    blurb: "Decide which changes can be undone, fit a hot iron rim on a cart wheel, and melt or burn everyday things.",
    minutes: 15,
    features: [
      { icon: "🔥", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "⚙️", label: "Cart-wheel rim" },
    ],
  },
  plants: {
    id: "plants",
    subject: "science",
    kind: "chapter",
    icon: "🌱",
    name: "Plant Lab",
    chapter: 7,
    chapterTitle: "Getting to Know Plants",
    blurb: "Sort herbs, shrubs and trees, watch coloured water climb a stem, match leaves to roots and open up a flower.",
    minutes: 15,
    features: [
      { icon: "🌿", label: "4 hands-on labs" },
      { icon: "✨", label: "14 discoveries" },
      { icon: "🌸", label: "Inside a flower" },
    ],
  },
  movement: {
    id: "movement",
    subject: "science",
    kind: "chapter",
    icon: "🦴",
    name: "Body Movement Lab",
    chapter: 8,
    chapterTitle: "Body Movements",
    blurb: "Bend real joints, explore the skeleton, see muscles pull in pairs and find out how animals move.",
    minutes: 15,
    features: [
      { icon: "🦴", label: "4 hands-on labs" },
      { icon: "✨", label: "15 discoveries" },
      { icon: "💪", label: "Muscle pairs" },
    ],
  },
  habitats: {
    id: "habitats",
    subject: "science",
    kind: "chapter",
    icon: "🐪",
    name: "Habitat Lab",
    chapter: 9,
    chapterTitle: "The Living Organisms — Characteristics and Habitats",
    blurb: "Match living things to habitats, explore a camel and a fish, compare a cactus with a leafy plant and decide what is alive.",
    minutes: 15,
    features: [
      { icon: "🏜", label: "4 hands-on labs" },
      { icon: "✨", label: "15 discoveries" },
      { icon: "🌵", label: "Desert adaptations" },
    ],
  },
  motion: {
    id: "motion",
    subject: "science",
    kind: "chapter",
    icon: "📏",
    name: "Measure & Motion Lab",
    chapter: 10,
    chapterTitle: "Motion and Measurement of Distances",
    blurb: "Measure with handspans and a scale, measure a curved line, sort types of motion and travel through the history of transport.",
    minutes: 15,
    features: [
      { icon: "📏", label: "4 hands-on labs" },
      { icon: "✨", label: "12 discoveries" },
      { icon: "🚂", label: "Transport timeline" },
    ],
  },
  hwhat: {
    id: "hwhat",
    subject: "history",
    kind: "chapter",
    icon: "🔍",
    name: "History Detective",
    chapter: 1,
    chapterTitle: "What, Where, How and When?",
    blurb: "Map where people lived, sort the clues historians use, and crack BC and AD date puzzles.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  htrail: {
    id: "htrail",
    subject: "history",
    kind: "chapter",
    icon: "🏹",
    name: "Stone Age Trail",
    chapter: 2,
    chapterTitle: "On the Trail of the Earliest People",
    blurb: "Find out why hunter-gatherers kept moving, explore a Stone Age site and put the ages of stone tools in order.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hfarm: {
    id: "hfarm",
    subject: "history",
    kind: "chapter",
    icon: "🌾",
    name: "First Farmers",
    chapter: 3,
    chapterTitle: "From Gathering to Growing Food",
    blurb: "Become the first farmers, visit early village sites on a map and compare settled life with life on the move.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hbooks: {
    id: "hbooks",
    subject: "history",
    kind: "chapter",
    icon: "📜",
    name: "Vedas & Megaliths",
    chapter: 5,
    chapterTitle: "What Books and Burials Tell Us",
    blurb: "Discover the Rigveda, sort language families and look inside a megalith burial.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hkingdoms: {
    id: "hkingdoms",
    subject: "history",
    kind: "chapter",
    icon: "👑",
    name: "Kings & Republics",
    chapter: 6,
    chapterTitle: "Kingdoms, Kings and an Early Republic",
    blurb: "Follow the horse sacrifice, find out who paid taxes, and see who could speak in the Vajji assembly.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hideas: {
    id: "hideas",
    subject: "history",
    kind: "chapter",
    icon: "🧘",
    name: "New Ideas",
    chapter: 7,
    chapterTitle: "New Questions and Ideas",
    blurb: "Trace the Buddha's life, explore his teachings and compare the ideas of Mahavira and the Upanishads.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hashoka: {
    id: "hashoka",
    subject: "history",
    kind: "chapter",
    icon: "🦁",
    name: "Ashoka's Empire",
    chapter: 8,
    chapterTitle: "Ashoka, the Emperor Who Gave Up War",
    blurb: "Explore the Mauryan empire, read what Ashoka's inscriptions tell us and sort his dhamma.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hvillages: {
    id: "hvillages",
    subject: "history",
    kind: "chapter",
    icon: "🏘",
    name: "Villages & Towns",
    chapter: 9,
    chapterTitle: "Vital Villages, Thriving Towns",
    blurb: "See how iron changed farming, meet the people of early villages and explore a city and port.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  htraders: {
    id: "htraders",
    subject: "history",
    kind: "chapter",
    icon: "⛵",
    name: "Trade Routes",
    chapter: 10,
    chapterTitle: "Traders, Kings and Pilgrims",
    blurb: "Follow traders over land and sea, meet the chiefs of the south and the pilgrims who came from China.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hempires: {
    id: "hempires",
    subject: "history",
    kind: "chapter",
    icon: "🏰",
    name: "Empire Builders",
    chapter: 11,
    chapterTitle: "New Empires and Kingdoms",
    blurb: "Decode Samudragupta's prashasti, meet Harsha and his rivals, and see how kingdoms were run.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "9 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  hbuildings: {
    id: "hbuildings",
    subject: "history",
    kind: "chapter",
    icon: "🏛",
    name: "Monuments & Books",
    chapter: 12,
    chapterTitle: "Buildings, Paintings and Books",
    blurb: "Explore a stupa, temples, Ajanta and the iron pillar, and sort the great books of the past.",
    minutes: 15,
    features: [
      { icon: "🏺", label: "3 hands-on labs" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "🔎", label: "Fact vs. guess labels" },
    ],
  },
  cdiversity: {
    id: "cdiversity",
    subject: "civics",
    kind: "chapter",
    icon: "🌈",
    name: "Diversity Explorer",
    chapter: 1,
    chapterTitle: "Understanding Diversity",
    blurb: "Sort diversity from inequality with the two Samirs, explore Ladakh and Kerala through five lenses, and discover unity in diversity.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  cdiscrim: {
    id: "cdiscrim",
    subject: "civics",
    kind: "chapter",
    icon: "⚖️",
    name: "Fairness Lab",
    chapter: 2,
    chapterTitle: "Diversity and Discrimination",
    blurb: "Spot prejudice, rethink stereotypes, follow young Ambedkar's journey of 1901, and see how the Constitution promises equality.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "13 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  cgovt: {
    id: "cgovt",
    subject: "civics",
    kind: "chapter",
    icon: "🏛",
    name: "Town Hall",
    chapter: 3,
    chapterTitle: "What is Government?",
    blurb: "Find the government at work around town, sort local, state and central decisions, and watch who gets to vote change over time.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "16 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  cdemo: {
    id: "cdemo",
    subject: "civics",
    kind: "chapter",
    icon: "🗳",
    name: "Democracy Lab",
    chapter: 4,
    chapterTitle: "Key Elements of a Democratic Government",
    blurb: "See South Africa before and after apartheid, run a playground vote, make your voice heard and share the Cauvery between two states.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "16 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  cpanchayat: {
    id: "cpanchayat",
    subject: "civics",
    kind: "chapter",
    icon: "🌳",
    name: "Gram Sabha",
    chapter: 5,
    chapterTitle: "Panchayati Raj",
    blurb: "Join the Gram Sabha in Hardas village: solve a water problem, check the BPL list and climb the three levels of Panchayats.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  crural: {
    id: "crural",
    subject: "civics",
    kind: "chapter",
    icon: "📒",
    name: "Village Office",
    chapter: 6,
    chapterTitle: "Rural Administration",
    blurb: "Follow Mohan to the police station, check the Patwari's record for a shifted boundary, and discover a new law for daughters.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "14 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  curban: {
    id: "curban",
    subject: "civics",
    kind: "chapter",
    icon: "🏙",
    name: "City Works",
    chapter: 7,
    chapterTitle: "Urban Administration",
    blurb: "Find who fixes a broken street light, solve ward problems, fill the city's purse with taxes and retell Gangabai's protest.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "14 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  crurallive: {
    id: "crurallive",
    subject: "civics",
    kind: "chapter",
    icon: "🌾",
    name: "Village Livelihoods",
    chapter: 8,
    chapterTitle: "Rural Livelihoods",
    blurb: "Compare the lives of Thulasi, Sekar and Ramalingam, play the debt game and share a fishing family's catch.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "15 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  curbanlive: {
    id: "curbanlive",
    subject: "civics",
    kind: "chapter",
    icon: "💼",
    name: "City at Work",
    chapter: 9,
    chapterTitle: "Urban Livelihoods",
    blurb: "Walk a busy street, live a rickshaw puller's day, and compare casual and permanent work in the city.",
    minutes: 15,
    features: [
      { icon: "🏘", label: "Real-life scenes" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gsolar: {
    id: "gsolar",
    subject: "geography",
    kind: "chapter",
    icon: "☀️",
    name: "Solar System Lab",
    chapter: 1,
    chapterTitle: "The Earth in the Solar System",
    blurb: "Trace the Saptarishi to the Pole Star, run a working solar system and watch the moon keep one face towards us.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gglobe: {
    id: "gglobe",
    subject: "geography",
    kind: "chapter",
    icon: "🌐",
    name: "Globe Lab",
    chapter: 2,
    chapterTitle: "Globe: Latitudes and Longitudes",
    blurb: "Spin a globe, add the Tropics and heat zones, find places on the grid and see how longitude changes the time.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gmotion: {
    id: "gmotion",
    subject: "geography",
    kind: "chapter",
    icon: "🔄",
    name: "Earth in Motion",
    chapter: 3,
    chapterTitle: "Motions of the Earth",
    blurb: "Spin the earth to make day and night, then travel round the sun through solstices and equinoxes.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gmaps: {
    id: "gmaps",
    subject: "geography",
    kind: "chapter",
    icon: "🗺",
    name: "Map Lab",
    chapter: 4,
    chapterTitle: "Maps",
    blurb: "Find directions, measure distances with a scale and read symbols on a village map.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gdomains: {
    id: "gdomains",
    subject: "geography",
    kind: "chapter",
    icon: "🌍",
    name: "Earth's Domains",
    chapter: 5,
    chapterTitle: "Major Domains of the Earth",
    blurb: "Explore land, water, air and life, tap the continents and oceans, and climb through the atmosphere.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "12 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  glandforms: {
    id: "glandforms",
    subject: "geography",
    kind: "chapter",
    icon: "⛰",
    name: "Landform Lab",
    chapter: 6,
    chapterTitle: "Major Landforms of the Earth",
    blurb: "Explore mountains, plateaus and plains, and build fold, block and volcanic mountains.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "10 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gindia: {
    id: "gindia",
    subject: "geography",
    kind: "chapter",
    icon: "🧭",
    name: "India Explorer",
    chapter: 7,
    chapterTitle: "Our Country – India",
    blurb: "Locate India, watch the sunrise sweep across it, explore its landscapes and sort its rivers.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "11 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  gclimate: {
    id: "gclimate",
    subject: "geography",
    kind: "chapter",
    icon: "🌦",
    name: "Monsoon & Wildlife",
    chapter: 8,
    chapterTitle: "India: Climate, Vegetation and Wildlife",
    blurb: "Watch the monsoon winds through the year, crack weather vs climate, and see why forests and wildlife matter.",
    minutes: 15,
    features: [
      { icon: "🌍", label: "Interactive simulations" },
      { icon: "✨", label: "15 discoveries" },
      { icon: "✅", label: "Quick checks" },
    ],
  },
  electricity: {
    id: "electricity",
    subject: "science",
    kind: "chapter",
    icon: "💡",
    name: "Circuit Lab",
    chapter: 12,
    chapterTitle: "Electricity and Circuits",
    blurb: "Look inside a torch, wire up a bulb, build a safety-pin switch and test what conducts electricity.",
    minutes: 20,
    features: [
      { icon: "🔌", label: "4 hands-on labs" },
      { icon: "✨", label: "16 discoveries" },
      { icon: "✅", label: "10 quick checks" },
    ],
  },
  magnets: {
    id: "magnets",
    subject: "science",
    kind: "chapter",
    icon: "🧲",
    name: "Magnet Lab",
    chapter: 13,
    chapterTitle: "Fun with Magnets",
    blurb: "Go on a Magnes walk, see iron filings find the poles, let a magnet find North and race magnetic cars.",
    minutes: 20,
    features: [
      { icon: "🧲", label: "4 hands-on labs" },
      { icon: "✨", label: "16 discoveries" },
      { icon: "🧭", label: "Build a compass" },
    ],
  },
  water: {
    id: "water",
    subject: "science",
    kind: "chapter",
    icon: "💧",
    name: "Water Cycle Lab",
    chapter: 14,
    chapterTitle: "Water",
    blurb: "Count the water your family uses, race evaporation in sun and shade, run the water cycle and harvest the rain.",
    minutes: 20,
    features: [
      { icon: "🌧", label: "Run the water cycle" },
      { icon: "✨", label: "16 discoveries" },
      { icon: "🏠", label: "Rainwater harvesting" },
    ],
  },
  air: {
    id: "air",
    subject: "science",
    kind: "chapter",
    icon: "🌬️",
    name: "Air Lab",
    chapter: 15,
    chapterTitle: "Air Around Us",
    blurb: "Trap air in a bottle, starve a candle of oxygen, find air hiding in water and soil, and put the wind to work.",
    minutes: 20,
    features: [
      { icon: "🕯", label: "4 hands-on labs" },
      { icon: "✨", label: "15 discoveries" },
      { icon: "🌀", label: "Wind at work" },
    ],
  },
};

export type Subject = {
  id: SubjectId;
  name: string;
  tagline: string;
  book: string;
  modules: ModuleId[]; // interactive modules, in chapter order
  chapters: string[];
};

export const SUBJECTS: Record<SubjectId, Subject> = {
  science: {
    id: "science",
    name: "Science",
    tagline: "See how the world works",
    book: "NCERT Science · Textbook for Class VI",
    modules: ["food", "nutrients", "fabric", "materials", "separation", "changes", "plants", "movement", "habitats", "motion", "light", "electricity", "magnets", "water", "air"],
    chapters: [
      "Food: Where Does It Come From?",
      "Components of Food",
      "Fibre to Fabric",
      "Sorting Materials into Groups",
      "Separation of Substances",
      "Changes Around Us",
      "Getting to Know Plants",
      "Body Movements",
      "The Living Organisms — Characteristics and Habitats",
      "Motion and Measurement of Distances",
      "Light, Shadows and Reflections",
      "Electricity and Circuits",
      "Fun with Magnets",
      "Water",
      "Air Around Us",
      "Garbage In, Garbage Out",
    ],
  },
  history: {
    id: "history",
    name: "History",
    tagline: "Step into our pasts",
    book: "NCERT Our Pasts – I · History for Class VI",
    modules: ["hwhat", "htrail", "hfarm", "harappa", "hbooks", "hkingdoms", "hideas", "hashoka", "hvillages", "htraders", "hempires", "hbuildings"],
    chapters: [
      "What, Where, How and When?",
      "On the Trail of the Earliest People",
      "From Gathering to Growing Food",
      "In the Earliest Cities",
      "What Books and Burials Tell Us",
      "Kingdoms, Kings and an Early Republic",
      "New Questions and Ideas",
      "Ashoka, the Emperor Who Gave Up War",
      "Vital Villages, Thriving Towns",
      "Traders, Kings and Pilgrims",
      "New Empires and Kingdoms",
      "Buildings, Paintings and Books",
    ],
  },
  geography: {
  id: "geography",
  name: "Geography",
  tagline: "Earth is full of wonders. Let's explore!",
  book: "NCERT The Earth: Our Habitat · Geography for Class VI",
  modules: ["gsolar", "gglobe", "gmotion", "gmaps", "gdomains", "glandforms", "gindia", "gclimate"],
  chapters: ["The Earth in the Solar System", "Globe: Latitudes and Longitudes", "Motions of the Earth", "Maps", "Major Domains of the Earth", "Major Landforms of the Earth", "Our Country – India", "India: Climate, Vegetation and Wildlife"],
  },
  civics: {
    id: "civics",
    name: "Civics",
    tagline: "Understand the world around you",
    book: "NCERT Social and Political Life – I · Class VI",
    modules: ["cdiversity", "cdiscrim", "cgovt", "cdemo", "cpanchayat", "crural", "curban", "crurallive", "curbanlive"],
    chapters: ["Understanding Diversity", "Diversity and Discrimination", "What is Government?", "Key Elements of a Democratic Government", "Panchayati Raj", "Rural Administration", "Urban Administration", "Rural Livelihoods", "Urban Livelihoods"],
  },
};

export const COMING_SOON = [
  { icon: "➗", name: "Maths" },
  { icon: "📖", name: "English" },
];

// Where the module page comes from: a file next to the app, or (in the single-file build) an inlined copy.
export async function moduleSrc(id: ModuleId): Promise<string> {
  if (__SINGLE__) {
    const { inlineUrl } = await import("./inlineModules");
    return inlineUrl(id);
  }
  return MODULES[id].file!;
}

export const moduleForChapter = (s: Subject, n: number) => s.modules.map((id) => MODULES[id]).find((m) => m.chapter === n);
