// Per-chapter progress, saved on this device only.
import type { Chapter } from "./types";

export type ChapterProgress = {
  found: string[]; // "stopId:discoveryId"
  guesses: Record<string, string>;
  answers: Record<string, boolean>; // question id -> answered correctly
  thought: string[]; // "stopId:n" Understand cards opened by answering their think-first question
  done: boolean;
  pct?: number; // written by the chapter player so menus can show progress without loading the chapter
};

const key = (id: string) => `zopio-sci-${id}-v1`;
export const EMPTY: ChapterProgress = { found: [], guesses: {}, answers: {}, thought: [], done: false };

export function loadChapter(id: string): ChapterProgress {
  try {
    const s = JSON.parse(localStorage.getItem(key(id)) || "null");
    return s ? { ...EMPTY, ...s } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveChapter(id: string, p: ChapterProgress) {
  try {
    localStorage.setItem(key(id), JSON.stringify(p));
  } catch {}
}

export function clearChapter(id: string) {
  try {
    localStorage.removeItem(key(id));
  } catch {}
}

export function totals(c: Pick<Chapter, "stops" | "challenge">) {
  return {
    discoveries: c.stops.reduce((n, s) => n + s.discoveries.length, 0),
    questions: c.stops.reduce((n, s) => n + s.check.length, 0) + (c.challenge?.length ?? 0),
  };
}

export function chapterPct(p: ChapterProgress, t: { discoveries: number; questions: number }) {
  const correct = Object.values(p.answers).filter(Boolean).length;
  return Math.min(1, (p.found.length + correct) / Math.max(1, t.discoveries + t.questions));
}
