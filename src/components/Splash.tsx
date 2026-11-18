import { useEffect, useState } from "react";
import Eyes, { BRAND_LOOK, Look } from "./Eyes";

const SCRIPT: [number, Look][] = [
  [0, { x: 0, y: 0 }],
  [650, { x: -8, y: 0 }],
  [1150, { x: 8, y: 0 }],
  [1650, BRAND_LOOK],
];

export default function Splash({ onDone }: { onDone: () => void }) {
  const [look, setLook] = useState<Look>({ x: 0, y: 0 });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timers = SCRIPT.map(([t, l]) => window.setTimeout(() => setLook(l), t));
    timers.push(window.setTimeout(() => setLeaving(true), 2700));
    timers.push(window.setTimeout(onDone, 3100));
    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  return (
    <button
      onClick={onDone}
      aria-label="Skip intro"
      className={`fixed inset-0 z-50 flex cursor-default flex-col items-center justify-center overflow-hidden bg-ink text-white transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-[radial-gradient(circle,rgba(91,61,245,.35),transparent_65%)] animate-glow" />
      <div className="relative animate-pop">
        <div className="rounded-[34px] p-1 ring-1 ring-white/15">
          <Eyes size={148} look={look} />
        </div>
      </div>
      <div className="relative mt-7 flex text-[64px] text-white" aria-label="zopio">
        {"zopio".split("").map((c, i) => (
          <span key={i} className="animate-rise" style={{ animationDelay: `${700 + i * 80}ms` }}>
            <span className="font-display font-extrabold leading-none">{c}</span>
          </span>
        ))}
      </div>
      <p className="relative mt-3 animate-rise text-base font-bold tracking-wide text-white/60" style={{ animationDelay: "1250ms" }}>
        Learning you can see.
      </p>
      <p className="absolute bottom-10 animate-fade text-xs font-semibold text-white/30" style={{ animationDelay: "1800ms" }}>
        Tap to skip
      </p>
    </button>
  );
}
