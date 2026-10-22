import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, X, MessageCircle } from 'lucide-react';
import { PRACTICE_CONFIG, CLINIC_LOCATIONS, TREATMENTS } from '../data/orthoData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const legalContent: Record<string, { title: string; content: string }> = {
    privacy: {
      title: 'Patient Privacy Policy',
      content:
        'FORME Orthodontics strictly adheres to HIPAA privacy regulations and medical patient confidentiality standards. Personal contact information collected on this website is exclusively utilized to respond to your consultation requests and schedule appointments. We never sell, rent, or distribute personal health information to third parties.',
    },
    terms: {
      title: 'Terms of Use & Clinical Notice',
      content:
        'The content, simulations, and illustrations published on this website are provided strictly for educational purposes and do not constitute an individualized medical or dental diagnosis. Formal treatment planning requires an in-person clinical examination, dental radiography, and assessment by a registered specialist orthodontist.',
    },
    accessibility: {
      title: 'Accessibility Statement',
      content:
        'FORME Orthodontics is committed to ensuring digital accessibility for all patients and visitors, including individuals with disabilities. We continually refine the user experience to conform to Web Content Accessibility Guidelines (WCAG 2.1 AA). All physical studios are ADA compliant and wheelchair accessible.',
    },
  };

  return (
    <footer className="bg-[#171715] text-[#F8F6F1] pt-16 pb-12 border-t border-[#171715]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Brand & Purpose (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-[#D5E5D5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-white leading-none">
                  {PRACTICE_CONFIG.brandName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mt-1">
                  Orthodontic Practice
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              {PRACTICE_CONFIG.tagline} Thoughtful orthodontic care combining digital 3D precision with warm, gentle clinical craftsmanship.
            </p>

            <div className="pt-2 text-xs text-white/50 space-y-1">
              <p>Specialist Orthodontics · Clear Aligners · Ceramic & Precision Braces</p>
              <p>Board Certified Clinical Direction</p>
            </div>
          </div>

          {/* Quick Navigation (Cols 5-6) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#D5E5D5] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Treatments
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">
                  Smile Journey
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Dr. Vance
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  Patient Stories
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  Studios & Map
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Treatments Breakdown (Cols 7-9) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#D5E5D5] mb-4">
              Orthodontic Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              {TREATMENTS.map((t) => (
                <li key={t.id}>
                  <a href="#treatments" className="hover:text-white transition-colors flex items-center justify-between group">
                    <span>{t.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#A95B30]" />
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#booking" className="text-[#D5E5D5] hover:underline font-semibold flex items-center gap-1">
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#D5E5D5] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-white/75">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A95B30] shrink-0" />
                <a href={`tel:${PRACTICE_CONFIG.phoneRaw}`} className="hover:text-white font-medium">
                  {PRACTICE_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${PRACTICE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    PRACTICE_CONFIG.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium flex items-center gap-1.5"
                >
                  <span>WhatsApp Chat</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-800/40">Direct</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A95B30] shrink-0" />
                <a href={`mailto:${PRACTICE_CONFIG.email}`} className="hover:text-white">
                  {PRACTICE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#A95B30] shrink-0 mt-0.5" />
                <span>
                  {CLINIC_LOCATIONS[0].address}, {CLINIC_LOCATIONS[0].city}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-white/60">
              <span className="font-semibold text-white/80 block">Practice Hours:</span>
              <span>Mon – Thu: 8:00 AM – 6:00 PM</span><br />
              <span>Fri: 8:00 AM – 4:00 PM</span><br />
              <span>Select Sat: By Appointment</span>
            </div>
          </div>

        </div>

        {/* Legal & Medical Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>
              &copy; {currentYear} {PRACTICE_CONFIG.brandName}. All rights reserved.
            </p>
            <p className="text-[11px] text-white/40 mt-1 max-w-2xl">
              *Medical Disclaimer: Individual patient results vary. Content on this site is for educational purposes and should not be used as a substitute for professional clinical advice.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Terms of Care
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveModal('accessibility')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Accessibility
            </button>
          </div>
        </div>

      </div>

      {/* Legal Dialog Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-[#171715]"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#777771] hover:text-[#171715] hover:bg-black/5 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#A95B30]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-wider">
                Practice Policy
              </span>
            </div>

            <h3 className="font-serif-display text-2xl font-normal text-[#171715]">
              {legalContent[activeModal].title}
            </h3>

            <p className="mt-4 text-sm text-[#777771] leading-relaxed">
              {legalContent[activeModal].content}
            </p>

            <div className="mt-6 pt-4 border-t border-black/5 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#171715] rounded-full hover:bg-[#2A2A26]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
