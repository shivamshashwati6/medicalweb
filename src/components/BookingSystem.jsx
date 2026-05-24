import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, Stethoscope, Clock, CheckCircle2, ChevronRight, ChevronLeft, Trash2, CalendarDays, X } from 'lucide-react';

const departmentDoctors = {
  Cardiology: ['Dr. Sarah Jenkins'],
  Neurology: ['Dr. Marcus Vance'],
  General: ['Dr. Elena Rostova'],
  Orthopedics: ['Dr. James Cole'],
  Dental: ['Dr. Arthur Dent (Dental Care)'],
  Eye: ['Dr. Evelyn Sight (Eye Care)'],
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function BookingSystem({ selectedDoctor, clearSelectedDoctor }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    timeSlot: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: success | error

  // Pre-fill doctor and department if selected from Doctors list
  useEffect(() => {
    if (selectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        department: selectedDoctor.deptId,
        doctor: selectedDoctor.name,
      }));
      setStep(2); // Jump to step 2 directly
    }
  }, [selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset doctor if department changes
      if (name === 'department') {
        updated.doctor = '';
      }
      return updated;
    });
  };

  const handleTimeSelect = (slot) => {
    setFormData((prev) => ({ ...prev, timeSlot: slot }));
  };

  // Get tomorrow's date for date validation (disallow past dates)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  // Stepper Validation
  const validateStep = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.department && formData.doctor && formData.date && formData.timeSlot;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    } else {
      setMessage({ text: 'Please fill in all fields to proceed.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    if (selectedDoctor && step === 2) {
      clearSelectedDoctor();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                      ? 'http://localhost:3000' 
                      : '';
      const response = await fetch(`${baseUrl}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setMessage({ text: result.message, type: 'success' });
        
        // Save to LocalStorage for dashboard
        const currentBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
        const newBooking = {
          ...result.appointment,
          timeSlot: formData.timeSlot,
        };
        localStorage.setItem('my_bookings', JSON.stringify([newBooking, ...currentBookings]));
        
        // Reset Form
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: '',
          doctor: '',
          date: '',
          timeSlot: '',
        });
        clearSelectedDoctor();
        setStep(4); // Success step
      } else {
        setMessage({ text: result.message || 'Failed to submit appointment.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Failed to connect to the server. Running locally?', type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const restartBooking = () => {
    setStep(1);
    setMessage({ text: '', type: '' });
  };

  return (
    <section id="appointment" className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Book Online</span>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">Make an Appointment</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
            Follow the quick steps below to schedule your visit with one of our specialized doctors.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700 p-8 transition-colors duration-300 relative overflow-hidden">
          
          {/* Stepper indicator */}
          {step <= 3 && (
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step === num
                        ? 'bg-secondary text-white ring-4 ring-teal-100 dark:ring-teal-900/50'
                        : step > num
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase hidden sm:inline ${
                      step === num
                        ? 'text-slate-800 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {num === 1 ? 'Patient Details' : num === 2 ? 'Schedule Visit' : 'Confirm'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Messages */}
          {message.text && step < 4 && (
            <div
              className={`p-4 mb-6 rounded-lg text-sm font-semibold text-center transition-all ${
                message.type === 'error'
                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Patient Information */}
            {step === 1 && (
              <div className="space-y-5 animate-slide-up">
                <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-secondary" /> Contact & Patient Information
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-teal-500/30 text-slate-800 dark:text-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-teal-500/30 text-slate-800 dark:text-white transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. (555) 000-0000"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-teal-500/30 text-slate-800 dark:text-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-1 bg-secondary text-white hover:bg-emerald-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Medical Department & Doctor & Date/Time */}
            {step === 2 && (
              <div className="space-y-6 animate-slide-up">
                <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-secondary" /> Select Appointment Schedule
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Department</label>
                    <select
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-teal-500/30 text-slate-800 dark:text-white transition-all text-sm"
                    >
                      <option value="">Choose Department</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="General">General Checkup</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Dental">Dental Care</option>
                      <option value="Eye">Eye Care</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Doctor</label>
                    <select
                      name="doctor"
                      required
                      disabled={!formData.department}
                      value={formData.doctor}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-teal-500/30 text-slate-800 dark:text-white transition-all text-sm disabled:opacity-50"
                    >
                      <option value="">Select Specialist</option>
                      {formData.department &&
                        departmentDoctors[formData.department]?.map((doc) => (
                          <option key={doc} value={doc}>
                            {doc}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={getMinDate()}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-teal-500/30 text-slate-800 dark:text-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2.5">Available Time Slots</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                          formData.timeSlot === slot
                            ? 'bg-secondary text-white border-secondary shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-1 bg-secondary text-white hover:bg-emerald-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    Review & Confirm <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Verification & Submit */}
            {step === 3 && (
              <div className="space-y-6 animate-slide-up">
                <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" /> Verify Booking Summary
                </h3>

                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 font-medium block text-xs uppercase">Patient Name</span>
                      <strong className="text-slate-800 dark:text-white">{formData.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 font-medium block text-xs uppercase">Contact Information</span>
                      <strong className="text-slate-800 dark:text-white text-xs">{formData.email} | {formData.phone}</strong>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 font-medium block text-xs uppercase">Department & Doctor</span>
                      <strong className="text-slate-800 dark:text-white">{formData.department} - {formData.doctor}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 font-medium block text-xs uppercase">Scheduled Date & Time</span>
                      <strong className="text-secondary flex items-center gap-1 mt-0.5">
                        <Clock className="h-4 w-4" /> {formData.date} at {formData.timeSlot}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" /> Edit Details
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-1.5 bg-secondary text-white hover:bg-emerald-600 px-8 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? 'Confirming Appointment...' : 'Confirm Appointment'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Success Ticket Screen */}
            {step === 4 && (
              <div className="text-center py-8 space-y-6 animate-scale-up">
                <div className="h-20 w-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
                  <CheckCircle2 className="h-12 w-12" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Booking Confirmed!</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-md mx-auto">
                    {message.text}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm mx-auto text-left relative">
                  <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 transform -translate-y-1/2"></div>
                  
                  <h4 className="text-xs uppercase text-slate-400 dark:text-slate-500 tracking-wider font-bold mb-3">Appointment Ticket</h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p><strong>Department:</strong> {formData.department || 'Cardiology'}</p>
                    <p><strong>Doctor:</strong> {formData.doctor || 'Dr. Sarah Jenkins'}</p>
                    <p className="text-secondary font-bold"><strong>Date:</strong> {formData.date || 'Tomorrow'}</p>
                    <p className="text-secondary font-bold"><strong>Time Slot:</strong> {formData.timeSlot || '09:00 AM'}</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={restartBooking}
                    className="px-6 py-2.5 bg-secondary text-white font-bold rounded-xl text-sm hover:bg-emerald-600 transition-all shadow-md"
                  >
                    Book Another Visit
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}

/* Bookings Dashboard Drawer / Modal Component */
export function BookingsDashboard({ isOpen, onClose }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const storedBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
      setBookings(storedBookings);
    }
  }, [isOpen]);

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const storedBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
      const filtered = storedBookings.filter((b) => b.id !== id);
      localStorage.setItem('my_bookings', JSON.stringify(filtered));
      setBookings(filtered);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left border-l border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-teal-50/20 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">My Appointments</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Calendar className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">No appointments scheduled.</p>
              <button 
                onClick={onClose}
                className="text-xs text-secondary font-bold hover:underline"
              >
                Schedule one now
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 rounded-xl p-4 flex justify-between items-start group shadow-sm hover:shadow transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                      {booking.department}
                    </span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      ID: {booking.id.toString().slice(-6)}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                    {booking.doctor}
                  </h4>
                  
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-secondary" /> {booking.date} at {booking.timeSlot || '09:00 AM'}
                  </p>
                  
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Patient: {booking.name}
                  </p>
                </div>

                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                  title="Cancel Appointment"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            For emergencies, please contact clinic reception directly at +1 (555) 123-4567.
          </p>
        </div>

      </div>
    </div>
  );
}
