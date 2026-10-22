import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Send,
  RefreshCw,
  BellRing,
} from 'lucide-react';
import { PRACTICE_CONFIG, CLINIC_LOCATIONS, TREATMENTS } from '../data/orthoData';
import { ConsultationFormData, FormValidationErrors } from '../types';
import { validateBookingForm, generateBookingReference } from '../utils/bookingValidation';
import { useToast } from '../context/ToastContext';

interface ConsultationBookingProps {
  initialTreatmentId?: string;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  initialTreatmentId,
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    phone: '',
    consultationMethod: 'in-person',
    treatmentInterest:
      (initialTreatmentId as any) || 'clear-aligners',
    preferredLocation: CLINIC_LOCATIONS[0].id,
    preferredDate: '',
    preferredTimeOfDay: 'morning',
    message: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear inline error on change
    if (errors[name as keyof FormValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const triggerConfirmationToast = (refCode: string) => {
    const treatmentObj = TREATMENTS.find((t) => t.id === formData.treatmentInterest);
    const treatmentName = treatmentObj ? treatmentObj.title : 'Orthodontic Consultation';
    toast.success(
      'Consultation Request Confirmed!',
      `Thank you, ${formData.fullName}! Your request for ${treatmentName} has been received. Our coordinator will contact you within 1 business day.`,
      {
        referenceId: refCode,
        duration: 6500,
        action: {
          label: 'View Summary',
          onClick: () => {
            const el = document.getElementById('booking');
            el?.scrollIntoView({ behavior: 'smooth' });
          },
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.warning(
        'Incomplete Consultation Details',
        'Please complete the highlighted required fields before submitting your request.'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic server processing delay
    setTimeout(() => {
      const ref = generateBookingReference('FORME');
      setBookingReference(ref);
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerConfirmationToast(ref);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      consultationMethod: 'in-person',
      treatmentInterest: 'clear-aligners',
      preferredLocation: CLINIC_LOCATIONS[0].id,
      preferredDate: '',
      preferredTimeOfDay: 'morning',
      message: '',
      privacyConsent: false,
    });
    setErrors({});
    setIsSuccess(false);
    setBookingReference('');
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#171715]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
            Begin Your Smile Journey
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
            Ready to take the first step?
          </h2>
          <p className="text-base sm:text-lg text-[#777771] mt-4 leading-relaxed">
            Let’s talk about your smile, explore your options, and help you understand what comes next.
          </p>
        </div>

        {/* Main Booking Container */}
        <div className="max-w-4xl mx-auto">
          {isSuccess ? (
            /* Confirmation Success State */
            <div className="bg-[#FAF9F6] rounded-3xl p-8 sm:p-12 border border-[#171715]/10 text-center shadow-md animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-widest text-[#A95B30]">
                Consultation Inquiry Received
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#171715] mt-2">
                Thank you, {formData.fullName}!
              </h3>
              
              <div className="mt-4 inline-block bg-white px-4 py-2 rounded-xl border border-black/5 shadow-xs">
                <span className="text-xs text-[#777771]">Inquiry Reference: </span>
                <span className="text-sm font-bold font-mono text-[#171715]">{bookingReference}</span>
              </div>

              <p className="text-sm sm:text-base text-[#777771] mt-6 max-w-xl mx-auto leading-relaxed">
                Our patient coordinator has received your consultation request for{' '}
                <strong className="text-[#171715]">
                  {formData.consultationMethod === 'in-person' ? 'an In-Person visit' : 'a Virtual video consult'}
                </strong>
                . We will reach out via <strong className="text-[#171715]">{formData.phone}</strong> and{' '}
                <strong className="text-[#171715]">{formData.email}</strong> within 1 business day to confirm your time slot.
              </p>

              {/* Consultation Summary Card */}
              <div className="mt-8 p-6 bg-white rounded-2xl border border-black/5 text-left max-w-lg mx-auto text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-[#777771]">Patient Name:</span>
                  <span className="font-semibold text-[#171715]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-[#777771]">Treatment Focus:</span>
                  <span className="font-semibold text-[#171715] capitalize">
                    {formData.treatmentInterest.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-[#777771]">Method:</span>
                  <span className="font-semibold text-[#171715] capitalize">
                    {formData.consultationMethod}
                  </span>
                </div>
                {formData.preferredDate && (
                  <div className="flex justify-between py-1 border-b border-black/5">
                    <span className="text-[#777771]">Target Date:</span>
                    <span className="font-semibold text-[#171715]">{formData.preferredDate} ({formData.preferredTimeOfDay})</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-[#777771]">Location:</span>
                  <span className="font-semibold text-[#171715]">
                    {CLINIC_LOCATIONS.find((l) => l.id === formData.preferredLocation)?.name}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => triggerConfirmationToast(bookingReference)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
                >
                  <BellRing className="w-4 h-4 text-emerald-600" />
                  <span>Re-display Toast Notification</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#171715] text-white hover:bg-[#2A2A26] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Submit Another Inquiry</span>
                </button>
                <a
                  href={`tel:${PRACTICE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-[#171715] bg-white border border-black/10 hover:bg-black/5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#A95B30]" />
                  <span>Call Practice</span>
                </a>
              </div>

              <p className="text-[11px] text-[#777771] mt-6">
                *Demo inquiry flow. No confidential patient data is transmitted to insecure third parties.
              </p>
            </div>
          ) : (
            /* Booking Form */
            <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#171715]/10 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Method Selector: In-Person vs Virtual */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171715] mb-2">
                    Preferred Consultation Method *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.consultationMethod === 'in-person'
                          ? 'bg-white border-[#171715] shadow-xs'
                          : 'bg-[#F8F6F1] border-black/5 hover:border-black/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationMethod"
                        value="in-person"
                        checked={formData.consultationMethod === 'in-person'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#171715] focus:ring-[#A95B30]"
                      />
                      <div>
                        <span className="text-sm font-semibold text-[#171715] block">
                          In-Person Consultation
                        </span>
                        <span className="text-xs text-[#777771]">
                          Includes 3D scan & comprehensive oral examination
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.consultationMethod === 'virtual'
                          ? 'bg-white border-[#171715] shadow-xs'
                          : 'bg-[#F8F6F1] border-black/5 hover:border-black/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationMethod"
                        value="virtual"
                        checked={formData.consultationMethod === 'virtual'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#171715] focus:ring-[#A95B30]"
                      />
                      <div>
                        <span className="text-sm font-semibold text-[#171715] block">
                          Virtual Consultation
                        </span>
                        <span className="text-xs text-[#777771]">
                          Video call to discuss goals and preliminary options
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Personal Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Clara Montgomery"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#171715] placeholder-[#777771]/50 focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.fullName
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-black/10 focus:ring-[#A95B30]/30 focus:border-[#A95B30]'
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. clara@example.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#171715] placeholder-[#777771]/50 focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-black/10 focus:ring-[#A95B30]/30 focus:border-[#A95B30]'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 234-5678"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#171715] placeholder-[#777771]/50 focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-black/10 focus:ring-[#A95B30]/30 focus:border-[#A95B30]'
                      }`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label htmlFor="preferredLocation" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Preferred Clinic Studio *
                    </label>
                    <select
                      id="preferredLocation"
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-[#171715] focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                    >
                      {CLINIC_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} ({loc.tag})
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Treatment Interest & Scheduling Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Treatment Interest */}
                  <div>
                    <label htmlFor="treatmentInterest" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Treatment of Interest
                    </label>
                    <select
                      id="treatmentInterest"
                      name="treatmentInterest"
                      value={formData.treatmentInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-[#171715] focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                    >
                      <option value="clear-aligners">Clear Aligners</option>
                      <option value="traditional-braces">Traditional Braces</option>
                      <option value="ceramic-braces">Ceramic Braces</option>
                      <option value="child-orthodontics">Child / Teen Orthodontics</option>
                      <option value="not-sure">Not Sure Yet (Dr. Recommendation)</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Target Date (Optional)
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#171715] focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.preferredDate
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-black/10 focus:ring-[#A95B30]/30 focus:border-[#A95B30]'
                      }`}
                      aria-invalid={!!errors.preferredDate}
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Time of Day */}
                  <div>
                    <label htmlFor="preferredTimeOfDay" className="block text-xs font-semibold text-[#171715] mb-1.5">
                      Preferred Time of Day
                    </label>
                    <select
                      id="preferredTimeOfDay"
                      name="preferredTimeOfDay"
                      value={formData.preferredTimeOfDay}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-[#171715] focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                    >
                      <option value="morning">Morning (8:00 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM – 5:00 PM)</option>
                      <option value="anytime">Any Available Slot</option>
                    </select>
                  </div>

                </div>

                {/* Optional Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#171715] mb-1.5">
                    Tell us about your smile goals or questions (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Interested in closing a gap between front teeth; previously had braces as a teen..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-[#171715] placeholder-[#777771]/50 focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 rounded-sm text-[#171715] focus:ring-[#A95B30]"
                    />
                    <span className="text-xs text-[#777771] leading-relaxed">
                      I agree to the privacy policy and consent to FORME Orthodontics contacting me via email, phone, or SMS regarding my consultation request. No marketing spam.
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.privacyConsent}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action & Alternatives */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center sm:text-right text-xs text-[#777771]">
                    <span>Or book via direct call: </span>
                    <a
                      href={`tel:${PRACTICE_CONFIG.phoneRaw}`}
                      className="font-bold text-[#171715] hover:text-[#A95B30] underline ml-1"
                    >
                      {PRACTICE_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
