import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ShieldCheck, ArrowLeftRight } from 'lucide-react';
import { PATIENT_STORIES } from '../data/orthoData';

export const ResultsGallery: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = PATIENT_STORIES[selectedCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // Aesthetic SVG smile illustrations showing alignment progress
  const renderSmileState = (isAfter: boolean, caseType: number) => {
    const primaryColor = isAfter ? '#4A6B52' : '#777771';
    const bgGradient = isAfter
      ? 'from-[#EDF5ED] via-[#F6FAF6] to-[#E5EFE5]'
      : 'from-[#F2EFE9] via-[#FAF8F5] to-[#EBE7DF]';

    return (
      <div className={`w-full h-full bg-gradient-to-b ${bgGradient} flex flex-col items-center justify-center p-8 select-none relative`}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#171715_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Smile Graphic */}
        <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
          <svg className="w-56 h-36" viewBox="0 0 200 120" fill="none">
            {/* Lip contours */}
            <path
              d="M 20,45 C 50,28 75,32 100,32 C 125,32 150,28 180,45 C 150,56 125,58 100,58 C 75,58 50,56 20,45 Z"
              fill="#DDB6A6"
              opacity="0.8"
            />
            {/* Lower Lip Smile Arc */}
            <path
              d={
                isAfter
                  ? 'M 25,48 C 60,95 140,95 175,48 C 145,108 55,108 25,48 Z'
                  : 'M 25,48 C 60,82 140,82 175,48 C 145,94 55,94 25,48 Z'
              }
              fill="#D49E8D"
            />

            {/* Teeth Arch */}
            {isAfter ? (
              // Perfect natural alignment
              <g fill="#FFFFFF" stroke="#E2DCD5" strokeWidth="1.2">
                {/* Central incisors */}
                <rect x="91" y="40" width="8.5" height="18" rx="2" />
                <rect x="100.5" y="40" width="8.5" height="18" rx="2" />
                {/* Laterals */}
                <rect x="82.5" y="42" width="7.5" height="16" rx="2" />
                <rect x="110" y="42" width="7.5" height="16" rx="2" />
                {/* Canines */}
                <path d="M 74,44 L 81,44 L 81,59 L 77,61 L 74,58 Z" />
                <path d="M 118.5,44 L 125.5,44 L 125.5,58 L 122.5,61 L 118.5,59 Z" />
                {/* Premolars */}
                <rect x="66" y="46" width="7" height="13" rx="1.5" />
                <rect x="127" y="46" width="7" height="13" rx="1.5" />
              </g>
            ) : (
              // Before state: crowding or spacing depending on case
              <g fill="#FFFFFF" stroke="#D3CDC4" strokeWidth="1.2">
                {caseType === 0 ? (
                  // Crowded / overlapped
                  <>
                    <rect x="90" y="38" width="9" height="17" rx="2" transform="rotate(-6 90 38)" />
                    <rect x="100" y="41" width="8.5" height="18" rx="2" transform="rotate(7 100 41)" />
                    <rect x="81" y="44" width="8" height="15" rx="2" transform="rotate(4 81 44)" />
                    <rect x="110" y="40" width="7" height="16" rx="2" transform="rotate(-5 110 40)" />
                    <rect x="73" y="47" width="7" height="13" rx="1.5" />
                    <rect x="118" y="45" width="7" height="13" rx="1.5" />
                  </>
                ) : (
                  // Spaced / diastema
                  <>
                    <rect x="88" y="40" width="8.5" height="18" rx="2" />
                    <rect x="103.5" y="40" width="8.5" height="18" rx="2" />
                    <rect x="78" y="43" width="7.5" height="15" rx="2" />
                    <rect x="114" y="43" width="7.5" height="15" rx="2" />
                    <rect x="69" y="46" width="7" height="13" rx="1.5" />
                    <rect x="123" y="46" width="7" height="13" rx="1.5" />
                  </>
                )}
              </g>
            )}
          </svg>

          {/* State Text Label */}
          <div className="mt-4 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs bg-white/90 text-[#171715]">
            {isAfter ? 'Target Alignment (After)' : 'Baseline Presentation (Before)'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="results" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#171715]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
              Clinical Progress & Transformations
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
              Real journeys. Personal reasons to smile.
            </h2>
            <p className="text-base text-[#777771] mt-3">
              Explore authentic alignment progression through our interactive case visualizer. Slide left and right to compare initial presentation with completed smile balance.
            </p>
          </div>

          {/* Case Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#F8F6F1] rounded-2xl border border-black/5 shrink-0">
            {PATIENT_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCaseIndex === idx
                    ? 'bg-white text-[#171715] shadow-xs'
                    : 'text-[#777771] hover:text-[#171715]'
                }`}
              >
                <span>{story.firstName} ({story.treatment})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider Visual Box (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#171715]/10 shadow-lg cursor-ew-resize select-none touch-none"
              role="slider"
              aria-label="Before and after orthodontic alignment comparison slider"
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {/* After Layer (Background) */}
              <div className="absolute inset-0">
                {renderSmileState(true, selectedCaseIndex)}
              </div>

              {/* Before Layer (Clipped to sliderPosition) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                {renderSmileState(false, selectedCaseIndex)}
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#171715] text-white flex items-center justify-center shadow-xl border-2 border-white">
                  <ArrowLeftRight className="w-4 h-4 text-[#D5E5D5]" />
                </div>
              </div>

              {/* Accessible Range Input for Screen Readers / Keyboard */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="sr-only"
                aria-label="Slide to compare before and after alignment"
              />
            </div>

            <p className="text-xs text-[#777771] mt-3 flex items-center gap-1.5 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#A95B30]" />
              <span>Drag the divider or touch to reveal alignment progression</span>
            </p>
          </div>

          {/* Case Narrative Box (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#FAF9F6] p-6 sm:p-8 rounded-3xl border border-[#171715]/8">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#A95B30]">
                  Documented Case Study
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Authorized Consent</span>
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#171715] mt-3">
                {activeCase.firstName}’s Journey
              </h3>

              <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-[#171715]/75">
                <span>Treatment: <strong className="text-[#171715]">{activeCase.treatment}</strong></span>
                <span>·</span>
                <span>Duration: <strong className="text-[#171715]">{activeCase.duration}</strong></span>
              </div>

              <p className="text-sm text-[#777771] mt-4 leading-relaxed">
                {activeCase.story}
              </p>

              {/* Patient Outcome Quote */}
              <blockquote className="mt-5 p-4 rounded-2xl bg-white border border-black/5 text-[#171715] italic font-serif-display text-base leading-relaxed">
                &ldquo;{activeCase.outcomeQuote}&rdquo;
              </blockquote>
            </div>

            {/* Disclaimer */}
            <div className="pt-4 border-t border-black/5 text-[11px] text-[#777771] leading-normal">
              *Individual clinical results vary based on skeletal morphology, biological tooth response, and appliance wear compliance. Visual representation provided for educational consultation.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
