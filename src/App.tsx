import React, { useState } from 'react';
import { Header } from './components/Header';
import { CinematicScrollHero } from './components/CinematicScrollHero';
import { HighlightsSection } from './components/HighlightsSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { MenuSection } from './components/MenuSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ReservationModal } from './components/ReservationModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export const App: React.FC = () => {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-full bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Gold Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Fixed Luxury Header (borderless) */}
      <Header onOpenReservation={() => setReservationOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full">
        {/* Crown Jewel: 3D Scroll Cinematic Animation Hero */}
        <CinematicScrollHero onOpenReservation={() => setReservationOpen(true)} />

        {/* Highlights: Craftsmanship & Heritage Pillars */}
        <HighlightsSection />

        {/* Specialties: Signature Clay-pot and Wok Creations */}
        <SpecialtiesSection onOpenReservation={() => setReservationOpen(true)} />

        {/* Full Digital Filterable Menu */}
        <MenuSection />

        {/* Patron Reviews */}
        <TestimonialsSection />

        {/* Location, Timings & Private Events */}
        <LocationHoursSection onOpenReservation={() => setReservationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Quick-Action Bar for Mobile Devices */}
      <StickyMobileBar onOpenReservation={() => setReservationOpen(true)} />

      {/* Royal Table Reservation Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
};

export default App;
