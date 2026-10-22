import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/orthoData';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PRACTICE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRACTICE_CONFIG.whatsappMessage
  )}`;

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with FORME Orthodontics on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* WhatsApp Icon */}
        <div className="w-5 h-5 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-current" />
        </div>

        <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
          WhatsApp us
        </span>
      </a>
    </aside>
  );
};
