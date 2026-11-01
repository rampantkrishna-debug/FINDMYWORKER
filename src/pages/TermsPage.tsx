import React from 'react';
import { FileText, ShieldAlert, BadgePercent, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center font-bold">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">Terms and Conditions</h1>
              <span className="text-xs text-slate-400">Find My Worker Platform Services Agreement • Mohali & Chandigarh</span>
            </div>
          </div>

          <div className="prose prose-sm text-slate-600 space-y-5 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">1. Platform Nature & Scope</h2>
              <p>
                Find My Worker ("Platform", "we", "us") operates as an on-demand marketplace connecting consumers ("Customers") with independent background-verified tradespeople and daily helpers ("Worker Partners") across the Mohali, Chandigarh, and Panchkula metropolitan region.
              </p>
            </section>

            <section className="space-y-2 bg-orange-50/70 p-4 rounded-2xl border border-orange-200 text-brand-navy">
              <h2 className="text-base font-extrabold text-brand-orange flex items-center gap-1.5">
                <BadgePercent size={18} />
                2. Booking Token & Cancellation Policy (Disclosed Terms)
              </h2>
              <p className="font-semibold text-slate-800">
                To guarantee genuine dispatches and compensate workers for travel time, Customers deposit an upfront Booking Token ranging from ₹99 to ₹199, subject to the following rules:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-700">
                <li>
                  <strong>100% Bill Adjustment:</strong> The full token amount is subtracted directly from the final job invoice presented by the worker after on-site inspection.
                </li>
                <li>
                  <strong>Unassigned / Pre-Arrival Cancellation:</strong> If no eligible verified worker accepts the request within 30 minutes, or if the customer cancels before the worker commences travel, the token is 100% refunded to the original payment source.
                </li>
                <li>
                  <strong>Post-Inspection Cancellation:</strong> If the worker arrives at the customer's doorstep, conducts diagnostics, and presents an itemized quotation, and the customer elects not to proceed with the repair, a standard ₹99 inspection charge is retained from the token to reimburse the worker's fuel and transit costs.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">3. Worker Partner Standards & Verification</h2>
              <p>
                No worker partner is permitted to receive customer bookings until their identity and trade background are validated by the Find My Worker administrative desk. Workers agree to professional decorum, clean workmanship, and adherence to safety norms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">4. Service Warranty & Re-Work Policy</h2>
              <p>
                Skilled trade services (Electrician, Plumber, AC Repair, Appliance Fix, Carpenter) carry a <strong>30-day rework warranty</strong> on the specific task performed. In the event of recurring issues within 30 days, Find My Worker will dispatch a senior technician for complimentary inspection.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-brand-navy">5. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by the laws of India. Any disputes arising out of bookings or platform usage shall be subject to the exclusive jurisdiction of the competent courts in <strong>SAS Nagar (Mohali), Punjab</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

