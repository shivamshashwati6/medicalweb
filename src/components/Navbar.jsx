import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Sun, Moon, Menu, X, PlusSquare } from 'lucide-react';

export default function Navbar({ onOpenBookings }) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active state
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navLinks[i].href.substring(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-4'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-white transition-colors">
          <PlusSquare className="h-7 w-7 text-secondary" />
          <span>CareWell <span className="text-secondary">Clinic</span></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-medium transition-colors hover:text-secondary ${
                  activeSection === link.href.substring(1)
                    ? 'text-secondary'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* My Bookings Button */}
            <button
              onClick={onOpenBookings}
              className="text-slate-600 dark:text-slate-300 hover:text-secondary font-medium transition-colors text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary"
            >
              My Bookings
            </button>

            {/* CTA */}
            <a
              href="#appointment"
              onClick={(e) => handleLinkClick(e, '#appointment')}
              className="bg-secondary text-white hover:bg-emerald-600 px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Book Appointment
            </a>
          </div>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button
            onClick={onOpenBookings}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            Bookings
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-800 dark:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-slate-900 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between p-6 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 mt-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-lg font-medium transition-colors hover:text-secondary ${
                activeSection === link.href.substring(1)
                  ? 'text-secondary'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <a
            href="#appointment"
            onClick={(e) => handleLinkClick(e, '#appointment')}
            className="bg-secondary text-white text-center py-3 rounded-full font-semibold shadow-md block"
          >
            Book Appointment
          </a>
        </div>
      </div>
      
      {/* Overlay to close mobile menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 md:hidden"
        />
      )}
    </nav>
  );
}
