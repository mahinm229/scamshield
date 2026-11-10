# Skeptical audit — Nov 10, 2026

A Principal-Engineer / strict-judge audit of this repository from scratch.
Nothing below trusts the README, badges or UI labels: every claim was
checked against the actual source and against runtime behaviour (Node
tests, a real `npm start` server, and a real Firefox at 390×844).

Important scope note: the 12-point checklist the audit was asked to run
was written for a **PayPal escrow server app** (Payegis Studio: `/api/*`,
Render, PostgreSQL, Judge Tours, payment settlement). **This repository
is ScamShield** — a static, 100% on-device scam-message detector. It has
no server, no API, no accounts, no payments and no database, so most of
those 12 items have no surface to fail on. Inventing a PayPal server,
auth system or Postgres layer to "fix" them would destroy the product
and break its SafeSpace Hacks premise. Each item below is therefore
marked **CONFIRMED** (real flaw, fixed), **PASS** (checked, holds) or
**N/A by construction** (no such surface exists — with a regression test
pinning that fact in `tests/audit-guardrails.test.mjs`, so it cannot
silently come back).

## The 12 items

| # | Checklist item | Verdict | Evidence / fix |
|---|---|---|---|
| 1 | `npm start`, `npm test`, `npm run benchmark` run with zero `ERR_MODULE_NOT_FOUND`; `ci.yml` in `.github/workflows/` | **CONFIRMED — fixed** | `npm start` and `npm run benchmark` did not exist at all (npm errored "Missing script"). Added zero-dependency `server.mjs` (`npm start`, port 8000) and `tools/benchmark.mjs`. Added `.github/workflows/ci.yml` (test + bundle-sync + benchmark + `npm start` smoke check). There was no `ci.yml` anywhere before — nothing at the root to move. `npm test` was already 23/23. |
| 2 | `/api/state`, `/api/ai/*`, mutations protected by operator auth; token in `render.yaml` | **N/A by construction** | No `/api/` anywhere (grep: 0 hits), no server code, no session state, no `render.yaml`. Nothing is read or mutated remotely — the detector runs in the browser and sends nothing anywhere. Pinned by test. |
| 3 | Every live API call matches official provider schemas | **N/A by construction** | Zero network calls in the app (no `fetch`, XHR, WebSocket, beacon; `detector.mjs` has zero imports). The only "PayPal" in the repo is a brand string used to spot impersonation links. Pinned by test. |
| 4 | `PENDING`/`PROCESSING` held at `$0.00` settled until a `GET` witness | **N/A by construction** | No payments, no settlement states, no `PENDING` string anywhere. Pinned by test. |
| 5 | AI tools cannot mutate state in Live Mode or bypass approval with bare `humanApproved: true` | **N/A by construction** | No AI tools, no Live Mode, no `humanApproved`/`approvalRecord` anywhere. The detector is a deterministic pure function. Pinned by test (incl. interleaved-call purity). |
| 6 | Concurrency via Postgres advisory locks / lockfiles + optimistic `409`, not an in-memory `Map` | **N/A by construction** | No database, no shared state, no `Map`. `analyzeMessage` is stateless; repeated and interleaved calls return identical results. Pinned by test. |
| 7 | Real 64-char RFC 6234 SHA-256, not a 16-char toy hash | **N/A by construction** | No hashing of any kind exists (no `sha256`/`createHash` anywhere), so there is no toy hash to mistake for SHA-256. Pinned by test. |
| 8 | Out-of-order / invalid clicks blocked with a visible explanation + audit entry | **CONFIRMED (analogue) — fixed** | There are no steps to click out of order, but the one invalid click that exists — **Analyze with an empty message** — silently hid the result with no message at all (verified in Firefox). Fixed: a visible `#form-error` banner (`role="alert"`, "Paste a message first — there is nothing to check yet.") that clears on input/success/Clear. Regression tests in `tests/ui.test.mjs`. |
| 9 | After expiry, header/KPI/chart/audit all show `$0.00`; clock rewinds and re-advances without Reset | **N/A by construction (analogue PASS)** | No clock, holds or expiry. The analogue — Clear, then Analyze again — works with no Reset needed (verified in `tests/ui.test.mjs`). |
| 10 | Header pinned at `top: 0` at `scrollY = 850`; no mid-word token splits | **CONFIRMED — fixed** | Verified in Firefox 390×844: header was `position: static`, `top: -850px` after scrolling to 850. Fixed with `position: sticky; top: 0; z-index: 10`. Mid-word: `.message-echo` used `overflow-wrap: anywhere` + `word-break: break-word`; changed to `overflow-wrap: break-word` + `word-break: normal` (a long token breaks only when it would overflow). There are no table cells to split. Re-verified in Firefox after the fix (see below). |
| 11 | Judge Tours finish in `< 100ms`, screenshot shows the final stage | **N/A by construction (analogue PASS)** | No Judge Tours, no async steps, no timers in the UI (`setTimeout`/`setInterval`: 0 hits). A sample-button click shows the verdict synchronously in the same tick — verified in `tests/ui.test.mjs` (`< 100ms`). |
| 12 | Mobile 390×844: `scrollWidth <= 390`, zero horizontal scrollbar | **PASS** | Verified in Firefox 390×844 before and after the fix: `scrollWidth: 390`, `innerWidth: 390`, zero overflowing elements — including with a 200-character unbroken URL in the echoed message. Also fixed a latent risk: sample-button tags used `float: right`, now flexbox. |

## Extra flaws the audit found (not on the checklist)

These were found by running the detector against legitimate messages —
the kind of false positive a strict judge catches in seconds:

1. **Official `.com.bd` domains flagged as impersonation (CONFIRMED — fixed).**
   `https://bracbank.com.bd/help` and `https://grameenphone.com.bd/` both
   scored **Caution 40** ("Link pretends to be BRAC Bank"). The brand
   check only allowed the bare official domain and its subdomains.
   Fix: `isOfficialHost()` also allows the official `.bd` variant and
   its subdomains. Fake domains (`bkash-offer-2026.com`) are still flagged.
2. **Bare "police" counted as a threat (CONFIRMED — fixed).** "Your police
   clearance certificate is ready for collection." scored **Caution 35**.
   Fix: "police" only counts inside a threat phrase ("police will…",
   "পুলিশ আসবে", …); account-closure / legal-action / arrest still count.
3. **Bare "winner"/"prize" counted as a lottery scam (CONFIRMED — fixed).**
   "You are the winner of our school raffle!" scored **Caution 35**.
   Fix: the lottery signal now needs a win claim ("you won…", lottery +
   won/জিতেছেন, prize + জিতেছেন). "Congratulations! You won a prize.
   Send your OTP…" still scores as a scam.
4. **Invalid IP flagged as a raw-IP link (CONFIRMED — fixed).**
   `999.999.999.999` triggered `ip-link` (+30). Fix: octets are validated
   0–255; `203.0.113.10` still triggers.
5. **Missing MIT LICENSE file (CONFIRMED — fixed).** `package.json`
   claimed `MIT` but no `LICENSE` file existed. Added.

## What was verified after the fixes

- `npm test` — **45/45 pass, 0 fail** (was 23/23).
- `npm run benchmark` — 2,000 analyses, sample verdicts asserted.
- `npm start` — serves the app on port 8000 (smoke-checked with `curl`).
- Firefox 390×844 — `scrollWidth 390`, header `top: 0px` at `scrollY 850`,
  empty-Analyze shows the error banner, long-URL echo does not overflow.
- `npm run build:browser` — bundles regenerated; browser bundle and ES
  module produce identical results (covered by the existing parity test).

## What was deliberately NOT done

No PayPal integration, auth system, database, hashing, Judge Tour or
step machine was added. Those belong to a different product; adding them
here would be fabrication, not a fix — and would violate the
"100% on-device, nothing uploaded" promise this project is judged on.
