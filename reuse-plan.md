# ScamShield reuse plan — verified 2026-11-10

Primary submission: **SafeSpace Hacks** (deadline Nov 23, 04:00 Dhaka; $280 cash, 1st only).
Repo/demo/video prepared; blocked only on the user linking their mahinm229 GitHub.

## GenHacks — CONFIRMED FIT AS-IS

- Page: https://genhacks-open.devpost.com/ (verified on the official page)
- Virtual, for students; solo or any team size.
- Build Nov 1–Dec 26, 2026. Submit before **Dec 26, 2026, 12:00 AM ET = Dec 26, 11:00 Dhaka**.
- Track: **AI, Agentic Systems, Cybersecurity, and Dev Tools** — "makes software more
  secure" fits ScamShield exactly. (Open track is the fallback.)
- Prizes (CAD): 1st 500, 2nd 200, 3rd 150, track winners 50 each (incl. the
  AI/Cybersecurity track winner). Cash confirmed on the page.
- Submission needs: project page, demo video up to 3 min on YouTube/Vimeo with
  embedding on, public GitHub repo link, track choice, team members.
- Judging: Impact, Technical execution, Creativity, Presentation.
- NOT yet verified from the rules page: age floor and country list. Check the
  rules tab before submitting. (Main page says "open to students of every
  experience level".)
- Same repo, same demo video, same demo link as SafeSpace. Only the Devpost
  text changes (track + GenHacks framing).

## AI OpenBuild — NEEDS A REAL AI COMPONENT FIRST

- Page: https://ai-openbuild.devpost.com/ (verified on the official page)
- "Build anything with AI" — AI must be a **meaningful** part. Judging is 30%
  "AI Integration & Technical Execution". Submission must "identify the model
  or AI method" and show representative inputs/outputs.
- ScamShield as built is a deterministic rule-based classifier, NOT an ML
  model. Submitting it as-is would be a weak, borderline-dishonest fit for
  the AI criterion.
- Prize: **$150 cash, 1st place only** (confirmed); 8 runner-ups non-cash.
- Deadline: **Dec 10, 23:45 ET = Dec 11, 10:45 Dhaka**. Solo builders and
  student teams up to 5. Age/country eligibility NOT verified from the rules
  page yet.
- To reuse here honestly: add a genuine on-device ML classifier — e.g. a tiny
  logistic-regression / Naive Bayes model over message tokens, trained at
  build time on the synthetic sample set, running 100% in the browser next to
  the rule engine, with its own inputs/outputs shown. That is real new work
  inside the event window (Nov 5–Dec 10); the rule engine becomes the
  pre-existing component, the ML classifier the event work.
- Decide AFTER the SafeSpace submission. Optional extra work for $150.

## Order

1. SafeSpace (Nov 23) — first, with the current build.
2. GenHacks (Dec 26) — same build, new Devpost text.
3. AI OpenBuild (Dec 11) — only if the on-device ML classifier is added.
