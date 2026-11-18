import Globe from "../geography/Globe";
// Subject illustrations, drawn as SVG so they stay crisp on any screen.
import { useId } from "react";

export function ScienceArt({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}g`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe48a" stopOpacity=".95" />
          <stop offset=".45" stopColor="#ffc93d" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffc93d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffe48a" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffe48a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}s`} cx=".35" cy=".3" r=".75">
          <stop offset="0" stopColor="#ffb3a6" />
          <stop offset=".5" stopColor="#ff6b57" />
          <stop offset="1" stopColor="#c23b2c" />
        </radialGradient>
      </defs>
      {/* floor */}
      <ellipse cx="128" cy="134" rx="98" ry="14" fill="#000" opacity=".18" />
      {/* beam */}
      <path d="M78 52 L210 70 L210 132 L78 66 Z" fill={`url(#${id}b)`} />
      {/* shadow of the ball */}
      <path d="M150 128 Q185 122 214 130 Q186 140 150 136 Z" fill="#05030f" opacity=".55" />
      {/* glow + rays */}
      <circle cx="62" cy="54" r="58" fill={`url(#${id}g)`} className="animate-glow" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={62 + Math.cos(a) * 32}
            y1={54 + Math.sin(a) * 32}
            x2={62 + Math.cos(a) * 44}
            y2={54 + Math.sin(a) * 44}
            stroke="#ffe48a"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".8"
          />
        );
      })}
      {/* bulb */}
      <circle cx="62" cy="54" r="22" fill="#fff1b8" />
      <circle cx="62" cy="54" r="22" fill="none" stroke="#ffd457" strokeWidth="2" />
      <path d="M55 58 q3 -10 7 0 q3 -10 7 0" fill="none" stroke="#e08a12" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="54" cy="45" rx="6" ry="4" fill="#fff" opacity=".85" transform="rotate(-30 54 45)" />
      <rect x="52" y="74" width="20" height="16" rx="3" fill="#cfcbe0" />
      <path d="M52 79 h20 M52 84 h20" stroke="#9c97b6" strokeWidth="2" />
      <rect x="57" y="90" width="10" height="5" rx="2" fill="#7b7696" />
      {/* ball */}
      <circle cx="150" cy="110" r="20" fill={`url(#${id}s)`} />
      {/* sparkles */}
      {[
        [118, 30, 5],
        [196, 40, 4],
        [176, 18, 3],
      ].map(([x, y, r], i) => (
        <path key={i} d={`M${x} ${y - r * 2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z`} fill="#fff" opacity=".8" />
      ))}
    </svg>
  );
}

export function HistoryArt({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const bricks = (x: number, y: number, w: number, h: number) => {
    const rows = [];
    for (let r = 0; r < h / 7; r++) {
      const yy = y + r * 7;
      rows.push(<line key={`h${r}`} x1={x} y1={yy} x2={x + w} y2={yy} />);
      for (let c = (r % 2) * 7; c < w; c += 14) rows.push(<line key={`v${r}-${c}`} x1={x + c} y1={yy} x2={x + c} y2={Math.min(yy + 7, y + h)} />);
    }
    return rows;
  };
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}sun`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffe3a3" />
          <stop offset=".55" stopColor="#ffc35c" stopOpacity=".6" />
          <stop offset="1" stopColor="#ffc35c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0b37a" />
          <stop offset="1" stopColor="#c9773f" />
        </linearGradient>
        <clipPath id={`${id}c1`}>
          <rect x="70" y="58" width="84" height="40" />
        </clipPath>
        <clipPath id={`${id}c2`}>
          <rect x="44" y="96" width="140" height="30" />
        </clipPath>
      </defs>
      <circle cx="170" cy="36" r="34" fill={`url(#${id}sun)`} className="animate-glow" />
      <circle cx="170" cy="36" r="14" fill="#ffe3a3" />
      {/* distant hills */}
      <path d="M0 118 Q40 92 84 108 T170 100 T220 108 V160 H0 Z" fill="#000" opacity=".12" />
      {/* citadel: platform + building */}
      <rect x="44" y="96" width="140" height="30" fill={`url(#${id}wall)`} />
      <g clipPath={`url(#${id}c2)`} stroke="#8e4a22" strokeWidth=".9" opacity=".55">
        {bricks(44, 96, 140, 30)}
      </g>
      <rect x="70" y="58" width="84" height="40" fill="#f6c38f" />
      <g clipPath={`url(#${id}c1)`} stroke="#a65a2b" strokeWidth=".9" opacity=".5">
        {bricks(70, 58, 84, 40)}
      </g>
      <rect x="66" y="52" width="92" height="7" rx="2" fill="#e09a5d" />
      <rect x="102" y="74" width="20" height="24" rx="9" fill="#5a2412" />
      <rect x="80" y="70" width="10" height="10" rx="2" fill="#5a2412" opacity=".8" />
      <rect x="134" y="70" width="10" height="10" rx="2" fill="#5a2412" opacity=".8" />
      {/* steps */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={98 - i * 5} y={126 + i * 5} width={28 + i * 10} height="5" fill="#e2a46a" stroke="#a65a2b" strokeWidth=".6" />
      ))}
      {/* river */}
      <path d="M0 146 Q30 140 60 146 T120 146 T180 146 T240 146 V160 H0 Z" fill="#4fa3b5" />
      <path d="M10 151 q10 -4 20 0 M80 152 q10 -4 20 0 M150 151 q10 -4 20 0" stroke="#bfe6ee" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* painted pot */}
      <g transform="translate(18 92)">
        <path d="M8 0 h16 l-2 6 q12 6 12 20 q0 16 -18 18 q-18 -2 -18 -18 q0 -14 12 -20 Z" fill="#b8452a" />
        <path d="M3 18 h26 M2 26 h28" stroke="#2a120a" strokeWidth="2" />
        <path d="M6 22 q4 -3 8 0 t8 0 t8 0" stroke="#2a120a" strokeWidth="1.4" fill="none" />
      </g>
      {/* palm */}
      <g transform="translate(196 74)">
        <path d="M0 0 q2 26 -2 52" stroke="#6b3f1f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M0 0 q-14 -8 -22 4 M0 0 q14 -8 22 4 M0 0 q-6 -14 -18 -12 M0 0 q6 -14 18 -12" stroke="#2f7a4a" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Ring({ pct, size = 44, stroke = 5, color = "#fff", track = "rgba(255,255,255,.2)", children }: { pct: number; size?: number; stroke?: number; color?: string; track?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

// Geography: a slowly spinning globe with a soft glow.
export function GeographyArt({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="ml-auto h-full" style={{ aspectRatio: "1 / 1" }}>
        <Globe size={200} autoSpin={14} draggable={false} grid />
      </div>
    </div>
  );
}

// Civics: a small town — homes, a school, a town hall and people going about their day.
export function CivicsArt({ className = "" }: { className?: string }) {
  const person = (x: number, c: string, d: number, long = false) => (
    <g transform={`translate(${x} 138)`} className="animate-float" style={{ animationDelay: `${d}s` }}>
      <rect x="-4" y="-12" width="3" height="12" rx="1.5" fill="#2b2140" />
      <rect x="1" y="-12" width="3" height="12" rx="1.5" fill="#2b2140" />
      <path d="M-6.5 -11 Q-7 -26 0 -26.5 Q7 -26 6.5 -11 Z" fill={c} />
      {long && <path d="M-5.5 -33 Q-6.5 -24 -3 -23 L3 -23 Q6.5 -24 5.5 -33 Z" fill="#2b1a12" />}
      <circle cy="-32" r="5.5" fill="#c98a5e" />
      <path d="M-5.5 -32.5 Q-5 -39 0 -38.5 Q5 -39 5.5 -32.5 Q3 -35.5 -5.5 -32.5 Z" fill="#2b1a12" />
    </g>
  );
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true">
      <ellipse cx="118" cy="142" rx="100" ry="10" fill="#000" opacity=".18" />
      {/* town hall */}
      <rect x="92" y="62" width="62" height="74" rx="3" fill="#fff3df" />
      <path d="M86 64 L123 40 L160 64 Z" fill="#ffd27a" />
      <circle cx="123" cy="54" r="5" fill="#b8456b" />
      {[100, 116, 132, 146].map((x) => (
        <rect key={x} x={x} y="74" width="5" height="40" rx="2" fill="#e8c9a0" />
      ))}
      <rect x="114" y="116" width="18" height="20" rx="2" fill="#7a3b52" />
      {/* school */}
      <rect x="160" y="88" width="48" height="48" rx="3" fill="#ffe08a" />
      <path d="M155 90 L184 72 L213 90 Z" fill="#e0679b" />
      <rect x="178" y="112" width="12" height="24" fill="#8a4a2b" />
      <rect x="166" y="98" width="9" height="9" fill="#7fc8ff" />
      <rect x="193" y="98" width="9" height="9" fill="#7fc8ff" />
      {/* homes */}
      <rect x="22" y="96" width="40" height="40" rx="3" fill="#ffc9a6" />
      <path d="M17 98 L42 80 L67 98 Z" fill="#c4552b" />
      <rect x="36" y="114" width="11" height="22" fill="#7a3b2b" />
      <rect x="62" y="108" width="28" height="28" rx="3" fill="#bfe3c8" />
      <path d="M58 110 L76 96 L94 110 Z" fill="#3f8a5a" />
      {/* tree */}
      <rect x="12" y="118" width="4" height="18" fill="#6b4430" />
      <circle cx="14" cy="112" r="11" fill="#3fae6a" />
      {person(48, "#ffd27a", 0)}
      {person(84, "#7fc8ff", 0.6, true)}
      {person(160, "#ff9bc8", 1.2, true)}
      {person(196, "#5fe0a0", 0.3)}
    </svg>
  );
}
