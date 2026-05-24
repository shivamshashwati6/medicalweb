import React, { useState } from 'react';
import { HeartPulse, Stethoscope, Activity, Brain, Smile, Eye, ArrowRight, X, CalendarCheck, ShieldCheck } from 'lucide-react';

const specialties = [
  {
    id: 'cardiology',
    title: 'Cardiology',
    icon: HeartPulse,
    shortDesc: 'Expert care for heart health and cardiovascular disease, using the latest testing and diagnosis technology.',
    longDesc: 'Our Cardiology department provides comprehensive evaluation, diagnosis, and treatment for all heart-related conditions. We utilize cutting-edge medical diagnostic tools to evaluate cardiovascular function and design custom rehabilitation and management plans.',
    diagnostics: ['Electrocardiogram (ECG)', 'Echocardiogram', 'Stress Testing', 'Holter Monitor'],
    treatments: ['Coronary Artery Disease Mgmt', 'Arrhythmia Management', 'Hypertension Treatment', 'Heart Failure Therapy'],
  },
  {
    id: 'general',
    title: 'General Checkup',
    icon: Stethoscope,
    shortDesc: 'Comprehensive health screenings routines to ensure your long-term wellness and monitor vitality effectively.',
    longDesc: 'General Checkups focus on preventive health care, routine screenings, and general wellness checks. Regular health checks can detect potential issues early before they become serious, ensuring a long and healthy life.',
    diagnostics: ['Comprehensive Blood Panels', 'Blood Pressure Screening', 'Body Mass Index (BMI)', 'Immunizations check'],
    treatments: ['Preventive Care Guidance', 'Lifestyle and Diet Counseling', 'Chronic Condition Management', 'Annual Health Reports'],
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    icon: Activity,
    shortDesc: 'Specialized treatments for bone, joint health issues, arthritis relief, and professional sports injuries therapy.',
    longDesc: 'The Orthopedics department treats diseases, injuries, and conditions affecting the musculoskeletal system. This includes bones, joints, ligaments, tendons, muscles, and nerves.',
    diagnostics: ['Digital X-Rays', 'Bone Density Scans (DEXA)', 'Joint Range Assessment', 'MRI Screenings'],
    treatments: ['Joint Pain Management', 'Arthritis Treatment Protocols', 'Fracture Care & Casting', 'Sports Injury Rehabilitation'],
  },
  {
    id: 'neurology',
    title: 'Neurology',
    icon: Brain,
    shortDesc: 'Advanced diagnosis and specialized treatment plans designed for complex disorders of the nervous system.',
    longDesc: 'Our neurology center specializes in diagnosing and treating disorders of the central and peripheral nervous systems, including the brain, spinal cord, nerves, and muscles.',
    diagnostics: ['Electroencephalogram (EEG)', 'Nerve Conduction Studies', 'Cognitive/Reflex Testing', 'Vascular Studies'],
    treatments: ['Migraine and Headache Mgmt', 'Neuropathy Treatment', 'Sleep Disorder Consultation', 'Stroke Recovery Support'],
  },
  {
    id: 'dental',
    title: 'Dental Care',
    icon: Smile,
    shortDesc: 'Complete dental services ranging from everyday oral hygiene to advanced and restorative cosmetic dentistry.',
    longDesc: 'Our Dental Care team offers complete oral health solutions, from standard cleaning and prevention to advanced restorative and cosmetic treatments. We prioritize patient comfort and gentle dental techniques.',
    diagnostics: ['Digital Dental Radiography', 'Periodontal Examination', 'Intraoral Imaging', 'Cavity Detection'],
    treatments: ['Teeth Cleaning and Scaling', 'Fillings and Root Canals', 'Cosmetic Teeth Whitening', 'Crowns and Bridges'],
  },
  {
    id: 'eye',
    title: 'Eye Care',
    icon: Eye,
    shortDesc: 'State-of-the-art vision correction, detailed eye exams, and precision-driven surgical eye care procedures.',
    longDesc: 'The Ophthalmology and Optometry center offers full vision exams, optical assessments, disease diagnosis, and surgical recommendations to safeguard and optimize your sight.',
    diagnostics: ['Visual Acuity Testing', 'Glaucoma Tonometry Check', 'Retinal Imaging', 'Refraction Assessment'],
    treatments: ['Refractive Vision Correction', 'Dry Eye Therapy', 'Cataract Screenings', 'Prescription Eyewear fitting'],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const handleBookRedirect = () => {
    setSelectedService(null);
    const target = document.querySelector('#appointment');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Specialties</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">Premium Medical Services</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            We offer a wide range of high-quality medical services to address all your healthcare needs with advanced medical technology.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-teal-50 dark:bg-slate-900 text-secondary group-hover:bg-secondary group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-secondary transition-colors duration-200 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-teal-600 dark:hover:text-teal-400 group/btn"
                  >
                    Learn more{' '}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scale-up flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-teal-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary text-white flex items-center justify-center">
                  <selectedService.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {selectedService.title} Department
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-600 dark:text-slate-300">
              <p className="text-sm leading-relaxed">{selectedService.longDesc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide flex items-center gap-1.5 text-secondary">
                    <ShieldCheck className="h-4.5 w-4.5" /> Diagnostics & Testing
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.diagnostics.map((diag, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                        {diag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide flex items-center gap-1.5 text-secondary">
                    <CalendarCheck className="h-4.5 w-4.5" /> Core Treatments
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.treatments.map((treat, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                        {treat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/30">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm transition-all"
              >
                Close Window
              </button>
              <button
                onClick={handleBookRedirect}
                className="px-6 py-2.5 rounded-lg bg-secondary text-white font-semibold hover:bg-emerald-600 text-sm shadow-md hover:shadow-lg transition-all"
              >
                Book Department Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
