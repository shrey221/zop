// A simple sketch map of the subcontinent for History labs. Drawn from rough longitude/latitude
// points — clearly labelled as a sketch, not an accurate map.
export const proj = (lon: number, lat: number) => ({ x: (lon - 60) * 13.5 + 10, y: (37.5 - lat) * 13.5 + 10 });

const OUTLINE: [number, number][] = [
  [62.3, 25.1], [67, 24.8], [68.6, 23.6], [69, 22.4], [70.2, 21], [72.6, 21.1], [73, 18.9], [73.8, 15.5], [75, 12.8],
  [76.3, 9.9], [77.5, 8.1], [78.2, 8.9], [79.8, 10.3], [80.3, 13.1], [81.2, 16.5], [83.3, 17.7], [85.8, 19.8], [87, 21.5],
  [88.3, 21.8], [90, 22], [91.8, 22.3], [92.5, 21.2], [92.7, 24], [94, 25.5], [95.5, 27.5], [97, 28.3], [94, 29.3],
  [91.5, 27.9], [88, 27.9], [85, 28], [81, 30.2], [79, 31], [78.5, 32.5], [77.8, 35.5], [74.5, 37], [71.5, 36.5], [71, 34],
  [69.5, 33.5], [70, 31.5], [69.3, 29.5], [66.5, 29.5], [62, 29.4], [61.5, 26],
];
const LANKA: [number, number][] = [[79.9, 9.8], [81.9, 7.5], [81.2, 6.1], [80.1, 6], [79.8, 7.5]];
const RIVERS: Record<string, [number, number][]> = {
  Indus: [[75.5, 34], [73.5, 33], [71.5, 31], [70, 28], [68.5, 25.5], [67.5, 24.3]],
  Ganga: [[78.5, 30], [78.2, 29.5], [80, 27], [82.5, 25.3], [85.1, 25.6], [87.5, 25], [88.5, 23.5], [89, 22.2]],
  Narmada: [[81.7, 22.7], [79, 23], [76.5, 22.3], [73, 21.7]],
};
const path = (pts: [number, number][], close = false) => pts.map(([lo, la], i) => `${i ? "L" : "M"}${proj(lo, la).x.toFixed(1)} ${proj(lo, la).y.toFixed(1)}`).join(" ") + (close ? " Z" : "");

export const MAP_VIEWBOX = "0 0 520 440";

export function SketchMap({ rivers = true }: { rivers?: boolean }) {
  return (
    <g>
      <rect width="520" height="440" fill="#173b5c" />
      <path d={path(OUTLINE, true)} fill="#e9dcc0" stroke="#b9a37a" strokeWidth="2" />
      <path d={path(LANKA, true)} fill="#e9dcc0" stroke="#b9a37a" strokeWidth="2" />
      {rivers &&
        Object.entries(RIVERS).map(([name, pts]) => (
          <g key={name}>
            <path d={path(pts)} stroke="#4f9fd1" strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x={proj(...pts[1]).x + 6} y={proj(...pts[1]).y - 4} fontSize="10" fontWeight="800" fill="#2f78b8">
              {name}
            </text>
          </g>
        ))}
      <text x="510" y="430" fontSize="10" fontWeight="800" fill="#9fc3e0" textAnchor="end">
        Sketch map · not to scale
      </text>
    </g>
  );
}

// A labelled dot for a place on the sketch map.
export function Place({ lon, lat, name, dx = 8, dy = 4 }: { lon: number; lat: number; name: string; dx?: number; dy?: number }) {
  const p = proj(lon, lat);
  return (
    <g pointerEvents="none">
      <circle cx={p.x} cy={p.y} r="3.5" fill="#5a2412" />
      <text x={p.x + dx} y={p.y + dy} fontSize="11" fontWeight="800" fill="#3a2414" textAnchor={dx < 0 ? "end" : "start"}>
        {name}
      </text>
    </g>
  );
}
