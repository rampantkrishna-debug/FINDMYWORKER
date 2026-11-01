import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { useAuth } from '../context/AuthContext';
import { ServiceCategory } from '../types';
import {
  Zap,
  Wrench,
  Hammer,
  Wind,
  Tv,
  Paintbrush,
  Sparkles,
  Home,
  Truck,
  Flower2,
  HardHat,
  PartyPopper,
  Store,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Filter
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Wrench,
  Hammer,
  Wind,
  Tv,
  Paintbrush,
  Sparkles,
  Home,
  Truck,
  Flower2,
  HardHat,
  PartyPopper,
  Store
};

export const ServicesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const { currentCity } = useAuth();
  const navigate = useNavigate();

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Breadcrumb */}
        <div className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange-glow text-xs font-semibold">
              <MapPin size={12} className="text-brand-orange" />
              <span>Available in {currentCity} & Tri-City</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              All Doorstep Services
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Choose from 13 verified skilled trades and daily helper services. Transparent ₹99–₹199 booking token fully adjusted against your final invoice.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({SERVICES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('skilled')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'skilled'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Skilled Technicians (6)
            </button>
            <button
              onClick={() => setSelectedCategory('unskilled')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'unskilled'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Daily Helpers (7)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search services or sub-tasks..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>
        </div>

        {/* Services List Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Filter size={36} className="mx-auto text-slate-300" />
            <h3 className="text-lg font-bold text-slate-800">No Services Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any services matching "{searchTerm}". Try clearing your search or browsing all categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => {
              const Icon = ICON_MAP[service.iconName] || Wrench;
              const isSkilled = service.category === 'skilled';

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-orange/40 hover:shadow-card-hover transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                          isSkilled
                            ? 'bg-orange-50 text-brand-orange'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSkilled
                              ? 'bg-orange-50 text-brand-orange border border-orange-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {isSkilled ? 'Skilled' : 'Helper'}
                        </span>
                        {service.popular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Subcategories preview */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Common Requests:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {service.subcategories.slice(0, 3).map((sub, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Estimated metrics */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-[11px] border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Est. Labor:</span>
                        <span className="font-bold text-slate-800">{service.estimatedBaseCost}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Duration:</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Clock size={11} className="text-slate-400" />
                          {service.estimatedDuration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Token */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                        Booking Token
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-brand-navy">
                          ₹{service.tokenPrice}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          Adjustable
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/services/${service.slug}`)}
                        className="px-3 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/booking/${service.slug}`)}
                        className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-1 transition-all"
                      >
                        <span>Book</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

