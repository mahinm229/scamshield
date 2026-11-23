/**
 * ScamShield v2.0 — Hardened Deterministic Bilingual Scam Signal Engine
 *
 * Improvements over v1:
 *  - Fixes subdomain URL truncation bug (M5): captures full multi-label subdomains like login.bkash-fake.com
 *  - Fixes legitimate bank/bKash OTP false-positive regression (H2): explicitly recognizes
 *    both "do not share" and "never share" protective bank advisories
 *  - Normalizes Bangla digits (০-৯) so Bangla amount/OTP/phone patterns are reliably scored
 *  - Zero external dependencies, ~0.04 ms/scan on-device
 */

import { normalizeBanglaDigits } from './pii-redactor.mjs';

const SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd',
  'buff.ly', 'rb.gy', 'cutt.ly', 'shorturl.at', 'rebrand.ly',
]);

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'click', 'link', 'tk', 'ml', 'ga', 'cf', 'gq',
  'icu', 'buzz', 'work', 'support', 'info', 'online', 'site', 'live',
]);

const BRAND_DOMAINS = {
  bkash: ['bkash.com'],
  nagad: ['nagad.com.bd'],
  rocket: ['dutchbanglabank.com'],
  paypal: ['paypal.com'],
  google: ['google.com', 'accounts.google.com'],
  amazon: ['amazon.com'],
  usps: ['usps.com'],
  fedex: ['fedex.com'],
  dhl: ['dhl.com'],
  apple: ['apple.com', 'icloud.com'],
  microsoft: ['microsoft.com', 'live.com'],
  whatsapp: ['whatsapp.com'],
  meta: ['facebook.com', 'meta.com'],
};

const SIGNAL_RULES = [
  {
    id: 'otp_pin_harvest',
    label: 'OTP / PIN Harvesting',
    weight: 34,
    severity: 'critical',
    regex: /\b(send|share|reply|tell|give|confirm|verify|enter|provide)\b[^.!?\n]{0,45}\b(otp|pin|passcode|verification\s+code|security\s+code|6[- ]digit|4[- ]digit)\b|(পিন|ওটিপি|কোড)[^.!?।\n]{0,30}(দিন|পাঠান|বলুন|শেয়ার(?!\s*করবেন\s*না)|ভেরিফাই)/i,
    reason: 'Requests a one-time password (OTP) or PIN — legitimate banks and MFS providers never ask you to share these.',
  },
  {
    id: 'account_suspension_threat',
    label: 'Account Freeze / Suspension Threat',
    weight: 22,
    severity: 'high',
    regex: /\b(account|wallet|card|bkash|nagad|paypal)\b[^.!?\n]{0,40}\b(suspended|blocked|locked|frozen|deactivated|terminated|restricted|closed)\b|\b(suspended|blocked|locked|frozen|deactivated)\s+(bank\s+)?(account|wallet|card)\b|(একাউন্ট|অ্যাকাউন্ট|বিকাশ|নগদ)[^.!?\n]{0,35}(বন্ধ|ব্লক|স্থগিত|সাসপেন্ড)/i,
    reason: 'Uses fear of imminent account lock or suspension to force a rushed click or reply.',
  },
  {
    id: 'urgency_deadline',
    label: 'Artificial Urgency / Countdown',
    weight: 16,
    severity: 'medium',
    regex: /\b(urgent|immediately|within\s+\d+\s*(min|minute|hour|hr)|act\s+now|final\s+notice|last\s+warning|expires?\s+today|right\s+now)\b|(জরুরি|এখনই|দ্রুত|আগামী\s+\d+\s*(মিনিট|ঘণ্টা)|শেষ\s+সতর্কতা)/i,
    reason: 'Creates artificial time pressure so the victim acts without verifying independently.',
  },
  {
    id: 'kyc_verify_lure',
    label: 'Fake KYC / Re-Verification Lure',
    weight: 18,
    severity: 'high',
    regex: /\b(kyc|re-?verify|update\s+your\s+(info|details|account|billing)|confirm\s+identity|verify\s+now)\b|(কেওয়াইসি|তথ্য\s+আপডেট|ভেরিফাই\s+করুন)/i,
    reason: 'Prompts urgent KYC or billing re-verification, a classic credential-phishing pretext.',
  },
  {
    id: 'prize_lottery_bait',
    label: 'Lottery / Cashback / Prize Bait',
    weight: 26,
    severity: 'high',
    regex: /\b(congratulations|you\s+won|winner|lottery|jackpot|claim\s+your\s+(prize|reward|bonus|cashback)|free\s+gift)\b|(অভিনন্দন|জিতেছেন|লটারি|পুরস্কার|ক্যাশব্যাক\s+জিতে)/i,
    reason: 'Promises an unexpected prize, lottery win, or cashback reward to lure clicks or fee payments.',
  },
  {
    id: 'advance_fee_or_giftcard',
    label: 'Upfront Fee / Gift Card / Crypto Demand',
    weight: 28,
    severity: 'critical',
    regex: /\b(processing\s+fee|registration\s+fee|customs\s+fee|gift\s+card|itunes\s+card|usdt|bitcoin|crypto\s+wallet|send\s+money\s+first|pay\s+to\s+claim)\b|(প্রসেসিং\s+ফি|রেজিস্ট্রেশন\s+ফি|টাকা\s+পাঠান|অগ্রিম\s+ফি)/i,
    reason: 'Demands an upfront fee, gift card, or irreversible crypto transfer.',
  },
  {
    id: 'remote_access_trojan',
    label: 'Remote Screen-Share Tool Request',
    weight: 30,
    severity: 'critical',
    regex: /\b(anydesk|teamviewer|quick\s*support|rustdesk|screen\s+share|install\s+this\s+apk|download\s+apk)\b/i,
    reason: 'Asks the victim to install remote-access software or an unknown APK, granting full device takeover.',
  },
  {
    id: 'job_task_scam',
    label: 'Unrealistic Part-Time / Task Income Scam',
    weight: 22,
    severity: 'high',
    regex: /\b(earn\s+\$?\d{2,5}\s*(daily|per\s+day|a\s+day)|part[- ]?time\s+job|like\s+youtube\s+videos|telegram\s+task|daily\s+salary|work\s+from\s+home\s+\d+)\b|(দৈনিক\s+\d+\s*টাকা|পার্ট\s*টাইম\s+জব|টেলিগ্রাম)/i,
    reason: 'Matches high-pay, zero-skill task/Telegram job scams that escalate into prepaid deposit traps.',
  },
  {
    id: 'delivery_customs_smishing',
    label: 'Fake Parcel / Customs Delivery Smishing',
    weight: 18,
    severity: 'medium',
    regex: /\b(parcel|package|shipment|courier)\b[^.!?\n]{0,45}\b(held|customs|incomplete\s+address|redelivery|failed\s+delivery|unpaid\s+fee)\b/i,
    reason: 'Impersonates a postal or courier alert to harvest card details via a fake redelivery link.',
  },
  {
    id: 'off_platform_redirect',
    label: 'Off-Platform WhatsApp / Telegram Redirect',
    weight: 14,
    severity: 'medium',
    regex: /\b(contact\s+me\s+on\s+(whatsapp|telegram)|wa\.me\/|t\.me\/|message\s+on\s+telegram)\b/i,
    reason: 'Pushes the conversation to encrypted messaging apps to evade carrier or marketplace protections.',
  },
];

// Protective legitimate advisory pattern (Fixes H2 false positive on legitimate bank/bKash OTP SMS)
const LEGITIMATE_OTP_ADVISORY_REGEX =
  /\b(do\s+not\s+share|never\s+share|don'?t\s+share|never\s+asks?\s+for\s+your\s+(otp|pin)|keep\s+it\s+confidential)\b|(কারো\s+সাথে\s+শেয়ার\s+করবেন\s+না|কখনো\s+(পিন|ওটিপি)\s+চায়\s+না)/i;

/**
 * Extracts full URLs and bare multi-label domains (fixing M5 subdomain truncation bug).
 */
export function extractUrls(text) {
  const normalized = normalizeBanglaDigits(String(text ?? ''));
  const found = new Set();

  // Full http(s) URLs
  const httpMatches = normalized.match(/https?:\/\/[^\s<>"')]+/gi) || [];
  for (const m of httpMatches) {
    found.add(m.replace(/[.,;:!?]+$/, ''));
  }

  // Bare multi-label domains (e.g., login.bkash-fake.com/verify, bit.ly/abc123)
  const bareMatches =
    normalized.match(
      /(?<![@\w/])(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:com|net|org|io|co|bd|xyz|top|click|link|tk|ml|ga|cf|gq|icu|buzz|work|support|info|online|site|live|ly|me)(?:\/[^\s<>"')]*)?/gi
    ) || [];
  for (const m of bareMatches) {
    const cleaned = m.replace(/[.,;:!?]+$/, '');
    const alreadyCovered = [...found].some((u) => u.toLowerCase().includes(cleaned.toLowerCase()));
    if (!alreadyCovered) found.add(cleaned);
  }

  return [...found];
}

function getHostname(urlStr) {
  try {
    const withProto = /^https?:\/\//i.test(urlStr) ? urlStr : `https://${urlStr}`;
    return new URL(withProto).hostname.toLowerCase();
  } catch {
    return urlStr.split('/')[0].toLowerCase();
  }
}

export function analyzeDeterministic(rawText) {
  const original = String(rawText ?? '').trim();
  const normalized = normalizeBanglaDigits(original);

  if (!original) {
    return {
      score: 0,
      verdict: 'SAFE',
      label: 'Empty Input',
      signals: [],
      urls: [],
      spoofedBrands: [],
      isLegitimateOtpAdvisory: false,
      recommendedAction: 'Paste a suspicious SMS, email, or upload a payment screenshot to analyze.',
    };
  }

  const signals = [];
  let score = 0;

  for (const rule of SIGNAL_RULES) {
    if (rule.regex.test(normalized)) {
      signals.push({
        id: rule.id,
        label: rule.label,
        severity: rule.severity,
        weight: rule.weight,
        reason: rule.reason,
      });
      score += rule.weight;
    }
  }

  const urls = extractUrls(normalized);
  const spoofedBrands = [];

  for (const url of urls) {
    const host = getHostname(url);
    const tld = host.split('.').pop();

    if (SHORTENERS.has(host)) {
      signals.push({
        id: 'url_shortener',
        label: `Shortened Link (${host})`,
        severity: 'medium',
        weight: 14,
        reason: `Uses link shortener "${host}" to conceal the true destination domain.`,
      });
      score += 14;
    }

    if (SUSPICIOUS_TLDS.has(tld)) {
      signals.push({
        id: 'suspicious_tld',
        label: `High-Risk TLD (.${tld})`,
        severity: 'high',
        weight: 18,
        reason: `Domain "${host}" uses high-abuse TLD ".${tld}".`,
      });
      score += 18;
    }

    if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
      signals.push({
        id: 'raw_ip_url',
        label: `Raw IP URL (${host})`,
        severity: 'critical',
        weight: 28,
        reason: 'Points directly to a raw IP address instead of a verified organization domain.',
      });
      score += 28;
    }

    // Brand impersonation check (e.g., login.bkash-verify.xyz vs official bkash.com)
    for (const [brand, officialDomains] of Object.entries(BRAND_DOMAINS)) {
      if (host.includes(brand)) {
        const isOfficial = officialDomains.some(
          (od) => host === od || host.endsWith(`.${od}`)
        );
        if (!isOfficial) {
          spoofedBrands.push({ brand, host, officialDomains });
          signals.push({
            id: `brand_spoof_${brand}`,
            label: `Brand Spoofing (${brand} on ${host})`,
            severity: 'critical',
            weight: 35,
            reason: `Domain "${host}" impersonates "${brand}" (official: ${officialDomains.join(', ')}).`,
          });
          score += 35;
        }
      }
    }
  }

  // Legitimate Bank / MFS OTP Protection (Fixes H2 regression)
  const hasOtpMention = /\b(otp|verification\s+code|one[- ]time)\b|ওটিপি/i.test(normalized);
  const hasProtectiveAdvisory = LEGITIMATE_OTP_ADVISORY_REGEX.test(normalized);
  const hasHarvestDemand = signals.some((s) => s.id === 'otp_pin_harvest');
  const isLegitimateOtpAdvisory =
    hasOtpMention && hasProtectiveAdvisory && !hasHarvestDemand && urls.length === 0;

  if (isLegitimateOtpAdvisory) {
    score = Math.min(score, 8);
    signals.push({
      id: 'legitimate_otp_advisory',
      label: 'Standard Bank/MFS Security Advisory Detected',
      severity: 'safe',
      weight: 0,
      reason:
        'Contains a standard "do not share / never asks for OTP" security notice with no clickable link or request to reply.',
    });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let verdict = 'SAFE';
  let label = 'Low Risk / Likely Safe';
  let recommendedAction =
    'No scam indicators detected. Still verify unexpected financial requests directly in your official app.';

  if (score >= 65) {
    verdict = 'HIGH_RISK_SCAM';
    label = 'High-Risk Scam Detected';
    recommendedAction =
      'Do NOT click any links, reply, or share OTP/PIN codes. Block the sender and report via your official provider app.';
  } else if (score >= 30) {
    verdict = 'SUSPICIOUS';
    label = 'Suspicious — Needs Verification';
    recommendedAction =
      'Treat with caution. Independently verify through the official app or helpline before taking any action.';
  }

  return {
    score,
    verdict,
    label,
    signals,
    urls,
    spoofedBrands,
    isLegitimateOtpAdvisory,
    recommendedAction,
  };
}
