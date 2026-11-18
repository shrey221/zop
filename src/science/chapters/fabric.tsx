// Chapter 3 · Fibre to Fabric (NCERT Science Class VI, 2018-19, pp. 18–25).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { OrderLab, SortLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage } from "../ui";

/* Stop 1 · zoom into a fabric */
function Zoom({ discover }: SimProps) {
  const [level, setLevel] = useState(0);
  const [twisted, setTwisted] = useState(false);
  useEffect(() => {
    if (level >= 1) discover("yarn");
    if (level >= 2) discover("fibre");
  }, [level, discover]);
  return (
    <Stage
      caption={
        level === 0
          ? "A piece of cotton cloth. Zoom in to see what it is made of."
          : level === 1
            ? "The fabric is made of threads — called yarns — crossing over and under each other."
            : twisted
              ? "Spinning! Fibres are drawn out and twisted together. The twist holds them into a strong yarn."
              : "Pull a yarn apart at its end and it splits into very thin strands: fibres. Now tap 'Twist the fibres'."
      }
    >
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none">
        <rect width="520" height="280" fill="#13112b" />
        {level === 0 && (
          <g className="animate-fade">
            <rect x="110" y="40" width="300" height="200" rx="12" fill="#e86f5f" />
            {Array.from({ length: 30 }, (_, i) => (
              <line key={i} x1={110 + i * 10} y1="40" x2={110 + i * 10} y2="240" stroke="#c24f40" strokeWidth="1" />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={"h" + i} x1="110" y1={40 + i * 10} x2="410" y2={40 + i * 10} stroke="#f39a8c" strokeWidth="1" />
            ))}
          </g>
        )}
        {level === 1 && (
          <g className="animate-fade">
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={"v" + i} x={130 + i * 46} y="30" width="26" height="220" rx="8" fill="#c24f40" />
            ))}
            {Array.from({ length: 5 }, (_, r) =>
              Array.from({ length: 6 }, (_, c) =>
                (r + c) % 2 === 0 ? <rect key={`${r}-${c}`} x={124 + c * 46} y={46 + r * 42} width="38" height="24" rx="8" fill="#f39a8c" /> : null,
              ),
            )}
          </g>
        )}
        {level === 2 && (
          <g className="animate-fade">
            {Array.from({ length: 16 }, (_, i) => {
              const y0 = 140 + (i - 8) * (twisted ? 2 : 9);
              return (
                <path
                  key={i}
                  d={twisted ? `M60 ${y0} C 160 ${y0 - 14}, 300 ${y0 + 14}, 460 ${y0}` : `M60 ${y0} C 140 ${y0 - 18 + (i % 3) * 10}, 320 ${y0 + 20 - (i % 4) * 8}, 460 ${y0 + (i % 2 ? 12 : -10)}`}
                  stroke="#f4f0e6"
                  strokeWidth="2"
                  fill="none"
                  style={{ transition: "d .8s cubic-bezier(.2,.8,.2,1)" }}
                />
              );
            })}
            {twisted && Array.from({ length: 10 }, (_, i) => <line key={"t" + i} x1={80 + i * 38} y1="124" x2={100 + i * 38} y2="156" stroke="#c9c2b0" strokeWidth="2" />)}
          </g>
        )}
        <text x="260" y="268" fontSize="12" fontWeight="900" fill="#ffd257" textAnchor="middle">
          {["Fabric", "Yarns", twisted ? "Yarn (twisted fibres)" : "Fibres"][level]} · zoom ×{[1, 20, 200][level]}
        </text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Zoom</span>
          <input type="range" min={0} max={2} step={1} value={level} onChange={(e) => (setLevel(+e.target.value), setTwisted(false))} className="w-full accent-[#f39a8c]" aria-label="Zoom level" />
        </label>
        {level === 2 && (
          <div>
            <Btn on={twisted} onClick={() => (setTwisted(true), discover("twist"))}>
              🌀 Twist the fibres
            </Btn>
          </div>
        )}
      </div>
    </Stage>
  );
}

/* Stop 2 · from cotton plant to fabric */
function CottonJourney({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="Cotton goes on a long journey before it becomes your shirt. Tap the steps in order."
      steps={[
        { id: "grow", label: "Grow cotton plants", icon: "🌱", detail: "Cotton grows best in black soil and a warm climate — in Gujarat, Maharashtra, Punjab and other states." },
        { id: "bolls", label: "Bolls burst open", icon: "☁️", detail: "The fruits, called cotton bolls, are about the size of a lemon. When ripe they burst open and show white, fluffy cotton fibres around the seeds." },
        { id: "pick", label: "Pick by hand", icon: "✋", detail: "Cotton is usually picked from the plants by hand." },
        { id: "gin", label: "Ginning", icon: "⚙️", detail: "Ginning: the seeds are separated from the fibres by combing — by hand or by machines." },
        { id: "spin", label: "Spinning", icon: "🧶", detail: "Spinning: fibres are drawn out and twisted to make yarn, using a takli, a charkha or large spinning machines." },
        { id: "weave", label: "Weaving", icon: "🧵", detail: "The yarn is woven on a loom into fabric. Your shirt is ready to be stitched!" },
      ]}
      milestones={[
        { id: "gin", at: 4 },
        { id: "spin", at: 5 },
        { id: "fabric", at: 6 },
      ]}
    />
  );
}

/* Stop 3 · weaving vs knitting */
function WeaveKnit({ discover }: SimProps) {
  const [w, setW] = useState(0);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (w >= 3) discover("weave");
    if (k >= 3) discover("knit");
    if (w >= 3 && k >= 3) discover("compare");
  }, [w, k, discover]);
  return (
    <Stage
      caption={
        w >= 3 && k >= 3
          ? "Weaving uses two sets of yarns crossing over and under each other. Knitting uses a single yarn pulled into loops."
          : "Add rows to each piece of fabric and compare how they are made."
      }
    >
      <div className="grid grid-cols-2 gap-3 p-4">
        <div>
          <p className="mb-2 text-center text-sm font-extrabold">Weaving · loom</p>
          <svg viewBox="0 0 200 200" className="block h-auto w-full rounded-2xl bg-white/5">
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={14 + i * 22} y="10" width="10" height="180" rx="4" fill="#3d7bfd" />
            ))}
            {Array.from({ length: w }, (_, r) => (
              <g key={r} className="animate-rise">
                <rect x="8" y={170 - r * 20} width="184" height="10" rx="4" fill="#ffd257" />
                {Array.from({ length: 8 }, (_, i) => ((i + r) % 2 ? <rect key={i} x={14 + i * 22} y={168 - r * 20} width="10" height="14" fill="#3d7bfd" /> : null))}
              </g>
            ))}
          </svg>
          <Btn className="mt-2 w-full" onClick={() => setW((v) => Math.min(8, v + 1))}>
            Weave a row
          </Btn>
        </div>
        <div>
          <p className="mb-2 text-center text-sm font-extrabold">Knitting · needles</p>
          <svg viewBox="0 0 200 200" className="block h-auto w-full rounded-2xl bg-white/5">
            {Array.from({ length: k }, (_, r) => (
              <g key={r} className="animate-rise">
                {Array.from({ length: 7 }, (_, i) => (
                  <path key={i} d={`M${18 + i * 25} ${168 - r * 20} l10 16 l10 -16`} stroke="#e0679b" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                ))}
              </g>
            ))}
          </svg>
          <Btn className="mt-2 w-full" onClick={() => setK((v) => Math.min(8, v + 1))}>
            Knit a row
          </Btn>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <Btn onClick={() => (setW(0), setK(0))}>↺ Start again</Btn>
      </div>
    </Stage>
  );
}

/* Stop 4 · natural or synthetic */
const FIBRES = [
  { id: "cotton", label: "Cotton", icon: "☁️", bin: "plant", why: "From the bolls (fruits) of the cotton plant." },
  { id: "jute", label: "Jute", icon: "🌿", bin: "plant", why: "From the stem of the jute plant." },
  { id: "coir", label: "Coir", icon: "🥥", bin: "plant", why: "From the outer covering (husk) of the coconut." },
  { id: "wool", label: "Wool", icon: "🐑", bin: "animal", why: "From the fleece of sheep and goats." },
  { id: "silk", label: "Silk", icon: "🐛", bin: "animal", why: "From the cocoon of the silkworm." },
  { id: "nylon", label: "Nylon", icon: "🧪", bin: "synthetic", why: "Made from chemical substances, not plants or animals." },
  { id: "polyester", label: "Polyester", icon: "🏭", bin: "synthetic", why: "A synthetic fibre made from chemicals." },
];
const fin = (p: Record<string, string>, bin: string) => FIBRES.filter((f) => f.bin === bin).every((f) => p[f.id]);
function FibreSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="Where does each fibre come from? Tap a fibre, then its group."
      bins={[
        { id: "plant", label: "Plant fibres", icon: "🌱", color: "#5fe0a0" },
        { id: "animal", label: "Animal fibres", icon: "🐑", color: "#ffb86b" },
        { id: "synthetic", label: "Synthetic", icon: "🧪", color: "#8fb3ff" },
      ]}
      items={FIBRES}
      rules={[
        { id: "plant", when: (p) => fin(p, "plant") },
        { id: "animal", when: (p) => fin(p, "animal") },
        { id: "synthetic", when: (p) => fin(p, "synthetic") },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "fabric",
  n: 3,
  title: "Fibre to Fabric",
  pages: "18–25",
  icon: "🧵",
  theme: { grad: "linear-gradient(135deg,#3a0b2a 0%,#b0306a 55%,#f39a8c 125%)", accent: "#b0306a", soft: "#fde4ef", ink: "#7a1748" },
  opening: "Bedsheets, school uniforms, sarees, sacks — so many fabrics around us! What are they all made of?",
  stops: [
    {
      id: "zoom",
      icon: "🔍",
      title: "Inside a piece of cloth",
      pages: "18–20",
      wonder: {
        q: "If you look very closely at a cotton cloth, what is it made of?",
        options: [
          { id: "sheet", label: "One solid sheet of cotton" },
          { id: "yarn", label: "Thin threads crossing each other" },
          { id: "plastic", label: "Tiny bits of plastic" },
        ],
        answer: "yarn",
        reveal: "Fabric is made of yarns arranged together — and each yarn is made of even thinner strands called fibres.",
      },
      explore: { activity: "Activities 2 & 3", title: "Zoom into fabric", how: "Slide to zoom into a piece of cotton cloth. Then twist the fibres.", Sim: Zoom },
      discoveries: [
        { id: "yarn", text: "Fabric is made of yarns" },
        { id: "fibre", text: "Each yarn is made of thinner strands: fibres" },
        { id: "twist", text: "Twisting fibres together makes yarn — spinning" },
      ],
      understand: [
        { title: "Fabric → yarn → fibre", body: "Fabrics are made from yarns, and yarns are made from fibres." },
        { title: "Natural fibres", body: "Cotton and jute come from plants. Wool and silk come from animals." },
        { title: "Synthetic fibres", body: "Polyester and nylon are made from chemical substances, not from plants or animals." },
      ],
      check: [
        { id: "c1", kind: "tf", q: "Yarn is made from fibres.", answer: true, why: "Fibres are twisted together to make yarn." },
        { id: "c2", kind: "tf", q: "Spinning is the process of making fibres.", answer: false, why: "Spinning makes yarn from fibres." },
      ],
      connect: [
        { icon: "✂️", title: "Tailor's scraps", body: "Collect fabric cuttings from a tailor and sort them: cotton, silk, wool, synthetic." },
        { icon: "🧺", title: "At home", body: "Check the labels on your clothes — what fibre are they?" },
        { icon: "🔦", title: "Look closely", body: "Use a magnifying glass on a cotton cloth to see the yarns." },
      ],
    },
    {
      id: "cotton",
      icon: "☁️",
      title: "From field to fabric",
      pages: "20–22",
      wonder: {
        q: "Cotton fibre grows around the seeds inside the cotton fruit. How are the seeds removed?",
        options: [
          { id: "wash", label: "By washing" },
          { id: "gin", label: "By combing — called ginning" },
          { id: "burn", label: "By burning" },
        ],
        answer: "gin",
        reveal: "By ginning: the cotton is combed, by hand or machine, to separate the seeds from the fibres.",
      },
      explore: { activity: "Sections 3.3 & 3.4", title: "Cotton's journey", how: "Put the steps of making cotton fabric in the right order.", Sim: CottonJourney },
      discoveries: [
        { id: "gin", text: "Ginning separates seeds from cotton fibres" },
        { id: "spin", text: "Spinning twists fibres into yarn" },
        { id: "fabric", text: "Weaving turns yarn into fabric" },
      ],
      understand: [
        { title: "Cotton", body: "Cotton plants grow in black soil and a warm climate. Ripe bolls burst open, showing fibres around the seeds. Cotton is picked by hand and ginned." },
        { title: "Jute", body: "Jute fibre comes from the stem of the jute plant, grown in the rainy season in West Bengal, Bihar and Assam. Cut stems are soaked in water for days so they rot, and then the fibres are separated by hand." },
        { title: "Spinning", body: "Making yarn from fibres is spinning. Simple devices are the hand spindle (takli) and the spinning wheel (charkha), made popular by Mahatma Gandhi. Large-scale spinning uses machines." },
      ],
      check: [
        { id: "c3", kind: "tf", q: "The process of removing seeds from cotton is called ginning.", answer: true, why: "Combing out the seeds is ginning." },
        { id: "c4", kind: "mcq", q: "From which part of the jute plant do we get fibre?", options: ["Leaf", "Stem", "Root"], answer: 1, why: "Jute fibre is obtained from the stem." },
      ],
      connect: [
        { icon: "🎡", title: "The charkha", body: "Gandhiji encouraged people to spin their own yarn and wear khadi." },
        { icon: "👜", title: "Jute bags", body: "Sacks and eco-friendly bags are made of jute." },
        { icon: "🧶", title: "Try a takli", body: "Pull and twist cotton wool between your fingers to make a rough yarn." },
      ],
    },
    {
      id: "weave",
      icon: "✂️",
      title: "Weaving and knitting",
      pages: "22–23",
      wonder: {
        q: "A sweater and a bedsheet are made from yarn in different ways. How is a sweater usually made?",
        options: [
          { id: "weave", label: "Weaving two sets of yarn together" },
          { id: "knit", label: "Knitting a single yarn into loops" },
          { id: "glue", label: "Gluing fibres together" },
        ],
        answer: "knit",
        reveal: "Sweaters are usually knitted from a single yarn. Bedsheets are woven from two sets of yarn.",
      },
      explore: { activity: "Activity 5", title: "Weave vs knit", how: "Build a woven fabric and a knitted fabric, row by row.", Sim: WeaveKnit },
      discoveries: [
        { id: "weave", text: "Weaving crosses two sets of yarns over and under" },
        { id: "knit", text: "Knitting makes loops from a single yarn" },
        { id: "compare", text: "Two different ways to make fabric from yarn" },
      ],
      understand: [
        { title: "Weaving", body: "Arranging two sets of yarns together makes a fabric — weaving. It is done on looms, worked by hand or by power." },
        { title: "Knitting", body: "In knitting, a single yarn is used to make a piece of fabric — by hand or on machines. Socks and many clothes are knitted." },
        { title: "Long ago", body: "Early people used bark, big leaves and animal skins. Later they wove twigs and grass into mats. Early Indians wore cotton grown near the river Ganga; in Egypt, cotton and flax grew near the Nile." },
        { title: "Unstitched clothes", body: "Before the sewing needle, fabric was simply draped. Even today, sarees, dhotis, lungis and turbans are worn unstitched." },
      ],
      check: [
        { id: "c5", kind: "tf", q: "Weaving of yarn makes a piece of fabric.", answer: true, why: "Two sets of yarn woven together make fabric." },
        { id: "c6", kind: "mcq", q: "How many sets of yarn are used in knitting?", options: ["One", "Two", "Three"], answer: 0, why: "Knitting uses a single yarn." },
      ],
      connect: [
        { icon: "🧦", title: "Socks", body: "Look closely at a sock — you'll see knitted loops." },
        { icon: "🏺", title: "Paper mat", body: "Weave strips of two coloured papers to make a mat, just like Activity 5." },
        { icon: "👗", title: "Draped clothes", body: "A saree is a single long fabric, draped without stitching." },
      ],
    },
    {
      id: "types",
      icon: "🐑",
      title: "Natural or synthetic?",
      pages: "19, 24",
      wonder: {
        q: "Silk is soft and shiny. Where does it come from?",
        options: [
          { id: "plant", label: "A plant stem" },
          { id: "worm", label: "The cocoon of a silkworm" },
          { id: "chem", label: "Chemicals in a factory" },
        ],
        answer: "worm",
        reveal: "Silk comes from the cocoon of the silkworm — it's an animal fibre.",
      },
      explore: { activity: "Section 3.2", title: "Fibre families", how: "Sort fibres by where they come from.", Sim: FibreSort },
      discoveries: [
        { id: "plant", text: "Cotton, jute and coir come from plants" },
        { id: "animal", text: "Wool and silk come from animals" },
        { id: "synthetic", text: "Nylon and polyester are synthetic" },
      ],
      understand: [
        { title: "Natural fibres", body: "Fibres from plants and animals are natural fibres: cotton, jute, coir, wool and silk." },
        { title: "Synthetic fibres", body: "Fibres made from chemical substances are synthetic fibres, like polyester and nylon." },
        { title: "Coconut fibre", body: "Coir from the outer covering of coconuts is used for ropes, mats and brushes." },
      ],
      check: [
        {
          id: "c7",
          kind: "sort",
          q: "Classify the fibres.",
          bins: ["Natural", "Synthetic"],
          items: [
            { label: "Cotton", bin: 0 },
            { label: "Wool", bin: 0 },
            { label: "Silk", bin: 0 },
            { label: "Jute", bin: 0 },
            { label: "Nylon", bin: 1 },
            { label: "Polyester", bin: 1 },
          ],
          why: "Natural fibres come from plants and animals; synthetic ones are made from chemicals.",
        },
        { id: "c8", kind: "tf", q: "Polyester is a natural fibre.", answer: false, why: "Polyester is synthetic." },
      ],
      connect: [
        { icon: "🧥", title: "Winter wool", body: "Sweaters and shawls of wool keep us warm." },
        { icon: "🎗", title: "Coir ropes", body: "Ropes, doormats and brushes are often made of coir." },
        { icon: "👕", title: "Mixed fabrics", body: "Many clothes are a blend of cotton and polyester." },
      ],
    },
  ],
  learnt: [
    "There is a variety of fabrics, such as cotton, silk, wool and polyester.",
    "Fabrics are made from yarns, which in turn are made from fibres.",
    "Fibres are natural or synthetic. Cotton, wool, silk and jute are natural; nylon and polyester are synthetic.",
    "Cotton and jute come from plants. Making yarn from fibres is spinning.",
    "Fabric is made from yarn by weaving and knitting.",
  ],
  keywords: ["Fibre", "Yarn", "Fabric", "Ginning", "Spinning", "Weaving", "Knitting", "Natural fibre", "Synthetic fibre"],
};

export default chapter;
