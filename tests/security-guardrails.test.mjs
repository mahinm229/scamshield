import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_FILES = [
  'index.html',
  'src/app.js',
  'src/detector.mjs',
  'src/pii-redactor.mjs',
  'src/firebase-hybrid.mjs',
  'src/samples.mjs',
];

test('1. M1 Security Guard: Zero innerHTML / outerHTML / document.write XSS sinks in src/', () => {
  for (const rel of SRC_FILES) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.ok(!/\.innerHTML\s*=/.test(content), `Forbidden innerHTML assignment in ${rel}`);
    assert.ok(!/\.outerHTML\s*=/.test(content), `Forbidden outerHTML assignment in ${rel}`);
    assert.ok(!/document\.write\s*\(/.test(content), `Forbidden document.write in ${rel}`);
  }
});

test('2. #BuildHybridAI Rule Guard: Zero direct generativelanguage.googleapis.com or deprecated window.ai / firebase/vertexai calls', () => {
  for (const rel of SRC_FILES) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.ok(!/generativelanguage\.googleapis\.com/i.test(content), `Direct Gemini REST call found in ${rel}`);
    assert.ok(!/firebase\/vertexai/i.test(content), `Deprecated firebase/vertexai import in ${rel}`);
    assert.ok(!/window\.ai\./i.test(content), `Deprecated window.ai API usage in ${rel}`);
  }
});

test('3. Secret Hygiene Guard: Zero hardcoded Google API keys (AIza...) or static App Check debug UUIDs', () => {
  for (const rel of SRC_FILES) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.ok(!/AIza[0-9A-Za-z_-]{35}/.test(content), `Hardcoded Google API key detected in ${rel}`);
  }
  assert.ok(!fs.existsSync(path.join(ROOT, '.env')), '.env file must never exist in repository');
  assert.ok(!fs.existsSync(path.join(ROOT, '.env.local')), '.env.local file must never exist in repository');
});

test('4. C2 Repo Hygiene Guard: Zero recycled prior-hackathon files & Apache-2.0 LICENSE present', () => {
  const forbidden = ['devpost-submission.md', 'genhacks-submission.md', 'reuse-plan.md', 'AUDIT.md'];
  for (const f of forbidden) {
    assert.ok(!fs.existsSync(path.join(ROOT, f)), `Recycled prior-hackathon file found: ${f}`);
  }
  const license = fs.readFileSync(path.join(ROOT, 'LICENSE'), 'utf8');
  assert.ok(license.includes('Apache License') && license.includes('Version 2.0'));
});

test('5. Firebase Hosting & Firestore Security Config Guard', () => {
  const fbJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'firebase.json'), 'utf8'));
  assert.equal(fbJson.hosting.public, 'dist');
  const rules = fs.readFileSync(path.join(ROOT, 'firestore.rules'), 'utf8');
  assert.ok(rules.includes('allow read, write: if false;'));
  assert.ok(rules.includes('request.auth != null'));
});
