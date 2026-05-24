import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' }); // success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ text: '', type: '' });

    try {
      const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                      ? 'http://localhost:3000' 
                      : '';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFeedback({ text: result.message, type: 'success' });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setFeedback({ text: result.message || 'Failed to submit contact form.', type: 'error' });
      }
    } catch (err) {
      setFeedback({ text: 'Could not connect to backend server. Is it running?', type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-800 dark:text-white">Contact CareWell</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Have questions about our services or need medical assistance? Drop us a message, and our staff will reply shortly.
          </p>
        </div>

        {/* Inner Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              {/* Address */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-slate-850 text-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white text-sm">Location</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    123 Health Avenue, Medical City, MC 90210
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-slate-850 text-secondary flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white text-sm">Phones</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Emergency: +1 (555) 123-4567<br />
                    Reception: +1 (555) 123-4568
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-slate-850 text-secondary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white text-sm">Email Addresses</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    info@carewellclinic.com<br />
                    appointments@carewellclinic.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-slate-850 text-secondary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white text-sm">Working Hours</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Mon - Fri: 8:00 AM - 7:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-2xl transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-6">Send Us a Message</h3>

            {feedback.text && (
              <div
                className={`p-4 mb-6 rounded-xl flex items-center gap-2 text-sm font-semibold ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0" />
                )}
                <span>{feedback.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-800 dark:text-white transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-800 dark:text-white transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Appointment Inquiry"
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-800 dark:text-white transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Message</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need help with..."
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-800 dark:text-white transition-all text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-white hover:bg-emerald-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Sending Message...' : 'Send Message'} <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
