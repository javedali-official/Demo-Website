import React, { useState } from 'react';
import { ArrowRight, Check, X, ShieldAlert, Sparkles, Smile, Clock, UserCheck } from 'lucide-react';
import { TREATMENTS } from '../data/orthoData';
import { Treatment } from '../types';

interface TreatmentsSectionProps {
  onSelectTreatmentForBooking: (treatmentId: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  // Animated SVG illustrations representing orthodontic appliances in motion
  const renderApplianceVisual = (type: string) => {
    switch (type) {
      case 'clear-aligners':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#EBF3EB] via-[#F2F7F2] to-[#E3EDE3] flex items-center justify-center p-6 relative overflow-hidden group/card">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4A6B52_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Animated SVG Aligner */}
            <svg
              className="w-28 h-28 text-[#4A6B52] anim-float transition-transform duration-500 group-hover/card:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              {/* Main Outer Arch Tray */}
              <path
                d="M 18,70 C 20,38 35,22 50,22 C 65,22 80,38 82,70"
                strokeLinecap="round"
                className="opacity-90 transition-all duration-300 group-hover/card:stroke-[#2E5437]"
              />

              {/* Animated Laser Scan Marching Dashes */}
              <path
                d="M 26,68 C 28,44 38,30 50,30 C 62,30 72,44 74,68"
                strokeLinecap="round"
                className="anim-scan-dash opacity-85"
                strokeWidth="2"
              />

              {/* Staggered Pulsing Dental Ridge Nodes */}
              <circle cx="50" cy="22" r="3" fill="#D5E5D5" className="anim-node-4" />
              <circle cx="39" cy="27" r="3" fill="#D5E5D5" className="anim-node-3" />
              <circle cx="61" cy="27" r="3" fill="#D5E5D5" className="anim-node-5" />
              <circle cx="28" cy="38" r="3" fill="#D5E5D5" className="anim-node-2" />
              <circle cx="72" cy="38" r="3" fill="#D5E5D5" className="anim-node-6" />
              <circle cx="21" cy="54" r="3" fill="#D5E5D5" className="anim-node-1" />
              <circle cx="79" cy="54" r="3" fill="#D5E5D5" className="anim-node-7" />

              {/* Subtly moving scan glow line */}
              <line
                x1="22"
                y1="48"
                x2="78"
                y2="48"
                stroke="#4A6B52"
                strokeWidth="0.8"
                strokeDasharray="4 2"
                className="opacity-40 anim-float"
              />
            </svg>

            {/* Badge with subtle interactive pulse */}
            <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-[#4A6B52] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-emerald-900/5 group-hover/card:bg-white transition-colors">
              Removable · 3D Fitted
            </span>
          </div>
        );
      case 'traditional-braces':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#ECE8E0] via-[#F4F1EA] to-[#E5E0D5] flex items-center justify-center p-6 relative overflow-hidden group/card">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#777771_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Animated SVG Traditional Braces */}
            <svg
              className="w-28 h-28 text-[#171715] anim-float transition-transform duration-500 group-hover/card:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Dynamic Flexing Archwire */}
              <g className="anim-wire-flex">
                <path
                  d="M 15,65 Q 50,25 85,65"
                  strokeWidth="2.5"
                  stroke="#777771"
                  strokeLinecap="round"
                />
                {/* Secondary metallic tension line */}
                <path
                  d="M 17,64 Q 50,26 83,64"
                  strokeWidth="1"
                  stroke="#A95B30"
                  strokeDasharray="4 8"
                  className="anim-scan-dash opacity-60"
                />
              </g>

              {/* Precision Bracket Squares with alignment micro-motions */}
              <rect
                x="23"
                y="47"
                width="8"
                height="8"
                rx="1.5"
                fill="#FFFFFF"
                stroke="#171715"
                className="anim-bracket-1"
              />
              <rect
                x="36"
                y="36"
                width="9"
                height="9"
                rx="1.5"
                fill="#FFFFFF"
                stroke="#171715"
                className="anim-bracket-2"
              />
              <rect
                x="46"
                y="32"
                width="10"
                height="10"
                rx="1.5"
                fill="#FFFFFF"
                stroke="#171715"
                className="anim-bracket-3"
              />
              <rect
                x="58"
                y="36"
                width="9"
                height="9"
                rx="1.5"
                fill="#FFFFFF"
                stroke="#171715"
                className="anim-bracket-2"
              />
              <rect
                x="70"
                y="47"
                width="8"
                height="8"
                rx="1.5"
                fill="#FFFFFF"
                stroke="#171715"
                className="anim-bracket-1"
              />

              {/* Terracotta Cross Slot Accents */}
              <line x1="46" y1="37" x2="56" y2="37" stroke="#A95B30" strokeWidth="2" />
              <line x1="36" y1="40" x2="45" y2="40" stroke="#A95B30" strokeWidth="1.5" />
              <line x1="58" y1="40" x2="67" y2="40" stroke="#A95B30" strokeWidth="1.5" />
            </svg>

            <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-[#171715] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-black/5 group-hover/card:bg-white transition-colors">
              Full Biomechanical Control
            </span>
          </div>
        );
      case 'ceramic-braces':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#F6EFEA] via-[#FBF7F4] to-[#EFE4DC] flex items-center justify-center p-6 relative overflow-hidden group/card">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A95B30_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Animated SVG Ceramic Braces */}
            <svg
              className="w-28 h-28 text-[#A95B30] anim-float transition-transform duration-500 group-hover/card:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Subtle Archwire with breathing dashed tension */}
              <path
                d="M 15,65 Q 50,25 85,65"
                strokeWidth="2"
                stroke="#B8A495"
                className="anim-scan-dash"
                strokeDasharray="4 3"
              />

              {/* Translucent Ceramic Brackets with Soft Radiant Shimmer */}
              <g className="anim-ceramic-shimmer">
                <rect x="23" y="47" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#A95B30" fillOpacity="0.85" />
                <rect x="36" y="36" width="9" height="9" rx="2" fill="#FFFFFF" stroke="#A95B30" fillOpacity="0.85" />
                <rect x="46" y="32" width="10" height="10" rx="2" fill="#FFFFFF" stroke="#A95B30" fillOpacity="0.85" />
                <rect x="58" y="36" width="9" height="9" rx="2" fill="#FFFFFF" stroke="#A95B30" fillOpacity="0.85" />
                <rect x="70" y="47" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#A95B30" fillOpacity="0.85" />
              </g>

              {/* Twinkling Prism Sparkle Star on Center Bracket */}
              <g className="anim-bracket-3">
                <circle cx="51" cy="37" r="2.5" fill="#A95B30" />
                {/* 4-point sparkle cross */}
                <path
                  d="M 51,33 L 51,41 M 47,37 L 55,37"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            </svg>

            <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-[#A95B30] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-[#A95B30]/10 group-hover/card:bg-white transition-colors">
              Tooth-Tone Monocrystalline
            </span>
          </div>
        );
      case 'early-assessment':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#EAEFF4] via-[#F3F7FA] to-[#E1EAF2] flex items-center justify-center p-6 relative overflow-hidden group/card">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3B5A75_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Animated SVG Growth Guidance with Orbit & Smile Motion */}
            <svg
              className="w-28 h-28 text-[#3B5A75] anim-float transition-transform duration-500 group-hover/card:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Planetary / Growth Orbit Ring (Rotates continuously) */}
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#3B5A75"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="anim-orbit opacity-50"
              />
              
              {/* Outer Growth Marker dot traveling in orbit */}
              <g className="anim-orbit">
                <circle cx="50" cy="20" r="2.5" fill="#3B5A75" />
              </g>

              {/* Developing Smile Arc with gentle breathing expansion */}
              <g className="anim-smile-breath">
                <path
                  d="M 25,60 Q 50,32 75,60"
                  strokeWidth="2.5"
                  stroke="#3B5A75"
                  strokeLinecap="round"
                />
                <path
                  d="M 38,48 Q 50,56 62,48"
                  strokeWidth="2"
                  stroke="#3B5A75"
                  strokeLinecap="round"
                />
              </g>

              {/* Eyes with gentle soft blink */}
              <g className="anim-blink">
                <circle cx="42" cy="40" r="2.2" fill="#3B5A75" />
                <circle cx="58" cy="40" r="2.2" fill="#3B5A75" />
              </g>
            </svg>

            <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-[#3B5A75] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-[#3B5A75]/10 group-hover/card:bg-white transition-colors">
              Growth Guidance (Ages 7–11)
            </span>
          </div>
        );
    }
  };

  return (
    <section id="treatments" className="py-20 lg:py-28 relative bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
            Orthodontic Solutions
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
            Your path to a straighter smile.
          </h2>
          <p className="text-base sm:text-lg text-[#777771] mt-4 leading-relaxed">
            Explore orthodontic solutions and find the approach that best fits your smile and lifestyle.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="group bg-white rounded-3xl border border-[#171715]/8 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Graphic / Visual Header */}
              <div className="relative aspect-[16/11] overflow-hidden">
                {renderApplianceVisual(treatment.id)}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#171715] group-hover:text-[#A95B30] transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-xs font-medium text-[#777771] mt-1">
                    {treatment.tagline}
                  </p>
                  <p className="text-sm text-[#777771]/90 mt-3 line-clamp-3 leading-relaxed">
                    {treatment.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-[#171715]/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedTreatment(treatment)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#171715] group-hover:text-[#A95B30] transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="text-[11px] text-[#777771] font-medium">
                    Clinical Assessment
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Clinical Disclaimer */}
        <div className="mt-10 p-4 rounded-2xl bg-white/80 border border-[#171715]/6 flex items-start gap-3 text-xs text-[#777771]">
          <ShieldAlert className="w-4 h-4 text-[#A95B30] shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-[#171715]">Important Clinical Notice:</span> Suitability for any orthodontic appliance is determined through an in-person orthodontic examination, digital 3D scans, and periodontal health assessment. Treatment durations vary based on individual dental biology.
          </p>
        </div>

      </div>

      {/* Detailed Treatment Modal */}
      {selectedTreatment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-black/10 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#777771] hover:text-[#171715] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close treatment details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
                  Treatment Deep-Dive
                </span>
                <h3 id="modal-title" className="font-serif-display text-2xl sm:text-3xl text-[#171715] mt-1">
                  {selectedTreatment.title}
                </h3>
                <p className="text-sm font-medium text-[#777771] mt-1">
                  {selectedTreatment.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#171715]/80 leading-relaxed">
                {selectedTreatment.description}
              </p>

              {/* Key Clinical Features */}
              <div className="bg-[#F8F6F1] p-5 rounded-2xl border border-[#171715]/5">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#171715] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A95B30]" />
                  <span>Key Advantages & Details</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedTreatment.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171715]/85">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suitability & Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-black/5 bg-[#FAF9F6]">
                  <div className="flex items-center gap-2 font-semibold text-[#171715] mb-1">
                    <UserCheck className="w-4 h-4 text-[#A95B30]" />
                    <span>Who It Is Ideal For</span>
                  </div>
                  <p className="text-[#777771] leading-relaxed">
                    {selectedTreatment.idealFor}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-black/5 bg-[#FAF9F6]">
                  <div className="flex items-center gap-2 font-semibold text-[#171715] mb-1">
                    <Clock className="w-4 h-4 text-[#A95B30]" />
                    <span>Typical Timeline Context</span>
                  </div>
                  <p className="text-[#777771] leading-relaxed">
                    {selectedTreatment.durationContext}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#171715]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#777771] text-center sm:text-left">
                  Schedule your consultation to review digital 3D scans with Dr. Vance.
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const id = selectedTreatment.id;
                      setSelectedTreatment(null);
                      onSelectTreatmentForBooking(id);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#171715] hover:bg-[#2A2A26] transition-colors cursor-pointer"
                  >
                    <span>Inquire About This Treatment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
