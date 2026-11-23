import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeDeterministic, extractUrls } from '../src/detector.mjs';

test('1. Empty input returns SAFE score 0', () => {
  const res = analyzeDeterministic('   ');
  assert.equal(res.score, 0);
  assert.equal(res.verdict, 'SAFE');
});

test('2. H2 Regression Guard: Legitimate bKash OTP with "Do not share" scores SAFE (<= 8)', () => {
  const sms = 'Your bKash verification OTP is 482913. Do not share it with anyone. bKash never asks for your OTP or PIN.';
  const res = analyzeDeterministic(sms);
  assert.equal(res.verdict, 'SAFE');
  assert.ok(res.score <= 8, `Expected <= 8, got ${res.score}`);
  assert.equal(res.isLegitimateOtpAdvisory, true);
});

test('3. H2 Regression Guard: Legitimate Bangla OTP advisory scores SAFE', () => {
  const sms = 'আপনার ওটিপি ৫৫৪৪৩৩। এটি কারো সাথে শেয়ার করবেন না। বিকাশ কখনো পিন চায় না।';
  const res = analyzeDeterministic(sms);
  assert.equal(res.verdict, 'SAFE');
  assert.ok(res.score <= 8);
});

test('4. Bangla bKash smishing with OTP harvest + subdomain spoof scores HIGH_RISK_SCAM', () => {
  const sms = 'জরুরি সতর্কতা! আপনার বিকাশ একাউন্ট বন্ধ হয়ে যাবে। এখনই আপনার পিন 4829 পাঠান অথবা login.bkash-verify-bd.xyz লিংকে কেওয়াইসি আপডেট করুন।';
  const res = analyzeDeterministic(sms);
  assert.equal(res.verdict, 'HIGH_RISK_SCAM');
  assert.ok(res.score >= 80, `Expected >= 80, got ${res.score}`);
  assert.ok(res.urls.includes('login.bkash-verify-bd.xyz'));
  assert.ok(res.spoofedBrands.some((b) => b.brand === 'bkash' && b.host === 'login.bkash-verify-bd.xyz'));
});

test('5. M5 Fix: extractUrls captures full multi-label subdomains without truncation', () => {
  const urls = extractUrls('Visit login.bkash-fake.com/kyc and track.usps-redelivery-fee.top/confirm now');
  assert.ok(urls.includes('login.bkash-fake.com/kyc'));
  assert.ok(urls.includes('track.usps-redelivery-fee.top/confirm'));
});

test('6. Official brand domain (bkash.com) is NOT flagged as brand spoofing', () => {
  const res = analyzeDeterministic('Check official updates at https://www.bkash.com/offers');
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
  const res = analyzeDeterministic('Verify your account immediately at http://192.168.10.45/login');
  assert.ok(res.signals.some((s) => s.id === 'raw_ip_url'));
});

test('10. Benign personal message scores 0 SAFE', () => {
  const res = analyzeDeterministic('Hi mom, I will be home by 7 PM. Need any groceries?');
  assert.equal(res.score, 0);
  assert.equal(res.verdict, 'SAFE');
});
