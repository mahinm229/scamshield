# ScamShield — Is this message a scam?

Paste any SMS, email or WhatsApp message (Bangla or English) and find out
whether it looks like a scam — with a plain-English explanation of *why*.

Built on **Nov 10, 2026** for **SafeSpace Hacks**. No pre-existing code:
every file in this repo was written for this hackathon, inside the event
window.

## Who it helps

People in Bangladesh get scam SMS every day: fake bKash/Nagad messages,
“you won a lottery”, “your parcel is held — pay customs”, “share your OTP”.
Many victims are not careless — the messages are designed to rush and scare.
ScamShield gives anyone a second opinion in seconds, in the moment, before
they tap, pay, or share a code.

## How to run

No install, no build step, no account.

**Option 1 — open the file:**
Double-click `index.html`. It works from `file://` as well as from any
static host, and it works offline (system fonts only, no CDNs).

**Option 2 — local server (no install, Node 18+):**
```bash
npm start
```
Then open `http://localhost:8000`. (`npm start` runs `server.mjs`, a
zero-dependency static server. `python3 -m http.server 8000` also works.)

**Run the tests:**
```bash
node --test tests/detector.test.mjs
# or
npm test
```
Requires Node.js 18+.

**Benchmark the detector:**
```bash
npm run benchmark
```

## How scoring works

Every message starts at **25 points**. Scam patterns add points; reassuring
facts take points away. The score is always 0–100.

| Score | Verdict | Meaning |
|------:|---------|---------|
| 0–29 | ✅ Safe | Nothing matches a known scam pattern. |
| 30–59 | ⚠️ Caution | Something looks off. Verify through the official app first. |
| 60–100 | 🛑 Likely scam | Several scam patterns at once. Do not click, pay, or share codes. |

Signals (each shown with its points and a plain-English explanation):

- **Shortened link** +20 — bit.ly-style links hide the real destination.
- **Link to a raw IP address** +30 — real companies link to a named domain.
- **Unsafe (http) link** +5 — anything typed there can be read or changed.
- **Link pretends to be bKash / Nagad / Rocket** +15 — brand name in a fake address.
- **Asks you to send money** +20 — including bKash / Nagad / Rocket payment lures.
- **Asks for your OTP** +30 — no real company ever asks for your OTP.
- **Pushes you to “verify” your account** +10 — a cover story for a fake login page.
- **Creates urgency** +15 — “within 2 hours”, “act now”.
- **Threatens you** +20 — “account will close”, “police”, “legal action”.
- **Claims you won a lottery or prize** +20 — you cannot win a lottery you never entered.
- **Job offer that asks for a fee** +20 — real employers never charge to hire you.
- **Parcel held — asks for a fee** +20 — fake customs-fee demands.
- **Sent from a personal mobile number** +10 — official messages come from a named sender, not a personal SIM.

Reassuring facts: no links (−10, always counts); no request for money and
no urgency (−5 each, only when nothing risky was found — once a real scam
pattern is present, their absence does not make the message much safer).

A genuine OTP *delivery* message (“Your OTP is 482913. Do not share it.”)
scores Safe: the warning is protective advice, not a request.

All patterns work in **Bangla and English** (বিকাশ, নগদ, ওটিপি, লটারি
জিতেছেন, অ্যাকাউন্ট বন্ধ হয়ে যাবে, পার্সেল আটকে আছে, …).

## One example of a safer outcome

> *“Congratulations! You won 50,000 taka in a lottery. Send your OTP to
> claim it.”*
>
> ScamShield scores this **100 — Likely scam**, and explains: shortened
> link, OTP request, lottery claim, urgency. The user sees *why*, does not
> send the OTP, and their bKash account stays theirs.

## Honest limitation

ScamShield reads the **words of the message only**. It cannot verify who
really sent a message — a scammer can copy the exact wording of a real
bank SMS. A “Safe” result means “nothing in this text matches a known scam
pattern”, not “this sender is proven genuine”. When unsure, don’t click,
don’t pay, and verify through the official app or official phone number.

## Privacy

**100% on-device.** Your message is checked by JavaScript running in your
own browser. Nothing is uploaded, stored, or shared. No trackers, no
cookies, no accounts, no analytics. The detector (`detector.mjs`) makes
zero network calls — you can read it and check.

## Audit (Nov 10, 2026)

A skeptical from-scratch audit (see `AUDIT.md`) checked the repo against
a 12-point fatal-flaw checklist plus the detector itself. It found and
fixed: missing `npm start` / `npm run benchmark` scripts, no CI, a
non-sticky header, a silent no-op on empty Analyze, and four detector
false positives (official `.com.bd` domains, benign "police" and
"winner" mentions, invalid IPs). Most checklist items (API auth, PayPal
settlement, Postgres locks, SHA-256, Judge Tours) have no surface in
this repo — it is a static on-device detector with no server, no API and
no network calls — and regression tests pin that fact.

## Files

| File | What it is |
|------|-----------|
| `index.html` | The app page (English UI, bilingual samples). |
| `app.js` | UI logic (classic script, works from `file://`). |
| `styles.css` | Mobile-first styles, system fonts only. |
| `detector.mjs` | The scoring engine (ES module, no dependencies). |
| `detector.browser.js` | Same engine as a classic script, generated by `tools/build-browser.mjs`. |
| `samples.mjs` / `samples.browser.js` | 6 built-in synthetic example messages (3 scam, 2 suspicious, 1 safe). |
| `tests/detector.test.mjs` | 45 automated tests (`node --test`). |
| `tools/build-browser.mjs` | Regenerates the browser bundles from the ES modules. |
| `screenshots/` | Screenshots of the app (see below). |

## Screenshots

See `screenshots/`. They show the app with a scam verdict on desktop and
mobile widths.

## Credits

Built by an AI coding agent on Nov 10, 2026, for SafeSpace Hacks 2026.
Detector, UI, samples and tests are original work written for this event.
