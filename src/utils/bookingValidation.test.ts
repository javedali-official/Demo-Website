import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidPhone,
  isFutureOrTodayDate,
  validateBookingForm,
  generateBookingReference,
} from './bookingValidation.ts';

test('isValidEmail handles valid and invalid email addresses', () => {
  assert.equal(isValidEmail('patient@example.com'), true);
  assert.equal(isValidEmail('dr.sarah@forme-ortho.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('   '), false);
});

test('isValidPhone accepts standard domestic and international numbers', () => {
  assert.equal(isValidPhone('+1 (555) 234-5678'), true);
  assert.equal(isValidPhone('5551234567'), true);
  assert.equal(isValidPhone('+44 20 7946 0991'), true);
  assert.equal(isValidPhone('123'), false); // Too short
  assert.equal(isValidPhone('abcdefghij'), false);
  assert.equal(isValidPhone(''), false);
});

test('isFutureOrTodayDate accurately distinguishes past and future dates', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  assert.equal(isFutureOrTodayDate(tomorrowStr), true);
  assert.equal(isFutureOrTodayDate(yesterdayStr), false);
  assert.equal(isFutureOrTodayDate(''), true); // optional
});

test('validateBookingForm reports all required missing fields', () => {
  const emptyResult = validateBookingForm({});
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.privacyConsent);
});

test('validateBookingForm succeeds with complete valid consultation payload', () => {
  const validData = {
    fullName: 'Clara Montgomery',
    email: 'clara@example.com',
    phone: '+1 (555) 349-2810',
    consultationMethod: 'in-person' as const,
    treatmentInterest: 'clear-aligners' as const,
    preferredLocation: 'flagship',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTimeOfDay: 'morning' as const,
    message: 'Interested in invisible aligners for my lower teeth.',
    privacyConsent: true,
  };

  const result = validateBookingForm(validData);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('generateBookingReference produces formatted reference ID', () => {
  const ref = generateBookingReference('FRM');
  assert.match(ref, /^FRM-\d{4}-\d{4}$/);
});
