import React from 'react';
import { ArrowRight, HeartPulse, ShieldAlert, Award, Star } from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-12 bg-gradient-to-br from-teal-50/70 via-white to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col space-y-6 text-center lg:text-left animate-slide-up">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-secondary-light text-secondary-dark dark:bg-teal-950/50 dark:text-teal-300">
              <Star className="h-3.5 w-3.5 fill-current" /> Welcome to CareWell
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight">
            Trusted Healthcare for You and Your <span className="text-secondary">Family</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
            Comprehensive medical services with professional doctors in a caring, modern environment. Your health and peace of mind are our top priorities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => handleScrollTo('#appointment')}
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white hover:bg-emerald-600 px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Schedule a Visit <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScrollTo('#services')}
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-3.5 rounded-full font-semibold shadow-sm hover:shadow transition-all duration-200"
            >
              Our Services
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="border-l-4 border-secondary pl-3 text-left">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">24/7</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Emergency Care</p>
            </div>
            <div className="border-l-4 border-secondary pl-3 text-left">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">50+</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Expert Doctors</p>
            </div>
            <div className="border-l-4 border-secondary pl-3 text-left">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">10k+</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Happy Patients</p>
            </div>
          </div>
        </div>

        {/* Right Media */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in">
          <div className="relative max-w-md md:max-w-lg">
            {/* Background shape */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-secondary to-teal-400 rounded-[2rem] blur opacity-30 dark:opacity-20 animate-pulse"></div>
            
            <img
              src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medical Team"
              className="relative rounded-[2rem] shadow-2xl border-4 border-white dark:border-slate-800 object-cover w-full h-[450px]"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 right-6 sm:-left-6 sm:right-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl shadow-xl flex items-center gap-4 border border-slate-100 dark:border-slate-800 animate-float-slow">
              <div className="h-12 w-12 rounded-full bg-secondary-light text-secondary flex items-center justify-center dark:bg-teal-950/50">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-white">Top Quality</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Medical Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
