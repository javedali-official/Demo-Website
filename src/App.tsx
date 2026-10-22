import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { TreatmentsSection } from './components/TreatmentsSection';
import { DoctorSection } from './components/DoctorSection';
import { SmileJourney } from './components/SmileJourney';
import { ResultsGallery } from './components/ResultsGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { ConsultationBooking } from './components/ConsultationBooking';
import { LocationsSection } from './components/LocationsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PatientPortalModal } from './components/PatientPortalModal';
import { ToastProvider } from './context/ToastContext';

const sectionMotionProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function App() {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('clear-aligners');
  const [bookingKey, setBookingKey] = useState<number>(0);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    scrollToSection('booking');
  };

  const handleExploreClick = () => {
    scrollToSection('treatments');
  };

  const handleSelectTreatmentForBooking = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setBookingKey((k) => k + 1);
    scrollToSection('booking');
  };

  const handleBookAtLocation = (locationId: string) => {
    scrollToSection('booking');
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8F6F1] text-[#171715] flex flex-col font-sans selection:bg-[#A95B30]/20 selection:text-[#171715]">
        {/* Header Navigation */}
        <Header
          onBookClick={handleBookClick}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Main Content Sections with Framer Motion reveal */}
        <main className="flex-1">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero
              onBookClick={handleBookClick}
              onExploreClick={handleExploreClick}
            />
          </motion.div>

          {/* Understated Benefits / Trust Strip */}
          <motion.div {...sectionMotionProps}>
            <TrustStrip />
          </motion.div>

          {/* Treatments Showcase */}
          <motion.div {...sectionMotionProps}>
            <TreatmentsSection
              onSelectTreatmentForBooking={handleSelectTreatmentForBooking}
            />
          </motion.div>

          {/* Orthodontist Introduction */}
          <motion.div {...sectionMotionProps}>
            <DoctorSection onMeetClick={handleBookClick} />
          </motion.div>

          {/* Smile Journey (3-Step Roadmap) */}
          <motion.div {...sectionMotionProps}>
            <SmileJourney onStartJourneyClick={handleBookClick} />
          </motion.div>

          {/* Patient Stories & Interactive Smile Comparison Slider */}
          <motion.div {...sectionMotionProps}>
            <ResultsGallery />
          </motion.div>

          {/* Authentic Reviews & Social Proof */}
          <motion.div {...sectionMotionProps}>
            <ReviewsSection />
          </motion.div>

          {/* Consultation Booking Experience */}
          <motion.div {...sectionMotionProps}>
            <ConsultationBooking
              key={bookingKey}
              initialTreatmentId={selectedTreatmentId}
            />
          </motion.div>

          {/* Locations & Interactive Map */}
          <motion.div {...sectionMotionProps}>
            <LocationsSection onBookAtLocation={handleBookAtLocation} />
          </motion.div>

          {/* FAQs Accordion */}
          <motion.div {...sectionMotionProps}>
            <FaqSection />
          </motion.div>

          {/* Final Memorable CTA */}
          <motion.div {...sectionMotionProps}>
            <FinalCta
              onBookClick={handleBookClick}
              onContactClick={() => scrollToSection('locations')}
            />
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Secure Patient Portal Access Modal */}
        <PatientPortalModal
          isOpen={isPortalOpen}
          onClose={() => setIsPortalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
