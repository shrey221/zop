// Everything is saved on this device only (localStorage) — no accounts, no server.
import { MODULES, ModuleId } from "./catalog";

export type Profile = { name: string; age: number; cls: number; since: string };
export type Activity = { days: string[]; opened: ModuleId[]; last?: ModuleId };

const PROFILE = "zopio-profile-v1";
const ACTIVITY = "zopio-activity-v1";
// Keys written by the modules themselves.
const LIGHT = "light-lab-progress-v1";
const HARAPPA = "time-travel-ch4-v1";

function read<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}
function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const loadProfile = () => read<Profile>(PROFILE);
export const saveProfile = (p: Profile | null) => write(PROFILE, p);

export function today(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function loadActivity(): Activity {
  const a = read<Activity>(ACTIVITY);
  return { days: a?.days ?? [], opened: a?.opened ?? [], last: a?.last };
}
export function recordVisit(): Activity {
  const a = loadActivity();
  if (!a.days.includes(today())) a.days = [...a.days, today()].slice(-60);
  write(ACTIVITY, a);
  return a;
}
export function recordOpen(id: ModuleId): Activity {
  const a = loadActivity();
  a.last = id;
  if (!a.opened.includes(id)) a.opened = [...a.opened, id];
  write(ACTIVITY, a);
  return a;
}

export function streak(days: string[]) {
  const set = new Set(days);
  const d = new Date();
  let n = 0;
  while (set.has(today(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export type ModuleProgress = { pct: number; label: string; count: number };
export type Progress = {
  light: { found: number; total: number; pct: number };
  harappa: { solved: number; explored: number; pct: number };
  modules: Record<ModuleId, ModuleProgress>;
  discoveries: number; // across every module
};

const sciKey = (id: string) => `zopio-sci-${id}-v1`;

export function loadProgress(): Progress {
  const l = read<{ found?: Record<string, string[]> }>(LIGHT);
  const found = Object.values(l?.found ?? {}).reduce((n, list) => n + (Array.isArray(list) ? list.length : 0), 0);
  const h = read<{ explored?: string[]; solved?: string[] }>(HARAPPA);
  const solved = h?.solved?.length ?? 0;
  const explored = h?.explored?.length ?? 0;
  const light = { found, total: 21, pct: Math.min(1, found / 21) };
  const harappa = { solved, explored, pct: Math.min(1, (solved + explored) / 19) };
  const modules = {} as Record<ModuleId, ModuleProgress>;
  let discoveries = found + solved + explored;
  for (const m of Object.values(MODULES)) {
    if (m.id === "light") modules.light = { pct: light.pct, label: `${found}/21 discoveries`, count: found };
    else if (m.id === "harappa") modules.harappa = { pct: harappa.pct, label: `${solved}/6 investigations · ${explored}/13 places`, count: solved + explored };
    else {
      const c = read<{ found?: string[]; pct?: number }>(sciKey(m.id));
      const n = c?.found?.length ?? 0;
      discoveries += n;
      modules[m.id] = { pct: c?.pct ?? 0, label: n ? `${n} discoveries · ${Math.round((c?.pct ?? 0) * 100)}%` : "Not started yet", count: n };
    }
  }
  return { light, harappa, modules, discoveries };
}

export function resetProgress() {
  [LIGHT, HARAPPA, ACTIVITY, ...Object.keys(MODULES).map(sciKey)].forEach((k) => write(k, null));
}
