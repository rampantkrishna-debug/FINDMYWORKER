import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center font-bold text-white shadow-md">
                FMW
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Find My <span className="text-brand-orange">Worker</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier on-demand platform connecting homeowners, shops, and businesses with verified skilled and unskilled workers in Mohali and Chandigarh.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-2 rounded-xl max-w-fit">
              <ShieldCheck size={16} />
              <span>100% Aadhaar Verified & Police Cleared Partners</span>
            </div>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-orange shrink-0" />
                <span>Mohali Hub: Sector 66, Near IT City, Mohali 160062</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-orange shrink-0" />
                <span>Chandigarh Office: Sector 17-C, Chandigarh 160017</span>
              </div>
            </div>
          </div>

          {/* Skilled Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-xs">
              Skilled Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/services/electrician" className="hover:text-brand-orange transition-colors">
                  Electrician (Mohali & Chd)
                </Link>
              </li>
              <li>
                <Link to="/services/plumber" className="hover:text-brand-orange transition-colors">
                  Plumber & Pipe Repairs
                </Link>
              </li>
              <li>
                <Link to="/services/carpenter" className="hover:text-brand-orange transition-colors">
                  Carpenter & Furniture Work
                </Link>
              </li>
              <li>
                <Link to="/services/ac-repair" className="hover:text-brand-orange transition-colors">
                  AC Service & Jet Foam Wash
                </Link>
              </li>
              <li>
                <Link to="/services/appliance-repair" className="hover:text-brand-orange transition-colors">
                  Appliance Repair
                </Link>
              </li>
              <li>
                <Link to="/services/painter" className="hover:text-brand-orange transition-colors">
                  Painters & Putty Touchup
                </Link>
              </li>
            </ul>
          </div>

          {/* Unskilled Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-xs">
              Daily & Helper Chores
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/services/cleaning-help" className="hover:text-brand-orange transition-colors">
                  Home & Kitchen Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/household-helper" className="hover:text-brand-orange transition-colors">
                  Household Maid & Helpers
                </Link>
              </li>
              <li>
                <Link to="/services/loading-shifting" className="hover:text-brand-orange transition-colors">
                  Loading & Furniture Shifting
                </Link>
              </li>
              <li>
                <Link to="/services/gardening" className="hover:text-brand-orange transition-colors">
                  Gardening & Lawn Mowing
                </Link>
              </li>
              <li>
                <Link to="/services/daily-wage-labour" className="hover:text-brand-orange transition-colors">
                  Daily Wage Construction Labour
                </Link>
              </li>
              <li>
                <Link to="/services/event-helpers" className="hover:text-brand-orange transition-colors">
                  Event & Banquet Helpers
                </Link>
              </li>
              <li>
                <Link to="/services/shop-helpers" className="hover:text-brand-orange transition-colors">
                  Retail Shop & Godown Helpers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-xs">
              Trust & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-brand-orange transition-colors">
                  About Find My Worker
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-orange transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-orange transition-colors">
                  Privacy Policy & Data KYC
                </Link>
              </li>
              <li>
                <Link to="/worker/register" className="text-brand-orange font-semibold hover:underline flex items-center gap-1">
                  <span>Register as Worker</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="font-bold text-white flex items-center gap-2">
                <Phone size={13} className="text-brand-orange" />
                <span>+91 172 458 9000</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <Mail size={13} className="text-brand-orange" />
                <span>support@findmyworker.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Find My Worker Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Proudly built for <span className="text-slate-300 font-semibold">Mohali & Chandigarh</span>
            <Heart size={14} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

