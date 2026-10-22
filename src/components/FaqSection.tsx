import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/orthoData';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'first-visit', label: 'First Visit' },
    { id: 'treatments', label: 'Treatments & Aligners' },
    { id: 'financing', label: 'Financing & Insurance' },
    { id: 'care', label: 'Routine Care' },
  ];

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#F8F6F1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
            Common Inquiries
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#777771] mt-3 leading-relaxed">
            Clear, honest answers to help you feel informed and prepared for your orthodontic journey.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-black/5 shadow-xs w-full sm:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#171715] text-white shadow-xs'
                    : 'text-[#777771] hover:text-[#171715]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#777771] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-black/10 focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 text-[#171715] placeholder-[#777771]/60"
            />
          </div>

        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#171715]/8 overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    <span className="font-serif-display text-lg sm:text-xl font-normal text-[#171715]">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-[#F8F6F1] flex items-center justify-center shrink-0 transition-transform duration-200 text-[#171715] ${
                        isOpen ? 'rotate-180 bg-[#A95B30] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#777771] leading-relaxed border-t border-black/5 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-black/5 text-[#777771]">
              <HelpCircle className="w-8 h-8 mx-auto text-[#A95B30] mb-2 opacity-60" />
              <p className="text-sm font-medium">No matching questions found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs font-semibold text-[#A95B30] underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Educational Note */}
        <div className="mt-8 text-center text-xs text-[#777771]">
          Have a specific orthodontic question not answered here? Reach out directly to our clinical concierge team.
        </div>

      </div>
    </section>
  );
};
