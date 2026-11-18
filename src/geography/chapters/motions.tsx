// Geography Chapter 3 · Motions of the Earth (NCERT The Earth: Our Habitat, 2020-21, pp. 18–22).
// Wording is original; facts follow the textbook. Orbit diagrams are not to scale.
import { useEffect, useRef, useState } from "react";
import { PickLab } from "../../science/kit";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";
import Globe from "../Globe";

/* Stop 1 · rotation, day and night */
const TOWN = { lon: 77, lat: 28.6 }; // a town in northern India
function Rotation({ discover }: SimProps) {
  const [speed, setSpeed] = useState(40); // degrees per second
  const [stopped, setStopped] = useState(false);
  const [lon0, setLon0] = useState(-20);
  const [showCircle, setShowCircle] = useState(false);
  const turned = useRef(0);
  const last = useRef(lon0);
  const states = useRef(new Set<string>());

  useEffect(() => {
    let d = lon0 - last.current;
    if (d < -180) d += 360;
    if (d > 180) d -= 360;
    turned.current += Math.abs(d);
    last.current = lon0;
    if (turned.current >= 360) discover("day24");
  }, [lon0, discover]);

  // the sun shines from the left: the sub-solar longitude is 90° west of the view centre
  const sunLon = lon0 - 90;
  let rel = TOWN.lon - sunLon;
  rel = ((rel + 540) % 360) - 180;
  const day = Math.abs(rel) < 90;
  useEffect(() => {
    states.current.add(day ? "day" : "night");
    if (states.current.has("day") && states.current.has("night")) discover("daynight");
  }, [day, discover]);

  return (
    <Stage
      caption={
        stopped
          ? "If the earth did not rotate, one half would have day all the time and be continuously warm; the other would be in darkness and freezing. Life would not be possible."
          : showCircle
            ? "The circle of illumination divides day from night. It does not coincide with the axis."
            : `The earth rotates from west to east, once in about 24 hours. The town is now in ${day ? "daylight ☀️" : "darkness 🌙"}.`
      }
    >
      <div className="relative mx-auto w-full max-w-[360px] p-3">
        <div className="absolute left-0 top-1/2 h-24 w-6 -translate-y-1/2 rounded-r-full bg-[#ffd257] blur-md" />
        <Globe size={320} lon0={lon0} onSpin={setLon0} autoSpin={stopped ? 0 : speed} night={sunLon} grid={false}>
          {(project) => {
            const q = project(TOWN.lon, TOWN.lat);
            return (
              <g>
                {showCircle && <line x1="160" y1="8" x2="160" y2="312" stroke="#ffd257" strokeWidth="3" strokeDasharray="6 5" />}
                {q.visible && (
                  <g>
                    <circle cx={q.x} cy={q.y} r="7" fill={day ? "#ffd257" : "#8fb3ff"} stroke="#13112b" strokeWidth="2" />
                    <text x={q.x + 10} y={q.y + 4} fontSize="12" fontWeight="900" fill="#fff">
                      town X
                    </text>
                  </g>
                )}
              </g>
            );
          }}
        </Globe>
      </div>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Spin speed</span>
          <input type="range" min={5} max={180} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Spin speed" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn on={showCircle} onClick={() => (setShowCircle(true), discover("circle"))}>
            ◐ Circle of illumination
          </Btn>
          <Btn
            on={stopped}
            onClick={() => {
              setStopped((s) => !s);
              discover("stop");
            }}
          >
            {stopped ? "▶ Start rotating again" : "⏸ What if the earth stopped?"}
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 2 · revolution and seasons */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dateOf = (d: number) => {
  let m = 0;
  let r = d;
  while (r >= MDAYS[m]) r -= MDAYS[m++];
  return `${r + 1} ${MONTHS[m]}`;
};
function Seasons({ discover }: SimProps) {
  const [d, setD] = useState(171); // day of year (0 = 1 Jan); 171 = 21 June
  const [axis, setAxis] = useState(false);
  const decl = 23.5 * Math.sin((2 * Math.PI * (d - 79)) / 365); // where the sun's rays fall vertically
  const th = (2 * Math.PI * (d - 171)) / 365; // orbit angle; 21 June on the right
  const ex = 260 + Math.cos(th) * 200;
  const ey = 150 - Math.sin(th) * 110;
  const dayLen = (lat: number) => {
    const x = -Math.tan((lat * Math.PI) / 180) * Math.tan((decl * Math.PI) / 180);
    if (x <= -1) return 24;
    if (x >= 1) return 0;
    return (2 * Math.acos(x) * 180) / Math.PI / 15;
  };
  const near = (target: number) => Math.abs(d - target) <= 4;
  useEffect(() => {
    if (near(171)) discover("june");
    if (near(355)) discover("december");
    if (near(79) || near(265)) discover("equinox");
  }, [d]); // eslint-disable-line react-hooks/exhaustive-deps
  const caption = near(171)
    ? "21 June — Summer Solstice. The Northern Hemisphere tilts towards the sun; the sun's rays fall directly on the Tropic of Cancer. Longest day in the north; beyond the Arctic Circle it's light all the time. Winter in the south."
    : near(355)
      ? "22 December — Winter Solstice. The South Pole tilts towards the sun; its rays fall directly on the Tropic of Capricorn. Summer in the Southern Hemisphere — Christmas in Australia is in summer!"
      : near(79) || near(265)
        ? `${near(79) ? "21 March" : "23 September"} — an equinox. The sun's rays fall directly on the equator. Neither pole tilts towards the sun, so the whole earth has equal days and nights.`
        : "The earth goes round the sun in an elliptical orbit, its axis always tilted the same way. Slide through the year.";
  return (
    <Stage caption={caption}>
      <svg viewBox="0 0 520 300" className="block h-auto w-full select-none">
        <rect width="520" height="300" fill="#070b24" />
        <ellipse cx="260" cy="150" rx="200" ry="110" fill="none" stroke="#ffffff2a" strokeDasharray="4 6" />
        <circle cx="260" cy="150" r="26" fill="#ffd257" className="animate-glow" />
        <circle cx="260" cy="150" r="19" fill="#ffb534" />
        {[
          [171, "21 Jun"],
          [79, "21 Mar"],
          [355, "22 Dec"],
          [265, "23 Sep"],
        ].map(([dd, l]) => {
          const t = (2 * Math.PI * ((dd as number) - 171)) / 365;
          return (
            <text key={l as string} x={260 + Math.cos(t) * 236} y={150 - Math.sin(t) * 132 + 4} fontSize="11" fontWeight="800" fill="#9da3c7" textAnchor="middle">
              {l}
            </text>
          );
        })}
        {/* earth with its tilted axis (always leaning the same way) */}
        <g transform={`translate(${ex} ${ey})`}>
          <circle r="16" fill="#2f7fc0" />
          <path d={`M0 -16 A16 16 0 0 ${ex > 260 ? 0 : 1} 0 16`} fill="#020617" opacity=".55" transform={`rotate(${(Math.atan2(150 - ey, 260 - ex) * 180) / Math.PI + 90})`} />
          <line x1="0" y1="0" x2="0" y2="-26" stroke="#e5484d" strokeWidth="3" transform="rotate(-23.5)" />
          <line x1="0" y1="0" x2="0" y2="26" stroke="#e5484d" strokeWidth="3" transform="rotate(-23.5)" />
          <text x="-14" y="-28" fontSize="10" fontWeight="900" fill="#ff9b9b">N</text>
        </g>
        {axis && (
          <text x="12" y="292" fontSize="11" fontWeight="900" fill="#ffd257">
            The axis makes 66½° with the orbital plane
          </text>
        )}
        <text x="510" y="292" fontSize="10" fontWeight="800" fill="#7e86b0" textAnchor="end">Not to scale</text>
      </svg>
      <div className="grid items-center gap-3 border-t border-white/10 p-4 sm:grid-cols-[150px_1fr]">
        <div className="mx-auto w-36">
          <p className="mb-1 text-center text-[11px] font-extrabold uppercase tracking-wide text-white/50">The sun's view</p>
          <Globe size={140} lon0={80} lat0={decl} grid={false} draggable={false} parallels={[{ lat: 0, color: "#ffd257" }, { lat: 23.5, color: "#ff8a5c" }, { lat: -23.5, color: "#ff8a5c" }]} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Readout label="Date" value={dateOf(d)} />
          <Readout label="Sun overhead at" value={`${Math.abs(decl).toFixed(1)}° ${decl >= 0 ? "N" : "S"}`} color="#ff8a5c" />
          <Readout label="Day length at 28½° N" value={`${dayLen(28.6).toFixed(1)} h`} color="#7fd0ff" />
          <Readout label="Day length at 70° N" value={`${dayLen(70).toFixed(0)} h`} color="#9fd8ff" />
        </div>
      </div>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Day of the year</span>
          <input type="range" min={0} max={364} value={d} onChange={(e) => setD(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Day of the year" />
        </label>
        <div className="flex flex-wrap gap-1.5">
          <Btn onClick={() => setD(79)}>21 Mar</Btn>
          <Btn onClick={() => setD(171)}>21 Jun</Btn>
          <Btn onClick={() => setD(265)}>23 Sep</Btn>
          <Btn onClick={() => setD(355)}>22 Dec</Btn>
          <Btn on={axis} onClick={() => (setAxis(true), discover("tilt"))}>
            📐 Axis angle
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · leap years */
function Leap({ discover }: SimProps) {
  return (
    <PickLab
      discover={discover}
      intro="One trip round the sun doesn't take a neat 365 days. Solve these puzzles."
      cases={[
        { id: "year", icon: "🗓", prompt: "How long does the earth take to revolve once around the sun?", options: ["365¼ days", "24 hours", "27 days"], answer: 0, explain: "About 365¼ days — one year. We count a year as 365 days for convenience.", disc: "year" },
        { id: "leap", icon: "➕", prompt: "What happens to the extra six hours each year?", options: ["Over four years they add up to one day, added to February", "They are lost", "They are added to December"], answer: 0, explain: "Every fourth year, February has 29 days instead of 28. A year with 366 days is a leap year.", disc: "leap" },
        { id: "orbit", icon: "🥚", prompt: "What shape is the earth's orbit around the sun?", options: ["Elliptical", "A perfect square", "A straight line"], answer: 0, explain: "The orbit is elliptical. Draw one with two pins, a loop of thread and a pencil!", disc: "ellipse" },
      ]}
    />
  );
}

const chapter: Chapter = {
  id: "gmotion",
  subject: "Geography",
  n: 3,
  title: "Motions of the Earth",
  pages: "18–22",
  icon: "🔄",
  theme: { grad: "linear-gradient(135deg,#0a0f2e 0%,#2b4fb3 55%,#ffc85a 130%)", accent: "#2b4fb3", soft: "#e3e9fb", ink: "#1c357a" },
  opening: "Why do we have day and night? And why is it hot in May but cold in January? The answers lie in two ways the earth moves.",
  stops: [
    {
      id: "rotate",
      icon: "🌗",
      title: "Rotation: day and night",
      pages: "18–19",
      wonder: {
        q: "What causes day and night?",
        options: [
          { id: "sun", label: "The sun goes round the earth" },
          { id: "rotate", label: "The earth spins on its axis" },
          { id: "clouds", label: "Clouds cover the sun at night" },
        ],
        answer: "rotate",
        reveal: "The earth rotates on its axis. The half facing the sun has day; the other half has night.",
      },
      explore: { activity: "Let's Do (ball and candle)", title: "Spin the earth", how: "Watch town X move between day and night. Change the speed, or drag the globe yourself.", Sim: Rotation },
      discoveries: [
        { id: "daynight", text: "As the earth rotates, a place moves from day into night" },
        { id: "circle", text: "The circle of illumination divides day from night" },
        { id: "stop", text: "Without rotation, one half would always be hot, the other frozen" },
        { id: "day24", text: "One full rotation takes about 24 hours — an earthday" },
      ],
      understand: [
        { title: "Two motions", body: "The earth has two motions: rotation (spinning on its axis) and revolution (moving round the sun in its orbit)." },
        { title: "Tilted axis", body: "The earth's axis is an imaginary line. It makes an angle of 66½° with its orbital plane." },
        { title: "Earthday", body: "One rotation takes about 24 hours — the earthday, the daily motion of the earth." },
        { title: "Aryabhata", body: "The ancient Indian astronomer Aryabhata stated that the earth is round and rotates on its own axis." },
      ],
      check: [{ id: "gm1", kind: "mcq", q: "The earth's axis makes an angle of ______ with its orbital plane.", options: ["66½°", "90°", "23½°"], answer: 0, why: "The axis is inclined at 66½° to the plane of its orbit." }],
      connect: [
        { icon: "🕯", title: "Ball and candle", body: "Mark a town on a ball and turn it in front of a candle to see sunrise and sunset." },
        { icon: "🌅", title: "Sunrise times", body: "Note sunrise and sunset times for a week. Do they change?" },
        { icon: "🌍", title: "Always half lit", body: "At every moment, exactly half the earth is in daylight." },
      ],
    },
    {
      id: "seasons",
      icon: "🍂",
      title: "Revolution and seasons",
      pages: "19–21",
      wonder: {
        q: "Why do seasons change?",
        options: [
          { id: "distance", label: "The earth goes much closer to the sun in summer" },
          { id: "tilt", label: "The tilted earth's position changes as it goes round the sun" },
          { id: "random", label: "They change randomly" },
        ],
        answer: "tilt",
        reveal: "Seasons change because of the earth's changing position around the sun, with its axis always tilted the same way. Sometimes the north leans towards the sun, sometimes the south.",
      },
      explore: { activity: "Figure 3.3", title: "A year around the sun", how: "Slide through the year. Watch where the sun's rays fall straight down, and how long the days are.", Sim: Seasons },
      discoveries: [
        { id: "june", text: "21 June: summer solstice — the north leans towards the sun" },
        { id: "december", text: "22 December: winter solstice — summer in the south" },
        { id: "equinox", text: "21 March and 23 September: equinoxes — equal day and night" },
        { id: "tilt", text: "The axis stays tilted the same way all year" },
      ],
      understand: [
        { title: "Revolution", body: "The earth goes round the sun in a fixed elliptical path called its orbit, taking 365¼ days." },
        { title: "Four seasons", body: "A year is usually divided into summer, winter, spring and autumn." },
        { title: "Long days, short nights", body: "In June, places in the Northern Hemisphere get more heat and have longer days. Beyond the Arctic Circle there's continuous daylight for about six months." },
        { title: "Opposite seasons", body: "When it's summer in the Northern Hemisphere, it's winter in the Southern Hemisphere — and the other way round." },
      ],
      check: [
        { id: "gm2", kind: "mcq", q: "On 21 June, the sun's rays fall directly on…", options: ["The Tropic of Cancer", "The equator", "The Tropic of Capricorn"], answer: 0, why: "The Northern Hemisphere is tilted towards the sun." },
        { id: "gm3", kind: "tf", q: "On an equinox, the whole earth has equal days and nights.", answer: true, why: "Neither pole is tilted towards the sun." },
      ],
      connect: [
        { icon: "🎄", title: "Christmas in summer", body: "In Australia, Christmas falls in the summer!" },
        { icon: "🧣", title: "Your seasons", body: "Which months are hottest and coldest where you live?" },
        { icon: "❄️", title: "Midnight sun", body: "Near the poles, the sun doesn't set for months in summer." },
      ],
    },
    {
      id: "leap",
      icon: "🗓",
      title: "Leap years",
      pages: "19–20",
      wonder: {
        q: "Why does February have 29 days every fourth year?",
        options: [
          { id: "extra", label: "To catch up the extra quarter day each year" },
          { id: "law", label: "Because of a king's order" },
          { id: "moon", label: "Because of the moon" },
        ],
        answer: "extra",
        reveal: "The earth takes 365¼ days to go round the sun. The extra six hours each year add up to a day every four years.",
      },
      explore: { activity: "Revolution", title: "Year puzzles", how: "Solve the puzzles about the earth's year.", Sim: Leap },
      discoveries: [
        { id: "year", text: "One revolution takes 365¼ days" },
        { id: "leap", text: "Every fourth year is a leap year with 366 days" },
        { id: "ellipse", text: "The earth's orbit is elliptical" },
      ],
      understand: [{ title: "Leap year", body: "Six hours saved every year make one day (24 hours) over four years. This surplus day is added to February." }],
      check: [{ id: "gm4", kind: "mcq", q: "How many days are there in a leap year?", options: ["366", "365", "364"], answer: 0, why: "February gets an extra day." }],
      connect: [
        { icon: "🎂", title: "Leap birthdays", body: "People born on 29 February have a real birthday only every four years!" },
        { icon: "✏️", title: "Draw an ellipse", body: "Use two pins and a loop of thread." },
        { icon: "📅", title: "Next leap year", body: "When is the next leap year?" },
      ],
    },
  ],
  learnt: [
    "The earth has two motions: rotation on its axis and revolution around the sun.",
    "Rotation takes about 24 hours and causes day and night. The circle of illumination divides day from night.",
    "Revolution takes 365¼ days; every fourth year is a leap year.",
    "The earth's axis is inclined at 66½° to its orbital plane. Its changing position around the sun causes seasons.",
    "Solstices: 21 June and 22 December. Equinoxes: 21 March and 23 September.",
  ],
  keywords: ["Rotation", "Revolution", "Axis", "Orbital plane", "Circle of illumination", "Leap year", "Solstice", "Equinox"],
};

export default chapter;
