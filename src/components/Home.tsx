import type { ReactElement } from "react";
import { COMING_SOON, MODULES, ModuleId, SUBJECTS, SubjectId } from "../catalog";
import type { Activity, Profile, Progress } from "../store";
import { streak } from "../store";
import { CivicsArt, GeographyArt, HistoryArt, Ring, ScienceArt } from "./Art";
import Eyes, { Wordmark } from "./Eyes";

export const THEME: Record<SubjectId, { grad: string; accent: string; Art: (p: { className?: string }) => ReactElement }> = {
  science: { grad: "bg-[linear-gradient(135deg,#1c1452_0%,#3b23b8_55%,#6f4dff_100%)]", accent: "#ffc93d", Art: ScienceArt },
  history: { grad: "bg-[linear-gradient(135deg,#5a2412_0%,#b4471f_55%,#e88a35_100%)]", accent: "#ffd27a", Art: HistoryArt },
  geography: { grad: "bg-[linear-gradient(135deg,#052a3f_0%,#0f6b8f_55%,#3fae6a_100%)]", accent: "#7fe3a0", Art: GeographyArt },
  civics: { grad: "bg-[linear-gradient(135deg,#3a1240_0%,#b8456b_55%,#f2a541_100%)]", accent: "#ffc96b", Art: CivicsArt },
};

const AVATAR = ["#5b3df5", "#c4552b", "#1fb88a", "#e0679b", "#2f80ed", "#e8a020"];
export function avatarColor(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR[h % AVATAR.length];
}
export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-display font-extrabold text-white ring-2 ring-white"
      style={{ width: size, height: size, background: avatarColor(name), fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export function moduleStatus(id: ModuleId, p: Progress) {
  return p.modules[id];
}

export function subjectPct(id: SubjectId, p: Progress) {
  const ms = SUBJECTS[id].modules;
  return ms.reduce((n, m) => n + p.modules[m].pct, 0) / ms.length;
}

type Props = {
  profile: Profile;
  activity: Activity;
  progress: Progress;
  openSubject: (id: SubjectId) => void;
  openModule: (id: ModuleId) => void;
  openProfile: () => void;
  install: (() => void) | null;
};

export default function Home({ profile, activity, progress, openSubject, openModule, openProfile, install }: Props) {
  const first = profile.name.split(" ")[0];
  const days = streak(activity.days);
  const discoveries = progress.discoveries;
  const moduleCount = Object.keys(MODULES).length;
  const pick: ModuleId = activity.last ?? "light";
  const pickMod = MODULES[pick];
  const pickStatus = moduleStatus(pick, progress);
  const started = activity.last !== undefined;

  return (
    <div className="pb-safe min-h-full">
      <header className="pt-safe sticky top-0 z-20 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <Eyes size={34} follow />
            <Wordmark className="text-[26px]" />
          </div>
          <button onClick={openProfile} className="press flex items-center gap-2 rounded-full bg-white py-1 pl-3 pr-1 shadow-card ring-1 ring-black/5" aria-label="Open profile">
            <span className="text-sm font-extrabold">Class {profile.cls}</span>
            <Avatar name={profile.name} size={34} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5">
        <section className="mt-3 animate-rise">
          <p className="text-[15px] font-bold text-ink-mute">{greeting()},</p>
          <h1 className="font-display text-[38px] font-extrabold leading-[1.05]">
            {first} <span className="inline-block origin-[70%_70%] animate-[wave_1.8s_ease-in-out_2]">👋</span>
          </h1>
        </section>

        {install && (
          <button
            onClick={install}
            className="press mt-4 flex w-full animate-rise items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-card ring-1 ring-black/5"
          >
            <Eyes size={40} blink={false} />
            <span className="flex-1">
              <span className="block text-sm font-extrabold">Install Zopio on this device</span>
              <span className="block text-xs font-semibold text-ink-mute">Opens full-screen and works offline</span>
            </span>
            <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-extrabold text-white">Install</span>
          </button>
        )}

        {/* continue card */}
        <section className="mt-5 grid animate-rise gap-4 md:grid-cols-[1.4fr_1fr]" style={{ animationDelay: "80ms" }}>
          <button
            onClick={() => openModule(pick)}
            className="press group relative overflow-hidden rounded-[28px] bg-ink p-5 text-left text-white shadow-lift"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sci/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 right-16 h-32 w-32 rounded-full bg-his/40 blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-white/55">{started ? "Continue learning" : "Start your first adventure"}</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight">{pickMod.name}</h2>
                <p className="mt-0.5 text-sm font-semibold text-white/65">
                  {SUBJECTS[pickMod.subject].name} · Ch. {pickMod.chapter} · {pickMod.chapterTitle}
                </p>
              </div>
              <Ring pct={pickStatus.pct} size={56} stroke={6} color={THEME[pickMod.subject].accent}>
                <span className="text-xs font-extrabold">{Math.round(pickStatus.pct * 100)}%</span>
              </Ring>
            </div>
            <div className="relative mt-5 flex items-center justify-between">
              <span className="text-xs font-bold text-white/55">{pickStatus.label}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-ink transition group-hover:gap-2.5">
                {started ? "Continue" : "Let's go"} <span aria-hidden="true">→</span>
              </span>
            </div>
          </button>

          <div className="grid grid-cols-3 gap-3">
            <Stat icon="🔥" value={days} label="day streak" tint="bg-[#fff1e6]" />
            <Stat icon="⭐" value={discoveries} label="discoveries" tint="bg-[#fff8db]" />
            <Stat icon="🧭" value={`${activity.opened.length}/${moduleCount}`} label="modules" tint="bg-[#ecebff]" />
          </div>
        </section>

        {/* subjects */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-extrabold">Your subjects</h2>
            <span className="text-sm font-bold text-ink-mute">Class {profile.cls}</span>
          </div>
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(SUBJECTS) as SubjectId[]).map((id, i) => {
              const s = SUBJECTS[id];
              const t = THEME[id];
              const pct = subjectPct(id, progress);
              return (
                <button
                  key={id}
                  onClick={() => openSubject(id)}
                  className={`press relative h-[188px] animate-rise overflow-hidden rounded-[28px] p-5 text-left text-white shadow-lift ${t.grad}`}
                  style={{ animationDelay: `${140 + i * 80}ms` }}
                >
                  <t.Art className="pointer-events-none absolute -right-4 bottom-0 h-[150px] w-[206px] animate-float [mask-image:linear-gradient(to_right,transparent,#000_30%)]" />
                  <div className="relative flex h-full flex-col">
                    <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur">
                      {s.modules.length} interactive · {s.chapters.length} chapters
                    </span>
                    <h3 className="mt-2 font-display text-[32px] font-extrabold leading-none">{s.name}</h3>
                    <p className="mt-1 max-w-[52%] text-sm font-semibold text-white/75">{s.tagline}</p>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(4, pct * 100)}%`, background: t.accent }} />
                      </div>
                      <span className="text-xs font-extrabold text-white/80">{Math.round(pct * 100)}%</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* roadmap */}
        <section className="mt-8">
          <h2 className="font-display text-xl font-extrabold">Coming soon</h2>
          <div className="no-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-2">
            {COMING_SOON.map((c) => (
              <div key={c.name} className="flex shrink-0 items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-black/5">
                <span className="text-xl grayscale-[40%]">{c.icon}</span>
                <span className="text-sm font-extrabold text-ink-soft">{c.name}</span>
                <span className="text-sm" aria-label="locked">🔒</span>
              </div>
            ))}
            <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-black/5">
              <span className="text-sm font-extrabold text-ink-soft">Classes 7 – 10</span>
              <span className="text-sm" aria-label="locked">🔒</span>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-xs font-bold text-ink-mute/70">
          <Wordmark className="text-sm" /> · Learning you can see
        </p>
      </main>
    </div>
  );
}

function Stat({ icon, value, label, tint }: { icon: string; value: number | string; label: string; tint: string }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-3xl p-3 text-center ring-1 ring-black/5 ${tint}`}>
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <span className="mt-1 font-display text-2xl font-extrabold leading-none">{value}</span>
      <span className="mt-1 text-[11px] font-extrabold uppercase tracking-wide text-ink-mute">{label}</span>
    </div>
  );
}
