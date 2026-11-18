// Chapter 10 · Motion and Measurement of Distances (NCERT Science Class VI, 2018-19, pp. 95–106).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useState } from "react";
import { OrderLab, SortLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Readout, Stage } from "../ui";

/* Stop 1 · measure the desk with handspans */
const DESK = 120; // cm
const MEASURERS = {
  you: { label: "Your handspan", span: 15, color: "#ffd257" },
  teacher: { label: "Teacher's handspan", span: 20, color: "#ff8a7a" },
  scale: { label: "Metre scale", span: 0, color: "#5fe0a0" },
} as const;
type Who = keyof typeof MEASURERS;
function Handspans({ discover }: SimProps) {
  const [who, setWho] = useState<Who | null>(null);
  const [used, setUsed] = useState<Who[]>([]);
  function pick(w: Who) {
    setWho(w);
    const u = [...new Set([...used, w])];
    setUsed(u);
    if (w !== "scale") discover("span");
    if (u.includes("you") && u.includes("teacher")) discover("differ");
    if (w === "scale") discover("standard");
  }
  const m = who ? MEASURERS[who] : null;
  const count = m && m.span ? DESK / m.span : 0;
  const x0 = 60;
  const W = 400;
  return (
    <Stage
      caption={
        !m
          ? "How long is this desk? Measure it in different ways."
          : who === "scale"
            ? "With a metre scale, everyone gets the same answer: 120 cm (1.2 m). That's why we use standard units."
            : `${m.label}: ${count} handspans. ${used.includes("you") && used.includes("teacher") ? "Different hands gave different answers for the same desk!" : "Now try someone else's hand."}`
      }
    >
      <svg viewBox="0 0 520 200" className="block h-auto w-full select-none">
        <rect width="520" height="200" fill="#13112b" />
        <rect x={x0} y="70" width={W} height="26" rx="4" fill="#a06a35" />
        <rect x={x0 + 10} y="96" width="12" height="80" fill="#7a4f25" />
        <rect x={x0 + W - 22} y="96" width="12" height="80" fill="#7a4f25" />
        {m && who !== "scale" &&
          Array.from({ length: count }, (_, i) => (
            <g key={`${who}${i}`} className="animate-pop" style={{ animationDelay: `${i * 90}ms` }}>
              <path d={`M${x0 + (i * W) / count + 4} 64 q${W / count / 2 - 4} -26 ${W / count - 8} 0`} stroke={m.color} strokeWidth="4" fill="none" />
              <text x={x0 + ((i + 0.5) * W) / count} y="40" fontSize="13" fontWeight="900" fill={m.color} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
        {who === "scale" && (
          <g className="animate-rise">
            <rect x={x0} y="48" width={W} height="18" fill="#f4efe3" />
            {Array.from({ length: 13 }, (_, i) => (
              <g key={i}>
                <line x1={x0 + (i * W) / 12} y1="48" x2={x0 + (i * W) / 12} y2={i % 2 ? 56 : 62} stroke="#2b2a30" strokeWidth="1.5" />
                {i % 2 === 0 && (
                  <text x={x0 + (i * W) / 12} y="42" fontSize="10" fontWeight="800" fill="#c9d0e6" textAnchor="middle">
                    {i * 10}
                  </text>
                )}
              </g>
            ))}
          </g>
        )}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {(Object.keys(MEASURERS) as Who[]).map((w) => (
          <Btn key={w} on={who === w} onClick={() => pick(w)}>
            {w === "scale" ? "📏" : "✋"} {MEASURERS[w].label}
          </Btn>
        ))}
      </div>
    </Stage>
  );
}

/* Stop 2 · measuring correctly */
function Correctly({ discover }: SimProps) {
  const [eye, setEye] = useState<"left" | "above" | "right">("left");
  const [broken, setBroken] = useState(false);
  const [thread, setThread] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    if (eye === "above") discover("eye");
  }, [eye, discover]);
  useEffect(() => {
    if (broken) discover("broken");
  }, [broken, discover]);
  useEffect(() => {
    if (thread === 2) discover("curved");
  }, [thread, discover]);
  const start = broken ? 1 : 0;
  const reading = start + 10 + (eye === "left" ? -0.4 : eye === "right" ? 0.4 : 0);
  const S = (cm: number) => 40 + cm * 30; // scale x for cm
  return (
    <Stage
      caption={
        thread === 2
          ? "The thread, stretched along the scale, measures the curved line: 14.5 cm."
          : thread === 1
            ? "The thread follows the curve exactly. Now straighten it along the scale."
            : broken
              ? `The scale's end is broken, so the pencil starts at the 1 cm mark. Reading ${reading.toFixed(1)} − 1 = ${(reading - 1).toFixed(1)} cm.`
              : eye === "above"
                ? "With your eye directly above the end, the reading is correct: 10.0 cm."
                : `From the ${eye}, the reading looks like ${reading.toFixed(1)} cm — wrong! Place your eye directly above the point.`
      }
    >
      <svg viewBox="0 0 520 250" className="block h-auto w-full select-none">
        <rect width="520" height="250" fill="#13112b" />
        {/* scale */}
        <rect x="30" y="100" width="470" height="34" fill="#f4efe3" />
        {broken && <path d="M30 100 L46 100 L38 117 L46 134 L30 134 Z" fill="#13112b" />}
        {Array.from({ length: 16 }, (_, i) => (
          <g key={i}>
            <line x1={S(i)} y1="100" x2={S(i)} y2={i % 5 === 0 ? 118 : 112} stroke="#2b2a30" strokeWidth="1.5" />
            {!(broken && i === 0) && (
              <text x={S(i)} y="130" fontSize="10" fontWeight="800" fill="#2b2a30" textAnchor="middle">
                {i}
              </text>
            )}
          </g>
        ))}
        {/* pencil */}
        <g style={{ transition: "transform .4s" }} transform={`translate(${S(start) - 40} 0)`}>
          <rect x="40" y="76" width="270" height="18" fill="#f5c542" />
          <path d="M310 76 L340 85 L310 94 Z" fill="#e9c9a0" />
          <path d="M332 82.6 L340 85 L332 87.4 Z" fill="#2b2a30" />
          <rect x="40" y="76" width="14" height="18" fill="#e5484d" />
        </g>
        {/* eye */}
        <text x={S(start + 10) + (eye === "left" ? -60 : eye === "right" ? 60 : 0)} y="40" fontSize="26" textAnchor="middle">
          👁
        </text>
        <line x1={S(start + 10) + (eye === "left" ? -60 : eye === "right" ? 60 : 0)} y1="48" x2={S(reading)} y2="112" stroke="#ffd257" strokeDasharray="4 4" strokeWidth="2" />
        {/* curved line and thread */}
        <path d="M60 200 C 120 160, 180 240, 240 200 S 340 170, 380 205" stroke={thread ? "#ff8ab5" : "#9da3c7"} strokeWidth={thread ? 4 : 2.5} fill="none" style={{ opacity: thread === 2 ? 0.25 : 1 }} />
        {thread === 2 && <line x1={S(0)} y1="150" x2={S(14.5)} y2="150" stroke="#ff8ab5" strokeWidth="4" className="animate-rise" />}
        <text x="60" y="230" fontSize="11" fontWeight="800" fill="#9da3c7">curved line</text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {(["left", "above", "right"] as const).map((e) => (
            <Btn key={e} on={eye === e} onClick={() => setEye(e)}>
              👁 {e === "above" ? "Directly above" : `From the ${e}`}
            </Btn>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn on={broken} onClick={() => setBroken((b) => !b)}>
            {broken ? "Broken scale" : "Use a broken scale"}
          </Btn>
          <Btn on={thread > 0} onClick={() => setThread((t) => (t === 0 ? 1 : t === 1 ? 2 : 0))}>
            🧵 {thread === 0 ? "Lay a thread on the curve" : thread === 1 ? "Straighten it on the scale" : "Reset the thread"}
          </Btn>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Readout label="Reading" value={`${reading.toFixed(1)} cm`} />
          <Readout label="Pencil length" value={eye === "above" ? `${(reading - start).toFixed(1)} cm` : "?"} color="#5fe0a0" />
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · types of motion */
const MOVES = [
  { id: "march", label: "Soldiers marching", icon: "💂", bin: "rect", why: "They move along a straight line." },
  { id: "stone", label: "A falling stone", icon: "⬇️", bin: "rect", why: "It falls along a straight line." },
  { id: "sprint", label: "100 m sprint", icon: "🏃", bin: "rect", why: "The runner moves along a straight track." },
  { id: "fan", label: "Ceiling fan blade", icon: "🌀", bin: "circ", why: "Each point on the blade moves in a circle." },
  { id: "clock", label: "Clock hands", icon: "🕒", bin: "circ", why: "The tip of each hand stays the same distance from the centre — circular motion." },
  { id: "merry", label: "Merry-go-round", icon: "🎠", bin: "circ", why: "It goes round and round in a circle." },
  { id: "swing", label: "A swing", icon: "🧒", bin: "peri", why: "It moves to and fro, repeating after a fixed time." },
  { id: "pendulum", label: "A pendulum", icon: "🕰", bin: "peri", why: "It swings back and forth — periodic motion." },
  { id: "needle", label: "Sewing machine needle", icon: "🧵", bin: "peri", why: "It moves up and down again and again." },
];
const doneM = (p: Record<string, string>, b: string) => MOVES.filter((m) => m.bin === b).every((m) => p[m.id]);
function MotionSort({ discover }: SimProps) {
  return (
    <SortLab
      discover={discover}
      intro="What kind of motion is it? Tap a moving thing, then its group."
      bins={[
        { id: "rect", label: "Straight line", icon: "➡️", color: "#ffd257" },
        { id: "circ", label: "Circular", icon: "🔄", color: "#5fe0a0" },
        { id: "peri", label: "Periodic", icon: "↔️", color: "#ff8ab5" },
      ]}
      items={MOVES}
      rules={[
        { id: "rect", when: (p) => doneM(p, "rect") },
        { id: "circ", when: (p) => doneM(p, "circ") },
        { id: "peri", when: (p) => doneM(p, "peri") },
      ]}
    />
  );
}

/* Stop 4 · the story of transport */
function Transport({ discover }: SimProps) {
  return (
    <OrderLab
      discover={discover}
      intro="Put the ways people have travelled in order, from the oldest to the newest."
      steps={[
        { id: "walk", label: "Walking", icon: "🚶", detail: "Long ago, people had no means of transport. They walked, and carried goods on their backs." },
        { id: "animals", label: "Riding animals", icon: "🐎", detail: "Later, animals were used to carry people and goods." },
        { id: "boats", label: "Simple boats", icon: "🛶", detail: "For water, people used simple boats — logs of wood, and later hollowed-out trunks." },
        { id: "wheel", label: "The wheel and carts", icon: "🐂", detail: "The invention of the wheel made a great change: carts could carry heavy loads." },
        { id: "steam", label: "Steam engines", icon: "🚂", detail: "In the early 19th century, the steam engine powered new carriages: railroads were built for trains." },
        { id: "motor", label: "Motor vehicles", icon: "🚗", detail: "Then came motor vehicles, and motorised boats and ships." },
        { id: "planes", label: "Aeroplanes", icon: "✈️", detail: "Aeroplanes developed in the early 1900s and carried passengers and goods." },
        { id: "electric", label: "Electric trains and more", icon: "🚄", detail: "Electric trains, monorails and supersonic aeroplanes came in the 20th century." },
      ]}
      milestones={[
        { id: "wheel", at: 4 },
        { id: "engine", at: 5 },
        { id: "modern", at: 8 },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "motion",
  n: 10,
  title: "Motion and Measurement of Distances",
  pages: "95–106",
  icon: "📏",
  theme: { grad: "linear-gradient(135deg,#0f1f3d 0%,#2563eb 55%,#60d4f0 125%)", accent: "#2558d6", soft: "#e2ecff", ink: "#1e3a8a" },
  opening: "How far is your school from home? How tall are you? If everyone measured with their own hands and feet, would we ever agree?",
  stops: [
    {
      id: "spans",
      icon: "✋",
      title: "Measure the desk",
      pages: "96–98",
      wonder: {
        q: "You and your teacher both measure the same desk in handspans. What will you find?",
        options: [
          { id: "same", label: "The same number" },
          { id: "diff", label: "Different numbers" },
          { id: "zero", label: "Zero" },
        ],
        answer: "diff",
        reveal: "Different numbers! Handspans aren't the same for everyone — so we need standard units.",
      },
      explore: { activity: "Activities 1 & 2", title: "Hands vs scale", how: "Measure the desk with two different handspans, then a metre scale.", Sim: Handspans },
      discoveries: [
        { id: "span", text: "You can measure length with a handspan" },
        { id: "differ", text: "Different handspans give different answers" },
        { id: "standard", text: "A standard unit gives everyone the same answer" },
      ],
      understand: [
        { title: "Measurement", body: "Measuring means comparing an unknown quantity with a known quantity — the unit. The result has a number and a unit." },
        { title: "Old units", body: "People once used a foot, a cubit (elbow to fingertip), a handspan or a step. These varied from person to person." },
        { title: "SI units", body: "Today, scientists all over the world use the International System of Units (SI units). The SI unit of length is the metre (m)." },
        { title: "Small and large", body: "1 m = 100 cm; 1 cm = 10 mm; 1 km = 1000 m." },
      ],
      check: [
        { id: "m1", kind: "mcq", q: "What is the SI unit of length?", options: ["Foot", "Metre", "Handspan"], answer: 1, why: "The metre is the SI unit of length." },
        { id: "m2", kind: "mcq", q: "How many centimetres are in 1 metre?", options: ["10", "100", "1000"], answer: 1, why: "1 m = 100 cm." },
      ],
      connect: [
        { icon: "🧵", title: "Tailors", body: "Tailors use a measuring tape that can bend around you." },
        { icon: "🛣", title: "Milestones", body: "Road signs show distances in kilometres." },
        { icon: "🌍", title: "One world, one unit", body: "SI units let people everywhere share measurements." },
      ],
    },
    {
      id: "correct",
      icon: "📏",
      title: "Measure it right",
      pages: "98–101",
      wonder: {
        q: "To read a scale correctly, where should your eye be?",
        options: [
          { id: "left", label: "A little to the left" },
          { id: "above", label: "Directly above the point being measured" },
          { id: "far", label: "Far away from the scale" },
        ],
        answer: "above",
        reveal: "Directly above the point. Looking from the side gives a wrong reading.",
      },
      explore: { activity: "Activities 3 & 4", title: "Scale skills", how: "Try different eye positions, use a broken scale, and measure a curved line with a thread.", Sim: Correctly },
      discoveries: [
        { id: "eye", text: "Keep your eye directly above the point you read" },
        { id: "broken", text: "With a broken scale, start from a full mark and subtract" },
        { id: "curved", text: "A thread measures curved lines" },
      ],
      understand: [
        { title: "Place it right", body: "Place the scale in contact with the object along its length." },
        { title: "Eye position", body: "Your eye must be exactly in front of (directly above) the point where the measurement is taken." },
        { title: "Broken ends", body: "If the zero mark is broken, measure from another full mark, like 1.0 cm, and subtract it from the reading." },
        { title: "Curved lines", body: "Lay a thread along the curve, mark the ends, then straighten it along a scale." },
      ],
      check: [
        { id: "m3", kind: "mcq", q: "A pencil starts at the 1.0 cm mark of a broken scale and ends at 14.3 cm. How long is it?", options: ["14.3 cm", "13.3 cm", "15.3 cm"], answer: 1, why: "14.3 − 1.0 = 13.3 cm." },
        { id: "m4", kind: "tf", q: "A thread can help us measure the length of a curved line.", answer: true, why: "Lay it along the curve, then measure it straight." },
      ],
      connect: [
        { icon: "📐", title: "Height check", body: "Stand against a wall and mark your height to measure it." },
        { icon: "🗺", title: "Maps", body: "Use a thread to measure a curvy road on a map." },
        { icon: "⏱", title: "Precision", body: "Scientists measure very carefully — small mistakes add up." },
      ],
    },
    {
      id: "types",
      icon: "🔄",
      title: "Types of motion",
      pages: "102–105",
      wonder: {
        q: "A child on a swing moves to and fro, again and again. What kind of motion is this?",
        options: [
          { id: "rect", label: "Motion in a straight line" },
          { id: "circ", label: "Circular motion" },
          { id: "peri", label: "Periodic motion" },
        ],
        answer: "peri",
        reveal: "Periodic motion — the swing repeats its motion after a fixed interval of time.",
      },
      explore: { activity: "Activities 5–7", title: "Sort the motion", how: "Decide what kind of motion each moving thing has.", Sim: MotionSort },
      discoveries: [
        { id: "rect", text: "Rectilinear motion: moving along a straight line" },
        { id: "circ", text: "Circular motion: staying the same distance from a fixed point" },
        { id: "peri", text: "Periodic motion: repeating after a fixed time" },
      ],
      understand: [
        { title: "Motion", body: "When an object's position changes with time, it is in motion." },
        { title: "Rectilinear", body: "Motion along a straight line: soldiers marching, a falling stone." },
        { title: "Circular", body: "The object stays at the same distance from a fixed point: the tip of a fan blade or a clock hand." },
        { title: "Periodic, and mixes", body: "An object repeating its motion after some time is in periodic motion. A rolling ball moves in a straight line and rotates at the same time." },
      ],
      check: [
        {
          id: "m5",
          kind: "sort",
          q: "Straight line or circular?",
          bins: ["Straight line", "Circular"],
          items: [
            { label: "March past", bin: 0 },
            { label: "Falling stone", bin: 0 },
            { label: "Fan blade tip", bin: 1 },
            { label: "Giant wheel", bin: 1 },
          ],
          why: "Marching and falling are rectilinear; a fan blade tip and a giant wheel move in circles.",
        },
        { id: "m6", kind: "tf", q: "The motion of a pendulum is periodic.", answer: true, why: "It swings to and fro, repeating after a fixed time." },
      ],
      connect: [
        { icon: "🎸", title: "Guitar strings", body: "A plucked string vibrates — periodic motion." },
        { icon: "🌍", title: "Earth and Moon", body: "The Moon goes around the Earth again and again." },
        { icon: "🚲", title: "Bicycle", body: "The wheels rotate while the bicycle moves in a straight line." },
      ],
    },
    {
      id: "transport",
      icon: "🚂",
      title: "The story of transport",
      pages: "95–96",
      wonder: {
        q: "Which invention made the biggest change in early transport on land?",
        options: [
          { id: "wheel", label: "The wheel" },
          { id: "rope", label: "The rope" },
          { id: "shoes", label: "Shoes" },
        ],
        answer: "wheel",
        reveal: "The wheel! It made it possible to build carts that carry heavy loads. Later engines changed everything again.",
      },
      explore: { activity: "Section 10.1", title: "Transport timeline", how: "Put the ways of travelling in order, from oldest to newest.", Sim: Transport },
      discoveries: [
        { id: "wheel", text: "The wheel made carts possible" },
        { id: "engine", text: "The steam engine led to railways" },
        { id: "modern", text: "Planes and electric trains came in the 20th century" },
      ],
      understand: [
        { title: "Long ago", body: "People walked, used animals, and used simple boats on water." },
        { title: "The wheel", body: "The invention of the wheel made a great change in transport, and it kept improving." },
        { title: "Engines", body: "Steam engines in the early 19th century, then motor vehicles, ships and aeroplanes, then electric trains, monorails and supersonic planes." },
      ],
      check: [{ id: "m7", kind: "mcq", q: "When was the steam engine introduced for transport?", options: ["Early 19th century", "Ancient times", "Last year"], answer: 0, why: "Steam engines arrived in the early 1800s." }],
      connect: [
        { icon: "🚇", title: "Metro", body: "Many Indian cities now have metro trains." },
        { icon: "🚲", title: "Going green", body: "Bicycles and walking don't pollute the air." },
        { icon: "🚀", title: "Next?", body: "What will transport look like when you grow up?" },
      ],
    },
  ],
  learnt: [
    "Different modes of transport are used to go from one place to another.",
    "Long ago, people used the length of a foot, the width of a finger or a step as units. This caused confusion, so standard units were developed.",
    "Today we use the International System of Units (SI units). The metre is the SI unit of length.",
    "Motion is a change in the position of an object with time.",
    "Motion along a straight line is rectilinear; around a fixed point at the same distance it is circular; repeating after fixed time it is periodic.",
  ],
  keywords: ["Distance", "Measurement", "Unit", "SI units", "Metre", "Motion", "Rectilinear motion", "Circular motion", "Periodic motion"],
};

export default chapter;
