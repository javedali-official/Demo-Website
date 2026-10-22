import { ToastItem, ToastOptions, ToastType } from '../types/toast';

export const MAX_TOASTS = 5;
export const DEFAULT_TOAST_DURATION = 5000;

let toastCounter = 0;

/**
 * Generate a unique ID for a toast
 */
export function generateToastId(): string {
  toastCounter += 1;
  return `toast-${Date.now()}-${toastCounter}`;
}

/**
 * Pure state manager for adding a toast into an existing list
 * Keeps maximum MAX_TOASTS toasts, evicting the oldest if limit exceeded
 */
export function addToastToList(
  currentToasts: ToastItem[],
  options: ToastOptions,
  customId?: string
): { toasts: ToastItem[]; newId: string } {
  const id = customId || generateToastId();
  const newToast: ToastItem = {
    ...options,
    id,
    timestamp: Date.now(),
    duration: options.duration !== undefined ? options.duration : DEFAULT_TOAST_DURATION,
  };

  // If already at or above MAX_TOASTS, evict the oldest
  const trimmed = currentToasts.length >= MAX_TOASTS
    ? currentToasts.slice(currentToasts.length - (MAX_TOASTS - 1))
    : currentToasts;

  return {
    toasts: [...trimmed, newToast],
    newId: id,
  };
}

/**
 * Remove a toast by id from list
 */
export function removeToastFromList(currentToasts: ToastItem[], id: string): ToastItem[] {
  return currentToasts.filter((t) => t.id !== id);
}

/**
 * Helper to construct a formatted consultation booking success toast payload
 */
export function formatBookingSuccessToast(patientName: string, bookingRef: string, treatmentTitle: string): ToastOptions {
  return {
    type: 'success',
    title: 'Consultation Request Confirmed',
    description: `Thank you, ${patientName}! Your inquiry for ${treatmentTitle} has been received. Our coordinator will contact you shortly.`,
    referenceId: bookingRef,
    duration: 6500,
  };
}
