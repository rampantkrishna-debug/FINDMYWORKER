import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Users, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange-glow text-xs font-bold uppercase tracking-wider">
            Our Story & Mission
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The Right Worker, At Your Door.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Find My Worker was founded with a singular conviction: finding a dependable electrician, plumber, or daily helper in Mohali and Chandigarh should be as easy and trustworthy as ordering a cab or dinner.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-brand-orange tracking-wider">
                The Problem We Solve
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                From Chaotic Nukkad Labor to Transparent Doorstep Dignity
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In traditional Tri-City markets—whether roaming Sector 18 Chandigarh for electricians or standing at Phase 7 Mohali labor chowk—homeowners faced unpredictable rates, unverified identities, and endless delays.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Workers, on the other hand, suffered through seasonal dry spells and exploitative contractor cuts. Find My Worker changes both sides of the equation.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
              <h3 className="font-extrabold text-brand-navy text-base">Our Three Core Commitments:</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-brand-orange flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Doorstep Safety First:</strong> Every partner undergoes digital Aadhaar authentication and background screening.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Transparent ₹99–₹199 Tokens:</strong> No guesswork. Your deposit is deducted directly from the worker's bill.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>Worker Empowerment:</strong> Zero registration fees for workers. Instant daily UPI payouts.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tri-City Focus */}
          <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                <MapPin size={16} />
                <span>Hyperlocal Tri-City Launch</span>
              </div>
              <h3 className="text-2xl font-black">
                Proudly Rooted in Mohali & Chandigarh
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We are focused on the unique needs of Punjab’s technological and administrative capital. From IT professionals in JLPL Sector 82 and Aerocity Mohali, to residential sectors across Chandigarh, our response time averages under 30 minutes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center">
              <div>
                <div className="text-2xl font-black text-brand-orange">13+</div>
                <div className="text-[11px] text-slate-400">Trade Categories</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">140+</div>
                <div className="text-[11px] text-slate-400">Verified Partners</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">&lt; 30 Mins</div>
                <div className="text-[11px] text-slate-400">Average Arrival</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">4.9 ★</div>
                <div className="text-[11px] text-slate-400">Satisfaction Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

