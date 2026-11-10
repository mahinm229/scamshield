// UI guard tests — regression tests for audit flaws #8, #9 and #11.
// Loads the real browser bundles (detector.browser.js, samples.browser.js)
// and the real app.js in a vm sandbox against a minimal fake DOM, then
// drives the actual buttons. No browser binary needed.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(path.join(root, rel), "utf8");

// Minimal DOM element: enough for app.js (getElementById, createElement,
// textContent, appendChild, addEventListener/click, style, setAttribute,
// hidden, value, focus, scrollIntoView).
class El {
  constructor(tag) {
    this.tagName = (tag || "div").toUpperCase();
    this.children = [];
    this.style = {};
    this.hidden = false;
    this.value = "";
    this.className = "";
    this._text = "";
    this._listeners = {};
  }
  get textContent() { return this._text; }
  set textContent(v) { this._text = String(v); this.children = []; }
  appendChild(child) { this.children.push(child); return child; }
  addEventListener(type, fn) { (this._listeners[type] ??= []).push(fn); }
  click() { for (const fn of this._listeners.click || []) fn.call(this); }
  setAttribute(k, v) { this[k] = v; }
  focus() {}
  scrollIntoView() {}
}

function makePage(search = "") {
  const ids = ["message", "analyze", "clear", "count", "result", "verdict",
    "score", "bar", "bar-fill", "echo", "signals", "positives", "next-steps",
    "samples", "form-error"];
  const byId = {};
  for (const id of ids) byId[id] = new El("div");
  // Match the HTML: <section id="result" hidden> and <p id="form-error" hidden>.
  byId.result.hidden = true;
  byId["form-error"].hidden = true;
  byId.message = new El("textarea");
  byId.analyze = new El("button");
  byId.clear = new El("button");
  const document = {
    getElementById: (id) => byId[id] || null,
    createElement: (tag) => new El(tag),
  };
  const sandbox = { window: null, document, URLSearchParams, console };
  sandbox.window = sandbox;
  sandbox.window.location = { search };
  vm.createContext(sandbox);
  for (const file of ["detector.browser.js", "samples.browser.js", "app.js"]) {
    vm.runInContext(read(file), sandbox, { filename: file });
  }
  return { byId, sandbox };
}

const SCAM_TEXT = "Congratulations! You have won $5,000 in the International Lottery. To claim your prize, verify your account now and send your OTP within 2 hours.";

test("audit #8: Analyze with an empty message shows a visible explanation, not silence", () => {
  const { byId } = makePage();
  byId.message.value = "   ";
  byId.analyze.click();
  assert.equal(byId.result.hidden, true, "no result may appear for empty input");
  assert.equal(byId["form-error"].hidden, false, "an error banner must be shown");
  assert.match(byId["form-error"].textContent, /Paste a message first/);
});

test("audit #8: a real message clears the error and shows the verdict at once", () => {
  const { byId } = makePage();
  byId.message.value = "   ";
  byId.analyze.click();
  assert.equal(byId["form-error"].hidden, false);
  byId.message.value = SCAM_TEXT;
  byId.analyze.click();
  assert.equal(byId["form-error"].hidden, true, "error must clear on a successful check");
  assert.equal(byId["form-error"].textContent, "");
  assert.equal(byId.result.hidden, false);
  assert.match(byId.verdict.textContent, /Likely scam/);
  assert.match(byId.score.textContent, /\/ 100/);
});

test("audit #9: Clear then Analyze again works — no Reset needed, fully reversible", () => {
  const { byId } = makePage();
  byId.message.value = SCAM_TEXT;
  byId.analyze.click();
  assert.equal(byId.result.hidden, false);
  byId.clear.click();
  assert.equal(byId.result.hidden, true, "Clear must hide the result");
  assert.equal(byId.message.value, "");
  assert.equal(byId["form-error"].hidden, true, "Clear must also clear the error");
  byId.message.value = SCAM_TEXT;
  byId.analyze.click();
  assert.equal(byId.result.hidden, false, "analyzing again after Clear must work");
  assert.match(byId.verdict.textContent, /Likely scam/);
});

test("audit #11: tapping a sample analyzes synchronously — result is there immediately", () => {
  const { byId } = makePage();
  assert.ok(byId.samples.children.length >= 6, "all 6 sample buttons must be built");
  const start = Date.now();
  byId.samples.children[0].click();
  // No await, no timers: the verdict must already be visible on the
  // very next line after the click.
  assert.equal(byId.result.hidden, false, "sample click must show the result synchronously");
  assert.match(byId.verdict.textContent, /Likely scam/);
  assert.ok(Date.now() - start < 100, "sample analysis must finish in under 100ms");
});

test("audit #8: an unknown ?sample= deep link fails silently-safe, never throws", () => {
  const { byId } = makePage("?sample=does-not-exist");
  assert.equal(byId.result.hidden, true, "unknown sample must not show a result");
  assert.equal(byId["form-error"].hidden, true, "unknown sample must not show an error either");
});
