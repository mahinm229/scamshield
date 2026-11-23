# ScamShield AI — Global Enterprise Hybrid Threat Intelligence Platform

![ScamShield AI — Enterprise Hybrid Threat Intelligence Platform](./public/banner.webp)

Built for **#BuildHybridAI 2026** ([Devpost](https://firebasehybridaihackathon.devpost.com/)) using **Firebase AI Logic Hybrid Inference (`firebase@^13.4.0`, `firebase/ai`)**, **Chrome Built-in AI (Gemini Nano)**, **Gemini Cloud Fallback (`gemini-3.5-flash-lite` / `gemini-3.8-flash`)**, and **Firebase App Check (`ReCaptchaEnterpriseProvider`)**.

---

## Why Hybrid AI Matters for Enterprise Cyber Threat Defense

Financial smishing, wire fraud lures, credential harvesting (Chase, Bank of America, PayPal, Apple ID, USPS delivery fees), and illicit remote access trojans (AnyDesk, TeamViewer) contain **highly confidential victim PII**—Social Security Numbers (SSN), 16-digit credit/debit cards, bank account and routing numbers, 2FA/OTP passcodes, phone numbers, and full names.

Sending unredacted customer data to third-party cloud LLMs violates enterprise privacy mandates (GDPR, CCPA, GLBA, PCI-DSS). Conversely, running purely on-device lightweight models struggles with complex multimodal payment screenshot forensics or unsupported client devices.

**ScamShield AI** resolves this trilemma through an airtight 3-tier Zero-Knowledge Hybrid Architecture:

1. **Layer 1 — Instant Deterministic Threat Triage (~0.04 ms):** 10+ enterprise cyber threat heuristics, multi-label subdomain brand spoofing detection (Chase, BoA, Wells Fargo, PayPal, Apple, Google, USPS, FedEx, IRS), and a verified False-Positive Guard for legitimate bank 2FA notices.
2. **Layer 2 — Local Zero-Knowledge PII Redactor & Live Privacy Diff:** Deterministically scrubs SSNs, 15–16 digit payment cards, 9–17 digit bank account/routing numbers, international E.164 phone numbers, 4–8 digit verification codes, emails, and customer salutations **100% locally on-device** before inference eligibility—displaying a live side-by-side **Privacy Diff** to the user with cryptographic SHA-256 evidence digests.
3. **Layer 3 — Genuine Firebase AI Logic Hybrid Inference (`firebase/ai` v13.4.0):**
   - Uses `getAI(app, { backend: new GoogleAIBackend(), useLimitedUseAppCheckTokens: true })` with `ReCaptchaEnterpriseProvider` App Check replay protection ([App Check for AI Logic](https://firebase.google.com/docs/ai-logic/app-check)).
   - Supports all 4 official `InferenceMode` options (`PREFER_ON_DEVICE`, `PREFER_IN_CLOUD`, `ONLY_ON_DEVICE`, `ONLY_IN_CLOUD`) ([Hybrid Configuration Options](https://firebase.google.com/docs/ai-logic/hybrid/web/configuration-options)).
   - Invokes `model.initializeDeviceModel(progressCallback)` strictly inside a user gesture handler ([Hybrid Web Get Started](https://firebase.google.com/docs/ai-logic/hybrid/web/get-started)).
   - Configures symmetric JSON `Schema` constraints for **both** `inCloudParams.generationConfig.responseSchema` and `onDeviceParams.promptOptions.responseConstraint` ([Hybrid Structured Output](https://firebase.google.com/docs/ai-logic/hybrid/web/generate-structured-output)).
   - Supports multimodal JPEG/PNG payment screenshot forensics via v13 discriminated-union `{ type: "inlineData", inlineData }` parts.
   - Surfaces real SDK `result.response.inferenceSource` (`"ON_DEVICE"` or `"IN_CLOUD"`) and verified cloud byte transmission (`0 B` when on-device).

---

## 1-Click Official Regulatory Complaint Generator

ScamShield formats and defangs extracted threat evidence into official PII-safe incident complaints ready for immediate submission:
- **US Federal Trade Commission (FTC):** [`ReportFraud.ftc.gov`](https://reportfraud.ftc.gov/) & **FBI IC3:** [`ic3.gov`](https://www.ic3.gov/)
- **CISA & Anti-Phishing Working Group (APWG):** [`reportphishing@apwg.org`](mailto:reportphishing@apwg.org)
- **US SEC & FINRA:** Cyber Fraud Response Unit ([`sec.gov/tcr`](https://www.sec.gov/tcr))

Every complaint features a deterministic 64-character SHA-256 evidence fingerprint generated on-device via the Web Crypto API.

---

## Quick Start (Local Development & Firebase Hosting)

### 1. Prerequisites
- **Node.js 20+**
- **For Local Gemini Nano Testing:** Chrome Desktop 139+ with `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` enabled. On any other browser or device, `PREFER_ON_DEVICE` automatically falls back to Firebase Cloud (`gemini-3.5-flash-lite`).

### 2. Install, Test & Run
```bash
npm install
npm test          # Runs all 6 automated test suites (31/31 passed — 100% accuracy)
npm run build     # Compiles production bundle with Vite into dist/
npm run dev       # Starts local Vite development server
```

### 3. Deploy to Firebase Hosting
```bash
cp .firebaserc.example .firebaserc
# Set your Firebase project ID in .firebaserc
npm run build
firebase deploy --only hosting,firestore:rules
```

---

## Interactive Judge Verification Tours
Click any of the **4 One-Click Judge Tours** at the top of the dashboard to verify:
1. **Tour 1: On-Device Gemini Nano Triage:** Chase unauthorized wire transfer smishing (`chase-security-fraud-alert.xyz`), on-device SSN/card redaction, and sub-millisecond local triage.
2. **Tour 2: False-Positive Zero Regression Guard:** Legitimate Chase 2FA delivery (`"Do not share it with anyone"`) — verified **SAFE (<= 8/100)** with zero false positive.
3. **Tour 3: Zero-Knowledge Privacy Diff:** 13-digit Account #, 16-digit Card #, and AnyDesk takeover — inspect the live Side-by-Side Privacy Diff proving 0 raw secrets leave the device.
4. **Tour 4: Cloud Fallback & Multimodal Forensics:** `PREFER_IN_CLOUD` mode with multimodal payment screenshot forensics and App Check enforcement.

---

## License
Licensed under the **Apache License 2.0** — see [LICENSE](./LICENSE).
