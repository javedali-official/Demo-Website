import React from 'react';
import { Sparkles, Layers, Compass, HeartHandshake } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Personalized Treatment Plans',
      description: 'Care tailored around your unique dental anatomy and personal goals.',
    },
    {
      icon: Layers,
      title: 'Modern Orthodontic Options',
      description: 'Clear aligners, aesthetic ceramic brackets, and precision braces.',
    },
    {
      icon: Compass,
      title: 'Clear Treatment Guidance',
      description: 'Transparent timelines, predictable roadmaps, and no hidden surprises.',
    },
    {
      icon: HeartHandshake,
      title: 'Patient-Centered Care',
      description: 'Unhurried, compassionate appointments focused on comfort and long-term health.',
    },
  ];

  return (
    <section className="border-y border-[#171715]/8 bg-white/70 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#171715]/5 flex items-center justify-center shrink-0 text-[#A95B30]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#171715] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#777771] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
