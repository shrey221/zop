// Building blocks for Civics chapters: simple illustrated people, and a lab for comparing lives.
import { ReactNode, useRef, useState } from "react";
import { Stage } from "../science/ui";

/* A friendly person drawn in SVG. (x, y) is where the feet stand. */
export function Figure({
  x,
  y,
  s = 1,
  shirt = "#ff8a5b",
  skin = "#c98a5e",
  hair = "#2b1a12",
  long = false,
  child = false,
  wave = false,
}: {
  x: number;
  y: number;
  s?: number;
  shirt?: string;
  skin?: string;
  hair?: string;
  long?: boolean;
  child?: boolean;
  wave?: boolean;
}) {
  const k = s * (child ? 0.78 : 1);
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} pointerEvents="none">
      <ellipse cx="0" cy="0" rx="13" ry="3.5" fill="#000" opacity=".18" />
      <rect x="-7" y="-20" width="5" height="20" rx="2.5" fill="#3b3550" />
      <rect x="2" y="-20" width="5" height="20" rx="2.5" fill="#3b3550" />
      <path d="M-11 -18 Q-12 -44 0 -45 Q12 -44 11 -18 Z" fill={shirt} />
      <path d={wave ? "M10 -40 L20 -58" : "M10 -40 L14 -22"} stroke={skin} strokeWidth="5" strokeLinecap="round" />
      <path d="M-10 -40 L-14 -22" stroke={skin} strokeWidth="5" strokeLinecap="round" />
      {long && <path d="M-10 -56 Q-12 -40 -6 -38 L6 -38 Q12 -40 10 -56 Z" fill={hair} />}
      <circle cx="0" cy="-55" r="9.5" fill={skin} />
      <path d="M-9.5 -56 Q-9 -67 0 -66 Q9 -67 9.5 -56 Q5 -61 -9.5 -56 Z" fill={hair} />
    </g>
  );
}

/* A simple building with a roof, an icon and a label underneath. */
export function Bldg({ x, y, w, h, color, icon, label, roof = "#8a3b2b" }: { x: number; y: number; w: number; h: number; color: string; icon: string; label: string; roof?: string }) {
  return (
    <g pointerEvents="none">
      <path d={`M${x - 6} ${y} L${x + w / 2} ${y - 18} L${x + w + 6} ${y} Z`} fill={roof} />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={color} />
      <rect x={x + w / 2 - 7} y={y + h - 18} width="14" height="18" fill="#00000030" />
      <text x={x + w / 2} y={y + h / 2 + 2} fontSize="18" textAnchor="middle">
        {icon}
      </text>
      <text x={x + w / 2} y={y + h + 13} fontSize="10" fontWeight="900" fill="#1d2b1a" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/* CompareLab: tap a person, then a question, to fill a comparison table. */
export type CompareCell = { short: string; long: string };

export function CompareLab({
  people,
  rows,
  cells,
  rules,
  discover,
  intro,
  art,
}: {
  people: { id: string; name: string; icon: string; tag: string }[];
  rows: { id: string; label: string; icon: string }[];
  cells: Record<string, Record<string, CompareCell>>;
  rules: { id: string; need: [string, string][] }[];
  discover: (id: string) => void;
  intro: string;
  art?: (person: string) => ReactNode;
}) {
  const [who, setWho] = useState(people[0].id);
  const [open, setOpen] = useState<string[]>([]);
  const [last, setLast] = useState<string | null>(null);
  const key = (p: string, r: string) => `${p}:${r}`;

  const opened = useRef<string[]>([]); // the latest list, even when taps come faster than renders
  function reveal(r: string) {
    const o = [...new Set([...opened.current, key(who, r)])];
    opened.current = o;
    setOpen(o);
    setLast(key(who, r));
    rules.forEach((rule) => rule.need.every(([p, rr]) => o.includes(key(p, rr))) && discover(rule.id));
  }
  const [lp, lr] = last ? last.split(":") : [];
  const person = people.find((p) => p.id === who)!;

  return (
    <Stage
      caption={
        last ? (
          <span>
            <b className="text-[#ffd257]">{people.find((p) => p.id === lp)!.name}:</b> {cells[lp][lr].long}
          </span>
        ) : (
          intro
        )
      }
    >
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-4">
        {people.map((p) => (
          <button
            key={p.id}
            onClick={() => setWho(p.id)}
            className={`press flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-left ring-1 ${who === p.id ? "bg-white text-ink ring-white" : "bg-white/5 ring-white/10"}`}
          >
            <span className="text-2xl">{p.icon}</span>
            <span>
              <span className="block text-sm font-extrabold leading-tight">{p.name}</span>
              <span className={`block text-[11px] font-bold ${who === p.id ? "text-ink-mute" : "text-white/50"}`}>{p.tag}</span>
            </span>
          </button>
        ))}
      </div>
      {art?.(who)}
      <div className="grid grid-cols-2 gap-1.5 px-4 py-3">
        {rows.map((r) => {
          const seen = open.includes(key(who, r.id));
          return (
            <button
              key={r.id}
              aria-label={`${person.name}: ${r.label}`}
              onClick={() => reveal(r.id)}
              className={`press rounded-2xl px-3 py-2 text-left ring-1 ${seen ? "bg-[#1fb88a]/15 ring-[#1fb88a]/60" : "bg-white/5 ring-white/10 hover:bg-white/10"}`}
            >
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-white/50">
                {r.icon} {r.label}
              </span>
              <span className="block text-sm font-extrabold">{seen ? cells[who][r.id].short : "Tap to find out"}</span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-white/10 px-3 py-3">
        <table className="w-full table-fixed text-left text-[11px]">
          <thead className="text-white/50">
            <tr>
              <th className="w-[26%] py-1 font-extrabold"> </th>
              {people.map((p) => (
                <th key={p.id} className="py-1 text-center font-extrabold">
                  {p.icon}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10 align-top">
                <td className="py-1 pr-1 font-bold text-white/60">{r.label}</td>
                {people.map((p) => (
                  <td key={p.id} className={`break-words px-0.5 py-1 text-center font-extrabold ${open.includes(key(p.id, r.id)) ? "text-white" : "text-white/20"}`}>
                    {open.includes(key(p.id, r.id)) ? cells[p.id][r.id].short : "–"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}
