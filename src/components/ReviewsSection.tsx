import React from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { REVIEWS } from '../data/orthoData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Score Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171715]/8">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
              Patient Experiences
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
              Care that puts you at ease.
            </h2>
            <p className="text-base text-[#777771] mt-3 max-w-xl">
              Read authentic feedback from patients who have completed their smile journeys under Dr. Vance’s clinical care.
            </p>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="p-4 rounded-2xl bg-white border border-[#171715]/8 shadow-xs flex items-center gap-4 shrink-0">
            <div className="text-center">
              <span className="font-serif-display text-3xl font-bold text-[#171715] tabular-nums">
                4.9
              </span>
              <div className="flex items-center gap-0.5 text-[#A95B30] mt-0.5 justify-center">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
            <div className="border-l border-black/10 pl-4 text-xs text-[#777771]">
              <span className="font-semibold text-[#171715] block">Verified Patient Rating</span>
              <span>Based on post-treatment clinical feedback</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-3xl border border-[#171715]/8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Star Row & Treatment Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-0.5 text-[#A95B30]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#777771] bg-[#F8F6F1] px-2 py-0.5 rounded-full">
                    {review.treatment}
                  </span>
                </div>

                <p className="text-sm text-[#171715]/85 leading-relaxed italic font-normal">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 pt-4 border-t border-[#171715]/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#171715]">
                    {review.author}
                  </h4>
                  <span className="text-[11px] text-[#777771] flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{review.date}</span>
                  </span>
                </div>

                <span className="text-[10px] text-[#777771] font-medium">
                  {review.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Transparency Note */}
        <div className="mt-8 text-center text-xs text-[#777771]">
          <span>All testimonials are published with explicit patient consent. Clinical outcomes vary individually.</span>
        </div>

      </div>
    </section>
  );
};
