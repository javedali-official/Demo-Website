export interface PatientAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  patientRecordId: string;
  treatmentType: string;
  doctorName: string;
  currentStep: number;
  totalSteps: number;
  daysUntilNextStep: number;
  nextAppointment: {
    title: string;
    date: string;
    time: string;
    location: string;
  };
  financing: {
    monthlyAmount: number;
    paidCount: number;
    totalCount: number;
    nextDueDate: string;
  };
}

export const DEMO_PATIENT: PatientAccount = {
  id: 'pt-001',
  name: 'Clara Montgomery',
  email: 'clara@example.com',
  phone: '+1 (555) 349-1100',
  patientRecordId: 'FRM-94821',
  treatmentType: 'Clear Aligners (3D Guided)',
  doctorName: 'Dr. Elena Vance, DDS, MS',
  currentStep: 8,
  totalSteps: 18,
  daysUntilNextStep: 4,
  nextAppointment: {
    title: 'Progress Scan & Next Tray Delivery',
    date: 'Thursday, Nov 12, 2026',
    time: '10:30 AM',
    location: 'Downtown Studio (Suite 1200)',
  },
  financing: {
    monthlyAmount: 220,
    paidCount: 8,
    totalCount: 18,
    nextDueDate: 'Nov 1, 2026',
  },
};

export function validatePatientLogin(
  identifier: string,
  passcode: string
): { isValid: boolean; error?: string } {
  if (!identifier || identifier.trim().length === 0) {
    return { isValid: false, error: 'Please enter your registered email or Patient ID.' };
  }
  if (!passcode || passcode.trim().length < 4) {
    return { isValid: false, error: 'Password or PIN must be at least 4 characters.' };
  }
  return { isValid: true };
}

export function validateOtpCode(code: string): boolean {
  return /^\d{6}$/.test(code.trim());
}

export function calculateProgressPercentage(current: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / total) * 100)));
}
