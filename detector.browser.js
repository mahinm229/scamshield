// ScamShield — deterministic, explainable scam-message detector.
// 100% on-device: no network calls, no dependencies, no tracking.
// Built Nov 10, 2026 for SafeSpace Hacks. Single source of truth:
// `tools/build-browser.mjs` generates detector.browser.js from this file
// (strips the `export` keywords) so the same logic runs in the browser
// from file:// as a plain classic script.

const VERSION = "1.0.0";

// Verdict bands (inclusive bounds).
function getVerdict(score) {
  if (score >= 60) return "Likely scam";
  if (score >= 30) return "Caution";
  return "Safe";
}

const SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "cutt.ly",
  "rb.gy", "shorturl.at", "rebrand.ly", "s.id", "ow.ly", "buff.ly",
  "tiny.cc", "bl.ink", "qr.ae", "v.gd", "shorte.st", "adf.ly",
  "bc.vc", "soo.gd", "t.ly", "gg.gg", "tr.im", "cli.re"
]);

// Brand token -> official domain. A link that *mentions* a brand but goes
// somewhere else is a classic impersonation signal.
const BRANDS = [
  { token: "bkash", official: "bkash.com", label: "bKash" },
  { token: "nagad", official: "nagad.com.bd", label: "Nagad" },
  { token: "rocket", official: "dutchbanglabank.com", label: "Rocket / Dutch-Bangla Bank" },
  { token: "dbbl", official: "dutchbanglabank.com", label: "Dutch-Bangla Bank" },
  { token: "brac", official: "bracbank.com", label: "BRAC Bank" },
  { token: "citybank", official: "thecitybank.com", label: "City Bank" },
  { token: "daraz", official: "daraz.com.bd", label: "Daraz" },
  { token: "grameenphone", official: "grameenphone.com", label: "Grameenphone" },
  { token: "robi", official: "robi.com.bd", label: "Robi" },
  { token: "pathao", official: "pathao.com", label: "Pathao" },
  { token: "facebook", official: "facebook.com", label: "Facebook" },
  { token: "google", official: "google.com", label: "Google" },
  { token: "whatsapp", official: "whatsapp.com", label: "WhatsApp" },
  { token: "paypal", official: "paypal.com", label: "PayPal" }
];

const BASE_SCORE = 25;

const BARE_TLDS = "com|net|org|io|xyz|ly|me|co|bd|info|biz|online|site|top|club|live|app|dev|gg|cc|to|is|gd|st|vc|at|am|fm|tv|pw|tk|ml|ga|cf|gq";

function findUrls(text) {
  const withScheme = text.match(/https?:\/\/[^\s"'<>\])]+/gi) || [];
  // Scam messages often paste a bare link with no scheme ("bit.ly/abc").
  const bare = text.match(new RegExp(`\\b(?:www\\.)?[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.(?:${BARE_TLDS})(?:\\/[^\\s"'<>\\])]*)?`, "gi")) || [];
  const all = [...withScheme, ...bare];
  return [...new Set(all.map((u) => u.replace(/[.,;:!?]+$/, "")))];
}

// Plain string parsing on purpose (no `new URL`): the detector must behave
// identically in Node, in a vm sandbox, and in every browser, including
// environments where the URL global is missing.
function hostnameOf(url) {
  const noScheme = url.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
  const hostPort = noScheme.split(/[/:?#]/)[0];
  return hostPort.toLowerCase().replace(/^www\./, "");
}

// An official domain, its subdomains, and its Bangladeshi .bd variant
// (bkash.com.bd, bracbank.com.bd, grameenphone.com.bd, …) are all genuine.
// Without the .bd variant, a real bank link was wrongly flagged as
// impersonation (audit fix, Nov 10 2026).
function isOfficialHost(host, official) {
  return (
    host === official ||
    host.endsWith("." + official) ||
    host === official + ".bd" ||
    host.endsWith("." + official + ".bd")
  );
}

// A dotted quad is only a raw-IP link when every octet is 0-255.
// 999.999.999.999 is not an address at all (audit fix, Nov 10 2026).
function isValidIpv4(host) {
  const parts = host.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
}

function hasAny(text, words) {
  return words.some((w) => text.includes(w));
}

// An OTP warning ("do not share your OTP") is protective advice, not a
// request — it must never trigger the OTP-request signal.
function hasOtpWarning(text) {
  return (
    text.includes("do not share") ||
    text.includes("don't share") ||
    text.includes("never share") ||
    text.includes("do not send") ||
    text.includes("কাউকে দেবেন না") ||
    text.includes("কাউকে দিবেন না") ||
    text.includes("শেয়ার করবেন না") ||
    text.includes("কাউকে বলবেন না")
  );
}

/**
 * Analyze a message. Never throws on bad input; never returns a score
 * outside 0-100; never calls the network.
 * Returns { score, verdict, signals, positives, empty } where
 * signals are risk signals { id, points, label, explanation } and
 * positives are reassuring facts { id, points (negative), label, explanation }.
 */
function analyzeMessage(input) {
  const raw = typeof input === "string" ? input : "";
  const text = raw.toLowerCase();
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return { score: 0, verdict: "Safe", signals: [], positives: [], empty: true };
  }

  const signals = [];
  const positives = [];
  const add = (id, points, label, explanation) =>
    signals.push({ id, points, label, explanation });

  // ---- Link signals ----
  const urls = findUrls(raw);
  const hosts = urls.map(hostnameOf).filter(Boolean);

  if (urls.length > 0) {
    if (hosts.some((h) => SHORTENERS.has(h) || [...SHORTENERS].some((s) => h.endsWith("." + s)))) {
      add("short-url", 20, "Shortened link",
        "The message uses a shortened link (like bit.ly). Short links hide the real destination, so you cannot tell where it goes before tapping.");
    }
    const ipHost = hosts.find((h) => isValidIpv4(h));
    if (ipHost) {
      add("ip-link", 30, "Link to a raw IP address",
        `The link goes straight to a numbered address (${ipHost}) instead of a named website. Real companies link to their own named domain.`);
    }
    if (urls.some((u) => u.toLowerCase().startsWith("http://"))) {
      add("http-link", 5, "Unsafe (http) link",
        "The link starts with http, not https. Anything you type there can be read or changed on the way.");
    }
    for (const host of hosts) {
      const brand = BRANDS.find((b) => host.includes(b.token));
      if (brand && !isOfficialHost(host, brand.official)) {
        add("brand-mismatch", 15, "Link pretends to be " + brand.label,
          `The link mentions ${brand.label} but goes to ${host}, not the official ${brand.official}. Scammers copy brand names into fake addresses.`);
        break;
      }
    }
  }

  // ---- Payment lures ----
  const hasBrand = hasAny(text, ["bkash", "nagad", "rocket", "বিকাশ", "নগদ", "রকেট", "brac", "dbbl"]);
  const hasMoneyVerb = hasAny(text, [
    "send money", "pay now", "pay tk", "transfer", "send tk", "deposit",
    "টাকা পাঠান", "টাকা পাঠিয়ে", "টাকা দিন", "পেমেন্ট করুন", "টাকা জমা",
    "টাকা পাঠাতে", "পাঠিয়ে দিন"
  ]);
  if ((hasBrand && hasMoneyVerb) || text.includes("send money") || text.includes("টাকা পাঠান")) {
    add("payment-lure", 20, "Asks you to send money",
      "The message asks you to send money, often through bKash, Nagad or Rocket. Real companies never ask for payment by a random link in a message.");
  }

  // ---- OTP request ----
  const hasOtp = text.includes("otp") || text.includes("ওটিপি") || text.includes("verification code");
  const hasShareVerb = hasAny(text, [
    "share", "send", "give", "tell", "provide",
    "পাঠান", "শেয়ার", "দিন", "বলুন"
  ]);
  if (hasOtp && hasShareVerb && !hasOtpWarning(text)) {
    add("otp-request", 30, "Asks for your OTP",
      "The message asks you to share your OTP or verification code. An OTP is the key to your account — no real company ever asks for it.");
  }

  // ---- Account verification pressure ----
  if (hasAny(text, ["verify your account", "verify account", "account verification",
      "account needs verification", "needs verification", "verification required",
      "অ্যাকাউন্ট যাচাই", "অ্যাকাউন্ট ভেরিফাই", "অ্যাকাউন্টটি যাচাই"])) {
    add("verify-account", 10, "Pushes you to “verify” your account",
      "“Verify your account” is a common cover story for getting you to open a fake login page and type your password.");
  }

  // ---- Urgency ----
  if (
    /within \d+\s*(hour|hours|minute|minutes|min|mins)/.test(text) ||
    hasAny(text, ["immediately", "urgent", "act now", "today only", "expires", "expire",
      "এখনই", "জরুরি", "দ্রুত", "ঘণ্টার মধ্যে", "মিনিটের মধ্যে", "আজই", "শেষ সুযোগ",
      "hurry", "limited time"])
  ) {
    add("urgency", 15, "Creates urgency",
      "The message rushes you (“within 2 hours”, “act now”). Pressure is used so you act before you think.");
  }

  // ---- Threats ----
  // Bare "police" alone is NOT a threat: "your police clearance
  // certificate is ready" is a legitimate message (audit fix, Nov 10
  // 2026). Police only counts inside a threat phrase, and account
  // closure / legal action / arrest still count on their own.
  if (hasAny(text, [
      "account will close", "account will be closed", "account will be blocked",
      "account will be suspended", "account closed", "account suspended",
      "legal action", "arrest", "case will be filed",
      "police will", "police are coming", "police action", "police case",
      "অ্যাকাউন্ট বন্ধ", "বন্ধ হয়ে যাবে", "আইনি ব্যবস্থা",
      "গ্রেফতার", "মামলা হবে", "অ্যাকাউন্টটি বন্ধ",
      "পুলিশ আসবে", "পুলিশ ধরবে", "পুলিশ আসছে"
  ])) {
    add("threat", 20, "Threatens you",
      "The message threatens that your account will close or that police or legal action is coming. Real services warn you inside their own app, not by threat in a message.");
  }

  // ---- Lottery / prize ----
  // Bare "winner" / "prize" alone is NOT a lottery scam: "you are the
  // winner of our school raffle" is benign (audit fix, Nov 10 2026).
  // It only counts when someone claims you *won* something, or a
  // lottery is paired with winning.
  const hasLotteryWord = text.includes("lottery") || text.includes("লটারি");
  const hasWon =
    /you (have )?won\b/.test(text) ||
    /\bwon\s+(a|the|an|tk|\$|£|€|\d)/.test(text) ||
    text.includes("congratulations! you") ||
    (hasLotteryWord && (text.includes("won") || text.includes("win") || text.includes("জিতেছেন") || text.includes("জিতলেন"))) ||
    (text.includes("পুরস্কার") && text.includes("জিতেছেন"));
  if (hasWon) {
    add("lottery", 20, "Claims you won a lottery or prize",
      "“You won a lottery” is one of the oldest scams. You cannot win a lottery you never entered.");
  }

  // ---- Job offer fee ----
  const hasJob = hasAny(text, ["job", "চাকরি", "offer letter", "interview", "নিয়োগ"]);
  const hasFee = hasAny(text, ["fee", "ফি", "registration", "deposit", "জামানত", "processing"]);
  if (hasJob && hasFee) {
    add("job-fee", 20, "Job offer that asks for a fee",
      "A real employer never asks you to pay a fee, deposit or registration charge to get a job.");
  }

  // ---- Parcel held / customs ----
  const hasParcel = hasAny(text, ["parcel", "package", "পার্সেল", "কুরিয়ার"]);
  const hasHold = hasAny(text, [
    "held", "customs", "stuck", "failed delivery", "redelivery", "pay customs",
    "আটকে", "কাস্টমস", "ডেলিভারি ব্যর্থ"
  ]);
  if (hasParcel && hasHold) {
    add("parcel", 20, "Parcel held — asks for a fee",
      "“Your parcel is held, pay customs” is a common trick. Real couriers do not demand payment through a link in a message.");
  }

  // ---- Personal mobile number as sender ----
  const phoneMatch = raw.match(/\+?880\s?1[3-9]\d{8}/);
  if (phoneMatch) {
    add("personal-number", 10, "Sent from a personal mobile number",
      "The message points to a personal mobile number (+880…) instead of an official short code or company number. Official messages come from a named sender, not a personal SIM.");
  }

  // ---- Positive signals (lower the score) ----
  // "No links" always counts: with no link there is no fake site to land on.
  // The other two only count when nothing risky was found at all — once a
  // real scam pattern is present, the absence of a money request or of
  // urgency does not make the message much safer.
  if (urls.length === 0) {
    positives.push({ id: "no-link", points: -10, label: "No links",
      explanation: "There is no link to click, so there is no fake website waiting for you." });
  }
  if (signals.length === 0) {
    positives.push({ id: "no-money", points: -5, label: "No request for money",
      explanation: "The message does not ask you to send money." });
    positives.push({ id: "no-urgency", points: -5, label: "No urgency or pressure",
      explanation: "Nothing in the message rushes or pressures you." });
  }

  let score = BASE_SCORE;
  for (const s of signals) score += s.points;
  for (const p of positives) score += p.points;
  score = Math.max(0, Math.min(100, Math.round(score)));

  return { score, verdict: getVerdict(score), signals, positives, empty: false };
}

window.ScamShieldDetector = { analyzeMessage, getVerdict, VERSION };
