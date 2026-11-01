import React from 'react';
import {
  ShieldCheck,
  BadgePercent,
  MapPin,
  Lock,
  Headphones,
  Award,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: '100% Verified Workers',
      description: 'Strict identity verification with government Aadhaar, address verification, and police background clearance before onboarding.',
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      icon: BadgePercent,
      title: 'Transparent Pricing',
      description: 'No surprise surge fees. The ₹99–₹199 booking token is completely deducted from your final bill after on-site quotation approval.',
      color: 'text-brand-orange bg-orange-50'
    },
    {
      icon: MapPin,
      title: 'Local Tri-City Professionals',
      description: 'Technicians and helpers based right in Mohali and Chandigarh. They reach your doorstep faster and know local hardware markets.',
      color: 'text-blue-500 bg-blue-50'
    },
    {
      icon: Lock,
      title: 'Secure In-App Payments',
      description: 'Pay safely via UPI, Google Pay, PhonePe, Debit/Credit Card or Cash after satisfactory job completion.',
      color: 'text-indigo-500 bg-indigo-50'
    },
    {
      icon: Award,
      title: '30-Day Service Warranty',
      description: 'All skilled repair services include a complimentary 30-day rework warranty for peace of mind.',
      color: 'text-purple-500 bg-purple-50'
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Support',
      description: 'Local helpline available from 7 AM to 10 PM. Immediate escalation and dispute resolution for all bookings.',
      color: 'text-rose-500 bg-rose-50'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange-glow text-xs font-bold uppercase tracking-wider border border-white/10">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Built on Trust, Affordability & Reliability
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We are solving the everyday frustration of finding dependable, honest tradespeople in Mohali and Chandigarh.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white/5 border border-white/10 hover:border-brand-orange/40 rounded-3xl p-7 transition-all duration-300 hover:bg-white/[0.08] hover:translate-y-[-2px]"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${f.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Metric numbers */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-orange">4.9 / 5</div>
            <div className="text-xs text-slate-400 mt-1">Average Customer Rating</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">28 Mins</div>
            <div className="text-xs text-slate-400 mt-1">Avg Doorstep Arrival</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1">Aadhaar Verified Partners</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">₹0</div>
            <div className="text-xs text-slate-400 mt-1">Worker Registration Fee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

