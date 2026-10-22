import React from 'react';
import { ArrowRight, ArrowDown, Star, Sparkles, Award } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/orthoData';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Subtle organic background ambient glow */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 bg-[#A95B30]/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-96 h-96 bg-[#D5E5D5]/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Announcement Pill with subtle green indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#171715]/10 text-xs font-medium text-[#171715] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" aria-hidden="true" />
              <span>Same-week consultations available</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-[3.75rem] font-normal tracking-tight text-[#171715] leading-[1.15] text-balance">
              Your smile, <br />
              your confidence, <br />
              <span className="text-[#A95B30] italic font-normal">beautifully aligned.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#777771] leading-relaxed max-w-xl font-normal">
              Discover a more confident smile with personalized orthodontic care, thoughtfully designed around your lifestyle, goals, and comfort.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 pt-2 w-full xs:w-auto">
              <button
                onClick={onBookClick}
                className="group w-full xs:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30]"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[#171715] hover:text-[#A95B30] transition-colors rounded-full hover:bg-black/5 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30]"
              >
                <ArrowDown className="w-4 h-4 text-[#777771]" />
                <span>Explore Treatments</span>
              </button>
            </div>

            {/* Trust Indicator with Patient Avatars */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#777771]">
              <div className="flex -space-x-2 overflow-hidden items-center py-0.5">
                <div className="w-8 h-8 rounded-full ring-2 ring-[#F8F6F1] bg-[#171715] text-[#D5E5D5] flex items-center justify-center text-[10px] font-bold shadow-xs">
                  EV
                </div>
                <div className="w-8 h-8 rounded-full ring-2 ring-[#F8F6F1] bg-[#A95B30] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  CM
                </div>
                <div className="w-8 h-8 rounded-full ring-2 ring-[#F8F6F1] bg-[#3B5A45] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  MR
                </div>
                <div className="w-8 h-8 rounded-full ring-2 ring-[#F8F6F1] bg-[#5C4D44] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  SL
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium text-[#171715]/80">
                <span>Personalized care</span>
                <span aria-hidden="true" className="text-[#A95B30]">·</span>
                <span>Clear guidance</span>
                <span aria-hidden="true" className="text-[#A95B30]">·</span>
                <span>Confident smiles</span>
              </div>
            </div>

          </div>

          {/* Right Column: Reference-Inspired Visual Composition */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-lg lg:max-w-none bg-white p-3 sm:p-4 rounded-3xl shadow-sm border border-[#171715]/8">
              
              {/* Primary Clinic Interior Visual (Zoomed crop specifically on the clinic operatory) */}
              <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#ECE8E0] shadow-inner">
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={PRACTICE_CONFIG.heroInteriorImage}
                    alt="Modern FORME orthodontic clinic consultation suite and digital equipment"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Composition Cards (Reflected directly from User Reference 1) */}
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3">
                
                {/* Card 1: Reviews & Trust (White) */}
                <div className="bg-[#FAF9F6] p-3.5 sm:p-4 rounded-2xl border border-black/5 flex flex-col justify-between">
                  <div className="flex items-center gap-1 text-[#A95B30]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xl sm:text-2xl font-bold font-serif-display text-[#171715] tabular-nums">
                      4.9
                    </span>
                    <p className="text-[11px] text-[#777771] font-medium leading-tight mt-0.5">
                      Google Reviews (Verified Patient Care)
                    </p>
                  </div>
                </div>

                {/* Card 2: Clinical Experience (Charcoal Black) */}
                <div className="bg-[#171715] text-white p-3.5 sm:p-4 rounded-2xl shadow-xs flex flex-col justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-[#D5E5D5]" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xl sm:text-2xl font-bold font-serif-display text-white tabular-nums">
                      14+
                    </span>
                    <p className="text-[11px] text-white/70 font-medium leading-tight mt-0.5">
                      Years of specialized orthodontic practice
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
