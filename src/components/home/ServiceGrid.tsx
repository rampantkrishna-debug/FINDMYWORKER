import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../../data/services';
import { ServiceCategory } from '../../types';
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
  ArrowRight,
  ShieldCheck,
  Check
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

export const ServiceGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | ServiceCategory>('all');
  const navigate = useNavigate();

  const filteredServices = SERVICES.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-light text-brand-orange text-xs font-bold uppercase tracking-wider">
            Explore Categories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Popular Services in Mohali & Chandigarh
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From quick electrical fixes to daily household helpers, pick your service and get matched with a verified local professional.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center pt-4">
            <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                All Services (13)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('skilled')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'skilled'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                Skilled Technicians (6)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('unskilled')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'unskilled'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                Daily & Helper Chores (7)
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-12">
          {filteredServices.map(service => {
            const Icon = ICON_MAP[service.iconName] || Wrench;
            const isSkilled = service.category === 'skilled';

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-orange/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                {/* Popular or Category pill */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSkilled
                        ? 'bg-orange-50 text-brand-orange'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <Icon size={24} />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {service.popular && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Popular
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSkilled
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {isSkilled ? 'Skilled' : 'Helper'}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Subcategories micro pills */}
                <div className="py-2 border-t border-slate-100 space-y-1 mb-4">
                  <div className="text-[11px] font-semibold text-slate-400">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {service.subcategories.slice(0, 2).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                      >
                        {sub}
                      </span>
                    ))}
                    {service.subcategories.length > 2 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{service.subcategories.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Booking Token
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-extrabold text-brand-navy">
                        ₹{service.tokenPrice}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        (Adjustable)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all group-hover:gap-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Transparent Token Policy
              </h4>
              <p className="text-xs text-slate-500">
                Your ₹99–₹199 booking token is 100% deducted from the final invoice. If no worker accepts within 30 mins, full instant refund.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shrink-0"
          >
            View All Detailed Rates
          </button>
        </div>
      </div>
    </section>
  );
};

