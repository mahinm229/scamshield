// Audit guardrails — regression tests for the Nov 10 2026 skeptical audit.
// Each test pins one audit finding so it cannot silently come back:
// the repo is a static, on-device detector with no server, no API, no
// auth surface, no payments, no database and no hashing — so the
// PayPal/server items in the audit checklist are N/A *by construction*,
// and these tests prove the construction instead of trusting a claim.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeMessage } from "../detector.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(path.join(root, rel), "utf8");
const pkg = JSON.parse(read("package.json"));

// ---- Flaw 1: startup & CI location -------------------------------------
test("audit #1: npm start and npm run benchmark exist (no missing scripts)", () => {
  assert.equal(typeof pkg.scripts.start, "string", "package.json needs a start script");
  assert.equal(typeof pkg.scripts.benchmark, "string", "package.json needs a benchmark script");
  assert.equal(typeof pkg.scripts.test, "string");
  assert.equal(typeof pkg.scripts["build:browser"], "string");
});

test("audit #1: CI lives at .github/workflows/ci.yml, never at the repo root", () => {
  assert.ok(existsSync(path.join(root, ".github", "workflows", "ci.yml")), ".github/workflows/ci.yml must exist");
  assert.ok(!existsSync(path.join(root, "ci.yml")), "ci.yml at the repo root would never run on GitHub Actions");
  const ci = read(".github/workflows/ci.yml");
  assert.ok(ci.includes("npm test"), "CI must run the tests");
  assert.ok(ci.includes("build:browser"), "CI must check the browser bundles are in sync");
  assert.ok(ci.includes("npm start"), "CI must smoke-test npm start");
});

test("audit #1: no dependencies — npm start/test/benchmark run with Node alone", () => {
  assert.ok(!pkg.dependencies || Object.keys(pkg.dependencies).length === 0, "zero runtime dependencies expected");
});

// ---- Flaws 2–7: the surfaces that must NOT exist -----------------------
const SOURCE_FILES = ["detector.mjs", "detector.browser.js", "app.js", "samples.mjs", "samples.browser.js", "index.html", "server.mjs"];
const allSource = SOURCE_FILES.map(read).join("\n");

test("audit #2/#3: no API surface and no network calls anywhere in the app", () => {
  assert.ok(!allSource.includes("/api/"), "no /api/ endpoints may exist");
  assert.ok(!allSource.includes("fetch("), "no fetch() calls may exist");
  assert.ok(!allSource.includes("XMLHttpRequest"), "no XHR may exist");
  assert.ok(!allSource.includes("sendBeacon"), "no beacon calls may exist");
  assert.ok(!allSource.includes("WebSocket"), "no WebSocket may exist");
  // The detector itself cannot reach the network: it imports nothing.
  assert.ok(!/^import /m.test(read("detector.mjs")), "detector.mjs must have zero imports");
});

test("audit #2: no auth surface — no tokens, sessions or render.yaml", () => {
  // Note: the words "password"/"OTP" appear in user-facing safety advice
  // ("do not share your password") — that is copy, not an auth mechanism.
  // What must not exist is any token/session/login machinery.
  assert.ok(!/authToken|generateValue|localStorage|sessionStorage|requireAuth|isAuthenticated/i.test(allSource), "no token/session/auth machinery may exist");
  assert.ok(!existsSync(path.join(root, "render.yaml")), "no render.yaml deploy config exists");
});

test("audit #4/#5/#6: no payments, no AI tools, no shared mutable state", () => {
  assert.ok(!allSource.includes("PENDING"), "no payment settlement states exist");
  assert.ok(!allSource.includes("humanApproved"), "no bare humanApproved boolean may exist");
  assert.ok(!allSource.includes("approvalRecord"), "no approvalRecord machinery exists");
  assert.ok(!allSource.includes("pg_try_advisory"), "no Postgres advisory locks exist");
  assert.ok(!allSource.includes("new Map("), "no in-memory Map state exists");
  // The detector is a pure function: interleaved calls cannot leak state.
  const scam = analyzeMessage("Send your OTP now or your account will be blocked.");
  const safe = analyzeMessage("Your appointment is confirmed for tomorrow at 10:00 AM.");
  const scamAgain = analyzeMessage("Send your OTP now or your account will be blocked.");
  assert.equal(JSON.stringify(scamAgain), JSON.stringify(scam), "repeated call must be identical");
  assert.notEqual(safe.verdict, scam.verdict, "interleaved call must not leak state");
});

test("audit #7: no hashing at all — no toy hash masquerading as SHA-256", () => {
  assert.ok(!/sha256|SHA-256|createHash/i.test(allSource), "no hash function exists to misrepresent");
});

// ---- Flaw 10: sticky header & mid-word breaks ---------------------------
test("audit #10: header is sticky at top:0 and nothing breaks words mid-token", () => {
  const css = read("styles.css");
  const headerRule = css.slice(css.indexOf("header {"), css.indexOf("}", css.indexOf("header {")) + 1);
  assert.ok(headerRule.includes("position: sticky"), "header must be position: sticky");
  assert.ok(headerRule.includes("top: 0"), "header must be pinned at top: 0");
  assert.ok(!/word-break:\s*break-all/.test(css), "word-break: break-all must never appear");
  assert.ok(css.includes("overflow-wrap: break-word"), "long tokens may only break when they would overflow");
});

// ---- Flaw 11: instant UI — no timers anywhere in the UI -----------------
test("audit #11: UI has no timers — a click updates the result synchronously", () => {
  const app = read("app.js");
  assert.ok(!app.includes("setTimeout"), "no setTimeout in the UI");
  assert.ok(!app.includes("setInterval"), "no setInterval in the UI");
});

// ---- Repo hygiene found during the audit --------------------------------
test("audit: MIT LICENSE file exists (package.json already claimed MIT)", () => {
  assert.ok(existsSync(path.join(root, "LICENSE")), "LICENSE file must exist");
  assert.ok(read("LICENSE").includes("MIT License"), "LICENSE must be the MIT text");
  assert.ok(read("README.md").includes("npm start"), "README must document npm start");
});
