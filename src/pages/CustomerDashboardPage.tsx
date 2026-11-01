import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { TRICITY_AREAS } from '../data/locations';
import { City, Address } from '../types';
import {
  User,
  MapPin,
  CalendarCheck,
  Plus,
  Trash2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Receipt,
  Search,
  ExternalLink,
  Edit2,
  Check
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { currentUser, currentCity, updateCustomerProfile } = useAuth();
  const { bookings, cancelBooking } = useData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'bookings' | 'addresses' | 'profile'>('bookings');

  // Customer Bookings
  const customerBookings = bookings.filter(
    b => b.customerId === currentUser?.id || b.customerPhone === currentUser?.phone
  );

  // Address modal or inline add
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newLabel, setNewLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [newCity, setNewCity] = useState<City>(currentCity);
  const [newArea, setNewArea] = useState(TRICITY_AREAS.find(a => a.city === currentCity)?.name || 'Phase 7 (Sector 61)');
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newPincode, setNewPincode] = useState('160062');

  // Profile Edit
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: editName,
      phone: editPhone,
      email: editEmail
    });
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 2000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      city: newCity,
      area: newArea,
      streetAddress: newStreet,
      landmark: newLandmark,
      pincode: newPincode,
      isDefault: false
    };

    const existing = (currentUser as any)?.savedAddresses || [];
    updateCustomerProfile({
      savedAddresses: [...existing, newAddr]
    });

    setIsAddingAddress(false);
    setNewStreet('');
    setNewLandmark('');
  };

  const handleDeleteAddress = (id: string) => {
    const existing = (currentUser as any)?.savedAddresses || [];
    updateCustomerProfile({
      savedAddresses: existing.filter((a: Address) => a.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-brand-navy">{currentUser?.name || 'Customer'}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange-light text-brand-orange border border-orange-200">
                  Customer Account
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span>{currentUser?.phone}</span>
                <span>•</span>
                <span>{currentUser?.city || currentCity}</span>
              </p>
            </div>
          </div>

          <Link
            to="/services"
            className="px-5 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2"
          >
            <Search size={14} />
            <span>Book a New Worker</span>
          </Link>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'bookings'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <CalendarCheck size={16} />
            <span>My Bookings ({customerBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'addresses'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <MapPin size={16} />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <User size={16} />
            <span>Profile Settings</span>
          </button>
        </div>

        {/* TAB 1: Bookings History & Live Tracking */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {customerBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <CalendarCheck size={40} className="mx-auto text-slate-300" />
                <h3 className="text-lg font-bold text-slate-800">No Bookings Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven't requested any workers yet. Book a verified electrician, plumber, or helper in less than 2 minutes.
                </p>
                <Link
                  to="/services"
                  className="inline-block px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl"
                >
                  Explore Services
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {customerBookings.map(b => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">ID: {b.bookingNumber}</span>
                          <StatusBadge status={b.status} />
                        </div>
                        <h3 className="text-lg font-extrabold text-brand-navy mt-1">
                          {b.serviceTitle} {b.subService && <span className="text-slate-500 font-semibold">• {b.subService}</span>}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Booking Token</span>
                        <div className="text-lg font-black text-brand-orange">₹{b.tokenAmount}</div>
                        <span className="text-[10px] text-slate-500">Paid & Adjusted</span>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Location:</span>
                        <span className="font-semibold text-slate-800">
                          {b.address.streetAddress}, {b.address.area}, {b.address.city}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Scheduled Time:</span>
                        <span className="font-semibold text-slate-800">
                          {b.scheduledDate} ({b.scheduledTimeSlot})
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Worker:</span>
                        <span className="font-semibold text-slate-800">
                          {b.workerName ? (
                            <span className="text-brand-orange font-bold flex items-center gap-1">
                              {b.workerName} ({b.workerPhone})
                            </span>
                          ) : (
                            <span className="text-amber-600 font-medium">Matching nearby worker...</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs text-slate-500">
                        {b.status === 'COMPLETED' ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            ✓ Job Finished & Settled
                          </span>
                        ) : b.status === 'CANCELLED' ? (
                          <span className="text-rose-600 font-semibold">Cancelled</span>
                        ) : (
                          <span className="text-blue-600 font-medium">Live updates active</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/booking/status/${b.id}`)}
                          className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                        >
                          <span>Track / View Booking</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Saved Tri-City Addresses</h2>
                <p className="text-xs text-slate-500">Manage addresses in Mohali & Chandigarh for 1-click booking</p>
              </div>

              <button
                onClick={() => setIsAddingAddress(true)}
                className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add Address</span>
              </button>
            </div>

            {/* Add Address Form Modal / Inline */}
            {isAddingAddress && (
              <form onSubmit={handleAddAddress} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Add New Address</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Address Label</label>
                    <select
                      value={newLabel}
                      onChange={e => setNewLabel(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    >
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <select
                      value={newCity}
                      onChange={e => {
                        const c = e.target.value as City;
                        setNewCity(c);
                        const match = TRICITY_AREAS.find(a => a.city === c);
                        if (match) setNewArea(match.name);
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    >
                      <option>Mohali</option>
                      <option>Chandigarh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sector / Phase</label>
                    <select
                      value={newArea}
                      onChange={e => setNewArea(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    >
                      {TRICITY_AREAS.filter(a => a.city === newCity).map(a => (
                        <option key={a.id} value={a.name}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">House / Flat / Street</label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={e => setNewStreet(e.target.value)}
                      placeholder="e.g. House No. 812, Sector 35-C"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      value={newLandmark}
                      onChange={e => setNewLandmark(e.target.value)}
                      placeholder="e.g. Near JW Marriott"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* List Saved Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {((currentUser as any)?.savedAddresses || []).map((addr: Address) => (
                <div key={addr.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                        {addr.label}
                      </span>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-2">{addr.streetAddress}</div>
                    <div className="text-xs text-slate-500">{addr.area}, {addr.city} - {addr.pincode}</div>
                    {addr.landmark && (
                      <div className="text-[11px] text-slate-400 mt-1">Landmark: {addr.landmark}</div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check size={12} />
                    <span>Verified Delivery Area</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
              <p className="text-xs text-slate-500">Update your contact details for worker bookings</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {isProfileSaved && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <Check size={14} /> Changes Saved!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

