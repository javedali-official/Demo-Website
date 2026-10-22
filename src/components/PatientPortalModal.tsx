import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  User,
  KeyRound,
  Calendar,
  Sparkles,
  ArrowRight,
  LogOut,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from 'lucide-react';
import {
  DEMO_PATIENT,
  PatientAccount,
  validatePatientLogin,
  validateOtpCode,
  calculateProgressPercentage,
} from '../utils/portalAuth';
import { PRACTICE_CONFIG } from '../data/orthoData';
import { useToast } from '../context/ToastContext';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [step, setStep] = useState<'login' | 'otp' | 'forgot' | 'authenticated'>('login');
  const [identifier, setIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState<PatientAccount | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    toast.info('Patient Portal Notification', msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validatePatientLogin(identifier, passcode);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    // Simulate secure HIPAA verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtpCode(otpCode)) {
      setErrorMessage('Please enter a valid 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPatient(DEMO_PATIENT);
      setStep('authenticated');
      toast.success(
        'Portal Access Granted',
        `Welcome back, ${DEMO_PATIENT.name}! Session authenticated successfully.`
      );
    }, 700);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIdentifier(DEMO_PATIENT.email);
      setPasscode('••••••••');
      setPatient(DEMO_PATIENT);
      setStep('authenticated');
      setIsLoading(false);
      toast.success(
        'Welcome, ' + DEMO_PATIENT.name,
        'Secure patient portal session active.'
      );
    }, 400);
  };

  const handleSignOut = () => {
    setPatient(null);
    setStep('login');
    setIdentifier('');
    setPasscode('');
    setOtpCode('');
    setErrorMessage('');
    toast.info('Signed Out', 'You have been securely signed out of your patient portal.');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setChatMessage('');
      setMessageSent(false);
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overscroll-contain animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-black/10 relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="shrink-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#171715]/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#171715] text-[#D5E5D5] flex items-center justify-center shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 id="portal-modal-title" className="font-serif-display text-lg font-bold text-[#171715] leading-none">
                FORME Patient Portal
              </h2>
              <span className="text-[10px] text-[#777771] flex items-center gap-1 font-medium mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>256-Bit Encrypted · HIPAA Compliant</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#777771] hover:text-[#171715] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close patient portal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Toast Notice */}
        {toastMessage && (
          <div className="shrink-0 bg-emerald-50 border-b border-emerald-200/60 px-6 py-2.5 flex items-center gap-2 text-xs font-medium text-emerald-900 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Body - Scrollable with generous bottom padding */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 pb-10 sm:pb-12 focus:outline-hidden">
          
          {/* STATE 1: LOGIN FORM */}
          {step === 'login' && (
            <div className="space-y-6">
              <div className="text-center max-w-sm mx-auto">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
                  Welcome Back
                </span>
                <h3 className="font-serif-display text-2xl font-normal text-[#171715] mt-1">
                  Access Your Smile Journey
                </h3>
                <p className="text-xs sm:text-sm text-[#777771] mt-2">
                  Review your treatment schedule, aligner tray tracking, clinical 3D scans, and appointments.
                </p>
              </div>

              {/* Demo Patient Fast Track Banner */}
              <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#171715]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-[#A95B30] tracking-wider block">
                    Quick Reviewer Access
                  </span>
                  <span className="text-xs text-[#171715] font-medium">
                    Test the authenticated portal as <strong>Clara Montgomery</strong> (Clear Aligners Patient)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-[#171715] text-white hover:bg-[#2A2A26] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Launch Demo Portal →'}
                </button>
              </div>

              {/* Real Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="portal-id" className="block text-xs font-semibold text-[#171715] mb-1.5">
                    Email Address or Patient ID
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#777771] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="portal-id"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. clara@example.com or FRM-94821"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 bg-white text-base sm:text-sm text-[#171715] placeholder-[#777771]/50 focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="portal-passcode" className="block text-xs font-semibold text-[#171715]">
                      Portal Password or PIN
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep('forgot')}
                      className="text-[11px] text-[#A95B30] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#777771] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      id="portal-passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 bg-white text-base sm:text-sm text-[#171715] placeholder-[#777771]/50 focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full text-sm font-semibold text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In with 2FA</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center text-[11px] text-[#777771] pt-2 border-t border-black/5">
                New patient without an account? Consultations can be scheduled directly through our{' '}
                <a href="#booking" onClick={onClose} className="text-[#A95B30] font-semibold underline">
                  Consultation Booking form
                </a>
                .
              </div>
            </div>
          )}

          {/* STATE 2: 2FA / OTP STEP */}
          {step === 'otp' && (
            <div className="space-y-6 max-w-md mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-[#D5E5D5]/60 text-[#171715] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
                  Two-Factor Authentication
                </span>
                <h3 className="font-serif-display text-2xl font-normal text-[#171715] mt-1">
                  Enter Verification Code
                </h3>
                <p className="text-xs text-[#777771] mt-2">
                  A 6-digit security code has been sent to your verified mobile number linked to {identifier}.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-48 mx-auto text-center font-mono tracking-widest text-2xl px-4 py-3 rounded-xl border border-black/15 bg-white text-[#171715] focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:border-[#A95B30]"
                  />
                  <span className="block text-[11px] text-[#777771] mt-1">
                    (Tip: Enter any 6 digits like <code className="bg-black/5 px-1 py-0.5 rounded">123456</code> to proceed)
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('login')}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#171715] bg-[#F8F6F1] hover:bg-black/5 cursor-pointer"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#171715] hover:bg-[#2A2A26] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? 'Confirming...' : 'Verify & Enter Portal'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STATE 3: FORGOT PASSWORD */}
          {step === 'forgot' && (
            <div className="space-y-6 max-w-md mx-auto text-center">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
                  Account Assistance
                </span>
                <h3 className="font-serif-display text-2xl font-normal text-[#171715] mt-1">
                  Reset Portal Password
                </h3>
                <p className="text-xs text-[#777771] mt-2">
                  Enter your email address and our patient care team will send a temporary secure reset link.
                </p>
              </div>

              <input
                type="email"
                placeholder="patient@example.com"
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-[#171715]"
              />

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#171715] bg-[#F8F6F1] hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerToast('Password reset instructions have been dispatched to your email.');
                    setStep('login');
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#171715] hover:bg-[#2A2A26] cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: AUTHENTICATED PATIENT DASHBOARD */}
          {step === 'authenticated' && patient && (
            <div className="space-y-6">
              
              {/* Patient Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#171715] text-[#D5E5D5] font-serif-display text-lg font-bold flex items-center justify-center">
                    CM
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-normal text-[#171715]">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-[#777771]">
                      Record ID: <strong className="text-[#171715] font-mono">{patient.patientRecordId}</strong> · Specialist: {patient.doctorName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#777771] hover:text-[#171715] hover:bg-black/5 transition-colors self-start sm:self-center cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Treatment Progress Widget */}
              <div className="p-6 rounded-3xl bg-[#F8F6F1] border border-[#171715]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A95B30]">
                      Active Treatment Plan
                    </span>
                    <h4 className="font-serif-display text-lg text-[#171715]">
                      {patient.treatmentType}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-[#D5E5D5] px-3 py-1 rounded-full self-start sm:self-auto">
                    On Track ({calculateProgressPercentage(patient.currentStep, patient.totalSteps)}% Complete)
                  </span>
                </div>

                {/* Tray Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-[#171715]">
                    <span>Current Aligner: Tray {patient.currentStep} of {patient.totalSteps}</span>
                    <span>Next Tray Switch in {patient.daysUntilNextStep} Days</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/10 overflow-hidden">
                    <div
                      className="h-full bg-[#A95B30] rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgressPercentage(patient.currentStep, patient.totalSteps)}%` }}
                    />
                  </div>
                </div>

                {/* Daily Wear Timer info */}
                <div className="mt-4 pt-3 border-t border-black/5 flex flex-wrap items-center justify-between text-xs text-[#777771] gap-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A95B30]" />
                    <span>Daily wear recorded: <strong>21.8 / 22 hrs target</strong></span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#171715] bg-white px-2 py-0.5 rounded-md border border-black/5">
                    Aligner Cleanliness: Good
                  </span>
                </div>
              </div>

              {/* Next Visit & Billing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Next Appointment Card */}
                <div className="p-5 rounded-2xl border border-black/5 bg-white shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A95B30] uppercase mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Next Scheduled Visit</span>
                    </div>
                    <h5 className="font-serif-display text-base text-[#171715]">
                      {patient.nextAppointment.title}
                    </h5>
                    <p className="text-xs text-[#777771] mt-1">
                      {patient.nextAppointment.date} at {patient.nextAppointment.time}
                    </p>
                    <p className="text-xs text-[#171715]/80 mt-0.5 font-medium">
                      {patient.nextAppointment.location}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-2">
                    <button
                      onClick={() => triggerToast('Attendance confirmed! Appointment reminder synced to your calendar.')}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-[#171715] text-white hover:bg-[#2A2A26] transition-colors cursor-pointer"
                    >
                      Confirm Attendance
                    </button>
                    <a
                      href={`tel:${PRACTICE_CONFIG.phoneRaw}`}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-black/10 hover:bg-black/5 text-[#171715]"
                    >
                      Reschedule
                    </a>
                  </div>
                </div>

                {/* Financing & Statements Card */}
                <div className="p-5 rounded-2xl border border-black/5 bg-white shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A95B30] uppercase mb-2">
                      <FileText className="w-4 h-4" />
                      <span>In-House 0% Financing</span>
                    </div>
                    <h5 className="font-serif-display text-base text-[#171715]">
                      Auto-Pay Active: ${patient.financing.monthlyAmount}/mo
                    </h5>
                    <p className="text-xs text-[#777771] mt-1">
                      {patient.financing.paidCount} of {patient.financing.totalCount} installments completed
                    </p>
                    <p className="text-xs text-[#171715]/80 mt-0.5 font-medium">
                      Next auto-charge: {patient.financing.nextDueDate}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Account in Good Standing</span>
                    </span>
                    <button
                      onClick={() => triggerToast('Official orthodontic invoice statement (PDF) downloaded.')}
                      className="p-1.5 rounded-md hover:bg-black/5 text-[#171715] cursor-pointer"
                      aria-label="Download statement"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Secure Message to Dr. Vance & Care Team */}
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-black/5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[#A95B30]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#171715]">
                    Message Clinical Care Team
                  </span>
                </div>
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <textarea
                    rows={2}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Have a question about tray fit or attachment tightness? Message Dr. Vance directly..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-white text-xs text-[#171715] placeholder-[#777771]/60 focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#777771]">
                      Emergency? Please call our direct clinic line: {PRACTICE_CONFIG.phoneDisplay}
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#171715] text-white hover:bg-[#2A2A26] transition-colors cursor-pointer"
                    >
                      {messageSent ? 'Message Sent ✓' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
