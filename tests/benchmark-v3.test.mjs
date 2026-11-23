import test from 'node:test';
import assert from 'node:assert/strict';
import { runTwentyCaseBenchmark } from '../src/benchmark-suite.mjs';
import { AGENCY_HEADERS, buildIncidentReportText, computeEvidenceSha256 } from '../src/app.js';
import { createScamShieldHybridEngine } from '../src/firebase-hybrid.mjs';
import { SAMPLES } from '../src/samples.mjs';

test('1. Live 20-Case Adversarial Security & PII Benchmark passes 20/20 (100% Accuracy)', () => {
  const bench = runTwentyCaseBenchmark();
  assert.equal(bench.total, 20);
  const failed = bench.results.filter((r) => !r.passed);
  assert.equal(bench.passed, 20, `Failed cases: ${JSON.stringify(failed)}`);
  assert.equal(bench.accuracyPct, 100);
});

test('2. Official Complaint Generator supports BTRC 1212, BD Police Cyber Support, and US FTC/IC3', async () => {
  const engine = createScamShieldHybridEngine();
  const res = await engine.analyze({ text: SAMPLES[0].text });
  for (const [key, header] of Object.entries(AGENCY_HEADERS)) {
    const report = buildIncidentReportText(res, key);
    assert.ok(report.includes(header), `Missing header for ${key}`);
    assert.ok(!report.includes('01712345678'), `Raw phone leaked in ${key} report`);
  }
});

test('3. Cryptographic SHA-256 Evidence Fingerprint returns deterministic 64-hex digest', async () => {
  const h1 = await computeEvidenceSha256('ScamShield v3.0 Evidence');
  const h2 = await computeEvidenceSha256('ScamShield v3.0 Evidence');
  assert.equal(h1, h2);
  assert.match(h1, /^[0-9a-f]{64}$/);
});
