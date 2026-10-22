import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Sparkles, User } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/orthoData';

interface HeaderProps {
  onBookClick: () => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, onOpenPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Smile Journey', href: '#journey' },
    { label: 'About', href: '#about' },
    { label: 'Patient Stories', href: '#results' },
    { label: 'Locations', href: '#locations' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F6F1]/95 backdrop-blur-md shadow-xs border-b border-[#171715]/5 py-3'
          : 'bg-[#F8F6F1] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Wordmark Zone */}
          <a
            href="#"
            className="group flex items-center gap-3 shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30]"
            aria-label={`${PRACTICE_CONFIG.brandName} Home`}
          >
            <div className="w-9 h-9 rounded-full bg-[#171715] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-[#D5E5D5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#171715] leading-none">
                {PRACTICE_CONFIG.shortName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#777771] font-semibold mt-0.5">
                Orthodontics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#171715]/80"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#A95B30] transition-colors relative py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30] rounded-xs"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Direct Phone Link */}
            <a
              href={`tel:${PRACTICE_CONFIG.phoneRaw}`}
              className="hidden xl:flex items-center gap-2 text-xs md:text-sm font-medium text-[#171715] hover:text-[#A95B30] transition-colors py-2 px-2.5 rounded-full hover:bg-black/5"
              aria-label={`Call clinic at ${PRACTICE_CONFIG.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#A95B30]" />
              <span className="whitespace-nowrap">{PRACTICE_CONFIG.phoneDisplay}</span>
            </a>

            {/* Patient Portal Trigger Button */}
            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#171715] hover:text-[#A95B30] hover:bg-black/5 rounded-full border border-black/10 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30]"
              aria-label="Open Patient Portal login"
            >
              <User className="w-3.5 h-3.5 text-[#A95B30]" />
              <span className="hidden sm:inline">Patient Portal</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#171715] hover:bg-[#2A2A26] active:scale-98 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30]"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#171715] hover:bg-black/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A95B30]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#F8F6F1] border-b border-[#171715]/10 shadow-xl px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#171715]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:text-[#A95B30] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`tel:${PRACTICE_CONFIG.phoneRaw}`}
                className="flex items-center gap-2 py-2 text-sm text-[#777771]"
              >
                <Phone className="w-4 h-4 text-[#A95B30]" />
                <span>{PRACTICE_CONFIG.phoneDisplay}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#171715] bg-white border border-black/10 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-[#A95B30]" />
                <span>Patient Portal Login</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#171715] rounded-full shadow-md hover:bg-[#2A2A26] transition-colors cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
