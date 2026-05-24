import React, { useState } from 'react';
import { Calendar, Award, Star, Mail } from 'lucide-react';

const doctorsList = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    deptId: 'Cardiology',
    title: 'Senior Cardiologist',
    experience: '15+ Years',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    schedule: 'Mon, Wed, Fri',
    bio: 'Dedicated to helping patients maintain cardiovascular health through personalized treatment plans and preventive care.',
  },
  {
    id: 'marcus-vance',
    name: 'Dr. Marcus Vance',
    department: 'Neurology',
    deptId: 'Neurology',
    title: 'Neurosurgeon Specialist',
    experience: '12+ Years',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    schedule: 'Tue, Thu, Sat',
    bio: 'Specializes in the advanced surgical and non-surgical treatment of conditions affecting the brain and nervous system.',
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova',
    department: 'General Checkup',
    deptId: 'General',
    title: 'Family Medicine Consultant',
    experience: '8+ Years',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    schedule: 'Mon, Tue, Thu, Fri',
    bio: 'Focuses on holistic preventive family healthcare, routing checkups, immunizations, and chronic illness management.',
  },
  {
    id: 'james-cole',
    name: 'Dr. James Cole',
    department: 'Orthopedics',
    deptId: 'Orthopedics',
    title: 'Orthopedic Surgeon',
    experience: '10+ Years',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    schedule: 'Wed, Thu, Sat',
    bio: 'Specialist in sports medicine, corrective bone surgeries, joint replacement therapies, and injury recovery coaching.',
  },
];

const categories = ['All', 'Cardiology', 'Neurology', 'General Checkup', 'Orthopedics'];

export default function Doctors({ onSelectDoctor }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDoctors = selectedCategory === 'All'
    ? doctorsList
    : doctorsList.filter(doc => doc.department === selectedCategory);

  const handleQuickBook = (doctor) => {
    onSelectDoctor(doctor);
    const target = document.querySelector('#appointment');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="doctors" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Meet Specialists</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">Our Medical Specialists</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Our team of world-class doctors, surgeons, and healthcare consultants is ready to help you feel better.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm ${
                selectedCategory === cat
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Doctor Photo */}
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm py-1 px-2.5 rounded-lg flex items-center gap-1 shadow-sm text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {doctor.rating}
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 flex flex-col space-y-4">
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    {doctor.title}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-1">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {doctor.bio}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Award className="h-3.5 w-3.5 text-secondary" />
                    <span>Experience: <strong className="text-slate-800 dark:text-slate-200">{doctor.experience}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-secondary" />
                    <span>Availability: <strong className="text-slate-800 dark:text-slate-200">{doctor.schedule}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickBook(doctor)}
                  className="w-full py-2.5 bg-white dark:bg-slate-800 text-secondary hover:bg-secondary hover:text-white border border-secondary dark:border-teal-500/30 font-semibold rounded-xl text-xs transition-all duration-300 shadow-sm"
                >
                  Quick Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
