import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { TRICITY_AREAS } from '../data/locations';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { City, Address } from '../types';
import { PaymentModal } from '../components/common/PaymentModal';
import {
  MapPin,
  Calendar,
  Clock,
  Upload,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Camera,
  X
} from 'lucide-react';

export const BookingCheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentUser, currentCity, setCity } = useAuth();
  const { createBooking } = useData();

  const service = SERVICES.find(s => s.slug === slug) || SERVICES[0];

  // Wizard Steps
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [subService, setSubService] = useState(service.subcategories[0] || '');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80'
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Location / Address State
  const [addressCity, setAddressCity] = useState<City>(currentCity);
  const cityAreas = TRICITY_AREAS.filter(a => a.city === addressCity);
  const [selectedArea, setSelectedArea] = useState(cityAreas[0]?.name || 'Phase 7 (Sector 61)');
  const [streetAddress, setStreetAddress] = useState('House No. 1244, Street 4');
  const [landmark, setLandmark] = useState('Near Market / Gurdwara');
  const [pincode, setPincode] = useState('160062');

  // Customer Contact State
  const [custName, setCustName] = useState(currentUser?.name || 'Rahul Sharma');
  const [custPhone, setCustPhone] = useState(currentUser?.phone || '+91 98765 43210');

  // Schedule State
  const [scheduleType, setScheduleType] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledDate, setScheduledDate] = useState('2026-10-31');
  const [timeSlot, setTimeSlot] = useState('Within 30-45 minutes');

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Handle adding photo
  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos([...photos, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  // Payment Success Callback
  const handlePaymentSuccess = (paymentDetails: { method: 'upi' | 'card' | 'cash'; transactionId: string }) => {
    setIsPaymentModalOpen(false);

    const fullAddress: Address = {
      id: `addr-${Date.now()}`,
      label: 'Home',
      city: addressCity,
      area: selectedArea,
      streetAddress,
      landmark,
      pincode: pincode || '160062'
    };

    const newBooking = createBooking({
      customerId: currentUser?.id || `cust-${Date.now()}`,
      customerName: custName,
      customerPhone: custPhone,
      serviceId: service.id,
      serviceTitle: service.title,
      subService,
      category: service.category,
      description: description || `Request for ${subService} in ${selectedArea}`,
      photos: photos.length > 0 ? photos : undefined,
      address: fullAddress,
      scheduledDate: scheduleType === 'asap' ? new Date().toISOString().split('T')[0] : scheduledDate,
      scheduledTimeSlot: scheduleType === 'asap' ? 'Immediate Urgent Dispatch (25-40 min)' : timeSlot,
      tokenAmount: service.tokenPrice,
      tokenPaymentStatus: 'paid',
      status: 'PENDING_ACCEPTANCE'
    });

    // Navigate to live tracking page!
    navigate(`/booking/status/${newBooking.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Step Indicator Progress */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          {[
            { step: 1, label: 'Service & Details' },
            { step: 2, label: 'Address & City' },
            { step: 3, label: 'Schedule' },
            { step: 4, label: 'Confirm & Token' }
          ].map(s => (
            <div key={s.step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === s.step
                    ? 'bg-brand-orange text-white shadow-sm'
                    : currentStep > s.step
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {currentStep > s.step ? '✓' : s.step}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
                  currentStep === s.step ? 'text-brand-navy font-bold' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Sub-service & Problem Description */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Step 1 of 4
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                Specify Your {service.title} Requirement
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us what you need help with so we dispatch the right worker equipped with correct tools.
              </p>
            </div>

            {/* Subcategories selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Select Exact Task:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.subcategories.map(sub => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubService(sub)}
                    className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      subService === sub
                        ? 'border-brand-orange bg-orange-50/50 text-brand-navy shadow-xs ring-1 ring-brand-orange'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{sub}</span>
                    {subService === sub && <CheckCircle2 size={16} className="text-brand-orange" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Describe the Issue or Job (Optional):
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="e.g. MCB tripping when geyser is turned on, burning smell in distribution box..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
              />
            </div>

            {/* Optional Photo Attachment */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Upload Photos of the Issue (Optional):
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                    <img src={p} alt="Issue preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 p-0.5 bg-black/70 text-white rounded-full hover:bg-rose-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={e => setNewPhotoUrl(e.target.value)}
                    placeholder="Paste image link or use sample"
                    className="px-3 py-2 text-xs border border-slate-200 rounded-xl w-60"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Add Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <span>Continue to Address</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location & Address */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Step 2 of 4
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                Select Doorstep Location
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Where should the verified worker report in Mohali or Chandigarh?
              </p>
            </div>

            {/* City Selector */}
            <div className="grid grid-cols-2 gap-3">
              {(['Mohali', 'Chandigarh'] as City[]).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setAddressCity(c);
                    setCity(c);
                    const matchingAreas = TRICITY_AREAS.filter(a => a.city === c);
                    setSelectedArea(matchingAreas[0]?.name || '');
                  }}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all ${
                    addressCity === c
                      ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-xs'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <MapPin size={16} className="mx-auto mb-1" />
                  {c} (Tri-City)
                </button>
              ))}
            </div>

            {/* Sector / Phase Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Sector / Phase:
              </label>
              <select
                value={selectedArea}
                onChange={e => setSelectedArea(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-orange bg-white"
              >
                {cityAreas.map(a => (
                  <option key={a.id} value={a.name}>
                    {a.name} (Pin: {a.pincode})
                  </option>
                ))}
              </select>
            </div>

            {/* Street Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                House / Flat / Shop Number & Street:
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)}
                placeholder="e.g. House No. 1244, 2nd Floor, Street 4"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
              />
            </div>

            {/* Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Nearby Landmark:
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="e.g. Near Amb Sahib Gurdwara"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Pincode:
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="160062"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Contact Mobile Number:
                </label>
                <input
                  type="text"
                  value={custPhone}
                  onChange={e => setCustPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <span>Continue to Schedule</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Time Slot */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Step 3 of 4
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                Choose Schedule & Timing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Need someone right now or want to book for later today / tomorrow?
              </p>
            </div>

            {/* Quick Urgent Dispatch vs Scheduled */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setScheduleType('asap')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  scheduleType === 'asap'
                    ? 'border-brand-orange bg-orange-50/50 ring-1 ring-brand-orange'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={18} className="text-brand-orange" />
                  <span className="text-sm font-bold text-slate-900">Urgent Dispatch</span>
                </div>
                <p className="text-xs text-slate-500">
                  Worker assigned in 2-5 minutes. Reaches in 25–40 mins.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setScheduleType('scheduled')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  scheduleType === 'scheduled'
                    ? 'border-brand-orange bg-orange-50/50 ring-1 ring-brand-orange'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={18} className="text-brand-orange" />
                  <span className="text-sm font-bold text-slate-900">Schedule Ahead</span>
                </div>
                <p className="text-xs text-slate-500">
                  Choose specific date and slot that works best for you.
                </p>
              </button>
            </div>

            {scheduleType === 'scheduled' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Select Time Window:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      '9:00 AM - 11:00 AM',
                      '11:00 AM - 1:00 PM',
                      '2:00 PM - 4:00 PM',
                      '4:00 PM - 6:00 PM',
                      '6:00 PM - 8:00 PM'
                    ].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                          timeSlot === slot
                            ? 'border-brand-orange bg-orange-50 text-brand-orange'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <span>Review & Pay Token</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary & Token Payment */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Step 4 of 4
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                Review Booking & Pay Token
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your ₹{service.tokenPrice} token locks your worker dispatch and is fully credited against your final job bill.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{service.title} ({subService})</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-900 text-right">
                  {streetAddress}, {selectedArea}, {addressCity}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Timing:</span>
                <span className="font-bold text-slate-900">
                  {scheduleType === 'asap' ? 'Immediate Urgent Dispatch' : `${scheduledDate} (${timeSlot})`}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Estimated Labor Range:</span>
                <span className="font-bold text-slate-700">{service.estimatedBaseCost}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-base">
                <span className="font-extrabold text-brand-navy">Booking Token Payable Now:</span>
                <span className="font-extrabold text-brand-orange text-lg">₹{service.tokenPrice}</span>
              </div>
            </div>

            {/* Token Policy Guarantee Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 space-y-2 text-xs text-brand-navy">
              <div className="font-bold flex items-center gap-1.5 text-brand-orange">
                <ShieldCheck size={16} />
                <span>Our 100% Transparent Token Promise:</span>
              </div>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li>
                  <strong>Fully Adjusted:</strong> When the worker provides the final bill (e.g. ₹450), this ₹{service.tokenPrice} is automatically deducted (you only pay ₹{450 - service.tokenPrice}).
                </li>
                <li>
                  <strong>Instant Cancellation Refund:</strong> If no worker accepts your request within 30 minutes, 100% refund is credited back instantly.
                </li>
                <li>
                  <strong>Inspection Charge:</strong> If you choose not to proceed after worker arrives and gives quotation, standard ₹99 inspection charge applies.
                </li>
              </ul>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="px-7 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <Lock size={15} />
                <span>Pay ₹{service.tokenPrice} Token & Request Worker</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Razorpay Simulated Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={service.tokenPrice}
        title={`Book ${service.title}`}
        subtitle={`Booking token for ${selectedArea}, ${addressCity}`}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

