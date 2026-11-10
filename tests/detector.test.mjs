import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { analyzeMessage, getVerdict } from "../detector.mjs";
import { SAMPLES } from "../samples.mjs";

// URLs are assembled from parts so the test file never contains a live
// link a reader could tap by accident.
const SHORT = "https" + "://tinyurl.com/abc123";
const IP = "http" + "://203.0.113.10/login";
const HTTP_BRAND = "http" + "://bkash-offer-2026.com/verify";
const SAFE_LINK = "https" + "://bkash.com/help";

const SCAM_EN = "Congratulations! You have won $5,000 in the International Lottery. To claim your prize, verify your account now at bit.ly/claim-prize-5000 and send your OTP within 2 hours. Act now or your prize will expire!";
const SCAM_BN = "অভিনন্দন! আপনি লটারি জিতেছেন ৫০,০০০ টাকা। আপনার বিকাশ অ্যাকাউন্ট বন্ধ হয়ে যাবে। এখনই আপনার ওটিপি পাঠান এই লিংকে: http://192.168.1.1/bkash-offer";
const SCAM_PARCEL = "Your parcel is held at customs. Pay Tk 2,500 customs fee now via Nagad at nagad-pay.xyz/customs or it will be returned. Send money within 2 hours.";
const SAFE_APPT = "Your appointment with Dr. Rahman is confirmed for tomorrow at 10:00 AM at Popular Diagnostics. Please arrive 15 minutes early. Thank you.";
const SAFE_BKASH = "আপনার বিকাশ লেনদেন সফল হয়েছে। ৫০০ টাকা পেয়েছেন। TrxID 9XK2P4Q7। ব্যালান্স ১,২০০ টাকা।";

test("known English lottery scam scores >= 60", () => {
  const r = analyzeMessage(SCAM_EN);
  assert.ok(r.score >= 60, `expected >= 60, got ${r.score}`);
  assert.equal(r.verdict, "Likely scam");
});

test("known Bangla bKash scam scores >= 60", () => {
  const r = analyzeMessage(SCAM_BN);
  assert.ok(r.score >= 60, `expected >= 60, got ${r.score}`);
  assert.equal(r.verdict, "Likely scam");
});

test("parcel customs-fee scam scores >= 60", () => {
  const r = analyzeMessage(SCAM_PARCEL);
  assert.ok(r.score >= 60, `expected >= 60, got ${r.score}`);
  assert.equal(r.verdict, "Likely scam");
});

test("OTP-request messages never score Safe", () => {
  const variants = [
    "Please share your OTP 482913 to verify your account.",
    "Send your OTP now or your account will be blocked.",
    "আপনার ওটিপি পাঠান, নাহলে অ্যাকাউন্ট বন্ধ হয়ে যাবে।",
    "Give me your verification code to unlock the prize.",
  ];
  for (const v of variants) {
    const r = analyzeMessage(v);
    assert.notEqual(r.verdict, "Safe", `OTP request scored Safe: ${JSON.stringify(v)} -> ${r.score}`);
    assert.ok(r.score >= 30, `OTP request scored ${r.score}`);
  }
});

test("safe appointment reminder scores < 30", () => {
  const r = analyzeMessage(SAFE_APPT);
  assert.ok(r.score < 30, `expected < 30, got ${r.score}`);
  assert.equal(r.verdict, "Safe");
});

test("safe Bangla bKash confirmation scores < 30", () => {
  const r = analyzeMessage(SAFE_BKASH);
  assert.ok(r.score < 30, `expected < 30, got ${r.score}`);
  assert.equal(r.verdict, "Safe");
});

test("empty input is handled gracefully", () => {
  const r = analyzeMessage("");
  assert.equal(r.empty, true);
  assert.ok(r.score >= 0 && r.score <= 100);
  assert.equal(r.verdict, "Safe");
  assert.deepEqual(r.signals, []);
});

test("whitespace-only input is handled gracefully", () => {
  const r = analyzeMessage("   \n\t  ");
  assert.equal(r.empty, true);
  assert.equal(r.verdict, "Safe");
});

test("null and undefined input do not throw", () => {
  assert.doesNotThrow(() => analyzeMessage(null));
  assert.doesNotThrow(() => analyzeMessage(undefined));
  assert.doesNotThrow(() => analyzeMessage(12345));
  assert.equal(analyzeMessage(null).verdict, "Safe");
});

test("score is always within 0-100 across many inputs", () => {
  const inputs = [
    SCAM_EN, SCAM_BN, SCAM_PARCEL, SAFE_APPT, SAFE_BKASH, "",
    "a".repeat(200),
    "URGENT URGENT URGENT lottery won prize money OTP send money http://x.y",
    "বিকাশ নগদ রকেট টাকা পাঠান ওটিপি লটারি জিতেছেন অ্যাকাউন্ট বন্ধ পুলিশ",
    "Hello, how are you today?",
    "https://example.com/some/very/long/path?x=1&y=2 ".repeat(50),
  ];
  for (const input of inputs) {
    const r = analyzeMessage(input);
    assert.ok(Number.isInteger(r.score), "score must be an integer");
    assert.ok(r.score >= 0 && r.score <= 100, `score out of range: ${r.score}`);
  }
});

test("every triggered signal has a label, points and a non-empty explanation", () => {
  const inputs = [SCAM_EN, SCAM_BN, SCAM_PARCEL, SAFE_APPT, "Send money now via bKash"];
  for (const input of inputs) {
    const r = analyzeMessage(input);
    for (const s of [...r.signals, ...r.positives]) {
      assert.ok(typeof s.label === "string" && s.label.length > 0, "signal needs a label");
      assert.ok(typeof s.points === "number", "signal needs points");
      assert.ok(typeof s.explanation === "string" && s.explanation.length > 20, "signal needs an explanation");
    }
  }
});

test("a 5,000-character input does not crash or hang", () => {
  const long = ("Please verify your account at " + SHORT + " and send money. ").repeat(80).slice(0, 5000);
  assert.equal(long.length, 5000);
  const start = Date.now();
  const r = analyzeMessage(long);
  assert.ok(Date.now() - start < 1000, "analysis took too long");
  assert.ok(r.score >= 0 && r.score <= 100);
});

test("shortened URL triggers the short-url signal", () => {
  const r = analyzeMessage("Please open this link: " + SHORT);
  assert.ok(r.signals.some((s) => s.id === "short-url"), "short-url signal missing");
});

test("raw IP link triggers the ip-link signal", () => {
  const r = analyzeMessage("Login here: " + IP);
  assert.ok(r.signals.some((s) => s.id === "ip-link"), "ip-link signal missing");
});

test("http (non-https) link triggers the http-link signal", () => {
  const r = analyzeMessage("Click here: " + HTTP_BRAND);
  assert.ok(r.signals.some((s) => s.id === "http-link"), "http-link signal missing");
});

test("brand-name mismatch names the real domain in its explanation", () => {
  const r = analyzeMessage("Verify your bKash account here: " + HTTP_BRAND);
  const sig = r.signals.find((s) => s.id === "brand-mismatch");
  assert.ok(sig, "brand-mismatch signal missing");
  assert.ok(sig.explanation.includes("bkash-offer-2026.com"), "explanation should name the fake domain");
  assert.ok(sig.explanation.includes("bkash.com"), "explanation should name the official domain");
});

test("official brand domain does not trigger brand mismatch", () => {
  const r = analyzeMessage("See our help page here: " + SAFE_LINK);
  assert.ok(!r.signals.some((s) => s.id === "brand-mismatch"), "official domain must not mismatch");
});

test("verdict boundaries are exact", () => {
  assert.equal(getVerdict(0), "Safe");
  assert.equal(getVerdict(29), "Safe");
  assert.equal(getVerdict(30), "Caution");
  assert.equal(getVerdict(59), "Caution");
  assert.equal(getVerdict(60), "Likely scam");
  assert.equal(getVerdict(100), "Likely scam");
});

test("Bangla threat language is detected", () => {
  const r = analyzeMessage("আপনার অ্যাকাউন্ট বন্ধ হয়ে যাবে। পুলিশ আসবে।");
  assert.ok(r.signals.some((s) => s.id === "threat"), "threat signal missing for Bangla text");
  assert.ok(r.score >= 30, "threat alone should reach at least Caution");
});

test("a +880 personal number alone does not push a message to Caution", () => {
  const r = analyzeMessage("Please call me at +8801712345678 when you are free. Thanks!");
  assert.equal(r.verdict, "Safe");
});

test("an OTP warning ('do not share your OTP') stays Safe", () => {
  const r = analyzeMessage("Your OTP is 482913. Do not share it with anyone. bKash never asks for your OTP.");
  assert.equal(r.verdict, "Safe");
  assert.ok(!r.signals.some((s) => s.id === "otp-request"), "warning must not trigger otp-request");
});

test("all 6 built-in samples produce their expected verdicts", () => {
  const expected = { scam: "Likely scam", suspicious: "Caution", safe: "Safe" };
  assert.equal(SAMPLES.length, 6, "exactly 6 built-in samples");
  const counts = { scam: 0, suspicious: 0, safe: 0 };
  for (const s of SAMPLES) {
    const r = analyzeMessage(s.text);
    assert.equal(r.verdict, expected[s.category], `sample ${s.id}: got ${r.verdict}, expected ${expected[s.category]}`);
    counts[s.category] += 1;
  }
  assert.deepEqual(counts, { scam: 3, suspicious: 2, safe: 1 });
});

test("browser bundles produce identical results to the ES modules", () => {
  const root = path.dirname(fileURLToPath(import.meta.url));
  const sandbox = { window: null };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(path.join(root, "..", "detector.browser.js"), "utf8"), sandbox);
  vm.runInContext(readFileSync(path.join(root, "..", "samples.browser.js"), "utf8"), sandbox);
  const browserAnalyze = sandbox.ScamShieldDetector.analyzeMessage;
  assert.equal(typeof browserAnalyze, "function", "browser bundle must expose analyzeMessage");
  // Objects created inside a vm context have a different Object prototype,
  // so compare through JSON instead of deepStrictEqual.
  const asJson = (v) => JSON.stringify(v);
  assert.equal(asJson(sandbox.ScamShieldSamples), asJson(SAMPLES), "browser samples must match samples.mjs");
  for (const input of [SCAM_EN, SCAM_BN, SCAM_PARCEL, SAFE_APPT, "", "Send money now via bKash"]) {
    assert.equal(asJson(browserAnalyze(input)), asJson(analyzeMessage(input)), `browser bundle differs for: ${input.slice(0, 40)}`);
  }
});

// ---- Audit fixes, Nov 10 2026: false positives the skeptical audit found
// by running the detector against legitimate messages. --------------------

test("audit: official .com.bd domains are NOT brand impersonation", () => {
  const legit = [
    "See our help page here: " + "https" + "://bracbank.com.bd/help",
    "See our help page here: " + "https" + "://grameenphone.com.bd/",
    "See our help page here: " + "https" + "://help.bkash.com.bd/support",
  ];
  for (const text of legit) {
    const r = analyzeMessage(text);
    assert.ok(!r.signals.some((s) => s.id === "brand-mismatch"), `official domain wrongly flagged: ${text}`);
    assert.equal(r.verdict, "Safe", `official domain link must stay Safe: ${text} -> ${r.score}`);
  }
});

test("audit: a fake brand domain is still flagged after the .bd fix", () => {
  const r = analyzeMessage("Verify your bKash account here: " + HTTP_BRAND);
  assert.ok(r.signals.some((s) => s.id === "brand-mismatch"), "bkash-offer-2026.com must still mismatch");
});

test("audit: an invalid IP (999.999.999.999) is NOT a raw-IP link", () => {
  const r = analyzeMessage("Login here: " + "https" + "://999.999.999.999/login");
  assert.ok(!r.signals.some((s) => s.id === "ip-link"), "999.999.999.999 is not a valid IP address");
});

test("audit: a benign police mention stays Safe (police clearance certificate)", () => {
  const r = analyzeMessage("Your police clearance certificate is ready for collection.");
  assert.ok(!r.signals.some((s) => s.id === "threat"), "benign police mention must not be a threat");
  assert.equal(r.verdict, "Safe");
});

test("audit: a real police threat still triggers the threat signal", () => {
  const r = analyzeMessage("Police will come to your house if you do not pay within 2 hours.");
  assert.ok(r.signals.some((s) => s.id === "threat"), "police-will-come threat must still fire");
  assert.ok(r.score >= 30, "real police threat must reach at least Caution");
});

test("audit: a benign raffle winner stays Safe (bare winner/prize is not a lottery scam)", () => {
  const r = analyzeMessage("You are the winner of our school raffle! Come collect your prize.");
  assert.ok(!r.signals.some((s) => s.id === "lottery"), "benign raffle winner must not be a lottery scam");
  assert.equal(r.verdict, "Safe");
});

test("audit: 'You won a prize' still triggers the lottery signal", () => {
  const r = analyzeMessage("Congratulations! You won a prize. Send your OTP to claim it.");
  assert.ok(r.signals.some((s) => s.id === "lottery"), "'you won a prize' must still fire");
  assert.ok(r.signals.some((s) => s.id === "otp-request"), "OTP request must still fire");
});
