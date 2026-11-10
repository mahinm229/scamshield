# Devpost submission text — ScamShield (SafeSpace Hacks 2026)

Links verified live 2026-11-10 (repo public, demo loads and analyzes). Everything else is ready to paste.

## Project name

ScamShield

## Tagline (short pitch)

Paste any message. Know if it is a scam — before you tap, pay, or share anything.

## Links (verified live 2026-11-10)

- GitHub repo: https://github.com/mahinm229/scamshield (verified — public, 25 files, CI green)
- Live demo: https://mahinm229.github.io/scamshield/ (verified — loads and analyzes, lottery sample scores 100/100)
- Demo video: [YouTube link — user uploads demo-video.mp4 as Public and pastes the link]

## Problem

In Bangladesh, scam SMS messages pretending to be bKash, Nagad, banks, lotteries,
parcel deliveries and job offers reach millions of people every day. The messages
are written to create panic — "your account will close", "send your OTP in 2
hours" — and many people, including first-time smartphone users and older family
members, tap the link or send money before they can think. Existing advice ("don't
click suspicious links") does not help in the moment, because the message itself
looks official and the person has seconds to decide.

## Solution

ScamShield is a browser companion that explains a suspicious message in plain
language. Paste any SMS, email or WhatsApp message in Bangla or English and it
gives a verdict (Safe / Caution / Likely scam), a risk score from 0 to 100, and
the exact reasons — every signal with its points, for example "shortened link
+20", "asks for your OTP +30", "creates urgency +15". It then tells the person
exactly what to do next: do not tap, do not pay, verify in the official app,
block the number, report the SMS to 1212 (BTRC).

## How it works (technologies)

- A deterministic, explainable scoring engine in plain JavaScript
  (`detector.mjs`, zero dependencies, zero network calls). No server, no API
  keys, no account.
- Weighted signals for links (shortened, raw-IP, http, brand mismatch),
  payment lures (bKash/Nagad/Rocket, OTP requests, "verify account"), urgency
  and threats, lottery / job-fee / parcel-customs stories — in Bangla and
  English — plus positive signals that lower the score.
- Single-page app (`index.html`, `app.js`, `styles.css`) that works from
  `file://` and any static host, including GitHub Pages. System fonts only,
  so it works offline.
- 45 automated tests (`node --test`), all passing, covering scam/safe
  boundaries, Bangla samples, empty and 5,000-character input, and a check
  that a genuine OTP warning ("never share your OTP") stays Safe.

## Trust & privacy (why this is safe to use)

- 100% on-device: the message never leaves the person's device. No uploads,
  no trackers, no cookies, no accounts.
- Honest about uncertainty: the result page says "This is a guide, not
  proof. ScamShield reads the words of the message only — it cannot verify
  who really sent it. When unsure, don't click, don't pay, and don't share
  codes."
- All 6 built-in examples are synthetic and labelled as invented; no real
  messages from real people, no private data, no live links (sample URLs are
  assembled from parts so nobody can tap them by accident).

## One example of a safer outcome

A person receives: "Congratulations! You have won $5,000 in the International
Lottery. Verify your account now at bit.ly/claim-prize-5000 and send your OTP
within 2 hours." ScamShield scores it 100/100 — Likely scam — and explains:
shortened link, OTP request, urgency, lottery prize. The person does not tap,
does not send the OTP, and blocks the number instead of losing their account.

## One honest limitation

ScamShield reads the message text only. It cannot verify who really sent a
message — a scammer can copy the exact wording of a real bank. A low score
does not prove a message is genuine; the "what to do next" guidance always
says to verify through the official app or official number.

## Challenges faced

- Bangla scam wording varies a lot, so the detector needed Bangla patterns
  (বিকাশ, নগদ, অ্যাকাউন্ট বন্ধ হয়ে যাবে, লটারি জিতেছেন) alongside English
  ones, and both had to be tested.
- Avoiding false alarms mattered as much as catching scams: a genuine OTP
  delivery message must stay Safe, so the engine distinguishes "send your
  OTP" (dangerous) from "never share your OTP" (a warning).
- The demo had to be understandable in seconds, so every signal is shown
  with plain-language explanations, not jargon.

## What I learned

- A safety tool earns trust by showing its work: explaining the score
  matters more than the score itself.
- Small, honest scope beats feature count: one situation (a suspicious
  message), done well, with its limits stated plainly.

## Credits

- Built November 10, 2026 by Tufayl Ahamed Mahin, during the SafeSpace
  Hacks build window (October 17–November 22, 2026). All code is new;
  no pre-existing components.
- AI assistance (as the rules ask us to credit): the code was written
  with the help of an AI coding agent (Muse) during the event window,
  directed and verified by the entrant. No AI model is called at runtime
  — the finished app runs entirely on-device with a deterministic
  rule-based scoring engine.
- No datasets, no third-party APIs. The scoring engine is original code
  written for this project.
- Licence: MIT.
