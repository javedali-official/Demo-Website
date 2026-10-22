import React from 'react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/orthoData';

interface FinalCtaProps {
  onBookClick: () => void;
  onContactClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onBookClick, onContactClick }) => {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F6F1] relative overflow-hidden text-center">
      {/* Decorative subtle background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#A95B30]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle decorative brand mark */}
        <div className="w-12 h-12 rounded-full bg-[#171715] text-white flex items-center justify-center mx-auto mb-6 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#D5E5D5]" />
        </div>

        <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
          Begin When You Are Ready
        </span>

        {/* Large Serif Headline */}
        <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171715] mt-3 leading-tight text-balance">
          Your next chapter starts with a smile.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#777771] mt-5 max-w-2xl mx-auto leading-relaxed">
          Take the first step toward understanding your orthodontic options. No pressure, no obligations—just honest medical guidance tailored to your goals.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookClick}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#171715] bg-white border border-[#171715]/15 hover:bg-[#FAF9F6] rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#A95B30]" />
            <span>Contact Our Team</span>
          </button>
        </div>

        <p className="text-xs text-[#777771] mt-6">
          Direct telephone scheduling: <a href={`tel:${PRACTICE_CONFIG.phoneRaw}`} className="underline font-semibold text-[#171715]">{PRACTICE_CONFIG.phoneDisplay}</a>
        </p>

      </div>
    </section>
  );
};
