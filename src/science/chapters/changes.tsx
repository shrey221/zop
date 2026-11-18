// Chapter 6 · Changes Around Us (NCERT Science Class VI, 2018-19, pp. 46–51).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { SortLab, TestLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage } from "../ui";

/* Stop 1 · can it be undone? */
const CHANGES = [
  { id: "fold", label: "Folding paper", icon: "📄", bin: "rev", why: "Unfold it and the sheet is back." },
  { id: "balloon", label: "Blowing up a balloon", icon: "🎈", bin: "rev", why: "Let the air out and it goes back to its old size." },
  { id: "ice", label: "Melting ice", icon: "❄️", bin: "rev", why: "Freeze the water again and you get ice back." },
  { id: "rubber", label: "Stretching a rubber band", icon: "➰", bin: "rev", why: "Let go and it springs back." },
  { id: "dough", label: "Rolling dough into a roti shape", icon: "⚪", bin: "rev", why: "You can roll it back into a ball." },
  { id: "cut", label: "Cutting paper", icon: "✂️", bin: "irr", why: "The pieces can't be joined back into the same sheet." },
  { id: "roti", label: "Baking a roti", icon: "🍞", bin: "irr", why: "A baked roti can never become dough again." },
  { id: "burst", label: "Bursting a balloon", icon: "💥", bin: "irr", why: "A burst balloon can't be made whole again." },
  { id: "curd", label: "Setting curd from milk", icon: "🥛", bin: "irr", why: "Once milk becomes curd, it can't turn back into milk." },
  { id: "incense", label: "Burning an incense stick", icon: "🔥", bin: "irr", why: "It turns into ash and gases — new substances." },
];
const doneBin = (p: Record<string, string>, bin: string) => CHANGES.filter((c) => c.bin === bin).every((c) => p[c.id]);
function UndoSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Can each change be reversed? Tap a change, then its group."
      bins={[
        { id: "rev", label: "Can be reversed", icon: "↩️", color: "#5fe0a0" },
        { id: "irr", label: "Cannot be reversed", icon: "⛔", color: "#ff8a7a" },
      ]}
      items={CHANGES}
      rules={[
        { id: "rev", when: (p) => doneBin(p, "rev") },
        { id: "irr", when: (p) => doneBin(p, "irr") },
        { id: "ice", when: (p) => !!p.ice },
        { id: "curd", when: (p) => !!p.curd },
      ]}
    />
  );
}

/* Stop 2 · fitting a hot rim on a cart wheel */
function CartWheel({ discover }: SimProps) {
  const [heat, setHeat] = useState(0);
  const [fitted, setFitted] = useState(false);
  const [cooled, setCooled] = useState(false);
  const [bounce, setBounce] = useState(false);
  const rim = fitted ? (cooled ? 100 : 100 + heat * 0.08) : 92 + heat * 0.16; // rim radius vs wheel radius 100
  useEffect(() => {
    if (heat >= 60) discover("expand");
  }, [heat, discover]);
  function fit() {
    if (rim < 100) {
      setBounce(true);
      window.setTimeout(() => setBounce(false), 500);
      return;
    }
    setFitted(true);
    discover("fit");
  }
  return (
    <Stage
      caption={
        cooled
          ? "As the rim cooled, it shrank and now grips the wheel tightly. Heating made it expand; cooling made it contract."
          : fitted
            ? "The hot, expanded rim slipped on easily. Now cool it with water."
            : rim < 100
              ? "The iron rim is a little smaller than the wooden wheel — it won't fit. Heat it."
              : "Red hot! The rim has expanded. Try to fit it now."
      }
    >
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none">
        <rect width="520" height="280" fill="#13112b" />
        {/* wooden wheel */}
        <g transform="translate(180 140)">
          <circle r="100" fill="#8a5a2b" />
          <circle r="86" fill="#13112b" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="-5" y="-86" width="10" height="86" fill="#a06a35" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="16" fill="#6b4520" />
          {fitted && <circle r={rim} fill="none" stroke={cooled ? "#7d8497" : `rgb(${150 + heat},${70 - heat * 0.4},40)`} strokeWidth="9" style={{ transition: "all .6s" }} />}
        </g>
        {/* the iron rim, off the wheel */}
        {!fitted && (
          <g transform={`translate(400 140) ${bounce ? "translate(-30 0)" : ""}`} style={{ transition: "transform .3s" }}>
            <circle r={rim * 0.62} fill="none" stroke={heat > 20 ? `rgb(${120 + heat * 1.3},${80 - heat * 0.5},${60 - heat * 0.4})` : "#7d8497"} strokeWidth="7" className={heat > 60 ? "animate-glow" : ""} />
            <text y={rim * 0.62 + 26} fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">
              iron rim (smaller)
            </text>
          </g>
        )}
        <text x="180" y="270" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">wooden cart wheel</text>
        <text x="400" y="30" fontSize="13" fontWeight="900" fill="#ffd257" textAnchor="middle">
          🌡 {cooled ? "cool" : heat > 60 ? "red hot" : heat > 20 ? "warm" : "cold"}
        </text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Heat the rim</span>
          <input type="range" min={0} max={100} value={heat} disabled={cooled} onChange={(e) => setHeat(+e.target.value)} className="w-full accent-[#ff8a3d]" aria-label="Heat the rim" />
        </label>
        <div className="flex flex-wrap gap-2">
          {!fitted && (
            <Btn on onClick={fit}>
              ⬅ Fit the rim on the wheel
            </Btn>
          )}
          {fitted && !cooled && (
            <Btn
              on
              onClick={() => {
                setCooled(true);
                discover("tight");
              }}
            >
              💧 Pour water to cool it
            </Btn>
          )}
          <Btn onClick={() => (setHeat(0), setFitted(false), setCooled(false))}>↺ Start again</Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · melt or burn? */
const HEATS = [
  { id: "wax", name: "Candle wax", icon: "🕯", results: { heat: true, back: true } },
  { id: "ice", name: "Ice", icon: "❄️", results: { heat: true, back: true } },
  { id: "choco", name: "Chocolate", icon: "🍫", results: { heat: true, back: true } },
  { id: "water", name: "Water", icon: "💧", results: { heat: true, back: true } },
  { id: "paper", name: "Paper", icon: "📄", results: { heat: true, back: false } },
  { id: "incense", name: "Incense stick", icon: "🎋", results: { heat: true, back: false } },
  { id: "match", name: "Matchstick", icon: "🔥", results: { heat: true, back: false } },
];
function MeltBurn({ discover }: SimProps) {
  return (
    <TestLab
      discover={discover}
      intro="First heat each thing. Then switch to the second test: can cooling bring it back?"
      tests={[
        { id: "heat", label: "Heat it", icon: "🔥", yes: "it changes — it melts, boils or burns", no: "nothing happens", color: "#ff8a3d" },
        { id: "back", label: "Cool it — does it come back?", icon: "❄️", yes: "yes! The change can be reversed", no: "no — new substances (ash, gases) have formed", color: "#5fe0a0" },
      ]}
      items={HEATS}
      rules={[
        { id: "melt", when: (s) => s.test.id === "back" && !!s.positive },
        { id: "burn", when: (s) => s.test.id === "back" && s.positive === false },
        { id: "newsub", when: (s) => ["paper", "incense"].every((i) => s.tested.back?.includes(i)) },
      ]}
      explain={({ item, test, positive }) =>
        !item
          ? undefined
          : test.id === "heat"
            ? `${item.name} changes when heated. Switch to the second test to see if the change can be reversed.`
            : positive
              ? `${item.name}: cooling brings it back. Melting, boiling and freezing are changes that can be reversed.`
              : `${item.name} burned into ash and gases. These new substances can't turn back — the change can't be reversed.`
      }
    />
  );
}

const chapter: Chapter = {
  id: "changes",
  n: 6,
  title: "Changes Around Us",
  pages: "46–51",
  icon: "🔄",
  theme: { grad: "linear-gradient(135deg,#3b0d0d 0%,#c2410c 55%,#f59e0b 125%)", accent: "#c2410c", soft: "#ffe9d6", ink: "#7c2d12" },
  opening: "Seasons change, buds become flowers, milk becomes curd. Some changes can be undone — and some never can. How can we tell?",
  stops: [
    {
      id: "undo",
      icon: "↩️",
      title: "Can it be undone?",
      pages: "46–48",
      wonder: {
        q: "You blow up a balloon, then let the air out. Is it back as it was?",
        options: [
          { id: "yes", label: "Yes — that change can be reversed" },
          { id: "no", label: "No — it's changed forever" },
          { id: "half", label: "Only if it's red" },
        ],
        answer: "yes",
        reveal: "Yes! Blowing up a balloon is a change that can be reversed. But if you prick it and it bursts, that change can't be undone.",
      },
      explore: { activity: "Activities 1–6", title: "Reversible or not?", how: "Decide whether each change can be reversed.", Sim: UndoSort },
      discoveries: [
        { id: "rev", text: "Folding, stretching and melting can be reversed" },
        { id: "irr", text: "Cutting, baking, bursting and burning cannot" },
        { id: "ice", text: "Ice melts into water and can be frozen back" },
        { id: "curd", text: "Milk turning into curd can't be reversed" },
      ],
      understand: [
        { title: "Changes can be reversed", body: "Some changes can be reversed: a folded paper unfolds, a stretched spring or rubber band returns, ice melts and water freezes." },
        { title: "Changes that can't be", body: "Some can't: cutting paper, baking a roti, bursting a balloon, setting curd, burning things." },
        { title: "Dissolving", body: "Dissolving salt in water can be reversed — we can get the salt back by evaporating the water." },
      ],
      check: [
        {
          id: "g1",
          kind: "sort",
          q: "Can the change be reversed?",
          bins: ["Yes", "No"],
          items: [
            { label: "Sharpening a pencil", bin: 1 },
            { label: "Melting ice-cream", bin: 0 },
            { label: "Burning paper", bin: 1 },
            { label: "Folding a paper plane", bin: 0 },
            { label: "Breaking an egg", bin: 1 },
            { label: "Freezing water", bin: 0 },
          ],
          why: "Melting, freezing and folding can be reversed; sharpening, burning and breaking can't.",
        },
      ],
      connect: [
        { icon: "🌸", title: "Buds to flowers", body: "A flower can't go back to being a bud." },
        { icon: "🍦", title: "Ice-cream", body: "Melted ice-cream can be frozen again — though it may not taste the same!" },
        { icon: "👶", title: "Growing up", body: "Growing taller is a change that can't be reversed." },
      ],
    },
    {
      id: "heat",
      icon: "⚙️",
      title: "Heat and cool",
      pages: "48–50",
      wonder: {
        q: "A blacksmith wants to fit an iron rim onto a wooden cart wheel. The rim is slightly too small. What does he do?",
        options: [
          { id: "hammer", label: "Hammers it until it fits" },
          { id: "heat", label: "Heats the rim first" },
          { id: "cut", label: "Cuts the wheel smaller" },
        ],
        answer: "heat",
        reveal: "He heats the rim. Hot metal expands, so it slips onto the wheel. As it cools, it contracts and grips tightly.",
      },
      explore: { activity: "Section 6.2", title: "Fit the rim", how: "Heat the iron rim, fit it on the wheel, then cool it.", Sim: CartWheel },
      discoveries: [
        { id: "expand", text: "Metal expands when it is heated" },
        { id: "fit", text: "The expanded rim slips onto the wheel" },
        { id: "tight", text: "On cooling, it contracts and fits tightly" },
      ],
      understand: [
        { title: "Expansion", body: "A metal rim is made slightly smaller than the wheel. On heating, it expands and fits onto the wheel." },
        { title: "Contraction", body: "Cooling makes the rim contract, so it fits tightly. Handles of tools are fixed into wooden handles in the same way." },
        { title: "Heat changes things", body: "Heat melts wax and ice, boils water into vapour, and makes iron red-hot and soft so it can be shaped." },
      ],
      check: [
        { id: "g2", kind: "mcq", q: "Why is an iron rim heated before fixing it on a cart wheel?", options: ["To make it shine", "So it expands and slips on", "To make it lighter"], answer: 1, why: "Heating makes metal expand." },
        { id: "g3", kind: "tf", q: "On cooling, a heated metal rim contracts.", answer: true, why: "That's why it then grips the wheel tightly." },
      ],
      connect: [
        { icon: "🔨", title: "Blacksmiths", body: "They heat iron red-hot so it is soft enough to beat into tools." },
        { icon: "🛤", title: "Railway tracks", body: "Small gaps are left between rails so they can expand on hot days." },
        { icon: "🍯", title: "Stuck lids", body: "Warming a tight metal lid under hot water can help it open." },
      ],
    },
    {
      id: "burn",
      icon: "🕯",
      title: "Melt or burn?",
      pages: "50–51",
      wonder: {
        q: "A candle burns for a while. Can the change in its length be reversed?",
        options: [
          { id: "all", label: "Yes, completely" },
          { id: "part", label: "The melted wax can be reused, but the burnt wax is gone" },
          { id: "none", label: "Nothing changed" },
        ],
        answer: "part",
        reveal: "Both kinds of change happen! Melted wax can solidify again (reversible), but the wax that burned turned into new substances (not reversible).",
      },
      explore: { activity: "Activity 7", title: "Heat test", how: "Heat each item, then test whether cooling brings it back.", Sim: MeltBurn },
      discoveries: [
        { id: "melt", text: "Melting and boiling can be reversed by cooling" },
        { id: "burn", text: "Burning cannot be reversed" },
        { id: "newsub", text: "Burning makes new substances like ash and gases" },
      ],
      understand: [
        { title: "Melting", body: "Heating melts wax, ice and butter. On cooling, they become solid again." },
        { title: "Burning", body: "Burning an incense stick produces ash and gases — new materials. This change can't be reversed." },
        { title: "Mixing", body: "Some changes happen when two substances are mixed: curd is set by adding a little curd to warm milk." },
      ],
      check: [
        { id: "g4", kind: "mcq", q: "Which change produces new substances?", options: ["Melting wax", "Burning paper", "Freezing water"], answer: 1, why: "Burning paper gives ash and gases." },
        { id: "g5", kind: "tf", q: "When water boils and turns into vapour, the change can be reversed.", answer: true, why: "On cooling, the vapour condenses back into water." },
      ],
      connect: [
        { icon: "🛣", title: "Road tar", body: "Workers heat tar to make it soft for repairing roads." },
        { icon: "🍳", title: "Cooking", body: "Most cooking makes changes that can't be reversed." },
        { icon: "🧯", title: "Fire safety", body: "Burning is quick and can't be undone — always be careful with fire." },
      ],
    },
  ],
  learnt: [
    "Some changes can be reversed and some cannot.",
    "Folding, stretching, melting, freezing and dissolving are changes that can be reversed.",
    "Cutting, baking, setting curd and burning are changes that cannot be reversed.",
    "Heating can make things change — metals expand on heating and contract on cooling.",
    "Burning produces new substances.",
  ],
  keywords: ["Change", "Reversible", "Irreversible", "Expand", "Contract", "Melting", "Burning"],
};

export default chapter;
