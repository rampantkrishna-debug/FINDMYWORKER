import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center font-bold">
              <Lock size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">Privacy Policy</h1>
              <span className="text-xs text-slate-400">Effective Date: October 2026 • Find My Worker Technologies Pvt. Ltd.</span>
            </div>
          </div>

          <div className="prose prose-sm text-slate-600 space-y-5 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">1. Information We Collect</h2>
              <p>
                Find My Worker collects necessary contact and location information to fulfill on-demand trade and helper dispatches across Mohali and Chandigarh. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Customer Information:</strong> Full name, phone number, email address, and doorstep location addresses (including landmark and sector/phase).</li>
                <li><strong>Worker Partner KYC:</strong> Aadhaar number (masked), government photo ID proofs, practical trade certifications, bank UPI details, and service territory radius.</li>
                <li><strong>Transactional Data:</strong> Booking tokens, quotation estimates, final payment records, and user feedback ratings.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">2. Aadhaar & KYC Verification Protection</h2>
              <p>
                In compliance with UIDAI and Government of India regulatory norms, Aadhaar numbers are stored in masked format (e.g. <code>XXXX-XXXX-4912</code>). Verification documents submitted by workers are strictly utilized for identity and police-record validation by our authorized administrative team and are never made publicly visible or sold to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">3. Doorstep Location Privacy</h2>
              <p>
                A customer's exact residential street address is revealed to an assigned worker only <em>after</em> the worker partner formally accepts the dispatch. Workers who decline or unverified workers do not receive customer address coordinates.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">4. Security & Payment Processing</h2>
              <p>
                All electronic transactions (UPI, Credit/Debit Cards, Net Banking) are encrypted using 256-bit TLS bank-grade protocols via PCI-DSS compliant Indian payment gateways. Find My Worker does not store card CVVs or net banking passwords.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">5. Contact Our Privacy Officer</h2>
              <p>
                For data access requests or questions concerning your personal records, contact our Data Protection Officer at: <a href="mailto:privacy@findmyworker.in" className="text-brand-orange font-bold">privacy@findmyworker.in</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

