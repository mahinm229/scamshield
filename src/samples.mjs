/**
 * ScamShield AI — Global Cyber Threat Presets & 4 Interactive Judge Verification Tours
 *
 * 100% International Standard:
 *  - High-tier enterprise phishing vectors (Chase, PayPal, USPS, Crypto Pig Butchering)
 *  - Real-world credential theft and 2FA harvesting patterns
 *  - Strict Zero-False-Positive verification for legitimate Google & Apple 2FA notices
 */

export const SAMPLES = [
  {
    id: 'chase_wire_fraud',
    title: 'Chase Alert: Unauthorized $1,850 Transfer',
    badge: 'High-Risk Smishing',
    recommendedMode: 'prefer_on_device',
    text: 'Chase Alert: Did you authorize a wire transfer of $1,850.00 to account 9876543210123? If NOT you, call +1 (800) 555-0199 or verify your identity at chase-security-fraud-alert.xyz/verify immediately. Provide your 6-digit OTP code to cancel transaction.',
  },
  {
    id: 'paypal_account_lock',
    title: 'PayPal Account Suspension + SSN/Card Harvest',
    badge: 'Credential Harvest',
    recommendedMode: 'prefer_on_device',
    text: 'PayPal Security Notice: Dear David Miller, your PayPal account has been restricted due to suspicious billing activity on card 4111-2233-4455-6677. Verify your SSN 123-45-6789 and 2FA code 847291 at paypal-resolution-center.top/login within 2 hours or access will be permanently terminated.',
  },
  {
    id: 'usps_parcel_phish',
    title: 'USPS Priority Package Customs Redelivery',
    badge: 'Subdomain Spoof',
    recommendedMode: 'prefer_on_device',
    text: 'USPS Final Notice: Dear Emily Watson, package #US928374829 is held at customs sorting due to an unpaid clearance fee of $2.95. Confirm delivery address and submit fee immediately at track.usps-redelivery-notice.top/confirm or package will be returned to sender today.',
  },
  {
    id: 'telegram_pig_butchering',
    title: 'VIP Crypto Arbitrage & Task Investment Lure',
    badge: 'Pig Butchering Trap',
    recommendedMode: 'prefer_in_cloud',
    text: 'Congratulations! Your profile was selected for our remote AI evaluation team. Earn $450 daily with guaranteed 15% daily crypto arbitrage profit. Contact our VIP manager on Telegram t.me/alpha_crypto_tasks and deposit 50 USDT to unlock daily payout tasks.',
  },
  {
    id: 'legitimate_google_2fa',
    title: 'Legitimate Google 2FA Delivery (Safe Check)',
    badge: 'Zero False-Positive Guard',
    recommendedMode: 'prefer_on_device',
    text: 'Google: Your verification code is 482913. This code expires in 5 minutes. Do NOT share this code with anyone. Google will never ask for this code.',
  },
  {
    id: 'benign_calendar_sync',
    title: 'Corporate Meeting Confirmation (Safe)',
    badge: 'Verified Safe',
    recommendedMode: 'only_on_device',
    text: 'Hi Alex, our quarterly product roadmap sync is confirmed for tomorrow at 2:00 PM EST via Google Meet. The presentation deck has been shared with your team.',
  },
];

export const JUDGE_TOURS = [
  {
    id: 'tour_hybrid_smishing',
    label: '▶ Judge Tour 1: Chase Wire Phishing + Zero-Knowledge PII Diff',
    sampleId: 'chase_wire_fraud',
    mode: 'prefer_on_device',
    explanation:
      'Demonstrates real-time on-device PII scrubbing (US phone, 13-digit account, OTP), subdomain brand spoofing detection (chase-security-fraud-alert.xyz), and PREFER_ON_DEVICE hybrid routing.',
  },
  {
    id: 'tour_safe_otp',
    label: '🛡️ Judge Tour 2: Legitimate Google 2FA (Zero False Positive)',
    sampleId: 'legitimate_google_2fa',
    mode: 'prefer_on_device',
    explanation:
      'Proves ScamShield accurately validates protective security advisories ("Do not share... Google will never ask") as verified SAFE (<= 8/100).',
  },
  {
    id: 'tour_pii_boundary',
    label: '🔒 Judge Tour 3: PayPal SSN + Credit Card + Routing # Privacy Diff',
    sampleId: 'paypal_account_lock',
    mode: 'prefer_in_cloud',
    explanation:
      'Inspect the Side-by-Side Privacy Diff: Social Security Number (123-45-6789), 16-digit Card Number, and 2FA passcode are scrubbed cleanly on-device before cloud eligibility.',
  },
  {
    id: 'tour_offline_only',
    label: '⚡ Judge Tour 4: Strict ONLY_ON_DEVICE Zero-Byte Offline Proof',
    sampleId: 'benign_calendar_sync',
    mode: 'only_on_device',
    explanation:
      'Locks execution to ONLY_ON_DEVICE mode so judges can toggle Chrome DevTools to Offline mode and verify zero network transmission (0 B).',
  },
];
