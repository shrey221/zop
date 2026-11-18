// Only used by the single-file build: both modules travel inside zopio.html and open from blob URLs.
import light from "../modules/light-lab.html?raw";
import harappa from "../modules/time-travel.html?raw";
import type { ModuleId } from "./catalog";

const RAW: Partial<Record<ModuleId, string>> = { light, harappa };
const urls: Partial<Record<ModuleId, string>> = {};

export function inlineUrl(id: ModuleId) {
  return (urls[id] ??= URL.createObjectURL(new Blob([RAW[id] ?? ""], { type: "text/html" })));
}
