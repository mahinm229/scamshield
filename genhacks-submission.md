# Devpost submission text — ScamShield (GenHacks 2026)

Track: **AI, Agentic Systems, Cybersecurity, and Dev Tools**
("Your project integrates AI, makes software more secure, or helps developers
build" — ScamShield makes software more secure.)

Fill in the links after the repo is created. The same repo, demo and video
as the SafeSpace submission are reused.

## Project name

ScamShield

## Tagline

Paste any message. Know if it is a scam — before you tap, pay, or share anything.

## Links (FILL IN AFTER PUBLISHING)

- GitHub repo: https://github.com/mahinm229/scamshield (verify after creation)
- Live demo: https://mahinm229.github.io/scamshield/ (verify after GitHub Pages is enabled)
- Demo video: [YouTube link — upload demo-video.mp4 as Public, embedding ON, and paste the link]

## What it does

ScamShield is a browser companion that explains a suspicious message in plain
language. Paste any SMS, email or WhatsApp message in Bangla or English and
it gives a verdict (Safe / Caution / Likely scam), a risk score from 0 to 100,
and the exact reasons — every signal with its points, for example "shortened
link +20", "asks for your OTP +30", "creates urgency +15". Then it tells the
person exactly what to do next: do not tap, do not pay, verify in the official
app, block the number, report the SMS to 1212 (BTRC).

## The problem (Impact)

In Bangladesh, scam SMS messages pretending to be bKash, Nagad, banks,
lotteries, parcel deliveries and job offers reach millions of people every
day. The messages are written to create panic — "your account will close",
"send your OTP in 2 hours" — and many people, including first-time smartphone
users and older family members, tap the link or send money before they can
think. Existing advice ("don't click suspicious links") does not help in the
moment, because the message itself looks official and the person has seconds
to decide. ScamShield answers the question at the moment it matters, in the
person's own language.

## How it works (Technical execution)

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
- 100% on-device: the message never leaves the person's device. No uploads,
  no trackers, no cookies, no accounts.

## Creativity

Most scam advice is a poster on a wall. ScamShield turns the check itself
into the lesson: instead of a black-box "scam / not scam", it shows its work
— every point explained in plain language — so the person learns the patterns
(short links, OTP requests, fake urgency) and recognises the next scam
without the tool. It is built for the messages people in Bangladesh actually
receive, in the language they actually receive them in.

## What I learned

- A safety tool earns trust by showing its work: explaining the score
  matters more than the score itself.
- Avoiding false alarms matters as much as catching scams: a genuine OTP
  delivery message must stay Safe, so the engine distinguishes "send your
  OTP" (dangerous) from "never share your OTP" (a warning).
- Small, honest scope beats feature count: one situation (a suspicious
  message), done well, with its limits stated plainly.

## Limitations (honest)

ScamShield reads the message text only. It cannot verify who really sent a
message — a scammer can copy the exact wording of a real bank. A low score
does not prove a message is genuine; the "what to do next" guidance always
says to verify through the official app or official number.

## Built during

Built November 10, 2026, inside the GenHacks build window (November 1 –
December 26, 2026). All code is new; no pre-existing components. The same
project was also submitted to SafeSpace Hacks (November 2026) — the code,
demo and video are the same; this submission text is written for GenHacks
and the Cybersecurity track.

## Credits

- Built by Tufayl Ahamed Mahin. Licence: MIT.
- No datasets, no third-party APIs, no AI models called. The scoring engine
  is original code written for this project.
