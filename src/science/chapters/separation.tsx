// Chapter 5 · Separation of Substances (NCERT Science Class VI, 2018-19, pp. 35–45).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { PickLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Readout, Stage } from "../ui";

const rise = (delay: number, dur = 1.8): React.CSSProperties => ({ animation: `zrise ${dur}s ease-out ${delay}s infinite` });

/* Stop 1 · pick the method */
function Methods({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Choose the best way to separate each mixture."
      cases={[
        { id: "stones", icon: "🍚", prompt: "A few small stones are mixed with rice. How do you remove them?", options: ["Handpicking", "Winnowing", "Sieving"], answer: 0, explain: "Handpicking: just pick out the stones by hand. It works when the unwanted bits are few and easy to see.", disc: "pick" },
        { id: "husk", icon: "🌾", prompt: "Light husk is mixed with heavier grain. How does a farmer separate them?", options: ["Sieving", "Winnowing", "Filtration"], answer: 1, explain: "Winnowing: drop the mixture from a height. Wind carries the light husk away into a separate heap; the heavier grains fall near the farmer.", disc: "winnow" },
        { id: "flour", icon: "🥣", prompt: "Flour has some bran and tiny pebbles in it. What do you use?", options: ["Sieving", "Handpicking", "Evaporation"], answer: 0, explain: "Sieving: fine flour passes through the holes of the sieve; bigger bran and pebbles stay on top.", disc: "sieve" },
        { id: "stalks", icon: "🌿", prompt: "After harvest, grains of paddy are still on their stalks. How are they separated?", options: ["Threshing", "Decantation", "Winnowing"], answer: 0, explain: "Threshing: the stalks are beaten so the grains come off — by hand, with bullocks, or with machines.", disc: "thresh" },
      ]}
    />
  );
}

/* Stop 2 · clean the muddy water */
function MuddyWater({ discover }: SimProps) {
  const [step, setStep] = useState(0); // 0 muddy, 1 settled, 2 decanted, 3 filtered
  useEffect(() => {
    if (step >= 1) discover("sediment");
    if (step >= 2) discover("decant");
    if (step >= 3) discover("filter");
  }, [step, discover]);
  return (
    <Stage
      caption={
        [
          "A glass of muddy water. Leave it to stand for a while.",
          "Sedimentation: the heavier mud and sand settled at the bottom as sediment.",
          "Decantation: the water above was gently poured into another glass without disturbing the sediment. It's still a little cloudy.",
          "Filtration: a filter paper holds back the tiny particles. Clear water drips through.",
        ][step]
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#13112b" />
        {/* glass 1 */}
        <g transform={step === 2 ? "rotate(-6 150 220)" : undefined} style={{ transition: "transform .6s" }}>
          <path d="M100 90 h100 l-8 140 h-84 z" fill="#cfe8ff" fillOpacity=".1" stroke="#cfe8ff" strokeWidth="3" />
          {step === 0 && <path d="M103 110 h94 l-6 118 h-82 z" fill="#8a6a3a" opacity=".85" />}
          {step === 1 && (
            <>
              <path d="M103 110 h94 l-5 92 h-84 z" fill="#b39c74" opacity=".7" />
              <path d="M108 202 h84 l-1 26 h-82 z" fill="#5a3e1f" />
            </>
          )}
          {step >= 2 && <path d="M108 206 h84 l-1 22 h-82 z" fill="#5a3e1f" />}
        </g>
        {/* glass 2 */}
        {step >= 2 && (
          <g className="animate-fade">
            <path d="M260 90 h100 l-8 140 h-84 z" fill="#cfe8ff" fillOpacity=".1" stroke="#cfe8ff" strokeWidth="3" />
            <path d="M263 120 h94 l-6 108 h-82 z" fill={step === 3 ? "#b39c74" : "#b39c74"} opacity={step === 3 ? 0.35 : 0.7} />
          </g>
        )}
        {/* funnel + filter + glass 3 */}
        {step === 3 && (
          <g className="animate-rise">
            <path d="M400 70 h80 l-34 50 v24 h-12 v-24 z" fill="#cfe8ff" fillOpacity=".12" stroke="#cfe8ff" strokeWidth="2.5" />
            <path d="M408 74 h64 l-32 44 z" fill="#f4efe3" opacity=".85" />
            <path d="M412 78 h56 l-6 8 h-44 z" fill="#b39c74" opacity=".8" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx="440" cy="150" r="3" fill="#9fd8ff" style={{ animation: `zfall 1.2s linear ${i * 0.4}s infinite` }} />
            ))}
            <path d="M405 170 h70 l-6 60 h-58 z" fill="#cfe8ff" fillOpacity=".1" stroke="#cfe8ff" strokeWidth="2.5" />
            <path d="M408 195 h64 l-3 33 h-58 z" fill="#7fc3f0" opacity=".8" />
          </g>
        )}
        {step === 2 && <path d="M200 96 C 230 70, 250 80, 268 112" stroke="#b39c74" strokeWidth="6" fill="none" style={{ strokeDasharray: "6 8", animation: "zflow .5s linear infinite" }} />}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={step >= 1} onClick={() => setStep((s) => Math.max(s, 1))}>
          ⏳ Leave it to settle
        </Btn>
        <Btn on={step >= 2} onClick={() => step >= 1 && setStep((s) => Math.max(s, 2))}>
          🥛 Pour off the water
        </Btn>
        <Btn on={step >= 3} onClick={() => step >= 2 && setStep(3)}>
          🧻 Filter it
        </Btn>
        <Btn onClick={() => setStep(0)}>↺ Muddy again</Btn>
      </div>
    </Stage>
  );
}

/* Stop 3 · salt from salt water */
function SaltWater({ discover }: SimProps) {
  const [heat, setHeat] = useState(false);
  const [level, setLevel] = useState(1);
  const [plate, setPlate] = useState(false);
  useEffect(() => {
    if (!heat || level <= 0) return;
    discover("evaporate");
    const id = window.setInterval(() => setLevel((l) => Math.max(0, l - 0.04)), 200);
    return () => window.clearInterval(id);
  }, [heat, level, discover]);
  useEffect(() => {
    if (level <= 0) discover("salt");
    if (plate && heat && level > 0) discover("condense");
  }, [level, plate, heat, discover]);
  return (
    <Stage
      caption={
        level <= 0
          ? "All the water has evaporated. The salt is left behind in the beaker!"
          : plate && heat
            ? "Steam hits the cold plate and condenses into water drops. The drops are not salty!"
            : heat
              ? "The water is evaporating. Hold a cold plate above the beaker."
              : "A beaker of salt water. Heat it."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#13112b" />
        <path d="M200 90 h120 v120 q0 10 -10 10 h-100 q-10 0 -10 -10 z" fill="#cfe8ff" fillOpacity=".1" stroke="#cfe8ff" strokeWidth="3" />
        <rect x="203" y={218 - level * 110} width="114" height={level * 110} rx="6" fill="#4fb6e0" opacity=".8" />
        {level <= 0.25 &&
          Array.from({ length: Math.round((0.25 - level) * 100) }, (_, i) => (
            <rect key={i} x={210 + ((i * 23) % 100)} y={208 + ((i * 7) % 8)} width="5" height="5" fill="#fff" transform={`rotate(${i * 31} ${212 + ((i * 23) % 100)} ${210 + ((i * 7) % 8)})`} />
          ))}
        {heat && level > 0 && [0, 1, 2, 3].map((i) => <circle key={i} cx={225 + i * 22} cy={210 - level * 110} r="4" fill="#dff4ff" style={rise(i * 0.4)} />)}
        {plate && (
          <g className="animate-rise">
            <rect x="180" y="40" width="160" height="12" rx="5" fill="#c9cfdc" />
            {heat && level > 0 && [0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={200 + i * 30} cy="58" rx="3" ry="4" fill="#9fd8ff" className="animate-pop" />)}
          </g>
        )}
        <path d="M220 222 L210 250 M300 222 L310 250" stroke="#7d8497" strokeWidth="4" />
        {heat && (
          <g>
            <path d="M260 250 C270 236 270 228 260 222 C250 228 250 236 260 250 Z" fill="#ffb534" className="animate-glow" />
          </g>
        )}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        <Btn on={heat} onClick={() => setHeat((h) => !h)}>
          🔥 {heat ? "Heating" : "Heat it"}
        </Btn>
        <Btn on={plate} onClick={() => setPlate((p) => !p)}>
          🍽 {plate ? "Cold plate held" : "Hold a cold plate above"}
        </Btn>
        <Btn onClick={() => (setLevel(1), setHeat(false))}>↺ Fresh salt water</Btn>
      </div>
    </Stage>
  );
}

/* Stop 4 · how much can dissolve? */
const CAP = { salt: { cold: 7, hot: 8 }, sugar: { cold: 40, hot: 60 } } as const;
function Saturate({ discover }: SimProps) {
  const [what, setWhat] = useState<"salt" | "sugar">("salt");
  const [hot, setHot] = useState(false);
  const [spoons, setSpoons] = useState(0);
  const cap = CAP[what][hot ? "hot" : "cold"];
  const dissolved = Math.min(spoons, cap);
  const extra = Math.max(0, spoons - cap);
  useEffect(() => {
    if (extra > 0) discover("saturated");
    if (what === "sugar" && dissolved > CAP.salt.hot) discover("sugar");
    if (hot && dissolved > CAP[what].cold) discover("heat");
  }, [extra, what, dissolved, hot, spoons, discover]);
  return (
    <Stage
      caption={
        extra > 0
          ? `Saturated! No more ${what} will dissolve — the extra settles at the bottom.${hot ? (dissolved > CAP[what].cold ? " Even so, the hot water dissolved more than cold water could." : "") : " Try heating the solution."}`
          : hot && dissolved > CAP[what].cold
            ? `Hot water dissolved more ${what} than cold water could!`
            : `Add ${what}, one teaspoon at a time, to half a cup of water and stir.`
      }
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_180px]">
        <svg viewBox="0 0 240 200" className="mx-auto block h-48 w-auto">
          <path d="M60 20 h120 l-10 170 h-100 z" fill="#cfe8ff" fillOpacity=".1" stroke="#cfe8ff" strokeWidth="3" />
          <path d="M64 70 h112 l-8 118 h-96 z" fill={hot ? "#f2a65a" : "#4fb6e0"} opacity={0.55 + Math.min(0.35, dissolved / cap / 3)} style={{ transition: "all .4s" }} />
          {Array.from({ length: Math.min(30, extra * (what === "salt" ? 4 : 1)) }, (_, i) => (
            <rect key={i} x={78 + ((i * 17) % 84)} y={176 + ((i * 5) % 8)} width="5" height="5" fill="#fff" className="animate-pop" />
          ))}
          {hot && <path d="M120 198 C128 186 128 180 120 174 C112 180 112 186 120 198 Z" fill="#ffb534" className="animate-glow" />}
        </svg>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
          <Readout label="Spoons added" value={spoons} />
          <Readout label="Dissolved" value={dissolved} color="#5fe0a0" />
          <Readout label="Left undissolved" value={extra} color={extra ? "#ff8a7a" : "#ffffff66"} />
        </div>
      </div>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <Btn on onClick={() => setSpoons((n) => n + 1)}>
            🥄 Add 1 spoon
          </Btn>
          <Btn onClick={() => setSpoons((n) => n + 5)}>+5 spoons</Btn>
          <Btn on={hot} onClick={() => setHot((h) => !h)}>
            🔥 {hot ? "Heated" : "Heat the solution"}
          </Btn>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn on={what === "salt"} onClick={() => (setWhat("salt"), setSpoons(0), setHot(false))}>
            🧂 Salt
          </Btn>
          <Btn on={what === "sugar"} onClick={() => (setWhat("sugar"), setSpoons(0), setHot(false))}>
            🍬 Sugar
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

const chapter: Chapter = {
  id: "separation",
  n: 5,
  title: "Separation of Substances",
  pages: "35–45",
  icon: "⚗️",
  theme: { grad: "linear-gradient(135deg,#1a1240 0%,#5a3db8 55%,#4fc1d9 125%)", accent: "#5a3db8", soft: "#ece7ff", ink: "#3a2580" },
  opening: "Mother picks stones out of rice, a farmer throws grain into the wind, and salt is made from sea water. Why do we separate substances — and how?",
  stops: [
    {
      id: "grains",
      icon: "🌾",
      title: "Pick, thresh, winnow, sieve",
      pages: "35–38",
      wonder: {
        q: "A farmer drops a mixture of grain and husk from a height on a windy day. What happens?",
        options: [
          { id: "together", label: "They fall together in one heap" },
          { id: "apart", label: "The wind blows the light husk away; grain falls nearby" },
          { id: "all", label: "Everything blows away" },
        ],
        answer: "apart",
        reveal: "The light husk is carried away by the wind and forms a separate heap; the heavier grain falls near the farmer. This is winnowing.",
      },
      explore: { activity: "Activities 1–4", title: "Choose the method", how: "For each mixture, pick the best way to separate it.", Sim: Methods },
      discoveries: [
        { id: "pick", text: "Handpicking removes a few large, visible impurities" },
        { id: "winnow", text: "Winnowing uses wind to separate light from heavy" },
        { id: "sieve", text: "Sieving separates by size" },
        { id: "thresh", text: "Threshing beats grain off the stalks" },
      ],
      understand: [
        { title: "Why separate?", body: "To remove useless or harmful parts, to get rid of impurities, or to separate two useful parts of a mixture." },
        { title: "Handpicking & threshing", body: "Handpicking removes slightly larger pieces like stones from grain. Threshing separates grain from stalks." },
        { title: "Winnowing & sieving", body: "Winnowing separates heavier and lighter parts by wind or blowing air. Sieving separates fine particles from bigger ones using a sieve." },
        { title: "Churning", body: "Butter is separated from curd by churning — the lighter butter floats up." },
      ],
      check: [
        { id: "p1", kind: "mcq", q: "The method of separating seeds of paddy from its stalks is called…", options: ["Threshing", "Sieving", "Decantation"], answer: 0, why: "Beating stalks to free the grain is threshing." },
        { id: "p2", kind: "tf", q: "A mixture of powdered salt and sugar can be separated by winnowing.", answer: false, why: "Both are similar in weight and size; winnowing won't work." },
      ],
      connect: [
        { icon: "🏗", title: "Construction sites", body: "Sand is sieved to remove pebbles and stones." },
        { icon: "🥛", title: "Churning butter", body: "Churning curd makes the lighter butter separate and float." },
        { icon: "🍵", title: "Making tea", body: "A tea strainer is a small sieve!" },
      ],
    },
    {
      id: "muddy",
      icon: "💧",
      title: "Clean the muddy water",
      pages: "38–40",
      wonder: {
        q: "You leave a glass of muddy water untouched for an hour. What do you expect?",
        options: [
          { id: "same", label: "It stays just as muddy" },
          { id: "settle", label: "The mud settles at the bottom" },
          { id: "float", label: "The mud floats to the top" },
        ],
        answer: "settle",
        reveal: "The heavier mud settles at the bottom — sedimentation. The clearer water above can then be poured off.",
      },
      explore: { activity: "Activities 5 & 6", title: "Three steps to clear water", how: "Let it settle, pour it off, then filter it.", Sim: MuddyWater },
      discoveries: [
        { id: "sediment", text: "Sedimentation: heavy particles settle at the bottom" },
        { id: "decant", text: "Decantation: pour off the water above the sediment" },
        { id: "filter", text: "Filtration: filter paper holds back tiny particles" },
      ],
      understand: [
        { title: "Sedimentation", body: "When the heavier part of a mixture settles at the bottom of a liquid, it's sedimentation." },
        { title: "Decantation", body: "Pouring off the liquid without disturbing the sediment is decantation. It also separates two liquids that don't mix, like oil and water." },
        { title: "Filtration", body: "A filter with very fine pores, like filter paper, removes particles that remain after decantation. Cottage cheese is separated from milk the same way." },
        { title: "Loading", body: "Adding alum to muddy water helps the dust particles settle faster." },
      ],
      check: [
        { id: "p3", kind: "mcq", q: "Muddy water was left overnight; the clear water was then poured off from the top. This is called…", options: ["Decantation", "Winnowing", "Evaporation"], answer: 0, why: "Pouring off the liquid above the sediment is decantation." },
        { id: "p4", kind: "tf", q: "A mixture of milk and water can be separated by filtration.", answer: false, why: "Milk and water mix completely; filtration can't separate them." },
      ],
      connect: [
        { icon: "🍵", title: "Tea leaves", body: "We filter tea through a strainer to remove the leaves." },
        { icon: "🧀", title: "Making paneer", body: "Lemon juice is added to milk; the paneer is filtered out through cloth." },
        { icon: "🚰", title: "Water purifiers", body: "Home filters remove tiny particles from drinking water." },
      ],
    },
    {
      id: "salt",
      icon: "🧂",
      title: "Salt from salt water",
      pages: "40–42",
      wonder: {
        q: "Heat a beaker of salt water until all the water is gone. What is left behind?",
        options: [
          { id: "nothing", label: "Nothing at all" },
          { id: "salt", label: "Salt" },
          { id: "water", label: "A little water" },
        ],
        answer: "salt",
        reveal: "Salt! The water evaporates as vapour but the salt stays behind.",
      },
      explore: { activity: "Activity 7", title: "Evaporate and condense", how: "Heat the salt water and hold a cold plate over it.", Sim: SaltWater },
      discoveries: [
        { id: "evaporate", text: "Evaporation turns water into vapour" },
        { id: "condense", text: "Vapour condenses into water on a cold plate" },
        { id: "salt", text: "When the water is gone, salt is left behind" },
      ],
      understand: [
        { title: "Evaporation", body: "The process of converting water into its vapour is evaporation. It happens continuously wherever water is present." },
        { title: "Condensation", body: "Changing water vapour back into liquid water is condensation." },
        { title: "Salt from the sea", body: "Sea water is left in shallow pits. Sunlight evaporates the water, and salt is left behind. It's then purified." },
      ],
      check: [
        { id: "p5", kind: "mcq", q: "Salt is obtained from seawater by the process of…", options: ["Filtration", "Evaporation", "Sieving"], answer: 1, why: "The water evaporates and leaves the salt." },
        { id: "p6", kind: "tf", q: "Changing water vapour into liquid water is called condensation.", answer: true, why: "That's what happened on the cold plate." },
      ],
      connect: [
        { icon: "🌊", title: "Salt pans", body: "On the coast of Gujarat and other states, salt is made in shallow pits of sea water." },
        { icon: "🍲", title: "Cooking lid", body: "Lift a lid off a boiling pot — water drops on it are condensed steam." },
        { icon: "👓", title: "Foggy glasses", body: "Breathe on a cold mirror: your breath's water vapour condenses." },
      ],
    },
    {
      id: "saturate",
      icon: "🥄",
      title: "How much can dissolve?",
      pages: "42–43",
      wonder: {
        q: "You keep adding salt to half a cup of water and stirring. What happens eventually?",
        options: [
          { id: "forever", label: "It keeps dissolving forever" },
          { id: "stops", label: "At some point no more salt dissolves" },
          { id: "boils", label: "The water starts boiling" },
        ],
        answer: "stops",
        reveal: "Eventually, no more salt dissolves and it settles at the bottom. The solution is now saturated.",
      },
      explore: { activity: "Activities 8 & 9", title: "Fill it up", how: "Add spoon after spoon. Try salt, then sugar, then heat the solution.", Sim: Saturate },
      discoveries: [
        { id: "saturated", text: "A saturated solution can't dissolve any more" },
        { id: "sugar", text: "Water dissolves different amounts of different substances" },
        { id: "heat", text: "Heating lets more substance dissolve" },
      ],
      understand: [
        { title: "Saturated solution", body: "A solution in which no more of a substance can be dissolved is a saturated solution." },
        { title: "Heat helps", body: "If we heat a saturated solution, more of the substance can dissolve." },
        { title: "Different amounts", body: "Water dissolves different amounts of different substances — much more sugar than salt, for example." },
      ],
      check: [
        { id: "p7", kind: "tf", q: "Water dissolves equal amounts of all soluble substances.", answer: false, why: "Different substances dissolve in different amounts." },
        { id: "p8", kind: "mcq", q: "How can you make a saturated solution dissolve a little more salt?", options: ["Heat it", "Cool it in a fridge", "Stir it slower"], answer: 0, why: "Heating lets more salt dissolve." },
      ],
      connect: [
        { icon: "🍯", title: "Sugar syrup", body: "Cooks heat water to dissolve lots of sugar for syrup." },
        { icon: "🧪", title: "Science labs", body: "These same separation methods are used in laboratories." },
        { icon: "🧂", title: "Salty limit", body: "Even the saltiest sea can only hold so much salt." },
      ],
    },
  ],
  learnt: [
    "Handpicking, threshing, winnowing, sieving, sedimentation, decantation and filtration are methods of separating substances from mixtures.",
    "Husk and stones can be separated from grains by handpicking. Husk is separated from heavier seeds by winnowing.",
    "Differences in the size of particles are used in sieving and filtration.",
    "Evaporation separates a dissolved solid like salt from water; condensation turns vapour back into water.",
    "A saturated solution cannot dissolve more of a substance; heating allows more to dissolve.",
  ],
  keywords: ["Threshing", "Winnowing", "Sieving", "Sedimentation", "Decantation", "Filtration", "Evaporation", "Condensation", "Saturated solution"],
};

export default chapter;
