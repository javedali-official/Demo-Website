export interface Treatment {
  id: string;
  title: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  idealFor: string;
  durationContext: string;
  image: string;
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  consultationMethod: 'in-person' | 'virtual';
  treatmentInterest: 'clear-aligners' | 'traditional-braces' | 'ceramic-braces' | 'child-orthodontics' | 'not-sure';
  preferredLocation: string;
  preferredDate: string;
  preferredTimeOfDay: 'morning' | 'afternoon' | 'anytime';
  message: string;
  privacyConsent: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  privacyConsent?: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  tag: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  parkingInfo: string;
  coordinates: { x: number; y: number }; // Relative percentage for map placement
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'first-visit' | 'treatments' | 'financing' | 'care';
}

export interface PatientStory {
  id: string;
  initials: string;
  firstName: string;
  treatment: string;
  duration: string;
  story: string;
  outcomeQuote: string;
  verifiedConsent: boolean;
  beforeImage: string;
  afterImage: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  treatment: string;
  text: string;
  source: string;
}
