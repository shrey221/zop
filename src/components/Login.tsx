import { FormEvent, useState } from "react";
import Eyes, { Wordmark } from "./Eyes";
import type { Profile } from "../store";
import { today } from "../store";

const AGES = [8, 9, 10, 11, 12, 13, 14];
const CLASSES = [6, 7, 8, 9, 10];

export default function Login({ initial, onDone }: { initial: Profile | null; onDone: (p: Profile) => void }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [age, setAge] = useState<number | null>(initial?.age ?? null);
  const [cls, setCls] = useState(6);
  const [typing, setTyping] = useState(false);
  const [happy, setHappy] = useState(false);

  const clean = name.trim().replace(/\s+/g, " ");
  const ready = clean.length >= 2 && age !== null;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setHappy(true);
    window.setTimeout(() => onDone({ name: clean, age: age!, cls, since: initial?.since ?? today() }), 450);
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-cream">
      {/* soft colour blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sci/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-his/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sci-glow/30 blur-3xl" />

      <form onSubmit={submit} className="pt-safe relative mx-auto flex min-h-full max-w-md flex-col px-6 pb-8" noValidate>
        <div className="mt-10 flex flex-col items-center text-center">
          <div className={`animate-pop ${happy ? "scale-110 transition-transform duration-300" : ""}`}>
            <Eyes size={104} follow look={happy ? { x: 0, y: -7 } : typing ? { x: 0, y: 7.5 } : null} />
          </div>
          <h1 className="mt-5 animate-rise font-display text-[34px] font-extrabold leading-tight" style={{ animationDelay: "80ms" }}>
            {initial ? "Update your details" : (
              <>
                Welcome to <Wordmark className="text-sci" />
              </>
            )}
          </h1>
          <p className="mt-1 animate-rise text-[15px] font-semibold text-ink-mute" style={{ animationDelay: "140ms" }}>
            Tell us a little about you to start learning.
          </p>
        </div>

        <div className="mt-8 animate-rise space-y-6 rounded-[28px] bg-white/85 p-5 shadow-card ring-1 ring-black/5 backdrop-blur" style={{ animationDelay: "200ms" }}>
          <label className="block">
            <span className="text-sm font-extrabold text-ink-soft">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setTyping(true)}
              onBlur={() => setTyping(false)}
              maxLength={24}
              autoComplete="off"
              enterKeyHint="next"
              placeholder="e.g. Aarav"
              className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream/60 px-4 py-3.5 text-lg font-bold outline-none transition placeholder:font-semibold placeholder:text-ink/30 focus:border-sci focus:bg-white"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-extrabold text-ink-soft">Age</legend>
            <div className="mt-2 grid grid-cols-7 gap-1.5" role="radiogroup" aria-label="Age">
              {AGES.map((a) => (
                <button
                  type="button"
                  key={a}
                  role="radio"
                  aria-checked={age === a}
                  onClick={() => setAge(a)}
                  className={`press h-11 rounded-xl text-base font-extrabold transition ${
                    age === a ? "bg-ink text-white shadow-lift" : "bg-cream/70 text-ink-soft ring-1 ring-ink/10 hover:bg-cream-deep"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-extrabold text-ink-soft">Class</legend>
            <div className="mt-2 grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Class">
              {CLASSES.map((c) => {
                const open = c === 6;
                const on = cls === c;
                return (
                  <button
                    type="button"
                    key={c}
                    role="radio"
                    aria-checked={on}
                    disabled={!open}
                    onClick={() => setCls(c)}
                    className={`press relative flex h-14 flex-col items-center justify-center rounded-xl transition ${
                      on ? "bg-sci text-white shadow-lift" : open ? "bg-cream/70 ring-1 ring-ink/10" : "bg-cream/40 text-ink/30"
                    }`}
                  >
                    <span className="text-lg font-extrabold leading-none">{c}</span>
                    <span className={`mt-1 text-[10px] font-extrabold uppercase tracking-wide ${on ? "text-white/80" : open ? "text-ink-mute" : "text-ink/30"}`}>
                      {open ? "Class" : "Soon"}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-auto pt-8">
          <button
            type="submit"
            disabled={!ready}
            className={`press relative w-full overflow-hidden rounded-2xl py-4 text-lg font-extrabold transition ${
              ready ? "bg-ink text-white shadow-lift" : "bg-ink/10 text-ink/35"
            }`}
          >
            {ready && <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/25 to-transparent" />}
            {initial ? "Save" : "Start learning"} <span aria-hidden="true">→</span>
          </button>
          <p className="mt-3 text-center text-xs font-bold text-ink-mute">🔒 Your details stay on this device.</p>
        </div>
      </form>
    </div>
  );
}
