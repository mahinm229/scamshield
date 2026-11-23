/**
 * ScamShield v2.0 — Curated Bilingual Samples & 4 Interactive Judge Verification Tours
 */

export const SAMPLES = [
  {
    id: 'bkash_smishing_bn',
    title: 'bKash Account Freeze + OTP (Bangla)',
    badge: 'Critical Smishing',
    recommendedMode: 'prefer_on_device',
    text: 'জরুরি সতর্কতা! প্রিয় Rahim, আপনার বিকাশ একাউন্ট ০১৭১২৩৪৫৬৭৮ আগামী ৩০ মিনিটে বন্ধ হয়ে যাবে। এখনই আপনার পিন 4829 এবং ওটিপি ৫৫৪৪৩৩ পাঠান অথবা login.bkash-verify-bd.xyz লিংকে গিয়ে কেওয়াইসি আপডেট করুন।',
  },
  {
    id: 'legitimate_bkash_otp',
    title: 'Legitimate bKash OTP SMS (Safe Check)',
    badge: 'False-Positive Guard',
    recommendedMode: 'prefer_on_device',
    text: 'Your bKash verification OTP is 482913. Do not share it with anyone. bKash never asks for your OTP or PIN.',
  },
  {
    id: 'usps_parcel_phish',
    title: 'USPS Customs Redelivery Phishing',
    badge: 'Subdomain Spoof',
    recommendedMode: 'prefer_on_device',
    text: 'USPS Final Notice: Dear John Carter, your parcel is held at customs due to an incomplete address. Pay the $2.95 redelivery fee immediately at track.usps-redelivery-fee.top/confirm or it returns today.',
  },
  {
    id: 'telegram_task_scam',
    title: 'Telegram Daily Salary Task Scam',
    badge: 'Advance-Fee Trap',
    recommendedMode: 'prefer_in_cloud',
    text: 'Congratulations! You are selected for a remote part-time job to earn $350 daily liking YouTube videos. Contact our HR manager on Telegram t.me/hr_fastpay_tasks and pay a $25 registration fee via USDT to unlock tasks.',
  },
  {
    id: 'remote_anydesk_bank',
    title: 'Fake Bank Support + AnyDesk Takeover',
    badge: 'Device Takeover',
    recommendedMode: 'prefer_in_cloud',
    text: 'Urgent Bank Alert: Account 1234567890123 flagged for fraud. Install AnyDesk immediately and tell our agent your 6-digit security code 918273 or your card 4532-1198-4421-9088 will be frozen.',
  },
  {
    id: 'benign_family_msg',
    title: 'Normal Personal Message (Safe)',
    badge: 'Verified Safe',
    recommendedMode: 'only_on_device',
    text: 'Hi mom, I just finished my class and I will be home by 7 PM. Let me know if you need groceries on the way back.',
  },
];

export const JUDGE_TOURS = [
  {
    id: 'tour_hybrid_smishing',
    label: '▶ Judge Tour 1: Bangla bKash Smishing + PII Privacy Diff',
    sampleId: 'bkash_smishing_bn',
    mode: 'prefer_on_device',
    explanation:
      'Demonstrates bilingual Bangla/English PII redaction (Bangla digits ০১৭..., PIN, OTP), subdomain brand spoofing detection (login.bkash-verify-bd.xyz), and PREFER_ON_DEVICE hybrid routing.',
  },
  {
    id: 'tour_safe_otp',
    label: '🛡️ Judge Tour 2: Legitimate Bank OTP (Zero False Positive)',
    sampleId: 'legitimate_bkash_otp',
    mode: 'prefer_on_device',
    explanation:
      'Proves ScamShield does NOT false-positive on legitimate bank/bKash OTP advisories ("Do not share... never asks for your OTP").',
  },
  {
    id: 'tour_pii_boundary',
    label: '🔒 Judge Tour 3: 13-Digit Account + Card + AnyDesk Privacy Diff',
    sampleId: 'remote_anydesk_bank',
    mode: 'prefer_in_cloud',
    explanation:
      'Inspect the Side-by-Side Privacy Diff: 13-digit Account #, 16-digit Card #, and 6-digit security code are scrubbed cleanly on-device before any cloud call.',
  },
  {
    id: 'tour_offline_only',
    label: '⚡ Judge Tour 4: Strict ONLY_ON_DEVICE Zero-Byte Proof',
    sampleId: 'benign_family_msg',
    mode: 'only_on_device',
    explanation:
      'Locks execution to ONLY_ON_DEVICE mode so judges can toggle Chrome DevTools Offline and verify 0 bytes ever leave the device.',
  },
];
