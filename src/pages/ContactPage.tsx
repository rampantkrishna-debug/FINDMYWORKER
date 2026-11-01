import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-light text-brand-orange text-xs font-bold uppercase tracking-wider">
            We Are Here to Help
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy">
            Contact Support & Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have questions about a booking, want to partner as a commercial vendor, or need emergency assistance in Mohali or Chandigarh?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Hubs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-extrabold text-slate-900 text-lg">Direct Contact Lines</h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Tri-City Support Helpline</span>
                    <a href="tel:+911724589000" className="text-brand-orange font-bold text-base hover:underline">
                      +91 172 458 9000
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Available Mon - Sun: 7:00 AM - 10:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries</span>
                    <a href="mailto:support@findmyworker.in" className="text-slate-700 font-semibold hover:underline">
                      support@findmyworker.in
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Responses within 2 business hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Our Tri-City Dispatch Offices
                </h3>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1 text-xs">
                  <span className="font-bold text-brand-navy flex items-center gap-1.5">
                    <MapPin size={13} className="text-brand-orange" />
                    Mohali Operations Hub
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Bestech Business Tower, 4th Floor, Sector 66, Mohali, Punjab 160062
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1 text-xs">
                  <span className="font-bold text-brand-navy flex items-center gap-1.5">
                    <MapPin size={13} className="text-brand-orange" />
                    Chandigarh Branch Office
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    SCO 45-46, Sector 17-C, Near Neelam Cinema, Chandigarh 160017
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-navy">Send Us a Direct Message</h2>
                <p className="text-xs text-slate-500 mt-1">
                  We welcome feedback from customers, prospective worker partners, and commercial shop owners.
                </p>
              </div>

              {isSent ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-600 animate-bounce" />
                  <h3 className="font-bold text-emerald-900 text-base">Message Delivered!</h3>
                  <p className="text-xs text-emerald-700">
                    Thank you, {name || 'Customer'}. Our support agent will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Gurminder Singh"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Issue Details</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Please let us know how we can assist..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

