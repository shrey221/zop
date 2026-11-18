// Opens a learning module full-screen inside the app, with a Zopio bar on top to come back.
// Framed modules (Light Lab, Time Travel) load in an iframe; Science chapters render directly.
import { useEffect, useState } from "react";
import { MODULES, ModuleId, SUBJECTS, moduleSrc } from "../catalog";
import ChapterPlayer from "../science/ChapterPlayer";
import { CHAPTERS } from "../science/registry";
import type { Chapter } from "../science/types";
import Eyes, { useWander } from "./Eyes";

const GLANCES = [
  { x: -8, y: 0 },
  { x: 0, y: -8 },
  { x: 8, y: 0 },
  { x: 0, y: 6 },
];

export default function Player({ id, close }: { id: ModuleId; close: () => void }) {
  const m = MODULES[id];
  const [src, setSrc] = useState<string | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loaded, setLoaded] = useState(false);
  const look = useWander(!loaded, GLANCES, 420);

  useEffect(() => {
    let live = true;
    if (m.kind === "chapter") {
      CHAPTERS[id]?.().then((mod) => {
        if (!live) return;
        setChapter(mod.default);
        setLoaded(true);
      });
    } else {
      moduleSrc(id).then((s) => live && setSrc(s));
    }
    return () => {
      live = false;
    };
  }, [id, m.kind]);

  return (
    <div className="fixed inset-0 z-40 flex animate-up flex-col bg-ink" role="dialog" aria-label={m.name}>
      <div className="pt-safe shrink-0 bg-ink text-white">
        <div className="flex h-12 items-center gap-2 px-2">
          <button onClick={close} className="press flex items-center gap-0.5 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-extrabold hover:bg-white/10" aria-label="Close module and go back">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-extrabold leading-tight">{m.name}</p>
            <p className="truncate text-[11px] font-bold leading-tight text-white/50">
              {SUBJECTS[m.subject].name} · Chapter {m.chapter}
            </p>
          </div>
          <div className="flex w-[74px] justify-end pr-1">
            <Eyes size={28} bare blink />
          </div>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        {chapter && (
          <div className="absolute inset-0 overflow-y-auto overscroll-contain">
            <ChapterPlayer chapter={chapter} />
          </div>
        )}
        {src && (
          <iframe
            key={src}
            src={src}
            title={m.name}
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            allow="fullscreen"
          />
        )}
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center bg-ink text-white">
            <div className="flex flex-col items-center">
              <Eyes size={84} look={look} blink={false} />
              <p className="mt-4 text-sm font-extrabold text-white/70">Opening {m.name}…</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
