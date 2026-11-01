import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { PaymentModal } from '../components/common/PaymentModal';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Star,
  ArrowRight,
  Info,
  XCircle,
  HelpCircle,
  Car
} from 'lucide-react';

export const BookingTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, customerApproveQuotation, payFinalBill, submitReview, cancelBooking } = useData();
  const { currentUser } = useAuth();

  const booking = bookings.find(b => b.id === id) || bookings[0];

  // Modals & local state
  const [isFinalPaymentModalOpen, setIsFinalPaymentModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change of plan');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Booking Not Found</h2>
        <Link to="/customer/dashboard" className="mt-4 inline-block px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const handleFinalPaymentDone = (details: { method: 'upi' | 'card' | 'cash'; transactionId: string }) => {
    setIsFinalPaymentModalOpen(false);
    payFinalBill(booking.id, details.method);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(booking.id, reviewRating, reviewFeedback || 'Great service and prompt arrival!', punctualityRating, qualityRating);
    setIsReviewSubmitted(true);
  };

  const handleCancel = () => {
    cancelBooking(booking.id, cancelReason, 'customer');
    setIsCancelModalOpen(false);
  };

  // Status timeline steps
  const steps = [
    { key: 'PENDING_ACCEPTANCE', label: 'Request Dispatched' },
    { key: 'ACCEPTED', label: 'Worker Assigned' },
    { key: 'EN_ROUTE', label: 'En Route' },
    { key: 'ARRIVED_INSPECTING', label: 'Inspecting Job' },
    { key: 'IN_PROGRESS', label: 'Work in Progress' },
    { key: 'COMPLETED', label: 'Job Finished' }
  ];

  const getStepStatus = (stepKey: string) => {
    const order = ['PENDING_ACCEPTANCE', 'ACCEPTED', 'EN_ROUTE', 'ARRIVED_INSPECTING', 'QUOTATION_SUBMITTED', 'IN_PROGRESS', 'COMPLETED'];
    const currentIdx = order.indexOf(booking.status);
    const targetIdx = order.indexOf(stepKey);

    if (booking.status === 'CANCELLED') return 'cancelled';
    if (targetIdx < currentIdx) return 'completed';
    if (targetIdx === currentIdx || (stepKey === 'ARRIVED_INSPECTING' && booking.status === 'QUOTATION_SUBMITTED')) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Booking ID: {booking.bookingNumber}
              </span>
              <StatusBadge status={booking.status} size="sm" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              {booking.serviceTitle}
              {booking.subService && <span className="text-slate-500 font-semibold text-lg"> • {booking.subService}</span>}
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-orange" />
              <span>{booking.address.streetAddress}, {booking.address.area}, {booking.address.city}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Token Paid</span>
            <div className="text-2xl font-black text-brand-orange">₹{booking.tokenAmount}</div>
            <span className="text-[11px] text-emerald-600 font-semibold block">
              Adjustable against final bill
            </span>
          </div>
        </div>

        {/* Realistic Status Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Realistic Booking Status Timeline
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {steps.map(step => {
              const state = getStepStatus(step.key);
              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : state === 'current'
                        ? 'bg-brand-orange text-white ring-4 ring-orange-100 animate-pulse'
                        : state === 'cancelled'
                        ? 'bg-slate-200 text-slate-400'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {state === 'completed' ? '✓' : state === 'current' ? '●' : '○'}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      state === 'current' ? 'text-brand-navy font-bold' : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Realistic Status Banner */}
          {booking.status === 'PENDING_ACCEPTANCE' && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0">
                <Clock size={18} className="animate-spin" />
              </div>
              <div className="text-xs text-amber-900">
                <strong className="block font-bold">Broadcasting request to nearby verified workers...</strong>
                Our dispatch engine is notifying verified professionals in {booking.address.area}, {booking.address.city}. They typically accept within 2-4 minutes.
              </div>
            </div>
          )}

          {booking.status === 'ACCEPTED' && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="text-xs text-blue-900">
                <strong className="block font-bold">Worker accepted your booking!</strong>
                {booking.workerName} has confirmed your job. Estimated arrival at your doorstep in{' '}
                <strong>{booking.estimatedArrivalMins || 25} minutes</strong>.
              </div>
            </div>
          )}

          {booking.status === 'EN_ROUTE' && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Car size={18} className="animate-bounce" />
              </div>
              <div className="text-xs text-indigo-900">
                <strong className="block font-bold">Worker is en route to your location!</strong>
                {booking.workerName} is travelling towards {booking.address.area}. Please keep entrance accessible.
              </div>
            </div>
          )}

          {booking.status === 'ARRIVED_INSPECTING' && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs text-purple-900">
                <strong className="block font-bold">Worker has arrived and is inspecting!</strong>
                {booking.workerName} is currently evaluating the issue on site and will provide an itemized quotation shortly.
              </div>
            </div>
          )}

          {booking.status === 'COMPLETED' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="text-xs text-emerald-900">
                <strong className="block font-bold">Service successfully completed!</strong>
                Thank you for using Find My Worker in {booking.address.city}. Please review the invoice and rate your worker below.
              </div>
            </div>
          )}
        </div>

        {/* Assigned Worker Profile Card (if assigned) */}
        {booking.workerId && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assigned Worker Partner
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={booking.workerAvatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'}
                  alt={booking.workerName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-orange shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-base">{booking.workerName}</h4>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck size={12} />
                      Aadhaar Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={booking.workerRating || 4.9} size={13} showNumber count={128} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Specialist for {booking.serviceTitle} • Serving {booking.address.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${booking.workerPhone}`}
                  className="w-full sm:w-auto px-4 py-2.5 bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone size={14} className="text-brand-orange" />
                  <span>Call {booking.workerPhone}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Quotation Approval Box (When worker submits quotation) */}
        {booking.quotation && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt size={20} className="text-brand-orange" />
                <h3 className="font-extrabold text-slate-900 text-base">On-Site Quotation & Bill</h3>
              </div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                booking.quotation.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-brand-orange'
              }`}>
                {booking.quotation.status === 'accepted' ? 'Approved by Customer' : 'Pending Your Approval'}
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <strong>Worker Diagnostic Notes:</strong> {booking.quotation.notes}
            </p>

            {/* Bill breakdown */}
            <div className="space-y-2 text-xs sm:text-sm border-t border-b border-slate-100 py-3">
              <div className="flex justify-between text-slate-600">
                <span>Labor Charges:</span>
                <span className="font-bold text-slate-800">₹{booking.quotation.laborCharges}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Materials / Spare Parts:</span>
                <span className="font-bold text-slate-800">₹{booking.quotation.materialsCost}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Booking Token Adjustment:</span>
                <span>- ₹{booking.quotation.tokenAdjusted}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-brand-navy pt-2 border-t border-slate-200">
                <span>Final Payable Balance:</span>
                <span className="text-brand-orange text-lg">₹{booking.quotation.finalPayableAmount}</span>
              </div>
            </div>

            {/* If pending quotation approval */}
            {booking.quotation.status === 'pending' && (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  By accepting, work will commence immediately. Token has been deducted.
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => customerApproveQuotation(booking.id)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Accept & Begin Work
                  </button>
                </div>
              </div>
            )}

            {/* If job completed and final bill needs payment */}
            {booking.status === 'COMPLETED' && (!booking.finalPayment || booking.finalPayment.status !== 'paid') && (
              <div className="pt-3">
                <button
                  onClick={() => setIsFinalPaymentModalOpen(true)}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Receipt size={16} />
                  <span>Pay Balance ₹{booking.quotation.finalPayableAmount} (UPI / Card / Cash)</span>
                </button>
              </div>
            )}

            {/* If payment complete */}
            {booking.finalPayment?.status === 'paid' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>
                    Full bill settled via <strong>{booking.finalPayment.method.toUpperCase()}</strong> (Txn: {booking.finalPayment.transactionId})
                  </span>
                </div>
                <span className="font-bold">Paid ₹{booking.finalPayment.amount}</span>
              </div>
            )}
          </div>
        )}

        {/* Rating & Review Section (When completed) */}
        {booking.status === 'COMPLETED' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Star size={18} className="text-amber-400 fill-amber-400" />
              <span>Rate Your Experience with {booking.workerName || 'the Worker'}</span>
            </h3>

            {booking.review || isReviewSubmitted ? (
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <RatingStars rating={booking.review?.rating || reviewRating} size={18} />
                  <span className="text-xs text-slate-500">Submitted</span>
                </div>
                <p className="text-xs text-slate-700 italic">
                  "{booking.review?.feedback || reviewFeedback || 'Great service!'}"
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Overall Rating:</label>
                  <RatingStars rating={reviewRating} size={24} interactive onRatingChange={setReviewRating} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Punctuality:</span>
                    <RatingStars rating={punctualityRating} size={18} interactive onRatingChange={setPunctualityRating} />
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Quality of Work:</span>
                    <RatingStars rating={qualityRating} size={18} interactive onRatingChange={setQualityRating} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Review / Feedback:</label>
                  <textarea
                    value={reviewFeedback}
                    onChange={e => setReviewFeedback(e.target.value)}
                    rows={2}
                    placeholder="Tell other Mohali & Chandigarh residents about the technician's professionalism..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Actions: Cancel Option & Helpdesk */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          {booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="text-rose-600 hover:underline font-semibold"
            >
              Cancel this booking
            </button>
          )}

          <Link to="/contact" className="hover:underline flex items-center gap-1 text-slate-600">
            <HelpCircle size={13} />
            <span>Need Help with this Booking?</span>
          </Link>
        </div>
      </div>

      {/* Final Settlement Modal */}
      {booking.quotation && (
        <PaymentModal
          isOpen={isFinalPaymentModalOpen}
          onClose={() => setIsFinalPaymentModalOpen(false)}
          amount={booking.quotation.finalPayableAmount}
          title="Settle Final Invoice"
          subtitle={`Balance after deducting ₹${booking.tokenAmount} booking token`}
          onPaymentSuccess={handleFinalPaymentDone}
          allowCash={true}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Cancel Booking</h3>
                <p className="text-xs text-slate-500">Please review the cancellation policy</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
              <p>
                • If cancelled before worker arrives: <strong>100% token refund (₹{booking.tokenAmount})</strong>.
              </p>
              <p>
                • If cancelled after worker has arrived & inspected: Standard ₹99 inspection charge applies.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Cancellation:</label>
              <select
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange bg-white"
              >
                <option>Change of plans</option>
                <option>Problem resolved myself</option>
                <option>Worker took too long to arrive</option>
                <option>Quotation higher than expected</option>
                <option>Booked by mistake</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

