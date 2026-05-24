import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Doctors from './components/Doctors.jsx';
import BookingSystem, { BookingsDashboard } from './components/BookingSystem.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleClearSelectedDoctor = () => {
    setSelectedDoctor(null);
  };

  const handleOpenBookings = () => {
    setIsBookingsOpen(true);
  };

  const handleCloseBookings = () => {
    setIsBookingsOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Header */}
      <Navbar onOpenBookings={handleOpenBookings} />

      {/* Main Sections */}
      <main>
        <Hero />
        <Services />
        <Doctors onSelectDoctor={handleSelectDoctor} />
        <BookingSystem 
          selectedDoctor={selectedDoctor} 
          clearSelectedDoctor={handleClearSelectedDoctor} 
        />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Overlay Booking Dashboard Drawer */}
      <BookingsDashboard 
        isOpen={isBookingsOpen} 
        onClose={handleCloseBookings} 
      />
    </div>
  );
}
