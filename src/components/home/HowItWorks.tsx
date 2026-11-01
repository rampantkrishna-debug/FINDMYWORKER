import React from 'react';
import {
  ListChecks,
  Calendar,
  UserCheck,
  Navigation,
  CreditCard,
  Star,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Service',
      description: 'Select from 13 skilled and helper categories tailored for Mohali and Chandigarh homes and shops.',
      icon: ListChecks,
      accent: 'from-orange-500 to-amber-500'
    },
    {
      step: '02',
      title: 'Select Date & Slot',
      description: 'Pick an immediate 30-min urgent dispatch or schedule a convenient date & time slot.',
      icon: Calendar,
      accent: 'from-blue-500 to-cyan-500'
    },
    {
      step: '03',
      title: 'Matched with Verified Worker',
      description: 'Pay a small ₹99–₹199 token. Nearby police-cleared & Aadhaar-verified workers receive your request.',
      icon: UserCheck,
      accent: 'from-emerald-500 to-teal-500'
    },
    {
      step: '04',
      title: 'Track Worker Arrival',
      description: 'See honest status updates: Worker Assigned, En Route, and Arrived at your doorstep in Tri-City.',
      icon: Navigation,
      accent: 'from-purple-500 to-indigo-500'
    },
    {
      step: '05',
      title: 'Inspect, Agree & Pay',
      description: 'Worker inspects the job and quotes upfront. Token is subtracted from the bill. Pay via UPI or Cash.',
      icon: CreditCard,
      accent: 'from-rose-500 to-pink-500'
    },
    {
      step: '06',
      title: 'Rate Your Experience',
      description: 'Rate punctuality, craft quality, and leave genuine reviews to keep our Tri-City community trusted.',
      icon: Star,
      accent: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-light text-brand-orange text-xs font-bold uppercase tracking-wider">
            Simple 6-Step Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            How Find My Worker Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Just like ordering food online, hiring a plumber, electrician, or daily labourer is now transparent, fast, and secure.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-slate-50/80 rounded-3xl p-7 border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-card-hover transition-all duration-300 group"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.accent} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-brand-orange transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>

                {/* Subtle bottom border accent on hover */}
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-slate-400 group-hover:text-brand-navy transition-colors">
                  <span>Step {index + 1} of 6</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Call to Action */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white text-sm font-bold rounded-2xl shadow-xl transition-all hover:gap-3"
          >
            <span>Book a Worker in Under 2 Minutes</span>
            <ArrowRight size={16} className="text-brand-orange" />
          </Link>
        </div>
      </div>
    </section>
  );
};

