import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { WorkerProfile, Booking } from '../types';
import {
  HardHat,
  Power,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Wallet,
  Receipt,
  Star,
  FileText,
  AlertCircle,
  TrendingUp,
  Building,
  ArrowRight,
  Send
} from 'lucide-react';

export const WorkerDashboardPage: React.FC = () => {
  const { currentUser, updateWorkerProfile } = useAuth();
  const {
    bookings,
    workers,
    toggleWorkerOnline,
    workerAcceptBooking,
    workerRejectBooking,
    workerEnRoute,
    workerArrived,
    submitQuotation,
    workerCompleteJob
  } = useData();
  const navigate = useNavigate();

  const defaultWorker: WorkerProfile = {
    id: currentUser?.id || 'work-temp',
    name: currentUser?.name || 'Worker Partner',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    role: 'worker',
    city: 'Mohali',
    verificationStatus: 'verified',
    services: ['electrician'],
    experienceYears: 2,
    serviceAreas: ['Mohali Phase 7'],
    bio: 'Professional service technician.',
    dailyRate: 750,
    hourlyRate: 200,
    isOnline: true,
    rating: 5,
    totalRatingsCount: 0,
    completedJobsCount: 0,
    documents: { aadhaarNumberMasked: 'XXXX-XXXX-9911' },
    payoutDetails: {
      upiId: 'partner@upi',
      accountHolderName: currentUser?.name || 'Partner',
      bankName: 'State Bank of India',
      accountNumberMasked: 'XXXXXXXX1234',
      ifsc: 'SBIN0001234'
    },
    earnings: { totalGross: 0, platformFeeDeducted: 0, netPaidOut: 0, walletBalance: 0 },
    createdAt: new Date().toISOString()
  };

  // Find latest worker profile
  const worker: WorkerProfile =
    (workers.find(w => w.id === currentUser?.id) as WorkerProfile) ||
    (currentUser?.role === 'worker' ? (currentUser as WorkerProfile) : null) ||
    workers[0] ||
    defaultWorker;

  const isVerified = worker.verificationStatus === 'verified';

  // State for tabs
  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'profile' | 'reviews'>('jobs');

  // Quotation Modal state
  const [quotingBooking, setQuotingBooking] = useState<Booking | null>(null);
  const [laborCharge, setLaborCharge] = useState(350);
  const [materialsCost, setMaterialsCost] = useState(200);
  const [quoteNotes, setQuoteNotes] = useState('Diagnostic complete. Parts and labor itemized.');

  // Filter bookings relevant to this worker
  // 1. Pending bookings in this worker's city and service that need an answer
  const pendingRequests = bookings.filter(
    b =>
      b.status === 'PENDING_ACCEPTANCE' &&
      isVerified &&
      worker.isOnline &&
      worker.services.includes(b.serviceId) &&
      worker.city === b.address.city
  );

  // 2. Bookings already accepted or in-progress by this worker
  const myActiveJobs = bookings.filter(
    b =>
      b.workerId === worker.id &&
      ['ACCEPTED', 'EN_ROUTE', 'ARRIVED_INSPECTING', 'QUOTATION_SUBMITTED', 'IN_PROGRESS'].includes(b.status)
  );

  // 3. Completed jobs
  const myCompletedJobs = bookings.filter(
    b => b.workerId === worker.id && b.status === 'COMPLETED'
  );

  const handleSubmitQuotationModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotingBooking) return;
    submitQuotation(quotingBooking.id, Number(laborCharge), Number(materialsCost), quoteNotes);
    setQuotingBooking(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Verification Status Warning if Pending or Rejected */}
        {!isVerified && (
          <div className="bg-amber-500 text-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center shrink-0">
                <ShieldAlert size={26} />
              </div>
              <div>
                <h2 className="text-lg font-black">
                  {worker.verificationStatus === 'pending'
                    ? 'KYC Verification Pending Review'
                    : 'Account Verification Rejected'}
                </h2>
                <p className="text-xs text-amber-100 max-w-2xl mt-0.5">
                  {worker.verificationNotes ||
                    'Your Aadhaar and skill trade documents are under inspection by our Mohali/Chandigarh operations admin. You will start receiving job alerts once approved.'}
                </p>
              </div>
            </div>

            <div className="text-xs font-bold bg-white text-amber-900 px-4 py-2 rounded-xl shrink-0">
              Admin Status: {worker.verificationStatus.toUpperCase()}
            </div>
          </div>
        )}

        {/* Worker Profile & Online Toggle Bar */}
        <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={
                worker.avatarUrl ||
                'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'
              }
              alt={worker.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-brand-orange shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">{worker.name}</h1>
                <StatusBadge status={worker.verificationStatus} />
              </div>
              <p className="text-xs text-brand-orange font-semibold mt-0.5">
                {worker.services.map(s => s.replace('-', ' ').toUpperCase()).join(' • ')}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                <span>{worker.city} (Tri-City)</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  {worker.rating > 0 ? worker.rating.toFixed(1) : 'New'} ({worker.totalRatingsCount} reviews)
                </span>
                <span>•</span>
                <span>{worker.completedJobsCount} jobs completed</span>
              </div>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => toggleWorkerOnline(worker.id)}
              disabled={!isVerified}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md ${
                !isVerified
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : worker.isOnline
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              <Power size={16} />
              <span>
                {worker.isOnline ? 'Online • Receiving Jobs' : 'Offline • Toggle to Receive Jobs'}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'jobs'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <HardHat size={16} />
            <span>Active & New Jobs ({pendingRequests.length + myActiveJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'earnings'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Wallet size={16} />
            <span>Earnings & Wallet (₹{worker.earnings.walletBalance.toLocaleString()})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FileText size={16} />
            <span>KYC & Service Profile</span>
          </button>
        </div>

        {/* TAB 1: Jobs Management */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* New Incoming Job Dispatch Alerts */}
            {pendingRequests.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-orange animate-ping" />
                  <h2 className="text-base font-bold text-slate-900">
                    Incoming Job Dispatches Near You ({pendingRequests.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingRequests.map(job => (
                    <div
                      key={job.id}
                      className="bg-white rounded-3xl p-6 border-2 border-brand-orange shadow-md space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            {job.bookingNumber} • Token Paid ₹{job.tokenAmount}
                          </span>
                          <h3 className="text-lg font-black text-brand-navy">{job.serviceTitle}</h3>
                          <p className="text-xs text-brand-orange font-bold">{job.subService}</p>
                        </div>
                        <span className="text-xs bg-orange-100 text-brand-orange font-bold px-2 py-0.5 rounded-full">
                          Action Needed
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-2xl text-xs text-slate-700 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <MapPin size={13} className="text-brand-orange" />
                          <span>{job.address.area}, {job.address.city}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-400" />
                          <span>{job.scheduledDate} ({job.scheduledTimeSlot})</span>
                        </div>
                        <p className="text-[11px] text-slate-500 pt-1 italic">
                          "{job.description}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => workerRejectBooking(job.id, worker.id)}
                          className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => workerAcceptBooking(job.id, worker.id)}
                          className="py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md"
                        >
                          Accept Job
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Currently Active / In-Progress Jobs */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                My Active Jobs ({myActiveJobs.length})
              </h2>

              {myActiveJobs.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-xs text-slate-500">
                  No active jobs right now. Keep your toggle <strong className="text-emerald-600">Online</strong> to receive nearby dispatches in {worker.city}.
                </div>
              ) : (
                <div className="space-y-4">
                  {myActiveJobs.map(job => (
                    <div
                      key={job.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">{job.bookingNumber}</span>
                            <StatusBadge status={job.status} />
                          </div>
                          <h3 className="text-xl font-black text-brand-navy mt-1">
                            {job.serviceTitle} {job.subService && <span className="text-slate-500 font-semibold">• {job.subService}</span>}
                          </h3>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Customer Token</span>
                          <div className="text-lg font-black text-emerald-600">₹{job.tokenAmount} (Adjustable)</div>
                        </div>
                      </div>

                      {/* Customer Contact & Address (Visible after accepting) */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Customer</span>
                          <span className="font-bold text-slate-800 text-sm block">{job.customerName}</span>
                          <a href={`tel:${job.customerPhone}`} className="text-brand-orange font-bold flex items-center gap-1 mt-0.5">
                            <Phone size={12} />
                            {job.customerPhone}
                          </a>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Doorstep Address</span>
                          <span className="font-semibold text-slate-800 block">
                            {job.address.streetAddress}, {job.address.area}
                          </span>
                          <span className="text-slate-500 text-[11px] block">
                            Landmark: {job.address.landmark || 'N/A'}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Job Notes</span>
                          <p className="text-slate-600 text-[11px] line-clamp-2">
                            {job.description}
                          </p>
                        </div>
                      </div>

                      {/* Job Status Progression Controls */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                        <div className="text-xs text-slate-500">
                          Current Phase: <strong className="text-brand-navy">{job.status}</strong>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {job.status === 'ACCEPTED' && (
                            <button
                              onClick={() => workerEnRoute(job.id)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm"
                            >
                              Mark as "En Route"
                            </button>
                          )}

                          {job.status === 'EN_ROUTE' && (
                            <button
                              onClick={() => workerArrived(job.id)}
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm"
                            >
                              I Have Reached & Inspecting
                            </button>
                          )}

                          {job.status === 'ARRIVED_INSPECTING' && (
                            <button
                              onClick={() => {
                                setQuotingBooking(job);
                                setLaborCharge(350);
                                setMaterialsCost(150);
                              }}
                              className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-sm"
                            >
                              Submit On-Site Quotation
                            </button>
                          )}

                          {job.status === 'QUOTATION_SUBMITTED' && (
                            <div className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                              Waiting for customer to approve quotation (₹{job.quotation?.finalPayableAmount})...
                            </div>
                          )}

                          {job.status === 'IN_PROGRESS' && (
                            <button
                              onClick={() => workerCompleteJob(job.id)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm"
                            >
                              Mark Work Completed
                            </button>
                          )}

                          <button
                            onClick={() => navigate(`/booking/status/${job.id}`)}
                            className="px-3 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl"
                          >
                            View Full Tracking
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Jobs History */}
            <div className="space-y-4 pt-4">
              <h2 className="text-base font-bold text-slate-900">
                Completed Jobs History ({myCompletedJobs.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myCompletedJobs.map(job => (
                  <div key={job.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{job.bookingNumber}</span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Settled
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">{job.serviceTitle} ({job.subService})</div>
                    <div className="text-xs text-slate-500">{job.address.area}, {job.address.city}</div>
                    {job.quotation && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Gross Job Bill:</span>
                        <span className="font-bold text-slate-900">
                          ₹{job.quotation.laborCharges + job.quotation.materialsCost}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Earnings & Wallet */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Gross Billed</span>
                <div className="text-2xl font-black text-brand-navy mt-1">₹{worker.earnings.totalGross.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400">All customer invoices</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Platform Fee (8%)</span>
                <div className="text-2xl font-black text-rose-600 mt-1">₹{worker.earnings.platformFeeDeducted.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400">No registration fee</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Net Paid Out</span>
                <div className="text-2xl font-black text-slate-700 mt-1">₹{worker.earnings.netPaidOut.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400">Transferred to UPI</span>
              </div>

              <div className="bg-brand-orange-light p-5 rounded-3xl border border-orange-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-brand-orange block">Wallet Balance</span>
                <div className="text-2xl font-black text-brand-orange mt-1">₹{worker.earnings.walletBalance.toLocaleString()}</div>
                <span className="text-[10px] text-brand-navy/70">Ready for instant withdrawal</span>
              </div>
            </div>

            {/* Bank Details & Payout Settings */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Building size={18} className="text-brand-orange" />
                <span>Bank & UPI Payout Account</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">UPI ID</span>
                  <span className="font-extrabold text-slate-900 text-sm">{worker.payoutDetails.upiId}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Primary payout method</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank Account</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {worker.payoutDetails.bankName} ({worker.payoutDetails.accountNumberMasked})
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">IFSC: {worker.payoutDetails.ifsc}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KYC Profile & Documents */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Worker Profile & Verification</h2>
              <p className="text-xs text-slate-500">Keep your documents updated for fast verification badge</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Service Capabilities
                </span>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Registered Services:</span>
                    <span className="font-bold text-slate-800">{worker.services.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Experience:</span>
                    <span className="font-bold text-slate-800">{worker.experienceYears} Years</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tri-City Service Areas:</span>
                    <span className="font-bold text-slate-800">{worker.serviceAreas.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bio:</span>
                    <p className="text-slate-600 mt-1 leading-relaxed">{worker.bio}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Aadhaar & Verification Documents
                </span>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 block">Aadhaar Card:</span>
                      <span className="font-bold text-slate-800">{worker.documents.aadhaarNumberMasked}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  {worker.documents.aadhaarDocUrl && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <img
                        src={worker.documents.aadhaarDocUrl}
                        alt="Aadhaar Preview"
                        className="w-full h-32 object-cover bg-slate-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quotation Submission Modal */}
      {quotingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleSubmitQuotationModal}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">On-Site Quote</span>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Submit Quotation for {quotingBooking.customerName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuotingBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 bg-orange-50 p-3 rounded-xl border border-orange-200">
              Customer has already paid ₹<strong>{quotingBooking.tokenAmount}</strong> booking token. This will automatically be deducted from your quote.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Labor Charges (₹)</label>
              <input
                type="number"
                value={laborCharge}
                onChange={e => setLaborCharge(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Materials / Hardware Cost (₹)</label>
              <input
                type="number"
                value={materialsCost}
                onChange={e => setMaterialsCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Diagnosis & Scope Notes</label>
              <textarea
                value={quoteNotes}
                onChange={e => setQuoteNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                placeholder="Explain what parts need replacement and work details..."
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Total Bill:</span>
                <span className="font-bold">₹{laborCharge + materialsCost}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Token Adjusted:</span>
                <span>- ₹{quotingBooking.tokenAmount}</span>
              </div>
              <div className="flex justify-between font-black text-brand-orange text-sm pt-1 border-t border-slate-200">
                <span>Customer Pays on Completion:</span>
                <span>₹{Math.max(0, laborCharge + materialsCost - quotingBooking.tokenAmount)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setQuotingBooking(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Send size={14} />
                <span>Send Quotation to Customer</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

