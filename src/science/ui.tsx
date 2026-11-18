// Building blocks shared by every Science chapter: stage frame, quiz, sort game, drag helpers.
import { ReactNode, useEffect, useRef, useState } from "react";
import type { Question } from "./types";

export function svgPoint(svg: SVGSVGElement, e: { clientX: number; clientY: number }) {
  const p = svg.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  const m = svg.getScreenCTM();
  return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 };
}

// Drag something inside an SVG with mouse or finger. Returns handlers for the draggable element.
export function useSvgDrag(onMove: (x: number, y: number) => void, onEnd?: () => void) {
  const dragging = useRef(false);
  return {
    onPointerDown(e: React.PointerEvent<SVGElement>) {
      dragging.current = true;
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
      const svg = (e.currentTarget as SVGElement).ownerSVGElement!;
      const pt = svgPoint(svg, e);
      onMove(pt.x, pt.y);
    },
    onPointerMove(e: React.PointerEvent<SVGElement>) {
      if (!dragging.current) return;
      const svg = (e.currentTarget as SVGElement).ownerSVGElement!;
      const pt = svgPoint(svg, e);
      onMove(pt.x, pt.y);
    },
    onPointerUp() {
      if (!dragging.current) return;
      dragging.current = false;
      onEnd?.();
    },
    style: { touchAction: "none", cursor: "grab" } as React.CSSProperties,
  };
}

export function Stage({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[26px] bg-[#13112b] text-white shadow-lift ring-1 ring-black/10">
      {children}
      {caption && <div className="border-t border-white/10 px-4 py-3 text-sm font-semibold text-white/75">{caption}</div>}
    </div>
  );
}

export function Btn({ children, onClick, on, className = "" }: { children: ReactNode; onClick: () => void; on?: boolean; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`press rounded-full px-4 py-2 text-sm font-extrabold transition ${on ? "bg-white text-ink" : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"} ${className}`}
    >
      {children}
    </button>
  );
}

export function Readout({ label, value, color = "#ffd257" }: { label: string; value: ReactNode; color?: string }) {
  return (
    <div className="rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">{label}</div>
      <div className="font-display text-lg font-extrabold leading-tight" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

/* ───────────── Questions ───────────── */

export function QuestionCard({ q, n, result, onAnswer, accent }: { q: Question; n: number; result?: boolean; onAnswer: (ok: boolean) => void; accent: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-card ring-1 ring-black/5 sm:p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-ink-mute">
        Question {n} · {q.kind === "tf" ? "True or false?" : q.kind === "sort" ? "Sort it" : "Pick one"}
      </p>
      <p className="mt-1 font-display text-lg font-bold leading-snug">{q.q}</p>
      {q.kind === "mcq" && <Mcq q={q} result={result} onAnswer={onAnswer} accent={accent} />}
      {q.kind === "tf" && <Mcq q={{ ...q, kind: "mcq", options: ["True", "False"], answer: q.answer ? 0 : 1 }} result={result} onAnswer={onAnswer} accent={accent} />}
      {q.kind === "sort" && <Sort q={q} result={result} onAnswer={onAnswer} accent={accent} />}
    </div>
  );
}

function Mcq({ q, result, onAnswer, accent }: { q: Extract<Question, { kind: "mcq" }>; result?: boolean; onAnswer: (ok: boolean) => void; accent: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const settled = pick === q.answer; // a wrong pick only marks itself, so the student can try again
  return (
    <div className="mt-3">
      <div className="grid gap-2">
        {q.options.map((o, i) => {
          const chosen = pick === i;
          const right = i === q.answer;
          const show = pick !== null && (chosen || (settled && right));
          return (
            <button
              key={o}
              disabled={pick === q.answer}
              onClick={() => {
                setPick(i);
                if (result === undefined) onAnswer(i === q.answer);
              }}
              className={`press flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-bold ring-1 transition ${
                show ? (right ? "bg-mint/10 ring-mint" : "bg-his/10 ring-his/60") : "bg-cream/60 ring-black/5 hover:bg-cream"
              }`}
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white"
                style={{ background: show ? (right ? "#1fb88a" : "#c4552b") : accent }}
              >
                {show ? (right ? "✓" : "✗") : String.fromCharCode(65 + i)}
              </span>
              {o}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <p className={`mt-3 animate-rise rounded-2xl px-4 py-3 text-sm font-semibold ${pick === q.answer ? "bg-mint/10 text-[#0f6e52]" : "bg-his/10 text-his"}`}>
          {pick === q.answer ? "Correct! " : "Not quite — try another. "}
          {pick === q.answer && <span className="text-ink-soft">{q.why}</span>}
        </p>
      )}
    </div>
  );
}

function Sort({ q, result, onAnswer, accent }: { q: Extract<Question, { kind: "sort" }>; result?: boolean; onAnswer: (ok: boolean) => void; accent: string }) {
  const [placed, setPlaced] = useState<Record<number, 0 | 1>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const left = q.items.map((_, i) => i).filter((i) => placed[i] === undefined);
  const done = left.length === 0;

  useEffect(() => {
    if (done && result === undefined) onAnswer(mistakes <= 1);
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  function drop(bin: 0 | 1) {
    if (sel === null) return;
    if (q.items[sel].bin === bin) {
      setPlaced((p) => ({ ...p, [sel]: bin }));
      setSel(null);
    } else {
      setShake(sel);
      setMistakes((m) => m + 1);
      window.setTimeout(() => setShake(null), 450);
    }
  }

  return (
    <div className="mt-3">
      {!done && <p className="text-xs font-bold text-ink-mute">Tap an item, then tap the box it belongs in.</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {left.map((i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            className={`press rounded-full px-3.5 py-2 text-sm font-extrabold ring-1 transition ${sel === i ? "text-white ring-transparent" : "bg-cream ring-black/10"} ${shake === i ? "animate-[shake_.4s]" : ""}`}
            style={sel === i ? { background: accent } : undefined}
          >
            {q.items[i].label}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {q.bins.map((b, bi) => (
          <button
            key={b}
            onClick={() => drop(bi as 0 | 1)}
            className={`min-h-[96px] rounded-2xl border-2 border-dashed p-2.5 text-left transition ${sel !== null ? "border-ink/40 bg-cream/80" : "border-ink/15 bg-cream/40"}`}
          >
            <span className="block text-xs font-extrabold uppercase tracking-wide text-ink-soft">{b}</span>
            <span className="mt-1.5 flex flex-wrap gap-1">
              {q.items.map((it, i) =>
                placed[i] === bi ? (
                  <span key={i} className="animate-pop rounded-full bg-white px-2 py-0.5 text-xs font-bold ring-1 ring-black/10">
                    {it.label}
                  </span>
                ) : null,
              )}
            </span>
          </button>
        ))}
      </div>
      {done && <p className="mt-3 animate-rise rounded-2xl bg-mint/10 px-4 py-3 text-sm font-semibold text-[#0f6e52]">All sorted! <span className="text-ink-soft">{q.why}</span></p>}
    </div>
  );
}
