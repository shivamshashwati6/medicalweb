import React, { useState } from 'react';
import { PlusSquare, Facebook, Twitter, Instagram, Linkedin, Mail, Send, Check } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <PlusSquare className="h-7 w-7 text-secondary" />
            <span>CareWell <span className="text-secondary">Clinic</span></span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            Providing world-class, professional medical services. Your health, healing, and well-being are always our top priorities.
          </p>
          <div className="flex gap-3 pt-2">
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Linkedin, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="h-9 w-9 rounded-full bg-slate-800 text-slate-400 hover:bg-secondary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-wider uppercase">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: 'Home', target: '#home' },
              { label: 'Services Specialties', target: '#services' },
              { label: 'Our Specialists', target: '#doctors' },
              { label: 'Contact Us', target: '#contact' },
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.target}
                  onClick={(e) => handleLinkClick(e, link.target)}
                  className="hover:text-white transition-colors hover:pl-1 duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Details */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-wider uppercase">Contact Details</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <span className="text-secondary font-bold shrink-0">Address:</span>
              <span>123 Health Avenue, Medical City</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-secondary font-bold shrink-0">Phone:</span>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-secondary font-bold shrink-0">Email:</span>
              <span className="break-all">info@carewellclinic.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-wider uppercase font-sans">Newsletter</h3>
          <p className="text-xs text-slate-400">
            Subscribe to our newsletter for health tips, updates, and medical insights.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-2 text-xs w-full text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary/70 transition-all"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-secondary text-white rounded-xl hover:bg-emerald-600 shadow-sm transition-all shrink-0 flex items-center justify-center"
            >
              {newsletterSubscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          {newsletterSubscribed && (
            <p className="text-[10px] text-emerald-400 font-semibold animate-fade-in">
              Subscribed successfully! Thank you.
            </p>
          )}
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} CareWell Clinic. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
