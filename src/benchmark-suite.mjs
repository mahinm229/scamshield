/**
 * ScamShield AI — Live-Executable 20-Case Adversarial Threat & Zero-Knowledge PII Benchmark
 * Runs identically in the browser UI (for Devpost Judges) and in `npm test` (CI/CD).
 */

import { analyzeDeterministic } from './detector.mjs';
import { redactPII } from './pii-redactor.mjs';

export const TWENTY_BENCHMARK_CASES = [
  {
    id: 'B01',
    category: 'Banking Smishing (Chase Wire Transfer)',
    input: 'Urgent Chase Alert: Unauthorized wire transfer of $2,450 to account 1234567890123. Confirm OTP 918273 at chase-security-fraud.xyz immediately.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: ['1234567890123', '918273'],
  },
  {
    id: 'B02',
    category: 'False-Positive Guard (Chase 2FA Delivery)',
    input: 'Your Chase verification OTP is 482913. Do not share it with anyone. Chase will never ask for your OTP or password.',
    expectVerdict: 'SAFE',
    mustRedact: ['482913'],
  },
  {
    id: 'B03',
    category: 'False-Positive Guard (Google 2FA Delivery)',
    input: 'Your Google verification passcode is 554433. Never share this code with anyone. Google will never ask for it.',
    expectVerdict: 'SAFE',
    mustRedact: ['554433'],
  },
  {
    id: 'B04',
    category: 'Subdomain Brand Spoofing (Bank of America)',
    input: 'Urgent Bank of America update: Account suspended. Re-verify identity at secure.login.bofa-verify.xyz/auth within 15 minutes.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B05',
    category: 'Official Brand Domain (PayPal Safe)',
    input: 'Review the latest PayPal enterprise security policies at https://www.paypal.com/signin',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
  {
    id: 'B06',
    category: 'PII Boundary Guard (13-Digit Account + OTP)',
    input: 'Urgent Bank Alert: Account 1234567890123 frozen. Install AnyDesk now and provide 6-digit security code 918273.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: ['1234567890123', '918273'],
    forbidSubstring: '[REDACTED_PHONE]23',
  },
  {
    id: 'B07',
    category: 'Payment Card & CVV Harvesting Phishing',
    input: 'Verify card 4532-1198-4421-9088 immediately at paypal-billing-update.top or your account will be suspended.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: ['4532-1198-4421-9088'],
  },
  {
    id: 'B08',
    category: 'Telegram USDT Crypto Task Arbitrage Scam',
    input: 'Congratulations! Earn $350 daily liking YouTube videos. Contact t.me/hr_tasks and pay a registration fee via USDT.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B09',
    category: 'USPS Customs & Delivery Impersonation',
    input: 'USPS Final Notice: Your parcel is held at customs due to an incorrect address. Pay the redelivery fee at track.usps-parcel-fee.click',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B10',
    category: 'Raw IP Destination URL Phish',
    input: 'Urgent: Your PayPal account is restricted. Confirm identity immediately at http://185.220.101.4/paypal-login',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B11',
    category: 'Sweepstakes & Lottery Advance Fee Scam',
    input: 'Congratulations! You have won $50,000 in the International Sweepstakes. To claim your prize, send the processing fee immediately via bit.ly/claim50k',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B12',
    category: 'Benign Personal SMS (False-Positive Guard)',
    input: 'Hi mom, I just finished class and will be home by 7 PM. Do you need any groceries?',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
  {
    id: 'B13',
    category: 'Benign Corporate Meeting Invitation',
    input: 'Dear Sarah Jenkins, the Q4 project design review starts at 3:00 PM in Conference Room B. Please email sarah.jenkins@company.org with slides.',
    expectVerdict: 'SAFE',
    mustRedact: ['sarah.jenkins@company.org'],
  },
  {
    id: 'B14',
    category: 'Remote Access Trojan (AnyDesk/TeamViewer)',
    input: 'Download security patch from support-update.icu and open TeamViewer to unlock your frozen bank card.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B15',
    category: 'Gift Card Coercion & Extortion',
    input: 'Final notice: Send a $200 iTunes card code immediately or your account will be terminated today.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B16',
    category: 'WhatsApp VIP Crypto Investment Bait',
    input: 'Urgent VIP investment group! Contact Senior Analyst on WhatsApp wa.me/15559876543 to claim guaranteed 200% crypto returns.',
    expectVerdict: 'HIGH_RISK_SCAM',
    allowHighRisk: true,
    mustRedact: ['15559876543'],
  },
  {
    id: 'B17',
    category: 'Apple ID Security Lockout Phish',
    input: 'Your Apple ID is locked. Verify identity now at id.apple-security-alert.online/unlock immediately.',
    expectVerdict: 'HIGH_RISK_SCAM',
    mustRedact: [],
  },
  {
    id: 'B18',
    category: 'IRS Regulatory Coercion & SSN Phishing',
    input: 'Tax notification: Confirm your SSN 999-12-3456 and phone +1-555-123-4567 immediately to resolve your pending IRS tax penalty or face legal action.',
    expectVerdict: 'SUSPICIOUS',
    allowHighRisk: true,
    mustRedact: ['999-12-3456', '555-123-4567'],
  },
  {
    id: 'B19',
    category: 'Official Google Cloud Security Notice',
    input: 'Security alert: You signed in on a new device. Review activity at https://accounts.google.com/notifications',
    expectVerdict: 'SAFE',
    mustRedact: [],
  },
  {
    id: 'B20',
    category: 'Empty / Whitespace Input Resilience',
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

    const sanitizedOutput = pii.sanitized || pii.sanitizedText || '';

    const redactionOk = (tc.mustRedact || []).every(
      (secret) => !sanitizedOutput.includes(secret)
    );

    const boundaryOk = tc.forbidSubstring
      ? !sanitizedOutput.includes(tc.forbidSubstring)
      : true;

    const passed = Boolean(verdictOk && redactionOk && boundaryOk);

    return {
      id: tc.id,
      category: tc.category,
      expected: tc.expectVerdict,
      actual: det.verdict,
      score: det.score,
      piiScrubbed: pii.redactionCount || pii.totalRedacted || 0,
      passed,
      notes: passed
        ? 'PASSED'
        : `MISMATCH: expected=${tc.expectVerdict}, got=${det.verdict}`,
    };
  });

  const passedCount = results.filter((r) => r.passed).length;
  const total = results.length;
  const accuracyPct = Math.round((passedCount / total) * 100);

  return {
    total,
    passed: passedCount,
    failed: total - passedCount,
    accuracyPct,
    results,
  };
}
