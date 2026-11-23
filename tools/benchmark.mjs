import { performance } from 'node:perf_hooks';
import { analyzeDeterministic } from '../src/detector.mjs';
import { redactPII } from '../src/pii-redactor.mjs';
import { SAMPLES } from '../src/samples.mjs';

const ITERATIONS = 2000;
const start = performance.now();

for (let i = 0; i < ITERATIONS; i++) {
  const sample = SAMPLES[i % SAMPLES.length];
  redactPII(sample.text);
  analyzeDeterministic(sample.text);
}

const totalMs = performance.now() - start;
const avgMs = totalMs / ITERATIONS;
const opsPerSec = Math.round((ITERATIONS / totalMs) * 1000);

console.log(`ScamShield AI v3.0 Local Triage + Zero-Knowledge PII Redaction Benchmark`);
console.log(`Iterations : ${ITERATIONS}`);
console.log(`Total time : ${totalMs.toFixed(2)} ms`);
console.log(`Avg / scan : ${avgMs.toFixed(4)} ms`);
console.log(`Throughput : ${opsPerSec.toLocaleString()} scans/sec`);

if (avgMs > 5) {
  console.error('Benchmark regression: average scan exceeded 5 ms threshold');
  process.exit(1);
}
