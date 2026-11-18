import { MODULES, ModuleId, SUBJECTS, SubjectId, moduleForChapter } from "../catalog";
import type { Progress } from "../store";
import { Ring } from "./Art";
import { THEME, moduleStatus } from "./Home";

type Props = { id: SubjectId; progress: Progress; back: () => void; openModule: (id: ModuleId) => void };

export default function SubjectView({ id, progress, back, openModule }: Props) {
  const s = SUBJECTS[id];
  const t = THEME[id];
  const ring = { science: "#5b3df5", history: "#c4552b", geography: "#0f6b8f", civics: "#b8456b" }[id];

  return (
    <div className="pb-safe min-h-full animate-fade">
      <header className={`relative overflow-hidden text-white ${t.grad}`}>
        <t.Art className="pointer-events-none absolute -right-8 bottom-3 h-[150px] w-[206px] animate-float opacity-95 [mask-image:linear-gradient(to_right,transparent,#000_30%)] sm:h-[210px] sm:w-[290px] md:right-[8%]" />
        <div className="pt-safe relative mx-auto max-w-5xl px-5 pb-8">
          <div className="flex h-16 items-center">
            <button onClick={back} className="press -ml-2 flex items-center gap-1 rounded-full bg-white/15 py-2 pl-2.5 pr-4 text-sm font-extrabold backdrop-blur" aria-label="Back to home">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
              Home
            </button>
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[.16em] text-white/60">Class 6</p>
          <h1 className="font-display text-[46px] font-extrabold leading-none">{s.name}</h1>
          <p className="mt-2 max-w-[60%] text-sm font-semibold text-white/75">{s.book}</p>
        </div>
      </header>

      <main className="relative mx-auto -mt-4 max-w-5xl px-5">
        {/* interactive modules */}
        <div className={`grid gap-4 ${s.modules.length > 1 ? "md:grid-cols-2" : ""}`}>
          {s.modules.map((mid, k) => {
            const m = MODULES[mid];
            const st = moduleStatus(mid, progress);
            const begun = st.pct > 0;
            return (
              <article key={mid} className="flex animate-rise flex-col overflow-hidden rounded-[28px] bg-white shadow-lift ring-1 ring-black/5" style={{ animationDelay: `${k * 60}ms` }}>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                        ✨ Chapter {m.chapter}
                      </span>
                      <h2 className="mt-3 flex items-center gap-2 font-display text-[26px] font-extrabold leading-none">
                        <span aria-hidden="true">{m.icon}</span>
                        {m.name}
                      </h2>
                      <p className="mt-1.5 text-sm font-bold text-ink-mute">{m.chapterTitle}</p>
                    </div>
                    <Ring pct={st.pct} size={56} stroke={6} color={ring} track="#eee9df">
                      <span className="text-xs font-extrabold">{Math.round(st.pct * 100)}%</span>
                    </Ring>
                  </div>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-ink-soft">{m.blurb}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {m.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-extrabold">
                        <span aria-hidden="true">{f.icon}</span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => openModule(mid)} className={`press relative flex w-full items-center justify-between overflow-hidden px-5 py-3.5 text-left text-white ${t.grad}`}>
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span>
                    <span className="block text-base font-extrabold">
                      {begun ? "Continue" : "Start"} {m.name}
                    </span>
                    <span className="block text-xs font-bold text-white/70">{begun ? st.label : `About ${m.minutes} minutes`}</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                    </svg>
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        {/* chapter list */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-extrabold">All chapters</h2>
            <span className="text-sm font-bold text-ink-mute">
              {s.modules.length} of {s.chapters.length} live
            </span>
          </div>
          <ol className="mt-3 overflow-hidden rounded-[24px] bg-white shadow-card ring-1 ring-black/5">
            {s.chapters.map((title, i) => {
              const n = i + 1;
              const m = moduleForChapter(s, n);
              const row = (
                <>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold ${m ? `${t.grad} text-white` : "bg-cream text-ink/40"}`}>{n}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[15px] font-extrabold ${m ? "" : "text-ink/45"}`}>{title}</span>
                    <span className={`block text-xs font-bold ${m ? "text-mint" : "text-ink/30"}`}>{m ? `● Ready · ${m.name}` : "Coming soon"}</span>
                  </span>
                  {m ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink/25" fill="currentColor" aria-label="Locked">
                      <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z" />
                    </svg>
                  )}
                </>
              );
              return (
                <li key={title} className="border-b border-black/5 last:border-0">
                  {m ? (
                    <button onClick={() => openModule(m.id)} className="flex w-full items-center gap-3 bg-[#fbf8f2] px-4 py-3 text-left transition hover:bg-cream">
                      {row}
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3">{row}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </main>
    </div>
  );
}
