# ScamShield v2.0 — Technical Architecture

## End-to-End Privacy-First Hybrid Data Flow

```text
[User SMS / Bangla Text + Optional JPEG/PNG Payment Screenshot]
                           │
                           ▼
   ┌───────────────────────────────────────────────────┐
   │  Layer 1: Deterministic Bilingual Signal Engine   │  (src/detector.mjs — ~0.04ms, 100% Local)
   │  • 10 smishing/social-engineering signal rules    │
   │  • Multi-label subdomain brand-spoof detector     │
   │  • Legitimate bank/bKash OTP false-positive guard │
   └───────────────────────────────────────────────────┘
                           │
                           ▼
   ┌───────────────────────────────────────────────────┐
   │  Layer 2: Bilingual PII Redactor & Privacy Diff   │  (src/pii-redactor.mjs — 100% Local)
   │  • Normalizes Bangla digits (০-৯)                 │
   │  • Scrubs Cards, Emails, 12-17d Accounts/NIDs,    │
   │    BD/Intl Phones, OTP/PINs, Recipient Names      │
   │  • Renders live Side-by-Side Privacy Diff         │
   └───────────────────────────────────────────────────┘
                           │ (ONLY scrubbed text enters AI prompt)
                           ▼
   ┌───────────────────────────────────────────────────┐
   │  Layer 3: Firebase AI Logic Hybrid Inference      │  (src/firebase-hybrid.mjs — firebase@^13.4.0)
   │  • getAI(app, { backend: new GoogleAIBackend(),   │
   │      useLimitedUseAppCheckTokens: true })         │
   │  • ReCaptchaEnterpriseProvider App Check          │
   │  • model.initializeDeviceModel(progressCb)        │
   │  • Symmetric Schema (responseSchema &             │
   │      responseConstraint)                          │
   │  • Multimodal v13 Part { type: "inlineData" }     │
   └───────────────┬───────────────────────┬───────────┘
                   │                       │
      [ON_DEVICE: Gemini Nano]   [IN_CLOUD: gemini-3.5-flash-lite]
      0 Bytes Cloud Transit       Only Redacted Payload Sent
```

## Security & Quality Engineering Guarantees
- **Zero DOM XSS Sinks:** `src/app.js` uses zero `innerHTML` calls; every untrusted string and AI output field is rendered exclusively via `textContent` and `document.createElement`.
- **Zero Direct Model API Calls:** All AI inference flows through `firebase/ai` (`firebasevertexai.googleapis.com` proxy with `X-Firebase-AppCheck` header); direct `generativelanguage.googleapis.com` endpoints are strictly forbidden and verified by `tests/security-guardrails.test.mjs`.
- **Honest Telemetry:** When Firebase Web Config is absent, the UI explicitly displays `MODE: LOCAL DETERMINISTIC ENGINE` and `0 B` cloud transit rather than simulating fake Gemini Nano or Cloud responses.
- **PWA Offline Resilience:** `public/manifest.json` (`share_target`) and `public/sw.js` cache the app shell for offline use while bypassing all Firebase API requests.
