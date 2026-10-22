import { ConsultationFormData, FormValidationErrors } from '../types';

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // Standard RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  // Stripped of separators must have between 7 and 15 digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export function isFutureOrTodayDate(dateString: string): boolean {
  if (!dateString) return true; // Optional date if empty, but if specified must not be in past
  const inputDate = new Date(dateString);
  if (isNaN(inputDate.getTime())) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate >= today;
}

export function validateBookingForm(data: Partial<ConsultationFormData>): {
  isValid: boolean;
  errors: FormValidationErrors;
} {
  const errors: FormValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Please provide a valid phone number (at least 7 digits).';
  }

  if (data.preferredDate && !isFutureOrTodayDate(data.preferredDate)) {
    errors.preferredDate = 'Preferred appointment date cannot be in the past.';
  }

  if (!data.privacyConsent) {
    errors.privacyConsent = 'You must agree to the privacy policy to request a consultation.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBookingReference(prefix = 'FRM'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomSuffix}`;
}
