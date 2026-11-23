import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { buildIncidentReportText } from '../src/app.js';
import { createScamShieldHybridEngine } from '../src/firebase-hybrid.mjs';
import { JUDGE_TOURS, SAMPLES } from '../src/samples.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('1. index.html contains proper ARIA radiogroup/radio and tablist/tab/tabpanel attributes (M3 Fix)', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.ok(html.includes('role="radiogroup"'));
  assert.ok(html.includes('role="radio"'));
  assert.ok(html.includes('aria-checked="true"'));
  assert.ok(html.includes('role="tablist"'));
  assert.ok(html.includes('role="tab"'));
  assert.ok(html.includes('aria-controls="panelSignals"'));
  assert.ok(html.includes('role="tabpanel"'));
});

test('2. index.html does NOT hardcode fake "Gemini Nano Ready" telemetry on initial load (C4 Fix)', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.ok(!html.includes('Chrome Gemini Nano Ready'));
  assert.ok(html.includes('Probing Chrome AI'));
});

test('3. All 4 Judge Tours reference valid samples and valid Hybrid Inference modes', () => {
  assert.equal(JUDGE_TOURS.length, 4);
  for (const tour of JUDGE_TOURS) {
    const sample = SAMPLES.find((s) => s.id === tour.sampleId);
    assert.ok(sample, `Missing sample for tour ${tour.id}`);
    assert.ok(['prefer_on_device', 'prefer_in_cloud', 'only_on_device', 'only_in_cloud'].includes(tour.mode));
  }
});

test('4. Incident Report generator defangs URLs and omits raw PII', async () => {
  const engine = createScamShieldHybridEngine();
  const res = await engine.analyze({ text: SAMPLES[0].text });
  const report = buildIncidentReportText(res);
  assert.ok(report.includes('chase-security-fraud-alert[.]xyz'), 'URL must be defanged in report');
  assert.ok(!report.includes('9876543210123'), 'Raw account must not appear in incident report');
  assert.ok(!report.includes('555-0199'), 'Raw phone must not appear in incident report');
});
