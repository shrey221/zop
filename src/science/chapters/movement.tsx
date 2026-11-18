// Chapter 8 · Body Movements (NCERT Science Class VI, 2018-19, pp. 66–78).
// Wording is original; facts and activities follow the textbook.
import { useEffect, useRef, useState } from "react";
import { ExploreLab, PickLab } from "../kit";
import type { Chapter, SimProps } from "../types";
import { Btn, Stage, svgPoint } from "../ui";

const BONE = "#f1ead8";

/* Stop 1 · joints */
type Joint = "shoulder" | "elbow" | "neck" | "skull";
const LIMITS: Record<Exclude<Joint, "skull">, [number, number]> = { shoulder: [-360, 360], elbow: [0, 150], neck: [-70, 70] };

function Joints({ discover }: SimProps) {
  const [joint, setJoint] = useState<Joint>("elbow");
  const [angle, setAngle] = useState(0);
  const [tried, setTried] = useState(false);
  const swept = useRef({ min: 0, max: 0, last: 0 });
  const dragging = useRef(false);
  const P = joint === "neck" ? { x: 260, y: 150 } : { x: 220, y: 140 };

  useEffect(() => {
    setAngle(0);
    swept.current = { min: 0, max: 0, last: 0 };
    setTried(false);
  }, [joint]);

  function move(e: React.PointerEvent<SVGElement>) {
    if (!dragging.current) return;
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as unknown as SVGSVGElement);
    const p = svgPoint(svg, e);
    if (joint === "skull") {
      setTried(true);
      discover("fixed");
      return;
    }
    const raw = (Math.atan2(p.y - P.y, p.x - P.x) * 180) / Math.PI; // 0 = pointing right
    let a = joint === "neck" ? raw + 90 : joint === "elbow" ? -raw : raw;
    // unwrap so the shoulder can keep going round
    const s = swept.current;
    while (a - s.last > 180) a -= 360;
    while (a - s.last < -180) a += 360;
    const [lo, hi] = LIMITS[joint];
    const clamped = Math.max(lo, Math.min(hi, a));
    s.last = clamped;
    s.min = Math.min(s.min, clamped);
    s.max = Math.max(s.max, clamped);
    setAngle(clamped);
    if (joint === "shoulder" && s.max - s.min > 300) discover("ball");
    if (joint === "elbow" && clamped >= 80) discover("hinge");
    if (joint === "neck" && Math.abs(clamped) >= 40) discover("pivot");
  }

  const handlers = {
    onPointerDown: (e: React.PointerEvent<SVGElement>) => {
      dragging.current = true;
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
      move(e);
    },
    onPointerMove: move,
    onPointerUp: () => (dragging.current = false),
    style: { touchAction: "none", cursor: "grab" } as React.CSSProperties,
  };

  const caption = {
    shoulder: "Ball and socket joint: the rounded end of the arm bone fits into a cup in the shoulder. Drag the arm all the way round!",
    elbow: "Hinge joint: like a door hinge, the elbow lets the forearm move back and forth in one direction only. Try bending it backwards!",
    neck: "Pivot joint: the neck bones let your head turn left and right. (Seen from above.)",
    skull: tried ? "Fixed joint: the bones of the skull are joined so they cannot move at all." : "Try to move the bones of the skull…",
  }[joint];

  return (
    <Stage caption={caption}>
      <svg viewBox="0 0 520 280" className="block h-auto w-full select-none" {...handlers}>
        <rect width="520" height="280" fill="#13112b" />
        {joint === "shoulder" && (
          <g>
            <rect x="120" y="100" width="100" height="160" rx="30" fill="#5b8def" />
            <circle cx={P.x} cy={P.y} r="16" fill={BONE} />
            <g transform={`rotate(${angle} ${P.x} ${P.y})`}>
              <rect x={P.x} y={P.y - 14} width="170" height="28" rx="14" fill="#f2c39b" />
              <circle cx={P.x + 172} cy={P.y} r="18" fill="#f2c39b" />
            </g>
            <circle cx={P.x} cy={P.y} r="9" fill="#d8cdb2" />
          </g>
        )}
        {joint === "elbow" && (
          <g>
            <rect x="60" y={P.y - 15} width={P.x - 60} height="30" rx="15" fill="#f2c39b" />
            <g transform={`rotate(${-angle} ${P.x} ${P.y})`}>
              <rect x={P.x} y={P.y - 13} width="160" height="26" rx="13" fill="#f2c39b" />
              <circle cx={P.x + 166} cy={P.y} r="18" fill="#f2c39b" />
            </g>
            <circle cx={P.x} cy={P.y} r="14" fill={BONE} />
            <path d={`M${P.x + 40} ${P.y + 60} a60 60 0 0 0 0 -120`} stroke="#ffd257" strokeOpacity=".35" strokeWidth="3" strokeDasharray="5 6" fill="none" />
          </g>
        )}
        {joint === "neck" && (
          <g>
            <ellipse cx={P.x} cy={P.y + 80} rx="120" ry="38" fill="#5b8def" />
            <g transform={`rotate(${angle} ${P.x} ${P.y})`}>
              <ellipse cx={P.x} cy={P.y} rx="54" ry="60" fill="#3b2a20" />
              <path d={`M${P.x - 10} ${P.y - 58} l10 -18 l10 18 z`} fill="#f2c39b" />
            </g>
            <text x={P.x} y="26" fontSize="12" fontWeight="800" fill="#9da3c7" textAnchor="middle">seen from above · nose ↑</text>
          </g>
        )}
        {joint === "skull" && (
          <g className={tried ? "animate-[shake_.4s]" : ""}>
            <ellipse cx="260" cy="130" rx="110" ry="96" fill={BONE} />
            <path d="M200 60 q30 40 60 30 q30 -10 60 30 M180 140 q40 -10 80 10 q40 20 80 -10" stroke="#b9ad8e" strokeWidth="3" fill="none" strokeDasharray="3 4" />
            <ellipse cx="220" cy="160" rx="22" ry="18" fill="#13112b" />
            <ellipse cx="300" cy="160" rx="22" ry="18" fill="#13112b" />
            <text x="260" y="256" fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">joined skull bones</text>
          </g>
        )}
        {joint !== "skull" && (
          <text x="500" y="268" fontSize="13" fontWeight="900" fill="#ffd257" textAnchor="end">
            {Math.round(Math.abs(angle))}°
          </text>
        )}
      </svg>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {(["elbow", "shoulder", "neck", "skull"] as Joint[]).map((j) => (
          <Btn key={j} on={joint === j} onClick={() => setJoint(j)}>
            {{ elbow: "💪 Elbow", shoulder: "🙋 Shoulder", neck: "🙂 Neck", skull: "💀 Skull" }[j]}
          </Btn>
        ))}
      </div>
    </Stage>
  );
}

/* Stop 2 · the skeleton */
function Skeleton() {
  return (
    <g stroke={BONE} strokeLinecap="round" fill="none">
      <rect width="520" height="380" fill="#13112b" stroke="none" />
      <ellipse cx="260" cy="44" rx="30" ry="34" fill={BONE} stroke="none" />
      <path d="M232 44 q-8 6 -2 14" strokeWidth="4" stroke="#e8b4a0" />
      <path d="M260 80 V230" strokeWidth="8" strokeDasharray="6 3" />
      <path d="M200 98 H320" strokeWidth="7" />
      {[112, 128, 144, 160, 176].map((y, i) => (
        <path key={y} d={`M260 ${y} C ${232 - i} ${y - 4}, ${214 - i * 2} ${y + 8}, ${222 - i} ${y + 18} M260 ${y} C ${288 + i} ${y - 4}, ${306 + i * 2} ${y + 8}, ${298 + i} ${y + 18}`} strokeWidth="4" />
      ))}
      <path d="M200 98 L178 190 L170 270 M320 98 L342 190 L350 270" strokeWidth="7" />
      <path d="M222 232 Q260 262 298 232 Q290 252 260 258 Q230 252 222 232 Z" fill={BONE} stroke="none" />
      <path d="M240 254 L232 320 L236 370 M280 254 L288 320 L284 370" strokeWidth="8" />
    </g>
  );
}
function SkeletonExplore({ discover }: SimProps) {
  return (
    <ExploreLab
      discover={discover}
      intro="Tap the glowing dots to explore the human skeleton."
      viewBox="0 0 520 380"
      art={<Skeleton />}
      spots={[
        { id: "skull", label: "Skull", x: 260, y: 40, text: "Many bones joined together form the skull. It encloses and protects the brain, a very important part of the body." },
        { id: "ribs", label: "Rib cage", x: 300, y: 150, text: "Ribs join the chest bone and backbone to form a box — the rib cage. It protects important organs inside, like the heart and lungs. There are 12 pairs of ribs." },
        { id: "spine", label: "Backbone", x: 260, y: 212, text: "The backbone is made of 33 small bones called vertebrae. It lets us bend forward and backward." },
        { id: "shoulder", label: "Shoulder bones", x: 205, y: 98, text: "Two shoulder bones, near the neck, join the arms to the body." },
        { id: "pelvis", label: "Pelvic bones", x: 260, y: 248, text: "The hip bones form a box-like structure that protects the parts of the body below the stomach. We sit on this part." },
        { id: "ear", label: "Cartilage", x: 230, y: 50, text: "Feel your ear: it bends! The upper part is cartilage — softer than bone and bendable. Cartilage is also found in joints." },
      ]}
      groups={{ skull: ["skull"], ribs: ["ribs"], backbone: ["spine"], cartilage: ["ear"] }}
    />
  );
}

/* Stop 3 · muscles work in pairs */
function MusclePair({ discover }: SimProps) {
  const [bend, setBend] = useState(0);
  const bent = useRef(false);
  useEffect(() => {
    if (bend >= 90) {
      bent.current = true;
      discover("contract");
    }
    if (bent.current && bend <= 20) {
      discover("straighten");
      discover("pairs");
    }
  }, [bend, discover]);
  const k = bend / 140;
  const E = { x: 280, y: 150 };
  return (
    <Stage
      caption={
        bend >= 90
          ? "To bend the arm, the muscle on the front (biceps) contracts — it becomes shorter and thicker — and pulls the forearm up."
          : bend <= 20 && bent.current
            ? "To straighten it, the muscle on the back contracts and pulls. Muscles can only pull, never push, so they work in pairs."
            : "Slide to bend the arm at the elbow. Watch the two muscles."
      }
    >
      <svg viewBox="0 0 520 260" className="block h-auto w-full select-none">
        <rect width="520" height="260" fill="#13112b" />
        {/* upper arm bone + muscles */}
        <rect x="90" y={E.y - 7} width={E.x - 90} height="14" rx="7" fill={BONE} />
        <ellipse cx="185" cy={E.y - 18 - k * 8} rx={70 - k * 16} ry={14 + k * 16} fill={`rgb(${200 + k * 40},${80 - k * 30},${90 - k * 30})`} style={{ transition: "all .2s" }} />
        <ellipse cx="185" cy={E.y + 18} rx={56 + k * 14} ry={16 - k * 7} fill={`rgb(${230 - k * 40},${110 + k * 30},${120 + k * 20})`} style={{ transition: "all .2s" }} />
        <text x="185" y={E.y - 46 - k * 16} fontSize="11" fontWeight="900" fill="#ffd257" textAnchor="middle">
          front muscle · {bend >= 60 ? "contracted" : "relaxed"}
        </text>
        <text x="185" y={E.y + 52} fontSize="11" fontWeight="900" fill="#8fb3ff" textAnchor="middle">
          back muscle · {bend >= 60 ? "relaxed" : "contracted"}
        </text>
        {/* forearm */}
        <g transform={`rotate(${-bend} ${E.x} ${E.y})`} style={{ transition: "transform .2s" }}>
          <rect x={E.x} y={E.y - 6} width="170" height="12" rx="6" fill={BONE} />
          <circle cx={E.x + 176} cy={E.y} r="14" fill="#f2c39b" />
        </g>
        <circle cx={E.x} cy={E.y} r="11" fill="#d8cdb2" />
      </svg>
      <div className="border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Bend the elbow</span>
          <input type="range" min={0} max={140} value={bend} onChange={(e) => setBend(+e.target.value)} className="w-full accent-[#ff8a7a]" aria-label="Bend the elbow" />
        </label>
      </div>
    </Stage>
  );
}

/* Stop 4 · how animals move */
function AnimalMoves({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="Choose how each animal moves."
      cases={[
        { id: "worm", icon: "🐛", prompt: "An earthworm has no bones. How does it move?", options: ["It hops on tiny legs", "It stretches and shortens its body with muscles; bristles grip the ground", "It rolls"], answer: 1, explain: "The earthworm's body is made of many rings joined end to end. Muscles extend and shorten it, and tiny bristles under the body grip the ground. A slimy substance helps it move.", disc: "worm" },
        { id: "snail", icon: "🐌", prompt: "A snail carries a shell. What moves it along?", options: ["A thick muscular foot", "Its shell rolls", "Wings"], answer: 0, explain: "A thick muscular structure — the foot — comes out of the shell and moves the snail slowly forward." },
        { id: "cockroach", icon: "🐞", prompt: "Cockroaches walk, climb and fly. What helps them?", options: ["Three pairs of legs and two pairs of wings, moved by muscles", "Fins", "A muscular foot"], answer: 0, explain: "Cockroaches have three pairs of legs and two pairs of wings. Their body has a hard outer skeleton; breast muscles move the legs and wings." },
        { id: "bird", icon: "🐦", prompt: "What makes birds such good fliers?", options: ["Heavy, solid bones", "Hollow, light bones and strong flight muscles", "A slimy body"], answer: 1, explain: "Birds' bones are hollow and light, and strong muscles in their breast flap the wings. Their body is streamlined too.", disc: "bird" },
        { id: "fish", icon: "🐟", prompt: "How does a fish swim?", options: ["By looping its body from side to side, using its tail and fins", "By walking on the bottom", "By flapping its gills"], answer: 0, explain: "A fish's streamlined body loops from side to side; the tail fin pushes it forward and the other fins help it balance and steer.", disc: "fish" },
        { id: "snake", icon: "🐍", prompt: "A snake has no legs. How does it slither?", options: ["It rolls along", "It loops its body sideways; many bones and muscles push it forward", "It jumps"], answer: 1, explain: "A snake has a long backbone with many bones and muscles. It loops sideways, and each loop pushes against the ground.", disc: "snake" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "movement",
  n: 8,
  title: "Body Movements",
  pages: "66–78",
  icon: "🦴",
  theme: { grad: "linear-gradient(135deg,#1e1033 0%,#6d3fc0 55%,#f59e9e 125%)", accent: "#6d3fc0", soft: "#efe7ff", ink: "#4a2490" },
  opening: "You can bend your elbow, turn your head and wiggle your fingers — but you can't bend your elbow backwards. Why do different parts move in different ways?",
  stops: [
    {
      id: "joints",
      icon: "💪",
      title: "Joints",
      pages: "66–70",
      wonder: {
        q: "Your arm can swing all the way round at the shoulder. What kind of joint allows that?",
        options: [
          { id: "hinge", label: "A hinge joint" },
          { id: "ball", label: "A ball and socket joint" },
          { id: "fixed", label: "A fixed joint" },
        ],
        answer: "ball",
        reveal: "A ball and socket joint — the rounded end of one bone fits into the cavity of another, allowing movement in all directions.",
      },
      explore: { activity: "Activities 1–4", title: "Test the joints", how: "Pick a joint and drag the body part to move it. How far can it go?", Sim: Joints },
      discoveries: [
        { id: "hinge", text: "The elbow is a hinge joint: it moves one way only" },
        { id: "ball", text: "The shoulder is a ball and socket joint: it moves all round" },
        { id: "pivot", text: "The neck has a pivot joint: the head turns side to side" },
        { id: "fixed", text: "Skull bones are joined by fixed joints that can't move" },
      ],
      understand: [
        { title: "Joints", body: "Places where two parts of the body seem to be joined together, so that they can bend or move, are joints." },
        { title: "Ball and socket", body: "Allows movement in all directions — like the shoulder and hip." },
        { title: "Hinge and pivot", body: "A hinge joint (elbow, knee) moves back and forth only. A pivot joint (neck) lets the head turn left and right." },
        { title: "Fixed joints", body: "Some bones can't move at the joint, like the bones of the skull, except the lower jaw." },
      ],
      check: [
        { id: "b1", kind: "mcq", q: "The knee and the elbow are examples of…", options: ["Hinge joints", "Pivot joints", "Fixed joints"], answer: 0, why: "They move back and forth in one direction." },
        { id: "b2", kind: "tf", q: "The joints of the bones in the skull are fixed joints.", answer: true, why: "Skull bones can't move (except the lower jaw)." },
      ],
      connect: [
        { icon: "🚪", title: "Door hinges", body: "Your elbow works like the hinge of a door." },
        { icon: "🕹", title: "Joystick", body: "A joystick moves in all directions — like a ball and socket joint." },
        { icon: "🧘", title: "Yoga", body: "Yoga keeps joints flexible and the backbone straight." },
      ],
    },
    {
      id: "skeleton",
      icon: "💀",
      title: "The skeleton",
      pages: "70–73",
      wonder: {
        q: "Your heart and lungs are soft. What protects them?",
        options: [
          { id: "skull", label: "The skull" },
          { id: "ribs", label: "The rib cage" },
          { id: "muscle", label: "Just skin" },
        ],
        answer: "ribs",
        reveal: "The rib cage — ribs joined to the backbone and chest bone form a protective box around the heart and lungs.",
      },
      explore: { activity: "Activities 5–8", title: "Explore the skeleton", how: "Tap each glowing dot to learn about the bones.", Sim: SkeletonExplore },
      discoveries: [
        { id: "skull", text: "The skull protects the brain" },
        { id: "ribs", text: "The rib cage protects the heart and lungs" },
        { id: "backbone", text: "The backbone has 33 vertebrae and lets us bend" },
        { id: "cartilage", text: "Cartilage is softer than bone and can bend" },
      ],
      understand: [
        { title: "The skeleton", body: "All the bones together form the skeleton. It gives shape to the body, supports it, protects inner organs and helps movement." },
        { title: "Main parts", body: "Skull, backbone, ribs and breastbone, shoulder and hip bones, and the bones of the arms and legs." },
        { title: "Cartilage", body: "Cartilage is softer than bone and can be bent — found in the ear and at joints." },
      ],
      check: [
        { id: "b3", kind: "mcq", q: "How many small bones (vertebrae) make up the backbone?", options: ["12", "33", "206"], answer: 1, why: "The backbone has 33 vertebrae." },
        { id: "b4", kind: "tf", q: "Cartilage is harder than bone.", answer: false, why: "Cartilage is softer and can bend." },
      ],
      connect: [
        { icon: "👂", title: "Bend your ear", body: "Gently fold your ear — that's cartilage." },
        { icon: "📷", title: "X-rays", body: "Doctors use X-ray images to see bones inside the body." },
        { icon: "🥛", title: "Strong bones", body: "Calcium-rich food and exercise keep bones strong." },
      ],
    },
    {
      id: "muscles",
      icon: "🏋",
      title: "Muscles pull in pairs",
      pages: "73",
      wonder: {
        q: "To bend your arm, a muscle pulls the forearm up. What straightens it again?",
        options: [
          { id: "push", label: "The same muscle pushes it down" },
          { id: "other", label: "A different muscle on the other side pulls it" },
          { id: "gravity", label: "Nothing — it falls by itself" },
        ],
        answer: "other",
        reveal: "Another muscle on the other side pulls it straight. A muscle can only pull, not push — so muscles work in pairs.",
      },
      explore: { activity: "Section 8.1", title: "A pair of muscles", how: "Bend and straighten the arm using the slider.", Sim: MusclePair },
      discoveries: [
        { id: "contract", text: "A contracting muscle gets shorter and pulls the bone" },
        { id: "straighten", text: "The muscle on the other side straightens the arm" },
        { id: "pairs", text: "Muscles can only pull, so they work in pairs" },
      ],
      understand: [
        { title: "Muscles move bones", body: "Bones are moved by muscles attached to them." },
        { title: "Contract and relax", body: "When a muscle contracts, it becomes shorter, stiffer and thicker, and pulls the bone." },
        { title: "Pairs", body: "A muscle can only pull. To move a bone in two directions, two muscles work together — one contracts while the other relaxes." },
      ],
      check: [{ id: "b5", kind: "tf", q: "A muscle can push a bone as well as pull it.", answer: false, why: "Muscles can only pull; they work in pairs." }],
      connect: [
        { icon: "🏋", title: "Feel it", body: "Place your hand on your upper arm and bend your elbow — feel the muscle bulge." },
        { icon: "🏃", title: "Running", body: "Pairs of leg muscles take turns as you run." },
        { icon: "🧘", title: "Stretching", body: "Stretching keeps muscles flexible." },
      ],
    },
    {
      id: "animals",
      icon: "🐍",
      title: "How animals move",
      pages: "74–77",
      wonder: {
        q: "An earthworm has no bones and no legs. How does it move?",
        options: [
          { id: "muscle", label: "By stretching and shortening its body with muscles" },
          { id: "roll", label: "By rolling" },
          { id: "wind", label: "The wind carries it" },
        ],
        answer: "muscle",
        reveal: "By muscles! It extends and shortens its body, and tiny bristles grip the ground.",
      },
      explore: { activity: "Activities 9–12", title: "Movers puzzle", how: "Find out how each animal gets around.", Sim: AnimalMoves },
      discoveries: [
        { id: "worm", text: "Earthworms move with muscles and bristles" },
        { id: "bird", text: "Birds have hollow, light bones and strong flight muscles" },
        { id: "fish", text: "Fish swim by looping their streamlined bodies" },
        { id: "snake", text: "Snakes loop sideways using many bones and muscles" },
      ],
      understand: [
        { title: "Gait of animals", body: "Different animals have different body parts and different ways of moving: walking, running, flying, jumping, crawling, slithering and swimming." },
        { title: "Streamlined", body: "Fish and birds have streamlined bodies that cut easily through water and air." },
        { title: "Outer skeleton", body: "Cockroaches have a hard outer covering — an outer skeleton — and muscles that move their legs and wings." },
      ],
      check: [
        { id: "b6", kind: "mcq", q: "Why are birds' bones hollow?", options: ["To make them light for flying", "To store food", "To make them stronger for walking"], answer: 0, why: "Light bones help birds fly." },
        { id: "b7", kind: "tf", q: "Fish swim by forming loops alternately on the two sides of their body.", answer: true, why: "Along with the tail fin, this pushes them forward." },
      ],
      connect: [
        { icon: "🚢", title: "Boat shapes", body: "Boats are shaped like fish to move easily through water." },
        { icon: "✈️", title: "Planes and birds", body: "Aeroplanes are streamlined like birds." },
        { icon: "🐌", title: "Watch a snail", body: "Place a snail on glass and watch its muscular foot ripple." },
      ],
    },
  ],
  learnt: [
    "Bones and cartilage form the skeleton. It gives shape and support to the body, protects organs and helps movement.",
    "The skeleton includes the skull, backbone, ribs and breastbone, shoulder and hip bones, and the bones of the arms and legs.",
    "Bones are moved by the contraction and relaxation of pairs of muscles.",
    "Joints are of different kinds — ball and socket, pivot, hinge and fixed — depending on the movement they allow.",
    "Birds fly with light bones and strong muscles; fish swim by looping their bodies; snakes slither by looping sideways; earthworms use muscles and bristles.",
  ],
  keywords: ["Skeleton", "Joints", "Ball and socket joint", "Hinge joint", "Pivot joint", "Fixed joint", "Cartilage", "Rib cage", "Backbone", "Muscle", "Streamlined"],
};

export default chapter;
