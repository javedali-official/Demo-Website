import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePatientLogin,
  validateOtpCode,
  calculateProgressPercentage,
  DEMO_PATIENT,
} from './portalAuth';

test('validatePatientLogin validates empty inputs and minimum passcode length', () => {
  assert.equal(validatePatientLogin('', '1234').isValid, false);
  assert.equal(validatePatientLogin('clara@example.com', '').isValid, false);
  assert.equal(validatePatientLogin('clara@example.com', '12').isValid, false);
  assert.equal(validatePatientLogin('clara@example.com', '1234').isValid, true);
  assert.equal(validatePatientLogin('FRM-94821', 'secretPass123').isValid, true);
});

test('validateOtpCode strictly requires 6 numeric digits', () => {
  assert.equal(validateOtpCode('123456'), true);
  assert.equal(validateOtpCode('000000'), true);
  assert.equal(validateOtpCode('12345'), false);
  assert.equal(validateOtpCode('1234567'), false);
  assert.equal(validateOtpCode('abcdef'), false);
  assert.equal(validateOtpCode(''), false);
});

test('calculateProgressPercentage calculates bound integer percentages', () => {
  assert.equal(calculateProgressPercentage(8, 18), 44);
  assert.equal(calculateProgressPercentage(0, 18), 0);
  assert.equal(calculateProgressPercentage(18, 18), 100);
  assert.equal(calculateProgressPercentage(20, 18), 100); // capped at 100
  assert.equal(calculateProgressPercentage(5, 0), 0);
});

test('DEMO_PATIENT contains realistic structured patient record', () => {
  assert.equal(DEMO_PATIENT.name, 'Clara Montgomery');
  assert.equal(DEMO_PATIENT.patientRecordId, 'FRM-94821');
  assert.ok(DEMO_PATIENT.nextAppointment.date);
});
