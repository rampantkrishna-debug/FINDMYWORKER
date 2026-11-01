import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { useAuth } from '../context/AuthContext';
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
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  AlertCircle
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

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentCity } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = SERVICES.find(s => s.slug === slug) || SERVICES[0];
  const Icon = ICON_MAP[service.iconName] || Wrench;
  const isSkilled = service.category === 'skilled';

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-brand-orange">
            Home
          </Link>
          <span>/</span>
          <Link to="/services" className="hover:text-brand-orange">
            Services
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">{service.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    isSkilled ? 'bg-orange-50 text-brand-orange' : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <Icon size={30} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {isSkilled ? 'Skilled Trade' : 'Daily Helper'}
                    </span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck size={14} />
                      Verified in {currentCity}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-1">
                    {service.title} Services
                  </h1>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.longDesc}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Booking Token</span>
                  <div className="text-xl font-black text-brand-navy">₹{service.tokenPrice}</div>
                  <span className="text-[10px] text-emerald-600 font-medium">100% Adjusted</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. Labor</span>
                  <div className="text-sm font-bold text-slate-800 mt-1">{service.estimatedBaseCost}</div>
                  <span className="text-[10px] text-slate-400">Fixed quote on site</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Arrival Time</span>
                  <div className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1">
                    <Clock size={12} className="text-brand-orange" />
                    25-35 Mins
                  </div>
                  <span className="text-[10px] text-slate-400">In Tri-City</span>
                </div>
              </div>
            </div>

            {/* Right Booking Card CTA */}
            <div className="md:col-span-4 bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                Instant Doorstep Dispatch
              </div>
              <div>
                <div className="text-3xl font-extrabold">₹{service.tokenPrice}</div>
                <div className="text-xs text-slate-400 mt-0.5">Booking token to confirm slot</div>
              </div>

              <div className="text-xs text-slate-300 bg-white/10 p-3 rounded-xl space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle size={13} />
                  <span>Token Deducted in Final Bill</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  If the job bill is ₹400, you only pay ₹{400 - service.tokenPrice} after completion.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/booking/${service.slug}`)}
                className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Proceed to Book</span>
                <ArrowRight size={16} />
              </button>

              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <MapPin size={11} className="text-brand-orange" />
                <span>Serving all phases of Mohali & Chandigarh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-brand-navy">What Can We Help You With?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {service.subcategories.map((sub, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800"
              >
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center shrink-0 text-xs font-bold">
                  {i + 1}
                </div>
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-emerald-700">
              <CheckCircle size={18} className="text-emerald-500" />
              What's Included
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {service.included.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-rose-700">
              <XCircle size={18} className="text-rose-500" />
              What's Excluded
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {service.excluded.map((exc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-brand-navy">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 bg-slate-50/50 hover:bg-slate-100/60"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Booking Floating Bar */}
        <div className="bg-brand-navy text-white p-4 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center font-bold text-white shrink-0">
              ₹
            </div>
            <div>
              <div className="text-sm font-bold">Ready to book a {service.title}?</div>
              <div className="text-xs text-slate-400">Fast 2-minute booking with ₹{service.tokenPrice} adjustable token.</div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/booking/${service.slug}`)}
            className="w-full sm:w-auto px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <span>Book Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

