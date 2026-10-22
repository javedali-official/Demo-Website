import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { SMILE_JOURNEY_STEPS } from '../data/orthoData';

interface SmileJourneyProps {
  onStartJourneyClick: () => void;
}

export const SmileJourney: React.FC<SmileJourneyProps> = ({ onStartJourneyClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="journey" className="py-20 lg:py-28 bg-[#F8F6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
            The FORME Approach
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
            Your smile journey, step by step.
          </h2>
          <p className="text-base sm:text-lg text-[#777771] mt-4 leading-relaxed">
            From your very first conversation to the day your final retainer is fitted, experience a calm, predictable pathway crafted around your personal goals.
          </p>
        </div>

        {/* 3-Step Process Grid / Timeline */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Subtle horizontal connecting line on desktop */}
          <div
            className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 border-t border-dashed border-[#171715]/20 -z-0"
            aria-hidden="true"
          />

          {SMILE_JOURNEY_STEPS.map((stepItem, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={stepItem.step}
                onClick={() => setActiveStep(index)}
                className={`group relative z-10 bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#A95B30] shadow-md ring-2 ring-[#A95B30]/10'
                    : 'border-[#171715]/8 shadow-xs hover:border-[#171715]/20 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-2xl bg-[#171715] text-white font-serif-display text-lg font-bold flex items-center justify-center shadow-xs group-hover:bg-[#A95B30] transition-colors">
                      {stepItem.step}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#777771]">
                      Phase {stepItem.step}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-normal text-[#171715] group-hover:text-[#A95B30] transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs font-medium text-[#A95B30] mt-1">
                    {stepItem.subtitle}
                  </p>
                  <p className="text-sm text-[#777771] mt-3 leading-relaxed">
                    {stepItem.description}
                  </p>

                  {/* Expandable Key Milestones */}
                  <div className="mt-6 pt-4 border-t border-black/5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#171715] block mb-2.5">
                      Included in this phase:
                    </span>
                    <ul className="space-y-2">
                      {stepItem.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-[#171715]/80">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-xs font-semibold text-[#A95B30]">
                  <span>{isSelected ? 'Active Milestone' : 'Click to inspect'}</span>
                  {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

              </div>
            );
          })}

        </div>

        {/* Pathway CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartJourneyClick}
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-medium text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>Start Your Smile Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-xs text-[#777771] mt-3">
            Every clinical pathway is personalized. No two treatment plans are ever identical.
          </p>
        </div>

      </div>
    </section>
  );
};
