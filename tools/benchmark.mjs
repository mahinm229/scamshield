// ScamShield benchmark — `npm run benchmark`.
// Measures analyzeMessage throughput on the built-in samples plus a
// 5,000-character input, and asserts the samples still score as expected.
// Exits non-zero if any sample verdict is wrong.
import { analyzeMessage } from "../detector.mjs";
import { SAMPLES } from "../samples.mjs";

const expected = { scam: "Likely scam", suspicious: "Caution", safe: "Safe" };
for (const s of SAMPLES) {
  const r = analyzeMessage(s.text);
  if (r.verdict !== expected[s.category]) {
    console.error(`BENCHMARK FAIL: sample ${s.id} scored ${r.verdict}, expected ${expected[s.category]}`);
    process.exit(1);
  }
}

// Long input URL assembled from parts, like the test suite does, so this
// file never contains a live link a reader could tap by accident.
const longInput = ("Please verify your account at " + "https" + "://tinyurl.com/abc123 and send money. ").repeat(80).slice(0, 5000);
const inputs = [...SAMPLES.map((s) => s.text), longInput];
const RUNS = 2000;
const start = performance.now();
for (let i = 0; i < RUNS; i++) analyzeMessage(inputs[i % inputs.length]);
const ms = performance.now() - start;
console.log(`benchmark: ${RUNS} analyses in ${ms.toFixed(1)} ms — ${(RUNS / (ms / 1000)).toFixed(0)} analyses/sec, ${(ms / RUNS).toFixed(3)} ms each`);
const longResult = analyzeMessage(longInput);
console.log(`benchmark: 5,000-char input scores ${longResult.score}/100 (${longResult.verdict})`);
