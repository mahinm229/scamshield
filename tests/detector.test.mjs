import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeDeterministic, extractUrls } from '../src/detector.mjs';

test('1. Empty input returns SAFE score 0', () => {
  const res = analyzeDeterministic('   ');
  assert.equal(res.score, 0);
  assert.equal(res.verdict, 'SAFE');
});

test('2. False-Positive Guard: Legitimate Chase 2FA with "Do not share" scores SAFE (<= 8)', () => {
  const sms = 'Your Chase verification OTP is 482913. Do not share it with anyone. Chase will never ask for your OTP or PIN.';
  const res = analyzeDeterministic(sms);
  assert.equal(res.verdict, 'SAFE');
  assert.ok(res.score <= 8, `Expected <= 8, got ${res.score}`);
  assert.equal(res.isLegitimateOtpAdvisory, true);
});

test('3. False-Positive Guard: Legitimate Google 2FA passcode scores SAFE', () => {
  const sms = 'Your Google verification passcode is 554433. Never share this code with anyone. Google will never ask for it.';
  const res = analyzeDeterministic(sms);
  assert.equal(res.verdict, 'SAFE');
  assert.ok(res.score <= 8);
  assert.equal(res.isLegitimateOtpAdvisory, true);
});

test('4. Chase smishing with OTP harvest + subdomain spoof scores HIGH_RISK_SCAM', () => {
  const sms = 'Urgent Chase Alert! Your account is suspended. Verify immediately: reply with OTP 4829 or unlock at login.chase-verify-fraud.xyz now.';
  const res = analyzeDeterministic(sms);
  assert.equal(res.verdict, 'HIGH_RISK_SCAM');
  assert.ok(res.score >= 80, `Expected >= 80, got ${res.score}`);
  assert.ok(res.urls.includes('login.chase-verify-fraud.xyz'));
  assert.ok(res.spoofedBrands.some((b) => b.brand === 'chase' && b.host === 'login.chase-verify-fraud.xyz'));
});

test('5. M5 Fix: extractUrls captures full multi-label subdomains without truncation', () => {
  const urls = extractUrls('Visit login.chase-fake.com/kyc and track.usps-redelivery-fee.top/confirm now');
  assert.ok(urls.includes('login.chase-fake.com/kyc'));
  assert.ok(urls.includes('track.usps-redelivery-fee.top/confirm'));
});

test('6. Official brand domain (chase.com, paypal.com) is NOT flagged as brand spoofing', () => {
  const res = analyzeDeterministic('Check official updates at https://www.chase.com/security');
  assert.equal(res.spoofedBrands.length, 0);
  assert.equal(res.verdict, 'SAFE');
});

test('7. Remote access tool (AnyDesk) + OTP request triggers HIGH_RISK_SCAM', () => {
  const res = analyzeDeterministic('Urgent! Install AnyDesk now and share your 6-digit security code immediately.');
  assert.equal(res.verdict, 'HIGH_RISK_SCAM');
  assert.ok(res.signals.some((s) => s.id === 'remote_access_trojan'));
});

test('8. Telegram daily salary + USDT fee triggers HIGH_RISK_SCAM', () => {
  const res = analyzeDeterministic('Congratulations! Earn $350 daily liking YouTube videos. Contact t.me/hr_tasks and pay registration fee via USDT.');
  assert.equal(res.verdict, 'HIGH_RISK_SCAM');
  assert.ok(res.signals.some((s) => s.id === 'job_task_scam'));
  assert.ok(res.signals.some((s) => s.id === 'advance_fee_or_giftcard'));
});

test('9. Raw IP URL triggers critical raw_ip_url signal', () => {
  const res = analyzeDeterministic('Your account is locked. Verify at http://185.220.101.4/login immediately');
  assert.ok(res.signals.some((s) => s.id === 'raw_ip_url'));
  assert.equal(res.verdict, 'HIGH_RISK_SCAM');
});

test('10. Benign personal and work messages score 0 SAFE', () => {
  const res = analyzeDeterministic('Hey Dave, are we still meeting for lunch at 12:30 PM today?');
  assert.equal(res.score, 0);
  assert.equal(res.verdict, 'SAFE');
});
