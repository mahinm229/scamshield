import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBanglaDigits, redactPII } from '../src/pii-redactor.mjs';

test('1. normalizeBanglaDigits converts all Bangla numerals ০-৯ accurately', () => {
  assert.equal(normalizeBanglaDigits('০১৭১২৩৪৫৬৭৮ ওটিপি ৫৫৪৪৩৩'), '01712345678 ওটিপি 554433');
});

test('2. H3 Fix: Redacts Bangla mobile number, Bangla PIN, and Bangla OTP completely', () => {
  const raw = 'আপনার বিকাশ নম্বর ০১৭১২৩৪৫৬৭৮, পিন 4829 এবং ওটিপি ৫৫৪৪৩৩ পাঠান।';
  const res = redactPII(raw);
  assert.ok(!res.sanitized.includes('01712345678'));
  assert.ok(!res.sanitized.includes('4829'));
  assert.ok(!res.sanitized.includes('554433'));
  assert.ok(res.sanitized.includes('[REDACTED_PHONE]'));
  assert.ok(res.sanitized.includes('[REDACTED_CODE]'));
  assert.ok(res.redactionCount >= 3);
});

test('3. H3 Fix: 13-digit Account number is redacted cleanly as [REDACTED_ACCOUNT], NEVER mangled into [REDACTED_PHONE]23', () => {
  const raw = 'Urgent alert for Account 1234567890123 flagged for review.';
  const res = redactPII(raw);
  assert.ok(!res.sanitized.includes('1234567890123'));
  assert.ok(!res.sanitized.includes('[REDACTED_PHONE]23'), `Corrupted output: ${res.sanitized}`);
  assert.ok(res.sanitized.includes('[REDACTED_ACCOUNT]'));
});

test('4. Redacts 16-digit payment card, email, US phone, and greeting name', () => {
  const raw = 'Dear John Carter, confirm card 4532-1198-4421-9088 or call +1-555-234-5678 or email john.carter@example.com.';
  const res = redactPII(raw);
  assert.ok(res.sanitized.includes('[REDACTED_USER]'));
  assert.ok(res.sanitized.includes('[REDACTED_CARD]'));
  assert.ok(res.sanitized.includes('[REDACTED_PHONE]'));
  assert.ok(res.sanitized.includes('[REDACTED_EMAIL]'));
  assert.ok(!res.sanitized.includes('4532'));
  assert.ok(!res.sanitized.includes('john.carter@example.com'));
});

test('5. Produces accurate UTF-8 byte counts and non-empty disclaimer', () => {
  const res = redactPII('Hello world');
  assert.equal(res.rawBytes, 11);
  assert.equal(res.sanitizedBytes, 11);
  assert.equal(res.redactionCount, 0);
  assert.ok(res.disclaimer.length > 20);
});
