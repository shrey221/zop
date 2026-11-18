// Runs any Science chapter: intro → stops (Wonder, Explore, Observe, Understand, Check, Connect) → challenge → recap.
import { useCallback, useEffect, useRef, useState } from "react";
import { ChapterProgress, chapterPct, loadChapter, saveChapter, totals } from "./progress";
import type { Chapter, Evidence, Stop, Think } from "./types";

const EVIDENCE: Record<Evidence, { label: string; bg: string; fg: string }> = {
  found: { label: "🔎 Found by archaeologists", bg: "#d6efe9", fg: "#155e55" },
  think: { label: "💭 What historians think", bg: "#f8e6c4", fg: "#8a5a10" },
  source: { label: "📜 From an old text or inscription", bg: "#e6e0f8", fg: "#4a3a8a" },
  unknown: { label: "❓ Not known for sure", bg: "#ece6dc", fg: "#5c4f40" },
};
import { QuestionCard } from "./ui";

type View = "intro" | number | "challenge" | "recap";

export default function ChapterPlayer({ chapter: c }: { chapter: Chapter }) {
  const [view, setView] = useState<View>("intro");
  const [p, setP] = useState<ChapterProgress>(() => loadChapter(c.id));
  const [toast, setToast] = useState<{ k: number; text: string } | null>(null);
  const top = useRef<HTMLDivElement>(null);
  const t = totals(c);

  const update = useCallback(
    (fn: (p: ChapterProgress) => ChapterProgress) =>
      setP((prev) => {
        const next = fn(prev);
        next.pct = chapterPct(next, t);
        saveChapter(c.id, next);
        return next;
      }),
    [c.id], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    top.current?.scrollIntoView({ block: "start" });
  }, [view]);

  const go = (v: View) => setView(v);

  return (
    <div ref={top} className="min-h-full bg-cream text-ink">
      {view === "intro" && <Intro c={c} p={p} go={go} />}
      {typeof view === "number" && (
        <StopView
          key={view}
          c={c}
          i={view}
          p={p}
          update={update}
          go={go}
          celebrate={(text) => {
            setToast({ k: Date.now(), text });
          }}
        />
      )}
      {view === "challenge" && <Challenge c={c} p={p} update={update} go={go} />}
      {view === "recap" && <Recap c={c} p={p} go={go} />}
      {toast && <Toast key={toast.k} text={toast.text} color={c.theme.accent} />}
    </div>
  );
}

function Toast({ text, color }: { text: string; color: string }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setOn(false), 2600);
    return () => window.clearTimeout(id);
  }, []);
  if (!on) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="flex animate-up items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-extrabold text-white shadow-lift">
        <span className="grid h-6 w-6 place-items-center rounded-full text-xs" style={{ background: color }}>
          ✦
        </span>
        Discovery: {text}
      </div>
    </div>
  );
}

/* ───────────────────────── Intro ───────────────────────── */

function Intro({ c, p, go }: { c: Chapter; p: ChapterProgress; go: (v: View) => void }) {
  const stopDone = (s: Stop) => s.discoveries.every((d) => p.found.includes(`${s.id}:${d.id}`));
  const nextStop = Math.max(0, c.stops.findIndex((s) => !stopDone(s)));
  const started = p.found.length > 0 || Object.keys(p.answers).length > 0;
  return (
    <div className="animate-fade">
      <header className="relative overflow-hidden px-5 pb-10 pt-8 text-white" style={{ background: c.theme.grad }}>
        <div className="pointer-events-none absolute -right-8 -top-6 select-none text-[150px] leading-none opacity-25 sm:right-10">{c.icon}</div>
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-white/70">
            Class 6 {c.subject ?? "Science"} · Chapter {c.n}
          </p>
          <h1 className="mt-1 font-display text-[40px] font-extrabold leading-[1.02] sm:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-xl rounded-2xl bg-black/20 px-4 py-3 text-[15px] font-semibold leading-snug text-white/90 backdrop-blur">
            <span className="mr-1 text-white/60">Think about it:</span> {c.opening}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={() => go(nextStop)} className="press rounded-full bg-white px-6 py-3 text-base font-extrabold text-ink shadow-lift">
              {started ? "Continue" : "Start exploring"} →
            </button>
            <span className="text-sm font-bold text-white/75">
              {c.stops.length} stops · {totals(c).discoveries} discoveries · NCERT pp. {c.pages}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-6">
        <h2 className="font-display text-2xl font-extrabold">Your journey</h2>
        <ol className="mt-3 grid gap-3">
          {c.stops.map((s, i) => {
            const n = s.discoveries.filter((d) => p.found.includes(`${s.id}:${d.id}`)).length;
            const done = n === s.discoveries.length;
            return (
              <li key={s.id}>
                <button onClick={() => go(i)} className="press flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-card ring-1 ring-black/5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl" style={{ background: c.theme.soft }}>
                    {s.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-ink-mute">Stop {i + 1}</span>
                    <span className="block font-display text-lg font-bold leading-tight">{s.title}</span>
                    <span className="mt-1 flex items-center gap-2">
                      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-cream-deep">
                        <span className="block h-full rounded-full" style={{ width: `${(n / s.discoveries.length) * 100}%`, background: c.theme.accent }} />
                      </span>
                      <span className="text-xs font-bold text-ink-mute">
                        {n}/{s.discoveries.length}
                      </span>
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white" style={{ background: done ? "#1fb88a" : c.theme.accent }}>
                    {done ? "✓" : "→"}
                  </span>
                </button>
              </li>
            );
          })}
          {!!c.challenge?.length && (
            <li>
              <button onClick={() => go("challenge")} className="press flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-card ring-1 ring-black/5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl" style={{ background: c.theme.soft }}>
                  🏁
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-ink-mute">Finale</span>
                  <span className="block font-display text-lg font-bold leading-tight">Chapter challenge</span>
                  <span className="block text-xs font-bold text-ink-mute">
                    {c.challenge.filter((q) => q.id in p.answers).length}/{c.challenge.length} answered · the book's exercises
                  </span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white" style={{ background: c.theme.accent }}>
                  →
                </span>
              </button>
            </li>
          )}
        </ol>
        {p.done && (
          <button onClick={() => go("recap")} className="press mt-4 w-full rounded-2xl bg-ink py-3.5 font-extrabold text-white">
            See your chapter recap
          </button>
        )}
      </main>
    </div>
  );
}

/* ───────────────────────── One stop ───────────────────────── */

const STEPS = [
  { id: "wonder", name: "Wonder", color: "#f5a524" },
  { id: "explore", name: "Explore", color: "#ff6b57" },
  { id: "observe", name: "Observe", color: "#8b5cf6" },
  { id: "understand", name: "Understand", color: "#1fb88a" },
  { id: "check", name: "Check", color: "#2f80ed" },
  { id: "connect", name: "Connect", color: "#e0679b" },
];

type StopProps = {
  c: Chapter;
  i: number;
  p: ChapterProgress;
  update: (fn: (p: ChapterProgress) => ChapterProgress) => void;
  go: (v: View) => void;
  celebrate: (text: string) => void;
};

function StopView({ c, i, p, update, go, celebrate }: StopProps) {
  const s = c.stops[i];
  const found = p.found.filter((f) => f.startsWith(s.id + ":")).map((f) => f.slice(s.id.length + 1));
  const guess = p.guesses[s.id];
  const [peek, setPeek] = useState(false);
  const last = i === c.stops.length - 1;

  const discover = useCallback(
    (id: string) => {
      const d = s.discoveries.find((x) => x.id === id);
      if (!d || found.includes(id)) return;
      celebrate(d.text);
      update((prev) => {
        const k = `${s.id}:${id}`;
        return prev.found.includes(k) ? prev : { ...prev, found: [...prev.found, k] };
      });
    },
    [s, found, update, celebrate],
  );

  const Sim = s.explore.Sim;
  const more = s.more ?? [];
  // discoveries tagged with an activity are listed under it; otherwise one list after all activities
  const grouped = s.discoveries.some((d) => d.at !== undefined);
  const revealed = !!guess && (found.length > 0 || peek);
  const toChallenge = last && !!c.challenge?.length;

  return (
    <div className="animate-fade pb-16">
      {/* stop header + stop switcher */}
      <header className="sticky top-0 z-20 border-b border-black/5 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2.5">
          <button onClick={() => go("intro")} className="press rounded-full bg-white px-3 py-1.5 text-xs font-extrabold shadow-card ring-1 ring-black/5">
            Ch. {c.n}
          </button>
          <div className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
            {c.stops.map((x, j) => (
              <button
                key={x.id}
                onClick={() => go(j)}
                aria-current={j === i ? "step" : undefined}
                aria-label={`Stop ${j + 1}: ${x.title}`}
                className={`press grid h-8 min-w-8 shrink-0 place-items-center rounded-full px-2 text-sm font-extrabold transition ${j === i ? "text-white" : "bg-white text-ink-soft ring-1 ring-black/5"}`}
                style={j === i ? { background: c.theme.accent } : undefined}
              >
                {x.icon}
              </button>
            ))}
            {!!c.challenge?.length && (
              <button
                onClick={() => go("challenge")}
                aria-label="Chapter challenge"
                className="press grid h-8 min-w-8 shrink-0 place-items-center rounded-full bg-white px-2 text-sm font-extrabold text-ink-soft ring-1 ring-black/5"
              >
                🏁
              </button>
            )}
          </div>
          <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold ring-1 ring-black/5">
            ✦ {found.length}/{s.discoveries.length}
          </span>
        </div>
      </header>

      <div className="px-5 pb-8 pt-6 text-white" style={{ background: c.theme.grad }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-white/70">
            Stop {i + 1} of {c.stops.length} · NCERT pp. {s.pages}
          </p>
          <h1 className="mt-1 flex items-center gap-3 font-display text-[32px] font-extrabold leading-[1.05]">
            <span className="text-4xl">{s.icon}</span>
            {s.title}
          </h1>
          <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto">
            {STEPS.map((st, k) => (
              <button
                key={st.id}
                onClick={() => document.getElementById(`${s.id}-${st.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold text-white/90 backdrop-blur"
              >
                {k + 1}. {st.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-9 px-5 pt-7">
        {/* 1 Wonder */}
        <Section id={`${s.id}-wonder`} n={0} title="What do you think?">
          <p className="font-display text-xl font-bold leading-snug">{s.wonder.q}</p>
          <div className="mt-3 grid gap-2" role="radiogroup" aria-label="Your guess">
            {s.wonder.options.map((o) => (
              <button
                key={o.id}
                role="radio"
                aria-checked={guess === o.id}
                onClick={() => update((prev) => ({ ...prev, guesses: { ...prev.guesses, [s.id]: o.id } }))}
                className={`press rounded-2xl px-4 py-3 text-left text-[15px] font-bold ring-1 transition ${guess === o.id ? "bg-white ring-2" : "bg-white/60 ring-black/5 hover:bg-white"}`}
                style={guess === o.id ? { boxShadow: `inset 0 0 0 2px ${c.theme.accent}` } : undefined}
              >
                {guess === o.id ? "👉 " : ""}
                {o.label}
              </button>
            ))}
          </div>
          {guess && <p className="mt-3 animate-rise text-sm font-bold text-ink-mute">Nice guess! Now test it yourself in the lab below. ↓</p>}
        </Section>

        {/* 2 Explore */}
        <Section id={`${s.id}-explore`} n={1} title={s.explore.title} tag={`${more.length ? `Activity 1 of ${more.length + 1} · ` : ""}Based on ${s.explore.activity}`}>
          <p className="mb-3 text-[15px] font-semibold text-ink-soft">{s.explore.how}</p>
          <Sim found={found} discover={discover} />
          {grouped && <Finds list={s.discoveries.filter((d) => !d.at)} found={found} />}
          {more.map((a, k) => (
            <div key={a.title} className="mt-7">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white" style={{ background: STEPS[1].color }}>
                  Activity {k + 2} of {more.length + 1}
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-ink-mute ring-1 ring-black/5">Based on {a.activity}</span>
              </div>
              <h3 className="font-display text-xl font-extrabold leading-tight">{a.title}</h3>
              <p className="mb-3 mt-1 text-[15px] font-semibold text-ink-soft">{a.how}</p>
              <a.Sim found={found} discover={discover} />
              {grouped && <Finds list={s.discoveries.filter((d) => d.at === k + 1)} found={found} />}
            </div>
          ))}
          {!grouped && <Finds list={s.discoveries} found={found} />}
        </Section>

        {/* 3 Observe */}
        <Section id={`${s.id}-observe`} n={2} title="What did you notice?">
          {!guess ? (
            // skipped the guess at the top? ask it again here instead of sending them back up
            <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5">
              <p className="text-sm font-bold text-ink-mute">First, quick guess:</p>
              <p className="mt-1 text-[15px] font-extrabold leading-snug">{s.wonder.q}</p>
              <div className="mt-3 grid gap-2" role="radiogroup" aria-label="Your guess, again">
                {s.wonder.options.map((o) => (
                  <button
                    key={o.id}
                    role="radio"
                    aria-checked={false}
                    onClick={() => update((prev) => ({ ...prev, guesses: { ...prev.guesses, [s.id]: o.id } }))}
                    className="press rounded-2xl bg-white px-4 py-3 text-left text-[15px] font-bold ring-1 ring-black/5"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ) : revealed ? (
            <div className="animate-rise rounded-3xl bg-white p-4 shadow-card ring-1 ring-black/5">
              <p className="text-sm font-bold text-ink-mute">
                You guessed: <span className="text-ink">{s.wonder.options.find((o) => o.id === guess)?.label}</span>
              </p>
              <p className={`mt-2 text-lg font-extrabold ${guess === s.wonder.answer ? "text-[#0f8a63]" : "text-his"}`}>
                {guess === s.wonder.answer ? "🎯 Spot on!" : "🤔 Surprise! The lab shows something different."}
              </p>
              <p className="mt-1 text-[15px] font-semibold leading-snug text-ink-soft">{s.wonder.reveal}</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5">
              <p className="text-sm font-bold text-ink-mute">Try the experiment above to find out if your guess was right.</p>
              <button onClick={() => setPeek(true)} className="mt-2 text-sm font-extrabold underline underline-offset-2">
                Just show me the answer
              </button>
            </div>
          )}
        </Section>

        {/* 4 Understand */}
        <Section id={`${s.id}-understand`} n={3} title="The big idea">
          <div className="grid gap-3 sm:grid-cols-2">
            {s.understand.map((u, k) => {
              const key = `${s.id}:${k + 1}`;
              const open = !u.think || p.thought.includes(key);
              return (
                <div key={u.title} className="rounded-3xl bg-white p-4 shadow-card ring-1 ring-black/5">
                  <span className="grid h-8 w-8 place-items-center rounded-xl text-sm font-extrabold text-white" style={{ background: c.theme.accent }}>
                    {k + 1}
                  </span>
                  {open ? (
                    <>
                      {u.tag && (
                        <span className="ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[10px] font-extrabold" style={{ background: EVIDENCE[u.tag].bg, color: EVIDENCE[u.tag].fg }}>
                          {EVIDENCE[u.tag].label}
                        </span>
                      )}
                      <h3 className="mt-2 font-display text-lg font-bold leading-tight">{u.title}</h3>
                      <p className="mt-1 text-[15px] font-semibold leading-snug text-ink-soft">{u.body}</p>
                    </>
                  ) : (
                    <ThinkFirst think={u.think!} accent={c.theme.accent} onOpen={() => update((prev) => (prev.thought.includes(key) ? prev : { ...prev, thought: [...prev.thought, key] }))} />
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* 5 Check */}
        <Section id={`${s.id}-check`} n={4} title="Quick check">
          <div className="grid gap-3">
            {s.check.map((q, k) => (
              <QuestionCard
                key={q.id}
                q={q}
                n={k + 1}
                accent={c.theme.accent}
                result={p.answers[q.id]}
                onAnswer={(ok) => update((prev) => (q.id in prev.answers ? prev : { ...prev, answers: { ...prev.answers, [q.id]: ok } }))}
              />
            ))}
          </div>
        </Section>

        {/* 6 Connect */}
        <Section id={`${s.id}-connect`} n={5} title="In real life">
          <div className="grid gap-3 sm:grid-cols-3">
            {s.connect.map((x) => (
              <div key={x.title} className="rounded-3xl p-4 ring-1 ring-black/5" style={{ background: c.theme.soft }}>
                <span className="text-3xl">{x.icon}</span>
                <h3 className="mt-1 font-display text-base font-bold leading-tight" style={{ color: c.theme.ink }}>
                  {x.title}
                </h3>
                <p className="mt-1 text-sm font-semibold leading-snug text-ink-soft">{x.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <button
          onClick={() => {
            if (last && !toChallenge) update((prev) => ({ ...prev, done: true }));
            go(toChallenge ? "challenge" : last ? "recap" : i + 1);
          }}
          className="press flex w-full items-center justify-between rounded-3xl p-5 text-left text-white shadow-lift"
          style={{ background: c.theme.grad }}
        >
          <span>
            <span className="block text-xs font-extrabold uppercase tracking-wider text-white/70">{toChallenge ? "Next · Finale" : last ? "You made it" : `Next · Stop ${i + 2}`}</span>
            <span className="block font-display text-xl font-extrabold">
              {toChallenge ? "🏁 Chapter challenge" : last ? "Finish the chapter 🎉" : `${c.stops[i + 1].icon} ${c.stops[i + 1].title}`}
            </span>
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-ink">→</span>
        </button>
      </main>
    </div>
  );
}

function Section({ id, n, title, tag, children }: { id: string; n: number; title: string; tag?: string; children: React.ReactNode }) {
  const st = STEPS[n];
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white" style={{ background: st.color }}>
          {n + 1} · {st.name}
        </span>
        {tag && <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-ink-mute ring-1 ring-black/5">{tag}</span>}
      </div>
      <h2 className="mb-3 font-display text-2xl font-extrabold leading-tight">{title}</h2>
      {children}
    </section>
  );
}

// The Understand card stays closed until the student has had a go at its question.
function ThinkFirst({ think, accent, onOpen }: { think: Think; accent: string; onOpen: () => void }) {
  const [wrong, setWrong] = useState<number[]>([]);
  return (
    <div className="mt-2">
      <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: accent }}>
        🤔 Think first
      </p>
      <p className="mt-1 font-display text-lg font-bold leading-snug">{think.q}</p>
      <div className="mt-2 grid gap-1.5">
        {think.options.map((o, i) => (
          <button
            key={o}
            disabled={wrong.includes(i)}
            onClick={() => (i === think.answer ? onOpen() : setWrong((w) => [...w, i]))}
            className={`press rounded-2xl px-3.5 py-2.5 text-left text-sm font-bold ring-1 transition ${wrong.includes(i) ? "bg-his/10 text-his ring-his/40" : "bg-cream/60 ring-black/5 hover:bg-cream"}`}
          >
            {wrong.includes(i) ? "✗ " : ""}
            {o}
          </button>
        ))}
      </div>
      {wrong.length > 0 && <p className="mt-2 animate-rise text-xs font-bold text-his">Not quite. Try another!</p>}
      <button onClick={onOpen} className="mt-2 text-xs font-extrabold text-ink-mute underline underline-offset-2">
        Just show me
      </button>
    </div>
  );
}

/* ───────────────────────── Challenge ───────────────────────── */

function Challenge({ c, p, update, go }: { c: Chapter; p: ChapterProgress; update: StopProps["update"]; go: (v: View) => void }) {
  const qs = c.challenge ?? [];
  const answered = qs.filter((q) => q.id in p.answers).length;
  return (
    <div className="animate-fade pb-16">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2.5">
          <button onClick={() => go("intro")} className="press rounded-full bg-white px-3 py-1.5 text-xs font-extrabold shadow-card ring-1 ring-black/5">
            Ch. {c.n}
          </button>
          <button onClick={() => go(c.stops.length - 1)} className="press rounded-full bg-white px-3 py-1.5 text-xs font-extrabold shadow-card ring-1 ring-black/5">
            ← Last stop
          </button>
          <span className="ml-auto shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold ring-1 ring-black/5">
            {answered}/{qs.length} answered
          </span>
        </div>
      </header>
      <div className="px-5 pb-8 pt-6 text-white" style={{ background: c.theme.grad }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-white/70">Finale · NCERT exercises</p>
          <h1 className="mt-1 flex items-center gap-3 font-display text-[32px] font-extrabold leading-[1.05]">
            <span className="text-4xl">🏁</span>
            Chapter challenge
          </h1>
          <p className="mt-2 max-w-xl text-[15px] font-semibold text-white/85">Every question from the end of the chapter in your book. Use what you discovered!</p>
        </div>
      </div>
      <main className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-3 px-5 pt-7">
        {qs.map((q, k) => (
          <QuestionCard
            key={q.id}
            q={q}
            n={k + 1}
            accent={c.theme.accent}
            result={p.answers[q.id]}
            onAnswer={(ok) => update((prev) => (q.id in prev.answers ? prev : { ...prev, answers: { ...prev.answers, [q.id]: ok } }))}
          />
        ))}
        <button
          onClick={() => {
            update((prev) => ({ ...prev, done: true }));
            go("recap");
          }}
          className="press mt-6 flex w-full items-center justify-between rounded-3xl p-5 text-left text-white shadow-lift"
          style={{ background: c.theme.grad }}
        >
          <span>
            <span className="block text-xs font-extrabold uppercase tracking-wider text-white/70">You made it</span>
            <span className="block font-display text-xl font-extrabold">Finish the chapter 🎉</span>
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-ink">→</span>
        </button>
      </main>
    </div>
  );
}

/* ───────────────────────── Recap ───────────────────────── */

function Recap({ c, p, go }: { c: Chapter; p: ChapterProgress; go: (v: View) => void }) {
  const t = totals(c);
  const correct = Object.values(p.answers).filter(Boolean).length;
  return (
    <div className="animate-fade pb-16">
      <header className="relative overflow-hidden px-5 pb-10 pt-10 text-center text-white" style={{ background: c.theme.grad }}>
        <div className="text-6xl animate-pop">🏆</div>
        <h1 className="mt-2 font-display text-[34px] font-extrabold leading-tight">Chapter {c.n} complete!</h1>
        <p className="font-bold text-white/80">{c.title}</p>
        <div className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-3">
          <div className="rounded-2xl bg-black/20 p-3 backdrop-blur">
            <div className="font-display text-3xl font-extrabold">
              {p.found.length}/{t.discoveries}
            </div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-white/70">Discoveries</div>
          </div>
          <div className="rounded-2xl bg-black/20 p-3 backdrop-blur">
            <div className="font-display text-3xl font-extrabold">
              {correct}/{t.questions}
            </div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-white/70">Questions right</div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 pt-7">
        <h2 className="font-display text-2xl font-extrabold">What you have learnt</h2>
        <ul className="mt-3 grid gap-2">
          {c.learnt.map((l) => (
            <li key={l} className="flex gap-3 rounded-2xl bg-white p-3.5 text-[15px] font-semibold leading-snug shadow-card ring-1 ring-black/5">
              <span style={{ color: c.theme.accent }}>✦</span>
              {l}
            </li>
          ))}
        </ul>
        <h2 className="mt-7 font-display text-2xl font-extrabold">Keywords</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.keywords.map((k) => (
            <span key={k} className="rounded-full px-3.5 py-1.5 text-sm font-extrabold" style={{ background: c.theme.soft, color: c.theme.ink }}>
              {k}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          <button onClick={() => go("intro")} className="press rounded-2xl bg-white py-3.5 font-extrabold ring-1 ring-black/10">
            Back to chapter start
          </button>
          <button onClick={() => go(0)} className="press rounded-2xl py-3.5 font-extrabold text-white" style={{ background: c.theme.accent }}>
            Replay the labs
          </button>
        </div>
      </main>
    </div>
  );
}

/** The discoveries of one activity (or of the whole stop): ✓ when found, a hint of what to try until then. */
function Finds({ list, found }: { list: Chapter["stops"][number]["discoveries"]; found: string[] }) {
  if (!list.length) return null;
  const got = list.filter((d) => found.includes(d.id)).length;
  return (
    <div className="mt-3 rounded-3xl bg-white p-4 shadow-card ring-1 ring-black/5">
      <p className="text-xs font-extrabold uppercase tracking-wider text-ink-mute">
        {got === list.length ? "✨ All found · " : "Discoveries · "}
        {got} of {list.length}
      </p>
      <ul className="mt-2 grid gap-1.5">
        {list.map((d) => {
          const ok = found.includes(d.id);
          return (
            <li key={d.id} className={`flex items-start gap-2 text-sm font-bold ${ok ? "" : "text-ink-mute"}`}>
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] text-white" style={{ background: ok ? "#1fb88a" : "#f0b429" }}>
                {ok ? "✓" : "💡"}
              </span>
              {ok ? d.text : d.hint ?? "Not found yet. Try every button, slider and drag in the activities above."}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
