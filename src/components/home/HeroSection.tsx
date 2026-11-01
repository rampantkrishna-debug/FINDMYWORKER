import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CITIES, TRICITY_AREAS } from '../../data/locations';
import { City } from '../../types';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Zap,
  Wrench,
  Hammer,
  Wind,
  Home as HomeIcon,
  Truck,
  HardHat
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { currentCity, setCity } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const navigate = useNavigate();

  const cityAreas = TRICITY_AREAS.filter(a => a.city === currentCity);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  const quickPills = [
    { name: 'Electrician', slug: 'electrician', icon: Zap },
    { name: 'Plumber', slug: 'plumber', icon: Wrench },
    { name: 'AC Repair', slug: 'ac-repair', icon: Wind },
    { name: 'Cleaning Help', slug: 'cleaning-help', icon: Sparkles },
    { name: 'Carpenter', slug: 'carpenter', icon: Hammer },
    { name: 'Loading / Shifting', slug: 'loading-shifting', icon: Truck },
    { name: 'Daily Labour', slug: 'daily-wage-labour', icon: HardHat },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy-dark via-brand-navy to-[#0F223D] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headings, Location & Search */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-orange-glow text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
              <span>Doorstep Workers in Mohali & Chandigarh</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Find Trusted Workers <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300">
                Near You
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Book verified electricians, plumbers, cleaners, carpenters, and daily helpers. Reliable services at your doorstep in under 2 minutes.
            </p>

            {/* Search Box Card */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 text-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-2"
            >
              {/* City & Area Selector */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 sm:w-5/12">
                <MapPin size={18} className="text-brand-orange shrink-0" />
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">City / Area</span>
                  <select
                    value={currentCity}
                    onChange={e => setCity(e.target.value as City)}
                    className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer truncate"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>
                        {c} (Tri-City)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Input */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 flex-1">
                <Search size={18} className="text-slate-400 shrink-0" />
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Service</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="e.g. Electrician, Tap Repair, Cleaning"
                    className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none w-full"
                  />
                </div>
              </div>

              {/* Orange Action Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
              >
                <span>Find a Worker</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Quick Service Pills */}
            <div className="pt-2">
              <div className="text-xs text-slate-400 mb-2 font-medium">Popular services:</div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {quickPills.map(pill => {
                  const Icon = pill.icon;
                  return (
                    <button
                      key={pill.slug}
                      type="button"
                      onClick={() => navigate(`/services/${pill.slug}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      <Icon size={13} className="text-brand-orange" />
                      <span>{pill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-brand-orange shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">100% Verified</div>
                  <div className="text-[10px] text-slate-400">Police & Aadhaar check</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={20} className="text-brand-orange shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Under 30 Mins</div>
                  <div className="text-[10px] text-slate-400">Average arrival in Tri-City</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-brand-orange shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">₹99 Token</div>
                  <div className="text-[10px] text-slate-400">Adjusted in final bill</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration & Dynamic Worker Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Worker Hero Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-800/80 backdrop-blur-md shadow-2xl p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"
                      alt="Verified Worker Gurpreet"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-orange shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-base">Gurpreet Singh</h4>
                        <span className="bg-emerald-500/20 text-emerald-400 p-0.5 rounded-full" title="Verified Partner">
                          <CheckCircle size={14} />
                        </span>
                      </div>
                      <p className="text-xs text-brand-orange font-medium">Master Electrician & AC Specialist</p>
                      <div className="flex items-center gap-1 text-xs text-slate-300 mt-0.5">
                        <MapPin size={11} className="text-brand-orange" />
                        <span>Phase 7, Mohali (2.4 km away)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-1 rounded-lg text-xs font-bold">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">128 reviews</span>
                  </div>
                </div>

                {/* Live Worker Status */}
                <div className="bg-brand-navy-dark/70 rounded-2xl p-4 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Current Status:</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Online & Ready in Mohali
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-slate-400 text-[10px] block">Booking Token</span>
                      <span className="text-white font-bold text-sm">₹99</span>
                      <span className="text-[10px] text-slate-400 block">(Adjustable)</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-slate-400 text-[10px] block">Avg Arrival</span>
                      <span className="text-white font-bold text-sm">25 Mins</span>
                      <span className="text-[10px] text-emerald-400 block">Fast Dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Floater: Customer Testimonial pill */}
                <div className="bg-white text-slate-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange-light text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">
                    RS
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">Rahul S. (Sector 70)</p>
                      <span className="text-[10px] text-slate-400">Today</span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">
                      "Short circuit fixed in 30 mins. ₹99 token deducted on bill."
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => navigate('/services/electrician')}
                    className="w-full py-3 bg-gradient-to-r from-brand-orange to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    <span>Book an Electrician Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Floating mini badge: Chandigarh Hub */}
              <div className="absolute -bottom-5 -left-4 bg-[#0B192C] border border-white/20 text-white px-4 py-2.5 rounded-2xl shadow-xl hidden sm:flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold">140+ Workers Live in Tri-City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

