import React, { Suspense, lazy, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Models from './components/Models';
import EngineSection from './components/EngineSection';
import StoryInterior from './components/StoryInterior';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BookDriveModal from './components/BookDriveModal';
import { useLenis } from './hooks/useLenis';

// Lazy-load the heavy interactive background as specified in requirements
const InteractiveBackground = lazy(() => import('./components/InteractiveBackground'));

function App() {
  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useLenis(true);

  // Global state for Book a Drive modal
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedModelForBooking, setSelectedModelForBooking] = useState('HOTSON GT-ONE');

  const handleOpenBookModal = (modelName = 'HOTSON GT-ONE') => {
    setSelectedModelForBooking(modelName);
    setBookModalOpen(true);
  };

  const handleCloseBookModal = () => {
    setBookModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#E0E0E6] selection:bg-[#FF6A2B] selection:text-white">
      {/* Precision custom trailing cursor */}
      <CustomCursor />

      {/* Interactive particle canvas background with Suspense fallback */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#0A0A0C] pointer-events-none z-0" />}>
        <InteractiveBackground />
      </Suspense>

      {/* Main Layout Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Translucent Navbar with Scroll state */}
        <Navbar onBookDriveClick={() => handleOpenBookModal('HOTSON GT-ONE')} />

        <main id="main-content" className="flex-1">
          {/* Section 2: Hero + Integrated StatsBar */}
          <Hero
            onExploreClick={() => {
              const el = document.querySelector('#models');
              if (el) {
                if (window.__lenis) window.__lenis.scrollTo(el);
                else el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onWatchFilmClick={() => {}}
          />

          {/* Section 3: Models (Cream contrast section) */}
          <Models
            onBookDriveClick={() => handleOpenBookModal('HOTSON GT-ONE')}
          />

          {/* Section 4: Technology / EngineSection (Pinned Exploded 3D scroll animation) */}
          <EngineSection />

          {/* Section 5: StoryInterior (Sanctuary & Human Craft) */}
          <StoryInterior
            onBookDriveClick={() => handleOpenBookModal('HOTSON PHANTOM S')}
          />

          {/* Section 6: CtaBanner (Full-width sunset highway) */}
          <CtaBanner
            onBookDriveClick={() => handleOpenBookModal('HOTSON TERRA-X')}
          />
        </main>

        {/* Section 7: Footer (3 Columns, newsletter, legal) */}
        <Footer />
      </div>

      {/* Booking Drawer Modal */}
      <BookDriveModal
        isOpen={bookModalOpen}
        onClose={handleCloseBookModal}
        preselectedModel={selectedModelForBooking}
      />
    </div>
  );
}

export default App;

