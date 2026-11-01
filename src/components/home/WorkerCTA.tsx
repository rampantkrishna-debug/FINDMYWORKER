import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Wallet } from 'lucide-react';

export const WorkerCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-orange to-[#E55E00] text-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <HardHat size={14} className="text-white" />
              <span>Partner Onboarding (Mohali & Chandigarh)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Are You a Skilled Worker or Daily Helper?
            </h2>

            <p className="text-white/90 text-base sm:text-lg max-w-xl leading-relaxed">
              Get more customers, grow your income, and find regular work near your home. We connect you directly with genuine homeowners and businesses.
            </p>

            {/* Benefit bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-white shrink-0" />
                <span>Zero registration fee — Free to join</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-white shrink-0" />
                <span>Daily UPI payouts directly to bank</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-white shrink-0" />
                <span>Flexible hours: Work when you want</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-white shrink-0" />
                <span>Fair transparent commission (only 5–10%)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/worker/register"
                className="px-7 py-3.5 bg-brand-navy hover:bg-black text-white text-sm font-extrabold rounded-2xl shadow-xl flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Join as a Worker</span>
                <ArrowRight size={16} className="text-brand-orange" />
              </Link>

              <Link
                to="/worker/login"
                className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white text-sm font-bold rounded-2xl backdrop-blur-md transition-colors"
              >
                Already Registered? Login
              </Link>
            </div>
          </div>

          {/* Right Card: Earnings Calculator / Worker Card Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 border border-white/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center font-bold">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Worker Partner Earnings</h4>
                    <p className="text-xs text-slate-500">Mohali & Chandigarh average</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Daily Helper</span>
                  <div className="text-xl font-black text-brand-navy mt-1">₹18,000+</div>
                  <span className="text-[10px] text-slate-400">per month</span>
                </div>

                <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                  <span className="text-[10px] text-brand-orange font-semibold uppercase">Skilled Technician</span>
                  <div className="text-xl font-black text-brand-orange mt-1">₹35,000+</div>
                  <span className="text-[10px] text-slate-500">per month</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span>Registration Charge:</span>
                  <span className="text-emerald-600 font-bold">₹0 Free</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Verification Timeline:</span>
                  <span className="font-bold text-slate-800">Same-Day KYC Review</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Payouts:</span>
                  <span className="font-bold text-slate-800">Direct to UPI / Bank</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

