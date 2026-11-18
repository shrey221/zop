// A Science chapter is pure data + a few simulation components; the engine (ChapterPlayer) does the rest.
import type { ComponentType } from "react";

export type SimProps = {
  found: string[];
  discover: (id: string) => void;
};

export type Question =
  | { id: string; kind: "mcq"; q: string; options: string[]; answer: number; why: string }
  | { id: string; kind: "tf"; q: string; answer: boolean; why: string }
  | { id: string; kind: "sort"; q: string; bins: [string, string]; items: { label: string; bin: 0 | 1 }[]; why: string };

export type Activity = { activity: string; title: string; how: string; Sim: ComponentType<SimProps> };

// A quick question shown before an Understand card, so the student thinks before reading.
export type Think = { q: string; options: string[]; answer: number };

export type Stop = {
  id: string;
  icon: string;
  title: string;
  pages: string;
  wonder: { q: string; options: { id: string; label: string }[]; answer: string; reveal: string };
  explore: Activity;
  more?: Activity[]; // extra activities in the same stop, played after `explore`
  /** hint: what to try (never the answer), shown until the discovery is made */
  /** at: which activity it is found in (0 = explore, 1+ = more[at-1]); lists it under that activity */
  discoveries: { id: string; text: string; hint?: string; at?: number }[];
  understand: { title: string; body: string; tag?: Evidence; think?: Think }[];
  check: Question[];
  connect: { icon: string; title: string; body: string }[];
};

// One thing in the textbook chapter, and where the app covers it. `by` refers to:
// d:stop.discovery · q:question · t:stop.n (Understand card n, 1-based) · c:stop.n (Connect card) · w:stop (Wonder)
export type BookItem = { id: string; kind: "idea" | "activity" | "box" | "exercise" | "project"; page: string; text: string; by: string[] };

// History chapters label each idea by how sure we are of it.
export type Evidence = "found" | "think" | "source" | "unknown";

export type Theme = {
  grad: string; // CSS gradient for heroes
  accent: string; // strong colour
  soft: string; // pale tint
  ink: string; // dark text on soft
};

export type Chapter = {
  id: string;
  subject?: "Science" | "History" | "Geography" | "Civics";
  n: number;
  title: string;
  pages: string;
  theme: Theme;
  icon: string;
  opening: string; // the question the textbook opens with (paraphrased)
  stops: Stop[];
  challenge?: Question[]; // the book's end-of-chapter exercises, played after the last stop
  book?: BookItem[]; // the textbook chapter, item by item, for the coverage report
  learnt: string[];
  keywords: string[];
};
