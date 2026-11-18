// Reusable lab types for Science chapters. A chapter configures these with its own content,
// so most labs are data; chapters add custom simulations where a real model teaches better.
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Btn, Stage } from "./ui";

type Discover = (id: string) => void;

/* ───────────── TestLab: pick a test, try it on items, build a results table ───────────── */

export type Test = { id: string; label: string; icon: string; yes: string; no: string; color: string };
export type TestItem = { id: string; name: string; icon: string; results: Record<string, boolean> };
type TestState = { tested: Record<string, string[]>; item?: TestItem; test: Test; positive?: boolean };

export function TestLab({
  tests,
  items,
  rules,
  discover,
  intro,
  scene,
  explain,
}: {
  tests: Test[];
  items: TestItem[];
  rules: { id: string; when: (s: TestState) => boolean }[];
  discover: Discover;
  intro: string;
  scene?: (s: TestState) => ReactNode;
  explain?: (s: TestState) => string | undefined;
}) {
  const [testId, setTestId] = useState(tests[0].id);
  const [itemId, setItemId] = useState<string | null>(null);
  const [tested, setTested] = useState<Record<string, string[]>>({});
  const test = tests.find((t) => t.id === testId)!;
  const item = items.find((i) => i.id === itemId);
  const positive = item ? item.results[testId] : undefined;
  const state: TestState = { tested, item, test, positive };

  function run(id: string) {
    setItemId(id);
    const next = { ...tested, [testId]: [...new Set([...(tested[testId] ?? []), id])] };
    setTested(next);
    const it = items.find((i) => i.id === id)!;
    const s = { tested: next, item: it, test, positive: it.results[testId] };
    rules.forEach((r) => r.when(s) && discover(r.id));
  }

  const rows = items.filter((i) => tests.some((t) => tested[t.id]?.includes(i.id)));

  return (
    <Stage caption={item ? (explain?.(state) ?? `${item.name}: ${positive ? test.yes : test.no}`) : intro}>
      {scene ? (
        scene(state)
      ) : (
        <svg viewBox="0 0 520 200" className="block h-auto w-full select-none">
          <rect width="520" height="200" fill="#13112b" />
          <ellipse cx="260" cy="150" rx="150" ry="26" fill="#e9edf5" opacity=".9" />
          {item && (
            <g key={item.id + testId} className="animate-pop" style={{ transformOrigin: "260px 120px" }}>
              <circle cx="260" cy="120" r="56" fill={positive ? test.color : "#ffffff10"} opacity={positive ? 0.55 : 1} />
              <text x="260" y="140" fontSize="58" textAnchor="middle">
                {item.icon}
              </text>
            </g>
          )}
          <text x="260" y="34" fontSize="15" fontWeight="900" fill={item ? (positive ? "#ffd257" : "#c9cbe0") : "#9da3c7"} textAnchor="middle">
            {item ? (positive ? `✓ ${test.yes}` : `✗ ${test.no}`) : `${test.icon} ${test.label}`}
          </text>
        </svg>
      )}
      {tests.length > 1 && (
        <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
          {tests.map((t) => (
            <Btn key={t.id} on={t.id === testId} onClick={() => (setTestId(t.id), setItemId(null))}>
              {t.icon} {t.label}
            </Btn>
          ))}
        </div>
      )}
      <div className="border-t border-white/10 px-3 py-3">
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
          {items.map((x) => {
            const done = tested[testId]?.includes(x.id);
            return (
              <button
                key={x.id}
                onClick={() => run(x.id)}
                className={`press flex flex-col items-center rounded-2xl px-1 py-2 text-[11px] font-extrabold leading-tight transition ${
                  itemId === x.id ? "bg-white text-ink" : "bg-white/5 text-white/85 ring-1 ring-white/10 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{x.icon}</span>
                <span className="mt-0.5 text-center">{x.name}</span>
                {done && <span className={`mt-0.5 text-[10px] ${x.results[testId] ? "text-[#ffd257]" : "text-white/40"}`}>{x.results[testId] ? "✓ yes" : "✗ no"}</span>}
              </button>
            );
          })}
        </div>
        {rows.length > 0 && (
          <table className="mt-3 w-full text-left text-xs">
            <thead className="text-white/50">
              <tr>
                <th className="py-1 font-extrabold">Item</th>
                {tests.map((t) => (
                  <th key={t.id} className="py-1 text-center font-extrabold">
                    {t.icon} {t.label.split(" ").slice(-1)[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="py-1 font-bold">
                    {r.icon} {r.name}
                  </td>
                  {tests.map((t) => (
                    <td key={t.id} className={`py-1 text-center font-extrabold ${tested[t.id]?.includes(r.id) ? (r.results[t.id] ? "text-[#ffd257]" : "text-white/45") : "text-white/20"}`}>
                      {tested[t.id]?.includes(r.id) ? (r.results[t.id] ? "✓" : "✗") : "–"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Stage>
  );
}

/* ───────────── SortLab: tap an item, then the group it belongs to ───────────── */

export type SortItem = { id: string; label: string; icon?: string; bin: string; why?: string };

export function SortLab({
  bins,
  items,
  rules,
  discover,
  intro,
}: {
  bins: { id: string; label: string; icon?: string; color: string }[];
  items: SortItem[];
  rules: { id: string; when: (placed: Record<string, string>) => boolean }[];
  discover: Discover;
  intro: string;
}) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [msg, setMsg] = useState(intro);
  const [shake, setShake] = useState<string | null>(null);
  const left = items.filter((i) => !placed[i.id]);

  function drop(bin: string) {
    const it = items.find((i) => i.id === sel);
    if (!it) return setMsg("First tap an item, then tap its group.");
    if (it.bin !== bin) {
      setShake(it.id);
      window.setTimeout(() => setShake(null), 450);
      return setMsg(`Hmm, not ${bins.find((b) => b.id === bin)!.label.toLowerCase()}. Think again about ${it.label.toLowerCase()}.`);
    }
    const next = { ...placed, [it.id]: bin };
    setPlaced(next);
    setSel(null);
    setMsg(it.why ? `${it.label}: ${it.why}` : `${it.label} → ${bins.find((b) => b.id === bin)!.label}. Correct!`);
    rules.forEach((r) => r.when(next) && discover(r.id));
  }

  return (
    <Stage caption={left.length === 0 ? "All sorted! " + msg : msg}>
      <div className="p-4">
        <div className="flex min-h-[44px] flex-wrap gap-2">
          {left.map((i) => (
            <button
              key={i.id}
              onClick={() => setSel(i.id)}
              className={`press rounded-full px-3 py-2 text-sm font-extrabold ring-1 transition ${sel === i.id ? "bg-white text-ink ring-white" : "bg-white/10 ring-white/15 hover:bg-white/15"} ${shake === i.id ? "animate-[shake_.4s]" : ""}`}
            >
              {i.icon && <span className="mr-1">{i.icon}</span>}
              {i.label}
            </button>
          ))}
          {left.length === 0 && <span className="py-2 text-sm font-extrabold text-[#5fe0b4]">✓ Everything is in its group</span>}
        </div>
        <div className={`mt-4 grid gap-2 ${bins.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {bins.map((b) => (
            <button key={b.id} onClick={() => drop(b.id)} className={`min-h-[110px] rounded-2xl border-2 border-dashed p-2.5 text-left transition ${sel ? "bg-white/10" : "bg-white/5"}`} style={{ borderColor: b.color }}>
              <span className="block text-xs font-extrabold uppercase tracking-wide" style={{ color: b.color }}>
                {b.icon} {b.label}
              </span>
              <span className="mt-1.5 flex flex-wrap gap-1">
                {items
                  .filter((i) => placed[i.id] === b.id)
                  .map((i) => (
                    <span key={i.id} className="animate-pop rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-extrabold text-ink">
                      {i.icon} {i.label}
                    </span>
                  ))}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <Btn onClick={() => (setPlaced({}), setSel(null), setMsg(intro))}>↺ Start over</Btn>
      </div>
    </Stage>
  );
}

/* ───────────── ExploreLab: tap glowing dots on a picture ───────────── */

export type Spot = { id: string; label: string; x: number; y: number; text: string };

export function ExploreLab({
  viewBox,
  art,
  spots,
  groups,
  discover,
  intro,
  extra,
}: {
  viewBox: string;
  art: ReactNode;
  spots: Spot[];
  groups: Record<string, string[]>; // discovery id -> spots that must all be seen
  discover: Discover;
  intro: string;
  extra?: ReactNode;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const spot = spots.find((s) => s.id === sel);

  function pick(id: string) {
    setSel(id);
    const s = [...new Set([...seen, id])];
    setSeen(s);
    Object.entries(groups).forEach(([d, need]) => need.every((n) => s.includes(n)) && discover(d));
  }

  return (
    <Stage
      caption={
        spot ? (
          <span>
            <b className="text-[#ffd257]">{spot.label}:</b> {spot.text}
          </span>
        ) : (
          intro
        )
      }
    >
      <svg viewBox={viewBox} className="block h-auto w-full select-none">
        {art}
        {spots.map((p) => (
          <g key={p.id} onClick={() => pick(p.id)} style={{ cursor: "pointer" }} role="button" aria-label={p.label}>
            <circle cx={p.x} cy={p.y} r="17" fill="#ffd257" fillOpacity={sel === p.id ? 0.5 : 0.22} className={seen.includes(p.id) ? "" : "animate-glow"} />
            <circle cx={p.x} cy={p.y} r="7.5" fill={seen.includes(p.id) ? "#1fb88a" : "#ffd257"} stroke="#13112b" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 text-xs font-extrabold text-white/60">
        {seen.length}/{spots.length} parts explored
        {extra}
      </div>
    </Stage>
  );
}

/* ───────────── OrderLab: put the steps in the right order ───────────── */

export function OrderLab({
  steps,
  milestones,
  discover,
  intro,
}: {
  steps: { id: string; label: string; icon: string; detail: string }[];
  milestones: { id: string; at: number }[];
  discover: Discover;
  intro: string;
}) {
  const shuffled = useMemo(() => [...steps].sort((a, b) => ((a.id.charCodeAt(0) * 7 + a.id.length * 13) % 11) - ((b.id.charCodeAt(0) * 7 + b.id.length * 13) % 11)), [steps]);
  const [done, setDone] = useState<string[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [msg, setMsg] = useState(intro);

  function tap(id: string) {
    const next = steps[done.length];
    if (id !== next.id) {
      setShake(id);
      window.setTimeout(() => setShake(null), 450);
      return setMsg("Not yet — what has to happen before that?");
    }
    const d = [...done, id];
    setDone(d);
    setMsg(`${next.icon} ${next.detail}`);
    milestones.forEach((m) => d.length >= m.at && discover(m.id));
  }

  return (
    <Stage caption={done.length === steps.length ? "Complete! " + msg : msg}>
      <div className="grid gap-4 p-4">
        <ol className="grid gap-1.5">
          {steps.map((s, i) => {
            const got = i < done.length;
            return (
              <li key={s.id} className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-extrabold ring-1 transition ${got ? "bg-white/10 ring-white/20" : "ring-white/5 text-white/25"}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${got ? "bg-[#1fb88a] text-white" : "bg-white/5"}`}>{i + 1}</span>
                {got ? (
                  <>
                    <span className="text-lg">{s.icon}</span>
                    {s.label}
                  </>
                ) : (
                  "?"
                )}
              </li>
            );
          })}
        </ol>
        {done.length < steps.length && (
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-white/50">Tap what comes next</p>
            <div className="flex flex-wrap gap-2">
              {shuffled
                .filter((s) => !done.includes(s.id))
                .map((s) => (
                  <button key={s.id} onClick={() => tap(s.id)} className={`press rounded-full bg-white/10 px-3 py-2 text-sm font-extrabold ring-1 ring-white/15 hover:bg-white/15 ${shake === s.id ? "animate-[shake_.4s]" : ""}`}>
                    {s.icon} {s.label}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <Btn onClick={() => (setDone([]), setMsg(intro))}>↺ Start over</Btn>
      </div>
    </Stage>
  );
}

/* ───────────── PickLab: a set of small puzzles, each with one right choice ───────────── */

export type Case = { id: string; icon: string; prompt: string; options: string[]; answer: number; explain: string; disc?: string };

export function PickLab({ cases, discover, intro, art }: { cases: Case[]; discover: Discover; intro: string; art?: (c: Case, solved: boolean) => ReactNode }) {
  const [cur, setCur] = useState(0);
  const [solved, setSolved] = useState<string[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const c = cases[cur];
  const isSolved = solved.includes(c.id);

  useEffect(() => setWrong(null), [cur]);

  return (
    <Stage caption={isSolved ? c.explain : wrong !== null ? "Not that one — think about what makes these parts different." : intro}>
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3">
        {cases.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setCur(i)}
            className={`press flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-extrabold ring-1 ${i === cur ? "bg-white text-ink ring-white" : "bg-white/5 ring-white/10"}`}
          >
            {x.icon}
            {solved.includes(x.id) && <span className="text-[#1fb88a]">✓</span>}
          </button>
        ))}
      </div>
      {art?.(c, isSolved)}
      <div className="p-4">
        <p className="font-display text-xl font-bold leading-snug">
          <span className="mr-2 text-3xl">{c.icon}</span>
          {c.prompt}
        </p>
        <div className="mt-3 grid gap-2">
          {c.options.map((o, i) => {
            const right = isSolved && i === c.answer;
            return (
              <button
                key={o}
                disabled={isSolved}
                onClick={() => {
                  if (i !== c.answer) return setWrong(i);
                  setSolved((s) => [...new Set([...s, c.id])]);
                  if (c.disc) discover(c.disc);
                }}
                className={`press rounded-2xl px-4 py-3 text-left text-[15px] font-bold ring-1 transition ${
                  right ? "bg-[#1fb88a]/20 ring-[#1fb88a]" : wrong === i ? "animate-[shake_.4s] bg-[#c4552b]/20 ring-[#c4552b]" : "bg-white/5 ring-white/10 hover:bg-white/10"
                }`}
              >
                {right ? "✓ " : ""}
                {o}
              </button>
            );
          })}
        </div>
        {isSolved && cur < cases.length - 1 && (
          <div className="mt-3">
            <Btn on onClick={() => setCur(cur + 1)}>
              Next puzzle →
            </Btn>
          </div>
        )}
      </div>
    </Stage>
  );
}
