// Geography Chapter 2 · Globe: Latitudes and Longitudes (NCERT The Earth: Our Habitat, 2020-21, pp. 10–17).
// Wording is original; facts follow the textbook.
import { useEffect, useState } from "react";
import type { Chapter, SimProps } from "../../science/types";
import { Btn, Readout, Stage } from "../../science/ui";
import Globe from "../Globe";
import { CONTINENTS, flat, flatPath } from "../world";

/* Stop 1 · latitudes and heat zones */
const LINES = [
  { lat: 0, name: "Equator (0°)", color: "#ffd257" },
  { lat: 23.5, name: "Tropic of Cancer (23½° N)", color: "#ff8a5c" },
  { lat: -23.5, name: "Tropic of Capricorn (23½° S)", color: "#ff8a5c" },
  { lat: 66.5, name: "Arctic Circle (66½° N)", color: "#9fd8ff" },
  { lat: -66.5, name: "Antarctic Circle (66½° S)", color: "#9fd8ff" },
];
const ZONES = {
  torrid: { name: "Torrid Zone", text: "Between the Tropic of Cancer and the Tropic of Capricorn. The mid-day sun is overhead at least once a year everywhere here, so it gets the most heat.", color: "#ff7a45", bands: [[-23.5, 23.5]] },
  temperate: { name: "Temperate Zones", text: "Between the Tropics and the Arctic and Antarctic Circles. The sun is never overhead and its rays get more slanting, so temperatures are moderate.", color: "#5fe0a0", bands: [[23.5, 66.5], [-66.5, -23.5]] },
  frigid: { name: "Frigid Zones", text: "Between the Arctic Circle and North Pole, and the Antarctic Circle and South Pole. The sun does not rise much above the horizon, so these areas are very cold.", color: "#9fd8ff", bands: [[66.5, 90], [-90, -66.5]] },
} as const;
type Zone = keyof typeof ZONES;
function LatitudeGlobe({ discover }: SimProps) {
  const [shown, setShown] = useState<number[]>([0]);
  const [zone, setZone] = useState<Zone | null>(null);
  const [zonesSeen, setZonesSeen] = useState<Zone[]>([]);
  function toggle(lat: number) {
    const s = shown.includes(lat) ? shown : [...shown, lat];
    setShown(s);
    setZone(null);
    if (s.includes(23.5) && s.includes(-23.5)) discover("tropics");
    if (s.includes(66.5) && s.includes(-66.5)) discover("circles");
  }
  function pickZone(z: Zone) {
    setZone(z);
    const s = [...new Set([...zonesSeen, z])];
    setZonesSeen(s);
    if (s.length === 3) discover("zones");
  }
  useEffect(() => discover("equator"), [discover]);
  return (
    <Stage
      caption={
        zone
          ? `${ZONES[zone].name}: ${ZONES[zone].text}`
          : "The equator divides the earth into Northern and Southern Hemispheres. Add the other important parallels, then explore the heat zones. Drag the globe to spin it."
      }
    >
      <div className="relative mx-auto w-full max-w-[340px] p-3">
        <Globe size={320} parallels={LINES.filter((l) => shown.includes(l.lat)).map((l) => ({ lat: l.lat, color: l.color }))}>
          {(project) =>
            zone
              ? [<clipPath key="clip" id="zoneClip"><circle cx="160" cy="160" r="154" /></clipPath>, ...ZONES[zone].bands.map(([a, b], i) => {
                  const top = project(0, Math.max(a, b)).y;
                  const bot = project(0, Math.min(a, b)).y;
                  return <rect key={i} x="6" y={top} width="308" height={bot - top} fill={ZONES[zone].color} opacity=".28" pointerEvents="none" clipPath="url(#zoneClip)" />;
                })]
              : null
          }
        </Globe>
      </div>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {LINES.slice(1).map((l) => (
            <Btn key={l.lat} on={shown.includes(l.lat)} onClick={() => toggle(l.lat)}>
              {l.name}
            </Btn>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(ZONES) as Zone[]).map((z) => (
            <Btn key={z} on={zone === z} onClick={() => pickZone(z)}>
              {z === "torrid" ? "🔥" : z === "temperate" ? "🌤" : "❄️"} {ZONES[z].name}
            </Btn>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* Stop 2 · the grid — find a place */
const TARGETS = [
  { id: "greenwich", name: "Greenwich (Prime Meridian)", lat: 51.5, lon: 0, disc: "prime" },
  { id: "dhubri", name: "Dhubri, Assam", lat: 26, lon: 90, disc: "dhubri" },
  { id: "belo", name: "Belo Horizonte, Brazil", lat: -20, lon: -44, disc: "south" },
];
function GridFinder({ discover }: SimProps) {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [ti, setTi] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const t = TARGETS[ti];
  const hit = Math.abs(lat - t.lat) <= 2 && Math.abs(lon - t.lon) <= 3;
  useEffect(() => {
    if (!hit || found.includes(t.id)) return;
    setFound((f) => [...f, t.id]);
    discover(t.disc);
  }, [hit, t, found, discover]);
  const W = 520;
  const H = 260;
  const p = flat(lon, lat, W, H);
  const fmt = (v: number, pos: string, neg: string) => (v === 0 ? "0°" : `${Math.abs(v)}° ${v > 0 ? pos : neg}`);
  return (
    <Stage caption={hit ? `Found it! ${t.name} is at ${fmt(t.lat, "N", "S")}, ${fmt(t.lon, "E", "W")}. Where a parallel and a meridian cross, there is exactly one place.` : `Move the crosshair to ${t.name}: ${fmt(t.lat, "N", "S")} latitude, ${fmt(t.lon, "E", "W")} longitude.`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full select-none">
        <rect width={W} height={H} fill="#1f6fa8" />
        {Object.entries(CONTINENTS).map(([k, c]) => (
          <path key={k} d={flatPath(c.pts, W, H)} fill={c.color} opacity=".85" />
        ))}
        {Array.from({ length: 13 }, (_, i) => -180 + i * 30).map((lo) => (
          <line key={lo} x1={flat(lo, 0, W, H).x} y1="0" x2={flat(lo, 0, W, H).x} y2={H} stroke="#fff" strokeOpacity={lo === 0 ? 0.9 : 0.25} strokeWidth={lo === 0 ? 2 : 1} />
        ))}
        {Array.from({ length: 7 }, (_, i) => -90 + i * 30).map((la) => (
          <line key={la} x1="0" y1={flat(0, la, W, H).y} x2={W} y2={flat(0, la, W, H).y} stroke="#fff" strokeOpacity={la === 0 ? 0.9 : 0.25} strokeWidth={la === 0 ? 2 : 1} />
        ))}
        <line x1={p.x} y1="0" x2={p.x} y2={H} stroke="#ffd257" strokeWidth="2" />
        <line x1="0" y1={p.y} x2={W} y2={p.y} stroke="#ffd257" strokeWidth="2" />
        <circle cx={p.x} cy={p.y} r={hit ? 9 : 5} fill={hit ? "#1fb88a" : "#ffd257"} stroke="#fff" strokeWidth="2" />
        {found.map((id) => {
          const f = TARGETS.find((x) => x.id === id)!;
          const q = flat(f.lon, f.lat, W, H);
          return <circle key={id} cx={q.x} cy={q.y} r="4" fill="#1fb88a" stroke="#fff" />;
        })}
        <text x={W - 6} y={H - 6} fontSize="10" fontWeight="800" fill="#ffffffaa" textAnchor="end">Sketch map · not to scale</text>
      </svg>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="w-24 shrink-0">Latitude</span>
          <input type="range" min={-90} max={90} value={lat} onChange={(e) => setLat(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Latitude" />
          <span className="w-14 text-right">{fmt(lat, "N", "S")}</span>
        </label>
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="w-24 shrink-0">Longitude</span>
          <input type="range" min={-180} max={180} value={lon} onChange={(e) => setLon(+e.target.value)} className="w-full accent-[#ffd257]" aria-label="Longitude" />
          <span className="w-14 text-right">{fmt(lon, "E", "W")}</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {TARGETS.map((x, i) => (
            <Btn key={x.id} on={i === ti} onClick={() => setTi(i)}>
              {found.includes(x.id) ? "✓ " : ""}
              {x.name.split(",")[0].split(" (")[0]}
            </Btn>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* Stop 3 · longitude and time */
function TimeCalc({ discover }: SimProps) {
  const [lon, setLon] = useState(0);
  const minutes = Math.round(lon * 4); // 1° = 4 minutes, east is ahead
  const clock = 12 * 60 + minutes;
  const hh = (((Math.floor(clock / 60) % 24) + 24) % 24);
  const mm = ((clock % 60) + 60) % 60;
  const label = `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${hh < 12 ? "a.m." : "p.m."}`;
  useEffect(() => {
    if (Math.abs(lon) >= 15) discover("hour");
    if (lon === 82.5) discover("ist");
    if (Math.abs(lon) === 180) discover("midnight");
  }, [lon, discover]);
  const handA = (mm / 60) * 360;
  const handB = ((hh % 12) / 12) * 360 + (mm / 60) * 30;
  return (
    <Stage
      caption={
        lon === 82.5
          ? "82½° E is India's Standard Meridian. Its local time is Indian Standard Time — 5 hours 30 minutes ahead of Greenwich."
          : Math.abs(lon) === 180
            ? "At 180°, it is midnight when it is noon at Greenwich."
            : `It's 12 noon at Greenwich. The earth turns 360° in about 24 hours: 15° an hour, 1° every 4 minutes. At ${Math.abs(lon)}° ${lon >= 0 ? "E" : "W"}, local time is ${Math.abs(minutes)} minutes ${minutes >= 0 ? "ahead" : "behind"}.`
      }
    >
      <div className="grid items-center gap-4 p-4 sm:grid-cols-[1fr_180px]">
        <Globe size={260} lon0={lon} draggable={false} meridians={[{ lon: 0, color: "#ffd257" }, { lon, color: "#ff8a5c" }]} night={0} grid />
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 120 120" className="h-32 w-32">
            <circle cx="60" cy="60" r="54" fill="#f4efe3" stroke="#c8b98f" strokeWidth="5" />
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1="60" y1="12" x2="60" y2="20" stroke="#5d5848" strokeWidth="3" transform={`rotate(${i * 30} 60 60)`} />
            ))}
            <line x1="60" y1="60" x2="60" y2="30" stroke="#2b2a30" strokeWidth="5" strokeLinecap="round" transform={`rotate(${handB} 60 60)`} />
            <line x1="60" y1="60" x2="60" y2="18" stroke="#c4552b" strokeWidth="3" strokeLinecap="round" transform={`rotate(${handA} 60 60)`} />
            <circle cx="60" cy="60" r="4" fill="#2b2a30" />
          </svg>
          <Readout label={`Local time at ${Math.abs(lon)}° ${lon >= 0 ? "E" : "W"}`} value={label} color="#ffd257" />
        </div>
      </div>
      <div className="grid gap-2 border-t border-white/10 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-extrabold">
          <span className="shrink-0">Longitude</span>
          <input type="range" min={-180} max={180} step={7.5} value={lon} onChange={(e) => setLon(+e.target.value)} className="w-full accent-[#ff8a5c]" aria-label="Longitude for time" />
        </label>
        <div className="flex flex-wrap gap-1.5">
          <Btn onClick={() => setLon(0)}>Greenwich 0°</Btn>
          <Btn onClick={() => setLon(82.5)}>🧭 82½° E</Btn>
          <Btn onClick={() => setLon(180)}>180°</Btn>
        </div>
      </div>
    </Stage>
  );
}

const chapter: Chapter = {
  id: "gglobe",
  subject: "Geography",
  n: 2,
  title: "Globe: Latitudes and Longitudes",
  pages: "10–17",
  icon: "🌐",
  theme: { grad: "linear-gradient(135deg,#062a3f 0%,#0f6b8f 55%,#7fd0a0 130%)", accent: "#0f6b8f", soft: "#dcf0f6", ink: "#0a4a63" },
  opening: "How do you tell someone exactly where a place is on a round earth? You need some lines to help — but the real earth has none drawn on it!",
  stops: [
    {
      id: "lat",
      icon: "🌡",
      title: "Latitudes and heat zones",
      pages: "10–12",
      wonder: {
        q: "Why are places near the poles so much colder than places near the equator?",
        options: [
          { id: "far", label: "The poles are farther from the sun" },
          { id: "slant", label: "The sun's rays fall more slanting there, spreading the heat" },
          { id: "wind", label: "Only because of wind" },
        ],
        answer: "slant",
        reveal: "The sun's rays fall more and more slanting towards the poles, so the same light spreads over a bigger area and heats it less — like a torch shone at a slant.",
      },
      explore: { activity: "Figure 2.3", title: "Lines and zones on the globe", how: "Spin the globe, add the important parallels and explore the heat zones.", Sim: LatitudeGlobe },
      discoveries: [
        { id: "equator", text: "The equator (0°) divides the earth into two hemispheres" },
        { id: "tropics", text: "The Tropics are at 23½° N and 23½° S" },
        { id: "circles", text: "The Arctic and Antarctic Circles are at 66½° N and S" },
        { id: "zones", text: "Three heat zones: Torrid, Temperate and Frigid" },
      ],
      understand: [
        { title: "The globe", body: "A globe is a true model of the earth. The earth is slightly flattened at the poles. The axis is an imaginary line; the real earth has no needle!" },
        { title: "Parallels of latitude", body: "Circles parallel to the equator, measured in degrees. The equator is 0°; the poles are 90° N and 90° S. The parallels get smaller away from the equator." },
        { title: "Same latitude, two places", body: "Chandrapur in Maharashtra is at 20° N and Belo Horizonte in Brazil at 20° S — the same distance from the equator, on opposite sides." },
      ],
      check: [
        { id: "gg1", kind: "mcq", q: "The Tropic of Capricorn is located at…", options: ["23½° S", "66½° N", "0°"], answer: 0, why: "Capricorn is in the Southern Hemisphere at 23½°." },
        { id: "gg2", kind: "mcq", q: "Which zone gets the most heat?", options: ["Torrid", "Temperate", "Frigid"], answer: 0, why: "The mid-day sun is overhead at least once a year there." },
      ],
      connect: [
        { icon: "🔦", title: "Torch test", body: "Shine a torch straight down, then at a slant — the slanted light is weaker and spread out." },
        { icon: "🥔", title: "Potato globe", body: "Push a knitting needle through a potato to make a globe with an axis." },
        { icon: "⭐", title: "Pole Star", body: "Measuring the angle of the Pole Star tells you your latitude." },
      ],
    },
    {
      id: "grid",
      icon: "🎯",
      title: "Longitudes and the grid",
      pages: "12–13",
      wonder: {
        q: "Two towns are both at 20° S. How can you tell exactly where each one is?",
        options: [
          { id: "long", label: "Find how far east or west they are — their longitude" },
          { id: "size", label: "By their size" },
          { id: "cant", label: "You can't" },
        ],
        answer: "long",
        reveal: "By their longitude: how many degrees east or west of the Prime Meridian they are. Latitude plus longitude pinpoints any place.",
      },
      explore: { activity: "Figure 2.6", title: "Find the place", how: "Use the two sliders to put the crosshair on each place.", Sim: GridFinder },
      discoveries: [
        { id: "prime", text: "The Prime Meridian (0°) passes through Greenwich" },
        { id: "dhubri", text: "Dhubri in Assam is at 26° N, 90° E" },
        { id: "south", text: "South and West places have S and W in their location" },
      ],
      understand: [
        { title: "Meridians of longitude", body: "Lines from the North Pole to the South Pole. Unlike parallels, all meridians are equal in length. They meet at the poles." },
        { title: "The Prime Meridian", body: "Countries agreed to start counting from the meridian through Greenwich, where the British Royal Observatory is. From it we count 180° east and 180° west." },
        { title: "Two more hemispheres", body: "The Prime Meridian and the 180° meridian divide the earth into the Eastern and Western Hemispheres." },
        { title: "The grid", body: "The network of parallels and meridians is a grid. Where they cross, we can locate any point." },
      ],
      check: [{ id: "gg3", kind: "tf", q: "All meridians of longitude are of equal length.", answer: true, why: "They all run from pole to pole." }],
      connect: [
        { icon: "📱", title: "GPS", body: "Phone maps use latitude and longitude to show where you are." },
        { icon: "🎲", title: "Grid game", body: "Draw a grid, label rows with letters and columns with numbers, and locate dots." },
        { icon: "🏛", title: "Greenwich", body: "The Royal Observatory at Greenwich is in London." },
      ],
    },
    {
      id: "time",
      icon: "⏰",
      title: "Longitude and time",
      pages: "15–16",
      wonder: {
        q: "When it's noon at Greenwich, what time is it at 15° east?",
        options: [
          { id: "11", label: "11 a.m." },
          { id: "12", label: "12 noon" },
          { id: "1", label: "1 p.m." },
        ],
        answer: "1",
        reveal: "1 p.m.! The earth turns 15° an hour from west to east, so places to the east are ahead of Greenwich.",
      },
      explore: { activity: "Longitude and time", title: "Time travel by longitude", how: "Slide along the longitudes and watch the local time change.", Sim: TimeCalc },
      discoveries: [
        { id: "hour", text: "Every 15° of longitude changes local time by 1 hour" },
        { id: "ist", text: "India's Standard Meridian is 82½° E: IST is 5 h 30 min ahead of Greenwich" },
        { id: "midnight", text: "At 180°, it's midnight when it's noon at Greenwich" },
      ],
      understand: [
        { title: "Local time", body: "When the sun is highest in the sky, it's mid-day. All places on the same meridian have the same local time." },
        { title: "Why standard time?", body: "Local times differ from meridian to meridian — between Dwarka in Gujarat and Dibrugarh in Assam there's a difference of about 1 hour 45 minutes. A single standard time keeps train timetables simple." },
        { title: "Time zones", body: "Some large countries have more than one standard time. Russia has several time zones." },
      ],
      check: [
        { id: "gg4", kind: "mcq", q: "The Standard Meridian of India is…", options: ["82½° E", "0°", "23½° N"], answer: 0, why: "Its local time is Indian Standard Time." },
        { id: "gg5", kind: "mcq", q: "How long does the earth take to turn through 1° of longitude?", options: ["4 minutes", "1 hour", "15 minutes"], answer: 0, why: "360° in about 24 hours = 1° every 4 minutes." },
      ],
      connect: [
        { icon: "✈️", title: "Jet lag", body: "Flying east or west quickly across time zones can make you feel tired." },
        { icon: "📞", title: "Calling abroad", body: "Calling family in another country? Check their local time first!" },
        { icon: "🌅", title: "Earlier sunrise", body: "The sun rises earlier in Arunachal Pradesh than in Gujarat." },
      ],
    },
  ],
  learnt: [
    "A globe is a true model of the earth. The equator divides it into Northern and Southern Hemispheres.",
    "Important parallels: the Tropics (23½° N and S) and the Arctic and Antarctic Circles (66½° N and S).",
    "Heat zones: Torrid, Temperate and Frigid.",
    "Meridians run pole to pole; the Prime Meridian (0°) passes through Greenwich.",
    "Local time changes by 4 minutes per degree of longitude. IST is the time at 82½° E.",
  ],
  keywords: ["Globe", "Axis", "Equator", "Latitude", "Longitude", "Prime Meridian", "Hemisphere", "Heat zones", "Local time", "Standard time"],
};

export default chapter;
