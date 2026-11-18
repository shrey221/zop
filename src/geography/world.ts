// Coarse continent outlines (longitude, latitude) for sketch maps and the globe.
// Deliberately simplified — every view that uses them is labelled as a sketch.
export type LonLat = [number, number];

export const CONTINENTS: Record<string, { name: string; color: string; pts: LonLat[] }> = {
  northAmerica: {
    name: "North America",
    color: "#7fbf6a",
    pts: [[-168, 66], [-140, 70], [-95, 72], [-75, 62], [-60, 50], [-66, 44], [-75, 35], [-81, 25], [-97, 26], [-97, 18], [-87, 15], [-80, 8], [-90, 15], [-105, 22], [-117, 32], [-124, 40], [-125, 48], [-140, 60], [-165, 60]],
  },
  greenland: { name: "Greenland", color: "#d9e6ea", pts: [[-45, 60], [-20, 70], [-25, 82], [-60, 82], [-55, 70]] },
  southAmerica: {
    name: "South America",
    color: "#9ccc65",
    pts: [[-80, 8], [-75, 11], [-60, 10], [-50, 0], [-35, -5], [-38, -15], [-48, -28], [-58, -38], [-65, -55], [-75, -50], [-72, -30], [-70, -18], [-81, -5]],
  },
  europe: {
    name: "Europe",
    color: "#b3a3d9",
    pts: [[-10, 36], [-9, 43], [-1, 46], [-5, 48], [2, 51], [8, 54], [5, 58], [10, 63], [25, 71], [40, 68], [55, 68], [60, 55], [50, 45], [40, 41], [28, 41], [23, 36], [15, 38], [12, 44], [3, 42]],
  },
  africa: {
    name: "Africa",
    color: "#e0b45a",
    pts: [[-17, 21], [-10, 30], [-5, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [40, -2], [40, -15], [35, -25], [20, -35], [15, -28], [12, -15], [8, 4], [-8, 4], [-17, 14]],
  },
  asia: {
    name: "Asia",
    color: "#e8896a",
    pts: [[60, 55], [60, 68], [80, 73], [110, 77], [140, 72], [170, 66], [180, 65], [160, 58], [140, 50], [130, 42], [122, 40], [122, 30], [110, 20], [105, 10], [100, 13], [98, 8], [92, 22], [88, 22], [80, 13], [77, 8], [73, 20], [67, 25], [57, 25], [52, 28], [48, 30], [43, 13], [35, 28], [36, 36], [28, 41], [40, 41], [50, 45]],
  },
  australia: {
    name: "Australia",
    color: "#f2c46d",
    pts: [[113, -22], [122, -18], [131, -12], [137, -12], [142, -11], [146, -19], [153, -27], [150, -37], [140, -38], [131, -31], [115, -34]],
  },
  antarctica: {
    name: "Antarctica",
    color: "#eef4f7",
    pts: [[-180, -70], [-120, -72], [-60, -64], [0, -70], [60, -67], [120, -66], [180, -70], [180, -89], [-180, -89]],
  },
};

// Flat (equirectangular) projection into a W×H box.
export const flat = (lon: number, lat: number, W = 520, H = 260) => ({ x: ((lon + 180) / 360) * W, y: ((90 - lat) / 180) * H });
export const flatPath = (pts: LonLat[], W = 520, H = 260) => pts.map(([lo, la], i) => `${i ? "L" : "M"}${flat(lo, la, W, H).x.toFixed(1)} ${flat(lo, la, W, H).y.toFixed(1)}`).join(" ") + " Z";

// Orthographic projection for the globe: the centre of the view is at longitude `lon0` (degrees), latitude `lat0`.
const rad = Math.PI / 180;
export function ortho(lon: number, lat: number, lon0: number, R: number, lat0 = 0) {
  const l = (lon - lon0) * rad;
  const p = lat * rad;
  const p0 = lat0 * rad;
  const x = R * Math.cos(p) * Math.sin(l);
  const y = -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l));
  const visible = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l) > 0;
  return { x, y, visible };
}

// A polygon on the globe. Points on the far side are pushed to the rim so shapes stay closed.
export function globePath(pts: LonLat[], lon0: number, R: number, lat0 = 0) {
  let anyVisible = false;
  const out = pts.map(([lo, la]) => {
    const q = ortho(lo, la, lon0, R, lat0);
    if (q.visible) {
      anyVisible = true;
      return q;
    }
    const d = Math.hypot(q.x, q.y) || 1;
    return { x: (q.x / d) * R, y: (q.y / d) * R, visible: false };
  });
  if (!anyVisible) return "";
  return out.map((q, i) => `${i ? "L" : "M"}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(" ") + " Z";
}

// A circle of latitude or a meridian, as a polyline of its visible part.
export function globeLine(pts: LonLat[], lon0: number, R: number, lat0 = 0) {
  let d = "";
  let pen = false;
  for (const [lo, la] of pts) {
    const q = ortho(lo, la, lon0, R, lat0);
    if (q.visible) {
      d += `${pen ? "L" : "M"}${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
      pen = true;
    } else pen = false;
  }
  return d;
}
export const parallel = (lat: number): LonLat[] => Array.from({ length: 73 }, (_, i) => [-180 + i * 5, lat]);
export const meridian = (lon: number): LonLat[] => Array.from({ length: 37 }, (_, i) => [lon, -90 + i * 5]);
