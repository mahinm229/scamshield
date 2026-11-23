/**
 * ScamShield v3.0 — Live-Executable 20-Case Adversarial Security, Bilingual PII & False-Positive Benchmark
 * Runs identically in the browser UI (for Judges) and in `npm test` (CI).
 */

import { analyzeDeterministic } from './detector.mjs';
import { redactPII } from './pii-redactor.mjs';

export const TWENTY_BENCHMARK_CASES = [
  {
    id: 'B01',
    category: 'Bangla Smishing',
    input: 'জরুরি সতর্কতা! আপনার বিকাশ একাউন্ট ০১৭১২৩৪৫৬৭৮ বন্ধ হয়ে যাবে। পিন 4829 ও ওটিপি ৫৫৪৪৩৩ পাঠান login.bkash-verify-bd.xyz',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: ['01712345678', '4829', '554433'],
  },
  {
    id: 'B02',
    category: 'False-Positive Guard (EN)',
    input: 'Your bKash verification OTP is 482913. Do not share it with anyone. bKash never asks for your OTP or PIN.',
    expectVerdict: 'SAFE',
    mustRedact: ['482913'],
  },
  {
    id: 'B03',
    category: 'False-Positive Guard (BN)',
    input: 'আপনার ওটিপি ৫৫৪৪৩৩। এটি কারো সাথে শেয়ার করবেন না। বিকাশ কখনো পিন চায় না।',
    expectVerdict: 'SAFE',
    mustRedact: ['554433'],
  },
  {
    id: 'B04',
    category: 'Subdomain Spoofing',
    input: 'Urgent KYC update required at secure.login.nagad-verify.xyz/auth within 15 minutes.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B05',
    category: 'Official Domain Safe',
    input: 'Read the latest official bKash fee schedule at https://www.bkash.com/en/page/charges',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
  {
    id: 'B06',
    category: 'PII Boundary (13-Digit Acct)',
    input: 'Urgent Bank Alert: Account 1234567890123 frozen. Install AnyDesk now and tell your 6-digit security code 918273.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: ['1234567890123', '918273'],
    forbidSubstring: '[REDACTED_PHONE]23',
  },
  {
    id: 'B07',
    category: 'Payment Card Redaction',
    input: 'Verify card 4532-1198-4421-9088 immediately at paypal-support-check.top or your account will be suspended.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: ['4532-1198-4421-9088'],
  },
  {
    id: 'B08',
    category: 'Telegram Task Scam',
    input: 'Congratulations! Earn $350 daily liking YouTube videos. Contact t.me/hr_tasks and pay a registration fee via USDT.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B09',
    category: 'USPS Customs Phishing',
    input: 'USPS Final Notice: Your parcel is held at customs due to incomplete address. Pay redelivery fee at track.usps-fee.click/pay',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B10',
    category: 'Raw IP Phishing URL',
    input: 'Urgent: Your PayPal account is restricted. Confirm identity immediately at http://185.220.101.4/paypal-login',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B11',
    category: 'Lottery Prize Bait (BN)',
    input: 'অভিনন্দন! আপনি ৫০,০০০ টাকা লটারি জিতেছেন। পুরস্কার নিতে এখনই প্রসেসিং ফি পাঠান bit.ly/win50k',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B12',
    category: 'Benign Personal SMS',
    input: 'Hi mom, I just finished class and will be home by 7 PM. Need any groceries?',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
  {
    id: 'B13',
    category: 'Benign Work Email',
    input: 'Dear Sarah Jenkins, the Q4 design review starts at 3:00 PM in Conference Room B. Email sarah.jenkins@company.org with slides.',
    expectVerdict: 'SAFE',
    mustRedact: ['sarah.jenkins@company.org'],
  },
  {
    id: 'B14',
    category: 'Remote APK Takeover',
    input: 'Download apk from support-update.icu and open TeamViewer to unlock your frozen bank card.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B15',
    category: 'Gift Card Extortion',
    input: 'Final notice: send a $200 iTunes card code immediately or your account will be terminated today.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B16',
    category: 'WhatsApp Redirect + KYC',
    input: 'Urgent KYC expired! Contact me on WhatsApp wa.me/8801799887766 to verify your wallet now.',
    expectVerdict: 'SUSPICIOUS',
    allowHighRisk: true,
    mustRedact: ['8801799887766'],
  },
  {
    id: 'B17',
    category: 'Apple Brand Spoof',
    input: 'Your Apple ID is locked. Verify now at id.apple-security-alert.online/unlock',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B18',
    category: 'Bangla NID + Phone Scrub',
    input: 'এনআইডি 19952691234567890 এবং নম্বর +8801812345678 দিয়ে এখনই কেওয়াইসি ভেরিফাই করুন নইলে একাউন্ট বন্ধ হবে।',
    expectVerdict: 'SUSPICIOUS',
    allowHighRisk: true,
    mustRedact: ['19952691234567890', '8801812345678'],
  },
  {
    id: 'B19',
    category: 'Official Google Notice Safe',
    input: 'Security alert: You signed in on a new device. Review activity at https://accounts.google.com/notifications',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
  {
    id: 'B20',
    category: 'Empty / Whitespace Resilience',
    input: '   ',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
];

export function runTwentyCaseBenchmark() {
  const results = TWENTY_BENCHMARK_CASES.map((tc) => {
    const det = analyzeDeterministic(tc.input);
    const pii = redactPII(tc.input);

    const verdictOk =
      det.verdict === tc.expectVerdict ||
      (tc.allowHighRisk && det.verdict === 'HIGH_RISK_SCAM');

    const redactionOk = (tc.mustRedact || []).every(
      (secret) => !pii.sanitized.includes(secret)
    );

    const boundaryOk = tc.forbidSubstring
      ? !pii.sanitized.includes(tc.forbidSubstring)
      : true;

    const passed = verdictOk && redactionOk && boundaryOk;

    return {
      id: tc.id,
      category: tc.category,
      expected: tc.expectVerdict,
      actual: det.verdict,
      score: det.score,
      piiScrubbed: pii.redactionCount,
      passed,
    };
  });

  const passedCount = results.filter((r) => r.passed).length;
  return {
    total: results.length,
    passed: passedCount,
    accuracyPct: Math.round((passedCount / results.length) * 100),
    results,
  };
}
