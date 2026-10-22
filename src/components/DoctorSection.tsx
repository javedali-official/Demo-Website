import React from 'react';
import { ArrowRight, CheckCircle2, Award, BookOpen, Heart } from 'lucide-react';
import { ORTHODONTIST_BIO } from '../data/orthoData';

interface DoctorSectionProps {
  onMeetClick: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onMeetClick }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#171715]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Credential Highlights */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              
              {/* Doctor Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#F8F6F1] border border-[#171715]/10 shadow-lg">
                {/* SVG/CSS Portrait Representation with elegant doctor silhouette and warm studio gradient */}
                <div className="w-full h-full bg-gradient-to-t from-[#2A2A26] via-[#4A4A45] to-[#787870] flex flex-col items-center justify-end p-8 text-center relative overflow-hidden">
                  
                  {/* Subtle warm halo */}
                  <div className="absolute top-1/4 w-48 h-48 rounded-full bg-[#A95B30]/20 blur-2xl pointer-events-none" />
                  
                  {/* Doctor Figure Graphic */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-[#FAF9F6] border-2 border-white/80 shadow-md flex items-center justify-center text-[#171715] font-serif-display text-3xl font-bold mb-3">
                      EV
                    </div>
                    <span className="text-white font-serif-display text-2xl font-medium tracking-wide">
                      {ORTHODONTIST_BIO.name}
                    </span>
                    <span className="text-white/80 text-xs uppercase tracking-wider font-semibold mt-1">
                      {ORTHODONTIST_BIO.title}
                    </span>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] text-white/90 border border-white/15">
                      <Award className="w-3.5 h-3.5 text-[#D5E5D5]" />
                      <span>{ORTHODONTIST_BIO.experience}</span>
                    </div>
                  </div>

                  {/* Aesthetic medical motif */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-white/10" />
                </div>

                {/* Corner Trust Stamp */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-[#171715] text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-xs border border-black/5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Board Certified Specialist</span>
                </div>
              </div>

              {/* Verified Professional Memberships Strip */}
              <div className="mt-4 p-4 rounded-2xl bg-[#F8F6F1] border border-[#171715]/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#777771] block mb-2">
                  Professional Memberships & Accreditations
                </span>
                <div className="flex flex-wrap gap-2">
                  {ORTHODONTIST_BIO.memberships.map((membership, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-[#171715] bg-white px-2.5 py-1 rounded-md border border-black/5"
                    >
                      {membership}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Copy, Philosophy & Special Interests */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
                Meet Your Orthodontist
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2 leading-tight">
                Expert care. A more personal approach.
              </h2>
            </div>

            {/* Doctor Philosophy Quote */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border-l-2 border-[#A95B30] text-[#171715]">
              <p className="font-serif-display italic text-lg sm:text-xl text-[#171715]/90 leading-snug">
                &ldquo;{ORTHODONTIST_BIO.quote}&rdquo;
              </p>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#777771] mt-3">
                — {ORTHODONTIST_BIO.name}
              </span>
            </div>

            {/* In-Depth Philosophy Prose */}
            <p className="text-base text-[#777771] leading-relaxed">
              {ORTHODONTIST_BIO.philosophy}
            </p>

            {/* Special Interests Grid */}
            <div className="w-full pt-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#171715] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#A95B30]" />
                <span>Specialized Clinical Focus</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ORTHODONTIST_BIO.specialInterests.map((interest, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F6F1] border border-black/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A95B30] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-[#171715]/85">
                      {interest}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA & Verification Note */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <button
                onClick={onMeetClick}
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Schedule a Visit with Dr. Vance</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-xs text-[#777771]">
                Consultations are one-on-one with Dr. Vance, never delegated to assistants.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
