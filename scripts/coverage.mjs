// Coverage report: how much of each textbook chapter a student meets, and how.
// usage: node scripts/coverage.mjs [subject]   (subject defaults to science)
//
// A chapter's `book` list names every idea, activity, box, exercise and project in the textbook,
// and `by` says where the app covers it. Each item is graded by its strongest kind of coverage:
//   doing   – a discovery in a simulation (d:)
//   active  – a question, a think-first card or a wonder (q:, t:, w:)
//   reading – only a plain card (t: without a think question, c:)
//   missing – nothing
import { createServer } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const subject = process.argv[2] ?? "science";

const vite = await createServer({ root, configFile: false, logLevel: "error", server: { middlewareMode: true }, appType: "custom", optimizeDeps: { noDiscovery: true, include: [] } });
let failed = false;
try {
  const { SUBJECTS } = await vite.ssrLoadModule("/src/catalog.ts");
  const { CHAPTERS } = await vite.ssrLoadModule("/src/science/registry.ts");
  const ids = SUBJECTS[subject].modules.filter((id) => CHAPTERS[id]);
  const rows = [];
  for (const id of ids) {
    const c = (await CHAPTERS[id]()).default;
    const cards = c.stops.flatMap((s) => s.understand);
    const thinking = cards.filter((u) => u.think).length;
    const questions = c.stops.reduce((n, s) => n + s.check.length, 0) + (c.challenge?.length ?? 0);
    const row = { n: c.n, title: c.title, cards: `${thinking}/${cards.length}`, questions, book: c.book?.length ?? 0 };
    if (c.book) {
      const grade = { doing: 0, active: 0, reading: 0, missing: 0 };
      const missing = [];
      const reading = [];
      const notHandsOn = [];
      let exercises = 0;
      let exercisesCovered = 0;
      for (const item of c.book) {
        for (const ref of item.by) {
          const problem = check(c, ref);
          if (problem) {
            failed = true;
            console.log(`  ✗ ${c.title} · ${item.id}: ${problem}`);
          }
        }
        const g = gradeOf(c, item.by);
        grade[g]++;
        if (g === "missing") missing.push(item);
        if (g === "reading") reading.push(item);
        if (g === "active" && item.kind === "activity") notHandsOn.push(item);
        if (item.kind === "exercise") {
          exercises++;
          if (g !== "missing" && g !== "reading") exercisesCovered++;
        }
      }
      const pct = (k) => Math.round((grade[k] / c.book.length) * 100) + "%";
      Object.assign(row, { doing: pct("doing"), active: pct("active"), reading: pct("reading"), missing: pct("missing"), exercises: `${exercisesCovered}/${exercises}` });
      row.gaps = [
        ...missing.map((m) => `❌ missing: ${m.text} (p. ${m.page})`),
        ...notHandsOn.map((m) => `🖐 book activity, not hands-on yet: ${m.text} (p. ${m.page})`),
        ...reading.map((m) => `📄 only read: ${m.text} (p. ${m.page})`),
      ];
    }
    rows.push(row);
  }

  console.log(`\n${SUBJECTS[subject].name} — coverage of the textbook\n`);
  console.log("Ch  Chapter                                        Doing  Active Read   Missing Exercises  Think-first cards  Questions");
  for (const r of rows) {
    const t = r.title.length > 44 ? r.title.slice(0, 43) + "…" : r.title;
    if (r.book) console.log(`${String(r.n).padStart(2)}  ${t.padEnd(46)} ${r.doing.padEnd(6)} ${r.active.padEnd(6)} ${r.reading.padEnd(6)} ${r.missing.padEnd(7)} ${r.exercises.padEnd(10)} ${r.cards.padEnd(18)} ${r.questions}`);
    else console.log(`${String(r.n).padStart(2)}  ${t.padEnd(46)} (book not mapped yet)                        ${r.cards.padEnd(18)} ${r.questions}`);
  }
  for (const r of rows.filter((r) => r.gaps?.length)) {
    console.log(`\nStill to make interactive — Ch ${r.n} ${r.title}:`);
    for (const g of r.gaps) console.log("  " + g);
  }
} finally {
  await vite.close();
}
process.exit(failed ? 1 : 0);

function stopOf(c, id) {
  return c.stops.find((s) => s.id === id);
}
// Returns a problem description if the reference doesn't point at something real.
function check(c, ref) {
  const [kind, rest] = [ref[0], ref.slice(2)];
  const [sid, part] = rest.split(".");
  const questions = [...c.stops.flatMap((s) => s.check), ...(c.challenge ?? [])];
  if (kind === "q") return questions.some((q) => q.id === rest) ? null : `no question "${rest}"`;
  const s = stopOf(c, sid);
  if (!s) return `no stop "${sid}" in ${ref}`;
  if (kind === "d") return s.discoveries.some((d) => d.id === part) ? null : `no discovery "${part}" in stop ${sid}`;
  if (kind === "t") return s.understand[+part - 1] ? null : `no Understand card ${part} in stop ${sid}`;
  if (kind === "c") return s.connect[+part - 1] ? null : `no Connect card ${part} in stop ${sid}`;
  if (kind === "w") return null;
  return `unknown reference "${ref}"`;
}
function gradeOf(c, by) {
  const kinds = by.map((ref) => {
    if (ref.startsWith("d:")) return "doing";
    if (ref.startsWith("q:") || ref.startsWith("w:")) return "active";
    if (ref.startsWith("t:")) {
      const [sid, n] = ref.slice(2).split(".");
      return stopOf(c, sid)?.understand[+n - 1]?.think ? "active" : "reading";
    }
    return "reading";
  });
  for (const g of ["doing", "active", "reading"]) if (kinds.includes(g)) return g;
  return "missing";
}
