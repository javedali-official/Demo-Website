import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateToastId,
  addToastToList,
  removeToastFromList,
  formatBookingSuccessToast,
  MAX_TOASTS,
} from './toastManager.ts';
import { ToastItem, ToastOptions } from '../types/toast.ts';

test('generateToastId returns non-empty unique string', () => {
  const id1 = generateToastId();
  const id2 = generateToastId();
  assert.ok(id1.startsWith('toast-'));
  assert.ok(id2.startsWith('toast-'));
  assert.notEqual(id1, id2);
});

test('addToastToList appends a new toast item with defaults', () => {
  const initial: ToastItem[] = [];
  const options: ToastOptions = {
    type: 'success',
    title: 'Consultation Submitted',
    description: 'We have received your appointment request.',
  };

  const result = addToastToList(initial, options, 'custom-id-1');
  assert.equal(result.toasts.length, 1);
  assert.equal(result.toasts[0].id, 'custom-id-1');
  assert.equal(result.toasts[0].title, 'Consultation Submitted');
  assert.equal(result.toasts[0].duration, 5000);
});

test('addToastToList limits list size to MAX_TOASTS by dropping oldest', () => {
  let toasts: ToastItem[] = [];
  for (let i = 1; i <= MAX_TOASTS + 2; i++) {
    const res = addToastToList(
      toasts,
      {
        type: 'info',
        title: `Toast ${i}`,
      },
      `toast-${i}`
    );
    toasts = res.toasts;
  }

  assert.equal(toasts.length, MAX_TOASTS);
  // The first 2 should have been evicted
  assert.equal(toasts[0].id, 'toast-3');
  assert.equal(toasts[toasts.length - 1].id, `toast-${MAX_TOASTS + 2}`);
});

test('removeToastFromList correctly filters out targeted toast', () => {
  const initial: ToastItem[] = [
    { id: '1', type: 'info', title: 'One', timestamp: 100 },
    { id: '2', type: 'success', title: 'Two', timestamp: 200 },
    { id: '3', type: 'warning', title: 'Three', timestamp: 300 },
  ];

  const filtered = removeToastFromList(initial, '2');
  assert.equal(filtered.length, 2);
  assert.deepEqual(filtered.map(t => t.id), ['1', '3']);
});

test('formatBookingSuccessToast constructs valid payload with reference', () => {
  const payload = formatBookingSuccessToast('Eleanor Vance', 'FORME-8921-3942', 'Clear Aligners');
  assert.equal(payload.type, 'success');
  assert.equal(payload.title, 'Consultation Request Confirmed');
  assert.ok(typeof payload.description === 'string' && payload.description.includes('Eleanor Vance'));
  assert.equal(payload.referenceId, 'FORME-8921-3942');
  assert.equal(payload.duration, 6500);
});
